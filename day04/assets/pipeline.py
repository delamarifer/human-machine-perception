#!/usr/bin/env python3
"""Make every Day 4 figure and number from the photos in photos/.

    python pipeline.py --bundle /path/to/bundles [--spleen /path/to/Task09_Spleen]

Writes images into resnet/, search/, yolo/, seg/, audio/, unet/ and every number the slides
quote into result.json. Nothing on a slide is typed in by hand. See SOURCES.md.
"""
import argparse, json, os, time
import numpy as np
import torch, torchvision
from PIL import Image, ImageDraw
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

ap = argparse.ArgumentParser()
ap.add_argument('--bundle', default='bundles', help='folder holding spleen_ct_segmentation (monai.bundle.download)')
ap.add_argument('--spleen', help='the unpacked Task09_Spleen folder; without it the CT slide images are not made')
args = ap.parse_args()

HERE = os.path.dirname(os.path.abspath(__file__))
P = lambda *a: os.path.join(HERE, *a)
R = {'versions': {'torch': torch.__version__, 'torchvision': torchvision.__version__},
     'run': time.strftime('%Y-%m-%d')}
torch.set_grad_enabled(False)
for d in ['resnet', 'search', 'yolo', 'seg', 'audio', 'unet']: os.makedirs(P(d), exist_ok=True)

STREET = P('photos', 'street.jpg')
rgb = lambda f: Image.open(f).convert('RGB')

# ---------------- ResNet-18 ----------------
from torchvision.models import resnet18, ResNet18_Weights
W = ResNet18_Weights.IMAGENET1K_V1
tf, cats = W.transforms(), W.meta['categories']
net = resnet18(weights=W).eval()
torch.manual_seed(0)
rand = resnet18(weights=None).eval()

def top5(model, img):
    p = model(tf(img).unsqueeze(0)).softmax(-1)[0]
    v, i = p.topk(5)
    return [{'label': cats[k], 'p': round(float(x), 4)} for x, k in zip(v, i)]

R['resnet'] = {
    'params': sum(p.numel() for p in net.parameters()),
    'top5_street': top5(net, rgb(STREET)),
    'top5_street_random_weights': top5(rand, rgb(STREET)),
    'n_classes': len(cats),
    'acc_top1': W.meta['_metrics']['ImageNet-1K']['acc@1'],
}

# what the classifier actually sees: resize short side to 256, center crop 224
crop = torchvision.transforms.Compose([torchvision.transforms.Resize(256), torchvision.transforms.CenterCrop(224)])(rgb(STREET))
crop.save(P('resnet', 'street-crop.jpg'), quality=92)

# a fixed pixel permutation, the same one a fully connected net could learn just as well
a = np.asarray(crop)
perm = np.random.default_rng(0).permutation(224 * 224)
Image.fromarray(a.reshape(-1, 3)[perm].reshape(224, 224, 3)).save(P('resnet', 'street-permuted.png'))

# stage shapes, parameters per stage, theoretical receptive fields
x = tf(rgb(STREET)).unsqueeze(0)
stages, acts, h = [], {}, x
seq = [('conv1', torch.nn.Sequential(net.conv1, net.bn1, net.relu)), ('maxpool', net.maxpool),
       ('layer1', net.layer1), ('layer2', net.layer2), ('layer3', net.layer3), ('layer4', net.layer4)]
for name, m in seq:
    h = m(h); acts[name] = h[0]
    stages.append({'name': name, 'shape': list(h.shape[1:]), 'params': sum(p.numel() for p in m.parameters())})
rf, jump = 1, 1
def walk(m):
    global rf, jump
    for c in m.modules():
        if isinstance(c, (torch.nn.Conv2d, torch.nn.MaxPool2d)) and not (isinstance(c, torch.nn.Conv2d) and c.kernel_size == (1, 1)):
            k = c.kernel_size if isinstance(c.kernel_size, int) else c.kernel_size[0]
            s = c.stride if isinstance(c.stride, int) else c.stride[0]
            rf += (k - 1) * jump; jump *= s
for st, (name, m) in zip(stages, seq):
    if name.startswith('layer'):          # the main path of each block (conv1, conv2), not the 1x1 shortcut
        for blk in m: walk(torch.nn.Sequential(blk.conv1, blk.conv2))
    else: walk(m)
    st['receptive_field'] = rf
R['resnet']['stages'] = stages
R['resnet']['head'] = {'pooled': 512, 'fc_params': sum(p.numel() for p in net.fc.parameters())}

def tile(maps, path, n=4, size=200):
    """the n most active channels of one stage, side by side, each scaled to its own range"""
    idx = maps.mean((1, 2)).topk(n).indices.tolist()
    cm = plt.get_cmap('magma'); out = []
    for k in idx:
        m = maps[k].numpy(); m = (m - m.min()) / (np.ptp(m) + 1e-8)
        im = Image.fromarray((cm(m)[..., :3] * 255).astype(np.uint8)).resize((size, size), Image.NEAREST)
        out.append(im)
    sheet = Image.new('RGB', (n * size + (n - 1) * 8, size), 'white')
    for j, im in enumerate(out): sheet.paste(im, (j * (size + 8), 0))
    sheet.save(path); return idx
R['resnet']['featmap_channels'] = {s: tile(acts[s], P('resnet', f'fm-{s}.png')) for s in ['conv1', 'layer1', 'layer2', 'layer3', 'layer4']}

def filters(w, path, cols=16, size=44):
    w = w.detach().numpy(); n = w.shape[0]; rows = n // cols
    sheet = Image.new('RGB', (cols * (size + 4), rows * (size + 4)), 'white')
    for k in range(n):
        f = w[k].transpose(1, 2, 0); f = (f - f.min()) / (np.ptp(f) + 1e-8)
        im = Image.fromarray((f * 255).astype(np.uint8)).resize((size, size), Image.NEAREST)
        sheet.paste(im, ((k % cols) * (size + 4), (k // cols) * (size + 4)))
    sheet.save(path)
filters(net.conv1.weight, P('resnet', 'conv1-learned.png'))
filters(rand.conv1.weight, P('resnet', 'conv1-random.png'))
R['resnet']['conv1'] = list(net.conv1.weight.shape)

# ---------------- visual search: 512-d embeddings, cosine similarity ----------------
emb_net = resnet18(weights=W).eval(); emb_net.fc = torch.nn.Identity()
gallery = sorted(f for f in os.listdir(P('photos')) if f.endswith('.jpg') and f not in ('street.jpg', 'cairo-sentinel2.jpg'))
E = lambda f: torch.nn.functional.normalize(emb_net(tf(rgb(P('photos', f))).unsqueeze(0))[0], dim=0)
q = E('street.jpg')
sims = sorted(({'file': f, 'cos': round(float(q @ E(f)), 3)} for f in gallery), key=lambda d: -d['cos'])
pix = lambda f: torch.nn.functional.normalize(torch.from_numpy(np.asarray(rgb(P('photos', f)).resize((32, 32)), np.float32).ravel()), dim=0)
qp = pix('street.jpg')
for d in sims: d['pixel_cos'] = round(float(qp @ pix(d['file'])), 3)
R['search'] = {'dim': 512, 'gallery': len(gallery), 'ranking': sims,
               'pixel_rank': [d['file'] for d in sorted(sims, key=lambda d: -d['pixel_cos'])]}
for f in gallery + ['street.jpg']:
    im = rgb(P('photos', f)); im.thumbnail((480, 480)); im.save(P('search', f), quality=85)

# ---------------- out-of-distribution input: a spectrogram ----------------
from scipy.signal import stft
sr = 16000; t = np.arange(int(2.5 * sr)) / sr
sig = 0.02 * np.random.default_rng(1).standard_normal(t.size)
for k, t0 in enumerate([0.2, 0.7, 1.2, 1.7]):                         # four chirps, like a bird call
    m = (t >= t0) & (t < t0 + 0.25); tt = t[m] - t0
    sig[m] += np.sin(2 * np.pi * (2500 * tt + 6000 * tt ** 2)) * np.hanning(m.sum())
sig += 0.3 * np.sin(2 * np.pi * 440 * t) * (t > 0.1) + 0.15 * np.sin(2 * np.pi * 880 * t) * (t > 0.1)   # a held note
f_, t_, Z = stft(sig, fs=sr, nperseg=512, noverlap=384)
S = 20 * np.log10(np.abs(Z) + 1e-6)
fig = plt.figure(figsize=(6, 3.2), dpi=150); ax = fig.add_axes([0, 0, 1, 1]); ax.axis('off')
ax.imshow(S, origin='lower', aspect='auto', cmap='magma', vmin=S.max() - 70, vmax=S.max())
fig.savefig(P('audio', 'spectrogram.png')); plt.close(fig)
R['audio'] = {'sr': sr, 'seconds': 2.5, 'top5': top5(net, rgb(P('audio', 'spectrogram.png')))}

# ---------------- YOLO11n ----------------
from ultralytics import YOLO
import ultralytics
R['versions']['ultralytics'] = ultralytics.__version__
yolo = YOLO('yolo11n.pt')
layers, params, _, gflops = yolo.info(verbose=True)    # returns None when verbose=False
mm = yolo.model.model
nb = len(yolo.model.yaml['backbone'])
part = lambda ms: sum(p.numel() for m in ms for p in m.parameters())
R['yolo'] = {'layers': layers, 'params': params, 'gflops': round(gflops, 1), 'n_classes': len(yolo.names),
             'params_backbone': part(mm[:nb]), 'params_neck': part(mm[nb:-1]), 'params_head': part(mm[-1:]),
             'modules_backbone': nb, 'modules_neck': len(mm) - nb - 1}
raw = yolo.model(torch.zeros(1, 3, 640, 640))
R['yolo']['raw_candidates'] = int((raw[0] if isinstance(raw, (list, tuple)) else raw).shape[-1])

def detect(f, conf, key, draw=True):
    r = yolo(f, conf=conf, verbose=False)[0]
    H, Wd = r.orig_shape
    boxes = [{'label': r.names[int(c)], 'conf': round(float(s), 3),
              'xywhn': [round(v, 4) for v in [float(b[0]) / Wd, float(b[1]) / H, float(b[2] - b[0]) / Wd, float(b[3] - b[1]) / H]]}
             for b, c, s in zip(r.boxes.xyxy, r.boxes.cls, r.boxes.conf)]
    counts = {}
    for b in boxes: counts[b['label']] = counts.get(b['label'], 0) + 1
    if draw: Image.fromarray(r.plot(line_width=3, font_size=18)[..., ::-1]).save(P('yolo', key + '.jpg'), quality=90)
    return {'conf': conf, 'n': len(boxes), 'counts': counts, 'boxes': boxes, 'size': [Wd, H]}
R['yolo']['street'] = {str(c): detect(STREET, c, f'street-conf{int(c*100):02d}') for c in [0.1, 0.25, 0.6]}
R['yolo']['kampala-pipes'] = detect(P('photos', 'kampala-pipes.jpg'), 0.25, 'kampala-pipes')
R['yolo']['kampala-boda'] = detect(P('photos', 'kampala-boda.jpg'), 0.25, 'kampala-boda')
R['resnet']['top5_kampala_pipes'] = top5(net, rgb(P('photos', 'kampala-pipes.jpg')))

# ---------------- segmentation of the street (encoder-decoder, VOC labels) ----------------
from torchvision.models.segmentation import deeplabv3_resnet50, DeepLabV3_ResNet50_Weights
SW = DeepLabV3_ResNet50_Weights.COCO_WITH_VOC_LABELS_V1
seg = deeplabv3_resnet50(weights=SW).eval()
img = rgb(STREET)
out = seg(SW.transforms()(img).unsqueeze(0))['out'][0]
lab = torch.nn.functional.interpolate(out[None], size=img.size[::-1], mode='bilinear')[0].argmax(0).numpy()
names = SW.meta['categories']
pal = {'person': (217, 119, 6), 'car': (37, 99, 235), 'bus': (124, 58, 237), 'motorbike': (22, 163, 74),
       'bicycle': (220, 38, 38), 'train': (14, 116, 144)}
color = np.zeros((*lab.shape, 3), np.uint8)
for k, n in enumerate(names):
    if k and n in pal: color[lab == k] = pal[n]
    elif k: color[lab == k] = (100, 116, 139)
Image.fromarray(color).save(P('seg', 'street-mask.png'))
over = (0.45 * np.asarray(img) + 0.55 * color).astype(np.uint8)
over[lab == 0] = np.asarray(img)[lab == 0]
Image.fromarray(over).save(P('seg', 'street-overlay.jpg'), quality=90)
frac = {names[k]: round(float((lab == k).mean()), 4) for k in np.unique(lab)}
R['seg'] = {'model': 'deeplabv3_resnet50 COCO_WITH_VOC_LABELS_V1', 'classes': names, 'fractions': frac,
            'params': sum(p.numel() for p in seg.parameters()), 'size': list(img.size)}

# ---------------- U-Net (MONAI spleen bundle) ----------------
import monai
from monai.bundle import ConfigParser
R['versions']['monai'] = monai.__version__
bdir = os.path.join(args.bundle, 'spleen_ct_segmentation')
cfg = ConfigParser(); cfg.read_config(os.path.join(bdir, 'configs', 'inference.json'))
unet = cfg.get_parsed_content('network_def')
unet.load_state_dict(torch.load(os.path.join(bdir, 'models', 'model.pt'), map_location='cpu'))
unet.eval()
R['unet'] = {'params': sum(p.numel() for p in unet.parameters()), 'network_def': cfg.get('network_def'),
             'roi_size': cfg.get('inferer')['roi_size'] if 'roi_size' in cfg.get('inferer') else None,
             'bundle_version': json.load(open(os.path.join(bdir, 'configs', 'metadata.json')))['version']}
if args.spleen:
    from monai.inferers import sliding_window_inference
    from monai import transforms as T
    import glob
    val = sorted(glob.glob(os.path.join(args.spleen, 'imagesTr', 'spleen_*.nii.gz')))[-9:]   # the bundle's own validation split
    case = os.path.basename(val[0]).replace('.nii.gz', '')
    img_f = os.path.join(args.spleen, 'imagesTr', case + '.nii.gz'); lab_f = os.path.join(args.spleen, 'labelsTr', case + '.nii.gz')
    pre = T.Compose([T.LoadImaged(['image', 'label']), T.EnsureChannelFirstd(['image', 'label']),
                     T.Orientationd(['image', 'label'], 'RAS'), T.Spacingd(['image', 'label'], (1.5, 1.5, 2.0), mode=('bilinear', 'nearest')),
                     T.ScaleIntensityRanged('image', -57, 164, 0, 1, clip=True)])
    d = pre({'image': img_f, 'label': lab_f})
    pred = sliding_window_inference(d['image'][None], (96, 96, 96), 4, unet, overlap=0.5).argmax(1)[0].numpy()
    gt = d['label'][0].numpy() > 0
    z = int(np.argmax(gt.sum((0, 1))))
    inter = float((pred.astype(bool) & gt).sum()); dice = 2 * inter / (float(pred.astype(bool).sum()) + float(gt.sum()))
    view = lambda a: np.fliplr(np.rot90(a))          # radiological view: patient's left (spleen) on the image right
    sl = view(d['image'][0, :, :, z].numpy()); ps = view(pred[:, :, z]); gs = view(gt[:, :, z])
    for name, mask in [('ct-slice', None), ('ct-pred', ps), ('ct-truth', gs)]:
        rgbim = np.stack([sl] * 3, -1)
        if mask is not None: rgbim[mask.astype(bool)] = 0.45 * rgbim[mask.astype(bool)] + 0.55 * np.array([0.85, 0.47, 0.02])
        Image.fromarray((rgbim * 255).astype(np.uint8)).resize((sl.shape[1] * 2, sl.shape[0] * 2), Image.BILINEAR).save(P('unet', name + '.png'))
    R['unet']['case'] = {'id': case, 'split': 'validation (not trained on)', 'dice': round(dice, 3), 'slice': z, 'shape': list(pred.shape)}

json.dump(R, open(P('result.json'), 'w'), indent=1)
open(P('result.js'), 'w').write('/* made by pipeline.py: do not edit */\nconst D4 = ' + json.dumps(R) + ';\n')
print(json.dumps({k: v for k, v in R.items() if k != 'search'}, indent=1)[:6000])

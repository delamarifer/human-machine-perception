#!/usr/bin/env python3
"""Equivariance and (approximate) invariance with the same ResNet-18 as pipeline.py (ImageNet weights).

The bus from ../photos/street.jpg (its box from the YOLO run in ../result.json, conf 0.1, first 'bus') is
pasted on a 224 x 224 canvas of the ImageNet mean color and moved one pixel at a time, as in Azulay & Weiss
(2019). For every position: ResNet-18's top label and probability. For three positions: the canvas and one
conv1 feature map (after BN and ReLU), in gray. Writes bus-*.png, fm-*.png, chart.png and shift.json here.

    python3 shift.py         (needs torch, torchvision, pillow)
"""
import json, os
import numpy as np, torch
from PIL import Image, ImageDraw, ImageFont
from torchvision.models import resnet18, ResNet18_Weights

HERE = os.path.dirname(os.path.abspath(__file__)); P = lambda *a: os.path.join(HERE, *a)
torch.set_grad_enabled(False)
W = ResNet18_Weights.IMAGENET1K_V1; cats = W.meta['categories']
net = resnet18(weights=W).eval()
norm = lambda im: ((torch.from_numpy(np.asarray(im, np.float32) / 255) - torch.tensor([.485, .456, .406])) / torch.tensor([.229, .224, .225])).permute(2, 0, 1)[None]

street = Image.open(P('..', 'photos', 'street.jpg')).convert('RGB')
R = json.load(open(P('..', 'result.json')))
box = next(b for b in R['yolo']['street']['0.1']['boxes'] if b['label'] == 'bus')['xywhn']
Wd, H = street.size
bus = street.crop((round(box[0] * Wd), round(box[1] * H), round((box[0] + box[2]) * Wd), round((box[1] + box[3]) * H)))
BW = 140; bus = bus.resize((BW, round(BW * bus.height / bus.width)), Image.LANCZOS)
MEAN = (124, 116, 104)
def canvas(x):
    c = Image.new('RGB', (224, 224), MEAN); c.paste(bus, (x, (224 - bus.height) // 2)); return c

xs = list(range(0, 224 - BW + 1))
rows = []
for x in xs:
    p = net(norm(canvas(x))).softmax(-1)[0]
    k = int(p.argmax()); rows.append({'x': x, 'label': cats[k], 'p': round(float(p[k]), 4), 'p_all': p})
main = max(set(r['label'] for r in rows), key=[r['label'] for r in rows].count)
ki = cats.index(main)
for r in rows: r['p_main'] = round(float(r.pop('p_all')[ki]), 4)

# three positions: canvas and the most active conv1 channel at the middle one
show = [8, 42, 76]                                             # left, middle, right
stem = torch.nn.Sequential(net.conv1, net.bn1, net.relu)
fm = {x: stem(norm(canvas(x)))[0] for x in show}
ch = int(fm[show[1]].mean((1, 2)).argmax())
hi = max(float(fm[x][ch].max()) for x in show)
for j, x in enumerate(show):
    canvas(x).save(P(f'bus-{j}.png'))
    m = (fm[x][ch].numpy() / hi).clip(0, 1)
    Image.fromarray((255 * (1 - m)).astype(np.uint8)).resize((224, 224), Image.NEAREST).save(P(f'fm-{j}.png'))

# chart: probability of the main label at every position
CW, CH, pad = 900, 300, 50
img = Image.new('RGB', (CW, CH), 'white'); d = ImageDraw.Draw(img)
try: f = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 22)
except OSError: f = ImageFont.load_default()
X = lambda x: pad + (x - xs[0]) / (xs[-1] - xs[0]) * (CW - 2 * pad); Y = lambda v: CH - pad - v * (CH - 2 * pad)
d.line([(pad, pad), (pad, CH - pad), (CW - pad, CH - pad)], fill='#94a3b8', width=2)
d.line([(X(r['x']), Y(r['p_main'])) for r in rows], fill='#0f172a', width=4, joint='curve')
d.text((pad + 8, pad - 30), f'p("{main}")', fill='#64748b', font=f)
d.text((pad - 30, CH - pad - 12), '0', fill='#64748b', font=f); d.text((pad - 30, pad - 12), '1', fill='#64748b', font=f)
d.text((CW / 2 - 120, CH - pad + 12), 'position of the bus (pixels)', fill='#64748b', font=f)
img.save(P('chart.png'))

ps = [r['p_main'] for r in rows]
jumps = [abs(a - b) for a, b in zip(ps, ps[1:])]
out = {'box_xywhn': box, 'bus_width': BW, 'positions': len(xs), 'main_label': main, 'shown_positions': show, 'conv1_channel': ch,
       'n_main_top1': sum(r['label'] == main for r in rows), 'labels': sorted(set(r['label'] for r in rows)),
       'p_main_min': min(ps), 'p_main_max': max(ps), 'largest_one_pixel_change': round(max(jumps), 4),
       'shown': [next(r for r in rows if r['x'] == x) for x in show], 'rows': rows}
json.dump(out, open(P('shift.json'), 'w'), indent=1)
print({k: v for k, v in out.items() if k != 'rows'})

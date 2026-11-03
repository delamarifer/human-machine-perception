"""Texture or shape? ResNet-18 (IMAGENET1K_V1) on a photo's 224 x 224 crop (the same OpenCV crop as pipeline.py),
   intact and with its patches shuffled: shape destroyed, texture kept. Fixed seed, so the shuffles repeat.
   Usage: python shuffle.py <photo> <out_dir> <class to track>
   Writes intact.png, shuffled-4.png, shuffled-8.png (the images the model saw) and result.json."""
import sys, os, json, numpy as np, cv2, torch
from torchvision.models import resnet18, ResNet18_Weights
src, out, TARGET = sys.argv[1], sys.argv[2], sys.argv[3]; os.makedirs(out, exist_ok=True)
w = ResNet18_Weights.IMAGENET1K_V1; model = resnet18(weights=w).eval(); cats = w.meta['categories']
MEAN, STD = torch.tensor([0.485, 0.456, 0.406])[:, None, None], torch.tensor([0.229, 0.224, 0.225])[:, None, None]

img = cv2.cvtColor(cv2.imread(src), cv2.COLOR_BGR2RGB)          # exactly as pipeline.py
h, w_ = img.shape[:2]; s = min(h, w_); y0, x0 = (h - s) // 2, (w_ - s) // 2
crop = cv2.resize(img[y0:y0 + s, x0:x0 + s], (224, 224), interpolation=cv2.INTER_AREA)

def shuffle(a, n, seed=0):
    k = a.shape[0] // n
    tiles = [a[r*k:(r+1)*k, c*k:(c+1)*k] for r in range(n) for c in range(n)]
    order = np.random.default_rng(seed).permutation(len(tiles))
    return np.concatenate([np.concatenate([tiles[order[r*n + c]] for c in range(n)], axis=1) for r in range(n)], axis=0)

def run(a):
    x = ((torch.from_numpy(a.copy()).permute(2, 0, 1).float() / 255 - MEAN) / STD).unsqueeze(0)
    with torch.no_grad(): p = model(x).softmax(1)[0]
    v, i = p.topk(5); order = p.argsort(descending=True).tolist(); t = cats.index(TARGET)
    return {'top5': [[cats[j], round(float(q), 4)] for q, j in zip(v, i)], TARGET: [order.index(t) + 1, round(float(p[t]), 4)]}

res = {'model': 'torchvision resnet18, ResNet18_Weights.IMAGENET1K_V1', 'torch': torch.__version__, 'opencv': cv2.__version__,
       'source': os.path.basename(src), 'seed': 0, 'tracked': TARGET + ' as [rank, probability]'}
for name, a in [('intact', crop), ('shuffled-4', shuffle(crop, 4)), ('shuffled-8', shuffle(crop, 8))]:
    cv2.imwrite(f'{out}/{name}.png', cv2.cvtColor(a, cv2.COLOR_RGB2BGR)); res[name] = run(a)
    print(name, res[name]['top5'][:3], TARGET, res[name][TARGET])
json.dump(res, open(f'{out}/result.json', 'w'), indent=1)

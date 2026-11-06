#!/usr/bin/env python3
"""The full softmax of ResNet-18 (ImageNet weights, as in pipeline.py) over its 1,000 labels, for the
spectrogram (../audio/spectrogram.png) and, for comparison, the street photo (../photos/street.jpg).
Writes softmax.json (both distributions, ranked) for the 'A probability is not a confidence' slide.

    python3 softmax.py       (needs torch, torchvision, pillow)
"""
import json, os, torch
from PIL import Image
from torchvision.models import resnet18, ResNet18_Weights
HERE = os.path.dirname(os.path.abspath(__file__)); P = lambda *a: os.path.join(HERE, *a)
torch.set_grad_enabled(False)
W = ResNet18_Weights.IMAGENET1K_V1; tf, cats = W.transforms(), W.meta['categories']
net = resnet18(weights=W).eval()
def ranked(f):
    p = net(tf(Image.open(f).convert('RGB')).unsqueeze(0)).softmax(-1)[0]
    v, i = p.sort(descending=True)
    return [{'label': cats[k], 'p': round(float(x), 6)} for x, k in zip(v, i)]
out = {'spectrogram': ranked(P('..', 'audio', 'spectrogram.png')), 'street': ranked(P('..', 'photos', 'street.jpg'))}
json.dump(out, open(P('softmax.json'), 'w'))
for k, r in out.items():
    print(k, r[:5], 'sum', round(sum(q['p'] for q in r), 4), 'labels above 1%:', sum(q['p'] > .01 for q in r))

# one ranked bar chart per image: the 20 most probable labels, the rest summed in the caption
TOP, CW, CH, L, B = 20, 900, 460, 60, 64
for k, r in out.items():
    bw = (CW - L - 20) / TOP; Y = lambda p: CH - B - p * (CH - B - 40)
    s = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {CW} {CH}" font-family="Helvetica, Arial, sans-serif" font-size="34">',
         f'<line x1="{L}" y1="40" x2="{L}" y2="{CH - B}" stroke="#94a3b8" stroke-width="2"/>',
         f'<line x1="{L}" y1="{CH - B}" x2="{CW - 10}" y2="{CH - B}" stroke="#94a3b8" stroke-width="2"/>',
         f'<text x="{L - 12}" y="{Y(1) + 7}" text-anchor="end" fill="#64748b">1</text>',
         f'<text x="{L - 12}" y="{Y(0) + 7}" text-anchor="end" fill="#64748b">0</text>',
         f'<text x="{(L + CW) / 2}" y="{CH - 15}" text-anchor="middle" fill="#64748b">top 20 of 1,000 labels, ranked</text>']
    for j, q in enumerate(r[:TOP]):
        x = L + 6 + j * bw
        s.append(f'<rect x="{x:.1f}" y="{Y(q["p"]):.1f}" width="{bw - 6:.1f}" height="{Y(0) - Y(q["p"]):.1f}" fill="{"#0f172a" if j == 0 else "#94a3b8"}"/>')
        if j < 2:
            s.append(f'<text x="{x:.1f}" y="{Y(q["p"]) - 10:.1f}" fill="#0f172a">{q["label"]} {round(100 * q["p"])}%</text>')
    s.append('</svg>')
    open(P(f'{k}.svg'), 'w').write('\n'.join(s))
    print(k, 'rest beyond top', TOP, round(1 - sum(q['p'] for q in r[:TOP]), 4))

"""Figures for metamers.html. Run: python make_figures.py <crop.jpg> <cone_csv>

<crop.jpg>  day02/assets/one-photo/crop.jpg (Shixart1985, CC BY 2.0; see SOURCES.md)
<cone_csv>  Stockman & Sharpe (2000) 2-deg cone fundamentals, linear energy, 5 nm:
            http://www.cvrl.org/database/data/cones/linss2_10e_5.csv

Writes coffee.jpg (the photo), coffee-pixels.jpg (pixels shuffled: same histogram),
coffee-spectrum.jpg (phase scrambled: same amplitude spectrum) and cones.json (L, M, S at 5 nm)."""
import json, sys
import numpy as np
from PIL import Image

crop, cones = sys.argv[1], sys.argv[2]
rng = np.random.default_rng(0)
img = Image.open(crop).convert('RGB').resize((320, 320), Image.LANCZOS)
x = np.asarray(img).astype(float)
img.save('coffee.jpg', quality=90)

# 1. Same pixels, shuffled: identical histogram (first-order statistics).
flat = x.reshape(-1, 3)
Image.fromarray(flat[rng.permutation(len(flat))].reshape(x.shape).astype(np.uint8)).save('coffee-pixels.jpg', quality=90)

# 2. Same amplitude spectrum, random phase (second-order statistics); one phase for all channels.
phase = np.angle(np.fft.fft2(rng.standard_normal(x.shape[:2])))
out = np.empty_like(x)
for c in range(3):
    F = np.fft.fft2(x[..., c])
    o = np.real(np.fft.ifft2(np.abs(F) * np.exp(1j * phase)))
    out[..., c] = (o - o.mean()) / o.std() * x[..., c].std() + x[..., c].mean()   # keep each channel's mean and contrast
Image.fromarray(np.clip(out, 0, 255).astype(np.uint8)).save('coffee-spectrum.jpg', quality=90)

# 3. Cone fundamentals for the color mixer, 390-780 nm.
d = np.nan_to_num(np.genfromtxt(cones, delimiter=','))
d = d[d[:, 0] <= 780]
json.dump({'wl': d[:, 0].astype(int).tolist(), 'L': d[:, 1].round(5).tolist(),
           'M': d[:, 2].round(5).tolist(), 'S': d[:, 3].round(5).tolist()}, open('cones.json', 'w'))

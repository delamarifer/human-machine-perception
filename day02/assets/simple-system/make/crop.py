import sys
import numpy as np
from PIL import Image
src, dst = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGB"); a = np.asarray(im).astype(int)
ink = (a < 245).any(axis=2)               # any pixel that is not near-white
ys, xs = np.nonzero(ink); pad = 12
box = (max(xs.min()-pad, 0), max(ys.min()-pad, 0), min(xs.max()+pad+1, a.shape[1]), min(ys.max()+pad+1, a.shape[0]))
im.crop(box).save(dst, optimize=True); print(dst, box, im.crop(box).size)

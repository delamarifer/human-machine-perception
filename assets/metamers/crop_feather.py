"""Crop panel d (example metamers, standard vs adversarially trained) from Feather et al. 2023,
Figs. 4 and 5 (Nature Neuroscience, CC BY 4.0). Panel edges are found from the pixels: the figure is
split into blocks at fully white row bands, and panel d is the block that holds the thumbnail grid
(rows with several long dark horizontal border runs)."""
import sys
import numpy as np
from PIL import Image

def blocks(a, min_gap=12):
    white = (a > 245).all(axis=(1, 2))
    out, start, gap = [], None, 0
    for y, w in enumerate(white):
        if not w:
            if start is None: start = y
            gap = 0
        elif start is not None:
            gap += 1
            if gap >= min_gap: out.append((start, y - gap + 1)); start, gap = None, 0
    if start is not None: out.append((start, len(white)))
    return out

def border_rows(a, min_len):
    """For each row, how many separate dark runs longer than min_len (thumbnail top or bottom borders)."""
    dark = (a < 60).all(axis=2)
    counts = []
    for row in dark:
        d = np.diff(np.concatenate([[0], row.astype(int), [0]]))
        starts, ends = np.where(d == 1)[0], np.where(d == -1)[0]
        counts.append(int(((ends - starts) > min_len).sum()))
    return np.array(counts)

for src, out in [('feather2023-fig4.png', 'feather2023-fig4d.jpg'), ('feather2023-fig5.png', 'feather2023-fig5d.jpg')]:
    im = Image.open(src).convert('RGB'); a = np.asarray(im)
    counts = border_rows(a, a.shape[1] // 14)    # a thumbnail is wider than 1/14 of the figure
    grid = np.where(counts >= 6)[0]               # panel d rows hold 8 thumbnails side by side
    y0, y1 = grid.min(), grid.max()               # top border of first tile row, bottom of last
    bl = blocks(a)
    # panel d = the white-separated blocks from the one just above the grid (title + column labels) to the grid's end
    first = max(i for i, (s, e) in enumerate(bl) if s <= y0)
    top = bl[first - 1][0] if bl[first][0] > y0 - 40 and first > 0 else bl[first][0]
    bottom = min(e for s, e in bl if e >= y1)
    nxt = [(s, e) for s, e in bl if bottom < s < bottom + 40 and e - s < 80]   # an axis label just below
    if nxt: bottom = nxt[0][1]
    crop = im.crop((0, top, im.width, bottom + 4))
    crop.thumbnail((1600, 1600), Image.LANCZOS)
    crop.save(out, quality=88)
    print(src, 'grid', y0, y1, 'crop', top, bottom, '->', crop.size)

import sys, nbformat, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt, numpy as np
from scipy import ndimage
nb = nbformat.read(sys.argv[1], as_version=4); out = sys.argv[2]
plt.show = lambda *a, **k: plt.close("all")
g = {"__name__": "__main__"}
for c in nb.cells:
    if c.cell_type != "code": continue
    src = "\n".join(l for l in c.source.splitlines() if not l.lstrip().startswith(("%", "!")))
    if "run_system(floating_world" in src: src = src.replace('run_system(floating_world, "a floating box")', "")
    exec(compile(src, "cell", "exec"), g)
G = g; image, figure, edges = G["image"], G["figure"], G["edges"]
print("point1", G["point1"], "point2", G["point2"], "theta deg", np.degrees(G["theta"]))
# edge causes: outline = edge pixels within 2 px of the figure/ground border; folds = the other edge pixels
border = figure ^ ndimage.binary_erosion(figure)
border |= (~figure) & ndimage.binary_dilation(figure)
near = ndimage.binary_dilation(border, iterations=2)
outline = edges & near; fold = edges & ~near
print("edge px", edges.sum(), "outline", outline.sum(), "fold", fold.sum())
def save(arr, name):
    plt.imsave(f"{out}/{name}.png", np.kron(arr, np.ones((4, 4, 1))).clip(0, 1))
for name, a, b in [("edges-outline", outline, fold), ("edges-fold", fold, outline)]:
    s = np.ones(image.shape); s[b] = 0.82; s[a] = 0.08; save(s, name)
# patch: center of the largest flat face (eroded region of constant color inside the figure)
gray = image.mean(axis=2); flat = figure & (np.hypot(*G["sobel"](gray)) < 1e-6)
lab, n = ndimage.label(ndimage.binary_erosion(flat, iterations=6)); sizes = ndimage.sum(np.ones_like(gray), lab, range(1, n+1))
k = 1 + int(np.argmax(sizes)); cy, cx = [int(round(v)) for v in ndimage.center_of_mass(lab == k)]
h = 6; print("patch center", cy, cx, "face size", sizes.max())
save(image[cy-h:cy+h, cx-h:cx+h], "patch-alone")
ctx = image.copy(); r0, r1, c0, c1 = cy-h-1, cy+h, cx-h-1, cx+h
for t in range(1):
    ctx[r0, c0:c1+1] = 0; ctx[r1, c0:c1+1] = 0; ctx[r0:r1+1, c0] = 0; ctx[r0:r1+1, c1] = 0
save(ctx, "patch-context")
# accidental view: the notebook's world with every box turned to angle 0 (YOUR TURN 6 suggests this)
mb, R = G["make_box"], G["render"]
acc = [mb(-55, 25, 40, 45, 40, 0, G["RED"]), mb(25, 0, 30, 70, 30, 0, G["GREEN"]), mb(70, 55, 45, 18, 30, 0, G["BLUE"])]   # WORLD, angles set to 0
img, Yt, Zt = R(acc); gr = img.mean(axis=2); gx, gy = G["sobel"](gr); e = np.hypot(gx, gy) > 0.03
fm = (img.max(axis=2) - img.min(axis=2)) > 0.15
vert = e & (np.abs(np.sin(np.arctan2(gy, gx))) < np.sin(np.deg2rad(15)))
cont = fm.copy(); cont[:-1] &= ~fm[1:]
Yr, Zr = G["reconstruct"](fm, e, vert, cont, gx, gy)
s = np.ones(img.shape); s[e] = (0.2, 0.3, 0.9); s[vert] = (0.9, 0.2, 0.2)
save(img, "accidental-image"); save(s, "accidental-labels")
for nm, YY in [("acc", None)]:
    pass
m = fm
print("accidental: true max", Yt.max(), "recovered max", Yr[m].max(), "mean abs err on boxes", np.abs(Yr - Yt)[m].mean())
print("WORLD", [ (b if not hasattr(b,'keys') else dict(b)) for b in []])
fig, axes = plt.subplots(1, 2, figsize=(10, 3.6))
axes[0].imshow(Yr, cmap="viridis", vmin=0, vmax=Yt.max()); axes[0].set_title("recovered height Y")
axes[1].imshow(Yt, cmap="viridis", vmin=0, vmax=Yt.max()); axes[1].set_title("true height Y")
for ax in axes: ax.axis("off")
fig.savefig(f"{out}/accidental-heights.png", dpi=150, bbox_inches="tight")
lab, n = ndimage.label(fm)
for i in range(1, n+1):
    r = lab == i; col = img[r].mean(axis=0).round(2)
    print("box", i, "color", col, "true top", round(Yt[r].max(), 1), "recovered top", round(Yr[r].max(), 1))

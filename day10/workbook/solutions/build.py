"""Build the Day 10 workbook in two versions (owner: Shreya).

    python3 day10/workbook/solutions/build.py

Student version  -> day10/workbook/mini-machine-hallucination.ipynb
Solution version -> day10/workbook/solutions/mini-machine-hallucination-solutions.ipynb

Same conventions as day09/workbook/solutions/build.py. In a code cell, a block between
    #>> TODO n: what to write
    ...solution lines...
    #<<
becomes, in the student version, the TODO line plus `raise NotImplementedError(...)` at the same indentation.
Cells made with `sol(...)` appear only in the solution version (teacher notes: what to expect per card).
"""
import re
from pathlib import Path
import nbformat as nbf

ROOT = Path(__file__).resolve().parents[3]
OUT_STUDENT = ROOT / "day10" / "workbook"
OUT_SOLUTION = Path(__file__).resolve().parent
NAME = "mini-machine-hallucination"

md = lambda s: ("md", s.strip("\n"))
code = lambda s: ("code", s.strip("\n"))
sol = lambda s: ("sol", s.strip("\n"))

MARK = re.compile(r"^(?P<ind>[ \t]*)#>> TODO(?P<n> \d+)?: (?P<msg>.*)$")


def render(src, solution):
    out, i, lines = [], 0, src.split("\n")
    while i < len(lines):
        m = MARK.match(lines[i])
        if not m:
            out.append(lines[i]); i += 1; continue
        ind, n, msg = m.group("ind"), (m.group("n") or "").strip(), m.group("msg")
        label = f"TODO {n}" if n else "TODO"
        j = i + 1
        while lines[j].strip() != "#<<":
            j += 1
        out.append(f"{ind}# {label}: {msg}")
        if solution:
            out.extend(lines[i + 1:j])
        else:
            out.append(f'{ind}raise NotImplementedError("{label}: {msg}")')
        i = j + 1
    return "\n".join(out)


def write(cells, name=NAME):
    for solution in (False, True):
        nb = nbf.v4.new_notebook(metadata={"kernelspec": {"display_name": "Python 3", "language": "python", "name": "python3"},
                                           "language_info": {"name": "python"}})
        for kind, src in cells:
            if kind == "sol" and not solution:
                continue
            if kind in ("md", "sol"):
                if kind == "md" and solution and src.startswith("# "):
                    src = src.replace("\n", "\n\n> **Solutions.** Teacher copy, with the TODOs filled in and notes on what each card should find.\n", 1)
                nb.cells.append(nbf.v4.new_markdown_cell(src))
            else:
                nb.cells.append(nbf.v4.new_code_cell(render(src, solution)))
        path = (OUT_SOLUTION / f"{name}-solutions.ipynb") if solution else (OUT_STUDENT / f"{name}.ipynb")
        for i, c in enumerate(nb.cells):
            c.id = f"c{i:03d}"
        path.parent.mkdir(parents=True, exist_ok=True)
        nbf.write(nb, path)
        print("wrote", path.relative_to(ROOT))


CELLS = [
md(r"""
# A Mini Machine Hallucination

**Day 10 · Human and Machine Perception**

Refik Anadol's *Machine Hallucination* took over 100 million photos of New York, removed every photo with a person in it, trained a StyleGAN on the 9.5 million that were left, and turned walks through its latent space into a film the size of a room.

Today you build the same pipeline at toy scale. It runs on a CPU in a few minutes.

| Stage | Anadol, NYC | This notebook |
|---|---|---|
| **Data** | over 100M public photos of New York | Fashion-MNIST: 60,000 small clothing images, our "archive" |
| **Curate** | an algorithm removes photos with people | a classifier removes the classes we choose |
| **Represent** | an embedding of every photo, a map of the city | the classifier's features, mapped with t-SNE |
| **Generate** | StyleGAN | a small GAN, the one from the Day 9 workbook |
| **Render** | smooth walks through the latent space | a latent walk saved as a GIF, optionally steered by a "sensor" |
| **Display** | projected across the walls of a room | the GIF warped onto a wall with a homography |

**How to use it:** run the cells top to bottom. When a cell stops with `NotImplementedError`, that is a **TODO** for you. Write the missing lines where the `# TODO` comment is, delete the `raise` line, and run the cell again. The check right after each TODO tells you if it works.

| TODO | Stage | What you write |
|---|---|---|
| 1 | Curate | which images to keep, from the classifier's probabilities |
| 2 | Render | spherical interpolation (slerp) between two latent vectors |
| 3 | Render | steering the walk with a sensor signal |
| 4 | Display | where a homography sends one point |
"""),
md(r"""
## Your group's card

Every group runs the whole pipeline once with the default knobs. Then you change **only the knobs on your card**, re-run from the cell your card names, and compare.

| Card | Constraint | Knobs to change | Re-run from |
|---|---|---|---|
| A | **"We only have 200 images."** | `N_IMAGES = 200`, then also `AUGMENT = True` | Stage 4 |
| B | **"Curate it differently."** | `REMOVE` (try removing 9 of the 10 classes, so only one is left) | Stage 2 |
| C | **"Make it flow."** | `WALK = "linear"` vs `"slerp"`, `FRAMES_PER_STEP` | Stage 5 |
| D | **"It must react to the room."** | `SENSOR = "weather"` or `"clock"`, `ALPHA` | Stage 5 |
| E | **"Put it on the wall."** | `WALL` (the four corners of the screen in the room) | Stage 6 |
| F | **"Trust the judge?"** | `TAU` (how sure the filter must be before it removes an image) | Stage 2 |

**Before you run anything,** write your card's stage as math or pseudocode on paper. At the end you show the class two things: **your GIF and your equation**.
"""),
code(r"""
# ---- Knobs. Your card says which ones to change. ----
REMOVE = ["Ankle boot", "Sneaker", "Sandal"]   # classes to remove from the archive ("no people" in Anadol's NYC)
TAU = 0.5                 # remove an image if the classifier gives the removed classes more than this probability
N_IMAGES = None           # None = use every image that survives curation; or a number, e.g. 2000
AUGMENT = False           # random flips and shifts on what the discriminator sees (the idea behind StyleGAN2-ADA)
GAN_STEPS = 4000          # training steps for the GAN (about 35 s on a CPU)
WALK = "slerp"            # "linear" or "slerp"
N_KEYFRAMES = 6           # how many random points the walk visits before it loops
FRAMES_PER_STEP = 12      # frames between two keyframes (more = slower, smoother)
SENSOR = None             # None, "weather" or "clock"
ALPHA = 1.5               # how strongly the sensor pushes the walk
WALL = [[150, 70], [500, 40], [520, 290], [140, 260]]   # screen corners in the room picture: top-left, top-right, bottom-right, bottom-left (x, y)
SEED = 0
"""),
md(r"""
## Setup

Needs `torch`, `torchvision`, `scikit-learn`, `opencv` and `matplotlib`, which Colab already has. Fashion-MNIST downloads into `data/` the first time (a few seconds).
"""),
code(r"""
import io, time
import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F
import matplotlib.pyplot as plt
import cv2
from PIL import Image
from torchvision import datasets
from sklearn.manifold import TSNE
from IPython.display import Image as ShowImage, display

device = "cpu"            # everything here is small enough for a CPU
torch.manual_seed(SEED); np.random.seed(SEED)

CLASSES = ["T-shirt", "Trouser", "Pullover", "Dress", "Coat", "Sandal", "Shirt", "Sneaker", "Bag", "Ankle boot"]
assert all(c in CLASSES for c in REMOVE), f"REMOVE must use these names: {CLASSES}"

def show_grid(x, title, n_row=2):
    x = (x.view(-1, 28, 28) + 1) / 2
    per = x.shape[0] // n_row
    grid = torch.cat([torch.cat(list(x[r * per:(r + 1) * per]), dim=1) for r in range(n_row)], dim=0)
    plt.figure(figsize=(per * 0.7, n_row * 0.7)); plt.imshow(grid, cmap="gray"); plt.axis("off"); plt.title(title); plt.show()

def save_gif(frames, path, ms=60):
    # frames: a list of uint8 arrays, H x W (gray) or H x W x 3 (color)
    imgs = [Image.fromarray(f) for f in frames]
    imgs[0].save(path, save_all=True, append_images=imgs[1:], duration=ms, loop=0)
    display(ShowImage(filename=path))
    print("saved", path, f"({len(frames)} frames)")
"""),
md(r"""
---
## Stage 1 · Data: the archive

60,000 images, 28 × 28 pixels, scaled to [-1, 1]. Anadol's archive came with no labels. Ours has labels, but **we only use them to check our work**, never to build the pipeline.
"""),
code(r"""
fmnist = datasets.FashionMNIST("data", train=True, download=True)
X_all = fmnist.data.view(-1, 28 * 28).float() / 127.5 - 1
y_all = fmnist.targets.clone()
print("archive:", tuple(X_all.shape))
show_grid(X_all[torch.randperm(len(X_all))[:20]], "A random look at the archive")
"""),
md(r"""
---
## Stage 2 · Curate: remove what we do not want

Anadol's team removed every photo with a person in it. They could not check 113 million photos by hand, so **a model decided**. We do the same: train a small classifier, then let it remove the classes in `REMOVE`.

For an image $x$, the classifier gives a probability for each class, $p(c \mid x)$. The probability that $x$ belongs to a class we want removed is

$$p_\text{remove}(x) = \sum_{c \,\in\, \text{REMOVE}} p(c \mid x)$$

and we **keep** $x$ when $p_\text{remove}(x) < \tau$ (`TAU`).
"""),
code(r"""
class Classifier(nn.Module):
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(nn.Linear(28 * 28, 256), nn.ReLU(), nn.Linear(256, 128), nn.ReLU())
        self.head = nn.Linear(128, len(CLASSES))
    def forward(self, x):
        return self.head(self.features(x))

torch.manual_seed(SEED)
clf = Classifier()
opt = torch.optim.Adam(clf.parameters(), lr=1e-3)
t0 = time.time()
for epoch in range(2):
    for idx in torch.randperm(len(X_all)).split(128):
        loss = F.cross_entropy(clf(X_all[idx]), y_all[idx])
        opt.zero_grad(); loss.backward(); opt.step()
clf.eval()
with torch.no_grad():
    probs = F.softmax(clf(X_all), dim=1)          # 60000 x 10
acc = (probs.argmax(1) == y_all).float().mean().item()
print(f"classifier trained in {time.time() - t0:.0f} s, accuracy {acc:.1%} (it is not perfect, just like Anadol's filter)")
"""),
code(r"""
remove_idx = [CLASSES.index(c) for c in REMOVE]
#>> TODO 1: keep = a boolean tensor, True where the summed probability of the REMOVE classes is below TAU
p_remove = probs[:, remove_idx].sum(dim=1)
keep = p_remove < TAU
#<<
assert keep.dtype == torch.bool and keep.shape == (len(X_all),), "keep must be one True/False per image"

is_unwanted = torch.isin(y_all, torch.tensor(remove_idx))
leaked = (keep & is_unwanted).sum().item()
lost = (~keep & ~is_unwanted).sum().item()
print(f"kept {keep.sum().item():,} of {len(X_all):,} images")
print(f"leaked: {leaked:,} unwanted images got through the filter")
print(f"lost:   {lost:,} good images were removed by mistake")
assert keep.sum() > 0, "the filter removed everything: check TODO 1"
print("TODO 1 works." if leaked < 0.2 * is_unwanted.sum() else "Many unwanted images got through: check TODO 1.")

X, y = X_all[keep], y_all[keep]
if N_IMAGES is not None:
    pick = torch.randperm(len(X), generator=torch.Generator().manual_seed(SEED))[:N_IMAGES]
    X, y = X[pick], y[pick]
print("the GAN will train on", len(X), "images")
if leaked:
    show_grid(X_all[keep & is_unwanted][:10], "Leaked: unwanted images the filter missed", n_row=1)
"""),
md(r"""
---
## Stage 3 · Represent: a map of the archive

The classifier's last hidden layer gives each image a 128-number embedding, $z = f(x)$. t-SNE squeezes those 128 numbers down to 2, so that images with similar embeddings land near each other (Day 5). This is the kind of "map of the data" that Anadol often shows.
"""),
code(r"""
sub = torch.randperm(len(X), generator=torch.Generator().manual_seed(SEED))[:2000]
with torch.no_grad():
    Z_emb = clf.features(X[sub]).numpy()
t0 = time.time()
xy = TSNE(n_components=2, init="pca", perplexity=30, random_state=SEED).fit_transform(Z_emb)
print(f"t-SNE in {time.time() - t0:.0f} s")

plt.figure(figsize=(6, 5))
for c in sorted(set(y[sub].tolist())):
    m = (y[sub] == c).numpy()
    plt.scatter(xy[m, 0], xy[m, 1], s=4, label=CLASSES[c])
plt.legend(markerscale=3, fontsize=8, loc="best"); plt.axis("off")
plt.title("The curated archive, mapped by its embeddings (colors from the labels, only to check)"); plt.show()
"""),
md(r"""
---
## Stage 4 · Generate: train the GAN

The same GAN as the Day 9 workbook. It plays the min-max game

$$\min_G \max_D \; \mathbb{E}_{x}\big[\log D(x)\big] + \mathbb{E}_{z}\big[\log\big(1 - D(G(z))\big)\big]$$

**Augmentation (card A).** With little data, the discriminator can memorize the real images, and then the generator stops learning. StyleGAN2-ADA's fix: randomly flip and shift *everything* the discriminator sees, real and fake alike, so memorizing gets harder. ADA tunes how often it augments as it trains; we use a fixed setting.
"""),
code(r"""
def augment(x):
    # random horizontal flip and a random shift of up to 2 pixels, applied the same way to real and fake images
    x = x.view(-1, 1, 28, 28)
    flip = torch.rand(x.shape[0], 1, 1, 1) < 0.5
    x = torch.where(flip, x.flip(3), x)
    dx, dy = np.random.randint(-2, 3, size=2)
    x = torch.roll(x, shifts=(int(dy), int(dx)), dims=(2, 3))
    return x.view(-1, 28 * 28)

ZDIM = 64
def make_gan():
    G = nn.Sequential(nn.Linear(ZDIM, 256), nn.BatchNorm1d(256), nn.LeakyReLU(0.2),
                      nn.Linear(256, 512), nn.BatchNorm1d(512), nn.LeakyReLU(0.2),
                      nn.Linear(512, 28 * 28), nn.Tanh())
    D = nn.Sequential(nn.Linear(28 * 28, 512), nn.LeakyReLU(0.2),
                      nn.Linear(512, 256), nn.LeakyReLU(0.2),
                      nn.Linear(256, 1))
    return G, D

torch.manual_seed(SEED)
G, D = make_gan()
opt_G = torch.optim.Adam(G.parameters(), lr=5e-4, betas=(0.5, 0.999))
opt_D = torch.optim.Adam(D.parameters(), lr=5e-4, betas=(0.5, 0.999))
bce = nn.BCEWithLogitsLoss()
aug = augment if AUGMENT else (lambda x: x)
fixed_z = torch.randn(20, ZDIM)
B = 64
t0 = time.time()
for step in range(1, GAN_STEPS + 1):
    x = X[torch.randint(0, len(X), (B,))]
    ones, zeros = torch.ones(B, 1), torch.zeros(B, 1)
    fake = G(torch.randn(B, ZDIM)).detach()
    loss_D = bce(D(aug(x)), ones) + bce(D(aug(fake)), zeros)
    opt_D.zero_grad(); loss_D.backward(); opt_D.step()
    loss_G = bce(D(aug(G(torch.randn(B, ZDIM)))), ones)
    opt_G.zero_grad(); loss_G.backward(); opt_G.step()
    if step % 500 == 0:
        print(f"step {step}: D loss {loss_D.item():.2f}, G loss {loss_G.item():.2f}")
print(f"GAN trained in {time.time() - t0:.0f} s on {len(X):,} images, augment={AUGMENT}")
G.eval()
with torch.no_grad():
    show_grid(G(fixed_z), "Samples from the GAN")
"""),
md(r"""
### Report card: what did the GAN learn to make?

We ask the classifier to sort 1,000 generated images into the classes. This is how many image-generation metrics work: **one model judges another**. It is fast, but the judge has its own blind spots (card F).
"""),
code(r"""
with torch.no_grad():
    gen = G(torch.randn(1000, ZDIM))
    gen_cls = clf(gen).argmax(1)
share = torch.bincount(gen_cls, minlength=len(CLASSES)).float() / len(gen_cls)
covered = int((share >= 0.02).sum())
removed_share = share[remove_idx].sum().item()

plt.figure(figsize=(8, 2.5))
plt.bar(CLASSES, share.numpy()); plt.xticks(rotation=45, ha="right"); plt.ylabel("share of samples")
plt.title(f"Generated images by class: {covered} classes covered, {removed_share:.1%} from removed classes"); plt.show()
print(f"{covered} classes covered; {removed_share:.1%} of samples look like a removed class")
"""),
md(r"""
### Did it make something new, or copy? (card A)

For each generated image, find the closest image in the training set (smallest pixel distance). If the GAN memorized its data, the two rows will match almost exactly.
"""),
code(r"""
torch.manual_seed(SEED + 1)
with torch.no_grad():
    s = G(torch.randn(10, ZDIM))
nn_dist, nn_idx = torch.cdist(s, X).min(dim=1)
show_grid(torch.cat([s, X[nn_idx]]), "Top: generated. Bottom: the closest training image.")
print(f"average distance to the closest training image: {nn_dist.mean():.1f} (smaller = closer to a copy)")
"""),
md(r"""
---
## Stage 5 · Render: walk through the latent space

The film is a walk: pick a few points in the latent space (keyframes) and move smoothly from one to the next, decoding every step into a frame.

**Linear interpolation** goes in a straight line: $w(t) = (1 - t)\,a + t\,b$.

**Spherical interpolation (slerp)** follows the arc between $a$ and $b$. With $\Omega$ the angle between them, $\cos \Omega = \frac{a \cdot b}{\|a\|\,\|b\|}$:

$$\text{slerp}(a, b, t) = \frac{\sin\big((1 - t)\,\Omega\big)}{\sin \Omega}\, a + \frac{\sin(t\,\Omega)}{\sin \Omega}\, b$$

Why bother? Random Gaussian vectors in 64 dimensions all have about the same length, $\sqrt{64} = 8$. A straight line between two of them cuts through the middle, where the vectors are shorter than anything the generator saw in training. The arc stays at the usual length.
"""),
code(r"""
def lerp(a, b, t):
    return (1 - t) * a + t * b

def slerp(a, b, t):
    omega = torch.arccos(torch.clamp(torch.dot(a / a.norm(), b / b.norm()), -1.0, 1.0))
    #>> TODO 2: the slerp formula above, using omega, a, b and t
    w = (torch.sin((1 - t) * omega) * a + torch.sin(t * omega) * b) / torch.sin(omega)
    #<<
    return w

torch.manual_seed(1)
a, b = torch.randn(ZDIM), torch.randn(ZDIM)
assert torch.allclose(slerp(a, b, 0.0), a, atol=1e-4) and torch.allclose(slerp(a, b, 1.0), b, atol=1e-4), "slerp must start at a and end at b"
b_same = b / b.norm() * a.norm()
assert abs(slerp(a, b_same, 0.5).norm() - a.norm()) < 1e-3, "between two vectors of the same length, slerp keeps that length"
print("TODO 2 works.")

ts = torch.linspace(0, 1, 50)
plt.figure(figsize=(6, 2.5))
plt.plot(ts, [lerp(a, b, t).norm().item() for t in ts], label="linear")
plt.plot(ts, [slerp(a, b, t).norm().item() for t in ts], label="slerp")
plt.xlabel("t"); plt.ylabel("length of w"); plt.legend(); plt.title("Length of the latent vector along the walk"); plt.show()
"""),
md(r"""
### Steer it with a sensor

*Unsupervised* at MoMA reacted to its room: a camera counted visitors and a weather station fed in the weather. Here a made-up **sensor** gives one number $s(t)$ per frame, and it pushes the walk along a fixed direction $d$ in the latent space:

$$w_\text{steered}(t) = w(t) + \alpha \, s(t) \, d$$

`"weather"` is a slow wave with gusts; `"clock"` climbs steadily from 0 to 1.
"""),
code(r"""
def sensor(frac):
    # frac goes from 0 to 1 over the film
    if SENSOR == "weather":
        return float(np.sin(2 * np.pi * 2 * frac) + 0.3 * np.random.randn())
    if SENSOR == "clock":
        return float(frac)
    return 0.0

def steer(w, s, alpha, d):
    #>> TODO 3: push w by alpha * s along the direction d
    return w + alpha * s * d
    #<<

d_check = torch.zeros(ZDIM); d_check[0] = 1.0
assert torch.allclose(steer(a, 0.0, 2.0, d_check), a), "a sensor reading of 0 must not move w"
assert abs((steer(a, 1.0, 2.0, d_check) - a)[0].item() - 2.0) < 1e-5, "s = 1 and alpha = 2 must move w by 2 along d"
print("TODO 3 works.")
"""),
code(r"""
torch.manual_seed(SEED); np.random.seed(SEED)
keys = torch.randn(N_KEYFRAMES, ZDIM)
direction = torch.randn(ZDIM); direction = direction / direction.norm()
interp = slerp if WALK == "slerp" else lerp

ws = []
n_total = N_KEYFRAMES * FRAMES_PER_STEP
for k in range(N_KEYFRAMES):
    a_k, b_k = keys[k], keys[(k + 1) % N_KEYFRAMES]          # the last keyframe loops back to the first
    for t in torch.linspace(0, 1, FRAMES_PER_STEP + 1)[:-1]:
        w = interp(a_k, b_k, t)
        ws.append(steer(w, sensor(len(ws) / n_total), ALPHA, direction))
with torch.no_grad():
    imgs = G(torch.stack(ws)).view(-1, 1, 28, 28)
    imgs = F.interpolate(imgs, size=112, mode="bilinear", align_corners=False)
frames = [((im[0].clamp(-1, 1) + 1) * 127.5).byte().numpy() for im in imgs]
save_gif(frames, "walk.gif")
print(f"walk: {WALK}, sensor: {SENSOR}, {len(frames)} frames")
"""),
md(r"""
---
## Stage 6 · Display: put it on the wall

The film plays on a screen seen in perspective, so its square frame lands on the wall as a four-sided shape. A **homography** $H$, a 3 × 3 matrix, maps every frame pixel to its spot on the wall (Days 2 and 6). In homogeneous coordinates:

$$\begin{pmatrix} u \\ v \\ s \end{pmatrix} = H \begin{pmatrix} x \\ y \\ 1 \end{pmatrix}, \qquad (x', y') = \left(\frac{u}{s}, \frac{v}{s}\right)$$

Four corner pairs fix $H$. OpenCV finds it for us; you write how it moves one point.
"""),
code(r"""
S = frames[0].shape[0]                       # frame size in pixels
src = np.float32([[0, 0], [S - 1, 0], [S - 1, S - 1], [0, S - 1]])
dst = np.float32(WALL)
Hmat = cv2.getPerspectiveTransform(src, dst)

def project(H, x, y):
    #>> TODO 4: multiply H by (x, y, 1), then divide by the third coordinate; return (x', y')
    u, v, s = H @ np.array([x, y, 1.0])
    return u / s, v / s
    #<<

for (sx, sy), (dx_, dy_) in zip(src, dst):
    px, py = project(Hmat, sx, sy)
    assert abs(px - dx_) < 1e-3 and abs(py - dy_) < 1e-3, "each frame corner must land on its wall corner"
print("TODO 4 works.")
"""),
code(r"""
RH, RW = 360, 640
room = np.zeros((RH, RW, 3), np.uint8)
room[:] = (58, 58, 64)                                         # back wall
cv2.fillPoly(room, [np.int32([[0, 300], [RW, 300], [RW, RH], [0, RH]])], (40, 36, 34))   # floor
cv2.polylines(room, [np.int32(WALL)], True, (90, 90, 96), 2)  # the screen's frame

mask = cv2.warpPerspective(np.full((S, S), 255, np.uint8), Hmat, (RW, RH)) > 0
room_frames = []
for f in frames:
    lit = cv2.warpPerspective(cv2.cvtColor(f, cv2.COLOR_GRAY2RGB), Hmat, (RW, RH))
    out = room.copy(); out[mask] = lit[mask]
    room_frames.append(out)
save_gif(room_frames, "room.gif")
"""),
md(r"""
---
## Report back

Show the class:
1. **Your GIF** (`walk.gif` or `room.gif`) from the default run and from your card's run.
2. **Your equation or pseudocode** for your card's stage.
3. **One finding**, in one sentence: what changed when you turned your knob, and why.

**Done early?** Try another card, or answer: which of the six stages would be the hardest to scale up to Anadol's 100 million images, and why?
"""),
sol(r"""
---
## Teacher notes: what each card should find

These come from runs of this notebook on a CPU with `SEED = 0`. GAN results move with the seed, so expect the direction to hold more than the exact numbers.

| Card | What we measured (2 CPU threads, `SEED = 0`) | The point to draw out |
|---|---|---|
| Default | 41,985 of 60,000 images kept; 31 unwanted leaked, 46 good ones lost. GAN covers 7 classes, 0.2% of samples look like a removed class. Whole notebook: about 50 s. | The pipeline works end to end in under a minute. |
| A · 200 images | 2,000 images changed nothing visible (still 7 classes). With 200 images, coverage drops to **4 classes**. With `AUGMENT = True` it is back to **7 classes**, but samples are noisier. | Too little data shrinks what a GAN can make; ADA-style augmentation buys back variety, at some cost in sharpness. |
| B · keep only Trouser | 6,084 kept, 215 unwanted leaked. The GAN makes **only trousers** (1 class). | Curation decides what the art can ever show. The leaked images barely matter: a few hundred among thousands. |
| C · linear vs slerp | Halfway along a linear walk, the latent vector shrinks from about 8 to about 5; slerp stays near 8. In the GIF, the linear walk **dims and grays out** mid-transition. | The generator never saw short vectors in training, so the middle of a straight line is "off the map". |
| D · weather sensor | The walk jitters with the gusts and drifts with the slow wave; a bigger `ALPHA` pushes harder. | Live input is one extra term in the equation, but it changes how the piece feels. |
| E · the wall | Not measured. Corners must go top-left, top-right, bottom-right, bottom-left; crossing two of them folds the frame. | Four point pairs fix the 8 unknowns of H. |
| F · TAU | `TAU = 0.1`: 12 leaked, 212 good images lost. `TAU = 0.9`: 95 leaked, 16 lost. | No threshold gives zero of both: precision vs recall. Anadol's people filter faced the same trade. |
"""),
]

# ---------------------------------------------------------------------------------------------
# Variant: a doodle city from Google's Quick, Draw! dataset. Same cells, with these edits.
# Each (old, new) pair must match exactly once across all cells.
# ---------------------------------------------------------------------------------------------
DOODLE_LOADER = r"""CLASSES = CATEGORIES
QD = "https://storage.googleapis.com/quickdraw_dataset/full/numpy_bitmap/"

def load_doodles(name, n):
    # Fetch only the first n drawings of a category: an HTTP range request on the .npy file (28 x 28 pixels, 0-255).
    import os, urllib.request, urllib.parse
    os.makedirs("data/quickdraw", exist_ok=True)
    path = f"data/quickdraw/{name.replace(' ', '_')}_{n}.npy"
    if os.path.exists(path):
        return np.load(path)
    req = urllib.request.Request(QD + urllib.parse.quote(name) + ".npy", headers={"Range": f"bytes=0-{1024 + 784 * n - 1}"})
    raw = urllib.request.urlopen(req).read()
    f = io.BytesIO(raw)
    version = np.lib.format.read_magic(f)
    (np.lib.format.read_array_header_1_0 if version == (1, 0) else np.lib.format.read_array_header_2_0)(f)
    start = f.tell()
    arr = np.frombuffer(raw[start:start + 784 * n], dtype=np.uint8).reshape(n, 784).copy()
    np.save(path, arr)
    return arr"""

DOODLE_DATA = r"""t0 = time.time()
parts = [load_doodles(c, PER_CLASS) for c in CATEGORIES]
X_all = torch.tensor(np.concatenate(parts)).float() / 127.5 - 1
y_all = torch.arange(len(CATEGORIES)).repeat_interleave(PER_CLASS)
print(f"loaded in {time.time() - t0:.0f} s")"""

DOODLE_KNOBS = r"""CATEGORIES = ["skyscraper", "bridge", "house", "car", "bus", "tree", "cloud", "streetlight", "traffic light",
              "face", "yoga"]     # our city archive; the last two are the people
PER_CLASS = 5000          # doodles per category (about 4 MB each to download)
REMOVE = ["face", "yoga"] # remove the people, as Anadol's team did"""

DOODLE_EDITS = [
    ("# A Mini Machine Hallucination", "# A Doodle-City Machine Hallucination"),
    ('| **Data** | over 100M public photos of New York | Fashion-MNIST: 60,000 small clothing images, our "archive" |',
     "| **Data** | over 100M public photos of New York | 55,000 doodles of a city from Google's *Quick, Draw!* game, people included |"),
    ("| **Curate** | an algorithm removes photos with people | a classifier removes the classes we choose |",
     "| **Curate** | an algorithm removes photos with people | a classifier removes the people |"),
    ("`REMOVE` (try removing 9 of the 10 classes, so only one is left)",
     "`REMOVE` (try removing every category except one, such as `skyscraper`)"),
    ('REMOVE = ["Ankle boot", "Sneaker", "Sandal"]   # classes to remove from the archive ("no people" in Anadol\'s NYC)', DOODLE_KNOBS),
    ("Fashion-MNIST downloads into `data/` the first time (a few seconds).",
     "The doodles download from Google's *Quick, Draw!* dataset the first time, about 4 MB per category, and are saved in `data/`."),
    ('CLASSES = ["T-shirt", "Trouser", "Pullover", "Dress", "Coat", "Sandal", "Shirt", "Sneaker", "Bag", "Ankle boot"]', DOODLE_LOADER),
    ("60,000 images, 28 × 28 pixels, scaled to [-1, 1]. Anadol's archive came with no labels.",
     "Doodles that players of Google's *Quick, Draw!* game drew in under 20 seconds each: 28 × 28 pixels, scaled to [-1, 1]. "
     "Our city has buildings, traffic and weather, and also people. Anadol's archive came with no labels."),
    ('fmnist = datasets.FashionMNIST("data", train=True, download=True)\n'
     'X_all = fmnist.data.view(-1, 28 * 28).float() / 127.5 - 1\n'
     'y_all = fmnist.targets.clone()', DOODLE_DATA),
    ("let it remove the classes in `REMOVE`.", "let it remove the people (`face` and `yoga` doodles), or whatever is in `REMOVE`."),
]

DOODLE_NOTES = r"""---
## Teacher notes: what each card should find

DOODLE_RESULTS"""


def doodle_cells():
    cells = [list(c) for c in CELLS]
    for old, new in DOODLE_EDITS:
        hits = [c for c in cells if old in c[1]]
        assert len(hits) == 1, f"edit matched {len(hits)} cells: {old[:60]}"
        hits[0][1] = hits[0][1].replace(old, new)
    for c in cells:   # the Fashion-MNIST teacher notes do not apply to the doodles
        if c[0] == "sol":
            c[1] = DOODLE_NOTES
    return [tuple(c) for c in cells]


if __name__ == "__main__":
    write(CELLS)
    write(doodle_cells(), "doodle-city-hallucination")

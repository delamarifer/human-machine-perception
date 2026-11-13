"""Build the Day 10 Fashion-MNIST pipeline notebook in two versions (owner: Shreya).

    python3 day10/workbook/solutions/build_fashion.py

Student version  -> day10/workbook/generative-system-lab.ipynb
Solution version -> day10/workbook/solutions/generative-system-lab-solutions.ipynb

Fashion-MNIST (the Hugging Face copy), with shirts as the thing to remove. Every stage reuses an idea from the class labs:
a CNN, CLIP zero-shot, RSA, checking the data, VAEs and GANs, latent walks and guidance, filters and the metamer test.
Shreya (2026-11-13): no day labels in the notebook, no cards or groups (everyone runs the same thing).
Standalone: earlier drafts and their build scripts are in private/day10-unused/ (not in the repo).
"""
import re
from pathlib import Path
import nbformat as nbf

ROOT = Path(__file__).resolve().parents[3]
OUT_STUDENT = ROOT / "day10" / "workbook"
OUT_SOLUTION = Path(__file__).resolve().parent
NAME = "generative-system-lab"

md = lambda s: ("md", s.strip("\n"))
code = lambda s: ("code", s.strip("\n"))
sol = lambda s: ("sol", s.strip("\n"))     # solution version only (teacher notes)

# In a code cell, a block between "#>> TODO n: what to write" and "#<<" holds the solution lines.
# In the student version it becomes the TODO line plus raise NotImplementedError(...), at the same indentation.
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
                    src = src.replace("\n", "\n\n> **Solutions.** Teacher copy, with the TODOs filled in and notes on what students should see.\n", 1)
                nb.cells.append(nbf.v4.new_markdown_cell(src))
            else:
                nb.cells.append(nbf.v4.new_code_cell(render(src, solution)))
        path = (OUT_SOLUTION / f"{name}-solutions.ipynb") if solution else (OUT_STUDENT / f"{name}.ipynb")
        for i, c in enumerate(nb.cells):
            c.id = f"c{i:03d}"     # fixed ids, so a rebuild only changes what changed
        path.parent.mkdir(parents=True, exist_ok=True)
        nbf.write(nb, path)
        print("wrote", path.relative_to(ROOT))

CELLS = [
md(r"""
# Generative System Lab: From Archive to Artwork

**Day 10 · Human and Machine Perception**

Refik Anadol's *Machine Hallucination* took over 100 million photos of New York, removed every photo with a person in it, trained a StyleGAN on what was left, and turned walks through its latent space into a film on the walls of a room.

Today you rebuild that pipeline at toy scale, on **Fashion-MNIST**: 60,000 small photos of clothes and accessories. Our archive is a wardrobe, and the thing we remove is **shirts**, which look a lot like T-shirts, pullovers and coats, just as people in a street photo blend into the scene. **Every stage uses something you already built in a lab.**

| Stage | Anadol, NYC | Here | The idea from our labs |
|---|---|---|---|
| **Data** | over 100M public photos | 60,000 clothing photos | check the data before you use it |
| **Curate** | an algorithm removes the people | a CNN and CLIP remove the shirts | CNN classifiers, CLIP zero-shot |
| **Represent** | an embedding of every photo | CNN and CLIP embeddings | embeddings, RDMs and RSA |
| **Generate** | StyleGAN | a VAE or a GAN | VAEs, GANs, the generative trilemma |
| **Render** | walks through the latent space | a latent walk, steered by a signal | latent walks, guidance |
| **Evaluate** | (the audience) | can your partner tell? does it copy? | the metamer test, filters |
| **Display** | projected on the walls | warped onto a wall | (finished code, not from class) |
| **System** | one studio, many models | the whole pipeline as a plan of tools | from model to system |

**How to use it:** run the cells top to bottom. When a cell stops with `NotImplementedError`, that is a **TODO**. Write the missing lines, delete the `raise` line, and run the cell again. A check right after each TODO tells you if it works.

| TODO | Stage | What you write |
|---|---|---|
| 1 | Curate | the CNN's convolution and pooling layers |
| 2 | Curate | zero-shot predictions from CLIP similarities |
| 3 | Represent | RSA: the Spearman correlation of two RDMs |
| 4 | Render | spherical interpolation (slerp) |
| 5 | Evaluate | an edge map with a Sobel filter |

**Runtime:** a CPU runtime is fine. The whole notebook takes about 2 minutes, plus about a minute of downloads the first time.
"""),
code(r"""
# ---- Settings. Run as they are. ----
REMOVE = ["shirt"]                  # what curation removes (the "people" of our archive)
TAU = 0.5                           # remove an image if the CNN gives the removed classes more than this
TEMPLATE = "a photo of a {}"        # the CLIP caption template
N_CLIP = 1000                       # how many images CLIP checks (CLIP is slow on a CPU)
MODEL = "auto"                      # "vae", "gan", "dcgan" (convolutional, needs a GPU), or "auto": dcgan on a GPU, vae on a CPU
STEER_TO = "dress"                  # the walk is pulled toward this class
SENSOR = "weather"                  # a made-up sensor that sets how hard it pulls
ALPHA = 2.0                         # how hard the steering pulls
WALL = [[150, 70], [500, 40], [520, 290], [140, 260]]   # screen corners in the room picture (x, y)
SEED = 0
"""),
md(r"""
## Setup

Loads CLIP as in our CLIP lab (`openai/clip-vit-base-patch32`, about 600 MB the first time), and Fashion-MNIST from its Hugging Face copy (31 MB).
"""),
code(r"""
import io, time
import numpy as np
import pandas as pd
import torch
import torch.nn as nn
import torch.nn.functional as F
import matplotlib.pyplot as plt
import cv2
from PIL import Image
from scipy.stats import spearmanr
from huggingface_hub import hf_hub_download
from transformers import CLIPModel, CLIPProcessor
from IPython.display import Image as ShowImage, display

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
torch.manual_seed(SEED); np.random.seed(SEED)
CLASSES = ["T-shirt", "trouser", "pullover", "dress", "coat", "sandal", "shirt", "sneaker", "bag", "ankle boot"]
remove_idx = [CLASSES.index(c) for c in REMOVE]
KEPT = [c for c in CLASSES if c not in REMOVE]

# ---- CLIP, as in our CLIP lab ----
t0 = time.time()
clip = CLIPModel.from_pretrained("openai/clip-vit-base-patch32").to(device).eval()
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

def _as_tensor(out):
    if torch.is_tensor(out):
        return out
    for name in ("image_embeds", "text_embeds", "pooler_output"):
        if getattr(out, name, None) is not None:
            return getattr(out, name)
    return out[0]

def to_pil(x):
    # an image in [-1, 1] -> a PIL image for CLIP, inverted to a dark item on white, like a catalog photo
    return Image.fromarray(((1 - (x.view(28, 28).clamp(-1, 1) + 1) / 2) * 255).byte().numpy()).convert("RGB")

@torch.no_grad()
def embed_images(images, batch_size=64):
    chunks = []
    for i in range(0, len(images), batch_size):
        inputs = processor(images=images[i:i + batch_size], return_tensors="pt").to(device)
        chunks.append(_as_tensor(clip.get_image_features(**inputs)).float().cpu())
    emb = torch.cat(chunks)
    return emb / emb.norm(dim=1, keepdim=True)

@torch.no_grad()
def embed_texts(texts):
    inputs = processor(text=list(texts), return_tensors="pt", padding=True).to(device)
    emb = _as_tensor(clip.get_text_features(**inputs)).float().cpu()
    return emb / emb.norm(dim=1, keepdim=True)
print(f"CLIP loaded in {time.time() - t0:.0f} s on {device}")

def show_grid(x, title, n_row=2, labels=None):
    x = (x.view(-1, 28, 28).clamp(-1, 1) + 1) / 2
    per = x.shape[0] // n_row
    fig, axes = plt.subplots(n_row, per, figsize=(per * 0.9, n_row * 1.05))
    for k, ax in enumerate(np.array(axes).ravel()):
        ax.imshow(x[k], cmap="gray", vmin=0, vmax=1); ax.axis("off")
        if labels is not None: ax.set_title(labels[k], fontsize=7)
    plt.suptitle(title); plt.tight_layout(); plt.show()

def save_gif(frames, path, ms=60):
    imgs = [Image.fromarray(f) for f in frames]
    imgs[0].save(path, save_all=True, append_images=imgs[1:], duration=ms, loop=0)
    display(ShowImage(filename=path)); print("saved", path, f"({len(frames)} frames)")
"""),
md(r"""
---
## Stage 1 · Data: look before you use it

60,000 photos from Zalando's online catalog, 28 × 28 pixels, scaled to [-1, 1], each with one of 10 labels. Before training anything, look at what is in it. Are the labels right? Which classes look alike?
"""),
code(r"""
t0 = time.time()
table = pd.read_parquet(hf_hub_download("zalando-datasets/fashion_mnist", "fashion_mnist/train/0000.parquet",
                                        repo_type="dataset", revision="refs/convert/parquet"))
X_all = torch.tensor(np.stack([np.array(Image.open(io.BytesIO(b["bytes"]))) for b in table["image"]])).view(-1, 784).float() / 127.5 - 1
y_all = torch.tensor(table["label"].values)
print(f"{len(X_all):,} images in {len(CLASSES)} classes, loaded in {time.time() - t0:.0f} s")
g = torch.Generator().manual_seed(SEED)
pick = torch.cat([torch.nonzero(y_all == c).ravel()[torch.randperm(int((y_all == c).sum()), generator=g)[:2]] for c in range(10)])
order = [i for j in range(2) for i in range(j, len(pick), 2)]
show_grid(X_all[pick][order], "Two images per class: which ones look alike?", n_row=2, labels=[CLASSES[c] for _ in range(2) for c in range(10)])
"""),
md(r"""
---
## Stage 2 · Curate: remove the shirts

Anadol's team could not check millions of photos by hand, so **a model decided** which ones had people in them. We try two kinds of model:

1. **A CNN we train on labeled images**, like the one from our CNN lab. It learns the classes from examples.
2. **CLIP, zero-shot.** It never saw these images; we only give it words.

The CNN gives a probability for each class. We **keep** an image when the removed classes together get less than $\tau$:

$$\text{keep } x \iff \sum_{c \,\in\, \text{removed}} p(c \mid x) < \tau$$
"""),
code(r"""
class CNN(nn.Module):
    # The CNN from our lab, with one score per class
    def __init__(self, n_classes):
        super().__init__()
        #>> TODO 1: conv1 (1 -> 24 filters, 3 x 3), pool1 (max, 2 x 2), conv2 (24 -> 36, 3 x 3), pool2 (max, 2 x 2)
        self.conv1 = nn.Conv2d(1, 24, 3)
        self.pool1 = nn.MaxPool2d(2)
        self.conv2 = nn.Conv2d(24, 36, 3)
        self.pool2 = nn.MaxPool2d(2)
        #<<
        self.fc1 = nn.Linear(36 * 5 * 5, 128)
        self.fc2 = nn.Linear(128, n_classes)

    def features(self, x):
        x = x.view(-1, 1, 28, 28)
        x = self.pool1(F.relu(self.conv1(x)))
        x = self.pool2(F.relu(self.conv2(x)))
        return F.relu(self.fc1(x.flatten(1)))      # a 128-number embedding

    def forward(self, x):
        return self.fc2(self.features(x))

assert CNN(10)(torch.zeros(2, 784)).shape == (2, 10), "the CNN must give one score per class"
print("TODO 1 works.")

torch.manual_seed(SEED)
cnn = CNN(10).to(device)
opt = torch.optim.Adam(cnn.parameters(), lr=1e-3)
t0 = time.time()
for idx in torch.randperm(len(X_all)).split(128):            # one pass over the data
    loss = F.cross_entropy(cnn(X_all[idx].to(device)), y_all[idx].to(device))
    opt.zero_grad(); loss.backward(); opt.step()
cnn.eval()
with torch.no_grad():
    probs = torch.cat([F.softmax(cnn(X_all[i:i + 4096].to(device)), 1).cpu() for i in range(0, len(X_all), 4096)])
print(f"CNN trained in {time.time() - t0:.0f} s, accuracy {(probs.argmax(1) == y_all).float().mean():.1%}")

p_remove = probs[:, remove_idx].sum(1)
is_removed_class = torch.isin(y_all, torch.tensor(remove_idx))
plt.figure(figsize=(7, 2.8))
plt.hist(p_remove[is_removed_class].numpy(), bins=40, alpha=.6, label="real shirts")
plt.hist(p_remove[~is_removed_class].numpy(), bins=40, alpha=.6, label="everything else")
plt.axvline(TAU, color="k", ls="--"); plt.yscale("log"); plt.xlabel("p(shirt | x)"); plt.legend()
plt.title("How sure is the CNN? The images near the line are the hard ones"); plt.show()

keep = p_remove < TAU
leaked, lost = (keep & is_removed_class).sum().item(), (~keep & ~is_removed_class).sum().item()
print(f"CNN filter: kept {keep.sum():,} of {len(X_all):,}; {leaked:,} shirts leaked through; {lost:,} other images lost")
lost_by_class = torch.bincount(y_all[~keep & ~is_removed_class], minlength=10)
print("lost, by true class:", ", ".join(f"{CLASSES[c]} {lost_by_class[c]}" for c in lost_by_class.argsort(descending=True)[:4]))
X, y = X_all[keep], y_all[keep]
show_grid(X_all[keep & is_removed_class][:10], "Leaked: shirts the CNN kept", n_row=1)
show_grid(X_all[~keep & ~is_removed_class][:10], "Lost: images the CNN removed as shirts", n_row=1,
          labels=[CLASSES[c] for c in y_all[~keep & ~is_removed_class][:10]])
"""),
md(r"""
### CLIP, zero-shot: words instead of training

As in our CLIP lab: embed every image and every caption, then pick the caption with the highest cosine similarity. CLIP checks 1,000 images, half shirts and half everything else, because it is slow on a CPU.

We try two sets of captions: the **plain class names** ("a photo of a shirt"), and **descriptions** ("a photo of a button-up shirt with a collar"). CLIP learned from captions people wrote, so the words matter.
"""),
code(r"""
g = torch.Generator().manual_seed(SEED)
sub = torch.cat([torch.nonzero(is_removed_class).ravel()[torch.randperm(int(is_removed_class.sum()), generator=g)[:N_CLIP // 2]],
                 torch.nonzero(~is_removed_class).ravel()[torch.randperm(int((~is_removed_class).sum()), generator=g)[:N_CLIP // 2]]])
t0 = time.time()
img_emb = embed_images([to_pil(X_all[i]) for i in sub])
print(f"CLIP embedded {len(sub)} images in {time.time() - t0:.0f} s")
DESCRIPTIONS = ["t-shirt", "pair of trousers", "sweater", "dress", "coat", "sandal",
                "button-up shirt with a collar", "sneaker", "bag", "ankle boot"]

def zero_shot(names):
    sims = img_emb @ embed_texts([TEMPLATE.format(c) for c in names]).T     # (N_CLIP, 10)
    #>> TODO 2: pred = the index of the most similar caption for each image (one integer per row of sims)
    pred = sims.argmax(dim=1)
    #<<
    return pred

truth = is_removed_class[sub]
for label, names in [("plain names", CLASSES), ("descriptions", DESCRIPTIONS)]:
    pred = zero_shot(names)
    assert pred.shape == (len(sub),), "pred must have one caption index per image"
    acc = (pred == y_all[sub]).float().mean()
    print(f"CLIP with {label:12s}: accuracy {acc:.0%}, catches {torch.isin(pred, torch.tensor(remove_idx))[truth].float().mean():.0%} of the shirts")
print("TODO 2 works.")

txt_emb = embed_texts([TEMPLATE.format(c) for c in DESCRIPTIONS])      # the descriptions from here on
says = {"CLIP, zero-shot": torch.isin(zero_shot(DESCRIPTIONS), torch.tensor(remove_idx)), "CNN, trained": ~keep[sub]}
says["both agree"] = says["CLIP, zero-shot"] & says["CNN, trained"]
says["either one"] = says["CLIP, zero-shot"] | says["CNN, trained"]
for name, s in says.items():
    caught = (s & truth).float().sum() / truth.sum()
    false_alarm = (s & ~truth).float().sum() / (~truth).sum()
    print(f"{name:16s} catches {caught:.0%} of the shirts; flags {false_alarm:.0%} of everything else as shirts")
"""),
md(r"""
---
## Stage 3 · Represent: do CLIP and our CNN see the wardrobe the same way?

Take 10 images from each kept class. For each model, build a **representational dissimilarity matrix** (RDM): entry $(i, j)$ is $1 - \cos(z_i, z_j)$. Then compare two RDMs with **RSA**: the Spearman correlation of their upper triangles, as in our RSA lab.
"""),
code(r"""
g = torch.Generator().manual_seed(SEED + 1)
ten = torch.cat([torch.nonzero(y == CLASSES.index(c)).ravel()[torch.randperm(int((y == CLASSES.index(c)).sum()), generator=g)[:10]] for c in KEPT])
with torch.no_grad():
    z_cnn = F.normalize(cnn.features(X[ten].to(device)).cpu(), dim=1).numpy()
z_clip = embed_images([to_pil(X[i]) for i in ten]).numpy()
rdm_cnn, rdm_clip = 1 - z_cnn @ z_cnn.T, 1 - z_clip @ z_clip.T
labels10 = y[ten].numpy()
rdm_category = (labels10[:, None] != labels10[None, :]).astype(float)

def upper(rdm):
    return rdm[np.triu_indices(len(rdm), k=1)]

def rsa(rdm_a, rdm_b):
    #>> TODO 3: the Spearman correlation between the upper triangles of the two RDMs (use upper and spearmanr)
    return spearmanr(upper(rdm_a), upper(rdm_b)).correlation
    #<<

a = np.random.rand(6, 6); a = a + a.T
assert abs(rsa(a, a) - 1) < 1e-9, "an RDM must correlate perfectly with itself"
print("TODO 3 works.")

fig, axes = plt.subplots(1, 3, figsize=(12, 4))
for ax, (name, r) in zip(axes, [("CNN (trained on these images)", rdm_cnn), ("CLIP (never saw them)", rdm_clip), ("category model", rdm_category)]):
    ax.imshow(r, cmap="gray_r"); ax.set_title(name, fontsize=10)
    ax.set_xticks(np.arange(5, 10 * len(KEPT), 10)); ax.set_xticklabels(KEPT, rotation=60, ha="right", fontsize=7)
    ax.set_yticks(np.arange(5, 10 * len(KEPT), 10)); ax.set_yticklabels(KEPT, fontsize=7)
plt.tight_layout(); plt.show()
print(f"RSA, CNN vs categories:  {rsa(rdm_cnn, rdm_category):.2f}")
print(f"RSA, CLIP vs categories: {rsa(rdm_clip, rdm_category):.2f}")
print(f"RSA, CNN vs CLIP:        {rsa(rdm_cnn, rdm_clip):.2f}")
"""),
md(r"""
---
## Stage 4 · Generate: a VAE or a GAN

Three choices, all from our generative-model workbooks:
- `"vae"`: a VAE. Fast to train, but blurry.
- `"gan"`: a GAN made of fully connected layers. Fast, but noisier.
- `"dcgan"`: the same GAN game with **convolutional** layers, the idea StyleGAN grew from. Sharper, but slow to train without a GPU.

`MODEL = "auto"` picks `"dcgan"` on a GPU and `"vae"` on a CPU. Remember the **generative trilemma**: a model family rarely gets *quality*, *variety* and *speed* all at once. Anadol's MoMA piece had to make new images **live**, which is one reason it used a GAN.

We measure all three. **Speed:** time to make 1,000 images. **Variety:** how many of the kept classes the CNN finds among them. **Quality:** how sure the CNN is about each one, on average.
"""),
code(r"""
def make_gan(z):
    G = nn.Sequential(nn.Linear(z, 256), nn.BatchNorm1d(256), nn.LeakyReLU(0.2),
                      nn.Linear(256, 512), nn.BatchNorm1d(512), nn.LeakyReLU(0.2),
                      nn.Linear(512, 784), nn.Tanh())
    D = nn.Sequential(nn.Linear(784, 512), nn.LeakyReLU(0.2), nn.Linear(512, 256), nn.LeakyReLU(0.2), nn.Linear(256, 1))
    return G, D

class ConvG(nn.Module):
    # a DCGAN generator: a 7 x 7 map, upsampled twice by transposed convolutions to 28 x 28
    def __init__(self, z):
        super().__init__()
        self.fc = nn.Sequential(nn.Linear(z, 128 * 7 * 7), nn.BatchNorm1d(128 * 7 * 7), nn.ReLU())
        self.net = nn.Sequential(nn.ConvTranspose2d(128, 64, 4, 2, 1), nn.BatchNorm2d(64), nn.ReLU(),
                                 nn.ConvTranspose2d(64, 1, 4, 2, 1), nn.Tanh())
    def forward(self, z):
        return self.net(self.fc(z).view(-1, 128, 7, 7)).view(-1, 784)

class ConvD(nn.Module):
    # a DCGAN discriminator: a small CNN
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(nn.Conv2d(1, 64, 4, 2, 1), nn.LeakyReLU(0.2), nn.Conv2d(64, 128, 4, 2, 1), nn.BatchNorm2d(128),
                                 nn.LeakyReLU(0.2), nn.Flatten(), nn.Linear(128 * 7 * 7, 1))
    def forward(self, x):
        return self.net(x.view(-1, 1, 28, 28))

def train_gan(G, D, data, steps, z, lr=5e-4):
    G, D = G.to(device), D.to(device)
    oG = torch.optim.Adam(G.parameters(), lr=lr, betas=(0.5, 0.999)); oD = torch.optim.Adam(D.parameters(), lr=lr, betas=(0.5, 0.999))
    bce = nn.BCEWithLogitsLoss(); B = 64
    ones, zeros = torch.ones(B, 1, device=device), torch.zeros(B, 1, device=device)
    for step in range(steps):
        x = data[torch.randint(0, len(data), (B,))].to(device)
        lD = bce(D(x), ones) + bce(D(G(torch.randn(B, z, device=device)).detach()), zeros)
        oD.zero_grad(); lD.backward(); oD.step()
        lG = bce(D(G(torch.randn(B, z, device=device))), ones)
        oG.zero_grad(); lG.backward(); oG.step()
    return G.eval()

class VAE(nn.Module):
    def __init__(self, z):
        super().__init__()
        self.enc = nn.Sequential(nn.Linear(784, 256), nn.ReLU(), nn.Linear(256, 128), nn.ReLU())
        self.mu, self.logvar = nn.Linear(128, z), nn.Linear(128, z)
        self.dec = nn.Sequential(nn.Linear(z, 128), nn.ReLU(), nn.Linear(128, 256), nn.ReLU(), nn.Linear(256, 784), nn.Tanh())
    def forward(self, x):
        h = self.enc(x); mu, logvar = self.mu(h), self.logvar(h)
        zz = mu + torch.exp(logvar / 2) * torch.randn_like(mu)       # the reparameterization trick
        return self.dec(zz), mu, logvar

def train_vae(vae, data, steps, lr=1e-3):
    vae = vae.to(device); opt = torch.optim.Adam(vae.parameters(), lr=lr)
    for step in range(steps):
        x = data[torch.randint(0, len(data), (128,))].to(device)
        rec, mu, logvar = vae(x)
        loss = ((rec - x) ** 2).sum(1).mean() + (-0.5 * (1 + logvar - mu ** 2 - logvar.exp()).sum(1)).mean()
        opt.zero_grad(); loss.backward(); opt.step()
    return vae.eval()

def train_generator(kind, data, steps):
    # returns a decode function (latent codes -> images) and the latent size
    zdim = 16 if kind == "vae" else 64
    torch.manual_seed(SEED)
    if kind == "vae":
        vae = train_vae(VAE(zdim), data, steps)
        return (lambda zz: vae.dec(zz.to(device)).cpu()), zdim
    G, D = (make_gan(zdim) if kind == "gan" else (ConvG(zdim), ConvD()))
    G = train_gan(G, D, data, steps, zdim, lr=5e-4 if kind == "gan" else 2e-4)
    return (lambda zz: G(zz.to(device)).cpu()), zdim

def judge(samples):
    # the CNN as the judge: variety = kept classes with at least 2% of samples; quality = average confidence
    with torch.no_grad():
        p = F.softmax(cnn(samples.to(device)), 1).cpu()
    share = torch.bincount(p.argmax(1), minlength=10).float() / len(p)
    kept_idx = [CLASSES.index(c) for c in KEPT]
    return int((share[kept_idx] >= 0.02).sum()), p.max(1).values.mean().item(), share

KIND = MODEL if MODEL != "auto" else ("dcgan" if device.type == "cuda" else "vae")
STEPS = {"vae": 4000, "gan": 4000, "dcgan": 3000}[KIND]
t0 = time.time()
decode, ZDIM = train_generator(KIND, X, STEPS)
train_s = time.time() - t0
with torch.no_grad():
    t0 = time.time(); samples = decode(torch.randn(1000, ZDIM)); sample_s = time.time() - t0
variety, quality, share = judge(samples)
show_grid(samples[:20], f"Samples from the {KIND.upper()}")
print(f"{KIND.upper()}: trained in {train_s:.0f} s | speed: 1,000 images in {sample_s * 1000:.0f} ms | "
      f"variety: {variety} of {len(KEPT)} kept classes | quality: CNN confidence {quality:.0%}")
"""),
md(r"""
### Trace the error: did the shirts come back?

The filter let some shirts through. Does the generator learn to make shirts from them? Compare the share of shirts **in the training data** with the share of generated images **the CNN calls a shirt**. An error in one stage of a pipeline does not stay there.
"""),
code(r"""
train_share = torch.isin(y, torch.tensor(remove_idx)).float().mean().item()
gen_share = share[remove_idx].sum().item()
plt.figure(figsize=(5, 2.6))
plt.bar(["in the archive\n(before curation)", "leaked into\ntraining data", "in the generated\nimages"],
        [is_removed_class.float().mean().item(), train_share, gen_share])
plt.ylabel("share that is a shirt"); plt.title("Following one error through the pipeline"); plt.show()
print(f"shirts: {is_removed_class.float().mean():.1%} of the archive -> {train_share:.1%} of the training data -> {gen_share:.1%} of generated images")
"""),
md(r"""
### Is the art copying its data?

For each generated image, find the closest image in the training set (smallest pixel distance). If the generator memorized its data, the two rows will match almost exactly. Judge by the pictures more than the number: pixel distance favors blurry images, which sit close to many real ones at once. This is the technical side of a real question about Anadol's work: is *Unsupervised* making new images, or remixing MoMA's collection?
"""),
code(r"""
torch.manual_seed(SEED + 2)
with torch.no_grad():
    s10 = decode(torch.randn(10, ZDIM))
nn_dist, nn_idx = torch.cdist(s10, X).min(dim=1)
typical = torch.cdist(X[torch.randperm(len(X))[:10]], X[torch.randperm(len(X))[:5000]]).topk(2, largest=False).values[:, 1]
show_grid(torch.cat([s10, X[nn_idx]]), "Top: generated. Bottom: the closest training image.")
print(f"average distance to the closest training image: {nn_dist.mean():.1f}")
print(f"for comparison, a real image and its nearest real neighbor: about {typical.mean():.1f}")
"""),
md(r"""
---
## Stage 5 · Render: walk through the latent space

In our GAN workbook you walked in a straight line, $w(t) = (1 - t)\,a + t\,b$. Random Gaussian vectors in many dimensions all have about the same length, so the middle of that line is shorter than anything the generator saw in training. **Slerp** follows the arc instead. With $\cos \Omega = \frac{a \cdot b}{\|a\|\,\|b\|}$:

$$\text{slerp}(a, b, t) = \frac{\sin\big((1 - t)\,\Omega\big)}{\sin \Omega}\, a + \frac{\sin(t\,\Omega)}{\sin \Omega}\, b$$

**Steering, like guidance.** Guidance pushes generation toward what you asked for. We find the direction $d$ in the latent space that leads to dresses (the average code of samples the CNN calls a dress, minus the average of all codes) and push the walk along it, as hard as a made-up weather sensor says: $w \leftarrow w + \alpha\, s(t)\, d$. *Unsupervised* at MoMA did the same kind of thing with a camera and a weather station.
"""),
code(r"""
def lerp(a, b, t):
    return (1 - t) * a + t * b

def slerp(a, b, t):
    omega = torch.arccos(torch.clamp(torch.dot(a / a.norm(), b / b.norm()), -1.0, 1.0))
    #>> TODO 4: the slerp formula above, using omega, a, b and t
    return (torch.sin((1 - t) * omega) * a + torch.sin(t * omega) * b) / torch.sin(omega)
    #<<

a, b = torch.randn(ZDIM), torch.randn(ZDIM)
assert torch.allclose(slerp(a, b, 0.0), a, atol=1e-4) and torch.allclose(slerp(a, b, 1.0), b, atol=1e-4), "slerp must start at a and end at b"
assert abs(slerp(a, b / b.norm() * a.norm(), 0.5).norm() - a.norm()) < 1e-3, "between two vectors of the same length, slerp keeps that length"
print("TODO 4 works.")

zz = torch.randn(4000, ZDIM)
with torch.no_grad():
    called = F.softmax(cnn(decode(zz).to(device)), 1).argmax(1).cpu() == CLASSES.index(STEER_TO)
direction = zz[called].mean(0) - zz.mean(0)
direction = direction / direction.norm()
print(f"{int(called.sum())} of 4000 samples look like a {STEER_TO}; steering toward them")

def sensor(frac):
    if SENSOR == "weather": return float(np.sin(2 * np.pi * 2 * frac) + 0.3 * np.random.randn())
    if SENSOR == "clock": return float(frac)
    return 1.0

torch.manual_seed(SEED); np.random.seed(SEED)
N_KEY, PER_STEP = 6, 12
keys = torch.randn(N_KEY, ZDIM)
ws = []
for k in range(N_KEY):
    for t in torch.linspace(0, 1, PER_STEP + 1)[:-1]:
        ws.append(slerp(keys[k], keys[(k + 1) % N_KEY], t) + ALPHA * sensor(len(ws) / (N_KEY * PER_STEP)) * direction)
with torch.no_grad():
    imgs = F.interpolate(decode(torch.stack(ws)).view(-1, 1, 28, 28), size=112, mode="bilinear", align_corners=False)
frames = [((im[0].clamp(-1, 1) + 1) * 127.5).byte().numpy() for im in imgs]
save_gif(frames, "walk.gif")
with torch.no_grad():
    walk_share = torch.bincount(F.softmax(cnn(decode(torch.stack(ws)).to(device)), 1).argmax(1).cpu(), minlength=10).float() / len(ws)
print("the walk looks most like:", ", ".join(f"{CLASSES[i]} {walk_share[i]:.0%}" for i in walk_share.argsort(descending=True)[:3]))
"""),
md(r"""
---
## Stage 6 · Evaluate: can your partner tell?

As in our metamers lab, a partner tries to tell the real from the synthesized. **Partner:** look at the 12 images below and write down which ones you think the model made. Then run the next cell for the answers.
"""),
code(r"""
rng = np.random.default_rng(SEED)
real6 = X[torch.tensor(rng.choice(len(X), 6, replace=False))]
with torch.no_grad():
    fake6 = decode(torch.randn(6, ZDIM))
quiz_order = rng.permutation(12)
show_grid(torch.cat([real6, fake6])[quiz_order], "Real or generated?", n_row=2, labels=[str(k + 1) for k in range(12)])
"""),
code(r"""
print("Answers:", ", ".join(f"{k + 1}: {'real' if o < 6 else 'generated'}" for k, o in enumerate(quiz_order)))
"""),
md(r"""
### What gave it away? Edge statistics

A metamer matches the *statistics* that a perceiver measures. Measure one statistic for real and generated images: how strong the edges are. The Sobel filter from our filtering lab, run as a convolution, gives the horizontal and vertical change at every pixel; the edge strength is $\sqrt{g_x^2 + g_y^2}$.
"""),
code(r"""
SOBEL_X = torch.tensor([[-1., 0., 1.], [-2., 0., 2.], [-1., 0., 1.]]).view(1, 1, 3, 3)
SOBEL_Y = SOBEL_X.transpose(2, 3)

def edge_strength(x):
    x = x.view(-1, 1, 28, 28)
    #>> TODO 5: gx and gy = x convolved with SOBEL_X and SOBEL_Y (F.conv2d, padding=1); return sqrt(gx^2 + gy^2)
    gx, gy = F.conv2d(x, SOBEL_X, padding=1), F.conv2d(x, SOBEL_Y, padding=1)
    return torch.sqrt(gx ** 2 + gy ** 2)
    #<<

step_img = torch.zeros(1, 784) - 1; step_img.view(28, 28)[:, 14:] = 1
e = edge_strength(step_img)[0, 0]
assert e[10, 3] < 1e-6 and e[10, 14] > 1, "edges must be zero on flat areas and large at the step"
print("TODO 5 works.")

with torch.no_grad():
    gen = decode(torch.randn(2000, ZDIM))
real = X[torch.randperm(len(X))[:2000]]
er, eg = edge_strength(real).flatten(1).mean(1), edge_strength(gen).flatten(1).mean(1)
plt.figure(figsize=(6, 3))
plt.hist(er.numpy(), bins=40, alpha=.6, label="real"); plt.hist(eg.numpy(), bins=40, alpha=.6, label="generated")
plt.xlabel("average edge strength per image"); plt.legend(); plt.title("Edge statistics: real vs generated"); plt.show()
print(f"average edge strength: real {er.mean():.2f}, generated {eg.mean():.2f}")
"""),
md(r"""
---
## Stage 7 · Display: put it on the wall (finished code, not from class)

The film plays on a screen seen in perspective. A **homography**, a 3 × 3 matrix $H$, maps each frame pixel to its place on the wall: $(u, v, s)^\top = H\,(x, y, 1)^\top$, then $(x', y') = (u/s, v/s)$. Four corner pairs fix $H$; OpenCV finds it. Run it and enjoy.
"""),
code(r"""
S = frames[0].shape[0]
H = cv2.getPerspectiveTransform(np.float32([[0, 0], [S - 1, 0], [S - 1, S - 1], [0, S - 1]]), np.float32(WALL))
RH, RW = 360, 640
room = np.zeros((RH, RW, 3), np.uint8); room[:] = (58, 58, 64)
cv2.fillPoly(room, [np.int32([[0, 300], [RW, 300], [RW, RH], [0, RH]])], (40, 36, 34))
mask = cv2.warpPerspective(np.full((S, S), 255, np.uint8), H, (RW, RH)) > 0
room_frames = []
for f in frames:
    lit = cv2.warpPerspective(cv2.cvtColor(f, cv2.COLOR_GRAY2RGB), H, (RW, RH))
    out = room.copy(); out[mask] = lit[mask]; room_frames.append(out)
save_gif(room_frames, "room.gif")
"""),
md(r"""
---
## Stage 8 · From model to system: the pipeline as a plan of tools

Each stage above is a **tool**: a function that takes something in and gives something back. A **plan** is a list of tool calls. Swap one tool, and you can watch what changes downstream. This is how systems that let a language model run vision tools work: the language model writes the plan, and the tools do the seeing.

The plans below work on 2,000 images so they run fast. Run them, then compare the last line of each.
"""),
code(r"""
def tool_load(state, n=2000):
    g = torch.Generator().manual_seed(SEED + 3)
    idx = torch.randperm(len(X_all), generator=g)[:n]
    return {**state, "x": X_all[idx], "y": y_all[idx], "note": f"{n} images, {torch.isin(y_all[idx], torch.tensor(remove_idx)).sum()} shirts"}

def tool_filter(state, by="cnn"):
    x = state["x"]
    with torch.no_grad():
        cnn_says = F.softmax(cnn(x.to(device)), 1).cpu()[:, remove_idx].sum(1) >= TAU
    clip_says = None
    if by != "cnn":
        clip_says = torch.isin((embed_images([to_pil(v) for v in x]) @ txt_emb.T).argmax(1), torch.tensor(remove_idx))
    flagged = {"cnn": lambda: cnn_says, "clip": lambda: clip_says,
               "both": lambda: cnn_says & clip_says, "either": lambda: cnn_says | clip_says}[by]()
    kept_y = state["y"][~flagged]
    leaked = torch.isin(kept_y, torch.tensor(remove_idx)).sum().item()
    lost = (~torch.isin(state["y"], torch.tensor(remove_idx)) & flagged).sum().item()
    return {**state, "x": x[~flagged], "y": kept_y, "note": f"filter by {by}: kept {len(kept_y)}, {leaked} shirts leaked, {lost} other images lost"}

def tool_generate(state, model="vae", steps=1500):
    dec, zd = train_generator(model, state["x"], steps)
    with torch.no_grad():
        smp = dec(torch.randn(500, zd))
    _, _, sh = judge(smp)
    return {**state, "samples": smp, "note": f"{model}: {sh[remove_idx].sum():.1%} of generated images look like shirts"}

TOOLS = {"load": tool_load, "filter": tool_filter, "generate": tool_generate}

def run(plan):
    state = {}
    t0 = time.time()
    for step, (name, args) in enumerate(plan, 1):
        state = TOOLS[name](state, **args)
        print(f"  {step}. {name}{args}: {state['note']}")
    print(f"  ({time.time() - t0:.0f} s)")
    return state

print("Plan A: filter with the CNN")
out_a = run([("load", {"n": 2000}), ("filter", {"by": "cnn"}), ("generate", {"model": "vae"})])

print("Plan B: filter only when the CNN and CLIP agree")
out_b = run([("load", {"n": 2000}), ("filter", {"by": "both"}), ("generate", {"model": "vae"})])
"""),
md(r"""
**Your turn.** Write a plan of your own: try `"by": "clip"` or `"by": "either"`, or `"model": "gan"`. Which plan leaks the fewest shirts into the art? Which one throws away the most good images? If a language model were writing these plans, what would it need to know to choose well?
"""),
md(r"""
---
## Report back

Show the class:
1. **One result** that surprised you: a GIF, a number, or a pair of pictures.
2. **One stage as an equation or pseudocode.**
3. **One finding**, in one sentence, and which lab idea it comes from.

**Done early?** Which stage would break first if you scaled up to Anadol's 100 million images, and why?
"""),
sol(r"""
---
## Teacher notes: what students should see

Measured on a CPU (2 threads), `SEED = 0`, so `MODEL = "auto"` trained the VAE. With the downloads cached, the whole notebook takes about 125 s; the first run adds the CLIP (about 600 MB) and Fashion-MNIST (31 MB) downloads. Not yet run on a GPU, where it would train the DCGAN instead.

| Stage | What we measured | The point to draw out |
|---|---|---|
| 1 · Data | 60,000 images, 6,000 per class. Shirts, T-shirts, pullovers and coats look alike. | Look before you train: the hard part of the task is visible in the raw data. |
| 2 · Curate, CNN | Accuracy 85%. The filter caught only about 60% of the shirts: **2,313 shirts leaked**, and 1,925 other images were removed by mistake, mostly T-shirts (630), pullovers (629) and coats (475). The histogram shows many shirts and non-shirts piled up near τ. | Errors are not random: what gets lost is the classes that look like shirts. That is a hidden group. |
| 2 · Curate, CLIP | Plain names ("a photo of a shirt"): 42% accuracy, **7%** of shirts caught. Descriptions ("a button-up shirt with a collar"): 56% accuracy, **32%** caught. Combined with the CNN: both agree catches 25%, either one catches 66% (3% false alarms). | Zero-shot is only as good as the words, and fine-grained classes are hard for it. Combining two judges trades misses for false alarms. |
| 3 · Represent | RSA with the category model: CNN 0.49, CLIP 0.40; CNN vs CLIP 0.54. | The CNN was trained on these labels; CLIP never saw them, yet still sorts partly by category. |
| 4 · Generate | VAE: 18 s to train, 1,000 images in 4 ms, 9 of 9 kept classes, CNN confidence 68%. Samples are recognizable but blurry. | Fast and varied, but blurry: the trilemma. |
| 4 · Trace the error | Shirts: 10.0% of the archive, 4.3% of the training data after the filter, **5.3% of the generated images**. | The filter's mistake reaches the art, and is even slightly amplified. A modular pipeline lets you see where it came in. |
| 4 · Copying | The closest training images are similar in shape but not copies; the generated images are blurry blends. Distance 6.6, versus 8.5 between real neighbors, because blur sits close to many images at once. | The VAE is averaging, not memorizing. Pixel distance alone can mislead. |
| 5 · Render | 694 of 4,000 samples look like dresses. The steered walk is 32% bags, 29% dresses, 12% sneakers. | Steering is one extra term, $w + \alpha\,s(t)\,d$: a nudge, not a command. |
| 6 · Evaluate | Edge strength: real 1.82, generated 1.51. | The blur shows up as weaker edges, a statistic a partner (or V1) can pick up: the metamer logic. |
| 8 · System | Plan A (filter by the CNN): 80 of 199 shirts leaked; 4.2% of generated images look like shirts. Plan B (only when both agree): 152 leaked; **8.2%** shirts. Plan A takes 6 s, Plan B 37 s (CLIP is the slow tool). | Swapping one tool changes the output downstream. A planner, human or language model, has to know what each tool is good at and what it costs. |
"""),
]

if __name__ == "__main__":
    write(CELLS, NAME)

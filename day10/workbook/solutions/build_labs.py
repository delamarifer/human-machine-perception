"""Build the Day 10 class-labs notebook in two versions (owner: Shreya).

    python3 day10/workbook/solutions/build_labs.py

Student version  -> day10/workbook/doodle-city-from-class-labs.ipynb
Solution version -> day10/workbook/solutions/doodle-city-from-class-labs-solutions.ipynb

Every stage reuses code from a class lab: Day 3 (filters, metamer test), Day 4 (the CNN), Day 5 (CLIP zero-shot, RSA),
Day 6 (check the data), Days 8-9 (GAN, VAE, latent walks, guidance). Same TODO markers as build.py.
"""
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
from build import md, code, sol, write  # noqa: E402

NAME = "doodle-city-from-class-labs"

CELLS = [
md(r"""
# A Doodle City, Built from Our Labs

**Day 10 · Human and Machine Perception**

Refik Anadol's *Machine Hallucination* took over 100 million photos of New York, removed every photo with a person in it, trained a StyleGAN on what was left, and turned walks through its latent space into a film on the walls of a room.

Today you rebuild that pipeline at toy scale, on doodles of a city from Google's *Quick, Draw!* game. **Every stage uses code you already wrote in a lab.**

| Stage | Anadol, NYC | Here | From our labs |
|---|---|---|---|
| **Data** | over 100M public photos | 55,000 doodles of a city, people included | **Day 6**: check the data |
| **Curate** | an algorithm removes the people | a CNN and CLIP zero-shot remove the people | **Day 4** CNN lab, **Day 5** CLIP lab |
| **Represent** | an embedding of every photo | CLIP and CNN embeddings, compared with RSA | **Day 5** CLIP and RSA labs |
| **Generate** | StyleGAN | a GAN or a VAE | **Days 8–9** workbooks |
| **Render** | walks through the latent space | a latent walk, steered toward a category | **Day 9** walk, **Day 8** guidance |
| **Evaluate** | (the audience) | can your partner tell real from generated? | **Day 3** metamer test and filters |
| **Display** | projected on the walls | warped onto a wall (finished code, not from class) | |

**How to use it:** run the cells top to bottom. When a cell stops with `NotImplementedError`, that is a **TODO**. Write the missing lines, delete the `raise` line, and run the cell again. A check right after each TODO tells you if it works.

| TODO | Stage | What you write | You did this in |
|---|---|---|---|
| 1 | Curate | the CNN's layers | Day 4, Your turn 1 |
| 2 | Curate | zero-shot predictions from CLIP similarities | Day 5, Your turn 3 |
| 3 | Represent | RSA: the Spearman correlation of two RDMs | Day 5 part 2, Your turn 3 |
| 4 | Render | spherical interpolation (slerp) | Day 9, the walk TODO, one step further |
| 5 | Evaluate | an edge map with a Sobel filter | Day 3, filtering lab |

**Runtime:** use a GPU if you can: in Colab, *Runtime → Change runtime type → T4 GPU*. On a GPU the notebook trains a convolutional GAN, which draws clean strokes. On a CPU it trains a VAE instead (fast, but blurry), and the first run takes about 5 minutes, most of it downloads.
"""),
code(r"""
# ---- Settings. Run as they are. ----
CITY = ["skyscraper", "bridge", "house", "car", "bus", "tree", "cloud", "streetlight", "traffic light"]
PEOPLE = ["face", "yoga"]           # doodles of people: the ones Anadol's team would remove
PER_CLASS = 5000                    # doodles per category (about 4 MB each to download)

TAU = 0.5                           # Stage 2: remove a doodle if the CNN gives the people classes more than this
TEMPLATE = "a drawing of a {}"      # Stage 2: CLIP prompt template (Day 5, Your turn 4)
PERSON_WORDS = ["person"]           # Stage 2: the words CLIP uses for people
N_CLIP = 1000                       # Stage 2: how many doodles CLIP checks (CLIP is slow on a CPU)

MODEL = "auto"                      # Stage 4: "vae", "gan" (Day 9), "dcgan" (convolutional, needs a GPU), or "auto"
TRAIN_STEPS = None                  # Stage 4: None = the default for the model (vae 4000, gan 4000, dcgan 3000)

WALK = "slerp"                      # Stage 5: "linear" or "slerp"
STEER_TO = "skyscraper"             # Stage 5: the city category the walk is pulled toward
SENSOR = "weather"                  # Stage 5: a made-up sensor that sets how hard it pulls
ALPHA = 2.0                         # Stage 5: how hard the steering pulls
WALL = [[150, 70], [500, 40], [520, 290], [140, 260]]   # Stage 7: screen corners in the room (x, y)
SEED = 0
"""),
md(r"""
## Setup

Loads CLIP exactly as in the Day 5 labs (`openai/clip-vit-base-patch32`, about 600 MB the first time), and fetches the doodles: only the first `PER_CLASS` drawings of each category, so the download stays small.
"""),
code(r"""
import io, os, time, urllib.request, urllib.parse
import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F
import matplotlib.pyplot as plt
import cv2
from PIL import Image
from scipy.stats import spearmanr
from transformers import CLIPModel, CLIPProcessor
from IPython.display import Image as ShowImage, display

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
torch.manual_seed(SEED); np.random.seed(SEED)
CLASSES = CITY + PEOPLE
people_idx = [CLASSES.index(c) for c in PEOPLE]

# ---- CLIP, as in the Day 5 labs ----
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
    # a doodle in [-1, 1] -> a PIL image with black strokes on white, the way people see a drawing
    a = ((1 - (x.view(28, 28).clamp(-1, 1) + 1) / 2) * 255).byte().numpy()
    return Image.fromarray(a).convert("RGB")

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

# ---- the doodles ----
QD = "https://storage.googleapis.com/quickdraw_dataset/full/numpy_bitmap/"
def load_doodles(name, n):
    # only the first n drawings of a category: an HTTP range request on the .npy file (28 x 28 pixels, 0-255)
    os.makedirs("data/quickdraw", exist_ok=True)
    path = f"data/quickdraw/{name.replace(' ', '_')}_{n}.npy"
    if os.path.exists(path):
        return np.load(path)
    req = urllib.request.Request(QD + urllib.parse.quote(name) + ".npy", headers={"Range": f"bytes=0-{1024 + 784 * n - 1}"})
    raw = urllib.request.urlopen(req).read()
    f = io.BytesIO(raw)
    version = np.lib.format.read_magic(f)
    (np.lib.format.read_array_header_1_0 if version == (1, 0) else np.lib.format.read_array_header_2_0)(f)
    arr = np.frombuffer(raw[f.tell():f.tell() + 784 * n], dtype=np.uint8).reshape(n, 784).copy()
    np.save(path, arr)
    return arr

def show_grid(x, title, n_row=2, labels=None):
    x = (x.view(-1, 28, 28).clamp(-1, 1) + 1) / 2
    per = x.shape[0] // n_row
    fig, axes = plt.subplots(n_row, per, figsize=(per * 0.9, n_row * 1.05))
    for k, ax in enumerate(np.array(axes).ravel()):
        ax.imshow(1 - x[k], cmap="gray", vmin=0, vmax=1); ax.axis("off")
        if labels is not None: ax.set_title(labels[k], fontsize=7)
    plt.suptitle(title); plt.tight_layout(); plt.show()

def save_gif(frames, path, ms=60):
    imgs = [Image.fromarray(f) for f in frames]
    imgs[0].save(path, save_all=True, append_images=imgs[1:], duration=ms, loop=0)
    display(ShowImage(filename=path)); print("saved", path, f"({len(frames)} frames)")
"""),
md(r"""
---
## Stage 1 · Data: look before you use it (Day 6)

Doodles that players of *Quick, Draw!* drew in under 20 seconds each, 28 × 28 pixels, scaled to [-1, 1]. Our city has buildings, traffic and weather, and also people.

Day 6 asked: *is this dataset right for my task?* Before training anything, look at what is in it. Each category was labeled by the word the player was asked to draw, not by what they actually drew.
"""),
code(r"""
t0 = time.time()
X_all = torch.tensor(np.concatenate([load_doodles(c, PER_CLASS) for c in CLASSES])).float() / 127.5 - 1
y_all = torch.arange(len(CLASSES)).repeat_interleave(PER_CLASS)
print(f"{len(X_all):,} doodles in {len(CLASSES)} categories, loaded in {time.time() - t0:.0f} s")
g = torch.Generator().manual_seed(SEED)
pick = torch.cat([torch.nonzero(y_all == c).ravel()[torch.randperm(PER_CLASS, generator=g)[:2]] for c in range(len(CLASSES))])
show_grid(X_all[pick].view(-1, 784)[[i for j in range(2) for i in range(j, len(pick), 2)]], "Two doodles per category: is every label right?",
          n_row=2, labels=[CLASSES[c] for _ in range(2) for c in range(len(CLASSES))])
"""),
md(r"""
---
## Stage 2 · Curate: remove the people (Days 4 and 5)

Anadol's team could not check millions of photos by hand, so **a model decided** which ones had people in them. We try two kinds of model:

1. **A CNN we train on labeled doodles** (the Day 4 CNN). It learns our categories from examples.
2. **CLIP, zero-shot** (Day 5). It never saw our doodles: we only give it words.

The CNN gives a probability for each category. We **keep** a doodle when the people categories together get less than $\tau$ (`TAU`):

$$\text{keep } x \iff \sum_{c \,\in\, \text{people}} p(c \mid x) < \tau$$
"""),
code(r"""
class CNN(nn.Module):
    # The Day 4 lab CNN, with one score per doodle category
    def __init__(self, n_classes):
        super().__init__()
        #>> TODO 1: the Day 4 layers: conv1 (1 -> 24 filters, 3 x 3), pool1 (max, 2 x 2), conv2 (24 -> 36, 3 x 3), pool2 (max, 2 x 2)
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

assert CNN(len(CLASSES))(torch.zeros(2, 784)).shape == (2, len(CLASSES)), "the CNN must give one score per category"
print("TODO 1 works.")

torch.manual_seed(SEED)
cnn = CNN(len(CLASSES)).to(device)
opt = torch.optim.Adam(cnn.parameters(), lr=1e-3)
t0 = time.time()
for idx in torch.randperm(len(X_all)).split(128):            # one pass over the data
    loss = F.cross_entropy(cnn(X_all[idx].to(device)), y_all[idx].to(device))
    opt.zero_grad(); loss.backward(); opt.step()
cnn.eval()
with torch.no_grad():
    probs = torch.cat([F.softmax(cnn(X_all[i:i + 4096].to(device)), 1).cpu() for i in range(0, len(X_all), 4096)])
print(f"CNN trained in {time.time() - t0:.0f} s, accuracy {(probs.argmax(1) == y_all).float().mean():.1%}")

is_person = torch.isin(y_all, torch.tensor(people_idx))
keep = probs[:, people_idx].sum(1) < TAU
leaked, lost = (keep & is_person).sum().item(), (~keep & ~is_person).sum().item()
print(f"CNN filter: kept {keep.sum():,} of {len(X_all):,}; {leaked} people leaked through; {lost} city doodles lost")
X, y = X_all[keep], y_all[keep]
show_grid(X_all[keep & is_person][:10], "Leaked: people the CNN missed", n_row=1)
show_grid(X_all[~keep & ~is_person][:10], "Lost: city doodles the CNN removed", n_row=1,
          labels=[CLASSES[c] for c in y_all[~keep & ~is_person][:10]])
"""),
md(r"""
### CLIP, zero-shot: words instead of training

As in Day 5: embed every doodle and every caption, then pick the caption with the highest cosine similarity. The captions are the city categories plus "person", each written as "a drawing of a ...". CLIP checks 1,000 doodles, half people and half city, because it is slow on a CPU.
"""),
code(r"""
g = torch.Generator().manual_seed(SEED)
sub = torch.cat([torch.nonzero(is_person).ravel()[torch.randperm(int(is_person.sum()), generator=g)[:N_CLIP // 2]],
                 torch.nonzero(~is_person).ravel()[torch.randperm(int((~is_person).sum()), generator=g)[:N_CLIP // 2]]])
t0 = time.time()
img_emb = embed_images([to_pil(X_all[i]) for i in sub])
words = CITY + PERSON_WORDS
txt_emb = embed_texts([TEMPLATE.format(w) for w in words])
sims = img_emb @ txt_emb.T                                   # (N_CLIP, number of captions)
print(f"CLIP embedded {len(sub)} doodles in {time.time() - t0:.0f} s")

#>> TODO 2: pred = the index of the most similar caption for each doodle (one integer per row of sims)
pred = sims.argmax(dim=1)
#<<
assert pred.shape == (len(sub),), "pred must have one caption index per doodle"
print("TODO 2 works.")

clip_says_person = pred >= len(CITY)
truth = is_person[sub]
cnn_says_person = ~keep[sub]
for name, says in [("CLIP, zero-shot", clip_says_person), ("CNN, trained", cnn_says_person)]:
    caught = (says & truth).float().sum() / truth.sum()
    false_alarm = (says & ~truth).float().sum() / (~truth).sum()
    print(f"{name:16s} catches {caught:.0%} of the people; flags {false_alarm:.0%} of the city doodles as people")
"""),
md(r"""
---
## Stage 3 · Represent: do CLIP and our CNN see the city the same way? (Day 5, RSA)

Take 10 doodles from each city category. For each model, build a **representational dissimilarity matrix** (RDM): entry $(i, j)$ is $1 - \cos(z_i, z_j)$. Then compare two RDMs with **RSA**: the Spearman correlation of their upper triangles, as in the Day 5 part 2 lab.
"""),
code(r"""
g = torch.Generator().manual_seed(SEED + 1)
ten = torch.cat([torch.nonzero(y == CLASSES.index(c)).ravel()[torch.randperm(int((y == CLASSES.index(c)).sum()), generator=g)[:10]] for c in CITY])
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
for ax, (name, r) in zip(axes, [("CNN (trained on our doodles)", rdm_cnn), ("CLIP (never saw them)", rdm_clip), ("category model", rdm_category)]):
    ax.imshow(r, cmap="gray_r"); ax.set_title(name, fontsize=10)
    ax.set_xticks(np.arange(5, 10 * len(CITY), 10)); ax.set_xticklabels(CITY, rotation=60, ha="right", fontsize=7)
    ax.set_yticks(np.arange(5, 10 * len(CITY), 10)); ax.set_yticklabels(CITY, fontsize=7)
plt.tight_layout(); plt.show()
print(f"RSA, CNN vs categories:  {rsa(rdm_cnn, rdm_category):.2f}")
print(f"RSA, CLIP vs categories: {rsa(rdm_clip, rdm_category):.2f}")
print(f"RSA, CNN vs CLIP:        {rsa(rdm_cnn, rdm_clip):.2f}")
"""),
md(r"""
---
## Stage 4 · Generate: a GAN or a VAE (Days 8–9)

Three choices, all from Days 8–9:
- `"vae"`: the Day 9 Track A VAE. Fast to train, but blurry.
- `"gan"`: the Day 9 Track B GAN, made of fully connected layers. Fast, but its strokes come out noisy.
- `"dcgan"`: the same GAN game with **convolutional** layers (Day 4), the idea StyleGAN grew from. Sharp strokes, but slow to train without a GPU.

`MODEL = "auto"` picks `"dcgan"` on a GPU and `"vae"` on a CPU. Day 8 ended on the **generative trilemma**: a model family rarely gets *quality*, *variety* and *speed* all at once. Anadol's MoMA piece had to make new images **live**, which is one reason it used a GAN.

We measure all three. **Speed:** time to make 1,000 images. **Variety:** how many city categories the CNN finds among them. **Quality:** how sure the CNN is about each one, on average.
"""),
code(r"""
def make_gan(z):
    # the Day 9 GAN: fully connected layers
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
    # a DCGAN discriminator: a small CNN, like Day 4's
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(nn.Conv2d(1, 64, 4, 2, 1), nn.LeakyReLU(0.2), nn.Conv2d(64, 128, 4, 2, 1), nn.BatchNorm2d(128),
                                 nn.LeakyReLU(0.2), nn.Flatten(), nn.Linear(128 * 7 * 7, 1))
    def forward(self, x):
        return self.net(x.view(-1, 1, 28, 28))

def make_model(kind, z):
    return make_gan(z) if kind == "gan" else (ConvG(z), ConvD())

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
        zz = mu + torch.exp(logvar / 2) * torch.randn_like(mu)       # the reparameterization trick (Day 9, TODO 3)
        return self.dec(zz), mu, logvar

def train_vae(vae, data, steps, lr=1e-3):
    vae = vae.to(device); opt = torch.optim.Adam(vae.parameters(), lr=lr)
    for step in range(steps):
        x = data[torch.randint(0, len(data), (128,))].to(device)
        rec, mu, logvar = vae(x)
        loss = ((rec - x) ** 2).sum(1).mean() + (-0.5 * (1 + logvar - mu ** 2 - logvar.exp()).sum(1)).mean()
        opt.zero_grad(); loss.backward(); opt.step()
    return vae.eval()

def judge(samples):
    # the CNN as the judge: variety = city categories that get at least 2% of samples; quality = average confidence
    with torch.no_grad():
        p = F.softmax(cnn(samples.to(device)), 1).cpu()
    share = torch.bincount(p.argmax(1), minlength=len(CLASSES)).float() / len(p)
    return int((share[:len(CITY)] >= 0.02).sum()), p.max(1).values.mean().item(), share

KIND = MODEL if MODEL != "auto" else ("dcgan" if device.type == "cuda" else "vae")
STEPS = TRAIN_STEPS or {"vae": 4000, "gan": 4000, "dcgan": 3000}[KIND]
ZDIM = 16 if KIND == "vae" else 64
torch.manual_seed(SEED)
t0 = time.time()
if KIND == "vae":
    vae = train_vae(VAE(ZDIM), X, STEPS)
    decode = lambda zz: vae.dec(zz.to(device)).cpu()
else:
    G, Dn = make_model(KIND, ZDIM)
    G = train_gan(G, Dn, X, STEPS, ZDIM, lr=5e-4 if KIND == "gan" else 2e-4)
    decode = lambda zz: G(zz.to(device)).cpu()
train_s = time.time() - t0
with torch.no_grad():
    t0 = time.time(); samples = decode(torch.randn(1000, ZDIM)); sample_s = time.time() - t0
variety, quality, share = judge(samples)
show_grid(samples[:20], f"Samples from the {KIND.upper()}")
print(f"{KIND.upper()}: trained in {train_s:.0f} s | speed: 1,000 images in {sample_s * 1000:.0f} ms | "
      f"variety: {variety} of {len(CITY)} city categories | quality: CNN confidence {quality:.0%} | people: {share[people_idx].sum():.1%}")
"""),
md(r"""
---
## Stage 5 · Render: walk through the latent space (Days 8–9)

In the Day 9 workbook you walked in a straight line, $w(t) = (1 - t)\,a + t\,b$. Random Gaussian vectors in many dimensions all have about the same length, so the middle of that line is shorter than anything the generator saw in training. **Slerp** follows the arc instead. With $\cos \Omega = \frac{a \cdot b}{\|a\|\,\|b\|}$:

$$\text{slerp}(a, b, t) = \frac{\sin\big((1 - t)\,\Omega\big)}{\sin \Omega}\, a + \frac{\sin(t\,\Omega)}{\sin \Omega}\, b$$

**Steering (like guidance, Day 8).** Guidance pushes generation toward what you asked for. We find the direction $d$ in the latent space that leads to skyscrapers (the average code of samples the CNN calls a skyscraper, minus the average of all codes) and push the walk along it, as hard as a made-up weather sensor says: $w \leftarrow w + \alpha\, s(t)\, d$.
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

direction = torch.zeros(ZDIM)
if STEER_TO is not None:
    zz = torch.randn(4000, ZDIM)
    with torch.no_grad():
        called = F.softmax(cnn(decode(zz).to(device)), 1).argmax(1).cpu() == CLASSES.index(STEER_TO)
    direction = zz[called].mean(0) - zz.mean(0)
    direction = direction / direction.norm()
    print(f"{int(called.sum())} of 4000 samples look like a {STEER_TO}; steering toward them")

def sensor(frac):
    if SENSOR == "weather": return float(np.sin(2 * np.pi * 2 * frac) + 0.3 * np.random.randn())
    if SENSOR == "clock": return float(frac)
    return 1.0 if STEER_TO is not None else 0.0

torch.manual_seed(SEED); np.random.seed(SEED)
N_KEY, PER_STEP = 6, 12
keys = torch.randn(N_KEY, ZDIM)
interp = slerp if WALK == "slerp" else lerp
ws = []
for k in range(N_KEY):
    for t in torch.linspace(0, 1, PER_STEP + 1)[:-1]:
        ws.append(interp(keys[k], keys[(k + 1) % N_KEY], t) + ALPHA * sensor(len(ws) / (N_KEY * PER_STEP)) * direction)
with torch.no_grad():
    imgs = F.interpolate(decode(torch.stack(ws)).view(-1, 1, 28, 28), size=112, mode="bilinear", align_corners=False)
frames = [((1 - (im[0].clamp(-1, 1) + 1) / 2) * 255).byte().numpy() for im in imgs]
save_gif(frames, "walk.gif")
with torch.no_grad():
    walk_share = torch.bincount(F.softmax(cnn(decode(torch.stack(ws)).to(device)), 1).argmax(1).cpu(), minlength=len(CLASSES)).float() / len(ws)
top = walk_share.argsort(descending=True)[:3]
print("the walk looks most like:", ", ".join(f"{CLASSES[i]} {walk_share[i]:.0%}" for i in top))
"""),
md(r"""
---
## Stage 6 · Evaluate: can your partner tell? (Day 3)

In the Day 3 metamers lab, a partner tried to tell an original from a synthesized texture. Same test here. **Partner:** look at the 12 doodles below and write down which ones you think the model made. Then run the next cell for the answers.
"""),
code(r"""
rng = np.random.default_rng(SEED)
real6 = X[torch.tensor(rng.choice(len(X), 6, replace=False))]
with torch.no_grad():
    fake6 = decode(torch.randn(6, ZDIM))
order = rng.permutation(12)
quiz = torch.cat([real6, fake6])[order]
show_grid(quiz, "Real or generated?", n_row=2, labels=[str(k + 1) for k in range(12)])
"""),
code(r"""
answer = ["real" if o < 6 else "generated" for o in order]
print("Answers:", ", ".join(f"{k + 1}: {a}" for k, a in enumerate(answer)))
"""),
md(r"""
### What separates them? Edge statistics (Day 3)

A metamer matches the *statistics* that a perceiver measures. Measure one statistic for real and generated doodles: how strong the edges are. The Sobel filter from the Day 3 filtering lab, run as a convolution (Day 4), gives the horizontal and vertical change at every pixel; the edge strength is $\sqrt{g_x^2 + g_y^2}$.
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
plt.xlabel("average edge strength per doodle"); plt.legend(); plt.title("Edge statistics: real vs generated"); plt.show()
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
## Report back

Show the class:
1. **One result** that surprised you: a GIF, a number, or a pair of pictures.
2. **One stage as an equation or pseudocode.**
3. **One finding**, in one sentence, and **which lab** it comes from.

**Done early?** Which stage would break first if you scaled up to Anadol's 100 million images, and why?
"""),
sol(r"""
---
## Teacher notes: what students should see

Measured on a CPU (2 threads), `SEED = 0`, so `MODEL = "auto"` trained the VAE. With the downloads cached, a full run takes about 75 s; the first run adds about 2 minutes to download CLIP and the doodles.

| Stage | What we measured | The point to draw out |
|---|---|---|
| 2 · Curate | CNN accuracy 86%. The filter kept 44,908 of 55,000: **1,358 people leaked**, 1,450 city doodles lost. The leaked grid is mostly faces without an outline and stick figures. CLIP zero-shot caught only **37%** of the people; the trained CNN caught 87%. | Two filters, two kinds of knowledge: labels (Day 4) vs words (Day 5). Neither is clean, and what they miss is a hidden group (Day 6). |
| 3 · Represent | RSA with the category model: CNN 0.43, CLIP 0.29; CNN vs CLIP 0.45. | The CNN was trained on these categories; CLIP never saw doodles, yet it still sorts them partly by category. |
| 4 · Generate | VAE: 17 s to train, blurry, covers 9 of 9 city categories, 4% of samples look like people. | The leaked people show up in the art. The VAE is fast but blurry: the trilemma (Day 8). |
| 5 · Render | 622 of 4,000 samples look like skyscrapers; the steered walk is about 12% skyscrapers (streetlights dominate). | Steering is one extra term, $w + \alpha\,s(t)\,d$, the same idea as guidance (Day 8). |
| 6 · Evaluate | Edge strength: real doodles 2.41, VAE 1.73. | The VAE's blur shows up as weaker edges, a statistic a partner (or V1) can pick up: the Day 3 metamer logic. |

For the discussion, measured with other settings: the Day 9 GAN trains in 45 s with noisier strokes and 12% people; a convolutional GAN draws sharp strokes but took 547 s on the CPU.
"""),
]

if __name__ == "__main__":
    write(CELLS, NAME)

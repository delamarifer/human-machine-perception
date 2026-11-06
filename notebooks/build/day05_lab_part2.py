"""Builds notebooks/day05-lab-part2-views-rsa.ipynb: Day 5 part 2 lab (Fernanda's hour, after the reading).
Konkle & Alvarez 2022 tested on CLIP: views and instance discrimination (the reading's objective), then
dissimilarity matrices and RSA. Your turn 1-3. Standalone: its own setup, so it runs on a fresh Colab runtime
without part 1 (notebooks/day05-lab-clip-embeddings.ipynb, built by day05_lab.py, owned by the s7-8 session).
The setup cell and the helpers it needs are copied from day05_lab.py; keep them in step if CLIP loading changes.
Model: CLIP ViT-B/32 (OpenAI) from Hugging Face, openai/clip-vit-base-patch32. Data: CIFAR-10 test set
(Krizhevsky, 2009), the Hugging Face copy uoft-cs/cifar10 (24 MB, original order; the original server is slow). No API keys, no GPU needed.
Build: python3 notebooks/build/day05_lab_part2.py [--teacher | --solved out.ipynb]. --teacher also writes
notebooks/teacher/day05-lab-part2-solutions.json (git-ignored), which slides 25 and 28 read with ?teacher on localhost."""
import os
import nbtools
from nbtools import md, code, hidden, turn, answer, resources, badge, main

# The solutions live in a git-ignored file, private/day05_lab_part2_solutions.py (the repository is public).
try:
    from private.day05_lab_part2_solutions import SOL, ANSWERS
except ImportError:
    SOL, ANSWERS = {}, {}

FILE = 'day05-lab-part2-views-rsa.ipynb'
BOOK = 'https://visionbook.mit.edu'
KONKLE = 'https://konklab.fas.harvard.edu/Papers/Konkle_2022_NatComm.pdf'

# Teacher build only: the solutions keyed by exercise cell id, for the slides (same format as day05_lab.py).
_nbtools_build = nbtools.build
def _build(*args, **kwargs):
    nb = _nbtools_build(*args, **kwargs)
    if (args[0] if args else kwargs.get('mode')) == 'teacher':
        import json
        out = {}
        for k, cell in enumerate(nb.cells[:-1]):
            name = cell.get('id', '')
            if not name.startswith('solution-'):
                continue
            n = name[len('solution-'):]
            if n.endswith('-answer') or (cell.cell_type == 'markdown' and cell.source.strip() != '#### Solution'):
                out['turn-' + n.replace('-answer', '') + '-answer'] = cell.source.replace('#### Solution', '', 1).strip()
            elif nb.cells[k + 1].cell_type == 'code':
                out['turn-' + n] = nb.cells[k + 1].source
        os.makedirs(nbtools.TEACHER_DIR, exist_ok=True)
        path = os.path.join(nbtools.TEACHER_DIR, 'day05-lab-part2-solutions.json')
        with open(path, 'w') as f:
            json.dump(out, f, indent=1)
        print('wrote', path, '(slide solutions, git-ignored)')
    return nb
nbtools.build = _build

# ---------------------------------------------------------------------------------------------
md(f"""
{badge(FILE)}

# Day 5 part 2 · Views and representations

**Human-Machine Perception** · Day 5, hour 2, lab part 2 · Fernanda & Shreya

The reading, Konkle & Alvarez (2022), trains a network with no labels: several **views** of each image
(crops, color changes) must land close together and away from other images. Here you test their idea on CLIP,
a network trained with contrastive learning on images and captions, never on the class labels we use.

By the end you will be able to:

1. make **views** of an image and test whether each view is closest to its own image, the reading's objective
2. build **dissimilarity matrices** (RDMs) and compare representations with **RSA**

**How to use this notebook.** Click a gray code cell and press **Shift + Enter** to run it. Run the cells in
order. Cells marked **Your turn** are for you: they run as they are (if you leave one blank, the notebook uses the
course's answer so later cells still work), and use your version once you fill it in.

**Time.** About 15 minutes. No GPU needed. The first run downloads CLIP (about 600 MB) and the CIFAR-10 test
images (24 MB), which takes about a minute on Colab. This notebook stands on its own: you don't need to
have run part 1.
""")

md("""
## 0 · Set up

Run the next two cells. The first loads the libraries, CLIP, and the images. The second holds the lab's
**helper code**, folded away; you don't need to read it.
""")
code("""
import sys, time, io
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import torch
import torchvision.transforms as T
import transformers
from transformers import CLIPModel, CLIPProcessor
from huggingface_hub import hf_hub_download
from PIL import Image
from scipy.stats import spearmanr

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("Python       ", sys.version.split()[0])
print("PyTorch      ", torch.__version__)
print("transformers ", transformers.__version__)
print("device       ", device)

t0 = time.time()
MODEL_NAME = "openai/clip-vit-base-patch32"
model = CLIPModel.from_pretrained(MODEL_NAME).to(device).eval()
processor = CLIPProcessor.from_pretrained(MODEL_NAME)

# The CIFAR-10 test set (Krizhevsky, 2009): 10,000 images, 32 x 32 pixels, in the original order. We take the
# Hugging Face copy (one 24 MB file) because the original server is slow.
class CIFAR10Test(list):
    # a list of (image, label) pairs, with .classes and .targets like torchvision's CIFAR10
    classes = ["airplane", "automobile", "bird", "cat", "deer", "dog", "frog", "horse", "ship", "truck"]

table = pd.read_parquet(hf_hub_download("uoft-cs/cifar10", "plain_text/test-00000-of-00001.parquet",
                                        repo_type="dataset"))
cifar = CIFAR10Test((Image.open(io.BytesIO(img["bytes"])).convert("RGB"), int(label))
                    for img, label in zip(table["img"], table["label"]))
cifar.targets = [label for _, label in cifar]
CLASSES = cifar.classes
N = 500    # part 1 used the first 500 test images; part 2 uses images after them
print(f"\\nCLIP and {len(cifar):,} CIFAR-10 test images loaded in {time.time() - t0:.0f} s")
print("classes:", CLASSES)
""")

hidden('''
#@title Helper code: run this cell (no need to read it)

def _as_tensor(out):
    """CLIP's get_image_features returns a tensor in most versions of transformers, an output object in some."""
    if torch.is_tensor(out):
        return out
    for name in ("image_embeds", "pooler_output"):
        if getattr(out, name, None) is not None:
            return getattr(out, name)
    return out[0]


@torch.no_grad()
def embed_images(images, batch_size=64):
    """A list of PIL images -> one CLIP embedding per image, scaled to length 1. Shape (n, 512)."""
    chunks = []
    for i in range(0, len(images), batch_size):
        inputs = processor(images=images[i:i + batch_size], return_tensors="pt").to(device)
        chunks.append(_as_tensor(model.get_image_features(**inputs)).float().cpu())
    emb = torch.cat(chunks)
    return emb / emb.norm(dim=1, keepdim=True)


def first_of_each_class(per_class=1, start=0):
    """Indices of the first `per_class` test images of each class (after position `start`), class by class."""
    out = []
    for c in range(len(CLASSES)):
        idx = [i for i in range(start, len(cifar)) if cifar.targets[i] == c][:per_class]
        out += idx
    return out


def show_images(images, titles=None, cols=10, size=1.3):
    rows = int(np.ceil(len(images) / cols))
    plt.figure(figsize=(cols * size, rows * size * 1.15))
    for i, im in enumerate(images):
        plt.subplot(rows, cols, i + 1)
        plt.imshow(im)
        if titles is not None:
            plt.title(titles[i], fontsize=8)
        plt.axis("off")
    plt.tight_layout()
    plt.show()


def nearest_other(emb):
    """For each row, the index of the most similar OTHER row (by cosine similarity)."""
    sims = emb @ emb.T
    sims.fill_diagonal_(-2)
    return sims.argmax(dim=1)


def upper(m):
    """The numbers above the diagonal of a square matrix, as one long vector (each pair once)."""
    m = np.asarray(m)
    i, j = np.triu_indices(len(m), k=1)
    return m[i, j]


# The course's answers, used when a Your turn cell is left blank.
def course_instance_accuracy(emb, owner):
    return (owner[nearest_other(emb)] == owner).float().mean().item()

def course_rsa(rdm_a, rdm_b):
    return spearmanr(upper(rdm_a), upper(rdm_b)).correlation

print("helpers ready")
''')

# ---------------------------------------------------------------------------------------------
md(f"""
## The reading's idea

In the reading, Konkle and Alvarez train a network to do one thing: map several **views** of the same
image (crops, rescaling, color changes) close together, and away from other images. They never use a
category label. Here we turn their objective into a test, and run it on CLIP.

## 1 · Views and the instance test

First, make views. Each kind of view changes the image in one way.
""")
code("""
VIEWS = {
    "crop":  T.RandomResizedCrop(32, scale=(0.4, 1.0)),
    "color": T.ColorJitter(brightness=0.5, contrast=0.5, saturation=0.8, hue=0.3),
    "both":  T.Compose([T.RandomResizedCrop(32, scale=(0.4, 1.0)),
                        T.ColorJitter(brightness=0.5, contrast=0.5, saturation=0.8, hue=0.3)]),
}
torch.manual_seed(0)
twenty = first_of_each_class(per_class=2, start=N)     # 20 images we have not used yet, 2 per class
twenty_images = [cifar[i][0] for i in twenty]
n_views = 5

example = twenty_images[0]
for kind, tf in VIEWS.items():
    show_images([example] + [tf(example) for _ in range(n_views)],
                ["original"] + [f"{kind} view {k + 1}" for k in range(n_views)], cols=6, size=1.4)
""")
md("""
Now embed five views of each of the 20 images, for each kind of view. `owner` says which image each view
came from (0 to 19). The **instance test**: for every view, find the most similar *other* view
(`nearest_other`). If it is a view of the same image, CLIP has kept what makes that image itself.
""")
code("""
view_emb, owner = {}, torch.arange(len(twenty_images)).repeat_interleave(n_views)
t0 = time.time()
for kind, tf in VIEWS.items():
    torch.manual_seed(1)
    views = [tf(im) for im in twenty_images for _ in range(n_views)]
    view_emb[kind] = embed_images(views)
print(f"embedded {sum(len(v) for v in view_emb.values())} views in {time.time() - t0:.0f} s")
print("owner of the first 12 views:", owner[:12].tolist())
""")
md("""
**Your turn 1 · Instance accuracy.** For one kind of view, `nearest_other(emb)` gives, for each view, the
index of its most similar other view. The view's partner is correct when `owner` of that neighbor equals the
view's own `owner`. Write the fraction of views whose nearest neighbor is a view of the same image. Chance is
4 out of 99, about 4%.
""")
turn("""
# YOUR TURN 1 · The fraction of views whose nearest other view comes from the same image.
def instance_accuracy(emb, owner):
    return None    # replace None: use nearest_other(emb) and owner

for kind, emb in view_emb.items():
    acc = instance_accuracy(emb, owner)
    if acc is None:
        acc = course_instance_accuracy(emb, owner)
        note = "  (Your turn 1 is blank: course's answer)"
    else:
        note = ""
    print(f"{kind:6s} views: instance accuracy {float(acc):.0%}{note}")
""", SOL.get(1, ""))
resources(('Ch. 30.10, Contrastive learning', f'{BOOK}/representation_learning.html'),
          ('Konkle & Alvarez 2022, Results: instance-prototype contrastive learning', KONKLE),
          ('Boolean comparison and .float().mean() in PyTorch', 'https://pytorch.org/docs/stable/generated/torch.eq.html'))

md("""
### Your turn 2 · Talk it over

Which kind of view does CLIP tolerate best, and which worst? CLIP was trained to match images with
captions, not to match crops of one image. In the book's toy experiment (Ch. 30.10.2), whatever the two
views differ in, the embedding learns to ignore. Konkle and Alvarez put color changes in their views: what
would their network then be blind to? Would you want that in a model of human vision?
""")
answer(ANSWERS.get(2, ""))

md("""
## 2 · Comparing representations with RSA

Konkle and Alvarez compare a network with the brain by comparing **dissimilarity matrices**: for every
pair of images, how different are they in this representation? Here we have no brain data, so we compare
three representations of the same 100 images (10 per class):

- **CLIP**: 1 − cosine similarity of the embeddings
- **pixels**: 1 − correlation of the raw pixel values
- **category model**: 0 if two images share a class, 1 if not. A hypothesis, not a measurement.
""")
code("""
hundred = first_of_each_class(per_class=10, start=N + 100)
hundred_images = [cifar[i][0] for i in hundred]
hundred_labels = np.array([cifar.targets[i] for i in hundred])

clip_emb = embed_images(hundred_images).numpy()
rdm_clip = 1 - clip_emb @ clip_emb.T

pixels = np.stack([np.asarray(im, dtype=float).ravel() for im in hundred_images])
rdm_pixels = 1 - np.corrcoef(pixels)

rdm_category = (hundred_labels[:, None] != hundred_labels[None, :]).astype(float)

fig, axes = plt.subplots(1, 3, figsize=(13, 4.3))
for ax, (name, rdm) in zip(axes, [("CLIP", rdm_clip), ("pixels", rdm_pixels), ("category model", rdm_category)]):
    ax.imshow(rdm, cmap="gray_r")
    ax.set_title(f"{name} RDM")
    ax.set_xticks(np.arange(5, 100, 10)); ax.set_xticklabels(CLASSES, rotation=60, ha="right", fontsize=7)
    ax.set_yticks(np.arange(5, 100, 10)); ax.set_yticklabels(CLASSES, fontsize=7)
plt.tight_layout(); plt.show()
""")
md("""
**Your turn 3 · RSA.** Two RDMs agree when the same pairs are close in both. Take the numbers above the
diagonal of each matrix (`upper(rdm)`, each pair once) and compute their **Spearman rank correlation**
with `spearmanr`. Compare CLIP with the category model, and the pixels with the category model.
""")
turn("""
# YOUR TURN 3 · Spearman correlation between the upper triangles of two RDMs.
def rsa(rdm_a, rdm_b):
    return None    # replace None: use upper(...) and spearmanr(...).correlation

for name, rdm in [("CLIP", rdm_clip), ("pixels", rdm_pixels)]:
    r = rsa(rdm, rdm_category)
    if r is None:
        r = course_rsa(rdm, rdm_category)
        note = "  (Your turn 3 is blank: course's answer)"
    else:
        note = ""
    print(f"{name:6s} vs category model: Spearman r = {r:.2f}{note}")
""", SOL.get(3, ""))
resources(('scipy.stats.spearmanr', 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.spearmanr.html'),
          ('numpy.triu_indices', 'https://numpy.org/doc/stable/reference/generated/numpy.triu_indices.html'),
          ('Konkle & Alvarez 2022, Results: relationship to human brain responses', KONKLE))
md("""
CLIP never saw these ten labels, yet its RDM shares structure with the category model, far more than the
pixels do. This is the reading's first result, in miniature: category structure can emerge from an
objective that is not about categories. (CLIP's objective did use captions, which often name the object;
the reading's network had no words at all.)
""")

md("""
## What you learned

- **Views**: a contrastive network keeps what its views share and ignores what they change. You measured
  which changes CLIP tolerates.
- **RSA** compares representations through their dissimilarity matrices, which is how the reading compares
  networks with the brain.

**Homework.** Finish this notebook if you did not in class.
""")

if __name__ == '__main__':
    main(FILE, private_solutions=True)

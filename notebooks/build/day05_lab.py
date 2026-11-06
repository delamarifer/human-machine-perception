"""Builds notebooks/day05-lab-clip-embeddings.ipynb: the Day 5 lab for Fernanda's hour (hour 2).
Lab part 1 (part 2, views and RSA, is its own notebook since 2026-11-06: build/day05_lab_part2.py, day05-s9-10).
  Part 1 (step by step with the slides, each concept followed by its code): embed images and captions with CLIP,
  cosine similarity, the contrastive loss (InfoNCE), zero-shot classification, your own captions. Your turn 1-4.
  Cells a slide links to have fixed ids: turn-N, plus embed (section 1) and try-classes (see CELL_IDS).
Model: CLIP ViT-B/32 (OpenAI) from Hugging Face, openai/clip-vit-base-patch32. Data: CIFAR-10 test set
(Krizhevsky, 2009), the Hugging Face copy uoft-cs/cifar10 (same images and order as torchvision's). No API keys, no GPU needed.
See nbtools.py for how to build and check it."""
from nbtools import md, code, hidden, turn, answer, resources, badge, main

# The solutions live in a git-ignored file, private/day05_lab_solutions.py (the repository is public).
# Without it, this script still builds the student notebook; --teacher and --solved need it.
try:
    from private.day05_lab_solutions import SOL, ANSWERS
except ImportError:
    SOL, ANSWERS = {}, {}

FILE = 'day05-lab-clip-embeddings.ipynb'

# Fixed ids for the non-exercise cells a slide links to (<notebook url>#scrollTo=<id>), matched by the cell's
# first line. nbtools gives exercise cells turn-N on its own.
import os
import nbtools
CELL_IDS = {'# 1 · Ten images': 'embed', '# TRY IT · Leave classes out': 'try-classes'}
_nbtools_build = nbtools.build
def _build_with_ids(*args, **kwargs):
    nb = _nbtools_build(*args, **kwargs)
    for cell in nb.cells:
        for first_line, name in CELL_IDS.items():
            if cell.source.startswith(first_line):
                cell.id = name
                cell.metadata['id'] = name
    if (args[0] if args else kwargs.get('mode')) == 'teacher':
        _write_slide_solutions(nb)
    return nb

def _write_slide_solutions(nb):
    """Teacher build only: notebooks/teacher/day05-lab-solutions.json (git-ignored, never committed), the
    solution under each exercise keyed by the exercise's cell id (turn-N; a talk-it-over answer is turn-N-answer).
    On Fernanda's machine the Day 5 code slides read it (localhost only) and show a collapsed Solution block;
    on the public site the file does not exist and nothing shows."""
    import json
    out = {}
    for k, cell in enumerate(nb.cells[:-1]):
        name = cell.get('id', '')
        if not name.startswith('solution-'):
            continue
        n = name[len('solution-'):]
        if n.endswith('-answer') or (cell.cell_type == 'markdown' and cell.source.strip() != '#### Solution'):
            text = cell.source.replace('#### Solution', '', 1).strip()
            out['turn-' + n.replace('-answer', '') + '-answer'] = text
        elif nb.cells[k + 1].cell_type == 'code':
            out['turn-' + n] = nb.cells[k + 1].source
    os.makedirs(nbtools.TEACHER_DIR, exist_ok=True)
    path = os.path.join(nbtools.TEACHER_DIR, 'day05-lab-solutions.json')
    with open(path, 'w') as f:
        json.dump(out, f, indent=1)
    print('wrote', path, '(slide solutions, git-ignored)')
nbtools.build = _build_with_ids
BOOK = 'https://visionbook.mit.edu'
KONKLE = 'https://konklab.fas.harvard.edu/Papers/Konkle_2022_NatComm.pdf'

# ---------------------------------------------------------------------------------------------
md(f"""
{badge(FILE)}

# Day 5 lab, part 1 · CLIP embeddings: similarity, the contrastive loss, zero-shot

**Human-Machine Perception** · Day 5, hour 2 · Fernanda & Shreya

In this hour we asked what a network can learn **without labels**, and how to use what it learned.
CLIP is a good place to try it: it was trained with contrastive learning on images and their captions,
never on the class labels we use here.

The lab has two parts, with slides in between:

- **Part 1 · CLIP similarity** (step by step with the slides). Sections 1 to 3.
- **Part 2 · Views and representations** (after the reading, Konkle & Alvarez 2022) is its own notebook,
  linked at the end of this one.

By the end you will be able to:

1. turn images and captions into **embeddings** with CLIP, and compare them with **cosine similarity**
2. compute CLIP's **contrastive loss** (InfoNCE) and see what the temperature does
3. classify images **zero-shot**, from class names written as captions, and see how the words matter

**How to use this notebook.** Click a gray code cell and press **Shift + Enter** to run it. Run the
cells in order. Cells marked **Your turn** are for you: they run as they are (if you leave one blank,
the notebook uses the course's answer so later cells still work), and use your version once you fill
it in. We go over the solutions together in class.

**Time.** About 15 minutes in all, in short steps between slides. No GPU needed. The first run downloads CLIP (about 600 MB)
and the CIFAR-10 test images (about 24 MB), which takes a minute or two on Colab. A GPU
(*Runtime → Change runtime type → T4 GPU*) makes the embedding steps faster but is optional.
""")

md("""
## 0 · Set up

Run the next two cells. The first loads the libraries, CLIP, and the images. The second holds the
lab's **helper code** (plots, and the course's answers that a blank *Your turn* falls back on). It is
folded away; you don't need to read it.
""")
code("""
import io, sys, time
import numpy as np
import matplotlib.pyplot as plt
import torch
import torchvision
import torchvision.transforms as T
import transformers
from transformers import CLIPModel, CLIPProcessor
import pandas as pd
from huggingface_hub import hf_hub_download
from PIL import Image
import torch.nn.functional as F
from collections import Counter

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("Python       ", sys.version.split()[0])
print("PyTorch      ", torch.__version__)
print("transformers ", transformers.__version__)
print("device       ", device)

t0 = time.time()
MODEL_NAME = "openai/clip-vit-base-patch32"
model = CLIPModel.from_pretrained(MODEL_NAME).to(device).eval()
processor = CLIPProcessor.from_pretrained(MODEL_NAME)

# CIFAR-10 test set, the Hugging Face copy (24 MB, a few seconds): the same 10,000 images and labels, in the
# same order, as torchvision's download from the Toronto server, which can be very slow.
class CIFAR10Test(list):
    # a list of (image, label) pairs, with .classes and .targets like torchvision's CIFAR10
    classes = ["airplane", "automobile", "bird", "cat", "deer", "dog", "frog", "horse", "ship", "truck"]

table = pd.read_parquet(hf_hub_download("uoft-cs/cifar10", "plain_text/test-00000-of-00001.parquet",
                                        repo_type="dataset"))
cifar = CIFAR10Test((Image.open(io.BytesIO(img["bytes"])).convert("RGB"), int(label))
                    for img, label in zip(table["img"], table["label"]))
cifar.targets = [label for _, label in cifar]
CLASSES = cifar.classes
print(f"\\nCLIP and {len(cifar):,} CIFAR-10 test images loaded in {time.time() - t0:.0f} s")
print("classes:", CLASSES)
""")

hidden('''
#@title Helper code: run this cell (no need to read it)

def _as_tensor(out):
    """CLIP's get_*_features returns a tensor in most versions of transformers, an output object in some."""
    if torch.is_tensor(out):
        return out
    for name in ("image_embeds", "text_embeds", "pooler_output"):
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


@torch.no_grad()
def embed_texts(texts):
    """A list of strings -> one CLIP embedding per string, scaled to length 1. Shape (n, 512)."""
    inputs = processor(text=list(texts), return_tensors="pt", padding=True).to(device)
    emb = _as_tensor(model.get_text_features(**inputs)).float().cpu()
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


def show_matrix(m, rows, cols, title, cmap="gray_r", label="cosine similarity"):
    m = np.asarray(m)
    plt.figure(figsize=(0.55 * len(cols) + 2.5, 0.45 * len(rows) + 1.5))
    plt.imshow(m, cmap=cmap)
    plt.colorbar(label=label, shrink=0.8)
    plt.xticks(range(len(cols)), cols, rotation=60, ha="right", fontsize=8)
    plt.yticks(range(len(rows)), rows, fontsize=8)
    plt.title(title)
    plt.tight_layout()
    plt.show()


def zero_shot(image_emb, template):
    """Zero-shot predictions: the class whose caption, template.format(class), is closest to each image."""
    text_emb = embed_texts([template.format(c) for c in CLASSES])
    return (image_emb @ text_emb.T).argmax(dim=1)


# The course's answers, used when a Your turn cell is left blank.
def course_similarity(image_emb, text_emb):
    return image_emb @ text_emb.T

def course_infonce(logits):
    partners = torch.arange(len(logits))
    return F.cross_entropy(logits, partners), F.cross_entropy(logits.T, partners)

def course_predictions(sims):
    return sims.argmax(dim=1)

print("helpers ready")
''')

# ---------------------------------------------------------------------------------------------
md(f"""
# Part 1 · CLIP similarity

Part 1 goes step by step with the slides: each section matches one idea from class. Run it when the
slide shows its code, try the small change it suggests, then come back to the slides.

## 1 · Embed images and captions

CLIP has two encoders. The **image encoder** (a Vision Transformer, ViT-B/32) turns an image into 512
numbers. The **text encoder** (a transformer over words) turns a caption into 512 numbers too. Both are
scaled to length 1, so they sit on the same sphere and can be compared directly.

We take one test image from each of the ten CIFAR-10 classes. The images are tiny, 32 × 32 pixels; CLIP's
processor scales them up to 224 × 224.
""")
code("""
# 1 · Ten images, one per class, and ten captions
start = 0    # TRY IT: start = 100 or 5000 picks ten other test images
ten = first_of_each_class(per_class=1, start=start)
ten_images = [cifar[i][0] for i in ten]
ten_labels = [CLASSES[cifar.targets[i]] for i in ten]
show_images(ten_images, ten_labels)

captions = [f"a photo of a {c}" for c in CLASSES]
image_emb = embed_images(ten_images)
text_emb = embed_texts(captions)
print("image embeddings:", tuple(image_emb.shape))
print("text embeddings: ", tuple(text_emb.shape))
print("length of the first image embedding:", round(image_emb[0].norm().item(), 3))
print("its first five numbers:", image_emb[0, :5].numpy().round(3))
""")

md("""
**Your turn 1 · Cosine similarity.** Both sets of embeddings have length 1, so the cosine similarity
between image *i* and caption *j* is just their dot product. Compute all of them at once: a 10 × 10 matrix
with one row per image and one column per caption. (Hint: a matrix product with a transpose.)
""")
turn("""
# YOUR TURN 1 · A 10 x 10 matrix:
# similarity[i, j] = cosine similarity of image i and caption j.
similarity = None    # replace None, using image_emb and text_emb

if similarity is None:
    print("Your turn 1 is blank: using the course's answer.")
    similarity = course_similarity(image_emb, text_emb)
show_matrix(similarity, ten_labels, captions, "CLIP: every image x every caption")
""", SOL.get(1, ""))
resources(('Ch. 51.3, Learning visual representations from language', f'{BOOK}/VLMs.html'),
          ('torch.matmul and the @ operator', 'https://pytorch.org/docs/stable/generated/torch.matmul.html'),
          ('Tensor.T', 'https://pytorch.org/docs/stable/tensors.html#torch.Tensor.T'))
md("""
If CLIP works, the **diagonal** is darkest: each image is most similar to its own caption. Look at the
off-diagonal cells too. Which wrong caption comes closest for each image? Do the mistakes make sense
(cat and dog, automobile and truck)?

**Try it.** In section 1, set `start = 100`, run it, then run Your turn 1 again. Ten new images: is the
diagonal still darkest? The individual numbers mean nothing on their own; only the comparisons do.

**Back to the slides** for self-supervised learning and the contrastive loss.
""")

md("""
## 2 · The contrastive loss

CLIP was trained with a contrastive loss on exactly this kind of matrix: a batch of images and their
captions, every image against every caption. Each **row** is a guessing game: here is image *i*, which of
the ten captions is its partner? The answer is caption *i*.

1. Divide the similarities by a **temperature** (a small number, so the differences get bigger). These are the *logits*.
2. A softmax over each row turns them into probabilities, one per caption.
3. The loss for that row is the cross-entropy: minus the log of the probability given to the partner.
   It is low when the partner wins clearly.

CLIP plays the game both ways: each image picks its caption (the rows) and each caption picks its image
(the columns). The loss is the average of the two. This is **InfoNCE**.
""")
md("""
**Your turn 2 · InfoNCE.** `F.cross_entropy(logits, partners)` does steps 2 and 3 for every row at once
and averages them. Compute the loss for the images (rows) and for the captions (columns).
""")
turn("""
# YOUR TURN 2 · CLIP's contrastive loss (InfoNCE) on the 10 x 10 matrix.
# Row i: image i against every caption. Its partner is caption i.
temperature = 0.07    # TRY IT: 0.01, 0.07, 0.5, 1.0
logits = similarity / temperature
partners = torch.arange(10)

loss_images = None      # replace None: each image (row) vs its partner
loss_captions = None    # replace None: each caption (column) vs its partner

if loss_images is None or loss_captions is None:
    print("Your turn 2 is blank: using the course's answer.")
    loss_images, loss_captions = course_infonce(logits)
loss = (loss_images + loss_captions) / 2
shifted = sum(course_infonce(logits.roll(1, dims=1))) / 2    # wrong partners
print(f"temperature {temperature}")
print(f"  loss, true pairs:     {loss:.3f}")
print(f"  loss, shifted pairs:  {shifted:.3f}")
print(f"  loss, pure guessing:  {np.log(10):.3f}   (log 10)")
clip_temperature = 1 / model.logit_scale.exp().item()
print(f"CLIP's own temperature, learned in training: {clip_temperature:.3f}")
""", SOL.get(2, ""))
resources(('Sec. 30.10, Contrastive learning', f'{BOOK}/representation_learning.html#sec-representation_learning-contrastive_learning'),
          ('torch.nn.functional.cross_entropy', 'https://pytorch.org/docs/stable/generated/torch.nn.functional.cross_entropy.html'),
          ('Ch. 51.3, CLIP', f'{BOOK}/VLMs.html'))
md("""
The loss with the true pairs is below pure guessing, and the shifted pairs are above it: the loss is low
only when partners are the most similar. **Try it:** change the temperature. CLIP's cosine similarities are
all close to each other, so with a large temperature (0.5 or 1.0) every caption looks about as good as the
others and all three numbers sit near guessing. With a small one, like CLIP's own, the partner wins clearly
and the gap opens up. During training, the loss pulls partners together and pushes the rest apart.

**Back to the slides** for what the views decide, and for how CLIP was trained.
""")

md("""
## 3 · Zero-shot classification, and the words

Now classify 500 test images, with **no training at all**: for each image, pick the caption it is most
similar to. That caption's class is the prediction.
""")
code("""
N = 500
test_images = [cifar[i][0] for i in range(N)]
test_labels = torch.tensor(cifar.targets[:N])
t0 = time.time()
test_emb = embed_images(test_images)
print(f"embedded {N} images in {time.time() - t0:.0f} s")
test_sims = course_similarity(test_emb, text_emb)      # (500, 10): every image x every caption
""")
md("""
**Your turn 3 · Predictions.** `test_sims` has one row per image and one column per caption. The
prediction for each image is the column with the **largest** similarity. Compute all 500 predictions in one
line.
""")
turn("""
# YOUR TURN 3 · One predicted class index per image (500 integers).
predictions = None    # replace None, using test_sims

if predictions is None:
    print("Your turn 3 is blank: using the course's answer.")
    predictions = course_predictions(test_sims)
accuracy = (predictions == test_labels).float().mean().item()
print(f"zero-shot accuracy on {N} images: {accuracy:.1%}   (chance: 10%)")
""", SOL.get(3, ""))
resources(('torch.argmax', 'https://pytorch.org/docs/stable/generated/torch.argmax.html'),
          ('Ch. 51.3: zero-shot classification with text prompts', f'{BOOK}/VLMs.html'))
md("""
Here are some images CLIP got wrong, with its guess and the true class.
""")
code("""
wrong = [i for i in range(N) if predictions[i] != test_labels[i]][:20]
show_images([test_images[i] for i in wrong],
            [f"{CLASSES[predictions[i]]}\\n(true: {CLASSES[test_labels[i]]})" for i in wrong])
""")
md("""
**Try it.** Zero-shot can only choose among the captions you write. Delete one or two class names from
the list below and run it: where do the images of the missing classes go?
""")
code("""
# TRY IT · Leave classes out: delete one or two names from this list, then run.
offered = ["airplane", "automobile", "bird", "cat", "deer",
           "dog", "frog", "horse", "ship", "truck"]

offered_emb = embed_texts([f"a photo of a {c}" for c in offered])
picks = (test_emb @ offered_emb.T).argmax(dim=1)
for c in CLASSES:
    if c not in offered:
        mine = test_labels == CLASSES.index(c)          # the images of class c
        went = Counter(offered[p] for p in picks[mine].tolist())
        top = ", ".join(f"{name} {n}" for name, n in went.most_common(3))
        print(f"the {int(mine.sum())} {c} images now go to: {top}")
if len(offered) == len(CLASSES):
    print("All ten classes are offered: delete one or two names and run again.")
""")
md("""
The captions decide what each class "looks like" to CLIP. Change the words and the classifier changes.
""")
turn("""
# YOUR TURN 4 · Write your own caption template. {} is where the class goes.
# Try a few: "{}", "a blurry photo of a {}.", "a drawing of a {}.",
# "a photo of a small {}.", ...
my_template = None    # for example "a blurry photo of a {}."

baseline = (zero_shot(test_emb, "a photo of a {}") == test_labels).float().mean().item()
print(f'"a photo of a {{}}"  ->  {baseline:.1%}')
if my_template is not None:
    mine = (zero_shot(test_emb, my_template) == test_labels).float().mean().item()
    print(f'"{my_template}"  ->  {mine:.1%}')
else:
    print("Your turn 4 is blank: write a template above and run it again.")
""", SOL.get(4, ""))
resources(('Ch. 51.3: zero-shot classification with text prompts', f'{BOOK}/VLMs.html'),
          ('Python str.format', 'https://docs.python.org/3/library/stdtypes.html#str.format'))
md("""
Which template worked best, and which worst? CIFAR-10 images are tiny and blurry: does saying so in the
caption help? Keep a note of your best template for the class discussion.

**End of Part 1.** Back to the slides for the reading.
""")
answer(ANSWERS.get(4, ""))

# ---------------------------------------------------------------------------------------------
md(f"""
# Part 2 · Views and representations

Part 2 is its own notebook, so it runs on a fresh Colab runtime:
[Day 5 part 2 · Views and representations](https://colab.research.google.com/github/delamarifer/human-machine-perception/blob/main/notebooks/day05-lab-part2-views-rsa.ipynb).
You test the reading's objective (views and instance discrimination) on CLIP, then compare representations
with dissimilarity matrices and RSA.

## What you learned in part 1

- An **embedding** is one vector per image (or caption). With vectors of length 1, **cosine similarity** is a
  dot product, and a whole similarity matrix is one matrix product.
- **Zero-shot classification**: write the classes as captions and pick the closest. The words you choose are
  part of the classifier.

**Homework.** Finish both parts if you did not in class.
""")

if __name__ == '__main__':
    main(FILE, private_solutions=True)

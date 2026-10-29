"""Builds notebooks/day02-lab-one-image-app.ipynb: the Day 2 lab, the one-image vision app.
One photo through the stack the Day 2 lecture shows (day02/assets/pipeline.py and app.py):
OpenCV load and crop -> torchvision ResNet-18 -> Hugging Face Depth Anything V2 Small -> Gradio,
then the same app opened on a phone. Everything runs on a CPU runtime.
See nbtools.py for how to build and check it."""
from nbtools import md, code, hidden, turn, badge, main

FILE = 'day02-lab-one-image-app.ipynb'
RAW = 'https://raw.githubusercontent.com/delamarifer/human-machine-perception/main'
COFFEE = f'{RAW}/day02/assets/one-photo/photo.jpg'
ELEPHANT = f'{RAW}/day02/assets/human-vs-machine/photo.jpg'
COFFEE_PAGE = 'https://commons.wikimedia.org/wiki/File:Warm_cup_of_coffee_on_a_table_at_a_cafe.jpg'
ELEPHANT_PAGE = 'https://commons.wikimedia.org/wiki/File:Elephant_bronze_sculpture.jpg'


def sub(s):
    return (s.replace('{COFFEE}', COFFEE).replace('{ELEPHANT}', ELEPHANT)
             .replace('{COFFEE_PAGE}', COFFEE_PAGE).replace('{ELEPHANT_PAGE}', ELEPHANT_PAGE))


# ---------------------------------------------------------------------------------------------
md(f"""
{badge(FILE)}

# Day 2 lab · A one-image vision app

**Human-Machine Perception** · Day 2 · Fernanda & Shreya

Today you take **one photo** through the same stack you saw in lecture, and end with an **app** you
can open on your phone: take a picture with the camera, and a model running in Colab tells you what
it sees and sends back a new version of your image.

You will not train anything today. Every model here was trained by someone else, on someone else's
data. Using a model like that well is a skill of its own, and it is the same five steps every time:

1. **load** an image
2. **preprocess** it into the shape and numbers the model expects
3. **run** a model you did not train
4. **read** the output
5. **wrap** it in a demo

By the end you will be able to:

1. load, convert and crop a photo with **OpenCV**, and say what its array shape means
2. run a pretrained **torchvision** classifier and turn its raw scores (**logits**) into **probabilities**
3. run a pretrained **Hugging Face** model that transforms an image (a **depth map**), and swap it for another
4. wrap the whole thing in a **Gradio** app and open it on your **phone**
5. find a photo the model gets **wrong**, and say why that is interesting

**How to use this notebook.** Click a gray code cell and press **Shift + Enter** to run it. Run the
cells in order, top to bottom. Cells marked **Your turn** are for you: they run as they are, and do
your version once you fill them in. Each one has a solution hidden under *Show a solution*. Try it
yourself first.

**No GPU needed.** The models are small, so a normal (CPU) runtime is fine. The first time, Colab
downloads them: about 200 MB in all (sizes in each section).

New to Python? That's fine. Read the code, run it, change something, and see what happens.
*Runtime → Restart session* always starts over.
""")

md("""
## 0 · Set up

Run the next cell. It installs **Gradio** (the app library, the only one Colab doesn't already have),
then checks your libraries. If it prints the versions, you are ready.
""")
code("""
import sys
IN_COLAB = "google.colab" in sys.modules
try:
    import gradio
except ImportError:
    !pip install -q gradio

import time, urllib.request
import numpy as np                 # arrays
import matplotlib.pyplot as plt    # plotting
import cv2                         # OpenCV: loading and cropping images
import torch, torchvision          # PyTorch and its vision models
import transformers                # Hugging Face models
import gradio as gr                # the app
from PIL import Image

print("Python      ", sys.version.split()[0])
print("OpenCV      ", cv2.__version__)
print("PyTorch     ", torch.__version__)
print("torchvision ", torchvision.__version__)
print("transformers", transformers.__version__)
print("Gradio      ", gr.__version__)
print("Running in Colab:", IN_COLAB)
print("GPU available:   ", torch.cuda.is_available(), "(we don't need one: everything here runs on the CPU)")
""")

# ---------------------------------------------------------------------------------------------
md(sub("""
## 1 · Load and crop with OpenCV

We start with the photo from the lecture, so you can check your numbers against the slides. Later you
will use your own.

*Photo: "Warm cup of coffee on a table at a cafe" by Shixart1985,
[CC BY 2.0]({COFFEE_PAGE}), via Wikimedia Commons. Resized.*

`cv2.imread` reads an image file into a NumPy **array**. Two things to know about it:

- its **shape** is `(height, width, 3)`: rows, columns, and 3 color values per pixel, each from 0 to 255;
- OpenCV stores the colors in the order **blue, green, red** (BGR). Almost everything else, including
  the models and matplotlib, expects **red, green, blue** (RGB). So we convert right away.
"""))
code(sub("""
urllib.request.urlretrieve("{COFFEE}", "coffee.jpg")    # download the lecture photo

bgr = cv2.imread("coffee.jpg")                 # height x width x 3, numbers 0-255, in BGR order
img = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)     # now in RGB order

print("shape:", img.shape, "  type:", img.dtype)
print("top-left pixel (R, G, B):", img[0, 0])
plt.imshow(img)
plt.title("The lecture photo")
plt.show()
"""))
turn("""
# YOUR TURN 1 · What goes wrong if you skip the BGR -> RGB step?
# Show the array that came straight out of cv2.imread, without converting it.
skipped = None        # replace None with the array straight from cv2.imread (look at the cell above)

if skipped is not None:
    fig, axes = plt.subplots(1, 2, figsize=(10, 4))
    axes[0].imshow(img); axes[0].set_title("converted to RGB")
    axes[1].imshow(skipped); axes[1].set_title("not converted")
    for ax in axes: ax.axis("off")
    plt.show()
""", """
skipped = bgr

fig, axes = plt.subplots(1, 2, figsize=(10, 4))
axes[0].imshow(img); axes[0].set_title("converted to RGB")
axes[1].imshow(skipped); axes[1].set_title("not converted")
for ax in axes: ax.axis("off")
plt.show()
# matplotlib reads the first number of each pixel as red, but OpenCV put blue there:
# red and blue swap. The warm coffee turns blue. A model fed this array would see the same wrong colors.
""")
md("""
**Preprocess.** The classifier was trained on **square** images of **224 × 224** pixels. So we cut
the largest square out of the middle of the photo, then shrink it. Remember from Day 1: `img[rows,
columns]` picks part of an array, and rows count down from the top.
""")
code("""
def crop224(img):
    \"\"\"Center square crop, resized to 224 x 224. img: height x width x 3, RGB.\"\"\"
    h, w = img.shape[:2]
    s = min(h, w)                              # side of the largest square
    y0, x0 = (h - s) // 2, (w - s) // 2        # its top-left corner
    square = img[y0:y0 + s, x0:x0 + s]
    return cv2.resize(square, (224, 224), interpolation=cv2.INTER_AREA)

crop = crop224(img)
print("photo:", img.shape, "->  crop:", crop.shape)
plt.imshow(crop)
plt.title("What the model will see: 224 x 224")
plt.show()
""")
md("""
The lecture said `(853, 1280, 3)` and `(224, 224, 3)`. Do you get the same? Notice that the crop
throws away the left and right of the photo: whatever was there, the model never sees it.
""")

# ---------------------------------------------------------------------------------------------
md("""
## 2 · Classify with a model you did not train

**ResNet-18** is a neural network trained on **ImageNet**: about 1.2 million photos, each labeled
with one of **1000 categories** (dog breeds, vehicles, foods, tools, ...). torchvision ships it
with its trained **weights** (the numbers it learned). First use downloads them: about 47 MB.

`.eval()` puts the model in "use" mode rather than "training" mode.
""")
code("""
from torchvision.models import resnet18, ResNet18_Weights

t = time.perf_counter()
weights = ResNet18_Weights.IMAGENET1K_V1
model = resnet18(weights=weights).eval()
categories = weights.meta["categories"]          # the 1000 names, in the model's order
print(f"loaded in {time.perf_counter() - t:.1f} s;", len(categories), "categories, e.g.", categories[:3])
""")
md("""
**Preprocess, part 2.** The model doesn't take a photo; it takes a **tensor** (PyTorch's version of
a NumPy array) in the exact form it was trained on:

1. order `(color, height, width)` instead of `(height, width, color)`: `permute(2, 0, 1)`
2. numbers from 0 to 1 instead of 0 to 255: divide by 255
3. **normalized** with the average and spread of the ImageNet colors (`MEAN`, `STD` below)
4. a **batch** of images, here a batch of one: `unsqueeze(0)` adds that first dimension

Skip any of these and the model still answers, but its answers get worse, without any warning.
""")
code("""
MEAN = torch.tensor([0.485, 0.456, 0.406])[:, None, None]   # ImageNet's average red, green, blue
STD  = torch.tensor([0.229, 0.224, 0.225])[:, None, None]   # and their spread

def to_tensor(crop):
    x = torch.from_numpy(crop).permute(2, 0, 1).float() / 255    # 3 x 224 x 224, from 0 to 1
    return ((x - MEAN) / STD).unsqueeze(0)                        # 1 x 3 x 224 x 224

x = to_tensor(crop)
print("tensor shape:", tuple(x.shape))
""")
md("""
**Run it, and read the output.** The model returns **1000 numbers**, one per category, called
**logits**. Bigger means "more like this category", but they are not probabilities: they can be
negative, and they don't add up to anything in particular.
""")
code("""
t = time.perf_counter()
with torch.no_grad():                   # we are only using the model, not training it
    logits = model(x)[0]                # 1000 numbers
print(f"ran in {time.perf_counter() - t:.2f} s")

print("number of logits:", logits.shape[0])
print("smallest:", round(logits.min().item(), 2), "  largest:", round(logits.max().item(), 2))
best = logits.argmax().item()
print("largest logit belongs to:", categories[best])
""")
md("""
**From logits to probabilities: softmax.** Take `exp` of each logit (now all positive), then divide
by their sum (now they add up to 1):

$$p_k = \\frac{e^{z_k}}{\\sum_j e^{z_j}}$$

The order doesn't change: the biggest logit becomes the biggest probability. Then `topk(5)` picks
the five largest.
""")
code("""
probs = logits.exp() / logits.exp().sum()       # the same as logits.softmax(0)
print("sum of all 1000 probabilities:", round(probs.sum().item(), 4))

values, idx = probs.topk(5)
for p, k in zip(values, idx):
    print(f"{categories[k]:>15s}  {p.item():6.1%}   (logit {logits[k].item():5.2f})")
""")
md("""
The lecture slide says **espresso 85.9%**, and you got the same five categories in the same order,
but slightly different numbers. Why? The slide's numbers came from the original file on Wikimedia
Commons; the copy you downloaded was saved again as a JPEG, which changes the pixels a tiny bit.
That alone is enough to move the probabilities.

**Read it carefully.** "85.9%" is the model's share of its belief among *its* 1000 categories. It
is not "85.9% chance of being right": a model can put a big number on a wrong answer, as you will
see in section 5. And it can only answer with one of its 1000 names, even for a photo of something
that isn't one of them.

Let's put the whole classifier in one function, so we can reuse it.
""")
code("""
def classify(crop, model=model, categories=categories, k=5):
    \"\"\"Top-k (category, probability) for a 224 x 224 RGB crop.\"\"\"
    with torch.no_grad():
        probs = model(to_tensor(crop))[0].softmax(0)
    values, idx = probs.topk(k)
    return [(categories[i], p.item()) for p, i in zip(values, idx)]

classify(crop)
""")

# ---------------------------------------------------------------------------------------------
md("""
## 3 · Transform the image with a pretrained model

A classifier answers with words. Other models answer with a **new image**. We use the one from
lecture: **depth estimation**, which guesses from a single photo how far away each pixel is.
On Day 1 you saw why that is **ill-posed**: one image fits many 3D worlds. This model makes the
guess anyway, using what it learned from millions of images.

The model is **Depth Anything V2 Small**, from the Hugging Face hub. Hugging Face's `pipeline`
hides steps 2 to 4 (preprocess, run, read) inside one call. First use downloads about 99 MB.
""")
code("""
from transformers import pipeline

t = time.perf_counter()
depth_pipe = pipeline("depth-estimation", model="depth-anything/Depth-Anything-V2-Small-hf", device="cpu")
print(f"loaded in {time.perf_counter() - t:.1f} s")

t = time.perf_counter()
depth = depth_pipe(Image.fromarray(crop))["depth"]      # a grayscale image: brighter = nearer
print(f"ran in {time.perf_counter() - t:.2f} s;  output size:", depth.size)

fig, axes = plt.subplots(1, 2, figsize=(10, 4.5))
axes[0].imshow(crop); axes[0].set_title("photo (crop)")
axes[1].imshow(depth, cmap="gray"); axes[1].set_title("depth: brighter = nearer")
for ax in axes: ax.axis("off")
plt.show()
""")
md("""
Compare with the depth map on the lecture slide. Does the nearest thing look brightest? The model
gives **relative** depth: nearer and farther, but not in meters.

**Make the transformation a choice.** Every image-to-image model fits the same slot: it takes a crop
and gives back a picture. So we write each one as a small function, keep them in a dictionary, and
pick one by name. The app in section 4 uses whichever you pick here.

Here is a second one: **semantic segmentation**, which gives every pixel a label (wall, table,
person, ...). The model is **SegFormer-B1**, trained on the ADE20K dataset of scenes with
150 categories; it downloads about 55 MB.
""")
code("""
seg_pipe = pipeline("image-segmentation", model="nvidia/segformer-b1-finetuned-ade-512-512", device="cpu")

def depth_map(crop):
    return depth_pipe(Image.fromarray(crop))["depth"]

def segment(crop):
    \"\"\"Paint each labeled region in its own color, on top of the photo.\"\"\"
    out = crop.astype(float) / 255
    colors = plt.cm.tab20.colors
    for n, region in enumerate(seg_pipe(Image.fromarray(crop))):
        mask = np.array(region["mask"]) > 0
        if mask.mean() >= 0.01:            # skip regions smaller than 1% of the image
            out[mask] = 0.4 * out[mask] + 0.6 * np.array(colors[n % 20])
    return Image.fromarray((out * 255).astype(np.uint8))

TRANSFORMS = {"depth": depth_map, "segmentation": segment}

t = time.perf_counter()
regions = seg_pipe(Image.fromarray(crop))
print(f"segmentation ran in {time.perf_counter() - t:.2f} s")
for r in regions:
    share = (np.array(r["mask"]) > 0).mean()
    if share >= 0.01:
        print(f"  {r['label'].strip():>10s}  {share:5.1%} of the image")

fig, axes = plt.subplots(1, 3, figsize=(14, 4.5))
axes[0].imshow(crop); axes[0].set_title("photo (crop)")
for ax, name in zip(axes[1:], TRANSFORMS):
    ax.imshow(TRANSFORMS[name](crop), cmap="gray"); ax.set_title(name)
for ax in axes: ax.axis("off")
plt.show()
""")
md("""
Pick the one your app will use. Depth is the one from lecture; try `"segmentation"` too.
""")
code("""
TRANSFORM = "depth"      # or "segmentation"
""")

# ---------------------------------------------------------------------------------------------
md("""
## 4 · From your phone

**Wrap it in a demo.** One function does all five steps: photo in, top-5 and a transformed image out.
""")
code("""
def see(img):
    \"\"\"img: height x width x 3, RGB. Returns the top-5 (as {name: probability}) and the transformed crop.\"\"\"
    crop = crop224(img)
    top5 = dict(classify(crop))
    return top5, TRANSFORMS[TRANSFORM](crop)

def show(img, title=""):
    \"\"\"Run see() on a photo and draw the photo, its top-5 and the transformed image.\"\"\"
    t = time.perf_counter()
    top5, out = see(img)
    fig, axes = plt.subplots(1, 3, figsize=(15, 4), gridspec_kw={"width_ratios": [1, 1, 1.2]})
    axes[0].imshow(crop224(img)); axes[0].set_title(title or "photo (crop)")
    axes[1].imshow(out, cmap="gray"); axes[1].set_title(TRANSFORM)
    axes[2].barh(list(top5)[::-1], list(top5.values())[::-1], color="0.4")
    axes[2].set_xlim(0, 1); axes[2].set_title("top-5 (ResNet-18)")
    axes[0].axis("off"); axes[1].axis("off")
    plt.tight_layout(); plt.show()
    print(f"({time.perf_counter() - t:.1f} s)")

show(img, "the lecture photo")
""")
md("""
### 4a · The simple path: upload a photo from your phone

Take a photo with your phone. Then either open this notebook **on your phone** (Colab works in a
phone browser) or send the photo to the laptop you are using. Set `UPLOAD = True` below and run the
cell: a **Choose files** button appears; on most phones it also offers to take a photo with the camera.
""")
code("""
def upload_photo():
    \"\"\"Pick a photo with the file picker (in Colab). Returns it as an RGB array, or None.\"\"\"
    if not IN_COLAB:
        print("The file picker only works in Colab.")
        return None
    from google.colab import files
    uploaded = files.upload()
    if not uploaded:
        return None
    name, data = next(iter(uploaded.items()))
    bgr = cv2.imdecode(np.frombuffer(data, np.uint8), cv2.IMREAD_COLOR)
    if bgr is None:
        print(f"OpenCV couldn't read {name}. Try a .jpg or .png (on an iPhone, a screenshot of the photo works).")
        return None
    return cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)

UPLOAD = False           # set to True, then run this cell
my_photo = upload_photo() if UPLOAD else None

if my_photo is not None:
    print("your photo:", my_photo.shape)
    show(my_photo, "my photo")
else:
    print("No photo yet: set UPLOAD = True and run this cell again.")
""")
md("""
### 4b · The app: take the photo with your phone's camera

**Gradio** turns `see` into a web page in a few lines: an image box for the input, a label box and an
image for the outputs. `sources=["upload", "webcam"]` lets you pick a file or use the camera.

`share=True` gives the app a **public link** (it ends in `gradio.live`). Open it on your phone, tap
the camera, take a photo, and press **Submit**. The photo travels to this Colab runtime, the models
run here, and the answer comes back to your phone.

> **Privacy.** The link is **public**: anyone who has it can use the app while it is up. Gradio
> says a share link lasts "up to 1 week"; in practice the app stops as soon as this Colab runtime
> stops, so the link works while your session is running. Your photos
> pass through Gradio's share server on the way to Colab. Use photos you are OK sharing: no faces of
> people who didn't agree, no documents, no screens with personal information. To close the app early,
> run `demo.close()`.
""")
code("""
demo = gr.Interface(
    fn=see,
    inputs=gr.Image(type="numpy", sources=["upload", "webcam"], label="Your photo"),
    outputs=[gr.Label(num_top_classes=5, label="Top-5 (ResNet-18)"),
             gr.Image(label=TRANSFORM)],
    title="One-image vision app",
    description="Take or upload a photo. A classifier says what it sees; a second model transforms the image.",
    flagging_mode="never",     # no "Flag" button: nothing your users send is saved
)
print("app built:", type(demo).__name__)

LAUNCH = IN_COLAB        # the app starts in Colab; set to True to start it anywhere else
if LAUNCH:
    demo.launch(share=True)    # prints the public link: open it on your phone
""")
md("""
If you change `TRANSFORM` (section 3), run this cell again so the app picks it up.
""")

# ---------------------------------------------------------------------------------------------
md("""
## 5 · Your turn

Three short exercises. Each one feeds the **human vs. machine** discussion after the lab, so write
down what you find.
""")
turn("""
# YOUR TURN 2 · Try a classmate's photo.
# Ask a classmate for a photo they are OK sharing (or open your app link on their phone).
# BEFORE you run the model, write down what YOU see in it. Then compare.
classmate_photo = None    # replace None with upload_photo()
i_see = ""                # what do you see in the photo? e.g. "a red bicycle"

if classmate_photo is not None:
    show(classmate_photo, "my classmate's photo")
    print("I see:", i_see)
    print("The model sees:", classify(crop224(classmate_photo))[0][0])
""", """
classmate_photo = upload_photo()
i_see = "a bicycle leaning on a wall"

if classmate_photo is None:                       # outside Colab: use the lecture photo instead
    classmate_photo = img
show(classmate_photo, "my classmate's photo")
print("I see:", i_see)
print("The model sees:", classify(crop224(classmate_photo))[0][0])
# Where you agree, the model's top-1 matches your words. Where you don't, check:
# is what you see even one of the 1000 ImageNet categories?  print(categories) lists them all.
""")
turn(sub("""
# YOUR TURN 3 · Find a photo the classifier gets wrong.
# Try your own photos (upload_photo()), or download one from the web:
#     urllib.request.urlretrieve("https://...jpg", "photo.jpg"); photo = cv2.cvtColor(cv2.imread("photo.jpg"), cv2.COLOR_BGR2RGB)
# Then say what it really is: one word that should appear in the right category's name.
wrong_photo = None        # replace None with your photo (an RGB array)
true_word = ""            # e.g. "elephant"

if wrong_photo is not None:
    show(wrong_photo, "a photo the model gets wrong?")
    probs_all = classify(crop224(wrong_photo), k=1000)           # all 1000, best first
    hits = [(rank, name, p) for rank, (name, p) in enumerate(probs_all, 1) if true_word and true_word in name]
    for rank, name, p in hits[:3]:
        print(f"'{name}' is number {rank} of 1000, with {p:.1%}")
    if true_word and not hits:
        print(f"No category has '{true_word}' in its name: the model has no word for it.")
"""), sub("""
# The brass elephant statue from the lecture.
# "Elephant bronze sculpture" by Carlos Valenzuela, CC BY-SA 4.0, via Wikimedia Commons: {ELEPHANT_PAGE}
urllib.request.urlretrieve("{ELEPHANT}", "elephant.jpg")
wrong_photo = cv2.cvtColor(cv2.imread("elephant.jpg"), cv2.COLOR_BGR2RGB)
true_word = "elephant"

show(wrong_photo, "a photo the model gets wrong?")
probs_all = classify(crop224(wrong_photo), k=1000)
hits = [(rank, name, p) for rank, (name, p) in enumerate(probs_all, 1) if true_word and true_word in name]
for rank, name, p in hits[:3]:
    print(f"'{name}' is number {rank} of 1000, with {p:.1%}")
if true_word and not hits:
    print(f"No category has '{true_word}' in its name: the model has no word for it.")
# Anyone in the room sees an elephant at once. The model's top answers are other things, and
# the elephant categories come well below them. We picked this photo because the model gets it
# wrong: it is one we searched for, not a random example.
"""))
turn("""
# YOUR TURN 4 · Swap in a different pretrained model.
# torchvision has many ImageNet classifiers: https://pytorch.org/vision/stable/models.html
# MobileNet V3 Small is about 10 MB, made for phones. Load it the same way as ResNet-18
# (it takes the same 224 x 224 input and the same MEAN and STD), then compare the two on the same photo.
other_weights = None      # replace None with MobileNet_V3_Small_Weights.IMAGENET1K_V1 (import it first)
other_model = None        # replace None with mobilenet_v3_small(weights=other_weights).eval()

if other_model is not None:
    print("ResNet-18:  ", [(name, round(p, 3)) for name, p in classify(crop)])
    print("other model:", [(name, round(p, 3)) for name, p in
                           classify(crop, model=other_model, categories=other_weights.meta["categories"])])
""", """
from torchvision.models import mobilenet_v3_small, MobileNet_V3_Small_Weights

other_weights = MobileNet_V3_Small_Weights.IMAGENET1K_V1
other_model = mobilenet_v3_small(weights=other_weights).eval()

print("ResNet-18:  ", [(name, round(p, 3)) for name, p in classify(crop)])
print("other model:", [(name, round(p, 3)) for name, p in
                       classify(crop, model=other_model, categories=other_weights.meta["categories"])])
# Same photo, same categories, different answers and different confidence.
# To swap the transformation instead: add a function to TRANSFORMS (section 3) that wraps another
# Hugging Face pipeline, e.g. another depth model from https://huggingface.co/models?pipeline_tag=depth-estimation
""")

# ---------------------------------------------------------------------------------------------
md("""
## What you learned

- **The pretrained-model workflow**: load, preprocess, run, read, wrap. It is the same for any model,
  not only these two.
- **Preprocessing is part of the model**: color order, crop, size and normalization must match what
  the model was trained on, and nothing warns you when they don't.
- **Logits and probabilities**: softmax turns the 1000 scores into numbers that add up to 1. A big
  probability is not a promise of being right.
- **A model only knows its own categories**, and it can be confidently wrong where a person isn't.
- **A demo is a few lines**: Gradio put your model on your phone. With `share=True`, think about who
  else can see it.

**Homework:** read chapters 5-7 of the book, find a computer vision topic or application you find
interesting, complete the PyTorch exercise, and begin the Week 1 problem set.
""")

if __name__ == '__main__':
    main(FILE)

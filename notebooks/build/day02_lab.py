"""Builds notebooks/day02-lab.ipynb: the Day 2 in-class lab.

Same photo, crop, ResNet-18, and Depth Anything model as day02/assets/pipeline.py and the lecture
scene. See nbtools.py for how to build and check it.
"""
from nbtools import md, code, turn, badge, main

FILE = 'day02-lab.ipynb'
BADGE = badge(FILE)

md(f"""
{BADGE}

# Day 2 lab

**Human-Machine Perception** · Day 2 · Fernanda & Shreya

Run the cells from top to bottom. The Rubik's cube is the color example. The café photo is the
other picture. Later sections ask a classifier what it calls the cube, then what survives when
the café photo is changed.

By the end you will be able to:

1. read a photograph as an array: shape, channels, grayscale, a crop, and a histogram
2. crop and resize it the way a pretrained model expects
3. run **ResNet-18**, a classifier you did not train, and read its top five labels
4. see which of those labels survive a crop, a turn, a cover, or a change in brightness, contrast, or resolution
5. run a depth model on the same crop and read the map
6. call both models from one small app, then try a photo from your phone
7. compare a name from that list with what you recognize in the picture

**How to use this notebook.** Each gray box is a *code cell*. Click it and press **Shift + Enter** to
run it. Run the cells in order. A cell marked **TODO** runs without errors as it is, and does
something new once you fill it in. A solution is hidden under *Show a solution*. Try it yourself first.

The first model download can take a few minutes. Let it finish.
""")

md("""
## 0 · Check your setup

Colab already has PyTorch, TorchVision, OpenCV, and Matplotlib. The next cell adds the depth-model
library and Gradio. Then we print versions. If that cell finishes without a red error, you are ready.
""")
code("""
!pip install -q "transformers>=4.46" gradio
""")
code("""
import sys
import urllib.request

import cv2
import matplotlib.pyplot as plt
import numpy as np
import torch
from PIL import Image

print("Python     ", sys.version.split()[0])
print("PyTorch    ", torch.__version__)
print("OpenCV     ", cv2.__version__)
print("Running in Colab:", "google.colab" in sys.modules)
""")

md("""
## 1 · What can a machine see from a single image?

A photograph is a grid of numbers. "A cup," "a red sticker," and "the table is closer than the wall"
are readings of that grid. They are not stored in the file.

Today the same pixels will be read in more than one way. First by you, as an array. Later by two
models that were trained for two different questions: which category wins, and which surface is closer.
The weights stay frozen. Changing the image changes the evidence, not the model.

Two photographs run through the whole lab.

- The café photo is the one from the lecture: ["Warm cup of coffee on a table at a cafe"](https://commons.wikimedia.org/wiki/File:Warm_cup_of_coffee_on_a_table_at_a_cafe.jpg) by Shixart1985, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/).
- The cube is a second example, used for color and arrangement: ["Rubik's Cube"](https://commons.wikimedia.org/wiki/File:Rubiks_Cube_(11913436786).jpg) by William Warby, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). This copy is the 960-pixel Wikimedia thumbnail.

OpenCV stores color as **BGR**. The loader converts each file to RGB before anything is displayed.
""")
code("""
CAFE_URL = (
    "https://raw.githubusercontent.com/delamarifer/human-machine-perception/"
    "main/day02/assets/one-photo/photo.jpg"
)
CUBE_URL = (
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/"
    "Rubiks_Cube_%2811913436786%29.jpg/960px-Rubiks_Cube_%2811913436786%29.jpg"
)

def load_rgb(url):
    import socket
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (teaching; human-machine-perception)"},
    )
    previous = socket.getdefaulttimeout()
    socket.setdefaulttimeout(30)
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            data = np.frombuffer(response.read(), dtype=np.uint8).copy()
    finally:
        socket.setdefaulttimeout(previous)
    bgr = cv2.imdecode(data, cv2.IMREAD_COLOR)
    if bgr is None:
        raise FileNotFoundError(url)
    return cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)

cafe = load_rgb(CAFE_URL)
cube = load_rgb(CUBE_URL)
rgb = cafe  # later sections classify this photograph

fig, axes = plt.subplots(1, 2, figsize=(10, 4))
axes[0].imshow(cafe)
axes[0].set_title("Café")
axes[1].imshow(cube)
axes[1].set_title("Cube")
for ax in axes:
    ax.set_axis_off()
plt.show()
print("café shape:", cafe.shape, " dtype:", cafe.dtype)
print("cube shape:", cube.shape, " dtype:", cube.dtype)
""")
md("""
**You should see** the cup, a hand, and the table on the left, and a cube with red, blue, and yellow
faces on a white background on the right. The café array is `(853, 1280, 3)`. The cube array is
`(720, 960, 3)`. Both are `uint8`: whole numbers from 0 to 255, three per pixel.

Before the models run, write one sentence for each photo: what you would say is in it, and which part
looks closer to the camera.
""")
code("""
uploaded = None

# TODO (optional, Colab only): uncomment the next two lines to inspect a photo of your own.
# from google.colab import files
# uploaded = load_rgb_bytes(next(iter(files.upload().values())))

def load_rgb_bytes(raw):
    data = np.frombuffer(raw, dtype=np.uint8)
    image_bgr = cv2.imdecode(data, cv2.IMREAD_COLOR)
    if image_bgr is None:
        raise FileNotFoundError("Could not read the upload.")
    return cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)

if uploaded is None:
    print("No upload. Sections 1 and 2 use the café photo and the cube.")
else:
    print("uploaded shape:", uploaded.shape)
    plt.figure(figsize=(5, 4))
    plt.imshow(uploaded)
    plt.axis("off")
    plt.title("Your upload")
    plt.show()
""")
md("""
**Reflection.** Which of the sentences you wrote could be checked from the numbers alone? Which of
them name an object, a color, or a distance the file does not store?

## 2 · The Rubik's cube

The cube is the picture for color. Its faces are red, blue, and yellow on a white background.
The café photo is the other image: ordinary surfaces, not stickers. The exercises switch between them.

### 2.1 · Shape

`shape` is `(rows, columns, channels)`. Rows count down from the top. Columns count across from the
left. The third axis is color, in RGB order, after the conversion above.
""")
turn("""
# TODO: set cube_shape to the cube's shape.
cube_shape = None

if cube_shape is None:
    cube_shape = cube.shape
    print("Still blank: using cube.shape.")
print("cube shape (rows, columns, channels):", cube_shape)
print("rows:", cube_shape[0], "  columns:", cube_shape[1], "  channels:", cube_shape[2])
""", """
cube_shape = cube.shape
print("cube shape (rows, columns, channels):", cube_shape)
print("rows:", cube_shape[0], "  columns:", cube_shape[1], "  channels:", cube_shape[2])
""")
md("""
**You should see** `(720, 960, 3)`: 720 rows, 960 columns, 3 channels.

**Reflection.** The café photo is wider than it is tall. The cube thumbnail is wider too. Which number
in `shape` tells you that, the first or the second?

### 2.2 · RGB channels

One pixel is three numbers, `(red, green, blue)`. A channel is one of those numbers at every pixel,
drawn here as gray: bright means a large value in that channel.

On this cube, yellow is high in red and high in green. The blue face is high in blue and low in the
other two. The white background is high in all three. There is no green face.
""")
code("""
names = ["red", "green", "blue"]
fig, axes = plt.subplots(1, 3, figsize=(10, 3.5))
for channel, (ax, name) in enumerate(zip(axes, names)):
    ax.imshow(cube[:, :, channel], cmap="gray", vmin=0, vmax=255)
    ax.set_title(f"Cube, {name}")
    ax.set_axis_off()
plt.show()
""")
turn("""
# TODO: set channel to 0 (red), 1 (green), or 2 (blue), then look at the café photo.
channel = None
names = ["red", "green", "blue"]

if channel is None:
    channel = 0
    print("Still blank: showing the red channel.")
channel = int(channel)
print(f"café {names[channel]} channel: min {int(cafe[:, :, channel].min())}, max {int(cafe[:, :, channel].max())}, mean {cafe[:, :, channel].mean():.1f}")
plt.figure(figsize=(6, 4))
plt.imshow(cafe[:, :, channel], cmap="gray", vmin=0, vmax=255)
plt.title(f"Café, {names[channel]} channel")
plt.axis("off")
plt.show()
""", """
channel = 2
names = ["red", "green", "blue"]
print(f"café {names[channel]} channel: min {int(cafe[:, :, channel].min())}, max {int(cafe[:, :, channel].max())}, mean {cafe[:, :, channel].mean():.1f}")
plt.figure(figsize=(6, 4))
plt.imshow(cafe[:, :, channel], cmap="gray", vmin=0, vmax=255)
plt.title(f"Café, {names[channel]} channel")
plt.axis("off")
plt.show()
""")
md("""
**You should see,** on the cube, a bright red face and a bright yellow face in the red channel, a
bright yellow face in the green channel, and a bright blue face in the blue channel. The blue face is
dark in the red and green channels. The blank café exercise shows the red channel: mean near 92.
The blue channel of the same photo is darker, mean near 66.

**Reflection.** Yellow survived in two channels. What would a model that saw only the blue channel
still be able to separate: the blue face, or the yellow face?

### 2.3 · Grayscale

Grayscale keeps one brightness per pixel. A usual choice is a weighted sum, because the same amount
of green light looks brighter to us than the same amount of blue:

`0.299 * R + 0.587 * G + 0.114 * B`

The weights sum to 1. The result is no longer a color.
""")
code("""
cube_gray = 0.299 * cube[:, :, 0] + 0.587 * cube[:, :, 1] + 0.114 * cube[:, :, 2]
print("cube grayscale shape:", cube_gray.shape, " min/max:", round(float(cube_gray.min()), 1), round(float(cube_gray.max()), 1))
plt.figure(figsize=(4, 3))
plt.imshow(cube_gray, cmap="gray", vmin=0, vmax=255)
plt.title("Cube, grayscale")
plt.axis("off")
plt.show()
""")
turn("""
# TODO: set gray_cafe to 0.299*R + 0.587*G + 0.114*B for the café photo.
gray_cafe = None

if gray_cafe is None:
    gray_cafe = 0.299 * cafe[:, :, 0] + 0.587 * cafe[:, :, 1] + 0.114 * cafe[:, :, 2]
    print("Still blank: using the luminance weights.")
print("café grayscale shape:", gray_cafe.shape)
plt.figure(figsize=(6, 4))
plt.imshow(gray_cafe, cmap="gray", vmin=0, vmax=255)
plt.title("Café, grayscale")
plt.axis("off")
plt.show()
""", """
gray_cafe = 0.299 * cafe[:, :, 0] + 0.587 * cafe[:, :, 1] + 0.114 * cafe[:, :, 2]
print("café grayscale shape:", gray_cafe.shape)
plt.figure(figsize=(6, 4))
plt.imshow(gray_cafe, cmap="gray", vmin=0, vmax=255)
plt.title("Café, grayscale")
plt.axis("off")
plt.show()
""")
md("""
**You should see** a 2D array. The cube's grayscale shape is `(720, 960)`, not `(720, 960, 3)`.
The yellow and white faces stay light. The blue face is darker than the yellow one, because blue
has the smallest weight. The café photo is a gray scene with the same framing as the color photo.

**Reflection.** Grayscale throws away the difference between a red sticker and a green sticker of
similar brightness. Which of today's later questions, "what color is that face?" or "where is the
edge of the cup?", can still be asked?

### 2.4 · Crop and resize

A crop is a slice: `image[top:bottom, left:right]`. Rows come first. A resize builds a new grid.
The classifier later in this notebook wants a square of 224×224. The square below is the largest
one that fits in the middle of the café photo. Its corners are computed from `shape`.
""")
code("""
def center_square(image_rgb, side=224):
    height, width = image_rgb.shape[:2]
    span = min(height, width)
    top = (height - span) // 2
    left = (width - span) // 2
    square = image_rgb[top:top + span, left:left + span]
    resized = cv2.resize(square, (int(side), int(side)), interpolation=cv2.INTER_AREA)
    return resized, (left, top, span)

center, box = center_square(cafe)
print("café center square (left, top, side):", box)
print("resized shape:", center.shape)

fig, axes = plt.subplots(1, 2, figsize=(10, 4))
axes[0].imshow(cafe)
axes[0].set_title("Café")
axes[1].imshow(center)
axes[1].set_title("Center square, 224×224")
for ax in axes:
    ax.set_axis_off()
plt.show()
""")
md("""
**You should see** `(left, top, side) = (213, 0, 853)`, then a shape of `(224, 224, 3)`. The square
starts 213 columns in from the left, at the top row. That is the crop saved with the lecture slides.
`center` is the array the classifier in section 3 will see.
""")
turn("""
# TODO: set side to the width of the resized cube. 224 matches the classifier. 32 makes each block large.
side = None

if side is None:
    side = 32
    print("Still blank: resizing the cube's center square to 32×32.")
cube_small, cube_box = center_square(cube, side=side)
print("cube box (left, top, side):", cube_box, " resized:", cube_small.shape)
plt.figure(figsize=(3, 3))
plt.imshow(cube_small)
plt.title(f"Cube center, {side}×{side}")
plt.axis("off")
plt.show()
""", """
side = 64
cube_small, cube_box = center_square(cube, side=side)
print("cube box (left, top, side):", cube_box, " resized:", cube_small.shape)
plt.figure(figsize=(3, 3))
plt.imshow(cube_small)
plt.title(f"Cube center, {side}×{side}")
plt.axis("off")
plt.show()
""")
md("""
**You should see** the cube's box `(120, 0, 720)`: left, top, and side. The square uses the full
height and drops 120 columns from each side. At 32×32 the colored faces are still there, and the
grid is coarse.

**Reflection.** Resizing does not add detail. What did the 32×32 cube lose that the 960-pixel-wide
original still had?

### 2.5 · Pixel values

`image[row, column]` is one pixel, three numbers. The coordinates below are not typed in by hand.
The reddest pixel is the one that maximizes red minus the larger of green and blue. The same rule,
with blue in front, finds a blue sticker. The center pixel is a different question: it is just the
middle of the grid.
""")
code("""
def extreme_pixel(image_rgb, channel):
    others = [c for c in range(3) if c != channel]
    score = image_rgb[:, :, channel].astype(int) - np.maximum(
        image_rgb[:, :, others[0]], image_rgb[:, :, others[1]]
    )
    index = np.argmax(score)
    row, col = np.unravel_index(index, score.shape)
    return int(row), int(col), image_rgb[row, col]

red_row, red_col, red_px = extreme_pixel(cube, 0)
blue_row, blue_col, blue_px = extreme_pixel(cube, 2)
print(f"reddest cube pixel at ({red_row}, {red_col}):", red_px)
print(f"bluest cube pixel at ({blue_row}, {blue_col}):", blue_px)
mid = cube[cube.shape[0] // 2, cube.shape[1] // 2]
print(f"center cube pixel at ({cube.shape[0] // 2}, {cube.shape[1] // 2}):", mid)
""")
turn("""
# TODO: choose a row and a column inside the café photo (853 rows, 1280 columns).
row = None
col = None

if row is None or col is None:
    row = cafe.shape[0] // 2
    col = cafe.shape[1] // 2
    print("Still blank: using the center pixel.")
print(f"café[{row}, {col}] =", cafe[row, col])
""", """
row, col, pixel = extreme_pixel(cafe, 0)
print(f"reddest café pixel at ({row}, {col}):", pixel)
""")
md("""
**You should see** a reddest cube pixel near `[232, 48, 24]` and a bluest one near `[1, 124, 228]`.
Those are sticker colors. The center of this cube thumbnail lands on a black gap, about `[0, 0, 2]`,
not on a sticker. The blank café exercise prints the center pixel, about `[144, 124, 91]`: a dull
tan, red a little above green, green above blue.

**Reflection.** The center pixel and the reddest pixel answer different questions. Which one tells
you about the object, and which one tells you about the grid?

### 2.6 · Histogram

A histogram counts how many pixels fall in each range of values. It throws away position. You can
see that the cube has a lot of white, and you cannot see where the white sits.
""")
code("""
fig, ax = plt.subplots(figsize=(7, 4))
for channel, color in enumerate(("red", "green", "blue")):
    ax.hist(
        cube[:, :, channel].ravel(),
        bins=32,
        range=(0, 256),
        histtype="step",
        color=color,
        linewidth=2,
        label=color,
    )
ax.set_xlabel("pixel value")
ax.set_ylabel("count")
ax.set_title("Cube")
ax.legend()
plt.show()
""")
turn("""
# TODO: set bins to 16, 32, or 256, then plot the café histogram.
bins = None

if bins is None:
    bins = 32
    print("Still blank: using 32 bins.")
fig, ax = plt.subplots(figsize=(7, 4))
for channel, color in enumerate(("red", "green", "blue")):
    ax.hist(
        cafe[:, :, channel].ravel(),
        bins=int(bins),
        range=(0, 256),
        histtype="step",
        color=color,
        linewidth=2,
        label=color,
    )
ax.set_xlabel("pixel value")
ax.set_ylabel("count")
ax.set_title("Café")
ax.legend()
plt.show()
""", """
bins = 16
fig, ax = plt.subplots(figsize=(7, 4))
for channel, color in enumerate(("red", "green", "blue")):
    ax.hist(
        cafe[:, :, channel].ravel(),
        bins=bins,
        range=(0, 256),
        histtype="step",
        color=color,
        linewidth=2,
        label=color,
    )
ax.set_xlabel("pixel value")
ax.set_ylabel("count")
ax.set_title("Café, 16 bins")
ax.legend()
plt.show()
""")
md("""
**You should see** a tall peak at the right edge of the cube histogram, values 248–255, in every
channel. That peak is the white background: about two thirds of the red-channel pixels are above
240, and about 40% of the blue-channel pixels are. The café histogram sits in the middle and the
left. Its blue channel peaks lower than its red channel, around the 30s rather than the 60s.
Almost none of the café pixels are above 240.

**Reflection.** The cube histogram says "a lot of this picture is white." It does not say that the
white is the background rather than a white face. What did the channel pictures keep that the
histogram threw away?
""")

md("""
## 3 · What is in this image?

**Classification** assigns one photograph to one category from a fixed list. It does not return a
sentence, a list of parts, or a description of how the objects are arranged.

**ImageNet**, in the form used here, is a set of 1,000 everyday object names. The weights were
learned by training on photographs labeled with those names. There is a category for espresso and
one for a cup. There is no category named "Rubik's cube," and none named "a café." The nearest
puzzle names on the list are "jigsaw puzzle" and "crossword puzzle."

A **pretrained** model is one whose weights were learned earlier and then saved. This notebook loads
`ResNet-18` with `ResNet18_Weights.IMAGENET1K_V1` and does not change those weights. Running the
model is inference. The download happens once. Later cells call `classify`, which reuses the same
network.

**Preprocessing** puts the photograph into the numeric range the network saw in training. The center
square is already 224×224. Each color is divided by 255, then shifted by ImageNet's mean and scaled
by its standard deviation. Those three means are about 0.485, 0.456, and 0.406 for red, green, and
blue. Skipping that step would hand the network numbers it was not trained on.

The printed percentage is a **softmax** score: of the probability spread across all 1,000 classes,
the share that landed on that name. People often call the largest share a confidence score. It is
not a judgment that the name describes the scene. The top five do not use up the whole 100% unless
the other 995 classes are nearly empty. A score of 90% means that name won the list. It can still
be the wrong description of what you see.

Look at the two photographs and write your guesses **before** you run the inference cell. Use a
short category name, not a sentence.
""")
turn("""
# TODO: write a category name for each photo before you run inference.
# Leave either one as None if you want to skip it.
guess_cafe = None
guess_cube = None

if guess_cafe is None and guess_cube is None:
    print("Still blank: write guess_cafe and guess_cube, then run the inference cell.")
else:
    print("café guess:", guess_cafe)
    print("cube guess:", guess_cube)
""", """
guess_cafe = "espresso"
guess_cube = "cube"
print("café guess:", guess_cafe)
print("cube guess:", guess_cube)
""")
code("""
from torchvision.models import ResNet18_Weights, resnet18

# Load once. Re-running this cell reuses the weights already in memory.
if "classifier" not in globals():
    weights = ResNet18_Weights.IMAGENET1K_V1
    classifier = resnet18(weights=weights).eval()
    categories = weights.meta["categories"]
    MEAN = torch.tensor([0.485, 0.456, 0.406])[:, None, None]
    STD = torch.tensor([0.229, 0.224, 0.225])[:, None, None]
    print("Loaded ResNet-18.", len(categories), "ImageNet categories.")
else:
    print("Reusing the ResNet-18 already in memory.")

def class_probabilities(image_rgb):
    resized = cv2.resize(image_rgb, (224, 224), interpolation=cv2.INTER_AREA)
    batch = torch.from_numpy(resized).permute(2, 0, 1).float().div(255)
    batch = ((batch - MEAN) / STD).unsqueeze(0)
    with torch.inference_mode():
        return torch.softmax(classifier(batch)[0], dim=0)

def classify(image_rgb):
    probabilities = class_probabilities(image_rgb)
    scores, indexes = torch.topk(probabilities, 5)
    return [(categories[int(index)], float(score)) for score, index in zip(scores, indexes)]

def top5_text(predictions):
    return "\\n".join(
        f"{rank}. {name:<16} {score:6.1%}"
        for rank, (name, score) in enumerate(predictions, start=1)
    )

def show_top5(image_rgb, title):
    predictions = classify(image_rgb)
    names = [name for name, _ in predictions][::-1]
    scores = [score for _, score in predictions][::-1]
    fig, axes = plt.subplots(1, 2, figsize=(9, 3.6))
    preview = cv2.resize(image_rgb, (224, 224), interpolation=cv2.INTER_AREA)
    axes[0].imshow(preview)
    axes[0].set_title(title)
    axes[0].set_axis_off()
    axes[1].barh(names, scores, color="#7a5ea0")
    axes[1].set_xlim(0, 1)
    axes[1].set_xlabel("share of the 1,000-class probability")
    fig.tight_layout()
    plt.show()
    print(top5_text(predictions))
    top1 = predictions[0][1]
    next_four = sum(score for _, score in predictions[1:])
    print(f"top label {top1:.1%}   next four together {next_four:.1%}   other 995 classes {1 - top1 - next_four:.1%}")
    return predictions

scaled = torch.from_numpy(center).permute(2, 0, 1).float().div(255)
normalized = (scaled - MEAN) / STD
print("café center, after /255:  min/max", round(float(scaled.min()), 3), round(float(scaled.max()), 3))
print("after mean and std:       min/max", round(float(normalized.min()), 3), round(float(normalized.max()), 3))
print("ImageNet mean (R, G, B):", [round(float(v), 3) for v in MEAN.view(-1)])
print("ImageNet std  (R, G, B):", [round(float(v), 3) for v in STD.view(-1)])
""")
turn("""
# TODO: set pixel to three integers, 0-255, from one pixel in the café photo.
# Section 2 printed the center pixel. Leave pixel as None to use that center pixel.
pixel = None

if pixel is None:
    pixel = cafe[cafe.shape[0] // 2, cafe.shape[1] // 2].tolist()
    print("Still blank: using the café center pixel", pixel)
values = torch.tensor(pixel, dtype=torch.float32).div(255)
normalized_pixel = (values - MEAN.view(-1)) / STD.view(-1)
print("after /255:        ", [round(float(v), 3) for v in values])
print("after mean and std:", [round(float(v), 3) for v in normalized_pixel])
""", """
pixel = [255, 255, 255]
values = torch.tensor(pixel, dtype=torch.float32).div(255)
normalized_pixel = (values - MEAN.view(-1)) / STD.view(-1)
print("white pixel after /255:        ", [round(float(v), 3) for v in values])
print("white pixel after mean and std:", [round(float(v), 3) for v in normalized_pixel])
""")
md("""
**You should see** the center pixel `[144, 124, 91]` move to about `[0.565, 0.486, 0.357]` after
dividing by 255. After subtracting the mean and dividing by the standard deviation, red and green
are a little above zero and blue is below zero. A white pixel, `[255, 255, 255]`, stays above the
mean on every channel. Zero in this scaled space is "typical ImageNet color," not black.

**Reflection.** The network never sees 0–255. What would you expect the top label to do if you
skipped the mean and standard deviation and passed the 0–255 numbers through anyway?
""")
code("""
def matches(guess, predictions):
    if guess is None:
        return "no guess written"
    names = [name.lower() for name, _ in predictions]
    return "in the top 5" if str(guess).lower() in names else "not in the top 5"

print("Café center square")
cafe_top5 = show_top5(center, "Café, center square")
print("your café guess is", matches(guess_cafe, cafe_top5))

cube_center, _ = center_square(cube)
print("\\nCube center square")
cube_top5 = show_top5(cube_center, "Cube, center square")
print("your cube guess is", matches(guess_cube, cube_top5))
""")
md("""
**You should see** two bar charts.

On the lecture computer the café square was espresso 85.9%, cup 9.4%, coffee mug 2.9%, eggnog 1.1%,
soup bowl 0.3%. A later check of this same code put espresso near 85% and the same five names in
the same order. The top name holds most of the probability. The other 995 classes hold well under
1%. The photograph still shows a hand and a table. ImageNet has no single name for that scene.

The cube's center square does not come back as a cube. On that same check the top name was
**chest**, near 91%, then crate, file, carton, and hamper. Those five names hold almost all of the
probability. "Rubik's cube" is not one of the 1,000 categories, so it cannot win. A guess of
"cube" is not in the top 5. A score near 90% and a wrong description can happen together.

**Reflection.** The café label is a drink you can see, and it still leaves out the hand. The cube
label is a piece of furniture you cannot see. What did the percentage tell you in each case?
""")
md("""
## 4 · Your turn

Choose the image that goes into the same `classify` function. The weights are not loaded again.

Leave the crop as `None` to use a whole example. Or set all four edges to slice the café photo.
Rows come first: `cafe[top:bottom, left:right]`. The café photo is 853 pixels tall and 1280 wide.
""")
turn("""
# TODO: set choice to "cafe", "cube", or "upload".
# Or set all four crop edges to classify a slice of the café photo.
choice = None
top = None
bottom = None
left = None
right = None

if None not in (top, bottom, left, right):
    chosen = cafe[top:bottom, left:right]
    if chosen.size == 0:
        raise ValueError("That slice is empty. top must be less than bottom, and left less than right.")
    label = "your café crop"
elif choice == "upload" and uploaded is not None:
    chosen = uploaded
    label = "your upload"
elif choice == "cafe":
    chosen = center
    label = "café center"
else:
    if choice is None:
        print("Still blank: classifying the cube center square.")
    elif choice == "upload":
        print("No upload yet. Classifying the cube center square.")
    chosen, _ = center_square(cube)
    label = "cube center"

yours = show_top5(chosen, label)
print("café top label was", cafe_top5[0][0], f"({cafe_top5[0][1]:.1%})")
print("this top label is", yours[0][0], f"({yours[0][1]:.1%})")
""", """
choice = "cafe"
top, bottom, left, right = 0, cafe.shape[0] // 2, 0, cafe.shape[1] // 2
chosen = cafe[top:bottom, left:right]
label = "upper-left café crop"
yours = show_top5(chosen, label)
print("café top label was", cafe_top5[0][0], f"({cafe_top5[0][1]:.1%})")
print("this top label is", yours[0][0], f"({yours[0][1]:.1%})")
""")
md("""
**You should see** a third bar chart, then two top labels printed one after the other. The blank
cell repeats the cube, with chest still in front. A crop of the café photo can keep espresso in
front and still move the shares of cup, mug, and eggnog. Compare the top score with the sum of the
next four: a large gap means the list is decided; a small gap means several names are still in play.

**Reflection.** Did your choice change the winning name, or only the percentages under the same
name? Which of those two is a change in what the model is willing to call the picture?
""")

md("""
## 5 · What happens when we change an image?

The weights stay fixed. Each edit below changes only the pixels of the café center square, then
asks ResNet-18 again. The question is not "can we process an image?" It is whether the winning
name is **invariant**: still the name you would use after a change that leaves the object in place.

`base` starts as that café square. You can set it to `cube_center` in the next cell if you want the
same tests on the cube. For each experiment, set `prediction` to `"same"` or `"changes"` **before**
you read the lists. `"same"` means you think the top name will survive.

One run of this code, on the café square, is the reference for the notes below. A different PyTorch
build can move the percentages. Look first at whether the top name holds.
""")
code("""
def crop_center(image, keep=0.5):
    height, width = image.shape[:2]
    crop_h, crop_w = int(height * keep), int(width * keep)
    top = (height - crop_h) // 2
    left = (width - crop_w) // 2
    return image[top:top + crop_h, left:left + crop_w]

def rotate_right(image):
    return cv2.rotate(image, cv2.ROTATE_90_CLOCKWISE)

def occlude(image, fraction=0.4):
    covered = image.copy()
    height, width = covered.shape[:2]
    block_h, block_w = int(height * fraction), int(width * fraction)
    top = (height - block_h) // 2
    left = (width - block_w) // 2
    covered[top:top + block_h, left:left + block_w] = 128
    return covered

def set_brightness(image, factor):
    return np.clip(image.astype(np.float32) * factor, 0, 255).astype(np.uint8)

def set_contrast(image, factor):
    shifted = (image.astype(np.float32) - 128.0) * factor + 128.0
    return np.clip(shifted, 0, 255).astype(np.uint8)

def reduce_resolution(image, side):
    small = cv2.resize(image, (int(side), int(side)), interpolation=cv2.INTER_AREA)
    return cv2.resize(small, (image.shape[1], image.shape[0]), interpolation=cv2.INTER_NEAREST)

def compare(original, edited, name, prediction):
    before = classify(original)
    after = classify(edited)
    fig, axes = plt.subplots(1, 2, figsize=(8, 3.6))
    axes[0].imshow(original)
    axes[0].set_title("Original")
    axes[1].imshow(edited)
    axes[1].set_title(name)
    for ax in axes:
        ax.set_axis_off()
    fig.tight_layout()
    plt.show()
    print("Original")
    print(top5_text(before))
    print(name)
    print(top5_text(after))
    outcome = "same" if before[0][0] == after[0][0] else "changes"
    print(
        f"Top label {outcome}: {before[0][0]} {before[0][1]:.1%}"
        f" -> {after[0][0]} {after[0][1]:.1%}"
    )
    if prediction is None:
        print('No prediction written. Set prediction to "same" or "changes" and run again.')
    else:
        word = str(prediction).lower()
        print(f"You predicted {word}.", "That is what happened." if word == outcome else "That is not what happened.")
    return before, after

# TODO: leave this as the café square, or set base = cube_center.
base = center
print("Image under test. Original top 5:")
print(top5_text(classify(base)))
""")
md("""
### 5.1 · Crop

The crop keeps the middle half of each side and throws the rest away. To you, it is still the cup.
Will the top name survive?
""")
turn("""
# TODO: set prediction to "same" or "changes" before you read the lists.
prediction = None
compare(base, crop_center(base, keep=0.5), "center crop", prediction)
""", """
prediction = "changes"
compare(base, crop_center(base, keep=0.5), "center crop", prediction)
""")
md("""
**You should see** the central half of the square, then a new top five. On one run the winner moved
from espresso, 85%, to **eggnog, 65%**, with espresso still second. The object did not become a
different drink. The list did.

**Reflection.** The name changed while the cup was still in the frame. Is that a failure of
invariance, or a reminder that the name was never "the whole scene"?

### 5.2 · Rotation

A quarter turn still shows a cup to a person. The pixels are a different grid.
""")
turn("""
# TODO: before you run this cell, set prediction to "same" or "changes".
prediction = None
compare(base, rotate_right(base), "rotated 90 degrees", prediction)
""", """
prediction = "changes"
compare(base, rotate_right(base), "rotated 90 degrees", prediction)
""")
md("""
**You should see** the square on its side. On one run the winner was **spotlight, 36%**, then
gasmask and can opener. Espresso left the top five. The top score is much lower than 85%: several
names are still in play, and none of them is the cup.

**Reflection.** A turn that you can undo by tilting your head removed the label. What did the
classifier depend on that you ignored?

### 5.3 · Occlusion

A gray block covers the middle 40% of the width and the height. The block is the value 128, not a
new object. The corners of the photograph remain.
""")
turn("""
# TODO: before you run this cell, set prediction to "same" or "changes".
prediction = None
compare(base, occlude(base, fraction=0.4), "center covered", prediction)
""", """
prediction = "changes"
compare(base, occlude(base, fraction=0.4), "center covered", prediction)
""")
md("""
**You should see** a gray square over the middle of the cup. On one run the winner was
**notebook, 60%**, then laptop and binder. The drink names are gone. Covering the center was
enough.

**Reflection.** Which part of the picture was the original name depending on? What is left in the
corners that a person still uses, and that this list ignored?

### 5.4 · Brightness

Every pixel is multiplied by 0.4, then clipped to 0–255. The arrangement is unchanged. The photo
is darker.
""")
turn("""
# TODO: before you run this cell, set prediction to "same" or "changes".
prediction = None
compare(base, set_brightness(base, factor=0.4), "darker, ×0.4", prediction)
""", """
prediction = "same"
compare(base, set_brightness(base, factor=0.4), "darker, ×0.4", prediction)
""")
md("""
**You should see** a darker cup, with **espresso** still first. On one run its share fell from 85%
to **58%**, and cup rose to 25%. The name held. The probability moved.

**Reflection.** Keeping the name is a weak kind of robustness. What else would you want to stay
still before you called the classifier insensitive to brightness?

### 5.5 · Contrast

Each channel is pulled toward 128. The factor 0.3 means differences from middle gray shrink to
30% of what they were. Edges and the dark coffee become less distinct.
""")
turn("""
# TODO: before you run this cell, set prediction to "same" or "changes".
prediction = None
compare(base, set_contrast(base, factor=0.3), "lower contrast, ×0.3", prediction)
""", """
prediction = "changes"
compare(base, set_contrast(base, factor=0.3), "lower contrast, ×0.3", prediction)
""")
md("""
**You should see** a flatter photograph. On one run the winner moved from espresso to **cup, 50%**,
with espresso second at 35%. Both names are still about the drink. The decision between them moved.

**Reflection.** Brightness kept the winner and contrast did not. Which change removed more of the
difference between the coffee and the cup?

### 5.6 · Resolution

The square is reduced to 16×16, then stretched back for display. The object is still in the frame.
The fine grid is gone.
""")
turn("""
# TODO: before you run this cell, set prediction to "same" or "changes".
prediction = None
compare(base, reduce_resolution(base, side=16), "16×16, stretched back", prediction)
""", """
prediction = "changes"
compare(base, reduce_resolution(base, side=16), "16×16, stretched back", prediction)
""")
md("""
**You should see** a blocky square. On one run the top name was **shower curtain, 12%**, then
window shade and shoji. The top score is small, and the names are no longer drinks. Most of the
probability sits outside the top five.

**Reflection.** You can still tell it was a cup on a table. The list cannot. What visual
information did the coarse grid remove?
""")
turn("""
# TODO: set side to another small size, such as 8 or 32, and set prediction to "same" or "changes".
side = None
prediction = None

if side is None:
    side = 32
    print("Still blank: using a 32×32 grid.")
compare(base, reduce_resolution(base, side=side), f"{int(side)}×{int(side)}, stretched back", prediction)
""", """
side = 32
prediction = "changes"
compare(base, reduce_resolution(base, side=side), f"{int(side)}×{int(side)}, stretched back", prediction)
""")
md("""
**You should see** a less blocky square than the 16×16 version. On one run a 32×32 grid was labeled
**library, 36%**, not espresso. A coarser or finer grid is a different experiment. Change `side`
and run the cell again.

**Invariance, robustness, occlusion, sensitivity.**

- A change you can undo, such as a quarter turn, need not leave the label in place. That is a
  failure of invariance: the name tracked the grid, not the object.
- Darkening kept the name and moved its percentage. Robustness here is partial. The winner held.
  The confidence did not.
- The gray block is not an object. Replacing the center with it replaced the drink with office
  supplies. The label was sensitive to the region that was covered.
- Resolution asks how much detail the name required. At 16×16 the list leaves the scene entirely,
  and no name is confident.
""")

md("""
## 6 · Can a machine see depth?

The photograph is a 2D array. Nothing in `shape` is a distance from the camera. A monocular depth
model looks at that one picture and **infers** a 3D arrangement. Monocular means there is no second
camera and no measured range. The cues it can use are the ones already in the picture: which
surface blocks another, where an object sits in the frame, familiar size, texture, and shading.

**Before you run the model,** name two of those cues in the café photo, and say whether the cube
thumbnail offers the same kind of evidence. The white background and the flat sticker faces are
weak cues. A blank gray image has none.

We use [Depth Anything V2 Small](https://huggingface.co/depth-anything/Depth-Anything-V2-Small-hf)
through the Transformers `depth-estimation` pipeline, the same model as the lecture. It loads once.
In this model, a larger value is nearer, so the display is drawn brighter for nearer surfaces. The
display is stretched to black–white **for that picture alone**. A bright pixel is not a distance in
meters, and two depth maps cannot be subtracted as if they shared a unit.

This section is optional. If the download fails, or the machine cannot run the model, the cell
prints the reason and the rest of the notebook continues. Classification does not need it.
""")
code("""
def load_depth():
    global depth_estimator
    if globals().get("depth_estimator") is not None:
        print("Reusing the depth model already in memory.")
        return True
    try:
        from transformers import pipeline
        depth_estimator = pipeline(
            task="depth-estimation",
            model="depth-anything/Depth-Anything-V2-Small-hf",
            device=0 if torch.cuda.is_available() else -1,
        )
        print("Loaded Depth Anything V2 Small.")
        return True
    except Exception as error:
        depth_estimator = None
        print("Depth section skipped:", type(error).__name__ + ":", error)
        print("The rest of the notebook still runs.")
        return False

def show_depth(image_rgb, title):
    if depth_estimator is None:
        print("Depth model is not loaded. Skipping:", title)
        return None
    square, _ = center_square(image_rgb)
    result = depth_estimator(Image.fromarray(square))
    relative = result["predicted_depth"].detach().float().cpu()
    depth_image = result["depth"]
    fig, axes = plt.subplots(1, 2, figsize=(8, 4))
    axes[0].imshow(square)
    axes[0].set_title(title)
    axes[0].set_axis_off()
    axes[1].imshow(depth_image, cmap="gray")
    axes[1].set_title("Relative depth, brighter = nearer")
    axes[1].set_axis_off()
    fig.tight_layout()
    plt.show()
    print(
        f"{title}: relative min/max "
        f"{float(relative.min()):.3f} / {float(relative.max()):.3f} (not meters)"
    )
    return depth_image

depth_ready = load_depth()
if depth_ready:
    show_depth(center, "Café center square")
""")
md("""
**You should see,** when the model loads, the café square beside a gray map. On one CPU run the
lower quarter of that map was much brighter than the upper quarter (display means about 181 and
14). In the photograph the near edge of the table is at the bottom, so brighter lines up with
nearer. The raw range on that run was about -0.08 to 6.6. A negative number cannot be a distance
in meters. The 0–255 picture is only a stretch of this one map.

**Reflection.**
- Which cues in the café photo could support that near-to-far order?
- The map is one number per pixel. What does a larger number represent, and what does it not?
""")
code("""
flat = np.full((224, 224, 3), 180, dtype=np.uint8)
if depth_estimator is None:
    print("Depth model is not loaded. The flat-image check is skipped.")
else:
    print("This image is one gray value, 180, at every pixel.")
    show_depth(flat, "Flat gray")
""")
md("""
**You should see** a depth picture that is not a flat gray, even though the input was. On one CPU
run the relative values still spanned about 0.3 to 5.7, and the display was stretched from 0 to
255. The model invented a pattern. A uniform photograph does not contain occlusion, texture, or
familiar size, so that pattern is not a measured scene.

**Reflection.** If a picture with no depth cues still produces a map, what are you looking at: the
scene, or the model's habit of filling one in?
""")
turn("""
# TODO: set depth_choice to "cafe", "cube", "upload", or "flat".
depth_choice = None

if depth_estimator is None:
    print("Depth model is not loaded. This exercise is skipped.")
else:
    if depth_choice is None:
        print("Still blank: running the cube.")
        depth_choice = "cube"
    if depth_choice == "flat":
        chosen_depth = np.full((224, 224, 3), 180, dtype=np.uint8)
        depth_title = "flat gray"
    elif depth_choice == "upload" and uploaded is not None:
        chosen_depth = uploaded
        depth_title = "your upload"
    elif depth_choice == "cafe":
        chosen_depth = center
        depth_title = "café center"
    else:
        if depth_choice == "upload":
            print("No upload yet. Using the cube.")
        chosen_depth = cube
        depth_title = "cube"
    show_depth(chosen_depth, depth_title)
""", """
depth_choice = "cube"
if depth_estimator is None:
    print("Depth model is not loaded. This exercise is skipped.")
else:
    show_depth(cube, "cube")
""")
md("""
**You should see** a second pair: the photograph you chose, and its map. Left blank, that is the
cube. On one CPU run the lower quarter of the cube crop was brighter than the upper quarter
(display means about 147 and 66). Decide from the figure whether the bright region is the cube or
the white background. The stickers are flat paint. Any "front face" in the map is inferred from
perspective and shading, not from a range sensor.

**Reflection.**
- Is any number on these maps a distance you could check with a ruler?
- What changed between the café photo, the cube, and the flat gray: the weights, or the evidence?
""")

md("""
## 7 · Wrap it in a demo

`see` does the whole path: center square, ResNet-18, depth. Gradio turns `see` into an upload box.
The function is the same one whether or not the box is on screen.

Run it on the café photo. Then, in Colab, upload a picture from your phone, and after that a
classmate's picture. The app stays in your notebook. It does not publish a public link.
""")
code("""
import gradio as gr

def see(image_rgb):
    square, _ = center_square(image_rgb)
    labels = {name: score for name, score in classify(square)}
    if globals().get("depth_estimator") is None:
        print("No depth map: the depth model did not load.")
        return labels, None
    depth_map = depth_estimator(Image.fromarray(square))["depth"]
    return labels, depth_map

example_labels, example_depth = see(rgb)
print("Café photo")
for name, score in example_labels.items():
    print(f"{name:<16} {score:6.1%}")

demo = gr.Interface(
    fn=see,
    inputs=gr.Image(type="numpy", label="Your photo"),
    outputs=[
        gr.Label(num_top_classes=5, label="Top 5 (ResNet-18)"),
        gr.Image(label="Depth (brighter = nearer)"),
    ],
    title="One-image vision app",
)

if "google.colab" in sys.modules:
    demo.launch(prevent_thread_lock=True)
else:
    print("The upload box opens in Colab. The café photo already ran through see().")
""")

md("""
## 8 · What you see, and what the model names

You already have two disagreements in hand. The cube is a cube, and the list said chest. The café
square turned on its side is still a cup, and the list said spotlight. This section adds a third
photograph, chosen because this same ResNet-18 gets it wrong. It is one example, not a rate.

Look at the photograph first. Write what you recognize before you run the classifier.

The photograph is ["Elephant bronze sculpture"](https://commons.wikimedia.org/wiki/File:Elephant_bronze_sculpture.jpg)
by Carlos Valenzuela, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
""")
turn("""
# TODO: one short phrase for what you recognize in the photograph, before the next cell.
what_i_see = None

if what_i_see is None:
    print("Still blank: write what_i_see, then run the classifier.")
else:
    print("You recognize:", what_i_see)
""", """
what_i_see = "a brass elephant statue"
print("You recognize:", what_i_see)
""")
code("""
ELEPHANT_URL = (
    "https://raw.githubusercontent.com/delamarifer/human-machine-perception/"
    "main/day02/assets/human-vs-machine/photo.jpg"
)

def probability_of(image_rgb, name):
    probabilities = class_probabilities(image_rgb)
    index = categories.index(name)
    rank = int((probabilities > probabilities[index]).sum()) + 1
    return rank, float(probabilities[index])

elephant = load_rgb(ELEPHANT_URL)
elephant_square, elephant_box = center_square(elephant)
print("center square (left, top, side):", elephant_box)
elephant_top5 = show_top5(elephant_square, "Elephant statue")
if what_i_see is None:
    print("You have not written what you recognize yet.")
else:
    print("You wrote:", what_i_see)
for name in ("Indian elephant", "African elephant", "tusker"):
    rank, score = probability_of(elephant_square, name)
    print(f"{name}: rank {rank}, {score:.1%}")
""")
md("""
**You should see** a decorated elephant statue beside a bar chart. On one run of this notebook the
top five were triceratops 27.3%, cowboy boot 26.5%, shield 5.9%, chain mail 4.6%, and cuirass 2.7%.
The lecture computer had the same two leaders. Indian elephant, African elephant, and tusker are
on the list of 1,000 names, and on that run they sat outside the top five, near 1% or below.
The center square is `(174, 0, 932)`.

The model did name something. It did not name what the picture is of.

- What did you recognize immediately?
- What did the model predict?
- Where did the two interpretations differ?
- What in the picture might explain the disagreement: the outline, the decoration, the metal, the
  pose, or something the 1,000 names do not contain?

### The same object, a different picture

The café square and the quarter turn of that square are different grids. They are the same cup.
The list did not treat them as the same object. Section 5 is the evidence.

Can two visually different images represent the same object? For you, yes. For this classifier,
not in general. A machine that "sees" the object would have to treat those two grids as one thing.
This one did not.

### What does it mean for a machine to see?

In this notebook, seeing meant assigning the pixels to a name from a fixed list, or painting a
relative depth map. Both are readings of a 2D array. Neither is the scene, and neither has to
match what you recognized at a glance.

Write that comparison in the next cell. A sentence each is enough.
""")
turn("""
# TODO: short answers. Leave a line as None until you have one.
recognized = None
model_said = None
differ = None
why = None
same_object = None   # "yes" or "no": can two different pictures be the same object?
machine_sees = None  # one sentence

answers = [
    ("What did you recognize immediately?", recognized),
    ("What did the model predict?", model_said),
    ("Where did human and machine interpretations differ?", differ),
    ("What visual information might explain the disagreement?", why),
    ("Can two visually different images represent the same object?", same_object),
    ("What does it mean for a machine to see?", machine_sees),
]
blank = 0
for question, answer in answers:
    print("•", question)
    if answer is None:
        blank += 1
        print("  (not written yet)")
    else:
        print(" ", answer)
if blank:
    print(blank, "of 6 still blank.")
""", """
recognized = "a brass elephant statue"
model_said = "triceratops, then cowboy boot"
differ = "I see an elephant. Those two names are not in that description."
why = "The outline is an elephant, and the surface is decorated metal. The winning names are not."
same_object = "yes"
machine_sees = "It maps the pixels to a name from a fixed list, or to a relative depth map. That reading can disagree with what I recognize."
answers = [
    ("What did you recognize immediately?", recognized),
    ("What did the model predict?", model_said),
    ("Where did human and machine interpretations differ?", differ),
    ("What visual information might explain the disagreement?", why),
    ("Can two visually different images represent the same object?", same_object),
    ("What does it mean for a machine to see?", machine_sees),
]
for question, answer in answers:
    print("•", question)
    print(" ", answer)
""")
md("""
**You should see** your six answers printed back to you. Left blank, the cell prints the questions
and counts how many are still open. The sample solution is one reading of the elephant figure and
of the quarter-turn cup. It is not the only one.

### What this leaves open

These are the questions the next lectures start from. They are not answered here.

- **Image formation and processing.** These numbers are already a photograph. What did the light do
  before it became an array?
- **Receptive fields and convolution.** Covering the middle of the cup changed the name. What does
  a small window of the picture see, before any name is chosen?
- **Texture and visual representations.** The coarse cup was still a cup to you, and a curtain to
  the list. What is left when the fine pixels change?
- **Learned visual features.** Nobody wrote an espresso rule by hand. What did the training
  pictures teach the network to use?
- **Neural networks.** The percentage is the end of a calculation. How does a stack of simple
  steps turn a grid into one name out of 1,000?
""")

md("""
## What you learned

- The photograph is an array: shape, three channels, a grayscale brightness, and a histogram that keeps the values and drops their positions.
- The center square and the resize are ordinary array operations. They do not use the learned weights.
- ResNet-18 picks one ImageNet name. A large percentage means that name won the list. On the cube, the winning name is still a poor description of the object.
- The same weights can keep that name, move it, or abandon it when the pixels change. A turn, a cover, and a coarse grid are harder on the label than a darker copy.
- A depth map is an inferred ordering of one photograph, not a measured distance. A flat gray image still produces a map.
- What you recognize and what the list names can come apart. A statue of an elephant can be labeled triceratops. The name is a choice from 1,000 categories, not a description of the scene.

**Homework**

- Read chapters 5–7.
- Find one computer-vision topic or application you want to know more about.
- Complete the PyTorch exercise.
- Begin the week 1 problem set.
""")

if __name__ == '__main__':
    main(FILE)

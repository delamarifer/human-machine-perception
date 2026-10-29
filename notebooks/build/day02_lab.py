"""Builds notebooks/day02-lab-one-image.ipynb: the Day 2 in-class lab.

Same photo, crop, ResNet-18, and Depth Anything model as day02/assets/pipeline.py and the lecture
scene. See nbtools.py for how to build and check it.
"""
from nbtools import md, code, turn, badge, main

FILE = 'day02-lab-one-image.ipynb'
BADGE = badge(FILE)

md(f"""
{BADGE}

# Day 2 lab · What can one photo tell a model?

**Human-Machine Perception** · Day 2 · Fernanda & Shreya

About 45 minutes. Run the cells from top to bottom. You will use the same café photo as the lecture.

By the end you will be able to:

1. load a photograph and read its shape
2. crop and resize it the way a pretrained model expects
3. run **ResNet-18**, a classifier you did not train, and read its top five labels
4. run a depth model on the same crop and read the map
5. call both models from one small app, then try a photo from your phone

**How to use this notebook.** Each gray box is a *code cell*. Click it and press **Shift + Enter** to
run it. Run the cells in order. The cell marked **Your turn** runs without errors as it is, and does
something new once you fill it in. A solution is hidden under *Show a solution*. Try it yourself first.

The first run downloads two models. That can take a few minutes. Let it finish.
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
## 1 · Load the photograph

OpenCV reads the file into a NumPy array of shape `(rows, columns, channels)`. Color is stored as
**BGR** (blue, green, red), so we convert it to RGB before displaying it.

The photograph is ["Warm cup of coffee on a table at a cafe"](https://commons.wikimedia.org/wiki/File:Warm_cup_of_coffee_on_a_table_at_a_cafe.jpg)
by Shixart1985, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). We use the copy already in
this course repository, the same file as the Day 2 slides.
""")
code("""
PHOTO_URL = (
    "https://raw.githubusercontent.com/delamarifer/human-machine-perception/"
    "main/day02/assets/one-photo/photo.jpg"
)

with urllib.request.urlopen(PHOTO_URL) as response:
    file_bytes = np.frombuffer(response.read(), dtype=np.uint8)

bgr = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
if bgr is None:
    raise FileNotFoundError("Could not read the photo. Run this cell again.")
rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)

print("shape (rows, columns, channels):", rgb.shape)
print("dtype:", rgb.dtype)
print("smallest value:", int(rgb.min()), "  largest value:", int(rgb.max()))

plt.figure(figsize=(8, 5))
plt.imshow(rgb)
plt.title("Café photo")
plt.show()
""")
md("""
You should see the cup, a hand, and the table. The shape is `(853, 1280, 3)`: 853 pixels tall,
1280 pixels wide, and 3 numbers per pixel. `uint8` means whole numbers from 0 to 255.
""")

md("""
## 2 · Preprocess: a center square, then 224×224

ResNet-18 was trained on square images of 224×224 pixels. We take the largest square that fits in
the middle of the photo, using the height and width we just printed, and resize that square to
224×224. The slice numbers come from the shape. They are not typed in by hand.
""")
code("""
def center_square(image_rgb):
    \"\"\"Largest centered square, resized to 224×224. Also returns the box as (left, top, side).\"\"\"
    height, width = image_rgb.shape[:2]
    side = min(height, width)
    top = (height - side) // 2
    left = (width - side) // 2
    square = image_rgb[top:top + side, left:left + side]
    square = cv2.resize(square, (224, 224), interpolation=cv2.INTER_AREA)
    return square, (left, top, side)

center, box = center_square(rgb)
print("center square: left, top, side =", box)
print("model input shape:", center.shape)

fig, axes = plt.subplots(1, 2, figsize=(10, 4))
axes[0].imshow(rgb)
axes[0].set_title("Full photo")
axes[1].imshow(center)
axes[1].set_title("Center square, 224×224")
for ax in axes:
    ax.set_axis_off()
plt.show()
""")
md("""
For this photo the box is `(213, 0, 853)`: it starts 213 columns in from the left, at the top row,
and the side is 853 pixels. That matches the crop saved with the lecture slides.
""")

md("""
## 3 · Run a classifier you did not train

**ResNet-18** already has weights, learned earlier on ImageNet (1,000 categories). Loading them is
not training. This notebook does not change the weights.

Before the photo goes in, its colors are scaled from 0–255 into the range the network saw during
training. `softmax` turns the raw scores into percentages across the 1,000 categories. We print the
five largest.
""")
code("""
from torchvision.models import ResNet18_Weights, resnet18

weights = ResNet18_Weights.IMAGENET1K_V1
classifier = resnet18(weights=weights).eval()
categories = weights.meta["categories"]
MEAN = torch.tensor([0.485, 0.456, 0.406])[:, None, None]
STD = torch.tensor([0.229, 0.224, 0.225])[:, None, None]

def classify(image_rgb):
    \"\"\"Resize an RGB image to 224×224 and return the top 5 labels with their percentages.\"\"\"
    resized = cv2.resize(image_rgb, (224, 224), interpolation=cv2.INTER_AREA)
    batch = torch.from_numpy(resized).permute(2, 0, 1).float().div(255)
    batch = ((batch - MEAN) / STD).unsqueeze(0)
    with torch.inference_mode():
        probabilities = torch.softmax(classifier(batch)[0], dim=0)
    scores, indexes = torch.topk(probabilities, 5)
    return [(categories[int(index)], float(score)) for score, index in zip(scores, indexes)]

def top5_text(predictions):
    return "\\n".join(
        f"{rank}. {name:<16} {score:6.1%}"
        for rank, (name, score) in enumerate(predictions, start=1)
    )

print("Center square")
print(top5_text(classify(center)))
""")
md("""
On the lecture computer, this same crop and this same ResNet-18 (`IMAGENET1K_V1`) produced:

1. espresso 85.9%
2. cup 9.4%
3. coffee mug 2.9%
4. eggnog 1.1%
5. soup bowl 0.3%

Your list should be close. A different PyTorch version can move the percentages a little. A high
percentage means that label won among the 1,000 categories. The photo still shows a hand and a table,
and ImageNet has no single label for the whole scene.

## 4 · Your turn

A crop does not change the weights. It changes which pixels the model sees. Edit the four numbers
so the slice covers a different part of the photo. Rows come first: `rgb[top:bottom, left:right]`.
The photo is 853 pixels tall and 1280 pixels wide.
""")
turn("""
# YOUR TURN · Choose a different crop, then classify it.
# Leave the four names as None to keep the center square from the cell above.
top = None
bottom = None
left = None
right = None

if None in (top, bottom, left, right):
    chosen = center
    print("Using the center square. Set top, bottom, left, and right to choose your own crop.")
else:
    chosen = rgb[top:bottom, left:right]
    if chosen.size == 0:
        raise ValueError("That slice is empty. top must be less than bottom, and left less than right.")
    print("your crop shape:", chosen.shape)

plt.figure(figsize=(4, 4))
plt.imshow(chosen)
plt.title("Crop sent to the classifier")
plt.axis("off")
plt.show()
print(top5_text(classify(chosen)))
""", """
height, width = rgb.shape[:2]
top, bottom, left, right = 0, height // 2, 0, width // 2
chosen = rgb[top:bottom, left:right]
print("your crop shape:", chosen.shape)

plt.figure(figsize=(4, 4))
plt.imshow(chosen)
plt.title("Crop sent to the classifier")
plt.axis("off")
plt.show()
print(top5_text(classify(chosen)))
""")

md("""
## 5 · A second reading of the same crop

Classification asks which category won. Depth estimation asks which surfaces are closer.

We use [Depth Anything V2 Small](https://huggingface.co/depth-anything/Depth-Anything-V2-Small-hf),
the same model as the lecture, on the center square. In this model, **brighter means nearer**: the
front of the table, then the cup and the hand, then the background.

The brightness is scaled so you can see the pattern in this one picture. A bright pixel is not a
distance in meters.
""")
code("""
from transformers import pipeline

depth_estimator = pipeline(
    task="depth-estimation",
    model="depth-anything/Depth-Anything-V2-Small-hf",
    device="cpu",
)

depth_image = depth_estimator(Image.fromarray(center))["depth"]

fig, axes = plt.subplots(1, 2, figsize=(8, 4))
axes[0].imshow(center)
axes[0].set_title("Center square")
axes[1].imshow(depth_image, cmap="gray")
axes[1].set_title("Depth, brighter = nearer")
for ax in axes:
    ax.set_axis_off()
plt.show()
""")

md("""
## 6 · Wrap it in a demo

`see` does the whole path: center square, ResNet-18, depth. Gradio turns `see` into an upload box.
The function is the same one whether or not the box is on screen.

Run it on the café photo. Then, in Colab, upload a picture from your phone, and after that a
classmate's picture. The app stays in your notebook. It does not publish a public link.
""")
code("""
import gradio as gr

def see(image_rgb):
    \"\"\"Top 5 labels and a depth map for one RGB photograph.\"\"\"
    square, _ = center_square(image_rgb)
    labels = {name: score for name, score in classify(square)}
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
## What you learned

- The photograph is an array. Its shape is rows, columns, and three color numbers.
- The center square and the resize are ordinary array operations. They do not use the learned weights.
- ResNet-18 names a category among 1,000 labels. Your crop changed the pixels, not the weights.
- The depth map is a second reading of the same crop. Brighter means nearer here, and the brightness is not meters.

**Homework**

- Read chapters 5–7.
- Find one computer-vision topic or application you want to know more about.
- Complete the PyTorch exercise.
- Begin the week 1 problem set.
""")

if __name__ == '__main__':
    main(FILE)

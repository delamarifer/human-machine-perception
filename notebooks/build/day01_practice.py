"""Builds notebooks/day01-practice-numpy-images.ipynb: optional NumPy practice for Day 1.
See nbtools.py for how to build and check it."""
from nbtools import md, code, turn, badge, main

FILE = 'day01-practice-numpy-images.ipynb'
BADGE = badge(FILE)

# ---------------------------------------------------------------------------------------------
md(f"""
{BADGE}

# Day 1 practice (optional) · Images are arrays of numbers

**Human-Machine Perception** · Day 1 · Fernanda & Shreya

Optional NumPy practice for the Day 1 homework. To a computer, a picture is just a grid of numbers.
Here you will open that grid and work with
it directly. By the end you will be able to:

1. load an image from the web into Python as a **NumPy array**
2. read its **shape**, **dtype** and **color channels**, and pick out single pixels and crops
3. turn a color image into **grayscale**
4. change **brightness and contrast** with plain arithmetic
5. **measure** the checker-shadow illusion from the lecture: are squares A and B really different?

**How to use this notebook.** Each gray box is a *code cell*. Click it and press **Shift + Enter** to
run it. Run the cells in order, top to bottom. Cells marked **Your turn** are for you: they run
without errors as they are, and do something once you fill them in. Each one has a solution hidden
under *Show a solution*. Try it yourself first.

New to Python? That's fine. Read the code, run it, and change a number to see what happens.
You cannot break anything: *Runtime → Restart session* starts over.
""")

md("""
## 0 · Check your setup

This cell imports the three libraries we use and prints their versions. If it runs without a red
error message, you are ready.
""")
code("""
import sys
import urllib.request

import numpy as np                 # arrays and math
import matplotlib.pyplot as plt    # plotting
from PIL import Image              # opening image files

print("Python    ", sys.version.split()[0])
print("NumPy     ", np.__version__)
print("Matplotlib", plt.matplotlib.__version__)
print("Running in Colab:", "google.colab" in sys.modules)
""")

# ---------------------------------------------------------------------------------------------
md("""
## 1 · Load an image as an array

We download the checker-shadow image from the lecture (by Edward H. Adelson) straight from the
course's GitHub repository, open it with Pillow, and turn it into a NumPy array with `np.array(...)`.
""")
code("""
URL = "https://raw.githubusercontent.com/delamarifer/human-machine-perception/main/assets/assumptions/checker-shadow.png"

with urllib.request.urlopen(URL) as f:
    img = np.array(Image.open(f).convert("RGB"))

plt.figure(figsize=(7, 5.5))
plt.imshow(img)
plt.title("The checker-shadow image, as an array")
plt.show()
""")
md("""
Notice the numbers on the axes. `plt.imshow` labels each pixel by its **row** (down the side,
counting from the top) and its **column** (along the bottom). We will use those numbers to find things
in the image.
""")

# ---------------------------------------------------------------------------------------------
md("""
## 2 · Shape, dtype and channels

Every NumPy array has a **shape** (how many numbers along each direction) and a **dtype** (what kind
of number it stores).
""")
code("""
print("shape:", img.shape)
print("dtype:", img.dtype)
print("smallest value:", img.min(), "  largest value:", img.max())
""")
md("""
How to read this:

- The shape is `(rows, columns, channels)`: the image is that many pixels **tall**, that many
  pixels **wide**, and every pixel has **3** numbers: how much **red**, **green** and **blue** light.
- `uint8` means *unsigned 8-bit integer*: whole numbers from **0** (none of that color) to **255**
  (as much as possible).

So the whole picture is `rows × columns × 3` numbers. Let's look at a few of them.
""")
code("""
print("total numbers in the image:", img.size)

# One pixel: img[row, column] gives its 3 numbers (red, green, blue)
print("top-left corner pixel:", img[0, 0])
print("a pixel on the cylinder:", img[300, 760])
""")
md("""
The corner is `[255 255 255]`: full red, full green and full blue light together look **white**.
The cylinder pixel has more green than red or blue, so it looks green.

**Rows come first.** `img[300, 760]` means *row 300 (down), column 760 (across)*. This is the
opposite of the usual (x, y) order in math, and it trips everyone up at first.

We can also look at one channel at a time. `img[:, :, 0]` means *every row, every column, channel 0
(red)*. The colon `:` means "all of them".
""")
code("""
names = ["red", "green", "blue"]
fig, axes = plt.subplots(1, 3, figsize=(14, 4))
for c in range(3):
    axes[c].imshow(img[:, :, c], cmap="gray", vmin=0, vmax=255)
    axes[c].set_title(f"channel {c}: {names[c]}")
    axes[c].axis("off")
plt.show()
""")
md("""
Each channel is shown in gray: bright means a large number. The checkerboard looks the same in all
three channels (its grays have equal red, green and blue), but the cylinder is much brighter in the
**green** channel.
""")

# ---------------------------------------------------------------------------------------------
md("""
## 3 · Cropping with slices

`start:stop` picks a range of rows or columns. `img[200:350, 450:700]` keeps rows 200 to 349 and
columns 450 to 699 (the stop number itself is left out). The result is a smaller array: a crop.
""")
code("""
crop_A = img[200:350, 450:700]
print("crop shape:", crop_A.shape)

plt.imshow(crop_A)
plt.title("A crop around square A")
plt.show()
""")
turn("""
# YOUR TURN 1 · Crop the top of the green cylinder.
# Use the row and column numbers on the axes of the full image above to choose your slices.

crop_top = None   # replace None with img[ ... , ... ]

if crop_top is not None:
    print("your crop has shape", crop_top.shape)
    plt.imshow(crop_top)
    plt.show()
""", """
crop_top = img[30:180, 670:950]

print("your crop has shape", crop_top.shape)
plt.imshow(crop_top)
plt.show()
""")

# ---------------------------------------------------------------------------------------------
md("""
## 4 · Grayscale

A grayscale image has **one** number per pixel instead of three. The simplest way to get it: average
the red, green and blue numbers of every pixel. `img.mean(axis=2)` averages along the third direction
(the channels), so the result has shape `(rows, columns)`.
""")
code("""
gray = img.mean(axis=2)
print("gray shape:", gray.shape, "  dtype:", gray.dtype)

plt.imshow(gray, cmap="gray", vmin=0, vmax=255)
plt.title("Grayscale (plain average)")
plt.colorbar(label="pixel value")
plt.show()
""")
md("""
Two details:

- `cmap="gray"` tells Matplotlib to draw one-number images in shades of gray, and `vmin=0, vmax=255`
  fixes black at 0 and white at 255. Without them, Matplotlib stretches the colors to the image's own
  range, which can be misleading.
- The average gives a `float64` array (numbers with decimals). That is fine for doing math.

Our eyes are more sensitive to green light than to blue, so many programs use a **weighted** average
instead. A common choice (the ITU-R BT.601 standard) is `0.299 R + 0.587 G + 0.114 B`.
""")
turn("""
# YOUR TURN 2 · Make a weighted grayscale image with the weights 0.299, 0.587, 0.114.
# Hint: img[:, :, 0] is the red channel, img[:, :, 1] green, img[:, :, 2] blue.

gray_weighted = None   # replace None with your formula

if gray_weighted is not None:
    fig, axes = plt.subplots(1, 2, figsize=(12, 4.5))
    axes[0].imshow(gray, cmap="gray", vmin=0, vmax=255); axes[0].set_title("plain average")
    axes[1].imshow(gray_weighted, cmap="gray", vmin=0, vmax=255); axes[1].set_title("weighted")
    plt.show()
    print("cylinder pixel, plain average:", gray[300, 760], "  weighted:", gray_weighted[300, 760])
""", """
R, G, B = img[:, :, 0], img[:, :, 1], img[:, :, 2]
gray_weighted = 0.299 * R + 0.587 * G + 0.114 * B

fig, axes = plt.subplots(1, 2, figsize=(12, 4.5))
axes[0].imshow(gray, cmap="gray", vmin=0, vmax=255); axes[0].set_title("plain average")
axes[1].imshow(gray_weighted, cmap="gray", vmin=0, vmax=255); axes[1].set_title("weighted")
plt.show()
print("cylinder pixel, plain average:", gray[300, 760], "  weighted:", gray_weighted[300, 760])
# The checkerboard does not change (its R, G and B are equal); the green cylinder gets brighter.
""")

# ---------------------------------------------------------------------------------------------
md("""
## 5 · Brightness and contrast are arithmetic

Because the image is numbers, editing it is math on every pixel at once:

- **brightness**: add a number to every pixel (`gray + 60` makes everything lighter)
- **contrast**: stretch values away from the middle gray, 128 (`(gray - 128) * 1.5 + 128`)

Values must stay between 0 and 255, so we **clip** anything outside that range with `np.clip`.
""")
code("""
brighter = np.clip(gray + 60, 0, 255)
more_contrast = np.clip((gray - 128) * 1.5 + 128, 0, 255)

fig, axes = plt.subplots(1, 3, figsize=(15, 4))
for ax, im, title in zip(axes, [gray, brighter, more_contrast], ["original", "brightness + 60", "contrast × 1.5"]):
    ax.imshow(im, cmap="gray", vmin=0, vmax=255)
    ax.set_title(title)
    ax.axis("off")
plt.show()
""")
md("""
**A trap to know about.** The original `img` is `uint8`, which can only hold 0 to 255. If you add to it
directly, numbers past 255 *wrap around* to small numbers instead of stopping at white:
""")
code("""
corner = img[0, 0]                          # the white corner pixel: [255 255 255], uint8
print("uint8 plus 10:", corner + 10)                 # wraps around past 255
print("float plus 10:", corner.astype(float) + 10)   # what we wanted
""")
md("""
That is why we did the math on `gray`, which is already `float64`. If you ever want to do math on
`img`, convert first with `img.astype(float)`.
""")
turn("""
# YOUR TURN 3 · Make the photographic negative of the grayscale image:
# black becomes white and white becomes black.
# Hint: what number do you subtract each pixel from?

negative = None   # replace None with your formula

if negative is not None:
    plt.imshow(negative, cmap="gray", vmin=0, vmax=255)
    plt.title("negative")
    plt.show()
""", """
negative = 255 - gray

plt.imshow(negative, cmap="gray", vmin=0, vmax=255)
plt.title("negative")
plt.show()
""")

# ---------------------------------------------------------------------------------------------
md("""
## 6 · Measuring the illusion

In the lecture, square **A** looked much darker than square **B**. Your eyes are sure of it. Now we
can ask the pixels.

We take a small patch of 21 × 21 pixels inside each square, to the left of the printed letter, and
look at the numbers. Square A's patch is centred on row 283, column 522; square B's on row 472,
column 504.
""")
code("""
def patch(image, row, col, r=10):
    \"\"\"The (2r+1) x (2r+1) square of pixels centred on (row, col).\"\"\"
    return image[row - r : row + r + 1, col - r : col + r + 1]

A = patch(img, 283, 522)
B = patch(img, 472, 504)

print("square A: min", A.min(), " max", A.max(), " mean", A.mean())
print("square B: min", B.min(), " max", B.max(), " mean", B.mean())
""")
md("""
Every pixel in both patches has the same value. A and B are the **same gray** in the file.

Seeing it is harder than measuring it. Here are the two patches with everything else removed:
""")
code("""
fig, axes = plt.subplots(1, 2, figsize=(4, 2))
for ax, p, name in zip(axes, [A, B], ["A", "B"]):
    ax.imshow(p)
    ax.set_title(name)
    ax.axis("off")
plt.show()
""")
md("""
Out of context they look identical. Now put them back in context and join them with a bar of the
same gray, like the bars in the lecture. Where the bar meets each square there is no edge.
""")
code("""
with_bar = img.copy()                      # copy, so we don't change the original
with_bar[283:473, 504:520] = A[0, 0]       # rows 283-472, columns 504-519: A's exact color

plt.figure(figsize=(7, 5.5))
plt.imshow(with_bar)
plt.title("A bar of A's gray, from A down to B")
plt.show()
""")
md("""
**Why does it happen?** Your visual system doesn't report the light reaching your eye. It assumes B
sits in the cylinder's shadow and corrects for it, so it tells you about the **surface**: B is a light
square in shade. That is usually the right answer about the world, even though it is the wrong
answer about the pixels. A computer that only reads the numbers has no such assumption.
""")
turn("""
# YOUR TURN 4 · Does the shadow show up in the numbers?
# Compare a light square in full light (centred on row 250, column 420)
# with the light square just above B, which the shadow partly covers (row 360, column 480).
# Print the mean of a patch from each. Which is darker in the file?

light_in_light = None    # replace None with patch(img, ...)
light_in_shadow = None   # replace None with patch(img, ...)

if light_in_light is not None and light_in_shadow is not None:
    print("light square in full light:", light_in_light.mean())
    print("light square in shadow:    ", light_in_shadow.mean())
""", """
light_in_light = patch(img, 250, 420, r=5)
light_in_shadow = patch(img, 360, 480, r=5)

print("light square in full light:", light_in_light.mean())
print("light square in shadow:    ", light_in_shadow.mean())
# The shadowed square has smaller numbers: the shadow is really there in the light reaching
# the camera. Your visual system takes it out when it judges the color of the surface.
""")
md("""
**Think about it** (no code): a self-driving car's camera sees a light-gray road in shadow and a
dark-gray road in sunlight with the same pixel values. Should the car treat them as the same color?
What would it need to know to tell them apart?
""")

# ---------------------------------------------------------------------------------------------
md("""
## What you learned

- An image is a NumPy array of shape `(rows, columns, 3)` with values from 0 to 255.
- `img[row, col]` reads one pixel; `img[r0:r1, c0:c1]` crops; `img[:, :, c]` picks a channel.
- Grayscale is an average over channels; brightness and contrast are addition and multiplication.
- Use floats for math, and clip back to 0 to 255.
- The pixel values of A and B are identical. The difference you see is made by your visual system.

Next: the Day 1 lab, `day01-lab-simple-vision-system.ipynb`, uses these tools to build a whole (tiny) vision system.
""")



if __name__ == '__main__':
    main(FILE)

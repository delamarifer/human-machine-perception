"""Builds notebooks/day01-lab-simple-vision-system.ipynb: the Day 1 lab.
Follows Chapter 2, "A Simple Vision System", of Torralba, Isola & Freeman, Foundations of Computer
Vision (https://visionbook.mit.edu/simplesystem.html). The scenes are rendered by our own code
(day01_lab_helpers.py), so the notebook needs no downloads and knows the true 3D answer.
See nbtools.py for how to build and check it."""
import os
from nbtools import md, code, hidden, turn, answer, resources, badge, main

# The solutions live in a git-ignored file, private/day01_lab_solutions.py (the repository is public).
# Without it, this script still builds the student notebook; --teacher and --solved need it.
try:
    from private.day01_lab_solutions import SOL, ANSWERS
except ImportError:
    SOL, ANSWERS = {}, {}

FILE = 'day01-lab-simple-vision-system.ipynb'
HELPERS = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'day01_lab_helpers.py')).read()
CHAPTER = 'https://visionbook.mit.edu/simplesystem.html'

# ---------------------------------------------------------------------------------------------
md(f"""
{badge(FILE)}

# Day 1 lab · A simple vision system

**Human-Machine Perception** · Day 1 · Fernanda & Shreya

In 1966, MIT's "Summer Vision Project" set out to build a working vision system in one summer. It
turned out to be much harder than anyone expected. In this lab you build a small one anyway, for a
deliberately simple world: colored boxes on a white floor. From **one image**, your system will
recover the **3D shape** of the scene.

This lab follows Chapter 2, *A Simple Vision System*, of Torralba, Isola & Freeman,
*Foundations of Computer Vision* (MIT Press). Read it alongside: [{CHAPTER}]({CHAPTER}).

By the end you will be able to:

1. explain how a 3D world becomes a 2D image (**projection**) and why going back is **ill-posed**
2. treat an image as a **NumPy array** and compute its **gradients** to find **edges**
3. separate **figure from ground**, and tell **contact** edges from **occlusion** edges
4. use **assumptions** about the world (generic view, flat faces, objects rest on the floor) as equations
5. **solve** those equations to recover 3D, check the answer, and see where the assumptions **break**

**How to use this notebook.** Click a gray code cell and press **Shift + Enter** to run it. Run the
cells in order, top to bottom. Cells marked **Your turn** are for you: they run as they are (the
notebook falls back on the course's answer so later cells still work), and do your version once you
fill them in. We go over the solutions together in class.

New to Python? That's fine. Read the code, run it, change a number, and see what happens.
*Runtime → Restart session* always starts over.
""")

md("""
## 0 · Set up

Run the next two cells. The first checks your libraries. The second loads the lab's **helper code**:
a small renderer that draws our box world, and the solver we use in section 6. It is folded away;
you are welcome to open it, but you don't need to read it.
""")
code("""
import sys
import numpy as np                 # arrays and math
import matplotlib.pyplot as plt    # plotting
import scipy                       # the solver in section 6 uses it
import plotly                      # the 3D view you can turn around, in section 6

print("Python    ", sys.version.split()[0])
print("NumPy     ", np.__version__)
print("SciPy     ", scipy.__version__)
print("Plotly    ", plotly.__version__)
print("Running in Colab:", "google.colab" in sys.modules)
""")
hidden("#@title Helper code: run this cell (no need to read it)\n" + HELPERS)

# ---------------------------------------------------------------------------------------------
md("""
## 1 · A simple world, and how it becomes an image

Our world: a white floor, and a few boxes made of colored paper standing on it. Every face is flat,
and every edge is either **vertical** or **horizontal**.

The camera uses **parallel projection**: light rays travel to the camera in parallel, so objects
don't get smaller with distance. (A real camera with a long zoom, far from the scene, is close to
this.) The camera is tilted down by an angle θ. A point in the world at `(X, Y, Z)`, where **Y is
height** above the floor and Z points toward the camera, lands in the image at

$$x = X \\qquad y = \\cos(\\theta)\\,Y - \\sin(\\theta)\\,Z$$

(equation 2.1 in the chapter). Let's render the world.
""")
code("""
image, Y_true, Z_true = render(WORLD)

print("image shape:", image.shape)
plt.figure(figsize=(8, 5.5))
plt.imshow(image)
plt.title("Our simple world, as the camera sees it")
plt.show()
""")
md("""
Look at the equation again. The image has two coordinates, `x` and `y`; the world has three.
Height `Y` and depth `Z` get **mixed together** into the single number `y`. So many different 3D
points land on the same pixel.
""")
turn("""
# YOUR TURN 1 · Write the projection, then find two different 3D points with the same image position.
theta = np.deg2rad(35)     # the tilt our camera uses

def project(X, Y, Z):
    # replace None with the formula for y from the equation above
    x = X
    y = None
    return x, y

point1 = project(10, 20, 0)
# Now change the numbers below so that point 2 is a DIFFERENT 3D point that lands on the SAME pixel.
# Hint: raise Y a little, and change Z to make up for it.
point2 = project(10, 20, 0)

if point1[1] is None:
    print("Fill in the formula for y first.")
else:
    print(f"point 1 lands at x = {point1[0]}, y = {point1[1]:.2f}")
    print(f"point 2 lands at x = {point2[0]}, y = {point2[1]:.2f}")
""", SOL.get(1, ""))
resources(('Book: a simple image formation model', 'https://visionbook.mit.edu/simplesystem.html#a-simple-image-formation-model'), ('np.cos / np.sin', 'https://numpy.org/doc/stable/reference/generated/numpy.cos.html'), ('np.deg2rad', 'https://numpy.org/doc/stable/reference/generated/numpy.deg2rad.html'))
md("""
Both points give the same `(x, y)`. From the image alone, there is no way to tell which one is out
there. This is what we meant in lecture by **perception is ill-posed**: the image does not contain
enough information to pin down the world. Every vision system, yours and the one we build here,
has to add **assumptions** to fill the gap.
""")

# ---------------------------------------------------------------------------------------------
md("""
## 2 · The image is an array of numbers

The image is a NumPy array of shape `(rows, columns, 3)`: one red, green and blue value per pixel,
here between 0 and 1. `image[row, col]` is one pixel; rows count **down** from the top.

For finding edges we only need brightness, so we average the three colors into one **grayscale**
image.
""")
code("""
print("one pixel of the floor:", image[5, 5])
print("one pixel of the red box:", image[100, 40])

gray = image.mean(axis=2)          # average over the color channels
print("gray shape:", gray.shape)

plt.figure(figsize=(8, 5.5))
plt.imshow(gray, cmap="gray", vmin=0, vmax=1)
plt.colorbar(label="brightness")
plt.title("Grayscale")
plt.show()
""")
md("""
Notice that each box is a single color of paper, yet its faces have different brightness: each face
is tilted differently toward the light. The pixel values mix the **surface** with the **lighting**.
That is the checker-shadow problem from the lecture, and it is why recovering the true color of a
surface is a hard goal. Here we go after a different goal: **3D shape**.
""")

# ---------------------------------------------------------------------------------------------
md("""
## 3 · Edges are where the image changes

An **edge** is where brightness changes quickly from one pixel to the next. The change in brightness
as you move across the image is the image's **derivative** (its **gradient**). With pixels, a
derivative is just a difference of neighbors:

$$\\frac{\\partial \\ell}{\\partial x} \\approx \\ell(x, y) - \\ell(x-1, y)$$

In NumPy, `gray[:, 1:]` is the image without its first column and `gray[:, :-1]` is the image
without its last column. Subtracting them gives every pixel minus its left neighbor, all at once.
""")
turn("""
# YOUR TURN 2 · Compute the horizontal difference: each pixel minus its LEFT neighbor.
dx_simple = None      # replace None with gray[ ... ] - gray[ ... ]

if dx_simple is not None:
    print("shape:", dx_simple.shape, "(one column fewer than the image)")
    plt.figure(figsize=(8, 5.5))
    plt.imshow(dx_simple, cmap="RdBu", vmin=-0.3, vmax=0.3)
    plt.colorbar(label="change in brightness, left to right")
    plt.title("Horizontal derivative")
    plt.show()
""", SOL.get(2, ""))
resources(('Book: extracting edges', 'https://visionbook.mit.edu/simplesystem.html#extracting-edges-from-images'), ('NumPy slicing', 'https://numpy.org/doc/stable/user/basics.indexing.html#slicing-and-striding'), ('plt.imshow', 'https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.imshow.html'))
md("""
A slightly better version averages over the neighboring rows too (the **Sobel** filter, in the helper
`sobel`). It gives both derivatives: `dx` (left to right) and `dy` (bottom to top). From them:

- **edge strength** = length of the gradient, $\\sqrt{dx^2 + dy^2}$
- **edge orientation**: the gradient points *across* the edge, from dark to light
""")
code("""
dx, dy = sobel(gray)
strength = np.hypot(dx, dy)          # sqrt(dx**2 + dy**2)

plt.figure(figsize=(8, 5.5))
plt.imshow(strength, cmap="gray")
plt.colorbar(label="edge strength")
plt.title("Edge strength")
plt.show()
""")
turn("""
# YOUR TURN 3 · Decide which pixels are edges: keep pixels whose strength is above a threshold.
# Try a few thresholds. Too low and you get noise; too high and you lose the faint edges
# between two faces of the same box.
edges = None          # replace None with  strength > some_number

if edges is None:
    edges = course_edges(gray)
    print("(using the course's threshold for now)")
plt.figure(figsize=(8, 5.5))
plt.imshow(edges, cmap="gray")
plt.title("Edge pixels")
plt.show()
""", SOL.get(3, ""))
resources(('Book: extracting edges', 'https://visionbook.mit.edu/simplesystem.html#extracting-edges-from-images'), ('Boolean masks in NumPy', 'https://numpy.org/doc/stable/user/basics.indexing.html#boolean-array-indexing'), ('np.hypot', 'https://numpy.org/doc/stable/reference/generated/numpy.hypot.html'))

# ---------------------------------------------------------------------------------------------
md("""
## 4 · Figure and ground; contact and occlusion

**Figure / ground.** In our world this is easy: the floor is white, so its pixels have red, green and
blue all about equal (low **saturation**). The boxes are colored, so their channels differ.
Saturation = largest channel − smallest channel.
""")
turn("""
# YOUR TURN 4 · Make a mask that is True on the boxes ("figure") and False on the floor ("ground").
# Hint: image.max(axis=2) and image.min(axis=2) give the largest and smallest channel of every pixel.
saturation = None     # replace None with your formula
figure = None         # replace None with  saturation > some_number

if figure is None:
    figure = course_figure(image)
    print("(using the course's mask for now)")
plt.figure(figsize=(8, 5.5))
plt.imshow(figure, cmap="gray")
plt.title("Figure (white) and ground (black)")
plt.show()
""", SOL.get(4, ""))
resources(('Book: figure/ground segmentation', 'https://visionbook.mit.edu/simplesystem.html#figureground-segmentation'), ('np.max (axis)', 'https://numpy.org/doc/stable/reference/generated/numpy.max.html'), ('np.min (axis)', 'https://numpy.org/doc/stable/reference/generated/numpy.min.html'), ('Broadcasting', 'https://numpy.org/doc/stable/user/basics.broadcasting.html'))
md("""
**Two kinds of object boundary.** Scan any column of the image from top to bottom:

- going from **floor to box**, the box is *in front of* the floor behind it: an **occlusion edge**.
  The box's top is far above the floor there, so the depth jumps.
- going from **box to floor**, the box is *touching* the floor: a **contact edge**. There, the box's
  height is exactly 0.

We assume every box rests on the floor, so contact edges tell us where `Y = 0` on each box.
""")
code("""
below = np.zeros_like(figure); below[:-1] = figure[1:]      # is the pixel below this one figure?
above = np.zeros_like(figure); above[1:] = figure[:-1]      # is the pixel above this one figure?

contact = figure & ~below          # box pixel with floor right below it
occlusion = figure & ~above        # box pixel with floor right above it

show = np.ones(image.shape)
show[figure] = 0.85
show[occlusion] = (0.9, 0.6, 0.0)
show[contact] = (0.0, 0.5, 0.6)
plt.figure(figsize=(8, 5.5))
plt.imshow(show)
plt.title("Occlusion edges (orange) and contact edges (teal)")
plt.show()
""")

# ---------------------------------------------------------------------------------------------
md("""
## 5 · Generic view: vertical in the image means vertical in the world

Some properties survive projection: a straight 3D line stays straight in the image, and lines that
meet in 3D still meet in the image. The reverse is not guaranteed (two lines can *look* like they
meet by coincidence), but it is very likely true unless the camera sits at a special, **accidental**
viewpoint. Assuming we are not at such a viewpoint is the **generic view** assumption.

For our camera, 3D **vertical** edges always project to vertical lines in the image, and horizontal
3D edges almost never do. So we label an edge **vertical** when its image orientation is within
15 degrees of vertical, and **horizontal** otherwise.

On a vertical edge, the gradient points left or right: `dy` is small compared to `dx`. The angle of
the gradient is `np.arctan2(dy, dx)`; for a vertical edge it is close to 0° or 180°.
""")
turn("""
# YOUR TURN 5 · Label edge pixels as vertical: the gradient angle is within 15 degrees of horizontal.
# Hint: np.degrees(np.arctan2(dy, dx)) gives the angle of the gradient, from -180 to 180.
# Its sine is close to 0 for a horizontal gradient: abs(np.sin(...)) < np.sin(np.deg2rad(15)).
vertical = None       # replace None with  edges & (your condition)

if vertical is None:
    vertical = course_vertical(edges, dx, dy)
    print("(using the course's labels for now)")
show = np.ones(image.shape)
show[edges] = (0.2, 0.3, 0.9)      # horizontal 3D edges in blue
show[vertical] = (0.9, 0.2, 0.2)   # vertical 3D edges in red
plt.figure(figsize=(8, 5.5))
plt.imshow(show)
plt.title("Vertical (red) and horizontal (blue) 3D edges")
plt.show()
""", SOL.get(5, ""))
resources(('Book: generic view', 'https://visionbook.mit.edu/simplesystem.html#generic-view-and-nonaccidental-scene-properties'), ('np.arctan2', 'https://numpy.org/doc/stable/reference/generated/numpy.arctan2.html'), ('Boolean masks in NumPy', 'https://numpy.org/doc/stable/user/basics.indexing.html#boolean-array-indexing'))

# ---------------------------------------------------------------------------------------------
md("""
## 6 · From assumptions to 3D

Now we turn each assumption into an **equation** about the unknown height `Y` of every pixel:

| Where | Assumption | Equation |
|---|---|---|
| floor pixels | the floor is flat at height 0 | `Y = 0` |
| contact edges | boxes rest on the floor | `Y = 0` |
| vertical edges | they are vertical in 3D | going up one row, `Y` grows by `1 / cos(θ)` |
| horizontal edges | they are horizontal in 3D | `Y` doesn't change along the edge |
| inside a face | faces are flat | the second derivatives of `Y` are 0 |

The last row is how information **propagates**: edges tell us about the 3D shape only at a few
pixels, and "faces are flat" carries it into the plain regions in between.

That gives tens of thousands of equations, more than there are pixels, and they can't all hold
exactly. So we find the `Y` that breaks them the least: **least squares**, the same idea as fitting a
line through noisy points. The helper `reconstruct` builds the equations and solves them (it takes a
few seconds). Once we know `Y`, the projection equation gives us `Z`.
""")
code("""
Y, Z = reconstruct(figure, edges, vertical, contact, dx, dy)

fig, axes = plt.subplots(1, 3, figsize=(16, 4))
axes[0].imshow(image); axes[0].set_title("input image")
axes[1].imshow(Y, cmap="viridis", vmin=0, vmax=Y_true.max()); axes[1].set_title("recovered height Y")
axes[2].imshow(Y_true, cmap="viridis", vmin=0, vmax=Y_true.max()); axes[2].set_title("true height Y")
for ax in axes: ax.axis("off")
plt.show()
""")
md("""
**Did it work?** We rendered the world ourselves, so we know the true answer and can measure the
error. (With a real photo, you would need some other way to check: that's why **evaluation** is a
big topic in computer vision.)
""")
code("""
error = np.abs(Y - Y_true)[figure]
print(f"tallest box: true height {Y_true[figure].max():.1f}, recovered {Y[figure].max():.1f}")
print(f"typical error on the boxes: {np.median(error):.1f} units")
""")
md("""
Another check is to look at the result from a viewpoint the camera never had. Each dot below is one
pixel, placed at its recovered 3D position. Try other values of `elev` (height of the viewpoint, in
degrees) and `azim` (angle around the scene).
""")
code("""
show_3d(Y, Z, image, figure, title="Recovered 3D, seen from a new viewpoint", elev=20, azim=-75)
""")
md("""
A still picture only shows one side. In the next view you can **drag to turn it around** (and scroll
to zoom). Here every pixel is drawn, the floor included. What is missing behind the boxes?
""")
code("""
show_3d_interactive(Y, Z, image)
""")
md("""
### Your turn 6 · What is missing, and why? (talk it over, no code)

Turn the reconstruction so you look at it from behind. Name two things that are missing, and say
why the system could not have recovered them.
""")
resources(('Book: occlusion edges', 'https://visionbook.mit.edu/simplesystem.html#occlusion-edges'), ('Book: from constraints to 3D', 'https://visionbook.mit.edu/simplesystem.html#sec-constraint'), ('Plotly 3D scatter', 'https://plotly.com/python/3d-scatter-plots/'))
answer(ANSWERS.get(6, ""))
md("""
**Think about it.** The answer is close, but not perfect, even though the image is clean and
computer-generated. Where could the error come from? (Hints: how wide is an edge, in pixels? On which
pixel exactly does a box touch the floor?)
""")

# ---------------------------------------------------------------------------------------------
md("""
## 7 · When the assumptions break

Our system works because the world obeys its assumptions. What happens outside that world?
Here is a box that **floats** above the floor. Nothing in the image says it floats. The helper
`run_system` runs every step of this lab on a new world's image (with the course's version of each
step) and compares the result with the truth.
""")
code("""
floating_world = [make_box(-55, 25, 40, 45, 40, 30, RED),
                  make_box(25, 0, 30, 30, 30, -25, GREEN, base=35)]   # green box 35 units in the air

run_system(floating_world, "a floating box")
""")
md("""
The system is confident, and wrong: it put the green box on the floor, farther back, as a short box.
Its "boxes rest on the floor" assumption filled the gap the image left open, exactly as in section 1.
Your visual system makes assumptions like these too. They are usually right about the world, which
is why they are worth making.
""")
turn("""
# YOUR TURN 7 · Design a world that breaks another assumption, and see what the system does.
# Ideas: stack one box on top of another (base = height of the lower box);
#        put one box in front of another so it hides part of it;
#        turn a box to angle=0 or 90, an "accidental" view where a horizontal edge looks vertical in the image.
# make_box(x, z, width, height, depth, angle, color, base=0)   x: left/right, z: toward the camera
my_world = None       # replace None with a list of boxes, like floating_world above

if my_world is not None:
    run_system(my_world, "my world")
""", SOL.get(7, ""))
resources(('Book: generalization', 'https://visionbook.mit.edu/simplesystem.html#generalization'), ('Book: a simple inference scheme', 'https://visionbook.mit.edu/simplesystem.html#a-simple-inference-scheme'))

# ---------------------------------------------------------------------------------------------
md("""
## What you built

- **Image formation**: 3D to 2D loses a dimension, so recovering 3D from one image is ill-posed.
- **Images are arrays**: edges come from differences between neighboring pixels.
- **Assumptions fill the gap**: flat floor, objects resting on it, generic view, flat faces.
- **Inference**: assumptions become equations; least squares finds the best compromise.
- **Generalization**: outside the world it was designed for, the system can be confidently wrong.

The rest of the course swaps hand-written assumptions for ones that are **learned from data**. The
questions stay the same: what does the system assume, and what happens when the world disagrees?

**Homework:** finish any *Your turn* cells you didn't get to in class, and read Chapter 2 of the
book: [{CHAPTER}]({CHAPTER}).
""".replace('{CHAPTER}', CHAPTER))

if __name__ == '__main__':
    main(FILE, private_solutions=True)

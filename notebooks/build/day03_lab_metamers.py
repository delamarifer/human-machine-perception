"""Builds notebooks/day03-lab-metamers.ipynb: the Day 3 lab, making metamers with plenoptic.
Vision: a pooling model by hand, plenoptic's front-end models, the Portilla-Simoncelli texture model, and
ResNet-18 stages (after Feather et al. 2023). Sound: a small cochleagram model and texture statistics
(after McDermott & Simoncelli 2011), written in torch and run through the same plenoptic Metamer, plus an
optional speech-recognition network (wav2vec 2.0). Data: notebooks/data/day03/ (sources in SOURCES.md)
and assets/metamers/coffee.jpg. See nbtools.py for how to build and check it."""
from nbtools import md, code, hidden, turn, answer, resources, badge, main

# The solutions live in a git-ignored file, private/day03_lab_metamers_solutions.py (the repository is
# public). Without it, this script still builds the student notebook; --teacher and --solved need it.
try:
    from private.day03_lab_metamers_solutions import SOL, ANSWERS
except ImportError:
    SOL, ANSWERS = {}, {}

FILE = 'day03-lab-metamers.ipynb'
PRIMER = 'https://delamarifer.github.io/human-machine-perception/metamers.html'
PLENOPTIC = 'https://docs.plenoptic.org/'
FEATHER = 'https://doi.org/10.1038/s41593-023-01442-0'
MCDERMOTT = 'https://doi.org/10.1016/j.neuron.2011.06.032'

# ---------------------------------------------------------------------------------------------
md(f"""
{badge(FILE)}

# Day 3 lab · Make your own metamers

**Human-Machine Perception** · Day 3 · Fernanda & Shreya

A **metamer** is a stimulus that is physically different from another but that a system cannot tell
apart from it. If a model turns an input $x$ into numbers $f(x)$, then two inputs are **model
metamers** when $f(x_1) = f(x_2)$. Whatever differs between them is information the model throws away.

The [metamers primer]({PRIMER}) showed the recipe. Today you run it yourself, on models of seeing and
models of hearing:

1. pick a model and compute its numbers for a **target** (a photo, a sound);
2. start from **random noise**;
3. **nudge** the noise, with gradient descent, until the model's numbers for it match the target's.

By the end you will be able to:

1. make a metamer by hand in PyTorch, and then with the **plenoptic** library
2. predict what a model throws away from what it computes (blurring, pooling, texture statistics)
3. compare metamers from an **early** and a **late** stage of a deep network, and say what that
   tells us about the network (Feather et al., 2023)
4. make **sound** metamers from a model of the ear, listen to them, and say why speech and rain behave
   differently
5. run the **test**: can a classmate tell the real thing from the metamer?

**How to use this notebook.** Click a gray code cell and press **Shift + Enter** to run it. Run the
cells in order. Cells marked **Your turn** are for you: they run as they are, and do your version once
you fill them in. Each synthesis prints how long it took. Everything runs on Colab's free CPU; the last,
optional section is faster on a GPU (*Runtime → Change runtime type → T4 GPU*).

Wear headphones for the sound sections.
""")

md("""
## 0 · Set up

The first cell installs **plenoptic**, a library from Eero Simoncelli's lab for making stimuli from
models (it is not preinstalled in Colab). The second checks your libraries. The third loads small
helpers for loading files, showing images and playing sounds; it is folded away, and you don't need to
read it.
""")
code("""
%pip install -q plenoptic==2.1.2
""")
code("""
import sys, time, warnings

import matplotlib.pyplot as plt
import numpy as np
import torch
import torch.nn.functional as F
import plenoptic as po

warnings.filterwarnings("ignore", message="Loss has converged")   # plenoptic says when it stops early
warnings.filterwarnings("ignore", message="input_tensor range")    # sounds run from -1 to 1; images from 0 to 1
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

print("Python   ", sys.version.split()[0])
print("PyTorch  ", torch.__version__)
print("plenoptic", po.__version__)
print("Device   ", DEVICE)
""")
hidden("""
#@title Helpers: run this cell (you don't need to read it)
import os, random, urllib.request
from IPython.display import Audio, HTML, display
from PIL import Image
from scipy.io import wavfile

RAW = "https://raw.githubusercontent.com/delamarifer/human-machine-perception/main/"
SR = 16000   # every sound in this lab: 16,000 samples per second

def fetch(path):
    \"\"\"A file from the course repository: the local copy if this runs inside the repo, else download it.\"\"\"
    for up in ("..", os.path.join("..", "..")):
        local = os.path.join(up, path)
        if os.path.exists(local):
            return local
    name = os.path.basename(path)
    if not os.path.exists(name):
        urllib.request.urlretrieve(RAW + path, name)
    return name

def load_gray(path, side=256):
    \"\"\"A photo as a grayscale tensor of shape (1, 1, side, side), values in [0, 1].\"\"\"
    im = Image.open(fetch(path)).convert("L")
    w, h = im.size; s = min(w, h)
    im = im.crop(((w - s) // 2, (h - s) // 2, (w - s) // 2 + s, (h - s) // 2 + s)).resize((side, side), Image.LANCZOS)
    return torch.tensor(np.array(im) / 255.0, dtype=torch.float32)[None, None].to(DEVICE)

def load_rgb(path, side=224):
    \"\"\"A photo as a color tensor of shape (1, 3, side, side), values in [0, 1].\"\"\"
    im = Image.open(fetch(path)).convert("RGB").resize((side, side), Image.LANCZOS)
    return torch.tensor(np.array(im) / 255.0, dtype=torch.float32).permute(2, 0, 1)[None].to(DEVICE)

def load_sound(path):
    \"\"\"A sound as a tensor of shape (1, 1, 1, samples): plenoptic treats it as a 1-pixel-tall image.\"\"\"
    sr, w = wavfile.read(fetch(path))
    assert sr == SR, sr
    return torch.tensor(w / 32768.0, dtype=torch.float32)[None, None, None].to(DEVICE)

def to_np(x):
    return x.detach().cpu().squeeze().numpy()

def show(images, titles=None, size=3.2):
    \"\"\"Show tensors side by side (gray or color), clipped to [0, 1].\"\"\"
    titles = titles or [""] * len(images)
    fig, axes = plt.subplots(1, len(images), figsize=(size * len(images), size))
    for ax, im, t in zip(np.atleast_1d(axes), images, titles):
        a = to_np(im.clamp(0, 1))
        ax.imshow(a.transpose(1, 2, 0) if a.ndim == 3 else a, cmap="gray", vmin=0, vmax=1)
        ax.set_title(t, fontsize=10); ax.set_axis_off()
    plt.tight_layout(); plt.show()

def play(sound, label=""):
    \"\"\"An audio player for a sound tensor.\"\"\"
    if label:
        display(HTML(f"<b>{label}</b>"))
    display(Audio(to_np(sound).clip(-1, 1), rate=SR, normalize=False))

def plot_loss(losses, title="loss"):
    plt.figure(figsize=(4, 2.5)); plt.semilogy(losses); plt.xlabel("step"); plt.ylabel("loss (log scale)")
    plt.title(title, fontsize=10); plt.tight_layout(); plt.show()

def synthesize(target, model, steps, lr=0.01, init=None, stop_criterion=1e-4, **metamer_kwargs):
    \"\"\"plenoptic's Metamer with this lab's defaults. Returns the Metamer object; prints the time it took.\"\"\"
    model = model.to(DEVICE).eval()
    po.remove_grad(model)
    po.set_seed(0)
    met = po.Metamer(target, model, **metamer_kwargs)
    met.setup(initial_image=init, optimizer_kwargs={"lr": lr})
    t0 = time.time()
    met.synthesize(max_iter=steps, stop_criterion=stop_criterion)   # stops early once the loss stops improving
    print(f"{len(met.losses) - 1} steps in {time.time() - t0:.1f} s; loss {met.losses[0]:.3g} -> {met.losses[-1]:.3g}")
    return met

# --- the pairs test (section 7) ---
_KEY = {}
def ab_test(name, original, metamer, sound=False):
    \"\"\"Shows (or plays) the original and the metamer as A and B, in a random order; reveal_answers() says which was which.\"\"\"
    pair = [("original", original), ("metamer", metamer)]
    random.shuffle(pair)
    _KEY[name] = "A" if pair[0][0] == "original" else "B"
    display(HTML(f"<h4>{name}: which one is the original, A or B?</h4>"))
    if sound:
        play(pair[0][1], "A"); play(pair[1][1], "B")
    else:
        show([pair[0][1], pair[1][1]], ["A", "B"])

def reveal_answers():
    for name, k in _KEY.items():
        print(f"{name}: the original was {k}")
""")

# ---------------------------------------------------------------------------------------------
md("""
## 1 · The recipe by hand

Start with a model so simple you can predict its metamers: it cuts the image into 8 × 8 blocks and
keeps only the **average brightness** of each block. That turns 256 × 256 = 65,536 numbers into
32 × 32 = 1,024. Many different images give the same 1,024 numbers, so this model has many metamers.
(This is the idea behind the peripheral-vision metamers of Freeman & Simoncelli, 2011, with a much
cruder statistic: averages pooled over regions.)

The photo is the café cup from the lecture: ["Warm cup of coffee on a table at a cafe"](https://commons.wikimedia.org/wiki/File:Warm_cup_of_coffee_on_a_table_at_a_cafe.jpg)
by Shixart1985, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/), in grayscale.
""")
code("""
photo = load_gray("assets/metamers/coffee.jpg")            # shape (1, 1, 256, 256)

def block_model(x, block=8):
    \"\"\"The model: the average of each block x block patch.\"\"\"
    return F.avg_pool2d(x, block)

print("image:", tuple(photo.shape), "->  model numbers:", tuple(block_model(photo).shape))
show([photo, block_model(photo)], ["the photo (65,536 numbers)", "what the model keeps (1,024)"])
""")
md("""
Now the recipe, written out in plain PyTorch. `noise` is the image we change. Each step: run the model
on it, measure how far its numbers are from the target's (the **loss**), and let PyTorch compute which
way to nudge every pixel to shrink that distance (`loss.backward()`). The optimizer, Adam, takes the step.
""")
code("""
target = block_model(photo)                               # 1. the target's numbers

torch.manual_seed(0)
noise = torch.rand_like(photo).requires_grad_(True)       # 2. start from random noise
optimizer = torch.optim.Adam([noise], lr=0.02)

losses = []
for step in range(300):                                   # 3. nudge, and repeat
    loss = ((block_model(noise) - target) ** 2).mean()    #    compare
    optimizer.zero_grad()
    loss.backward()                                       #    which way should each pixel move?
    optimizer.step()                                      #    move it a little
    with torch.no_grad():
        noise.clamp_(0, 1)                                #    keep pixels in the allowed range
    losses.append(loss.item())

plot_loss(losses, "distance between model numbers")
show([photo, noise, block_model(photo), block_model(noise)],
     ["target", "metamer", "model(target)", "model(metamer)"])
""")
md("""
**You should see** the loss fall by several orders of magnitude, and two bottom panels that look the
same: the model cannot tell the photo from the metamer. You can, easily. Everything that differs (the
fine detail inside each block, here still random noise) is what this model throws away.

The same loop, as a function you can reuse:
""")
code("""
def metamer_by_hand(target_image, model, steps=300, lr=0.02, seed=0):
    torch.manual_seed(seed)
    x = torch.rand_like(target_image).requires_grad_(True)
    opt = torch.optim.Adam([x], lr=lr)
    goal = model(target_image)
    for _ in range(steps):
        loss = ((model(x) - goal) ** 2).mean()
        opt.zero_grad(); loss.backward(); opt.step()
        with torch.no_grad():
            x.clamp_(0, 1)
    return x.detach()
""")
md("""
### Exercise 1 · Bigger or smaller blocks

Pick a block size: 2, 4, 16 or 32 (it must divide 256). **Before you run it, predict:** will the metamer
look more or less like the photo than with 8? At which block size could you no longer tell what the
photo shows?
""")
turn("""
# Your turn 1: set block to 2, 4, 16 or 32 and write your prediction first.
block = None
my_prediction = ""

if block is None:
    print("Set block to a number, then run this cell again.")
else:
    model = lambda x: block_model(x, block)
    mine = metamer_by_hand(photo, model)
    show([photo, mine], ["target", f"metamer, {block} x {block} blocks"])
    print("You predicted:", my_prediction)
""", SOL.get(1, ""))
resources(("PyTorch avg_pool2d", "https://docs.pytorch.org/docs/stable/generated/torch.nn.functional.avg_pool2d.html"),
          ("Metamers primer: how metamers are made", PRIMER + "#recipe"))

# ---------------------------------------------------------------------------------------------
md(f"""
## 2 · The same recipe with plenoptic

[plenoptic]({PLENOPTIC}) packages that loop as `po.Metamer(target, model)`. A model is any PyTorch
module that takes an image tensor of shape (batch, channels, height, width) and returns numbers. Its
weights must be frozen (`po.remove_grad(model)`), because only the image changes. plenoptic adds
conveniences: it stops when the loss stops improving, keeps pixels in range with a penalty, and lets you
swap the optimizer.

Our helper `synthesize(target, model, steps)` calls exactly that and prints the time. Here it is with two
of plenoptic's **front-end models**, simple models of the eye:

- `Gaussian`: a blur. It keeps coarse structure and throws away fine detail.
- `OnOff`: center-surround cells, like the retina's ON and OFF cells, with gain control: each cell's
  response is divided by the average light and contrast around it. Its filters are fit to data
  (Berardino et al., 2017).
""")
code("""
blur = po.models.Gaussian(kernel_size=31, std=4.0)
met_blur = synthesize(photo, blur, steps=300)

retina = po.models.OnOff(kernel_size=(31, 31), pretrained=True, cache_filt=True)
met_retina = synthesize(photo, retina, steps=300)

show([photo, met_blur.metamer, met_retina.metamer],
     ["target", "metamer of a blur", "metamer of ON/OFF cells"])
""")
md("""
**Look closely.** The blur's metamer has the right shapes covered in fine speckle: speckle averages out
under a blur, so the model never sees it. The ON/OFF metamer keeps the edges of the cup, the saucer and
the hand, but the dark background and the bright table come out the same mid-gray: these cells respond
to local **differences** and divide out the average light, so the brightness of large even regions is
close to invisible to them.

Each metamer is a picture of what one model **ignores**. Neither looks like the photo to you, so
neither model throws away only what you do.
""")

# ---------------------------------------------------------------------------------------------
md("""
## 3 · Texture: the Portilla–Simoncelli model

Portilla and Simoncelli (2000) describe a texture by about a thousand statistics of the outputs of a
bank of oriented filters at several sizes: averages, variances, correlations between neighboring
positions, orientations and scales. Those numbers are **averaged over the whole image**, so *where*
things are is thrown away and only *what kind of stuff* is kept.

The photo here is ["Pebbles on the ground"](https://commons.wikimedia.org/wiki/File:Gfp-pebbles-on-the-ground.jpg)
by Yinan Chen (goodfreephotos.com), public domain, cropped and in grayscale.

These settings (the `LBFGS` optimizer and a loss that reweights the statistics) are the ones the
plenoptic documentation recommends for this model.
""")
code("""
def texture_metamer(image, steps=30):
    \"\"\"A Portilla-Simoncelli metamer, with the settings recommended in plenoptic's documentation.\"\"\"
    model = po.models.PortillaSimoncelli(image.shape[-2:]).to(DEVICE).eval()
    po.remove_grad(model)
    po.set_seed(0)
    met = po.Metamer(image, model, loss_function=po.loss.portilla_simoncelli_loss_factory(model, image))
    met.setup(optimizer=torch.optim.LBFGS,
              optimizer_kwargs=dict(max_iter=10, max_eval=10, history_size=100, line_search_fn="strong_wolfe", lr=1))
    t0 = time.time()
    met.synthesize(max_iter=steps)
    print(f"{len(met.losses) - 1} steps in {time.time() - t0:.1f} s; loss {met.losses[0]:.3g} -> {met.losses[-1]:.3g}")
    return met

pebbles = load_gray("notebooks/data/day03/pebbles.jpg")
met_pebbles = texture_metamer(pebbles)
show([pebbles, met_pebbles.metamer], ["target", "texture metamer"], size=4)
""")
md("""
**You should see** a patch of stony stuff with the right grays, contrast and grain: no pixel is where it
was. Look closer, and the pebbles have lost their smooth, closed outlines. The model keeps local
statistics of oriented filters, not whole objects, so it captures textures of small elements best
(grass, gravel, fabric) and struggles once each element has a clear shape. Running longer helps a
little (plenoptic's documentation uses 100 steps; 30 keeps this cell under half a minute).

### Exercise 2 · A texture that is not so easy

Two more images are loaded below: a brick wall (["Brick Wall Tarks"](https://commons.wikimedia.org/wiki/File:Brick_Wall_Tarks.jpg)
by railyaal on Pixabay, CC0) and the café photo, which is a scene, not a texture. Choose one. **Predict
first:** will its texture metamer pass for the original at a glance? What will be lost?
""")
turn("""
brick = load_gray("notebooks/data/day03/brick.jpg")
# Your turn 2: set choice to brick or photo, and write your prediction first.
choice = None
my_prediction = ""

if choice is None:
    print("Set choice to brick or photo, then run this cell again.")
else:
    met_choice = texture_metamer(choice)
    show([choice, met_choice.metamer], ["target", "texture metamer"], size=4)
    print("You predicted:", my_prediction)
""", SOL.get(2, ""))
resources(("plenoptic: Portilla-Simoncelli model", "https://docs.plenoptic.org/docs/branch/main/user_guide/models_and_metrics/portilla_simoncelli/ps_index.html"),
          ("Metamers primer: texture", PRIMER + "#texture"))
answer(ANSWERS.get(2, ""))

# ---------------------------------------------------------------------------------------------
md(f"""
## 4 · A deep network, early and late

[Feather et al. (2023)]({FEATHER}) asked this question of deep networks trained to recognize images:
make metamers from an **early** stage and from a **late** stage, and ask people what they see. Here is
a small version with **ResNet-18**, trained on ImageNet, which comes with `torchvision`. The café photo
is back, in color.

`po.models.DeepNetFeatures(net, "layer1")` turns the network into a model that returns the activations
of one stage. ResNet-18 has a stem and then four stages, `layer1` (early) to `layer4` (last before the
answer).
""")
code("""
import torchvision

weights = torchvision.models.ResNet18_Weights.IMAGENET1K_V1
net = torchvision.models.resnet18(weights=weights).to(DEVICE).eval()
normalize = torchvision.transforms.Normalize(weights.transforms().mean, weights.transforms().std)
categories = weights.meta["categories"]

def top3(image):
    with torch.no_grad():
        p = net(normalize(image.clamp(0, 1))).softmax(-1)[0]
    return ", ".join(f"{categories[i]} {p[i]:.0%}" for i in p.topk(3).indices)

photo_rgb = load_rgb("assets/metamers/coffee.jpg")     # shape (1, 3, 224, 224)
print("The network sees the photo as:", top3(photo_rgb))
""")
code("""
stage_metamers = {}
for stage in ["layer1", "layer4"]:
    print(stage, end=": ")
    model = po.models.DeepNetFeatures(net, stage, normalize)
    stage_metamers[stage] = synthesize(photo_rgb, model, steps=300).metamer

show([photo_rgb, stage_metamers["layer1"], stage_metamers["layer4"]],
     ["target", "metamer from layer1", "metamer from layer4"], size=3.6)
for stage, m in stage_metamers.items():
    print(f"The network sees the {stage} metamer as:", top3(m))
""")
md("""
**Look at the two metamers, then at what the network says about them.** The `layer1` metamer still
looks like the photo. The `layer4` metamer looks like colored noise to us, yet the network gives it
nearly the same answer as the photo. Everything that makes it a cup, to you, is information the
network's last stage throws away. That is the gap Feather et al. measured with human observers.

(The loss does not reach zero in 300 steps, more so for `layer4`; the metamers are close, not exact.
The classification check above is a fair test of "close enough for the network".)

### Exercise 3 · The stages in between

Pick `"layer2"` or `"layer3"`. **Predict first:** will its metamer look like the photo to you? What will
the network call it?
""")
turn("""
# Your turn 3: set stage to "layer2" or "layer3", and write your prediction first.
stage = None
my_prediction = ""

if stage is None:
    print('Set stage to "layer2" or "layer3", then run this cell again.')
else:
    model = po.models.DeepNetFeatures(net, stage, normalize)
    stage_metamers[stage] = synthesize(photo_rgb, model, steps=300).metamer
    show([photo_rgb, stage_metamers[stage]], ["target", f"metamer from {stage}"], size=3.6)
    print(f"The network sees the {stage} metamer as:", top3(stage_metamers[stage]))
    print("You predicted:", my_prediction)
""", SOL.get(3, ""))
resources(("Feather et al. 2023 (open access)", FEATHER),
          ("plenoptic: using deep networks", "https://docs.plenoptic.org/"),
          ("Metamers primer: the test", PRIMER + "#test"))

# ---------------------------------------------------------------------------------------------
md(f"""
## 5 · Sound: a model of the ear

plenoptic was written for images, but `Metamer` only needs a tensor and a PyTorch model. A sound is a
list of numbers over time (16,000 per second here), so we store it as an "image" one pixel tall:
shape (1, 1, 1, samples). Two changes from images: a waveform runs from −1 to 1, not 0 to 1, so the
range penalty changes, and we start from quiet noise.

**The model** is a simplified **cochlea**, written in 20 lines of PyTorch:
1. split the sound into short overlapping windows and measure how much energy each frequency has
   (a short-time Fourier transform);
2. pool those frequencies into 32 **channels** spaced like the ear's filters: narrow at low
   frequencies, wide at high ones (the ERB scale);
3. **compress** each channel's envelope (raise it to the power 0.3), as the cochlea does.

The picture this makes, frequency channels over time, is a **cochleagram**, like those in Feather et al.'s
speech figure. The model keeps how loud each channel is, every 5 ms, and throws away the fine timing of
the waveform inside each window.

It is a teaching model, not a model of the real cochlea: the filters are triangles in a spectrogram,
and there are no hair cells or adaptation.
""")
code("""
def erb(f):            # frequency (Hz) -> position on the ERB scale
    return 21.4 * np.log10(1 + 0.00437 * f)

def erb_to_hz(e):
    return (10 ** (e / 21.4) - 1) / 0.00437

class Cochleagram(torch.nn.Module):
    \"\"\"Sound (1, 1, 1, samples) -> compressed envelopes of 32 frequency channels (1, 1, 32, frames).\"\"\"
    def __init__(self, n_channels=32, n_fft=512, hop=80, fmin=50, fmax=7500):
        super().__init__()
        self.n_fft, self.hop = n_fft, hop
        e = erb(np.linspace(0, SR / 2, n_fft // 2 + 1))
        edges = np.linspace(erb(fmin), erb(fmax), n_channels + 2)
        filters = np.zeros((n_channels, len(e)))
        for i in range(n_channels):                     # half-cosine filters, evenly spaced in ERB
            lo, hi = edges[i], edges[i + 2]
            inside = (e > lo) & (e < hi)
            filters[i, inside] = np.cos((e[inside] - (lo + hi) / 2) / (hi - lo) * np.pi)
        self.register_buffer("filters", torch.tensor(filters, dtype=torch.float32))
        self.register_buffer("window", torch.hann_window(n_fft))
        self.center_hz = erb_to_hz(edges[1:-1])

    def envelopes(self, x):
        spec = torch.stft(x.reshape(1, -1), self.n_fft, self.hop, window=self.window, return_complex=True)
        magnitude = torch.sqrt(spec.real ** 2 + spec.imag ** 2 + 1e-10)
        env = torch.einsum("cf,bft->bct", self.filters, magnitude)[0]      # channels x frames
        return (env + 1e-6) ** 0.3                                            # compression

    def forward(self, x):
        return self.envelopes(x)[None, None]

def sound_metamer(target, model, steps=1500, lr=0.01, stop_criterion=1e-6):
    \"\"\"plenoptic's Metamer on a sound: waveform range [-1, 1], starting from quiet noise.\"\"\"
    torch.manual_seed(0)
    return synthesize(target, model, steps, lr=lr, init=0.05 * torch.randn_like(target),
                      stop_criterion=stop_criterion,
                      penalty_function=lambda x: po.regularize.penalize_range(x, (-1, 1)))

def show_cochleagrams(sounds, titles):
    coch = Cochleagram().to(DEVICE)
    fig, axes = plt.subplots(1, len(sounds), figsize=(4 * len(sounds), 2.8))
    for ax, s, t in zip(np.atleast_1d(axes), sounds, titles):
        c = to_np(coch(s))
        ax.imshow(c, origin="lower", aspect="auto", cmap="magma",
                  extent=[0, s.shape[-1] / SR, 0, c.shape[0]])
        ticks = [0, 8, 16, 24, 31]
        ax.set_yticks(ticks, [f"{coch.center_hz[i]:.0f}" for i in ticks])
        ax.set_title(t, fontsize=10); ax.set_xlabel("time (s)")
    np.atleast_1d(axes)[0].set_ylabel("channel center (Hz)")
    plt.tight_layout(); plt.show()
""")
md("""
Two sounds, four seconds each, with very different structure:

- **speech**: a reader saying *"This is a LibriVox recording. All LibriVox recordings are in the public
  domain."* From LibriVox's reading of the [Zimmermann Telegram](https://commons.wikimedia.org/wiki/File:Librivox_-_Zimmermann_Telegram.mp3), read by Nicholi Volta, public domain.
- **rain**: ["Rain against the window"](https://commons.wikimedia.org/wiki/File:Rain_against_the_window.ogg) by cori, public domain.
""")
code("""
speech = load_sound("notebooks/data/day03/speech.wav")
rain = load_sound("notebooks/data/day03/rain.wav")
play(speech, "speech"); play(rain, "rain")
show_cochleagrams([speech, rain], ["speech", "rain"])
""")
md("""
Now a metamer of each under the cochleagram model. The model's numbers match; the waveforms do not
(the cell prints how similar they are, sample by sample: 1 would be identical, 0 unrelated).
**Listen** to each pair.
""")
code("""
cochlea = Cochleagram()
coch_metamers = {}
for name, snd in [("speech", speech), ("rain", rain)]:
    print(name, end=": ")
    coch_metamers[name] = sound_metamer(snd, cochlea).metamer
    r = np.corrcoef(to_np(snd), to_np(coch_metamers[name]))[0, 1]
    print(f"   waveform correlation with the original: {r:.2f}")

play(speech, "speech, original"); play(coch_metamers["speech"], "speech, cochleagram metamer")
play(rain, "rain, original"); play(coch_metamers["rain"], "rain, cochleagram metamer")
show_cochleagrams([speech, coch_metamers["speech"]], ["speech, original", "speech, metamer"])
""")
md("""
The waveforms are unrelated (correlation near 0), yet the words should still be there. The cochleagram
throws away the fine timing within each 32 ms window and keeps how loud each channel is over time,
and that is most of what you need to understand speech. This model throws away less than the
`layer4` network did. Listen for what *is* different: the metamer may sound rougher or buzzier.
""")

# ---------------------------------------------------------------------------------------------
md(f"""
## 6 · Sound textures

Rain, a stream, applause, a crowd: these are **sound textures**, made of many similar events.
[McDermott & Simoncelli (2011)]({MCDERMOTT}) proposed that the brain represents them by **statistics
averaged over time** of the cochlea's output, the auditory version of section 3. They synthesized sounds
that match those statistics, and listeners heard them as the same kind of sound.

Our version keeps a simplified set of their statistics of the cochleagram, averaged over the 4 seconds:
- `mean`: the average loudness of each channel;
- `cv`: how much each channel's loudness varies (its spread, relative to its mean);
- `skew`: whether that variation comes in rare loud bursts (like raindrops) or evenly;
- `corr`: which channels go up and down together;
- `mod`: how fast the loudness fluctuates, in 8 bands from 0.5 to 128 Hz.

That is a few hundred numbers, against 64,000 samples. *When* each thing happened is thrown away.
""")
code("""
class TextureStats(Cochleagram):
    \"\"\"Time-averaged statistics of the cochleagram, after McDermott & Simoncelli (2011), simplified.\"\"\"
    def __init__(self, stats=("mean", "cv", "skew", "corr", "mod")):
        super().__init__()
        self.stats = stats

    def forward(self, x):
        env = self.envelopes(x)                                    # channels x frames
        mean = env.mean(1)
        dev = env - mean[:, None]
        std = dev.pow(2).mean(1).sqrt()
        out = {"mean": mean, "cv": std / mean, "skew": 0.1 * (dev ** 3).mean(1) / std ** 3}
        z = dev / std[:, None]
        i, j = torch.triu_indices(len(std), len(std), 1)
        out["corr"] = (z @ z.T / z.shape[1])[i, j]
        power = torch.fft.rfft(dev, dim=1).abs() ** 2
        freq = torch.fft.rfftfreq(dev.shape[1], self.hop / SR)       # modulation frequency, Hz
        bands = [(0.5 * 2 ** k, 0.5 * 2 ** (k + 1)) for k in range(8)]
        out["mod"] = (torch.stack([power[:, (freq >= a) & (freq < b)].sum(1) for a, b in bands], 1)
                      / power.sum(1, keepdim=True)).flatten()
        return torch.cat([out[s] for s in self.stats])[None, None, None]

texture_model = TextureStats()
print("numbers kept:", texture_model(rain).numel(), " samples in the sound:", rain.numel())
tex_metamers = {}
for name, snd in [("rain", rain), ("speech", speech)]:
    print(name, end=": ")
    tex_metamers[name] = sound_metamer(snd, texture_model).metamer

play(rain, "rain, original"); play(tex_metamers["rain"], "rain, texture metamer")
play(speech, "speech, original"); play(tex_metamers["speech"], "speech, texture metamer")
show_cochleagrams([rain, tex_metamers["rain"], speech, tex_metamers["speech"]],
                  ["rain", "rain, texture metamer", "speech", "speech, texture metamer"])
""")
md("""
**Listen.** The rain metamer should sound like rain, though not the same rain: the drops fall at other
moments. The speech metamer keeps the voice's pitch range and rhythm, but the words are gone: speech is
not a texture, and *when* each sound happens is exactly what carries the words. A texture model is a
good model of hearing for rain and a bad one for speech, and its metamers show that in seconds.

### Exercise 4 · Another texture

Two more 4-second clips: a stream (["Stream, river water up close"](https://commons.wikimedia.org/wiki/File:433589_jackthemurray_stream-river-water-up-close.wav)
by jackthemurray, CC0) and applause (["Applause after a concert"](https://commons.wikimedia.org/wiki/File:Sound_Effects_-_Applause_after_a_concert.ogg)
by Amada44, CC0). Pick one. **Predict first:** will its texture metamer sound like the same kind of sound?
""")
turn("""
stream = load_sound("notebooks/data/day03/stream.wav")
applause = load_sound("notebooks/data/day03/applause.wav")
# Your turn 4: set clip to stream or applause, and write your prediction first.
clip = None
my_prediction = ""

if clip is None:
    print("Set clip to stream or applause, then run this cell again.")
else:
    clip_metamer = sound_metamer(clip, texture_model).metamer
    play(clip, "original"); play(clip_metamer, "texture metamer")
    show_cochleagrams([clip, clip_metamer], ["original", "texture metamer"])
    print("You predicted:", my_prediction)
""", SOL.get(4, ""))
resources(("McDermott & Simoncelli 2011, Sound texture perception", MCDERMOTT),
          ("McDermott lab: sound texture examples", "https://mcdermottlab.mit.edu/textures.html"))

md("""
### Exercise 5 · Which statistics matter?

McDermott & Simoncelli found that matching only the simplest statistics (each channel's mean loudness,
its spread and its skew) did not make convincing textures; listeners needed the correlations across
channels and the modulation statistics too. Test it: make a model with only some statistics, for
example `TextureStats(stats=("mean", "cv", "skew"))`, make a rain metamer, and compare it by ear with
the full model's. **Predict first:** what will be missing?
""")
turn("""
# Your turn 5: choose which statistics to keep, from "mean", "cv", "skew", "corr", "mod".
my_stats = None
my_prediction = ""

if my_stats is None:
    print("Set my_stats to a tuple of statistic names, then run this cell again.")
else:
    reduced = sound_metamer(rain, TextureStats(stats=my_stats)).metamer
    play(rain, "rain, original"); play(tex_metamers["rain"], "full statistics")
    play(reduced, f"only {', '.join(my_stats)}")
    show_cochleagrams([rain, tex_metamers["rain"], reduced], ["original", "full statistics", "your statistics"])
    print("You predicted:", my_prediction)
""", SOL.get(5, ""))
resources(("McDermott & Simoncelli 2011 (see the figure on statistics left out)", MCDERMOTT))
answer(ANSWERS.get(5, ""))

# ---------------------------------------------------------------------------------------------
md(f"""
## 7 · The test: can your partner tell?

A metamer of a model is only interesting once you ask a person. Work in pairs. One of you runs the
cells below; they show (or play) the original and a metamer as **A** and **B**, in random order. The
other, without looking at the code, says which one is the original. Then switch roles and run the
cells again (the order is shuffled every time).

Keep score: for each pair, how many times did your partner pick the original? Guessing gets about half.
For images, try glancing for one second while looking at the center, then looking for as long as you
like: metamers depend on how you look (Freeman & Simoncelli, 2011).
""")
code("""
ab_test("Pebbles (texture model)", pebbles, met_pebbles.metamer)
ab_test("Café (ResNet-18 layer1)", photo_rgb, stage_metamers["layer1"])
ab_test("Rain (texture statistics)", rain, tex_metamers["rain"], sound=True)
ab_test("Speech (cochleagram)", speech, coch_metamers["speech"], sound=True)
""")
code("""
reveal_answers()
""")
md("""
### Exercise 6 · Your results

Fill in how many times your partner picked the original, out of how many tries, for each pair. Then
answer: **which models throw away the same information you do, and which throw away information you
use?** Which pair would you add, using a metamer from this lab, to make the test harder?
""")
turn("""
# Your turn 6: (picked the original, tries) for each pair, e.g. (3, 4).
results = {
    "Pebbles (texture model)": None,
    "Café (ResNet-18 layer1)": None,
    "Rain (texture statistics)": None,
    "Speech (cochleagram)": None,
}

for name, r in results.items():
    if r is None:
        print(f"{name}: not filled in yet")
    else:
        right, tries = r
        print(f"{name}: {right}/{tries} correct ({right / tries:.0%}; guessing is about 50%)")
""", SOL.get(6, ""))
answer(ANSWERS.get(6, ""))

# ---------------------------------------------------------------------------------------------
md(f"""
## 8 · Going further (optional): a speech-recognition network

Feather et al. also tested networks trained to recognize spoken words. Here is the same test with
**wav2vec 2.0**, a speech-recognition network that ships with `torchaudio` (Baevski et al., 2020;
trained on 960 hours of LibriSpeech). We take the first two seconds of the speech clip ("This is a
LibriVox recording"), make metamers from an early stage (transformer layer 2) and the last (layer 12),
and ask the network to transcribe each one.

This section downloads a 360 MB model and runs the network hundreds of times, so it is slow on CPU.
The times are printed. On Colab, a GPU runtime (*Runtime → Change runtime type → T4 GPU*) makes it much
faster.
""")
code("""
import torchaudio

bundle = torchaudio.pipelines.WAV2VEC2_ASR_BASE_960H
asr = bundle.get_model().to(DEVICE).eval()
labels = bundle.get_labels()

def transcribe(sound):
    \"\"\"What wav2vec 2.0 hears: the most likely letter in each 20 ms frame, repeats and blanks removed.\"\"\"
    with torch.no_grad():
        emissions, _ = asr(sound.reshape(1, -1))
    ids = emissions[0].argmax(-1).tolist()
    letters = [labels[i] for k, i in enumerate(ids) if i != 0 and (k == 0 or i != ids[k - 1])]
    return "".join(letters).replace("|", " ").strip()

class Wav2VecStage(torch.nn.Module):
    \"\"\"wav2vec 2.0 as a model for plenoptic: the activations of one transformer layer.\"\"\"
    def __init__(self, layer):
        super().__init__()
        self.net, self.layer = asr, layer
    def forward(self, x):
        features, _ = self.net.extract_features(x.reshape(1, -1), num_layers=self.layer)
        return features[-1][None]

short = speech[..., : int(1.9 * SR)]
print("The network hears the original as:", transcribe(short))
""")
code("""
w2v_metamers = {}
for layer in [2, 12]:
    print(f"layer {layer}", end=": ")
    w2v_metamers[layer] = sound_metamer(short, Wav2VecStage(layer), steps=600, lr=0.02, stop_criterion=1e-9).metamer
    print(f"   the network hears the layer {layer} metamer as: {transcribe(w2v_metamers[layer])}")

play(short, "original")
for layer, m in w2v_metamers.items():
    play(m, f"metamer from layer {layer}")
show_cochleagrams([short, w2v_metamers[2], w2v_metamers[12]], ["original", "layer 2 metamer", "layer 12 metamer"])
""")
md("""
**Listen, then read what the network heard.** Can *you* make out the words in each metamer? If the
network transcribes a metamer that you hear as noise, its last stage throws away information you use
to understand speech: the gap Feather et al. found with standard speech networks. Compare the
cochleagrams with the one from section 5.
""")

# ---------------------------------------------------------------------------------------------
md(f"""
## What you learned

- **A metamer is a picture of what a model ignores.** Same model numbers, different stimulus: whatever
  differs is thrown away.
- **The recipe**: target numbers, start from noise, nudge with gradient descent. plenoptic's
  `Metamer` runs it for any PyTorch model, images or sounds.
- **Stage matters.** Early stages (blur, retina-like cells, `layer1`, the cochleagram) keep most of what
  you see or hear. Statistics pooled over space or time keep *stuff*, not *things*: fine for pebbles and
  rain, wrong for a scene or a sentence. A network's last stage can throw away almost everything you use
  while still giving the same answer.
- **The test** is people: a model whose metamers people also cannot tell apart shares their invariances.

**Homework:** read Feather et al. (2023), [doi:10.1038/s41593-023-01442-0]({FEATHER}) (open access),
Figs. 1, 4 and 5, and finish any *Your turn* cells you didn't get to in class.

**Credits.** Café photo: Shixart1985, CC BY 2.0. Pebbles: Yinan Chen, public domain. Brick wall:
railyaal, CC0. Speech: LibriVox, read by Nicholi Volta, public domain. Rain: cori, public domain.
Stream: jackthemurray, CC0. Applause: Amada44, CC0. All from Wikimedia Commons; the cut and resized
copies used here, and how they were made, are in `notebooks/data/day03/` in the course repository.
""")

if __name__ == '__main__':
    main(FILE, private_solutions=True)

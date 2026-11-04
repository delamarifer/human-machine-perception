"""Builds notebooks/day03-lab2-image-filtering.ipynb: a 30-minute creative Day 3 lab. Students filter their
own photograph at three levels (spatial filters, a Gabor filter bank, image pyramids), combine the results,
and print a personalized A4 trifold desk name tag made entirely in Python.

Everything that is not about filtering (display, upload, layout, text, the fold check) lives in one
collapsed setup cell, so the visible notebook is short. See nbtools.py for how to build it.
"""
from nbtools import md, code, hidden, turn, badge, main

# The solutions live in a git-ignored file, private/day03_trifold_name_tag_solutions.py (the repository is
# public). Without it, this script still builds the student notebook; --teacher and --solved need it.
try:
    from private.day03_trifold_name_tag_solutions import SOL
except ImportError:
    SOL = {}

FILE = 'day03-lab2-image-filtering.ipynb'
BADGE = badge(FILE)

md(f"""
{BADGE}

# Lab 2 · Image Filtering

**Visual Perception** · Day 3 · about 30 minutes · Fernanda De La Torre & Shreya Pandit

**The challenge.** Turn a photograph of your choice into a printable trifold desk name tag, using only
image filtering in Python. No design software: every pixel, including your name, comes from this notebook.

By the end you will be able to:

- explain how a spatial filter changes local image information;
- describe how filters respond to different orientations and spatial frequencies;
- explain what filter banks and multi-scale representations are for;
- combine filtered versions of an image into a composition;
- apply these techniques creatively to a real photograph.

| Step | Time |
|---|---|
| 0–1 · Setup, your name and photo | 3 min |
| 2 · Level 1: spatial filtering | 7 min |
| 3 · Level 2: filter banks and orientation | 7 min |
| 4 · Level 3: multi-scale pyramids | 5 min |
| 5–6 · Design, check the fold, print | 8 min |

**How to use this notebook.** Run the cells in order with **Shift + Enter**. Change only the lines under
`# EDIT`; after a change, re-run that cell and the ones below it (*Runtime → Run after*).
""")

md(r"""
## 0 · Setup

Run this cell once. It loads the libraries and the helper code for displaying images, uploading the photo,
laying out the A4 sheet and checking the fold. None of the filtering is hidden here: you will write and
run all of that below.
""")

hidden(r"""
#@title Setup: run this cell (you don't need to read it)
import io, os, sys, math, urllib.request
import numpy as np
import cv2
import matplotlib
import matplotlib.pyplot as plt
from matplotlib.colors import to_rgb as _mpl_to_rgb
from PIL import Image, ImageDraw, ImageFont, ImageOps, ImageFilter

try:
    from google.colab import files as colab_files
    IN_COLAB = True
except ImportError:
    colab_files, IN_COLAB = None, False

plt.rcParams["figure.dpi"] = 100
plt.rcParams["image.cmap"] = "gray"

# ---------------- print geometry: A4 landscape, 300 DPI ----------------
DPI = 300
PX_PER_MM = DPI / 25.4
PAGE_W_MM, PAGE_H_MM = 297, 210
PAGE_W_PX, PAGE_H_PX = round(PAGE_W_MM * PX_PER_MM), round(PAGE_H_MM * PX_PER_MM)     # 3508 x 2480
PANEL_X_PX = [round(PAGE_W_PX * i / 3) for i in range(4)]
SAFE_MARGIN_MM, FOLD_GUTTER_MM, TEXT_PADDING_MM = 6, 3, 4
FACE_W_MM, FACE_H_MM = PAGE_H_MM, PAGE_W_MM / 3                  # a tent face as seen: 210 x 99 mm
ART_W_MM = FACE_W_MM - 2 * SAFE_MARGIN_MM
ART_H_MM = FACE_H_MM - SAFE_MARGIN_MM - FOLD_GUTTER_MM
BASE_ART_H_MM = FACE_H_MM - 2 * FOLD_GUTTER_MM
FACE_ASPECT, BASE_ASPECT = ART_W_MM / ART_H_MM, ART_W_MM / BASE_ART_H_MM
DESIGN_WIDTH = 1240
PANEL_ROLES = ("left", "middle", "right")
PANEL_ROTATION = {"left": 90, "middle": 90, "right": -90}         # counter-clockwise, "as seen" -> "on the sheet"

def mm(v):
    return int(round(v * PX_PER_MM))

# ---------------- image utilities and display ----------------
def to_float(img):
    a = np.asarray(img)
    return a.astype(np.float32) / 255.0 if a.dtype == np.uint8 else a.astype(np.float32)

def to_uint8(img):
    return (np.clip(np.asarray(img, np.float32), 0, 1) * 255 + 0.5).astype(np.uint8)

def to_gray(img):
    a = to_float(img)
    return a if a.ndim == 2 else (0.299 * a[..., 0] + 0.587 * a[..., 1] + 0.114 * a[..., 2]).astype(np.float32)

def normalize01(x, low=1.0, high=99.0):
    x = np.asarray(x, np.float32)
    lo, hi = np.percentile(x, [low, high])
    return np.clip((x - lo) / max(hi - lo, 1e-8), 0, 1)

def _imshow(ax, im, mode=None):
    im = to_float(im)
    if mode is None:
        mode = "rgb" if im.ndim == 3 else ("signed" if im.min() < -1e-6 else ("gray01" if im.max() <= 1 + 1e-6 else "auto"))
    if mode == "rgb":
        ax.imshow(np.clip(im, 0, 1))
    elif mode == "signed":
        m = float(np.percentile(np.abs(im), 99)) or 1e-8
        ax.imshow(im, cmap="RdBu_r", vmin=-m, vmax=m)
    elif mode == "gray01":
        ax.imshow(im, cmap="gray", vmin=0, vmax=1)
    else:
        ax.imshow(im, cmap="gray", vmin=0, vmax=float(np.percentile(im, 99.5)) or 1e-8)
    ax.set_axis_off()

def show_row(images, titles=None, modes=None, height=3.0, max_width=16.0):
    aspects = [np.asarray(im).shape[1] / np.asarray(im).shape[0] for im in images]
    if sum(aspects) * height > max_width:
        height = max_width / sum(aspects)
    fig, axes = plt.subplots(1, len(images), figsize=(sum(aspects) * height + 0.25 * len(images), height + 0.6),
                             gridspec_kw={"width_ratios": aspects}, squeeze=False)
    for i, ax in enumerate(axes[0]):
        _imshow(ax, images[i], None if modes is None else modes[i])
        if titles:
            ax.set_title(titles[i], fontsize=9.5)
    plt.tight_layout(); plt.show()

def show_kernel(ax, k, title=""):
    k = np.asarray(k, np.float32); m = float(np.abs(k).max()) or 1.0
    ax.imshow(k, cmap="RdBu_r", vmin=-m, vmax=m)
    if k.shape[0] <= 7:
        for (r, c), v in np.ndenumerate(k):
            ax.text(c, r, f"{v:.2g}", ha="center", va="center", fontsize=8, color="black" if abs(v) <= 0.6 * m else "white")
    ax.set_xticks([]); ax.set_yticks([]); ax.set_title(title, fontsize=9)

# ---------------- photo loading and cropping ----------------
SAMPLE_PHOTO_URL = ("https://raw.githubusercontent.com/delamarifer/human-machine-perception/"
                    "main/day02/assets/one-photo/photo.jpg")

def _open_image_bytes(data):
    im = ImageOps.exif_transpose(Image.open(io.BytesIO(data)))     # phone photos store rotation in EXIF
    if im.mode in ("RGBA", "LA", "P"):
        im = Image.alpha_composite(Image.new("RGBA", im.size, (255, 255, 255, 255)), im.convert("RGBA"))
    im = im.convert("RGB")
    if max(im.size) > 4000:
        im.thumbnail((4000, 4000), Image.LANCZOS)
    return im

def _synthetic_photo(w=1200, h=800):
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    img = np.dstack([0.25 + 0.5 * xx / w, 0.35 + 0.3 * yy / h, 0.75 - 0.4 * xx / w])
    for cx, cy, r, col in [(0.3, 0.5, 0.22, (0.95, 0.75, 0.3)), (0.7, 0.45, 0.16, (0.9, 0.3, 0.35))]:
        img[(xx - cx * w) ** 2 + (yy - cy * h) ** 2 < (r * h) ** 2] = col
    return Image.fromarray(to_uint8(img))

def load_sample_photo():
    try:
        req = urllib.request.Request(SAMPLE_PHOTO_URL, headers={"User-Agent": "Mozilla/5.0 (aims-course)"})
        with urllib.request.urlopen(req, timeout=20) as resp:
            return _open_image_bytes(resp.read()), "sample: the course's café photo"
    except Exception as err:
        print("Could not download the sample photo (", err, "); using a synthetic picture.")
        return _synthetic_photo(), "synthetic test picture"

def get_photo(source="upload"):
    if source == "upload" and IN_COLAB:
        print("Click 'Choose Files' and pick a .jpg, .jpeg or .png (or 'Cancel upload' to use the sample photo).")
        for name, data in colab_files.upload().items():
            if name.lower().endswith((".jpg", ".jpeg", ".png")):
                try:
                    return _open_image_bytes(data), name
                except Exception as err:
                    print(f"Could not read {name}: {err}")
            else:
                print(f"Skipping {name}: please upload a .jpg, .jpeg or .png file.")
        print("No usable photo uploaded; using the sample photo. Re-run the cell to try again.")
    elif source == "upload":
        print("Not running in Colab (no upload button); using the sample photo.")
    elif source != "sample" and os.path.isfile(source):
        with open(source, "rb") as f:
            return _open_image_bytes(f.read()), os.path.basename(source)
    return load_sample_photo()

def crop_to_aspect(img, aspect, focus=(0.5, 0.5)):
    h, w = img.shape[:2]
    cw, ch = (int(round(h * aspect)), h) if w / h > aspect else (w, int(round(w / aspect)))
    x0 = int(np.clip(round(focus[0] * w - cw / 2), 0, w - cw))
    y0 = int(np.clip(round(focus[1] * h - ch / 2), 0, h - ch))
    return img[y0:y0 + ch, x0:x0 + cw], (x0, y0, cw, ch)

def resize_to(img, width, height):
    interp = cv2.INTER_AREA if width < img.shape[1] else cv2.INTER_CUBIC
    return cv2.resize(img, (int(width), int(height)), interpolation=interp)

def prepare_design_photo(img, aspect, mode="crop", focus=(0.5, 0.5), width=DESIGN_WIDTH):
    height = int(round(width / aspect))
    if mode == "fit":    # whole photo on a blurred, darkened copy of itself
        out = cv2.GaussianBlur(resize_to(crop_to_aspect(img, aspect)[0], width, height), (0, 0), width / 40) * 0.8
        s = min(width / img.shape[1], height / img.shape[0])
        fw, fh = int(img.shape[1] * s), int(img.shape[0] * s)
        x0, y0 = (width - fw) // 2, (height - fh) // 2
        out[y0:y0 + fh, x0:x0 + fw] = resize_to(img, fw, fh)
    else:
        out = resize_to(crop_to_aspect(img, aspect, focus)[0], width, height)
    return np.clip(out, 0, 1).astype(np.float32)

def show_crop(original, focus, mode):
    _, (x0, y0, cw, ch) = crop_to_aspect(original, FACE_ASPECT, focus)
    marked = original.copy(); t = max(2, original.shape[1] // 200)
    marked[y0:y0 + t, x0:x0 + cw] = marked[y0 + ch - t:y0 + ch, x0:x0 + cw] = (1, 0.2, 0.2)
    marked[y0:y0 + ch, x0:x0 + t] = marked[y0:y0 + ch, x0 + cw - t:x0 + cw] = (1, 0.2, 0.2)
    show_row([marked if mode == "crop" else original, prepare_design_photo(original, FACE_ASPECT, mode, focus)],
             ["Original" + (" (red box = what is kept)" if mode == "crop" else ""), f'Working copy `photo` ({mode})'],
             height=3.0)

# ---------------- display for the filter bank and pyramids ----------------
def visualize_filter_bank(bank, part="even"):
    lams = sorted({f["wavelength"] for f in bank}); ths = sorted({f["theta_deg"] for f in bank})
    size = max(f[part].shape[0] for f in bank)
    fig, axes = plt.subplots(len(lams), len(ths), figsize=(1.9 * len(ths), 2.0 * len(lams)), squeeze=False)
    for f in bank:
        k = np.pad(f[part], (size - f[part].shape[0]) // 2); m = np.abs(k).max()
        ax = axes[lams.index(f["wavelength"]), ths.index(f["theta_deg"])]
        ax.imshow(k, cmap="RdBu_r", vmin=-m, vmax=m); ax.set_axis_off()
        ax.set_title(f"λ={f['wavelength']:g}px θ={f['theta_deg']:g}°", fontsize=8.5)
    fig.suptitle("Gabor filter bank (kernels at the same pixel scale)", fontweight="bold")
    plt.tight_layout(); plt.show()

def visualize_bank_responses(bank, responses, height=1.6):
    lams = sorted({f["wavelength"] for f in bank}); ths = sorted({f["theta_deg"] for f in bank})
    h, w = responses.shape[1:]
    fig, axes = plt.subplots(len(lams), len(ths), figsize=(len(ths) * height * w / h, len(lams) * (height + 0.35)),
                             squeeze=False)
    for i, f in enumerate(bank):
        row = [j for j, g in enumerate(bank) if g["wavelength"] == f["wavelength"]]
        ax = axes[lams.index(f["wavelength"]), ths.index(f["theta_deg"])]
        ax.imshow(responses[i], cmap="inferno", vmin=0, vmax=np.percentile(responses[row], 99.5)); ax.set_axis_off()
        ax.set_title(f"λ={f['wavelength']:g}px θ={f['theta_deg']:g}°", fontsize=8.5)
        inset = ax.inset_axes([0.0, 0.62, 0.38 * h / w, 0.38]); k = f["even"]; m = np.abs(k).max()
        inset.imshow(k, cmap="RdBu_r", vmin=-m, vmax=m); inset.set_axis_off()
    plt.tight_layout(); plt.show()

def orientation_color_map(responses, bank, saturation_gain=1.6, gamma=0.8):
    # hue = dominant orientation (angles doubled, so 0 and 180 degrees match), brightness = total energy
    th = np.deg2rad([f["theta_deg"] for f in bank]).astype(np.float32)
    E = np.asarray(responses, np.float32); total = E.sum(axis=0)
    vx = (E * np.cos(2 * th)[:, None, None]).sum(axis=0); vy = (E * np.sin(2 * th)[:, None, None]).sum(axis=0)
    hue = (np.degrees(np.arctan2(vy, vx)) % 360.0).astype(np.float32)
    sat = np.clip(saturation_gain * np.hypot(vx, vy) / (total + 1e-8), 0, 1).astype(np.float32)
    val = (normalize01(total, 1, 99.5) ** gamma).astype(np.float32)
    return cv2.cvtColor(np.dstack([hue, sat, val]), cv2.COLOR_HSV2RGB)

def orientation_legend(ax, n=8):
    ax.set_xlim(-1.3, 1.3); ax.set_ylim(-1.3, 1.3); ax.set_aspect("equal"); ax.set_axis_off()
    for th in np.linspace(0, 180, n, endpoint=False):
        rgb = cv2.cvtColor(np.float32([[[2 * th, 1, 1]]]), cv2.COLOR_HSV2RGB)[0, 0]
        dx, dy = np.cos(np.deg2rad(th)), np.sin(np.deg2rad(th))
        ax.plot([-dx, dx], [-dy, dy], color=rgb, lw=4, solid_capstyle="round")
    ax.set_title("hue = orientation", fontsize=9)

def upsample_to(img, shape):
    while img.shape[0] < shape[0] // 2 + 1:
        img = cv2.pyrUp(img)
    return cv2.resize(img, (shape[1], shape[0]), interpolation=cv2.INTER_LINEAR)

def band_image(band, shape):
    full = upsample_to(band, shape)
    return np.clip(0.5 + 0.5 * full / (np.percentile(np.abs(full), 99) + 1e-8), 0, 1)

def visualize_pyramid(pyramid, title="", signed=False, height=2.4):
    widths = [p.shape[1] for p in pyramid]; h0 = pyramid[0].shape[0]
    gap = 0.03 * widths[0]; total = sum(widths) + gap * (len(pyramid) - 1)
    fig = plt.figure(figsize=(height * total / h0, height + 0.4)); left = 0.0
    for i, p in enumerate(pyramid):
        ax = fig.add_axes([left / total, 0.0, p.shape[1] / total, p.shape[0] / h0 * 0.88])
        if signed and i < len(pyramid) - 1:
            p = np.clip(0.5 + 0.5 * p / (np.percentile(np.abs(p), 98) + 1e-8), 0, 1)
        _imshow(ax, np.clip(p, 0, 1), "rgb" if p.ndim == 3 else "gray01")
        ax.set_title(f"{p.shape[1]}x{p.shape[0]}", fontsize=8); left += p.shape[1] + gap
    fig.suptitle(title, fontweight="bold", y=1.06); plt.show()

# ---------------- composition tools and design recipes ----------------
def color_rgb(color):
    if isinstance(color, (tuple, list, np.ndarray)):
        c = np.asarray(color, np.float32)
        return c / 255.0 if c.max() > 1 else c
    return np.asarray(_mpl_to_rgb(color), np.float32)

def posterize(image, levels=5):
    return np.round(np.clip(image, 0, 1) * (levels - 1)) / (levels - 1)

def colorize(gray_image, dark="#1d2b53", light="#ffcc66"):
    t = np.clip(to_gray(gray_image), 0, 1)[..., None]
    return (1 - t) * color_rgb(dark) + t * color_rgb(light)

def blend(base, layer, mode="normal", opacity=1.0):
    base, layer = np.float32(base), np.float32(layer)
    if layer.ndim == 2 and base.ndim == 3:
        layer = layer[..., None]
    mixed = {"normal": lambda: layer + 0 * base, "multiply": lambda: base * layer,
             "screen": lambda: 1 - (1 - base) * (1 - layer), "add": lambda: base + layer,
             "overlay": lambda: np.where(base < 0.5, 2 * base * layer, 1 - 2 * (1 - base) * (1 - layer))}[mode]()
    return np.clip((1 - opacity) * base + opacity * mixed, 0, 1)

def ink_lines(image, kernel_sizes=(3, 11), gamma=0.7):
    g = to_gray(image)
    total = sum(normalize01(sobel_edges(gaussian_blur(g, k)), 2, 99.5) for k in kernel_sizes)
    return np.clip(total / len(kernel_sizes), 0, 1) ** gamma

def difference_of_gaussians(image, sigma_center=2.0, surround_ratio=3.0):
    g = to_gray(image)
    return cv2.GaussianBlur(g, (0, 0), sigma_center) - cv2.GaussianBlur(g, (0, 0), sigma_center * surround_ratio)

DUOTONE_COLORS = ("#1d2b53", "#ffcc66")

def recipe_ink_sketch(img):            # Level 1 edges as ink + a pale blurred color wash
    wash = blend(np.ones_like(img), gaussian_blur(img, 41), "normal", 0.45)
    return wash * (1 - 0.9 * ink_lines(img, (3, 9))[..., None])

def recipe_orientation_glow(img):      # Level 2 orientation map over a dimmed photo + Level 1 edges
    orient = orientation_color_map(apply_gabor_bank(img, design_bank), design_bank)
    return blend(blend(0.35 * gaussian_blur(img, 5), orient, "screen"), ink_lines(img, (3,)) * 0.6, "screen")

def recipe_poster_edges(img):          # Level 1 blur + posterize, outlined with Level 3 DoG edges
    dog = difference_of_gaussians(img, 1.5, 3.0)
    outline = np.clip(-dog / (np.percentile(np.abs(dog), 99) + 1e-8), 0, 1) ** 0.8
    return posterize(gaussian_blur(img, 11), 5) * (1 - 0.85 * outline[..., None])

def recipe_detail_pop(img):            # Level 3 band weights + Level 1 sharpening
    return sharpen(reweight_bands(img, design_band_weights), strength=0.5, kernel_size=5)

def recipe_duotone_edges(img):         # Level 3 coarse bands as a duotone + Level 2 Gabor energy as glow
    base = colorize(normalize01(to_gray(reweight_bands(img, [0.3, 0.6, 1, 1, 1])), 1, 99), *DUOTONE_COLORS)
    energy = normalize01(apply_gabor_bank(img, design_bank).max(axis=0), 50, 99.7) ** 1.5
    return blend(base, energy, "screen", 0.8)

RECIPES = {"ink_sketch": recipe_ink_sketch, "orientation_glow": recipe_orientation_glow,
           "poster_edges": recipe_poster_edges, "detail_pop": recipe_detail_pop,
           "duotone_edges": recipe_duotone_edges}

def run_recipe(name, img):
    if name == "mine" and "mine" not in RECIPES:
        print('No working my_design yet; using "orientation_glow" instead of "mine".'); name = "orientation_glow"
    if name not in RECIPES:
        raise ValueError(f"Unknown design {name!r}. Choose from {list(RECIPES)}")
    return np.clip(RECIPES[name](img), 0, 1).astype(np.float32)

def _slices(images, gap_px=6):
    h, w = images[0].shape[:2]; out = np.ones((h, w, 3), np.float32)
    edges = np.linspace(0, w, len(images) + 1).astype(int)
    for i, img in enumerate(images):
        a = edges[i] + (gap_px // 2 if i else 0); b = edges[i + 1] - (gap_px // 2 if i < len(images) - 1 else 0)
        out[:, a:b] = img[:, a:b] if img.ndim == 3 else img[:, a:b, None]
    return out

def base_composition(name, img):
    if name == "blank":
        return np.ones_like(img)
    if name == "process_strip":          # original -> Level 1 -> Level 2 -> Level 3, left to right
        return _slices([img, np.dstack([1 - ink_lines(img, (3, 9))] * 3),
                        orientation_color_map(apply_gabor_bank(img, design_bank), design_bank),
                        reweight_bands(img, design_band_weights)])
    if name == "filter_bank_mosaic":
        cmap = plt.get_cmap("inferno")
        return _slices([cmap(normalize01(r, 1, 99.5))[..., :3].astype(np.float32)
                        for r in apply_gabor_bank(img, design_bank)[:8]])
    if name == "pyramid_bands":
        bands = build_laplacian_pyramid(img, 5)
        return _slices([band_image(b, img.shape[:2]) for b in bands[:-1]] + [upsample_to(bands[-1], img.shape[:2])])
    return run_recipe(name, img)

# ---------------- the name ----------------
MPL_FONT_DIR = os.path.join(matplotlib.get_data_path(), "fonts", "ttf")
BUILT_IN_FONTS = {"sans": "DejaVuSans.ttf", "sans-bold": "DejaVuSans-Bold.ttf", "sans-italic": "DejaVuSans-Oblique.ttf",
                  "sans-bold-italic": "DejaVuSans-BoldOblique.ttf", "serif": "DejaVuSerif.ttf",
                  "serif-bold": "DejaVuSerif-Bold.ttf", "serif-italic": "DejaVuSerif-Italic.ttf",
                  "mono": "DejaVuSansMono.ttf", "mono-bold": "DejaVuSansMono-Bold.ttf"}
GOOGLE_FONTS = {"lobster": "ofl/lobster/Lobster-Regular.ttf", "pacifico": "ofl/pacifico/Pacifico-Regular.ttf",
                "bebas-neue": "ofl/bebasneue/BebasNeue-Regular.ttf",
                "abril-fatface": "ofl/abrilfatface/AbrilFatface-Regular.ttf",
                "permanent-marker": "apache/permanentmarker/PermanentMarker-Regular.ttf",
                "righteous": "ofl/righteous/Righteous-Regular.ttf",
                "playfair-display": "ofl/playfairdisplay/PlayfairDisplay%5Bwght%5D.ttf"}

def font_file(style):
    fallback = os.path.join(MPL_FONT_DIR, BUILT_IN_FONTS["sans-bold"])
    if os.path.isfile(str(style)):
        return str(style)
    if style in BUILT_IN_FONTS:
        return os.path.join(MPL_FONT_DIR, BUILT_IN_FONTS[style])
    if style in GOOGLE_FONTS:
        os.makedirs("fonts", exist_ok=True); path = os.path.join("fonts", style + ".ttf")
        if not os.path.exists(path):
            try:
                req = urllib.request.Request("https://github.com/google/fonts/raw/main/" + GOOGLE_FONTS[style],
                                             headers={"User-Agent": "Mozilla/5.0 (aims-course)"})
                with urllib.request.urlopen(req, timeout=20) as resp, open(path, "wb") as f:
                    f.write(resp.read())
            except Exception as err:
                print(f"Could not download {style!r} ({err}); using sans-bold."); return fallback
        return path
    print(f"Unknown FONT_STYLE {style!r}; using sans-bold."); return fallback

def relative_luminance(rgb):
    c = np.asarray(rgb, np.float64); c = np.where(c <= 0.03928, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
    return float(0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2])

def contrast_ratio(a, b):
    l1, l2 = sorted([relative_luminance(a), relative_luminance(b)], reverse=True)
    return (l1 + 0.05) / (l2 + 0.05)

def add_name(face, name, box, verbose=True):
    # Draw `name` on the PIL image `face` inside box = (x0, y0, x1, y1), using the Section 1 settings.
    effect, strength, align = TEXT_EFFECT, EFFECT_STRENGTH, TEXT_ALIGN
    face = face.convert("RGB"); draw = ImageDraw.Draw(face); path = font_file(FONT_STYLE)
    stroke_of = lambda s: max(2, int(round(s * 0.045 * strength))) if effect == "outline" else 0
    pad_of = lambda s: int(s * 0.22) if effect == "box" else 0
    def measure(s):
        font = ImageFont.truetype(path, s); sp = int(s * 0.12)
        return font, sp, draw.multiline_textbbox((0, 0), name, font=font, stroke_width=stroke_of(s), align=align, spacing=sp)
    bx0, by0, bx1, by1 = box
    if FONT_SIZE_PT == "auto":     # largest size that fits 90% of the width and 55% of the height
        lo, hi = 10, int(by1 - by0)
        while hi - lo > 1:
            mid = (lo + hi) // 2; _, _, (l, t, r, b) = measure(mid); p = pad_of(mid)
            lo, hi = (mid, hi) if (r - l <= 0.9 * (bx1 - bx0 - 2 * p) and b - t <= 0.55 * (by1 - by0 - 2 * p)) else (lo, mid)
        size = lo
    else:
        size = int(round(float(FONT_SIZE_PT) * DPI / 72))         # points -> pixels: 1 pt = 1/72 inch
    p = pad_of(size); x0, y0, x1, y1 = bx0 + p, by0 + p, bx1 - p, by1 - p
    font, spacing, (l, t, r, b) = measure(size); tw, th = r - l, b - t
    tx = {"left": x0, "center": x0 + (x1 - x0 - tw) / 2, "right": x1 - tw}[align] + mm(TEXT_OFFSET_MM[0])
    ty = {"top": y0, "middle": y0 + (y1 - y0 - th) / 2, "bottom": y1 - th}[TEXT_POSITION] + mm(TEXT_OFFSET_MM[1])
    if tx < x0 - 1 or ty < y0 - 1 or tx + tw > x1 + 1 or ty + th > y1 + 1:
        print("Warning: the name goes outside the safe area; use a smaller FONT_SIZE_PT, a line break or a smaller offset.")
    region = np.asarray(face, np.float32)[max(0, int(ty)):int(ty + th), max(0, int(tx)):int(tx + tw)] / 255.0
    bg = region.reshape(-1, 3).mean(axis=0) if region.size else np.array([0.5, 0.5, 0.5])
    fill = (np.array([1.0, 1, 1]) if relative_luminance(bg) < 0.35 else np.array([0.07, 0.07, 0.07])) \
        if TEXT_COLOR == "auto" else color_rgb(TEXT_COLOR)
    eff = (np.array([0.0, 0, 0]) if relative_luminance(fill) > 0.4 else np.array([1.0, 1, 1])) \
        if EFFECT_COLOR == "auto" else color_rgb(EFFECT_COLOR)
    fill255, eff255 = tuple(int(v * 255) for v in fill), tuple(int(v * 255) for v in eff)
    origin = (tx - l, ty - t)
    if effect in ("box", "shadow"):
        layer = Image.new("RGBA", face.size, (0, 0, 0, 0)); d = ImageDraw.Draw(layer)
        if effect == "box":
            q = int(size * 0.22)
            d.rounded_rectangle([tx - q, ty - q, tx + tw + q, ty + th + q], radius=q,
                                fill=eff255 + (int(255 * min(1.0, 0.6 * strength)),))
        else:
            s = size * 0.05
            d.multiline_text((origin[0] + s, origin[1] + s), name, font=font, fill=eff255 + (230,), align=align, spacing=spacing)
            layer = layer.filter(ImageFilter.GaussianBlur(radius=max(1, size * 0.04 * strength)))
        face = Image.alpha_composite(face.convert("RGBA"), layer).convert("RGB")
    ImageDraw.Draw(face).multiline_text(origin, name, font=font, fill=fill255, align=align, spacing=spacing,
                                        stroke_width=stroke_of(size), stroke_fill=eff255 if stroke_of(size) else None)
    ratio = contrast_ratio(fill, bg)
    if verbose:
        print(f"Name: {os.path.basename(path)}, {size * 72 / DPI:.0f} pt, {tw / PX_PER_MM:.0f} x {th / PX_PER_MM:.0f} mm; "
              f"contrast with the image behind it {ratio:.1f}:1"
              + ("  (low: try TEXT_EFFECT = 'outline' or 'box')" if ratio < 4.5 and effect == "none" else ""))
    return face

# ---------------- faces and the A4 sheet ----------------
def face_shape_px(role):
    i = PANEL_ROLES.index(role)
    return PAGE_H_PX, PANEL_X_PX[i + 1] - PANEL_X_PX[i]

def art_box_px(role):
    w, h = face_shape_px(role)
    top = mm(SAFE_MARGIN_MM) if role != "middle" else mm(FOLD_GUTTER_MM)
    return mm(SAFE_MARGIN_MM), top, w - mm(SAFE_MARGIN_MM), h - mm(FOLD_GUTTER_MM)

def make_face(art, role, name=None, verbose=True):
    # A face exactly as a person will look at it: 210 x 99 mm, top edge at the ridge of the tent
    w, h = face_shape_px(role); face = Image.new("RGB", (w, h), "white")
    x0, y0, x1, y1 = art_box_px(role)
    face.paste(Image.fromarray(to_uint8(resize_to(crop_to_aspect(art, (x1 - x0) / (y1 - y0))[0], x1 - x0, y1 - y0))), (x0, y0))
    if name:
        pad = mm(TEXT_PADDING_MM)
        face = add_name(face, name, (x0 + pad, y0 + pad, x1 - pad, y1 - pad), verbose=verbose)
    return np.asarray(face)

def assemble_sheet(faces, rotation=PANEL_ROTATION):
    sheet = np.full((PAGE_H_PX, PAGE_W_PX, 3), 255, np.uint8)
    for i, role in enumerate(PANEL_ROLES):
        sheet[:, PANEL_X_PX[i]:PANEL_X_PX[i + 1]] = np.rot90(faces[role], k=(rotation[role] // 90) % 4)
    img = Image.fromarray(sheet); draw = ImageDraw.Draw(img)
    for x in PANEL_X_PX[1:3]:          # dashed fold guides in the white gutters, ticks in the margins
        for y in range(mm(SAFE_MARGIN_MM), PAGE_H_PX - mm(SAFE_MARGIN_MM), mm(7)):
            draw.line([(x, y), (x, min(y + mm(4), PAGE_H_PX - mm(SAFE_MARGIN_MM)))], fill=(185, 185, 185), width=3)
        for ya, yb in [(0, mm(SAFE_MARGIN_MM - 1)), (PAGE_H_PX - mm(SAFE_MARGIN_MM - 1), PAGE_H_PX)]:
            draw.line([(x, ya), (x, yb)], fill=(120, 120, 120), width=4)
    cx, y, half = (PANEL_X_PX[1] + PANEL_X_PX[2]) // 2, PAGE_H_PX - mm(SAFE_MARGIN_MM + 9), mm(25)
    draw.rectangle([cx - half - mm(3), y - mm(4), cx + half + mm(3), y + mm(4)], fill="white")   # 50 mm check bar
    draw.line([(cx - half, y), (cx + half, y)], fill="black", width=mm(0.5))
    for x in (cx - half, cx + half):
        draw.line([(x, y - mm(2.5)), (x, y + mm(2.5))], fill="black", width=mm(0.4))
    return np.asarray(img)

# ---------------- folding the sheet in 3-D, to check the orientation of both names ----------------
# Flat, printed side up: (u, v) mm -> (X, Y, Z) = (u, -v, 0). The outer panels fold backward (away from the
# printed side) by 120 degrees around the fold lines; then the sheet is turned over to stand on the base.
FOLD_ANGLE = 120.0
FOLD_U_MM = (PANEL_X_PX[1] / PX_PER_MM, PANEL_X_PX[2] / PX_PER_MM)

def fold_point(u, v, angle=FOLD_ANGLE):
    u = np.asarray(u, np.float64); v = np.asarray(v, np.float64)
    X, Y, Z = u.copy(), -v, np.zeros_like(u); a = np.deg2rad(angle)
    for hinge, sign, sel in [(FOLD_U_MM[0], 1, u < FOLD_U_MM[0]), (FOLD_U_MM[1], -1, u > FOLD_U_MM[1])]:
        dx = u[sel] - hinge; X[sel] = hinge + dx * np.cos(sign * a); Z[sel] = dx * np.sin(sign * a)
    return np.stack([X, -Y, -Z], axis=-1)        # turned over: 180 degrees about the X axis

def _panel_frame(i):
    u0, u1 = PANEL_X_PX[i] / PX_PER_MM, PANEL_X_PX[i + 1] / PX_PER_MM; um, e = (u0 + u1) / 2, 1e-3
    p = fold_point([um, um + e, um], [0.0, 0.0, e]); eu, ev = (p[1] - p[0]) / e, (p[2] - p[0]) / e
    n = np.cross(ev, eu)                          # outward normal of the printed side
    return fold_point([u0 + 1e-6], [0.0])[0], eu, ev, n / np.linalg.norm(n)

def viewer_image(sheet_img, i):
    # what a person sees looking straight at panel i from outside the tent, head up
    origin, eu, ev, n = _panel_frame(i); forward = -n
    right = np.cross(forward, [0.0, 0.0, 1.0]); right /= np.linalg.norm(right); up = np.cross(right, forward)
    x0, x1 = PANEL_X_PX[i], PANEL_X_PX[i + 1]
    pts = [origin, origin + eu * (x1 - x0) / PX_PER_MM, origin + ev * PAGE_H_MM]
    dst = np.float32([[p @ right * PX_PER_MM, -(p @ up) * PX_PER_MM] for p in pts])
    corners = np.vstack([dst, dst[1] + dst[2] - dst[0]]); dst -= corners.min(axis=0)
    size = np.round(corners.max(axis=0) - corners.min(axis=0)).astype(int)
    M = cv2.getAffineTransform(np.float32([[x0, 0], [x1, 0], [x0, PAGE_H_PX]]), dst)
    return cv2.warpAffine(sheet_img, M, (int(size[0]), int(size[1])), borderValue=(255, 255, 255))

def _difference(a, b):
    b = cv2.resize(b, (a.shape[1], a.shape[0]), interpolation=cv2.INTER_AREA)
    return float(np.abs(a.astype(np.float32) - b.astype(np.float32)).mean() / 255.0)

def verify_folding(sheet_img, faces):
    centroid = np.mean([fold_point([u], [PAGE_H_MM / 2])[0] for u in (50, 148, 247)], axis=0)
    ok_all, views = True, {}
    for i, role, label in [(0, "left", "Front face"), (2, "right", "Back face ")]:
        _, _, _, n = _panel_frame(i)
        center = fold_point([(PANEL_X_PX[i] + PANEL_X_PX[i + 1]) / 2 / PX_PER_MM], [PAGE_H_MM / 2])[0]
        outward = float(np.dot(n, center - centroid)) > 0
        view = views[role] = viewer_image(sheet_img, i)
        landscape = view.shape[1] > view.shape[0]
        d_ok = _difference(faces[role], view) if landscape else 1.0
        d_flip = _difference(np.rot90(faces[role], 2), view) if landscape else 1.0
        upright = d_ok < 0.02 and d_ok < 0.5 * d_flip
        ok_all &= outward and upright
        print(("PASS  " if outward and upright else "FAIL  ") + f"{label}: printed side faces out = {outward}, "
              f"reads the right way up = {upright} (difference {d_ok:.3f}; upside down would be {d_flip:.3f})")
    return ok_all, views

def show_tent_3d(sheet_img, cells_u=60, cells_v=128):
    small = cv2.resize(sheet_img, (3 * cells_u, cells_v), interpolation=cv2.INTER_AREA) / 255.0
    fig = plt.figure(figsize=(13, 4.2))
    for k, (azim, title) in enumerate([(200, "Folded: seen from the front"), (20, "Folded: seen from the back")]):
        ax = fig.add_subplot(1, 2, k + 1, projection="3d")
        for i in range(3):
            u = np.linspace(PANEL_X_PX[i], PANEL_X_PX[i + 1], cells_u + 1) / PX_PER_MM
            uu, vv = np.meshgrid(np.clip(u, u[0] + 1e-6, u[-1] - 1e-6), np.linspace(0, PAGE_H_MM, cells_v + 1))
            P = fold_point(uu.ravel(), vv.ravel()).reshape(uu.shape + (3,))
            colors = np.ones(uu.shape + (4,)); colors[:-1, :-1, :3] = small[:, i * cells_u:(i + 1) * cells_u]
            ax.plot_surface(P[..., 0], P[..., 1], P[..., 2], facecolors=colors, rstride=1, cstride=1,
                            linewidth=0, antialiased=False, shade=False)
        ax.view_init(elev=18, azim=azim); ax.set_box_aspect((99, 210, 86))
        ax.set_xlim(99, 198); ax.set_ylim(0, 210); ax.set_zlim(0, 86); ax.set_axis_off(); ax.set_title(title)
    plt.tight_layout(); plt.show()

def show_folding_diagram(save_as=None):
    def section(angle, flip):
        pts, nrm = [], []
        for u in np.linspace(0.01, PAGE_W_MM - 0.01, 300):
            a, h = ((np.deg2rad(angle), FOLD_U_MM[0]) if u < FOLD_U_MM[0] else
                    (-np.deg2rad(angle), FOLD_U_MM[1]) if u > FOLD_U_MM[1] else (0.0, u))
            x, z, nx, nz = h + (u - h) * np.cos(a), (u - h) * np.sin(a), -np.sin(a), np.cos(a)
            pts.append((x, -z if flip else z)); nrm.append((nx, -nz if flip else nz))
        return np.array(pts), np.array(nrm)
    fig, axes = plt.subplots(1, 4, figsize=(16, 3.8)); ax = axes[0]
    ax.add_patch(plt.Rectangle((0, 0), PAGE_W_MM, PAGE_H_MM, fc="#f4f4f4", ec="k"))
    for u in FOLD_U_MM:
        ax.plot([u, u], [0, PAGE_H_MM], ls="--", color="0.45")
    for u, lab, rot in [(49.5, "FRONT\n(name)", 90), (148.5, "BASE", 0), (247.5, "BACK\n(name)", -90)]:
        ax.text(u, 105, lab, ha="center", va="center", rotation=rot, fontsize=11)
    ax.set_xlim(-5, 302); ax.set_ylim(215, -5); ax.set_aspect("equal"); ax.set_axis_off()
    ax.set_title("1. Print single-sided at 100 %\n(printed side up)", fontsize=10)
    steps = [(60, False, "2. Fold both outer panels BACKWARD\nalong the dashed lines; crease firmly"),
             (75, True, "3. Turn it over: the middle panel is the\nbase; lift the sides (print faces out)"),
             (120, True, "4. Bring the outer edges together at\nthe top and tape them; stand it up")]
    for ax, (angle, flip, title) in zip(axes[1:], steps):
        pts, nrm = section(angle, flip)
        ax.plot(pts[:, 0], pts[:, 1], color="k", lw=2)
        ax.plot(pts[:, 0] + 3 * nrm[:, 0], pts[:, 1] + 3 * nrm[:, 1], color="tab:orange", lw=3)
        if flip:
            ax.axhline(0, color="0.8", lw=6, zorder=0)
        else:
            for xy, xyt in [((60, -75), (25, -35)), ((237, -75), (272, -35))]:
                ax.annotate("", xy=xy, xytext=xyt, arrowprops=dict(arrowstyle="->", color="tab:red", lw=1.5))
        if angle == 120:
            ax.plot(148.5, 85.7, marker="s", ms=12, color="tab:blue", alpha=0.6)
            ax.text(148.5, 98, "tape", ha="center", fontsize=9, color="tab:blue")
            ax.text(95, 45, "FRONT", ha="center", rotation=60, fontsize=9)
            ax.text(202, 45, "BACK", ha="center", rotation=-60, fontsize=9)
        ax.set_xlim(-10, 307); ax.set_ylim(-100, 110); ax.set_aspect("equal"); ax.set_axis_off()
        ax.set_title(title, fontsize=10)
    fig.text(0.5, 0.02, "Side views along the fold lines. Orange = printed side, gray bar = desk.", ha="center", fontsize=9, color="0.3")
    plt.tight_layout(rect=(0, 0.05, 1, 1))
    if save_as:
        fig.savefig(save_as, dpi=200, bbox_inches="tight")
    plt.show()

print(f"Ready. Python {sys.version.split()[0]}, NumPy {np.__version__}, OpenCV {cv2.__version__}, "
      f"Pillow {Image.__version__}. Running in Colab: {IN_COLAB}")
""")

# ---------------------------------------------------------------------------------------------------
md(r"""
## 1 · Your name and photo (3 min)

Your name is the only text on the tag. Use `\n` for a line break in a long name (`"Ada\nLovelace"`).
The other settings control how the name looks; `"auto"` choices pick black or white for the best contrast
with your image, and `TEXT_EFFECT` adds an outline, shadow or translucent box so the name stays readable.
Built-in fonts: `sans`, `sans-bold`, `sans-italic`, `serif`, `serif-bold`, `serif-italic`, `mono`. Google
fonts (downloaded when needed): `lobster`, `pacifico`, `bebas-neue`, `abril-fatface`, `permanent-marker`,
`righteous`, `playfair-display`. You can also give the path of a `.ttf` file you uploaded.
""")

code(r"""
# EDIT
YOUR_NAME       = "Your Name"
FONT_STYLE      = "sans-bold"
FONT_SIZE_PT    = "auto"       # "auto" or points, e.g. 80 (72 pt = 25.4 mm)
TEXT_COLOR      = "auto"       # "auto", "#RRGGBB", a color name like "gold", or (R, G, B)
TEXT_ALIGN      = "center"     # "left", "center", "right"
TEXT_POSITION   = "middle"     # "top", "middle", "bottom"
TEXT_OFFSET_MM  = (0, 0)       # nudge (right, down) in mm
TEXT_EFFECT     = "outline"    # "outline", "shadow", "box", "none"
EFFECT_COLOR    = "auto"
EFFECT_STRENGTH = 1.0

print("Name on the tag:", YOUR_NAME.replace("\n", " / "))
""")

md(r"""
Now upload a photograph: a self-portrait, an object, a place, a hobby, anything meaningful or visually
interesting to you (JPG, JPEG or PNG). Pictures with clear edges and textures give the most interesting
filter responses. *Cancel upload* uses the course's café photo instead.

**Size and aspect ratio.** An image is an array of shape height × width × 3. Its **pixel size sets the
scale of every filter**: a 15-pixel blur is three times weaker on a 4000-pixel photo than on a 1240-pixel
one, so everything below runs on one working copy, `photo`, 1240 pixels wide. Its **aspect ratio** must
match the 198 × 90 mm artwork area of a tent face (2.2 : 1). The photo is **cropped** around `CROP_FOCUS`
((0.5, 0.25) keeps the upper middle, good for faces), or with `FIT_MODE = "fit"` shown whole on a blurred
copy of itself. It is never stretched: stretching would change the shapes and orientations in the picture,
and so what the orientation filters in Level 2 report.
""")

code(r"""
# EDIT
PHOTO_SOURCE = "upload"      # "upload" or "sample"
FIT_MODE = "crop"            # "crop" or "fit"
CROP_FOCUS = (0.5, 0.5)      # (x, y) from 0 to 1: the part of the photo to keep

original_pil, photo_name = get_photo(PHOTO_SOURCE)
original = to_float(np.asarray(original_pil))       # kept unchanged, for comparisons
photo = prepare_design_photo(original, FACE_ASPECT, FIT_MODE, CROP_FOCUS)
photo_base = prepare_design_photo(original, BASE_ASPECT, FIT_MODE, CROP_FOCUS)
gray = to_gray(photo)
print(f"{photo_name}: {original.shape[1]} x {original.shape[0]} px -> photo {photo.shape[1]} x {photo.shape[0]} px")
show_crop(original, CROP_FOCUS, FIT_MODE)
""")

# ---------------------------------------------------------------------------------------------------
md(r"""
---
## 2 · LEVEL 1 (Basic): Spatial filtering (7 min)

**How does a filter modify local image information?** A spatial filter replaces each pixel by a
**weighted sum of its neighbors**. The weights form a small grid, the **kernel**. The kernel slides across
the image: at each position, multiply every weight by the pixel under it and add up the products.
(Strictly this is *correlation*; *convolution* flips the kernel first, which makes no difference for
symmetric kernels.) The weights decide everything:

| Kernel | Weights | Sum | Effect |
|---|---|---|---|
| Gaussian blur | bell-shaped, all positive | 1 | local average: flat areas unchanged, fast changes smoothed away (**low-pass**: keeps low spatial frequencies) |
| Sharpen | center 5, four neighbors −1 | 1 | the pixel plus 4 × (pixel − mean of its neighbors): adds back local detail |
| Sobel x | columns −1, 0, +1 (rows weighted 1 : 2 : 1) | 0 | right minus left: responds only where brightness changes, at **vertical edges** (**high-pass**) |
| Laplacian | center −4, four neighbors +1 | 0 | neighbors minus center (a second derivative): spots, thin lines, both sides of every edge |

Weights that add up to **1** keep the brightness of flat regions; weights that add up to **0** turn flat
regions to zero and keep only change. Larger kernels average over more pixels, so they act on coarser
structure (lower spatial frequencies).

Run the cell, then change `KERNEL_SIZE` and `SHARPEN_STRENGTH` and run it again. What is removed, what is
emphasized, and what is preserved?
""")

code(r"""
def gaussian_blur(image, kernel_size=15, sigma=None):
    k = int(kernel_size) // 2 * 2 + 1                      # kernels need an odd size, so they have a center
    return cv2.GaussianBlur(np.float32(image), (k, k), sigmaX=sigma or max(k / 6.0, 0.3), borderType=cv2.BORDER_REFLECT)

def sharpen(image, strength=1.0, kernel_size=9):
    detail = np.float32(image) - gaussian_blur(image, kernel_size)   # the high frequencies the blur removed
    return np.clip(image + strength * detail, 0, 1)

def sobel_edges(image):
    g = to_gray(image)
    gx = cv2.Sobel(g, cv2.CV_32F, 1, 0, ksize=3)          # vertical edges
    gy = cv2.Sobel(g, cv2.CV_32F, 0, 1, ksize=3)          # horizontal edges
    return np.hypot(gx, gy)                                # edge strength in any direction

def laplacian_edges(image, kernel_size=3, pre_blur=0):
    g = gaussian_blur(to_gray(image), pre_blur) if pre_blur else to_gray(image)
    return cv2.Laplacian(g, cv2.CV_32F, ksize=kernel_size)

# EDIT
KERNEL_SIZE = 21          # try 3, 11, 31, 61
SHARPEN_STRENGTH = 1.5    # try 0.5, 3, 6

show_row([photo, gaussian_blur(photo, KERNEL_SIZE), sharpen(photo, SHARPEN_STRENGTH)],
         ["Original", f"gaussian_blur(kernel_size={KERNEL_SIZE})", f"sharpen(strength={SHARPEN_STRENGTH})"], height=2.6)
show_row([sobel_edges(photo), sobel_edges(gaussian_blur(photo, KERNEL_SIZE)), laplacian_edges(photo, 3, pre_blur=5)],
         ["sobel_edges", f"sobel_edges after a {KERNEL_SIZE}px blur", "laplacian_edges(pre_blur=5)"],
         modes=["auto", "auto", "signed"], height=2.6)
""")

md(r"""
**Your turn (Exercise 1): design a kernel.** Fill in a 3 × 3 kernel and predict, *before* running, what
its weights add up to and what will happen in flat regions. Ideas: an **emboss** (negative weights at the
top-left, positive at the bottom-right, 1 in the center), a **diagonal edge** detector, or a **motion blur**
(equal weights along one row).
""")

turn(r"""
# Your turn 1: replace None with a 3x3 NumPy array.
my_kernel = None        # e.g. np.array([[a, b, c], [d, e, f], [g, h, i]], dtype=np.float32)

if my_kernel is None:
    print("Fill in my_kernel, then run this cell again.")
else:
    my_kernel = np.asarray(my_kernel, np.float32)
    response = cv2.filter2D(gray, cv2.CV_32F, my_kernel, borderType=cv2.BORDER_REFLECT)
    print(f"Weights add up to {my_kernel.sum():.3g}, so flat regions are multiplied by {my_kernel.sum():.3g}.")
    fig, axes = plt.subplots(1, 3, figsize=(14, 3), gridspec_kw={"width_ratios": [1, 2.2, 2.2]})
    show_kernel(axes[0], my_kernel, "my_kernel")
    _imshow(axes[1], gray); axes[1].set_title("Original")
    _imshow(axes[2], response); axes[2].set_title("Filtered with my_kernel")
    plt.tight_layout(); plt.show()
""", SOL.get(1, ""))

# ---------------------------------------------------------------------------------------------------
md(r"""
---
## 3 · LEVEL 2 (Medium): Filter banks and orientation (7 min)

**How can a collection of filters detect different visual structures?** One kernel asks one question of
every patch. A **filter bank** asks many at once: the same filter at several **orientations** and
**scales**. The classic choice is the **Gabor filter**, a patch of stripes inside a Gaussian window:

$$g(x, y) = \exp\!\left(-\frac{u^2 + \gamma^2 v^2}{2\sigma^2}\right)\cos\!\left(\frac{2\pi u}{\lambda} + \psi\right)$$

with $u$ the distance across the stripes and $v$ along them. The **wavelength** $\lambda$ (pixels per
stripe cycle) sets the spatial frequency it prefers, the **orientation** $\theta$ the edge angle, $\sigma$
the window size, $\gamma < 1$ makes the window longer along the stripes (sharper orientation tuning), and
the **phase** $\psi$ makes it a bar detector (even, cosine) or an edge detector (odd, sine). A Gabor filter
responds strongly only where the image has structure near *its* orientation *and* spacing.

**Connection to V1.** Hubel and Wiesel (1959, 1962) found neurons in the cat's primary visual cortex that
respond best to edges or bars at one orientation in a small part of the visual field. Gabor functions fit
the receptive fields of these **simple cells** closely (Jones & Palmer, 1987). **Complex cells** respond to
the orientation regardless of the exact position of the stripes, modeled as the *energy*
$\sqrt{\text{even}^2 + \text{odd}^2}$ of two Gabor filters 90° apart in phase, which is what the bank below
computes. V1 has cells for every orientation at every location: in effect, a large filter bank.

Run the cell. The last figure colors each pixel by its **dominant orientation** (hue) and total energy
(brightness). Then edit `ORIENTATIONS` (try every 30°) or `WAVELENGTHS` and run again.
""")

code(r"""
def create_gabor_filter(wavelength=12.0, theta_deg=0.0, sigma=None, gamma=0.5, psi_deg=0.0):
    sigma = sigma or 0.56 * wavelength                     # about one octave of frequency bandwidth
    half = int(math.ceil(3 * sigma / min(gamma, 1.0)))
    ys, xs = np.mgrid[-half:half + 1, -half:half + 1].astype(np.float32)
    ys = -ys                                               # rows grow downward; flip so angles turn counter-clockwise
    across = np.deg2rad(theta_deg + 90.0)                  # theta = stripe orientation, 0 = horizontal stripes
    u = xs * np.cos(across) + ys * np.sin(across)          # distance across the stripes
    v = -xs * np.sin(across) + ys * np.cos(across)         # distance along the stripes
    envelope = np.exp(-(u**2 + (gamma * v)**2) / (2 * sigma**2))
    carrier = np.cos(2 * np.pi * u / wavelength + np.deg2rad(psi_deg))
    carrier -= (envelope * carrier).sum() / envelope.sum() # zero mean: flat regions give 0
    kernel = envelope * carrier
    return (kernel / np.sqrt((kernel**2).sum())).astype(np.float32)

def apply_gabor_filter(image, kernel):
    return cv2.filter2D(to_gray(image), cv2.CV_32F, kernel, borderType=cv2.BORDER_REFLECT)

def create_gabor_bank(wavelengths=(8, 16), orientations_deg=(0, 45, 90, 135), gamma=0.5):
    return [dict(wavelength=lam, theta_deg=th,
                 even=create_gabor_filter(lam, th, gamma=gamma, psi_deg=0),     # simple cell, bar-like
                 odd=create_gabor_filter(lam, th, gamma=gamma, psi_deg=90))     # simple cell, edge-like
            for lam in wavelengths for th in orientations_deg]

def apply_gabor_bank(image, bank):
    # complex-cell energy for every filter: shape (number of filters, H, W)
    return np.stack([np.hypot(apply_gabor_filter(image, f["even"]), apply_gabor_filter(image, f["odd"])) for f in bank])

# EDIT
ORIENTATIONS = [0, 45, 90, 135]     # degrees
WAVELENGTHS = [8, 16]               # pixels per stripe cycle

bank = create_gabor_bank(WAVELENGTHS, ORIENTATIONS)
design_bank = bank                  # used by the designs in Section 5
responses = apply_gabor_bank(photo, bank)
visualize_filter_bank(bank)
visualize_bank_responses(bank, responses)

fig, axes = plt.subplots(1, 3, figsize=(14, 3.2), gridspec_kw={"width_ratios": [2.2, 2.2, 0.6]})
_imshow(axes[0], photo); axes[0].set_title("Original")
_imshow(axes[1], orientation_color_map(responses, bank)); axes[1].set_title("Dominant orientation of the bank")
orientation_legend(axes[2]); plt.tight_layout(); plt.show()
""")

md(r"""
**Look and think (1 minute).** Which orientation responds most to your photo, and is that a property of the
object or of how you framed it? Why does one filter ignore some edges that are just as strong as the ones
it detects? Where is the orientation map gray (no dominant orientation), and what is there in the image?
""")

# ---------------------------------------------------------------------------------------------------
md(r"""
---
## 4 · LEVEL 3 (Advanced): Multi-scale decomposition (5 min)

**How can an image be split into structure at different scales, and put back together?** A **Gaussian
pyramid** repeatedly blurs the image and keeps every second pixel, so each level is half the size and
holds only coarser structure (the blur comes first to avoid aliasing). A **Laplacian pyramid** stores what
each step *lost*: a level minus an enlarged copy of the next one. Each band holds about one octave of
spatial frequencies, from fine texture to broad shapes, and adding the bands back up **reconstructs the
image exactly** (Burt & Adelson, 1983). So you can change the bands and rebuild a modified image.

Each band is close to a **difference of Gaussians** (narrow blur minus wide blur): a center-surround filter
like the receptive fields of retinal ganglion cells and LGN neurons (Enroth-Cugell & Robson, 1966). Early
vision already splits the image into frequency bands; V1 then adds orientation, as your Level 2 bank did.

Edit `BAND_WEIGHTS`, one number per level from the finest band to the coarse remainder: `[1, 1, 1, 1, 1]`
gives back the original, `[2.5, 2, 1.3, 1, 1]` makes fine detail pop, `[0, 0.3, 1, 1, 1]` looks dreamy.
""")

code(r"""
def build_gaussian_pyramid(image, levels=5):
    pyramid = [np.float32(image)]
    for _ in range(levels - 1):
        pyramid.append(cv2.pyrDown(pyramid[-1]))           # 5x5 Gaussian blur, then keep every 2nd pixel
    return pyramid

def build_laplacian_pyramid(image, levels=5):
    g = build_gaussian_pyramid(image, levels)
    bands = [fine - cv2.pyrUp(coarse, dstsize=(fine.shape[1], fine.shape[0])) for fine, coarse in zip(g[:-1], g[1:])]
    return bands + [g[-1]]                                 # band-pass details + the coarse remainder

def reconstruct_from_laplacian(bands):
    image = bands[-1]
    for band in reversed(bands[:-1]):
        image = cv2.pyrUp(image, dstsize=(band.shape[1], band.shape[0])) + band
    return image

def reweight_bands(image, weights):
    bands = build_laplacian_pyramid(image, len(weights))
    return np.clip(reconstruct_from_laplacian([b * w for b, w in zip(bands, weights)]), 0, 1)

# EDIT
BAND_WEIGHTS = [2.2, 1.8, 1.3, 1.0, 1.0]

design_band_weights = BAND_WEIGHTS  # used by the designs in Section 5
lap = build_laplacian_pyramid(photo, 5)
print(f"Reconstruction error: {np.abs(reconstruct_from_laplacian(lap) - photo).max():.1e} (the pyramid loses nothing)")
visualize_pyramid(build_gaussian_pyramid(photo, 5), "Gaussian pyramid")
visualize_pyramid(lap, "Laplacian pyramid: detail at each scale (gray = 0) + coarse remainder", signed=True)
show_row([photo, reweight_bands(photo, BAND_WEIGHTS)], ["Original", f"reweight_bands({BAND_WEIGHTS})"], height=2.8)
""")

# ---------------------------------------------------------------------------------------------------
md(r"""
---
## 5 · Combine the levels into a design (3 min)

Each filtered image is a **map** of one kind of information (edges, orientation, detail at one scale). A
design layers such maps. Each ready-made recipe combines at least two levels, using your bank and band
weights from above:

- `ink_sketch`: Level 1 multi-scale edges as ink lines on a blurred color wash;
- `orientation_glow`: Level 2 orientation colors over a dimmed photo, with Level 1 edges;
- `poster_edges`: Level 1 blur and posterized colors, outlined by Level 3 difference-of-Gaussians edges;
- `detail_pop`: Level 3 band weights plus Level 1 sharpening;
- `duotone_edges`: Level 3 coarse bands mapped to two colors, with Level 2 Gabor energy as glow.

Pick the **front** face (left panel) and **back** face (right panel). The **base** (middle panel) faces
the desk when the tent stands, so it is the hidden "floor" of your tag: `"process_strip"` shows your photo
going from original to Level 1, 2 and 3; other options are `"filter_bank_mosaic"`, `"pyramid_bands"`,
any recipe, or `"blank"` to save ink.
""")

code(r"""
gallery = [photo] + [run_recipe(name, photo) for name in RECIPES]
show_row(gallery[:3], ["original"] + list(RECIPES)[:2], height=2.2)
show_row(gallery[3:], list(RECIPES)[2:], height=2.2)

# EDIT
FRONT_DESIGN = "orientation_glow"     # a recipe name, or "mine" (optional extra below)
BACK_DESIGN = "same"                  # "same" or a recipe name
BASE_DESIGN = "process_strip"         # "process_strip", "filter_bank_mosaic", "pyramid_bands", a recipe, "blank"
""")

md(r"""
**Optional, if you have time (Exercise 2): your own recipe.** Write `my_design(img)` to combine at least
two levels your own way, then set `FRONT_DESIGN = "mine"` above and re-run from there. Tools: the Level 1–3
functions plus `normalize01`, `posterize(img, levels)`, `colorize(gray, dark, light)`,
`blend(base, layer, mode, opacity)` (modes `"normal"`, `"multiply"`, `"screen"`, `"overlay"`, `"add"`),
`ink_lines(img)` and `orientation_color_map(responses, bank)`.
""")

turn(r"""
# Your turn 2 (optional): return an RGB image the size of img, values 0..1. Leave it returning None to skip.
def my_design(img):
    return None

if my_design(photo) is not None:
    RECIPES["mine"] = my_design
    show_row([photo, run_recipe("mine", photo)], ["Original", "my_design"], height=2.8)
else:
    print("Skipped: my_design returns None.")
""", SOL.get(2, ""))

# ---------------------------------------------------------------------------------------------------
md(r"""
---
## 6 · Build the sheet, check the fold, print (5 min)

The fold lines run down the 210 mm side of the landscape sheet, so on the standing tent each face is
210 mm wide and 99 mm tall, and its top edge is the outer edge of the paper (the ridge). That is why the
names appear **sideways** on the flat sheet: the front face is turned 90° counterclockwise (its top points to
the left edge), the back face 90° clockwise (its top points to the right edge).

Rather than trusting that reasoning, the cell below **folds the sheet in a 3D simulation**: the outer panels
fold backward by 120° (an equilateral triangle), the sheet is turned over onto its base, and the code
computes what a person in front of and behind the tent sees. Both faces must **PASS** (printed side out,
name the right way up) before you print. Then it saves the PDF and, in Colab, downloads it.
""")

code(r"""
front_art = run_recipe(FRONT_DESIGN, photo)
back_art = front_art if BACK_DESIGN == "same" else run_recipe(BACK_DESIGN, photo)
faces = {"left": make_face(front_art, "left", YOUR_NAME),
         "middle": make_face(base_composition(BASE_DESIGN, photo_base), "middle"),
         "right": make_face(back_art, "right", YOUR_NAME, verbose=False)}
sheet = assemble_sheet(faces)

ok, views = verify_folding(sheet, faces)
show_row([sheet], ["The A4 sheet as it will print (front | base | back)"], height=5.5)
show_row([views["left"], views["right"]], ["Simulated: seen from the front", "Simulated: seen from the back"], height=2.4)
show_tent_3d(sheet)

safe_name = "".join(ch if ch.isalnum() else "_" for ch in YOUR_NAME.replace("\n", " ")).strip("_") or "name"
pdf_path = f"name_tag_{safe_name}.pdf"
Image.fromarray(sheet).save(pdf_path, "PDF", resolution=DPI)
Image.fromarray(sheet).save(pdf_path.replace(".pdf", ".png"), dpi=(DPI, DPI))
print(f"Saved {pdf_path}: {sheet.shape[1]} x {sheet.shape[0]} px = {sheet.shape[1] / PX_PER_MM:.0f} x "
      f"{sheet.shape[0] / PX_PER_MM:.0f} mm at {DPI} DPI." + ("" if ok else "  Fix the FAIL above before printing!"))
if IN_COLAB:
    colab_files.download(pdf_path)
""")

md(r"""
### How to fold

1. **Print** the PDF on A4, single-sided, at **100 % / Actual size** (not "Fit to page"). The bar on the
   base panel should measure exactly 50 mm.
2. With the printed side up, fold each outer panel **backward** along its dashed line and crease firmly.
3. Turn the sheet over so the middle panel lies on the desk, and lift the two sides: the design faces out.
4. Bring the two outer edges together at the top and join them with a strip of clear tape (or a paper
   clip). Three equal 99 mm panels form an equilateral triangle that stands firmly, even on 80 gsm paper.
""")

code(r"""
show_folding_diagram()
""")

if __name__ == '__main__':
    main(FILE, private_solutions=True)

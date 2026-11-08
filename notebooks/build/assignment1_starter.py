"""Builds notebooks/assignment1-starter.ipynb: the starter notebook for Assignment 1 (Week 1),
"Are vision models still blind?". The assignment page is drafts/assignment1.html.
Part A replicates BlindTest (Rahmanzadehgervi, Bolton, Taesiri & Nguyen, "Vision Language Models Are Blind",
ACCV 2024; data: huggingface.co/datasets/XAI/vlmsareblind, MIT license) on a newer open model, on a fixed
course subset. Part B makes fresh images with known answers. The 2024 numbers are Table 1 of arXiv 2407.06581v6.
See nbtools.py for how to build and check it."""
import os
from nbtools import md, code, hidden, turn, answer, resources, badge, main

# The solutions live in a git-ignored file, private/assignment1_starter_solutions.py (the repository is
# public). Without it, this script still builds the student notebook; --teacher and --solved need it.
try:
    from private.assignment1_starter_solutions import SOL, ANSWERS
except ImportError:
    SOL, ANSWERS = {}, {}

FILE = 'assignment1-starter.ipynb'

# ---------------------------------------------------------------------------------------------
md(f"""
{badge(FILE)}

# Assignment 1 · Are vision models still blind?

**Human-Machine Perception** · Week 1 · Fernanda & Shreya

In class we saw *Vision Language Models Are Blind* (Rahmanzadehgervi, Bolton, Taesiri & Nguyen, ACCV
2024): simple questions about simple drawings, such as whether two circles touch, that the best models of
2024 often got wrong. In this assignment you test a newer model on the same questions (Part A), then make
new images that no model has seen and find where the models break (Part B). Read the assignment page first:
it has the points and what to hand in.

**How to use this notebook.**

1. *File → Save a copy in Drive*, so your work is saved in your own Drive.
2. *Runtime → Change runtime type → T4 GPU.* It is free. Without a GPU everything still runs, only slower.
3. Run the cells in order (**Shift + Enter**). Cells marked **Your turn** are for you; each one runs
   without errors while it is still blank and prints what to fill in. Write your answers in the cells
   marked **Your answer** (double-click to edit).
4. **Predictions come first.** A wrong prediction loses no points; a missing one does.
5. **Never paste an API key or token into a cell.** Put it in Colab's *Secrets* (the key icon on the
   left), and the notebook reads it from there.
6. Before you hand in: *Runtime → Restart session and run all*, check the outputs, then
   *Share → Anyone with the link → Viewer*.
""")

md("""
## 0 · Set up

The first cell installs the libraries (a minute). The second checks what you are running on. The third
holds the **helper code**: loading the test, asking a model, scoring the answers, and drawing new images.
It is folded away; the table after it says what is in it.
""")
code("""
%pip install -q "transformers>=4.57" accelerate datasets google-genai
""")
code("""
import sys, time
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import torch
import transformers

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
print("Python       ", sys.version.split()[0])
print("PyTorch      ", torch.__version__)
print("Transformers ", transformers.__version__)
print("Device       ", DEVICE, f"({torch.cuda.get_device_name(0)})" if DEVICE == "cuda" else "")
if DEVICE == "cpu":
    print("No GPU: Runtime -> Change runtime type -> T4 GPU. On the CPU, use the 2B model and fewer images per task.")
""")
# The model-loading and run() code is shared with notebooks/assignment1_fix.py, which students with an older copy can load.
RUNTIME = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'assignment1_fix.py')).read()

hidden(r'''
#@title Helpers: run this cell (you can read it, but you don't need to)
import io, json, math, os, random, re
from IPython.display import display
from PIL import Image, ImageDraw
from datasets import load_dataset

def secret(name):
    """A key from Colab's Secrets (the key icon on the left), or an environment variable; None if missing."""
    try:
        from google.colab import userdata
        return userdata.get(name)
    except Exception:
        return os.environ.get(name)

# ---------------- the test: BlindTest, and the course subset ----------------
# Rahmanzadehgervi, Bolton, Taesiri & Nguyen, "Vision Language Models Are Blind", ACCV 2024.
# Data: https://huggingface.co/datasets/XAI/vlmsareblind (MIT license). 8,016 images, 9 tasks.
BLINDTEST = load_dataset("XAI/vlmsareblind", split="valid")

# The column names used in the paper's Table 1; the two grid tasks share one column there.
COLUMN = {
    "Line Plot Intersections": "Lines cross",
    "Touching Circles": "Two circles",
    "Circled Letter": "Circled letter",
    "Olympic Counting - Circles": "Circles",
    "Olympic Counting - Pentagons": "Pentagons",
    "Nested Squares": "Nested squares",
    "Counting Grid - Word Grids": "Grid",
    "Counting Grid - Blank Grids": "Grid",
    "Subway Connections": "Subway",
}
TASKS = list(COLUMN)
COLUMNS = list(dict.fromkeys(COLUMN.values()))

# Mean accuracy (%) from Table 1 of the paper, arXiv 2407.06581 version 6.
PAPER = pd.DataFrame({
    "Guessing":          [33.33, 50.00,  5.77, 20.00, 20.00, 25.00,  4.55, 33.33],
    "GPT-4o":            [41.61, 75.91, 74.23, 41.25, 20.21, 55.83, 39.58, 53.19],
    "Gemini-1.5 Pro":    [66.94, 93.62, 83.29, 20.25, 24.17, 87.08, 39.39, 53.13],
    "Claude 3 Sonnet":   [43.41, 86.46, 72.06, 29.79,  1.87, 65.00, 36.17, 31.11],
    "Claude 3.5 Sonnet": [75.36, 90.82, 87.88, 66.46, 77.71, 92.08, 74.26, 58.19],
}, index=COLUMNS)

def _one_prompt(task):
    """For each task, the first of the paper's questions that asks for the answer in a fixed format."""
    prompts = [p for t, p in zip(BLINDTEST["task"], BLINDTEST["prompt"]) if t == task]
    return next((p for p in dict.fromkeys(prompts) if "{" in p or "Yes/No" in p), prompts[0])

PROMPT = {task: _one_prompt(task) for task in TASKS}

def make_subset(n_per_task=20, seed=0):
    """n_per_task images from each task, with that task's question; the same for everyone with the same seed."""
    rng = random.Random(seed)
    tasks, prompts = BLINDTEST["task"], BLINDTEST["prompt"]
    rows = []
    for task in TASKS:
        idx = [i for i, (t, p) in enumerate(zip(tasks, prompts)) if t == task and p == PROMPT[task]]
        rows += sorted(rng.sample(idx, n_per_task))
    return [dict(BLINDTEST[i], row=i) for i in rows]

# ---------------- scoring ----------------
def _numbers(text):
    return [int(x) for x in re.findall(r"-?\d+", text)]

def parse(task, text):
    """The answer in a model's reply, in the same form as the ground truth ('Yes', '3', 'S', '4,5'); None if absent."""
    text = text or ""
    braces = re.findall(r"\{([^{}]*)\}", text)
    if task == "Touching Circles":
        m = re.search(r"\b(yes|no)\b", text, re.I)
        return m.group(1).capitalize() if m else None
    if task.startswith("Counting Grid"):
        nums = _numbers(" ".join(braces)) if len(_numbers(" ".join(braces))) >= 2 else _numbers(text)
        return f"{nums[0]},{nums[1]}" if len(nums) >= 2 else None
    if task == "Circled Letter":
        if braces and braces[-1].strip():
            return braces[-1].strip().strip("'\"")[:1]
        m = re.search(r"letter\s+['\"]?([A-Za-z])\b", text)
        return m.group(1) if m else None
    nums = _numbers(braces[-1]) if braces and _numbers(braces[-1]) else _numbers(text)
    return str(nums[-1]) if nums else None      # without brackets, the last number (models conclude at the end)

def is_correct(task, text, truth):
    a = parse(task, text)
    if a is None:
        return False
    return a.lower() == str(truth).lower() if task == "Circled Letter" else a == str(truth)

# ---------------- asking a model ----------------
MAX_SIDE = 1024   # images are shrunk to at most this many pixels on a side before they go to a model

def _prepare(image):
    image = image.convert("RGB")
    image.thumbnail((MAX_SIDE, MAX_SIDE))
    return image

# @@RUNTIME@@
def load_gemini(model_name):
    """A Gemini model through Google's API, with the key from Colab's Secrets (GEMINI_API_KEY).
    Returns ask(image, prompt) -> the reply, or None if there is no key."""
    key = secret("GEMINI_API_KEY")
    if not key:
        print("No GEMINI_API_KEY in Colab's Secrets: skipping Gemini. See the assignment page for how to get a free key.")
        return None
    from google import genai
    from google.genai import types
    client = genai.Client(api_key=key)

    def ask(image, prompt):
        buf = io.BytesIO(); _prepare(image).save(buf, format="PNG")
        for attempt in range(5):
            try:
                reply = client.models.generate_content(
                    model=model_name, contents=[types.Part.from_bytes(data=buf.getvalue(), mime_type="image/png"), prompt],
                    config=types.GenerateContentConfig(temperature=0))
                return reply.text or ""
            except Exception as err:
                if attempt == 4:
                    return f"ERROR: {err}"
                time.sleep(15 * (attempt + 1))   # free-tier rate limits: wait and try again
    return ask

def accuracy_by_task(results):
    """Accuracy (%) per column of the paper's table, from a table returned by run()."""
    acc = results.assign(column=results["task"].map(COLUMN)).groupby("column")["correct"].mean() * 100
    return acc.reindex(COLUMNS)

# ---------------- showing images ----------------
def show_items(items, titles=None, per_row=5, size=2.6):
    """Shows images (PIL images, or dicts with an 'image') in a grid, with titles."""
    images = [it["image"] if isinstance(it, dict) else it for it in items]
    titles = titles or [""] * len(images)
    rows = math.ceil(len(images) / per_row)
    fig, axes = plt.subplots(rows, per_row, figsize=(size * per_row, size * rows), squeeze=False)
    for ax in axes.flat:
        ax.set_axis_off()
    for ax, im, t in zip(axes.flat, images, titles):
        ax.imshow(im.convert("RGB")); ax.set_title(t, fontsize=9)
    plt.tight_layout(); plt.show()

# ---------------- drawing new images (Part B) ----------------
def two_circles(gap, diameter=0.25, linewidth=4, size=512, angle=None, seed=None):
    """Two circle outlines. gap: the distance between their edges, as a fraction of the diameter
    (negative: they overlap; 0: they just touch). Returns a dict like a BlindTest item; the answer to
    "Are the two circles touching each other?" is Yes when gap <= 0."""
    rng = random.Random(seed)
    angle = rng.uniform(0, math.pi) if angle is None else angle
    d = diameter * size; r = d / 2; c = d + gap * d          # distance between the centers
    cx, cy = size / 2 + rng.uniform(-0.1, 0.1) * size, size / 2 + rng.uniform(-0.1, 0.1) * size
    dx, dy = math.cos(angle) * c / 2, math.sin(angle) * c / 2
    im = Image.new("RGB", (size, size), "white"); draw = ImageDraw.Draw(im)
    for (x, y), color in [((cx - dx, cy - dy), "#1f77b4"), ((cx + dx, cy + dy), "#ff7f0e")]:
        draw.ellipse([x - r, y - r, x + r, y + r], outline=color, width=linewidth)
    return {"image": im, "task": "Touching Circles", "prompt": PROMPT["Touching Circles"],
            "groundtruth": "Yes" if gap <= 0 else "No", "level": gap}

def _crossings(ys1, ys2):
    """How many times two polylines over the same x positions cross (touching counts once)."""
    diff = np.array(ys1) - np.array(ys2)
    count, k = 0, 0
    while k < len(diff) - 1:
        if diff[k] == 0:
            count += 1
        elif diff[k] * diff[k + 1] < 0:
            count += 1
        k += 1
    return count + (diff[-1] == 0)

def two_lines(linewidth=3, size=512, seed=None):
    """A blue and a red line, each through 3 points at the same x positions (as in BlindTest). Returns a
    dict like a BlindTest item; the answer is how many times the lines cross (0, 1 or 2)."""
    rng = random.Random(seed)
    xs = [0.1, 0.5, 0.9]
    while True:
        ys1 = [rng.randint(1, 9) / 10 for _ in xs]; ys2 = [rng.randint(1, 9) / 10 for _ in xs]
        if all(abs(a - b) >= 0.1 for a, b in zip(ys1, ys2)):   # no shared points: every crossing is a clear one
            break
    im = Image.new("RGB", (size, size), "white"); draw = ImageDraw.Draw(im)
    for ys, color in [(ys1, "#1f77b4"), (ys2, "#d62728")]:
        draw.line([(x * size, (1 - y) * size) for x, y in zip(xs, ys)], fill=color, width=linewidth, joint="curve")
    return {"image": im, "task": "Line Plot Intersections", "prompt": PROMPT["Line Plot Intersections"],
            "groundtruth": str(_crossings(ys1, ys2)), "level": linewidth}

print(f"BlindTest loaded: {len(BLINDTEST)} images, {len(TASKS)} tasks.")
'''.replace('# @@RUNTIME@@\n', RUNTIME))
md("""
**What is in the helper cell**

| Name | What it is |
|---|---|
| `BLINDTEST` | all 8,016 BlindTest images, with their questions and answers |
| `make_subset(n_per_task=20)` | the course subset: the same 20 images per task for everyone |
| `PROMPT[task]` | the paper's question for each task |
| `PAPER` | the paper's 2024 results (Table 1), accuracy in % per task |
| `load_open_model(model_id)` | loads an open model from Hugging Face; returns `ask(image, prompt)` |
| `load_gemini(model_name)` | the same for Gemini, with your free key from Colab's Secrets |
| `run(ask, items)` | asks a model about every image, saving each answer as it goes; returns a table of replies, answers and whether each is correct |
| `free_model()` | takes the open model out of memory (only one fits on the free GPU; asking another model swaps it in by itself) |
| `accuracy_by_task(results)` | accuracy (%) per task, in the paper's columns |
| `parse(task, reply)` | the answer inside a model's reply |
| `show_items(items, titles)` | shows images in a grid |
| `two_circles(gap, ...)`, `two_lines(linewidth, ...)` | draw new images with a known answer (Part B) |
""")

md("""
### Keep your answers safe

Colab can disconnect, especially if you leave it alone or use up your free GPU time. The next cell connects your
Google Drive, so every answer a model gives is saved there, in a folder called `assignment1-answers`. Say yes to
the pop-up. If you say no, answers are saved in Colab only, and are lost when the runtime is disconnected.
""")
code("""
try:
    from google.colab import drive
    drive.mount("/content/drive")
except Exception as err:
    print("Not saving to Drive:", err)
""")

# ---------------------------------------------------------------------------------------------
md("""
# Part A · Replicate (35 points)

## A1 · Look, then predict (5 points)

Here is one image from each task, with its question. Answer them yourself first.
""")
code("""
SUBSET = make_subset(n_per_task=20)
examples = [next(it for it in SUBSET if it["task"] == task) for task in TASKS]
show_items(examples, [f"{k + 1}. {COLUMN[it['task']]}" for k, it in enumerate(examples)], per_row=3, size=3.6)
for k, it in enumerate(examples):
    print(f"{k + 1}. {it['prompt']}")
""")
turn("""
# Your turn 1 (A1). Your own answers to the nine questions above, in order, in the format each one asks for.
my_answers = ["", "", "", "", "", "", "", "", ""]
# Which model will you test in A2, which task do you predict it will find hardest, and why?
my_prediction = ""

if not all(a.strip() for a in my_answers):
    print("Fill in all nine answers, then run this cell again.")
else:
    for k, (it, a) in enumerate(zip(examples, my_answers)):
        print(f"{k + 1}. {COLUMN[it['task']]:15} you: {a:8} truth: {it['groundtruth']:6}",
              "right" if is_correct(it["task"], a if it["task"] == "Touching Circles" else "{" + a + "}", it["groundtruth"]) else "WRONG")
    print("You predicted:", my_prediction or "(no prediction written)")
""", SOL.get(1, ''))
md("""
**Your answer (A1).** Which model you chose, and why you predict that task will be hardest for it.

*Write your answer here.*
""")
answer(ANSWERS.get(1, ''))

md("""
## A2 · Run a newer model (10 points)

Pick a model that was not in the paper. The default is `Qwen/Qwen3-VL-4B-Instruct` (Alibaba, October
2025). Others that run here: `Qwen/Qwen3-VL-2B-Instruct` (faster), `HuggingFaceTB/SmolVLM2-2.2B-Instruct`,
and `google/gemma-3-4b-it` (accept its license on Hugging Face first, and add your token to Colab's Secrets
as `HF_TOKEN`). Or find another on Hugging Face and say where in your source log.

The next cell runs your model on the whole course subset (180 images). The first time, it downloads the model
(about 9 GB for the 4B, 4 GB for the 2B). It prints how long is left after every 20 images.

**If it stops or Colab disconnects:** reconnect, run the cells from the top, and it continues where it stopped. You
do not lose the answers you already have. If it keeps crashing, or you run out of free GPU time, use the 2B model
and say so in your write-up. On the CPU, set `N_PER_TASK` to 5 and use the 2B model.
""")
code("""
# EDIT: your model, and how many images per task (20 for the full course subset).
MODEL_ID = "Qwen/Qwen3-VL-4B-Instruct"
N_PER_TASK = 20

SUBSET = make_subset(n_per_task=N_PER_TASK)
ask = load_open_model(MODEL_ID)
results = {MODEL_ID: run(ask, SUBSET, label=MODEL_ID)}
display(accuracy_by_task(results[MODEL_ID]).round(1).to_frame(MODEL_ID))
""")
md("""
**Optional: Gemini.** If you made a free key (see the assignment page), put a model name from
[Google AI Studio](https://aistudio.google.com/)'s list here. Without a key, the cell skips itself.
""")
code("""
# EDIT (optional): a Gemini model name, as listed in Google AI Studio.
GEMINI_MODEL = None

if GEMINI_MODEL:
    gemini = load_gemini(GEMINI_MODEL)
    if gemini:
        results[GEMINI_MODEL] = run(gemini, SUBSET, label=GEMINI_MODEL)
        display(accuracy_by_task(results[GEMINI_MODEL]).round(1).to_frame(GEMINI_MODEL))
else:
    print("No Gemini model set: skipped.")
""")

md("""
## A3 · Compare with 2024 (10 points)

`PAPER` holds the paper's results (accuracy in %, one column per model, one row per task). Make one figure
that puts your model(s) next to them, task by task.
""")
turn("""
# Your turn 2 (A3). One figure: accuracy per task for your model(s) and the paper's models.
comparison = None     # e.g. a table with one row per task and one column per model

if comparison is None:
    print("Build comparison and plot it, then run this cell again.")
else:
    display(comparison.round(1))
""", SOL.get(2, ''))
resources(('pandas: concat', 'https://pandas.pydata.org/docs/reference/api/pandas.concat.html'),
          ('pandas: plotting a bar chart', 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.plot.bar.html'),
          ('The paper (Table 1)', 'https://arxiv.org/abs/2407.06581'))
md("""
**Your answer (A3).** Which tasks improved, and which did not? Is your model better than the best model of
2024? With 20 images per task, one image is 5 percentage points: how big a difference would you trust?

*Write your answer here.*
""")
answer(ANSWERS.get(2, ''))

md("""
## A4 · Look at the mistakes (10 points)

`results[MODEL_ID]` is a table with one row per image: the task, the true answer, the model's reply, the
answer found in it, and whether it was correct. The `row` column is the image's index in `BLINDTEST`, so
`BLINDTEST[row]["image"]` is the image.
""")
turn("""
# Your turn 3 (A4). Show at least six images your model got wrong, with its answers. Then, for each task,
# compare its accuracy with the accuracy of always giving that task's most common true answer.
wrong = None
baseline = None

if wrong is None or baseline is None:
    print("Fill in wrong and baseline, then run this cell again.")
else:
    display(baseline.round(1))
""", SOL.get(3, ''))
md("""
**Your answer (A4).** Is there a pattern in the mistakes: counts off by one, the same answer every time,
trouble with small or thin things? Where is the model barely better than always giving the most common answer?

*Write your answer here.*
""")
answer(ANSWERS.get(3, ''))

# ---------------------------------------------------------------------------------------------
md("""
# Part B · Fresh images (45 points)

BlindTest has been public since 2024, so a newer model may have seen it in training. Here you draw new
images, with the answer known, and change one thing step by step. `two_circles(gap, ...)` and
`two_lines(linewidth, ...)` are two examples; read them in the helper cell, change them, or write your own
for another task (you can adapt code you find; log it). Each returns an item like the BlindTest ones, so
`run()` and `show_items()` work on them.
""")
code("""
# An example of each: four gaps between two circles, and two pairs of lines.
show_items([two_circles(g, seed=1) for g in (-0.2, 0.0, 0.05, 0.3)] + [two_lines(seed=s) for s in (1, 2)],
           [f"gap {g}" for g in (-0.2, 0.0, 0.05, 0.3)] + ["lines", "lines"], per_row=6, size=2.4)
""")
md("""
## B1 · Question and prediction (8 points)

**Your answer (B1).** One sentence: what you change, and what you expect to happen to accuracy, with a
reason. Write it before you run anything in Part B.

*Write your question and prediction here.*
""")
answer(ANSWERS.get('B1', ''))
md("""
## B2 · Make the images (10 points)

At least 5 levels of the thing you change, and at least 10 images per level (use a different `seed` for
each image). Show one example per level.
""")
turn("""
# Your turn 4 (B2). The levels of the thing you change, and the images.
levels = None        # e.g. a list of 5 or more values
fresh = None         # a list of items, at least 10 per level

if fresh is None:
    print("Fill in levels and fresh, then run this cell again.")
else:
    print(len(fresh), "images;", pd.Series([it["groundtruth"] for it in fresh]).value_counts().to_dict())
""", SOL.get(4, ''))
md("""
## B3 · Run two conditions (10 points)

Run the same images in at least two conditions: two models, or one model with two ways of asking (change
the items' `"prompt"`). Keep each result table in `fresh_results`.
""")
turn("""
# Your turn 5 (B3). Run your fresh images in at least two conditions.
fresh_results = {}   # condition name -> the table returned by run()

if len(fresh_results) < 2:
    print("Run at least two conditions into fresh_results, then run this cell again.")
else:
    for name, r in fresh_results.items():
        print(f"{name}: {r['correct'].mean():.0%} correct")
""", SOL.get(5, ''))
md("""
## B4 · The human side (7 points)

Answer a sample of your images yourself (at least 2 per level), and ask at least one other person. Keep it
informal: no names or personal details.

| Level | Images | Me: correct | Other person: correct | Notes |
|---|---|---|---|---|
| | | | | |
""")
md("""
## B5 · The result (10 points)

One plot: accuracy against the thing you changed, one line per condition, with the people's results
marked.
""")
turn("""
# Your turn 6 (B5). Accuracy against your levels, one line per condition, people marked.
people = None        # e.g. {level: fraction correct} from your table in B4

if people is None:
    print("Fill in people and make the plot, then run this cell again.")
""", SOL.get(6, ''))
md("""
**Your answer (B5).** Where does each model break? Did the fresh images give the same picture as BlindTest?
One thing that surprised you, and the limits of your test.

*Write your answer here.*
""")
answer(ANSWERS.get(6, ''))

# ---------------------------------------------------------------------------------------------
md("""
# Part C · Reflection and sources (20 points)

The reflection (half a page) goes in your PDF: are vision models still blind? Fill in the source log as
you work, then copy it into the PDF too.

| Source | Link | How I used it | What I changed |
|---|---|---|---|
| BlindTest | https://huggingface.co/datasets/XAI/vlmsareblind | Part A test images | |
| Assignment 1 starter notebook | (this notebook) | helpers | |
| | | | |

**AI tools.** *Which ones, and what for.*
""")
md("""
## Before you hand in

1. *Runtime → Restart session and run all.* Check that every cell ran and its output is showing.
2. Every **Your answer** cell has your answer, and every prediction was written first.
3. *Share → General access → Anyone with the link → Viewer*, and copy the link for the submission.
""")

main(FILE, private_solutions=True)

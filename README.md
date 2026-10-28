# Day 1 · Intro to Computer Perception

The Day 1 lecture, rebuilt as an animated HTML deck with the animated-talk kit: title first, one idea
per click, cues on screen, and the full script in per-click notes with a presenter view.
Fernanda and Shreya work on it at the same time. Each of you owns your own part files, so you
never edit the same file at once.

## Run it (1 minute)

```bash
python3 -m http.server 8137
```

Then open http://localhost:8137/deck.html.

| Key | What it does |
|---|---|
| → · Space · click | next click |
| ← | back |
| **n** | notes under the slide |
| **p** | presenter window (allow pop-ups) + full screen |
| **f** | full screen |

- `deck.html?only=can-computers` previews one part. `#12` jumps to slide 12. `?blank=0` turns
  off the white lead-in before each slide.
- `script.html` is the whole script on one page, one row per click. Print it with Cmd-P.
- `final.html` is the frozen deck you teach from (see "Pushing" below).
- Stale page? Hard reload: Chrome Cmd-Shift-R, Safari Option-Cmd-R.

## Who owns what

This split is a proposal. Swap rows freely, but keep **one owner per file**.

| Part | Outline slides | Owner | Files |
|---|---|---|---|
| `opening` | 1-2 | Fernanda | `parts/opening.js` |
| `about-fernanda` | 4 | Fernanda | `parts/about-fernanda.js`, `assets/about-fernanda/` |
| `about-shreya` | 5 | Shreya | `parts/about-shreya.js`, `assets/about-shreya/` |
| `ill-posed` | 7 | Fernanda | `parts/ill-posed.js`, `scenes/ill-posed-shapes.html` |
| `visual-system` | 8-9 | Fernanda | `parts/visual-system.js`, `scenes/visual-system-streams.html` |
| `can-computers` | 10-14 | Shreya | `parts/can-computers.js`, `assets/can-computers/` |
| `assumptions` | 15-16 | Shreya | `parts/assumptions.js`, `scenes/assumptions-checker.html` |
| `course` | 18-20 | Shreya | `parts/course.js` |
| `today` | 21-24 | Fernanda | `parts/today.js` |
| shared | | both, agree first | `deck/order.js`, `deck/engine.js`, `deck/deck.css`, `presenter.html` |

To change a file you don't own, copy it to a new name (`scenes/assumptions-checker-v2.html`)
and point your own part at the copy, or ask the owner.

## Working together

### 1. With Git and GitHub (the everyday loop)

```bash
git pull                      # get your partner's latest
# ...edit your own parts, check them at deck.html?only=<your-part>...
git add -A && git commit -m "can-computers: captions before images"
git push
```

Because you own different files, pulls merge cleanly. If a shared file (`order.js`, `deck.css`)
conflicts, talk first, then keep both changes.

### 2. With Claude Code (each of you, in your own session)

Open this folder in Claude Code (desktop app, Code tab). The two skills in `.claude/skills/`
(`animated-talk-deck`, `animate-figure`) load automatically, and `CLAUDE.md` tells Claude the
rules and who owns what. Start each session by saying which part you are working on:

> I'm Shreya. I'm working on `can-computers`. Read CLAUDE.md and feedback/can-computers.md first.

Send feedback the way the kit recommends: a screenshot plus one sentence, naming the slide
number shown bottom-left ("11A: the boxes should appear all at once").

### 3. Notes and to-dos

- `feedback/_deck-wide.md`: style rules that apply to every slide, as dated rounds.
- `feedback/<part>.md`: open questions and to-dos for that part, as checkboxes.
- `TODO.md`: the plan for building the rest of the class (the old "Action plan" slide).

## Writing slides

Each part is a plain JavaScript file in `parts/`. The authoring API is documented at the top of
`deck/engine.js`. The short version:

```js
{
section('Computers');
st(`
  <h1 class="t">Slide title</h1>
  <ul class="frag">
    <li class="b">appears on click 1</li>
    <li class="b">appears on click 2</li>
  </ul>
`, { notes: [
  "Said while only the title shows.",
  "Said after click 1.",
  "Said after click 2."
]});
}
```

- Anything with class `b` builds in on a click. `data-step="k"` groups elements onto one click.
- `notes` has **one passage per click, plus one for the title**. `(draft)` marks notes Claude
  wrote that you haven't approved. `(to write)` marks notes you still need to write.
- `.todo` boxes show content that is still missing. They are meant to look unfinished.
- Real animation (motion, drawing) goes in a scene: a page in `scenes/` shown in an iframe.
  Copy one of the three scenes here as a starting point.
- Color is for data only and means the same thing all class long (`deck.css`): slate-blue = eye
  to V1 and 3D shapes, plum = "what" stream, pine = "where / how" stream.

## Pushing to the final deck

When a part is ready to teach, freeze it into `final.html`:

```bash
python3 deck/publish.py can-computers --by Shreya --note "captions before images"
git add -A && git commit -m "push can-computers" && git push
```

`final.html?gaps=0` hides parts that haven't been pushed yet. Teach from the final deck, never
the working deck. Never edit anything under `final/` by hand.

## What changed from the PowerPoint

- Dropped two leftover template slides (SlidesCarnival "Introduction", "About Us / Lorem ipsum").
- "Perception is ill-posed": a new animation turns one line drawing into several 3D shapes along
  the lines of sight, then collapses them back into the same image. The original figure follows.
- "How the brain solves this": the pathways figure with each path lit in turn (eye to V1, then the
  ventral "what" stream, then the dorsal "where / how" stream). Node positions were detected
  from the image.
- Applications: one tile per click. Cup of cat: caption first, then image (as your notes asked).
  "Not long ago": the detector's boxes one per click, then the sink next to the cup of cat.
- Checker shadow: the image, then rings and the question, then two bars of A's exact gray drawn on
  top, running down into B (no animation beyond that, per Fernanda).
- Course, goals and homework: text turned into click-by-click cues, plus a "what a day looks
  like" flow. Content still to write is in `.todo` boxes.
- Outline slide 17 ("foreshadow project-based course") moved into the notes. The "Action plan"
  slide moved to `TODO.md`.
- The original deck is kept in `reference/original-day1-intro.pptx`. The kit's prompts and
  lessons are in `reference/`.

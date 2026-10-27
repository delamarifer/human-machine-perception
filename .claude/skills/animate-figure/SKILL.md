---
name: animate-figure
description: Build an animated science figure — a self-contained HTML slide that reveals a mechanism, pipeline, or result step by step, driven by click/arrow keys. Use when the user wants to animate a figure, model diagram, method schematic, or result for a talk (CCN, committee meeting, 3MT, lab meeting, defense), or to add a build-in/reveal animation to an existing figure image. Triggers on "animate this figure", "animated slide", "build up the figure", "show the signal flow", "lights on the diagram", "step through the method".
---

# Animate a science figure

Build a **self-contained HTML file** that animates a scientific figure for a talk. No build step, no
server, no dependencies — double-click to open. It must also drop into an existing deck (see the animated-talk-deck template) as a
scene, so it exposes a standard controller hook.

## Before writing anything: pick the pattern

There are two, and the choice is driven entirely by whether a real figure image already exists.

**Pattern A — canvas overlay on a real figure.** Use when there IS a published/exported figure
image (a collaborator's model architecture, a paper panel, an exported Illustrator diagram) and the
job is to show *flow through it*: signal propagating, layers lighting up, gates firing. Draw the
image to a `<canvas>`, then composite glows on top at normalized coordinates. Full recipe in `references/canvas-overlay.md`.

**Pattern B — SVG/DOM step reveal.** Use when the figure is being *authored here* — a method
schematic, apparatus, pipeline, or chart drawn from scratch. Mark elements with `data-step="N"`
and reveal them as the beat counter climbs. Full recipe in `references/svg-steps.md`.

Mixed is fine and common: a canvas apparatus with DOM captions stepping alongside it.

Start from `assets/template.html` — it's a working Pattern A/B hybrid skeleton with the controller,
sizing, and footer dots already wired.

## Non-negotiables (these come from every figure we've built)

**Controller hook.** Every animation exposes a global so a parent deck can drive it:

```js
window.<camelCaseName> = { advance, back, atStart, atEnd, reset, resetToEnd };
```

Decks call `atEnd()` to know when to move past the slide, and `resetToEnd()` when the user steps
*backward* into it. Omitting these two breaks backward navigation — they are not optional.

**Input.** Click anywhere, `→`, `Space`, `Enter` advance. `←` goes back. Never auto-play through
beats: the speaker controls the pace, always. Loops *within* a beat (a pulse, a traveling spark)
are good; a beat that advances itself is not.

**Footer phase dots.** Small dots, bottom-right, filled up to the current beat. This is the only
chrome — no progress bars, no beat numbers, no "next" buttons.

**Aspect-correct letterboxing.** Compute `s = min(W/IMG_W, H/IMG_H)` and center. Never stretch a
real figure. Handle `devicePixelRatio` or it looks soft on a Retina projector.

**Anchor coordinates normalized to [0,1]** over the figure, never raw pixels — so it survives
re-export and resizing. Pull them out into named constants at the top of the script
(`const GNODE_X = [...]`) so they're tunable without hunting through draw code.

**Detect anchors, don't eyeball them.** For an overlay on a real figure, find node positions by
sampling the image for the actual marker colors (green circles, red borders, black gates) with a
throwaway Python script. Eyeballed coordinates drift visibly and cost more iterations than the
detection script does.

## Beat design

A beat is one press. Structure the whole animation as **acts** of a few beats each, and write the
act structure as a comment block above the beat list before writing any draw code:

```js
// ACT 0 — TITLE      (0):   the claim, alone.
// ACT 1 — DEFINITION (1-2): one model, two inputs, same response.
// ACT 2 — THE TEST   (3-7): bring in the brain; compare.
```

Rules that keep beats readable:

- **One idea per beat.** If a beat needs two sentences to narrate, split it.
- **Accumulate, don't replace.** Earlier elements stay on screen, dimmed, as later ones arrive.
  The audience should see the whole argument assembled by the last beat.
- **Sequential within a beat is fine and often better** — "gate → layer, one by one" reads as a
  mechanism, where lighting all seven at once reads as decoration. Stagger with
  `local = clamp01((p - i/n) * n)`.
- **Emphasis is relative.** The active element is bright and pulsing (`0.6 + 0.4*pulse`); everything
  established sits at a constant lower alpha (~0.34). Don't turn things off.
- **Support jumping.** A jump (deck restore, number key) must land in a valid end-of-beat state, not
  mid-transition. Track a `jumped` flag and clamp progress to 1.

Every beat gets a one-line label. In Pattern A, render it as a caption in the lower-left; in a deck
scene, it goes in the `SCRIPT` speaker notes.

## Visual language

Read `references/palette.md` before choosing colors. In short:

- Default is the **committee palette**: white ground, muted slate-blue / plum / pine-green / ochre /
  brick. Not the bright primaries of the 3MT deck.
- Scientific colorbars (NSE cyan→magenta→yellow) stay untouched — never restyle real data.
- **Color must mean something and mean it consistently** across the whole talk. In the attentional-
  gain figure: blue/red = left/right binaural channels (echoing the cochleagram borders), green =
  gains, gold = gates firing, purple = classifier/readout. Reuse the figure's own colors where it
  has them.
- The **neon-on-dark** theme (`#05070a` ground, mint text, glowing chapter colors) is for personal
  tools — timeline, mindmap, dashboard — not for talk figures.
- Fonts: match the deck (the template uses Calibri, falling back to Carlito and Helvetica Neue).

**Glow craft.** Two helpers do nearly all the work, and they are different on purpose:
`elight()` lays an *even, flat* wash over a whole layer (wide radial plateau, soft edge) — it says
"this layer is active." `glow()` is a tight spotlight for a single node. Using a spotlight where a
wash belongs makes a layer look like it has a hot spot. Both are in the template.

Composite mode matters: `'lighter'` for glows on a light figure, but switch to `'source-over'` when
a color must read *as itself* (red on a teal cabinet washes out under additive blending).

## Language

If your field cares about it, use: observer-level terms. "Listeners hear," "the model
represents," "cortex responds" — never "the brain does X."

The slide=script principle applies: **everything on the slide must be said aloud**, captions
included. Keep on-slide text to keywords and short phrases; prose belongs in the speaker notes.
A figure slide that works has figures and almost no text.

## Deck integration

In the animated-talk-deck template, a scene is one line in a part file:

```js
sc('myScene', 'scenes/my-scene.html');   // window.myScene = {advance, back, atStart, atEnd, reset, resetToEnd, getBeat, notes}
```

Give the controller a `notes` array (one passage per beat, beat 0 = the title alone) so the
presenter view shows the right passage on every click. Copy `template/scenes/example-scene.html`
as a starting point.

## Verifying

`file://` is blocked in the in-app browser — serve the folder over HTTP:
`python3 -m http.server` in the directory, then `preview_start` at that URL.

Step through **every beat forward, then all the way back**, and check the console. The two failures
that actually happen: backward navigation landing in a broken state because `resetToEnd` was
missing or wrong, and anchors drifting off their nodes at a different aspect ratio. Screenshot a
couple of key beats for the user rather than asking them to check.

# Day 4 · Image Representations: feedback and open questions

Plan: `plan/course-plan.md`, Day 4. Preview: `python3 -m http.server 8148 --directory .` from the repo root,
then http://localhost:8148/day04/deck.html (`?only=metamers` for one part, `n` for notes).

## Running order (20 slides, 65 clicks plus the white lead-ins)

| Part | Section (min) | Slides |
|---|---|---|
| `opening` | Title | 1 title · 2 question · 3 goal for today (TO DO) · 4 today's plan |
| `homework-review` | Homework review (10) | 5 homework review · 6 from yesterday to today (filters → many responses → what to keep?) |
| `pixels-to-objects` | Pixels to objects (15) | 7 what is a representation · 8 scene: image → pixels → features → textures → objects |
| `metamers` | Metamers (15) | 9 definition · 10 scene: Julesz textons · 11 scene: phase-scramble metamers · 12 matching more statistics (Portilla-Simoncelli, image TO DO) · 13 activity (TO DO) |
| `invariance` | Representation and invariance (20) | 14 scene: invariance (b, shifted b, b turned 180°) · 15 invariances we want · 16 crowding demo · 17 pooling in the periphery (schematic; images TO DO) · 18 metamers in hearing (sounds TO DO) |
| `discussion` | Discussion (5) | 19 discussion question · 20 homework |

Everything in the scenes is generated in the browser from fixed seeds (no third-party images):
- **8** a generated image (sky, brick wall, grass, ball). Pixels = the real values of a marked 6x6 patch;
  features = Sobel gradient magnitude; textures = edge energy per orientation pooled in 32x32 windows;
  objects = the generator's own regions. Last beat: a rough retina / V1 / V2 / IT parallel (Day 1 colors).
- **10** Ls with a patch of crosses, Ls with a patch of Ts (random rotations).
- **11** value-noise "clouds" and shaded "pebbles", each phase-scrambled (FFT amplitude kept exactly).
  Pixel correlation clouds vs scrambled clouds is computed live: r = 0.11.
- **14** distance ||f(x) − f(y)|| / ||f(x)||, computed live. Pixels: b vs shifted b = 1.28, b vs b turned
  180° = 1.39. Amplitude spectrum: 0.00 for both (exact: a shift and a 180° turn leave |FFT| unchanged).

All notes are `(draft)` or `(to write)`; none are Fernanda's wording yet.

## Proposals for the blank fields (for Fernanda to approve)

- [ ] **Objective** (blank in the plan). Proposal: *Understand an image representation as a choice of
  what to keep and what to throw away, and use metamers to find out what a system, a person or a model,
  is invariant to.* Shown as a TO DO on slide 3.
- [ ] **Reading** (blank). From your brainstorm notes: Vision Book Ch. 22-23 and Ch. 27, and the
  plenoptic documentation. I did not check the chapter titles: please confirm the numbers. Optional
  paper for the curious: Portilla & Simoncelli 2000 (sections 1-3). TO DO on slide 20.
- [ ] **Coding practice** (blank). Proposal: 2D FFT in NumPy (amplitude vs phase; swap the phases of two
  photos), Gaussian and Laplacian pyramids, and summary statistics of filter responses (mean, variance,
  orientation energy per window), i.e. exactly the steps of slides 8 and 11. TO DO on slide 20.
- [ ] **Lab** (blank). From your brainstorm notes: pyramid blending, then texture synthesis by matching
  statistics. Proposal, in three steps: (1) phase-scramble your own texture photo and see when it
  survives (slide 11 in code); (2) Laplacian-pyramid blending of two photos; (3) Portilla-Simoncelli
  synthesis of your photo with plenoptic. Project hook (also from your notes): each student brings a
  synthetic texture from their own photo, and the class votes real vs synthetic.
- [ ] **Metamer activity** (15-minute segment, format not in the plan). Proposal on slide 13: in pairs,
  take a photo of a texture, make a version with different pixels (scramble, shuffle patches, or
  resynthesize), and test whether your partner can tell which is real. Option: I can build a small
  in-browser page for this (upload a photo → phase-scramble / patch-shuffle → side by side), so it works
  without Colab. Want it?

## Content to add (TO DO boxes on the slides)

- [ ] 12: Portilla-Simoncelli original vs synthesis. Suggest generating it ourselves with plenoptic on
  the pebbles texture of slide 11 (no permissions needed). Source: to add.
- [ ] 17: Freeman & Simoncelli 2011 metamer pair, and a Rosenholtz mongrel. Source: to add (paper figures
  need permission, or we generate our own).
- [ ] 18: sound examples, original vs synthetic sound texture. Source: to add (the McDermott lab
  site has examples; you know best what we may use).
- [ ] 5: which homework questions to go over.

## Questions for Fernanda

- [ ] Citations used on screen; please check each: Julesz 1981 (textons); Portilla & Simoncelli 2000;
  Freeman, Ziemba, Heeger, Simoncelli & Movshon 2013 (V2 and texture); Bouma 1970 (crowding);
  Freeman & Simoncelli 2011; Balas, Nakano & Rosenholtz 2009 (mongrels, crowding);
  McDermott & Simoncelli 2011 (sound textures). In the notes only: Julesz's second-order conjecture.
- [ ] Slide 10: is "+ pops out among Ls, T does not" the right Julesz demo to show, and is the
  textons sentence in the notes (crossings, terminators) how you would put it?
- [ ] Slide 17 notes say Freeman & Simoncelli's metamers appear when pooling grows at about the rate of
  V2 receptive fields. Correct wording?
- [ ] Model metamers (e.g. metamers of trained networks that people do not see as the same) would make a
  strong closing for the invariance segment and a bridge to Day 5. Do you want a slide, and how do you
  want to handle citing your own lab's / your own work?
- [ ] Color metamers: the notes on slide 9 mention that the word comes from color vision. Want a slide
  on it (cone responses)? I did not add one, to avoid inventing curves.
- [ ] Shreya's brainstorm for this slot was neural networks / PyTorch (now Day 5). Is she co-teaching any
  part of Day 4? Owners are "to decide" in every part header.
- [ ] Timing: 65 minutes of segments in the plan. The invariance segment has 5 slides for 20 minutes and
  the metamers segment includes the activity in its 15 minutes, which looks tight.

# Day 3 · Image Formation + Processing: feedback and open questions

Plan: `plan/course-plan.md`, Day 3. All notes are `(draft)` or `(to write)`; nothing is in Fernanda's or
Shreya's words yet.

## Round 1 · 2026-10-28 · first build (day03 session)

### Slide list (17 slides, 70 clicks)
| # | Part | Slide | Kind |
|---|---|---|---|
| 1 | opening | Title | static |
| 2 | opening | Where does an image come from? | static |
| 3 | homework-review | Homework review (Day 2 homework) | static, TO DO: how to run it |
| 4 | image-formation | From light to numbers | static flow |
| 5 | image-formation | The pinhole camera | scene `pinhole.html` |
| 6 | image-formation | An image is an array of numbers | scene `pixels.html` |
| 7 | image-formation | Color: three kinds of sensor | static, TO DO: cone figure |
| 8 | convolution | Convolution: slide, multiply, add | scene `convolution.html` |
| 9 | convolution | Convolution, mathematically | static |
| 10 | convolution | Why convolution? (linear + shift-invariant) | static |
| 11 | convolution | Another view: frequencies | TO DO: Fourier, keep or move? |
| 12 | receptive-fields | Mach bands | scene `mach-bands.html` |
| 13 | receptive-fields | The Hermann grid | scene `hermann-grid.html` |
| 14 | receptive-fields | Receptive fields in V1, filters in a computer | scene `gabor.html`, TO DO: H&W figure |
| 15 | lab | Lab: convolution from scratch | static, TO DO: Colab link |
| 16 | filters | Blur, sharpen, edges | scene `filters.html` |
| 17 | filters | Homework | static |

Everything in the scenes is computed in JS (projection and disk blur, pixel values, convolution,
difference of Gaussians, Gabor filters and responses, Sobel). The pictures (house, bands, grids, disk)
are drawn in code, so there are no third-party images yet.

### Questions for Fernanda
- [ ] **Order**: the plan puts the 45-min lab before "Edge detection + sharpening + blur" (15 min).
  The filters slide (16) would make a good lead-in to the lab. Swap them, or keep the plan's order?
- [ ] **Reading**: the plan says Ch. 5-7 for Day 3, but Day 2's homework already assigns Ch. 5-7, and the
  brainstorm mentions "Lecture 3 + Lecture 4, Ch 15-18" (Shreya: Ch 15-16). Which chapters for Day 3?
  (Slides 3 and 17 say chapters 5 to 7 for now.)
- [ ] **Fourier** (slide 11): today, or in the problem set / a later day? It is a TO DO box for now.
- [ ] **Homework review** (slide 3): how do you want to run the 10 minutes?
- [ ] **Project line** on the homework slide: "a filter bank over your dataset" is from your brainstorm
  note. Keep it as homework, or announce it later?
- [ ] **One real photo** for slide 16 (blur/sharpen/edges)? A photo of AIMS or of the class would be better
  than the drawn house. Send one you have the rights to, and it drops in.
- [ ] **Owners** for the Day 3 parts (all say "Owner: to decide").

### Sources to add or check (never invented; flagged on the slides)
- [ ] Slide 7: a figure of the three cone sensitivities (L, M, S). source: to add.
- [ ] Slide 14: a Hubel & Wiesel figure (bar orientations and spikes). Needs a licensed or public image. source: to add.
- [ ] Slide 14 cite: Hubel & Wiesel (1959), "Receptive fields of single neurones in the cat's striate
  cortex", J. Physiol. 148:574-591. To check before class.
- [ ] Slide 14 cite: Jones & Palmer (1987), Gabor fits to cat simple cells, J. Neurophysiol. To check.
- [ ] Slide 13 cite: Geier, Bernáth, Hudák & Séra (2008), "Straightness as the main factor of the Hermann
  grid illusion", Perception. The slide says people report the spots mostly vanish with wavy streets; that
  claim comes from this paper. To check (and try it live: does the room agree?).
- [ ] Slide 12 notes: Mach described the bands in the 1860s (1865). To check.
- [ ] Slide 14 notes: "networks trained on images often learn Gabor-like first-layer filters" (e.g.
  Krizhevsky et al. 2012). In the notes only, no figure. Add a figure later if you want one (source: to add).
- [ ] Michael Bach's illusion pages and the Adelson gallery (in the plan's human connection): not used yet.
  Mach bands and the Hermann grid are generated instead. Want a link to Bach's pages on a slide?

### Choices I made (say if you want them different)
- The convolution scene computes **correlation** (no flip), as PyTorch does; slide 9 then shows the flip.
- Model parameters (center/surround sizes, Gabor sizes) are chosen for illustration and say so in the notes.
- Slate-blue (`--early`) is used for the retina/V1 receptive fields and the center-surround model curve,
  matching Day 1's "eye to V1". R/G/B tints appear only as data (filter and channel colors).

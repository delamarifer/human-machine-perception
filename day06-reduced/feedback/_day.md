# Day 6 reduced · Data, Generalization and Adaptation: feedback and open questions

Built from the Google Slides deck Fernanda and Shreya reduced (fileId `1-OynnZhoK9D_oMjT_CGkjYtwdNXkHZi0RQjO_ZAimUs`, PDF export of
2026-11-09, 59 pages). Shreya's `day06/` is untouched. Preview: `python3 -m http.server 8146` from the repo root, then
`http://localhost:8146/day06-reduced/deck.html` (one part: `?only=metrics`). No speaker notes.

Fernanda's instructions: "We want the agents to work with the content we are giving it but we want it to focus on the intuitive
explanations using images. If something is complex it can just be animated within the same slide (no new slides) and no random text
that we are not asking for." and "Full sentences that get the point across in only transition slides would be good, otherwise for
technical content, do an animation that explains the statistical or the math concept but all within the slide it was included in."

## Round 1 · 2026-11-09 · first build

68 HTML slides, 302 clicks. Google page → HTML slide:

| Part | Google pages | HTML slides |
|---|---|---|
| start (unchanged from day06: quiz, announcements, title) | 1 (blank; Shreya's title slide stands in) | 1-3 |
| failures | 2-6 | 4-8 |
| more-data | 7-13 | 9-15 |
| labeling | 14-24 | 16-26 |
| check-data | 25-34 | 27-36 |
| splits | 35-39 | 37-41 |
| metrics | 40-44 | 42-46 |
| llm-eval | 45 (two slides, her comment), 46, 47 | 47-48, 49, 50 |
| adapt | 48-55 | 51-58 |
| future | 56-59 | 59-62 |
| lab (unchanged from day06) | | 63-68 |

The Google deck changed after the brief was written (55 slides then, 59 pages now): a blank first page, the NeuroAI Turing Test page
(p47), "Pre-training vs fine-runing" (p50), "More slides of fine-tuning" (p51), and a 13th comment on "Adaptation methods" asking for an
intro slide. The build follows the live deck. That comment is met on p49 itself, so no slide was added.

### Checked
- Every click walked forward and back at 1280x720, each part at 1.8 s per click; console and network clean; no overflow (the two flags on
  slide 4 are the zoomed and rotated photo inside its clipped frame). Whole deck also walked with the white lead-ins, in order.
- A separate reviewer, given the code and the Google deck but not the builders' conclusions, compared every page: 0 added or missing
  slides, 40 items raised. The 15 must-fix items and the fixable decision items are done. What remains is below.

### Text changed from her slides
- Typos fixed: "fine-runing" → "fine-tuning"; "Evaluating LLMS" → "Evaluating LLMs"; "here is two of them" → "here are two of them" (p2);
  "Rubiks" → "Rubik's"; "tennis strucks" → "Tennis strokes"; "Huggingface" → "Hugging Face".
- Moved: her p36 sentence "We know why evaluation is important for any real-world application" is now on the p35 transition.
- Dropped as an apparent stray paste: "Add noise across" at the start of p41.
- p51's title is a note to herself, so it is replaced by the book's wording: "Finetuning subparts; learning from a teacher".
- p47 has no title on her slide; the paper's title is used.

### Questions for Fernanda (or Shreya)
Content:
- [ ] **p18-23 (labeling).** Her pages are a title and an empty bullet. They are filled from day06's checked material, figures and labels
      only. Should they be filled at all, and is that what each title meant ("limited resources" = a fixed budget? "trainers" = labelers)?
- [ ] **p24 Synthetic generator.** Only her three points with icons. What should it show?
- [ ] **p47.** What should be shown or said? Her screenshot stops mid-abstract.
- [ ] **p51.** Is the title above OK?
- [ ] **p58.** Her comment is cut off at "direct quotes from the"; read as "from the Scale post". Right?
- [ ] **p58, "5000 hours".** Unsourced in the Scale post (day06 Round 14). It appears only inside the attributed quote. Keep or remove?
- [ ] **p59.** The two discussion questions are draft wording.
- [ ] **p38.** "most common reason published results don't replicate": no source found for the ranking. Kapoor and Narayanan (Patterns 2023)
      say "one of many causes". The credit says source to add. Keep or soften?
- [ ] **p44.** Are softmax, energy and distance what "Familiarity scores" meant?
- [ ] **p41.** Was "Add noise across" a stray paste?
- [ ] **p33.** Read as each label tied to one condition (cars by day, people at night). Or the whole dataset in one condition?
- [ ] **p30.** Should the answers (signer, player, person) appear, or stop at the question? Title ends "train/validation/": add "test"?
      Is "FocusLens" fine on the public site?
- [ ] **p32.** Did "bring it in" mean day06's five questions?
- [ ] **p34.** No single source covers the procedure. Gebru (datasheet), Barz and Denzler (copies) and Northcutt (labels) cover steps 6, 3, 4;
      steps 1, 2, 5 say source to add.
- [ ] **p46.** Only "Baseline" is on her page; the other five items come from day06.
- [ ] **p10.** What was the empty second bullet for?
- [ ] **p12.** Restore any dropped tools as cues (stereo matching, superpixels and RANSAC, guided filter, modern equivalents)? Her line says
      CARLA is "Level 5" but her p11 ladder has CARLA at 3. "No real data" is also not quite so: the paper calibrates MuJoCo on the real robot.
- [ ] **p40.** 12 clicks on one slide: keep all, or cut the harmonic-mean bars?
- [ ] **p55.** "failures people can label" for Human feedback loops has no book source. Four rows say source to add.
- [ ] **p15, p19.** Are these the companies she wants? Only those whose own site confirms the fit are shown: Scale AI, Appen, Defined.ai, iMerit.
- [ ] **p17.** How is the tasker quality score computed? Shown with no number; no source found.
- [ ] **p23.** The 34 s → 14 s bars from Segment Anything remain; cut if less is wanted.
- [ ] **Lab.** Copied unchanged, so it still says "Part 2" and "Part 3 and Part 4", which no longer match this deck.

### Before this goes public (license doubts; everything is credited on the slide)
- [ ] Shotton et al. Fig. 2 (IEEE, CVPR 2011): copyrighted, no open license.
- [ ] arXiv 1910.07113 Fig. 3 and the first page of arXiv 2502.16238 (p47): arXiv non-exclusive license only, which grants us no reuse.
- [ ] CLEAR Fig. 1 (p56): the project page says CC BY, but does not say that covers the paper's figure.
- [ ] Company logos (p15, p19): trademarks, identification only. Label Studio and Prolific logos are lifted from their site headers.
- [ ] Book figures (CC BY-NC-ND 4.0): shown whole, but p4 and p49 draw rings over them. A strict reading of ND could object.
- [ ] The fogged Castro photo (p12) is an adaptation of a CC BY-SA 4.0 image, so ShareAlike applies to it.
- labelerrors.com images and Cityscapes photos are deliberately not used (no clear license; no redistribution). The Scale post's photo of a
  person teleoperating is left out (identifiable, no stated license).

### Could not verify
- StatQuest video: read from YouTube auto captions, not checked against the audio.
- That `continual_learning_demo.py` still reproduces `cl_results.json` was checked in day06 Round 17, not rerun here.
- The Ego4D figure is no longer on the slide. SAM timings and WLASL figures come from day06's checked material.

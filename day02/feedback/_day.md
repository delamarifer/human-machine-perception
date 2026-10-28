# Day 2 · Seeing with Machines: feedback and open questions

Plan: `plan/course-plan.md`, Day 2. Images and model outputs: `day02/assets/SOURCES.md`.
Every notes passage Claude wrote is marked `(draft)`; `(to write)` is yours to fill.

## Round 1 · 2026-10-28 · first build (Claude, day02 session)

### Questions for Fernanda
- [ ] **Spine photo.** The deck uses a Commons photo of a coffee cup (CC BY 2.0). Would you rather use one of
      your own phone photos (or the Day 1 homework photo, "take a picture of xxx")? If so, run
      `python day02/assets/pipeline.py <photo> day02/assets/one-photo` and update the numbers in
      `scenes/one-photo-stack.html` (const `R`) from `result.json`.
- [ ] **Human vs machine photo.** A brass elephant statue: ResNet-18 says triceratops 28.7%, cowboy boot 26.6%;
      "Indian elephant" is 9th. I picked it out of eight Commons photos because the model gets it wrong. OK, or
      do you have a favorite failure? The notes say on the record that it was picked, not random.
- [ ] **Model choices.** ResNet-18 (ImageNet-1k V1) and Depth Anything V2 Small, both chosen to be small and
      CPU-friendly (the plan's "keep models small"). Fine, or other models?
- [ ] **Plum for the classifier bars.** Plum means "what" (ventral stream) on Day 1; I used it for "what is in
      it?" (classification). Keep the link, or keep data colors for the brain only? (Depth stays grayscale,
      the model's raw output.)
- [ ] **Alternatives slide (6).** Pillow, scikit-image, timm, the HF image-classification pipeline, MiDaS via
      torch.hub, Streamlit. These are my picks; the plan only says "alternatives on a closing slide". Edit freely.
- [ ] **Homework review (3).** The plan's Day 1 homework (Ch 1-4, Python tutorial, a photo) differs from the
      Day 1 deck's homework slide (finish lab, PSET at end of week, find an application, NumPy). Which did
      students get? And what do you want to review?
- [ ] **Week 1 PSET (12).** The plan has no PSET content, due date or submission method.
- [ ] **Project time.** The plan says "give them a few minutes to keep brainstorming; we present feedback from the
      pitches", but there is no row for it in the minutes table. I put it in the PSET segment (slide 13).
- [ ] **"Measurement vs perception, as a tool" (11).** The plan names it but doesn't say what the takeaway is.
      Optional idea, not on the slides: texture bias (Geirhos et al., ICLR 2019) as one reason a model misses a
      decorated statue. Only if you want it.
- [ ] **Demo (7).** Where it runs, whose photo, and the offline fallback (plan: pre-download models to a shared
      drive, check the computer/GPU at AIMS).

### What is real, what is schematic
- Top-5 bars, the shapes (853 × 1280 × 3, 224 × 224 × 3) and the depth map are real outputs
  (`assets/*/result.json`, `assets/one-photo/depth.png`).
- The app window in the scene (beat 7) is a schematic of `assets/app.py`, not a screenshot.

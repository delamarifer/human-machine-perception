# Day 2 · Computer Vision: Promise, Pitfalls, and Your Place in It: feedback and open questions

Plan: `plan/course-plan.md`, Day 2. Images and model outputs: `day02/assets/SOURCES.md`.
Every notes passage Claude wrote is marked `(draft)`; `(to write)` is yours to fill.

## Round 2 · 2026-11-02 · rebuilt as "Motivation and limitations" (Claude, day02 session)

New order from Fernanda's outline of today: syllabus (5) → motivation (30) → projects (10) → simple system lab
(50-60) → research vs building (5) → how to read a paper (5) → paper review (10, moved to the end) → homework (2).
That adds up to 117-127 minutes. The Round 1 one-photo app parts are in git history (commit 0192428). The scene
and the elephant are reused here.

### Demos researched (all links answered on 2026-11-02)
Each one sits under the syllabus week that covers it (syllabus.html "Three weeks"):
- Week 1 · VGGT, Meta AI + Oxford, CVPR 2025: photos → cameras, depth, 3D points, "typically under a second"
  (repo README). Live demo: https://huggingface.co/spaces/facebook/vggt
- Week 2 · DINOv3 → Canopy Height Maps v2, Meta + World Resources Institute (blog 2026-03-10): DINOv3 pretrained
  on satellite images; open tree-height maps worldwide. https://ai.meta.com/blog/world-resources-institute-dino-canopy-height-maps-v2/
- Week 2 · AlphaEarth Foundations, Google DeepMind 2025: optical, radar, 3D laser and climate data → 64 numbers
  per 10 m of land, annual 2017-2024, in Earth Engine. https://deepmind.google/discover/blog/alphaearth-foundations-helps-map-our-planet-in-unprecedented-detail/
- Week 3 · SAM 3, Meta, Nov 2025: text prompt → detect, segment, track in images and video; open; Playground.
  https://aidemos.meta.com/segment-anything
- Week 3 · MedGemma 1.5, Google, Jan 2026: open; CT/MRI volumes, whole-slide pathology, plus text.
  https://developers.google.com/health-ai-developer-foundations/medgemma
- Week 3 · Gemini Robotics 1.5, Google DeepMind, Sep 2025: plans in steps, then acts. The laundry and recycling
  clips come from news coverage; check them in the blog videos before class.
  https://deepmind.google/discover/blog/gemini-robotics-15-brings-ai-agents-into-the-physical-world/
- Week 3 · Genie 4, Google DeepMind: interactive world model, research preview (waitlist).
  https://deepmind.google/models/genie/
- Also current, not on slides: video generation (Sora's app closed in April 2026; Kling 4.0, Oct 2026; Veo 3.1),
  Physical Intelligence π0.7 (Apr 2026), Depth Anything 3, YOLO26, RF-DETR.

### Limitations: numbers come only from the papers
- Our ResNet-18 run on the elephant: `assets/human-vs-machine/result.json`.
- Vision language models are blind (ACCV 2024; arXiv 2407.06581 v6): four VLMs average 58.07%; the best,
  Claude 3.5 Sonnet, gets 77.84%; the human expectation is 100%. These are 2024 models; the notes say so.
- DeVries et al., CVPR Workshops 2019 (Dollar Street): six systems do worse on household items common in
  low-income countries. The abstract gives no single number, so the slide shows none.
- Geirhos et al., ICLR 2019: texture bias in ImageNet CNNs, shape bias in people; Stylized-ImageNet helps.

### Survey (14 responses)
Only aggregate counts are on the slides (familiarity, focus). The interest cards are our grouping of the
free-text answers, with no names and no quotes. The raw CSV is not in the repo, because it has names. Even
aggregates go out on a public site.

### Live websites on slides (Fernanda, 2026-11-02)
- Slides 3 and 4 show `syllabus.html` itself, opening at Weeks and at Grading. Scroll with the trackpad or ↑/↓;
  → / ← still change slides after a click inside the page.
- Embedded demos: Vision language models are blind (16B) and Dollar Street (17B). Both need internet in class.
  Inside an outside site, the deck's keys stop until you click on the slide outside the site; that click moves on.
- Can't embed (the sites refuse: X-Frame-Options DENY or frame-ancestors): every Meta page (SAM 3 Playground,
  DINOv3, Canopy Height), every DeepMind/Google page (AlphaEarth, MedGemma, Gemini Robotics, Genie), and the
  book's 3D demo (SAMEORIGIN). Those stay as links that open a new tab.
- [ ] VGGT's live demo (facebook-vggt.hf.space) allows embedding, but it showed a 500 error today. Re-check before
      class; the line to embed it again is in motivation.js.

### Named by the syllabus outcomes (Fernanda, 2026-11-02)
- Sections follow the Today slide: Syllabus, Motivation, Project, Lab, Research and papers, Homework.
- Each slide that teaches a Day 2 outcome shows it under its title, in the syllabus wording ("By the end, you
  can …" / "In the lab, you will …"): 6 (do well, fail), 20 "Why we look to human vision", 27 "Two project
  tracks", 30 (the lab), 38 "A research question, or a building project?", 39 "Read a paper efficiently", 40 (Pizlo).
- [ ] If the syllabus wording changes, these lines don't update by themselves (they are text on the slides).

### Demo slides: Before → Now, videos, texture test (Fernanda, 2026-11-02)
- Each demo slide has a takeaway on click 2: what it does that earlier systems couldn't ("Before · … / Now · …"),
  from the makers' descriptions and papers. Week tag moved to the top right (click 3).
- Makers' videos on the slides: VGGT (project page mp4), Gemini Robotics 1.5 (DeepMind's YouTube, "Using agentic
  capabilities"), Genie 4 (DeepMind's page). SAM 3, DINOv3, AlphaEarth, MedGemma: no embeddable official video.
- Slide 19 "Texture, not shape?": Geirhos's finding, then our own test with ResNet-18 (patches shuffled). Real outputs
  in assets/shuffle/; the result is mixed (espresso disappears; the elephant's guesses turn to sock, cowboy boot,
  quilt), and the notes say it is a probe, not a measurement.
- [ ] Check the Before lines read the way you'd say them, especially MedGemma ("first open model of its kind" is Google's claim).

### Questions for Fernanda
- [x] Learning outcomes in orange (#c2410c), Day 2 only (day02/deck.html). Orange now means "learning outcome"; if
      other days adopt it, it belongs in deck.css and _deck-wide.md (shared files, coordinator's call).
- [ ] "Why we look to human vision" (slide 22) now gives three reasons, each the Vision Book's own (Ch. 1): people
      still see better (the elephant), many tools came from the brain (RGB, filters, neural networks, attention),
      perception shows what to build (Kanizsa triangle, drawn here). Your own framing can replace the notes.
- [x] "Why projects?" (slide 23): your wording, centered, with the idea → progress path drawn on click 1.
- [x] The "One photo through the whole stack" scene is removed from the deck (the file stays in day02/scenes/, unused).
- [ ] Emmert's law (slide 21, copied from Day 1's assumptions scene): the Day 1 feedback asks whether to keep the title,
      since Emmert's law is strictly about afterimage size vs distance and the figure shows size constancy.
- [ ] Demo slides now show "What it does" / "What it enables that we could not do before" (two sentences each).
      Media: VGGT, Gemini Robotics, Genie (makers' videos); DINOv3 (the live Canopy Height map on Earth Engine);
      AlphaEarth, SAM 3, MedGemma (the makers' own published images, loaded from their sites and credited).
- [x] Google Classroom slide replaced (Fernanda, 2026-11-02) by "Handing in, and staying in touch": assignments through
      Google Forms (the Day 1 questionnaire embedded live as the example) and a show of hands on Slack / WhatsApp /
      email / other.
- [ ] Confirm every assignment (write-up, slides too) goes through Forms; what channel the class picks, and who sets it up.
- [x] Survey on the public site: grouped data only, never individual answers, except the project ideas (Fernanda, 2026-11-02). Slides: two aggregate charts, an anonymous paraphrased list of the project ideas, and the grouped cards.
- [ ] Order: your outline today puts project expectations before the lab. The plan's "opening order" from
      earlier today puts the paper discussion at minute 5-15 and the project plan after the lab. I followed
      today's outline.
- [ ] Syllabus: syllabus.html (3 weeks) and the brainstorm PDF's day table (3D + motion, robotics + RL,
      AI + society days) differ. The slides follow syllabus.html. Which one is current?
- [ ] Demos: these seven, or swap some? For each, which clip to play (TO DO box on each slide)?
      Live demos need internet in class.
- [ ] Why look to humans (slide 19): your framing (TO DO box). The three cues are drafts.
- [x] Project templates: the slide embeds templates.html (added to main 2026-11-02).
- [ ] Example projects: which of our projects to show, one per track (TO DO slide).
- [ ] Simple system: minutes for Phase 1 vs Phase 2 (50-60 in total).

### Simple system lab (Fernanda, 2026-11-02): condensed, full circle, Phase 2
- Phase 1 has 3 board/notebook steps (sections 1-3, 4-5, 6). Then the reconstruction from near the camera (30A),
  then from behind (30B): "the back is missing", with a link to the book's interactive demo
  (visionbook.mit.edu/simplesystem.html). Both views come from our own run of the notebook code
  (assets/simple-system, SOURCES.md).
- Then the pause: "What do you think would give these systems a better world model?" (pairs).
- Phase 2: four kinds of answer, each testable in the box world, where the true heights are known:
  better assumptions (boxes are closed, so fill in the back; stacking), more data (a second view), learned
  (many rendered worlds), borrowed (a pretrained depth model on the box image). The floating box (section 7) is
  the first test.
- [x] Drag-to-rotate 3D in the notebook: done by the Day 1 Colab session (commit 22f21b6 on claude/colab-day1-8c736e,
      not merged yet). Section 6 has show_3d_interactive (Plotly, every pixel) and a talk-it-over "Your turn 6"
      on what is missing. Slide 30B points students to it.
- [ ] Phase 2 notebook cells don't exist yet. Which ideas do we test in class? My pick: "boxes are closed"
      (fills in the back; a few lines on top of `reconstruct`), plus the pretrained depth model on the box image
      (both are quick). A second view and learning could be homework extensions.
- [ ] Paper review: are the three Pizlo questions OK? Pairs or whole class?
- [x] Homework reading: the metamers primer (metamers.html), linked from the homework card with its own figure.
- [ ] Response paper for today: is the Pizlo question the one on the response paper, or tomorrow's paper?

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

### For the Day 2 lab (`notebooks/day02-lab.ipynb`)
- [ ] Students' own phone photos: upload in Colab, fine? Gradio `share=True` makes a temporary public URL so a
      classmate can open the app; OK for student photos, or keep it local (`share=False`) and swap laptops?
- [ ] GPU at AIMS, and a shared drive of pre-downloaded weights (ResNet-18 ~45 MB, Depth Anything V2 Small).

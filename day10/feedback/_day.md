# Day 10 (2026-11-13), owner: Shreya

One-hour activity: reverse-engineer Refik Anadol's work, then build a mini version in Colab.
Built from Shreya's Google Slides outline and her comments on it (2026-11-12). No speaker notes (her preference).
Preview: `python3 -m http.server 8148`, then `day10/deck.html` (20 slides).

## Round 1 (2026-11-12)
- Slides 1-3 follow Shreya's comments:
  - Slide 2 embeds the studio's Machine Hallucination: NYC video (Vimeo 450313024, 5 min 36 s).
  - New slide 3, "A few more of his works": Unsupervised (Vimeo 778348607), Large Nature Model: Rainforest (952896412),
    Echoes of the Earth: Living Archive (952230679). All are the studio's own uploads.
  - Slide 4 poses the pipeline as a question: In (photos), Out (a film on the walls), "What happens in between?", then the six stages one per click.
- Workbook: `workbook/mini-machine-hallucination.ipynb` (4 TODOs), solutions and teacher notes in `workbook/solutions/`
  (edit `build.py`, then run `python3 day10/workbook/solutions/build.py`). Whole notebook runs in about 50 s on 2 CPU threads.

## Round 2 (2026-11-13): a notebook built from the class labs
- Shreya: the first notebook "doesn't really use that much content from class". New notebook:
  `workbook/doodle-city-from-class-labs.ipynb` (5 TODOs), built by `workbook/solutions/build_labs.py`.
  Quick, Draw! doodle city (9 city categories plus face and yoga as the people). Stages reuse Day 3 (Sobel, partner test),
  Day 4 (the CNN), Day 5 (CLIP zero-shot, RSA), Day 6 (check the data), Day 7 (fine-tuning), Days 8-9 (VAE, GAN, walks, guidance).
  Measured results per card are in the solution notebook's teacher notes. About 75 s on 2 CPU threads once the downloads are cached.
- The deck's activity slides (HTML and Google Slides) now use this notebook and its cards.
- Course column fixed in both decks: Day 6 was data, not optical flow or depth; homographies were never taught ("not covered").
- The earlier notebooks (mini-machine-hallucination, doodle-city-hallucination) are kept but no longer linked.

## Open questions
- [ ] Run the class-labs notebook on a Colab T4 GPU once: the DCGAN default there is untested (547 s on a CPU).
- [ ] Card A: fine-tuning did worse than from scratch in our run (58% vs 76% judged Eiffel Tower by CLIP). Keep as a discussion point, or change the setup?
- [x] Pushed to main (66dfd93); the Colab link on the Step 2 slide works.
- [ ] Vimeo players show black in the Browser pane screenshots; the NYC player plays when opened directly. Check them in a real browser.
- [ ] Unsupervised: the Google Slides outline says 2021 (the NFT release); the MoMA installation ran 2022-23. The HTML deck says 2022.
- [ ] The studio also has a "Data Process Reel" (Vimeo 943452720, 2 min 54 s) showing how they build works. A possible reveal before the deep dives.
- [ ] Should the solutions be in the public repo, as for Day 9?

## Round 3 (2026-11-13): Fashion-MNIST, one notebook for everyone
- `workbook/fashion-pipeline-from-class-labs.ipynb` (built by `workbook/solutions/build_fashion.py`) is now the class notebook; the deck links to it.
  Fashion-MNIST from Hugging Face, shirts removed. No cards, knobs or groups; no day labels inside the notebook (Shreya).
- Added: following the leaked shirts into the generated images, a copying check, and Stage 8, the pipeline as a plan of tools
  (sets up the model-to-system intro and Fernanda's LLMR section).
- CLIP sees the images inverted (dark on white, like a catalog photo) and compares plain names with descriptions:
  shirts caught 7% -> 32%. Measured results are in the solution's teacher notes. About 125 s on 2 CPU threads, warm.
- The doodle notebooks (build_labs.py, build.py) are kept but not linked.

- Renamed (2026-11-13, Shreya): the Fashion-MNIST notebook is now `workbook/generative-system-lab.ipynb` (solutions: `generative-system-lab-solutions.ipynb`).
- Moved to private/day10-unused/ (git-ignored) on 2026-11-13, Shreya's request: the unused labs (mini-machine-hallucination, doodle-city-hallucination, doodle-city-from-class-labs), their solutions, and build.py / build_labs.py. build_fashion.py now stands alone.

## Round 4 (2026-11-13): the HTML deck follows Shreya's edited Google Slides
- New order (17 slides): title "What if a machine could dream?", the NYC video, Who is Refik Anadol?, What does he actually make?,
  What does machine hallucination mean?, Reverse-engineer the system, How do outputs become an artwork?, From archive to artwork,
  Lab: Become a generative artist, the discussion, then Work 2, Work 3, Step 1, One pipeline, Why alive, Whose data, Sources.
- Her comments applied: "Who is" as a few bullets; "What does he make" merged with the video gallery, titles only;
  machine hallucination as 2 questions with animated answers (her text, simple English).
- Images downloaded from her slides into day10/assets/ (JPEG).
- Parts: new system.js, lab.js, discuss.js; Work 1, Step 2 and Report back removed (deleted in her slides).

## Open questions (Round 4)
- [x] "What does he actually make?" now shows three titled works: her Unsupervised image (matched to the studio video), Large Nature Model: Rainforest and Echoes of the Earth. Her two unmatched images are in private/day10-unused/assets/
- [x] Lab slide: the unfinished line "At each stage, think through ..." was removed (Shreya).
- [ ] "Reverse-engineer the system" and "How do outputs become an artwork?" are title-only in the Google Slides; shown as statement slides.
- [ ] The slides after the discussion (Work 2, Work 3, Step 1, pipeline, wrap-up): keep, cut, or move?

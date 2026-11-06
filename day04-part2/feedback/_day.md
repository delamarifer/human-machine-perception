# Object Recognition lecture: feedback and open questions

Day 4, Part 2: a one-hour deck from Torralba, Isola & Freeman, *Foundations of Computer Vision*, Ch. 50.
Owner: Shreya. Its own page, `day04-part2/`, next to the Day 4 deck in `day04/`, which is unchanged.
Preview: `python3 -m http.server 8150` from the repo root, then http://localhost:8150/day04-part2/deck.html.

All notes are `(draft)`. Scene images are generated in the browser; no book figures are copied.

## Changed from the outline after checking the chapter
- Geons: the chapter says 36, not "about 36". Non-accidental properties also include curvature.
- "Sliding window" is "window scanning" in the chapter.
- Selective search is "loosely motivated" by attention, not a mirror of it. The citation is Treisman & Gelade, Wolfe, Koch & Ullman.
- Removed: "the authors deliberately do not survey architectures because lists go out of date". That is not in Ch. 50.
- Removed the "surrogate" wording: the chapter says 0/1 error is not differentiable and derives cross-entropy as the negative log-likelihood.
- Legacy of geons: the chapter says parts are an ingredient of many systems and cites Fischler 1973 and Felzenszwalb 2010. It does not credit Biederman with influencing them, so the slide does not either.

## To check
- [ ] Stuff vs. things as a continuum (two trees, a forest) and the annotation limit are not in the chapter as far as I could check. The notes say they are ours. Keep them?
- [ ] Citation details for Fischler & Elschlager (1973) and Felzenszwalb et al. (2010): inferred from the chapter's citation keys, reference list not read.
- [ ] Figures 50.2, 50.8 and 50.25 are replaced by our own drawings. Swap in the originals if you have permission.
- [ ] Toy numbers: the scores and box offsets in the NMS and precision-recall scenes are made up and labeled toy on screen. IoU, matching, precision, recall and AP are computed.
- [ ] The mental rotation curves are schematic, labeled on screen. Add the published data if you want real values.

## Real photos and outputs (added after the first draft)
Everything comes from `day04/assets/` and is referenced in place, not copied. Numbers load from `day04/assets/result.js`.
- Tom Mboya Street, Nairobi: Bahnfrend, CC BY-SA 4.0
- Kampala boda: ObbyK, CC BY-SA 4.0 · Kampala pipes: Simisa, CC BY-SA 3.0
- CT: Medical Segmentation Decathlon, CC BY-SA 4.0 (case spleen_56, validation) · Cairo: ESA, CC BY-SA 3.0 IGO
- Full links, model versions and settings: `day04/assets/SOURCES.md`.
- [ ] The Cairo tile shows a task only: no model was run on it, and the notes say so.
- [ ] The truck box remark on the pipes slide is by eye; the box itself is x 215-1102 of 1280.
- [ ] "Is this a car?" still uses sketches. Real photos of the three cases would have to be downloaded.

## Chair photos (downloaded with Shreya's OK, 960 px Commons thumbnails, no other edits)
- `assets/photos/chair.jpg`: [Chair.JPG](https://commons.wikimedia.org/wiki/File:Chair.JPG), Antonio Borrillo, CC0
- `assets/photos/chairs-pile.jpg`: [Mess of Folding Chairs (54273842215).jpg](https://commons.wikimedia.org/wiki/File:Mess_of_Folding_Chairs_(54273842215).jpg), Tony Webster, CC BY 2.0
- The ring on slide 3 is the seat box from thresholding and connected components (x 575-847, y 322-480 of 960 x 651). It was stable across thresholds 105-115 and erosion radii 8-11.
- `assets/photos/tea-table.jpg`: [Interior of living room 01.JPG](https://commons.wikimedia.org/wiki/File:Interior_of_living_room_01.JPG), Andrey Korzun, CC BY-SA 4.0. Cropped to rows 0-610 of 720 to remove the museum caption (text starts at row 632, glass edge at row 614).
- [ ] The tea table is taller than a seat. A low table with things on it would fit "you could sit here" better; Commons had no clean match.

## Geon and category photos
- `assets/photos/kitchen-chair.jpg`: [Kitchen chair made by Lübke. Germany.jpeg](https://commons.wikimedia.org/wiki/File:Kitchen_chair_made_by_L%C3%BCbke._Germany.jpeg), Ditigibt, public domain. Downloaded with Shreya's OK, 960 px thumbnail.
- From Day 4, referenced in place: `coffee.jpg` (Shixart1985, CC BY 2.0).
- `assets/photos/clouds.jpg`: [White Cumulus Clouds against Blue Sky (2).jpg](https://commons.wikimedia.org/wiki/File:White_Cumulus_Clouds_against_Blue_Sky_(2).jpg), Lance Vanlewen, CC BY-SA 4.0. Replaced the goats, which read as objects.
- `assets/photos/spaghetti.jpg`: [Spaghetti-prepared.jpg](https://commons.wikimedia.org/wiki/File:Spaghetti-prepared.jpg), public domain, no author listed. Replaced the bananas, which split easily into parts.
- [ ] The chapter says geons fail on these cases. "No fixed shape" and "too much fine detail for a few simple parts" are our explanation of why.
- Cup rings come from row and column scans of `coffee.jpg`. The cup example is ours, not the chapter's, and the notes say so.
- [ ] Slide "Categories are not crisp" keeps the box sketch: Commons had no photo of a box used as a table, only one sitting on a table.

## Task ladder trim (Shreya's OK)
The section ran 15 slides and 61 clicks for 14 minutes. Now 12 slides and 47 clicks.
- Removed "Classification: evaluation": top-1, top-5 and the confusion matrix are in the notes of "Classification: the output".
- Removed "The localization loss": the idea is in the first note of the IoU vs L2 scene. The instance slide still shows its loss equation.
- Removed "The threshold on a real street": the box counts are in the precision-recall notes, read from `result.js`.
- Shortened "Classification: the output" to 2 clicks and NMS to 3 clicks (one worked step, then the result).

## Transfer learning and forgetting (Section B, added for the one-hour version)
Not from Ch. 50. Claims checked against the arXiv abstracts or full text, except where noted.
- B1 became two slides after "The weakness: shortcuts". The "make the model say where" line moved from the shortcuts note to the end of B1.
- B2 and B3 sit after "Limits of the formulations", before "Beyond naming". B3 became two slides.
- Tightened from the outline: Raghu is "two large-scale medical imaging tasks"; He is COCO, from-scratch "no worse", pretraining converges faster; VTAB has 19 tasks; R-CNN result is 53.3% mAP on VOC 2012, over 30% relative; the R-CNN abstract says "auxiliary task", and its baselines are combinations of low-level features.
- Dropped because this deck has nothing to point to: the "callback to A2" and "leads into the benchmarks section".
- The References slide was removed at Shreya's request. Sources are cited on each slide.
- [ ] Venues to confirm: He et al. ICCV 2019, Kirkpatrick et al. PNAS 2017, Mallya & Lazebnik CVPR 2018 are not shown on the arXiv pages. McCloskey & Cohen and French details came from a summary of Wikipedia.
- [ ] Progressive Networks was tested on reinforcement learning, not vision. The notes say so.
- [ ] The course plan has no continual learning session, so B3 points to nothing later. Add a pointer if one is planned.
- [ ] Day 4 already covers backbones and pretrained models. If this lecture follows Day 4, B1 can move faster.
- [ ] Section minutes in `order.js` are a planning split, not rehearsed. The content may run under an hour.

## Trimmed slides restored as visual scenes (one-hour version)
- "How good is a classifier?" (`scenes/eval-classifier.html`): real ResNet-18 top-5 on the street, then a confusion matrix. "Minibus" as the true label is our call.
- The confusion matrix is a labeled toy (Shreya's choice, instead of installing scikit-learn to compute a real one from the Day 4 digit network). The cat and dog mix-up follows the chapter's example.
- "The localization loss: two terms" (`scenes/box-loss.html`): the predicted boxes are toy boxes, the IoU is computed.
- "The threshold on a real street" (`scenes/threshold.html`): real YOLO11n images and per-class counts from `result.js`.

## Furry teacup and cue conflict
Both slides end the human section, after "Categories are not crisp" and before "One image, four outputs". "Right after geons" and "right before the first classification slide" cannot both hold with the slides adjacent, so this uses the fallback in the request.
- Slide "What is this?" uses the image Shreya supplied: `assets/photos/oppenheim-object.webp` (source not given).
- The cue conflict slide uses images Shreya supplied: `assets/photos/cat-elephant.png` and `assets/photos/apple-ipod.webp`, credited to the papers.
- [ ] The Oppenheim image and both figures are likely under copyright. Check permission before this goes on the public site.
- Checked: Geirhos 95.9% human shape, 77.9% ResNet-50 texture (Section 3.1; the human figure is a share of decisions matching either cue), Fig. 1(c), ICLR 2019.
- Partly checked: "newer architectures do better, not at human level" follows Geirhos et al. (2021), which covers vision transformers. Not cited on the slide.
- [ ] Not checked: the apple and iPod example and the "physical attack" wording. The fetched Distill text stopped before the article body, and OpenAI's post refused the fetch.
- [ ] Not checked: the MoMA credit line, because the page refused the fetch.
- The later critique of the test moved to the benchmarks case study. The cue conflict note now points ahead to it.
- [ ] "Next class" for transformers assumes this lecture comes right before that class.

## Benchmarks section (last section, after "A family of definitions")
Not from Ch. 50. The last slide is a continuation of the fifth, so the section shows 6 screens for 5 slides.
Changed from the outline after checking the papers:
- Northcutt: "at least 6%" of ImageNet validation labels, not "a few percent". The 3.3% figure is the average over 10 datasets.
- ObjectNet: objectnet.dev says 40-45% for object detectors, relative to other benchmarks. It is a percent, not points from ImageNet accuracy.
- Burgert et al. (arXiv:2509.20234): the paper does not run a background-removal test or say that shape bias rises in every model. It argues the stimuli put texture on the background too and entangle other cues, and concludes CNNs mainly rely on local shape. The case study says that instead. Results also vary by model.
- Geirhos et al. (2020): near-chance error consistency between CNNs and humans. It does not test matched accuracy, so the table says "errors overlap little more than chance".
- The human top-5 estimate of 5.1% is one expert annotator; a second annotator scored about 12% on a smaller sample. The notes say "single expert annotator". ResNet's 3.57% is an ensemble.
Other changes:
- References were not re-added: the slide was removed at Shreya's request. Sources are cited on each slide.
- "A family of definitions" no longer points to Ch. 51; its note now leads into benchmarks.
- [ ] Not verified from the fetches: AlexNet's ~26% to ~15% at ILSVRC 2012 (the abstract gives LSVRC-2010 numbers; the paper text was unreadable), the Name That Dataset experiment in Torralba & Efros, and the end years VOC 2012 and ImageNet 2017.
- [ ] Venue of Burgert et al. (NeurIPS 2025) is not on the arXiv page, so the slide cites arXiv.
- [ ] Burgert et al. is one recent paper arguing against slide 12's title. Decide how strongly to state it.
- [ ] The ADE20K start year on the timeline is 2017 (CVPR). The arXiv link found is the IJCV extension.

## Image copyright lines
- Oppenheim: line as shown on MoMA's collection page, per a web search (the page itself refused a direct fetch). The year varies across sources, so check the current line. A credit does not by itself give permission to reproduce the work.
- Goh et al.: Distill licenses diagrams and text CC BY 4.0, except figures marked "Figure from ...". Check that the apple figure carries no such note.
- Geirhos et al.: the arXiv page links the non-exclusive distribution license, not Creative Commons, so reuse is not covered by a license. "© the authors" is our wording.

## Day 4, Part 2
- Moved from `object-recognition/` to `day04-part2/`. `index.html` gets one added card (shared file, Shreya's request).
- On `main`, the Day 4 deck now ends with Section 4 (Fernanda, a086ad8), so the overlap with this lecture is gone. This branch does not have that commit yet.
- [ ] The Day 4 card on the home page still describes classification, detection and segmentation. It should change once Part 2 is published.
- "From Part 1" on the filters slide means the Day 4 deck, whose convolution section shows them.

## Lab and homework (last section, `parts/lab.js`)
The Day 4 deck now ends with Section 4, so its lab and homework slides (`day04/parts/project.js`) no longer load. Both were copied here, and the slides that lead up to them are unchanged.
- The lab slide names no file and drops the fully connected step. It holds for both notebooks below.
- [ ] Two Day 4 notebooks exist. `notebooks/day04-lab-cnn-mnist.ipynb` is on `main` and linked from the home page (fully connected baseline, CNN, filters, pixel permutation). `notebooks/day04-lab-mnist-cnn.ipynb` is local and untracked (CNN only). Decide which one students use.
- [ ] The benchmarks closing note ends on "Next class", and the lab slide now follows it.

## Homework slide (last slide)
Dates come from the course site and the Day 4 homework slide, as of 2026-11-05.
- [ ] The lab has no due date on the course site, only a submission form, so the slide gives none.
- The older Homework slide in `parts/lab.js` was folded into this one. Its description of the paper is in the notes.
- [ ] The proposal is due Fri, Nov 6. If this lecture runs on or after that day, the card needs rewording.

## Solved or open, consolidated (Shreya's request)
11 slides became 5. Text removed from the screen moved to the notes.
- Deleted "Is this a car?". The toy car and pepper examples stay in the notes and on the benchmarks slide.
- Deleted "A family of definitions" and `parts/wrapup.js`. Its bridge into benchmarks moved to the end of "Beyond naming". Sections renumbered.
- "Largely solved" and "Real applications" are one slide. The building blocks are in the notes.
- The two real limits and "Limits of the formulations" are one slide. "Stuff vs. things" and the annotation point, which were ours and not the chapter's, are gone.
- "Open questions in transfer": 6 cards to 3. VTAB is no longer mentioned; how much to fine-tune is in the notes.
- "Forgetting: still open" folded into "Learning without forgetting". The five fixes appear on one click.
- "Beyond naming" and "A vision system like a scientist" are one slide.

## Benchmarks section, clarified
- Correction: Recht et al. say the ImageNet drop was "not caused by adaptivity" but by slightly harder images. The earlier "reusing the test set overfits it" had the paper backwards, and my first check missed it. The card and note now match the paper.
- "Train, tune, test once, rank": metrics shown as three labeled cards.
- "A saturated benchmark": each card now names the sign first, then the number. The full rule of thumb is in the notes.
- "Human findings": the drawn loop became one line, and the table is shorter. Shape-focused training data is in the notes.
- "Progress is only as good as the question": five cards became three (labels, data, score), and the case study has its own box. Goodhart's law is in the notes.

## Benchmarks retold around the teacup (Shreya's brief)
One question runs through it: how do we know a vision system actually sees? The closing slide was removed; its line is in the last note.
- New scenes: `scenes/bench-tasks.html`, `scenes/bench-metrics.html`. Shared code: `scenes/or-cup.js`.
- The cup outline is our own annotation of `coffee.jpg`, made with GrabCut (`assets/make_cup_mask.py`, output `assets/cup-mask.js`). It is not a dataset label.
- Metrics now follow the brief: accuracy; precision, recall and mAP; IoU and Dice. Top-1, top-5 and AP from earlier slides are mentioned in the notes.
- The detection and mask predictions are toy shifts of the truth. IoU and Dice are computed from them.
- Model A and B scores (99/99, 91/62) are made up and labeled on the slide.
- [ ] The checker shadow row ("Does the answer hold?") is a test we propose, with no published result behind it, so the Models column states a question.
- [ ] The checker image comes from Day 1 (`assets/assumptions/`). Its license was not checked. The credit matches Day 1.
- [ ] Error consistency and the Burgert critique now live in the notes only. Slide 12's note still points ahead to the critique.

## Slide 35 shortened (Shreya's request)
- Removed the timeline and "a shared yardstick". The definition moved to a new slide before it, "What is a benchmark?", with the four parts and the dataset names. AlexNet is in its notes.
- Retitled "One teacup, three prediction problems", since the old title no longer matched what is on the slide.

## Kim et al. (2026), "On the Reliability of Cue Conflict and Beyond" (Shreya's request)
New slide after "Human findings make better tests". arXiv:2603.10834, CC BY 4.0. No venue on the arXiv page.
- Agreement numbers are Fleiss' kappa from Table 1, read in the v1 full text: cue conflict 0.7276 shape, 0.2937 texture; REFINED-BIAS 0.9836 shape, 0.7973 texture; 88 participants.
- [ ] The current arXiv version is v4 (1 Jul 2026), and only v1 could be read, up to Section 3.2. Check these numbers against v4.
- The Burgert critique moved here from the last slide's note. Burgert is cited in the note only, so the slide cites Kim and Geirhos.
- [ ] Slide 12 and "Human findings" still report the original cue-conflict result. This slide questions it, on purpose. Decide how strongly to state each.

## Public copy · 2026-11-07 (Shreya's request)
Published from the `object-recognition-lecture` worktree, its newest version, without the images that lack permission.
- Removed `oppenheim-object.webp`, `cat-elephant.png` and `apple-ipod.webp`. The slide "What is this?" is gone, since it was built on the Oppenheim image. The cue conflict slides keep their text and citations.
- Credits added for the coffee and tea table photos on two benchmark slides.
- The homework slide's proposal date now matches the course site.

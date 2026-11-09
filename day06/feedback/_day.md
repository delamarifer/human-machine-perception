# Day 6 · Data, Generalization and Adaptation: feedback and open questions

Owner: Shreya (all parts). Plan: the "Data, Generalization & Adaptation — Lecture Plan" doc
(claude.ai/artifact/BaSaVuVnqW5St32rys9ZUY). Preview: `python3 -m http.server 8137` from the repo root, then
`http://localhost:8137/day06/deck.html` (one part: `?only=problem`). No speaker notes (Shreya's request).

## Round 1 · 2026-11-08 · start + Section 1 (problem)

14 slides, 59 clicks; every click walked forward and back, console clean, `?only=problem` works on its own.

| # | Slide | Source of what is on it |
|---|---|---|
| 1 | Quiz timer (12:00, amber at 2:00, red at 0:30) | plan doc |
| 2 | Announcements | plan doc dates; quiz review is a `.todo` box |
| 3 | Title | |
| 4 | Today's idea: 2% test vs 16.4% on the road, risk formula | plan doc; marked illustrative |
| 5, 5A | ColorizeBot, pink blob | Ch. 35 Figs 35.2, 35.3; "around 12 percent" dogs from the chapter text |
| 6, 6A | Fit here, test there (scene) + Table 35.1 | scene is our simulation of the Ch. 35.3 setup; the table is the book's |
| 7 | What one example is worth | Ch. 35.4.1 ("about 10×", "about 1/10") and Table 35.2 |
| 8 | Name That Dataset | Fig 35.8; 12 datasets, researchers about 75% |
| 9, 9A | Where bias comes from; canonical views | Figs 35.10 (mugs), 35.9 (Palmer, Rosch and Chase 1981); section 35.5 headings |
| 10 | Adversarial shift | Fig 35.12; noise shown 20× |
| 11 | Checkpoint 1 | plan doc |

Book figures: downloaded from visionbook.mit.edu (CC BY-NC-ND 4.0), content unmodified, scaled to 2400 px
wide and saved as JPEG (35 MB → 2 MB). Each slide credits the figure and the license.

### Corrections to the plan doc (checked against Ch. 35)
- [ ] Slide 3: the chapter says "about 10× more examples" and "about 1/10"; it does not give "100 vs 1,000".
      The slide uses the chapter's words. Update the doc?
- [ ] Slide 3 table: the book's Table 35.2 also has a Caltech101 row and column; the slide shows all four.
- [ ] Slide 6: the chapter gives no perturbation size, so the doc's "r = 2/255" example is not on the slide.

### Questions for Shreya
- [ ] **Quiz review (slide 2).** When do results come back, and which one or two mistakes do you want to show?
- [ ] **Name That Dataset answers.** The book figure has blank answer boxes and the answer key is not in the
      chapter. Do you want to reveal the matches (source: Torralba and Efros 2011), or keep it as a guessing game?
- [ ] **Toy scene.** The chapter does not give its true curve, so the scene uses ours (0.3·e^(0.9x) + 0.4, seed 5)
      and shows no numbers; the error numbers students see are the book's Table 35.1 on the next slide. OK?
- [ ] **Learning curves (slide 3).** The book has them as Fig. 35.7 (not downloaded). Add it, or keep the text?
- [ ] **Social bias.** The doc's example (doctors with men, nurses with women) is not confirmed in the chapter,
      so the slide says "whose world the images show". Want a sourced example?

## Round 2 · 2026-11-08 · Shreya's feedback: clearer problem, a plan slide, better titles

17 slides, 78 clicks; walked forward and back, console clean, checked at 1280×720.
- Announcements: Assignment 1 (Wed Nov 11, 2pm), proposal (Wed Nov 11, midnight), follow-up meetings Thu Nov 12
  (Calendly). Presentations line and "today's lab helps…" line removed.
- "A model learns its training data, not the world": now one worked example built step by step (no risk formula).
- New "Today's plan" slide (7 blocks, each with the question it answers). The same list opens each section with
  that section marked (`d6Roadmap` in lib.js); Section 1 opens with "Part 1 · The problem".
- New slide "What went wrong: the images moved": our drawing of two overlapping clouds, ending on the term
  "distribution shift" (after Fig. 35.5).
- Titles now state the point: e.g. "It learned ImageNet's dogs, not dogs", "Moving the test data multiplies the
  error", "Data from somewhere else is worth less", "Five ways bias gets into a dataset".
- [ ] The course page and syllabus still say the detailed proposal is due "Tuesday night".

## Round 3 · 2026-11-08 · Part 1 ends on a question; Section 2 (Get better data)

29 slides, 129 clicks; walked forward and back, console clean, checked at 1280×720.
- Part 1: Checkpoint 1 removed; it ends on "If the data is the problem… how do we get data that covers the world
  the model will meet?" (the "Next" line removed).
- Part 2 (`parts/broaden.js`, 12 slides): opener, more vs better data, few labels (self-, weakly, semi-supervised),
  augmentation (scene `augment.html`, 9 changes computed live from the CC BY cat photo), invariance (cat / b→d /
  6→9), equivariance (box 100–200 → 440–540), domain randomization + generative augmentation, curation (cluster,
  balance, retrieve), crowd votes (84% from five 70% annotators, computed), experts (32% at 40%; kappa 0.52),
  active learning (entropy 0.11 vs 1.08), then the question that opens Part 3. No checkpoint.
- Backup in the plan, not built: 8 (augmentation broadens the distribution), 12 (adversarial training), 16 (synthetic data).

### Checked against sources
- Ch. 36 (visionbook.mit.edu/data_augmentation.html): invariance and the b/d example, equivariance (same crop on
  image and label map), simulator randomization, and "a clearer gain… using a g_theta pretrained on external data".
  The 6/9 digit example and bounding boxes are ours, not the book's.
- Tobin et al. 2017, "Domain Randomization for Transferring Deep Neural Networks from Simulation to the Real
  World" (arXiv 1703.06907). Northcutt et al. 2021 (NeurIPS Datasets and Benchmarks): at least 6% of ImageNet
  validation labels are wrong (for Part 3).

### Questions for Shreya
- [ ] **Curation citation.** The slide says clustering and retrieval curation is "as used for self-supervised
      models such as DINOv2 and DINOv3". I have not opened those papers this round; check or drop the line.
- [ ] **Length.** Part 2 is 12 slides for 15 minutes. Candidates to cut: "Few labels?", or merge crowd and expert.
- Round 4: "Today's plan" and the section openers drop the Group activity row; the Lab row has no description (Shreya).
- Round 5: new slide 7A "How a colorization model works" (Fig. 35.1, Zhang, Isola and Efros, ECCV 2016) before
  ColorizeBot, so students see it working first. 30 slides, 132 clicks, walked forward and back.
- [x] **"Few labels?" (Part 2).** Done: now a callback to Day 5 plus one new click on pseudo-labels. Self-supervised learning and CLIP were taught on Day 5 Hour 2 (Fernanda);
      only pseudo-labels are new. Cut it, or turn it into a one-line callback to Day 5?

## Round 6 · 2026-11-08 · real examples in Part 2, human data, Part 3 (Check the data)

41 slides, 190 clicks; walked forward and back, console clean, checked at 1280×720.

Part 2 now uses real, sourced examples (checked against each paper's own text):
| Slide | Real example |
|---|---|
| More vs better data | ≥6% ImageNet val labels wrong (Northcutt 2021); Gender Shades 34.7% vs 0.8% (Buolamwini & Gebru 2018); DataComp filtered subset beats the 12.8B pool by 6.9 pp (Gadre 2023) |
| Few labels | Noisy Student: pseudo-labels for 300M unlabeled images, 88.4% ImageNet top-1 (Xie, CVPR 2020) |
| Simulator | Tobin 2017: trained only on simulated images, localized real objects to 1.5 cm (tiles stay our sketch) |
| Curation | DINOv2: 1.2B unique images → dedup + retrieval → LVD-142M (Oquab 2023, section 3) |
| Crowds | ImageNet on Mechanical Turk, ≥10 votes per seed image, adaptive agreement (Russakovsky 2015, 3.1.3) |
| Experts | CheXNet: 4 radiologists, 420 X-rays, average F1 0.387 against each other (Rajpurkar 2017) |
| Model in the loop | Segment Anything: 34 s → 14 s per mask; 99.1% of 1.1B masks automatic (Kirillov 2023) |
| New: people as data | the class projects that compare with people (titles only); Geirhos 2021: 85,120 trials, 90 people, error consistency |

Left as examples (marked on the slide): the 70%/40% voter accuracies (the binomial curve is computed), the
day/night probabilities, the 1,000 × 5 augmentation count, the 640-px box drawing.
Not used, could not verify: "49k workers from 167 countries" (ImageNet), DINOv3 clustering curation, the share of
the pool DataComp kept.

Part 3 (`parts/eval-data.js`, 10 slides): label errors (Northcutt 2021: ≥6%, 3.3% average, ResNet-18 beats
ResNet-50 at +6%), confident learning (example numbers), an average hiding the night group (computed 92.4%,
weights 0.56 / 5.00), near-duplicates (Barz & Denzler 2020: 3.3% CIFAR-10, 10% CIFAR-100), split units from the
class projects, the five-question check, "theirs or mine" classifier (SE computed), sample size (139 / 385) and a
label audit (6%, 2.7–9.3%), ending on "…but can we trust the test score?". Group activity not built (removed
from the plan list).
- [ ] Confident learning: the threshold rule on the slide is from the paper as I know it; the fetch did not reach
      the method section. Check section 3 of arXiv 1911.00068.
- [ ] The DB-VAE callback in the plan doc assumes the generative-models lecture came first; it is Day 7, so it is
      left out.

## Round 7 · 2026-11-09 · why copies get into the test set; how to check a dataset

45 slides, 213 clicks; walked forward and back, console clean, checked at 1280×720.
- New "How copies of training images end up in the test set": web search → the web repeats a photo (resized,
  cropped, recolored) → cleaning removes only exact copies → random split. Plus video frames, bursts, merged
  datasets (general mechanisms, no numbers). Source: Barz & Denzler 2020, sections 1–2.
- New scene `scenes/near-dup.html`: four copies of the cat photo computed in the browser; pixel hash finds 0 of 4;
  16×16-thumbnail cosine (a stand-in for network features, said on the slide) flags 3 of 4, misses the crop
  (0.78), and the slide says so. Other image: Fig. 35.3, shown whole and only scaled (CC BY-NC-ND).
- "…inflate the score" now adds: ResNet-110 0% error on the copied CIFAR-10 test images vs 5.3% overall; how they
  found them (nearest neighbor in feature space + a person); ciFAIR raises CIFAR-100 error 2.73 points on average.
- New "How to check a dataset in one afternoon" (look, count, find copies, find bad labels, compare to your
  world, write a datasheet; Gebru et al., CACM 2021) and "Finding copies takes a few lines of code" (numpy sketch;
  stopping rule after Barz & Denzler's 20 "different" pairs in a row).
- Note: Barz & Denzler's body text says 3.25% for CIFAR-10; the abstract says 3.3% (the slide uses 3.3%).

## Round 8 · 2026-11-09 · bad labels beyond classification; "tag, then count"

46 slides, 219 clicks; walked forward and back, console clean, checked at 1280×720.
- New sub-slide after "Let the model point at suspicious labels": "Boxes and masks too: look where labels and
  model disagree". Rows for classes, boxes (never boxed / wrong class / wrong place: the three issue types in the
  cleanlab object-detection docs), masks, and keypoints/captions (two people label the same sample; general method).
  cleanlab docs list classification, multi-label, object detection and segmentation (checked 2026-11-09).
- "One afternoon" slide: step 2 is now "Tag, then count" (conditions from metadata or by hand); step 4 is
  "compare labels with a model's predictions" (any task); step 5 notes "theirs or mine?" needs no labels.

## Round 9 · 2026-11-09 · simulator tools; where to find data

48 slides, 230 clicks; walked forward and back, console clean, checked at 1280×720.
- New sub-slide after the simulator slide: "Simulators label every pixel for free". CARLA, NVIDIA Replicator
  (Isaac Sim), BlenderProc, Kubric, each described from its own docs or README; Richter et al. 2016 (Playing for
  Data): 25,000 game frames with pixel labels; game data + 1/3 of CamVid beat all of CamVid (abstract).
  Left out: Unity Perception (README says discontinued); "GTA V" and MuJoCo (not in the abstracts read).
- New slide before the Part 3 transition: "Before you collect, look for data that already exists": Hugging Face
  (1,122,968 datasets on its page on 2026-11-09, shown as "about 1.1 million"), papers / project pages and the
  NeurIPS datasets track (since 2021; now called "Evaluations & Datasets"), Kaggle, Google Dataset Search, Zenodo
  (DOIs), your field's archives. paperswithcode.com now redirects to Hugging Face Papers.
  Roboflow Universe left out: its page refused the fetch. Transition line now starts "Find it, …".
- Round 10: Zenodo row and credit removed from "where to find data" (Shreya).

## Round 11 · 2026-11-09 · worked example and activity for "where to find data"

50 slides, 242 clicks; walked forward and back, console clean, checked at 1280×720.
- New sub-slide "Example: data for a sign-language app for doctors" (the class project): WLASL, 2,000 words,
  21,083 videos, 119 signers; from teaching websites and YouTube, links expire (README); C-UDA, academic and
  computational use only, no commercial use; split 4:1:1 within each word, not by signer → re-split by signer.
  Source: Li et al., WACV 2020 (arXiv 1910.11006 v2) and the WLASL README. Verdict: use it and adapt.
- New slide "Your turn: find one dataset for your project": 5 minutes, write down name/size, labels, origin,
  license, split; tell a neighbor the verdict.
- [ ] WLASL: the paper does not say outright whether test signers also appear in training; the slide says only
      that the split is within each word, which is what the paper states.

## Round 12 · 2026-11-09 · dataset bias from Torralba & Efros 2011 and Liu & He 2024 (Part 1)

54 slides, 266 clicks; walked forward and back, console clean, checked at 1280×720.
Both papers read in full (Torralba & Efros: the CVPR PDF, text extracted locally; Liu & He: arXiv HTML v2).
- Name That Dataset: new click "39%: a simple classifier, rising with more data" (chance 8%; section 1).
  Title shortened to "Name That Dataset: where is each image from?".
- New sub-slide "Even the cars give the dataset away": car crops from 5 datasets, 61% at 20% chance; Caltech side
  views, ImageNet racing cars, PASCAL unusual viewpoints, LabelMe cars partly hidden (section 1, Fig. 4; text only).
- New "A car finder trained on one dataset fails on the others": Table 1 "car" classification rows (AP), self vs
  mean of others and the drop; average 53.4 → 27.5; "first place … one of the worst" (section 3.1).
- New sub-slide "In 2024, big datasets still give themselves away": YFCC, CC, DataComp, 1M images each; 84.7% vs
  33.3% chance; 20 ML researchers average 45.4%; 68.4% at 32×32; pseudo-datasets from one source stay at chance.
- New "Four ways a dataset gets its look, and what helps": selection, capture, label, negative set with the paper's
  fixes (section 6); negative-set test drops 15–22% for SUN09, LabelMe, PASCAL (Table 2).
- No figures from either paper are used: Torralba & Efros is IEEE-published; Liu & He is under arXiv's
  non-exclusive license (no CC). Liu & He's Fig. 1 quiz (21 images, answer key in the caption) would make a good
  live game if you get permission or link to it.
- [ ] **Overlap.** "Four ways…" (Torralba & Efros) and the book's "Five ways bias gets into a dataset" (mugs)
      now cover similar ground. Keep both, merge, or cut one? Part 1 is now 15 slides for 10 minutes.

## Round 13 · 2026-11-09 · labeling, from the Scale AI data labeling guide (Part 2)

58 slides, 288 clicks; walked forward and back, console clean, nothing overflowing, checked at 1280×720.
Source: scale.com/guides/data-labeling-annotation-guide (read in full on 2026-11-09). Its Scale product pitches
(Studio, Rapid, Nucleus, Validate) are left out. Four new slides before "Crowds":
- "Pick the label your task needs": our drawing, one scene labeled six ways (class tag, boxes, polygons, semantic
  mask, instance masks, keypoints; overlays share each car's coordinate frame). "Use the cheapest label that
  answers your question."
- "Who labels? Trade quality, cost and control": you/your team, a crowd, a labeling company, a model; trade-offs as
  the guide states them ("copies its own mistakes" is ours). "Usually: a model proposes, people correct."
- "Write rules, try a batch, check the labelers": rules with edge cases (the guide's pedestrian example), a small
  calibration batch ("a few hundred" is our example size), hidden gold items, consensus, review layers, audits.
- "Two people box the same car: do they agree?" (sub): IoU computed from two example boxes (0.61); the guide's
  thresholds 0.95 for faces, 0.70 for dogs.
- Not used: the guide's "99%+ quality needs 1,000+ labelers" (a vendor claim, no source given).
- [ ] Part 2 is now 19 slides for 15 minutes. Two Part 1/3 titles still wrap to two lines (ColorizeBot; "Copies
      of training images in the test set inflate the score").

## Round 14 · 2026-11-09 · physical AI data gaps (Part 2)

59 slides, 298 clicks; walked forward and back, console clean, nothing overflowing, checked at 1280×720.
- New slide "Robots need data nobody has posted online", after "When your data is people's answers".
  Framing from the Scale AI blog ("Expanding Our Data Engine for Physical AI", 2025-09-24): robot data can't be
  scraped, it is collected one interaction at a time; labels carry "intent, task structure, and failure modes".
  The post is mostly a product announcement; its numbers (e.g. "about 5,000 hours" for DROID + Open
  X-Embodiment) are unsourced and not used.
- Numbers from the papers themselves: DROID (arXiv 2403.12945): 76k demonstrations, 350 hours, 564 scenes, VR
  teleoperation. Open X-Embodiment (arXiv 2310.08864): 60 existing datasets pooled, 1M+ trajectories, 22 robot
  types; RT-2-X about 3× RT-2 on emergent skills (Table II: 75.8% vs 27.3%). Ego4D (CVPR 2022): 3,670 hours,
  931 camera wearers. Bars drawn to scale from the hours (measured 10.5 : 1).
- Gaps (our summary, tied to the lecture): coverage, shift across robots and rooms, sim-to-real, human video
  without robot actions, richer labels.
- [ ] DROID's sources disagree on 84 vs 86 tasks and 13 vs 18 labs, so the slide uses neither.

## Round 15 · 2026-11-09 · Part 4 (Check the model)

71 slides, 367 clicks; walked forward and back, console clean, nothing overflowing, checked at 1280×720.
`parts/eval-models.js` (12 slides incl. scene `scenes/corrupt.html`), plan slides 21–26A; Checkpoint 4 dropped,
ends on "…but what do we do when the world changes?".

| Slide | Content and source |
|---|---|
| Measure three numbers, not one | 99 / 94 / 70 (plan's example), gaps 5 and 24 computed; bars to scale |
| Name the shift by what changed | covariate, label, new class; importance weight night 10, day 0.53 (example shares, computed) |
| Corrupt the test images (scene) | our versions of noise, blur, fog, JPEG at 5 severities, computed; ImageNet-C 15 × 5 = 75 (Hendrycks & Dietterich, ICLR 2019) |
| Three kinds of harder test set | ImageNet-C; WILDS 10 datasets (hospitals, camera traps, time and place); ObjectNet 50,000 images, rotation/background/viewpoint; ImageNet-D 4,835 images, ViT-B/16 72.1% → 12.0% (CVPR 2024); Taori 2020: 204 models, synthetic robustness gives little natural-shift robustness |
| Corruption error (sub) | CE = 150 ÷ 300 = 0.5 (example), AlexNet reference, mCE |
| "I don't know" | MSP 0.98 vs 0.37, energy −5.0 vs −3.0 (plan's logits, computed); energy cuts FPR at TPR 95% by 18.03% on CIFAR-10 WRN (Liu 2020); Mahalanobis (Lee, NeurIPS 2018) |
| Same recipe, new test set | Recht 2019: −11 to −14% ImageNet, −3 to −15% CIFAR-10, order almost exactly preserved, harder images not adaptivity; Liu & He: ImageNet vs ImageNetV2 classifier 81.8% |
| Is a 0.6-point gain real? (sub) | SE 0.95 points at n = 1,000; difference needs ~2.6 points; ~0.8 at 10,000 (computed) |
| Choose benchmarks | where to look; keep-if filters; 97% / 3% saturation example (Northcutt ≥3.3% average) |
| Checklist for your project's results | split, three numbers, worst group, error bars, unknown inputs |

Not used, could not verify: the plan's "EarthShift (2026): 15–20% worse OOD"; "Meta shut down Papers with Code in
July 2025" (only the redirect to Hugging Face was observed); WILDS ID/OOD numbers (seen only in a summary);
CLIP's effective-robustness numbers (not in the abstract read).
- [ ] Recht et al. and Taori et al. venues (ICML 2019, NeurIPS 2020) are not on the arXiv pages read; the slide
      cites them by year only.
- [ ] Part 4 is 12 slides for 10 minutes.

## Round 16 · 2026-11-09 · Part 5 (Adapt over time)

80 slides, 422 clicks; walked forward and back, console clean, nothing overflowing, checked at 1280×720.
`parts/adapt.js` (9 slides), plan slides 27–31; Checkpoint 5 dropped; ends on "…so how would we fix ColorizeBot?"
(the wrap-up part, not built yet).

| Slide | Content and source |
|---|---|
| Which fix? It depends on the data you have | the plan's ladder (fine-tune, domain adaptation, test-time adaptation, continual learning, monitoring); Ch. 37 sections 37.3 and 37.6 |
| Domain adaptation | seeded example clouds; wrong-side counts computed (14 of 28 → 0 of 28); DANN gradient reversal (Ganin et al., JMLR 2016); label-shift risk |
| Test-time adaptation | z = (0.8 − 0.5) ÷ 0.1 = 3 (plan's example, computed); Tent (ICLR 2021): ResNet-50 ImageNet-C error 44.0% online vs 49.9% test-time normalization; Schneider (NeurIPS 2020): 76.7 → 62.2 mCE by re-estimating BN statistics |
| Helps / hurts (sub) | the plan's table; safeguards; light/dark adaptation |
| Continual learning | forgetting 95 → 60 = 35 points; EWC penalties 0.10 and 0.01 (plan's examples, computed); EWC (Kirkpatrick et al., PNAS); class project "How ViTs forget" |
| Real data changes over years (sub) | CLEAR: Flickr 2004–2014, 11 buckets of 700K, 11 classes, 300 labeled per class per bucket; iid testing inflates, test on the near future. Wild-Time (NeurIPS 2022 D&B): 5 datasets, ~20% average ID → OOD drop |
| You can only adapt to a shift you notice | loop diagram (watch → flag → label → check → retrain → test on recent data); drift 0.05 → 0.8 (plan's example) |

Not used: the plan's domain-adaptation bound (Ben-David et al. 2010: the paper would not open to check it); the
GAN/DANN callback to the generative lecture (Day 7 comes after); Ch. 37 has no test-time adaptation section.
- [ ] CLEAR's venue is not on its arXiv page; cited as 2021. "How ViTs forget" is from the plan doc; confirm the
      project title.
- [ ] Two older titles still wrap to two lines (ColorizeBot; "Copies of training images in the test set inflate
      the score").

## Round 17 · 2026-11-09 · continual-learning demo (Part 5)

82 slides, 431 clicks; walked forward and back, console clean, nothing overflowing, checked at 1280×720.
Shreya supplied `continual_learning_demo.py` and `cl_results.json` (from another Claude chat); both copied to
`assets/adapt/` and linked from the slides so students can run it (about a minute on a laptop CPU).
- Rerun on 2026-11-09 (torch 2.13, scikit-learn 1.9.1, scipy 1.18.1, in a scratch venv): every mean within 0.03
  of `cl_results.json` (e.g. class-incremental replay 0.888 vs 0.886; domain-incremental EWC 0.618 vs 0.622).
  The slides use the numbers in `cl_results.json`.
- New sub-slide "Watch a network forget rotated digits": the seed-0 fine-tune accuracy matrix (Rotated-Digits,
  0–120°) as a heat map; diagonal, below (0° task 0.98 → 0.18), above (future rotations fall with angle);
  forgetting 0.64 computed from the matrix.
- New sub-slide "Which fix works depends on what changes": average accuracy (3 seeds) for fine-tune, EWC, LwF,
  replay and joint, rotated vs new digits; why regularizers fail class-incremental (+p_c gradient on old classes);
  replay wins with 80 stored images ≈ 6% of the training set (computed from 1,797 × 0.7).
- Not used from the pasted write-up: the EWC λ sweep and the prediction histogram (not in `cl_results.json`, not
  rerun); the SimpleCIL / generative-replay suggestions.
- [ ] The demo uses 8×8 digits and a small MLP: a toy. The slides say so in the credit line.

## Round 18 · 2026-11-09 · wrap-up and lab (the deck is complete)

91 slides, 475 clicks; walked forward and back, console clean, nothing overflowing, every title on one line,
checked at 1280×720.
- `parts/wrapup.js` (section "Wrap-up", 3 slides): "Fixing ColorizeBot, one part of today at a time" (Fig. 35.2;
  one fix per part, the plan's; ends on the central idea "A model learns its training data, not the world");
  "Your visual system already solves these problems" (the plan's perception tie-ins); "Questions to take home"
  (the plan's four discussion questions).
- `parts/lab.js` (section "Lab", 6 slides): opener with today's plan; the five steps with minutes (3/6/6/5/2);
  task spec and hunt; inspect by hand; tallies into numbers (3 of 30 → 10%, range 0–21%, ± 4 points with 200;
  2 of 30 of 10,000 → about 670 vs 139 needed: computed); the card. A shared 22:00 timer (Start / Pause / Reset)
  sits on every lab slide; it only runs when clicked.
- No mention of the proposal in the lab (you removed that line from the announcements).
- Two old titles shortened to fit one line: "ColorizeBot: it worked until the public used it"; "Training copies in
  the test set inflate the score".
- [ ] Wrap-up "rebalance toward people and scenes" is the plan's advice, not a sourced count of people in ImageNet.
- [ ] Length: the deck is 91 slides. Section minutes in order.js: 15 + 10 + 15 + 10 + 10 + 10 + 3 + 22 = 95 (Start includes the
      12-minute quiz). Parts 1–5 each have more slides than their minutes suggest.

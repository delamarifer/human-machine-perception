# Course plan

Transcribed from Fernanda and Shreya's "AIMS Brainstorming" doc, the "Finalized Material" table (PDF export of
2026-11-02). This is the plan every session builds from. Day labels follow the doc exactly. Where the plan is
blank, the deck shows a dashed TO DO box: never fill a gap by inventing content.

References: the intro CV course schedule, https://introtocv.github.io/schedule.html, and Advances in Computer
Vision (spring 2026), https://scenerepresentations.org/courses/2026/spring/advances-in-cv/#syllabus. Readings
are chapters of Torralba, Isola & Freeman, *Foundations of Computer Vision* (the "Vision Book").

Known gaps and glitches in the source doc are marked **[check]**:
- **Day 3 stays one day** (Fernanda, 2026-11-02): image formation, processing and representations together,
  so there is no Day 4. As written it runs about 175 minutes **[check: trim]**. The cell also ends with a
  leftover stub ("Homework: Read material, convolution/math practice, continue work on PSET", "Objective:",
  "(10 mins) Homework Review") and a second resources block (textures and metamers), kept under Day 3.
- **[check] The Day 5 row holds three blocks:** Neural Networks, CNNs + evaluation, and Object Recognition +
  Robustness (no day number). Read in order, the doc has more days than labels.
- **[check] Day 7 (3D + Motion):** the segment list repeats object recognition (classification, detection,
  segmentation, datasets, robustness).
- Day 9 and Day 11 have a title only. Day 10 has an objective only.

**Day order on the public syllabus (Fernanda, 2026-11-02).** This supersedes the day labels below:
1 Introduction · 2 Motivation and limitations · 3 Image representation and processing · 4 CNNs and object
recognition · 5 Transformers and visual representations (Days 3–5 are Shreya's draft, still being decided) ·
6 3D and motion · 7 Generative models · 8 Robotics and RL · 9 Robotics and multimodal · 10 Extra day ·
11 AI and society · 12 topic to be added · 13–14 project work · 15 presentations. There is no separate neural
networks day. Days 6–11 on the syllabus were filled in from the Vision Book, MIT 6.S058, Advances in CV and
6.S191 (learning objectives, suggested labs and readings are drafts).

The previous version of this plan (with the detailed Day 1–3 timings the built decks follow, and the earlier
brainstorm notes for each day) is kept at the bottom under "Earlier revision".

---

## Day 1 · Introduction to Visual Systems
**Question:** What does it mean to see?
**Objective:** Understand perception vs measurement, describe a simple system, set up coding environment.

| Min | Segment |
|---|---|
| 10 | Vision + illusions introduction |
| 5 | Intro us |
| 5 | Intro course objectives, structure and resources |
| 5 | History of CV |
| 20 | Simple system overview |
| 15 | Project intro |
| 15 | CV applications group activity |
| 40 | Env setup and Python tutorial |

- **Homework:** Read chapters 1–4, finish Python tutorial, take a picture of xxx **[check: what picture]**
- **Reading:** Ch. 1–4
- **Coding practice:** Python + NumPy: arrays, indexing, slicing, reshaping, image tensors, plotting
- **Human connection:** Checker-shadow illusion, perception as inference
- **Labs/Project:** N/A

The built Day 1 deck (`deck.html`) follows the earlier, more detailed timing below.

## Day 2 · Motivation and limitations

| Min | Segment |
|---|---|
| 10 | Paper review |
| 5 | Syllabus review |
| 30 | Motivation for why you should take this course: applications; limitations; why look to humans as a source of overcoming those limitations?; why is the class project-based? |
| 10 | Project expectations, templates, examples |
| 50–60 | Back and forth lecturing of the simple system lab |
| 5 | Research vs building. What kinds of questions are research? Mathematical/theory: how do we change the way these systems learn? Fully exploring a limitation or finding new ones: what are the settings in which these tools fail? Application: what is a useful way to apply these tools? |
| 5 | How to read a paper |
| 2 | Homework (finish simple system or extend to their own), paper (a metamers paper) |

- Reading, coding practice, human connection, labs: **[check: blank]**

**Opening order from Fernanda (2026-11-02):**
1. First 5 minutes: the plan for the next 3 weeks, and the grading details (see `syllabus.html`, Grading).
2. Motivation: applications of vision, 20–30 minutes.
3. Lab.
4. Explain the project plan.
5. Research vs. building, and how to read a paper.
6. Paper discussion (perception as an inverse problem), moved to the end, after how to read a paper (Fernanda, 2026-11-02).

## Day 3 · Image Formation + Processing + Representations
**Question:** What information is represented in an image?
**Objective:** Understand pixels and simple image processing operations.

| Min | Segment |
|---|---|
| 10 | Homework review |
| 20 | Image formation |
| 20 | Convolution mathematically |
| 10 | Human vision: receptive fields / Gabor filters |
| 45 | Implement 2D convolution from scratch in NumPy |
| 15 | Edge detection + sharpening + blur |
| 15 | Pixels → features → textures → objects |
| 15 | Metamers activity: create/compare images that differ in pixels but appear perceptually similar |
| 20 | Representation + invariance |
| 5 | Discussion |

- **Homework:** Read, short reflection on what information can be removed while preserving perception
- **Reading:** Ch. 5–7
- **Coding practice:** Convolution from scratch, kernels, padding, stride, Fourier transform
- **Human connection:** Mach bands, Hermann grid, Hubel & Wiesel next to a Gabor bank (Michael Bach illusions, Adelson gallery)
- **Labs/Project:** Convolution from scratch, edge detection

Leftover block in the same cell (Day 3 stays one day, so this belongs to Day 3):
- **Homework:** Read material, convolution/math practice, continue work on PSET
- **Objective:** blank. **Segments:** (10 min) Homework review
- **Human connection:** Julesz texture pairs, Portilla-Simoncelli metamers, peripheral vision as texture (Rosenholtz mongrels, Freeman & Simoncelli 2011), auditory metamers as the cross-modal version
- Reading, coding practice, labs: blank

## Day 5 · Neural Networks + CNNs
**Question:** How do we know whether it sees correctly?

### Neural networks
**Objective:** Understand how neural networks work.

| Min | Segment |
|---|---|
| 10 | Homework review |
| 15 | Fixed to learned filters |
| 15 | Linear layer to nonlinear network |
| 10 | Forward pass + logits |
| 10 | Loss functions |
| 15 | Backpropagation |
| 10 | Gradient descent + optimizers |
| 30 | PyTorch lab |

- **Homework:** Read, complete training-loop exercise; experiment with one training variable and interpret the result
- **Reading:** **[check: blank]**
- **Coding practice:** nn.Module, forward pass, loss functions, backpropagation, optimizers, training loop
- **Human connection:** Learned visual representations vs. biological visual processing
- **Labs/Project:** Train a small classifier in PyTorch and visualize loss/accuracy

### CNNs + evaluation
**Objective:** Understand how CNNs learn hierarchical visual representations and how to evaluate whether a vision system actually works.

| Min | Segment |
|---|---|
| 10 | Week 1 assignment review |
| 15 | From learned filters to CNNs |
| 15 | CNN architecture: convolution → activation → pooling → classifier |
| 10 | What does each layer represent? |
| 10 | Train / validation / test |
| 10 | Beyond accuracy: confusion matrices, precision, recall, failure cases |
| 40 | CNN coding lab |
| 10 | Project check-in |

- **Coding practice:** Conv2d, channels, kernels, padding, stride, pooling, receptive fields, feature maps
- Homework, reading, human connection, labs: **[check: blank]**

### Object Recognition + Robustness (no day number in the doc)
**Question:** How do vision models learn to recognize the world?
**Objective:** Understand how recognition systems are trained, how datasets shape their behavior, and how pretrained models can be adapted to new domains.

| Min | Segment |
|---|---|
| 10 | Homework review |
| 25 | Classification, detection, and segmentation |
| 15 | Datasets |
| 15 | Transfer learning |
| 30 | Lab |

- **Coding practice:** pretrained weights, freezing parameters, replacing layers, fine-tuning, learning rates
- **Human connection:** Geirhos texture bias, model-vs-human, Dollar Street, cue-conflict stimuli (humans say shape, CNNs say texture), Mooney faces, cross-race effect as the human analog of dataset bias, whose images are in the dataset
- Homework, reading, labs: **[check: blank]**

## Day 6 · Transformers + Visual Representation (e.g. similarity)
**Question:** How can machines learn richer visual representations?
**Objective:** Understand how modern vision models transform images, how ViT uses attention to integrate information, and how we can analyze the representations.

| Min | Segment |
|---|---|
| 10 | Homework review |
| 15 | From CNN feature maps → embeddings |
| 15 | Why attention for vision? |
| 15 | Vision Transformer: patches → tokens → self-attention → representation |
| 10 | What does an embedding encode? |
| 10 | Comparing representations: similarity, geometry, invariance |
| 40 | ViT + representation analysis lab (highlighted in the doc) |
| 5 | Project connection |

- **Homework:** Readings; use a pretrained vision model to extract embeddings for a small image set, investigate which properties are reflected in the embedding space
- **Reading:** Ch 30
- **Coding practice:** extract intermediate activations, embeddings, cosine similarity, dimensionality reduction
- **Human connection:** face inversion / Thatcher illusion as a representation question
- **Labs/Project:** ViT colab, rsatoolbox

## Day 7 · 3D + Motion
**Question:** How do we perceive depth and a dynamic world?
**Objective:** Understand how visual systems infer 3D structure and motion from 2D images and video.

**[check]** The segments in the doc repeat object recognition: (10) homework review; (20) image classification:
one image → one/multiple labels, logits, softmax, decision boundaries; (20) object detection: bounding boxes +
labels, localization vs classification, IoU; (20) segmentation: pixel-level labels, semantic vs instance, masks
+ IoU; (15) datasets + training; (15) robustness + transfer learning; (15) lab.

- **Human connection:** Ames room, Ponzo, Gestalt laws next to a segmentation model, motion aftereffect, barber pole (aperture problem), point-light walkers
- Homework, reading, coding practice, labs: **[check: blank]**

## Day 8 · Generative Models
**Question:** How can machines generate visual worlds?
**Objective:** Understand the main families of generative visual models and how modern systems generate and manipulate images.

- **Reading:** Ch 32, flow matching intro, diffusers
- **Human connection:** Helmholtz unconscious inference, generative models as stimulus makers
- **Labs/Project:** tiny VAE, pretrained
- Segments, homework, coding practice: **[check: blank]**

## Day 9 · Robotics (embodied) + RL
**[check: title only]**

## Day 10 · Robotics (embodied) / Multimodal (language + vision vs audio)
**Question:** How can machines connect images with concepts and language?
**Objective:** Understand multimodal representations and how vision models can connect images.

- **Human connection:** Kanizsa triangle then ask a VLM if it sees it; color naming across languages (Berinmo, Himba)
- Segments, reading, coding practice, labs: **[check: blank]**

## Day 11 · Extra day

## Day 12 · AI + Society
**Objective:** Connect to real-world applications and societal changes brought by modern visual AI.

## Day 13 · Project work session

## Day 14 · Project work session

## Day 15 · Final project presentations

---

## Earlier revision

Kept for the built decks and the brainstorm notes. Day numbers here are the old ones.

Revised sequence for the first three class days. Day 1 introduces the question. Day 2 answers it with a
classical geometric system. Day 3 shows what a modern learned system does with one photograph. There is
no Day 0.

### Day 1 · Introduction to Visual Systems
**Question:** What does it mean to see?
**Objective:** Open the question of vision. After the perception theories, stop and open the checker-shadow image as an array.

The room is two hours. The talking is about 90 minutes. None of the lecture beats is a 10-minute talk. The spare time is for the groups running long.

| Time | Component | Content |
|---|---|---|
| 0–3 min | Welcome | Introductions and one opening illusion. |
| 3–6 min | About me | AIMS, research, Scale AI, DUST, holographic art. One sentence and a photo each, not a talk. |
| 6–10 min | Course philosophy | Human and machine vision side by side, what you can do by the end, and co-design from student interests. Then what a day looks like. |
| 10–22 min | The challenge of vision | Why vision is difficult. Illusions, light versus scene properties, ambiguity, inferring depth and structure. |
| 22–27 min | Human vision | A brief pass through the visual system. |
| 27–36 min | History | One theory per slide, in time order: atomists, Euclid, Ibn al-Haytham, Helmholtz, Wertheimer, Gibson, Marr. Then computer vision as the late chapter. |
| 36–49 min | Notebook | Stop. Images as arrays: the checker-shadow image, slices, and arithmetic. Finish the rest after class. |
| 49–61 min | Applications | Can computers do the same, then what computer vision is. The field working, then photos: driving, health, shops, robots and farms, augmented reality, maps of the earth. That list is the handoff. |
| 61–76 min | Group activity | Groups of four pick one application, one just named or another they care about. They name the problem it solves, how it is like human vision, what the system sees, and where it can be wrong. |
| 76–90 min | Discussion | Groups share. Connect what they said to the course. |

Deck: `deck.html`.

### Day 2 · Image Representation and a Simple Vision System
**Question:** How can we extract information from an image?
**Objective:** Represent an image as numbers, then recover 3D structure from one image of colored boxes by stating the assumptions as equations.

| Time | Component | Content |
|---|---|---|
| 0–10 min | Readings | Discussion of Pizlo, perception as an inverse problem. Pritchard, stabilized images on the retina, was optional. |
| 10–12 min | Question | How can we extract information from an image? |
| 12–16 min | Recap | Seeing is inference. The image is not the scene. Light is not the object. |
| 16–31 min | Images as data | Pixels, channels, color, resolution, image arrays, NumPy indexing and slicing. |
| 31–45 min | Practice | Checker-shadow image. NumPy slices and arithmetic. Notebook: `notebooks/day01-practice-numpy-images.ipynb`. |
| 45–55 min | The vision problem | Summer Vision Project. Can we recover 3D structure from one image of colored boxes on a floor? |
| 55–105 min | Lab | A simple vision system: projection, edges, figure-ground, contact and occlusion edges, assumptions, equations, and 3D reconstruction. Notebook: `notebooks/day01-lab-simple-vision-system.ipynb`. |
| 105–115 min | Discussion | What assumptions enabled reconstruction? Where did they break? |
| 115–120 min | Wrap-up | Preview pretrained vision models. |

### Day 3 · Seeing with Machines
**Question:** What can a machine see in one photograph?
**Objective:** Run a pretrained model on one photograph and compare its names, and an optional depth map, with what a person recognizes.

| Time | Component | Content |
|---|---|---|
| 0–10 min | Recap | What does an image contain? What could the geometric vision system recover? |
| 10–25 min | Modern computer vision | Pretrained models, learned visual representations, classification, and depth estimation. |
| 25–75 min | Lab | ResNet-18 on the café photo, the Rubik's cube, and the elephant statue. Notebook: `notebooks/day02-lab.ipynb`. |
| 75–90 min | Optional depth | A pretrained depth model. Compare semantic recognition with geometric understanding. |
| 90–105 min | Discussion | What can pretrained models recognize? What do they miss? |
| 105–115 min | Rubik's cube | Introduce color detection, square detection, and the challenge of interpreting a structured object. |
| 115–120 min | Wrap-up | Preview image formation and OpenCV. |

Deck already drafted for this day: `day02/deck.html`. The image-formation deck in `day03/` is not class day 3. Day 3 only previews that material.

### Day 4 · Image Representations
**Question:** What information is represented in an image?
**Objective:** **[check: blank in the plan]**

| Min | Segment |
|---|---|
| 10 | Homework review |
| 15 | Pixels → features → textures → objects |
| 15 | Metamers activity: create/compare images that differ in pixels but appear perceptually similar |
| 20 | Representation + invariance |
| 5 | Discussion |

- **Homework:** Read, short reflection on what information can be removed while preserving perception
- **Reading:** **[check: blank]**
- **Coding practice:** **[check: blank]**
- **Human connection:** Julesz texture pairs, Portilla-Simoncelli metamers, peripheral vision as texture (Rosenholtz mongrels, Freeman & Simoncelli 2011), auditory metamers as the cross-modal version
- **Labs/Project:** **[check: blank]**

Brainstorm notes. *Fernanda:* Filter banks, pyramids, statistical image models, texture. Lecture 5 + Lecture
10, Ch 22-23, Ch 27, plenoptic. Lab: pyramid blending, texture synthesis by matching statistics. Project:
synthetic texture from your photo, class votes real vs synthetic. *Shreya:* Neural Networks, PyTorch tutorial,
PyTorch lab, Ch 12-14.

### Day 5 · Neural Networks
**Question:** How does a system learn what matters?
**Objective:** Understand how neural networks work.

| Min | Segment |
|---|---|
| 10 | Homework review |
| 15 | Fixed to learned filters |
| 15 | Linear layer to nonlinear network |
| 10 | Forward pass + logits |
| 10 | Loss functions |
| 15 | Backpropagation |
| 10 | Gradient descent + optimizers |
| 30 | PyTorch lab |

- **Homework:** Read, complete training-loop exercise; experiment with one training variable and interpret the result
- **Reading:** **[check: blank]**
- **Coding practice:** nn.Module, forward pass, loss functions, backpropagation, optimizers, training loop
- **Human connection:** Learned visual representations vs. biological visual processing
- **Labs/Project:** Train a small classifier in PyTorch and visualize loss/accuracy

Brainstorm notes. *Fernanda:* Learning to see, neural networks, PyTorch + psychophysics methods. Lecture 7 +
Lecture 8, Ch 9-13, PyTorch tutorial. Lab: training loop, MLP on MNIST, train vs test curves (PyTorch
notebook). Second lab, psychophysics methods as "how to evaluate any system": 2AFC, staircases, psychometric
function, trial counts (jsPsych, PsychoPy). Human link: perceptual learning and critical periods, hand-designed
vs learned filters. Project: frame your project as a learning problem in one line. *Shreya:* CNNs, Ch 24,
online tutorial; maybe a chiller version of pset 1 due end of week.

### Day 6 · CNNs + Evaluation
**Question:** How do we know whether it sees correctly?
**Objective:** Understand how CNNs learn hierarchical visual representations and how to evaluate whether a vision system actually works.

| Min | Segment |
|---|---|
| 10 | Week 1 assignment review |
| 15 | From learned filters to CNNs |
| 15 | CNN architecture: convolution → activation → pooling → classifier |
| 10 | What does each layer represent? |
| 10 | Train / validation / test |
| 10 | Beyond accuracy: confusion matrices, precision, recall, failure cases |
| 40 | CNN coding lab |
| 10 | Project check-in |

- **Coding practice:** Conv2d, channels, kernels, padding, stride, pooling, receptive fields, feature maps
- Homework, reading, human connection, labs: **[check: blank]**

Brainstorm notes. *Fernanda:* Not sure if they should spend this day selecting their project and working on it.
*Shreya:* Vision Transformers, Ch 26, online Colab.

### Day 7 · Transformers + Visual Representation
**Question:** How can machines learn richer visual representations?
**Objective:** Understand how modern vision models transform images, how ViT uses attention to integrate information, and how we can analyze the representations.

| Min | Segment |
|---|---|
| 10 | Homework review |
| 15 | From CNN feature maps → embeddings |
| 15 | Why attention for vision? |
| 15 | Vision Transformer: patches → tokens → self-attention → representation |
| 10 | What does an embedding encode? |
| 10 | Comparing representations: similarity, geometry, invariance |
| 40 | ViT + representation analysis lab |
| 5 | Project connection |

- **Homework:** Readings; use a pretrained vision model to extract embeddings for a small image set, investigate which properties are reflected in the embedding space
- **Reading:** Ch 30
- **Coding practice:** extract intermediate activations, embeddings, cosine similarity, dimensionality reduction
- **Human connection:** face inversion / Thatcher illusion as a representation question
- **Labs/Project:** ViT colab, rsatoolbox

Brainstorm notes. *Fernanda:* Lecture 11, Ch 26, Ch 30, ViT colab, rsatoolbox. Lab: extract embeddings,
cluster, nearest-neighbor search, t-SNE, RDMs across layers. Project: embedding baseline for the student's
project. *Shreya:* Visual Representations, Ch 30.

### Day 8 · Object Recognition + Robustness
**Question:** How do vision models learn to recognize the world?
**Objective:** Understand how recognition systems are trained, how datasets shape their behavior, and how pretrained models can be adapted to new domains.

| Min | Segment |
|---|---|
| 10 | Homework review |
| 25 | Classification, detection, and segmentation |
| 15 | Datasets |
| 15 | Transfer learning |
| 30 | Lab |

- **Coding practice:** pretrained weights, freezing parameters, replacing layers, fine-tuning, learning rates
- **Human connection:** Geirhos texture bias, model-vs-human, Dollar Street, cue-conflict stimuli (humans say shape, CNNs say texture), Mooney faces, cross-race effect as the human analog of dataset bias, whose images are in the dataset
- Homework, reading, labs: **[check: blank]**

Brainstorm notes. *Fernanda:* Lecture 18 + Lecture 20, Ch 50, Ch 35-37. Lab: evaluate on your Day 6
failures, augmentation, fine-tune on a small local dataset. Project: write an engineering or evaluation plan
for the project idea. *Shreya:* Object Recognition, Ch 50.

### Day 9 · 3D + Motion
**Question:** How do we perceive depth and a dynamic world?
**Objective:** Understand how visual systems infer 3D structure and motion from 2D images and video.

**[check]** The segment list in the doc for this day repeats object recognition (classification, detection,
segmentation, datasets, robustness), which looks copied from Day 8. Needs a real 3D + motion breakdown.

- **Human connection:** Ames room, Ponzo, Gestalt laws next to a segmentation model, motion aftereffect, barber pole (aperture problem), point-light walkers

Brainstorm notes (from the earlier "3D, motion, grouping" day, a candidate to cut for a 4th project day):
Lecture 16, 17, 19 + lens/geometry slides from Lecture 2, Ch 31, Ch 39, Ch 48, OpenCV optical flow, Depth
Anything V2. Lab: depth on your photos, flow and tracking on a phone video, segmentation vs where you would
draw boundaries. Project: lock in project and team.

### Day 10 · Generative Models
**Question:** How can machines generate visual worlds?
**Objective:** Understand the main families of generative visual models and how modern systems generate and manipulate images.

- **Reading:** Ch 32, flow matching intro, diffusers
- **Human connection:** Helmholtz unconscious inference, generative models as stimulus makers
- **Labs/Project:** tiny VAE, pretrained (diffusion image-to-image on your photos)

Brainstorm notes. Lecture 13 + Lecture 14. Project: generate variations, classmates judge real vs fake.

### Day 11 · Vision + Language
**Question:** How can machines connect images with concepts and language?
**Objective:** Understand multimodal representations and how vision models can connect images (with language).

- **Human connection:** Kanizsa triangle then ask a VLM if it sees it; color naming across languages (Berinmo, Himba)

Brainstorm notes. Lecture 21, Ch 51, CLIP. Lab: zero-shot classification, text-to-image search. Project:
prototype day, report one number. *Shreya:* Datasets + Vision Models, Ch 35-36; some variant of pset 3 due end
of week, maybe some data material from pset 4.

### Day 12 · AI + Society
**Objective:** Connect to real-world applications and societal changes brought by modern visual AI.

Brainstorm notes (earlier "Putting it together" day): Lecture 23, Ch 52-55, 6.S058 project page. Lab: package
a model (or AI workflow) as a script or Gradio demo, README, one figure. Human link: inattentional blindness
as the closing point, what any vision system leaves out.

### Days 13-14 · Project work sessions

### Day 15 · Final project presentations + wrap-up

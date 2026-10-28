# Course plan

Transcribed from Fernanda and Shreya's "AIMS Brainstorming" doc (the "Finalized Material" table, with the
earlier brainstorm notes for each day underneath). This is the plan every session builds from. Where the
plan is blank, the deck shows a dashed TO DO box: never fill a gap by inventing content.

Inspired by the intro CV course schedule: https://introtocv.github.io/schedule.html. Readings are chapters of
Torralba, Isola & Freeman, *Foundations of Computer Vision* (the "Vision Book").

Known gaps and glitches in the source doc are marked **[check]**.

---

## Day 1 · Introduction to Visual Systems
**Question:** What does it mean to see?
**Objective:** Understand perception vs measurement, describe a simple system, set up the coding environment.

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

- **Homework:** Read chapters 1-4, finish Python tutorial, take a picture of xxx **[check: of what?]**
- **Reading:** Ch. 1-4
- **Coding practice:** Python + NumPy: arrays, indexing, slicing, reshaping, image tensors, plotting
- **Human connection:** Checker-shadow illusion, perception as inference
- **Labs/Project:** N/A

Brainstorm notes. *Fernanda:* Intro, what is possible, project pitches. Ch 2 simple system, Lecture 1 slides
trimmed to measurement vs perception + the simple system (~25 min), then a tour of what is possible with 5
project families, our own projects as examples, student pitches from breakout groups. Lab: Colab setup,
rebuild the simple system (Python tutorial 1). Human link: checker shadow illusion as the opening slide, hollow
face or the dress; perception is inference under priors. Project: pitch template with one build sentence and
one question sentence, feedback overnight. *Shreya:* Intro + Vision Overview, Ch 1-4.

## Day 2 · Seeing with Machines
**Question:** What can a machine see from one image?
**Objective:** Learn the basic pretrained-model workflow.

| Min | Segment |
|---|---|
| 10 | Homework review |
| 15 | One image has many ways to see |
| 10 | Demo |
| 45 | Lab |
| 15 | Human vs. machine perception |
| 10 | Introduce Week 1 PSET |

- **Homework:** Read chapters 5-7, find an interesting CV topic/application, complete PyTorch exercise, begin Week 1 PSET
- **Reading:** N/A
- **Coding practice:** PyTorch basics: tensors, tensor operations, shapes, broadcasting, CPU/GPU
- **Human connection:** Measurement vs perception in practice
- **Labs/Project:** One-image vision app

Brainstorm notes. *Fernanda:* From their own picture to an app. One photo through the whole stack:
- OpenCV to load and crop: https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html
- torchvision pretrained classifier: https://pytorch.org/vision/stable/models.html
- Hugging Face depth estimation pipeline: https://huggingface.co/tasks/depth-estimation,
  https://huggingface.co/docs/transformers/main_classes/pipelines
- Gradio wrapper: https://www.gradio.app/guides/quickstart

One path per tool, alternatives on a closing slide. Lab: build the app on your own phone photo, then point it
at a classmate's. Lab goal: the pretrained model workflow. Load an image, preprocess it, run a model you did
not train, read the output, wrap it in a demo. Classification and depth are the two examples; the skills
transfer to any pretrained model. Human link: the classifier's top 5 on a photo it gets wrong vs what the room
sees; measurement vs perception as a tool. Project: give them a few minutes to keep brainstorming; we present
feedback from the pitches (which we work on overnight). Prep work for us: pre-download models to a shared
drive, check computer/GPU at AIMS, keep models small so it runs on CPU just in case.
*Shreya:* Image Formation, Python Exercises, Ch 5-7.

## Day 3 · Image Formation + Processing
**Question:** Where does an image come from?
**Objective:** Understand pixels and simple image processing operations.

| Min | Segment |
|---|---|
| 10 | Homework review |
| 20 | Image formation |
| 20 | Convolution mathematically |
| 10 | Human vision: receptive fields / Gabor filters |
| 45 | Implement 2D convolution from scratch in NumPy |
| 15 | Edge detection + sharpening + blur |

- **Homework:** Read material, convolution/math practice, continue work on PSET
- **Reading:** Ch. 5-7
- **Coding practice:** Convolution from scratch, kernels, padding, stride, Fourier transform
- **Human connection:** Mach bands, Hermann grid, Hubel & Wiesel next to a Gabor bank (Michael Bach illusions, Adelson gallery)
- **Labs/Project:** Convolution from scratch, edge detection

Brainstorm notes. *Fernanda:* Image formation (brief) + image processing, filtering, Fourier. Lecture 2
trimmed to pinhole + color (Ch 5), then Lecture 3 + Lecture 4, Ch 15-18. Lab: convolution from scratch, edges,
hybrid image from your own photos (Python tutorial). Project: filter bank over your dataset.
*Shreya:* Image Processing, Python Tutorial, Ch 15-16.

## Day 4 · Image Representations
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

## Day 5 · Neural Networks
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

## Day 6 · CNNs + Evaluation
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

## Day 7 · Transformers + Visual Representation
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

## Day 8 · Object Recognition + Robustness
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

## Day 9 · 3D + Motion
**Question:** How do we perceive depth and a dynamic world?
**Objective:** Understand how visual systems infer 3D structure and motion from 2D images and video.

**[check]** The segment list in the doc for this day repeats object recognition (classification, detection,
segmentation, datasets, robustness), which looks copied from Day 8. Needs a real 3D + motion breakdown.

- **Human connection:** Ames room, Ponzo, Gestalt laws next to a segmentation model, motion aftereffect, barber pole (aperture problem), point-light walkers

Brainstorm notes (from the earlier "3D, motion, grouping" day, a candidate to cut for a 4th project day):
Lecture 16, 17, 19 + lens/geometry slides from Lecture 2, Ch 31, Ch 39, Ch 48, OpenCV optical flow, Depth
Anything V2. Lab: depth on your photos, flow and tracking on a phone video, segmentation vs where you would
draw boundaries. Project: lock in project and team.

## Day 10 · Generative Models
**Question:** How can machines generate visual worlds?
**Objective:** Understand the main families of generative visual models and how modern systems generate and manipulate images.

- **Reading:** Ch 32, flow matching intro, diffusers
- **Human connection:** Helmholtz unconscious inference, generative models as stimulus makers
- **Labs/Project:** tiny VAE, pretrained (diffusion image-to-image on your photos)

Brainstorm notes. Lecture 13 + Lecture 14. Project: generate variations, classmates judge real vs fake.

## Day 11 · Vision + Language
**Question:** How can machines connect images with concepts and language?
**Objective:** Understand multimodal representations and how vision models can connect images (with language).

- **Human connection:** Kanizsa triangle then ask a VLM if it sees it; color naming across languages (Berinmo, Himba)

Brainstorm notes. Lecture 21, Ch 51, CLIP. Lab: zero-shot classification, text-to-image search. Project:
prototype day, report one number. *Shreya:* Datasets + Vision Models, Ch 35-36; some variant of pset 3 due end
of week, maybe some data material from pset 4.

## Day 12 · AI + Society
**Objective:** Connect to real-world applications and societal changes brought by modern visual AI.

Brainstorm notes (earlier "Putting it together" day): Lecture 23, Ch 52-55, 6.S058 project page. Lab: package
a model (or AI workflow) as a script or Gradio demo, README, one figure. Human link: inattentional blindness
as the closing point, what any vision system leaves out.

## Days 13-14 · Project work sessions

## Day 15 · Final project presentations + wrap-up

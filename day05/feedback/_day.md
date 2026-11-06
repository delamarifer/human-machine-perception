# Day 5 · Neural Networks: feedback and open questions

Plan: `plan/course-plan.md`, Day 5. Preview: `python3 -m http.server 8149 --directory .` from the repo root,
then `http://localhost:8149/day05/deck.html` (one part: `?only=filters`).

## Round 1 · 2026-10-28 · first full draft (day05 session)

22 slides, 133 clicks. All notes are `(draft)`. Six scenes, all computed live in the browser (seeded, so they
look the same every time); no data, figures or numbers are invented:

| Scene | What is computed |
|---|---|
| `filters-learned.html` | a toy image (shapes + noise, made in code); Sobel output; a 5x5 filter learned by gradient descent to match the clean image's horizontal change. It comes out Sobel-like; error 0.0015 learned vs 0.0039 Sobel |
| `boundary.html` | two-moons toy data; a linear layer and a 2-10-1 ReLU network, both trained live (Adam). Linear 93% correct, hidden layer 100% |
| `forward.html` | a 25-6-3 network trained at load on 5x5 bar images (vertical, horizontal, diagonal). 95% on fresh test images; the two shown images get 93% vertical and 96% diagonal |
| `loss.html` | the cross-entropy curve; three p values (0.9, 1/3, 0.02) are illustrative inputs, and the notes say so |
| `backprop.html` | x=1.5, y=2, w1=0.8, w2=0.5: forward values, every gradient, a finite-difference check (−2.100 vs −2.1), one step with lr 0.1 (loss 1.96 → 0.54) |
| `descent.html` | the real MSE surface of a 2-weight linear model on toy data (inputs correlated 0.9); paths for lr 0.1, lr 0.58 (blows up), momentum, Adam |

### Questions for Fernanda
- [ ] **Owners.** Every Day 5 part says "Owner: to decide". Who owns which part (or all of Day 5)?
- [ ] **Training inside one click.** On the filters and boundary scenes (and the descent paths), one click starts
      a training animation that runs for 4 to 5 seconds and then stops. It never advances the slide by itself.
      OK, or do you want each click to run only a fixed number of steps?
- [ ] **Colors.** No new data colors for classes: class 1 = filled ink dots, class 0 = open dots, gray shading.
      I used ochre (`#b45309`) for "gradient" on the backprop and descent scenes, as the day's one new data
      color. Keep ochre = gradient for the rest of the course?
- [ ] **Human connection, deeper stages.** Slide 8 (networks predict IT responses) overlaps with Day 6's "What does
      each layer represent?". Keep it on Day 5, or move it to Day 6 and keep Day 5 on first layers + learning?
- [ ] **Perceptual learning.** The brainstorm mentions perceptual learning and critical periods. Critical periods
      are on slide 9 (Wiesel & Hubel 1963). Perceptual learning is not on a slide yet: which example and source?
- [ ] **Figure for slide 7.** The `.todo` asks for first-layer filters of a trained network next to a V1 receptive
      field. Which image (and do we have the right to show it)? Options: Krizhevsky et al. 2012 Fig. 3, or render
      our own from a pretrained torchvision model in the lab notebook.
- [ ] **Homework review (slide 4).** Pick 2-3 student reflections from Day 4 to show.
- [ ] **Reading.** Blank in the plan; the brainstorm says "Ch 9-13" (Fernanda) and "Ch 24" / "Ch 12-14" (Shreya
      for Days 4-5). Which chapters?
- [ ] **Lab dataset.** The PyTorch slide (20) assumes 28x28 images and 10 classes (MNIST, from the brainstorm).
      Confirm MNIST, or another dataset (Fashion-MNIST, CIFAR-10)?
- [ ] **Brainstorm items not on slides:** the psychophysics methods lab (2AFC, staircases, psychometric function)
      and "frame your project as a learning problem in one line". Should either be in Day 5?

### References used on slides (check before class)
- Hubel, D. H. & Wiesel, T. N. (1962). Receptive fields, binocular interaction and functional architecture in the
  cat's visual cortex. *Journal of Physiology*, 160, 106-154.
- Wiesel, T. N. & Hubel, D. H. (1963). Single-cell responses in striate cortex of kittens deprived of vision in one
  eye. *Journal of Neurophysiology*, 26, 1003-1017.
- Krizhevsky, A., Sutskever, I. & Hinton, G. E. (2012). ImageNet classification with deep convolutional neural
  networks. *NeurIPS*.
- Olshausen, B. A. & Field, D. J. (1996). Emergence of simple-cell receptive field properties by learning a sparse
  code for natural images. *Nature*, 381, 607-609.
- Yamins, D. L. K. et al. (2014). Performance-optimized hierarchical models predict neural responses in higher
  visual cortex. *PNAS*, 111, 8619-8624.
- Khaligh-Razavi, S.-M. & Kriegeskorte, N. (2014). Deep supervised, but not unsupervised, models may explain IT
  cortical representation. *PLoS Computational Biology*, 10, e1003915.
- Geirhos, R. et al. (2019). ImageNet-trained CNNs are biased towards texture; increasing shape bias improves
  accuracy and robustness. *ICLR*.
- Szegedy, C. et al. (2014). Intriguing properties of neural networks. *ICLR*.
- Lillicrap, T. P., Santoro, A., Marris, L., Akerman, C. J. & Hinton, G. (2020). Backpropagation and the brain.
  *Nature Reviews Neuroscience*, 21, 335-346.
- Rumelhart, D. E., Hinton, G. E. & Williams, R. J. (1986). Learning representations by back-propagating errors.
  *Nature*, 323, 533-536.

### What the Day 5 PyTorch Colab lab needs (for the notebooks session)
Name per `notebooks/README.md`: `notebooks/day05-lab-train-a-classifier.ipynb` (built from `notebooks/build/day05_lab.py`).
- Dataset: MNIST (pending the question above) via `torchvision.datasets`, downloaded in the notebook; no Drive.
- Section 0: environment check (torch, torchvision versions; CPU is enough, note that GPU is optional).
- Tensors and a `DataLoader` (batches), one batch plotted with labels.
- An `nn.Module` MLP matching slide 20: Flatten, Linear(784, 128), ReLU, Linear(128, 10); count its parameters.
- One forward pass by hand: logits, `softmax`, and `nn.CrossEntropyLoss` on one batch (link to slides 12-15).
- `loss.backward()` on one batch, and a finite-difference check of one weight's gradient (link to slide 16).
- The training loop from slide 20, with SGD lr 0.1; record training loss per step and train / test accuracy per
  epoch; plot loss and accuracy curves (train vs test).
- "Your turn": change one variable (learning rate, hidden units, epochs, SGD vs Adam), rerun, and explain the
  curves. This is also the homework's experiment.
- Optional: show the first-layer weights as 28x28 images (what the network learned), linking to the human
  connection slides.
- Runtime budget: whole notebook under about 5 minutes on a free Colab CPU (2-3 epochs of MNIST is enough).

## Round: cnn-limits · 2026-11-06 · CNN-to-Transformer opener (Shreya's session)

New part `cnn-limits` before `vit`: five screens (deck slides 5, 6, 7A, 7B, 8), 22 clicks. All notes are `(draft)`.
Source: Vision Book section 26.2 and Fig. 26.1, plus the fc-versus-attention comparison in 26.6. Values are in
`day05/assets/cnn-limits/results.json`, transcribed and rounded from the run log (the raw files were lost).

### Questions
- [ ] **Time.** Section 2 is budgeted 25 minutes with no room added for these five screens. Raise the budget, or cut elsewhere?
- [ ] **Overlap.** The "Why not just use a CNN?" card on the first `vit` slide now repeats this part. Keep it as a recap, or remove it?
- [ ] **Notebook link.** `notebooks/day05-lab-far-apart-patches.ipynb` has no row in `notebooks/README.md` (shared file), and its Colab badge works only once it is on `main`.

### Not verified
- [ ] The notebook's revised "Your turn" (L = 1, d = 4 and 6) was never run to the end. The sweep supports it at width 32 and 1,000 steps, but the notebook uses width 16 and 400 steps.
- [ ] Notebook run time is unknown. The last complete run took 585 s while competing with other jobs, with 2 CPU threads. Run it once on Colab before using it live.
- [ ] Why 29 of the 63 runs inside the limit failed. Longer training was not tested, so the slide and notes leave this open.
- [ ] Attention is not on an equal budget: 3,000 steps, against 1,000 for the others. The slide citation and notes say so.
- [ ] Attention without positional embeddings reached 87% in one run, not chance. Possibly a position cue inside the 4-pixel patches, not tested, and not on any slide.

### References to check before class
- Luo, W., Li, Y., Urtasun, R. & Zemel, R. (2016). Understanding the effective receptive field in deep convolutional neural networks. *NeurIPS*. (cited from memory)
- Photo: Keith Kissel, "June odd-eyed-cat" (cropped), CC BY 2.0, Wikimedia Commons.
- ResNet-18's 435-pixel receptive field is computed from its layer sizes, not taken from a paper.

## Round: outline rebuild · 2026-11-06 (Shreya's session)

Day 5 now follows Shreya's Google Slides outline, with tokens moved before attention and ViT after attention. Slide numbers
in the cnn-limits round above are out of date. Running order: `start`, `cnn-limits`, `transformer`, `vision-transformer`,
`explore-transformer`, `return-to-cat`, `backup`. `opening`, `vit` and the parts from `embeddings` onward are kept but not loaded.
The separate brain slide was dropped at Shreya's request; two sentences in the notes carry the human link.

### To fill in
- [ ] Real images for the CNN gaps on slide 4B. It is text only for now, and the outline asks for examples of failure.
- [ ] Section minutes in `order.js` are draft proportions. Only the 12-minute quiz comes from the outline.

### To check
- [ ] Fig. 26.7 and 26.9 are linked, not copied: the book is CC BY-NC-ND, and that license applies to the work in full.
- [ ] Book notation is used on the self-attention slides (m, W_q, softmax within each row). The `vitTokens` scene still uses d_k.
- [ ] Beery et al. (ECCV 2018) on slide 4B is cited from memory.

## Round: simplify CNN section · 2026-11-06 (Shreya's session)

Goal from Shreya: slides should not overwhelm, should communicate simply, and should show examples visually. Section 26.2 guided the
thinking, it is not quoted. Slides 5 to 12 are now one idea per screen, with no notes. The earlier detailed slide moved to backup.
Slide 5's title is now "Do the two eyes match?"; the outline's title is dropped. Slides 13 onward have not had this pass.

## Round: demo removed · 2026-11-06 (Shreya's session)

The same-four-eyes demonstration is out of the deck at Shreya's request: its three talk slides and two backup slides now sit in
`parts/cnn-limits-demo.js`, not loaded. `notebooks/day05-lab-far-apart-patches.ipynb` and `assets/cnn-limits/results.json` are unchanged.

## Round: four-question lecture · 2026-11-06 (Shreya's session)

Slides 10 to 30 are rebuilt around four questions: tokenization, attention, self-attention, multi-head attention. 45 minutes after the
quiz and recap: CNN section 6, roadmap 1, tokenization 8, attention 13, self-attention 7, multi-head 5, full picture 3, checkpoint 2.
Earlier slide numbers in this file are out of date.

- Exercises: `notebooks/day05-lab-transformer-exercises.ipynb`, built from `notebooks/build/day05_transformer_exercises.py`.
- Figures: the book is CC BY-NC-ND, so every diagram is an original simplified drawing that links the book's figure.
- The cat stays only in the CNN section. `transformer-v1`, `return-to-cat` and `cnn-limits-demo` are kept, not loaded.

### To do
- [ ] The Colab link needs the notebook on `main`, and `assets/metamers/coffee.jpg` is already there.
- [ ] `notebooks/README.md` (shared) needs a row for the new notebook.
- [ ] Timing is an estimate. Try a run-through, especially with four exercises in 45 minutes.

### Book figure on slide 14 · 2026-11-06
- Fig. 26.7 is reproduced unmodified with full credit and a license link, at Shreya's decision (`assets/transformer/visionbook-fig-26-7.webp`, from her screenshot). Keep the file uncropped and unedited. The book notes that its license does not cover components included with permission, so the photo inside the figure may have its own terms.

### CNN recap slides · 2026-11-06
Slide 4A uses the book's Figs. 24.1 and 24.5, unmodified, in `assets/visionbook-ch24/`, with the credit line Shreya specified plus a license link. Fig. 24.1 credits its photo to Fredo Durand.
Slide 4B is plain written strengths and gaps (Shreya's request), after two worked examples proved too specific.
- [ ] `day04/scenes/cue-conflict.html` gives ResNet-50 as 21.4% shape. The paper's text says 22.1% shape vs. 77.9% texture. Day 5 uses 22.1; check the Day 4 scene (Fernanda's day).

### Four questions pipeline · 2026-11-06
"Connect everything" is removed (kept unloaded in `parts/cnn-limits-demo.js`). The Four questions slide is now an animated pipeline, one stage per click, drawn for this deck.

### Position · 2026-11-06
Position sits with tokenization, before Exercise 1 (Shreya's decision, after trying it later): why tokens need a position, then Fig. 26.20, unmodified and credited. The book concatenates the code onto each token; the ViT adds a learned code; the deck follows the ViT. The shuffle check stays at the end of the notebook. Exercises are slides 13, 18, 23 and 25.

### Build-a-Transformer lab · 2026-11-06
`notebooks/day05-lab-build-a-transformer.ipynb`, from `notebooks/build/day05_build_transformer.py`: image to tokens, attention by hand, attention module, self-attention, encoder block, full Vision Transformer. Modules and shapes only: nothing is trained (Shreya's decision). The attention module takes two inputs; slides 18A and 18B and the exercises notebook match it.
- [ ] Needs a row in `notebooks/README.md` (shared), and the notebook on `main` for its Colab badge.
- [ ] Decide whether the four in-lecture exercises stay as previews of this lab.

### Generic photo · 2026-11-06
The cafe photo is replaced by "Goats feeding on leaves in the bush in Kuria East Kenya" by Elite Jac, CC BY-SA 4.0 (already on `main` at `day04/assets/photos/goats.jpg`), in the slides and both notebooks. `assets/transformer/` images are regenerated from it, so the shuffled and attention-map images are adaptations under the same license.

### Notebook solutions · 2026-11-06
At Shreya's request, both Day 5 notebooks now show solutions and answers in collapsed dropdowns, so they are public once on `main`, and there is no separate teacher copy. Blank exercise cells raise `NotImplementedError`, so "Run all" stops at the first blank. That differs from the `notebooks/README.md` rule that blank exercises run without errors.

### Exercise 3 removed · 2026-11-06
The in-lecture "change one token" exercise is removed from the deck and the exercises notebook; the lab's section 4 keeps that check. The multi-head exercise is now Exercise 3. Exercises are slides 13, 18 and 24.

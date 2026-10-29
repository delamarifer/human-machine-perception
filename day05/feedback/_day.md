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

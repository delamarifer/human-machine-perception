# Day 5 · Transformers and visual representations: feedback and open questions

Day 5 follows the public syllabus (`syllabus.html`): Transformers and visual representations. Since Round 3 the
base is Shreya's deck (see below). Segments and
minutes come from the plan block "Transformers + Visual Representation" (`plan/course-plan.md`), the human
connection is face inversion and the Thatcher illusion, and the syllabus adds k-NN, K-means, t-SNE, RSA and
CNN vs ViT. Preview: serve the repo root (`python3 -m http.server <port> --directory .`), open `day05/deck.html`.

The earlier Neural Networks deck (fixed to learned filters, a 2D classifier trained live, forward pass,
loss, backprop, gradient descent, PyTorch training loop) was removed from `day05/` in this round. It is in git
at commit `b57d7e4` (`day05/parts/*.js`, `day05/scenes/*.html`), if any of it is wanted for Day 4 or later.

## Round 4 · 2026-11-04 · the Day 5 lab is MIT 6.S191 Lab 3 (day05 session)

Fernanda: "This will be the lab for Day 5:
https://github.com/MITDeepLearning/introtodeeplearning/blob/master/lab3/LLM_Finetuning.ipynb"

What the notebook does (read from it, 2026 version): fine-tunes LiquidAI LFM2-1.2B, a 1.2-billion-parameter
language model. Part 1 covers chat templates, tokenization, next-token prediction with cross-entropy, and LoRA
(rank 8, on q/k/v/o and MLP projections) with a Lion optimizer, training first to a leprechaun style and then to Yoda.
Part 2 is "LLM as a judge": Gemini 2.5 Flash through OpenRouter scores the Yoda-speak, with Comet Opik for metrics and
tracing. The final cell computes the likelihood of held-out Yoda text, for MIT's class competition (a Dropbox
submission).

Done in this round:
- New slide 16, `f-lab` ("Lab: fine-tune a language model"), after the representation-space scene. It credits
  the source ("MIT 6.S191 Introduction to Deep Learning, Lab 3, LLM Fine-tuning (MIT License)") and links LoRA to the
  query, key and value matrices from the attention slide. A TO DO box holds the open decisions below.
- My scene notes no longer promise a ViT lab: `vit.html` now points to fine-tuning a language model built from the same
  blocks, `rsa.html` names rsatoolbox, and `thatcher.html` (notes and its on-screen line) calls the ViT Thatcher test an
  open question and a possible small project.

### Questions for Fernanda (Round 4)
- [ ] **Shreya's slides still name the ViT lab.** `s-practical` ("Lab: day05-lab-vit-embeddings", notes too),
      `s-homework` ("Finish the lab: day05-lab-vit-embeddings") and `s-rsa` (notes: "the numbers from the lab"). These are
      her words, so I left them. Should she change them, or should I make copies (`f-practical`, `f-homework`) that
      name the new lab?
- [ ] **API keys and cost.** Part 2 needs an OpenRouter key (paid; MIT gives credits only to its own students; free
      models are rate-limited) and a Comet/Opik key. `notebooks/README.md` says notebooks use no API keys. Options: Part 1
      only in class; Part 2 as an optional homework; or an instructor demo of Part 2.
- [ ] **GPU.** Students must switch Colab to a GPU runtime (the 1.2B model plus LoRA). Check it fits a free T4 and how
      long 200 training steps take.
- [ ] **Competition cell and Dropbox submission** are MIT's. Tell students to skip the submission, and decide what
      they upload to our course site instead.
- [ ] **Course copy or link?** Link the original notebook (the solution notebook is public in the same repo), or make
      a course copy in `notebooks/` with the MIT credit kept, per the license note in its first cell?
- [ ] **Vision link.** The lab is about language. Slide 16 frames it as "the same blocks". Want a short vision tie-in
      (for example, LoRA is also used to adapt ViTs), or leave it?
- [ ] The Round 2 ViT-embeddings lab spec (below) is not the Day 5 lab anymore. Keep it for a later day, or drop it?

## Round 3 · 2026-11-04 · Shreya's deck as the base, with Fernanda's scenes (day05 session)

Fernanda: "Add my scenes to hers." The running order is now Shreya's Day 5 from the instructors repo
(`day05/` at `ade0ad7`): her 13 parts copied as is (`s-*.js`, wording and notes untouched) and her `deck.html`
(its styles for `.card`, `.cols`, `.agenda`, `.tbl`). The six live scenes from Round 2 sit next to her slides, one per
`f-*` part. The Round 2 parts (my own slides) are removed; they are in git at `2e6d39d`.

20 slides, 122 clicks; every click walked forward and back, passages == clicks + 1 everywhere, console clean.

| After her slide | Scene |
|---|---|
| 4. How does a model decide what information matters? | `attention.html` (patches attending to patches) |
| 5. How does a Vision Transformer work? | `vit.html` (the steps with numbers) |
| 7. From features to visual representations | `embedding.html` (feature maps pooled to an embedding) |
| 9. Exploring the representation space | `embedding-space.html` (neighbors, K-means, t-SNE) |
| 10. Human and machine representations | `rsa.html` (three RDMs, rank correlation) |
| *before* 11. The Thatcher effect (her notes ask for the demonstration first) | `thatcher.html` |

Only the scenes' first notes changed, so each one follows her slide instead of repeating its question.

### Questions for Fernanda (Round 3)
- [ ] **Response paper left out.** `s-hw-questions` (handwritten start-of-class questions, "same role as the Day 3
      Part 1 response paper") is not in the public deck, per the rule that response papers stay in the instructors
      repo. Its 8 minutes ("Questions") are dropped from SEC_MINUTES here.
- [ ] **Time.** Her sections add up to 120 minutes without the scenes. The six scenes add about 35 clicks. Which
      sections give up time, or do some scenes go to the lab instead?
- [ ] **Overlap to trim.** The Thatcher scene's beats 3-5 repeat what her Thatcher slide says. Keep both, or cut the
      scene after beat 2 (the reveal)?
- [ ] **Sync back.** Should these scenes also go to the instructors repo, in their own folder, so Shreya sees them?
- [ ] **3Blue1Brown.** Deep Learning Ch. 6, "Attention in transformers, visually explained" (YouTube `eMlx5fFNoYc`),
      as an optional link before or after slide 6? It explains attention on text, not images.

## Round 2 · 2026-11-04 · rebuilt as Transformers (day05 session)

19 slides, 109 clicks, every note `(draft)`. Six scenes, all computed live in the browser (seeded). No data,
figures or numbers are invented. The images are toy textures made in code, and the "network layer" is a
hand-designed Gabor filter bank (as on Day 3), standing in for a CNN layer and said so in the notes.

| Scene | What is computed |
|---|---|
| `embedding.html` | image → 8 Gabor filters → feature maps → averaged to 8 numbers. Same kind, shifted stripes: pixel r −0.36 but embedding similarity 1.00; a different kind: −0.48 |
| `attention.html` | 64 patches; softmax(q·k/√d) with untrained projections (q = k = v = patch features). The query patch puts 68% on its own block, 30% on the matching block in the far corner |
| `vit.html` | patches → linear embedding → + position → + CLS → 17×17 attention → weighted sum + MLP. Random weights; the notes say it shows the arithmetic, not a trained ViT |
| `embedding-space.html` | 48 images: PCA, 5-NN (91% same kind; raw pixels 45%), K-means k=6 (96% purity), exact t-SNE on the embedding and on raw pixels |
| `rsa.html` | RDMs (1 − r) for the embedding, raw pixels, and a "same kind" model; Spearman: embedding 0.55, pixels 0.06. Shown as rank percentiles |
| `thatcher.html` | a schematic face and its Thatcherized version; filter-bank distance between them is the same upright and upside down (0.023 both), because a bag of orientation energies cannot see configuration |

The shared toy-set code (images + filter bank) is pasted into each scene so each stays self-contained.

### Questions for Fernanda
- [ ] **Owners.** Every Day 5 part says "Owner: to decide". The plan note says Days 3-5 are Shreya's draft. Is Day 5
      Shreya's, and should she review this?
- [ ] **Does Day 4 cover CNNs?** The notes say "on Day 4, a CNN turned an image into feature maps" and refer to
      transfer learning on Day 4, following the syllabus. The `day04/` deck currently covers image representations
      and metamers. If Day 4 does not teach CNNs, slides 5-6 need a short CNN recap.
- [ ] **Toy images vs real photos.** The scenes use toy textures and a Gabor bank so everything is computed live.
      Fine for the lecture, with real photos and a real ViT in the lab? Or should some slides show real ViT outputs
      (made once in the lab notebook and saved as images)?
- [ ] **Thatcher photo (slide 15).** The slide is a TO DO: which face photo can we use (with credit), or do we
      make one in the lab notebook from a photo with permission?
- [ ] **Homework review (slide 4).** Pick 2-3 student questions from the Geirhos reading.
- [ ] **Reading.** The plan says Ch. 30 for this day; Shreya's brainstorm says Ch. 26 (ViT) and Ch. 30. Which?
- [ ] **Lab notebook.** No Day 5 notebook exists yet; slide 17's Colab link is a TO DO (spec below).
- [ ] **Colors.** No data colors on any Day 5 slide (grayscale and ink only). Ochre-as-gradient from the old deck
      is gone with it.

### References used on slides (check before class)
- Geirhos, R. et al. (2019). ImageNet-trained CNNs are biased towards texture; increasing shape bias improves
  accuracy and robustness. *ICLR*.
- Vaswani, A. et al. (2017). Attention is all you need. *NeurIPS*.
- Dosovitskiy, A. et al. (2021). An image is worth 16x16 words: Transformers for image recognition at scale. *ICLR*.
- Kriegeskorte, N., Mur, M. & Bandettini, P. (2008). Representational similarity analysis: connecting the branches
  of systems neuroscience. *Frontiers in Systems Neuroscience*, 2, 4.
- Kriegeskorte, N. et al. (2008). Matching categorical object representations in inferior temporal cortex of man
  and monkey. *Neuron*, 60, 1126-1141.
- Khaligh-Razavi, S.-M. & Kriegeskorte, N. (2014). Deep supervised, but not unsupervised, models may explain IT
  cortical representation. *PLoS Computational Biology*, 10, e1003915.
- Thompson, P. (1980). Margaret Thatcher: a new illusion. *Perception*, 9, 483-484.
- Yin, R. K. (1969). Looking at upside-down faces. *Journal of Experimental Psychology*, 81, 141-145.

### ViT-embeddings lab spec (Round 2; no longer the Day 5 lab, see Round 4)
Name per `notebooks/README.md`: `notebooks/day05-lab-vit-representations.ipynb` (built from `notebooks/build/day05_lab.py`).
- Section 0: environment check (torch, torchvision, rsatoolbox via `pip install -q rsatoolbox`; CPU is fine).
- Load `torchvision.models.vit_b_16` with `ViT_B_16_Weights.IMAGENET1K_V1`; `model.heads = nn.Identity()` gives the
  768-number CLS embedding (matches slide 16).
- A small image set downloaded in the notebook (credited, stable URLs), plus "add your own photos".
- Embeddings: cosine similarity, 5 nearest neighbors, K-means, t-SNE (scikit-learn), with thumbnails on the map.
- Intermediate layers: hooks on `model.encoder.layers` to get the CLS token per block; an RDM per layer;
  RSA across layers with rsatoolbox (matches slides 12-13).
- Thatcher test: a face and its Thatcherized version, upright and upside down; compare embedding distances.
  This is an open question for the students; report whatever the model does.
- "Your turn": which image properties show up in the embedding space (the homework).
- Runtime: under about 5 minutes on free Colab CPU (a few dozen images is enough).

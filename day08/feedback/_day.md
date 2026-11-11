# Day 8 · Generative Modeling: feedback and open questions

Source: Google Slides "Day 8 - Generative Modeling" (fileId 1qIlpyaBiQpmEiLnd4ELaAvdTLj_W8zBCzgfWixt2rns), slides 1-20.
Owner: Shreya. Parts: day08/parts/start, use-cases, overview, autoencoders.

## Comments in the Google deck, and what they became
Each comment is listed with its Google slide number and what the HTML does now.

- [x] Slide 1, "include the calendly link and the group project names assigned to me": link and the six group topics added (from Shreya's message).
- [x] Slide 2, "don't include these links": removed.
- [x] Slide 3, "TO DO: will fill in with examples later": placeholder "Examples: to add later".
- [x] Slide 5 (Overview), "make a very basic timeline of this to just show the overview of the model family": timeline of four families with years. Years and citations are from the original papers, not from the Google deck. Check them.
- [x] Slide 6, "include definition simply and some type of animation or image": one-line definition, then two boxes that build in (discriminative vs generative).
- [x] Slides 7 and 8, "we can combine this and the next slide to show what we are doing and why": one slide, "What we are doing, and why". Slide numbers from old 9 on now move down by one.
- [x] Slide 9 (latent variable), the pasted textbook text under the title image: replaced with our own shadow drawing and short cues. The textbook figure and text are not copied. Check the wording.
- [x] Slide 13, "animate this piece coming in": the image builds on click 2.
- [x] Slide 14, "animate from frame to frame ... input flow ... decoder ... input and output side by side with the MSE loss": flow builds one step per click, then the side-by-side with the MSE formula.
- [x] Slide 16 (untitled in the Google deck), "include a title that indicates the training over time improves the output": title added, with epochs 1, 2 and 5.
- [x] Slide 17, "show how reducing / increasing the bottleneck affects reconstruction and the bottleneck definition": bottleneck defined, and codes of 2, 8 and 32 numbers shown.
- [x] Slide 18, "animate this and include a small text on why this is a problem": scatter, then the decoded gaps, then random draws from N(0, I), each with a line of why.
- [x] Slide 20 (Applications), "include an image example for each" and "animate showing the models, the use cases, then the images": model, then three use cases, then images.

Comments on slides after 20 (GAN, VAE, and the pieces on slides 21 and later) are not built yet.

## Questions for Shreya
- [x] Slide 1: "Assignment #1 Due Friday", plus "Proposals Due Friday" (Shreya, 2026-11-11).
- [ ] Slide 3: examples for use cases. What do you want?
- [ ] Slide 4 had no title in the Google deck. I used its first question as the title. OK?
- [ ] Slide 5 years and citations: Hinton and Salakhutdinov 2006 (Science); Kingma and Welling 2014 (ICLR); Goodfellow et al. 2014 (NeurIPS); van den Oord et al. 2016 (NeurIPS). Confirm which citation you want on screen.
- [ ] Slide 6 definition wording: "A generative model learns the distribution of the data, so it can make new examples." Confirm.
- [ ] Slide 6 text from the Google deck also mentions PMF vs PDF and the examples DALL·E 2, MRI to CT translation, molecular docking. Put any of these on screen?
- [ ] Slide 8 (old 9): the shadow analogy is drawn for this deck. Is the wording right: "But other objects could cast the same shadow."?
- [x] Latent Space slide (title only) removed (Shreya, 2026-11-11).
- [ ] Slide 14 chart: the input and output images come from our workbook (MLP autoencoder, 8-number code).
- [ ] Slide 15 wording "The input is its own label" is ours. Confirm.
- [ ] Slide 20: use cases chosen by me: compression, interpolating between images, denoising. Confirm, and say what image you want for denoising (no denoising model in the workbook yet).
- [ ] Section minutes in order.js are guesses.

## Figures
Ours, from the workbook (MNIST, LeCun et al., 1998): recon, latent scatter, decode grid, prior samples, training over time, bottleneck sizes, flow images. Files are in day08/assets/.
Still a placeholder: old slide 7 and 8 combined figure (learning the distribution, rare cases). Source:

## Done in this round
- Slides 1-20 rebuilt with the comments applied; VAE part removed from the running order (it is slide 21 onward).
- No speaker notes (per Shreya's rule). Not pushed to any final deck.

## Images from the Google deck (round 2)
- No videos are needed. The deck's visuals are still images, and the animation is done in the HTML: slide-in, zoom, stacked frames that cover each other, and click-by-click builds.
- Used: slides 7, 8 (day08/assets/google/s07-rare-cases-outliers, s08-sample-generation), slide 8 shadow (s09), slide 13 diagram (s13), slide 14 frames 1-5 and frame 3 at the end (s14-frame1..5), slide 16 training pair (s16-epoch-a, s16-epoch-b), slide 17 bottleneck diagram (s14-frame3), slide 18 latent problem diagram (s18).
- [ ] Sources: the frames carry a third-party logo, and the bird image on the slide 13 diagram has no credit. Find the source for each Google image, then replace "source: to add".
- [ ] Slide 16 labels "early in training" and "later in training" are from the curves in the two images. Confirm the epochs if you have them.
- [ ] Slide 17: the bottleneck diagram is the same image as frame 3 on slide 14. Keep both, or use a different one?
- [ ] Slide 14: the last click shows frame 3 with the MSE formula. Frame 3 is the input and output side by side.

## Timeline (round 3)
- [x] Slide 5 timeline now has diffusion models (Sohl-Dickstein et al., ICML 2015) and flow models (Rezende and Mohamed, ICML 2015).
- [ ] Diffusion: 2015 is the first paper. The models people use today date from DDPM (Ho et al., NeurIPS 2020). Put 2020 on the timeline instead, or add it as a second diffusion point?
- [ ] Check the citations and years on slide 5 before the talk.

## Image animations (round 4)
Each Google image now reveals its own parts, at positions detected by script (not by eye):
- Slide 7: two images side by side. "What": a ring walks curve, samples, generated examples. "Why": a ring on typical driving data, then on the rare cases.
- Slide 8: only the shadow shows; the scrap sculpture that cast it is revealed on the last click.
- Slide 12: the diagram slides in; a ring walks data space, encoder and z, decoder and reconstruction error, the inset.
- Slide 13: in each frame, black covers lift in the order of the flow: input, encoder and bottleneck, latent point, decoder and output. Then the MSE line. 18 clicks.
- Slide 15: the later frame draws its loss curve on (a 2.4 s wipe from where the early curve stopped), then a ring on the sharper output.
- Slide 16: a ring on the bottleneck, then our size comparison.
- Slide 17: the image's own title is cropped off (the slide title says it); its red caption comes in on the next click.
- [ ] Slide 13 frame order changed from the Google deck's 1, 2, 3, 4, 5 to 1, 2, 5, 4, 3: encoder half, decoder half, then the whole network, so the input and output end side by side with the MSE loss. OK?
- [ ] The Google deck had the two motivation images under each other's titles (the outliers image under "Learning the data distribution"). The files are now named by what they show.
- [ ] Sources: slide 7 images carry an MIT 6.S191 watermark; slide 8 is an artwork photo; frames on slides 13 and 15 carry a third-party logo. Credits still to add.

## Round 5 (Shreya, 2026-11-11)
- [x] Bottleneck slide: the old 2/8/32 figure looked equally blurry at 8 and 32. Replaced with the workbook figure (2-number code: blurry, some digits wrong; 64-number code: sharp). No new training (Shreya: not needed).
- [x] Announcements: the six groups are tabbed in under the sign-ups line, in two columns.
- [x] Applications: real uses with the paper for each: denoising (Vincent et al., ICML 2008), anomaly detection in factory inspection (Bergmann et al., CVPR 2019), learned compression (Ballé et al., ICLR 2017), the autoencoder under Stable Diffusion (Rombach et al., CVPR 2022).
- [x] Applications images: one figure from each paper, cropped from the PDF above its caption (day08/assets/papers): Vincent et al. 2008 Fig. 1 (corrupt, encode, decode, compare to clean), Bergmann et al. 2019 Fig. 1 (MVTec AD defects outlined), Rombach et al. 2022 Fig. 3 (encoder to latent, diffusion, decoder). Cited on the slide.
- [ ] Paper figures are copyrighted by their publishers (ICML/PMLR, CVF, arXiv license). Fine for teaching with the citation; check before the deck goes on the public site.
- [x] Code slide removed. Slides are now numbered 1-18.
- [x] Math is LaTeX, rendered with KaTeX 0.16.9 from cdnjs (loaded in day08/deck.html): the loss slide, the MSE line, p(x) and p(class | x), N(0, I).

## Round 6: intro follows the reorganized Google deck (2026-11-11)
The Google deck now runs: 1 Announcements, 2 Title, 3 Use Cases, 4 What is a generative model?, 5 Overview, 6 latent variable, 7 Latent Space, 8 latent variable models, 9 Autoencoders.
- [x] 3A Use Cases: four examples from the lecture her note links (Kaiming He, MIT 6.7960, Lecture 14): chatbot, text to image (Stable Diffusion), text to video (Sora), protein design (RFdiffusion, Watson et al., Nature 2023). One per click.
- [x] 3B "What do these scenarios have in common?": the lecture page, bullets uncovered one per click.
- [x] 4A What is a generative model?: the definition in one line, then the lecture's discriminative vs generative figure (generative half revealed on its own click), then her note: a distribution, not one label; softmax already gives p(class | x).
- [x] 4B Generative modeling is probabilistic modeling: data, data distribution, estimated distribution, new sample (lecture pages 26-29), one per click.
- [x] The four questions slide and the "What we are doing, and why" slide left the Google deck, so they left the HTML too. They are kept, unused, in parts/_removed.js.
- [x] Her note also mentions DALL·E 2, MRI to CT translation, molecular docking, and PMF vs PDF. Shreya: fine without them (2026-11-11).
- [ ] Lecture figures are Kaiming He's (MIT 6.7960), cited on each slide. Check before the deck goes on the public site.

## Round 7: Overview without dates (2026-11-11)
- [x] The timeline is gone (Shreya: the dates looked wrong). Slide 5 now shows the model families one per click: a chip with the name, the lecture's diagram for it, and one line on the idea. Order: autoencoders and VAEs, GANs, autoregressive, diffusion, flow matching. Diagrams: Kaiming He, MIT 6.7960 Lecture 14, pages 67, 70, 71, 73, 75.
- [x] Diffusion and flow matching stay on the Overview (Shreya, 2026-11-11), even though the Google deck has no sections for them yet.

- [x] Latent Space slide removed (Shreya, 2026-11-11). Numbers after slide 6 move down by one.

## Round 8: VAEs, GANs, autoregressive models and the recap (Google slides 18-46), 2026-11-11
HTML slides 16-44 (48 slides in the deck now, 266 clicks). Every Google comment on these slides is applied:
- [x] 19 encoder outputs mu and sigma, a Gaussian in latent space; we cannot backpropagate through randomness.
- [x] 20 the items animate one by one (epsilon, then mu and sigma, then z), then z = mu + sigma ⊙ epsilon in LaTeX.
- [x] 21 the objective comes in term by term (ring on each term with its box); 21B: the KL term and the prior in LaTeX.
- [x] 24 the key idea first, then the graph that breaks it down.
- [x] 25 latent space, decoder, generated, one per click; then our VAE grid (workbook) and "organized latent space gives realistic images".
- [x] 26 two images, then their codes, then the in-between shape, then the formula.
- [x] 27 and 38 Applications: the model, the uses, then one figure from each paper (VAE: molecules, NVAE faces, latent diffusion; GAN: StyleGAN faces, CycleGAN, SRGAN).
- [x] 28 goal in one step; 29 and 30 the slide's information pulled out, with its diagram; 31 less text, the diagram builds part by part.
- [x] 32 the two images, then our schematic: fakes move closer until the discriminator can only guess 1/2.
- [x] 33 the goal shown, not said: "Which one is generated?" with a ring on the generated, then the real photos.
- [x] 35 the min-max formula written out piece by piece and explained; 35B animates between the three images.
- [x] 42 each formula comes in separately (LaTeX, not the video screenshot); 43 the example in text (next-word classifier) and in images (pixels).

### Questions for Shreya
- [ ] Titles I added where the Google slide had none: "What if we just want to sample?", "Two networks compete", "Which one is generated?", "Training GANs", "Reparametrizing the sampling layer", "Next word, next pixel", "Training: score the prediction", "Pixels: training, then sampling". OK?
- [ ] The Google image of the KL term (slide 21, not used) writes -1/2 Σ(σ + μ² - 1 - log σ); the standard form is +1/2 Σ(σ² + μ² - 1 - log σ²), which is what the slide shows.
- [ ] The three MIT frames on 35B use D = probability of fake, so their log terms are swapped relative to the standard formula on 35A. The slide says so in one line. Keep both, or drop the frames?
- [ ] Recap table (slide 44) is written by me: how each family makes an image, its loss, a strength and a caution. Check the wording.
- [ ] Schematics, labeled on the slides: the training frames on 32 and the next-word bars on 43.
- [x] MIT 6.S191 (Introduction to Deep Learning) confirmed by Shreya as the source of the MIT-style slides; cited without "to confirm" (2026-11-11).
- [ ] Still "source: to add": the black-background frames (VAE 19, 20, 21, 23, 25, 26; GAN training loop 36), the GAN training diagram (34) and the autoregressive lecture screenshots (40-45).
- [ ] The autoregressive screenshots had video subtitles and player controls; I cropped them off. A small part of the bottom of each figure is lost.

## Round 9 (2026-11-11)
- [x] Autoregressive slides rebuilt as our own diagrams (HTML, SVG, LaTeX), no lecture screenshots (Shreya). Pixel image, palette and bar lengths are a schematic, labeled on the slides. The a40-a45 screenshots are no longer used.
- [x] Autoencoder Applications now mostly generative, plus anomaly detection (Shreya): Stable Diffusion's latent space (Rombach et al. 2022), generating from learned codes (VQGAN, Esser et al. 2021), filling in missing parts (MAE, He et al. 2022), anomaly detection (Bergmann et al. 2019). Denoising and compression cards removed.

## Round 10 (2026-11-11)
- [x] Bottleneck line rewritten: "The bottleneck is the narrow layer in the middle. Everything the decoder knows about the image has to pass through it."
- [x] VAE slides that were screenshots of MIT 6.S191 slides are now our own diagrams with the information pulled out: 19B (the network, then the loss, KL term and prior in LaTeX), 20 Regularization Intuition (continuity and completeness, then latent spaces without and with a normal prior, schematic), 22 Reparametrizing the sampling layer (key idea, then the original and reparametrized graphs, with where the gradient stops and where it reaches). The animation stills stay.
- [x] GAN slides that were MIT screenshots are now our own diagrams (Shreya, 2026-11-11): What if we just want to sample? (noise, G, a fake sample in the learned distribution), Two networks compete (G part, then D part), Intuition (D's task and D's output per point, then the schematic training frames), Training GANs (networks and data, then the feedback, then the global optimum), the min-max objective on the network (D's turn, then G's turn, standard convention, so the swapped-terms note is gone), Noise to distribution (trained generator, then GANs and CycleGANs). Real data is green and generated data salmon on every GAN slide. The flamingo figure (Foundations of Computer Vision) and the training-loop stills stay.

## Round 11 (2026-11-11)
- [x] Slide 6 What is a latent variable?: one idea, said plainly. "A hidden cause behind the data we see", the shadow, "we see the shadow (the data), not what cast it (the latent variable)", the reveal ("we can only infer the cause, and the guess can be wrong"), then the takeaway "Models learn a few hidden factors, instead of modeling every pixel."
- [x] Slide 7 Latent variable models: a two-row diagram of how each family uses z (autoencoders and VAEs compress real images into z; GANs start from a random z), then "Both use a small hidden code z. They differ in how they learn it."
- [x] Model title slides (Autoencoders 8, VAEs 16, GANs 26, Autoregressive 37): each has a small diagram of the family and a one-line idea, one click each.
- [x] Slide 9 Compress, then reconstruct: the diagram is from Torralba, Isola and Freeman, Foundations of Computer Vision (Shreya). Figure number still to add.

## Round 12 (2026-11-11)
- [x] Compress, then reconstruct: three slides (textbook diagram, five video frames, "A loss with no labels") became one slide drawn for the deck: the question, input 7, encoder to a code, decoder to the output 7, then compare with the loss (LaTeX) and "no labels needed". Real digits from the workbook. The old slides are kept unused in parts/_removed.js. Deck is now 46 slides.
- [x] Latent space problem: plainer wording, one point per click (codes cluster; empty space between; codes there decode badly; random codes land there; so we cannot sample reliably, VAEs fix this).
- [ ] Smaller bottleneck slide: the first image is a video still (a 0 going through encoder, bottleneck, decoder), the second is our workbook figure comparing a 2-number MLP code with a 64-number convolutional code (two different networks). Redraw it as one clean comparison of the same digit?
- [x] Autoencoder Applications: photos for every use (Shreya). Stable Diffusion now shows generated images (Rombach et al. 2022, Fig. 5) instead of the architecture diagram; 2 x 2 cards with the name, the photo, one line and the paper.

## Round 13 (2026-11-11)
- [x] Reparametrizing the sampling layer: a key under the formula (z, mu, sigma, epsilon, ⊙).
- [x] Two terms in the loss (first slide): drawn in the style of the slides after it: the loss in LaTeX term by term, then a card per term. The video still is gone.
- [x] Can't propagate through randomization: moved after Regularization Intuition and drawn for this deck (problem: the gradient stops at the random sample; solution: z = mu + sigma ⊙ epsilon, the gradient reaches mu and sigma).
- [x] From a point to a distribution: the backpropagation line removed.
- [ ] Order now: ... Regularization Intuition, Can't propagate, Training, Reparametrizing. Move Reparametrizing right after Can't propagate, since they explain the same fix?
- [x] VAE Training: a drawn animation replaces the two images (codes scattered at epoch 0 glide into the prior and group by class at epoch 50). Schematic.
- [x] Reparametrizing key now also defines x (input image), phi (encoder weights), f (the loss computed from z).
- [x] Continuity and completeness is now "Smooth interpolation" (same spot, after Generation), drawn for the deck with real digits from our VAE: a 7 and a 3, their codes, the codes in between decoding left to right (7, 9, 8, 3), then the formula and what it shows.
- [x] "What if we just want to sample?": x_fake labeled "a generated sample".
- [x] Smooth interpolation (Google 26, Continuity and completeness) removed (Shreya). Kept unused in parts/_removed.js.
- [x] GAN Training loop: drawn and animated (Shreya). The four steps build on the left (newest dark); on the right the network being trained lights up and the other is marked fixed; a curve shows D ascending and G descending V(G, D); the objectives come in underneath; then "repeat: k updates of D per update of G". The video stills are gone.

# Day 8 Part B feedback

## 2026-11-10: first build (Fernanda's plan for the hour)
Sources: CVPR 2022 diffusion tutorial, NeurIPS 2024 flow matching tutorial, "Diffusion Meets Flow Matching" blog post, trilemma paper (Xiao, Kreis, Vahdat 2022).
Checked against the sources: the trilemma paper (text and Figure 1), DDPM (schedule, T, simplified objective), Song et al. (Anderson 1982, VP SDE, probability flow ODE), the NeurIPS slides and the blog post. The CVPR tutorial's own slides (Google Drive) and video were not opened; only its page was. The DDPM equations were written from the paper's standard form, with the constants checked in its text.
Figures are computed on a toy 2D mixture, not copied. Every note is a draft.
- [x] Part A covers VAEs and GANs (Fernanda, 2026-11-10), so the title-slide note and the trilemma recap stand as written.
- [ ] Fernanda: the plan's minutes add up to 60 (15 + 10 + 15 + 5 + 15), while the request says a 45-minute block plus the recap. Confirm 45 + 15.
- [ ] The CS 180 history slide (normalizing flow and diffusion arcs) is not included: its PDF was not checked.
- [ ] The ICLR 2023 venue for Liu et al. and Albergo and Vanden-Eijnden was not opened; the NeurIPS slides list both as arXiv 2022.
- [ ] Not built yet: lecture-notes.html for this part, a home page link (shared file index.html), a lab or homework.

## 2026-11-11: diffusion rebuilt around the Welch Labs video (Fernanda's request)
Fernanda: use https://www.youtube.com/watch?v=iv-5mZ_9CPY for explaining diffusion, adapt it, make our own animations. Also: "I honestly can't explain most of the math on the slides."
- Diffusion and score-sde parts now follow the video's arc (8:20 to 25:00, read from its YouTube transcript): image as a point, spiral, noise as a random walk,
  predict the total noise, a field that changes with time, DDPM model step plus random step, collapse to the average without it, DDIM.
- Our own animations on our own spiral (64 small Gaussians), computed exactly; checked numerically: DDPM ends on the spiral (mean radius 1.77 vs data 1.81),
  with the noise line deleted the points collapse to radius 0.39 near the spiral's inner end; DDIM with 100 and 20 steps lands on the spiral, 10 steps is worse, 5 is clearly off.
- Equations removed from the diffusion section: training and sampling are now recipes in words; one labelled formula stays (noisy = faded clean + noise).
- Dropped slides: forward process equations, reverse process, the SDE equations slide, the old ring scenes (noise, score, sde-ode). In git history.
- [ ] The flow matching and same-coin sections still carry equations (straight-line loss, the FM/CFM theorem, the alpha/sigma schedules). Simplify the same way?
- [ ] The video's Stable Diffusion "blurry tree" result is mentioned in the notes only, credited to the video.

## 2026-11-11 (later): examples and the DDPM algorithms (Fernanda's request)
- New slide 2 "What diffusion models can do": text to image (SD 3.5) and a style (SD 2022), both public domain on Wikimedia Commons (assets/examples/SOURCES.md),
  and text to video: the Welch Labs video embedded at 0:47 to 1:13 (Wan 2.1 astronauts). The embed needs internet in the room.
- New slide 3 "Beyond pictures": Diffusion Policy (robot actions), RFdiffusion (proteins), GenCast (weather), text only with citations.
- New slide 6 "The DDPM algorithms": Ho et al. Algorithms 1 and 2 typeset (not a screenshot), then the video's two surprises highlighted one per click
  (noise added while generating; predict the total noise), plus a third of ours (the time input).
- Removed as redundant with the algorithms: "Training, in words" and "Generating an image, in words" (in git history).
- Skipped for image editing: the Commons inpainting example shows a real person, and the other one has an unsuitable prompt.
- [x] The embedded video tile is removed from slide 2 (Fernanda: "remove this, we can add this to the website").
- [ ] For the coordinator: add the Welch Labs video (https://www.youtube.com/watch?v=iv-5mZ_9CPY) to the Day 8 card on index.html (shared file).

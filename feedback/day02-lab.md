# Day 2 lab (`notebooks/day02-lab.ipynb`): feedback

Owner: Shreya. Suggestions only; the lab is yours to change or not.

## 2026-11-02 · from Fernanda
A second version of this lab was built in parallel (branch `claude/colab-day2-492603`, file
`notebooks/day02-lab-one-image-app.ipynb`, build script `notebooks/build/day02_lab.py` on that branch).
Yours stays the Day 2 lab; that branch will not be merged. Three pieces from it might be worth folding in:

- [ ] **Phone camera.** `gr.Image(type="numpy", sources=["upload", "webcam"])` plus `demo.launch(share=True)`
  gives a public `gradio.live` link students open on their phone to take a photo with the camera. Your lab
  deliberately keeps the app local ("It does not publish a public link"): Gradio says a share link lasts
  up to a week (in practice it stops when the Colab runtime stops), so this is a privacy choice for us
  to make together. Without `flagging_mode="never"`, anyone with the link can press "Flag" and save the
  uploaded photo to the Colab disk. If yes: add it as an optional step with a note to
  use only photos they are OK sharing, and `flagging_mode="never"` so nothing is saved.
- [ ] **A second transformation.** SegFormer-B1 semantic segmentation as an alternative to depth, behind a
  small `TRANSFORMS` dict so students can drop in another Hugging Face pipeline. Runs on CPU.
- [ ] **A ready-made failure photo.** "Elephant bronze sculpture" by Carlos Valenzuela, CC BY-SA 4.0
  (Wikimedia Commons, in `day02/assets/human-vs-machine/`): on the original Commons file ResNet-18 says
  triceratops 28.7%, cowboy boot 26.6%, and "Indian elephant" only 9th. On the re-saved `photo.jpg` in the
  repo the elephant categories rank 11th and 13th, and the café photo gives espresso 85.2% (slides: 85.9%),
  so a notebook run won't match the Day 2 slides exactly. Matches the Day 2 lecture's human vs machine segment. The notes
  say on the record that the photo was picked because the model gets it wrong.

To see any of these: `git show claude/colab-day2-492603:notebooks/build/day02_lab.py`.

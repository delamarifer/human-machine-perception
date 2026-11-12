# Day 8 lab (2026-11-12), owner: Shreya

Two hours: 30 min discussion, 50 min workbooks, 40 min project work. Preview: `deck.html` (13 slides).

## Round 2 (2026-11-12)
- Discussion now opens from yesterday's Turing test question. It moves to open questions about the mind, then four theories
  (predictive processing, global workspace, integrated information, embodied cognition), pairs talk, and the Google Form.
  The first discussion draft is kept, unused, in parts/_removed.js.
- Track B is now workbook/gan-lite.ipynb, which runs on a CPU only. Measured with 2 CPU threads: Part 1 (2D ring) takes 4 s,
  Part 2 (MNIST, 3 epochs) takes 35 s, plus a one-time MNIST download. It replaces the deepmancer GAN notebook (about 1.5 h on a CPU).
  Measured on 2 CPU threads: Track A takes about 3 min of training, Track C about 30 s.

## Round 3 (2026-11-12)
- The Track A card no longer says "our Day 8 workbook" (students have not seen it). The gan-lite Try-it question now says "if a classmate did Track A".
- The theory piece is now interactive:
  - "Where do you stand?": four claims, one per click. The class votes with hands, and the next click names the theory behind the claim.
  - "Theory jigsaw": each project group reads up on one theory (Wikipedia links) for 5 min and answers three questions, then reports back in 1 min.
- The form link is in. assets/form-qr.svg encodes it (made with segno), and the slide shows it next to the link.

## Open questions
- [ ] Jigsaw: groups 1 and 5 take predictive processing, 2 and 6 global workspace, 3 integrated information, 4 embodied cognition. Change these if you like.
- [ ] What exactly was yesterday's Turing test question? The slide says "Yesterday: can a machine pass as human?". Reword it to match.
- [ ] Folder name `day08-lab`: Day 9 in the syllabus is robotics and multimodal, so this isn't called day09. Rename it?
- [ ] Announcements were copied from the Day 8 deck. Are they still right today?
- [ ] The Colab links for Track B (gan-lite) and the Day 8 workbook only work once day08-lab is pushed to main.
- [ ] Not linked on the home page yet; the home page is a shared file.

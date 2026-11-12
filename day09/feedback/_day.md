# Day 9 (2026-11-12), owner: Shreya

Was drafted as day08-lab. Renamed to day09 and pushed to main on Shreya's request. It is NOT linked from the home page (her request): the URL is .../day09/deck.html.

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

## Round 4 (2026-11-12): workbooks with TODOs, solutions kept private
- Three notebooks of our own in day09/workbook/, named for their content:
  - Track A: autoencoders-and-vaes (built from Day 8 workbook sections 1-2), 5 TODOs.
  - Track B: gans-from-2d-to-digits (was gan-lite), 3 TODOs.
  - Track C: diffusion-on-a-spiral (replaces the outside Colab, which had point values), 3 TODOs plus 1 optional.
- Each TODO raises NotImplementedError with a hint, and a check cell after it says when it works.
- Solutions: private/day09-workbooks/solutions/*-solutions.ipynb, built with private/day09-workbooks/build.py.
  private/ is git-ignored, so neither is ever pushed. Edit build.py, not the notebooks, and re-run it.
- Point values removed: the MIT HW5 link (which had point values) is gone from "Done early?". The diffusion lecture notes stay.
- Solutions run end to end with every check passing, on 2 CPU threads while the machine was heavily loaded:
  A about 5 min, B 37 s, C about 1 min.

## Open questions
- [ ] Jigsaw: groups 1 and 5 take predictive processing, 2 and 6 global workspace, 3 integrated information, 4 embodied cognition. Change these if you like.
- [ ] What exactly was yesterday's Turing test question? The slide says "Yesterday: can a machine pass as human?". Reword it to match.
- [ ] Announcements were copied from the Day 8 deck. Are they still right today?

## Round 5 (2026-11-12)
- [x] Solutions now in the public repo, not linked from the deck: `day09/workbook/solutions/` (with `build.py`, which builds both versions: `python3 day09/workbook/solutions/build.py`). Shreya OK'd that students could find them on GitHub.
- [x] Final "Groups" slide deleted; the deck ends on "Project time · 40 minutes".

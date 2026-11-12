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
- [x] "Every track runs on a CPU. Stuck? Ask a neighbor." removed from the "By the end" slide.
- [x] Theory jigsaw cards each have an example (Shreya's choices): duck-rabbit image for predictive processing, the invisible gorilla video (Daniel Simons' YouTube) for global workspace, split-brain experiments for IIT, the rubber hand illusion for embodied cognition (Wikipedia links).
- [ ] Proposal submission form with a required "link to your proposal" question, proposal kept in the group's feedback folder: waiting on Shreya (I can't create Google Forms; options: Shreya makes it and sends the link, or reuse forms.gle/wBXHE6AFaHf8RR4T8).
- [x] "Where do you stand?" claims reworded in Shreya's words (2026-11-12); list widened so each claim wraps cleanly.
- [x] Same four claims posed as yes/no questions; hands-up prompt is now "yes · no · not sure". Claim 3 became "Can a system behave intelligently without being conscious?" (check this keeps your meaning).

## Round 6 (2026-11-12): theories one at a time, animated
- [x] "Where do you stand?" list and the theory jigsaw replaced by one slide per theory (slides 7-10), not a progression.
  Each: the question as title → hands up (yes · no · not sure) → animated example → the theory with Shreya's sentence and a Start here link.
  - Predictive processing: duck-rabbit (labels "A duck, looking left" then "A rabbit, looking right"; positions read from the image's pixels).
  - Global workspace: invisible gorilla redrawn: two teams pass balls, a gorilla walks through while the class counts; reveal; link to the original video.
  - IIT: split brain: bridge cut, KEY flashed on the left, "I saw nothing.", the left hand picks out the key, "One head, two minds?"
  - Embodied: rubber hand: real hand hidden, both brushed together, "That's my hand.", a hammer comes down, "Many people flinch".
- [x] New closing slide "Does today's AI have any of this?" (four questions, hands up). Remove it if you'd rather go straight to the form.
- [ ] Check: "In the original video, about half of viewers missed it" (Simons and Chabris 1999) and "Many people flinch" (Armel and Ramachandran 2003): wording is mine (draft).
- [x] Gorilla slide: the original video (Daniel Simons, YouTube) is embedded on click 2 in place of the redrawn animation; click 3 hides it (and stops it) and the drawing circles the gorilla.
- [x] Gorilla slide, clicks 5-6: the workspace drawn (vision → workspace → speech, memory, action). The attended passes are broadcast; the gorilla is stopped before it gets in. "Seen by the eyes, never broadcast: you can't report it."
- [x] Rubber hand slide, click 2: a real demonstration embedded (National Geographic, "Is That My Real Hand?" on YouTube); the drawing then explains it.
- [x] "Hands up: yes · no · not sure" removed from the four theory slides and the "Does today's AI have any of this?" slide.

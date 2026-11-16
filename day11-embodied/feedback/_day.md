# Day 11: Embodied Intelligence (owner: Shreya)

Built from Shreya's Google Slides "Day 11 - Embodied Intelligence". No speaker notes (her preference).
Preview: the `day11-embodied` entry in `.claude/launch.json` (port 8149), then `day11-embodied/deck.html`.
The existing `day11/` folder is the copy of the Anadol deck (commit db744c3), so this day lives in `day11-embodied/`.

## Round 1 (2026-11-15): Google slides 1-8 -> 9 HTML slides
1. Title "Embodied Intelligence" (her comment: the Panopto link is not on the slide).
2. What is an embodied agent? Her question, then her two answers, one per click.
3. Discussion question from last week: the quote.
4. What did you say? (new title; her slide had none) The poll as bars, counted from the Day 10 Reflection sheet:
   25 answers, strongly disagree 3, disagree 14, neutral 2, agree 6, strongly agree 0 (same as her pie chart).
5. What did your answers say? (her comment: "pull out insights from this form") Five themes, each with a short,
   word-for-word, anonymous quote from the sheet. Earlier themes fade.
6. What does it mean to experience? Four views, one per click: Nagel 1974 (philosophy), global workspace, Baars 1988 /
   Dehaene (neuroscience), O'Regan and Noe 2001 (cognitive science), Harnad 1990 symbol grounding (computer science).
   Then her line "To know vs to feel", told with Jackson's Mary's room (1982).
7. Examples: physical (Roomba, Spot, Waymo, Perseverance; Wikimedia Commons photos, licenses on the slide) and virtual
   and interface (simulator robot, game agent, computer-use agent, virtual character: simple drawings made for the deck).
8. Her video (Drive file 9ED16C18-...MP4) in the Drive player.
9. What are common problems? Her six items, then "Closely related to vision / perception problems!"

## Open questions
- [x] Slide 8 (video): the clip is portrait (900 x 1600): a humanoid robot walking on a busy city sidewalk. The player is
      now 9:16, so there are no black bars. Shreya: it is Rizzbot. Now "Meet Rizzbot" (draft): the video, then "Is it an embodied agent?", then: a Unitree G1;
      reports say a person nearby controls much of it, so who is making the decisions? Sources: Spectrum News 1 Texas,
      NBC, Unitree press release (2025). Reports disagree on how much is autonomous.
- [ ] Slide 8: the Drive player only plays for viewers signed in with access: share the file "anyone with the link",
      or put the MP4 in assets/ so it plays from the deck.
- [ ] Slide 8: the video would not play in the Browser pane (only the first frame showed), so its length is not checked.
- [ ] Slide 9, item 3 had no name: I called it "Configuration". "relevant to the environment": did you mean "relative to"?
- [ ] Slide 2: "Is robot interchangeable?" is shown as written, with robot in quotes. Want "Is an embodied agent the same as a robot?"
- [ ] Slide 5: OK to show students' words (anonymous) in class?
- [ ] Two answers chose "Strongly disagree" / "Disagree" but argued that AI does NOT need experience (they may have read
      the scale backwards). Counts are shown as submitted.
- [ ] Minutes per section in the progress bar (order.js) are a guess.
- [ ] Should this replace `day11/` (the Anadol copy) and get a link on the home page?

## Round 2 (2026-11-16): Google slides 9-16 -> HTML slides 10-17 (parts labs.js, selfmodel.js)
10. CSAIL Embodied Intelligence Group: her 18 labs grouped into four aspects (seeing and sensing, bodies and movement,
    planning and reasoning, language and people), one column per click, then the Quest mission.
11. Vacuum: Roomba photo, "We can't even build a vacuum robot", then a 4-stage pipeline (sense, where am I, plan, move),
    each tagged with its name from the common-problems slide, then "sense again".
12. Vision for Self-State Estimation: her four lines, one per click.
13. What is missing in the 3D Scene Representation?: her image (cropped), scan, train NeRF, "no robot", robotics vs vision.
14. How do robots work today?: a drawn robot arm with her arrows (rigid segments, joints with sensors). On the sensors
    click the arm moves and the angle readout updates; then "basically blind"; then "$25,000 (source to add)".
15. What about cheap, soft, 3D-printed robots? (draft title; her slide had none): her image and line, then the problem.
16. Robot State Estimation & Control From Vision Alone: her image and two lines.
17. Robots that know themselves: Neural Jacobian Fields in five rows (train, learn, use, tested on, limits), from MIT
    News (2025-07-24) and the Nature paper (2025-06-25). The CSAIL page she linked refuses automated reads.

## Open questions (Round 2)
- [ ] Slide 10: the four-aspect grouping is mine. OK, or keep her plain list? She asked for "images from MIT labs":
      lab photos are not free to reuse; send any you have permission for.
- [ ] Slide 14: $25,000 needs a source (and for which robot?).
- [x] Slides 13, 15, 16: her photos of a talk's slides replaced (Shreya, 2026-11-16) with the papers' own figures, all CC BY 4.0:
      13 = F3RM Fig. 1 panels 1-2 (arXiv 2308.07931); 15 = Buchner et al., Nature 2023, Figs 1e (hand) and 4a (walker);
      16 = Li et al., Nature 2025, Fig. 1. The Matusik ICRA 2024 hand is dropped (no open-license image found).
- [ ] Slide 16: her first line ended "solve for the actions the ...": what was the rest?
- [ ] Slide 15: title is a draft.
- [x] Slide 16: the figure is split into panels a and b, each shown large (one replaces the other), text on the right
      (Shreya, 2026-11-16). The first line, "From one image: how each point moves for each command", is a draft I added for panel a.

## Round 3 (2026-11-16): Google slides 17-29 -> HTML slides 18-32 (parts njf.js, learning.js)
No photos of talk slides (Shreya). Drawings and animations made for the deck, KaTeX for the math, and figures from
Li et al., Nature 2025 (CC BY 4.0). Her comments applied on 17, 18, 24, 25.
18. Background: Body Jacobian: a drawn 3-joint arm (positions from forward kinematics). One click per joint: that joint
    turns a little and the tip slides along its Jacobian column (arrow). Then x-dot = J(q) q-dot.
19. Body Jacobian: the formula (new): the matrix with one column per joint, then the linearization, then her line.
20. Learn a Jacobian field: Nature Fig. 2a-b, delta-x = J(x | I) delta-u, her line.
21. A Jacobian field on a soft finger (new, her comment "animation"): a jointless finger, an arrow at every point, then
    it bends along the arrows. Ends on the talk's question: how could we supervise this?
22. The key insight: 3D flow (draft title; her slide said "3D flow field"): the equation with labels.
23. Scene flow and optical flow: a side view of a pinhole camera, computed projections; the points move and their images move.
24. Training data: Nature Fig. 4a (the spiral-column robot), her lines, 12 cameras (from the paper).
25. Self-supervised training: 3D from one image: four boxes, pixelNeRF (Yu et al., CVPR 2021).
26. Self-supervised training: two losses, in symbols (labelled as the idea, not the paper's exact form).
27. The pneumatic hand, moving (draft title; her comment "animate the predicted 3D motion"): Nature Fig. 3a frames as a
    loop, then the authors' own YouTube video (dFZ1RvJMN7A, from the project page).
28. How do we control the robot with a Jacobian field? (her comment "better math"): least squares, pseudo-inverse,
    and what the paper does (gradient steps, about 12 Hz).
29. Given a motion trajectory: Nature Fig. 3d and the per-step solve.
30. Reinforcement learning: a drawn agent-environment loop and the objective. Her slide had a photo of Allegro-hand
    results, which is not RL, so it is not used.
31. Diffusion Policy: imitation learning, then an illustration of denoising an action sequence (Chi et al., RSS 2023),
    then her question "How can we get the target trajectories?"
32. Where does robot data come from? (draft title; her slide said "data"): numbers quoted from her Scale AI link
    (a company blog post, 2025-09-24): trillions of tokens, billions of images, about 5,000 hours of open robot data.

## Open questions (Round 3)
- [ ] Draft titles on 22, 27, 32. And 30: is RL meant to be its own topic here, or was the Allegro image meant elsewhere?
- [ ] 26: the losses are written as the idea; want the paper's exact loss instead?
- [ ] 32: the source is a company blog. Add an independent source (e.g. the Open X-Embodiment or DROID papers)?
- [ ] 27: the YouTube video needs internet in class.

## Round 4 (2026-11-16): slide 2 reworked
- [ ] Slide 2 "What is an embodied agent?" is now a drawn loop (agent decides, acts, world changes, agent senses) beside your three lines, word for word. Drafts to check: the line "Its actions change what it senses next" and the closing "A robot is one kind of embodied agent".

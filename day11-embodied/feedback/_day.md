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
- [ ] Slides 13, 15, 16 use her photos of a talk's slides: low resolution, blurry on a projector. The Nature paper
      (open access) has clean figures for 16-17 if you want them.
- [ ] Slide 16: her first line ended "solve for the actions the ...": what was the rest?
- [ ] Slide 15: title is a draft.

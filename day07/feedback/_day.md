# Day 7 feedback

## 2026-11-09: Day 7 set made from Day 6 (Shreya's request)
- The adapt and future parts, their scenes (adapt-forget, adapt-cl, future-gap) and assets moved here from day06-reduced, unchanged.
- New title slide. Questions:
  - [x] Title "Adaptation and Future Data" kept: it names the two parts in the set.
  - [ ] Day 7 has no quiz timer, announcements or lab yet. Add them?

## 2026-11-09: combined with the Google deck "Day 7" (Shreya's request)
- The Google deck is an outline: Data Worksheet Review, Transfer Learning, Quiz Review, Project Review (two slides), Open Questions.
- Transfer Learning = the adapt slides, then the future-data slides at its end (Shreya's choice). Both parts now carry the section name "Transfer Learning".
- Only Transfer Learning is built for now (Shreya's choice); the other sections are listed in order.js.
- [ ] Shreya still wants to add to the Transfer Learning content: what to add?
- [ ] The title slide still says "Adaptation and Future Data"; the Google deck is titled only "Day 7". Retitle when the other sections are in?

## 2026-11-09: agent memory slides from the Google "Day 7" deck (Shreya's request)
- New part `agents` (slides 20-28), after `future`, still in the Transfer Learning section. It follows her Google slides from
  "Where does learning live?" to "Evaluation", her on-screen wording kept, her build instructions followed.
- Her two images are redrawn so they build click by click: the long-term memory tree, and the agent memory figure (Figure 1 of
  Lance Martin, "The components of agent memory", Anthropic, Nov 6, 2026).
- "From model to agent": the agent loop she asked for (screen or camera, vision-language model, vision tools, act, memory) is our drawing.
- Questions:
  - [ ] Added slide 26 "How the stores connect" (write up, read down, correct, links), numbers from the Anthropic post. Keep or cut?
  - [ ] "Memory in humans": the one-line explanations under her four cues and the "in an agent" line (last click) are ours. OK?
  - [ ] Types of memory: her slide says "Based on Malmberg et al., 2019". Full reference: to add (not yet found).
  - [ ] Nader, Schafe, LeDoux (2000), reconsolidation: not yet checked on PubMed. McClelland 1995, Teyler 1986 and Tse 2007 were checked.
  - [ ] Not brought over: "Share" (after Data Worksheet Review) and "Transfer Learning Related to Humans" (title only in her deck).
  - [ ] Should the agent slides be their own section in the progress bar instead of part of Transfer Learning?

## 2026-11-09: "From model to agent" reworked (Shreya: richer diagram, concrete CV example)
- 21A: the loop now shows each main part: environment (camera or screen) → perception (detect, segment, depth) → agent
  (vision-language model, with the task coming in) → actions (screen and robot) → back to the environment, plus memory read and write.
- 21B (new): one pass around the loop for "put the mug in the sink": see, perceive, decide, act, remember. An illustrative example, not a real run.
- [ ] Is the mug-and-sink example the right one, or would a screen task (filling a web form) fit the class better?

## 2026-11-09: Memory in humans, Evaluation, and an Agents and Memory section (Shreya's request)
- New section "Agents and Memory" in the progress bar, opening on a title slide, starting at "From model to agent".
  "Where does learning live?" stays at the end of Transfer Learning as the bridge.
  - [ ] Bar width: 15 minutes is a guess. What is the real time for this section?
- Memory in humans: her four cues now build a schematic (experience → hippocampus with an index into the neocortex → replay during
  sleep → schema → recall, editable again). The last click adds an "In an agent" column. Our drawing, labelled "not anatomy".
- Evaluation: her two lines, then a table of five aspects (does it help, is it right, is it used, what does it cost, does it keep
  improving), each with a measure and an example from the Anthropic post. New second slide: the post's Figure 3 numbers
  (database task, six models, without and with memory).
  - [ ] The Figure 3 numbers were read from the post by a page-reading agent, not from the figure image. Check them against the figure before class.

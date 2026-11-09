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

## 2026-11-09: Problem Setup as a scene; fine-tuning and subnetwork code (Shreya's request)
- Problem Setup is now scenes/adapt-setup.html (4 clicks): last season (the drone flies in over wheat and corn, f says "corn ✓"),
  this season (the corn turns into soybeans, f still says "corn ✗", having never seen soybeans), f′ grows out of f ("soybeans ✓"), then the two names.
  The farm and drone are our drawings. "f calls soybeans corn" is our illustration: f can only answer with its trained classes.
- New code slides, in the same style as the distillation code: "Fine-tuning in a training loop" (after Pre-training vs fine-tuning) and
  "Finetuning subparts in code" (frozen / finetuned / from scratch, after the subparts figure). Both ran on random tensors with
  torch 2.13 and torchvision 0.28. The check confirmed the frozen layers do not change.
- [ ] The code uses ResNet-18 and the farm's two classes. Use another model or dataset to match the lab notebook once it exists?

## 2026-11-09: From model to agent text; Agent memory open questions (Shreya's request)
- 22A From model to agent: only "a loop of perceive → decide → act → remember" stays on screen (Shreya's choice). The other two lines are said aloud.
- 28 Agent memory (Google slide 11): her three lines are now three cards, each with a picture of its question: who is working on it
  (Anthropic; Letta and UC Berkeley, sleep-time compute; MemGPT), memory beyond text (text, image, embedding, 3D map), and how
  stored pieces relate (flat, hierarchy, linked wiki). Both papers were checked on arXiv: Lin et al. 2025 (2504.13171) and Packer et al. 2023 (2310.08560).
  - [ ] Are those three the right examples for "many researchers and companies", or do you want others named?

## 2026-11-09: Agent memory diagram animation (Shreya: "change the animation style or add variety")
- Each layer now enters its own way, with a small icon like the post's figure:
  1. the session slides in and the transcript log types itself out
  2. a memory note drops in like a pinned card
  3. the wiki's pages pop in and their links draw
  4. injected context slides down and glows once
  5. dreaming fades in and its three arrows draw upward one after another
  6. the next session slides in from the right and injected context is drawn into it
- Motion runs once, right after each click; going back undoes it. It respects reduced-motion settings.

## 2026-11-09: synced with Google slide 11 (Agent memory): her comment and reply
- Her comment: "do not include this text. embed a couple relevant papers and companies here (claude, letta, trajectory, scale ai, etc)".
  Her reply: "add dynamic and varied animations for this. not too much text". Her three lines are gone from the screen.
- Click 1: four company tiles, each entering its own way (from the left, a pop, a drop, from the right): Claude (notes, wikis, dreaming),
  Letta (sleep-time agents), Trajectory (learning from real use), Scale AI (learnings kept for next runs).
- Click 2: four papers dealt onto the table: MemGPT (Packer et al. 2023), Sleep-time Compute (Lin et al. 2025),
  Trajectory-Informed Memory (IBM Research 2026, arXiv 2603.10600), The components of agent memory (Anthropic 2026).
- [x] Trajectory: the 2026 continual-learning startup (Shreya confirmed). Cited to Sequoia's podcast "Continual Learning: How AI Agents Get Better With Every Use"; cue "agents that improve with use".
- [ ] Scale AI: no memory paper found. The cue comes from their long-running enterprise agents post (learnings stored and fed into future runs). Is there a Scale piece you had in mind?
- [ ] The IBM paper's title was read from search results, not from arXiv directly. Check it before class.
- The earlier version of this slide (three illustrated cards: who, beyond text, structure) is replaced. The flat / hierarchy / wiki drawing could come back elsewhere if wanted.

## 2026-11-09: no company names on Agent memory; Evaluation synced to her Google notes (Shreya's request)
- Agent memory (slide 28): "lets not include specific companies". The company tiles are gone. Four papers, named by their authors,
  are dealt in on one click: Packer et al. 2023 (MemGPT), Lin et al. 2025 (Sleep-time Compute), Fang et al. 2026 (Trajectory-Informed
  Memory, arXiv 2603.10600, title and authors checked on arXiv), Martin 2026 (The components of agent memory).
  - [x] Made generic (Shreya: "Yes, make generic"): the figure now says "written by the agent", the Mt. Moon card says "the agent got
    through", and citations name the author and title only ("Martin, The components of agent memory (2026)", "the game-playing example").
    The links still go to the original post. The future part's Scale AI citations (RL Environments, robotics data gap) are not in the agents part and were left as they are.
- Evaluation (Google slide 12): her slide note "open questions in a fun animation: 1) what are we evaluating 2) what metrics. Reword"
  and her comment "just pose a question … how would you go about this and what types of challenges might there be?"
  Now one slide, questions only: a big "?" bounces in, then "What exactly are we evaluating?" (a dart hits a target),
  "Which numbers would tell you it works?" (a gauge needle swings), "How would you test it, and what makes that hard?" (a magnifier sweeps).
  The aspects table and the memory-results chart are removed (still in git history, commit 8ed6901).
  - [ ] Keep the small hint under the first question ("the model, the memory, or the whole agent?"), or drop it?

## 2026-11-09: placeholders for the project slides (Shreya's request)
- New part `project` and section "Project Review" after Agents and Memory, in the Google deck's order:
  32A and 32B Project Review, 33 Project Plan Rubric, 34 Project Rubric. Each opens on its title. One click brings her outline lines in
  dashed TO DO boxes, wording as she wrote it.
- [ ] Fill in each slide when the project review content is ready (ideas overview, groupings, rubrics, an example plan?).
- [ ] Bar width for Project Review: 15 minutes is a guess.

## 2026-11-09: placeholders for the rest of her outline (Shreya's request)
- New part `worksheet` (after the title): section "Data Worksheet Review", slides 2 Data Worksheet Review (title only in her deck,
  so its box says "Content to add") and 3 Share ("A couple guiding questions (we will have people volunteer to share out)").
- New part `closing` (at the end): sections "Open Questions" (37: AI Review · How to use AI · How to work – tips for workspaces and such)
  and "Quiz Review" (38: title only in her deck). The order follows her Google deck, with Quiz Review last.
- Every section in her outline now has a place. The whole deck (41 slides, 226 clicks) walks forward and back cleanly.
- [ ] Bar widths for the new sections (10 minutes each) are guesses.
- [x] Retitled "Adaptation and Systems" (Shreya, 2026-11-09): title slide, browser tab, and the home page's Day 7 card (title and one-line description).

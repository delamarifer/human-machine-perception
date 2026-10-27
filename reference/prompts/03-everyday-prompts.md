# Prompt 3: what the speaker types, day to day

Short messages worked best. Always attach a screenshot and name the slide by the number shown
bottom-left. These are real examples (lightly edited) and what they triggered.

## Feedback on a slide (to the coordinator)
- "Slide 7: the panel A should be the real regression fit, not a schematic." → routed to the owner,
  logged, the owner swaps in the real figure.
- "For all new slides, make sure that it is first the title, then the next click is the portion
  of the slide that is relevant, animated." → a deck-wide round; the coordinator applies what it
  can centrally and tells every session.
- "We don't need these text sentences at the bottom, I can just explain this out loud. Just cues
  and animations that remind me what to say." → deck-wide round: cues, not sentences.
- "For each motion here, make sure I can do it with the arrow and that it doesn't happen
  automatically." → deck-wide round: one click per motion.
- "Can all titles be in the same font and format, and bold?" → one title class in deck.css.
- "Whenever there is a pop-up quote like this, can you make the font larger and bold?" → a
  `.popquote` class.

## Moving things along
- "Push all changes." / "Have everybody push to the final slides." → coordinator pushes every part
  whose session reported done, walks the final deck, commits.
- "Is anything not pushed? Will I lose my edits?" → coordinator lists drafts newer than the pushed
  version and asks for presenter edits to be exported.
- "Do the rest and push." → finish the queued review items in every session, then push.
- "Make the entire presentation better overnight, and push so in the morning I can practice." →
  prompt 4.

## Delegation (say this early, it saves hours)
- "If an agent asks, give them the answers you think are best for intuitive explanations."
- "Do what you think is best." (for a wording or layout choice)

## Presenter and rehearsal
- "Add a presenter view with notes per click, like <a previous deck>." → presenter.html.
- "Put a white screen before each slide so I can talk into it." → the lead-in.
- "Whole-number slide labels and a progress bar per section." → numbering + section bar.
- "Make the presentation enter full screen." → P also requests full screen; F toggles it.

## When the context gets long
- "Write a handoff and start a new coordinator." → prompt 5.

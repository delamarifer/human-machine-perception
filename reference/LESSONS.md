# Lessons from building a defense deck with ~25 Claude sessions

What happened over the two weeks before the defense, and what we'd do the same or differently.
These are takes, not rules. The rules are in the skill.

## What worked

**One session per part, one coordinator.** The talk was split into about 20 parts (intro, each
methods step, each result, each later chapter, acknowledgements). Each session became an expert in
its slides, the figures and data behind them, and the speaker's feedback on them. The coordinator
never built slides; it routed, pushed, verified and committed. This kept every session's context
small and focused, and it let a dozen slides improve in parallel overnight.

**Screenshot plus one sentence.** The speaker's feedback was almost always a screenshot and a line
("this should be the real fit", "make pop-up quotes bigger and bold"). Visible slide numbers made
that work. The coordinator turned each line into a self-contained message for the owner, quoting
her exactly.

**Feedback files, not just messages.** Every routed item also went into `feedback/<part>.md` as a
checkbox. Messages between sessions sometimes expired or arrived mid-turn; the files never lost
anything, and a new coordinator could rebuild the state from them.

**Deck-wide rules as numbered rounds.** When a comment applied to every slide ("titles first",
"no colored words", "cues not sentences", "one type scale"), it became a dated round in
`_deck-wide.md`, applied centrally in the CSS or engine where possible. Eighteen rounds by the
end. Reading them in order tells you how the talk's style was discovered.

**A frozen final deck.** Pushing froze a part, its scenes and its assets. The speaker could rehearse
a stable deck while sessions kept experimenting, and a broken draft never reached the talk.

**Notes as the real script.** Moving every sentence off the slides into per-click notes was the
single biggest improvement in the talk: the slides got calmer, and the presenter view turned the
notes into a teleprompter that follows the clicks.

**Delegating presentation decisions.** About a week in, the speaker said: "if an agent asks, give
them the answers you think are best for intuitive explanations." Questions stopped piling up. The
line held: the coordinator decided layout and pacing, and always asked about facts, claims and her
wording.

**Overnight passes with a morning summary.** A review agent read the paper and the whole script
overnight; sessions applied the fixes; a morning file listed what changed, what didn't, and the
five decisions that needed her, answerable in one message.

**Handoffs.** The coordinator role passed between four sessions. A handoff file (owner table with
session ids, in-flight work, open questions, gotchas) made each takeover take minutes.

## What we'd do differently

**Agree on the style rules on day one.** Most of the 18 rounds could have been one conversation
up front: title first, a white lead-in, one idea per click, cues not sentences, the type scale,
no colored words, how to cite your own work, how big citations are. Each late rule meant every
session revisiting every slide.

**Text was too much and too "AI".** The first drafts had punchy bullet fragments. The advisor's
verdict: "feels Claude-generated; could be more scientific/precise." The fix was wording taken
from the paper, qualified claims, and moving explanations into the notes. Start there.

**Animations were faster than speech.** Practice in a real room showed motion running ahead of
the speaker. Make motion slower than feels right, give every new idea its own click, and dim the
figure when text appears over it.

**Check facts against the paper, always.** A reviewer agent claimed "all six stages" where the
paper said four of six; another misread a vision figure as an auditory one; one slide showed a
superseded figure. A session caught each one only because it checked against the current draft.
Never let an agent "correct" a number from memory.

**Don't touch shared files casually.** A small "improvement" to the presenter view nobody asked
for had to be undone on the morning of the talk, and a `git revert HEAD` reverted another
session's fresh commit instead. Shared files: one owner, additive changes, revert by hash.

**Caching cost hours.** Stale tabs, stale presenter windows, stale worktree copies. Cache-bust
everything and teach the hard reload on day one.

**Acknowledgements come last and change most.** Photos and names arrived on the morning of the
talk. A dedicated session with clear rules (her file is the source of truth, names in the notes,
her script verbatim, `[who?]` instead of guessing) handled six rounds in two hours. Start them a
week earlier anyway.

**Freeze for real.** On the day of the talk: a time box for the last push, "if it isn't ready,
keep the last version", then no more changes. Open a fresh tab; close the old ones.

## Rough numbers
- About 25 sessions over 12 days; 4 coordinators in a row.
- 60+ slides, 500+ clicks, about 7,800 spoken words (about 55 minutes).
- Each push round ended with a full click-through: every click forward and back, zero errors,
  zero missing files, before the speaker saw it.

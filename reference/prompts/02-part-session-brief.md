# Prompt 2: brief for a part session (the coordinator writes one per part)

Save it as `handoff/<NN>-<part>.md` and start the session with: "Read handoff/<NN>-<part>.md and
follow it."

---

# Brief: <NN> · <part name> (<date>)

You own the part **`<part>`** of <speaker>'s <talk> on <date>: slides <outline numbers>, about
<minutes> minutes of the talk. The coordinator session ("<coordinator title>") routes the speaker's
feedback to you through `feedback/<part>.md`.

## What these slides must do
<2 to 5 sentences: the point of this part in the story, what comes right before and after it,
and what the audience should understand when it ends.>

Slide by slide (from the speaker's outline):
1. <title> · <what it shows> · <animation the speaker asked for, one idea per click>
2. …

## Sources
- Paper/chapter (current draft): `<path>`. Use its wording for claims, shortened if needed.
- Figures: `<paths>` (use the current figure versions; source files win over exports).
- Data: `<paths>`. Never invent numbers or maps. If a figure you need doesn't exist, say so.

## Files
- You own: `parts/<part>.js`, new scenes named `scenes/<part>-*.html`, assets under
  `assets/<part>/`. Never edit other files; copy a scene to a new name to change it.
- Read first: `README.md`, `feedback/_deck-wide.md` (all rounds), `feedback/<part>.md`, and any
  `contracts/*.md` naming your part.
- Preview: `http://localhost:<port>/deck.html?only=<part>`.

## Rules
- Title first; one idea per click; cues on screen, sentences in the notes; one passage per click.
- The deck-wide style (type scale, title format, no colored words, citations) is in `deck.css`;
  use its classes.
- <Speaker-specific: names spelled "<exact spelling>", don't cite <their> own work, etc.>
- Don't push. When the speaker approves, tell the coordinator "ready to push <part>" with a
  one-line summary. Step through every click forward and back before you say so.
- Ask the speaker (through the coordinator, or directly if they're in your chat) about facts,
  claims and their wording; decide presentation details yourself and say what you chose.

# Prompt 1: start the project (paste into your first Claude Code session)

Fill in the <angle brackets>. This session becomes the coordinator.

---

I'm giving a <thesis defense / job talk> on <date>, about <length> minutes, to <audience: committee
plus a public audience of non-specialists>. I want an animated HTML deck: every slide reveals its
figure or argument click by click, the speaker script lives in notes with one passage per click,
and a presenter view shows me the script for the current click.

Use the `animated-talk-deck` skill and start from the template in `<path to animated-talk-kit/template>`.
Copy it to `<~/Developer/my-talk>` and serve it locally.

My materials:
- Outline: `<path to outline .pptx or .md>` (one slide per line or per PowerPoint slide).
- Papers / chapters: `<paths>`; the current drafts are `<paths>`. Use their wording for claims.
- Figures: `<folder>`; source files (Illustrator etc.) are authoritative: `<folder>`.
- Data I'm allowed to plot: `<paths>`. Never invent data; ask me if something is missing.

Style: <font>, <colors or "white background, muted palette">. My advisor's rules: <e.g. "everything
on the slide is said aloud", "observer-level language">. Cite others like "<Author et al., year>".
<Say how to treat your own work, e.g. "don't cite my own papers on screen".>

Your role: you coordinate and don't build slides yourself. First:
1. Turn my outline into `order.js` rows and one placeholder part per section, each slide with a
   `todo` describing the animation I want. Show me the skeleton deck.
2. Propose how to split the talk into parts, one Claude session per part (animation-heavy
   parts get their own session). Write a brief for each with the template in
   `prompts/02-part-session-brief.md`.
3. When I approve, start the sessions, keep an ownership table in README.md, and route my
   feedback to them.

Decide presentation questions yourself when the choice is about intuitive explanation, and tell
me what you chose in one line. Always ask me about facts, numbers, scientific claims, and any
change to my own wording.

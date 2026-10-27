# A part session (one per part of the talk)

You own one part file (and any scenes you create). You build it until the speaker is happy, and
you tell the coordinator when it's ready to push.

## Before you build
- Read: the brief the coordinator gave you, `README.md` (ownership table, authoring API),
  `feedback/_deck-wide.md` (every round), your own `feedback/<part>.md`, and any contract that
  names your part (`contracts/*.md`).
- Find the real sources: the paper's current draft, the figure files, the data. Never invent
  numbers or figures; if something is missing, ask (through the coordinator).
- Write the act structure as a comment above the slides before any code: which clicks, what each
  one shows, what the speaker says.

## While you build
- Edit only files you own. To change someone else's scene, copy it to a new name and point your
  part at the copy.
- Wrap the whole part in `{ … }`. Prefix any CSS classes with your part name.
- Preview only your part: `deck.html?only=<part>` (add `&r=2` if the browser serves a stale page).
- Static slide or scene? Static (`st` + `.b` builds + `rfig` covers) for reveals of existing
  figures, lists and photo grids. A scene for anything with real motion, drawing, or audio.
- Scenes expose `{advance, back, atStart, atEnd, reset, resetToEnd, getBeat, notes}`. Test
  `resetToEnd` by stepping backward into the slide.
- Notes: one passage per click, in speaking order, full sentences. Title-only beat first.

## Before you report "ready"
- Step through every click forward, then all the way back. Console clean.
- Count: passages == clicks + 1 on every slide.
- Re-read `_deck-wide.md`; check the newest rounds are applied.
- Screenshot the key beats and show them to the speaker (or the coordinator).
- Report: the part name, what changed (one line), and anything you need the speaker to confirm.

## Talking to the speaker
- Ask about facts, claims, data and their wording. For presentation choices, propose the most
  intuitive option and say what you chose.
- Quote their words back exactly when you change notes; never rewrite their voice.

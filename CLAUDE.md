# Day 1 deck: rules for Claude sessions

This is an animated HTML lecture deck (the animated-talk-deck kit; skills in `.claude/skills/`).
Two people work on it at once: Fernanda and Shreya, each in their own Claude session.

## Before you edit anything
1. Ask which part the person is working on if they didn't say. Check the owner in README.md
   ("Who owns what"). Edit only that person's files.
2. Read `feedback/_deck-wide.md` and `feedback/<part>.md`.
3. Run `git pull` first, so you start from the partner's latest work.

## Ownership
- One owner per file. Never edit a part, scene or asset folder owned by the other person; copy it
  to a new name instead, or leave a checkbox in their `feedback/<part>.md`.
- Shared files (`deck/order.js`, `deck/engine.js`, `deck/deck.css`, `presenter.html`,
  `deck/publish.py`): only additive changes, only when the person asks, and say so in the commit.
- Wrap each part in `{ ... }`. Prefix any new CSS classes with the part name.

## Slide rules (from the kit; full list in .claude/skills/animated-talk-deck/references/style-rules.md)
- Title first: the slide opens on its title alone; the first click brings the content in.
- One idea per click. No motion that advances by itself.
- Cues on screen, full sentences in the notes. Everything on screen is said aloud.
- Notes: one passage per click plus one for the title. Mark notes you write with `(draft)`.
  The speaker's own wording is sacred: don't rewrite it; flag questions in `feedback/<part>.md`.
- No colored words. Color means the same thing all class long (see deck.css `--early`, `--what`, `--where`).
- Never invent data, figures or citations. Unknown source: write "source: to add" and log it.
- Detect figure coordinates from the image (in the browser with canvas, or a script), never by eye.

## Checking your work
- Serve: `python3 -m http.server 8137`, preview `deck.html?only=<part>`.
- Walk every click forward and back with JS (`deck.fwd()`, `deck.bwd()`, `deck.cur`, `deck.beat`);
  console clean; passages == clicks + 1 on every slide. Screenshot key beats for the person.
- Don't push to the final deck unless the person says so: `python3 deck/publish.py <part> --by <name> --note "..."`.

## Git
- Small commits named by part: `can-computers: captions before images`.
- Never `git revert HEAD` or force-push: the other person may have just pushed. Revert by hash after `git log`.

## Claude team (worktrees)
- Each instructor (Fernanda, Shreya) runs one **coordinator** session in their own main checkout of the
  repo (branch `main`). It routes Fernanda's feedback, reviews each branch, merges it into `main` and pushes.
- One **part session** per part, each in its own git worktree on its own branch. A part session edits
  only its part's files, commits small commits to its own branch, and never merges or pushes to `main`.
- `main` is published: every push goes live at https://delamarifer.github.io/human-machine-perception/
  (a public site). Only a coordinator pushes, only after `git pull` and checking the deck in the browser, and only
  branches for parts and days its own instructor owns.
- Each part session previews on its own port so they don't collide: `python3 -m http.server <port>`
  from its worktree (opening 8141, about-fernanda 8142, ill-posed 8143, visual-system 8144, today 8145).
- When a part session finishes a round, it ends with: what changed (by slide number), what it verified,
  and the questions it needs Fernanda to answer.

---
name: animated-talk-deck
description: Build and run a long animated HTML talk (thesis defense, job talk, keynote) with many Claude sessions working in parallel. One coordinator session routes the speaker's feedback, and one session owns each part of the talk. Covers the deck architecture (parts, scenes, running order, frozen final deck), click-by-click speaker notes and presenter view, the style rules that came out of advisor and committee feedback, the push/verify loop, rehearsal and the day of the talk. Use when someone wants to "turn my outline into an animated talk", "build my defense slides in HTML", "coordinate several chats on one deck", "add a presenter view with notes per click", or "push the finished slides to the final deck".
---

# Animated talk deck, built by a team of chats

This skill is for a long talk (45 to 60 minutes, 40 to 80 slides) built as an **animated HTML
deck**: every slide reveals its figure or argument click by click, the speaker script lives in
notes with one passage per click, and a presenter window shows the script for the current click.

It was distilled from a PhD defense deck built over two weeks by about 25 Claude Code sessions:
one coordinator plus one session per part of the talk. Everything below exists because something
went wrong without it, or because the speaker, her advisor or the committee asked for it.

Start from `../../template/` (a working deck with the engine, an example scene, a figure reveal,
a presenter view and the push script). For a single animated figure, use the `animate-figure`
skill instead; this skill is about the whole talk and the people building it.

## The architecture (why it is shaped this way)

```
deck.html          working deck: loads everyone's live drafts from parts/
final.html         final deck: loads only PUSHED parts, frozen at that version (?gaps=0 for rehearsal)
presenter.html     P in the deck: live preview, timer, upcoming slides, the script for this click, E to edit it
script.html        the whole script in order, one row per click, printable, with the speaker's edits
deck/order.js      the running order. The only file that decides where a part goes.
deck/engine.js     st(), sc(), rfig(), section(), notes, builds, lead-ins, numbering, keys
deck/deck.css      one type scale and the deck chrome. Change style here, once, for everyone.
deck/publish.py    push a part: freeze it (and its scenes and assets) into final/
parts/<part>.js    one file per part of the talk, owned by exactly one session
scenes/<x>.html    complex animations: self-contained pages with a controller, shown in an iframe
```

- **One owner per file.** Each part file and each scene has exactly one owning session. Nobody
  edits a file they don't own; they copy it to a new name. This is what lets 15+ sessions work
  at once without overwriting each other.
- **The order lives in one place.** `order.js` lists the parts. Pushes never choose a position, so
  two pushes can't collide or reorder anything. Only the speaker (or the coordinator, at the
  speaker's request) edits it.
- **Working deck vs final deck.** Drafts change all the time. The final deck holds a frozen copy of
  each part at the moment it was pushed, so the speaker can rehearse something stable while
  sessions keep working. Unpushed parts show as dashed gap slides; `?gaps=0` hides them.
- **Static slides for most things, scenes for real animation.** `st(html, {notes})` with `.b`
  build elements covers bullets, figure reveals (`rfig` covers/rings/dims) and photo grids. A scene
  (`sc(name, src)`) is an HTML page exposing
  `window[name] = {advance, back, atStart, atEnd, reset, resetToEnd, getBeat, notes}`.
  `resetToEnd` is what makes stepping backward work; never skip it.
- **Notes are part of the slide.** `notes` is split with `[click]`: passage 0 is said when the
  slide appears, passage k after click k. A scene gives its own `notes` array, one entry per
  beat. The presenter shows the passage for the current click, so the notes must match the clicks.

## Roles

**The speaker** decides content, wording, claims and order. They send feedback as a screenshot
plus a sentence, naming slides by the number shown bottom-left (e.g. "4", "12B").

**The coordinator session** (see `references/coordinator.md`) does not build slides. It:
1. routes each piece of feedback to the owning session, quoting the speaker exactly, and logs it
   in `feedback/<part>.md` as `- [ ]` (the file is the reliable channel; messages can get lost);
2. owns the shared files: `order.js`, `engine.js`, `deck.css`, `publish.py`, the presenter;
3. pushes finished parts, then verifies the final deck (walk every click, check for errors and
   missing files) and commits to git after each round;
4. answers the sessions' design questions itself when the speaker has delegated that, and asks
   the speaker only about facts, data, claims and their own wording;
5. keeps a handoff file current, so a fresh coordinator can take over when the context fills up.

**Part sessions** (see `references/part-session.md`) each own one part. They read the brief,
`feedback/_deck-wide.md` and their own `feedback/<part>.md` before showing anything and before
every push; they build, preview with `deck.html?only=<part>`, step through every click forward and
back, and report "ready to push" to the coordinator.

Spawn a new session per part with the brief template in `../../prompts/02-part-session-brief.md`.
Keep one session per animation-heavy part; a session that owns too much slows down and starts
overwriting itself.

## The loop

1. **Outline first.** Turn the speaker's outline (a PowerPoint or a list) into `order.js` rows and
   placeholder parts, each slide with a `todo` describing the intended animation. Show the whole
   skeleton before building anything.
2. **Brief and spawn** one session per part. Each brief: what the part must say, the sources
   (paper, figures, data paths), the files it owns, the style rules, and the preview URL.
3. **Build and review.** The speaker reviews in the working deck and sends feedback; the
   coordinator routes it. Deck-wide rules ("titles bold", "no colored text") go into
   `feedback/_deck-wide.md` as a dated round and, where possible, are applied once in `deck.css`
   or `engine.js` instead of in every part.
4. **Push** when the speaker says so: `python3 deck/publish.py <part> --by … --note …`. Then walk
   the final deck. Commit.
5. **Rehearse** from `final.html?gaps=0` with the presenter view (P). The speaker edits the
   script; fold their edits back into the parts' notes.
6. **The day of the talk:** freeze. See `references/rehearsal-and-day-of.md`.

## Rules that apply to every slide

The full list with the reasons is in `references/style-rules.md`. The ones that matter most:

- **Title first.** A slide opens on its title alone; the first click brings in the content.
- **A white lead-in before each new slide** (engine option), so the speaker can talk into the
  next idea before it appears. Not on slides that continue the previous one (`{blank:false}`).
- **One idea per click.** Anything that introduces new content is its own click. No automatic
  motion that runs ahead of the speaker.
- **Cues on screen, sentences in the notes.** On-screen text is keywords, labels and the one
  statement the slide makes. Explanations move to the notes, in full sentences, in speaking order.
- **Everything on the slide gets said aloud.** If it isn't in the notes, it doesn't go on screen.
- **Wording close to the paper.** Precise, qualified, not punchy. Advisors notice
  "AI-sounding" fragments immediately.
- **One type scale, one title format, one font,** set in `deck.css`. No ad-hoc sizes.
- **No colored words.** Color belongs to data only, and means the same thing all talk long.
- **Never restyle real data.** Colorbars, maps and published figures keep their own colors.
- **Never invent data.** Every number, map and example comes from a real file. A schematic is
  labeled as one.
- **Citations are readable** (about 1.3vw, black) and the speaker's own work is shown without
  citing it, if they prefer.

## Verifying (do this after every push)

- Load `final.html?gaps=0`, then walk every click with JavaScript: loop `deck.fwd()` with short
  waits until the end, collect `window.onerror`, and HEAD-check every image, video and scene URL
  for 404s. Then walk back to the start (backward navigation is where scenes break).
- Check that each slide's number of passages equals its number of clicks plus one.
- Screenshot the slides that changed and show them, instead of asking the speaker to check.
- The preview pane may be hidden and throttled: read state with JS (`deck.cur`, `deck.beat`)
  rather than trusting a screenshot taken right after an action.

## Things that bit us

`references/gotchas.md` has the full list. The top five:
1. Caching: a browser tab or an open presenter window keeps old code. Cache-bust every script and
   scene URL (`?v=Date.now()`), and teach the speaker the hard reload for their browser
   (Safari: Option-Command-R).
2. Two parts declaring the same top-level `const` break the whole deck: wrap each part in `{ }`.
3. An apostrophe inside an `order.js` string broke the push script's parser. Keep those plain.
4. Sessions edited each other's scenes. The fix is the ownership table, and copying instead of
   editing.
5. Reverting with git while another session is committing: check `git log` right before any
   revert, and revert by commit hash, never `HEAD`.

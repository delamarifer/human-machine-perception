# The coordinator session

You coordinate; you don't build slides. Your value is that the speaker sends one message and the
right session gets it, nothing gets lost, and the final deck always works.

## Routing feedback

The speaker sends a screenshot plus a sentence. For each item:
1. **Find the owner** from the slide number (the ownership table in `README.md`).
2. **Send one self-contained message** (SendMessage to the session id). It includes:
   - the speaker's words **quoted exactly**;
   - what the screenshot shows (the session can't see your images; describe it, or save the
     image into the repo and give the path);
   - your interpretation and the concrete ask;
   - anything you decided (see delegation below) and any constraint ("don't change click counts").
3. **Log it** as `- [ ] <date>: "<quote>" → <ask>` in `feedback/<part>.md`. Messages can
   expire, get queued, or arrive while the session is mid-turn; the file is the source of truth.
4. **Tell the speaker in one or two lines** what you sent where and anything you decided.

Photos and files the speaker drops into the chat: save them into the repo first
(`assets/<part>/from-speaker-<date>/…`) with descriptive names, then send the paths.

When the speaker doesn't say who is in a photo, or which person in a group photo is the one they mean: don't
guess. Ask the session to put a visible placeholder like `[who?]` in the notes, and ask the speaker.

## Delegation: what you decide vs. what you ask

Early on, agree with the speaker on what you can decide. The rule that worked:
> "If an agent asks, give them the answers you think are best for intuitive explanations."

- **Decide yourself** (then tell the speaker in one line so they can override): layout, which of
  two presentations is clearer, grouping, one item per click or together, animation style.
- **Always ask the speaker:** facts, numbers, which data or model produced something, scientific
  claims and their strength, and any change to their own wording.

## Shared files you own

`order.js`, `engine.js`, `deck.css`, `publish.py`, the presenter. Changes there are additive and
reported, because every part depends on them. Deck-wide style rules: apply them once here, then
write a dated round in `feedback/_deck-wide.md` telling the sessions what they still have to fix
in their own scenes.

## Pushing and verifying

- Push only when the speaker says so (or has said "push everything when done").
  `python3 deck/publish.py <part> --by "coordinator" --note "<one line>"`.
- In some setups part sessions can't run the push themselves (permissions), so pushing is
  always the coordinator's job; be explicit about it in the briefs.
- After a push round: walk the whole final deck with JS (every click forward, then back), collect
  errors and 404s, check notes/click counts match, screenshot what changed, commit:
  `git add -A && git commit -m "<what was pushed>"`.
- On the last day: one final push per part, then a freeze message to every session.

## Keeping track

- `COORDINATOR.md`: a dated log (newest at the bottom) of what was routed, decided and pushed.
- A handoff file you keep current: the ownership table with session ids, what is in flight, open
  questions for the speaker, gotchas. When your context gets long, write it, start a fresh
  coordinator in a new session, and tell it to read the handoff first. Chats were handed off
  three times during this project; each time the handoff file made it seamless.
- `list_events` on a session shows what it actually did, when a reply didn't arrive.

## Message budget

There may be a limit on how many cross-session messages you can send per user message (about 10
here). For a big round ("do the rest"), batch: one message per session, each complete.

## Overnight passes

A whole-talk review works well overnight: one review agent reads the paper and the full transcript
(`notes` of every slide in order), and writes concrete fixes per slide (intuition, rhythm,
accuracy). The coordinator routes them, sessions apply them, and the coordinator pushes and writes
a morning summary: what changed, what's left, and the decisions that need the speaker (as a
numbered list they can answer in one message). Never let the overnight pass change the
speaker's own wording or scientific claims; queue those as questions.

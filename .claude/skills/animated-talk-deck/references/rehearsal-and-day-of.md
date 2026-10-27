# Rehearsal and the day of the talk

## Rehearsal
- Rehearse from `final.html?gaps=0`, never from the working deck.
- Press **P**: the deck goes full screen and the presenter window opens (allow pop-ups). Put the
  presenter on the laptop screen and the deck on the projector. **F** toggles full screen.
- The presenter shows: a live preview of the audience's screen, the timer (starts at your first
  click; click to pause, double-click to reset), time on this slide, the next slide, and the
  script with the current click's passage highlighted.
- Speaking time: about 140 words per minute, plus pauses and clicks. Count words in the notes to
  estimate the talk length, and cut technical steps whose purpose isn't clear before cutting the
  story.
- The **upcoming strip** in the presenter shows the next three slides; `[` and `]` browse ahead
  without moving the audience's slide, double-click jumps there, U hides it.
- **Editing while rehearsing:** E in the presenter makes the script editable. Edits are saved in
  that browser as you type, shown with a dotted underline, and kept only while the original
  passage is unchanged (otherwise listed as outdated). "Copy my edits" gives a WAS/NOW list to
  paste to the coordinator, who folds it into the parts' notes. Do this before clearing the
  browser or switching computers.
- The **printable script** (`script.html`, `?deck=final`) lists every passage in order with your
  edits marked, plus the word count and estimated speaking time. Print it the night before.
- Recording a practice run: the OS screen recorder per section works; record the deck window
  with the microphone on, then stitch sections with ffmpeg (normalize loudness, trim dead air at
  the start and end). Never edit the original recordings; work on copies.

## Public copy
If the talk goes online (GitHub Pages or similar): a deploy script that strips what must not be
public (participant data, unpublished results, licensed fonts, audio if needed), hides the
deck chrome, and turns off the lead-ins. Check the build for anything private before every deploy.

## The day of the talk
- **Freeze.** Last pushes in the morning, then tell every session: no more changes. If a late
  change is unavoidable, one session, one push, a strict time box, and the rule "if it isn't
  ready, keep the last version."
- Start the local server and open the final deck *fresh* (a new tab, hard reload). Close older
  deck tabs so you don't present from a stale one.
- Safari's hard reload is **Option-Command-R** (Command-Shift-R is Reader view). Reloading takes
  the deck back to slide 1, so never reload mid-talk.
- After any reload: close the presenter window and press P again (it holds the old code).
- Have a backup: the public copy on any computer, or a PDF export.
- Late photos (acknowledgements tend to change on the morning of the talk): save each into the
  repo, one message per batch to the session that owns the slide, and keep names in the notes.

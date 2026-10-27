# Gotchas (each one cost real time)

**Browsers and caching**
- An open tab, or the presenter window, keeps the old code after a change. Cache-bust every
  script, stylesheet and scene URL with `?v=${Date.now()}` in the working deck, and add a version
  query to frozen files in the final deck.
- Safari: hard reload is Option-Command-R. Command-Shift-R opens Reader view.
- `file://` is blocked in some preview panes; always serve over HTTP
  (`python3 -m http.server 8000` in the deck folder).
- A hidden preview pane throttles rendering and timers: screenshots can be stale. Read state
  with JavaScript (`deck.cur`, `deck.beat`) and measure layout in JS.
- Pop-up windows are blocked unless the user allows them; the presenter needs that once.
- Fullscreen needs a user gesture: request it inside the key handler (P or F), not later.
- Audio and video autoplay are blocked until the page has had a click or key press in that
  window; fall back to muted play rather than none.

**The deck code**
- Two parts declaring the same top-level `const` break everything: wrap each part in `{ }`.
- Inline `<script>` inside a slide's HTML string doesn't run; put logic in the part file or a scene.
- Apostrophes in `order.js` strings broke the regex the push script uses to read it.
- An asset path built with `${…}` can't be detected and frozen by the push script; never
  overwrite those files after a push (save new names).
- Scenes that draw on `<canvas>` don't inherit the deck font; set `ctx.font` explicitly.
- If a scene keeps its own keyboard handler, the deck's keys can fire twice; let the deck drive it.

**Working with many sessions**
- Sessions edit files they don't own unless the ownership table is explicit and repeated in every
  brief.
- Sessions in separate git worktrees work on a stale copy of the deck; for a deck served from
  one folder, have them work in the main folder (owning different files avoids conflicts).
- Replies between sessions can expire, or get queued behind a long turn. Log everything in the
  feedback files and check `list_events` when in doubt.
- `git revert HEAD` reverted another session's fresh commit, not mine. Check `git log` first and
  revert by hash.
- When a session reports "done", verify in the final deck yourself; a message describing a change
  is not the change.
- A reviewer agent can overclaim ("all six stages") or misread a figure ("natural sounds" where
  the panel was images). Check every factual fix against the paper before applying it.

**macOS shell**
- `find -newermt "-40 minutes"` doesn't work on macOS; use a small Python mtime check.
- There is no `timeout` command by default.
- Screenshot file names contain a narrow no-break space before AM/PM; use globs.

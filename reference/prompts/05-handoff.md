# Prompt 5: hand off to a new coordinator

When the coordinator's context gets long (it gets slower and starts forgetting early details),
ask it to write a handoff, then start a fresh session with: "Read <handoff file> in full and take
over as coordinator."

---

Write `COORDINATOR-<n>.md` for the coordinator that takes over, then stop routing. Include:

1. **Who and when:** the speaker (name spelled exactly), the talk, the date, what's in scope.
2. **Your job**, in numbered steps (route + log, push, verify, commit, small urgent fixes, the
   delegation rule and what still goes to the speaker).
3. **The owner table:** slides · part · session title · session id. Mark stale sessions.
4. **Shared files** you own and the features you added to them (with how to turn them off).
5. **Public deploy** rules, if any (what must never be public).
6. **Local setup and gotchas:** server, ports, the speaker's browser and its hard reload, where
   presenter edits live, message limits, shell quirks, data locations.
7. **In flight:** per session, what was asked and what to do when it reports.
8. **Open questions for the speaker** (facts and claims only), and decisions already made.
9. **Restore points:** the latest git commits.

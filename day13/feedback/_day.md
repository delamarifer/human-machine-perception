# Day 13: Reinforcement learning (owner: Shreya)

Built from Shreya's Google Slides outline "RL" (docs.google.com/presentation/d/1_nWi1yvTyFvsSxjTt56bx0CLyMool7-aE_wvBhUZAoI).
Its figures are screenshots of the MIT 6.S191 deep RL lecture; here they are redrawn (SVG, KaTeX, grays only), not copied.
No speaker notes (her preference). Not linked from the home page yet.
Preview: the `day13` entry in `.claude/launch.json` (port 8152), then `day13/deck.html`.

## Round 1 (2026-11-17): 10 slides
1. Title: Reinforcement learning.
2. Review: supervised, unsupervised, RL cards (data, goal, apple example), then "a changing world, no labels".
3. Key concepts: agent-environment loop built one piece per click, with her six definitions (typos fixed).
4. Total reward (return): plain sum, discounted sum, weights gamma^k for gamma = 0.9 (computed illustration).
5. The Q-function: Q(s_t, a_t) = E[R_t | s_t, a_t], in words, "a score for every action, in every state".
6. How to take actions given a Q-function: policy pi(s), Q bars (illustration, no values), pi*(s) = argmax_a Q(s, a).
7. Two ways to learn to act: value learning vs policy learning.
8. Atari Breakout: the game, states A and B, "which (s, a) has the higher Q-value?", then her question
   "what is an example of this in perception?".
9. Deep Q networks: state + action -> one Q; state -> one Q per action; "what happens if we take all the best actions?".
10. Training a DQN: target, prediction, squared-error loss (Mnih et al. 2015).

## Open questions
- [ ] Citations say "MIT 6.S191, Introduction to Deep Learning, lecture on deep reinforcement learning". Which year's
      lecture were the screenshots from? (source: to add)
- [ ] Slide 3: the lecture writes the discounted return as sum_i gamma^i r_i; the deck uses sum_k gamma^k r_{t+k}
      (same as on the Q-function slide). OK?
- [ ] Slide 8: the answer to A vs B is left open, as in the lecture. Want a reveal click with the answer?
- [ ] Slide 10 adds the loss, which the outline did not have. Keep or drop?
- [ ] Slide 7 callout "Today: value learning" is mine: drop it if you also cover policy gradients.
- [ ] Minutes per section in order.js are a guess (5 / 10 / 12 / 10).
- [ ] Day number: called day13; rename if this belongs elsewhere.

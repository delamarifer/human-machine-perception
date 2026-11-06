/* PART: f-ssl-scenes (Day 5). Owner: Fernanda. Hour 2: the three self-supervised scenes, right after the embedding
   scene (Fernanda, 2026-11-06: "skip from" the embedding scene straight to self-supervised learning). Moved here from
   f-selfsup unchanged; the CLIP slides and Your turn 1 (f-clip) follow, then Your turn 2 and the views scene
   (f-selfsup), so the notebook order (Your turn 1 before 2) still holds. */
{
section('7. Task-free');

/* The text slide 'Self-supervised: the data makes its own labels' is replaced by the pretext-tasks scene
   (scenes/pretext.html, 2026-11-06); the text version is in git before this commit. */
sc('pretext', 'scenes/pretext.html');

/* The text slide 'Contrastive learning' is replaced by the contrastive scene (scenes/contrastive.html, 2026-11-06). */
sc('contrastiveScene', 'scenes/contrastive.html');

/* The text slide 'The contrastive loss' is replaced by the InfoNCE guessing-game scene (scenes/infonce.html,
   2026-11-06), right before its code step (Your turn 2). */
sc('infonce', 'scenes/infonce.html');
}

/* PART: explore-transformer (Day 5). Owner: Shreya.
   Checkpoint near the end: students explore a live transformer on their own laptops.
   Tool: Transformer Explainer (Georgia Tech, Polo Club), https://poloclub.github.io/transformer-explainer/
   It runs GPT-2 (small), a text model. Prompts use only features the site shows: the Examples menu,
   and attention maps with hover. */
{
section('7. Full picture');

st(`<style>
  .explore-link{ font-size:clamp(1.5rem, 2.5vw, 2.3rem); font-weight:700; color:var(--ink); text-decoration:underline; }
  .explore-list{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:center; gap:2.6vh; }
</style>
  <h1 class="t">Checkpoint: explore a transformer yourself</h1>
  <div class="explore-list">
    <div class="b" data-step="1"><a class="explore-link" href="https://poloclub.github.io/transformer-explainer/" target="_blank" rel="noopener" onclick="event.stopPropagation()">poloclub.github.io/transformer-explainer</a></div>
    <div class="lead b" data-step="2"><b>1.</b> Pick an example, and find the tokens.</div>
    <div class="lead b" data-step="3"><b>2.</b> Open attention and hover over a token. Which tokens does it read? Can you find a far-apart pair?</div>
    <div class="question b" data-step="4">What would change if the tokens were image patches?</div>
  </div>
  ${cite('Transformer Explainer: Cho, Kim, Karpekov, Helbling, Wang, Lee, Hoover &amp; Chau, Georgia Institute of Technology. Runs GPT-2 (small).')}
`, { notes: [
  "(draft) We have now built every piece: tokens, attention, self-attention, multiple heads and the Vision Transformer. It is your turn to look inside a working transformer.",
  "(draft) Open this link on your laptop. Transformer Explainer runs GPT-2 small, a real language model, and shows its computations. Take about five minutes, and work with a neighbor if you like.",
  "(draft) First, pick a sentence from the Examples menu and find the tokens. Notice that a token is not always a whole word. This is the same idea as cutting an image into patches: the input becomes a list of pieces.",
  "(draft) Now open the attention view and hover over a token. You are seeing which other tokens it reads, and how strongly. Look for a token that reads something far away in the sentence. This is the connection that a shallow CNN could not make, and here it takes one layer.",
  "(draft) Last question, for discussion. What would change if the tokens were image patches? The tokens would come from cutting up an image, and position would be a place in a 2D grid. The output would be a class, not a next word."
]});
}

/* PART: s-transformer (Day 5). Owner: Fernanda · Shreya.
   3. Tokens, embeddings, position, the block, and the language origin. */
{
section('3. Blocks');

st(`
  <h1 class="t">What is a transformer?</h1>
  <div class="cols">
    <div class="card b"><div class="k">Token</div><div class="label">One piece of the input. In language, a word or a piece of a word.</div></div>
    <div class="card b"><div class="k">Embedding</div><div class="label">That piece, written as a vector.</div></div>
    <div class="card b"><div class="k">Position</div><div class="label">Where the token sits. The model does not get order for free.</div></div>
    <div class="card hi b"><div class="k">A stack of blocks</div><div class="label">Each block mixes tokens, then transforms each one. Same block, repeated.</div></div>
  </div>
  <div class="label b" style="color:var(--mute)">First built for language. Vaswani et al., 2017, Attention Is All You Need.</div>
`, { notes: [
  "Four words, then where the idea came from. Keep this short. The vision version is the next section but one.",
  "A token is one piece of the input. In the original setting that piece is a word, or a fragment of a word.",
  "An embedding turns that piece into a vector of numbers. From here on, the model works with vectors.",
  "Position has to be added. A transformer has no built-in sense of left-to-right or of a grid. Order and location are given as extra information, a positional encoding.",
  "The architecture is a stack of the same block. Inside a block, tokens exchange information, and then each token is transformed on its own. We will open the exchange on the next slide. It is called attention.",
  "Say explicitly that this was built for language, not for images. The paper is Vaswani and colleagues, 2017, Attention Is All You Need. Images come later, by treating patches as if they were words."
]});
}

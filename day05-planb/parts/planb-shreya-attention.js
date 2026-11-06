/* PART: planb-shreya-attention (Day 5 Plan B). Owner: Fernanda.
   Copied at Fernanda's request from Shreya's live Day 5 deck (day05/parts/transformer.js, slides 16, 17 and 18A-C:
   "Attention in four steps", "Attention by hand", "Exercise 2: attention as a module"). Source and credit: Shreya Pandit.
   On-screen text, code, notebook output and the Colab link are unchanged; only class and function names are renamed
   (planb-tr-, pbTr) so they cannot collide with her part. Her slides carry no speaker notes (her request), so the
   notes here are ours, marked (draft, Plan B). Her slide 15, "Query, key, value", is in attention.js. */
{
const INK = '#0f172a', MID = '#64748b', SOFT = '#cbd5e1', PALE = '#f1f5f9';
const pbTrColab = 'https://colab.research.google.com/github/delamarifer/human-machine-perception/blob/main/notebooks/day05-lab-transformer-exercises.ipynb';
const pbTrA = (href, text) => `<a href="${href}" target="_blank" rel="noopener" onclick="event.stopPropagation()" style="color:var(--ink)">${text}</a>`;
section('2. Attention');

const pbTrStyle = `<style>
  .planb-tr-col{ display:flex; flex-direction:column; gap:1.8vh; justify-content:center; min-height:0; }
  .planb-tr-block{ border-radius:10px; overflow:hidden; border:1px solid ${SOFT}; min-width:0; }
  .planb-tr-bar{ display:flex; justify-content:space-between; align-items:center; padding:.5vh .9vw; font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
    font-size:clamp(.8rem,1.15vw,1.2rem); }
  .planb-tr-block.is-code .planb-tr-bar{ background:#1e293b; color:#cbd5e1; }
  .planb-tr-block.is-out .planb-tr-bar{ background:#e2e8f0; color:#334155; }
  .planb-tr-copy{ font:inherit; color:inherit; background:none; border:1px solid currentColor; border-radius:5px; padding:.1em .6em; cursor:pointer; }
  .planb-tr-block pre{ margin:0; padding:1.1vh 1vw; white-space:pre; overflow-x:auto; line-height:1.32; }
  .planb-tr-block code{ font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:clamp(1rem, 1.9vw, 2.1rem); user-select:text; }
  .planb-tr-block.is-code pre{ background:${INK}; color:#f8fafc; }
  .planb-tr-block.is-out pre{ background:${PALE}; color:${INK}; }
  .tok-kw{ color:#93c5fd; } .tok-str{ color:#fcd34d; } .tok-num{ color:#fdba74; } .tok-fn{ color:#c4b5fd; } .tok-com{ color:#a8bbd0; }
  .planb-tr-tag{ font-size:clamp(.8rem,1.05vw,1rem); font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:${MID}; }
  .planb-tr-steps{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:repeat(4,1fr); gap:1.2vw; align-items:stretch; }
  .planb-tr-step{ border:2px solid ${INK}; border-radius:14px; padding:2vh 1vw; display:flex; flex-direction:column; gap:1.2vh; text-align:center; justify-content:center; }
  .planb-tr-eq{ background:#f1f5f9; border:1px solid #cbd5e1; border-left:4px solid var(--early); border-radius:10px;
    padding:1vh 1.2vw; font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
    font-size:clamp(.88rem, 1.32vw, 1.28rem); font-weight:600; color:#0f172a; line-height:1.38; }
  code.planb-tr-m{ font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:.9em; font-weight:600;
    background:#f1f5f9; border:1px solid #cbd5e1; border-radius:5px; padding:.06em .34em; color:#0f172a; white-space:nowrap; }
</style>`;

/* Real code blocks: <pre><code>, Python syntax highlighting, and a Copy button that does not advance the slide. */
const pbTrEsc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const pbTrPy = src => {
  const re = /(#.*$)|("[^"\n]*"|'[^'\n]*')|\b(def|return|for|in|import|from|lambda|if|else|with|None|True|False)\b|\b(\d+\.?\d*(?:e-?\d+)?)\b|\b([A-Za-z_]\w*)(?=\()/gm;
  let out = '', last = 0;
  for(const m of src.matchAll(re)){
    const cls = m[1] ? 'com' : m[2] ? 'str' : m[3] ? 'kw' : m[4] ? 'num' : 'fn';
    out += pbTrEsc(src.slice(last, m.index)) + `<span class="tok-${cls}">${pbTrEsc(m[0])}</span>`;
    last = m.index + m[0].length;
  }
  return out + pbTrEsc(src.slice(last));
};
const pbTrCopy = `onclick="event.stopPropagation();const b=this;navigator.clipboard.writeText(b.closest('.planb-tr-block').querySelector('code').textContent).then(()=>{b.textContent='Copied';setTimeout(()=>b.textContent='Copy',1200)})"`;
const pbTrCode = (src, step) => `<div class="planb-tr-block is-code${step ? ' b' : ''}"${step ? ` data-step="${step}"` : ''}>
  <div class="planb-tr-bar"><span>Python</span><button class="planb-tr-copy" type="button" ${pbTrCopy}>Copy</button></div>
  <pre><code class="language-python" onclick="event.stopPropagation()">${pbTrPy(src)}</code></pre></div>`;
const pbTrOut = (src, step) => `<div class="planb-tr-block is-out${step ? ' b' : ''}"${step ? ` data-step="${step}"` : ''}>
  <div class="planb-tr-bar"><span>Output</span></div><pre><code>${pbTrEsc(src)}</code></pre></div>`;


/* Each exercise is two screens: A = prediction, then code with a comment on each step. B = output, takeaway. Text is sized for the back of the room. */
const pbTrExercise = ({n, title, ask, say, code, code2, code2Head, out, after, notesA, notesB, notesC}) => {
  st(`
    <h1 class="t">Exercise ${n}: ${title}</h1>
    <div class="planb-tr-col" style="flex:1 1 auto;gap:1.8vh">
      <div class="lead b" data-step="1">${say ? `<b>${say}</b>` : `<span class="planb-tr-tag">Predict first</span><br><b><i>${ask}</i></b>`}</div>
      ${pbTrCode(code, 2)}
    </div>
    ${cite(pbTrA(pbTrColab, 'Open the notebook in Colab') + ', exercise ' + n)}
  `, { notes: notesA });
  if(code2) st(`
    <h1 class="t">Exercise ${n}: ${title}</h1>
    <div class="planb-tr-col" style="flex:1 1 auto;gap:1.8vh">
      <div class="lead b" data-step="1"><b>${code2Head}</b></div>
      ${pbTrCode(code2, 2)}
    </div>
    ${cite(pbTrA(pbTrColab, 'Open the notebook in Colab') + ', exercise ' + n)}
  `, { sub: true, blank: false, notes: notesB });
  st(`
    <h1 class="t">Exercise ${n}: ${title}</h1>
    <div class="planb-tr-col" style="flex:1 1 auto;gap:2.4vh">
      ${pbTrOut(out, 1)}
      <div class="statement b" data-step="2" style="text-align:center"><b>${after}</b></div>
    </div>
    ${cite('Output from the notebook. Weights are random: nothing here is trained.')}
  `, { sub: true, blank: false, notes: notesC });
};


st(`${pbTrStyle}
  <h1 class="t">Attention in four steps</h1>
  <div class="planb-tr-steps">
    <div class="planb-tr-step b" data-step="1"><div class="lead"><b>1. Q Kᵀ</b></div><div class="label">how well each query matches each key</div><code class="planb-tr-m">196 × 196</code></div>
    <div class="planb-tr-step b" data-step="2"><div class="lead"><b>2. ÷ √d<sub>k</sub></b></div><div class="label">keeps the scores in a workable range</div><code class="planb-tr-m">196 × 196</code></div>
    <div class="planb-tr-step b" data-step="3"><div class="lead"><b>3. softmax</b></div><div class="label">each row becomes weights that sum to 1</div><code class="planb-tr-m">196 × 196</code></div>
    <div class="planb-tr-step b" data-step="4"><div class="lead"><b>4. × V</b></div><div class="label">each token becomes a weighted mix of values</div><code class="planb-tr-m">196 × 64</code></div>
  </div>
  <div class="planb-tr-eq b" data-step="5" style="text-align:center">Attention(Q, K, V) = softmax( Q Kᵀ / √d<sub>k</sub> ) V</div>
  ${cite('Vaswani et al. (2017) · MIT Vision Book, Eq. 26.6, where d<sub>k</sub> is written m')}
`, { notes: [
  "(draft, Plan B) Title only. The query, key, value picture for one token, now for all tokens at once, as matrices. Shreya's slide counts 196 tokens, the number for a 224-pixel image cut into 16-pixel patches; our running example had 64.",
  "(draft, Plan B) Step one: multiply the matrix of queries by the transposed matrix of keys. Every query meets every key, so we get one score for every pair of tokens: 196 by 196.",
  "(draft, Plan B) Step two: divide by the square root of d k, the length of the keys, which keeps the scores in a workable range.",
  "(draft, Plan B) Step three: a softmax along each row turns the scores into weights that sum to 1.",
  "(draft, Plan B) Step four: multiply by the values. Each token becomes a weighted mix of the values, so we are back to one vector per token: 196 by 64.",
  "(draft, Plan B) Together, the formula from Vaswani and colleagues: softmax of Q K transpose over the square root of d k, times V."
]});

/* The same function as the Build a Transformer notebook, section 2. */
st(`
  <h1 class="t">Attention by hand</h1>
  <div class="planb-tr-col" style="flex:1 1 auto;gap:2.2vh">
    ${pbTrCode(`def attention_by_hand(Q, K, V):
    # compare: every query against every key
    scores = Q @ K.transpose(-1, -2)
    # scale: divide by the square root of the key size
    scaled = scores / K.shape[-1] ** 0.5
    # softmax along each row: weights that sum to 1
    weights = torch.softmax(scaled, dim=-1)
    # mix: each output row is a weighted sum of the values
    output = weights @ V
    return output, weights`, 1)}
    <div class="lead b" data-step="2" style="text-align:center"><b>Compare, scale, softmax, mix.</b></div>
  </div>
`, { notes: [
  "(draft, Plan B) Title only. The same four steps as code, the function from the Build a Transformer notebook.",
  "(draft, Plan B) Read it top to bottom: compare every query with every key, scale by the square root of the key size, softmax along each row, then mix the values with those weights. It returns the output and the weights.",
  "(draft, Plan B) Four words to remember: compare, scale, softmax, mix."
]});

pbTrExercise({
  notesA: [
    "(draft, Plan B) Title only. Exercise 2 turns attention into a module, as in the notebook.",
    "(draft, Plan B) The one fact to hold on to: 196 tokens give a 196 by 196 attention matrix, one weight for every pair.",
    "(draft, Plan B) The module has three learned projections, query, key and value: the weights a model trains. These are the W Q, W K and W V from the video."
  ],
  notesB: [
    "(draft, Plan B) Title only. What happens to the tokens when they pass through the module.",
    "(draft, Plan B) The forward pass.",
    "(draft, Plan B) Project to queries, keys and values; scores as Q K transpose over the square root of d k; softmax; then the weighted mix of values. The same four steps as before."
  ],
  notesC: [
    "(draft, Plan B) Title only. The output from the notebook. The weights are random, nothing is trained.",
    "(draft, Plan B) The shapes at each step: 196 tokens of 64 numbers go in; the score matrix is 196 by 196; each row of the softmax sums to 1; and 196 tokens of 64 numbers come out.",
    "(draft, Plan B) One weight for every pair of tokens: this is the 196 by 196 table whose cost the video warns about at higher resolution."
  ],
  n: 2, title: 'attention as a module',
  say: '196 tokens give a 196 × 196 attention matrix.',
  code: `class SingleHeadAttention(nn.Module):

    def __init__(self, embedding_dim, attention_dim):
        super().__init__()
        # three learned projections: the weights a model trains
        self.query = nn.Linear(embedding_dim, attention_dim, bias=False)
        self.key = nn.Linear(embedding_dim, attention_dim, bias=False)
        self.value = nn.Linear(embedding_dim, attention_dim, bias=False)`,
  code2Head: 'What happens to the tokens',
  code2: `    def forward(self, queries_from, tokens):
        # queries from one sequence; keys and values from the other
        q = self.query(queries_from)
        k, v = self.key(tokens), self.value(tokens)
        # Q Kᵀ divided by √d_k: how well each query matches each key
        scores = q @ k.transpose(1, 2) / k.shape[-1] ** 0.5
        # softmax: each row becomes weights that sum to 1
        weights = torch.softmax(scores, dim=-1)
        # A V: each query gets a weighted mix of values
        return weights @ v`,
  out: `tokens in      (1, 196, 64)
1. Q K^T       (196, 196)
2. scaled      (196, 196)
3. softmax     (196, 196)  row 0 sums to 1.0
4. weighted V  (196, 64)
tokens out     (1, 196, 64)`,
  after: 'One weight for every pair of tokens',
});

}

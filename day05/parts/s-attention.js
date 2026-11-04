/* PART: s-attention (Day 5). Owner: Fernanda · Shreya.
   4. Queries, keys, values, self-attention, tokens exchanging information. */
{
section('4. Attention');

st(`
  <h1 class="t">How does a model decide what information matters?</h1>
  <div class="flow">
    <div class="step b" data-step="1"><b>Query</b><span class="label">what this token is looking for</span></div>
    <div class="step b" data-step="1"><b>Key</b><span class="label">what this token offers as a match</span></div>
    <div class="step b" data-step="1"><b>Value</b><span class="label">the information to pass along</span></div>
  </div>
  <div class="cols" style="margin-top:1vh">
    <div class="card b" data-step="2"><div class="k">Self-attention</div><div class="label">Every token scores every token. The scores say how much each one contributes.</div></div>
    <div class="card hi b" data-step="3"><div class="k">Tokens exchange information</div><div class="label">Each token's new vector is a mix of the others, weighted by those scores.</div></div>
  </div>
`, { notes: [
  "Attention is the mix. Three roles, and it helps to say them as a little story rather than as a formula first.",
  "Each token is used three ways. The query is what this token is looking for. The key is what a token offers, so a query can be matched against it. The value is the information that actually gets passed along once the match is made.",
  "Self-attention means the tokens of this input attend to each other. There is no separate source. Every token produces a score against every other token, including itself. A high score means that token matters for this one.",
  "Then the exchange. The new vector for a token is a weighted mix of the values. Information has moved. A token that started as one patch, or one word, now carries something from the tokens it attended to. That is the whole idea. The formula can wait until someone asks."
]});
}

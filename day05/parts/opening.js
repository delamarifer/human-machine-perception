/* PART: opening (Day 5). Owner: to decide (see README.md). */
{
section('Title');

st(`
  <div class="center" style="margin:auto">
    <div class="statement" style="font-weight:700;font-size:clamp(2.4rem,4.4vw,4rem)">Transformers and visual representations</div>
    <div class="lead" style="margin-top:3vh">Day 5</div>
    <div class="label" style="margin-top:1.5vh">Fernanda · Shreya</div>
  </div>
`, { blank: false, notes: "(draft) Welcome back. Day 5: transformers and visual representations." });

st(`
  <div class="question center" style="font-size:clamp(2.2rem,3.8vw,3.4rem)">How do machines organize visual information, and how does that compare to human seeing?</div>
`, { notes: "(draft) The question for today: how do machines organize visual information, and how does that compare to human seeing? Yesterday we looked at how a CNN recognizes objects. Today we look inside: what space does a model put images in, and does it resemble ours?" });

st(`
  <h1 class="t">Today</h1>
  <div class="flow" style="margin:auto 0">
    <div class="step b" data-step="1"><b>Embeddings</b><span class="label">an image as a point</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Attention</b><span class="label">and the Vision Transformer</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>Representations</b><span class="label">explore and compare them</span></div>
    <div class="arrow b" data-step="4">→</div>
    <div class="step b" data-step="4"><b>Lab</b><span class="label">probe a real ViT</span></div>
  </div>
`, { notes: [
  "(draft) Here is the plan for today.",
  "(draft) First, embeddings: how a network turns a whole image into one point in a space.",
  "(draft) Then attention, and the Vision Transformer, which is built on it.",
  "(draft) Then tools to explore a representation, and to compare two of them, including a model and a brain, and a face illusion that puts them to the test.",
  "(draft) And in the lab, you take a trained Vision Transformer and probe what its embeddings encode."
]});
}

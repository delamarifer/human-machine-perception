/* PART: s-title (Day 5). Owner: Fernanda · Shreya.
   Title and the path through the eleven segments. */
{
section('Title');

st(`
  <div style="margin:auto;max-width:52em">
    <div class="statement" style="font-weight:700;font-size:clamp(2.2rem,4.2vw,3.8rem);line-height:1.08">Transformers and Visual Representations</div>
    <div class="lead" style="margin-top:2.4vh">How do machines organize visual information, and how does that compare to human seeing?</div>
    <div class="label" style="margin-top:4vh;color:var(--mute)">Day 5 · Visual Perception</div>
    <div class="label" style="margin-top:.6vh;color:var(--mute)">Fernanda De La Torre · Shreya Pandit</div>
  </div>
`, { blank: false, notes: "Welcome to Day 5, Transformers and Visual Representations. The question for the whole session: how do machines organize visual information, and how does that compare to human seeing? We will move from local features, which you already know from convolutional networks, to relationships across a whole image, and then ask how those representations compare with human perception." });

st(`
  <h1 class="t">Today</h1>
  <div class="agenda">
    <div class="row b" data-step="1"><span class="n">1</span><span>Relationships between image regions</span></div>
    <div class="row b" data-step="1"><span class="n">7</span><span>From features to representations</span></div>
    <div class="row b" data-step="1"><span class="n">2</span><span>From CNNs to Transformers</span></div>
    <div class="row b" data-step="1"><span class="n">8</span><span>CLIP: images and language</span></div>
    <div class="row b" data-step="1"><span class="n">3</span><span>What is a transformer?</span></div>
    <div class="row b" data-step="1"><span class="n">9</span><span>Exploring the representation space</span></div>
    <div class="row b" data-step="1"><span class="n">4</span><span>Attention: what matters?</span></div>
    <div class="row b" data-step="1"><span class="n">10</span><span>Human and machine representations</span></div>
    <div class="row b" data-step="1"><span class="n">5</span><span>How a Vision Transformer works</span></div>
    <div class="row b" data-step="1"><span class="n">11</span><span>The Thatcher effect</span></div>
    <div class="row b" data-step="1"><span class="n">6</span><span>CNNs vs. Vision Transformers</span></div>
  </div>
`, { notes: [
  "Here is the path. Two columns. The left is the architecture. The right is what we do with the representations.",
  "We open with how parts of an image relate, then why a transformer, what one is, and how attention lets tokens exchange information. Then the Vision Transformer itself, and how it differs from a CNN. After that an image becomes a point in a representation space. CLIP aligns that space with language. You will measure similarity, neighbors, and clusters yourselves. We compare that geometry with human similarity judgments, and we close on the Thatcher effect: does a model show it?"
]});
}

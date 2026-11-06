/* PART: recap (Day 5 Plan B). Owner: Fernanda. The whole pipeline, one step per click, then the trade-off. */
{
section('4. Recap');

st(`<style>
  .planb-steps{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:repeat(4, minmax(0, 1fr)); grid-auto-rows:1fr; gap:2.2vh 1.4vw; }
  .planb-step{ border:2px solid var(--ink); border-radius:14px; padding:1.6vh 1vw; display:flex; flex-direction:column; justify-content:center; gap:.6vh; }
  .planb-step b{ font-size:clamp(1.3rem, 2vw, 1.9rem); }
  .planb-step i{ font-style:normal; color:var(--mute); font-size:clamp(1rem, 1.3vw, 1.3rem); }
</style>
  <h1 class="t">A Vision Transformer, start to finish</h1>
  <div class="planb-steps">
    <div class="planb-step b"><i>1</i><b>Patches</b><span class="label">cut the image into 16 × 16 tiles</span></div>
    <div class="planb-step b"><i>2</i><b>Flatten</b><span class="label">one vector of pixel values per patch</span></div>
    <div class="planb-step b"><i>3</i><b>Embed</b><span class="label">one shared, learned linear layer</span></div>
    <div class="planb-step b"><i>4</i><b>+ Position</b><span class="label">so the model knows where each patch was</span></div>
    <div class="planb-step b"><i>5</i><b>+ Class token</b><span class="label">one extra, learnable token</span></div>
    <div class="planb-step b"><i>6</i><b>Attention blocks</b><span class="label">every patch with every patch, in every layer</span></div>
    <div class="planb-step b"><i>7</i><b>Class token out</b><span class="label">it has gathered the whole image</span></div>
    <div class="planb-step b"><i>8</i><b>Classifier</b><span class="label">a softmax over class labels</span></div>
  </div>
  <div class="statement b">Global from layer 1, costly for large images, hungry for data</div>
`, { notes: [
  "(draft) Title only. Let us put the whole model together, start to finish.",
  "(draft) One: cut the image into patches, 16 by 16 pixels in the paper.",
  "(draft) Two: flatten each patch into one vector of normalized pixel values.",
  "(draft) Three: pass every vector through the same learned linear layer, to get an embedding: one token per patch.",
  "(draft) Four: add a position vector to each embedding, so that the order of the patches is not lost.",
  "(draft) Five: put one extra learnable token at the front, the class token.",
  "(draft) Six: send all the tokens through a stack of attention blocks, where every patch is compared with every other patch, in every layer.",
  "(draft) Seven: at the top, take the output of the class token, which has gathered information from the whole image.",
  "(draft) Eight: a small classifier with a softmax turns it into a probability for each class.",
  "(draft) And the trade-off we saw: a global receptive field from the first layer, but a cost that explodes with image size, and a need for a lot of data, because it assumes so little about images."
]});
}

/* PART: s-cnns (Day 5). Owner: Fernanda · Shreya.
   2. From CNNs to Transformers. Local receptive fields, hierarchy, then the whole input. */
{
section('2. CNNs');

st(`
  <h1 class="t">From CNNs to Transformers</h1>
  <div class="cols">
    <div class="card b"><div class="k">Local receptive field</div><div class="label">A unit looks at a small neighborhood, the same idea as yesterday's filters.</div></div>
    <div class="card b"><div class="k">Hierarchy</div><div class="label">Stack the layers. Early features are edges. Later features are parts, then objects.</div></div>
    <div class="card b"><div class="k">Still local at each step</div><div class="label">The field of view grows with depth. It is not the whole image at the first layer.</div></div>
    <div class="card hi b"><div class="k">Across the whole input</div><div class="label">Some relationships are not neighbors. The motivation for a transformer is to model those directly.</div></div>
  </div>
`, { notes: [
  "Recall yesterday. A convolutional network is built from local receptive fields.",
  "Each unit sees a neighborhood, just as a hand-designed filter did on Day 3. The same weights slide across the image.",
  "Stack those layers and you get a hierarchy. Edges, then textures and parts, then something closer to objects. The receptive field grows, so a late unit can see more of the image than an early one.",
  "Even so, each step is local. Long-range structure has to be built up, layer by layer.",
  "That is the motivation. Some relationships sit across the whole input: the eyes and the mouth of a face, an object and the context far from it. A transformer is one way to let every part relate to every other part, without waiting for depth to carry the message."
]});
}

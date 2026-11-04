/* PART: s-rsa (Day 5). Owner: Fernanda · Shreya.
   10. RSA: compare human similarity judgments with model distances. */
{
section('10. RSA');

st(`
  <h1 class="t">Human and machine representations</h1>
  <div class="cols">
    <div class="card b"><div class="k">The problem</div><div class="label">A human judgment and a model vector do not live in the same units. You cannot subtract them.</div></div>
    <div class="card b"><div class="k">RSA</div><div class="label">Representational similarity analysis compares the pattern of similarities, not the vectors themselves.</div></div>
    <div class="card b"><div class="k">Two matrices</div><div class="label">Humans: how similar each pair of images seems. Model: how close each pair of embeddings is.</div></div>
    <div class="card hi b"><div class="k">Compare the matrices</div><div class="label">If the two patterns agree, the model and the person arrange these images alike.</div></div>
  </div>
  <div class="cite">Kriegeskorte, Mur, and Bandettini, 2008.</div>
`, { notes: [
  "We can measure similarity inside a model. The harder question is whether that matches a person.",
  "You cannot line up a human rating and a 768-dimensional vector. They are different kinds of object. Subtracting them is meaningless.",
  "Representational similarity analysis, RSA, sidesteps that. It does not compare the representations directly. It compares how each system arranges the same set of images: which pairs are close, which pairs are far.",
  "So you build two matrices, one row and column per image. For people, the entries are similarity judgments. For the model, the entries are similarities of embeddings, the numbers from the lab.",
  "Then you compare the two matrices. Agreement means the model and the observers rank these relationships in a similar way. It does not mean the model and the person compute the same thing. Kriegeskorte, Mur, and Bandettini, 2008. Say that limit out loud. If you have time, point at the dissimilarity matrix in the lab."
]});
}

/* PART: s-opening (Day 5). Owner: Fernanda · Shreya.
   1. How can a machine understand relationships between image regions? */
{
section('1. Regions');

st(`
  <h1 class="t">How can a machine understand relationships between image regions?</h1>
  <div class="cols">
    <div class="card b"><div class="k">Many regions</div><div class="label">An image is a field of pieces: a face, a hand, the background, the light.</div></div>
    <div class="card b"><div class="k">A piece is not the scene</div><div class="label">Each region, on its own, is only part of what is there.</div></div>
    <div class="card hi b"><div class="k">The open question</div><div class="label">How does visual information from different parts get combined?</div></div>
  </div>
`, { notes: [
  "Start with the question, before any architecture. Hold it up and let the room sit with it.",
  "An image is not one thing. It is many regions at once.",
  "Look at one region alone and you do not have the scene. A patch of fur could be a dog or a rug. A patch of blue could be sky or a shirt.",
  "So the real question is how information from different parts of the image gets combined. Everything after this slide is one answer to that question, and then a way to ask whether the answer looks anything like human seeing."
]});
}

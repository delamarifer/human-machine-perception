/* PART: s-thatcher (Day 5). Owner: Fernanda · Shreya.
   11. The Thatcher effect. Orientation, and whether a model shows it. */
{
section('11. Faces');

st(`
  <h1 class="t">The Thatcher effect</h1>
  <div class="cols">
    <div class="card b"><div class="k">Upright</div><div class="label">Invert the eyes and the mouth in an upright face, and the face looks wrong.</div></div>
    <div class="card b"><div class="k">Upside down</div><div class="label">Turn that same face over, and the change is hard to see.</div></div>
    <div class="card b"><div class="k">What it says about seeing</div><div class="label">Face perception uses the arrangement of parts, and that arrangement is tied to orientation.</div></div>
    <div class="card hi b"><div class="k">And the model?</div><div class="label">Does a Vision Transformer change its representation the way a person changes their percept?</div></div>
  </div>
  <div class="cite">Thompson, 1980. Margaret Thatcher: A New Illusion.</div>
`, { notes: [
  "Last phenomenon. Do the demonstration before you explain it, if you have the two faces: show them upside down first, ask the room if they match, then turn them upright.",
  "Upright, inverting the eyes and the mouth makes the face look grotesque. The features are the same pixels. Their orientation inside the face is what changed.",
  "Upside down, that same edit is easy to miss. The two faces look nearly alike.",
  "The usual reading: we perceive a face as a configuration of parts, and we do that much better for upright faces. Turn the face over and we fall back on the parts one by one. Thompson, 1980. The broader face-inversion effect is older, Yin, 1969, if you want the distinction.",
  "Then the question, and do not answer it for them. Take the same pair of images, upright and inverted, edited and not. Look at the embeddings. Is the distance between a normal face and a Thatcherized face large when both are upright, and small when both are upside down? If the distances do not follow the percept, the representation and the human judgment have come apart. That is the comparison the day has been building toward."
]});
}

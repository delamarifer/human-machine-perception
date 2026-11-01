/* PART: discuss (Day 1). 110–120 min. No lab today. */
{
section('Discussion');

st(`
  <h1 class="t">What did your group pick?</h1>
  <ul class="frag">
    <li class="b">The application</li>
    <li class="b">The problem it solves</li>
    <li class="b">How it is like human vision</li>
    <li class="b">Where it can be wrong</li>
  </ul>
`, { notes: [
  "(draft) Each group, four sentences.",
  "(draft) Name the application.",
  "(draft) The problem in the world.",
  "(draft) The link to human vision.",
  "(draft) One way it fails. If it matches something we will do, say so: pixels, a simple system, or a model that can be confidently wrong."
]});

st(`
  <h1 class="t">Tomorrow</h1>
  <div class="lead b">The picture is an array of numbers</div>
  <div class="lead b">Then a system that recovers boxes from one image</div>
`, { notes: [
  "(draft) No lab today. Tomorrow we start from the numbers.",
  "(draft) First, the checker-shadow image as an array.",
  "(draft) Then a small vision system: one image of colored boxes, and the assumptions that turn it back into 3D."
]});
}

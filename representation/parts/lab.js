{
section('Lab');

st(`
  <h1 class="t">A simple vision system</h1>
  <ul class="frag">
    <li class="b">Projection</li>
    <li class="b">Edges</li>
    <li class="b">Figure and ground</li>
    <li class="b">Contact and occlusion</li>
    <li class="b">Assumptions as equations</li>
    <li class="b">A 3D result, and where it breaks</li>
  </ul>
  <div class="label b">About 50 minutes. notebooks/day01-lab-simple-vision-system.ipynb</div>
`, { notes: [
  "(draft) The lab notebook. Run it from the top. Fill the Your turn cells.",
  "(draft) Projection: how a 3D point becomes a pixel, and why many 3D points can share one pixel.",
  "(draft) Edges: where the image changes.",
  "(draft) Figure and ground: which region is the object.",
  "(draft) Contact with the floor, versus an edge where one thing hides another.",
  "(draft) The assumptions become equations. A generic view. Flat faces. Objects rest on the floor.",
  "(draft) Recover a 3D result. Then break an assumption and see the result fail.",
  "(draft) About fifty minutes."
]});
}

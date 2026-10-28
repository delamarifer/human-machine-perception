/* PART: ill-posed. Owner: Fernanda (see README.md).
   Outline slide 7 asked: "animate the different versions". The scene turns one line drawing into
   several 3D shapes along the lines of sight, then collapses them back to the same image. */
{
section('Seeing');

sc('illPosed', 'scenes/ill-posed-shapes.html');

/* The original figure, as the source of the idea. Shown whole (the scene already did the build). */
st(`
  <h1 class="t">Perception is ill-posed</h1>
  ${rfig('assets/ill-posed/line-drawing-ambiguity-figure.png', 919/543, [
    {r: [0, 0, 1, 1], k: 'cov', step: 1}
  ])}
  ${cite('Figure: Sinha &amp; Adelson, 1993 (to confirm)')}
`, { sub: true, notes:
  "(draft) Title only." +
  "[click] (draft) This is the classic version of the argument. A line drawing only tells us the x and y of each point. We reconstruct a 3D object from it without effort, but any planar line drawing is consistent with infinitely many 3D structures."
});
}

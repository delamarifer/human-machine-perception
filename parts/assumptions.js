/* PART: assumptions. Owner: Shreya (see README.md). Outline slides 15-16. */
{
section('Assumptions');

sc('checkerShadow', 'scenes/assumptions-checker.html');

/* Size and distance: panel (a) first, then panel (b). Covers measured from the image's row profile. */
st(`
  <h1 class="t">How do we perceive depth?</h1>
  ${rfig('assets/assumptions/emmert-retinal-size.png', 500/271, [
    {r: [0, 0, 1, 1], k: 'cov', step: 1},
    {r: [0, .56, 1, .44], k: 'cov', step: 2},
    {r: [.62, .40, .38, .16], k: 'cov', step: 2}
  ])}
  <div class="label b" data-step="3" style="text-align:center">Same person · smaller retinal image · we still see the same size</div>
  <div class="cite">Figure source: to add</div>
`, { notes: [
  "(draft) Title only. A second assumption: about size and distance.",
  "(draft) A person standing close casts a large image on the retina.",
  "(draft) The same person farther away casts a much smaller one.",
  "(draft) Yet we don't see them shrink: the visual system takes distance into account. Emmert's law. (From the outline: some discrepancies between humans and computers here.)"
]});
}

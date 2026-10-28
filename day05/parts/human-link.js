/* PART: human-link (Day 5). Owner: to decide (see README.md).
   Human connection (plan): learned visual representations vs biological visual processing.
   Shares the 'Learned filters' section. Claims kept modest; full references in feedback/_day.md. */
{
section('Learned filters');

const hlRef = t => `<div class="label">${t}</div>`;

st(`
  <h1 class="t">Brains and networks: the first stage</h1>
  <ul class="frag">
    <li class="b">V1 neurons: oriented edges${hlRef('Hubel &amp; Wiesel, 1962')}</li>
    <li class="b">First layer of a trained network: oriented, edge-like filters${hlRef('Krizhevsky, Sutskever &amp; Hinton, 2012')}</li>
    <li class="b">Similar filters from natural image statistics alone${hlRef('Olshausen &amp; Field, 1996')}</li>
  </ul>
  <div class="todo b">figure: first-layer filters of a trained network next to a V1 receptive field (image and credit to add)</div>
`, { notes: [
  "(draft) Does the brain do anything like this? Let's start with the first stage.",
  "(draft) On Day 3 we met Hubel and Wiesel: many neurons in primary visual cortex respond best to an edge or bar at a particular orientation.",
  "(draft) When a large network is trained to recognize objects in photographs, many of its first-layer filters come out oriented and edge-like too. Nobody built that in; it was learned.",
  "(draft) And a model with no labels at all, one that just tries to describe natural images efficiently with few active units, also ends up with oriented, localized filters, a lot like V1 receptive fields. So part of the answer may be the statistics of the images themselves.",
  "(draft) (to show) Here, the two side by side."
]});

st(`
  <h1 class="t">Brains and networks: deeper stages</h1>
  <ul class="frag">
    <li class="b">Networks trained to recognize objects predict responses in monkey IT${hlRef('Yamins et al., 2014')}</li>
    <li class="b">and in human IT, measured with fMRI${hlRef('Khaligh-Razavi &amp; Kriegeskorte, 2014')}</li>
    <li class="b">Useful models, not copies</li>
  </ul>
`, { notes: [
  "(draft) What about later stages, like inferotemporal cortex, IT, where neurons respond to objects?",
  "(draft) Networks trained only to recognize objects turned out to predict the responses of neurons in monkey IT better than earlier models, even though they were never trained on brain data.",
  "(draft) A similar result in humans: the representations in deep networks matched IT activity measured with fMRI better than earlier computer vision models did.",
  "(draft) That makes them useful models of the visual system, but not copies of it, as the next slide shows."
]});

st(`
  <h1 class="t">Not the same system</h1>
  <ul class="frag">
    <li class="b">Networks lean on texture; people lean on shape${hlRef('Geirhos et al., 2019')}</li>
    <li class="b">Tiny, invisible changes can flip a network's answer${hlRef('Szegedy et al., 2014')}</li>
    <li class="b">The brain probably does not run backprop as we will see it today${hlRef('Lillicrap et al., 2020')}</li>
    <li class="b">Experience shapes early vision too: critical periods${hlRef('Wiesel &amp; Hubel, 1963')}</li>
  </ul>
`, { notes: [
  "(draft) Where they differ.",
  "(draft) Show a standard trained network a cat shape filled with elephant skin texture, and it tends to say elephant. People say cat. Networks trained on ImageNet rely more on texture than on shape.",
  "(draft) Changes to an image too small for us to notice can make a network change its answer completely. These are called adversarial examples.",
  "(draft) How the brain learns is still open. The exact algorithm we will see today, backpropagation, needs things that neurons are not known to have; there are proposals for how the brain might approximate it.",
  "(draft) But learning matters for brains too. In kittens, closing one eye during an early critical period changes how visual cortex responds to that eye, long term. Early vision is shaped by experience, not only built in."
]});
}

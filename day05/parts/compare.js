/* PART: compare (Day 5). Owner: to decide (see README.md). Plan: 10 min, comparing representations: similarity, geometry, invariance.
   1. scene: RDMs of an embedding, of raw pixels, and of a model; RSA
   2. RSA with brains */
{
section('Comparing representations');

sc('rsaScene', 'scenes/rsa.html');

const cmpRef = t => `<div class="label">${t}</div>`;
st(`
  <h1 class="t">Models and brains, compared the same way</h1>
  <ul class="frag">
    <li class="b">Same images shown to monkeys and people: their IT RDMs agree, with categories like faces and bodies, animate and inanimate${cmpRef('Kriegeskorte et al., 2008, Neuron')}</li>
    <li class="b">Object-trained networks: closer to IT than earlier models${cmpRef('Khaligh-Razavi &amp; Kriegeskorte, 2014, PLoS Computational Biology')}</li>
    <li class="b">A shared yardstick: any model, any brain area, any species</li>
  </ul>
`, { notes: [
  "(draft) Why is this so useful? Because the same comparison works for brains.",
  "(draft) Kriegeskorte and colleagues showed the same object images to monkeys, recording neurons in inferior temporal cortex, IT, and to people in an fMRI scanner. The two RDMs agreed remarkably well, with the same big divisions: animate versus inanimate, and faces and bodies within the animate.",
  "(draft) Later, the same method showed that deep networks trained to recognize objects come closer to the IT RDM than earlier computer vision models did.",
  "(draft) Because RSA only compares patterns of differences, it gives one yardstick for any model, any brain area, and any species. In the lab, you will use the rsatoolbox package to do exactly this with a ViT."
]});
}

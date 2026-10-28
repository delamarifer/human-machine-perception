/* PART: filters (Day 5). Owner: to decide (see README.md). Plan: 15 min, fixed to learned filters.
   1. scene: a hand-designed filter (Sobel) next to a 5x5 filter learned live by gradient descent
   2. what a real network does with the same idea: many filters, many layers */
{
section('Learned filters');

sc('filtersLearned', 'scenes/filters-learned.html');

st(`
  <h1 class="t">In a real network</h1>
  <ul class="frag">
    <li class="b">Many filters per layer, not one</li>
    <li class="b">Layers of filters: each works on the last one's output</li>
    <li class="b">Every number learned from labeled examples</li>
  </ul>
`, { notes: [
  "(draft) What does a real network do with this idea?",
  "(draft) It learns not one filter but many in each layer, dozens or hundreds, each free to pick up something different.",
  "(draft) It stacks layers: the second layer filters the outputs of the first, so it can respond to combinations, like corners or textures. Day 6 looks at what each layer ends up representing.",
  "(draft) And none of these numbers is designed. They all come out of training on labeled examples, with the same recipe we just watched. The rest of today is about that recipe."
]});
}

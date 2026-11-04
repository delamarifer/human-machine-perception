/* PART: embeddings (Day 5). Owner: to decide (see README.md). Plan: 15 min, from CNN feature maps to embeddings.
   1. scene: an image, a filter bank (standing in for a CNN layer), feature maps, pooled to 8 numbers; similarity
   2. embeddings in real networks */
{
section('Embeddings');

sc('embeddingScene', 'scenes/embedding.html');

st(`
  <h1 class="t">Embeddings in real networks</h1>
  <ul class="frag">
    <li class="b">The last layer before the classifier: hundreds of numbers per image</li>
    <li class="b">Similar images, nearby points</li>
    <li class="b">Reused for search, clustering, and new tasks</li>
  </ul>
`, { notes: [
  "(draft) What does this look like in a real network?",
  "(draft) Take a trained CNN and cut off its classifier. What is left, for each image, is a vector of a few hundred to a few thousand numbers: its embedding.",
  "(draft) Because the network was trained to tell objects apart, images it treats as alike end up near each other in that space.",
  "(draft) And that makes embeddings useful far beyond the original task: image search, grouping photos, or a starting point for a new classifier with little data, the transfer learning we saw on Day 4."
]});
}

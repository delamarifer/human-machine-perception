/* PART: s-representations (Day 5). Owner: Fernanda · Shreya.
   7. Embeddings and a space where similarity is a distance. */
{
section('7. Space');

st(`
  <h1 class="t">From features to visual representations</h1>
  <div class="cols">
    <div class="card b"><div class="k">Embedding</div><div class="label">One vector for the image. For a Vision Transformer, often the classification token at the last layer.</div></div>
    <div class="card b"><div class="k">A space</div><div class="label">Every image is a point. The axes are the dimensions of that vector.</div></div>
    <div class="card hi b"><div class="k">Similarity</div><div class="label">Two images are similar when their points are close. Cosine similarity, or a distance.</div></div>
  </div>
`, { notes: [
  "Leave the diagram of the network. What we keep is the vector it produced.",
  "An embedding is that vector: one list of numbers standing for the image. In the Vision Transformer we just described, a usual choice is the final classification token. A CNN gives you the same kind of object if you read out the layer before the classifier. Yesterday's visual search was already this.",
  "Put many images in, and you have many points. That collection of points is a representation space. It is not a picture of the images. It is a geometry the model imposed.",
  "Similarity is then ordinary geometry. Close points, similar images, by whatever the model encoded. Far points, different. We measure it with cosine similarity, which ignores vector length, or with a distance. The next two sections ask what 'similar' came to mean, and then you will measure it."
]});
}

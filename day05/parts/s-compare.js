/* PART: s-compare (Day 5). Owner: Fernanda · Shreya.
   6. Inductive bias, locality, global relationships, data. */
{
section('6. Compare');

st(`
  <h1 class="t">CNNs vs. Vision Transformers</h1>
  <table class="tbl">
    <thead><tr><th></th><th>CNN</th><th>Vision Transformer</th></tr></thead>
    <tbody>
      <tr class="b"><td>Locality</td><td>Built in. Each unit sees a neighborhood.</td><td>Not built in. Local structure has to be learned.</td></tr>
      <tr class="b"><td>Relationships</td><td>Global ones arrive late, as the receptive field grows.</td><td>Global from the first attention layer. Any patch can reach any patch.</td></tr>
      <tr class="b"><td>Inductive bias</td><td>Strong: locality, and the same weights everywhere.</td><td>Weak. Less is assumed about the image.</td></tr>
      <tr class="b"><td>Data</td><td>The bias helps when examples are fewer.</td><td>With less assumed, the model wants more data, or more pretraining.</td></tr>
    </tbody>
  </table>
  <div class="cite">The data row is the claim in Dosovitskiy et al., 2021, not a number from this room.</div>
`, { notes: [
  "A comparison of biases, not of which one wins. Read it row by row.",
  "Locality. A CNN assumes that what matters nearby should be computed nearby. A Vision Transformer does not. It can learn local patterns, but nothing in the architecture forces them.",
  "Relationships. In a CNN, a unit sees the whole image only after enough layers. In a Vision Transformer, the first attention layer can already connect any patch to any other.",
  "Inductive bias is the name for those assumptions. The CNN has a strong one: locality, and weight sharing across the image. The transformer has a weak one. It is closer to a general sequence model.",
  "Data follows from the bias. If you assume less, you have to learn more from examples. Dosovitskiy and colleagues report that Vision Transformers lag behind CNNs on mid-sized datasets and pull ahead when pretrained on a very large set. Say it as their claim. Do not quote a dataset size unless you want to open the paper. The two families have been borrowing from each other since. You do not need names unless someone asks."
]});
}

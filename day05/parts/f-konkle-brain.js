/* PART: f-konkle-brain (Day 5). Owner: Fernanda. Hour 2, the reading, second half (after the RSA scene).
   Konkle & Alvarez (2022), Nature Communications 13, 491, CC BY 4.0. Numbers from the Results text:
   two fMRI datasets (Object Orientation: 8 items x 5 in-plane orientations; Inanimate Objects: 72 objects),
   three sectors (EarlyV, pOTC, aOTC), voxel-wise encoding RSA (veRSA); IPCL >= or not significantly different
   from category-supervised in 56/60 comparisons (Supplementary Table 2); visual diet: mean absolute difference
   from the ImageNet baseline < 0.044, faces-only the outlier; Fig. 4: top-1 from 26 to 73% across models, no
   gain in brain fit, gap to the noise ceiling in aOTC for Inanimate Objects (noise ceiling r = 0.60). */
{
section('9. Reading');

const KONKLE_CITE2 = 'Konkle &amp; Alvarez, 2022, <i>Nature Communications</i> 13, 491 (CC BY 4.0)';

st(`
  <h1 class="t">Does it match the ventral stream?</h1>
  <div class="cols">
    <div class="card b"><div class="k">Brain data</div><div class="label">fMRI: 8 objects at 5 orientations, and 72 everyday objects. Early visual, posterior and anterior occipito-temporal cortex.</div></div>
    <div class="card b"><div class="k">The comparison</div><div class="label">Predict each voxel from a layer's units, then compare the predicted and the measured dissimilarity matrices.</div></div>
    <div class="card hi b"><div class="k">Result</div><div class="label">No labels, on par with the category-trained network: as good or not reliably worse in 56 of 60 comparisons.</div></div>
  </div>
  ${cite('Results and Fig. 2, ' + KONKLE_CITE2)}
`, { notes: [
  "(draft) Second result, the one in the title: do the IPCL features match the brain?",
  "(draft) They used two fMRI datasets. In one, eight objects shown at five orientations each. In the other, 72 everyday inanimate objects. They looked at three stages: early visual cortex, then posterior and anterior occipito-temporal cortex, going up the ventral stream.",
  "(draft) The comparison is the RSA we just saw, with one step added. First they fit each voxel's responses as a weighted sum of a layer's units, then they compute the dissimilarity matrix those predicted voxels give, and correlate it with the measured one. They call it voxel-wise encoding RSA.",
  "(draft) The result: the network trained with no labels matches the brain about as well as the same network trained on the categories. In 56 of their 60 comparisons it was as good or not significantly different. Early layers fit early visual cortex best, later layers fit the later regions."
]});

st(`
  <h1 class="t">More accuracy is not more brain-like</h1>
  <img class="b" src="assets/konkle/fig4-accuracy-vs-brain.png" alt="Konkle and Alvarez 2022, Figure 4: for EarlyV, pOTC and aOTC, brain fit (cross-validated max correlation) against ImageNet top-1 accuracy for contrastive and category-supervised models; a gap to the noise ceiling remains" style="display:block;margin:0.4em auto;max-width:86%;max-height:46vh">
  <ul class="frag">
    <li class="b">Top-1 accuracy from 26% to 73% across models: no better brain fit</li>
    <li class="b">A gap remains in anterior cortex for the 72 objects</li>
  </ul>
  ${cite('Fig. 4, ' + KONKLE_CITE2)}
`, { notes: [
  "(draft) Third result. Newer contrastive models, like SimCLR, MoCo version 2 and SwAV, classify much better than theirs, close to supervised models. Are they more brain-like?",
  "(draft) This figure answers it, for the 72 inanimate objects. Each point is a model. Across, its ImageNet accuracy; up, how well it fits the brain. Filled markers learned without labels; open markers were trained on labels. The black line is the noise ceiling, the best any model could do given how reliable the data are.",
  "(draft) Accuracy ranges from 26 to 73 percent, and the brain fit does not go up with it. Being better at the benchmark did not make a model more brain-like.",
  "(draft) And in anterior cortex there is a gap that none of them closes, the red arrow. Something about how the brain arranges these objects is still missing from every model, supervised or not. They also tried other visual diets, scenes, faces, mixtures, and it barely mattered, except that a diet of faces alone did worse on the eight objects at five orientations, in the later regions."
]});

st(`
  <h1 class="t">Discussion</h1>
  <ul class="frag">
    <li class="b">If the goal is not categories, what is it?</li>
    <li class="b">They chose the views. What views does a baby get?</li>
    <li class="b">Is benchmark accuracy the right yardstick for a model of the brain?</li>
    <li class="b">Their caveat: existence proofs, not models of the brain</li>
  </ul>
  ${cite(KONKLE_CITE2)}
`, { notes: [
  "(draft) Questions to talk over with your neighbor, then with the room. Pull from what you wrote.",
  "(draft) If categories are not the goal, what is? Their answer: tell every view of the world apart from every other, in a compact code. Do you buy it?",
  "(draft) Remember the views decide what is kept. They chose crops, rescaling and color changes by hand. What would a baby's views be? They tested one model trained on video from head cameras worn by young children, and it did not close the gap either. They point to learning over time, from video, as the open frontier.",
  "(draft) Accuracy on ImageNet did not predict brain fit. So what should we measure when we say a model is like the brain?",
  "(draft) And their own caveat, worth saying out loud: these networks are not offered as models of the brain. They are existence proofs, showing what kind of representation can be learned from images alone, without category labels."
]});
}

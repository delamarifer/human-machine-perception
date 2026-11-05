/* PART: classification (Day 4). Owner: Fernanda · Shreya.
   Section 5, 15 min: ImageNet, ResNet-18 on the street, softmax is not confidence (a spectrogram),
   embeddings, visual search over a 15-image gallery. All outputs from assets/pipeline.py. */
{
section('5. Classify & search');

const R = D4.resnet, S = D4.search;

st(`
  <h1 class="t">ImageNet: the dataset behind most pretrained backbones</h1>
  <div class="d4-grid3" style="flex:0 0 auto;margin:auto 0">
    <div class="b" data-step="1"><div class="big">1.28M</div><div class="label">training images</div></div>
    <div class="b" data-step="1"><div class="big">${fmt(R.n_classes)}</div><div class="label">classes</div></div>
    <div class="b" data-step="2"><div class="big hi-t">120</div><div class="label">of them are dog breeds</div></div>
  </div>
  <div class="d4-card hi b" data-step="3"><div class="label">No class for <b>street</b>, <b>pedestrian</b>, or <b>matatu</b>. A classifier can only answer with the labels it was given.</div></div>
  ${cite('Deng et al. (2009), ImageNet · Russakovsky et al. (2015), ImageNet Large Scale Visual Recognition Challenge')}
`, { notes: [
  "Before we run the classifier, what was it trained on?",
  "ImageNet's classification set: about 1.28 million training images in 1,000 classes. AlexNet winning this challenge in 2012 started the deep learning era in vision.",
  "But look at the label set. 120 of the 1,000 classes are dog breeds.",
  "And there is no class for street, or pedestrian, or a Nairobi matatu. Whatever the model sees, it has to answer with one of its thousand labels. Keep that in mind for the next slide."
]});

st(`
  <h1 class="t">ResNet-18 on the street</h1>
  <div class="d4-cols wide-r">
    <div class="pic"><img src="${A}resnet/street-crop.jpg" alt="" style="max-height:56vh"><div class="label">what it sees: resized, centre-cropped to 224 × 224</div></div>
    <div style="display:flex;flex-direction:column;gap:2.4vh">
      ${bars(R.top5_street, {build: true})}
      <div class="d4-card hi b" data-step="6"><div class="label">One label for a scene with dozens of objects. ${M(R.top5_street[0].label)} is the nearest thing ImageNet has to a white matatu.</div></div>
    </div>
  </div>
`, { notes: [
  "Here is ResNet-18 with its ImageNet weights on our street. Note what it actually sees: the photo resized and centre-cropped to 224 by 224. The edges are gone.",
  `Its top answer: ${R.top5_street[0].label}, at ${pct(R.top5_street[0].p)}.`,
  `Then ${R.top5_street[1].label}, ${pct(R.top5_street[1].p)}.`,
  `${R.top5_street[2].label}, ${pct(R.top5_street[2].p)}.`,
  `${R.top5_street[3].label}, ${pct(R.top5_street[3].p)}.`,
  `${R.top5_street[4].label}, ${pct(R.top5_street[4].p)}.`,
  "Is it wrong? Not exactly. The white minibus in front is the most salient object, and police van is the closest of the 1,000 labels. But a classifier gives one label for the whole scene. It cannot tell us that there are also people, motorbikes, buildings. That limitation is what detection fixes."
]});

sc('cueConflict', 'scenes/cue-conflict.html', {title: 'Cue-conflict: shape or texture?'});

st(`
  <h1 class="t">A probability is not a confidence</h1>
  <!-- reworked at Fernanda's request (2026-11-05): the whole ranked distribution for a photo and for the
       spectrogram, from assets/softmax/softmax.py (same ResNet-18). -->
  <div class="classification-dist" style="flex:1 1 auto;min-height:0;display:grid;grid-template-columns:auto 1fr;grid-template-rows:1fr 1fr;gap:1.5vh 2vw;align-items:center">
    <img class="b" data-step="1" src="${A}resnet/street-crop.jpg" alt="" style="height:26vh;border-radius:6px">
    <div class="b" data-step="1"><img src="${A}softmax/street.svg" alt="" style="height:28vh"><div class="label">the street photo: an ImageNet-like scene</div></div>
    <img class="b" data-step="2" src="${A}audio/spectrogram.png" alt="" style="height:26vh;max-width:30vw;object-fit:cover;border-radius:6px">
    <div class="b" data-step="2"><img src="${A}softmax/spectrogram.svg" alt="" style="height:28vh"><div class="label">a spectrogram of a synthetic bird call and a held note: not a photo, not in ImageNet</div></div>
  </div>
  <div class="d4-card hi b" data-step="3"><div class="label">Softmax always sums to 1. It ranks the ${fmt(R.n_classes)} labels; it never says “none of these”.</div></div>
`, { notes: [
  "(draft) Title only. What do the probabilities a classifier gives us actually mean? Let us look at all of them, not just the top one.",
  "(draft) Here is ResNet-18 on our street photo. Every label gets a probability, and together the 1,000 add up to one. Ranked from most to least probable, the top twenty look like this: a mode, police van at 55 percent, then cab at 14, and a long tail of labels close to zero.",
  "Now something that is not a photograph at all: a spectrogram of a synthetic bird call, made in our pipeline. Time runs left to right, frequency bottom to top. Nothing like it is in ImageNet. " +
    `ResNet-18 says: ${D4.audio.top5[0].label}, at ${pct(D4.audio.top5[0].p)}. The four chirps do look a bit like matchsticks. ` +
    "(draft) And look at the shape: the mode is sharper than for the real street photo, 78 percent against 55. The peak is higher for the image that matches none of the labels.",
  "That is the lesson. Softmax always sums to one over the classes it knows. A high softmax value tells you which of those classes is the best match, not whether the image belongs to any of them. Treat it as a ranking, not a confidence."
]});

/* added at Fernanda's request (2026-11-05): Govindarajan et al.'s confidence scene follows the softmax slide.
   The scene belongs to the open-research part (owner Fernanda), which lists it on slide "Open research areas". */
sc('orConfidence', 'scenes/or-confidence.html');

st(`
  <h1 class="t">Cut off the head: an embedding</h1>
  <div class="d4-cols wide-l">
    <div class="d4-code b" data-step="1"><span class="c"># same weights, no classification head</span>
model = resnet18(weights=ResNet18_Weights.IMAGENET1K_V1)
model.fc = torch.nn.Identity()

z = model(x)          <span class="c"># shape (1, ${S.dim})</span>
z = z / z.norm()      <span class="c"># unit length</span></div>
    <div class="d4-card hi b" data-step="2"><div class="label">The ${S.dim}-number vector before the head summarises the image in the network's own feature space.</div>
      <div class="label b" data-step="3">Similar images should land close together: compare with cosine similarity
        <div class="d4-eq" style="margin-top:1vh;font-size:clamp(1.05rem,1.7vw,1.5rem)">cos(<b>a</b>, <b>b</b>) = <b>a</b>·<b>b</b> / (‖<b>a</b>‖ ‖<b>b</b>‖)</div></div></div>
  </div>
`, { notes: [
  "Remember the backbone and head split. Now use it.",
  "Replace the final layer with the identity. Same weights, same backbone, but the output is now the 512-number vector from global average pooling.",
  "That vector is an embedding: a summary of the image in the features the network learned.",
  "If the features are good, images that look alike should get vectors pointing in similar directions. We measure that with cosine similarity: one means the same direction, zero means unrelated."
]});

const thumbs = (list, key) => `<div class="thumbs">${list.map(d => `<figure><img src="${A}search/${d.file}" alt=""><figcaption>${d[key].toFixed(2)}</figcaption></figure>`).join('')}</div>`;
const byPix = [...S.ranking].sort((a, b) => b.pixel_cos - a.pixel_cos);
const rankOf = (f, list) => list.findIndex(d => d.file === f) + 1;
const odd = byPix.slice(0, 5).find(d => !/nairobi|accra|kampala/.test(d.file));
const streets = S.ranking.filter(d => /nairobi|accra|kampala/.test(d.file)).length;
const firstNon = S.ranking.findIndex(d => !/nairobi|accra|kampala/.test(d.file)) + 1;

st(`
  <h1 class="t">Visual search: nearest neighbours of the street</h1>
  <div style="display:grid;grid-template-columns:15vw 1fr;gap:1.6vw;align-items:start">
    <div class="pic"><img src="${A}search/street.jpg" alt=""><div class="label">query</div></div>
    <div style="display:flex;flex-direction:column;gap:1.4vh">
      <div class="b" data-step="1"><div class="label"><b>ResNet-18 embeddings</b>, cosine similarity</div>${thumbs(S.ranking.slice(0, 5), 'cos')}</div>
      <div class="b" data-step="2"><div class="label"><b>Raw pixels</b> (32 × 32), cosine similarity</div>${thumbs(byPix.slice(0, 5), 'pixel_cos')}</div>
    </div>
  </div>
  <div class="label b" data-step="3">Gallery of ${S.gallery}: ${streets} street scenes and ${S.gallery - streets} others. With embeddings, all ${firstNon - 1} streets come first.${odd ? ` With pixels, the ${odd.file.replace('.jpg', '')} is #${rankOf(odd.file, byPix)}.` : ''}</div>
  ${cite('Photos: Wikimedia Commons, see assets/SOURCES.md')}
`, { notes: [
  `Here is a small gallery of ${S.gallery} images: street scenes from Nairobi, Accra and Kampala, plus goats, bananas, a dhow, a coffee cup, a sculpture, a Rubik's cube. The query is our street.`,
  "Rank by embedding similarity. The top five are all street scenes, from three different cities, with different colours and layouts.",
  "Now rank by raw pixel similarity on tiny 32 by 32 thumbnails. A mix: some streets, but also images that just share a bright sky and similar colours.",
  `Over the whole gallery, the embedding puts all ${firstNon - 1} street scenes ahead of every other image. Pixel similarity does not.${odd ? ` It ranks the ${odd.file.replace('.jpg', '')} at number ${rankOf(odd.file, byPix)}.` : ''} Same backbone as the classifier, a different task, and no retraining.`
]});

st(`
  <div class="center" style="max-width:72vw">
    <div class="question">What does “similar” mean to this network?</div>
    <div class="lead b" style="margin-top:5vh;font-size:4.2vh">Same objects? Same layout? Same colours? Same texture?</div>
    <div class="lead b" style="margin-top:2.4vh;font-size:4.2vh">It depends on what the training objective rewarded. ImageNet labels reward telling a police van from a cab.</div>
    <div class="lead b" style="margin-top:2.4vh;font-size:3.6vh;color:var(--mute)">Day 5: embedding spaces, and comparing them with human judgements.</div>
  </div>
`, { notes: [
  "So: what does similar mean to this network?",
  "Is it matching objects, layout, colour, texture? Look at the neighbours again and argue for one.",
  "The answer depends on what training rewarded. A network trained on ImageNet labels has been rewarded for features that separate a police van from a cab, and that shapes which images it calls close.",
  "Tomorrow we look at embedding spaces properly and compare them with human similarity judgements."
]});
}

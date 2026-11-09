/* PART: problem (Day 6). Owner: Shreya. Section 1: The problem (Foundations of Computer Vision, Ch. 35),
   plan slides 1-6; ends on a question that leads into Part 2 (Checkpoint 1 removed, Shreya). No speaker notes (Shreya's request).
   Figures in assets/visionbook-ch35/ come from visionbook.mit.edu/bias_and_shift.html (CC BY-NC-ND 4.0):
   content unmodified, only scaled to 2400 px wide and saved as JPEG for the web. Never crop or edit them.
   Every number on these slides is checked against the chapter text (2026-11-08), except the ones marked illustrative. */
{
section('The problem');

const prFig = 'assets/visionbook-ch35/';
const prSrc = (fig) => d6Link('https://visionbook.mit.edu/bias_and_shift.html', `Foundations of Computer Vision, Ch. 35, ${fig}`)
  + ' · ' + d6Link('https://creativecommons.org/licenses/by-nc-nd/4.0/', 'CC BY-NC-ND 4.0') + ', unmodified';
const prTE = (where) => d6Link('https://people.csail.mit.edu/torralba/publications/datasets_cvpr11.pdf', `Torralba and Efros, Unbiased Look at Dataset Bias (CVPR 2011), ${where}`);

const prStyle = `<style>
  .problem-fig{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; gap:1.6vh; }
  .problem-side{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1.5fr 1fr; gap:2.6vw; align-items:center; }
  .problem-side .col{ display:flex; flex-direction:column; gap:2.4vh; justify-content:center; }
  .problem-big{ font-size:clamp(2.4rem, 5vw, 5rem); font-weight:700; line-height:1; }
  .problem-col{ display:flex; flex-direction:column; gap:2.2vh; justify-content:center; }
  .problem-col .problem-big{ font-size:clamp(2rem, 4vw, 4rem); }
  .problem-src{ display:grid; grid-template-columns:auto 1fr; gap:1.3vh 1.4vw; align-items:baseline; }
  .problem-shift{ flex:1 1 auto; min-height:0; width:100%; display:block; }
  .problem-shift text{ font-family:var(--font); fill:var(--ink); }
</style>`;

/* ---------- Section opener ---------- */
st(`${prStyle}
  <h1 class="t">Part 1 · The problem</h1>
  ${d6Roadmap(0, false)}
`);

/* ---------- Slide 1: the hook. First how colorization normally works (Fig. 35.1, Zhang et al. 2016) ---------- */
st(`
  <h1 class="t">How a colorization model works</h1>
  <div class="problem-fig">
    <img class="d6-img b" data-step="1" src="${prFig}CIC_teaser_v5.jpg" alt="Figure 35.1: eight pairs of a grayscale photo and the model's colorized output: croquet balls, a photographer, a mountain, a boy with a cockatoo, a ladybug, a fish, a rooster, a dog, a butterfly">
    <div class="lead center b" data-step="2">In: a grayscale photo. Out: the same photo in color.</div>
    <div class="lead center b" data-step="3">Training is cheap: take color photos, turn them gray, and learn to bring the color back</div>
  </div>
  ${cite(prSrc('Fig. 35.1, from Zhang, Isola and Efros (ECCV 2016)'))}
`);

/* ---------- Slide 1A: the failure ---------- */
st(`
  <h1 class="t">ColorizeBot: it worked until the public used it</h1>
  <div class="problem-side">
    <img class="d6-img b" data-step="2" src="${prFig}colorizebot_examples.jpg" alt="Figure 35.2: ColorizeBot outputs for an 1849 photo of Chopin and a 1933 photo of a thylacine, both mostly sepia">
    <div class="col">
      <div class="lead b" data-step="1"><b>Trained on:</b> ImageNet, millions of modern digital photos</div>
      <div class="lead b" data-step="2"><b>Used on:</b> historical photos, extinct animals, old family pictures</div>
      <div class="lead b" data-step="3"><b>Result:</b> most photos came out sepia</div>
    </div>
  </div>
  ${cite(prSrc('Fig. 35.2 (Reddit ColorizeBot)'))}
`, { sub: true });

st(`
  <h1 class="t">It learned ImageNet's dogs, not dogs</h1>
  <div class="problem-fig">
    <img class="d6-img b" data-step="1" src="${prFig}dogs_with_tongues.jpg" alt="Figure 35.3: colorized dogs with pink painted under the mouth, next to ImageNet dogs with tongues out">
    <div class="lead center b" data-step="2">About <b>12%</b> of ImageNet is dogs, many with their tongues out, so it paints pink under every dog's chin</div>
    <div class="statement center b" data-step="3"><b>The code was fine. The data was different.</b></div>
  </div>
  ${cite(prSrc('Fig. 35.3'))}
`, { sub: true });

/* ---------- Slide 2 (new): the problem in one picture. Our own drawing; no data. ---------- */
st(`
  <h1 class="t">What went wrong: the images moved</h1>
  <svg class="problem-shift" viewBox="0 0 1000 470" role="img" aria-label="Two overlapping clouds: the training images and the images the model meets. The model is reliable only inside the training cloud.">
    <g class="b" data-step="1">
      <ellipse cx="350" cy="250" rx="270" ry="165" fill="#e2e8f0" stroke="#64748b" stroke-width="3"/>
      <text x="235" y="215" font-size="30" font-weight="700" text-anchor="middle">Training images</text>
      <text x="235" y="255" font-size="25" text-anchor="middle">modern digital photos,</text>
      <text x="235" y="287" font-size="25" text-anchor="middle">lots of dogs</text>
    </g>
    <g class="b" data-step="2">
      <text x="255" y="328" font-size="25" font-weight="700" text-anchor="middle">the model is good here</text>
    </g>
    <g class="b" data-step="3">
      <ellipse cx="650" cy="250" rx="270" ry="165" fill="none" stroke="#0f172a" stroke-width="3" stroke-dasharray="14 10"/>
      <text x="765" y="215" font-size="30" font-weight="700" text-anchor="middle">Images it meets</text>
      <text x="765" y="255" font-size="25" text-anchor="middle">grainy old film, people,</text>
      <text x="765" y="287" font-size="25" text-anchor="middle">extinct animals</text>
    </g>
    <g class="b" data-step="4">
      <text x="750" y="328" font-size="25" font-weight="700" text-anchor="middle">no guarantee here</text>
    </g>
    <g class="b" data-step="5">
      <text x="500" y="458" font-size="30" text-anchor="middle">Training data and real-world data differ: <tspan font-weight="700">distribution shift</tspan></text>
    </g>
  </svg>
  ${cite('Our drawing, after Ch. 35 Fig. 35.5 (Foundations of Computer Vision)')}
`);

/* ---------- Slide 3: the toy example ---------- */
sc('toyShift', 'scenes/toy-shift.html');

st(`
  <h1 class="t">Moving the test data multiplies the error</h1>
  <div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3.4vh">
    <table class="d6-tbl b" data-step="1">
      <tr><th>error</th><th>test on A</th><th>test on B</th></tr>
      <tr><td class="rowh">train on A</td><td>0.18</td><td>0.7</td></tr>
      <tr><td class="rowh">train on B</td><td>1.93</td><td>0.23</td></tr>
    </table>
    <div class="lead b" data-step="2">Train and test on the same data: <b>small error</b></div>
    <div class="lead b" data-step="3">Train on one, test on the other: about <b>4×</b> to <b>8×</b> larger</div>
    <div class="lead b" data-step="4">Same model, same amount of data. Only the test images moved.</div>
  </div>
  ${cite(d6Link('https://visionbook.mit.edu/bias_and_shift.html', 'Foundations of Computer Vision, Ch. 35, Table 35.1') + ' (5 training samples)')}
`, { sub: true });

/* ---------- Slide 4: what is one example worth? (Table 35.2, from Torralba & Efros 2011) ---------- */
st(`
  <h1 class="t">Data from somewhere else is worth less</h1>
  <div class="d6-cols" style="align-items:center;grid-template-columns:1fr 1.25fr">
    <div style="display:flex;flex-direction:column;gap:3vh">
      <div class="lead b" data-step="1">Toy example: to do as well on A, training on B needs about <b>10×</b> more examples</div>
      <div class="statement b" data-step="2"><b>One B example is worth about 1/10 of an A example.</b></div>
    </div>
    <div class="b" data-step="3" style="display:flex;flex-direction:column;gap:1.2vh;align-items:center">
      <div class="label">Real datasets, 2011: one car image from… is worth this many cars from…</div>
      <table class="d6-tbl" style="font-size:clamp(.82rem,1.2vw,1.18rem)">
        <tr><th></th><th>LabelMe</th><th>PASCAL</th><th>ImageNet</th><th>Caltech101</th></tr>
        <tr><td class="rowh">LabelMe</td><td>1</td><td>0.26</td><td>0.31</td><td>0</td></tr>
        <tr><td class="rowh">PASCAL</td><td>0.50</td><td>1</td><td>0.88</td><td>0</td></tr>
        <tr><td class="rowh">ImageNet</td><td>0.24</td><td>0.40</td><td>1</td><td>0</td></tr>
        <tr><td class="rowh">Caltech101</td><td>0.23</td><td>0</td><td>0.28</td><td>1</td></tr>
      </table>
    </div>
  </div>
  ${cite(d6Link('https://visionbook.mit.edu/bias_and_shift.html', 'Foundations of Computer Vision, Ch. 35.4.1 and Table 35.2 ("market value" of a car image)') + ', modified from Torralba and Efros (CVPR 2011)')}
`);

/* ---------- Slide 5: Name That Dataset ---------- */
st(`
  <h1 class="t">Name That Dataset: where is each image from?</h1>
  <div class="problem-side" style="grid-template-columns:1.6fr 1fr;grid-template-rows:minmax(0,1fr)">
    <img class="d6-img b" data-step="1" src="${prFig}datasetsJeopardy.jpg" alt="Figure 35.8: three random images from each of 12 vision datasets, with the 12 dataset names to match">
    <div class="col problem-col">
      <div class="b" data-step="2"><div class="problem-big">1 in 12</div><div class="lead">by chance: about 8%</div></div>
      <div class="b" data-step="3"><div class="problem-big">about 75%</div><div class="lead">researchers who know them</div></div>
      <div class="b" data-step="4"><div class="problem-big">39%</div><div class="lead">a simple classifier, rising with more data</div></div>
      <div class="lead b" data-step="5"><b>Every dataset has a look of its own.</b> That is dataset bias.</div>
    </div>
  </div>
  ${cite(prSrc('Fig. 35.8, modified from Torralba and Efros (CVPR 2011)') + ' · 75% and 39%: ' + prTE('section 1'))}
`);

/* ---------- 5A: even the cars give it away (Torralba and Efros 2011, section 1) ---------- */
st(`
  <h1 class="t">Even the cars give the dataset away</h1>
  <div class="d6-cols" style="align-items:center">
    <div class="problem-col">
      <div class="lead b" data-step="1">Cut out just the <b>car</b> from 5 datasets. Can a classifier still tell which dataset it came from?</div>
      <div class="b" data-step="2"><div class="problem-big">61%</div><div class="lead">chance is 20%</div></div>
    </div>
    <div class="problem-col">
      <div class="lead b" data-step="3"><b>Caltech101:</b> side views</div>
      <div class="lead b" data-step="3"><b>ImageNet:</b> racing cars</div>
      <div class="lead b" data-step="3"><b>PASCAL:</b> unusual viewpoints</div>
      <div class="lead b" data-step="3"><b>LabelMe:</b> cars partly hidden behind small objects</div>
      <div class="lead b" data-step="4">Same word, "car", but each dataset means a different car.</div>
    </div>
  </div>
  ${cite(prTE('section 1, Fig. 4'))}
`, { sub: true });

/* ---------- 5B: cross-dataset generalization, Table 1 "car" classification rows (AP), Torralba and Efros 2011 ---------- */
const PR_T1 = [['SUN09', 28.2, 19.8, 30], ['LabelMe', 34.0, 24.5, 28], ['PASCAL', 35.2, 32.6, 7],
  ['ImageNet', 57.4, 34.4, 40], ['Caltech101', 96.9, 26.7, 73], ['MSRC', 68.4, 26.8, 61]];
st(`
  <h1 class="t">A car finder trained on one dataset fails on the others</h1>
  <div class="d6-cols" style="align-items:center;grid-template-columns:1.1fr 1fr">
    <table class="d6-tbl b" data-step="1" style="font-size:clamp(1rem,1.65vw,1.55rem)">
      <tr><th>train on</th><th>test on the same</th><th>test on the others</th><th>drop</th></tr>
      ${PR_T1.map(([n, s, o, d]) => `<tr><td class="rowh">${n}</td><td>${s.toFixed(1)}</td><td>${o.toFixed(1)}</td><td>${d}%</td></tr>`).join('')}
    </table>
    <div class="problem-col">
      <div class="lead b" data-step="2">Average: <b>53.4</b> on its own test set, <b>27.5</b> on the others</div>
      <div class="lead b" data-step="3">Caltech101 looks best at home (96.9) and transfers worst (73% drop)</div>
      <div class="lead b" data-step="4">A drop this size would take a <b>first-place</b> method to near <b>last</b></div>
    </div>
  </div>
  ${cite(prTE('Table 1, "car" classification, average precision'))}
`);

/* ---------- 5C: still true in 2024 (Liu and He, ICLR 2025) ---------- */
st(`
  <h1 class="t">In 2024, big datasets still give themselves away</h1>
  <div class="d6-cols" style="align-items:center">
    <div class="problem-col">
      <div class="lead b" data-step="1">Three web-scale datasets: YFCC (Flickr), CC, DataComp. 1 million images each.</div>
      <div class="b" data-step="2"><div class="problem-big">84.7%</div><div class="lead">a modern network, on images it never saw (chance 33.3%)</div></div>
      <div class="b" data-step="3"><div class="problem-big">45.4%</div><div class="lead">people: 20 machine-learning researchers, on average</div></div>
    </div>
    <div class="problem-col">
      <div class="lead b" data-step="4"><b>Not just pixel quirks:</b> shrink images to 32×32 and it still gets 68.4%</div>
      <div class="lead b" data-step="5"><b>Not memorizing:</b> split one dataset into three fake "datasets" and it stays at chance</div>
      <div class="statement b" data-step="6"><b>More data did not remove the bias. The network sees it better than we do.</b></div>
    </div>
  </div>
  ${cite(d6Link('https://arxiv.org/abs/2403.08632', 'Liu and He, A Decade\'s Battle on Dataset Bias: Are We There Yet? (ICLR 2025)') + ', sections 4–6, Tables 5–6')}
`, { sub: true });

/* ---------- 5D: the four causes Torralba and Efros name, with their fixes (sections 3.1, 3.2, 6) ---------- */
st(`
  <h1 class="t">Four ways a dataset gets its look, and what helps</h1>
  <table class="d6-tbl" style="width:100%;font-size:clamp(.95rem,1.55vw,1.45rem)">
    <tr><th style="text-align:left">Bias</th><th style="text-align:left">What happens</th><th style="text-align:left">What helps</th></tr>
    <tr class="b" data-step="1"><td class="rowh">Selection</td><td style="text-align:left">datasets prefer some images: street scenes, nature, whatever a keyword search returns</td><td style="text-align:left">many sources: several search engines, several countries</td></tr>
    <tr class="b" data-step="2"><td class="rowh">Capture</td><td style="text-align:left">the object sits in the center; search "mug" and the handles point right</td><td style="text-align:left">flips, crops, small shifts (Part 2)</td></tr>
    <tr class="b" data-step="3"><td class="rowh">Label</td><td style="text-align:left">fuzzy categories: "grass" or "lawn"? "painting" or "picture"?</td><td style="text-align:left">clear definitions for labelers</td></tr>
    <tr class="b" data-step="4"><td class="rowh">Negative set</td><td style="text-align:left">what counts as "not a car". Boats are always on water: is the model finding boats, or water?</td><td style="text-align:left">add negatives from other datasets; look for hard negatives</td></tr>
  </table>
  <div class="lead b" data-step="5" style="margin-top:1.4vh">Test SUN09, LabelMe or PASCAL car and person detectors on "not" images from all six datasets: performance drops 15–22%</div>
  ${cite(prTE('sections 3.1, 3.2 (Table 2) and 6'))}
`);

/* ---------- Slide 6: where bias comes from ---------- */
st(`
  <h1 class="t">Five ways bias gets into a dataset</h1>
  <div class="problem-fig" style="gap:2.4vh">
    <div style="flex:0 1 32vh;min-height:0" class="b" data-step="1"><img class="d6-img" src="${prFig}mugs.jpg" alt="Figure 35.10: the first Google image results for mug, mostly white backgrounds, side views, handles on the right"></div>
    <div class="problem-src">
      <div class="lead b" data-step="2"><b>Photographer</b></div><div class="lead b" data-step="2">what people choose to shoot, and from where</div>
      <div class="lead b" data-step="3"><b>Collection</b></div><div class="lead b" data-step="3">where the images come from: web search, dashcam, phone</div>
      <div class="lead b" data-step="4"><b>Annotation</b></div><div class="lead b" data-step="4">which images get labeled, and with which words</div>
      <div class="lead b" data-step="5"><b>Social</b></div><div class="lead b" data-step="5">whose world the images show</div>
      <div class="lead b" data-step="6"><b>Benchmark</b></div><div class="lead b" data-step="6">a biased test set can make a biased training set look good</div>
    </div>
  </div>
  ${cite(prSrc('Fig. 35.10 (Google results for "mug") and section 35.5'))}
`);

st(`
  <h1 class="t">We photograph objects from their typical views</h1>
  <div class="problem-side">
    <img class="d6-img b" data-step="1" src="${prFig}palmer_1981enhanced.jpg" alt="Figure 35.9: canonical viewpoints of 12 objects, from Palmer, Rosch and Chase 1981">
    <div class="col">
      <div class="lead b" data-step="2">People prefer, and recognize faster, a <b>typical view</b> of an object</div>
      <div class="lead b" data-step="3">They also <b>photograph</b> objects from that view, so datasets miss the others</div>
    </div>
  </div>
  ${cite(prSrc('Fig. 35.9, from Palmer, Rosch and Chase (1981)'))}
`, { sub: true });

/* ---------- Slide 7: adversarial shift ---------- */
st(`
  <h1 class="t">An attacker can choose the shift</h1>
  <div class="problem-fig">
    <img class="d6-img b" data-step="1" src="${prFig}adversarial_perturbation_3.jpg" alt="Figure 35.12: a cat photo plus a faint noise pattern gives an image that looks the same but is classified as ostrich">
    <div class="lead center b" data-step="2">The noise is shown <b>20× stronger</b> than it really is: to us, the two photos look the same</div>
    <div class="d6-eq b" data-step="3" style="align-self:center">find a small change ε, with ‖ε‖ &lt; r, that makes f(x + ε) say "ostrich"</div>
  </div>
  ${cite(prSrc('Fig. 35.12') + ' · adversarial examples: Szegedy et al. (ICLR 2014)')}
`);

/* ---------- Transition to Part 2: a question, not a quiz ---------- */
st(`
  <h1 class="t">If the data is the problem…</h1>
  <div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;justify-content:center;gap:4vh">
    <div class="lead b" data-step="1">The model only knows the world its training images show.</div>
    <div class="statement b" data-step="2" style="font-size:clamp(1.8rem,3.4vw,3.2rem)"><b>…how do we get data that covers the world the model will meet?</b></div>
  </div>
`);
}

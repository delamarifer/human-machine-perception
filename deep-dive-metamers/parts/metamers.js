/* PART: metamers (deep dive, its own deck). Owner: Fernanda. Deep dive of one project: which features make a model blind to image
   changes that people see, and can a sparse autoencoder find them? (Fernanda's request, 2026-11-10.)
   Public repo: project topic only, never student names or faces. Short plain sentences: many students are not fluent in English.
   Figures and licences: assets/metamers/SOURCES.md. Expected results are drawings only. Style follows day07-part2/parts/instance-level.js. */
{
section('Metamers');

const mmA = 'assets/metamers/';
const mmN = (...p) => ({ notes: p.map(x => '(draft) ' + x).join('[click]') });
const mmFig = (src, alt, step, cap, h = 54) => `<figure class="metamers-fig b" data-step="${step}"><img src="${mmA}${src}" alt="${alt}" style="max-height:${h}vh">${cap ? `<figcaption class="label">${cap}</figcaption>` : ''}</figure>`;
const mmLine = (t, step, cls = 'lead') => `<div class="${cls} b" data-step="${step}">${t}</div>`;
const mmSay = (t, step) => mmLine(t, step, 'statement metamers-say');
const mmStyle = `<style>
  .metamers-row{ flex:1 1 auto; min-height:0; display:flex; justify-content:center; align-items:center; gap:3vw; }
  .metamers-stack{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:1.4vh; }
  .metamers-col{ display:flex; flex-direction:column; justify-content:center; gap:2.4vh; min-width:0; }
  .metamers-fig{ margin:0; display:flex; flex-direction:column; align-items:center; gap:.8vh; min-width:0; }
  .metamers-fig img{ display:block; max-width:100%; object-fit:contain; }
  .metamers-fig figcaption{ text-align:center; }
  .metamers-say{ text-align:center; }
  .metamers-track{ display:flex; align-items:center; justify-content:center; gap:1vw; }
  .metamers-box{ border:2px solid var(--ink); border-radius:10px; padding:1.4vh .6vw; width:17vw; box-sizing:border-box; text-align:center; background:#fff; }
  .metamers-box.same{ background:#f1f5f9; }
  .metamers-box.key{ border-width:4px; }
  .metamers-arrow{ font-size:clamp(1.4rem, 2.2vw, 2rem); color:var(--mute); }
  .metamers-layers{ display:flex; align-items:flex-end; justify-content:center; gap:1.4vw; }
  .metamers-layer{ display:flex; flex-direction:column; align-items:center; gap:1vh; width:13vw; }
  .metamers-layer .blk{ width:100%; border:2px solid var(--ink); border-radius:10px; padding:2.2vh 0; text-align:center; background:#fff; }
  .metamers-layer.matched .blk{ background:#e2e8f0; border-width:4px; }
  .metamers-layer.probe .blk{ border:4px dashed var(--ink); }
  .metamers-tag{ min-height:5.4vh; text-align:center; }
  .metamers-banner{ align-self:center; display:flex; align-items:center; gap:.8vw; border:3px dashed var(--ink); border-radius:12px; padding:.8vh 1.6vw; font-size:clamp(1.15rem, 2vw, 2rem); font-weight:800; }
  .metamers-pencil{ width:clamp(30px, 5vh, 54px); height:clamp(30px, 5vh, 54px); flex:none; transform-origin:20% 85%; }
  .b.shown > .metamers-pencil{ animation:metamers-scribble .45s ease-in-out 3; }
  .b.shown > .metamers-sketch{ animation:metamers-draw 1.2s ease-out; }
  @keyframes metamers-draw{ from{ clip-path:inset(0 100% 0 0); } to{ clip-path:inset(0 0 0 0); } }
  @keyframes metamers-scribble{ 0%,100%{ transform:rotate(0) translate(0,0); } 30%{ transform:rotate(-12deg) translate(5px,-3px); } 70%{ transform:rotate(9deg) translate(-4px,3px); } }
  @media (prefers-reduced-motion: reduce){ .b.shown > .metamers-sketch, .b.shown > .metamers-pencil{ animation:none; } }
  .metamers-sketch{ display:block; height:40vh; max-width:100%; }
  .metamers-sketch text{ font-family:inherit; fill:var(--ink); }
  .metamers-sketch text.metamers-stamp{ font-family:'Bradley Hand','Segoe Print','Comic Sans MS',cursive; font-size:21px; font-weight:700; }
  .metamers-chart{ display:block; height:46vh; max-width:100%; }
  .metamers-chart text{ font-family:inherit; fill:var(--ink); }
  .metamers-diagram{ display:block; height:40vh; max-width:100%; }
  .metamers-diagram text{ font-family:inherit; fill:var(--ink); }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){
    .metamers-row{ flex-direction:column; gap:1.2vh; }
    .metamers-track, .metamers-layers{ flex-wrap:wrap; }
    .metamers-sketch, .metamers-chart, .metamers-diagram{ height:26vh; }
  }
</style>`;

/* Real data: mean human proportion correct (N = 20) for AlexNet metamers in Feather et al. 2023, Experiment 4, with s.e.m. across people.
   Computed from the public files VisionBehavioralExperiments/EXP4_ANALYSIS/VisionExperiment4_network_vs_humans_datamatrix_alexnet*_public.mat
   (participant_data_matrix[:, :, 0]). The same values are plotted in the paper, Fig. 4c. */
const mmStages = ['image', 'relu0', 'relu1', 'relu2', 'relu3', 'relu4', 'fc0', 'fc1', 'final'];
const mmHuman = {
  standard: { m: [.91, .91, .73, .40, .29, .22, .10, .07, .06], e: [.027, .026, .031, .045, .037, .026, .013, .016, .016] },
  robust:   { m: [.91, .91, .88, .86, .86, .82, .63, .48, .43], e: [.027, .034, .024, .024, .023, .037, .041, .043, .046] },
  random:   { m: [.91, .90, .80, .42, .32, .18, .10, .03, .11], e: [.027, .027, .032, .039, .038, .033, .019, .014, .021] },
};
/* steps: which click brings each line in. mark: index of a stage to box (or -1). */
const mmChart = (steps, mark = -1, markStep = 0) => {
  const x0 = 96, x1 = 760, y0 = 330, y1 = 30, sx = i => x0 + i * (x1 - x0) / 8, sy = v => y0 - (y0 - y1) * v;
  const axis = `<path d="M${x0 - 20} ${y1 - 8} V${y0} H${x1 + 20}" fill="none" stroke="var(--ink)" stroke-width="2.5"/>`
    + [0, .5, 1].map(v => `<text x="${x0 - 30}" y="${sy(v) + 7}" text-anchor="end" font-size="20">${v === .5 ? '0.5' : v}</text>`).join('')
    + mmStages.map((s, i) => `<text x="${sx(i)}" y="${y0 + 30}" text-anchor="middle" font-size="18">${s}</text>`).join('')
    + `<path d="M${x0} ${sy(1 / 16)} H${x1}" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 6"/><text x="${x0 + 4}" y="${sy(1 / 16) - 8}" font-size="18" fill="#64748b">chance</text>`
    + `<text x="${(x0 + x1) / 2}" y="${y0 + 62}" text-anchor="middle" font-size="19">Layer used to make the metamer (early → late)</text>`
    + `<text transform="translate(26 ${(y0 + y1) / 2}) rotate(-90)" text-anchor="middle" font-size="19">People correct</text>`;
  const style = { standard: 'stroke="var(--ink)" stroke-width="3.5"', robust: 'stroke="var(--ink)" stroke-width="7"', random: 'stroke="#64748b" stroke-width="3.5" stroke-dasharray="10 7"' };
  const name = { standard: 'Standard', robust: 'Robust', random: 'Random noise' };
  const dy = { standard: 22, robust: 6, random: -8 };
  const line = k => { const d = mmHuman[k];
    const pts = d.m.map((v, i) => `${i ? 'L' : 'M'}${sx(i)} ${sy(v)}`).join(' ');
    const bars = d.m.map((v, i) => `<path d="M${sx(i)} ${sy(v - d.e[i])} V${sy(v + d.e[i])}" stroke="var(--ink)" stroke-width="2"/>`).join('');
    return `<g class="b" data-step="${steps[k]}"><path d="${pts}" fill="none" ${style[k]} stroke-linejoin="round"/>${bars}<text x="${x1 + 26}" y="${sy(d.m[8]) + dy[k]}" font-size="20" font-weight="700">${name[k]}</text></g>`; };
  const box = mark < 0 ? '' : `<rect class="b" data-step="${markStep}" x="${sx(mark) - 26}" y="${y1 - 6}" width="52" height="${y0 - y1 + 12}" fill="none" stroke="var(--ink)" stroke-width="3" stroke-dasharray="8 6" rx="10"/>`;
  return `<svg class="metamers-chart" viewBox="0 0 940 410" role="img" aria-label="Line chart of real data from Feather et al. 2023. How often people recognized AlexNet metamers, by layer. Standard training falls from 0.91 to 0.06. Robust training falls only to 0.43. The random-noise control falls like standard training.">
    ${axis}${Object.keys(steps).map(line).join('')}${box}</svg>`; };

/* Diagram, not data: what a sparse autoencoder does with the numbers at one layer. */
const mmSae = () => {
  const col = (x, n, fills, w = 34, h = 26, gap = 8) => Array.from({ length: n }, (_, i) => `<rect x="${x}" y="${40 + i * (h + gap)}" width="${w}" height="${h}" rx="4" fill="${fills[i]}" stroke="var(--ink)" stroke-width="2"/>`).join('');
  const act = ['#334155', '#94a3b8', '#cbd5e1', '#475569', '#e2e8f0', '#64748b', '#94a3b8'];
  const feats = Array.from({ length: 14 }, (_, i) => [2, 7, 11].includes(i) ? 'var(--ink)' : '#fff');
  const feat = feats.map((f, i) => `<circle cx="${330 + (i % 7) * 46}" cy="${100 + Math.floor(i / 7) * 70}" r="17" fill="${f}" stroke="var(--ink)" stroke-width="2"/>`).join('');
  return `<svg class="metamers-diagram" viewBox="0 0 900 330" role="img" aria-label="Diagram, not data. The numbers at one layer go into a sparse autoencoder, which explains them with a few features out of many, and then rebuilds the numbers.">
    ${col(80, 7, act)}<text x="97" y="300" text-anchor="middle" font-size="19">Numbers at</text><text x="97" y="322" text-anchor="middle" font-size="19">one layer</text>
    <path d="M140 140 H270" stroke="var(--ink)" stroke-width="3" marker-end="url(#mm-arr)"/>
    ${feat}<text x="468" y="236" text-anchor="middle" font-size="19">Many features.</text><text x="468" y="260" text-anchor="middle" font-size="19">Only a few are on.</text>
    <path d="M660 140 H770" stroke="var(--ink)" stroke-width="3" marker-end="url(#mm-arr)"/>
    ${col(790, 7, act)}<text x="807" y="300" text-anchor="middle" font-size="19">Rebuilt</text><text x="807" y="322" text-anchor="middle" font-size="19">numbers</text>
    <defs><marker id="mm-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10Z" fill="var(--ink)"/></marker></defs></svg>`; };

/* Hand-drawn panels: wobbled lines, no numbers on the axes, because these are drawings and not data. */
let mmSeed = 0;
const mmWobble = () => { const id = 'mm-wob-' + (++mmSeed); return { id, def: `<defs><filter id="${id}"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="${mmSeed + 21}"/><feDisplacementMap in="SourceGraphic" scale="4"/></filter></defs>` }; };
const mmStamp = (x, y) => `<text class="metamers-stamp" x="${x}" y="${y}" text-anchor="end">hand drawn</text>`;
const mmBarNames = ['Pixels', 'PCA', 'SAE', 'Models'];
const mmBars = (hs, name, alt) => { const w = mmWobble(); const base = 200;
  const bar = (x, h, fill) => `<rect x="${x}" y="${base - h}" width="46" height="${h}" fill="${fill}" stroke="var(--ink)" stroke-width="2.5"/><path d="M${x + 23} ${base - h - 14} V${base - h + 14} M${x + 15} ${base - h - 14} H${x + 31} M${x + 15} ${base - h + 14} H${x + 31}" stroke="var(--ink)" stroke-width="2.5" fill="none"/>`;
  const fills = ['#f1f5f9', '#cbd5e1', '#64748b', '#e2e8f0'];
  return `<svg class="metamers-sketch" viewBox="0 0 330 262" role="img" aria-label="${alt}">${w.def}<g filter="url(#${w.id})">
    <path d="M58 22 V200 H318" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/>${hs.map((h, i) => bar(76 + i * 60, h, fills[i])).join('')}</g>
    ${mmBarNames.map((t, i) => `<text x="${99 + i * 60}" y="224" text-anchor="middle" font-size="16">${t}</text>`).join('')}
    <text x="188" y="256" text-anchor="middle" font-size="21" font-weight="700">${name}</text>
    <text transform="translate(34 112) rotate(-90)" text-anchor="middle" font-size="16">Match with people</text>${mmStamp(326, 18)}</svg>`; };
const mmDots = [[84,52],[96,62],[108,48],[118,70],[134,66],[146,84],[158,78],[170,98],[182,92],[196,112],[206,104],[220,126],[232,120],[244,140],[258,136],[268,154],[282,150],[294,168],[306,162],[318,178]];
const mmScatter = () => { const w = mmWobble();
  return `<svg class="metamers-sketch" viewBox="0 0 350 262" role="img" aria-label="A hand-drawn scatter of dots falling from top left to bottom right: conditions with a larger autoencoder error are drawn as harder for people. This is a drawing, not data.">${w.def}<g filter="url(#${w.id})">
    <path d="M58 22 V200 H334" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/>${mmDots.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#94a3b8" stroke="var(--ink)" stroke-width="2"/>`).join('')}</g>
    <text x="196" y="226" text-anchor="middle" font-size="17">SAE error →</text>
    <text transform="translate(34 112) rotate(-90)" text-anchor="middle" font-size="17">People correct →</text>${mmStamp(346, 18)}</svg>`; };
const mmPencil = '<svg class="metamers-pencil" viewBox="0 0 48 48" aria-hidden="true"><path d="M8 40 12 28 34 6 42 14 20 36Z" fill="#fff" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/><path d="M8 40 12 28 20 36Z" fill="var(--ink)"/><path d="M30 10 38 18" stroke="var(--ink)" stroke-width="3"/></svg>';
const mmDrawn = step => mmLine(`${mmPencil}<span>Hand drawn. Not real results. An example of what to report.</span>`, step, 'metamers-banner');
const mmFeather = 'Feather et al., 2023, Nature Neuroscience';

/* 1. Transition title, like the other project deep dives. */
st(`${mmStyle}
  <div class="center" style="margin:auto">
    <h1 class="t">Project: Why Do Metamers Look Wrong?</h1>
    <div class="statement b" data-step="1" style="margin-top:3vh">Which features make a model blind to what we see?</div>
  </div>
`, mmN('Now a project about model metamers.',
  'The general idea: a model can treat two images as the same, when people see them as very different. Which parts of the model cause this?'));

/* 1b. The idea as the team sent it, in our own words (no names, no quotes from the form: public repo). Checked against the submission on the private review page. */
st(`
  <h1 class="t">Your Idea, in Our Words</h1>
  <div class="metamers-col" style="flex:1 1 auto">
    ${mmLine('1. Make metamers from a small network.', 1)}
    ${mmLine('2. Find the features where photo and metamer differ. Use an SAE.', 2)}
    ${mmLine('3. Remove those features. Make the metamers again.', 3)}
    ${mmLine('4. Can people recognize them now?', 4)}
    ${mmLine('Did we get it right?', 5, 'question')}
  </div>
`, mmN('Before we start, here is your idea, as we understood it. Please stop us if we got it wrong.',
  'You want to take a small pretrained network, about the size of AlexNet, and make metamers from several layers.',
  'Then you want to find where a photo and its metamer differ inside the network, and split that difference into features with a sparse autoencoder, an SAE.',
  'Then you want to remove or edit those features, and make the metamers again.',
  'Finally, you want to test if people, or a model that stands in for people, can now recognize them. The question: which features make the model ignore changes that we see, and does removing them fix the metamers?',
  'Is this right? You also sent a second idea, about IPCL. We come back to it at the end.'));

st(`
  <h1 class="t">What You Asked Us</h1>
  <div class="metamers-col" style="flex:1 1 auto">
    ${mmLine('How do we measure recognition without a big study with people?', 1, 'question')}
    ${mmLine('Are SAE features stable? Do they really cause anything?', 2, 'question')}
    ${mmLine('What fits in two weeks? What comes first?', 3, 'question')}
    ${mmLine('Today we answer these three.', 4, 'lead')}
  </div>
`, mmN('You also asked us some questions. These are the three main ones.',
  'First: how can you measure if people recognize the metamers, without running a big study?',
  'Second: how can you check that SAE features are stable from one training run to the next, and that they really matter?',
  'Third: what is a realistic plan for two weeks, and which step should come first?',
  'The rest of this talk answers these three questions.'));

/* 2. What a metamer is. */
st(`
  <h1 class="t">Same for the Model</h1>
  <div class="metamers-stack">${mmFig('bears-standard.jpg', 'Feather et al. 2023, Figure 4d, top row: a photo of a bear, then metamers made from each layer of a standard ResNet50, from early to late. Early metamers look like the bear. Late metamers look like colored noise.', 1, 'One photo. Metamers from early to late layers.', 34)}</div>
  ${mmSay('Inside the model: the same numbers.', 2)}
  ${mmLine('For us: noise.', 3, 'lead metamers-say')}
  ${rdCite(mmFeather + ', Fig. 4d · CC BY 4.0')}
`, mmN('First, what is a model metamer?',
  'On the left is a real photo. Each other image was made from noise. It was changed, step by step, until one layer of the network gives the same numbers as for the photo. That image is a metamer for that layer.',
  'So for that layer, the photo and the metamer are the same. The model cannot tell them apart.',
  'Look at the late layers. For us, these are noise, not a bear. So the model ignores changes that we see clearly.'));

/* 3. How people were tested. */
st(`
  <h1 class="t">People Were Tested</h1>
  <div class="metamers-row">${mmFig('task.png', 'Feather et al. 2023, Figure 2b: a fixation cross, an image for 300 milliseconds, a noise mask, then a grid of 16 category icons to choose from.', 1, 'Look for 300 ms. Choose 1 of 16.', 46)}</div>
  ${mmSay('About 20 people per experiment.', 2)}
  ${rdCite(mmFeather + ', Fig. 2b · CC BY 4.0', 1)}
`, mmN('How do we know people cannot recognize them? Because people were tested.',
  'Each image is shown for 300 milliseconds, then a noise mask. Then you choose one of 16 categories, like bear, dog or car.',
  'Each experiment had about 20 people, and 400 photos were used to make the metamers. This matters: the data from people already exists.'));

/* 4. Training changes metamers. */
st(`
  <h1 class="t">Training Changes Metamers</h1>
  <div class="metamers-stack">
    ${mmFig('bears-standard.jpg', 'Feather et al. 2023, Figure 4d, standard training: late metamers look like noise.', 1, 'Standard training.', 25)}
    ${mmFig('bears-robust.jpg', 'Feather et al. 2023, Figure 4d, adversarial training: late metamers still show a bear.', 2, 'Robust (adversarial) training.', 22)}
  </div>
  ${mmSay('Same network. Different training.', 3)}
  ${rdCite(mmFeather + ', Fig. 4d · CC BY 4.0')}
`, mmN('Now a surprise.',
  'Here again are the metamers of a standard network.',
  'This is the same network, trained to resist small attacks on the image. This is called adversarial training. Its late metamers still look like a bear.',
  'Only the training changed. So something inside the network changed too. What is it? That is the open question.'));

/* 5. Real data: people and the three AlexNet models. */
st(`
  <h1 class="t">People Agree</h1>
  <div class="metamers-row"><div class="b" data-step="1">${mmChart({ standard: 1, robust: 2, random: 3 })}</div></div>
  ${mmLine('AlexNet. Real data, 20 people.', 1, 'label metamers-say')}
  ${mmSay('Robust training helps. Why?', 4)}
  ${rdCite('Plotted by us from the public data of ' + mmFeather + ', Experiment 4 (also Fig. 4c)')}
`, mmN('This chart is real data. It is how often people recognized each metamer.',
  'A standard AlexNet. Early metamers: people are right 91 percent of the time, like real photos. At the last layer: 6 percent, which is chance.',
  'The robust AlexNet. It falls much less. At the last layer, people are still right 43 percent of the time.',
  'A control: the same network trained with random noise, not attacks. It looks like the standard network. So it is the attacks that help, not any noise.',
  'Why does robust training help? This is the question of the team.'));

/* 6. The idea: a sparse autoencoder. */
st(`
  <h1 class="t">The Idea: Look Inside</h1>
  <div class="metamers-row"><div class="b" data-step="1">${mmSae()}</div></div>
  ${mmLine('Diagram, not data.', 1, 'label metamers-say')}
  ${mmSay('Which features differ?', 2)}
  ${mmLine('Remove them. Can people see the object now?', 3, 'lead metamers-say')}
`, mmN('Here is the idea of the team. Open the model and look.',
  'The tool is a sparse autoencoder, an SAE. It takes the numbers at one layer and explains them with many features, but only a few are on at a time. Then it rebuilds the numbers. The hope is that each feature is easier to understand than one neuron.',
  'Run the photo and its metamer through the SAE. Which features are different?',
  'Then remove those features, make the metamers again, and ask: are they easier to recognize now? This is a great question. It is also a long one.'));

/* 7. Why we suggest the smaller scope. */
st(`
  <h1 class="t">Why a Smaller Project?</h1>
  <div class="metamers-col" style="flex:1 1 auto">
    <div class="metamers-track b" data-step="1">
      ${['Make metamers', 'Train an SAE', 'Edit features', 'Make them again', 'Test people'].map((t, i) => `${i ? '<div class="metamers-arrow">→</div>' : ''}<div class="metamers-box label">${t}</div>`).join('')}
    </div>
    ${mmSay('Five hard steps. Two weeks.', 2)}
    ${mmLine('Start with images people already saw.', 3, 'lead metamers-say')}
  </div>
`, mmN('So why do we suggest something smaller?',
  'Here is the full plan. Each metamer takes many thousands of optimization steps. The SAE must be trained and checked. The edit, the new metamers and a test with people all come after.',
  'Each step can fail. If the first one is late, nothing else happens.',
  'But the metamers that people already saw are public. So are their answers. We can start there, with no new metamers and no new people. The editing can come later, if the first result is promising.'));

/* 8. The first trap: the matched layer shows no difference. */
st(`
  <h1 class="t">Look Below the Matched Layer</h1>
  <div class="metamers-col" style="flex:1 1 auto">
    <div class="metamers-layers">
      ${[['layer 1', ''], ['layer 2', ''], ['layer 3', 'probe'], ['layer 4', 'matched']].map(([t, c]) => `<div class="metamers-layer ${c}">
        <div class="metamers-tag label">${c === 'matched' ? `<span class="b" data-step="1">Matched: same by design</span>` : c === 'probe' ? `<span class="b" data-step="2">Can differ here</span>` : ''}</div>
        <div class="blk label b" data-step="1">${t}</div></div>`).join('')}
    </div>
    ${mmSay('At the matched layer, there is nothing to find.', 3)}
  </div>
`, mmN('A first trap, about where to look.',
  'A layer 4 metamer was made so that layer 4 gives the same numbers as the photo. That is how it was made.',
  'So the SAE must look at an earlier layer, like layer 3. There, the photo and the metamer can still be different.',
  'An SAE at the matched layer would find almost no difference, only optimization error. This is easy to miss.'));

/* 9. What we suggest: one comparison. */
st(`
  <h1 class="t">What We Suggest</h1>
  <div class="metamers-col" style="flex:1 1 auto">
    ${[['SAE error', 1], ['PCA error', 2]].map(([t, s]) => `<div class="metamers-track b" data-step="${s}">
      <div class="metamers-box label">Public metamers</div><div class="metamers-arrow">→</div>
      <div class="metamers-box label">Another network, layer 3</div><div class="metamers-arrow">→</div>
      <div class="metamers-box label key">${t}</div><div class="metamers-arrow">→</div>
      <div class="metamers-box label same">Compare with people</div></div>`).join('')}
    ${mmSay('Same images. Same people. Only the score changes.', 3)}
    ${mmLine('No new metamers. No new people.', 4, 'lead metamers-say')}
  </div>
  ${rdCite('Data: ' + mmFeather + ', public stimuli and human data', 1)}
`, mmN('Here is what we suggest. It is one comparison.',
  'Take the public metamers. Pass each one, and its original photo, through another network, not the one that made them. Train an SAE on natural images at layer 3. Measure how badly it explains the metamer, compared with its photo. Then ask: does this error predict how often people recognized it?',
  'Do the same with PCA, a simple linear method, at the same quality on natural images.',
  'Only the score changes. So if the SAE wins, it is because of the sparse features.',
  'Nothing is generated and nobody new is tested. This answers a question the team asked us: how to measure recognition without a big human study.'));

/* 10. Trap: any push toward natural images helps. */
st(`
  <h1 class="t">Trap: Smoother Looks Better</h1>
  <div class="metamers-row">
    ${mmFig('bears-smooth.jpg', 'Feather et al. 2023, Figure 4f: AlexNet metamers from three layers. Top row: robust training. Middle row: standard training with a smoothness push. Bottom row: standard training with no push, which looks like noise.', 1, 'Top: robust. Middle: standard, made smoother. Bottom: standard.', 46)}
  </div>
  ${mmSay('Any push toward natural images helps.', 2)}
  ${mmLine('So the SAE must beat simple scores.', 3, 'lead metamers-say')}
  ${rdCite(mmFeather + ', Fig. 4f · CC BY 4.0')}
`, mmN('A second trap. It is a big one.',
  'The middle row is a standard network. The only change: the metamers were pushed to be smooth. People recognized these more often than the plain ones, though still less often than robust ones.',
  'So almost anything that pulls an image toward natural images will help. Removing SAE features could help for this boring reason too.',
  'That is why the SAE must beat simple scores: PCA, and a distance in pixels. If it does not, the SAE is not telling us anything new.'));

/* 11. Trap: a strong baseline already exists. */
st(`
  <h1 class="t">Trap: Other Models Already Predict People</h1>
  <div class="metamers-row">
    ${mmFig('other-models.png', 'Feather et al. 2023, Figure 8e: a scatter plot. Across: how often people recognized the metamers of one model layer. Up: how often other models recognized them. The dots rise together. Spearman rho is 0.94.', 1, 'One dot = one model layer. 219 in all.', 46)}
    <div class="metamers-col">
      ${mmLine('Across: people.', 1)}
      ${mmLine('Up: other models.', 1)}
    </div>
  </div>
  ${mmSay('Your score must beat this too.', 2)}
  ${rdCite(mmFeather + ', Fig. 8e · CC BY 4.0')}
`, mmN('A third trap: there is already a strong way to predict people.',
  'This is real data from the paper. Each dot is the metamers of one model layer. Across is how often people recognized them. Up is how often other models recognized them. The dots rise together very closely.',
  'So the SAE score should be compared with this too. The trained models are released with the paper, so this test is cheap to add.'));

/* 12. Trap: depth. */
st(`
  <h1 class="t">Trap: Deeper Is Harder</h1>
  <div class="metamers-row"><div class="b" data-step="1">${mmChart({ standard: 1, robust: 1, random: 1 }, 3, 2)}</div></div>
  ${mmSay('Compare at the same layer.', 2)}
  ${mmLine('At relu2: robust 0.86, random noise 0.42.', 3, 'lead metamers-say')}
  ${rdCite('Plotted by us from the public data of ' + mmFeather + ', Experiment 4')}
`, mmN('The last trap.',
  'All three lines fall as the layer gets deeper. Almost any score also changes with depth. So a score can look like it predicts people, when it only knows how deep the layer is.',
  'So compare models at the same layer.',
  'Here is the best place. At relu2, people recognized the robust metamers 86 percent of the time, and the random-noise control only 42 percent. Same layer, very different for people. Does the SAE score see this difference?'));

/* 13. Examples of what to report: drawings only. */
st(`
  <h1 class="t">Examples of What to Report</h1>
  ${mmDrawn(1)}
  <div class="metamers-row">
    <div class="b" data-step="1">${mmBars([70, 110, 160, 130], 'SAE best', 'A hand-drawn bar sketch where the SAE score matches people best. This is a drawing, not data.')}</div>
    <div class="b" data-step="2">${mmBars([70, 128, 132, 130], 'A tie', 'A hand-drawn bar sketch where SAE, PCA and other models match people equally. This is a drawing, not data.')}</div>
    <div class="b" data-step="3">${mmBars([60, 100, 108, 160], 'Models best', 'A hand-drawn bar sketch where other models match people best and the SAE adds nothing. This is a drawing, not data.')}</div>
  </div>
  ${mmSay('All three are good results.', 4)}
`, mmN('These are drawings. No experiment has been run. They show what the final figure could look like. Each bar is how well one score matches people, with an error bar.',
  'One result: the SAE matches people best. Then sparse features notice something that PCA and other models miss. That is the case for editing features later.',
  'A tie. Then the sparse features add nothing we can detect. With few conditions, the error bars will be wide, so say not detected, not zero.',
  'Other models win. Then what people see is better predicted by other networks. Also useful: it says the SAE edit may not be worth the effort.',
  'All three are good results, if the test is fair.'));

/* 14. One dot per condition: a drawing. */
st(`
  <h1 class="t">Example: One Dot Is One Condition</h1>
  ${mmDrawn(1)}
  <div class="metamers-row"><div class="b" data-step="1">${mmScatter()}</div></div>
  ${mmSay('Does a bigger error mean harder for people?', 2)}
  ${mmLine('Conditions only, not single images.', 3, 'lead metamers-say')}
`, mmN('Another drawing, not data.',
  'Each dot is one condition: one model and one layer. Across is the SAE error. Up is how often people were right.',
  'If the dots fall, a bigger error goes with harder for people. We drew them falling only as an example. Remember to compare inside each layer.',
  'Be careful with the words. The public data gives the average for each person and condition, not each image. So the claim is about conditions, not about single images.'));

/* 15. The link with IPCL. */
st(`
  <h1 class="t">Later: IPCL Metamers</h1>
  <div class="metamers-row">${mmFig('ipcl-metamers.png', 'Feather et al. 2023, Figure 3d: human recognition of metamers from IPCL and a supervised network of the same architecture. Both fall close to chance at late layers.', 1, 'IPCL and a supervised twin. People fail on both.', 46)}</div>
  ${mmSay('These metamers are public too.', 2)}
  ${mmLine('A free second test, after the first one works.', 3, 'lead metamers-say')}
  ${rdCite(mmFeather + ', Fig. 3d · CC BY 4.0')}
`, mmN('The team also cares about IPCL, a model trained with no labels.',
  'The same paper tested IPCL metamers. The orange line is IPCL. The black line is a supervised network with the same architecture. Late metamers are near chance for both.',
  'These metamers and the answers of people are public too.',
  'So once the first test works, run the same analysis on them. No training needed. This also connects with the other idea of the team, about IPCL and category pressure.'));

/* 16. Start small. */
st(`
  <h1 class="t">Start Small</h1>
  <div class="metamers-col" style="flex:1 1 auto">
    ${mmLine('1. Download one experiment and the human data.', 1)}
    ${mmLine('2. PCA score first. One layer.', 2)}
    ${mmLine('3. Then the SAE, with two seeds.', 3)}
    ${mmLine('4. Then compare with people.', 4)}
  </div>
`, mmN('Two weeks is short. So start with the smallest version that works from start to end.',
  'Start with one experiment, for example the AlexNet one. Download the metamers and the human data on the first day. Write down the analysis before you look at the human data.',
  'PCA is fast. Build the whole pipeline with PCA first.',
  'Then train the SAE. SAEs can change a lot between training runs, so train at least two, and check if they find the same features.',
  'Only then compare with people, at the same layer, against the simple scores. One clean number by the end of the week is a good target.'));

/* 17. Questions for the team. */
st(`
  <h1 class="t">Questions for the Team</h1>
  <div class="metamers-col" style="flex:1 1 auto">
    ${mmLine('Which network, layer and score? Choose before you see people.', 1, 'question')}
    ${mmLine('Is a result without editing okay with you?', 2, 'question')}
    ${mmLine('Who does which part?', 3, 'question')}
    ${mmLine('What do you expect?', 4, 'question')}
  </div>
`, mmN('These are real questions. We want to hear from you.',
  'If you try many layers and scores and keep the best one, you can fool yourself. Choose first, and write it down.',
  'This version does not edit features. It asks whether the SAE sees something first. If you want to keep the editing in the main plan, tell us how you will handle the smoothness trap.',
  'The natural parts are the data and human analysis, and the SAE and PCA.',
  'Before you run anything, write down what you expect. Then see if you were right.'));
}

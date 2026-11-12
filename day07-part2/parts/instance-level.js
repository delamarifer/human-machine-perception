/* PART: instance-level (Day 7 part 2). Owner: Fernanda. Deep dive of one project: do people and an instance-level model find the same images hard? (Fernanda's request, 2026-11-10.)
   Public repo: project topic only, never student names or faces. Short plain sentences: many students are not fluent in English.
   Figures and licences: assets/instance-level/SOURCES.md. Expected results are drawings only. */
{
section('Same Object');

const ilA = 'assets/instance-level/';
const ilN = (...p) => ({ notes: p.map(x => '(draft) ' + x).join('[click]') });
const ilFig = (src, alt, step, cap, h = 54) => `<figure class="instance-level-fig b" data-step="${step}"><img src="${ilA}${src}" alt="${alt}" style="max-height:${h}vh">${cap ? `<figcaption class="label">${cap}</figcaption>` : ''}</figure>`;
const ilLine = (t, step, cls = 'lead') => `<div class="${cls} b" data-step="${step}">${t}</div>`;
const ilSay = (t, step) => ilLine(t, step, 'statement instance-level-say');
const ilStyle = `<style>
  .instance-level-row{ flex:1 1 auto; min-height:0; display:flex; justify-content:center; align-items:center; gap:3vw; }
  .instance-level-col{ display:flex; flex-direction:column; justify-content:center; gap:2.4vh; min-width:0; }
  .instance-level-fig{ margin:0; display:flex; flex-direction:column; align-items:center; gap:1vh; min-width:0; }
  .instance-level-fig img{ display:block; max-width:100%; object-fit:contain; }
  .instance-level-fig figcaption{ text-align:center; }
  .instance-level-say{ text-align:center; }
  .instance-level-trial{ position:relative; }
  .instance-level-ring{ position:absolute; inset:-1.2vh -.6vw; border:4px dashed var(--ink); border-radius:14px; pointer-events:none; }
  .instance-level-track{ display:flex; align-items:center; justify-content:center; gap:1vw; }
  .instance-level-box{ border:2px solid var(--ink); border-radius:10px; padding:1.4vh .6vw; width:19vw; box-sizing:border-box; text-align:center; background:#fff; }
  .instance-level-box.same{ background:#f1f5f9; }
  .instance-level-arrow{ font-size:clamp(1.4rem, 2.2vw, 2rem); color:var(--mute); }
  .instance-level-banner{ align-self:center; display:flex; align-items:center; gap:.8vw; border:3px dashed var(--ink); border-radius:12px; padding:.8vh 1.6vw; font-size:clamp(1.15rem, 2vw, 2rem); font-weight:800; }
  .instance-level-pencil{ width:clamp(30px, 5vh, 54px); height:clamp(30px, 5vh, 54px); flex:none; transform-origin:20% 85%; }
  .b.shown > .instance-level-pencil{ animation:instance-level-scribble .45s ease-in-out 3; }
  .b.shown > .instance-level-sketch{ animation:instance-level-draw 1.2s ease-out; }
  @keyframes instance-level-draw{ from{ clip-path:inset(0 100% 0 0); } to{ clip-path:inset(0 0 0 0); } }
  @keyframes instance-level-scribble{ 0%,100%{ transform:rotate(0) translate(0,0); } 30%{ transform:rotate(-12deg) translate(5px,-3px); } 70%{ transform:rotate(9deg) translate(-4px,3px); } }
  @media (prefers-reduced-motion: reduce){ .b.shown > .instance-level-sketch, .b.shown > .instance-level-pencil{ animation:none; } }
  .instance-level-sketch{ display:block; height:42vh; max-width:100%; }
  .instance-level-sketch text{ font-family:inherit; fill:var(--ink); }
  .instance-level-sketch text.instance-level-stamp{ font-family:'Bradley Hand','Segoe Print','Comic Sans MS',cursive; font-size:21px; font-weight:700; }
  .instance-level-chart{ display:block; height:44vh; max-width:100%; }
  .instance-level-chart text{ font-family:inherit; fill:var(--ink); }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){
    .instance-level-row{ flex-direction:column; gap:1.2vh; }
    .instance-level-track{ flex-wrap:wrap; }
    .instance-level-sketch, .instance-level-chart{ height:26vh; }
  }
</style>`;

/* Real data: mean accuracy of people in each of the 25 MOCHI conditions, computed from mochi_code/assets/benchmark.csv, and chance (1 over the number of images in a trial). */
const ilConds = [[99.3,25],[96.4,33.3],[95.3,33.3],[94.4,33.3],[93.6,33.3],[92.1,33.3],[92.1,33.3],[87.8,33.3],[85.2,25],[84,33.3],[80.4,33.3],[80.1,33.3],[80,33.3],[79.1,33.3],[78.5,33.3],[75.5,33.3],[75.4,33.3],[75.2,33.3],[74.6,33.3],[69.5,33.3],[68.7,33.3],[67.2,33.3],[61.2,25],[40,25],[38.6,33.3]];
const ilCondChart = () => { const x0 = 74, y0 = 300, h = 270, w = 26, gap = 6, y = v => y0 - h * v / 100;
  const bars = ilConds.map(([a, c], i) => { const x = x0 + 12 + i * (w + gap); return `<rect x="${x}" y="${y(a)}" width="${w}" height="${y0 - y(a)}" fill="#94a3b8"/><path d="M${x - 2} ${y(c)} H${x + w + 2}" stroke="var(--ink)" stroke-width="3"/>`; }).join('');
  const ticks = [0, 50, 100].map(v => `<text x="${x0 - 10}" y="${y(v) + 7}" text-anchor="end" font-size="20">${v}%</text>`).join('');
  return `<svg class="instance-level-chart" viewBox="0 0 900 350" role="img" aria-label="Bar chart of real data. Mean accuracy of people in the 25 conditions, sorted from 99 percent down to 39 percent, with chance marked on each bar.">
    <path d="M${x0} 22 V${y0} H${x0 + 12 + 25 * (w + gap)}" fill="none" stroke="var(--ink)" stroke-width="2.5"/>${ticks}${bars}
    <text x="${x0 + 14}" y="334" font-size="21">Easiest: 99%</text><text x="${x0 + 8 + 25 * (w + gap)}" y="334" text-anchor="end" font-size="21">Hardest: 39%</text>
    <text x="470" y="334" text-anchor="middle" font-size="21">Black line = chance</text></svg>`; };

/* Hand-drawn panels: wobbled lines, no numbers on the axes, because these are drawings and not data. */
let ilSeed = 0;
const ilWobble = () => { const id = 'il-wob-' + (++ilSeed); return { id, def: `<defs><filter id="${id}"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="${ilSeed + 11}"/><feDisplacementMap in="SourceGraphic" scale="4"/></filter></defs>` }; };
const ilStamp = (x, y) => `<text class="instance-level-stamp" x="${x}" y="${y}" text-anchor="end">hand drawn</text>`;
const ilBars = (h1, h2, name, alt) => { const w = ilWobble(); const base = 200; const bar = (x, h, fill) => `<rect x="${x}" y="${base - h}" width="62" height="${h}" fill="${fill}" stroke="var(--ink)" stroke-width="2.5"/><path d="M${x + 31} ${base - h - 16} V${base - h + 16} M${x + 21} ${base - h - 16} H${x + 41} M${x + 21} ${base - h + 16} H${x + 41}" stroke="var(--ink)" stroke-width="2.5" fill="none"/>`;
  return `<svg class="instance-level-sketch" viewBox="0 0 300 262" role="img" aria-label="${alt}">${w.def}<g filter="url(#${w.id})">
    <path d="M58 22 V200 H282" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/>${bar(92, h1, '#e2e8f0')}${bar(186, h2, '#94a3b8')}</g>
    <text x="123" y="226" text-anchor="middle" font-size="19">IPCL</text><text x="217" y="226" text-anchor="middle" font-size="19">Supervised</text>
    <text x="170" y="256" text-anchor="middle" font-size="21" font-weight="700">${name}</text>
    <text transform="translate(34 112) rotate(-90)" text-anchor="middle" font-size="16">Match with people</text>${ilStamp(296, 18)}</svg>`; };
const ilDots = [[84,172],[102,180],[112,150],[128,160],[140,132],[152,148],[166,120],[174,136],[190,112],[198,96],[212,118],[226,88],[238,102],[252,74],[264,84],[276,58],[288,70],[300,48]];
const ilScatter = () => { const w = ilWobble();
  return `<svg class="instance-level-sketch" viewBox="0 0 340 262" role="img" aria-label="A hand-drawn scatter of dots rising from bottom left to top right: trials that are easy for people are drawn as easy for the model. This is a drawing, not data.">${w.def}<g filter="url(#${w.id})">
    <path d="M58 22 V200 H322" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/>${ilDots.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#94a3b8" stroke="var(--ink)" stroke-width="2"/>`).join('')}</g>
    <text x="190" y="226" text-anchor="middle" font-size="17">Easy for people →</text>
    <text transform="translate(34 112) rotate(-90)" text-anchor="middle" font-size="17">Easy for the model →</text>${ilStamp(336, 18)}</svg>`; };
const ilPencil = '<svg class="instance-level-pencil" viewBox="0 0 48 48" aria-hidden="true"><path d="M8 40 12 28 34 6 42 14 20 36Z" fill="#fff" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/><path d="M8 40 12 28 20 36Z" fill="var(--ink)"/><path d="M30 10 38 18" stroke="var(--ink)" stroke-width="3"/></svg>';
const ilDrawn = step => ilLine(`${ilPencil}<span>Hand drawn. Not real results. An example of what to report.</span>`, step, 'instance-level-banner');

/* Transition title, like the other project deep dives. */
st(`${ilStyle}
  <div class="center" style="margin:auto">
    <h1 class="t">Project: Same object, new view</h1>
    <div class="statement b" data-step="1" style="margin-top:3vh">Do people and models find the same images hard?</div>
  </div>
`, ilN('Now another project.', 'The general idea: when an object is seen from a new view, do people and a model find the same images hard?'));

st(`
  <h1 class="t">Which One Is Different?</h1>
  <div class="instance-level-row">
    ${ilFig('trial-1.png', 'A gray abstract 3D shape, one of three images in a MOCHI trial.', 1, '', 40)}
    ${ilFig('trial-2.png', 'A gray abstract 3D shape, the same object as the first image from another view.', 1, '', 40)}
    <div class="instance-level-trial">${ilFig('trial-3.png', 'A gray abstract 3D shape, a different object. This is the odd one out.', 1, '', 40)}<div class="instance-level-ring b" data-step="2"></div></div>
  </div>
  ${ilSay('Two images show the same object.', 2)}
  ${rdCite('MOCHI: Bonnen et al., 2024 · images CC BY-NC-SA 4.0')}
`, ilN('Let us start with the task. You do it first.',
  'Here are three images. Two show the same object from different views. One shows a different object. Which one is different? Take a moment.',
  'It is this one. Notice what you did. You had never seen these shapes, and you did not need training. A model must do the same thing.'));

st(`
  <h1 class="t">People Already Did This Task</h1>
  <div class="instance-level-row">${ilFig('mochi-four-sets.jpg', 'Bonnen et al. 2024: example trials from four image sets, showing objects, shapes and furniture from different views.', 1, 'Four image sets. Each box is one trial.', 40)}</div>
  ${ilSay('2,019 trials. Over 500 people.', 2)}
  ${ilLine('So you do not need a new study.', 3, 'lead instance-level-say')}
  ${rdCite('Bonnen et al., 2024 (MOCHI), arXiv:2409.05862')}
`, ilN('This task comes from a public benchmark, called MOCHI.',
  'It has many kinds of objects. Each box here is one trial. A small mark shows the odd one.',
  'It has 2,019 trials. More than 500 people did them. On average, about 17 people answered each trial.',
  'This is why we suggest it. The team wanted to compare with people. Here, people have already answered. So you can compare in two weeks.'));

st(`
  <h1 class="t">Training Matters</h1>
  <div class="instance-level-row">
    ${ilFig('views-vs-image.png', 'Bonnen, Malik and Kanazawa 2026: bar chart of accuracy. Humans and the multi-view model VGGT are high and about equal. The image model DINOv2 is much lower.', 1, 'Real data, from the paper.', 44)}
    <div class="instance-level-col">
      ${ilLine('Trained on single images: far below people.', 2)}
      ${ilLine('Trained on many views: like people.', 3)}
    </div>
  </div>
  ${rdCite('Bonnen, Malik and Kanazawa, 2026, arXiv:2602.17650')}
`, ilN('Why is this interesting? Because the training seems to matter.',
  'This chart is real data from a recent paper. The orange bar is people. Zero on this chart means chance.',
  'The gray bar is DINOv2. It looks at one image at a time. It is far below people.',
  'The red bar is a model built to use many views of a scene. It matches people, with no training on this task. So what a model was trained for changes what it can do. That is the question of today: transfer learning.'));

st(`
  <h1 class="t">IPCL: Learn Each Image</h1>
  <div class="instance-level-row">${ilFig('ipcl-method.png', 'Konkle and Alvarez 2022, Figure 1a: one image becomes several crops, the crops go through a network, and their features are pulled toward one point.', 1, 'One image. Many crops. Pull them together.', 40)}</div>
  ${ilSay('No labels.', 2)}
  ${ilSay('Not “a chair”. This chair.', 3)}
  ${rdCite('Konkle and Alvarez, 2022, Nature Communications, Figure 1')}
`, ilN('The team chose a model called IPCL. Here is the idea.',
  'Take one image. Make several crops of it. The network learns to give those crops similar features, and different features from other images.',
  'There are no labels. Nobody tells the model this is a chair.',
  'So the model is pushed to know this exact image, not the category. Our task is about one exact object. That is why this model is a good idea.'));

st(`
  <h1 class="t">IPCL Matches the Brain</h1>
  <div class="instance-level-row">${ilFig('ipcl-brain.png', 'Konkle and Alvarez 2022, Figure 2: a high-level visual area of the brain, the match across network layers, and bars for IPCL, supervised and untrained models.', 1, 'IPCL and supervised models match this brain area equally well.', 40)}</div>
  ${ilSay('But does it choose like people do?', 2)}
  ${rdCite('Konkle and Alvarez, 2022, Figure 2')}
`, ilN('What do we already know about IPCL?',
  'The paper compared the model with brain responses. It matched a high-level visual area about as well as a supervised model did. Both were better than an untrained model.',
  'But brain responses are not choices. We did not find a test of IPCL against the choices people make on this kind of task. Our search was partial, so please repeat it. This is the open part of the project.'));

st(`
  <h1 class="t">Why IPCL Might Fail</h1>
  <div class="instance-level-row" style="flex-direction:column; gap:1.6vh">
    ${ilFig('crops.jpg', 'Purushwalkam and Gupta 2020: one photo of a room and four crops taken from it.', 1, 'Crops: one photo, one view.', 28)}
    ${ilFig('video-views.jpg', 'Purushwalkam and Gupta 2020: five video frames of a cat moving, so the cat is seen from changing views.', 2, 'Video: the view really changes.', 16)}
  </div>
  ${ilSay('Crops never show the other side.', 3)}
  ${rdCite('Purushwalkam and Gupta, 2020, arXiv:2007.13916')}
`, ilN('A good project knows why it could fail.',
  'Models like IPCL learn from crops of one photo. A crop hides part of the object, so these models get good at hidden parts.',
  'In a video, the object turns. The view really changes.',
  'A crop never shows the other side of an object. This paper found that contrastive models were better than supervised models only for hidden parts. Video training gave more viewpoint invariance. Our task is about new views, so IPCL may not help. That would be an interesting result.'));

st(`
  <h1 class="t">What We Suggest</h1>
  <div class="instance-level-col" style="flex:1 1 auto">
    ${[['IPCL', 1], ['Supervised', 2]].map(([t, s]) => `<div class="instance-level-track b" data-step="${s}">
      <div class="instance-level-box label">Same 3 images</div><div class="instance-level-arrow">→</div>
      <div class="instance-level-box label">${t}</div><div class="instance-level-arrow">→</div>
      <div class="instance-level-box label same">Compare the features</div><div class="instance-level-arrow">→</div>
      <div class="instance-level-box label">Which is different?</div></div>`).join('')}
    ${ilSay('Same network. Different training.', 3)}
    ${ilLine('We train nothing. We only test.', 4, 'lead instance-level-say')}
  </div>
  ${rdCite('Models: Konkle and Alvarez, 2022 · task: Bonnen et al., 2024', 2)}
`, ilN('Here is what we suggest. It is one comparison.',
  'Give the three images to IPCL. Take the features from one layer. The image least similar to the other two is the answer of the model.',
  'Do the same with a supervised network that has the same architecture.',
  'Now only one thing changes: what the network was trained for. So a difference has one explanation.',
  'Nothing is trained. This is the strictest form of transfer learning. It also means the project is small: under an hour of Colab, by our estimate.'));

st(`
  <h1 class="t">Why Only New Views?</h1>
  <div class="instance-level-row">
    <table class="d6-tbl b" data-step="1">
      <tr><th>What changes</th><th>Data from people?</th></tr>
      <tr><td class="rowh">New view</td><td>Yes</td></tr>
      <tr><td class="rowh">Lighting</td><td>Not found</td></tr>
      <tr><td class="rowh">Background</td><td>Not found</td></tr>
      <tr><td class="rowh">Context</td><td>Not found</td></tr>
    </table>
  </div>
  ${ilSay('No people, no comparison.', 2)}
  ${ilLine('The others can come later, with models only.', 3, 'lead instance-level-say')}
  ${rdCite('Our own check of the available datasets')}
`, ilN('The team wanted four kinds of change. We suggest starting with one.',
  'We looked for data where people judged the same images under each change. We found it for new views. One MOCHI set has random backgrounds, but background is not controlled there.',
  'Without answers from people, we cannot ask if people and models agree.',
  'The idea is not wrong. It is only too big for two weeks. Lighting and background can be a stretch goal, for models only.'));

st(`
  <h1 class="t">Some Conditions Are Hard for Everyone</h1>
  <div class="instance-level-row"><div class="b" data-step="1">${ilCondChart()}</div></div>
  ${ilLine('People, in 25 conditions. Real data.', 1, 'label instance-level-say')}
  ${ilSay('Hard is hard, for people and for models.', 2)}
  ${ilSay('So compare inside each condition.', 3)}
  ${rdCite('Plotted by us from MOCHI, benchmark.csv')}
`, ilN('Here is a trap. It is easy to fall into.',
  'This is real data. Each bar is one condition, and the height is how often people were right. The easiest is 99 percent. The hardest is 39 percent, close to chance.',
  'If a model does badly on hard conditions too, it will look similar to people. But that only says hard conditions are hard.',
  'So take away the average of each condition first. Then ask: inside one condition, are the same trials hard?'));

st(`
  <h1 class="t">First: Can the Model Do It?</h1>
  <div class="instance-level-row">
    ${ilFig('models-easy.png', 'Bonnen et al. 2024: an easy condition. People and most models are near the top.', 1, 'Easy condition: models can do it.', 44)}
    ${ilFig('models-hard.png', 'Bonnen et al. 2024: a hard condition. People are above chance and the models are close to zero, which is chance.', 2, 'Hard condition: models are at chance.', 44)}
  </div>
  ${ilSay('At chance? Then we cannot compare errors.', 3)}
  ${rdCite('Bonnen et al., 2024, per-condition results · 0 = chance, 1 = perfect')}
`, ilN('A second trap, and a first check.',
  'The colored bar is people. The gray bars are models. Zero means chance. In this condition, models do well.',
  'In this condition, the models are close to chance. These models are newer and larger than IPCL.',
  'If a model is at chance, it cannot do the task. A low match with people then means nothing about its errors. So first show the model is above chance, in each condition.'));

st(`
  <h1 class="t">Examples of What to Report</h1>
  ${ilDrawn(1)}
  <div class="instance-level-row">
    <div class="b" data-step="1">${ilBars(150, 90, 'IPCL closer', 'A hand-drawn bar sketch where IPCL matches people more than the supervised model. This is a drawing, not data.')}</div>
    <div class="b" data-step="2">${ilBars(125, 128, 'A tie', 'A hand-drawn bar sketch where IPCL and the supervised model are equal. This is a drawing, not data.')}</div>
    <div class="b" data-step="3">${ilBars(95, 150, 'Supervised closer', 'A hand-drawn bar sketch where the supervised model matches people more than IPCL. This is a drawing, not data.')}</div>
  </div>
  ${ilSay('All three are good results.', 4)}
`, ilN('These are drawings. No experiment has been run. They show what the final figure should look like. Each bar has an error bar.',
  'One result: IPCL is closer to people. Then learning each image helps.',
  'A tie. Then the training goal did not change which trials are hard. This is quite likely.',
  'Supervised is closer. Then labels help more than learning each image.',
  'All three are good results, if the test is fair. A tie is a finding, not a failure.'));

st(`
  <h1 class="t">Example: One Dot Is One Trial</h1>
  ${ilDrawn(1)}
  <div class="instance-level-row"><div class="b" data-step="1">${ilScatter()}</div></div>
  ${ilSay('Do the dots rise together?', 2)}
  ${ilLine('This shows shared difficulty. It does not show the same errors.', 3, 'lead instance-level-say')}
`, ilN('Another drawing, not data.',
  'Each dot is one trial. Across: how easy the trial is for people. Up: how sure the model is. Remember to take away the condition average first.',
  'If the dots rise together, the model finds the same trials hard as people. We drew them rising only as an example.',
  'Be careful with the words. This compares the model with the average person. So call it shared difficulty. Saying the same errors needs each person’s answers, which is a harder analysis.'));

st(`
  <h1 class="t">Start Small</h1>
  <div class="instance-level-col" style="flex:1 1 auto">
    ${ilLine('1. Load IPCL on the first day.', 1)}
    ${ilLine('2. Plot the people. Use one condition.', 2)}
    ${ilLine('3. Is each model above chance?', 3)}
    ${ilLine('4. Then compare.', 4)}
  </div>
`, ilN('Two weeks is short. So start with the smallest version that works from start to end.',
  'IPCL is older code. Check that it loads in Colab on the first day. If it fails, there are other contrastive models to try.',
  'The people data is a table. You can write the analysis before you have any features.',
  'Run one condition, and do the check. Save the features so you do not compute them again.',
  'Only then do the full comparison. One clean number by the end of the week is a good target.'));

st(`
  <h1 class="t">Questions for the Team</h1>
  <div class="instance-level-col" style="flex:1 1 auto">
    ${ilLine('Which layer? Choose before you see the results.', 1, 'question')}
    ${ilLine('Is new views only okay with you?', 2, 'question')}
    ${ilLine('Who does which part?', 3, 'question')}
    ${ilLine('What do you expect?', 4, 'question')}
  </div>
`, ilN('These are real questions. We want to hear from you.',
  'If you try many layers and keep the best one, you can fool yourself. Choose first, and write it down.',
  'This is smaller than your first idea. If you want to keep lighting in the main plan, tell us where the data from people will come from.',
  'The natural parts are the people data and analysis, and the models and features.',
  'Before you run anything, write down what you expect. Then see if you were right.'));
}

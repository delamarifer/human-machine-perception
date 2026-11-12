/* PART: object-memory (deep dive, its own deck). Owner: Fernanda. Deep dive of one project: an offline phone assistant that shows
   where an everyday object was last seen, or says "not seen". (Second project deep dive, 2026-11-12; template: ../metamers/.)
   Public repo: project topic only, never student names, faces, quotes or marks. Short plain sentences: many students are not fluent in English.
   Figures and licences: assets/object-memory/SOURCES.md. Expected results are drawings only. Our suggestion is always labelled as ours. */
{
section('Object Memory');

const omA = 'assets/object-memory/';
const omN = (...p) => ({ notes: p.map(x => '(draft) ' + x).join('[click]') });
const omFig = (src, alt, step, cap, h = 54) => `<figure class="object-memory-fig b" data-step="${step}"><img src="${omA}${src}" alt="${alt}" style="max-height:${h}vh">${cap ? `<figcaption class="label">${cap}</figcaption>` : ''}</figure>`;
const omLine = (t, step, cls = 'lead') => `<div class="${cls} b" data-step="${step}">${t}</div>`;
const omSay = (t, step) => omLine(t, step, 'statement object-memory-say');
const omBox = (t, cls = '') => `<div class="object-memory-box label ${cls}">${t}</div>`;
const omArrow = '<div class="object-memory-arrow">→</div>';
const omStyle = `<style>
  .object-memory-row{ flex:1 1 auto; min-height:0; display:flex; justify-content:center; align-items:center; gap:3vw; }
  .object-memory-stack{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:1.4vh; }
  .object-memory-col{ display:flex; flex-direction:column; justify-content:center; gap:2.4vh; min-width:0; }
  .object-memory-fig{ margin:0; display:flex; flex-direction:column; align-items:center; gap:.8vh; min-width:0; }
  .object-memory-fig img{ display:block; max-width:100%; object-fit:contain; }
  .object-memory-fig figcaption{ text-align:center; }
  .object-memory-say{ text-align:center; }
  .object-memory-track{ display:flex; align-items:center; justify-content:center; gap:1vw; }
  .object-memory-box{ border:2px solid var(--ink); border-radius:10px; padding:1.4vh .6vw; width:16vw; box-sizing:border-box; text-align:center; background:#fff; }
  .object-memory-box.same{ background:#f1f5f9; }
  .object-memory-box.key{ border-width:4px; }
  .object-memory-box.wide{ width:24vw; }
  .object-memory-box.narrow{ width:14vw; }
  .object-memory-arrow{ font-size:clamp(1.4rem, 2.2vw, 2rem); color:var(--mute); }
  .object-memory-tag{ align-self:center; border:2px solid var(--ink); border-radius:999px; padding:.4vh 1.2vw; }
  .object-memory-pair{ display:flex; gap:3vw; justify-content:center; align-items:stretch; }
  .object-memory-card{ border:2px solid var(--ink); border-radius:12px; padding:2vh 1.4vw; width:30vw; box-sizing:border-box; display:flex; flex-direction:column; gap:1vh; text-align:center; background:#fff; }
  .object-memory-card.dash{ border-style:dashed; }
  .object-memory-legend{ display:flex; justify-content:center; gap:2.4vw; align-items:center; }
  .object-memory-sw{ display:inline-block; width:1.4em; height:1em; border:2px solid var(--ink); vertical-align:-.15em; margin-right:.4em; }
  .object-memory-banner{ align-self:center; display:flex; align-items:center; gap:.8vw; border:3px dashed var(--ink); border-radius:12px; padding:.8vh 1.6vw; font-size:clamp(1.15rem, 2vw, 2rem); font-weight:800; }
  .object-memory-pencil{ width:clamp(30px, 5vh, 54px); height:clamp(30px, 5vh, 54px); flex:none; transform-origin:20% 85%; }
  .b.shown > .object-memory-pencil{ animation:object-memory-scribble .45s ease-in-out 3; }
  .b.shown > .object-memory-sketch{ animation:object-memory-draw 1.2s ease-out; }
  @keyframes object-memory-draw{ from{ clip-path:inset(0 100% 0 0); } to{ clip-path:inset(0 0 0 0); } }
  @keyframes object-memory-scribble{ 0%,100%{ transform:rotate(0) translate(0,0); } 30%{ transform:rotate(-12deg) translate(5px,-3px); } 70%{ transform:rotate(9deg) translate(-4px,3px); } }
  @media (prefers-reduced-motion: reduce){ .b.shown > .object-memory-sketch, .b.shown > .object-memory-pencil{ animation:none; } }
  .object-memory-sketch{ display:block; height:38vh; max-width:100%; }
  .object-memory-sketch text{ font-family:inherit; fill:var(--ink); }
  .object-memory-sketch text.object-memory-stamp{ font-family:'Bradley Hand','Segoe Print','Comic Sans MS',cursive; font-size:21px; font-weight:700; }
  .object-memory-diagram{ display:block; height:46vh; max-width:100%; }
  .object-memory-diagram text{ font-family:inherit; fill:var(--ink); }
  .object-memory-line{ display:block; height:24vh; max-width:100%; }
  .object-memory-line text{ font-family:inherit; fill:var(--ink); }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){
    .object-memory-row, .object-memory-pair{ flex-direction:column; gap:1.2vh; align-items:center; }
    .object-memory-track{ flex-wrap:wrap; }
    .object-memory-box, .object-memory-box.wide{ width:40vw; }
    .object-memory-card{ width:86vw; }
    .object-memory-sketch, .object-memory-diagram{ height:26vh; }
    .object-memory-line{ height:16vh; }
  }
</style>`;

/* Diagram, not data: each photo or crop becomes a point; the same object lands close together. */
const omStar = (cx, cy, r) => Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; return `${i ? 'L' : 'M'}${(cx + rr * Math.cos(a)).toFixed(1)} ${(cy + rr * Math.sin(a)).toFixed(1)}`; }).join(' ') + 'Z';
const omSpace = () => {
  const bottle = [[-38,-10],[-22,-30],[-4,-36],[18,-26],[34,-6],[30,16],[10,30],[-14,28],[-32,14],[2,-6]].map(([x, y]) => [250 + x, 150 + y]);
  const wallet = [[-34,-8],[-18,-28],[6,-30],[28,-14],[34,10],[14,26],[-10,28],[-30,14],[-4,4],[16,-2]].map(([x, y]) => [640 + x, 210 + y]);
  const dots = (pts, shape) => pts.map(([x, y]) => shape === 'c' ? `<circle cx="${x}" cy="${y}" r="8" fill="#cbd5e1" stroke="var(--ink)" stroke-width="2"/>` : `<rect x="${x - 7}" y="${y - 7}" width="14" height="14" fill="#cbd5e1" stroke="var(--ink)" stroke-width="2"/>`).join('');
  const crops = [[290, 174, 'near'], [470, 110, ''], [400, 290, ''], [800, 96, ''], [110, 300, ''], [830, 320, '']];
  const tri = (x, y) => `<path d="M${x} ${y - 11} L${x + 11} ${y + 9} L${x - 11} ${y + 9}Z" fill="var(--ink)"/>`;
  return `<svg class="object-memory-diagram" viewBox="0 0 900 370" role="img" aria-label="Diagram, not data. Ten photos of a bottle become ten nearby points, and their average is a star. Ten photos of a wallet make a second group with its own star. Crops cut from a room photo become triangles: one lands next to the bottle star, the others are far from both stars. A dashed circle around each star marks how close counts as the same object.">
    <rect x="20" y="16" width="860" height="340" rx="16" fill="#fff" stroke="#cbd5e1" stroke-width="2"/>
    <g class="b" data-step="1">${dots(bottle, 'c')}<text x="250" y="70" text-anchor="middle" font-size="22">10 photos of the bottle</text></g>
    <g class="b" data-step="2"><path d="${omStar(250, 150, 22)}" fill="#fff" stroke="var(--ink)" stroke-width="4"/><text x="250" y="244" text-anchor="middle" font-size="22" font-weight="700">Average: the bottle</text></g>
    <g class="b" data-step="3">${dots(wallet, 'r')}<path d="${omStar(640, 210, 22)}" fill="#fff" stroke="var(--ink)" stroke-width="4"/><text x="640" y="126" text-anchor="middle" font-size="22">The wallet</text></g>
    <g class="b" data-step="4">${crops.map(([x, y]) => tri(x, y)).join('')}<text x="470" y="344" text-anchor="middle" font-size="22">Triangles: crops of one room photo</text></g>
    <g class="b" data-step="5"><circle cx="250" cy="150" r="62" fill="none" stroke="var(--ink)" stroke-width="3" stroke-dasharray="9 7"/><circle cx="640" cy="210" r="62" fill="none" stroke="var(--ink)" stroke-width="3" stroke-dasharray="9 7"/>
      <text x="640" y="306" text-anchor="middle" font-size="22">Nothing inside: not seen</text></g></svg>`; };

/* Arithmetic, not data: the 95% interval for a proportion of 0.70 with 60 questions is 0.70 ± 1.96 × sqrt(0.7 × 0.3 / 60) = 0.70 ± 0.116. */
const omInterval = () => { const x0 = 80, x1 = 820, sx = v => x0 + (x1 - x0) * v / 100, y = 90;
  return `<svg class="object-memory-line" viewBox="0 0 900 170" role="img" aria-label="A number line from 0 to 100 percent. A dot at 70 percent with a bar from about 58 to 82 percent: the 95 percent interval for 60 questions. Arithmetic, not data.">
    <path d="M${x0} ${y} H${x1}" stroke="var(--ink)" stroke-width="3"/>
    ${[0, 100].map(v => `<path d="M${sx(v)} ${y - 10} V${y + 10}" stroke="var(--ink)" stroke-width="3"/><text x="${sx(v)}" y="${y + 44}" text-anchor="middle" font-size="24">${v}%</text>`).join('')}
    <g class="b" data-step="1"><circle cx="${sx(70)}" cy="${y}" r="11" fill="var(--ink)"/><text x="${sx(70)}" y="${y - 26}" text-anchor="middle" font-size="24" font-weight="700">70%</text></g>
    <g class="b" data-step="2"><path d="M${sx(58.4)} ${y} H${sx(81.6)} M${sx(58.4)} ${y - 18} V${y + 18} M${sx(81.6)} ${y - 18} V${y + 18}" stroke="var(--ink)" stroke-width="6" fill="none"/>
      <text x="${sx(58.4)}" y="${y + 44}" text-anchor="middle" font-size="22">58%</text><text x="${sx(81.6)}" y="${y + 44}" text-anchor="middle" font-size="22">82%</text></g></svg>`; };

/* Hand-drawn panels: wobbled lines, no numbers on the axes, because these are drawings and not data. */
let omSeed = 0;
const omWobble = () => { const id = 'om-wob-' + (++omSeed); return { id, def: `<defs><filter id="${id}"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="${omSeed + 31}"/><feDisplacementMap in="SourceGraphic" scale="4"/></filter></defs>` }; };
const omStamp = (x, y) => `<text class="object-memory-stamp" x="${x}" y="${y}" text-anchor="end">hand drawn</text>`;
const omLight = '#e2e8f0', omDark = '#64748b';
/* hs = [whole correct, whole false, crops correct, crops false] */
const omBars = (hs, name, alt) => { const w = omWobble(); const base = 200;
  const bar = (x, h, fill) => `<rect x="${x}" y="${base - h}" width="40" height="${h}" fill="${fill}" stroke="var(--ink)" stroke-width="2.5"/><path d="M${x + 20} ${base - h - 12} V${base - h + 12} M${x + 13} ${base - h - 12} H${x + 27} M${x + 13} ${base - h + 12} H${x + 27}" stroke="var(--ink)" stroke-width="2.5" fill="none"/>`;
  return `<svg class="object-memory-sketch" viewBox="0 0 330 262" role="img" aria-label="${alt}">${w.def}<g filter="url(#${w.id})">
    <path d="M58 22 V200 H318" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/>
    ${bar(84, hs[0], omLight)}${bar(128, hs[1], omDark)}${bar(212, hs[2], omLight)}${bar(256, hs[3], omDark)}</g>
    <text x="128" y="224" text-anchor="middle" font-size="17">Whole frame</text><text x="256" y="224" text-anchor="middle" font-size="17">Crops</text>
    <text x="188" y="256" text-anchor="middle" font-size="21" font-weight="700">${name}</text>
    <text transform="translate(34 112) rotate(-90)" text-anchor="middle" font-size="16">Share of questions</text>${omStamp(326, 18)}</svg>`; };
const omCurve = () => { const w = omWobble();
  return `<svg class="object-memory-sketch" viewBox="0 0 420 270" role="img" aria-label="A hand-drawn curve that rises steeply and then flattens. Across: false sightings. Up: correct frames. A filled dot marks the threshold chosen on session A. An open circle a little lower marks the same threshold on session B. This is a drawing, not data.">${w.def}<g filter="url(#${w.id})">
    <path d="M70 22 V206 H404" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/>
    <path d="M72 196 C 96 90, 170 60, 396 46" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>
    <circle class="b" data-step="2" cx="140" cy="92" r="9" fill="var(--ink)"/>
    <circle class="b" data-step="3" cx="146" cy="122" r="9" fill="#fff" stroke="var(--ink)" stroke-width="3"/></g>
    <text class="b" data-step="2" x="160" y="106" font-size="17">chosen on session A</text>
    <text class="b" data-step="3" x="166" y="142" font-size="17">same threshold, session B</text>
    <text x="236" y="236" text-anchor="middle" font-size="17">False sightings →</text>
    <text transform="translate(40 116) rotate(-90)" text-anchor="middle" font-size="17">Correct frames →</text>${omStamp(416, 18)}</svg>`; };
const omPencil = '<svg class="object-memory-pencil" viewBox="0 0 48 48" aria-hidden="true"><path d="M8 40 12 28 34 6 42 14 20 36Z" fill="#fff" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/><path d="M8 40 12 28 20 36Z" fill="var(--ink)"/><path d="M30 10 38 18" stroke="var(--ink)" stroke-width="3"/></svg>';
const omDrawn = step => omLine(`${omPencil}<span>Hand drawn. Not real results. An example of what to report.</span>`, step, 'object-memory-banner');

const omMemPal = 'Maniar et al., 2025, MemPal, arXiv 2502.01801 · CC BY-NC-SA 4.0';
const omOrbit = 'Massiceti et al., 2021, ORBIT dataset, ICCV · CC BY 4.0';
const omWallet = 'Xu et al., 2022, Where is my Wallet?, arXiv 2211.10528';

/* 1. Transition title, like the other project deep dives. */
st(`${omStyle}
  <div class="center" style="margin:auto">
    <h1 class="t">Project: Where Did I Put It?</h1>
    <div class="statement b" data-step="1" style="margin-top:3vh">Can a phone, with no internet, show where an object was last seen?</div>
  </div>
`, omN('Now a project about finding things we put down.',
  'The question: can a phone, with no internet, show you where you last saw your keys or your bottle? And can it say "not seen" when it does not know?'));

/* 2. The idea as the team sent it, in our own words (no names, no quotes from the form: public repo). */
st(`
  <h1 class="t">Your Idea, in Our Words</h1>
  <div class="object-memory-col" style="flex:1 1 auto">
    ${omLine('1. Help people find things they put down.', 1)}
    ${omLine('2. No internet. No expensive phone.', 2)}
    ${omLine('3. Your own photos: some to register, some to test.', 3)}
    ${omLine('4. For older people, where help is hard to get.', 4)}
    ${omLine('Did we get it right?', 5, 'question')}
  </div>
`, omN('Before we start, here is your idea, as we understood it. Please stop us if we got it wrong.',
  'You want to build a simple memory helper. It helps people find everyday things they put down: a water bottle, a glasses case, a notebook, a wallet, a bag.',
  'It should work with no internet connection, and without an expensive phone.',
  'You would take your own photos of each object, from different angles, in different light, on different backgrounds. Some photos register the object. Other photos test whether the model recognizes it.',
  'You have in mind older people in places with few resources, where assistive technology is hard to get. Your inspiration is MemPal, a project from MIT.',
  'Is this right? You also sent a second idea, about EEG. That is the next slide.'));

/* 3. Their one question, and our answer. */
st(`
  <h1 class="t">What You Asked Us</h1>
  <div class="object-memory-col" style="flex:1 1 auto">
    ${omLine('Which of our two ideas fits in the time?', 1, 'question object-memory-say')}
    ${omSay('This one.', 2)}
    ${omLine('Pretrained models. Your own photos. Free Colab.', 3, 'lead object-memory-say')}
    ${omLine('EEG: data is hard to get, and easy to fool yourself with.', 4, 'lead object-memory-say')}
  </div>
`, omN('You asked us one question.',
  'Which of your two ideas is more realistic in the time you have?',
  'Our answer: this one, the object memory idea.',
  'It needs no training. You can use a pretrained model, collect the photos yourselves in a few days, and run it on free Colab. And it is a vision project, which fits this course.',
  'The EEG idea is harder. We did not find a clear open dataset with autism labels. And with small EEG datasets, it is easy to get a very high number that means nothing, for example when the same person is in training and in test.'));

/* 4. Their human link: recognizing one specific object. */
st(`
  <h1 class="t">Your Link: Knowing Your Own Things</h1>
  <div class="object-memory-row">
    ${omFig('orbit-keys.jpg', 'ORBIT dataset, a frame from a clean video: a person holds their own keys close to a phone camera.', 2, 'ORBIT: people filmed their own objects.', 44)}
    <div class="object-memory-col" style="max-width:40vw">
      ${omSay('You know your keys. Not just any keys.', 1)}
      ${omLine('486 objects. 77 people. Phone videos.', 2)}
      ${omLine('Any angle, any light: still yours.', 3)}
    </div>
  </div>
  ${rdCite(omOrbit, 2)}
`, omN('Your link to human perception is object recognition. Here is the part that matters most for you.',
  'People do not only see a set of keys. They see their own keys, and they tell them apart from other keys. This is recognition of one specific object, not of a category.',
  'The ORBIT dataset is built for this. Blind and low-vision people filmed their own objects with their phones, to teach a phone to recognize them: 3,822 videos of 486 objects, from 77 people.',
  'This is your registration step. You also plan to photograph each object from many angles and in different light. The test is: is it still your object?'));

/* 5. A second human link: location memory in healthy aging. */
st(`
  <h1 class="t">A Second Link: Where Fades First</h1>
  <div class="object-memory-pair" style="flex:1 1 auto; align-items:center">
    <div class="object-memory-card b" data-step="1"><div class="lead">Which items?</div><div class="label">Older adults: like young adults.</div></div>
    <div class="object-memory-card b" data-step="2"><div class="lead">Where was each one?</div><div class="label">Older adults: clearly worse.</div></div>
  </div>
  ${omSay('So show the place. The person knows the object.', 3)}
  ${omLine('Healthy aging. Not dementia.', 4, 'label object-memory-say')}
  ${rdCite('Chalfonte and Johnson, 1996, Memory and Cognition 24:403', 1)}
`, omN('There is a second link to human memory, and it helps your design.',
  'In a classic study, young and older adults saw colored items placed in a grid. Later they were tested on what they saw. For which items were shown, older adults were not worse.',
  'For where each item was, older adults had a specific, larger deficit.',
  'So an assistant should give back the place. A photo of where the object was fits this well: the person can still recognize the object and the room.',
  'Be careful. This study is about healthy older adults in a lab task. It is not about dementia, and not about searching a real home.'));

/* 6. Close work: MemPal (the team's inspiration). */
st(`
  <h1 class="t">Close Work: MemPal</h1>
  <div class="object-memory-stack">${omFig('mempal-find.jpg', 'MemPal, teaser figure: a cartoon of an older man with a camera on a neck strap putting his keys down in the kitchen; then he asks where his keys are, and a voice answers that they are in the kitchen near the stove.', 1, 'A worn camera watches. A voice answers.', 40)}</div>
  ${omSay('15 older adults, in their own homes.', 2)}
  ${omLine('Video goes to a server. Not offline.', 3, 'lead object-memory-say')}
  ${rdCite(omMemPal)}
`, omN('First, the work that inspired you: MemPal, from the MIT Media Lab.',
  'A phone hangs on a neck strap and films what the person does. When they ask where their keys are, a voice answers.',
  'It was tested with 15 older adults, aged 62 to 96, in their own homes.',
  'One important detail. The phone streams video to a server, and a large model, GPT-4V, describes the frames. So MemPal is not offline. Your version, with no internet, is a real difference.'));

/* 7. MemPal: a photo helped as much as a voice. */
st(`
  <h1 class="t">MemPal: A Photo Helped as Much as a Voice</h1>
  <div class="object-memory-stack">${omFig('mempal-photo-vs-voice.jpg', 'MemPal, study conditions figure: two study conditions. Left: a voice describes where a book is. Right: a laptop shows the label Book and a grid of last-seen camera images.', 1, 'Left: a voice. Right: last-seen photos.', 40)}</div>
  ${omSay('Rooms searched: no help 1.93, voice 1.10, photo 1.09.', 2)}
  ${omLine('Counted only when the system was right.', 3, 'label object-memory-say')}
  ${omLine('A last-seen photo is a good answer.', 4, 'lead object-memory-say')}
  ${rdCite(omMemPal)}
`, omN('MemPal compared two kinds of help.',
  'On the left, a voice describes the place. On the right, the person sees the last photos where the object appeared, with a label.',
  'They counted how many rooms people searched before they found the object. With no help: 1.93 rooms on average. With the voice: 1.10. With the photos: 1.09. Voice and photo were about the same.',
  'One caveat. These averages count only trials where the system gave correct information. The photos were correct only 53 percent of the time, and the voice 72 percent.',
  'Still, this is good news for you. A last-seen photo, with no voice, is a useful answer. In MemPal, a large model, GPT-4V, still found and labelled the object in the photos. Your version would use a small matching model instead.'));

/* 8. Close work: GO-Finder. */
st(`
  <h1 class="t">Close Work: GO-Finder</h1>
  <div class="object-memory-stack">${omFig('gofinder-last-frame.jpg', 'GO-Finder, teaser figure: a person forgets where a mug is, taps a thumbnail of the mug on a phone, and sees the last frame where the mug appeared, on a table.', 1, 'Tap the object. See its last frame.', 30)}</div>
  ${omSay('This is the answer you want.', 2)}
  ${omLine('But: a worn camera, and only objects you hold.', 3, 'lead object-memory-say')}
  ${rdCite('Yagi et al., 2021, GO-Finder, ACM IUI, arXiv 2101.07314')}
`, omN('A second system: GO-Finder.',
  'You forget where your mug is. You open the app, tap a small picture of the mug, and it shows the last frame where the mug appeared.',
  'This is very close to the answer we suggest for you: one photo, and the time.',
  'But GO-Finder uses a camera worn on the body, and it only finds objects that were in your hand. It does not need you to register objects first. Your idea registers them first, with photos.'));

/* 9. The benchmark version: when did I last see this object? */
st(`
  <h1 class="t">A Benchmark: When Did I Last See It?</h1>
  <div class="object-memory-row">
    ${omFig('ego4d-last-seen.jpg', 'Ego4D, visual queries figure: two head-camera videos. On the right, a photo of the query object, a ruler and a bin. In the middle, the predicted frames where it was last seen, with a small box around it.', 1, 'Ego4D: find the last time this object appears.', 30)}
    ${omFig('emqa-keys.jpg', 'Episodic Memory Question Answering, teaser figure: AR glasses take a tour of a home, build a 3D memory, and answer where are my keys by marking them in a past frame.', 2, 'AR glasses: where are my keys?', 42)}
  </div>
  ${omSay('Long videos. Big models. Not for a cheap phone.', 3)}
  ${rdCite('Grauman et al., 2022, Ego4D, CVPR · Datta et al., 2022, Episodic Memory Question Answering, CVPR')}
`, omN('Researchers also study this as a benchmark.',
  'In Ego4D, you get a long video from a head camera and a photo of an object. The task: find the last time the object appears. The small boxes show where the model found it.',
  'Another paper imagines AR glasses that walk through a home, build a 3D map, and then answer: where are my keys?',
  'These are the same question as yours. But they use long videos, depth or 3D maps, and big models. Your version is much smaller, and that is fine for a demo.'));

/* 10. Why a smaller scope. */
st(`
  <h1 class="t">Why a Smaller Project?</h1>
  <div class="object-memory-col" style="flex:1 1 auto">
    <div class="object-memory-track b" data-step="1">
      ${['Film all day', 'Recognize objects', 'Run on a cheap phone', 'Help older adults'].map((t, i) => `${i ? omArrow : ''}${omBox(t)}`).join('')}
    </div>
    ${omSay('Each step is a project. Two weeks.', 2)}
    ${omLine('One room. Five objects. Network off.', 3, 'lead object-memory-say')}
  </div>
`, omN('So why do we suggest something smaller?',
  'The full dream has four parts: a camera that captures the day, recognition of your objects, running on a cheap phone, and real help for older adults.',
  'Each part is a research project on its own. Testing with older adults also needs ethics review, which does not fit in two weeks.',
  'So start with the core: one room, five objects, and the network switched off. If that works, the rest can come later.'));

/* 11. The intuition behind the suggestion: close means same. */
st(`
  <h1 class="t">The Intuition: Close Means Same</h1>
  <div class="object-memory-row"><div>${omSpace()}</div></div>
  ${omLine('Diagram, not data.', 1, 'label object-memory-say')}
`, omN('Here is the intuition behind what we suggest. No math, just pictures.',
  'A pretrained model turns each photo into a list of numbers. Think of it as a point. Photos of the same bottle land close together.',
  'Average them. This star is the bottle, as the model sees it.',
  'Do the same for the wallet. It gets its own group and its own star.',
  'Now take a photo of the room, cut it into small pieces, and turn each piece into a point too. One piece shows the bottle, so it lands next to the bottle star. The others land far away.',
  'Draw a circle: this close counts as the same object. If nothing falls inside, the answer is "not seen".'));

/* 12. What we suggest: one pipeline. Our suggestion, not the team's plan. */
st(`
  <h1 class="t">What We Suggest</h1>
  <div class="object-memory-col" style="flex:1 1 auto">
    ${omLine('Our suggestion', 1, 'label object-memory-tag')}
    <div class="object-memory-track">
      <div class="b" data-step="1">${omBox('Register: 5 objects, about 10 photos each', 'narrow')}</div>
      <div class="b" data-step="2" style="display:flex;align-items:center;gap:1vw">${omArrow}${omBox('Sweep the room: photos with a time', 'narrow')}</div>
      <div class="b" data-step="3" style="display:flex;align-items:center;gap:1vw">${omArrow}${omBox('Cut each photo into crops', 'narrow')}</div>
      <div class="b" data-step="4" style="display:flex;align-items:center;gap:1vw">${omArrow}${omBox('Match crops to each object', 'key narrow')}</div>
      <div class="b" data-step="5" style="display:flex;align-items:center;gap:1vw">${omArrow}${omBox('Last photo and time, or "not seen"', 'same narrow')}</div>
    </div>
    ${omLine('No training. Compare with whole photos.', 6, 'lead object-memory-say')}
  </div>
`, omN('Here is what we suggest. This is our suggestion, not your plan, so tell us if it does not fit what you want.',
  'Register five objects, with about ten photos each. A small pretrained model turns them into points, and you keep the average for each object.',
  'Then, in one room, take photos of the room, each with its time. We call this a sweep. This is what tells you where things are.',
  'Cut each room photo into crops, smaller pieces, so that a small object fills more of the piece.',
  'Compare every crop with every object, using the closeness from the last slide.',
  'When the user taps an object, show the most recent room photo where it matched, and the time. If no crop is close enough, say "not seen".',
  'No training at all. And as a baseline, try matching the whole room photo, with no crops. Then you can show what the crops add.'));

/* 13. Trap: registration photos say nothing about where. */
st(`
  <h1 class="t">Trap: Where Do Sightings Come From?</h1>
  <div class="object-memory-pair" style="flex:1 1 auto; align-items:center">
    <div class="object-memory-card b" data-step="1"><div class="lead">Photos of the object</div><div class="label">What it looks like.</div></div>
    <div class="object-memory-card b" data-step="2"><div class="lead">Photos of the room, with a time</div><div class="label">Where it was, and when.</div></div>
  </div>
  ${omSay('No room photos, no answer.', 3)}
  ${omLine('Someone must take them after the object moves.', 4, 'lead object-memory-say')}
`, omN('The first trap is the most important one.',
  'Your plan photographs each object. These photos teach the model what the object looks like.',
  'But they say nothing about where the object is now. For that, you need photos of the room, with a time on each one.',
  'Without room photos, the app can only say "this is a bottle". It cannot say where.',
  'And the room photos must be taken after the object was put down. MemPal and GO-Finder use a camera that is always on. In your demo, who takes the room photos, and when? Decide this first.'));

/* 14. Trap: small objects in clutter. */
st(`
  <h1 class="t">Trap: Small Things in Clutter</h1>
  <div class="object-memory-row">
    ${omFig('orbit-keys.jpg', 'ORBIT, clean video frame: keys filling the picture.', 1, 'Registered: the keys fill the photo.', 36)}
    ${omFig('orbit-keys-clutter.jpg', 'ORBIT, clutter video frame: the same keys, small, among clothes and a book.', 2, 'In the room: the keys are tiny.', 36)}
  </div>
  ${omLine('GO-Finder: a black wallet was found in 67% of trials. Average: 86%.', 3, 'label object-memory-say')}
  ${omSay('So cut the photo into crops.', 4)}
  ${rdCite(omOrbit + ' · Yagi et al., 2021, GO-Finder', 1)}
`, omN('The second trap: small objects in a messy room.',
  'When you register an object, it fills the photo, like these keys.',
  'In a room photo, the same keys are a few pixels among clothes and books. A model that looks at the whole photo will mostly see the clothes.',
  'GO-Finder saw the same problem. Small and black objects were the hardest. Their system found a black wallet in 67 percent of trials, while the average over all objects was 86 percent.',
  'That is why we suggest crops. In a crop, the keys are a bigger part of the picture. Let crops overlap a little, so an object is not cut in half.'));

/* 15. Trap: look-alike objects. */
st(`
  <h1 class="t">Trap: Look-Alikes</h1>
  <div class="object-memory-row">
    ${omFig('wallet-lookalikes.jpg', 'Where is my Wallet, first figure, bottom: for three queries, from easy to hard, the query photo, the real object in a video frame with a red box, and a look-alike with a green box and its confidence score, which drops from the first model to the improved one.', 1, 'Query, the real one, a look-alike with its score.', 50)}
    <div class="object-memory-col" style="max-width:34vw">
      ${omSay('A look-alike can score high.', 2)}
      ${omLine('Test two black wallets on purpose.', 3)}
    </div>
  </div>
  ${rdCite(omWallet)}
`, omN('The third trap: objects that look alike.',
  'In each row: on the left, the photo of the object to find. In the middle, the real object in the video. On the right, a different object that looks similar. The number is how confident one model was that the look-alike was the object. The second number is from the improved model.',
  'In the hard row, the first model gave the look-alike a score of 0.954. A look-alike can look almost perfect to the model.',
  'Your users may own two black wallets, or two similar bottles. So add a look-alike on purpose and test it. If you only test very different objects, the task looks easier than it is.'));

/* 16. Trap: the most recent match amplifies false positives. */
st(`
  <h1 class="t">Trap: One False Match Wins</h1>
  <div class="object-memory-row">
    ${omFig('wallet-false-peaks.jpg', 'Where is my Wallet, results visualization, left: match score over the frames of a video for a cooking pan. Top: the score is high while the pan is really there, then a later false peak on a bowl of dough. Bottom: an improved model with no late false peak.', 1, 'Green: the pan is really there. Blue: the match score.', 50)}
    <div class="object-memory-col" style="max-width:34vw">
      ${omSay('"Most recent" picks the late false peak.', 2)}
      ${omLine('Ask for two or more matching frames.', 3)}
    </div>
  </div>
  ${rdCite(omWallet)}
`, omN('The fourth trap comes from our own suggestion: "show the most recent match".',
  'This plot is from a paper about finding objects in video. The green line shows when the pan was really in view. The blue line is the match score in each frame. In the top plot, after the real pan, there is a later peak, labelled b. It is a bowl of dough, not the pan.',
  'If you always show the most recent match, you show that false peak. One wrong frame beats many right ones.',
  'A simple fix: only count a sighting if two or more nearby frames match. Try it and report what it changes.'));

/* 17. Trap: a confident wrong answer is worse than "not seen". */
st(`
  <h1 class="t">Trap: Wrong Is Worse Than "Not Seen"</h1>
  <div class="object-memory-col" style="flex:1 1 auto">
    <div class="object-memory-track b" data-step="1">${omBox('Session A: choose the threshold', 'wide')}${omArrow}${omBox('Session B: test. No changes.', 'wide key')}</div>
    ${omLine('Plan trials where the object is really gone.', 2, 'lead object-memory-say')}
    ${omSay('Report correct frames and false sightings.', 3)}
  </div>
`, omN('The fifth trap. For someone who relies on the app, a confident wrong place is worse than "not seen". It sends them to the wrong room.',
  'So the threshold, how close counts as a match, must be chosen on one session of photos. Then test on a different session, and do not change it. Otherwise the result is too good to be true.',
  'And "not seen" can only be tested if the object is sometimes really not there. Plan those trials: take the object out of the room, and check that the app says "not seen".',
  'Report two numbers: how often the app shows the correct photo, and how often it claims a sighting that is wrong.'));

/* 18. Trap: which device is offline? */
st(`
  <h1 class="t">Trap: Offline on Which Device?</h1>
  <div class="object-memory-col" style="flex:1 1 auto">
    ${omLine('Colab: runs in the cloud.', 1)}
    ${omLine('Laptop, network off: a stand-in for a phone.', 2)}
    ${omLine('A real cheap phone: best, if there is time.', 3)}
    ${omSay('Name the device you tested.', 4)}
  </div>
`, omN('The sixth trap is about the word offline.',
  'Colab is great for building the pipeline. But Colab runs in the cloud, so it cannot show that your app works offline.',
  'A laptop with the network switched off is a fair test of offline. But a laptop is much faster than a cheap phone, so call it a stand-in.',
  'If you can borrow a cheap Android phone and time the model on it, that is the real test. It is a stretch goal.',
  'Whatever you use, write down the device, and say what it does and does not show.'));

/* 19. Trap: small samples. */
st(`
  <h1 class="t">Trap: Small Samples</h1>
  <div class="object-memory-row"><div>${omInterval()}</div></div>
  ${omLine('60 questions, 70% correct: really somewhere from 58% to 82%.', 2, 'lead object-memory-say')}
  ${omSay('Small differences will not show.', 3)}
`, omN('The last trap: how many test questions you have.',
  'Say you test 60 questions, for example 10 placements of 6 objects, and the app is right 70 percent of the time.',
  'With only 60 questions, the true rate could be anywhere from about 58 to 82 percent. That is plus or minus 12 points. This is simple arithmetic, not data.',
  'So if crops beat whole photos by 5 points, you cannot tell. Look for big differences, test both methods on the same questions, and show the uncertainty.'));

/* 20. Examples of what to report: drawings only. */
st(`
  <h1 class="t">Examples of What to Report</h1>
  ${omDrawn(1)}
  <div class="object-memory-row">
    <div class="b" data-step="1">${omBars([70, 70, 140, 40], 'Crops help', 'A hand-drawn bar sketch: crops find the correct photo more often and make fewer false sightings than whole photos. This is a drawing, not data.')}</div>
    <div class="b" data-step="2">${omBars([70, 40, 140, 110], 'More finds, more errors', 'A hand-drawn bar sketch: crops find more, but also make more false sightings. This is a drawing, not data.')}</div>
    <div class="b" data-step="3">${omBars([90, 50, 96, 54], 'No clear difference', 'A hand-drawn bar sketch: whole photos and crops look about the same. This is a drawing, not data.')}</div>
  </div>
  <div class="object-memory-legend label b" data-step="1"><span><span class="object-memory-sw" style="background:${omLight}"></span>Correct photo</span><span><span class="object-memory-sw" style="background:${omDark}"></span>False sighting</span></div>
  ${omSay('All three are good results.', 4)}
`, omN('These are drawings. No experiment has been run. They show what your main figure could look like. For each method, two bars: how often the app shows the correct photo, and how often it claims a wrong sighting.',
  'One possible result: crops help. More correct photos and fewer false sightings than whole photos.',
  'Another: crops find more, but also make more mistakes. Then the threshold matters a lot, and you should say so.',
  'Or no clear difference. With small samples, say "we could not detect a difference", not "there is no difference".',
  'All three are good results, if the test is fair: threshold chosen on one session, tested on another.'));

/* 21. The threshold trade-off: a drawing. */
st(`
  <h1 class="t">Example: Choose the Threshold</h1>
  ${omDrawn(1)}
  <div class="object-memory-row"><div class="b" data-step="1">${omCurve()}</div></div>
  ${omLine('Choose on session A. Report on session B.', 3, 'lead object-memory-say')}
`, omN('Another drawing, not data. It shows the choice behind "not seen".',
  'Each point on the curve is one threshold. A strict threshold gives few false sightings, but also misses real ones. A loose threshold finds more, and also makes more false claims.',
  'You choose one threshold on session A. This dot.',
  'Then you keep it, and test on session B. The result is usually a bit worse, like this open circle. That honest number is the one to report.'));

/* 22. Start small, and plan B. */
st(`
  <h1 class="t">Start Small</h1>
  <div class="object-memory-col" style="flex:1 1 auto">
    ${omLine('1. Five objects, ten photos each. One model.', 1)}
    ${omLine('2. Whole photos first, start to end.', 2)}
    ${omLine('3. Then crops. A pilot of 10 placements.', 3)}
    ${omLine('4. Session A for the threshold. Session B to test.', 4)}
    ${omLine('Plan B: one photo when you put the object down.', 5, 'lead')}
    ${omLine('Close wallets. Photograph only your own room.', 6, 'label')}
  </div>
`, omN('Two weeks is short. So start with the smallest version that works from start to end.',
  'Day one: five objects, about ten photos each, and one small pretrained model. Check that photos of the same object land close together.',
  'Build the whole pipeline with whole room photos first, with no crops. Then you have a working demo and a baseline.',
  'Then add crops. Before the big data collection, run a small pilot of about 10 placements. If something fails, you still have time to fix it.',
  'Then collect session A to choose the threshold, and session B to test. Include trials where the object is gone, and one look-alike.',
  'If room sweeps do not work, plan B: the user takes one photo when they put the object down, and the app finds it later. It is simpler. But it only works if the person remembers to take the photo, which is a real limit for people who forget.',
  'One more thing. Wallets and bags can show cards or addresses, so keep them closed. Photograph only rooms you control, with no other people in them.'));

/* 23. Questions for the team. */
st(`
  <h1 class="t">Questions for the Team</h1>
  <div class="object-memory-col" style="flex:1 1 auto">
    ${omLine('Who takes the room photos, and when?', 1, 'question')}
    ${omLine('Which device will you test offline?', 2, 'question')}
    ${omLine('What counts as a correct answer? Write it down first.', 3, 'question')}
    ${omLine('Who does which part?', 4, 'question')}
  </div>
`, omN('These are real questions. We want to hear from you.',
  'Everything depends on the room photos. Who takes them, and when? A sweep after each placement is fine for a demo, but say it clearly.',
  'Which device will you use for the offline test: a laptop with the network off, or a real phone?',
  'Before you collect the test session, write down what counts as correct: the right photo, the right place in the room, or the right time. And write down the threshold rule.',
  'Natural parts are: taking and logging the photos, building the matching, and the evaluation. Who does which?'));
}

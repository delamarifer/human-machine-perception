/* PART: open-questions (Day 7 part 2). Owner: Fernanda. Now a deep dive of one team project: tennis strokes merged with sign language for doctors.
   Replaces the Open Questions placeholder (Fernanda's request, 2026-11-10). Public repo: project topics only, never student names or faces, and nothing from the team's own clips.
   Short plain sentences: many students are not fluent in English. Figures and licences: assets/open-questions/SOURCES.md. Expected results are drawings only. */
{
section('Both Projects');

const oqA = 'assets/open-questions/';
const oqN = (...p) => ({ notes: p.map(x => '(draft) ' + x).join('[click]') });
const oqFig = (src, alt, step, cap, h = 54) => `<figure class="open-questions-fig b" data-step="${step}"><img src="${oqA}${src}" alt="${alt}" style="max-height:${h}vh">${cap ? `<figcaption class="label">${cap}</figcaption>` : ''}</figure>`;
const oqLine = (t, step, cls = 'lead') => `<div class="${cls} b" data-step="${step}">${t}</div>`;
const oqStyle = `<style>
  .open-questions-row{ flex:1 1 auto; min-height:0; display:flex; justify-content:center; align-items:center; gap:3vw; }
  .open-questions-col{ display:flex; flex-direction:column; justify-content:center; gap:2.4vh; min-width:0; }
  .open-questions-fig{ margin:0; display:flex; flex-direction:column; align-items:center; gap:1vh; min-width:0; }
  .open-questions-fig img{ display:block; max-width:100%; object-fit:contain; }
  .open-questions-fig figcaption{ text-align:center; }
  .open-questions-say{ text-align:center; }
  .open-questions-2x2{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:auto auto auto; justify-content:center; align-items:center; gap:1.2vh 2vw; }
  .open-questions-2x2 img{ display:block; max-height:25vh; max-width:100%; }
  .open-questions-track{ display:flex; align-items:center; justify-content:center; gap:1vw; }
  .open-questions-box{ border:2px solid var(--ink); border-radius:10px; padding:1.2vh .6vw; width:19vw; box-sizing:border-box; text-align:center; background:#fff; }
  .open-questions-box.same{ background:#f1f5f9; }
  .open-questions-box.odd{ border-style:dashed; }
  .open-questions-arrow{ font-size:clamp(1.4rem, 2.2vw, 2rem); color:var(--mute); }
  .open-questions-banner{ align-self:center; border:2px dashed var(--ink); border-radius:10px; padding:.8vh 1.4vw; text-align:center; font-weight:700; }
  .open-questions-sketch{ display:block; height:42vh; max-width:100%; }
  .open-questions-sketch text{ font-family:inherit; fill:var(--ink); }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){
    .open-questions-row{ flex-direction:column; gap:1.2vh; }
    .open-questions-track{ flex-wrap:wrap; }
    .open-questions-sketch{ height:26vh; }
  }
</style>`;

/* A drawn person for the train and test picture. */
const oqPerson = (x, dashed) => `<g transform="translate(${x} 34)" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round" ${dashed ? 'stroke-dasharray="5 6"' : ''}>
  <circle cx="0" cy="0" r="13"/><path d="M0 13 V70 M0 30 L-24 52 M0 30 L24 52 M0 70 L-20 112 M0 70 L20 112"/></g>`;

/* Hand-drawn panels: wobbled lines, no numbers on the axes, because these are drawings and not data. */
let oqSeed = 0;
const oqWobble = () => { const id = 'oq-wob-' + (++oqSeed); return { id, def: `<defs><filter id="${id}"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="${oqSeed + 3}"/><feDisplacementMap in="SourceGraphic" scale="4"/></filter></defs>` }; };
const oqBars = (h2, h3, name, alt) => { const w = oqWobble(); const base = 200; const bar = (x, h, fill) => `<rect x="${x}" y="${base - h}" width="62" height="${h}" fill="${fill}" stroke="var(--ink)" stroke-width="2.5"/><path d="M${x + 31} ${base - h - 16} V${base - h + 16} M${x + 21} ${base - h - 16} H${x + 41} M${x + 21} ${base - h + 16} H${x + 41}" stroke="var(--ink)" stroke-width="2.5" fill="none"/>`;
  return `<svg class="open-questions-sketch" viewBox="0 0 300 262" role="img" aria-label="${alt}">${w.def}<g filter="url(#${w.id})">
    <path d="M58 22 V200 H282" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/>${bar(92, h2, '#e2e8f0')}${bar(186, h3, '#94a3b8')}</g>
    <text x="123" y="226" text-anchor="middle" font-size="19">2D</text><text x="217" y="226" text-anchor="middle" font-size="19">3D</text>
    <text x="170" y="256" text-anchor="middle" font-size="21" font-weight="700">${name}</text>
    <text transform="translate(34 112) rotate(-90)" text-anchor="middle" font-size="16">Score, new people</text></svg>`; };
const oqStrokes = ['Flat serve', 'Kick serve', 'Slice serve', 'Forehand', 'Backhand'];
const oqMatrix = () => { const w = oqWobble(); const s = 56, x0 = 150, y0 = 18; const dark = [[.85,.45,.3,0,0],[.45,.75,.35,0,.1],[.3,.35,.8,.1,0],[0,0,.1,.95,.15],[0,.1,0,.15,.95]];
  const cells = dark.map((r, i) => r.map((v, j) => `<rect x="${x0 + j * s}" y="${y0 + i * s}" width="${s}" height="${s}" fill="rgba(51,65,85,${v})" stroke="var(--ink)" stroke-width="2"/>`).join('')).join('');
  const rows = oqStrokes.map((t, i) => `<text x="${x0 - 12}" y="${y0 + i * s + 35}" text-anchor="end" font-size="19">${t}</text>`).join('');
  return `<svg class="open-questions-sketch" viewBox="0 0 450 318" role="img" aria-label="A hand-drawn grid of five tennis strokes against five tennis strokes. The three serves are drawn as confused with each other. This is a drawing, not data.">${w.def}<g filter="url(#${w.id})">${cells}</g>${rows}</svg>`; };
const oqHandCurve = () => { const w = oqWobble();
  return `<svg class="open-questions-sketch" viewBox="0 0 330 262" role="img" aria-label="A hand-drawn curve: the hand is found less often when it is close to the body. This is a drawing, not data.">${w.def}<g filter="url(#${w.id})">
    <path d="M58 22 V200 H312" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/><path d="M72 172 C130 160 150 82 205 62 S280 44 304 42" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/></g>
    <text x="185" y="226" text-anchor="middle" font-size="16">Hand distance from the body</text><text x="185" y="256" text-anchor="middle" font-size="21" font-weight="700">Is the hand found?</text>
    <text transform="translate(34 112) rotate(-90)" text-anchor="middle" font-size="16">Hand found</text></svg>`; };
const oqNearBars = () => { const w = oqWobble(); const base = 200; const bar = (x, h, fill) => `<rect x="${x}" y="${base - h}" width="48" height="${h}" fill="${fill}" stroke="var(--ink)" stroke-width="2.5"/><path d="M${x + 24} ${base - h - 14} V${base - h + 14} M${x + 15} ${base - h - 14} H${x + 33} M${x + 15} ${base - h + 14} H${x + 33}" stroke="var(--ink)" stroke-width="2.5" fill="none"/>`;
  return `<svg class="open-questions-sketch" viewBox="0 0 400 262" role="img" aria-label="Hand-drawn bars for 2D and 3D, for signs near the body and signs away from the body. This is a drawing, not data.">${w.def}<g filter="url(#${w.id})">
    <path d="M58 22 V200 H382" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/>${bar(78, 72, '#e2e8f0')}${bar(132, 80, '#94a3b8')}${bar(238, 105, '#e2e8f0')}${bar(292, 150, '#94a3b8')}</g>
    <text x="102" y="222" text-anchor="middle" font-size="17">2D</text><text x="156" y="222" text-anchor="middle" font-size="17">3D</text><text x="262" y="222" text-anchor="middle" font-size="17">2D</text><text x="316" y="222" text-anchor="middle" font-size="17">3D</text>
    <text x="129" y="254" text-anchor="middle" font-size="20" font-weight="700">Near the body</text><text x="289" y="254" text-anchor="middle" font-size="20" font-weight="700">Away from it</text>
    <text transform="translate(34 112) rotate(-90)" text-anchor="middle" font-size="16">Score, new signers</text></svg>`; };
const oqDrawn = step => oqLine('Drawings only. Not data. Examples of what is expected to be reported.', step, 'label open-questions-banner');

st(`${oqStyle}
  <h1 class="t">Project Deep Dive: Tennis and Sign Language</h1>
  <div class="open-questions-row">
    ${oqFig('thetis-2d.jpg', 'One frame from the THETIS tennis dataset: a depth image of a player with a 2D skeleton drawn on it.', 1, 'Tennis strokes', 40)}
    ${oqFig('hand-face-pose.png', 'A body skeleton extracted from a person signing, from Moryossef et al. 2021.', 2, 'Sign language for doctors', 40)}
  </div>
  ${oqLine('Does 3D help on a new person?', 3, 'statement open-questions-say')}
  ${rdCite('THETIS: Gourgari et al., 2013 · Moryossef et al., 2021')}
`, oqN('This afternoon we go deep on one project. Two teams had two ideas, and we think they ask the same question.',
  'One team wanted to recognize tennis strokes from a skeleton.',
  'The other team wanted to recognize signs, so deaf patients and doctors can communicate.',
  'Here is the question they share. Does a 3D skeleton work better than a 2D skeleton, when the person is new?'));

st(`
  <h1 class="t">The Same Three Steps</h1>
  <div class="open-questions-row">${oqFig('stgcn-pipeline.jpg', 'Yan et al. 2018 pipeline: input video, pose estimation, graph network, action class score.', 1, 'Video. Skeleton. Action.', 44)}</div>
  ${oqLine('Both teams use these steps.', 2, 'statement open-questions-say')}
  ${rdCite('Yan et al., 2018 (ST-GCN)')}
`, oqN('Why merge these teams?',
  'This is a standard pipeline. Video goes in. A pretrained model finds the joints. A small model reads the joints and names the action. This is transfer learning: the joint finder was trained by someone else.',
  'Tennis and signing use the same three steps. So one team can build one pipeline, and test it twice.'));

st(`
  <h1 class="t">People See Actions in Dots</h1>
  <div class="open-questions-row">${oqFig('flow-points.png', 'Han et al. 2024: models trained on natural video and tested on videos of moving points at the joints.', 1, 'Train on video. Test on moving dots.', 40)}</div>
  ${oqLine('People do this with no training. Models struggle.', 2, 'statement open-questions-say')}
  ${oqLine('The joints keep a lot of the action.', 3, 'statement open-questions-say')}
  ${rdCite('Han, Wang and Zhang, 2024')}
`, oqN('This is the link to human perception.',
  'In these videos only the joints are visible, as white dots. This is called biological motion.',
  'People can name the action with no training. The paper shows that models trained on normal video struggle.',
  'So there is a good reason to study skeletons. For people, the joints carry a lot of the action.'));

st(`
  <h1 class="t">The Real Test: A New Person</h1>
  <div class="open-questions-row">
    <svg class="open-questions-sketch b" data-step="1" viewBox="0 0 560 200" role="img" aria-label="Drawing: four people used for training and one new person used for testing." style="height:28vh">
      ${[50, 130, 210, 290].map(x => oqPerson(x)).join('')}${oqPerson(480, true)}
      <text x="170" y="184" text-anchor="middle" font-size="24">Train</text><text x="480" y="184" text-anchor="middle" font-size="24">Test</text>
      <path d="M385 10 V170" stroke="var(--mute)" stroke-width="2"/></svg>
  </div>
  ${oqLine('Split by person. Never by clip.', 2, 'statement open-questions-say')}
  ${oqLine('The next patient is a new person.', 3, 'statement open-questions-say')}
`, oqN('Both teams asked about new people. This is the most important design choice.',
  'Train on some people. Test on a person the model has never seen. This picture is a drawing.',
  'If one person is in both train and test, the model can learn that person. The score looks good, but it means little.',
  'This is also why it matters. The next patient in the clinic was not in your training set.'));

section('Tennis Strokes');
/* Transition title: one project ends, the next begins (Fernanda's request). */
st(`
  <div class="center" style="margin:auto">
    <h1 class="t">Project: Tennis strokes</h1>
    <div class="statement b" data-step="1" style="margin-top:3vh">Does a 3D skeleton recognize tennis strokes better than a 2D one, on players the model has never seen?</div>
  </div>
`, oqN('Now the tennis project.', 'The general idea: does a 3D skeleton recognize strokes better than a 2D one, on new players?'));

st(`
  <h1 class="t">The Tennis Data</h1>
  <div class="open-questions-row">
    ${oqFig('thetis-modalities.jpg', 'Gourgari et al. 2013, Figure 3: snapshots of all video types for one forehand slice: color, depth, 3D skeleton, 2D skeleton and silhouette.', 1, 'One stroke, five kinds of video', 52)}
    <div class="open-questions-col">
      ${oqLine('55 players. 12 strokes.', 1)}
      ${oqLine('Beginners and experts.', 2)}
      ${oqLine('Skeletons are videos, not numbers.', 3)}
      ${oqLine('So we find the joints again.', 4)}
    </div>
  </div>
  ${rdCite('THETIS: Gourgari et al., 2013 · github.com/THETIS-dataset/dataset')}
`, oqN('The tennis team found a good public dataset, called THETIS.',
  'Fifty-five people, twelve strokes, recorded with a Kinect camera.',
  'It has 31 beginners and 24 experts. So one extra test is: train on beginners, test on experts.',
  'One problem. The public files draw the skeleton as a video. There are no joint numbers. Skeleton videos also exist for only 1,217 of the 1,980 strokes.',
  'So the plan changes. Run a pose model on the color videos, and save the joints. Then make 3D from those 2D joints.'));

st(`
  <h1 class="t">Why 3D Might Help</h1>
  <div class="open-questions-row">
    ${oqFig('thetis-2d.jpg', 'THETIS frame: 2D skeleton on a depth image of one tennis player.', 1, '2D skeleton', 42)}
    ${oqFig('thetis-3d.jpg', 'THETIS frame: 3D skeleton of the same moment in the same serve, enlarged.', 1, '3D skeleton', 42)}
  </div>
  ${oqLine('A flat picture loses depth.', 2, 'statement open-questions-say')}
  ${rdCite('THETIS, same player, same serve')}
`, oqN('First, the intuition for 3D.',
  'This is one moment of one serve, from the dataset. On the left is 2D. On the right is 3D, enlarged.',
  'A racket swing moves toward the camera and away from it. A flat picture cannot show that well. So 3D could help.'));

st(`
  <h1 class="t">3D Helps Small Hand Moves</h1>
  <div class="open-questions-row">${oqFig('body-vs-hand.png', 'Shamil et al. 2024: body joints change a lot during full-body actions, while hand joints change less during hand actions.', 1, 'The body moves a lot. The hand moves a little.', 40)}</div>
  ${oqLine('Hand actions: 3D 63.7%. 2D 58.9%.', 2, 'statement open-questions-say')}
  ${oqLine('Tennis wrists and signing hands are small moves.', 3, 'lead open-questions-say')}
  ${rdCite('Shamil et al., 2024 (Assembly101)')}
`, oqN('There is a second reason.',
  'When the whole body moves, the joints change a lot. When only the hand moves, the change is small, so precise position matters more.',
  'One paper tested this on hand actions. 3D scored 63.7 percent. 2D scored 58.9 percent.',
  'Tennis wrists and signing hands are small moves too. So our guess is that 3D could help here. This is a guess, and the project will test it.'));

st(`
  <h1 class="t">Why 3D Might Not Help</h1>
  <div class="open-questions-2x2">
    <div class="label b" data-step="1">2D pose</div>
    <img class="b" data-step="1" src="${oqA}pose-ntu-2d.jpg" alt="Duan et al. 2022: 2D poses on two people, close to the body.">
    <img class="b" data-step="1" src="${oqA}pose-gym-2d.jpg" alt="Duan et al. 2022: 2D poses on gymnasts, close to the body.">
    <div class="label b" data-step="2">3D pose</div>
    <img class="b" data-step="2" src="${oqA}pose-ntu-3d.jpg" alt="Duan et al. 2022: 3D sensor poses on the same two people, with visible errors.">
    <img class="b" data-step="2" src="${oqA}pose-gym-3d.jpg" alt="Duan et al. 2022: estimated 3D body shapes on gymnasts, with visible errors.">
  </div>
  ${oqLine('Gymnastics score: 2D 92.0. 3D made from 2D: 90.2.', 3, 'statement open-questions-say')}
  ${rdCite('Duan et al., 2022 (PoseC3D), Figure 1 and supplementary table', 1)}
`, oqN('Now the other side. A good project knows why it could fail.',
  'These are 2D poses from a modern model. They sit close to the body.',
  'These are 3D poses, from a sensor and from a 3D model. Look at the arms and the body. There are more errors.',
  'In this paper, the same model used 2D joints and then 3D joints made from 2D. 2D scored 92.0 and 3D scored 90.2 on gymnastics. So 3D did not help there.'));

st(`
  <h1 class="t">3D from One Camera Is a Guess</h1>
  <div class="open-questions-row">${oqFig('motion-finetune.png', 'Zhu et al. 2023: a video of a tennis swing becomes 2D skeletons, then a motion encoder gives a 3D pose and an action label.', 1, 'The model guesses depth from 2D joints.', 44)}</div>
  ${oqLine('No new information goes in.', 2, 'statement open-questions-say')}
  ${rdCite('Zhu et al., 2023 (MotionBERT)')}
`, oqN('This is the key idea of the whole project.',
  'With one camera, we do not measure depth. A model looks at the 2D joints and guesses the depth, from what it learned about other bodies.',
  'So the 3D skeleton has no new information from the video. It only has what the model already believes about bodies. Does that belief help? That is the experiment.'));

section('Sign Language');
/* Transition title: one project ends, the next begins (Fernanda's request). */
st(`
  <div class="center" style="margin:auto">
    <h1 class="t">Project: Sign language for doctors</h1>
    <div class="statement b" data-step="1" style="margin-top:3vh">Can a model recognize a few common signs from a phone video, on a signer it has never seen?</div>
  </div>
`, oqN('Now the sign language project.', 'The general idea: can a model recognize a few common signs from a phone video, on a new signer?'));

/* The private instructors copy adds its own slides here; this public deck adds nothing. */
if(window.PR_SIGN_TEAM) window.PR_SIGN_TEAM(st, oqN);

/* The example plan uses this project's idea, so it comes right after the idea (Fernanda's request). */
if(window.prExamplePlan) window.prExamplePlan();

st(`
  <h1 class="t">Signing: The Hand Disappears</h1>
  <div class="open-questions-row">
    ${oqFig('hand-face-photo.jpg', 'Moryossef et al. 2021: a person signing with a hand at the face.', 1, 'The hand touches the face.', 38)}
    ${oqFig('hand-face-pose.png', 'Moryossef et al. 2021: the same frame as a skeleton. The hand at the face has no hand joints.', 1, 'The tracker loses the hand.', 38)}
    ${oqFig('hand-frames-box.png', 'Moryossef et al. 2021: box plot of the percent of frames with hand pose, for wrong and correct predictions.', 2, 'Hand found: right answers 85%, wrong answers 80%', 38)}
  </div>
  ${oqLine('If the hand is lost, 3D cannot bring it back.', 3, 'statement open-questions-say')}
  ${rdCite('Moryossef et al., 2021 (AUTSL)')}
`, oqN('Signing brings one more problem.',
  'This figure is from a published paper. The hand touches the face, and the tracker loses that hand. Many health signs are made near the face and body.',
  'On average, when the model was right, the hand was found in 85 percent of frames. When the model was wrong, 80 percent.',
  'So in signing, first check whether the hand is even there. A 3D skeleton made from a missing hand cannot bring it back.'));

st(`
  <h1 class="t">What 3D Means for Sign Language</h1>
  <div class="open-questions-row">
    ${oqFig('sign-depth-avoid-behind.jpg', 'Lee et al. 2023, Figure 1: the signs Avoid and Behind look almost the same as 2D poses, and the 3D poses show the difference in depth.', 1, 'Same in 2D. Different in 3D.', 56)}
    <div class="open-questions-col">
      <table class="d6-tbl b" data-step="2">
        <tr><th>100 signs</th><th>Score</th></tr>
        <tr><td class="rowh">2D positions</td><td>60%</td></tr>
        <tr><td class="rowh">3D positions</td><td>41%</td></tr>
        <tr><td class="rowh">3D joint angles</td><td>73%</td></tr>
      </table>
      ${oqLine('Joint angles change less between people.', 3)}
      ${oqLine('MediaPipe depth is not reliable.', 4)}
    </div>
  </div>
  ${rdCite('Lee, Oh and Lee, 2023 (P3D, WLASL) · Roh et al., 2024')}
`, oqN('So what does 3D mean for signing? Here we found direct evidence.',
  'Look at the red boxes. These are two different signs, Avoid and Behind. In 2D they look almost the same. In 3D you can see the hands are at different depths.',
  'But 3D is not one thing. This paper tested three inputs on 100 signs, with new signers in the test. 2D positions scored 60 percent. 3D positions scored only 41 percent. 3D joint angles scored 73 percent. With 2,000 signs the gaps are smaller: 36, 32 and 39 percent.',
  'Why? The authors argue that positions depend on the person: body size, and where they stand. The angle of a joint changes less from person to person. That is exactly our question about a new person. Tennis can try joint angles too.',
  'One warning. MediaPipe gives a depth value, but one signing paper reports that the MediaPipe documentation calls it unreliable, and those authors did not use it. So for 3D, use a 3D body model, as this paper did. We have not tested how fast this runs on Colab. One paper is not the final answer, so this is worth testing.'));

section('Next Steps');
st(`
  <h1 class="t">What We Suggest</h1>
  <div class="open-questions-col" style="flex:1 1 auto">
    ${[['2D joints', '', 1], ['3D joints', '', 1], ['3D, shuffled depth', 'odd', 3]].map(([t, c, s]) => `<div class="open-questions-track b" data-step="${s}">
      <div class="open-questions-box label">Same clips</div><div class="open-questions-arrow">→</div>
      <div class="open-questions-box label ${c}">${t}</div><div class="open-questions-arrow">→</div>
      <div class="open-questions-box label same">Same model</div><div class="open-questions-arrow">→</div>
      <div class="open-questions-box label">Score on new people</div></div>`).join('')}
    ${oqLine('Change one thing only.', 2, 'statement open-questions-say')}
    ${oqLine('If shuffled depth ties, the depth did nothing.', 3, 'lead open-questions-say')}
    ${oqLine('Test on tennis. Then test on signs.', 4, 'statement open-questions-say')}
  </div>
`, oqN('Here is what we suggest. It is one comparison.',
  'Same clips, same model, same players held out. The only difference is two numbers or three numbers for each joint.',
  'Change one thing only. Then a difference in score has one explanation.',
  'One more row. We keep the 3D skeleton but mix up the depth values. If this row scores the same as real 3D, then the depth is not what helped.',
  'Tennis is the main experiment. Then the same test on signs, on a public dataset such as CASL-W60, with 60 signs. For signs, the 3D input comes from a 3D body model, and we also try joint angles. Two very different movements test the same idea.'));

st(`
  <h1 class="t">Examples of What to Report</h1>
  ${oqDrawn(1)}
  <div class="open-questions-row">
    <div class="b" data-step="1">${oqBars(90, 150, '3D wins', 'A hand-drawn bar sketch where 3D is higher than 2D. This is a drawing, not data.')}</div>
    <div class="b" data-step="2">${oqBars(125, 128, 'A tie', 'A hand-drawn bar sketch where 2D and 3D are equal. This is a drawing, not data.')}</div>
    <div class="b" data-step="3">${oqBars(150, 95, '2D wins', 'A hand-drawn bar sketch where 2D is higher than 3D. This is a drawing, not data.')}</div>
  </div>
  ${oqLine('All three are good results.', 4, 'statement open-questions-say')}
`, oqN('These are drawings. No experiment has been run. They show what the final figure should look like. Each bar has an error bar across the held-out people.',
  'One result is that 3D wins. Then the guessed depth really helps.',
  'A tie. Then 2D is enough, and it is simpler. Earlier papers often find this.',
  '2D wins. Then the errors in 3D cost more than the depth gives.',
  'All three are good results, if the test is fair. A tie is a finding, not a failure.'));

st(`
  <h1 class="t">Example: Which Strokes Get Confused?</h1>
  ${oqDrawn(1)}
  <div class="open-questions-row"><div class="b" data-step="1">${oqMatrix()}</div></div>
  ${oqLine('Do not report one number only. Show the errors.', 2, 'statement open-questions-say')}
`, oqN('Another drawing, not data.',
  'This is the second figure we expect. Each row is the true stroke. Each column is the answer of the model. Dark means often. Here we drew the three serves as confused, only as an example.',
  'One score hides the interesting part. Which strokes get confused? Does 3D fix them? People can also tell us which strokes look alike.'));

st(`
  <h1 class="t">Example: Signs Near the Body</h1>
  ${oqDrawn(1)}
  <div class="open-questions-row">
    <div class="b" data-step="1">${oqHandCurve()}</div>
    <div class="b" data-step="2">${oqNearBars()}</div>
  </div>
  ${oqLine('Near the body, is 3D still useful?', 3, 'statement open-questions-say')}
`, oqN('These are drawings again, not data. This is how signing joins the 2D and 3D question.',
  'First figure. How often is the hand found, at each distance from the body? This needs no training, so it can be done first. We drew the hand as lost more often near the body.',
  'Second figure. Label each sign as near the body or away from it. Then compare 2D and 3D in each group, on new signers. Here we drew 3D helping only away from the body, as one possible result.',
  'This is the question for signing. If the hand is lost near the body, 3D may not help there. Many health signs are near the body. So this result matters for the real goal.'));

st(`
  <h1 class="t">Start Small</h1>
  <div class="open-questions-col" style="flex:1 1 auto">
    ${oqLine('1. Take 20 clips. Find the joints. Time it.', 1)}
    ${oqLine('2. One model. Split by player.', 2)}
    ${oqLine('3. Then compare 2D and 3D.', 3)}
  </div>
`, oqN('Two weeks is short. So start with the smallest version that works from start to end.',
  'Finding the joints is the slow step. Do 20 clips first, and measure the time. Save the joints, so a disconnect does not lose your work.',
  'Next, one model, with players held out. This number is your baseline.',
  'Only then do the comparison. If time is short, tennis alone is a complete project.'));

st(`
  <h1 class="t">Questions for the Team</h1>
  <div class="open-questions-col" style="flex:1 1 auto">
    ${oqLine('Who does which part?', 1, 'question')}
    ${oqLine('How many different signers are in your clips?', 2, 'question')}
    ${oqLine('Did each signer agree to this use?', 3, 'question')}
    ${oqLine('What would surprise you?', 4, 'question')}
  </div>
`, oqN('These are real questions. We want to hear from you.',
  'You are now one team. The natural parts are joints, models, and figures. Decide who owns each one.',
  'With only one or two signers, we cannot test on a new signer.',
  'Consent comes first. Sign language video shows people who can be recognized. This is why we show no clips from your data today.',
  'Before you run anything, tell us what you expect. Write it down. Then see if you were right.'));
}

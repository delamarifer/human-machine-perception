/* PART: agents (Day 7). Owner: Shreya. Google deck "Day 7" (fileId 1-d7HaWYSEP3EMU8Eu3EZsc9huoF877sANLRL4F8uW2U), the slides from
   "Where does learning live?" to "Evaluation" (ids h3dcd83e50fb644af_0_25 ... _0_66), one HTML slide each, plus one added slide
   ("How the stores connect", flagged in feedback/_day.md). Her on-screen wording is kept; her build instructions are followed.
   Diagrams are redrawn so they can build click by click:
   - Types of memory: her image, captioned "Based on Malmberg et al., 2019" (full reference: to add).
   - Agent memory: Figure 1 of Lance Martin, "The components of agent memory", Anthropic (Nov 6, 2026).
   - The agent loop and the small drawings are ours. Numbers on "How the stores connect" are the post's (Figures 8 and 10).
   No speaker notes. */
{
section('Transfer Learning');

const agPost = t => d6Link('https://www.anthropic.com/research/components-of-agent-memory', 'Lance Martin, The components of agent memory, Anthropic (2026)') + (t ? ', ' + t : '');
const AG_PRE = '#f3d79f', AG_FT = '#f1a3a9';   /* same pretrained / finetuned colors as the adapt part */
const agArrowDefs = id => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#0f172a"/></marker></defs>`;

const agStyle = `<style>
  .agents-svg{ flex:1 1 auto; min-height:0; width:100%; display:block; }
  .agents-svg text{ font-family:var(--font); fill:var(--ink); }
  .agents-cards{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:repeat(3, 1fr); gap:1.6vw; align-items:stretch; }
  .agents-cards2{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:repeat(2, 1fr); gap:1.6vw; align-items:stretch; }
  .agents-cards .d6-card, .agents-cards2 .d6-card{ align-items:center; text-align:center; justify-content:flex-start; }
  .agents-cards svg{ width:100%; height:22vh; display:block; }
  .agents-cards2 .d6-card{ justify-content:center; gap:3vh; }
  .agents-cards2 svg{ width:100%; height:30vh; display:block; }
  .agents-cards svg text, .agents-cards2 svg text{ font-family:var(--font); fill:var(--ink); }
  .agents-grid4{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1fr; grid-template-rows:1fr 1fr; gap:1.6vh 1.6vw; }
  .agents-grid4 .d6-card{ justify-content:center; }
  .agents-grid4 .agents-in{ color:var(--mute); }
  .agents-list{ flex:1 1 auto; display:flex; flex-direction:column; justify-content:center; gap:4.5vh; }
  .agents-center{ flex:1 1 auto; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; gap:4vh; }
  .agents-lines{ display:flex; flex-direction:column; gap:.6vh; flex:0 0 auto; }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){
    .agents-cards, .agents-cards2, .agents-grid4{ grid-template-columns:1fr; grid-template-rows:none; gap:1.1vh; }
    .agents-cards svg, .agents-cards2 svg{ height:13vh; }
  }
</style>`;

/* ---------- _0_25: Where does learning live? Her build: 1) in the weights 2) in a smaller model 3) in the context, kept across sessions.
   Each card names the method from today that puts it there; drawings are ours. ---------- */
const agNet = `${[0, 1, 2].map(i => [0, 1, 2].map(j => `<line x1="80" y1="${50 + i * 50}" x2="190" y2="${50 + j * 50}" stroke="#0f172a" stroke-width="2.5"/><line x1="190" y1="${50 + i * 50}" x2="300" y2="${50 + j * 50}" stroke="#0f172a" stroke-width="2.5"/>`).join('')).join('')}
  ${[80, 190, 300].map(x => [50, 100, 150].map(y => `<circle cx="${x}" cy="${y}" r="15" fill="${x === 190 ? AG_FT : AG_PRE}" stroke="#0f172a" stroke-width="3"/>`).join('')).join('')}`;
const agSmall = `<path d="M 30 165 L 75 35 L 155 35 L 200 165 Z" fill="${AG_PRE}" stroke="#0f172a" stroke-width="4"/><text x="115" y="118" font-size="40" font-style="italic" text-anchor="middle">t</text>
  <line x1="210" y1="100" x2="258" y2="100" stroke="#0f172a" stroke-width="4" marker-end="url(#agW)"/>
  <path d="M 268 165 L 290 100 L 330 100 L 352 165 Z" fill="#fff" stroke="#0f172a" stroke-width="4"/><text x="310" y="150" font-size="28" font-style="italic" text-anchor="middle">f</text>`;
const agNotes = `<rect x="40" y="60" width="130" height="110" rx="8" fill="#fff" stroke="#0f172a" stroke-width="4"/>
  ${[0, 1, 2, 3].map(i => `<line x1="58" y1="${88 + i * 22}" x2="${150 - (i % 2) * 30}" y2="${88 + i * 22}" stroke="#94a3b8" stroke-width="5"/>`).join('')}
  <text x="105" y="44" font-size="22" text-anchor="middle">notes</text>
  <line x1="182" y1="115" x2="222" y2="115" stroke="#0f172a" stroke-width="4" marker-end="url(#agW)"/>
  ${[0, 1].map(i => `<rect x="${234 + i * 62}" y="78" width="52" height="74" rx="6" fill="#f1f5f9" stroke="#0f172a" stroke-width="3"/><text x="${260 + i * 62}" y="122" font-size="20" text-anchor="middle">${i + 1}</text>`).join('')}
  <text x="290" y="182" font-size="20" text-anchor="middle">sessions</text>`;
const AG_WHERE = [['In the weights', 'fine-tuning', agNet], ['In a smaller model', 'knowledge distillation', agSmall], ['In the context, kept across sessions', 'agent memory', agNotes]];
st(`${agStyle}
  <h1 class="t">Where does learning live?</h1>
  <svg width="0" height="0" style="position:absolute">${agArrowDefs('agW')}</svg>
  <div class="agents-cards">
    ${AG_WHERE.map(([h, m, g], i) => `<div class="d6-card b" data-step="${i + 1}"><svg viewBox="0 0 380 200" aria-hidden="true">${g}</svg><div class="lead"><b>${i + 1}. ${h}</b></div><div class="label">${m}</div></div>`).join('')}
  </div>
  ${rdCite('Our drawings')}
`);

/* ---------- Shreya (2026-11-09): once the slides reach agents, a section of its own, so the progress bar shows the class has moved past
   transfer learning. "Where does learning live?" stays above as the bridge. Opens on a transition slide like the adapt part's. ---------- */
section('Agents and Memory');
st(`
  <div class="adapt-transition" style="flex:1 1 auto;display:flex;align-items:center;justify-content:center;text-align:center">
    <h1 class="t" style="font-size:clamp(2.4rem, 5vw, 4.6rem);line-height:1.16">Agents and Memory</h1>
  </div>
`);

/* ---------- _0_30: From model to agent. Her three lines, then her request: "a diagram of an agent loop with all the main parts,
   agent, tools, etc. it should be computer vision related". Shreya (2026-11-09): a richer diagram and a concrete CV example.
   Slide 1: the loop part by part (our drawing). Slide 2: one pass around the loop on one task (our drawing, illustrative). ---------- */
const agFrame = (x, y, w, h, opt = {}) => {   /* a camera frame: wall, table, mug (handle on the right), sink on the right */
  const X = v => x + v * w, Y = v => y + v * h;
  const mx = opt.inSink ? .74 : .3, my = opt.inSink ? .5 : .46;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#eef2f6"/>
    <rect x="${x}" y="${Y(.58)}" width="${w}" height="${h * .42}" fill="#d6c7ad"/>
    <rect x="${X(.62)}" y="${Y(.5)}" width="${w * .3}" height="${h * .16}" rx="4" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
    <rect x="${X(.66)}" y="${Y(.53)}" width="${w * .22}" height="${h * .08}" rx="3" fill="#94a3b8"/>
    ${opt.inSink ? '' : `<rect x="${X(mx)}" y="${Y(my)}" width="${w * .12}" height="${h * .18}" rx="3" fill="#b45f4e" stroke="#0f172a" stroke-width="2"/>
    <path d="M ${X(mx + .12)} ${Y(my + .04)} q ${w * .07} ${h * .05} 0 ${h * .1}" fill="none" stroke="#0f172a" stroke-width="3"/>`}
    ${opt.boxes ? `<rect x="${X(mx - .03)}" y="${Y(my - .05)}" width="${w * .25}" height="${h * .28}" fill="none" stroke="#0f172a" stroke-width="2.5" stroke-dasharray="6 4"/>
      <text x="${X(mx - .03)}" y="${Y(my - .08)}" font-size="17" font-weight="700">mug</text>
      <rect x="${X(.6)}" y="${Y(.46)}" width="${w * .34}" height="${h * .24}" fill="none" stroke="#0f172a" stroke-width="2.5" stroke-dasharray="6 4"/>
      <text x="${X(.6)}" y="${Y(.43)}" font-size="17" font-weight="700">sink</text>` : ''}
    ${opt.grip ? `<path d="M ${X(mx + .04)} ${y} V ${Y(my - .06)} M ${X(mx + .1)} ${y} V ${Y(my - .06)}" stroke="#334155" stroke-width="7"/>
      <path d="M ${X(mx + .02)} ${Y(my - .06)} h ${w * .1} M ${X(mx + .02)} ${Y(my - .06)} v ${h * .12} M ${X(mx + .12)} ${Y(my - .06)} v ${h * .12}" stroke="#334155" stroke-width="5" fill="none"/>` : ''}
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#0f172a" stroke-width="2.5"/>`;
};
const agBox = (x, y, w, h, title, lines, fill = '#fff', dash = false) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${fill}" stroke="#0f172a" stroke-width="3"${dash ? ' stroke-dasharray="8 5"' : ''}/>
  <text x="${x + w / 2}" y="${y + 34}" font-size="25" font-weight="700" text-anchor="middle">${title}</text>
  ${lines.map((t, i) => `<text x="${x + w / 2}" y="${y + 66 + i * 27}" font-size="19" text-anchor="middle">${t}</text>`).join('')}`;
const agLine = (x1, y1, x2, y2, t, ty = -10) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#0f172a" stroke-width="3" marker-end="url(#agL)"/>
  ${t ? `<text x="${(x1 + x2) / 2}" y="${(y1 + y2) / 2 + ty}" font-size="19" text-anchor="middle">${t}</text>` : ''}`;
st(`
  <h1 class="t">From model to agent</h1>
  <div class="agents-lines">
    <div class="lead b" data-step="1">We aren’t typically operating in isolation with a model</div>
    <div class="lead b" data-step="2">The model fits into a broader system</div>
    <div class="lead b" data-step="3">a loop of perceive (screen or camera) → decide → act → remember</div>
  </div>
  <svg class="agents-svg" viewBox="0 0 1180 430" role="img" aria-label="The agent loop. A camera or screen gives an image to perception models that detect objects, segment and estimate depth. Their output and the task go to the agent, a vision-language model that plans and picks the next action. Actions such as click, type, move the arm and grasp change the environment, which gives a new image. The agent reads and writes memory.">
    ${agArrowDefs('agL')}
    <g class="b" data-step="3">
      ${agFrame(20, 120, 200, 140)}
      <text x="120" y="290" font-size="23" font-weight="700" text-anchor="middle">Environment</text>
      <text x="120" y="316" font-size="18" text-anchor="middle">camera or screen</text>
      ${agLine(226, 190, 286, 190, 'image')}
    </g>
    <g class="b" data-step="4">
      ${agBox(292, 108, 220, 164, 'Perception', ['detect objects', 'segment', 'estimate depth'], '#f8fafc')}
      ${agLine(518, 190, 584, 190, 'objects,')}<text x="551" y="214" font-size="19" text-anchor="middle">masks</text>
    </g>
    <g class="b" data-step="5">
      <rect x="600" y="0" width="210" height="48" rx="10" fill="#fff" stroke="#0f172a" stroke-width="2.5"/>
      <text x="705" y="31" font-size="20" text-anchor="middle"><tspan font-weight="700">Task:</tspan> mug → sink</text>
      ${agLine(705, 52, 705, 100)}
      ${agBox(590, 108, 230, 164, 'Agent', ['vision-language model', 'plans the steps', 'picks the next action'], '#e2e8f0')}
    </g>
    <g class="b" data-step="6">
      ${agLine(826, 190, 886, 190, 'decide')}
      ${agBox(892, 108, 270, 164, 'Actions', ['screen: click, type, scroll', 'robot: move the arm,', 'grasp, release'])}
      <path d="M 1027 278 C 1027 420, 120 420, 120 326" fill="none" stroke="#0f172a" stroke-width="3" marker-end="url(#agL)"/>
      <rect x="470" y="380" width="260" height="34" fill="#fff"/>
      <text x="600" y="404" font-size="20" font-weight="700" text-anchor="middle">act: the world changes</text>
    </g>
    <g class="b" data-step="7">
      ${agBox(612, 300, 186, 62, 'Memory', [], '#fff', true)}
      <line x1="690" y1="276" x2="690" y2="294" stroke="#0f172a" stroke-width="3" marker-end="url(#agL)"/>
      <line x1="720" y1="296" x2="720" y2="280" stroke="#0f172a" stroke-width="3" marker-end="url(#agL)"/>
      <text x="808" y="296" font-size="19">read · write</text>
    </g>
  </svg>
  ${rdCite('Our drawing', 3)}
`);

/* Same title, so the engine numbers it as the second half of this slide. One pass: task, see, perceive, decide, act, remember.
   The scene, the model's answer and the note are an illustrative example, not a real run. */
const AG_PASS = [
  ['1. See', 'camera frame', o => agFrame(0, 0, 200, 140, o), {}],
  ['2. Perceive', 'detector: mug, sink', o => agFrame(0, 0, 200, 140, o), {boxes: true}],
  ['3. Decide', 'the model picks an action', () => `<rect x="0" y="10" width="200" height="120" rx="12" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.5"/>
      <text x="100" y="56" font-size="18" text-anchor="middle">“grasp the mug</text><text x="100" y="80" font-size="18" text-anchor="middle">by its handle,</text><text x="100" y="104" font-size="18" text-anchor="middle">then move right”</text>`, {}],
  ['4. Act', 'arm grasps; new frame', o => agFrame(0, 0, 200, 140, o), {grip: true}],
  ['5. Remember', 'a note for next time', () => `<rect x="20" y="4" width="160" height="132" rx="6" fill="#fff" stroke="#0f172a" stroke-width="2.5"/>
      ${['mugs: grasp by', 'the handle', 'sink: right of', 'the counter'].map((t, i) => `<text x="34" y="${36 + i * 27}" font-size="17">${t}</text>`).join('')}`, {}],
];
st(`
  <h1 class="t">From model to agent</h1>
  <div class="lead b" data-step="1"><b>One pass around the loop.</b> Task: put the mug in the sink.</div>
  <svg class="agents-svg" viewBox="0 0 1180 300" role="img" aria-label="One pass around the agent loop for the task put the mug in the sink: see the camera frame, perceive the mug and sink with a detector, decide to grasp the mug by its handle, act so the arm grasps it and a new frame arrives, and remember a note for next time.">
    ${agArrowDefs('agP')}
    ${AG_PASS.map(([h, t, g, o], i) => `<g class="b" data-step="${i + 1}"><g transform="translate(${10 + i * 236},40)">
      ${i ? `<line x1="-32" y1="70" x2="-6" y2="70" stroke="#0f172a" stroke-width="3" marker-end="url(#agP)"/>` : ''}
      ${g(o)}
      <text x="100" y="184" font-size="23" font-weight="700" text-anchor="middle">${h}</text>
      <text x="100" y="212" font-size="18" text-anchor="middle">${t}</text>
    </g></g>`).join('')}
  </svg>
  <div class="lead b" data-step="6" style="text-align:center">Next frame → perceive again. The note is read at the start of the next task.</div>
  ${rdCite('Our drawing; an illustrative example, not a real run')}
`);

/* ---------- _0_35: Current Challenges. Her two lines, one per click, each with our drawing. ---------- */
const agForget = `${Array.from({length: 12}, (_, i) => `<rect x="${20 + i * 28}" y="70" width="22" height="40" rx="3" fill="${i < 7 ? '#e2e8f0' : '#94a3b8'}" stroke="#0f172a" stroke-width="2"/>`).join('')}
  <rect x="210" y="56" width="152" height="68" rx="8" fill="none" stroke="#0f172a" stroke-width="3.5"/>
  <text x="286" y="44" font-size="20" text-anchor="middle">what fits in context</text>
  <text x="104" y="150" font-size="20" text-anchor="middle">early steps</text><text x="286" y="150" font-size="20" text-anchor="middle">recent steps</text>
  <line x1="20" y1="180" x2="356" y2="180" stroke="#0f172a" stroke-width="3" marker-end="url(#agC)"/><text x="188" y="200" font-size="18" text-anchor="middle" fill="#64748b">a long-horizon task</text>`;
const agShare = `${[0, 1, 2].map(i => `<rect x="${30 + i * 112}" y="20" width="92" height="56" rx="8" fill="#fff" stroke="#0f172a" stroke-width="3"/><text x="${76 + i * 112}" y="55" font-size="20" text-anchor="middle">${i < 2 ? 'session ' + (i + 1) : 'agent B'}</text>
  <line x1="${76 + i * 112}" y1="78" x2="${170 + i * 20}" y2="126" stroke="#0f172a" stroke-width="2.5"/>`).join('')}
  <rect x="120" y="128" width="140" height="56" rx="8" fill="#f1f5f9" stroke="#0f172a" stroke-width="3" stroke-dasharray="7 5"/><text x="190" y="163" font-size="20" text-anchor="middle">shared context</text>`;
st(`
  <h1 class="t">Current Challenges</h1>
  <svg width="0" height="0" style="position:absolute">${agArrowDefs('agC')}</svg>
  <div class="agents-cards2">
    <div class="d6-card b" data-step="1"><svg viewBox="0 0 380 210" aria-hidden="true">${agForget}</svg>
      <div class="lead">Similar to what we see at the weight level, we can see forgetting on long horizon tasks</div></div>
    <div class="d6-card b" data-step="2"><svg viewBox="0 0 380 210" aria-hidden="true">${agShare}</svg>
      <div class="lead">Context shared across multi session or multi agents</div></div>
  </div>
  ${rdCite('Our drawings')}
`);

/* ---------- _0_48: Types of memory. Her image redrawn as a tree that builds: the two kinds, then each kind's two types. ---------- */
const agTNode = (cx, y, w, h, title, sub, bold) => `<rect x="${cx - w / 2}" y="${y}" width="${w}" height="${h}" rx="10" fill="${bold ? '#f1f5f9' : '#fff'}" stroke="#0f172a" stroke-width="2.5"/>
  <text x="${cx}" y="${y + (sub.length ? 36 : h / 2 + 10)}" font-size="26" font-weight="700" text-anchor="middle">${title}</text>
  ${sub.map((s, i) => `<text x="${cx}" y="${y + 66 + i * 28}" font-size="21" font-style="italic" text-anchor="middle">${s}</text>`).join('')}`;
const agElbow = (x1, y1, x2, y2) => `<path d="M${x1},${y1} V${(y1 + y2) / 2} H${x2} V${y2}" fill="none" stroke="#0f172a" stroke-width="2.5"/>`;
st(`
  <h1 class="t">Types of memory</h1>
  <svg class="agents-svg" viewBox="0 0 1120 470" role="img" aria-label="Types of long-term memory. Explicit or declarative, with conscious recall: semantic, facts and general knowledge; episodic, personal experiences and events. Implicit or non-declarative, without conscious recall: procedural, motor skills and how to do things; emotional, classical conditioning of emotional reactions.">
    <g class="b" data-step="1">
      ${agTNode(560, 10, 420, 60, 'Long-term memory', [], true)}
      ${agElbow(560, 70, 290, 130)}${agElbow(560, 70, 830, 130)}
      ${agTNode(290, 130, 330, 110, 'Explicit · declarative', ['with conscious recall'])}
      ${agTNode(830, 130, 330, 110, 'Implicit · non-declarative', ['without conscious recall'])}
    </g>
    <g class="b" data-step="2">
      ${agElbow(290, 240, 155, 300)}${agElbow(290, 240, 425, 300)}
      ${agTNode(155, 300, 250, 140, 'Semantic', ['facts and definitions', 'general knowledge'])}
      ${agTNode(425, 300, 250, 140, 'Episodic', ['personal experiences', 'and events'])}
    </g>
    <g class="b" data-step="3">
      ${agElbow(830, 240, 695, 300)}${agElbow(830, 240, 965, 300)}
      ${agTNode(695, 300, 250, 140, 'Procedural', ['motor skills', 'how to do things'])}
      ${agTNode(965, 300, 250, 140, 'Emotional', ['classical conditioning', 'of emotional reactions'])}
    </g>
  </svg>
  ${rdCite('Based on Malmberg et al., 2019 (as on our Google slide; full reference: to add) · redrawn')}
`);

/* ---------- _0_78: Memory in humans. Her four cues build a schematic (our drawing, not anatomy): experience → hippocampus (fast, an index)
   → replay during sleep → neocortex (slow, general knowledge, schemas) → recall makes it editable again. The last click lines each
   one up with its agent counterpart (the Anthropic post's own comparison, and the one-file-per-fact memory of this deck's sessions).
   References checked on PubMed 2026-11-09: McClelland 1995, Teyler 1986, Tse 2007. Nader 2000: not yet checked (logged). ---------- */
const AG_HUMAN = [
  ['Hippocampus', 'transcripts and notes, an index file'],
  ['Replay during sleep', 'dreaming: an offline pass over past sessions'],
  ['Existing schema', 'add to an existing wiki page, not a new file'],
  ['Recalling a memory', 'a note is checked and corrected when it is read'],
];
const agTrace = (x, y) => `<circle cx="${x}" cy="${y}" r="9" fill="${AG_PRE}" stroke="#0f172a" stroke-width="2"/>`;
const AG_TR = [[520, 130], [600, 100], [660, 160], [560, 200], [640, 230]];
const AG_ROWY = [90, 200, 300, 400];
st(`
  <h1 class="t">Memory in humans</h1>
  <svg class="agents-svg" viewBox="0 0 1180 450" role="img" aria-label="Schematic of memory in humans. An experience is captured fast by the hippocampus, which keeps an index pointing to traces across the neocortex. During sleep, recent experiences are replayed and slowly folded into the neocortex. New information that fits an existing schema is consolidated faster. Recalling a memory makes it editable again. Each step is matched with its counterpart in an agent.">
    ${agArrowDefs('agH')}
    <g class="b" data-step="1">
      <rect x="20" y="62" width="120" height="56" rx="10" fill="#fff" stroke="#0f172a" stroke-width="2.5"/>
      <text x="80" y="97" font-size="21" text-anchor="middle">experience</text>
      <line x1="144" y1="90" x2="186" y2="90" stroke="#0f172a" stroke-width="3" marker-end="url(#agH)"/>
      <rect x="192" y="40" width="210" height="100" rx="12" fill="#e2e8f0" stroke="#0f172a" stroke-width="3"/>
      <text x="297" y="78" font-size="25" font-weight="700" text-anchor="middle">Hippocampus</text>
      <text x="297" y="106" font-size="19" text-anchor="middle">fast · keeps an index</text>
      <rect x="452" y="40" width="300" height="380" rx="18" fill="#f8fafc" stroke="#0f172a" stroke-width="3"/>
      <text x="602" y="72" font-size="25" font-weight="700" text-anchor="middle">Neocortex</text>
      ${AG_TR.map(([x, y]) => agTrace(x, y)).join('')}
      ${AG_TR.map(([x, y]) => `<line x1="404" y1="90" x2="${x - 10}" y2="${y}" stroke="#64748b" stroke-width="1.6" stroke-dasharray="4 4"/>`).join('')}
    </g>
    <g class="b" data-step="2">
      <path d="M 297 144 C 297 250, 380 270, 470 270" fill="none" stroke="#0f172a" stroke-width="3" marker-end="url(#agH)"/>
      <path d="M 222 226 a 18 18 0 1 0 22 -24 a 14 14 0 1 1 -22 24 z" fill="#0f172a"/>
      <text x="100" y="268" font-size="20">replay during sleep</text>
      <text x="602" y="276" font-size="19" text-anchor="middle">slow · general knowledge</text>
    </g>
    <g class="b" data-step="3">
      <line x1="520" y1="130" x2="600" y2="100" stroke="#0f172a" stroke-width="2.5"/><line x1="600" y1="100" x2="660" y2="160" stroke="#0f172a" stroke-width="2.5"/>
      <line x1="520" y1="130" x2="560" y2="200" stroke="#0f172a" stroke-width="2.5"/><line x1="560" y1="200" x2="660" y2="160" stroke="#0f172a" stroke-width="2.5"/>
      <line x1="660" y1="160" x2="640" y2="230" stroke="#0f172a" stroke-width="2.5"/>
      <circle cx="712" cy="214" r="10" fill="${AG_FT}" stroke="#0f172a" stroke-width="2.5"/>
      <line x1="702" y1="219" x2="650" y2="230" stroke="#0f172a" stroke-width="2.5" stroke-dasharray="5 3"/>
      <text x="602" y="312" font-size="19" text-anchor="middle">fits an existing schema → faster</text>
    </g>
    <g class="b" data-step="4">
      <line x1="448" y1="356" x2="338" y2="356" stroke="#0f172a" stroke-width="3" marker-end="url(#agH)"/>
      <line x1="338" y1="396" x2="446" y2="396" stroke="#0f172a" stroke-width="3" stroke-dasharray="7 5" marker-end="url(#agH)"/>
      <text x="320" y="363" font-size="20" text-anchor="end">recall</text>
      <text x="320" y="403" font-size="20" text-anchor="end">editable again</text>
    </g>
    <g class="b" data-step="5">
      <line x1="782" y1="30" x2="782" y2="430" stroke="#cbd5e1" stroke-width="2"/>
      <text x="800" y="44" font-size="21" font-weight="700">In an agent</text>
      ${AG_HUMAN.map(([h, a], i) => `<text x="800" y="${AG_ROWY[i] + 2}" font-size="19" font-weight="700">${h}</text>
        <text x="800" y="${AG_ROWY[i] + 28}" font-size="18">${a.length > 34 ? a.slice(0, a.lastIndexOf(' ', 34)) : a}</text>
        ${a.length > 34 ? `<text x="800" y="${AG_ROWY[i] + 52}" font-size="18">${a.slice(a.lastIndexOf(' ', 34) + 1)}</text>` : ''}`).join('')}
    </g>
  </svg>
  ${rdCite(d6Link('https://pubmed.ncbi.nlm.nih.gov/7624455/', 'McClelland, McNaughton, O’Reilly (1995)') + ' · ' + d6Link('https://pubmed.ncbi.nlm.nih.gov/3008780/', 'Teyler, DiScenna (1986)') + ' · '
    + d6Link('https://pubmed.ncbi.nlm.nih.gov/17412951/', 'Tse et al. (2007)') + ' · Nader, Schafe, LeDoux (2000) · our schematic, not anatomy')}
  <div class="cite b" data-step="5" style="margin-top:0;padding-top:0">Agent side: ${agPost('')}</div>
`);

/* ---------- _0_72: Agent memory, her image = the post's Figure 1, redrawn to build bottom to top, then dreaming, then the next session.
   Box titles and subtitles are the figure's. ---------- */
const AG_STORES = [
  ['Transcripts', 'Searchable event log', 160, 840],
  ['Memory notes', 'Salient observations written by Claude', 220, 740],
  ['Memory representations', 'Computed from transcripts, notes (e.g., wikis)', 280, 640],
  ['Injected context', 'Memory loaded into every session', 340, 520],
];
const agStoreY = i => 370 - i * 92;
st(`
  <h1 class="t">Agent memory</h1>
  <svg class="agents-svg" viewBox="0 0 1180 470" role="img" aria-label="Agent memory. A session writes transcripts, a searchable event log. Above it, memory notes written by Claude, then memory representations such as wikis, then injected context loaded into every session. Dreaming reads the transcripts and updates every layer above, and the next session starts from them.">
    ${agArrowDefs('agM')}
    <g class="b" data-step="1">
      <rect x="20" y="40" width="120" height="400" rx="10" fill="#fff" stroke="#0f172a" stroke-width="2.5"/>
      <text x="80" y="248" font-size="24" font-weight="700" text-anchor="middle">Session</text>
      <line x1="146" y1="${agStoreY(0) + 34}" x2="${AG_STORES[0][2] + 34}" y2="${agStoreY(0) + 34}" stroke="#0f172a" stroke-width="2.5" marker-end="url(#agM)"/>
    </g>
    ${AG_STORES.map(([t, s, x, w], i) => `<g class="b" data-step="${i + 1}">
      <rect x="${x + 40}" y="${agStoreY(i)}" width="${w}" height="68" rx="10" fill="#fff" stroke="#0f172a" stroke-width="2.5"/>
      <text x="${x + 62}" y="${agStoreY(i) + 30}" font-size="23" font-weight="700">${t}</text>
      <text x="${x + 62}" y="${agStoreY(i) + 56}" font-size="19" fill="#475569">${s}</text>
      ${i ? `<line x1="${x + 140}" y1="${agStoreY(i) + 70}" x2="${x + 140}" y2="${agStoreY(i - 1) - 4}" stroke="#0f172a" stroke-width="2" stroke-dasharray="5 4"/>` : ''}
    </g>`).join('')}
    <g class="b" data-step="5">
      <rect x="168" y="24" width="890" height="432" rx="14" fill="none" stroke="#0f172a" stroke-width="2.5" stroke-dasharray="10 7"/>
      <text x="190" y="58" font-size="24" font-weight="700">Dreaming</text>
      ${[1, 2, 3].map(i => `<path d="M ${254 - i * 14} ${agStoreY(0)} V ${agStoreY(i) + 34} H ${AG_STORES[i][2] + 34}" fill="none" stroke="#0f172a" stroke-width="2.5" marker-end="url(#agM)"/>`).join('')}
    </g>
    <g class="b" data-step="6">
      <line x1="1060" y1="240" x2="1080" y2="240" stroke="#0f172a" stroke-width="2.5" marker-end="url(#agM)"/>
      <rect x="1086" y="40" width="84" height="400" rx="10" fill="#fff" stroke="#0f172a" stroke-width="2.5"/>
      <text x="1128" y="236" font-size="22" font-weight="700" text-anchor="middle">Next</text>
      <text x="1128" y="262" font-size="22" font-weight="700" text-anchor="middle">session</text>
    </g>
  </svg>
  ${rdCite(agPost('Figure 1, redrawn'))}
`);

/* ---------- Added (not in her Google deck; see feedback): how the stores connect. Write up, read down, correct.
   Example numbers are the post's: Mt. Moon (Figures 6 to 8) and the wiki graph (Figure 10). ---------- */
st(`
  <h1 class="t">How the stores connect</h1>
  <div class="agents-grid4">
    <div class="d6-card b" data-step="1"><div class="lead"><b>Write up</b></div>
      <div class="label">session → transcript → notes → wiki → injected context: each layer smaller and more abstract</div></div>
    <div class="d6-card b" data-step="2"><div class="lead"><b>Read down</b></div>
      <div class="label">injected context is always loaded; wiki pages are followed by links; transcripts are searched</div></div>
    <div class="d6-card b" data-step="3"><div class="lead"><b>Correct</b></div>
      <div class="label">dreaming checks notes against transcripts: a wrong “Mt Moon DONE” note was fixed, and Claude got through</div></div>
    <div class="d6-card b" data-step="4"><div class="lead"><b>Links carry the knowledge</b></div>
      <div class="label">a dreamed wiki: 103 pages, 766 links after 2 sessions → 222 pages, 12,893 links after 128</div></div>
  </div>
  ${rdCite(agPost('Claude Plays Pokémon (Figures 6–8) and the wiki graph (Figure 10)'))}
`);

/* ---------- _0_54: Agent memory, her three lines. ---------- */
st(`
  <h1 class="t">Agent memory</h1>
  <div class="agents-list">
    <div class="lead b" data-step="1">Many researchers and companies exploring this space</div>
    <div class="lead b" data-step="2">Open questions on how this is handled beyond a text level</div>
    <div class="lead b" data-step="3">Open questions on the structure of storing information and the relation to one another</div>
  </div>
`);

/* ---------- _0_66: Evaluation. Her two lines, then (Shreya, 2026-11-09: make it concrete) the aspects to discuss, one per click,
   each with what you would measure and an example from the Anthropic post. Second slide: the post's Figure 3 numbers. ---------- */
const AG_EVAL = [
  ['Does it help?', 'task score with memory vs without', 'database task: higher with memory for all 6 models, by 0.03 to 0.32'],
  ['Is the memory right?', 'notes checked against what happened', 'a wrong “Mt Moon DONE” note made Claude loop'],
  ['Is it used?', 'how often the right note is read in time', 'Sonnet 5 read memory first 9 of 10 times; Sonnet 4.6 under half'],
  ['What does it cost?', 'tokens, compute, memory size', 'one wiki grew to 1.77× its source'],
  ['Does it keep improving?', 'score across sessions and across tasks', 'wiki helped multi-document questions, not single-document ones'],
];
st(`
  <h1 class="t">Evaluation</h1>
  <div class="agents-lines">
    <div class="lead b" data-step="1">This can be tricky</div>
    <div class="lead b" data-step="2"><b>Think about the different aspects of how you would evaluate this</b></div>
  </div>
  <table class="d6-tbl" style="width:100%;margin-top:2vh;font-size:clamp(.95rem,1.55vw,1.5rem)">
    <tr class="b" data-step="3"><th style="text-align:left">Aspect</th><th style="text-align:left">Measure</th><th style="text-align:left">Example</th></tr>
    ${AG_EVAL.map(([a, m, e], i) => `<tr class="b" data-step="${i + 3}"><td class="rowh">${a}</td><td style="text-align:left">${m}</td><td style="text-align:left">${e}</td></tr>`).join('')}
  </table>
  ${rdCite(agPost('Figures 3, 5, 6–8, 11 and 12'), 3)}
`);

/* Second slide: Figure 3 of the post, CL-Bench 1.0 database task, mean reward, stateless vs memory store (read from the post). */
const AG_CL = [['Opus 5.5', .655, .838], ['Sonnet 5.5', .644, .833], ['Opus 5', .564, .828], ['Opus 4.7', .383, .700], ['Sonnet 5', .306, .610], ['Sonnet 4.6', .330, .364]];
const AG_BX = 250, AG_BW = 780;
st(`
  <h1 class="t">Evaluation</h1>
  <div class="lead b" data-step="1">One test: the same 30 database questions, with and without a memory store</div>
  <svg class="agents-svg" viewBox="0 0 1180 400" role="img" aria-label="Mean reward on a database task without and with a memory store. ${AG_CL.map(([m, a, b]) => `${m}: ${a} without, ${b} with`).join('; ')}.">
    <g class="b" data-step="1">
      <line x1="${AG_BX}" y1="10" x2="${AG_BX}" y2="${20 + AG_CL.length * 60}" stroke="#94a3b8" stroke-width="2"/>
      ${AG_CL.map(([m], i) => `<text x="${AG_BX - 14}" y="${50 + i * 60}" font-size="22" font-weight="700" text-anchor="end">${m}</text>`).join('')}
      <rect x="${AG_BX}" y="${30 + AG_CL.length * 60}" width="18" height="18" fill="#cbd5e1" stroke="#0f172a"/><text x="${AG_BX + 26}" y="${45 + AG_CL.length * 60}" font-size="20">no memory</text>
    </g>
    <g class="b" data-step="2">${AG_CL.map(([, a], i) => `<rect x="${AG_BX}" y="${22 + i * 60}" width="${a * AG_BW}" height="22" fill="#cbd5e1" stroke="#0f172a" stroke-width="1.5"/>
      <text x="${AG_BX + a * AG_BW + 8}" y="${40 + i * 60}" font-size="18">${a.toFixed(3)}</text>`).join('')}</g>
    <g class="b" data-step="3">${AG_CL.map(([, , b], i) => `<rect x="${AG_BX}" y="${46 + i * 60}" width="${b * AG_BW}" height="22" fill="#0f172a"/>
      <text x="${AG_BX + b * AG_BW + 8}" y="${64 + i * 60}" font-size="18" font-weight="700">${b.toFixed(3)}</text>`).join('')}
      <rect x="${AG_BX + 180}" y="${30 + AG_CL.length * 60}" width="18" height="18" fill="#0f172a"/><text x="${AG_BX + 206}" y="${45 + AG_CL.length * 60}" font-size="20">memory store</text>
      <text x="${AG_BX + 400}" y="${45 + AG_CL.length * 60}" font-size="20" fill="#64748b">mean reward (0 to 1)</text></g>
  </svg>
  <div class="lead b" data-step="4" style="text-align:center">Same memory, very different gains: what the model writes and reads matters</div>
  ${rdCite(agPost('Figure 3 (CL-Bench 1.0, internal evaluation)'))}
`);
}

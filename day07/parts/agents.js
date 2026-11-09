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

/* ---------- _0_30: From model to agent. Her three lines, then her request: "a diagram of an agent loop with all the main parts,
   agent, tools, etc. it should be computer vision related". Our drawing: the loop builds one stage per click,
   perceive → decide → act → remember. ---------- */
const agScreen = (x, y) => `<rect x="${x}" y="${y}" width="230" height="150" rx="10" fill="#fff" stroke="#0f172a" stroke-width="3.5"/>
  <rect x="${x + 14}" y="${y + 14}" width="202" height="104" rx="4" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/>
  <rect x="${x + 28}" y="${y + 30}" width="80" height="58" rx="4" fill="#bcd3e6"/><circle cx="${x + 92}" cy="${y + 44}" r="8" fill="#f3d79f"/>
  <path d="M ${x + 28} ${y + 88} l 26 -26 l 18 16 l 14 -10 l 22 20 z" fill="#3f7a3a"/>
  <rect x="${x + 128}" y="${y + 74}" width="72" height="26" rx="6" fill="#0f172a"/><text x="${x + 164}" y="${y + 93}" font-size="16" font-weight="700" text-anchor="middle" style="fill:#fff">Submit</text>
  <path d="M ${x + 180} ${y + 86} l 0 26 l 7 -7 l 9 14 l 5 -3 l -9 -13 l 10 -2 z" fill="#0f172a" stroke="#fff" stroke-width="1.5"/>
  <circle cx="${x + 196}" cy="${y + 136}" r="9" fill="#0f172a"/><circle cx="${x + 196}" cy="${y + 136}" r="4" fill="#fff"/>`;
const AG_TOOLS = ['detect objects', 'segment', 'estimate depth', 'click (x, y)', 'move the robot arm'];
st(`
  <h1 class="t">From model to agent</h1>
  <div class="agents-lines">
    <div class="lead b" data-step="1">We aren’t typically operating in isolation with a model</div>
    <div class="lead b" data-step="2">The model fits into a broader system</div>
    <div class="lead b" data-step="3">a loop of perceive (screen or camera) → decide → act → remember</div>
  </div>
  <svg class="agents-svg" viewBox="0 0 1180 400" role="img" aria-label="An agent loop. The environment, a screen or camera, is perceived as an image by the agent, a vision-language model. The agent decides which tool to call: detect objects, segment, estimate depth, click, or move a robot arm. The tools act on the environment. The agent reads and writes a memory.">
    ${agArrowDefs('agL')}
    <g class="b" data-step="3">
      ${agScreen(20, 70)}
      <text x="135" y="256" font-size="24" font-weight="700" text-anchor="middle">Environment</text>
      <text x="135" y="284" font-size="20" text-anchor="middle">screen or camera</text>
      <line x1="258" y1="145" x2="440" y2="145" stroke="#0f172a" stroke-width="3.5" marker-end="url(#agL)"/>
      <text x="349" y="132" font-size="22" text-anchor="middle">perceive: image</text>
    </g>
    <g class="b" data-step="4">
      <rect x="450" y="90" width="250" height="110" rx="14" fill="#e2e8f0" stroke="#0f172a" stroke-width="3.5"/>
      <text x="575" y="138" font-size="28" font-weight="700" text-anchor="middle">Agent</text>
      <text x="575" y="170" font-size="20" text-anchor="middle">vision-language model</text>
      <line x1="706" y1="145" x2="842" y2="145" stroke="#0f172a" stroke-width="3.5" marker-end="url(#agL)"/>
      <text x="774" y="132" font-size="22" text-anchor="middle">decide</text>
      <rect x="852" y="20" width="310" height="${AG_TOOLS.length * 44 + 56}" rx="12" fill="#fff" stroke="#0f172a" stroke-width="3.5"/>
      <text x="1007" y="54" font-size="24" font-weight="700" text-anchor="middle">Tools</text>
      ${AG_TOOLS.map((t, i) => `<text x="880" y="${94 + i * 44}" font-size="21">· ${t}</text>`).join('')}
    </g>
    <g class="b" data-step="5">
      <path d="M 1007 ${20 + AG_TOOLS.length * 44 + 60} C 1007 390, 135 390, 135 296" fill="none" stroke="#0f172a" stroke-width="3.5" marker-end="url(#agL)"/>
      <rect x="520" y="352" width="140" height="34" fill="#fff"/>
      <text x="590" y="378" font-size="22" font-weight="700" text-anchor="middle">act</text>
    </g>
    <g class="b" data-step="6">
      <rect x="490" y="250" width="170" height="70" rx="10" fill="#fff" stroke="#0f172a" stroke-width="3" stroke-dasharray="8 5"/>
      <text x="575" y="294" font-size="24" font-weight="700" text-anchor="middle">Memory</text>
      <line x1="560" y1="206" x2="560" y2="244" stroke="#0f172a" stroke-width="3" marker-end="url(#agL)"/>
      <line x1="590" y1="246" x2="590" y2="208" stroke="#0f172a" stroke-width="3" marker-end="url(#agL)"/>
      <text x="682" y="232" font-size="22">remember</text>
    </g>
  </svg>
  ${rdCite('Our drawing', 3)}
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

/* ---------- _0_78: Memory in humans. Her four cues, one per click; the last click adds what each one looks like in an agent
   (from the Anthropic post's own comparison, plus the one-file-per-fact memory this deck's Claude sessions use).
   References checked on PubMed 2026-11-09: McClelland 1995, Teyler 1986, Tse 2007. Nader 2000: not yet checked (logged). ---------- */
const AG_HUMAN = [
  ['Hippocampus', 'captures experiences fast; keeps an index that points to traces across the cortex', 'transcripts and notes, an index file'],
  ['Replay during sleep', 'recent experiences are replayed and slowly folded into the neocortex', 'dreaming: an offline pass over past sessions'],
  ['Existing schema', 'new information that fits what you already know is consolidated faster', 'add to an existing wiki page, not a new file'],
  ['Recalling a memory', 'recall makes a memory editable again', 'a note is checked and corrected when it is read'],
];
st(`
  <h1 class="t">Memory in humans</h1>
  <div class="agents-grid4">
    ${AG_HUMAN.map(([h, t, a], i) => `<div class="d6-card b" data-step="${i + 1}"><div class="lead"><b>${h}</b></div><div class="label">${t}</div>
      <div class="label agents-in b" data-step="5">in an agent: ${a}</div></div>`).join('')}
  </div>
  ${rdCite(d6Link('https://pubmed.ncbi.nlm.nih.gov/7624455/', 'McClelland, McNaughton, O’Reilly (1995)') + ' · ' + d6Link('https://pubmed.ncbi.nlm.nih.gov/3008780/', 'Teyler, DiScenna (1986)') + ' · '
    + d6Link('https://pubmed.ncbi.nlm.nih.gov/17412951/', 'Tse et al. (2007)') + ' · Nader, Schafe, LeDoux (2000)')}
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

/* ---------- _0_66: Evaluation, her two lines. ---------- */
st(`
  <h1 class="t">Evaluation</h1>
  <div class="agents-center">
    <div class="statement b" data-step="1">This can be tricky</div>
    <div class="question b" data-step="2">Think about the different aspects of how you would evaluate this</div>
  </div>
`);
}

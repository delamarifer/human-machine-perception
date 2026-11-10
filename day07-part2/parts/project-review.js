/* PART: project-review (Day 7 part 2). Owner: Fernanda. Copied from Shreya's day07/parts/project.js (2026-11-10), placeholders as she wrote them.
   This repo is public: never student names or faces here. The named version of the map runs only from the private instructors repo,
   which defines window.PR_NAMES before this file loads. No speaker notes yet. */
{
section('Project Review');

const prTodo = (title, lines) => st(`
  <style>
    .project-todo{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:center; gap:2.4vh; }
    .project-todo .d6-todo{ padding:2.2vh 1.6vw; }
    .project-todo .project-tag{ font-size:clamp(.8rem, 1.1vw, 1.05rem); text-transform:uppercase; letter-spacing:.08em; color:var(--mute); }
  </style>
  <h1 class="t">${title}</h1>
  <div class="project-todo">
    ${lines.map(t => `<div class="d6-todo b" data-step="1"><div class="project-tag">To do</div><div class="lead">${t}</div></div>`).join('')}
  </div>
`);

prTodo('Project Review', ['Overview of the project ideas (topics, field, tools etc)', 'Things we noticed that we liked', 'Things we noticed that people didn’t consider']);

/* Project map (Fernanda's request, colorful with a drawing of each project): the 14 teams after the three merges, grouped by theme.
   Each dot is one student. Each theme has its own color, used on this slide only, on shapes and never on words.
   The drawings are ours and only suggest each project. Rings face the middle band, so the links never cross a label.
   Clicks: one per theme, then the links. */
const prMap = (() => {
  const NAMES = window.PR_NAMES || {};
  const R = 46, DOT = 7, TOP_Y = 215, BOT_Y = 453, GAP = R + DOT + 3;

  /* Drawing helpers: s = outline, f = solid, t = pale fill, all in the theme color. */
  const s = 'class="project-review-s"', f = 'class="project-review-f"', t = 'class="project-review-t"';
  const ICON = {
    decoding: `<path ${s} d="M-20 30V12C-30 2-30-26-4-29 16-31 24-16 23-7L30 7 23 9V18C23 24 17 25 9 24V30"/>
      <rect ${t} x="-17" y="-20" width="30" height="24" rx="2"/><path ${s} d="M-15 2-6-9 1-2 5-6 12 2"/><circle ${f} cx="6" cy="-14" r="3.2"/>`,
    metamers: `<rect ${t} x="-36" y="-17" width="31" height="34" rx="3"/><path ${s} d="M-32-9c6-6 10 6 22 0M-32 0c7 6 13-6 22 0M-32 9c8-6 12 6 22 0"/>
      <rect ${t} x="5" y="-17" width="31" height="34" rx="3"/><path ${s} d="M9-9c8 6 12-6 23 0M9 0c6-6 15 6 23 0M9 9c7 6 11-6 23 0"/>
      <path ${s} d="M-3-4H3M-3 4H3"/>`,
    instance: `<path ${t} d="M-21-22-5-14V4L-21 12-37 4V-14Z"/><path ${s} d="M-21-22-5-14V4L-21 12-37 4V-14ZM-37-14-21-6-5-14M-21-6V12"/>
      <path ${t} d="M20-24 37-11 30 8 9 8 3-11Z"/><path ${s} d="M20-24 37-11 30 8 9 8 3-11ZM3-11 20-5 37-11M20-5 9 8M20-5 30 8"/>
      <path ${s} d="M-13 25H13M-13 25-7 20M-13 25-7 30M13 25 7 20M13 25 7 30"/>`,
    blur: `<circle ${t} cx="-19" cy="0" r="17"/><circle ${t} cx="-19" cy="0" r="12"/><circle ${t} cx="-19" cy="0" r="7"/>
      <rect ${s} x="4" y="-17" width="16" height="16"/><rect ${s} x="20" y="-17" width="16" height="16"/><rect ${s} x="4" y="-1" width="16" height="16"/><rect ${s} x="20" y="-1" width="16" height="16"/>
      <path ${s} d="M8-6 16-13M24-13 32-5M8 3 16 11M24 11H32"/>`,
    vits: [0, 1, 2, 3].map(c => [0, 1, 2, 3].map(r => `<rect ${f} x="${-33 + c * 17}" y="${-33 + r * 17}" width="15" height="15" rx="2" opacity="${[1, .62, .3, .12][c]}"/>`).join('')).join(''),
    rotation: `<path ${s} d="M-30 8A31 31 0 1 1 8 30"/><path ${s} d="M8 30 18 22M8 30 19 37"/><path ${s} style="stroke-width:5" d="M-8 15V-15H11M-8-1H7"/>`,
    uncertainty: `<path ${t} d="M-36 0Q0-34 36 0 0 34-36 0Z"/><path ${s} d="M-36 0Q0-34 36 0 0 34-36 0Z"/><circle ${f} r="14"/>
      <text class="project-review-q" y="9" text-anchor="middle">?</text>`,
    skeletons: `<circle ${f} cx="-5" cy="-27" r="6.5"/><path ${s} d="M-5-19V6M-5-13-23-27M-5-13 11-7 21-18M-5 6-19 31M-5 6 9 31"/>
      <ellipse ${s} cx="28" cy="-27" rx="7.5" ry="10.5"/><circle ${f} cx="-23" cy="-27" r="3.4"/><circle ${f} cx="11" cy="-7" r="3.4"/><circle ${f} cx="-12" cy="19" r="3.4"/><circle ${f} cx="2" cy="19" r="3.4"/>`,
    fall: `<circle ${f} cx="-27" cy="-1" r="6.5"/><path ${s} d="M-20 3 6 12M-11 6-14 21M-6 8 3 22M6 12 25 7M6 12 24 22"/><path ${s} d="M-36 30H36"/>
      <path ${s} d="M6-10a12 12 0 0 1 12 12M9-21a22 22 0 0 1 21 21"/>`,
    focus: `<circle ${t} cy="-7" r="24"/><circle ${s} cy="-7" r="24"/><circle ${s} cy="-7" r="12"/><circle ${f} cy="-7" r="5"/><path ${s} d="M0 17V28M-17 29H17"/>
      <circle ${f} cx="24" cy="-27" r="3.4"/>`,
    text: `<rect ${t} x="-36" y="-25" width="50" height="38" rx="3"/><rect ${s} x="-36" y="-25" width="50" height="38" rx="3"/>
      <path ${s} d="M-24-25V13M2-25V13M-36-13H-24M-36 1H-24M2-13H14M2 1H14"/><circle class="project-review-w" cx="12" cy="9" r="14"/><circle ${s} cx="12" cy="9" r="14"/><path ${s} style="stroke-width:5" d="M22 19 34 32"/>`,
    object: `<path ${t} d="M12 30C-11 3-12-29 12-29 36-29 35 3 12 30Z"/><path ${s} d="M12 30C-11 3-12-29 12-29 36-29 35 3 12 30Z"/><circle ${f} cx="12" cy="-8" r="8"/>
      <circle ${s} cx="-24" cy="8" r="9"/><path ${s} d="M-18 15-6 29M-11 23-16 28M-7 28-11 32"/>`,
    phone: `<rect ${t} x="-18" y="-35" width="36" height="70" rx="6"/><rect ${s} x="-18" y="-35" width="36" height="70" rx="6"/>` +
      [[-1, 0], [0, -1], [1, 1], [-1, 2]].map(([on, r], k) => [-1, 0, 1].map(c => `<circle ${c === on ? f : s} style="stroke-width:2.2" cx="${c * 10}" cy="${-20 + k * 13}" r="4.2"/>`).join('')).join(''),
    dust: `<rect ${f} x="-14" y="-33" width="14" height="10" rx="2"/><path ${s} d="M-14-28H-32M0-28H18M-32-34V-22M18-34V-22"/>
      <path ${s} style="stroke-dasharray:2 7" d="M-7-19-26 3M-7-19 12 3"/>
      <path ${t} d="M-36 22C-40 10-26 4-20 11-16 0 0 0 3 10 10 2 26 6 25 15 35 13 40 25 32 29H-30C-34 29-36 26-36 22Z"/>
      <path ${s} d="M-36 22C-40 10-26 4-20 11-16 0 0 0 3 10 10 2 26 6 25 15 35 13 40 25 32 29H-30C-34 29-36 26-36 22Z"/>`,
  };

  /* One longer sentence per project, shown on hover. Our wording (draft), from the project ideas. Keep names out of these. */
  const TIP = {
    decoding: 'Can a simple decoder read imagined pictures from brain scans, and does how vivid the image felt predict how well it works?',
    metamers: 'Model metamers are images a network treats as the same but people cannot recognize; sparse autoencoders look for the features that make them look wrong.',
    instance: 'When people judge whether two photos show the same object from new views, do self-supervised models fail on the same trials?',
    blur: 'Which kinds of image damage, blur on photographs or shuffled parts on line drawings, break models and people together, and which break only one of them?',
    vits: 'After a vision transformer learns new classes, is the old information gone from inside the model, or has only the final layer forgotten it?',
    rotation: 'What does a 3D model give up when it is made robust to rotation: can it still tell a shape from its mirror image?',
    uncertainty: 'Can a model’s uncertainty predict when a second look at a partly hidden object will actually help?',
    skeletons: 'Does a 3D skeleton beat a 2D one at recognizing movement from someone the model has never seen, tested on both sign language and tennis strokes?',
    fall: 'On clips with real sound and video together, does adding audio cut false alarms at the same rate of catching falls?',
    focus: 'A webcam study timer that pauses when attention drifts, by telling focused, looking down, looking away, eyes closed and absent on a person it has not seen.',
    text: 'Can text search in a video say “not found” when the event is not there, instead of always pointing at something?',
    object: 'An offline app that shows the last photo where a personal object was seen, or says “not seen”, from only a few photos of each object.',
    phone: 'At what photo quality does phone-based grading of answer sheets fail, and which step breaks first: finding the corners, aligning the sheet, or reading the marks?',
    dust: 'Can dust plumes be detected in degraded or low-resolution satellite imagery, and does super-resolution as a first step recover what was lost?',
  };

  const regions = [
    { head: 'Brains, minds and models', color: '#2b6fc9', side: 'top', x: 0, w: 800, y: 14, h: 262, teams: [
      { id: 'decoding', n: 2, x: 107.5, label: ['Decoding', 'imagined', 'pictures'] },
      { id: 'metamers', n: 1, x: 302.5, label: ['Metamers', 'and SAEs'] },
      { id: 'instance', n: 3, x: 497.5, label: ['Instance-level', 'models vs', 'human errors'] },
      { id: 'blur', n: 4, x: 692.5, label: ['Blur and', 'scrambling,', 'people vs models'] } ] },
    { head: 'What models lose', color: '#c94f1f', side: 'bottom', x: 0, w: 534, y: 392, h: 258, teams: [
      { id: 'vits', n: 1, x: 89, label: ['How ViTs forget'] },
      { id: 'rotation', n: 1, x: 267, label: ['What rotation', 'robustness costs'] },
      { id: 'uncertainty', n: 2, x: 445, label: ['Uncertainty and', 'active vision'] } ] },
    { head: 'Reading human movement', color: '#14805a', side: 'top', x: 820, w: 580, y: 14, h: 262, teams: [
      { id: 'skeletons', n: 3, x: 925, label: ['Skeletons across', 'performers'] },
      { id: 'fall', n: 2, x: 1110, label: ['Fall detection,', 'audio plus video'] },
      { id: 'focus', n: 3, x: 1290, label: ['FocusLens', 'webcam timer'] } ] },
    { head: 'Useful tools', color: '#a86f00', side: 'bottom', x: 820, w: 580, y: 392, h: 258, teams: [
      { id: 'text', n: 3, x: 925, label: ['Text search', 'for events', 'in video'] },
      { id: 'object', n: 3, x: 1110, label: ['Object memory', 'assistant'] },
      { id: 'phone', n: 2, x: 1290, label: ['Phone-photo', 'grading of', 'answer sheets'] } ] },
    { head: 'Seeing Earth from above', color: '#c23f72', side: 'bottom', x: 550, w: 250, y: 392, h: 258, teams: [
      { id: 'dust', n: 3, x: 675, label: ['Dust detection', 'under degraded', 'imagery'] } ] },
  ];
  const at = {};
  regions.forEach(r => r.teams.forEach(t => { at[t.id] = { x: t.x, y: r.side === 'top' ? TOP_Y : BOT_Y }; }));

  const team = (t, side) => {
    const { x, y } = at[t.id], who = NAMES[t.id] || [], n = who.length ? who.flat().length : t.n;
    const dots = Array.from({ length: n }, (_, i) => {
      const a = -Math.PI / 2 + i * 2 * Math.PI / n;
      return `<circle class="project-review-dot" cx="${(x + Math.cos(a) * R).toFixed(1)}" cy="${(y + Math.sin(a) * R).toFixed(1)}" r="${DOT}"/>`;
    }).join('');
    const names = who.map(l => l.join(' · '));
    const LT = 26, LN = 22, topEnd = y - GAP - 6, namesTop = topEnd - (names.length - 1) * LN;
    const titleLast = names.length ? namesTop - 26 : topEnd;
    const titleY = side === 'top' ? titleLast - (t.label.length - 1) * LT : y + GAP + 22;
    const nameY = side === 'top' ? namesTop : titleY + (t.label.length - 1) * LT + 25;
    const title = t.label.map((l, i) => `<text class="project-review-team" x="${x}" y="${titleY + i * LT}" text-anchor="middle">${l}</text>`).join('');
    const nameText = names.map((l, i) => `<text class="project-review-name" x="${x}" y="${nameY + i * LN}" text-anchor="middle">${l}</text>`).join('');
    const hitY = side === 'top' ? y - 196 : y - GAP, hitH = 196 + GAP;
    return `<g class="project-review-tm" data-tip="${TIP[t.id]}"><rect class="project-review-hit" x="${x - 88}" y="${hitY}" width="176" height="${hitH}"/><circle class="project-review-ring" cx="${x}" cy="${y}" r="${R}"/><g transform="translate(${x} ${y})">${ICON[t.id]}</g>${dots}${title}${nameText}</g>`;
  };

  const region = (r, step) => {
    const w = r.head.length * 9.7 + 24, px = r.x + Math.min(14, (r.w - w) / 2), pillY = r.side === 'top' ? 0 : r.y + r.h - 14;
    const pill = `<rect class="project-review-pill" x="${px}" y="${pillY}" width="${w}" height="30" rx="15"/><text class="project-review-theme" x="${px + w / 2}" y="${pillY + 22}" text-anchor="middle">${r.head}</text>`;
    return `<g class="b" data-step="${step}" style="--pc:${r.color}"><rect class="project-review-region" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="16"/>${r.teams.map(t => team(t, r.side)).join('')}${pill}</g>`;
  };

  /* Shared-method links. Each stops just short of the two rings. */
  const line = (a, b) => {
    const A = at[a], B = at[b], d = Math.hypot(B.x - A.x, B.y - A.y), ux = (B.x - A.x) / d, uy = (B.y - A.y) / d;
    return `<line class="project-review-link" x1="${(A.x + ux * GAP).toFixed(1)}" y1="${(A.y + uy * GAP).toFixed(1)}" x2="${(B.x - ux * GAP).toFixed(1)}" y2="${(B.y - uy * GAP).toFixed(1)}"/>`;
  };
  const links = [['instance', 'blur'], ['instance', 'rotation'], ['blur', 'rotation'], ['metamers', 'vits'],
    ['fall', 'text'], ['focus', 'object'], ['focus', 'phone'], ['object', 'phone']];
  const linkLabels = [
    { x: 170, y: 322, anchor: 'end', lines: ['Feature-level', 'readouts'] },
    { x: 505, y: 342, anchor: 'start', lines: ['Same model-vs-human test'] },
    { x: 990, y: 322, anchor: 'end', lines: ['Same event', 'timing metric'] },
    { x: 1192, y: 305, anchor: 'end', lines: ['Own photos,', 'same consent'] },
  ];
  const labelSvg = linkLabels.map(l => l.lines.map((t, i) =>
    `<text class="project-review-linklabel" x="${l.x}" y="${l.y + i * 26}" text-anchor="${l.anchor}">${t}</text>`).join('')).join('');

  return `<svg class="project-review-map" viewBox="0 0 1400 668" role="img" aria-label="Fourteen project teams grouped into five themes, each with a small drawing of the project, and lines joining teams that share a method">
    ${regions.map((r, i) => region(r, i + 1)).join('')}
    <g class="b" data-step="${regions.length + 1}">${links.map(([a, b]) => line(a, b)).join('')}${labelSvg}</g>
  </svg>`;
})();

st(`
  <style>
    .project-review-map{ flex:1 1 auto; min-height:0; width:100%; display:block; }
    .project-review-region{ fill:var(--pc); fill-opacity:.09; stroke:var(--pc); stroke-opacity:.45; stroke-width:2; }
    .project-review-ring{ fill:#fff; stroke:var(--pc); stroke-width:3; }
    .project-review-dot{ fill:var(--pc); stroke:#fff; stroke-width:2.5; }
    .project-review-pill{ fill:var(--pc); }
    .project-review-s{ fill:none; stroke:var(--pc); stroke-width:3; stroke-linecap:round; stroke-linejoin:round; }
    .project-review-f{ fill:var(--pc); }
    .project-review-t{ fill:var(--pc); fill-opacity:.2; }
    .project-review-w{ fill:#fff; }
    .project-review-q{ font-size:26px; font-weight:800; fill:#fff; }
    .project-review-link{ stroke:var(--mute); stroke-width:3; stroke-linecap:round; }
    .project-review-team{ font-size:22px; font-weight:600; fill:var(--ink); }
    .project-review-name{ font-size:20px; fill:var(--ink); }
    .project-review-theme{ font-size:20px; font-weight:700; fill:#fff; }
    .project-review-linklabel{ font-size:22px; fill:var(--ink); }
    .project-review-hit{ fill:transparent; pointer-events:all; }
    .project-review-tip{ position:fixed; z-index:60; max-width:min(34em, 46vw); padding:1.2vh 1vw; border-radius:10px; background:var(--ink); color:#fff;
      font-size:clamp(1rem, 1.5vw, 1.5rem); line-height:1.3; pointer-events:none; display:none; }
  </style>
  <h1 class="t">Potential Groupings + Ideas</h1>
  ${prMap}
`);

/* Hover on a team that is already on screen shows its sentence. */
if(!window.prReviewTip){
  const tip = window.prReviewTip = document.createElement('div');
  tip.className = 'project-review-tip';
  document.body.appendChild(tip);
  addEventListener('mousemove', e => {
    const g = e.target.closest ? e.target.closest('.project-review-tm') : null;
    if(!g || !g.closest('.slide.active') || !g.closest('.b.shown') || document.body.classList.contains('preblank')){ tip.style.display = 'none'; return; }
    tip.textContent = g.dataset.tip;
    tip.style.display = 'block';
    const r = tip.getBoundingClientRect(), x = e.clientX + 18, y = e.clientY + 18;
    tip.style.left = Math.max(8, x + r.width > innerWidth - 8 ? e.clientX - r.width - 18 : x) + 'px';
    tip.style.top = Math.max(8, y + r.height > innerHeight - 8 ? e.clientY - r.height - 18 : y) + 'px';
  });
}

prTodo('Project Review', ['What goes into the project plan']);
}

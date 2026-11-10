/* PART: project-review (Day 7 part 2). Owner: Fernanda. Copied from Shreya's day07/parts/project.js (2026-11-10), placeholders as she wrote them.
   Public repo: never student names or faces here. No speaker notes yet. */
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

/* Project map (Fernanda's request): the 14 teams after the three merges, grouped by theme. Each dot is one student, anonymous by design.
   Monochrome on purpose: deck colors carry fixed meanings. Rings face the middle band, so the links never cross a label.
   Clicks: one per theme, then the links. */
const prMap = (() => {
  const R = 34, DOT = 8, TOP_Y = 174, BOT_Y = 464, GAP = R + DOT + 3;
  const regions = [
    { head: ['Brains, minds and models'], side: 'top', x: 0, w: 800, y: 0, h: 228, teams: [
      { id: 'decoding', n: 2, x: 107.5, label: ['Decoding', 'imagined', 'pictures'] },
      { id: 'metamers', n: 1, x: 302.5, label: ['Metamers', 'and SAEs'] },
      { id: 'instance', n: 3, x: 497.5, label: ['Instance-level', 'models vs', 'human errors'] },
      { id: 'blur', n: 4, x: 692.5, label: ['Blur and', 'scrambling,', 'people vs models'] } ] },
    { head: ['What models lose'], side: 'bottom', x: 0, w: 590, y: 410, h: 258, teams: [
      { id: 'vits', n: 1, x: 105, label: ['How ViTs forget'] },
      { id: 'rotation', n: 1, x: 295, label: ['What rotation', 'robustness costs'] },
      { id: 'uncertainty', n: 2, x: 485, label: ['Uncertainty and', 'active vision'] } ] },
    { head: ['Reading human movement'], side: 'top', x: 820, w: 580, y: 0, h: 228, teams: [
      { id: 'skeletons', n: 3, x: 923, label: ['Skeletons across', 'performers'] },
      { id: 'fall', n: 2, x: 1110, label: ['Fall detection,', 'audio plus video'] },
      { id: 'focus', n: 3, x: 1297, label: ['FocusLens', 'webcam timer'] } ] },
    { head: ['Useful tools'], side: 'bottom', x: 820, w: 580, y: 410, h: 258, teams: [
      { id: 'text', n: 3, x: 923, label: ['Text search', 'for events', 'in video'] },
      { id: 'object', n: 3, x: 1110, label: ['Object memory', 'assistant'] },
      { id: 'phone', n: 2, x: 1297, label: ['Phone-photo', 'grading of', 'answer sheets'] } ] },
    { head: ['Seeing Earth', 'from above'], side: 'bottom', x: 604, w: 196, y: 410, h: 258, teams: [
      { id: 'dust', n: 3, x: 702, label: ['Dust detection', 'under degraded', 'imagery'] } ] },
  ];
  const at = {};
  regions.forEach(r => r.teams.forEach(t => { at[t.id] = { x: t.x, y: r.side === 'top' ? TOP_Y : BOT_Y }; }));

  const team = (t, side) => {
    const { x, y } = at[t.id];
    const dots = Array.from({ length: t.n }, (_, i) => {
      const a = -Math.PI / 2 + i * 2 * Math.PI / t.n;
      return `<circle class="project-review-dot" cx="${(x + Math.cos(a) * R).toFixed(1)}" cy="${(y + Math.sin(a) * R).toFixed(1)}" r="${DOT}"/>`;
    }).join('');
    const firstY = side === 'top' ? y - GAP - 12 - (t.label.length - 1) * 28 : y + GAP + 24;
    const text = t.label.map((l, i) => `<text class="project-review-team" x="${x}" y="${firstY + i * 28}" text-anchor="middle">${l}</text>`).join('');
    return `<circle class="project-review-ring" cx="${x}" cy="${y}" r="${R}"/>${dots}${text}`;
  };

  const region = (r, step) => {
    const lastY = r.y + r.h - 14, firstY = r.side === 'top' ? r.y + 32 : lastY - (r.head.length - 1) * 30;
    const head = r.head.map((l, i) => `<text class="project-review-theme" x="${r.x + 14}" y="${firstY + i * 30}">${l}</text>`).join('');
    return `<g class="b" data-step="${step}"><rect class="project-review-region" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="16"/>${head}${r.teams.map(t => team(t, r.side)).join('')}</g>`;
  };

  /* Shared-method links. Each stops just short of the two rings. */
  const line = (a, b) => {
    const A = at[a], B = at[b], d = Math.hypot(B.x - A.x, B.y - A.y), ux = (B.x - A.x) / d, uy = (B.y - A.y) / d;
    return `<line class="project-review-link" x1="${(A.x + ux * GAP).toFixed(1)}" y1="${(A.y + uy * GAP).toFixed(1)}" x2="${(B.x - ux * GAP).toFixed(1)}" y2="${(B.y - uy * GAP).toFixed(1)}"/>`;
  };
  const links = [['instance', 'blur'], ['instance', 'rotation'], ['blur', 'rotation'], ['metamers', 'vits'],
    ['fall', 'text'], ['focus', 'object'], ['focus', 'phone'], ['object', 'phone']];
  const linkLabels = [
    { x: 170, y: 308, anchor: 'end', lines: ['Feature-level', 'readouts'] },
    { x: 532, y: 326, anchor: 'start', lines: ['Same model-vs-human test'] },
    { x: 980, y: 308, anchor: 'end', lines: ['Same event', 'timing metric'] },
    { x: 1192, y: 286, anchor: 'end', lines: ['Own photos,', 'same consent'] },
  ];
  const labelSvg = linkLabels.map(l => l.lines.map((t, i) =>
    `<text class="project-review-linklabel" x="${l.x}" y="${l.y + i * 27}" text-anchor="${l.anchor}">${t}</text>`).join('')).join('');

  return `<svg class="project-review-map" viewBox="0 0 1400 668" role="img" aria-label="Fourteen project teams grouped into five themes, with lines joining teams that share a method">
    ${regions.map((r, i) => region(r, i + 1)).join('')}
    <g class="b" data-step="${regions.length + 1}">${links.map(([a, b]) => line(a, b)).join('')}${labelSvg}</g>
  </svg>`;
})();

st(`
  <style>
    .project-review-map{ flex:1 1 auto; min-height:0; width:100%; display:block; }
    .project-review-region{ fill:#f8fafc; stroke:var(--line); stroke-width:2; }
    .project-review-ring{ fill:#fff; stroke:#94a3b8; stroke-width:2.5; }
    .project-review-dot{ fill:var(--ink); }
    .project-review-link{ stroke:var(--mute); stroke-width:3; stroke-linecap:round; }
    .project-review-team{ font-size:24px; fill:var(--ink); }
    .project-review-theme{ font-size:25px; font-weight:700; fill:var(--ink); }
    .project-review-linklabel{ font-size:23px; fill:var(--ink); }
  </style>
  <h1 class="t">Potential Groupings + Ideas</h1>
  ${prMap}
`);

prTodo('Project Review', ['What goes into the project plan']);
}

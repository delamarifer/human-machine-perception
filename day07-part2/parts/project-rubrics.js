/* PART: project-rubrics (Day 7 part 2). Owner: Fernanda. Project Plan Rubric, the example plan and Project Rubric,
   copied unchanged from Shreya's day07/parts/project.js (2026-11-10); no speaker notes on those three. The deep dive at the end has draft notes. */
{
section('Project Review');

/* The proposal document. Fernanda opens it live in class, so this slide is only the link. */
const PR_DOC_URL = 'https://docs.google.com/document/d/1Rdo4jX8LV4iVlVbckDFIYCNTfZY6E_W4NZx28A4EmlQ/edit';

st(`
  <h1 class="t">Project Plan Rubric</h1>
  <div class="statement b" style="margin:auto">${d6Link(PR_DOC_URL, '<u>Project Proposal Template + Rubric</u>')}</div>
`);

/* ---------- Example plan: one idea, one person vs a team of three, as a drawing (Fernanda: "use visuals and pop ups instead").
   Clicks: the shared core, then solo, then the team, then the one-line expectation. Hovering a box shows its detail.
   All wording comes from the earlier table of this slide. It is an EXAMPLE; the idea is the Day 6 lab's fallback project. */
const prSvg = inner => `<svg viewBox="0 0 48 48" aria-hidden="true">${inner}</svg>`;
const PR_ICON = {
  video: prSvg('<rect x="13" y="4" width="22" height="40" rx="4"/><path class="project-rubrics-solid" d="M20 17 31 24 20 31Z"/>'),
  points: prSvg('<path d="M12 42V24M12 24 8 12M12 24 18 8M12 24 26 10M12 24 34 16M12 24 38 26"/><circle class="project-rubrics-solid" cx="8" cy="12" r="3"/><circle class="project-rubrics-solid" cx="18" cy="8" r="3"/><circle class="project-rubrics-solid" cx="26" cy="10" r="3"/><circle class="project-rubrics-solid" cx="34" cy="16" r="3"/><circle class="project-rubrics-solid" cx="38" cy="26" r="3"/>'),
  model: prSvg('<circle cx="8" cy="12" r="4"/><circle cx="8" cy="36" r="4"/><circle cx="24" cy="24" r="5"/><circle cx="40" cy="12" r="4"/><circle cx="40" cy="36" r="4"/><path d="M12 13 19 21M12 35 19 27M29 21 36 14M29 27 36 34"/>'),
  person: prSvg('<circle cx="24" cy="14" r="8"/><path d="M8 44C8 32 15 26 24 26S40 32 40 44"/><path d="M34 12 38 16 46 6"/>'),
  flag: prSvg('<path d="M12 44V6"/><path class="project-rubrics-solid" d="M12 7H38L31 15 38 23H12Z"/>'),
  grow: prSvg('<rect x="6" y="30" width="9" height="12"/><rect x="20" y="20" width="9" height="22"/><rect class="project-rubrics-solid" x="34" y="8" width="9" height="34"/>'),
  camera: prSvg('<rect x="5" y="14" width="38" height="26" rx="4"/><circle cx="24" cy="27" r="8"/><path d="M16 14 19 8H29L32 14"/>'),
  app: prSvg('<rect x="5" y="8" width="38" height="28" rx="3"/><path d="M17 44H31M24 36V44"/><path class="project-rubrics-solid" d="M20 16 31 22 20 28Z"/>'),
  swap: prSvg('<path d="M8 16H38M38 16 30 8M38 16 30 24M40 34H10M10 34 18 26M10 34 18 42"/>'),
};
const prBox = (icon, text, tip, cls = '') => `<div class="project-rubrics-box ${cls}" data-tip="${tip}">${PR_ICON[icon]}<div>${text}</div></div>`;
const prBadge = (who, c) => `<span class="project-rubrics-who" style="--pc:${c}">${who}</span>`;
const PR_TEAM = [
  ['A', '#2b6fc9', 'Data and test set', prBox('camera', 'Own test set', '+ a test set the team records: other phones, other lighting.')],
  ['B', '#c94f1f', 'Model', prBox('grow', '10 signs', 'If there is time: 10 signs, the recorded test set and the app, one person each.')],
  ['C', '#14805a', 'App and evaluation', prBox('app', 'Gradio app', '+ a Gradio app anyone can try on a phone video.')],
];

/* Shown in the deep dive, right after the sign language idea it uses (Fernanda's request): open-questions.js calls this. */
window.prExamplePlan = () => st(`
  <style>
    .project-flag{ display:inline-block; font-size:clamp(.7rem, 1vw, .95rem); text-transform:uppercase; letter-spacing:.08em; border:1.5px solid var(--ink); border-radius:999px; padding:.15em .7em; margin-left:.8vw; vertical-align:middle; }
    .project-rubrics-ex{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:center; gap:1.8vh; }
    .project-rubrics-band{ background:#f8fafc; border:1px solid var(--line); border-radius:12px; padding:1.2vh 1.2vw; display:flex; flex-direction:column; gap:1vh; }
    .project-rubrics-h{ font-size:clamp(1rem, 1.6vw, 1.6rem); font-weight:700; display:flex; align-items:center; gap:.6vw; }
    .project-rubrics-flow{ display:flex; align-items:stretch; gap:.5vw; }
    .project-rubrics-flow > i{ align-self:center; font-style:normal; color:var(--mute); font-size:clamp(1.1rem, 2vw, 2rem); }
    .project-rubrics-box{ flex:1 1 0; min-width:0; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; gap:.5vh;
      padding:.9vh .5vw; background:#fff; border:1.5px solid #94a3b8; border-radius:10px; cursor:help; font-size:clamp(.95rem, 1.45vw, 1.45rem); font-weight:600; line-height:1.15; }
    .project-rubrics-box:hover{ border-color:var(--ink); background:#f1f5f9; }
    .project-rubrics-box svg, .project-rubrics-person svg{ width:clamp(30px, 5.4vh, 60px); height:clamp(30px, 5.4vh, 60px); }
    .project-rubrics-ex svg{ fill:none; stroke:var(--pc, var(--ink)); stroke-width:3; stroke-linecap:round; stroke-linejoin:round; }
    .project-rubrics-ex svg .project-rubrics-solid{ fill:var(--pc, var(--ink)); stroke:none; }
    .project-rubrics-mile{ flex:0 0 17%; background:var(--ink); color:#fff; border-color:var(--ink); --pc:#fff; }
    .project-rubrics-mile:hover{ background:var(--ink); }
    .project-rubrics-two{ display:grid; grid-template-columns:1fr 2.3fr; gap:1.2vw; }
    .project-rubrics-lanes{ display:grid; grid-template-columns:repeat(3, 1fr); gap:.9vw; flex:1 1 auto; }
    .project-rubrics-lane{ display:flex; flex-direction:column; gap:.7vh; --pc:var(--lc); }
    .project-rubrics-lane > .project-rubrics-box{ border-color:var(--lc); flex:1 1 auto; }
    .project-rubrics-role{ display:flex; align-items:center; gap:.5vw; font-size:clamp(.95rem, 1.4vw, 1.4rem); font-weight:600; line-height:1.15; min-height:2.3em; }
    .project-rubrics-who{ flex:none; width:1.9em; height:1.9em; border-radius:50%; background:var(--pc); color:#fff; display:inline-flex; align-items:center; justify-content:center; font-weight:800; font-size:clamp(.9rem, 1.3vw, 1.3rem); }
    .project-rubrics-tip{ position:fixed; z-index:60; max-width:min(30em, 46vw); padding:1.2vh 1vw; border-radius:10px; background:var(--ink); color:#fff;
      font-size:clamp(1rem, 1.5vw, 1.5rem); line-height:1.3; pointer-events:none; display:none; }
    @media (max-width: 820px), (max-aspect-ratio: 1/1){ .project-rubrics-two, .project-rubrics-lanes{ grid-template-columns:1fr; } .project-rubrics-flow{ flex-wrap:wrap; } }
  </style>
  <h1 class="t">Example plan: one person vs a team</h1>
  <div><span class="project-flag" style="margin-left:0">an example, not a template to copy</span></div>
  <div class="project-rubrics-ex">
    <div class="project-rubrics-band b" data-step="1">
      <div class="project-rubrics-h">Same core for both</div>
      <div class="project-rubrics-flow">
        ${prBox('video', 'Phone video', 'A doctor and a Deaf patient with no interpreter: recognize a few common signs from a phone video.')}<i>→</i>
        ${prBox('points', 'Hand keypoints', 'Hand keypoints from a pretrained pose model.')}<i>→</i>
        ${prBox('model', 'Small classifier', 'A small classifier, in a Colab notebook.')}<i>→</i>
        ${prBox('person', 'New signers', 'Accuracy on signers not seen in training. Expect look-alike signs to fail.')}<i>→</i>
        ${prBox('flag', '3 signs by Day 13', 'Smallest version: 3 signs, end to end, by Day 13. Same for both.', 'project-rubrics-mile')}
      </div>
    </div>
    <div class="project-rubrics-two">
      <div class="project-rubrics-band b" data-step="2">
        <div class="project-rubrics-h">Solo</div>
        <div class="project-rubrics-lane" style="--lc:#64748b;flex:1 1 auto">
          <div class="project-rubrics-role">${prBadge('1', '#64748b')} Every piece</div>
          ${prBox('grow', '10 signs', 'If there is time: grow to 10 signs.')}
          ${prBox('swap', 'Plan B', 'Keypoints fail on blurry video → fewer signs, clearer clips.')}
        </div>
      </div>
      <div class="project-rubrics-band b" data-step="3">
        <div class="project-rubrics-h">Team of three</div>
        <div class="project-rubrics-lanes">
          ${PR_TEAM.map(([who, c, role, box]) => `<div class="project-rubrics-lane" style="--lc:${c}"><div class="project-rubrics-role">${prBadge(who, c)} ${role}</div>${box}</div>`).join('')}
        </div>
        ${prBox('swap', 'Plan B', 'Same as solo, and: the pieces do not fit → agree on one keypoint file format on day one.')}
      </div>
    </div>
    <div class="lead b" data-step="4"><b>Same core for both</b> · a team adds work in parallel, with an owner for each piece, not three times the idea</div>
  </div>
  ${rdCite('Example idea: the Day 6 lab’s sign-language app for doctors · team size is an example')}
`);

/* Hovering a box that is already on screen shows its detail. */
if(!window.prRubricsTip){
  const tip = window.prRubricsTip = document.createElement('div');
  tip.className = 'project-rubrics-tip';
  document.body.appendChild(tip);
  addEventListener('mousemove', e => {
    const g = e.target.closest ? e.target.closest('.project-rubrics-box') : null;
    if(!g || !g.closest('.slide.active') || !g.closest('.b.shown') || document.body.classList.contains('preblank')){ tip.style.display = 'none'; return; }
    tip.textContent = g.dataset.tip;
    tip.style.display = 'block';
    const r = tip.getBoundingClientRect(), x = e.clientX + 18, y = e.clientY + 18;
    tip.style.left = Math.max(8, x + r.width > innerWidth - 8 ? e.clientX - r.width - 18 : x) + 'px';
    tip.style.top = Math.max(8, y + r.height > innerHeight - 8 ? e.clientY - r.height - 18 : y) + 'px';
  });
}

/* Project Rubric: links to the course site's pages for the final output and its grading (Fernanda: no TO DO boxes). */
st(`
  <h1 class="t">Project Rubric</h1>
  <div class="project-review-cues" style="flex:1 1 auto; display:flex; flex-direction:column; justify-content:center; gap:3.6vh;">
    <div class="statement b" data-step="1">${d6Link('../templates.html#presentation', '<u>Presentation</u>')}</div>
    <div class="statement b" data-step="1">${d6Link('../templates.html#writeup', '<u>Write-up</u>')}</div>
    <div class="statement b" data-step="1">${d6Link('../syllabus.html#grading', '<u>How it is graded</u>')}</div>
  </div>
`);
}

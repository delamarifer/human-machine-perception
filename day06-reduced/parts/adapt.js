/* PART: adapt (Day 6 reduced). Google deck pages 48-55, one HTML slide per page.
   Figures: Foundations of Computer Vision, Ch. 37 (CC BY-NC-ND 4.0), shown whole with covers that fade off.
   Panel coordinates detected by script from the original images (normalized x, y, w, h below).
   Fog numbers: Sakaridis, Dai, Van Gool, IJCV 2018, Table 2 (no dehazing column), read from the paper.
   Rotated-digit numbers: read from assets/adapt/cl_results.json by the two scenes. No speaker notes. */
{
section('Adapting models');

const adBook = t => d6Link('https://visionbook.mit.edu/transfer_learning.html', `Foundations of Computer Vision, Ch. 37${t ? ', ' + t : ''}`) + ' · CC BY-NC-ND 4.0';
const AD_PRE = '#f3d79f', AD_FT = '#f1a3a9';   /* sampled from the book's module colors: pretrained, finetuned */
const adCov = ([x, y, w, h], step) => `<div class="cov b" data-step="${step}" style="left:${x * 100}%;top:${y * 100}%;width:${w * 100}%;height:${h * 100}%"></div>`;
const adFig = (src, ar, covers) => `<div class="fw" data-ar="${ar}"><img src="${src}" alt="">${covers}</div>`;

const adStyle = `<style>
  .adapt-transition{ flex:1 1 auto; display:flex; align-items:center; justify-content:center; text-align:center; }
  .adapt-transition h1.t{ font-size:clamp(2.4rem, 5vw, 4.6rem); line-height:1.16; }
  .adapt-box{ width:100%; }
  .adapt-bridge{ width:100%; display:block; flex:0 0 auto; }
  .adapt-bridge text{ font-family:var(--font); fill:var(--ink); }
  .adapt-list{ display:grid; grid-template-columns:repeat(3, 1fr); gap:.6vh 1.6vw; flex:0 0 auto; }
  .adapt-item{ font-size:clamp(1.25rem, 2.15vw, 2rem); line-height:1.25; text-align:center; padding:.35vh .6vw; border:2px solid transparent; border-radius:10px; }
  .adapt-dim{ opacity:.45; }
  .adapt-pick{ border-color:var(--ink); font-weight:700; }
  .fw .adapt-ring{ position:absolute; border:3.5px solid var(--ink); border-radius:10px; }
  .adapt-why{ flex:0 0 auto; text-align:center; font-size:clamp(1.1rem, 1.75vw, 1.6rem); }
  .adapt-stack{ position:relative; flex:1 1 auto; min-height:0; display:flex; align-items:center; justify-content:center; }
  .adapt-sub{ width:min(76vw, 135vh); }
  .adapt-cues{ position:relative; height:clamp(2rem, 3.4vw, 3rem); }
  .adapt-cue{ position:absolute; top:0; width:0; display:flex; justify-content:center; white-space:nowrap; }
  .adapt-kd{ position:absolute; inset:0; background:#fff; display:flex; align-items:center; justify-content:center; }
  .adapt-kd > div{ width:min(62vw, 110vh); aspect-ratio:1.68; }
  .adapt-svg{ flex:1 1 auto; min-height:0; width:100%; display:block; }
  .adapt-svg text{ font-family:var(--font); fill:var(--ink); }
</style>`;

/* ---------- p48: transition ---------- */
st(`${adStyle}
  <div class="adapt-transition"><h1 class="t">Adapting existing trained models for your purposes</h1></div>
`);

/* ---------- p49: the book's concept, then her list, then the two explained in depth ---------- */
const AD_METHODS = [['Fine-tuning', 1], ['Domain adaptation', 0], ['Test-time adaptation', 0], ['Monitoring', 0], ['Continual learning', 1], ['Human feedback loops', 0]];
/* detected on pretraining_and_adaptation.png: f box center .2505, f' box center .7603, divider .4983 */
const AD_FX = 250.5, AD_FPX = 760.3;
/* detected on the same figure (element extents, then padded): X .0424-.1370, X' .5453-.6506, Y .3590-.4545, Y' .8683-.9963; right edges of X' and Y' pulled in so the ring clears the arrow and the figure edge */
const adRing = ([x0, x1, y0, y1, step]) => `<div class="adapt-ring b" data-step="${step}" style="left:${(x0 - .008) * 100}%;top:${(y0 - .02) * 100}%;width:${(x1 - x0 + .016) * 100}%;height:${(y1 - y0 + .04) * 100}%"></div>`;
const AD_XPR = .6440;
const AD_RINGS = [[.0424, .1370, .4562, .9185, 3], [.5453, AD_XPR, .4305, .9300, 3], [.3590, .4545, .4473, .8849, 4], [.8683, .9920, .4314, .8849, 4]];
st(`
  <h1 class="t">Adaptation methods</h1>
  <div class="adapt-box" style="aspect-ratio:3.861;flex:0 0 auto">
    ${adFig('assets/adapt/ch37-pretraining-adaptation.png', 4359 / 1129, adCov([0, 0, .49, 1], 1) + adCov([.49, 0, .51, 1], 2) + AD_RINGS.map(adRing).join(''))}
  </div>
  <svg class="adapt-bridge b" data-step="5" viewBox="0 0 1000 56" role="img" aria-label="An arrow from f to f prime: initialize f prime as f">
    <defs><marker id="adBr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#0f172a"/></marker></defs>
    <path d="M${AD_FX},2 V30 H${AD_FPX} V8" fill="none" stroke="#0f172a" stroke-width="2.6" marker-end="url(#adBr)"/>
    <rect x="${(AD_FX + AD_FPX) / 2 - 92}" y="14" width="184" height="32" fill="#fff"/>
    <text x="${(AD_FX + AD_FPX) / 2}" y="39" font-size="25" font-weight="700" text-anchor="middle">initialize f′ = f</text>
  </svg>
  <div class="adapt-why b" data-step="5">from scratch: data hungry · with prior knowledge: data efficient</div>
  <div class="adapt-list b" data-step="6">
    ${AD_METHODS.map(([m, pick]) => `<div class="adapt-item ${pick ? 'adapt-pick' : 'adapt-dim'}">${m}</div>`).join('')}
  </div>
  ${rdCite(adBook('Figure 37.1'))}
`);

/* ---------- p50: panel by panel. Detected on finetuning_stages.png: divider x .4841; panel 2 ends y .5368;
   big arrow and panel 3 start y .5877; legend rows .7781-.8482, .8535-.9228, .9289-.9982. ---------- */
st(`
  <h1 class="t">Pre-training vs fine-tuning</h1>
  ${rfig('assets/adapt/ch37-finetuning-stages.png', 3586 / 1140, [
    {r: [0, 0, .478, .68], step: 1}, {r: [0, .765, .478, .086], step: 1},
    {r: [.478, 0, .522, .562], step: 2}, {r: [.478, .562, .0125, .438], step: 2}, {r: [0, .851, .478, .0755], step: 2},
    {r: [.4905, .562, .5095, .438], step: 3}, {r: [0, .9265, .478, .0735], step: 3},
  ])}
  ${rdCite(adBook('Figure 37.2'))}
`);

/* ---------- p51: finetuning subparts of a network, then learning from a teacher.
   Subparts figure, detected: featurize ends x .2863; middle modules end x .5861; module centers .2074, .5069, .8067.
   KD figure, detected: top row ends y .4308, dotted line y .4706, bottom plots start x .6025, student ends x .5191. ---------- */
st(`
  <h1 class="t">Finetuning subparts; learning from a teacher</h1>
  <div class="adapt-stack">
    <div class="adapt-sub">
      <div style="aspect-ratio:${3042 / 1372}">
        ${adFig('assets/adapt/ch37-finetuning-subparts.png', 3042 / 1372, adCov([0, 0, .2864, 1], 1) + adCov([.2864, 0, .2998, 1], 2) + adCov([.5862, 0, .4138, 1], 3))}
      </div>
      <div class="adapt-cues">
        ${[['frozen', .2074, 1], ['finetuned', .5069, 2], ['from scratch', .8067, 3]].map(([t, x, s]) => `<div class="adapt-cue" style="left:${x * 100}%"><div class="lead b" data-step="${s}">${t}</div></div>`).join('')}
      </div>
    </div>
    <div class="adapt-kd b" data-step="4"><div>
      ${adFig('assets/adapt/ch37-kd-diagram.png', 6715 / 3997, adCov([0, .45, .56, .55], 5) + adCov([.56, .45, .44, .03], 5) + adCov([.56, .48, .44, .52], 6))}
    </div></div>
  </div>
  ${rdCite(adBook('Figure 37.3 and Figure 37.4 (sections 37.3.1, 37.4, 37.4.1)'))}
`);

/* ---------- p52: fine-tuning example. Road drawings are ours (no Cityscapes images); numbers from Table 2. ---------- */
const AD_FOG = { clearN: 2975, fogN: 498, realN: 101, rows: [['all classes', 34.9, 37.8], ['frequent classes', 52.4, 57.4]] };
const adRoad = (x, y, w, h, fog) => `
  <g><rect x="${x}" y="${y}" width="${w}" height="${h * .55}" fill="#bcd3e6"/>
  <rect x="${x}" y="${y + h * .55}" width="${w}" height="${h * .45}" fill="#9aa5ad"/>
  <polygon points="${x + w * .42},${y + h * .55} ${x + w * .58},${y + h * .55} ${x + w * .85},${y + h} ${x + w * .15},${y + h}" fill="#5b6470"/>
  <rect x="${x + w * .08}" y="${y + h * .3}" width="${w * .1}" height="${h * .27}" fill="#3f5b46"/>
  <rect x="${x + w * .78}" y="${y + h * .26}" width="${w * .12}" height="${h * .31}" fill="#46596b"/>
  <rect x="${x + w * .44}" y="${y + h * .62}" width="${w * .16}" height="${h * .16}" rx="3" fill="#b45f4e"/>
  ${fog ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#e8ecef" opacity=".82"/>` : ''}
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#0f172a" stroke-width="2"/></g>`;
const adBox = (x, y, w, h, fill, t) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${fill}" stroke="#0f172a" stroke-width="2.5"/>
  <text x="${x + w / 2}" y="${y + h / 2 + 9}" font-size="27" font-weight="700" font-style="italic" text-anchor="middle">${t}</text>`;
const adArrow = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#0f172a" stroke-width="3" marker-end="url(#adFog)"/>`;
const AD_BX0 = 800, AD_BXS = 2.9;
const adBar = (y, v, fill) => `<rect x="${AD_BX0}" y="${y}" width="${(v * AD_BXS).toFixed(1)}" height="26" rx="4" fill="${fill}"/>
  <text x="${(AD_BX0 + v * AD_BXS + 8).toFixed(1)}" y="${y + 20}" font-size="23" font-weight="700">${v.toFixed(1)}</text>`;
st(`
  <h1 class="t">Adaptation for driving in the fog</h1>
  <svg class="adapt-svg" viewBox="0 0 1120 440" role="img" aria-label="A model pretrained on 2975 clear images is fine-tuned on 498 synthetic fog images and tested on 101 real fog images. Mean IoU rises from 34.9 to 37.8 percent on all classes and from 52.4 to 57.4 percent on frequent classes.">
    <defs><marker id="adFog" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#0f172a"/></marker></defs>
    <g class="b" data-step="1">
      ${adRoad(50, 34, 200, 120, false)}
      <text x="150" y="184" font-size="24" text-anchor="middle">${AD_FOG.clearN} clear images</text>
      ${adArrow(258, 94, 324, 94)}
      ${adBox(334, 48, 150, 92, AD_PRE, 'f')}
    </g>
    <g class="b" data-step="2">
      ${adRoad(50, 248, 200, 120, true)}
      <text x="150" y="398" font-size="24" text-anchor="middle">${AD_FOG.fogN} synthetic fog images</text>
      ${adArrow(258, 308, 324, 308)}
      ${adBox(334, 262, 150, 92, AD_FT, 'f′')}
      ${adArrow(409, 146, 409, 254)}
      <text x="424" y="207" font-size="24">fine-tune all layers</text>
    </g>
    <g class="b" data-step="3">
      <text x="${AD_BX0 + 40}" y="44" font-size="25" font-weight="700" text-anchor="middle">tested on ${AD_FOG.realN} real fog images</text>
      <text x="${AD_BX0 + 40}" y="74" font-size="22" text-anchor="middle">mean IoU (%)</text>
      <line x1="${AD_BX0}" y1="96" x2="${AD_BX0}" y2="${96 + 134}" stroke="#94a3b8" stroke-width="1.5"/>
      <text x="${AD_BX0 - 12}" y="${96 + 62}" font-size="24" font-weight="700" text-anchor="end">${AD_FOG.rows[0][0]}</text>
      ${adBar(106, AD_FOG.rows[0][1], AD_PRE)}${adBar(142, AD_FOG.rows[0][2], AD_FT)}
      <rect x="${AD_BX0 - 188}" y="386" width="18" height="18" rx="3" fill="${AD_PRE}" stroke="#0f172a"/><text x="${AD_BX0 - 162}" y="402" font-size="22">f, without fine-tuning</text>
      <rect x="${AD_BX0 + 80}" y="386" width="18" height="18" rx="3" fill="${AD_FT}" stroke="#0f172a"/><text x="${AD_BX0 + 106}" y="402" font-size="22">f′, fine-tuned</text>
    </g>
    <g class="b" data-step="4">
      <line x1="${AD_BX0}" y1="240" x2="${AD_BX0}" y2="${240 + 134}" stroke="#94a3b8" stroke-width="1.5"/>
      <text x="${AD_BX0 - 12}" y="${240 + 62}" font-size="24" font-weight="700" text-anchor="end">${AD_FOG.rows[1][0]}</text>
      ${adBar(250, AD_FOG.rows[1][1], AD_PRE)}${adBar(286, AD_FOG.rows[1][2], AD_FT)}
    </g>
  </svg>
  ${rdCite(d6Link('https://arxiv.org/abs/1708.07819', 'Sakaridis, Dai, Van Gool, Semantic Foggy Scene Understanding with Synthetic Data (IJCV 2018)') + ', Table 2 (no dehazing) · road drawings are ours, illustrative')}
`);

/* ---------- p53, p54: scenes read assets/adapt/cl_results.json ---------- */
sc('adaptForget', 'scenes/adapt-forget.html');
sc('adaptCl', 'scenes/adapt-cl.html');

/* ---------- p55: decision diagram, rows from day06 "Which fix? It depends on the data you have" ---------- */
const AD_ROWS = [['some labeled examples', 'Fine-tuning'], ['many unlabeled examples', 'Domain adaptation'], ['only the live stream', 'Test-time adaptation'], ['a world that keeps changing', 'Continual learning']];
const adRowY = i => 40 + i * 66;
const AD_ROOTX = 186, AD_ROOTY = 139, AD_CX = 310, AD_CW = 370, AD_MX = 780, AD_MW = 320;
/* dd = index into AD_DD: the node becomes a button that opens its details (Fernanda's request). Clicks on it do not advance the slide. */
const adNode = (x, cy, w, t, bold, dd) => { const box = `<rect x="${x}" y="${cy - 28}" width="${w}" height="56" rx="10" fill="${bold ? '#f1f5f9' : '#fff'}" stroke="#0f172a" stroke-width="2.2"/>
  <text x="${x + w / 2}" y="${cy + 9}" font-size="26" font-weight="${bold ? 700 : 400}" text-anchor="middle">${t}</text>`;
  return dd == null ? box : `<g class="adapt-dd-hit" onclick="adDetail(event, ${dd})">${box}<text x="${x + w - 18}" y="${cy + 8}" font-size="22" text-anchor="middle">▾</text></g>`; };
/* details: how / needs / fails come from day06's checked adaptation slides and table; a row with no source is left out rather than filled */
const AD_DD = [
  [['how', 'start from the pretrained weights, retrain on your new labeled examples'], ['needs', 'a few labeled examples from the new setting'], ['fails', 'overfits the few; forgets the old setting'], 'Foundations of CV, Ch. 37.3'],
  [['how', 'train so a “which setting?” classifier cannot tell the features apart'], ['needs', 'labeled source, many unlabeled target images'], ['fails', 'aligns the wrong things, e.g. when the class mix differs'], 'DANN: Ganin et al. (JMLR 2016)'],
  [['how', 're-estimate batch-norm statistics on incoming batches; Tent also lowers prediction entropy'], ['needs', 'test batches only, no labels'], ['fails', 'confident mistakes feed themselves'], 'Schneider et al. (NeurIPS 2020) · Tent: Wang et al. (ICLR 2021)'],
  [['how', 'replay stored examples, or penalize moving important weights (EWC)'], ['needs', 'tasks that arrive one after another'], ['fails', 'forgets what it knew'], 'EWC: Kirkpatrick et al. (PNAS 2017)'],
  [['how', 'watch embedding drift, “I don’t know” rate, per-group accuracy, user corrections'], ['needs', 'a small labeled sample, a rule for when to act'], ['fails', 'not noticing the shift at all'], 'source: to add'],
  [['how', 'flag failures → label → check labels → retrain → test on recent data'], ['needs', 'people who can label the failures'], 'source: to add'],
];
const adDdY = i => i < 4 ? adRowY(i) : (i === 4 ? 330 : 400);
const adDdPanel = (d, i) => { const rows = d.filter(r => Array.isArray(r)), src = d[d.length - 1], h = 54 + rows.length * 37, top = Math.max(4, Math.min(466 - h, adDdY(i) - h / 2));   /* sits left of the method boxes, so every button stays clickable */
  return `<foreignObject class="adapt-dd-panel" id="adDD${i}" x="16" y="${top}" width="${AD_MX - 30}" height="${h}" style="display:none" onclick="event.stopPropagation()"><div class="adapt-dd-card">${rows.map(([k, t]) => `<div class="adapt-dd-row"><b>${k}</b><span>${t}</span></div>`).join('')}<div class="adapt-dd-src">${src}</div></div></foreignObject>`; };
window.adDetailClose = () => document.querySelectorAll('.adapt-dd-panel').forEach(p => p.style.display = 'none');
window.adDetail = (ev, i) => { ev.stopPropagation(); const el = document.getElementById('adDD' + i), wasOpen = el.style.display !== 'none'; adDetailClose(); if(!wasOpen) el.style.display = 'block'; };
if(!window.adDetailWired){ window.adDetailWired = true;
  addEventListener('keydown', adDetailClose, true);   /* moving on with the keyboard closes any open panel */
  addEventListener('click', e => { if(!(e.target.closest && e.target.closest('.adapt-dd-hit, .adapt-dd-panel'))) adDetailClose(); }, true); }
st(`
  <style>
    .adapt-dd-hit{ cursor:pointer; }
    g.b:not(.shown) .adapt-dd-hit{ pointer-events:none; }
    .adapt-dd-card{ box-sizing:border-box; height:100%; display:flex; flex-direction:column; gap:7px; padding:10px 16px; background:#fff; border:2px solid var(--ink); border-radius:10px; font-size:20px; line-height:1.2; color:var(--ink); }
    .adapt-dd-row{ display:grid; grid-template-columns:4em 1fr; gap:10px; }
    .adapt-dd-src{ margin-top:auto; font-size:14px; color:var(--mute); }
  </style>
  <h1 class="t">When should each adaptation method be used?</h1>
  <svg class="adapt-svg" viewBox="0 0 1120 470" role="img" aria-label="Decision diagram. Some labeled examples: fine-tuning. Many unlabeled examples: domain adaptation. Only the live stream: test-time adaptation. A world that keeps changing: continual learning. After launch: monitoring. Failures that people can label: human feedback loops.">
    <defs><marker id="adTree" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#0f172a"/></marker></defs>
    <g class="b" data-step="1">${adNode(16, AD_ROOTY, 170, 'You have…', true)}</g>
    ${AD_ROWS.map(([c, m], i) => { const y = adRowY(i);
      return `<g class="b" data-step="${i + 1}">
        <path d="M${AD_ROOTX},${AD_ROOTY} C${AD_ROOTX + 60},${AD_ROOTY} ${AD_CX - 60},${y} ${AD_CX - 6},${y}" fill="none" stroke="#0f172a" stroke-width="2.4" marker-end="url(#adTree)"/>
        ${adNode(AD_CX, y, AD_CW, c)}
        <line x1="${AD_CX + AD_CW}" y1="${y}" x2="${AD_MX - 6}" y2="${y}" stroke="#0f172a" stroke-width="2.4" marker-end="url(#adTree)"/>
        ${adNode(AD_MX, y, AD_MW, m, true, i)}
      </g>`; }).join('')}
    <line class="b" data-step="5" x1="16" y1="283" x2="1100" y2="283" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 7"/>
    ${[['any of these, after launch', 'Monitoring', 330, 5], ['failures people can label', 'Human feedback loops', 400, 6]].map(([c, m, y, k]) => `<g class="b" data-step="${k}">
      ${adNode(AD_CX, y, AD_CW, c)}
      <line x1="${AD_CX + AD_CW}" y1="${y}" x2="${AD_MX - 6}" y2="${y}" stroke="#0f172a" stroke-width="2.4" marker-end="url(#adTree)"/>
      ${adNode(AD_MX, y, AD_MW, m, true, k - 1)}
    </g>`).join('')}
    ${AD_DD.map(adDdPanel).join('')}
  </svg>
  ${rdCite(adBook('sections 37.3 and 37.6') + ' · our diagram; source: to add for the rows Ch. 37 does not cover')}
`);
}

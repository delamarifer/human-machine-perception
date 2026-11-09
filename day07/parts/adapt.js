/* PART: adapt (Day 6 reduced). Google deck pages 43-55 (as of 12:35 on 2026-11-09), one HTML slide per page, plus a code slide for p51.
   Figures: Foundations of Computer Vision, Ch. 37 (CC BY-NC-ND 4.0), shown whole with covers that fade off.
   Panel coordinates detected by script from the original images (normalized x, y, w, h below).
   Fog numbers: Sakaridis, Dai, Van Gool, IJCV 2018, Table 2 (no dehazing column), read from the paper.
   Rotated-digit numbers: read from assets/adapt/cl_results.json by the two scenes. No speaker notes. */
{
section('Transfer Learning');

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
  .adapt-chips{ display:flex; flex-wrap:wrap; gap:1vh 1vw; justify-content:center; flex:0 0 auto; }
  .adapt-chip{ border:2px solid var(--ink); border-radius:999px; padding:.5vh 1.2vw; font-size:clamp(1rem, 1.6vw, 1.5rem); }
  .adapt-math{ display:grid; grid-template-columns:minmax(0, 1.05fr) minmax(0, 1fr); gap:2vw; flex:1 1 auto; min-height:0; align-items:center; }
  .adapt-eqs{ display:flex; flex-direction:column; gap:1.2vh; }
  .adapt-eqs .d6-eq{ font-family:var(--font); font-weight:500; }
  .adapt-eqs .d6-eq b{ font-weight:700; }
  .adapt-eqs .d6-eq .v{ float:right; font-weight:700; }
  .adapt-code{ flex:1 1 auto; min-height:0; margin:0; padding:1.6vh 1.6vw; background:#f8fafc; border:1px solid var(--line); border-radius:10px;
    font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:clamp(.82rem, 1.42vw, 1.36rem); line-height:1.5; color:#0f172a; overflow:hidden; }
  .adapt-code .ln{ display:block; white-space:pre; }
  .adapt-code .c{ color:#64748b; }
  .adapt-cards{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:repeat(3, 1fr); gap:1.6vw; align-items:stretch; }
  .adapt-cards .d6-card{ align-items:center; text-align:center; justify-content:flex-start; }
  .adapt-cards svg{ width:100%; height:20vh; display:block; }
  .adapt-cards svg text{ font-family:var(--font); fill:var(--ink); }
</style>`;

/* ---------- p48: transition ---------- */
st(`${adStyle}
  <div class="adapt-transition"><h1 class="t">Adapting existing trained models for your purposes</h1></div>
`);

/* ---------- p44 (Round 2): Problem Setup, before Adaptation methods as in her deck. Her comment: "this problem framing should be on
   the scenario presented on farm and the drones". Shreya (2026-11-09): a scene that opens on last season and animates to this one.
   scenes/adapt-setup.html: last season (drone, wheat and corn, f), this season (corn turns into soybeans, f answers corn ✗),
   f′ starts from f, then the two names. The scenario, the definitions and f, f′ are the book's (section 37.2). ---------- */
sc('adaptSetup', 'scenes/adapt-setup.html');

/* Code slides (Shreya, 2026-11-09: "a code embedding, similar to distillation, on fine tuning, and then for subnetwork as well").
   PyTorch; checked to run with random tensors on 2026-11-09. One block per click; <c>…</c> marks a comment. */
const adCodeEsc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/&lt;c>/g, '<span class="c">').replace(/&lt;\/c>/g, '</span>');
const adCode = rows => `<pre class="adapt-code">${rows.map(([k, t]) => `<span class="ln b" data-step="${k}">${adCodeEsc(t) || ' '}</span>`).join('')}</pre>`;

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

/* ---------- Code: fine-tuning all layers, on the farm example (f was trained on {wheat, corn}; f′ answers {wheat, soybeans}). ---------- */
st(`
  <h1 class="t">Fine-tuning in a training loop</h1>
  ${adCode([
    [1, 'import torch, torchvision'],
    [1, 'from torch import nn'],
    [1, ''],
    [1, 'model = torchvision.models.resnet18(weights="IMAGENET1K_V1")    <c># f: pretrained weights</c>'],
    [2, 'model.fc = nn.Linear(model.fc.in_features, 2)                   <c># new head: {wheat, soybeans}</c>'],
    [3, 'optimizer = torch.optim.SGD(model.parameters(), lr=1e-3, momentum=0.9)'],
    [3, '                                                <c># every layer learns; a small lr stays close to f</c>'],
    [4, ''],
    [4, 'model.train()'],
    [4, 'for x, y in loader:                             <c># this season’s labeled photos</c>'],
    [5, '    loss = nn.functional.cross_entropy(model(x), y)'],
    [5, '    optimizer.zero_grad()'],
    [5, '    loss.backward()                             <c># gradients reach every layer</c>'],
    [5, '    optimizer.step()'],
  ])}
  ${rdCite('Our code (PyTorch, torchvision ResNet-18) · ' + adBook('section 37.3'))}
`);

/* ---------- p47 "More slides of fine-tuning": finetuning subparts of a network. The teacher figure that was here moved to the
   Knowledge Distillation slide her deck now has. Subparts figure, detected: featurize ends x .2863; middle modules end x .5861;
   module centers .2074, .5069, .8067. ---------- */
st(`
  <h1 class="t">Finetuning subparts of a network</h1>
  <div class="adapt-stack">
    <div class="adapt-sub">
      <div style="aspect-ratio:${3042 / 1372}">
        ${adFig('assets/adapt/ch37-finetuning-subparts.png', 3042 / 1372, adCov([0, 0, .2864, 1], 1) + adCov([.2864, 0, .2998, 1], 2) + adCov([.5862, 0, .4138, 1], 3))}
      </div>
      <div class="adapt-cues">
        ${[['frozen', .2074, 1], ['finetuned', .5069, 2], ['from scratch', .8067, 3]].map(([t, x, s]) => `<div class="adapt-cue" style="left:${x * 100}%"><div class="lead b" data-step="${s}">${t}</div></div>`).join('')}
      </div>
    </div>
  </div>
  ${rdCite(adBook('Figure 37.3 (section 37.3.1)'))}
`);

/* ---------- Code: finetuning subparts, matching Figure 37.3: frozen early layers, finetuned last block, a new head from scratch. ---------- */
st(`
  <h1 class="t">Finetuning subparts in code</h1>
  ${adCode([
    [1, 'model = torchvision.models.resnet18(weights="IMAGENET1K_V1")'],
    [1, 'for p in model.parameters():'],
    [1, '    p.requires_grad = False                     <c># frozen: keep f’s features</c>'],
    [2, 'for p in model.layer4.parameters():'],
    [2, '    p.requires_grad = True                      <c># finetuned: the last block</c>'],
    [3, 'model.fc = nn.Linear(model.fc.in_features, 2)   <c># from scratch: a new head</c>'],
    [4, ''],
    [4, 'optimizer = torch.optim.SGD(['],
    [4, '    {"params": model.layer4.parameters(), "lr": 1e-4},   <c># small steps: finetuned</c>'],
    [4, '    {"params": model.fc.parameters(),     "lr": 1e-2},   <c># bigger steps: from scratch</c>'],
    [4, '], momentum=0.9)'],
    [5, ''],
    [5, '<c># same training loop; gradients stop at the frozen layers</c>'],
  ])}
  ${rdCite('Our code (PyTorch, torchvision ResNet-18) · ' + adBook('Figure 37.3 (section 37.3.1)'))}
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

/* ---------- p49 (new since the build): Learning from a Teacher. Her comments: "include a visual for this to show how learning from
   examples is a type of learning from a teacher" and "a few images ... but not too much text". The two rows are the book's two
   diagrams (section 37.4); "answer key" is the book's lazy-teacher analogy; 90% / 10% is the book's cat and tiger example (37.4.1). ---------- */
const AD_CAT = 'assets/more-data/june-odd-eyed-cat.jpg';
const adLearn = (y, t) => `<rect x="560" y="${y - 44}" width="330" height="88" rx="6" fill="#d9d9d9" stroke="#0f172a" stroke-width="3"/>
  <text x="725" y="${y + 9}" font-size="26" font-weight="700" text-anchor="middle">${t}</text>
  <line x1="896" y1="${y}" x2="966" y2="${y}" stroke="#0f172a" stroke-width="3" marker-end="url(#adT)"/>
  <text x="1010" y="${y + 12}" font-size="36" font-style="italic" text-anchor="middle">f<tspan font-size="24" dy="8">θ</tspan></text>`;
const adCatCard = (x, y) => `<image href="${AD_CAT}" x="${x}" y="${y}" width="104" height="104" preserveAspectRatio="xMidYMid slice"/><rect x="${x}" y="${y}" width="104" height="104" fill="none" stroke="#0f172a" stroke-width="2"/>`;
st(`
  <h1 class="t">Learning from a Teacher</h1>
  <svg class="adapt-svg" viewBox="0 0 1100 470" role="img" aria-label="Top: an image with its label goes into learning from examples, which gives f theta. Bottom: the same image goes to a teacher that answers cat 90 percent, tiger 10 percent, which goes into learning from a teacher.">
    <defs><marker id="adT" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#0f172a"/></marker></defs>
    <g class="b" data-step="1">
      ${adCatCard(30, 40)}
      <rect x="146" y="70" width="96" height="44" rx="6" fill="#fff" stroke="#0f172a" stroke-width="2.5"/><text x="194" y="101" font-size="26" font-weight="700" text-anchor="middle">cat</text>
      <text x="136" y="176" font-size="22" text-anchor="middle">{ x, y } examples</text>
      <line x1="256" y1="92" x2="550" y2="92" stroke="#0f172a" stroke-width="3" marker-end="url(#adT)"/>
      ${adLearn(92, 'Learning from examples')}
    </g>
    <g class="b" data-step="2">
      <text x="403" y="70" font-size="23" text-anchor="middle">an answer key,</text>
      <text x="403" y="126" font-size="23" text-anchor="middle">no explanations</text>
    </g>
    <g class="b" data-step="3">
      <line x1="20" y1="226" x2="1080" y2="226" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="8 6"/>
      ${adCatCard(30, 288)}
      <line x1="140" y1="340" x2="196" y2="340" stroke="#0f172a" stroke-width="3" marker-end="url(#adT)"/>
      <path d="M 206 396 L 230 286 L 290 286 L 314 396 Z" fill="${AD_PRE}" stroke="#0f172a" stroke-width="3"/>
      <text x="260" y="356" font-size="38" font-style="italic" text-anchor="middle">t</text>
      <text x="260" y="428" font-size="22" text-anchor="middle">teacher</text>
      <line x1="320" y1="340" x2="350" y2="340" stroke="#0f172a" stroke-width="3"/>
      <text x="356" y="320" font-size="24" font-weight="700">cat 90%</text>
      <text x="356" y="352" font-size="24">tiger 10%</text>
      <text x="356" y="396" font-size="20" fill="#64748b">explains: a tiger-like cat</text>
      <line x1="486" y1="340" x2="550" y2="340" stroke="#0f172a" stroke-width="3" marker-end="url(#adT)"/>
      ${adLearn(340, 'Learning from a teacher')}
    </g>
  </svg>
  <div class="adapt-chips b" data-step="4">
    ${['Model compression &amp; speed', 'Better generalization &amp; regularization', 'Cross-modal transfer', 'Multi-task &amp; domain adaptation'].map(t => `<div class="adapt-chip">${t}</div>`).join('')}
  </div>
  ${rdCite(adBook('section 37.4 and 37.4.1') + ' · Photo: Keith Kissel, “June odd-eyed-cat” (cropped), CC BY 2.0, via Wikimedia Commons')}
`);

/* ---------- p50 (new since the build): Knowledge Distillation, comparison to supervised learning. Her comment: "explain and animate from
   the book how supervised learning is a type of learning teacher mechanism". Figure 37.4, detected: top row ends y .4308, dotted line
   y .4706, bottom plots start x .6025, student ends x .5191 (the covers that were on the old subparts slide). ---------- */
st(`
  <h1 class="t">Knowledge Distillation</h1>
  <div class="adapt-stack"><div style="width:min(62vw, 100vh);aspect-ratio:1.68">
    ${adFig('assets/adapt/ch37-kd-diagram.png', 6715 / 3997, adCov([0, .45, .56, .55], 2) + adCov([.56, .45, .44, .03], 2) + adCov([.56, .48, .44, .52], 3))}
  </div></div>
  <div class="adapt-why b" data-step="1">supervised learning: the label is a teacher that puts all its belief on one class</div>
  <div class="adapt-why b" data-step="4"><b>a teacher gives partial credit to similar classes: more information per image</b></div>
  ${rdCite(adBook('Figure 37.4 (section 37.4.1)'))}
`);

/* ---------- p51 (new since the build): Knowledge Distillation, the setup and the loss. Her comment: "include the math formulas that are
   relevant during the calculation". Worked example: the logits, T and alpha are example inputs; every value is computed below.
   Loss as in Hinton, Vinyals and Dean 2015 (soft targets at temperature T, scaled by T squared, plus cross-entropy on the labels).
   Response-, feature- and relation-based: the categories of Gou et al., IJCV 2021. ---------- */
const AD_K = ['cat', 'tiger', 'giraffe', 'dog'];
const AD_ZT = [5.0, 3.6, 1.0, 1.4], AD_ZS = [2.2, 0.4, 0.9, 1.1], AD_T = 4, AD_A = 0.5, AD_Y = 0;
const adSoft = (z, T) => { const e = z.map(v => Math.exp(v / T)), s = e.reduce((a, b) => a + b, 0); return e.map(v => v / s); };
const AD_P1 = adSoft(AD_ZT, 1), AD_PT = adSoft(AD_ZT, AD_T), AD_QT = adSoft(AD_ZS, AD_T), AD_Q1 = adSoft(AD_ZS, 1);
const AD_KL = AD_PT.reduce((a, p, i) => a + p * Math.log(p / AD_QT[i]), 0);
const AD_CE = -Math.log(AD_Q1[AD_Y]);
const AD_L = AD_A * AD_T * AD_T * AD_KL + (1 - AD_A) * AD_CE;
const f2 = v => v.toFixed(2), f3 = v => v.toFixed(3);
const adBars = (y0, vals, step, fill, dx, name) => vals.map((v, i) => `<rect class="b" data-step="${step}" x="${70 + i * 120 + dx}" y="${(y0 - v * 150).toFixed(1)}" width="40" height="${(v * 150).toFixed(1)}" fill="${fill}" stroke="#0f172a" stroke-width="1.5"/>`).join('');
const adAxis = (y0, label) => `<line x1="50" y1="${y0}" x2="540" y2="${y0}" stroke="#94a3b8" stroke-width="2"/>${AD_K.map((k, i) => `<text x="${110 + i * 120}" y="${y0 + 28}" font-size="22" text-anchor="middle"${i === AD_Y ? ' font-weight="700"' : ''}>${k}</text>`).join('')}<text x="50" y="${y0 - 164}" font-size="22" font-weight="700">${label}</text>`;
st(`
  <h1 class="t">Knowledge Distillation</h1>
  <div class="adapt-math">
    <div class="adapt-eqs">
      <div class="d6-eq b" data-step="1"><b>Soft targets:</b> p<sub>i</sub> = exp(z<sub>i</sub>/T) / Σ<sub>j</sub> exp(z<sub>j</sub>/T)</div>
      <div class="d6-eq b" data-step="2">teacher at T = ${AD_T}: p<sub>cat</sub> falls from ${f2(AD_P1[0])} to ${f2(AD_PT[0])}; p<sub>tiger</sub> rises to ${f2(AD_PT[1])}</div>
      <div class="d6-eq b" data-step="3"><b>Teacher vs. student:</b> student q at the same T</div>
      <div class="d6-eq b" data-step="4"><b>KL</b>(p ‖ q) = Σ<sub>i</sub> p<sub>i</sub> log(p<sub>i</sub>/q<sub>i</sub>) <span class="v">= ${f3(AD_KL)}</span></div>
      <div class="d6-eq b" data-step="5"><b>CE</b> with the label: −log q<sub>cat</sub> (T = 1) <span class="v">= ${f3(AD_CE)}</span></div>
      <div class="d6-eq b" data-step="6"><b>L</b> = α · T² · KL + (1 − α) · CE, α = ${AD_A} <span class="v">= ${f3(AD_L)}</span></div>
      <div class="label b" data-step="7"><b>Offline distillation:</b> the teacher is frozen; only the student learns · Types: response-, feature- and relation-based</div>
    </div>
    <svg class="adapt-svg" viewBox="0 0 560 470" role="img" aria-label="Bar charts of the teacher's probabilities at temperature 1 and 4 and the student's probabilities at temperature 4, over cat, tiger, giraffe and dog">
      <g class="b" data-step="1">${adAxis(200, 'teacher, T = 1')}${adBars(200, AD_P1, 1, '#0f172a', 0)}</g>
      <g class="b" data-step="2">${adAxis(430, 'teacher vs. student, T = ' + AD_T)}${adBars(430, AD_PT, 2, '#0f172a', -2)}</g>
      <g class="b" data-step="3">${adBars(430, AD_QT, 3, '#cbd5e1', 40)}
        <rect x="380" y="250" width="16" height="16" fill="#0f172a"/><text x="402" y="264" font-size="20">teacher p</text>
        <rect x="380" y="276" width="16" height="16" fill="#cbd5e1" stroke="#0f172a"/><text x="402" y="290" font-size="20">student q</text></g>
    </svg>
  </div>
  ${rdCite('Logits, T and α are an example; values computed · ' + d6Link('https://arxiv.org/abs/1503.02531', 'Hinton, Vinyals and Dean, Distilling the Knowledge in a Neural Network (2015)') + ' · types: ' + d6Link('https://arxiv.org/abs/2006.05525', 'Gou et al., Knowledge Distillation: A Survey (IJCV 2021)'))}
`);

/* ---------- p51, second slide (her reply: "include a code snippet (on a different slide as needed) to show distillation_loss and
   forward pass usage inside a training loop"). PyTorch; checked to run on random tensors on 2026-11-09. One block per click. ---------- */
const AD_CODE = [
  [1, 'import torch, torch.nn.functional as F'],
  [1, ''],
  [1, 'def distillation_loss(student_logits, teacher_logits, labels, T=4.0, alpha=0.5):'],
  [2, '    p = F.softmax(teacher_logits / T, dim=-1)          <c># soft targets</c>'],
  [2, '    log_q = F.log_softmax(student_logits / T, dim=-1)'],
  [2, '    kl = F.kl_div(log_q, p, reduction="batchmean") * T * T'],
  [3, '    ce = F.cross_entropy(student_logits, labels)       <c># the true labels</c>'],
  [3, '    return alpha * kl + (1 - alpha) * ce'],
  [4, ''],
  [4, 'teacher.eval()                                         <c># offline: frozen</c>'],
  [4, 'for x, y in loader:'],
  [4, '    with torch.no_grad():'],
  [4, '        teacher_logits = teacher(x)                    <c># forward pass, no gradients</c>'],
  [5, '    student_logits = student(x)                        <c># forward pass</c>'],
  [5, '    loss = distillation_loss(student_logits, teacher_logits, y)'],
  [6, '    optimizer.zero_grad()'],
  [6, '    loss.backward()                                    <c># gradients reach only the student</c>'],
  [6, '    optimizer.step()'],
];
const adEsc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/&lt;c>/g, '<span class="c">').replace(/&lt;\/c>/g, '</span>');
st(`
  <h1 class="t">Knowledge Distillation in a training loop</h1>
  <pre class="adapt-code">${AD_CODE.map(([k, t]) => `<span class="ln b" data-step="${k}">${adEsc(t) || ' '}</span>`).join('')}</pre>
  ${rdCite('Our code (PyTorch) · loss as in ' + d6Link('https://arxiv.org/abs/1503.02531', 'Hinton, Vinyals and Dean (2015)'))}
`);

/* ---------- p52 (new since the build): Use Cases, her three. Drawings are ours. ---------- */
const AD_UC = [
  ['Efficiency', 'student smaller or faster', `<path d="M 30 150 L 70 30 L 150 30 L 190 150 Z" fill="${AD_PRE}" stroke="#0f172a" stroke-width="4"/><text x="110" y="110" font-size="40" font-style="italic" text-anchor="middle">t</text>
    <line x1="200" y1="90" x2="250" y2="90" stroke="#0f172a" stroke-width="4" marker-end="url(#adU)"/>
    <path d="M 262 150 L 282 90 L 318 90 L 338 150 Z" fill="#fff" stroke="#0f172a" stroke-width="4"/><text x="300" y="136" font-size="28" font-style="italic" text-anchor="middle">f</text>`,
    d6Link('https://cseweb.ucsd.edu/~mkchandraker/pdf/nips17_distillationdetection.pdf', 'Chen et al., NeurIPS 2017')],
  ['Learning without Forgetting', 'an ImageNet classifier is extended to a new task (e.g., scene recognition)', `<rect x="40" y="70" width="110" height="60" rx="6" fill="${AD_PRE}" stroke="#0f172a" stroke-width="4"/><text x="95" y="108" font-size="24" text-anchor="middle">shared</text>
    <line x1="150" y1="90" x2="210" y2="50" stroke="#0f172a" stroke-width="4"/><line x1="150" y1="110" x2="210" y2="150" stroke="#0f172a" stroke-width="4"/>
    <rect x="212" y="26" width="128" height="46" rx="6" fill="#fff" stroke="#0f172a" stroke-width="3"/><text x="276" y="57" font-size="22" text-anchor="middle">ImageNet</text>
    <rect x="212" y="128" width="128" height="46" rx="6" fill="#fff" stroke="#0f172a" stroke-width="3"/><text x="276" y="159" font-size="22" text-anchor="middle">scenes</text>`,
    d6Link('https://arxiv.org/abs/1606.09282', 'Li and Hoiem, Learning without Forgetting (ECCV 2016)')],
  ['Privacy', 'models trained on private images → extend to public', `<rect x="34" y="60" width="120" height="90" rx="8" fill="#e2e8f0" stroke="#0f172a" stroke-width="4"/><rect x="74" y="86" width="40" height="32" rx="4" fill="#0f172a"/><path d="M 82 86 v -10 a 12 12 0 0 1 24 0 v 10" fill="none" stroke="#0f172a" stroke-width="5"/>
    <text x="94" y="176" font-size="22" text-anchor="middle">private data</text>
    <line x1="164" y1="105" x2="226" y2="105" stroke="#0f172a" stroke-width="4" marker-end="url(#adU)"/>
    <rect x="236" y="60" width="120" height="90" rx="8" fill="#fff" stroke="#0f172a" stroke-width="4"/><text x="296" y="114" font-size="26" font-style="italic" text-anchor="middle">f</text>
    <text x="296" y="176" font-size="22" text-anchor="middle">public model</text>`,
    d6Link('https://arxiv.org/abs/1610.05755', 'Papernot et al., PATE (ICLR 2017)')],
];
st(`
  <h1 class="t">Use Cases</h1>
  <svg width="0" height="0" style="position:absolute"><defs><marker id="adU" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#0f172a"/></marker></defs></svg>
  <div class="adapt-cards">
    ${AD_UC.map(([h, t, g], i) => `<div class="d6-card b" data-step="${i + 1}"><svg viewBox="0 0 380 190" aria-hidden="true">${g}</svg><div class="lead"><b>${h}</b></div><div class="label">${t}</div></div>`).join('')}
  </div>
  ${rdCite('Our drawings · ' + AD_UC.map(u => u[3]).join(' · '))}
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

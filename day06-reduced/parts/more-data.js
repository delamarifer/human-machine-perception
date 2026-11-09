/* PART: more-data (Day 6 reduced). Google deck pages 7-13. One Google slide = one HTML slide. No speaker notes.
   Figures: Shotton et al. 2011 Fig. 2 and OpenAI et al. 2019 Fig. 3, cropped by detecting whitespace; divider column of
   Shotton Fig. 2 detected by a script (column 2122 of 3941). Sources checked against the papers on 2026-11-09. */
{
section('More data');

const mdA = (url, t) => d6Link(url, t);
const mdCatCredit = 'Photo: Keith Kissel, "June odd-eyed-cat" (cropped), CC BY 2.0, via Wikimedia Commons';
const mdCh36 = mdA('https://visionbook.mit.edu/data_augmentation.html', 'Foundations of Computer Vision, Ch. 36');

const mdStyle = `<style>
  .more-data-sub{ font-weight:700; }
  .more-data-three{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:repeat(3, 1fr); gap:2vw; align-items:stretch; }
  .more-data-card{ background:#f8fafc; border:1px solid var(--line); border-radius:12px; padding:2vh 1.4vw; display:flex; flex-direction:column; align-items:center; justify-content:space-between; gap:1vh; }
  .more-data-obj{ flex:1 1 auto; min-height:0; display:flex; align-items:center; justify-content:center; }
  .more-data-flip.b{ opacity:1; transform:none; transition:transform .9s ease; }
  .more-data-flipx.b.shown{ transform:scaleX(-1); }
  .more-data-flipr.b.shown{ transform:rotate(180deg); }
  .more-data-cat{ width:min(19vw, 32vh); aspect-ratio:1; object-fit:cover; border-radius:10px; display:block; }
  .more-data-glyph{ font-family:Georgia, 'Times New Roman', serif; font-weight:700; font-size:clamp(7rem, 17vw, 16rem); line-height:1; display:inline-block; }
  .more-data-verdict{ font-size:clamp(1.5rem, 2.5vw, 2.3rem); font-weight:700; text-align:center; }
  .more-data-kin{ display:flex; flex-direction:column; gap:1vh; }
  .more-data-kfig{ flex:1 1 auto; min-height:0; display:flex; }
  .more-data-ladder{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:center; }
  .more-data-rung{ display:grid; grid-template-columns:7vw 11vh 1fr; align-items:center; gap:1.4vw; height:15.4vh; }
  .more-data-rail{ position:relative; height:100%; }
  .more-data-rail::before, .more-data-rail::after{ content:''; position:absolute; top:0; bottom:0; width:5px; background:#475569; }
  .more-data-rail::before{ left:12%; } .more-data-rail::after{ right:12%; }
  .more-data-rail i{ position:absolute; left:12%; right:12%; top:50%; height:5px; background:#475569; }
  .more-data-rail b{ position:absolute; left:50%; top:50%; transform:translate(-50%, -50%); width:4.6vh; height:4.6vh; border-radius:50%; background:var(--ink); color:#fff; display:flex; align-items:center; justify-content:center; font-size:clamp(1.2rem, 2.8vh, 1.6rem); }
  .more-data-ico{ width:11vh; height:11vh; display:block; }
  .more-data-rung .name{ font-size:clamp(1.3rem, 2.25vw, 2rem); font-weight:700; line-height:1.12; }
  .more-data-rung .desc{ font-size:clamp(1.1rem, 1.7vw, 1.55rem); line-height:1.2; }
  .more-data-trans{ margin:auto; display:flex; flex-direction:column; align-items:center; text-align:center; gap:4vh; max-width:82vw; }
  .more-data-trans h1.t{ font-size:clamp(3rem, 6.4vw, 6rem); }
</style>`;

/* ---------- p7 ---------- */
sc('mdNotBetter', 'scenes/more-data-notbetter.html');

/* ---------- p8 ---------- */
sc('mdAugment', 'scenes/more-data-augment.html');

/* ---------- p9: the flips happen on screen. Text is from her page (a screenshot of day06 parts/broaden.js). ---------- */
st(`${mdStyle}
  <h1 class="t">Some augmentations are not safe</h1>
  <div class="lead more-data-sub b" data-step="1">Only use changes that keep the label true</div>
  <div class="more-data-three">
    <div class="more-data-card b" data-step="1">
      <div class="more-data-obj"><img class="more-data-cat more-data-flip more-data-flipx b" data-step="2" src="assets/more-data/june-odd-eyed-cat.jpg" alt="A white cat with one yellow and one blue eye"></div>
      <div class="label center b" data-step="2">mirror a cat: still a cat</div>
      <div class="more-data-verdict b" data-step="2">✓ safe</div>
    </div>
    <div class="more-data-card b" data-step="3">
      <div class="more-data-obj"><span class="more-data-glyph more-data-flip more-data-flipx b" data-step="4">b</span></div>
      <div class="label center b" data-step="4">mirror a "b": it reads "d"</div>
      <div class="more-data-verdict b" data-step="4">✗ unsafe</div>
    </div>
    <div class="more-data-card b" data-step="5">
      <div class="more-data-obj"><span class="more-data-glyph more-data-flip more-data-flipr b" data-step="6">6</span></div>
      <div class="label center b" data-step="6">turn a "6" upside down: it reads "9"</div>
      <div class="more-data-verdict b" data-step="6">✗ unsafe</div>
    </div>
  </div>
  ${rdCite(mdCh36 + ' (the b and d example) · ' + mdCatCredit, 1)}
`);

/* ---------- p10: Shotton et al. 2011, Fig. 2, whole. The real half is covered until its click. ---------- */
st(`
  <h1 class="t">The augmentation must be physically plausible or in line with your dataset</h1>
  <div class="more-data-kin">
    <div class="lead b" data-step="1">Kinect body tracking: trained on synthetic 3D people</div>
    <div class="lead b" data-step="2">poses from real motion capture, 15 body shapes</div>
  </div>
  <div class="more-data-kfig b" data-step="1">
    ${rfig('assets/more-data/shotton-fig2.jpg', 3941 / 848, [{ r: [2128 / 3941, 0, 1 - 2128 / 3941, 1], k: 'cov', step: 3 }])}
  </div>
  ${rdCite('Figure 2: ' + mdA('https://www.microsoft.com/en-us/research/publication/real-time-human-pose-recognition-in-parts-from-a-single-depth-image/', 'Shotton et al., Real-Time Human Pose Recognition in Parts from Single Depth Images (CVPR 2011)'), 1)}
`);

/* ---------- p11: her five levels as a ladder, built from the bottom. Icons are our drawings. ---------- */
const mdIcons = {
  1: `<rect x="6" y="14" width="88" height="72" rx="5" fill="#f1f5f9" stroke="#475569" stroke-width="3"/><rect x="6" y="58" width="88" height="28" fill="#94a3b8"/><path d="M 34 58 L 44 34 L 62 34 L 72 58 Z" fill="#475569"/><rect x="6" y="14" width="88" height="42" fill="#fff" opacity=".72"/>`,
  2: `<path d="M 8 84 L 92 84 L 92 56 Z" fill="#cbd5e1" stroke="#475569" stroke-width="3" stroke-linejoin="round"/><circle cx="36" cy="58" r="12" fill="#0f172a"/><path d="M 36 12 L 36 36 M 28 28 L 36 37 L 44 28" fill="none" stroke="#0f172a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
  3: `<path d="M 8 50 L 38 30 L 38 70 Z" fill="#475569"/><rect x="2" y="42" width="14" height="16" rx="2" fill="#0f172a"/><path d="M 38 30 L 94 12 L 94 88 L 38 70" fill="#f1f5f9" stroke="#475569" stroke-width="3" stroke-linejoin="round"/><rect x="58" y="56" width="26" height="12" rx="3" fill="#64748b"/><path d="M 62 56 L 67 47 L 78 47 L 82 56 Z" fill="#64748b"/><circle cx="64" cy="70" r="4" fill="#0f172a"/><circle cx="78" cy="70" r="4" fill="#0f172a"/>`,
  4: `<rect x="6" y="10" width="88" height="80" rx="6" fill="#f1f5f9" stroke="#475569" stroke-width="3"/><path d="M 6 58 L 94 58 M 42 10 L 42 90" stroke="#94a3b8" stroke-width="7"/><rect x="14" y="20" width="18" height="28" fill="#64748b"/><rect x="54" y="18" width="30" height="16" fill="#475569"/><rect x="58" y="68" width="24" height="16" fill="#64748b"/><circle cx="24" cy="74" r="9" fill="#94a3b8"/>`,
  5: `<rect x="4" y="24" width="92" height="54" rx="4" fill="#0f172a"/>${[0, 1, 2].map(k => `<rect x="${10 + k * 29}" y="32" width="23" height="38" rx="2" fill="#e2e8f0"/><rect x="${10 + k * 29}" y="52" width="23" height="18" fill="#94a3b8"/><circle cx="${15 + k * 37 * .9}" cy="${58 - k * 2}" r="4" fill="#0f172a"/>`).join('')}<path d="M 82 6 L 85 14 L 93 17 L 85 20 L 82 28 L 79 20 L 71 17 L 79 14 Z" fill="#475569"/>`,
};
const mdRung = (n, name, desc) => `<div class="more-data-rung b" data-step="${n}">
  <div class="more-data-rail"><i></i><b>${n}</b></div>
  <svg class="more-data-ico" viewBox="0 0 100 100" aria-hidden="true">${mdIcons[n]}</svg>
  <div><div class="name">${name}</div><div class="desc">${desc}</div></div>
</div>`;
st(`
  <h1 class="t">Simulating a natural world (tools)</h1>
  <div class="more-data-ladder">
    ${mdRung(5, 'Generative world models', 'NVIDIA Cosmos: generate physically consistent video')}
    ${mdRung(4, 'Domain simulators', 'ready made worlds')}
    ${mdRung(3, 'Renderers', 'CARLA, AirSim')}
    ${mdRung(2, 'Physics engines', 'how things move: gravity, collisions, friction')}
    ${mdRung(1, 'Physics-based image augmentation', 'edit real images')}
  </div>
  ${rdCite('Our drawings · ' + mdA('https://arxiv.org/abs/1711.03938', 'CARLA (Dosovitskiy et al. 2017)') + ' · ' + mdA('https://arxiv.org/abs/1705.05065', 'AirSim (Shah et al. 2017)') + ' · ' + mdA('https://arxiv.org/abs/2501.03575', 'NVIDIA Cosmos (2025)'), 1)}
`);

/* ---------- p12: two examples, one slide, same title as p11 so {sub:false} keeps its own number ---------- */
sc('mdSim', 'scenes/more-data-sim.html', { sub: false });

/* ---------- p13: transition, her full sentence ---------- */
st(`
  <div class="more-data-trans">
    <h1 class="t">More and better data!</h1>
    <div class="statement b" data-step="1">Keep this in the back of your mind: can researchers develop algorithms that need less data?</div>
  </div>
`);
}

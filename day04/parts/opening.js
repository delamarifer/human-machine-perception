/* PART: opening (Day 4). Owner: Fernanda · Shreya.
   Lesson title: CNNs and Object Recognition: What Do Models Actually Learn to See?
   120-minute university-level Visual Perception lecture & studio. */
{
section('Title');

const day4Style = `<style>
  .stage{ padding:7.2vh 5.2vw 9.5vh; gap:1.5vh; }
  .stage > .cite{ position:static; margin-top:auto; padding-top:.8vh; font-size:clamp(.8rem, 1.12vw, 1.15rem); color:var(--mute); }
  .d4-cols{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1fr; gap:2.4vw; align-items:center; }
  .d4-grid3{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:repeat(3, 1fr); gap:1.6vw; align-items:stretch; }
  .d4-grid4{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:repeat(4, 1fr); gap:1.3vw; align-items:stretch; }
  .d4-card{ background:#f8fafc; padding:1.4vh 1.4vw; border-radius:12px; border:1px solid var(--line); display:flex; flex-direction:column; gap:.8vh; }
  .d4-qs{ display:grid; grid-template-columns:repeat(3, 1fr); gap:1.4vw; width:100%; align-items:stretch; }
  .d4-q{ font-size:clamp(1.2rem, 1.95vw, 1.72rem); font-weight:700; line-height:1.35; text-align:left;
    padding:2vh 1.25vw; border-radius:12px; background:#f8fafc; border:1px solid var(--line); border-top:6px solid;
    white-space:nowrap; }
  .d4-q.q-rec{ border-top-color:#2563eb; border-left-color:#2563eb; }
  .d4-q.q-feat{ border-top-color:#d97706; border-left-color:#d97706; }
  .d4-q.q-gen{ border-top-color:#16a34a; border-left-color:#16a34a; }
  .d4-code{ background:#0f172a; color:#f8fafc; padding:1.4vh 1.4vw; border-radius:12px;
    font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:clamp(.75rem, 1.08vw, 1.02rem); line-height:1.42; }
  .d4-eq{ background:#f1f5f9; border:1px solid #cbd5e1; border-left:4px solid var(--early); border-radius:10px;
    padding:1vh 1.2vw; font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
    font-size:clamp(.88rem, 1.32vw, 1.28rem); font-weight:600; color:#0f172a; line-height:1.38; }
  code.m{ font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:.9em; font-weight:600;
    background:#f1f5f9; border:1px solid #cbd5e1; border-radius:5px; padding:.06em .34em; color:#0f172a; white-space:nowrap; }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){
    .stage{ padding:6vh 4vw 6.5vh; gap:1vh; }
    .stage h1.t{ font-size:clamp(1.18rem, 4vw, 1.7rem); }
    .stage .statement{ font-size:clamp(1rem, 3.2vw, 1.4rem); }
    .stage .question{ font-size:clamp(1.1rem, 3.5vw, 1.6rem); }
    .stage .lead, .stage ul.frag li{ font-size:clamp(.9rem, 2.6vw, 1.2rem); line-height:1.26; }
    .stage .label{ font-size:clamp(.76rem, 2.2vw, 1rem); line-height:1.25; }
    .d4-cols, .d4-grid3, .d4-grid4, .d4-qs{ grid-template-columns:1fr; gap:1.1vh; }
    .d4-q{ font-size:clamp(1.15rem, 3.5vw, 1.6rem); padding:1.1vh 3.5vw; border-top-width:0; border-left-width:7px; white-space:normal; }
    .stage .flow{ flex-wrap:wrap; gap:.8vh 1vw; }
    .stage .flow .step{ padding:1vh 1vw; min-width:42%; }
  }
</style>`;

st(`${day4Style}
  <div class="center" style="margin:auto">
    <div class="statement" style="font-weight:700;font-size:clamp(2rem,3.7vw,3.3rem)">CNNs and Object Recognition</div>
    <div class="lead" style="margin-top:1.6vh">What Do Models Actually Learn to See?</div>
    <div class="label" style="margin-top:2.2vh">Day 4 · Visual Perception</div>
    <div class="label" style="margin-top:.8vh">Fernanda De La Torre · Shreya Pandit</div>
  </div>
`, { blank: false, notes: "(draft) Welcome to Day 4: CNNs and Object Recognition: What Do Models Actually Learn to See? Today we connect convolutional neural networks, object recognition tasks, dataset bias and distribution shift, human versus machine texture/shape perception, and modern pretrained vision models." });

st(`
  <div class="center" style="margin:auto">
    <div class="d4-qs">
      <div class="d4-q q-rec">How do CNNs <b style="color:#2563eb">recognize</b> objects?</div>
      <div class="d4-q q-feat">What <b style="color:#d97706">features</b> do they rely on?</div>
      <div class="d4-q q-gen">How well do they <b style="color:#16a34a">generalize</b>?</div>
    </div>
    <div class="flow" style="margin-top:3.2vh">
      <div class="step b" data-step="1"><b>1. CNN Hierarchy</b><span class="label">Pixels → features</span></div>
      <div class="arrow b" data-step="2">→</div>
      <div class="step b" data-step="2"><b>2. Recognition</b><span class="label">What, where, which pixels</span></div>
      <div class="arrow b" data-step="3">→</div>
      <div class="step b" data-step="3"><b>3. Bias &amp; Shift</b><span class="label">Dollar Street &amp; OOD</span></div>
      <div class="arrow b" data-step="4">→</div>
      <div class="step b" data-step="4"><b>4. Human vs CNN</b><span class="label">Texture vs. shape</span></div>
      <div class="arrow b" data-step="5">→</div>
      <div class="step b" data-step="5"><b>5. Transfer &amp; Lab</b><span class="label">Foundation models</span></div>
    </div>
  </div>
`, { notes: [
  "(draft) Three questions for today. First: how do CNNs recognize objects? Second: what visual features do they actually rely on? Third: how well do those representations generalize beyond the training data?",
  "(draft) Part 1: How CNNs build hierarchical visual representations from pixels to object parts.",
  "(draft) Part 2: What object recognition is—five tasks on the same image (classify, localize, detect, segment)—then why it is hard, and why accuracy is not the same as recognizing the object.",
  "(draft) Part 3: Dataset bias, spurious correlations, distribution shift, and Gapminder's Dollar Street.",
  "(draft) Part 4: Human vs. machine perception—Geirhos et al.'s texture-bias discovery, Mooney faces, and the Model-vs-Human benchmark.",
  "(draft) Part 5: Transfer learning, modern pretrained foundation models, and our hands-on Colab exploration."
]});
}

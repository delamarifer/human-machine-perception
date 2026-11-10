/* PART: trilemma (Day 8 part B). Owner: Fernanda. Recap on the generative learning trilemma (Xiao, Kreis, Vahdat, ICLR 2022), then questions.
   About 15 minutes. The triangle is redrawn here with the paper's layout (Figure 1): quality on top, fast sampling bottom left, mode coverage bottom right;
   GANs on the left edge, diffusion on the right edge, VAEs and normalizing flows on the bottom edge. Notes and questions are drafts. */
{
section('Trilemma');

const d8Corner = (x, y, t, step) => `<div class="trilemma-c b" data-step="${step}" style="left:${x}%;top:${y}%">${t}</div>`;
const d8Edge = (x, y, t, step, extra = '') => `<div class="trilemma-e b" data-step="${step}" style="left:${x}%;top:${y}%;${extra}">${t}</div>`;
const d8Bar = (x1, y1, x2, y2, step) => `<line class="b trilemma-bar" data-step="${step}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" />`;

st(`
  <style>
    .trilemma-wrap{ position:relative; flex:1 1 auto; min-height:0; }
    .trilemma-wrap svg{ position:absolute; inset:0; width:100%; height:100%; }
    .trilemma-tri{ fill:none; stroke:var(--line); stroke-width:.5; vector-effect:non-scaling-stroke; }
    .trilemma-bar{ stroke:var(--ink); stroke-width:6; stroke-linecap:round; vector-effect:non-scaling-stroke; transform:none !important; }
    .trilemma-c{ position:absolute; transform:translate(-50%, -50%) !important; background:#fff; border:2px solid var(--ink); border-radius:999px; padding:.5em 1.1em; font-weight:700; text-align:center;
      font-size:clamp(1.2rem, 2vw, 1.9rem); line-height:1.12; white-space:nowrap; }
    .trilemma-e{ position:absolute; transform:translate(-50%, -50%) !important; text-align:center; font-size:clamp(1.15rem, 1.9vw, 1.8rem); line-height:1.15; white-space:nowrap; background:#fff; padding:.15em .5em; }
    .trilemma-e small{ display:block; font-size:.72em; color:var(--mute); }
    .trilemma-q{ position:absolute; left:50%; top:56%; transform:translate(-50%, -50%) !important; }
  </style>
  <h1 class="t">The generative learning trilemma</h1>
  <div class="trilemma-wrap">
    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
      <polygon class="trilemma-tri" points="50,12 20,88 80,88" />
      ${d8Bar(50, 12, 20, 88, 4)}
      ${d8Bar(20, 88, 80, 88, 5)}
      ${d8Bar(50, 12, 80, 88, 6)}
    </svg>
    ${d8Corner(50, 12, 'High-quality samples', 1)}
    ${d8Corner(20, 88, 'Fast sampling', 2)}
    ${d8Corner(80, 88, 'Mode coverage, diversity', 3)}
    ${d8Edge(21, 46, 'GANs<small>sharp and fast, can miss modes</small>', 4)}
    ${d8Edge(50, 77, 'VAEs, normalizing flows<small>cover the data, lower quality</small>', 5)}
    ${d8Edge(79, 46, 'Diffusion<small>quality and coverage, slow</small>', 6)}
    <div class="question b trilemma-q" data-step="7" style="text-align:center">Flow matching?</div>
  </div>
  ${cite(D8_REF.tri + ', Figure 1')}
`, { notes: [
  "(draft) Let us put everything from today on one picture. This is the generative learning trilemma, from Xiao, Kreis and Vahdat.",
  "(draft) A generative model should give high-quality samples.",
  "(draft) It should sample fast. Interactive editing or real-time speech synthesis cannot wait for a thousand network evaluations.",
  "(draft) And it should cover the modes of the data, which means diversity. The paper points out that this matters for representing minorities and for reducing the negative social impacts of these models. Existing models usually give up one of the three.",
  "(draft) GANs are on this edge. They generate high-quality samples quickly, with one pass through the generator, but they have poor mode coverage.",
  "(draft) VAEs and normalizing flows are on this edge. They cover the data faithfully, and they sample fast, but they often suffer from low sample quality.",
  "(draft) And diffusion is on this edge: strong quality and strong coverage, but sampling often takes thousands of network evaluations.",
  "(draft) So here is a question for you. Where does flow matching go? Remember the same-coin slide. With a Gaussian source it is the same model as diffusion, so it starts on the same edge. Its cost is still the number of steps."
]});

st(`
  <h1 class="t">Why diffusion is slow, and one way out</h1>
  <div class="d8-body">
    <div class="d8-row b" data-step="1"><div class="label">The cause</div><div class="lead">Each denoising step is assumed Gaussian, which holds only for small steps</div></div>
    <div class="d8-row b" data-step="2"><div class="label">Large steps</div><div class="lead">Many clean images fit one noisy image: the step is multimodal</div></div>
    <div class="d8-row b" data-step="3"><div class="label">Denoising diffusion GANs</div><div class="lead">Model each large step with a conditional GAN</div></div>
    <div class="d8-row b" data-step="4"><div class="label">Result on CIFAR-10</div><div class="lead">As few as 2 steps, about 2000× faster than a score-based sampler</div></div>
  </div>
  ${cite(`${D8_REF.tri}. Speed-up measured against the predictor-corrector sampler of Song et al. 2021`)}
`, { notes: [
  "(draft) The trilemma paper also explains why diffusion sits where it does, and this is the slide from the start of the hour coming back.",
  "(draft) The reverse step is assumed to be Gaussian, and that is justified only when the steps are small. So you need many of them.",
  "(draft) If you take a large step, the true reverse step is no longer Gaussian. Many plausible clean images correspond to the same noisy image, so the distribution has many modes.",
  "(draft) Their fix is to model each large reverse step with a conditional GAN, which can represent a multimodal distribution. This mixes two of the families we have seen today.",
  "(draft) On CIFAR-10, it takes as few as two denoising steps, and it is about 2000 times faster than the predictor-corrector sampler of Song and colleagues, with competitive quality and diversity. That is one result on one small dataset, from 2022. Trading off these three requirements is still an active research area."
]});

st(`
  <h1 class="t">Questions</h1>
  <div class="d8-body">
    <div class="question b" data-step="1">Your project needs generated images: which corner of the triangle can you give up?</div>
    <div class="question b" data-step="2">If flow matching and diffusion are the same model, why do people say they switched?</div>
    <div class="question b" data-step="3">What would it mean for a model to miss a mode of your data, and how would you notice?</div>
  </div>
`, { notes: [
  "(draft) We have time for questions and discussion. Here are three to start with.",
  "(draft) First, think about your project. If it needs generated images, which corner can you give up?",
  "(draft) Second, if flow matching and diffusion are the same model with a Gaussian source, why do people say they switched from one to the other? Think about what actually changed.",
  "(draft) Third, what would it mean for a model to miss a mode of your data? Who or what would be missing, and how would you notice?"
]});
}

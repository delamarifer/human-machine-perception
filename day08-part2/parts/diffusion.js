/* PART: diffusion (Day 8 part B). Owner: Fernanda. DDPM intuition and training objective, following Part 1 of the
   CVPR 2022 tutorial (Kreis, Gao, Vahdat) and Ho et al. 2020. About 15 minutes.
   Equations follow Ho et al. 2020 (their eq. 2, 4, Algorithms 1 and 2). The animation is computed exactly on a toy 2D mixture
   (scenes/d8-toy.js); nothing is a copied figure. All notes are drafts for Fernanda. */
{
section('Diffusion');
const v = d8v;

/* ---------- 1. scene: forward noising, then the reverse run ---------- */
sc('d8Noise', 'scenes/noise.html', { notes: [
  "(draft) The idea behind diffusion models fits in one sentence: destroy the data slowly, and learn to undo it.",
  "(draft) Here is our data for the next half hour. It is a toy distribution in two dimensions: eight small clusters on a ring. Think of every dot as one image. Real images live in millions of dimensions, but the math is the same, and in two dimensions we can see it.",
  "(draft) The forward process adds a little Gaussian noise at every step. After 100 of the 1000 steps, the clusters are already blurring.",
  "(draft) After 300 steps, the ring is barely there.",
  "(draft) After all 1000 steps, there is nothing left of the data. What we have is a standard Gaussian: pure noise. This direction needs no learning at all. It is just adding noise.",
  "(draft) The reverse process is the generative model. Start from pure noise, and remove a little noise at each step. Every dot finds its way to one of the clusters. Here the denoiser is exact, because for this toy distribution we can compute it. In a real model, a neural network learns it. The rest of this section is how."
]});

/* ---------- 2. the forward process ---------- */
st(`
  <h1 class="t">The forward process: a fixed noise schedule</h1>
  <div class="d8-body">
    <div class="d8-row b" data-step="1"><div class="label">One step</div>
      <div class="d8-eq">${v('q')}(${v('x','t')} | ${v('x','t−1')}) = 𝒩( ${v('x','t')} ; √(1 − ${v('β','t')}) ${v('x','t−1')} , ${v('β','t')} 𝐈 )</div></div>
    <div class="d8-row b" data-step="2"><div class="label">Any step, in one jump</div>
      <div class="d8-eq">${v('x','t')} = √${v('ᾱ','t')} ${v('x','0')} + √(1 − ${v('ᾱ','t')}) ${v('ε')} ,&nbsp;&nbsp; ${v('ε')} ~ 𝒩(0, 𝐈)</div></div>
    <div class="d8-row b" data-step="3"><div class="label">At the end</div>
      <div class="d8-eq">${v('ᾱ','T')} ≈ 0 &nbsp;⇒&nbsp; ${v('x','T')} ≈ 𝒩(0, 𝐈)</div></div>
  </div>
  ${cite(`${D8_REF.ddpm}. Their schedule: ${v('β','t')} from 0.0001 to 0.02, ${v('T')} = 1000`)}
`, { notes: [
  "(draft) Now the same thing in equations. The forward process is fixed: there is nothing to learn in it.",
  "(draft) One step: scale the previous image down a little, by the square root of one minus beta t, and add Gaussian noise with variance beta t. Beta t is the noise schedule. It is small, and it grows with t.",
  "(draft) Because every step is Gaussian, we can jump to any step directly. Alpha bar t is the product of all the one minus betas up to t. The noisy image is a weighted sum of the clean image and fresh noise. This is what makes training cheap: we never have to run the chain step by step.",
  "(draft) At the last step, alpha bar is close to zero, so x T is just a standard Gaussian. That is where sampling will start. In Ho et al., beta goes from 0.0001 to 0.02 over 1000 steps, and that is the schedule in our animation."
]});

/* ---------- 3. the reverse process ---------- */
st(`
  <h1 class="t">The reverse process: learn each denoising step</h1>
  <div class="d8-body">
    <div class="d8-row b" data-step="1"><div class="label">Model</div>
      <div class="d8-eq">${v('p','θ')}(${v('x','t−1')} | ${v('x','t')}) = 𝒩( ${v('x','t−1')} ; ${v('μ','θ')}(${v('x','t')}, ${v('t')}) , ${v('σ','t','2')} 𝐈 )</div></div>
    <div class="d8-row b" data-step="2"><div class="label">Why Gaussian</div>
      <div class="lead">For small steps, the true reverse step is close to Gaussian</div></div>
    <div class="d8-row b" data-step="3"><div class="label">The cost</div>
      <div class="lead">Small steps mean many steps: one network evaluation each</div></div>
  </div>
  ${cite(`${D8_REF.ddpm}; ${D8_REF.tri}`)}
`, { notes: [
  "(draft) The reverse process is where the learning happens.",
  "(draft) Each reverse step is modeled as a Gaussian. A neural network predicts its mean from the noisy image and the step number t. The variance is fixed by the schedule.",
  "(draft) Why is a Gaussian allowed? Because when each forward step adds only a little noise, the true reverse step is also close to a Gaussian. This only holds for small steps.",
  "(draft) And that is the cost. Small steps mean many steps, and every step is one pass through the network. Keep this in mind: it comes back in the trilemma at the end."
]});

/* ---------- 4. training ---------- */
st(`
  <h1 class="t">Training: predict the noise that was added</h1>
  <div class="d8-body">
    <div class="d8-algo">
      <div class="b" data-step="1"><span class="d8-kw">repeat</span></div>
      <div class="b" data-step="1" style="--in:1">take an image ${v('x','0')}, a step ${v('t')} ~ Uniform{1, …, ${v('T')}}, noise ${v('ε')} ~ 𝒩(0, 𝐈)</div>
      <div class="b" data-step="2" style="--in:1">make it noisy: ${v('x','t')} = √${v('ᾱ','t')} ${v('x','0')} + √(1 − ${v('ᾱ','t')}) ${v('ε')}</div>
      <div class="b" data-step="3" style="--in:1">gradient step on &nbsp;‖ ${v('ε')} − ${v('ε','θ')}(${v('x','t')}, ${v('t')}) ‖<sup>2</sup></div>
    </div>
    <div class="lead b" data-step="4">A regression problem: the network is a denoiser</div>
  </div>
  ${cite(`${D8_REF.ddpm}, Algorithm 1 (the simplified objective)`)}
`, { notes: [
  "(draft) Training turns out to be very simple.",
  "(draft) Take a clean training image, pick a random step t, and draw some Gaussian noise.",
  "(draft) Make the noisy image in one jump, with the formula from two slides ago.",
  "(draft) Then ask the network to tell you which noise was added. The loss is the squared error between the true noise and the predicted noise. Ho et al. derived it from a variational bound and then dropped the weights, and this simplified loss gave better samples.",
  "(draft) So diffusion training is a regression problem. The network is a denoiser, trained at every noise level at once. There is no adversary, as in a GAN, and no encoder, as in a VAE."
]});

/* ---------- 5. sampling ---------- */
st(`
  <h1 class="t">Sampling: start from noise, denoise ${v('T')} times</h1>
  <div class="d8-body">
    <div class="d8-algo">
      <div class="b" data-step="1">${v('x','T')} ~ 𝒩(0, 𝐈)</div>
      <div class="b" data-step="2"><span class="d8-kw">for</span> ${v('t')} = ${v('T')}, …, 1</div>
      <div class="b" data-step="2" style="--in:1">${v('x','t−1')} = (1 / √${v('α','t')}) ( ${v('x','t')} − (${v('β','t')} / √(1 − ${v('ᾱ','t')})) ${v('ε','θ')}(${v('x','t')}, ${v('t')}) ) + ${v('σ','t')} ${v('z')} ,&nbsp; ${v('z')} ~ 𝒩(0, 𝐈)</div>
      <div class="b" data-step="3"><span class="d8-kw">return</span> ${v('x','0')}</div>
    </div>
    <div class="lead b" data-step="4">1000 network evaluations for one image</div>
  </div>
  ${cite(`${D8_REF.ddpm}, Algorithm 2`)}
`, { notes: [
  "(draft) Sampling runs the chain backwards.",
  "(draft) Start from pure Gaussian noise.",
  "(draft) At each step, subtract the noise the network predicts, scaled by the schedule, and then add back a small amount of fresh noise. Alpha t is one minus beta t. That fresh noise matters: it makes this a stochastic process, and we will see why in a minute.",
  "(draft) After the last step, you have a sample. This is what you watched in the animation: the dots moving from the noise to the clusters.",
  "(draft) With the schedule from Ho et al., that is 1000 network evaluations for one image. A GAN needs one. This is the slow sampling problem."
]});
}

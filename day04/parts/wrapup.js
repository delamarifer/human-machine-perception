/* PART: wrapup (Day 4). Owner: Fernanda · Shreya.
   PART VII & VIII: Project Engineering Plan & Homework.
   Homework consists exclusively of completing the unfinished in-class lab work. */
{
section('7. Wrap-up');

st(`
  <h1 class="t">Applying Today to Your Course Project: 9-Point Engineering Plan</h1>
  <div class="d4-grid3">
    <div class="d4-card b" data-step="1">
      <div class="lead"><b>1–3 · Problem, Task &amp; Data</b></div>
      <div class="label"><b>1. Problem definition:</b> What exactly are you trying to recognize, detect, segment, or estimate?</div>
      <div class="label"><b>2. Task formulation:</b> Classification, detection, semantic/instance segmentation, VLM, or depth?</div>
      <div class="label"><b>3. Dataset source:</b> Which images are needed, and how will they reflect your real deployment setting?</div>
    </div>
    <div class="d4-card b" data-step="2">
      <div class="lead"><b>4–6 · Labels, Model &amp; Bias</b></div>
      <div class="label"><b>4. Labels:</b> What categories and annotation conventions are required?</div>
      <div class="label"><b>5. Pretrained model:</b> Which backbone will you start from, and will you freeze or fine-tune?</div>
      <div class="label"><b>6. Representation bias:</b> Which populations, geographies, objects, or lighting conditions are underrepresented?</div>
    </div>
    <div class="d4-card b" data-step="3">
      <div class="lead"><b>7–9 · Evaluation &amp; Deployment</b></div>
      <div class="label"><b>7. Beyond accuracy:</b> Per-group recall, confusion matrix, calibration, and slice performance</div>
      <div class="label"><b>8. Robustness stress-test:</b> Viewpoint, scale, lighting, background swap, and cue conflict</div>
      <div class="label"><b>9. OOD deployment:</b> How will the system detect or handle out-of-distribution inputs?</div>
    </div>
  </div>
`, { notes: [
  "(draft) Before we wrap up, connect today's entire arc to your course final project using this 9-point Engineering and Evaluation Plan.",
  "(draft) Items 1 to 3 define the problem, the recognition task formulation, and where representative data will come from.",
  "(draft) Items 4 to 6 specify annotation conventions, the pretrained backbone and transfer strategy, and which populations or environments might be underrepresented.",
  "(draft) Items 7 to 9 design the evaluation strategy: slice metrics beyond overall accuracy, robustness stress-tests, and out-of-distribution handling."
]});

st(`
  <h1 class="t">Homework · Complete Your Pretrained Model Exploration</h1>
  <div class="d4-cols">
    <div class="d4-card b" data-step="1">
      <div class="lead"><b>Continue the exact lab you started in class</b></div>
      <div class="label">• Open <code class="m">notebooks/day04-lab-pretrained-models.ipynb</code> (Option A: Detection, Option B: Segmentation, Option C: CLIP, or Option D: Depth Anything)</div>
      <div class="label">• Run your chosen pretrained model on <b>3–5 images</b></div>
      <div class="label">• Visualize outputs and document <b>at least 1 success and 1 failure</b></div>
      <div class="label">• Run <b>1 controlled perturbation</b> (lighting, crop, viewpoint, scale, or text prompt) and show how predictions change</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:1vh">
      <div class="d4-card b" data-step="2">
        <div class="lead"><b>What to submit</b></div>
        <div class="label">Your completed Google Colab notebook (<code class="m">.ipynb</code>) containing:<br>1. Model &amp; task selected + images used<br>2. Output visualizations (success, failure, perturbation)<br>3. Short reflection connecting your observations to dataset/texture bias</div>
      </div>
      <div class="d4-card b" data-step="3" style="padding:1vh 1.2vw">
        <div class="label"><b>Primary Readings:</b> MIT Vision Book <a href="https://visionbook.mit.edu/object_recognition_v3.html">Ch. 50 (Object Recognition)</a> &amp; <a href="https://visionbook.mit.edu/bias_and_shift.html">Ch. 35–37 (Bias &amp; Shift)</a> · <a href="https://arxiv.org/abs/1811.12231">Geirhos et al. (2019)</a> · <a href="https://github.com/bethgelab/model-vs-human">Model-vs-Human</a> · <a href="https://www.gapminder.org/dollar-street">Dollar Street</a></div>
      </div>
    </div>
  </div>
`, { notes: [
  "(draft) Homework for next time.",
  "(draft) Your homework consists exclusively of completing the Pretrained Vision Model Exploration notebook (notebooks/day04-lab-pretrained-models.ipynb) that you started in class today—do not start a separate assignment or collect a new dataset.",
  "(draft) Submit your completed Colab notebook with your 3 to 5 images, visualizations of one success and one failure, one perturbation experiment, and your short reflection.",
  "(draft) Use the primary reading links at the bottom of the slide as you write your reflection."
]});
}

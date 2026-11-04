/* PART: lab (Day 4). Owner: Fernanda · Shreya.
   PART VI: Hands-on Lab: Explore a Pretrained Vision Model.
   Theme: What can existing vision models recognize, and where do they fail?
   Notebook: notebooks/day04-lab-pretrained-models.ipynb */
{
section('6. Lab');

st(`
  <h1 class="t">Part VI · Hands-On Lab: Explore a Pretrained Vision Model</h1>
  <div class="d4-card b" data-step="1" style="padding:1.1vh 1.4vw">
    <div class="label"><b>Theme:</b> <i>What can existing vision models recognize, and where do they fail?</i> Open <code class="m">notebooks/day04-lab-pretrained-models.ipynb</code> in Google Colab and choose <b>one</b> of the four model tracks below:</div>
  </div>
  <div class="d4-grid4 b" data-step="2">
    <div class="d4-card" style="padding:1vh .9vw">
      <div class="lead"><b>Option A · Detection</b></div>
      <div class="label"><code class="m">OWL-ViT</code> / <code class="m">Grounding DINO</code></div>
      <div class="label">• Text-prompted bounding boxes<br>• Test unfamiliar/local objects<br>• Find 1 missed detection &amp; 1 false positive</div>
    </div>
    <div class="d4-card" style="padding:1vh .9vw">
      <div class="lead"><b>Option B · Segmentation</b></div>
      <div class="label"><code class="m">SegFormer</code> / <code class="m">SAM</code></div>
      <div class="label">• Pixel masks &amp; boundaries<br>• Test occlusion &amp; clutter<br>• Where do boundaries leak or merge?</div>
    </div>
    <div class="d4-card" style="padding:1vh .9vw">
      <div class="lead"><b>Option C · VLM (CLIP)</b></div>
      <div class="label"><code class="m">CLIP ViT-B/32</code></div>
      <div class="label">• Zero-shot image–text similarity<br>• Test prompt wording changes<br>• Probe texture vs. shape or geographic bias</div>
    </div>
    <div class="d4-card" style="padding:1vh .9vw">
      <div class="lead"><b>Option D · Depth</b></div>
      <div class="label"><code class="m">Depth Anything</code></div>
      <div class="label">• Single-image 3D depth map<br>• Test mirrors, shadows, flat prints, night scenes</div>
    </div>
  </div>
  <div class="d4-card b" data-step="3" style="padding:1vh 1.4vw">
    <div class="label"><b>Image sources:</b> Pre-loaded fallback gallery (Dollar Street households, cue-conflict pairs, street/wildlife scenes) · <a href="https://www.gapminder.org/dollar-street">Dollar Street</a> · <a href="https://huggingface.co/datasets?task_categories=computer-vision">Hugging Face Datasets</a> · <a href="https://www.kaggle.com/datasets">Kaggle</a> · or your own phone photos.</div>
  </div>
`, { notes: [
  "(draft) Now we spend 25 minutes in Google Colab exploring a modern pretrained vision model.",
  "(draft) Open notebooks/day04-lab-pretrained-models.ipynb. This is intentionally not a standard image classification exercise—you will probe what a pretrained foundation model can recognize and where it breaks.",
  "(draft) Choose one of the four model tracks: Option A (OWL-ViT text-prompted object detection), Option B (SegFormer semantic segmentation), Option C (CLIP zero-shot vision-language recognition), or Option D (Depth Anything monocular depth estimation).",
  "(draft) You can use the built-in fallback gallery (which includes Dollar Street style cooking setups, a cow on a beach, and a cat-elephant cue-conflict stimulus) or load images from Dollar Street, Hugging Face, Kaggle, or your phone."
]});

st(`
  <h1 class="t">Lab Protocol (7 Steps) &amp; What to Record in Your Notebook</h1>
  <div class="d4-cols">
    <div class="d4-card b" data-step="1">
      <div class="lead"><b>Experimental protocol</b></div>
      <div class="label"><b>1.</b> Select one task &amp; pretrained model (Option A, B, C, or D)</div>
      <div class="label"><b>2.</b> Select a dataset theme or use the built-in Dollar Street / OOD gallery</div>
      <div class="label"><b>3.</b> Load <b>3–5 images</b> spanning different visual conditions</div>
      <div class="label"><b>4.</b> Run inference and visualize the model outputs</div>
      <div class="label"><b>5.</b> Identify at least <b>one clear success</b> and <b>one clear failure</b></div>
      <div class="label"><b>6.</b> Perturb an input condition (crop, lighting, blur, rotation, or text prompt)</div>
      <div class="label"><b>7.</b> Record how the model output changes</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:1vh">
      <div class="d4-code b" data-step="2">
        # Lab Log Template (fill in inside your Colab notebook):<br>
        Model &amp; Source : e.g., google/owlvit-base-patch32<br>
        Image Source   : e.g., Dollar Street (stoves) + 2 own photos<br>
        Prediction Type: e.g., text-prompted bounding boxes + scores<br>
        One Success    : ...<br>
        One Failure    : ...<br>
        Perturbation   : e.g., cropped context / changed prompt wording<br>
        Bias Hypothesis: observed failure vs. hypothesized cause
      </div>
      <div class="d4-card b" data-step="3" style="padding:1vh 1.2vw">
        <div class="label"><b>Reflection questions:</b> What data was this model trained on? What visual cues does it rely on? Could dataset or texture bias explain its failure?</div>
      </div>
    </div>
  </div>
`, { notes: [
  "(draft) Keep this slide projected during the hands-on session.",
  "(draft) Walk through the 7 steps on the left: pick a model track, pick 3 to 5 images, run inference, find at least one clear success and one clear failure, and apply one controlled perturbation (lighting, blur, rotation, crop, or prompt change).",
  "(draft) In Section 3 of the notebook, fill in the structured Lab Log shown in the code block on the right.",
  "(draft) Use the reflection questions at the bottom to separate what you observed from your hypothesis about dataset or texture bias."
]});
}

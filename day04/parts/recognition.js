/* PART: recognition (Day 4). Owner: Fernanda · Shreya.
   PART II: Object Recognition and Learned Representations.
   Primary resource: MIT Vision Book, Chapter 50 (https://visionbook.mit.edu/object_recognition_v3.html).
   Topics: 5 recognition tasks on the same image, recognition challenges, invariance & generalization,
   recognizing an object vs patterns correlated with it, transition question. */
{
section('2. Recognition');

st(`
  <h1 class="t">Part II · What is object recognition?</h1>
  <div class="d4-card b" data-step="1">
    <div class="lead"><b>Definition</b></div>
    <div class="label">Recovering <b>what is in a scene</b> from pixels—and, for most real systems, <b>where each object is</b>. Not one problem: a <b>family of tasks</b> that share a visual backbone and differ in the output they ask for.</div>
  </div>
  <div class="d4-card b" data-step="2" style="gap:.45vh">
    <div class="lead"><b>Five questions, same photo</b></div>
    <div class="label"><b>1. Classification</b> — What is in the image? One label for the whole frame.</div>
    <div class="label"><b>2. Localization</b> — Where is the main object? One label + one box <code class="m">(x, y, w, h)</code>.</div>
    <div class="label"><b>3. Detection</b> — What objects are present, and where? A list of boxes, classes, and scores.</div>
    <div class="label"><b>4. Semantic segmentation</b> — Which class owns each pixel? Two people share one label.</div>
    <div class="label"><b>5. Instance segmentation</b> — Which pixels belong to each individual object?</div>
  </div>
  <div class="d4-card b" data-step="3" style="background:#0f172a;color:#f8fafc;border-color:#334155">
    <div class="label" style="color:#93c5fd"><b>What stays the same</b></div>
    <div class="label" style="color:#e2e8f0">The CNN still maps the image to a representation <code class="m" style="background:#1e293b;border-color:#334155;color:#f8fafc">φ(x)</code>. Only the <b>head</b> changes: one label, a box, many boxes, or a label per pixel. Next: all five outputs on the same picture.</div>
  </div>
  ${cite('MIT Vision Book, Ch. 50: Object Recognition — https://visionbook.mit.edu/object_recognition_v3.html')}
`, { notes: [
  "(draft) Part II is about object recognition as a family of tasks, not just ImageNet classification.",
  "(draft) Definition: recover what is in a scene from pixels, and usually where each object is. The five tasks share a visual backbone and differ in the output space.",
  "(draft) Walk the five questions: classification (what), localization (where is the main object), detection (what and where for every object), semantic segmentation (class per pixel), instance segmentation (pixels of each individual).",
  "(draft) The dark box is the link back to Part I: the CNN representation phi(x) is reused; only the head changes. The next scene shows all five outputs on the same picture."
]});

sc('recognitionTasks', 'scenes/recognition-tasks.html');

st(`
  <h1 class="t">Part II · Why is object recognition hard? Variation vs. Invariance</h1>
  <div class="d4-cols">
    <div class="d4-card b" data-step="1">
      <div class="lead"><b>Nuissance variations (huge pixel change, same category)</b></div>
      <div class="label">• <b>Extrinsic (viewing conditions):</b> 3D viewpoint / pose, scale (distance <code class="m">Z</code>), illumination &amp; cast shadows, partial occlusion, background clutter</div>
      <div class="label">• <b>Intrinsic (within-category):</b> intra-class variation (e.g., folding chair vs. armchair; Chihuahua vs. Great Dane) &amp; non-rigid deformation</div>
      <div class="label">• <b>Inter-class similarity:</b> visually similar categories (wolf vs. husky; kayak vs. canoe)</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:1.1vh">
      <div class="d4-code b" data-step="2">
        # Ideal object representation phi(x):<br>
        # 1. Invariant to nuisance transformation T (pose, light, clutter):<br>
        || phi(T(x)) - phi(x) ||_2  ≈  0<br>
        # 2. Selective (discriminative) across distinct classes y_1 != y_2:<br>
        || phi(x_1) - phi(x_2) ||_2  &gt;&gt;  0
      </div>
      <div class="d4-card b" data-step="3">
        <div class="label"><b>The core tension (MIT Vision Book, Ch. 50):</b> Raw pixels change drastically under pose, scale, and lighting, yet a classifier must map all views of an object to the same decision region without merging distinct categories.</div>
      </div>
    </div>
  </div>
  ${cite('MIT Vision Book, Ch. 50: Object Recognition — https://visionbook.mit.edu/object_recognition_v3.html')}
`, { notes: [
  "(draft) Once we pick a task—whether classification, detection, or segmentation—why is object recognition fundamentally hard?",
  "(draft) On the left are the two families of variation from Chapter 50 of the MIT Vision Book: extrinsic variations (3D viewpoint, scale/distance, illumination, occlusion, and background clutter) and intrinsic intra-class variations (a wooden stool and a plush office chair are both 'chair'), alongside inter-class similarity.",
  "(draft) In the code block on the right is the formal requirement for a learned representation phi(x): it must be invariant to nuisance transformations T so ||phi(T(x)) - phi(x)|| is small, while remaining selective between distinct categories.",
  "(draft) Let's see this trade-off between invariance and selectivity in action on the next slide."
]});

sc('invariance', 'scenes/invariance.html');

st(`
  <h1 class="t">Recognizing an object vs. recognizing correlated patterns</h1>
  <div class="d4-cols">
    <div class="d4-card b" data-step="1">
      <div class="lead"><b>High benchmark accuracy ≠ robust object understanding</b></div>
      <div class="label">• A CNN trained by empirical risk minimization <code class="m">min<sub>θ</sub> 𝔼<sub>(x,y)~D_train</sub>[L(f<sub>θ</sub>(x), y)]</code> exploits <i>any</i> feature that reduces loss on <code class="m">D_train</code></div>
      <div class="label">• If category <code class="m">y</code> co-occurs with background cue <code class="m">c</code> in <code class="m">D_train</code>, the network achieves high test accuracy on <code class="m">D_test ~ D_train</code> by detecting <code class="m">c</code> instead of the object!</div>
    </div>
    <div class="d4-card b" data-step="2" style="background:#0f172a;color:#f8fafc;border-color:#334155">
      <div class="lead" style="color:#93c5fd"><b>Transition Question to Part III</b></div>
      <div class="statement" style="font-size:clamp(1.15rem,1.85vw,1.65rem);color:#fff;margin-top:.6vh">
        If CNNs learn visual representations directly from their training data, what happens when the training dataset does not represent the world in which the model is deployed?
      </div>
    </div>
  </div>
  ${cite('Torralba &amp; Efros (2011) · Beery, Van Horn &amp; Perona (2018) · MIT Vision Book Ch. 50')}
`, { notes: [
  "(draft) This brings us to the pivotal distinction of Part II: recognizing an object versus recognizing statistical patterns correlated with that object.",
  "(draft) Standard supervised training minimizes expected loss on the training distribution D_train. If the test split D_test is drawn from the exact same dataset, a model that relies on background context or camera artifacts gets rewarded with high benchmark accuracy.",
  "(draft) Read the transition question on the right aloud and ask two students for examples before starting Part III: if CNNs learn visual representations from training data, what happens when the training data does not represent the real world where the model is deployed?"
]});
}

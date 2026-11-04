/* PART: transfer (Day 4). Owner: Fernanda · Shreya.
   PART V: Pretrained Vision Models and Transfer Learning.
   Topics: ImageNet pretraining, Feature extraction (frozen backbone) vs Fine-tuning (unfrozen layers),
   domain adaptation, and modern pretrained vision models:
   - Object detection: Grounding DINO, OWL-ViT
   - Segmentation: SAM, SegFormer
   - Vision-language: CLIP
   - Depth estimation: Depth Anything */
{
section('5. Transfer & Models');

st(`
  <h1 class="t">Part V · Pretrained Representations &amp; Transfer Learning</h1>
  <div class="d4-cols">
    <div style="display:flex;flex-direction:column;gap:1vh">
      <div class="d4-card b" data-step="1">
        <div class="lead"><b>1. Feature Extraction (Frozen Backbone)</b></div>
        <div class="label">• Freeze all pretrained weights <code class="m">θ<sub>backbone</sub></code> (<code class="m">requires_grad = False</code>)</div>
        <div class="label">• Replace and train only the final linear head <code class="m">W<sub>head</sub></code> on your small dataset</div>
        <div class="label">• <b>Best when:</b> target dataset is small (20–100 images/class) and visual domain is close to pretraining</div>
      </div>
      <div class="d4-card b" data-step="2">
        <div class="lead"><b>2. Fine-Tuning (Unfrozen Deeper Layers)</b></div>
        <div class="label">• Unfreeze top blocks (or full network) with a small learning rate (<code class="m">10<sup>−4</sup>..10<sup>−5</sup></code>)</div>
        <div class="label">• <b>Trade-off:</b> adapts deeper representations to domain shifts (medical, satellite, microscopy), but risks <b>overfitting</b> and catastrophic forgetting when data is scarce</div>
      </div>
    </div>
    <div class="d4-code b" data-step="3">
      # PyTorch transfer learning in 6 lines:<br>
      model = models.resnet18(weights="IMAGENET1K_V1")<br><br>
      # Option A: Feature extraction (freeze backbone)<br>
      for param in model.parameters():<br>
      &nbsp;&nbsp;&nbsp;&nbsp;param.requires_grad = False<br><br>
      # Replace 1000-class ImageNet head with K target classes:<br>
      model.fc = nn.Linear(model.fc.in_features, K_classes)<br><br>
      # Option B: Fine-tune layer4 + fc with small LR:<br>
      for param in model.layer4.parameters():<br>
      &nbsp;&nbsp;&nbsp;&nbsp;param.requires_grad = True
    </div>
  </div>
`, { notes: [
  "(draft) Part V asks: if training a deep vision model from scratch requires millions of labeled images, how do we build vision systems for new tasks with only dozens of examples?",
  "(draft) Strategy 1 is Feature Extraction: freeze all pretrained weights in the backbone and train only a new linear classification head on your target dataset.",
  "(draft) Strategy 2 is Fine-Tuning: unfreeze the top convolutional blocks (or the full network) with a small learning rate so the visual features themselves adapt to the new domain, while watching out for overfitting when data is limited.",
  "(draft) The PyTorch snippet on the right shows both strategies in 6 lines of code on an ImageNet-pretrained ResNet-18."
]});

/* Modern Pretrained Foundation Models beyond fixed-class classification */
st(`
  <h1 class="t">Beyond Fixed-Category Classifiers: Four Pretrained Model Families</h1>
  <div class="d4-grid4">
    <div class="d4-card b" data-step="1" style="padding:1.1vh 1vw">
      <div class="lead"><b>A · Open-Vocab Detection</b></div>
      <div class="label"><code class="m">OWL-ViT</code> · <code class="m">Grounding DINO</code></div>
      <div class="d4-code" style="font-size:clamp(.66rem,.92vw,.84rem);padding:.7vh .6vw">
        Input: image + text queries<br>
        ["clay pot", "charcoal stove"]<br>
        Output: boxes [x1,y1,x2,y2] + scores
      </div>
      <div class="label">Detects arbitrary categories described in natural language without retraining.</div>
    </div>
    <div class="d4-card b" data-step="2" style="padding:1.1vh 1vw">
      <div class="lead"><b>B · Image Segmentation</b></div>
      <div class="label"><code class="m">SAM</code> · <code class="m">SegFormer</code> · <code class="m">Mask2Former</code></div>
      <div class="d4-code" style="font-size:clamp(.66rem,.92vw,.84rem);padding:.7vh .6vw">
        Input: image (+ point/box prompt)<br>
        Output: pixel masks M ∈ {0,1}^(H×W)<br>
        or dense semantic class map
      </div>
      <div class="label">Separates exact object boundaries, occluded regions, and scene stuff/things.</div>
    </div>
    <div class="d4-card b" data-step="3" style="padding:1.1vh 1vw">
      <div class="lead"><b>C · Vision-Language (VLM)</b></div>
      <div class="label"><code class="m">CLIP (ViT-B/32)</code></div>
      <div class="d4-code" style="font-size:clamp(.66rem,.92vw,.84rem);padding:.7vh .6vw">
        sim(I, T) = cos(f_img(I), f_txt(T))<br>
        P(T_i | I) = softmax(τ · sim(I, T_i))
      </div>
      <div class="label">Aligns images and text in a shared embedding space for zero-shot recognition.</div>
    </div>
    <div class="d4-card b" data-step="4" style="padding:1.1vh 1vw">
      <div class="lead"><b>D · Monocular Depth</b></div>
      <div class="label"><code class="m">Depth Anything (v2)</code></div>
      <div class="d4-code" style="font-size:clamp(.66rem,.92vw,.84rem);padding:.7vh .6vw">
        Input: single 2D RGB image I<br>
        Output: dense relative depth map<br>
        D ∈ ℝ^(H×W)
      </div>
      <div class="label">Recovers 3D scene geometry lost during pinhole projection from learned priors.</div>
    </div>
  </div>
  ${cite('Radford et al. (CLIP, 2021) · Minderer et al. (OWL-ViT, 2022) · Kirillov et al. (SAM, 2023) · Yang et al. (Depth Anything, 2024)')}
`, { notes: [
  "(draft) Classical ImageNet classifiers are locked to a fixed list of 1,000 categories. Modern pretrained vision models break that constraint in four ways—and these are the four options you will choose from in our hands-on lab next.",
  "(draft) Option A is Open-Vocabulary Object Detection (OWL-ViT and Grounding DINO): instead of a fixed label set, you pass any text prompt list like ['solar panel', 'water tank', 'bicycle'] and the model outputs bounding boxes and confidence scores.",
  "(draft) Option B is Image Segmentation (Segment Anything / SAM, SegFormer, Mask2Former): predicts dense pixel masks for every region or object instance.",
  "(draft) Option C is Vision-Language Zero-Shot Recognition (CLIP): embeds images and natural-language descriptions into the same vector space and scores them by cosine similarity, making it easy to test prompt sensitivity and cultural/contextual bias.",
  "(draft) Option D is Monocular Depth Estimation (Depth Anything): predicts a dense per-pixel depth map from a single 2D photograph, reversing the pinhole projection using learned monocular cues—until reflective surfaces, paintings, or unusual lighting trick it."
]});
}

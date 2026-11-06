/* PART: backup (Day 5). Owner: Shreya. Slides after the end of the talk, for questions.
   The depth result moved from cnn-limits. The comparison table and encoder slides are copied from vit.js. */
{
section('Backup');

st(`<style>
  .cnnlim-two{ flex:1 1 auto; min-height:0; display:grid; gap:3vw; align-items:center; }
  .cnnlim-grid2{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1fr; gap:2vw; align-items:stretch; }
  .cnnlim-grid2 ul{ margin:.6vh 0 0 1.2em; padding:0; display:flex; flex-direction:column; gap:.9vh; }
  .cnnlim-col{ display:flex; flex-direction:column; gap:2.2vh; justify-content:center; min-height:0; }
  .cnnlim-net{ width:100%; height:100%; max-height:62vh; display:block; }
  .cnnlim-net text{ font-family:var(--font); fill:var(--ink); }
</style>
  <h1 class="t">Backup</h1>
`, { notes: "(draft) Everything after this slide is for questions. The talk ends on the previous slide." });

st(`
  <h1 class="t">CNNs vs. Vision Transformers: Architectural Comparison</h1>
  <div class="b" data-step="1">
    <table class="d5-tbl">
      <thead>
        <tr><th style="width:22%">Dimension</th><th style="width:39%">Convolutional Neural Network (CNN)</th><th style="width:39%">Vision Transformer (ViT)</th></tr>
      </thead>
      <tbody>
        <tr><td><b>Core operator</b></td><td>Spatial convolution <code class="m">(f ∗ W_k)</code> with learned kernels</td><td>Scaled dot-product self-attention across tokens</td></tr>
        <tr><td><b>Receptive field</b></td><td>Local <code class="m">K×K</code> neighborhood; grows gradually with depth</td><td>Global contextual interaction across all patches from Layer 1</td></tr>
        <tr><td><b>Representation format</b></td><td>2D spatial feature maps <code class="m">C_ℓ × H_ℓ × W_ℓ</code> (pyramid)</td><td>Sequence of token vectors <code class="m">Z_ℓ ∈ ℝ^((N+1)×D)</code> (isotropic)</td></tr>
        <tr><td><b>Inductive bias</b></td><td>Strong built-in 2D locality &amp; translation equivariance</td><td>Minimal spatial bias (learned via <code class="m">E_pos</code>); high flexibility at scale</td></tr>
        <tr><td><b>Spatial aggregation</b></td><td>Local pooling / strided conv → global avg pool at end</td><td>Layer-wise token mixing + dedicated <code class="m">[CLS]</code> or patch pooling</td></tr>
      </tbody>
    </table>
  </div>
  <div class="d5-card b" data-step="2" style="padding:1vh 1.4vw">
    <div class="label"><b>Nuance (avoid absolutes!):</b> Modern CNNs (e.g., ConvNeXt) use larger <code class="m">7×7</code> depthwise kernels and global context, while modern hierarchical ViTs (e.g., Swin Transformer) re-introduce local windowed attention and spatial pyramids. With smaller datasets, CNNs' inductive bias helps; at large scale, ViTs' flexibility shines.</div>
  </div>
  ${cite('Dosovitskiy et al. (ICLR 2021), "An Image is Worth 16x16 Words" · MIT Vision Book Ch. 26: visionbook.mit.edu/transformers.html')}
`, { notes: [
  "(draft) Let's compare how CNNs (from Day 4) and Vision Transformers (Dosovitskiy et al., 2021; MIT Vision Book Ch. 26) process and represent an image.",
  "(draft) Walk through the five rows of the table: (1) CNNs apply local convolutional filters, whereas ViTs apply content-dependent self-attention weights. (2) A CNN's receptive field starts small (3x3 or 7x7) and grows layer by layer; a ViT allows every patch to attend to every other patch starting in Layer 1. (3) CNNs maintain a multi-scale pyramid of 2D feature maps, whereas standard ViTs maintain a constant-length sequence of (N+1) tokens of dimension D across all layers. (4) CNNs bake in strong locality and translation equivariance; ViTs learn spatial relationships from data via positional embeddings.",
  "(draft) Emphasize the nuance in the callout box: this distinction is not absolute. Modern CNNs can achieve large receptive fields, and hierarchical Vision Transformers like Swin incorporate local windows. What makes ViTs especially illuminating for visual perception is that we can inspect how individual image patches attend to one another and how token representations evolve across identical blocks."
]});


/* Transformer Encoder Block & CLS vs Patch tokens across layers */
st(`
  <h1 class="t">Transformer Encoder Blocks: <code class="m">[CLS]</code> vs. Patch Tokens Across Depth</h1>
  <div class="d5-cols" style="zoom:.88">
    <div style="display:flex;flex-direction:column;gap:1vh">
      <div class="d5-code b" data-step="1">
        # Transformer Encoder Block l = 1 ... L (L = 12 in ViT-Base):<br>
        Z'_l = Z_{l-1} + MHA(LayerNorm(Z_{l-1})) &nbsp;# token mixing<br>
        Z_l  = Z'_l    + MLP(LayerNorm(Z'_l))    &nbsp;# per-token nonlinear MLP<br><br>
        # Output of Layer l splits into:<br>
        cls_token   = Z_l[0]    &nbsp;# ∈ ℝ^768 (global summary token)<br>
        patch_tokens = Z_l[1:]  &nbsp;# ∈ ℝ^(196 × 768) (14×14 spatial tokens)
      </div>
      <div class="d5-card b" data-step="2">
        <div class="lead"><b>Why residual connections &amp; LayerNorm matter</b></div>
        <div class="label">• Residual highway <code class="m">Z_{l-1} + ...</code> lets gradients flow unimpeded and means each block <i>refines</i> a shared 768-D representation space across layers.</div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:1vh">
      <div class="d5-card b" data-step="3">
        <div class="lead"><b><code class="m">[CLS]</code> Token vs. Patch Tokens (<code class="m">z_L^1 … z_L^196</code>)</b></div>
        <div class="label">• <b><code class="m">[CLS]</code> token (<code class="m">z_L^0</code>):</b> Has no image patch of its own; aggregates global scene/object information for classification or retrieval.</div>
        <div class="label">• <b>Patch tokens (<code class="m">z_L^1..196</code>):</b> Retain their <code class="m">14×14</code> spatial correspondence while absorbing global context—essential for detection, segmentation, and dense correspondence.</div>
      </div>
      <div class="d5-card b" data-step="4">
        <div class="lead"><b>How representations evolve across layers (Raghu et al., 2021)</b></div>
        <div class="label">• In early layers, some heads attend locally while others already attend globally; deeper layers increasingly align with task semantics.</div>
        <div class="label">• <b>Caveat:</b> Layer behavior is <i>not</i> universal—it depends on training objective (e.g., supervised ImageNet vs. self-supervised DINO, where late attention heads spontaneously segment foreground objects).</div>
      </div>
    </div>
  </div>
  ${cite('Raghu et al. (NeurIPS 2021), "Do Vision Transformers See Like CNNs?" · Caron et al. (DINO, ICCV 2021)')}
`, { notes: [
  "(draft) How do representations evolve as tokens pass through L = 12 stacked Transformer encoder blocks?",
  "(draft) On the top-left: each block applies LayerNorm, Multi-Head Attention (which mixes information across the 197 tokens), a residual connection, and then LayerNorm plus a 2-layer GELU MLP.",
  "(draft) Residual connections create a continuous 768-D representation highway from Z_0 to Z_12, which is why we can directly compare representations across layers.",
  "(draft) On the top-right: Z_l[0] is the [CLS] token (a single 768-D summary of the whole image), while Z_l[1:] gives 196 patch tokens that retain their 14x14 spatial layout.",
  "(draft) On the bottom-right: Raghu et al. (2021) showed that ViTs attend both locally and globally even in early blocks, while deeper blocks align with task semantics—and self-supervised objectives like DINO produce emergent foreground segmentation in the final block's attention heads."
]});

sc('vitTokens', 'scenes/vit-tokens.html');
}

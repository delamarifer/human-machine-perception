/* PART: lab (Day 5). Owner: to decide (see README.md). Plan: 40 min, ViT + representation analysis lab.
   1. getting an embedding from a trained ViT, in code
   2. the lab, step by step */
{
section('Lab');

const labCss = `<style>
  .lab-code{ font:clamp(1.05rem,1.55vw,1.45rem)/1.6 Menlo, Consolas, monospace; background:#f8fafc; border:1px solid var(--line);
    border-radius:12px; padding:2.4vh 2vw; white-space:pre; margin:auto 0; }
  .lab-code .b{ display:block; }
  .lab-code .lab-c{ color:var(--mute); }
</style>`;

st(`${labCss}
  <h1 class="t">An embedding from a trained ViT</h1>
  <div class="lab-code"><span class="b" data-step="1">weights = ViT_B_16_Weights.IMAGENET1K_V1
model = vit_b_16(weights=weights).eval()</span><span class="b" data-step="2">model.heads = torch.nn.Identity()      <span class="lab-c"># drop the classifier</span></span><span class="b" data-step="3">x = weights.transforms()(image).unsqueeze(0)
with torch.no_grad():
    emb = model(x)                     <span class="lab-c"># 768 numbers: the CLS token</span></span></div>
`, { notes: [
  "(draft) Here is how little code it takes to get an embedding from a real Vision Transformer, with torchvision.",
  "(draft) Load ViT-Base with 16 by 16 patches, trained on ImageNet, and put it in evaluation mode.",
  "(draft) Replace its classification head with an identity, so the model returns what went into the classifier.",
  "(draft) Preprocess an image the way the model expects, run it, and you get 768 numbers: the final CLS token, the image's embedding."
]});

st(`
  <h1 class="t">Lab: probe a Vision Transformer</h1>
  <ul class="frag">
    <li class="b">Embed a small set of images</li>
    <li class="b">Nearest neighbors, K-means, t-SNE: what groups together?</li>
    <li class="b">RDMs across layers, compared with RSA</li>
    <li class="b">The Thatcher test: upright vs upside down</li>
  </ul>
  <div class="todo b">Colab link: notebooks/day05-lab-… (notebook to add)</div>
`, { notes: [
  "(draft) In the lab you do today's slides yourself, on a trained ViT.",
  "(draft) Embed a small set of images, some given, some of your own.",
  "(draft) Find each image's nearest neighbors, cluster the embeddings with K-means, and draw a t-SNE map. What groups together: objects, colors, textures, backgrounds?",
  "(draft) Pull out the representation at several layers, compute an RDM for each, and compare them with RSA: where in the network does the structure appear?",
  "(draft) And the Thatcher test: does the distance between a face and its Thatcherized version change when both are turned upside down, the way it does for people?",
  "(draft) (to write) Where to find the notebook."
]});
}

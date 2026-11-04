/* PART: f-lab (Day 5). Owner: Fernanda. The Day 5 lab, per Fernanda (2026-11-04): MIT 6.S191 Lab 3,
   "Large Language Model (LLM) Fine-tuning" (LLM_Finetuning.ipynb, MIT License; credit required).
   What it does, from the notebook: LiquidAI LFM2-1.2B; chat template and tokenization; next-token prediction
   with a cross-entropy loss; LoRA on the attention (q, k, v, o) and MLP projections; fine-tune to a
   leprechaun style, then Yoda; Part 2 scores outputs with a judge LLM (needs OpenRouter and Comet API keys). */
{
section('9. Lab');

st(`
  <h1 class="t">Lab: fine-tune a language model</h1>
  <ul class="frag">
    <li class="b">A pretrained transformer: LFM2, 1.2 billion parameters</li>
    <li class="b">Text → tokens → predict the next token</li>
    <li class="b">LoRA: train small add-ons to the query, key and value matrices</li>
    <li class="b">Teach it a style: a leprechaun, then Yoda</li>
  </ul>
  <div class="todo b">Part 2 (judge LLM) needs OpenRouter and Comet API keys: in class, as homework, or skipped? Colab link and GPU runtime note to add.</div>
  ${cite('Lab: MIT 6.S191 Introduction to Deep Learning, Lab 3, LLM Fine-tuning (MIT License)')}
`, { notes: [
  "(draft) In the lab today you work with a real transformer. It is a language model, not a vision model, and that is the point: the blocks are the same ones we just took apart.",
  "(draft) The model is LFM2 from Liquid AI, a pretrained transformer with about 1.2 billion parameters.",
  "(draft) Text is cut into tokens, the way an image was cut into patches, and the model is trained to predict the next token. That is a classification over the vocabulary, with the same cross-entropy loss as an image classifier.",
  "(draft) Updating all 1.2 billion weights is too expensive for a notebook. LoRA adds small trainable matrices next to the existing ones, including the query, key and value projections from the attention slide, and trains only those.",
  "(draft) You fine-tune it to answer in a style: first a leprechaun, then Yoda. Then you judge how well it worked.",
  "(draft) (to decide) The second part uses a larger model as a judge, through paid APIs. (to write) Where to find the notebook, and to switch Colab to a GPU runtime."
]});
}

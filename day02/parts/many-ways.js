/* PART: many-ways (Day 2). Owner: to decide (see README.md). Plan: 15 min, "One image has many ways to see".
   ACT: one photo, two questions · the scene: one photo through the whole stack (OpenCV, torchvision,
   Hugging Face, Gradio) · alternatives to each tool (the plan: "one path per tool, alternatives on a
   closing slide"). */
{
section('Many ways to see');

st(`
  <h1 class="t">One image, many ways to see</h1>
  <div class="tiles" style="grid-template-columns:1.5fr 1fr 1fr;align-items:center;gap:2vh 3vw">
    <div class="tile b" data-step="1"><div class="im"><img src="assets/one-photo/photo.jpg" alt="" style="object-fit:contain;background:#fff"></div></div>
    <div class="tile b" data-step="2" style="justify-content:center"><div class="question">What is in it?</div><div class="label">classification</div></div>
    <div class="tile b" data-step="3" style="justify-content:center"><div class="question">How far is each part?</div><div class="label">depth estimation</div></div>
  </div>
  <div class="cite b" data-step="1">Photo: Shixart1985, CC BY 2.0, via Wikimedia Commons</div>
`, { notes: [
  "(draft) One image has many ways to see.",
  "(draft) Take one photo. You could ask many different questions about it.",
  "(draft) What is in it? That is classification: one label for the whole image.",
  "(draft) How far away is each part of it? That is depth estimation: one number for every pixel. Today we ask both questions, with models we did not train."
]});

sc('onePhotoStack', 'scenes/one-photo-stack.html');

st(`
  <h1 class="t">Other paths through the stack</h1>
  <div class="many-ways-alts">
    <div class="label b" data-step="1"><b>Load + crop</b></div><div class="lead b" data-step="1">OpenCV</div><div class="label b" data-step="1">Pillow · scikit-image</div>
    <div class="label b" data-step="2"><b>Classify</b></div><div class="lead b" data-step="2">torchvision</div><div class="label b" data-step="2">timm · Hugging Face image-classification</div>
    <div class="label b" data-step="3"><b>Depth</b></div><div class="lead b" data-step="3">Hugging Face pipeline</div><div class="label b" data-step="3">MiDaS via torch.hub</div>
    <div class="label b" data-step="4"><b>App</b></div><div class="lead b" data-step="4">Gradio</div><div class="label b" data-step="4">Streamlit</div>
  </div>
  <style>
    .many-ways-alts{ margin:auto 0; display:grid; grid-template-columns:auto auto 1fr; gap:3vh 4vw; align-items:baseline; }
  </style>
`, { notes: [
  "(draft) We took one path through each step. There are others, and the skills transfer.",
  "(draft) To load and crop, instead of OpenCV you can use Pillow or scikit-image.",
  "(draft) For pretrained classifiers, timm and the Hugging Face image-classification pipeline have many more models than torchvision.",
  "(draft) For depth, MiDaS loads straight from torch.hub.",
  "(draft) And instead of Gradio, Streamlit is another quick way to make an app. Use whichever you like for your project."
]});
}

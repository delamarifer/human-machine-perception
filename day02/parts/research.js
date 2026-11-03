/* PART: research (Day 2). Owner: to decide. Plan: 5 min. The three kinds of questions are the plan's own wording. */
{
section('Research vs building');

st(`
  <h1 class="t">Research vs building</h1>
  <div class="question b" data-step="1">What kinds of questions are research?</div>
  <div class="research-kinds">
    <div class="research-kind b" data-step="2"><b>Theory</b><div class="label">How do we change the way these systems learn?</div></div>
    <div class="research-kind b" data-step="3"><b>Limitations</b><div class="label">In which settings do these tools fail? Find new failures.</div></div>
    <div class="research-kind b" data-step="4"><b>Application</b><div class="label">What is a useful way to apply these tools?</div></div>
  </div>
  <style>
    .research-kinds{ margin:auto 0; display:grid; grid-template-columns:repeat(3, 1fr); gap:2vw; }
    .research-kind{ border:2px solid var(--ink); border-radius:14px; padding:3vh 1.4vw; display:flex; flex-direction:column; gap:1.2vh; }
    .research-kind b{ font-size:clamp(1.5rem, 2.4vw, 2.2rem); }
  </style>
`, { notes: [
  "(draft) You can build something, or you can do research. What is the difference?",
  "(draft) What kinds of questions are research?",
  "(draft) Mathematical or theoretical: how do we change the way these systems learn? Training on images where texture is unreliable, so the network learns shape, is an example.",
  "(draft) Fully exploring a limitation, or finding new ones: in which settings do these tools fail? Vision language models are blind, and does object recognition work for everyone, are both papers of this kind.",
  "(draft) Application: what is a useful way to apply these tools? Mapping tree height across the planet from satellite images is one. Your project can be any of the three."
]});
}

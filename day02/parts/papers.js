/* PART: papers (Day 2). Owner: to decide. Plan: 5 min "how to read a paper" + 10 min paper review (moved to
   the end of class). How to read: Keshav's three passes (S. Keshav, How to Read a Paper, ACM SIGCOMM CCR, 2007).
   Paper: the reading on homework.html, Pizlo 2001. Discussion questions are drafts (feedback/_day.md). */
{
section('Research and papers');

st(`
  <h1 class="t">Read a paper efficiently</h1>
  <div class="label papers-outcome"><b>By the end, you can</b> · read a research paper efficiently</div>
  <style>.papers-outcome{ color:var(--mute); } .papers-outcome b{ color:var(--ink); }</style>
  <ul class="frag">
    <li class="b"><b>Pass 1</b> · 5–10 min: title, abstract, introduction, headings, conclusions</li>
    <li class="b"><b>Pass 2</b> · up to an hour: figures and the argument; skip the proofs</li>
    <li class="b"><b>Pass 3</b> · re-implement it in your head</li>
  </ul>
  <div class="lead b">Response paper: one big question about the paper</div>
  ${cite('S. Keshav, How to Read a Paper, ACM SIGCOMM Computer Communication Review, 2007')}
`, { notes: [
  "(draft) How to read a research paper efficiently. One method we like has three passes, from S. Keshav.",
  "(draft) Pass one, five to ten minutes: read the title, the abstract and the introduction, the section headings, and the conclusions. Skip everything else. You should know what kind of paper it is and what it claims. Often that is enough to decide whether to read on.",
  "(draft) Pass two, up to an hour for an experienced reader: read carefully, look hard at the figures, and follow the argument, but skip details like proofs.",
  "(draft) Pass three, for the papers that matter most to you: virtually re-implement the paper, making the same assumptions as the authors, and see where you would have done something different.",
  "(draft) Each daily response paper starts with one high-level question about the day's paper. A good second pass is enough for that."
]});

st(`
  <h1 class="t">Perception as an inverse problem</h1>
  <div class="label papers-outcome"><b>By the end, you can</b> · discuss a paper: perception as an inverse problem</div>
  <div class="lead b" data-step="1">Pizlo, Vision Research, 2001</div>
  <ul class="frag">
    <li class="b" data-step="2">Why is perception an inverse problem?</li>
    <li class="b" data-step="3">Where does the missing information come from?</li>
    <li class="b" data-step="4">Which constraints did our simple system use?</li>
  </ul>
  ${cite('Z. Pizlo, Perception viewed as an inverse problem, Vision Research 41, 3145–3161, 2001')}
`, { notes: [
  "(draft) Now the paper you read.",
  "(draft) Zygmunt Pizlo, Perception viewed as an inverse problem, in Vision Research, 2001.",
  "(draft) First question, in pairs: why is perception an inverse problem? Think back to Day 1's line drawing that fits infinitely many 3D shapes.",
  "(draft) Second: if the image is not enough, where does the missing information come from? Pizlo argues that constraints the visual system brings, a priori, matter at least as much as the image itself.",
  "(draft) Third: which constraints did our simple vision system use today? Flat floor, objects resting on it, generic view, flat faces. And what happened to the floating box?"
]});
}

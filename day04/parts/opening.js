/* PART: opening (Day 4). Owner: to decide (see README.md). */
{
section('Title');

st(`
  <div class="center" style="margin:auto">
    <div class="statement" style="font-weight:700;font-size:clamp(2.4rem,4.4vw,4rem)">Image Representations</div>
    <div class="lead" style="margin-top:3vh">Day 4</div>
    <div class="label" style="margin-top:1.5vh">Fernanda · Shreya</div>
  </div>
`, { blank: false, notes: "(draft) Welcome back. Day 4: Image Representations." });

st(`
  <div class="question center" style="font-size:clamp(2.4rem,4.2vw,3.8rem)">What information is represented in an image?</div>
`, { notes: "(draft) Today's question: what information is represented in an image? And, just as important, which of that information a system, a person or a machine, actually needs to keep." });

/* The objective is blank in the plan: proposal in feedback/_day.md, waiting for Fernanda. */
st(`
  <h1 class="t">Goal for today</h1>
  <div class="todo b" style="margin:auto 0">Objective: blank in the plan. Proposal in feedback/_day.md: understand a representation as a choice of what to keep and what to throw away, and use metamers to find out what a system (a person or a model) is invariant to.</div>
`, { notes: [
  "(to write) Our goal for today.",
  "(to write) The objective, once it is decided."
]});

st(`
  <h1 class="t">Today</h1>
  <div class="flow">
    <div class="step b" data-step="1"><b>Homework review</b></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Pixels to objects</b></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>Metamers</b></div>
    <div class="arrow b" data-step="4">→</div>
    <div class="step b" data-step="4"><b>Invariance</b></div>
    <div class="arrow b" data-step="5">→</div>
    <div class="step b" data-step="5"><b>Discussion</b></div>
  </div>
`, { notes: [
  "(draft) Here is the plan for today.",
  "(draft) We start by going over the homework.",
  "(draft) Then we climb from pixels to objects: what different representations of an image keep, and what they throw away.",
  "(draft) Then metamers: images that are different in their pixels but look the same. They tell us what our own visual system keeps.",
  "(draft) Then invariance: what a good representation should ignore, in machines and in people, including in hearing.",
  "(draft) And we finish with a discussion."
]});
}

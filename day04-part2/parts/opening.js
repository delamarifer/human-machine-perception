/* PART: opening (Object Recognition). Owner: Shreya.
   Title, what is a chair, the output representation defines the problem. */
{
section('Title');

st(`
  <div class="center">
    <div class="statement" style="font-weight:700">Object Recognition</div>
    <div class="lead" style="margin-top:2vh;color:var(--mute)">What does it mean to recognize an object?</div>
    <div class="label" style="margin-top:4vh">Day 4, Part 2 · Visual Perception</div>
    <div class="label" style="margin-top:.6vh">Fernanda De La Torre · Shreya Pandit</div>
  </div>
  ${cite('Torralba, Isola &amp; Freeman, <i>Foundations of Computer Vision</i>, Ch. 50')}
`, { blank: false, notes: "(draft) Today we ask a question that sounds simple: what does it mean to recognize an object? We follow Chapter 50 of Foundations of Computer Vision by Torralba, Isola and Freeman." });

section('1. What is a chair?');

const CHAIR = 'assets/photos/chair.jpg', PILE = 'assets/photos/chairs-pile.jpg';
const TABLE = 'assets/photos/tea-table.jpg';

st(`
  <h1 class="t">What is a chair?</h1>
  <div class="or-cards or-c2">
    <div class="or-card b">${fig(CHAIR)}<div class="lead"><b>Affordance</b></div><div class="label">You can sit on it. Vision can probably see this.</div></div>
    <div class="or-card b">${fig(TABLE)}<div class="lead"><b>Social convention</b></div><div class="label">You could sit here, but it is meant for holding things. Vision may not see this.</div></div>
  </div>
  ${cite('After Ch. 50, Fig. 50.1. Photos: Antonio Borrillo, CC0 · Andrey Korzun, CC BY-SA 4.0, cropped')}
`, { notes: [
  "(draft) Is this a chair? Answering is harder than it sounds.",
  "(draft) Part of the definition is an affordance: you can sit on it. Vision can probably see that directly.",
  "(draft) Part of the definition is social convention. Some surfaces you could sit on are meant for holding things, like this table set for tea. Vision may not be able to see that."
]});

st(`
  <h1 class="t">The form of the answer changes the problem</h1>
  <div class="or-cards or-c2">
    <div class="or-card b" data-step="1">${fig(CHAIR)}<div class="lead"><b>Easy</b></div><div class="label">Point and say "chair"</div></div>
    <div class="or-card b" data-step="2">
      ${rfig(PILE, 960 / 651, [{r: [575 / 960, 322 / 651, 272 / 960, 158 / 651], k: 'ring', step: 2}])}
      <div class="lead"><b>Hard</b></div><div class="label">Mark every visible part of one chair in a pile</div></div>
  </div>
  <div class="statement b" data-step="3" style="text-align:center">The output you choose <b>defines</b> the recognition problem.</div>
  ${cite('Photos: Antonio Borrillo, CC0 · Tony Webster, CC BY 2.0')}
`, { notes: [
  "(draft) Before we build anything, notice what we are asking for.",
  "(draft) Pointing at this chair and saying chair is easy.",
  "(draft) Now take the chair with the ringed seat and mark every visible part of it. Where do its back and legs end, and where does the next chair begin? Even a simple brightness threshold finds this seat, but it merges the back with the neighboring chair. It is the same kind of object. Only the answer we asked for changed.",
  "(draft) This is the thesis of the lecture: the output representation you choose defines the recognition problem."
]});
}

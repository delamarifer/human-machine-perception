/* PART: human-vs-machine (Day 2). Owner: to decide (see README.md). Plan: 15 min.
   Human connection: measurement vs perception in practice. A classifier's top-5 on a photo it gets
   wrong vs what the room sees. Real outputs only: day02/assets/human-vs-machine/result.json
   (ResNet-18, the same pipeline as the app; see day02/assets/SOURCES.md).
   ACT: the photo + "what do you see?" (the room answers) · the model's top-5 · where "elephant" ranks ·
   the statement. Then: misses from the lab (to collect live). */
{
section('Human vs machine');

const TOP5 = [['triceratops', .2869], ['cowboy boot', .2662], ['shield', .0581], ['chain mail', .0436], ['cuirass', .0258]];
const bars = TOP5.map(([n, p]) => `<div class="label">${n}</div>
  <div class="human-vs-machine-tr"><div style="width:${p * 100}%"></div></div><div class="label">${(p * 100).toFixed(1)}%</div>`).join('');

st(`
  <h1 class="t">What do you see?</h1>
  <div class="human-vs-machine-grid">
    <div class="tile b" data-step="1"><div class="im"><img src="assets/human-vs-machine/crop.jpg" alt=""></div></div>
    <div class="b" data-step="2">
      <div class="human-vs-machine-bars">${bars}</div>
      <div class="label" style="text-align:center;margin-top:1.5vh"><b>ResNet-18</b>, top-5</div>
    </div>
    <div class="lead b human-vs-machine-rank" data-step="3">“Indian elephant”: 9th, 1.3%</div>
  </div>
  <div class="popquote b human-vs-machine-pop" data-step="4">Measurement is not perception</div>
  <div class="cite b" data-step="1">Photo: Carlos Valenzuela, CC BY-SA 4.0, via Wikimedia Commons (cropped)</div>
  <style>
    .human-vs-machine-grid{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1.25fr; grid-template-rows:1fr auto; gap:2vh 4vw; transition:opacity .9s ease, filter .9s ease; }
    .human-vs-machine-grid .tile{ grid-row:1 / 3; }
    .human-vs-machine-grid .im img{ object-fit:contain; background:#fff; }
    .human-vs-machine-bars{ display:grid; grid-template-columns:auto 1fr auto; gap:1.8vh .8vw; align-items:center; margin-top:4vh; }
    .human-vs-machine-bars .label:first-child, .human-vs-machine-bars .label:nth-child(3n+1){ text-align:right; }
    .human-vs-machine-tr{ height:2.6vh; background:#f1f5f9; border-radius:4px; overflow:hidden; }
    .human-vs-machine-tr > div{ height:100%; background:var(--what); border-radius:4px; }
    .human-vs-machine-rank{ text-align:center; }
    .human-vs-machine-pop{ position:absolute; left:50%; top:52%; transform:translate(-50%,-50%) scale(.96); white-space:nowrap; }
    .human-vs-machine-pop.shown{ transform:translate(-50%,-50%); }
    .stage:has(.human-vs-machine-pop.shown) .human-vs-machine-grid{ opacity:.22; filter:blur(2px); }
  </style>
`, { notes: [
  "(draft) Now a question for you. What do you see?",
  "(draft) Here is a photo. Shout it out: what is it? (Let the room answer. Most people will say an elephant, a statue of an elephant, a decorated or brass elephant.)",
  "(draft) Here is what the same classifier from this morning says: triceratops, 29 percent. Cowboy boot, 27 percent. Then shield, chain mail, cuirass, which is a piece of armor. No elephant in the top five.",
  "(draft) ImageNet does have elephant categories. Indian elephant comes ninth, at about 1 percent. The model measured something in these pixels; it just was not what all of you saw in an instant.",
  "(draft) Measurement is not perception. (to write: the link back to Day 1, measurement vs perception, and what the room did that the model did not.) Note for us: we picked this photo because the model gets it wrong; it is one example, not a measure of how often the model fails."
]});

st(`
  <h1 class="t">Your app, a classmate’s photo</h1>
  <div class="lead b">Where did it agree with you? Where not?</div>
  <div class="todo b">Two or three misses from the lab, collected live (screenshots of students’ apps, with their permission).</div>
`, { notes: [
  "(draft) Your turn: in the lab you pointed your app at a classmate's photo.",
  "(draft) Where did the model agree with what you saw, and where did it not?",
  "(to write) Discuss a few of the room's misses."
]});

st(`
  <h1 class="t">Measurement vs perception, as a tool</h1>
  <div class="todo b">What we want students to take away: how comparing a model's output with what people see becomes a tool (the plan's "measurement vs perception as a tool"). Not yet in the plan.</div>
`, { notes: [
  "(to write) Measurement vs perception, as a tool.",
  "(to write) The takeaway."
]});
}

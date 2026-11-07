/* PART: human (Object Recognition). Owner: Shreya.
   Recognition by components, invariance (scene), categorization. */
{
section('2. How humans do it');

/* An original novel object (not Biederman's drawing). Stroked shapes first, fills on top, so only
   the outline of the union shows and the joints become sharp concavities. */
const SHAPES = [
  '<ellipse cx="200" cy="170" rx="85" ry="58"/>',
  '<path d="M270 150L375 95L385 125L280 195Z"/>',
  '<circle cx="100" cy="95" r="44"/>',
  '<rect x="165" y="215" width="60" height="85" rx="6"/>',
  '<path d="M125 195L40 250L65 285L150 225Z"/>',
];
const NOVEL = `<svg viewBox="0 0 420 320">
  <g fill="#0f172a" stroke="#0f172a" stroke-width="7" stroke-linejoin="round">${SHAPES.join('')}</g>
  <g fill="#e2e8f0">${SHAPES.join('')}</g>
  <g class="b" stroke="#d97706" stroke-width="5" stroke-dasharray="10 7" stroke-linecap="round" fill="none">
    <path d="M262 128L288 208"/><path d="M122 132L150 118"/><path d="M155 222L238 222"/><path d="M116 170L150 222"/>
  </g>
</svg>`;

st(`
  <h1 class="t">Recognition by components</h1>
  <div class="or-split">
    ${NOVEL.replace('<g class="b"', '<g class="b" data-step="2"')}
    <div class="or-list">
      <div class="question b" data-step="1">Where would you split this object into parts?</div>
      <div class="lead b" data-step="2">At the sharp concavities</div>
      <div class="lead b" data-step="3">Different observers tend to agree</div>
    </div>
  </div>
  ${cite('Biederman (1987). Our own drawing, after the idea of Ch. 50, Fig. 50.2')}
`, { notes: [
  "(draft) Our first idea from human vision comes from Irving Biederman in 1987.",
  "(draft) You have never seen this object. Take ten seconds. Where would you cut it into parts? Ask two or three students to point.",
  "(draft) Most of you cut at the same places: the regions of sharp concavity.",
  "(draft) Different observers tend to make the same decomposition, even for an object with no name. The book states this as an observation, and you have just tried it yourselves."
]});

st(`
  <h1 class="t">Geons: a vocabulary of 36 primitives</h1>
  <div class="flow b" style="margin:auto 0 1vh">
    <div class="step"><b>Edges</b></div><div class="arrow">→</div>
    <div class="step"><b>Non-accidental properties</b></div><div class="arrow">→</div>
    <div class="step"><b>Geons</b></div><div class="arrow">→</div>
    <div class="step"><b>Stored objects</b></div>
  </div>
  <div class="lead b" style="text-align:center;margin-bottom:auto">Symmetry · collinearity · cotermination · parallelism · curvature</div>
  ${cite('Biederman (1987)')}
`, { notes: [
  "(draft) Biederman proposed that objects are built from a small vocabulary of 3D primitives called geons. He derived 36 that we can discriminate visually.",
  "(draft) Recognition runs in stages: detect edges, detect non-accidental properties, detect geons, then match to stored representations.",
  "(draft) Non-accidental properties are image properties that rarely arise by chance from a viewpoint: symmetry, collinearity, cotermination, parallelism and curvature."
]});

/* Rings measured from row and column scans of coffee.jpg (1280 x 853):
   body x 442-726, y 268-537; handle x 697-785, y 330-452. */
const P4 = '../day04/assets/photos/', P = 'assets/photos/';

st(`
  <h1 class="t">Geons on a real object</h1>
  <div class="or-split">
    <div class="b" data-step="1">${rfig(P4 + 'coffee.jpg', 1280 / 853, [
      {r: [442 / 1280, 268 / 853, 284 / 1280, 269 / 853], k: 'ring', step: 2},
      {r: [697 / 1280, 330 / 853, 88 / 1280, 122 / 853], k: 'ring', step: 3}])}</div>
    <div class="or-list">
      <div class="lead b" data-step="2"><b>Body</b>: a cylinder-like part</div>
      <div class="lead b" data-step="3"><b>Handle</b>: a curved tube</div>
    </div>
  </div>
  ${cite('Our example, after Biederman (1987). Photo: Shixart1985, CC BY 2.0')}
`, { notes: [
  "(draft) What would this look like on a real object?",
  "(draft) Here is a cup. You could describe it without naming it.",
  "(draft) It has a body, close to a cylinder.",
  "(draft) And it has a handle, a curved tube attached to the side. On this account, those parts and how they connect are what let you recognize a cup. This example is ours, not the chapter's."
]});

st(`
  <h1 class="t">Geons: limits and legacy</h1>
  <div class="or-cards or-c3 or-short">
    <div class="or-card b">${fig(P + 'tea-table.jpg')}<div class="lead"><b>Weak composition</b></div><div class="label">A chair leg and a table leg are similar, not identical</div></div>
    <div class="or-card b">${fig(P + 'clouds.jpg')}<div class="lead"><b>Stuff</b></div><div class="label">Clouds, grass, water: no fixed shape, no parts</div></div>
    <div class="or-card b">${fig(P + 'spaghetti.jpg')}<div class="lead"><b>Highly textured</b></div><div class="label">Trees, food: too much fine detail for a few simple parts</div></div>
  </div>
  <div class="lead b" style="text-align:center;margin-bottom:5vh"><b>Legacy:</b> parts remain an ingredient of many vision systems</div>
  ${cite('Fischler &amp; Elschlager (1973) · Felzenszwalb et al. (2010). Photos: Korzun (cropped), Vanlewen, CC BY-SA 4.0 · spaghetti, public domain')}
`, { notes: [
  "(draft) The idea is powerful, but it has limits.",
  "(draft) Compositionality in vision is weaker than in language. Look at the legs of this table and these chairs. They share many properties, but they are not identical words from one dictionary.",
  "(draft) Geons fail on stuff, such as clouds, grass and water. What would the parts of this cloud be? It has no fixed shape to break down.",
  "(draft) They also fail on highly textured objects, such as trees and food. This plate of spaghetti is a real object, but its detail is too fine and irregular to describe with a few simple parts.",
  "(draft) Still, decomposing objects into parts has been an important ingredient of many computer vision systems, for example pictorial structures and deformable part models."
]});

sc('mentalRotation', 'scenes/mental-rotation.html');

st(`
  <h1 class="t">Categorization: three levels</h1>
  <div class="or-cards or-c3">
    <div class="or-card b">${fig(P + 'tea-table.jpg')}<div class="lead"><b>Furniture</b></div><div class="label">superordinate</div></div>
    <div class="or-card b">${fig(P + 'chair.jpg')}<div class="lead"><b>Chair</b></div><div class="label">basic</div></div>
    <div class="or-card b">${fig(P + 'kitchen-chair.jpg')}<div class="lead"><b>Kitchen chair</b></div><div class="label">subordinate</div></div>
  </div>
  <div class="lead b" style="text-align:center;margin-bottom:5vh">People use the basic level by default</div>
  ${cite('Rosch (1978). Photos: Andrey Korzun, CC BY-SA 4.0, cropped · Antonio Borrillo, CC0 · Ditigibt, public domain')}
`, { notes: [
  "(draft) Our third idea is about the labels themselves. Eleanor Rosch described categories at three levels.",
  "(draft) At the top is the superordinate level: furniture. The table, the chairs and the lamp all count.",
  "(draft) In the middle is the basic level: chair.",
  "(draft) At the bottom is the subordinate level: kitchen chair, one specific kind.",
  "(draft) The basic level is the one people use by default. If I point at this and ask what it is, you say chair, not furniture."
]});

const BOX = `<svg viewBox="0 0 200 110"><path d="M40 40H160V100H40ZM40 40L65 18H185L160 40M185 18V78L160 100" fill="#e2e8f0" stroke="#0f172a" stroke-width="5" stroke-linejoin="round"/></svg>`;

st(`
  <h1 class="t">Categories are not crisp</h1>
  <div class="or-cards or-c3">
    <div class="or-card b"><div class="lead"><b>Prototypes</b></div><div class="label">Boundaries are fuzzy; we compare to the clearest examples</div></div>
    <div class="or-card b">${BOX}<div class="lead"><b>Context</b></div><div class="label">A box can be used as a table: standing vs. occasion meaning</div></div>
    <div class="or-card b"><div class="lead"><b>No categories?</b></div><div class="label">Visual Memex avoids them altogether</div></div>
  </div>
  ${cite('Rosch (1978) · Malisiewicz &amp; Efros (2009) · After Ch. 50, Fig. 50.4')}
`, { notes: [
  "(draft) If categories were crisp, recognition would only be a matter of finding the right label. They are not.",
  "(draft) Category boundaries are fuzzy. Prototypes, the clearest members of a category, may be the better representation: we categorize by similarity to them.",
  "(draft) Context changes meaning. Language distinguishes the standing meaning of a word, its conventional meaning, from its occasion meaning in a specific context. Vision has the same thing: a box can be used as a table.",
  "(draft) Some work avoids categories altogether, such as the Visual Memex of Malisiewicz and Efros. Keep this in mind, because every system we see next starts by fixing a list of classes."
]});

/* Cue conflict closes the human section. The public copy has no figures: the Oppenheim, Geirhos and Goh images await permission. */
st(`
  <h1 class="t">When shape and texture disagree, models often pick texture</h1>
  <div class="or-cards" style="grid-template-columns:minmax(0,60vw);justify-content:center">
    <div class="or-card b" data-step="1">
      <div class="lead"><b>Cat shape, elephant skin</b></div>
      <div class="label">Humans pick shape: 96%. ResNet-50 picks texture: 78%</div>
    </div>
  </div>
  <div class="lead b" data-step="2" style="text-align:center">A single-label classifier must choose one cue; humans describe both</div>
  <div class="or-cards or-c2 or-small">
    <div class="or-card b" data-step="3"><div class="label"><b>Still open:</b> no agreed way to measure which cues a model relies on</div></div>
    <div class="or-card b" data-step="4"><div class="label"><b>Safety:</b> misleading text and stickers are cheap physical attacks</div></div>
  </div>
  ${cite('Geirhos et al. (2019) · Goh et al. (2021), Distill')}
`, { notes: [
  "(draft) Now the same conflict for models.",
  "(draft) Geirhos and colleagues built images with one object's shape and another's texture: for example, a cat's shape with elephant skin. Among decisions that matched either cue, humans picked the shape 95.9 percent of the time. An ImageNet-trained ResNet-50 picked the texture 77.9 percent of the time.",
  "(draft) A single-label classifier has to choose one cue. Humans describe both.",
  "(draft) Still open: there is no agreed way to measure which cues a model relies on.",
  "(draft) And a safety point: misleading text and stickers are cheap, physical attacks that work in the real world. Teaser: newer architectures do better on this test, though not at human level. Next class: do transformers see shape more like we do? We come back to this test at the end of the lecture, where later work questions it. Bridge: humans recognize by shape and keep both cues. Now let us see what we ask machines to do. The simplest task outputs one label, so the model has to pick one cue."
]});
}

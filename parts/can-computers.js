/* PART: can-computers. Owner: Shreya (see README.md). Outline slides 10-14. */
{
section('Computers');

st(`
  <div class="center">
    <div class="question" style="font-size:clamp(2.4rem,4.2vw,3.8rem)">Can computers do the same?</div>
    <div class="lead b" style="margin-top:5vh">Some things yes, others no</div>
  </div>
`, { notes:
  "(draft) So the brain solves this all the time. Can computers do the same?" +
  "[click] (draft) The short answer: yes for some things, and no for others. Let's look at both."
});

/* Applications: one tile per click. Photos from the original deck. */
const tile = (src, name, step) => `<div class="tile b" data-step="${step}">
  <div class="im"><img src="assets/can-computers/${src}" alt="${name}"></div><div class="label">${name}</div></div>`;
st(`
  <h1 class="t">Exciting times in computer vision</h1>
  <div class="tiles" style="grid-template-columns:repeat(3,1fr);grid-template-rows:1fr 1fr">
    ${tile('app-healthcare.jpg', 'Healthcare', 1)}${tile('app-robotics.jpg', 'Robotics', 2)}${tile('app-driving.jpg', 'Driving', 3)}
    ${tile('app-gaming.jpg', 'Gaming', 4)}${tile('app-accessibility.jpg', 'Accessibility', 5)}${tile('app-ecology.jpg', 'Ecology', 6)}
  </div>
`, { notes: [
  "Things are really starting to work.",
  "(draft) Healthcare: finding structures in medical and microscopy images.",
  "(draft) Robotics: robots that see what they are handling.",
  "(draft) Driving: self-driving cars.",
  "(draft) Gaming: depth cameras like the Kinect that track your body.",
  "(draft) Accessibility: automatic descriptions of photos for people who are blind or have low vision.",
  "(draft) Ecology: detecting and counting animals, like fish on a reef."
]});

/* A cup of cat. From the original notes: show the caption first, then the image. */
const gen = (src, cap, k) => `<div class="tile">
  <div class="label b" data-step="${k}" style="font-size:clamp(1.4rem,2.2vw,2rem)">${cap}</div>
  <div class="im b" data-step="${k + 1}"><img src="assets/can-computers/${src}" alt=""></div></div>`;
st(`
  <h1 class="t">Exciting times in computer vision</h1>
  <div class="lead center b" data-step="1">Prompt: show images of a cup of coffee, a cat, and “a cup of cat”</div>
  <div class="tiles" style="grid-template-columns:repeat(3,1fr)">
    ${gen('cup-of-coffee.jpg', '“A cup of coffee”', 2)}${gen('cat.jpg', '“A cat”', 4)}${gen('cup-of-cat.jpg', '“A cup of cat”', 6)}
  </div>
  ${cite('Images: ChatGPT-4o (OpenAI) · Prompt idea: Shuang Li')}
`, { sub: false, notes: [
  "Exciting times in computer vision.",
  "One aspect that makes these models so powerful is their ability to recombine concepts to create new things. The prompt to ChatGPT-4o: show images of a cup of coffee, a cat, and a cup of cat.",
  "A cup of coffee.",
  "(the image)",
  "A cat.",
  "(the image)",
  "For example, given a new text input ‘a cup of cat’, DALLE-2 can generate an image containing both the cup and the cat. This ability, which we call compositionality, is the key force behind the creativity (and originality) of such models.",
  "(the image) (from your notes: show multiple images, and say these are not cherry-picked)"
]});

/* Not long ago: a detector's output on a bathroom sink. Box geometry measured from the original
   slide (fractions of the photo); colors kept from the original slide. */
const det = (r, c, name, step) => `<div class="det b" data-step="${step}" style="--c:${c};left:${r[0]*100}%;top:${r[1]*100}%;width:${r[2]*100}%;height:${r[3]*100}%"><i>${name}</i></div>`;
const sink = (steps) => `<figure class="fig"><div class="well rwell"><div class="fw" data-ar="1">
    <img src="assets/can-computers/sink-detections.jpg" alt="">
    ${det([.018, .310, .232, .386], '#ff0000', 'Sheep', steps[0])}
    ${det([.667, .181, .315, .222], '#008000', 'Airplane', steps[1])}
    ${det([.306, .422, .614, .158], '#ffff00', 'Bed', steps[2])}
    ${det([.626, .461, .232, .386], '#c3d69b', 'Horse', steps[3])}
  </div></div></figure>`;
st(`
  <h1 class="t">Not long ago…</h1>
  ${sink([1, 2, 3, 4])}
  <div class="cite">Image source: to add</div>
`, { notes: [
  "(draft) Not long ago, things looked very different.",
  "(draft) Here is what an object detector reported for this photo of a bathroom sink. A sheep.",
  "(draft) An airplane.",
  "(draft) A bed.",
  "(draft) And a horse."
]});

/* Then vs now, side by side (outline slide 14). Continues the previous slide: no lead-in. */
st(`
  <h1 class="t">Not long ago…</h1>
  <div class="tiles" style="grid-template-columns:1fr 1fr">
    <div class="tile b" data-step="1">${sink([0, 0, 0, 0]).replace(/ b"/g, ' shown"')}</div>
    <div class="tile b" data-step="2"><div class="im" style="background:none"><img src="assets/can-computers/cup-of-cat.jpg" alt="" style="object-fit:contain"></div></div>
  </div>
`, { blank: false, notes: [
  "(draft) Not long ago…",
  "(draft) A few years ago, a sink was a sheep, an airplane, a bed and a horse.",
  "(draft) Today, the same field gives us a cup of cat. That is how fast this has moved, and why it is an exciting time to learn how it works. (Foreshadow: this is a project-based course; you will build some of this yourselves.)"
]});
}

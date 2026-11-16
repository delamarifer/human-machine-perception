/* PART: labs (Day 11, owner: Shreya). Built 2026-11-16 from Shreya's Google Slides, slides 9-10:
   "CSAIL Embodied Intelligence Group" (her list of 18 labs, with "[ include image from MIT labs to show different aspects ]")
   and "Vacuum" (a Roomba image, "Discuss quick pipeline"; her line "We cant even build a vacuum robot" removed at her
   request 2026-11-16 and replaced by a draft question that leads into the pipeline).
   The labs are grouped by aspect (draft grouping, by each lab's main focus) instead of lab photos: photos of the labs are
   not free to reuse, so that is an open question. The vacuum pipeline reuses the names from the common-problems slide.
   No speaker notes. */
{
section('Embodied agents');

/* Her lab list, with her department labels, grouped into four aspects (draft). */
const D11_LABS = [
  ['Seeing and sensing', [
    ['Phillip Isola’s lab', 'EECS / CSAIL'],
    ['Scene Representation Group (Sitzmann)', 'EECS / CSAIL'],
    ['SPARK Lab', 'AeroAstro / LIDS'],
    ['Adelson Lab (GelSight tactile sensing)', 'BCS / CSAIL'],
    ['Multisensory Intelligence Group', 'Media Lab'],
  ]],
  ['Bodies and movement', [
    ['Biomimetic Robotics Lab', 'Mechanical Engineering'],
    ['Robot Locomotion Group', 'EECS / CSAIL'],
    ['Distributed Robotics Lab', 'EECS / CSAIL'],
    ['Improbable AI Lab', 'EECS / CSAIL'],
  ]],
  ['Planning and reasoning', [
    ['Learning and Intelligent Systems (LIS)', 'EECS / CSAIL'],
    ['Robust Robotics Group', 'AeroAstro / CSAIL'],
    ['REALM Lab', 'AeroAstro / LIDS'],
    ['Computational Cognitive Science (CoCoSci)', 'BCS / CSAIL'],
  ]],
  ['Language and people', [
    ['Language and Intelligence (LINGO) Lab', 'EECS / CSAIL'],
    ['Spoken Language Systems Group', 'CSAIL'],
    ['Interactive Robotics Group', 'AeroAstro / CSAIL'],
    ['Personal Robots Group', 'Media Lab'],
  ]],
];
st(`
  <h1 class="t">CSAIL Embodied Intelligence Group</h1>
  <div class="d11-col">
    <div class="d11-labs">
      ${D11_LABS.map(([aspect, labs]) => `
        <div class="d11-lab b"><h2>${aspect}</h2><ul>${labs.map(([n, d]) => `<li>${n}<small>${d}</small></li>`).join('')}</ul></div>`).join('')}
    </div>
    <div class="d11-quest b">Across departments: the <b>Quest Embodied Intelligence Mission</b> (MIT Siegel Family Quest for Intelligence)</div>
    <div class="d11-logos b"><img src="assets/logo-mit.svg" alt="MIT logo"><img src="assets/logo-medialab.svg" alt="MIT Media Lab logo"></div>
  </div>
  ${cite('Logos: MIT and MIT Media Lab, public domain, via Wikimedia Commons')}
`);

/* Vacuum: her line with the photo, then the quick pipeline, one stage per click. Each stage is tagged with its name from
   the common-problems slide. */
const D11_VAC = [
  ['Sense', 'bumpers, cliff sensors, a camera or lidar', 'Environment state estimation'],
  ['Where am I?', 'build a map and find itself on it', 'My own state estimation'],
  ['Plan', 'a path that covers the whole floor', 'Planning'],
  ['Move', 'drive the wheels along that path', 'Control'],
];
st(`
  <h1 class="t">Vacuum</h1>
  <div class="d11-col">
    <div class="d11-vac">
      <figure class="d11-vac-fig b" data-step="1"><img src="assets/ex-roomba.jpg" alt="A Roomba robot vacuum"></figure>
      <div class="d11-q b" data-step="1">It looks simple. What does a robot vacuum have to solve?</div>
    </div>
    <div class="d11-vac-pipe">
          ${D11_VAC.map(([name, what, prob], k) => `
            <div class="d11-vstep b" data-step="${k + 2}"><b>${name}</b><span>${what}</span><small>${prob}</small></div>
            ${k < D11_VAC.length - 1 ? `<div class="d11-varrow b" data-step="${k + 3}">→</div>` : ''}`).join('')}
    </div>
    <div class="d11-vloop b" data-step="6">↻ then sense again: every move changes what it senses</div>
  </div>
  ${cite('Photo: Larry D. Moore (CC BY 4.0), via Wikimedia Commons')}
`);
}

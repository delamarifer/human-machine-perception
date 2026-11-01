/* PART: visual-system. Owner: Fernanda (see README.md).
   Outline slide 8 asked: "animate visual system (neural paths): where and how". */
{
section('Seeing');

sc('visualStreams', 'scenes/visual-system-streams.html');

st(`
  <h1 class="t">What each stage computes</h1>
  <div class="vs-grid">
    <article class="vs-card vs-early b" data-step="1">
      <b>Retina</b>
      <p>Contrast, not a photograph</p>
      <p class="vs-more">Rods for dim light. Cones L, M, and S for color and detail. Center-surround cells fire for a difference, so an edge is loud and a flat wall is quiet.</p>
    </article>
    <article class="vs-card vs-early b" data-step="2">
      <b>V1</b>
      <p>An edge, at one orientation</p>
      <p class="vs-more">After the LGN. A simple cell wants that edge in one place. A complex cell keeps the orientation and lets the place move. The fovea takes a large share of the map.</p>
    </article>
    <article class="vs-card vs-what b" data-step="3">
      <b>Ventral stream</b>
      <p>What it is, across views</p>
      <p class="vs-more">V4, then inferotemporal cortex. Shape, color, objects, faces. Angle, distance, and light change the image. The object stays the object.</p>
    </article>
    <article class="vs-card vs-where b" data-step="4">
      <b>Dorsal stream</b>
      <p>Where it is, and how to act</p>
      <p class="vs-more">Parietal cortex, and MT for motion. Position, direction, and speed, then the movement: reach, grasp, or step around.</p>
    </article>
    <article class="vs-card vs-both b" data-step="5">
      <b>Together</b>
      <p>A name is not a reach</p>
      <p class="vs-more">One stream can say it is a bicycle. The other says where it is, and whether you can grab it or walk past it.</p>
    </article>
  </div>
  <style>
    .vs-grid{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1fr; grid-template-rows:1fr 1fr auto; gap:1.4vh 1.6vw; }
    .vs-card{ min-height:0; border:2px solid var(--line); border-left-width:8px; border-radius:14px; padding:1.4vh 1.3vw; display:flex; flex-direction:column; justify-content:center; gap:.45vh; }
    .vs-card b{ font-size:clamp(1.25rem, 2vw, 1.7rem); line-height:1.15; }
    .vs-card p{ margin:0; font-size:clamp(1.02rem, 1.45vw, 1.28rem); line-height:1.3; }
    .vs-more{ color:var(--ink); }
    .vs-early{ border-left-color:var(--early); }
    .vs-what{ border-left-color:var(--what); }
    .vs-where{ border-left-color:var(--where); }
    .vs-both{ grid-column:1 / -1; border-left-color:var(--ink); }
  </style>
`, { notes: [
  "(draft) The map we just walked, restated as the job of each stage. One line on screen. The sentence is the computation, not the anatomy.",
  "(draft) The retina detects light and already edits it. Rods for dim light, cones for color and detail, three cone types whose responses the brain compares. Center-surround cells answer to a difference across space, so a uniform wall is quiet and a boundary is loud. That is early feature extraction: local contrast, the cousin of a spatial filter.",
  "(draft) V1, at the back of the head, after the LGN. Cells prefer bars and edges at particular orientations, some also at a particular place, some less so. The fovea claims a large share of this map. Early layers of a convolutional network learn filters that behave like this: edges, gradients, simple texture.",
  "(draft) The ventral stream, through V4 into inferotemporal cortex, answers what. Shape, color, category, faces. The hard part is invariance: position, angle, distance, lighting and occlusion all change the image, and the object stays the object. Object classification is this problem.",
  "(draft) The dorsal stream, into parietal cortex, answers where and how. Position, motion in MT, depth, and the transform into a movement: reach, grasp, walk around. Optical flow, tracking, and a robot that has to act are this problem. Recognition alone does not pick up the cup.",
  "(draft) They run together. A bicycle is identified on one stream and located, or avoided, on the other. If you can name a cup and cannot reach it, the split is not just a teaching diagram. Ask them that, and leave it open."
]});
}

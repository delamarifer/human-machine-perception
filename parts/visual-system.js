/* PART: visual-system. Owner: Fernanda (see README.md).
   Outline slide 8 asked: "animate visual system (neural paths): where and how". */
{
section('Seeing');

sc('visualStreams', 'scenes/visual-system-streams.html');

st(`
  <h1 class="t">What each stage computes</h1>
  <ul class="frag">
    <li class="b"><b>Retina</b> Contrast, not a photograph</li>
    <li class="b"><b>V1</b> An edge, at one orientation</li>
    <li class="b"><b>Ventral stream</b> What it is, across views</li>
    <li class="b"><b>Dorsal stream</b> Where it is, and how to act</li>
    <li class="b"><b>Together</b> A name is not a reach</li>
  </ul>
`, { notes: [
  "(draft) The map we just walked, restated as the job of each stage. One line on screen. The sentence is the computation, not the anatomy.",
  "(draft) The retina detects light and already edits it. Rods for dim light, cones for color and detail, three cone types whose responses the brain compares. Center-surround cells answer to a difference across space, so a uniform wall is quiet and a boundary is loud. That is early feature extraction: local contrast, the cousin of a spatial filter.",
  "(draft) V1, at the back of the head, after the LGN. Cells prefer bars and edges at particular orientations, some also at a particular place, some less so. The fovea claims a large share of this map. Early layers of a convolutional network learn filters that behave like this: edges, gradients, simple texture.",
  "(draft) The ventral stream, through V4 into inferotemporal cortex, answers what. Shape, color, category, faces. The hard part is invariance: position, angle, distance, lighting and occlusion all change the image, and the object stays the object. Object classification is this problem.",
  "(draft) The dorsal stream, into parietal cortex, answers where and how. Position, motion in MT, depth, and the transform into a movement: reach, grasp, walk around. Optical flow, tracking, and a robot that has to act are this problem. Recognition alone does not pick up the cup.",
  "(draft) They run together. A bicycle is identified on one stream and located, or avoided, on the other. If you can name a cup and cannot reach it, the split is not just a teaching diagram. Ask them that, and leave it open."
]});
}

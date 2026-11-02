/* Day 2 opening. Discussion of the Day 1 reading. Pritchard was optional. */
{
section('Readings');

st(`
  <h1 class="t">Yesterday's readings</h1>
  <ul class="frag">
    <li class="b"><a href="https://www.cogconfluence.com/wp-content/uploads/2017/09/perception_inverse_problem.pdf">Pizlo, Perception viewed as an inverse problem</a></li>
    <li class="b"><a href="https://www.cogconfluence.com/wp-content/uploads/2017/09/Pritchard_stabilization.pdf">Pritchard, Stabilized images on the retina</a> (optional)</li>
  </ul>
`, { notes: [
  "(draft) Start here, before the question for today. Ask who read them. Take what they say before you explain.",
  "(draft) Pizlo, 2001. Perception as an inverse problem. One image does not determine one scene.",
  "(draft) Pritchard, 1961, was optional. When the image is held still on the retina, it fades. Ask who read it."
]});

st(`
  <h1 class="t">The picture faded</h1>
  <ul class="frag">
    <li class="b">The eye is always moving</li>
    <li class="b">Hold the image still, and it disappears</li>
    <li class="b">A photograph is not what the eye holds</li>
  </ul>
`, { notes: [
  "(draft) Pritchard. Ask them what happened in the experiment before you list it.",
  "(draft) Even when you fix your gaze, the eye drifts, flicks, and trembles. The image on the retina keeps moving.",
  "(draft) Stabilize that image and it fades, then may return in pieces. The change over time is part of seeing.",
  "(draft) So a saved photograph, every pixel fixed, is not the input the eye is built for. We will use one anyway. Remember what it leaves out."
]});

st(`
  <h1 class="t">One image, many scenes</h1>
  <ul class="frag">
    <li class="b">The numbers do not pick one world</li>
    <li class="b">Something else has to be added</li>
    <li class="b">A constraint, from what we already know</li>
  </ul>
`, { notes: [
  "(draft) Pizlo. Ask them what an inverse problem is, in their words.",
  "(draft) Many different scenes can make the same picture. The pixels do not choose among them.",
  "(draft) A veridical percept needs something the image does not contain. He calls those a priori constraints.",
  "(draft) The checker shadow was one. The light was the same and the squares were not. Today we will write constraints down, as assumptions, and recover boxes."
]});
}

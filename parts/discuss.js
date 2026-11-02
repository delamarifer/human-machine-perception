/* PART: discuss (Day 1). After the groups. */
{
section('Discussion');

st(`
  <h1 class="t">What did your group pick?</h1>
  <ul class="frag">
    <li class="b">The application</li>
    <li class="b">The problem it solves</li>
    <li class="b">How it is like human vision</li>
    <li class="b">Where it can be wrong</li>
  </ul>
`, { notes: [
  "(draft) Each group, four sentences.",
  "(draft) Name the application.",
  "(draft) The problem in the world.",
  "(draft) The link to human vision.",
  "(draft) One way it fails. If it matches something we will do, say so: pixels, a simple system, or a model that can be confidently wrong."
]});

st(`
  <h1 class="t">Homework</h1>
  <ul class="frag">
    <li class="b" data-step="1"><b>Survey.</b> <a href="https://forms.gle/3EP5zfyj7UvarX9B7">Day 1 questionnaire</a></li>
    <li class="b" data-step="1"><b>Read.</b>
      <div><a href="https://www.cogconfluence.com/wp-content/uploads/2017/09/perception_inverse_problem.pdf">Pizlo, Perception viewed as an inverse problem</a></div>
      <div><a href="https://www.cogconfluence.com/wp-content/uploads/2017/09/Pritchard_stabilization.pdf">Pritchard, Stabilized images on the retina</a></div>
    </li>
  </ul>
  <div class="discuss-site b" data-step="1"><a href="https://delamarifer.github.io/human-machine-perception/">delamarifer.github.io/human-machine-perception</a></div>
  <style>
    .discuss-site{ font-size:clamp(1.2rem, 2.1vw, 1.7rem); margin-top:2vh; }
    .discuss-site a{ color:inherit; }
  </style>
`, { notes: [
  "(draft) Last slide. Leave it up. Two things for tonight. The course page address is on the slide.",
  "(draft) The survey, then the two readings. Pizlo, Perception viewed as an inverse problem, 2001. Pritchard, Stabilized images on the retina, 1961. Everything is at delamarifer.github.io/human-machine-perception."
]});
}

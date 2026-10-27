/* PART: about-shreya. Owner: Shreya (see README.md).
   Put your photo at assets/about-shreya/photo.jpg (it appears automatically).
   Replace each .todo box with a few cue words; the full story goes in the notes, one passage per click. */
{
section('Who we are');

st(`
  <h1 class="t">Shreya</h1>
  <div class="cols">
    <div class="photo b" data-step="1"><img src="assets/about-shreya/photo.jpg" alt="" onerror="this.replaceWith('photo')"></div>
    <ul class="frag">
      <li class="b" data-step="1"><b>Background</b><div class="todo">a few cue words: where you studied, what you trained in</div></li>
      <li class="b" data-step="2"><b>Interests related to the course</b><div class="todo">vision, perception, models: what you work on</div></li>
      <li class="b" data-step="3"><b>General interests</b><div class="todo">outside of research</div></li>
      <li class="b" data-step="4"><b>Trajectory</b><div class="todo">how you got here, research and life</div></li>
    </ul>
  </div>
`, { notes: [
  "Hi, I'm Shreya.",
  "(to write) Background.",
  "(to write) Interests related to the course.",
  "(to write) General interests.",
  "(to write) Trajectory of research and life."
]});
}

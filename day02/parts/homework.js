/* PART: homework (Day 2). Owner: to decide. Plan: 2 min. "Homework (finish simple system or extend to their
   own), paper (a metamers paper)". Which metamers paper is still open (feedback/_day.md).
   One card per task, each with its picture: the lab's own recovered scene (simple-system/recovered-behind.png,
   the back still missing), the metamers primer (metamers.html on the site, Day 2 reading homework; its own figure
   from assets/metamers/), the project form (templates.html#idea:
   Google Form, due Friday, shared with the class). */
{
section('Homework');

st(`
  <h1 class="t">Homework</h1>
  <div class="homework-cards">
    <a class="homework-card b" href="https://colab.research.google.com/github/delamarifer/human-machine-perception/blob/main/notebooks/day01-lab-simple-vision-system.ipynb" target="_blank" rel="noopener" onclick="event.stopPropagation()">
      <div class="homework-pic"><img src="assets/simple-system/recovered-behind.png" alt=""></div>
      <b>Finish the simple system</b>
      <div class="label homework-mute">or extend it to a world of your own · Open in Colab ↗</div>
    </a>
    <div class="homework-card b">
      <div class="homework-pic homework-trio"><img src="../assets/metamers/coffee.jpg" alt=""><img src="../assets/metamers/coffee-pixels.jpg" alt=""><img src="../assets/metamers/coffee-spectrum.jpg" alt=""></div>
      <b>Read the metamers primer</b>
      <div class="label homework-mute">Different, but the same to you · <a href="../metamers.html" target="_blank" rel="noopener" onclick="event.stopPropagation()" style="color:var(--ink)">Open the primer ↗</a></div>
    </div>
    <div class="homework-card b">
      <div class="homework-pic"><div class="homework-form"><span>Friday</span><i></i><i></i><i></i>
        <a href="../templates.html#idea" target="_blank" rel="noopener" onclick="event.stopPropagation()">Google Form ↗</a></div></div>
      <b>Your project idea</b>
      <div class="label homework-mute">One form, shared with the class</div>
    </div>
  </div>
  <style>
    .homework-cards{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:2vw; margin-bottom:2vh; }
    .homework-card{ border:2px solid var(--ink); border-radius:14px; padding:2vh 1.2vw; display:flex; flex-direction:column; gap:1vh; min-height:0; color:var(--ink); text-decoration:none; }
    .homework-card > b{ font-size:clamp(1.4rem, 2.2vw, 2rem); }
    .homework-mute{ color:var(--mute); }
    .homework-pic{ flex:1 1 auto; min-height:0; display:flex; align-items:center; justify-content:center; }
    .homework-pic img{ max-width:100%; max-height:100%; object-fit:contain; }
    .homework-trio{ gap:.5vw; }
    .homework-trio img{ width:32%; aspect-ratio:1; object-fit:cover; border-radius:6px; }
    .homework-form{ width:80%; border:2px solid var(--ink); border-radius:10px; padding:2vh 1.2vw; display:flex; flex-direction:column; gap:1.2vh; }
    .homework-form span{ align-self:flex-start; font-weight:700; font-size:clamp(1.1rem, 1.7vw, 1.5rem); border-bottom:3px solid var(--ink); }
    .homework-form i{ height:2.6vh; border:1.5px solid #cbd5e1; border-radius:4px; }
    .homework-form a{ color:var(--ink); font-size:clamp(1rem, 1.4vw, 1.3rem); }
  </style>
`, { notes: [
  "(draft) Homework.",
  "(draft) Finish the simple vision system notebook, or go further: extend it to a world of your own and see where it breaks.",
  "(draft) Read our primer on metamers, on the course website: things that are physically different but look exactly the same to you, and what that says about what your visual system throws away. These three pictures are from it: the same pixels, or the same frequencies, as the photo, and none of them looks like it. It sets up tomorrow, and it ends with papers to read further.",
  "(draft) And by Friday, send us your general project ideas through the form. The link is on the project templates page."
]});
}

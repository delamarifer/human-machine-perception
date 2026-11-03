/* PART: syllabus (Day 2). Owner: to decide. Plan: 5 min, "the plan for the next 3 weeks, and the grading
   details". Fernanda (2026-11-02): show the course website itself and scroll through it, instead of slides.
   Each slide embeds ../syllabus.html at one section. Scroll with the trackpad or the up/down keys; the
   right and left arrows still change slides after a click inside the page. */
{
section('Syllabus');

/* the arrow keys inside the page still drive the deck (Space, up and down are left to scroll the page) */
/* and each time the slide appears, the page jumps to its section (slides are hidden until shown, so the
   #anchor in the address alone does not land) */
const onload = `try{ const f = this, a = f.src.split('#')[1];
  f.contentWindow.addEventListener('keydown', e => {
    if(e.key === 'ArrowRight' || e.key === 'PageDown'){ e.preventDefault(); deck.fwd(); }
    if(e.key === 'ArrowLeft' || e.key === 'PageUp'){ e.preventDefault(); deck.bwd(); } });
  let seen = false;
  setInterval(() => { const on = f.clientHeight > 0;
    if(on && !seen){ const t = f.contentDocument.getElementById(a);   /* again once fonts and images settle */
      if(t) [0, 300, 900].forEach(ms => setTimeout(() => t.scrollIntoView({block: 'start', behavior: 'instant'}), ms)); }
    seen = on; }, 200); }catch(e){}`;
const site = (anchor) => `<iframe class="syllabus-site b" src="../syllabus.html#${anchor}" title="Course syllabus"
  onload="${onload.replace(/"/g, '&quot;')}"></iframe>`;
const style = `<style>
  .syllabus-site{ flex:1 1 auto; min-height:0; width:100%; border:1px solid var(--line); border-radius:12px; }
</style>`;

st(`
  <h1 class="t">Three weeks</h1>
  ${site('weeks')}
  ${style}
`, { notes: [
  "(draft) The plan for the next three weeks. This is the course website; everything is here.",
  "(draft) (Scroll through the weeks.) Week one, understanding images: how images encode visual information, and how we pull structure out of pixels. Week two, learning visual representations: neural networks, transfer learning, embeddings, and vision-language models like CLIP. Week three, building vision systems: foundation models, detection and segmentation, multimodal systems, image generation, and how to evaluate where a system fails. Then the final project."
]});

st(`
  <h1 class="t">Day by day</h1>
  ${site('schedule')}
  ${style}
`, { notes: [
  "(draft) Day by day: what you will be able to do after each session.",
  "(draft) (Scroll through the days.) Each day has its question, what you will be able to do by the end, the reading, the lab, and the link to human vision. Today is Day 2. It may shift a little as we go."
]});

st(`
  <h1 class="t">Grading</h1>
  ${site('grading')}
  ${style}
`, { notes: [
  "(draft) How you are graded. Again, all of it is on the website.",
  "(draft) (Scroll through the grading.) The final project is 45 percent: the proposal, the write-up and the presentation on the last day. Daily response papers are 24 percent: twelve of them, each with one question about the day's paper and three about the take-home lab. Two assignments, 15 percent each. And 1 percent for one short, easy question on the last day. Each piece has its rubric right here."
]});

/* Google Classroom sign-up, about 3 minutes, right after grading (Fernanda, via the coordinator, 2026-11-02).
   No class code or join link on the slide: the deck is public on GitHub Pages, so the code goes on the board. */
st(`
  <h1 class="t">Join our Google Classroom</h1>
  <ul class="frag">
    <li class="b">Sign in with your AIMS Google account (@aims.ac.za)</li>
    <li class="b">Join with the class code, or accept the email invite</li>
    <li class="b">Hand in here: proposal, write-up, slides, response papers, assignments</li>
  </ul>
  <div class="syllabus-code b">Class code: on the board</div>
  <style>
    .syllabus-code{ margin:auto; border:3px dashed var(--ink); border-radius:14px; padding:2.4vh 3vw;
      font-size:clamp(1.5rem, 2.5vw, 2.3rem); font-weight:700; }
  </style>
`, { notes: [
  "(draft) One more thing before we move on: our Google Classroom.",
  "(draft) Sign in to Google with your AIMS account, the one that ends in aims.ac.za, not a personal Gmail.",
  "(draft) Join with the class code, or accept the email invite if you got one.",
  "(draft) This is where you hand in everything: the project proposal, the write-up, your slides, the response papers and the assignments.",
  "(draft) The class code is on the board. Join now, and check that you can see the class before we move on. (to write: does the class exist yet, and who owns it? An AIMS account is best; AIMS IT or the tutors may need to create it and add Fernanda and Shreya as teachers. Write the code on the board, never on the slides: the deck is public.)"
]});
}

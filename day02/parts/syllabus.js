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
  <h1 class="t">Grading</h1>
  ${site('grading')}
  ${style}
`, { notes: [
  "(draft) How you are graded. Again, all of it is on the website.",
  "(draft) (Scroll through the grading.) The final project is 45 percent: the proposal, the write-up and the presentation on the last day. Daily response papers are 24 percent: twelve of them, each with one question about the day's paper and three about the take-home lab. Two assignments, 15 percent each. And 1 percent for one short, easy question on the last day. Each piece has its rubric right here."
]});
}

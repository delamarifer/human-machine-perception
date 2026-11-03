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

/* Handing in, and staying in touch (Fernanda, 2026-11-02; replaces the Google Classroom slide). Left: assignments
   go through Google Forms; the example is the course's Day 1 questionnaire, already public on homework.html,
   embedded live (Google allows ?embedded=true). Right: a show of hands on how to reach each other; generic
   drawn icons, no brand logos. */
const FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSfhaeGBSgdnHi0iCxqBUwHgCla_W7nT754QeWEXo-wYB4ytmQ/viewform';
const ic = {
  slack: '<svg viewBox="0 0 48 48"><rect x="6" y="6" width="36" height="36" rx="10"/><path d="M19 14v20M29 14v20M14 19h20M14 29h20"/></svg>',
  whatsapp: '<svg viewBox="0 0 48 48"><path d="M24 6a18 18 0 0 0-15.6 27L6 42l9.3-2.4A18 18 0 1 0 24 6z"/><path d="M18 17c0 8 5 13 13 13l2-3-4-2-2 2c-2-1-4-3-5-5l2-2-2-4z"/></svg>',
  email: '<svg viewBox="0 0 48 48"><rect x="6" y="11" width="36" height="26" rx="4"/><path d="M7 13l17 13 17-13"/></svg>',
  other: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="18"/><path d="M15 24h.01M24 24h.01M33 24h.01" stroke-width="5"/></svg>'
};
const opt = (k, name) => `<div class="syllabus-opt">${ic[k]}<span>${name}</span></div>`;
st(`
  <h1 class="t">Handing in, and staying in touch</h1>
  <div class="syllabus-two">
    <div class="syllabus-half b" data-step="1">
      <div class="syllabus-half-head"><b>Assignments: through Google Forms</b>
        <span class="label">An example: <a href="${FORM}" target="_blank" rel="noopener" onclick="event.stopPropagation()" style="color:var(--ink)">our Day 1 questionnaire ↗</a></span></div>
      <iframe class="syllabus-form" src="${FORM}?embedded=true" title="Example Google Form: the Day 1 questionnaire">Loading…</iframe>
    </div>
    <div class="syllabus-half b" data-step="2">
      <div class="syllabus-half-head"><b>How should we contact each other?</b><span class="label">A show of hands</span></div>
      <div class="syllabus-opts">${opt('slack', 'Slack')}${opt('whatsapp', 'WhatsApp')}${opt('email', 'Email')}${opt('other', 'Other?')}</div>
    </div>
  </div>
  <style>
    .syllabus-two{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1.15fr 1fr; gap:2.4vw; }
    .syllabus-half{ border:2px solid var(--line); border-radius:16px; padding:2vh 1.4vw; display:flex; flex-direction:column; gap:1.4vh; min-height:0; }
    .syllabus-half-head{ display:flex; flex-direction:column; gap:.4vh; }
    .syllabus-half-head b{ font-size:clamp(1.3rem, 2.1vw, 1.9rem); }
    .syllabus-form{ flex:1 1 auto; min-height:0; width:100%; border:1px solid var(--line); border-radius:10px; background:#fff; }
    .syllabus-opts{ flex:1 1 auto; display:grid; grid-template-columns:1fr 1fr; gap:1.4vw; align-content:center; }
    .syllabus-opt{ border:2px solid var(--ink); border-radius:14px; padding:2.4vh 1vw; display:flex; flex-direction:column; align-items:center; gap:1vh; }
    .syllabus-opt svg{ width:clamp(2.6rem, 4.4vw, 4.2rem); fill:none; stroke:var(--ink); stroke-width:3; stroke-linecap:round; stroke-linejoin:round; }
    .syllabus-opt span{ font-weight:700; font-size:clamp(1.1rem, 1.7vw, 1.5rem); }
  </style>
`, { notes: [
  "(draft) Two practical things: how you hand in your work, and how we stay in touch.",
  "(draft) Assignments go through Google Forms: the proposal, the response papers and the other assignments each get a form. Here is one you already know, the Day 1 questionnaire. (to write: confirm that every assignment, including the write-up and slides, goes through Forms.)",
  "(draft) And how should we contact each other? Slack, WhatsApp, email, or something else? Show of hands for each. (to write: what we decide, and who sets it up.)"
]});
}

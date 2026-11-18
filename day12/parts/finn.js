/* PART: finn (Day 12, owner: Shreya). Chelsea Finn's path.
   Sources: Wikipedia, Chelsea Finn (read 2026-11-17): MIT EECS undergrad, PhD Berkeley 2018 with Pieter Abbeel and
   Sergey Levine, intern at Google Brain, Stanford professor, previously worked for Google, co-founder of Physical
   Intelligence. Her Stanford page did not load; check before class. Photo: ORF,
   orfonline.org/expert-speak/chelsea-finn-teaching-brett-robot-how-world-works-45635 (sent by Shreya). No speaker notes. */
{
st(`
  <h1 class="t">Chelsea Finn: academia and big tech, then a startup</h1>
  <div class="d12-col">
    <div class="d12-person">
    <figure class="d12-photo b"><img src="assets/finn-lab.png" alt="Chelsea Finn, left, working with a PR2 robot" style="object-position:22% 40%"></figure>
    <div class="d12-route">
      ${d12Step(d12Img('berkeley', 'UC Berkeley') + d12Img('google', 'Google', true), 'PhD, 2018', 'UC Berkeley, with internships at Google Brain', 'Advised by Sergey Levine and Pieter Abbeel')}
      <div class="d12-arrow">→</div>
      ${d12Step(d12Img('stanford', 'Stanford', true) + d12Img('google', 'Google', true), 'Then', 'Stanford professor; also worked at Google', 'Her lab studies how robots learn through interaction')}
      <div class="d12-arrow">→</div>
      ${d12Step('<div class="d12-word">Physical Intelligence (π)</div>', 'Co-founder', 'Physical Intelligence', 'A startup building foundation models for robots: the π models')}
    </div>
    </div>
  </div>
  ${cite('Photo: ORF (orfonline.org) · Chelsea Finn, Wikipedia (read Nov 2026) · pi.website')}
`);
}

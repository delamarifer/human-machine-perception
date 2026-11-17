/* PART: start (Day 12, owner: Shreya). Built 2026-11-17 from Shreya's Slides artifact "From Research to Industry",
   cut down at her request ("not a lot of slides"): the title, three paths from the lab to industry, why leave the lab.
   Sources (read 2026-11-17):
   - Russ Tedrake, "Why Walden?", waldenrobotics.com/news/why-walden (15 Jul 2026): Walden launched January 2026 as a
     spin-out from TRI; he led the TRI team for nearly 10 years; that team made Diffusion Policy, UMI, Large Behavior
     Models, OpenVLA and Drake; success needs attention to unit economics and close work with customers; operating in
     production at a Toyota factory in North America; shipping into production changed how they build Physical AI.
   - His MIT professorship: Day 11 tedrake part (his MIT page, read 2026-11-16).
   - Chelsea Finn: Wikipedia (read 2026-11-17): Stanford professor, previously worked for Google, co-founder of
     Physical Intelligence. Her own Stanford page did not load; check before class.
   - "Every deployment supplies experience": Walden, LBM 2.0 post (11 Nov 2026), closing section, paraphrased.
   Titles are drafts. No speaker notes. */
{
section('Lab to industry');

st(`
  <div class="center" style="margin:auto">
    <div class="statement" style="font-weight:700;font-size:clamp(2.2rem,4.2vw,3.8rem)">Embodied AI today</div>
    <div class="label" style="margin-top:2.2vh">From the lab to the factory floor</div>
  </div>
`);

/* Two people, two paths. Logos from each organization's site (MIT, TRI, Walden) or Wikimedia Commons (Berkeley,
   Google, Stanford), shown in gray. Physical Intelligence has no logo file on its site, so its name is set as text. */
const d12Step = (logos, when, what, more) => `
  <div class="d12-step b">
    <div class="d12-logos">${logos}</div>
    <i>${when}</i><b>${what}</b><span>${more}</span>
  </div>`;
const d12Img = (n, alt, wide) => `<img src="assets/logo-${n}.svg" alt="${alt}"${wide ? ' class="d12-wide"' : ''}>`;

st(`
  <h1 class="t">Russ Tedrake: a university and an industry lab, then a company</h1>
  <div class="d12-col">
    <div class="d12-person">
    <figure class="d12-photo b"><img src="assets/tedrake-lab.webp" alt="Russ Tedrake, center, with students and a robot arm"></figure>
    <div class="d12-route">
      ${d12Step(d12Img('mit', 'MIT'), 'PhD 2004, then faculty', 'MIT professor', 'Robot Locomotion Group; started the Drake robot simulator')}
      <div class="d12-arrow">→</div>
      ${d12Step(d12Img('tri', 'Toyota Research Institute'), 'Nearly 10 years, at the same time', 'Toyota Research Institute', 'Led its robotics research team: Diffusion Policy, Large Behavior Models')}
      <div class="d12-arrow">→</div>
      ${d12Step(d12Img('walden', 'Walden Robotics'), 'January 2026', 'Walden Robotics', 'Spins out of Toyota Research Institute with his team; robots now at work in a Toyota factory')}
    </div>
    </div>
  </div>
  ${cite('Photo: MIT News (news.mit.edu, Apr 2022) · Tedrake’s MIT page · Tedrake, “Why Walden?” (waldenrobotics.com, Jul 2026)')}
`);

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

st(`
  <h1 class="t">Why leave the lab?</h1>
  <div class="d12-col">
    <ul class="d12-list">
      <li class="b">His team’s lab work: Diffusion Policy, Large Behavior Models, the Drake simulator</li>
      <li class="b">The technology works, but success now depends on cost and on working closely with customers</li>
      <li class="b">Robots already doing real work at a Toyota factory, with a person available for remote help</li>
      <li class="b">Shipping into real production changed how they build robot AI</li>
    </ul>
    <div class="d12-callout b">Every robot at work produces data that a lab never sees</div>
  </div>
  ${cite('Tedrake, “Why Walden?” (waldenrobotics.com/news/why-walden, Jul 2026)')}
`);
}

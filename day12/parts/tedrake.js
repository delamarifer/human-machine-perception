/* PART: tedrake (Day 12, owner: Shreya). Russ Tedrake's path, then why leave the lab. Order from Shreya (2026-11-17):
   Russ, then why, then LBM, then Chelsea, and so on.
   Sources (read 2026-11-17):
   - Russ Tedrake, "Why Walden?", waldenrobotics.com/news/why-walden (15 Jul 2026): Walden launched January 2026 as a
     spin-out from TRI; he led the TRI team for nearly 10 years; that team made Diffusion Policy, UMI, Large Behavior
     Models, OpenVLA and Drake; success needs attention to unit economics and close work with customers; operating in
     production at a Toyota factory in North America; shipping into production changed how they build Physical AI.
     The robot photo on "Why leave the lab?" is the image at the top of that post.
   - His MIT professorship: Day 11 tedrake part (his MIT page, read 2026-11-16).
   - His photo: MIT News, 2022-04-11, news.mit.edu/2022/robotic-manipulation-mit-course-0411 (sent by Shreya).
   - "Every robot at work produces data": paraphrase of Walden's LBM 2.0 post (11 Nov 2026), closing section.
   Two people, two paths. Logos from each organization's site (MIT, TRI, Walden) or Wikimedia Commons (Berkeley,
   Google, Stanford), shown in gray. Physical Intelligence has no logo file on its site, so its name is set as text.
   No speaker notes. */
{
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
  <h1 class="t">Why leave the lab?</h1>
  <div class="d12-col">
    <div class="d12-why">
    <figure class="d12-photo2 b"><img src="assets/walden-robot.jpg" alt="A Walden robot, two arms and a head with cameras, setting a cutting tool into a holder"></figure>
    <ul class="d12-list">
      <li class="b">His team’s lab work: Diffusion Policy, Large Behavior Models, the Drake simulator</li>
      <li class="b">The technology works, but success now depends on cost and on working closely with customers</li>
      <li class="b">Robots already doing real work at a Toyota factory, with a person available for remote help</li>
      <li class="b">Shipping into real production changed how they build robot AI</li>
    </ul>
    </div>
    <div class="d12-callout b">Every robot at work produces data that a lab never sees</div>
  </div>
  ${cite('Photo and text: Tedrake, “Why Walden?” (waldenrobotics.com/news/why-walden, Jul 2026)')}
`);
}

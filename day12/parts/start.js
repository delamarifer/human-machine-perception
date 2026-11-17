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

const D12_PATHS = [
  ['Both at once', 'Russ Tedrake', 'MIT professor, and for nearly 10 years the head of a robotics research team at Toyota Research Institute'],
  ['Professor, big tech, then a startup', 'Chelsea Finn', 'Stanford professor, previously at Google, now a co-founder of Physical Intelligence'],
  ['Spin-out', 'Walden Robotics', 'Tedrake’s team leaves Toyota Research Institute in January 2026; its robots now work on a Toyota engine line'],
];
st(`
  <h1 class="t">Three paths from the lab to industry</h1>
  <div class="d12-col">
    <div class="d12-cards">
      ${D12_PATHS.map(([kind, who, what]) => `
        <div class="d12-card b"><small>${kind}</small><b>${who}</b><span>${what}</span></div>`).join('')}
    </div>
    <div class="d12-callout b">Each step adds what a university lab lacks: robots at work, data and customers</div>
  </div>
  ${cite('Tedrake, “Why Walden?” (waldenrobotics.com, Jul 2026) · Tedrake’s MIT page · Chelsea Finn, Wikipedia')}
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

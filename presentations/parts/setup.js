/* PART: setup (Final presentations, owner: Shreya), 2026-11-16.
   Schedule from Shreya: Thursday and Friday, 2-4 pm, six 20-minute slots each day, one team per slot; teams sign up in
   the Google Doc "Project presentations: sign-up". Shreya, 2026-11-16: the talk and questions must leave time for the
   changeover; 12 + 5 + 3 minutes is Claude's proposal, not yet confirmed. Assignment 2 (Shreya, 2026-11-16): write about
   two other projects; due date, length and content not given yet, shown as "to add" boxes. Weights and lengths from templates.html. No speaker notes. */
{
section('Title');

st(`
  <div class="center" style="margin:auto">
    <div class="statement" style="font-weight:700;font-size:clamp(2rem,3.7vw,3.3rem)">Final presentations and write-ups</div>  </div>
`);

section('Setup');

st(`
  <h1 class="t">When do you present?</h1>
  <div class="pr-col">
    <ul class="pr-list">
      <li class="b"><b>Thursday and Friday, 2 to 4 pm</b></li>
      <li class="b"><b>Six 20-minute slots each day</b><span class="pr-sub">One slot per team</span></li>
      <li class="b"><b>12 minutes to talk, 5 for questions</b><span class="pr-sub">The last 3 minutes are for the next team to set up</span></li>
      <li class="b"><b>Sign up for one slot</b><span class="pr-sub"><a href="https://docs.google.com/document/d/1uivAlhELC4kQgEJz5DlX36Vvx4gCwKj4pAYVWrP9Of4/edit">Project presentations: sign-up</a> (Google Doc). Write your title and names in an empty row.</span></li>
    </ul>
  </div>
`);

st(`
  <h1 class="t">What do you hand in?</h1>
  <div class="pr-col">
    <div class="pr-cards">
      <div class="pr-card b"><small>Last day</small><div class="pr-big">15%</div><b>Presentation</b><span>One slide per idea, in the order of the outline</span></div>
      <div class="pr-card b"><small>Last day</small><div class="pr-big">20%</div><b>Write-up</b><span>3 to 4 pages, like a short paper, with a link to your code or demo</span></div>
      <div class="pr-card b"><small>After the talks</small><div class="pr-big">A2</div><b>Assignment 2</b><span>Write about two projects by other teams</span></div>
    </div>
  </div>
`);
}

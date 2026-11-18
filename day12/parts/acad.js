/* PART: acad (Day 12, owner: Shreya). Built 2026-11-18. Academia and industry: goals and rewards, what changes when
   a system has to work every day, and why they are not either/or. General descriptions, not data. Examples from this
   deck: Tedrake (MIT and TRI, then Walden), Finn (Stanford, Google, Physical Intelligence); open releases: Drake
   (drake.mit.edu), Segment Anything (Kirillov et al., 2023, model and SA-1B dataset released openly by Meta), AlphaFold
   database (EMBL-EBI). No speaker notes. */
{
section('Academia and industry');

st(`
  <h1 class="t">Different goals, different rewards</h1>
  <div class="d12-col">
    ${d12Tab(['', 'Academia', 'Industry'], [
      ['Goal', 'New knowledge', 'A product or service that works'],
      ['Rewarded for', 'Papers, ideas others build on, students', 'Customers, revenue, reliability'],
      ['Who picks the problem', 'The researcher', 'The customer and the business'],
      ['Time horizon', 'Years', 'Months to quarters'],
      ['Openness', 'Publish everything', 'Often private, sometimes open'],
    ])}
  </div>
`);

st(`
  <h1 class="t">What changes when it has to work every day</h1>
  <div class="d12-col">
    ${d12Tab(['', 'In a paper', 'In a product'], [
      ['Evaluation', 'A fixed benchmark', 'Real users, changing data'],
      ['Scale', 'A few GPUs, one dataset', 'Many users or robots, cost per prediction'],
      ['Reliability', 'The best run', 'Every day, every edge case, safety'],
      ['Maintenance', 'Done when the paper is accepted', 'Years of updates and monitoring'],
      ['Team', 'A student and an advisor', 'Researchers, engineers, product, operations'],
    ])}
  </div>
`);

d12Bul('Not either/or', [
  '<b>Joint roles:</b> Tedrake at MIT and Toyota Research Institute; Finn at Stanford and Physical Intelligence',
  '<b>Internships and industry PhDs</b> move people both ways',
  '<b>Open releases</b> flow back to universities: Drake, Segment Anything, the AlphaFold database',
  '<b>Industry labs publish,</b> and university labs start companies',
], 'Most careers mix the two');
}

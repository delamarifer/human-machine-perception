/* PART: where (Day 12, owner: Shreya). Built 2026-11-18. Where research happens. (The Africa slide was removed
   on 2026-11-18 at Shreya's request; it is in git history.)
   Sources: InstaDeep, Wikipedia (read 2026-11-18): founded in Tunisia in 2014 by Karim Beguir and Zohra Slim; offices
   include Cape Town and Kigali; acquired by BioNTech in January 2023. Deep Learning Indaba (deeplearningindaba.com),
   Masakhane (masakhane.io), CSIR (csir.co.za), Google Research Africa in Accra (opened 2019; check before class).
   The table's goals and funding are general descriptions, not data. No speaker notes. */
{
section('Where research happens');

st(`
  <h1 class="t">Five places research happens</h1>
  <div class="d12-col">
    ${d12Tab(['', 'Main goal', 'Paid for by', 'Time horizon', 'Example'], [
      ['University', 'New knowledge, trained people', 'Grants, governments', 'Long', 'MIT Robot Locomotion Group'],
      ['Industrial lab', 'Breakthroughs for the company', 'The company', 'Medium', 'Toyota Research Institute, Google DeepMind'],
      ['Startup', 'A product people pay for', 'Investors, then customers', 'Short', 'Walden, Physical Intelligence'],
      ['Government lab', 'National needs', 'Public money', 'Long', 'CSIR (South Africa), NASA JPL'],
      ['Nonprofit', 'A public mission', 'Donors, foundations', 'Varies', 'Allen Institute for AI'],
    ], 'd12-dense')}
  </div>
`);
}

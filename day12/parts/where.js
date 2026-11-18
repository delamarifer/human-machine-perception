/* PART: where (Day 12, owner: Shreya). Built 2026-11-18. Where research happens, then examples in Africa.
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
    <div class="d12-callout b">The walls are thin: people, code and ideas move between all five</div>
  </div>
`);

d12Bul('Research happening near you', [
  '<b>Deep Learning Indaba:</b> the annual meeting of machine learning in Africa',
  '<b>Masakhane:</b> a grassroots community building language technology for African languages',
  '<b>InstaDeep:</b> founded in Tunis in 2014, offices in Cape Town and Kigali, bought by BioNTech in 2023',
  '<b>Google Research Africa</b> in Accra, and <b>CSIR</b>, South Africa’s national research council',
], 'Every path in this lecture exists on this continent',
'deeplearningindaba.com · masakhane.io · InstaDeep, Wikipedia · research.google · csir.co.za');
}

/* PART: homework (Day 4, Part 2). Owner: Shreya.
   The last slide. Dates and wording come from the course site (index.html) and day04/parts/project.js. */
{
section('6. Lab and homework');

st(`
  <h1 class="t">Homework</h1>
  <div class="or-cards or-c2">
    <div class="or-card b"><div class="lead"><b>Lab</b></div><div class="label">Finish the handwritten digits lab</div><div class="label or-note">Submit your Colab link with the form</div></div>
    <div class="or-card b"><div class="lead"><b>Assignment 1</b></div><div class="label">Are vision models still blind? Colab link and one-page PDF</div><div class="label or-note">Due Wed, Nov 11, 2pm</div></div>
    <div class="or-card b"><div class="lead"><b>Reading</b></div><div class="label">Konkle &amp; Alvarez (2022)</div><div class="label or-note">Response by hand at the start of next class</div></div>
    <div class="or-card b"><div class="lead"><b>Project proposal</b></div><div class="label">Upload it with the form on the course site</div><div class="label or-note">General idea Saturday night, detailed proposal Monday</div></div>
  </div>
  ${cite('Konkle, T. &amp; Alvarez, G. A. (2022). Nature Communications 13, 491')}
`, { notes: [
  "(draft) Before you go, here is what is coming up. Everything is linked on the course site.",
  "(draft) Finish the handwritten digits lab, and submit your Colab link with the form on the course site.",
  "(draft) Assignment 1, are vision models still blind, is due Wednesday, November 11, at 2pm. Submit your Colab link and a one-page PDF.",
  "(draft) Read Konkle and Alvarez, 2022. They train a network without any category labels: it only learns to recognize different views of the same image as the same. They ask whether category information still emerges, and how well its features match responses along the human ventral stream. You will write a short response on it by hand at the start of next class.",
  "(draft) Your general project idea is due Saturday night, and the detailed proposal is due Monday. Upload it with the form on the course site."
]});
}

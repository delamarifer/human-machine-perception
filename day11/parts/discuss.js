/* PART: discuss (Day 10, owner: Shreya). Google Slide 10 (2026-11-13), "Discussion: Creativity, consent, and culture".
   Shreya's wording; one topic and its question per click. Compute (draft wording) and Evaluation (her pick, "option B")
   were added at Shreya's request, 2026-11-13. No speaker notes. */
{
section('Discussion');

const D10_TOPICS = [
  ['Creativity: Can AI be creative?', 'If a person chooses the prompt but AI creates the image, who is the artist?'],
  ['Consent: Who gives permission?', 'Should AI companies ask artists before using their work to train AI models?'],
  ['Ownership: Who owns the result?', 'Can an AI-generated image be copyrighted? Who should receive the rights?'],
  ['Culture: Who has the right to use cultural art?', 'Who should decide whether a cultural style can be used by AI?'],
  ['Human value: What makes human art special?', 'Does knowing the story or feelings behind an artwork change how we value it?'],
  ['Compute: What does it cost?', 'Training and running big models uses a lot of energy. Is the art worth it, and who should pay that cost?'],
  ['Evaluation: Who decides if AI art is good?', 'The model, the audience, or the art world? What can no metric measure?'],
];

st(`
  <h1 class="t">Discussion: Creativity, consent, and culture</h1>
  <div class="d10-col">
    <ul class="d10-list d10-topics">
      ${D10_TOPICS.map(([t, q]) => `<li class="b"><b>${t}</b><span class="d10-sub">${q}</span></li>`).join('')}
    </ul>
  </div>
`);
}

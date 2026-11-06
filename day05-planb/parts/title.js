/* PART: title (Day 5 Plan B). Owner: Fernanda. Title slide and the credit to the video this deck follows. */
{
section('Title');

st(`<style>
  .planb-title{ margin:auto 0; display:flex; flex-direction:column; gap:3vh; }
  .planb-title h1.t{ font-size:clamp(2.6rem, 5.6vw, 5rem); }
</style>
  <div class="planb-title">
    <h1 class="t">Vision Transformer</h1>
    <div class="statement b" data-step="1">How an image becomes a sequence of tokens, and what attention does with them</div>
    <div class="label b" data-step="1">Human-Machine Perception · Day 5</div>
  </div>
  <div class="cite b" data-step="1">Based on “Vision Transformer”, AGI Lambda, YouTube (youtube.com/watch?v=vJF3TBI8esQ)</div>
`, { notes: [
  "(draft) Title only. Today is about the Vision Transformer, the model that brought the transformer from language to images.",
  "(draft) We will follow one short explainer video, Vision Transformer by the AGI Lambda channel on YouTube, concept by concept, and rebuild each of its animations. The question for today: how does an image become a sequence of tokens, and what does attention do with them? Credit for the structure and the sequence of ideas goes to that video; the slides and the words are ours."
]});
}

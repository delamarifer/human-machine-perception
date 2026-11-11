/* PART: start (Day 8). Group names and the Calendly link are from Shreya (2026-11-11 message). Google deck "Day 8 - Generative Modeling", slides 1-2 (owner: Shreya).
   Comments applied: slide 1 has the Calendly link and the six group topics (from Shreya's message);
   slide 2 has no links. No speaker notes. */
{
section('Start');

st(`
  <style>
    .d8-ann{ margin:0; padding-left:1.4em; display:flex; flex-direction:column; gap:2.2vh; }
    .d8-ann > li{ font-size:clamp(1.05rem, 2vw, 1.8rem); line-height:1.3; }
    .d8-ann a{ color:inherit; }
    .d8-ann-groups{ margin:1.2vh 0 0; padding-left:2.4em; columns:2; column-gap:3vw;
      font-size:clamp(.95rem, 1.6vw, 1.45rem); line-height:1.55; }
    @media (max-width: 820px), (max-aspect-ratio: 1/1){ .d8-ann-groups{ columns:1; } }
  </style>
  <h1 class="t">Announcements</h1>
  <div class="d8-col" style="justify-content:flex-start;padding-top:2vh">
    <ul class="d8-ann">
      <li class="b">Assignment #1 Due Friday</li>
      <li class="b">Proposals Due Friday</li>
      <li class="b">Group Project Sign Ups: <a href="https://calendly.com/shreyalpandit/project-proposal-review" target="_blank" rel="noopener">Calendly w/ Shreya</a>, to chat on Thursday
        <ol class="d8-ann-groups b">
          <li>Blur and scrambling, people vs models</li>
          <li>Decoding imagined pictures</li>
          <li>FocusLens webcam timer</li>
          <li>How ViTs forget</li>
          <li>Uncertainty and active vision</li>
          <li>What rotation robustness costs</li>
        </ol>
      </li>
    </ul>
  </div>
`);

st(`
  <div class="center" style="margin:auto">
    <div class="statement" style="font-weight:700;font-size:clamp(2rem,3.7vw,3.3rem)">Day 8 · Generative Modeling</div>
    <div class="label" style="margin-top:2.2vh">Human and Machine Perception</div>
  </div>
`);
}

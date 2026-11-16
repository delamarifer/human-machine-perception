/* PART: close (Day 11, owner: Shreya). Added 2026-11-16 at Shreya's request: close the lecture with Malik's answer to
   the data problem, and come back to the opening question.
   Source: Jitendra Malik, "Vision and Robotics for Embodied AI", ETH Zurich (youtube.com/watch?v=HvDU7Vk4pbc):
   - 18:50-19:31 "I've put myself into a corner"; Turing 1950 (Computing Machinery and Intelligence, Mind 59): simulate
     the child's mind, then educate it. Quoted here in under 15 words.
   - 20:01 insights from child psychology: multimodality (vision, touch, proprioception), hierarchies, social learning.
   - 20:33-22:13 imitation is not behavior cloning; the girl watching her father wash dishes; she can't see the forces,
     her hands are smaller, so she practices in her own body, trial and error and play; "just replace the girl by a robot".
   - 22:24-25:06 it works for walking: video of a person -> 3D reconstruction -> retarget to a humanoid -> practice
     (reinforcement learning) in a simulator; about 100 trajectories in total (his figure). Paper: Allshire et al.,
     Visual Imitation Enables Contextual Humanoid Control (VideoMimic), CoRL 2025. Its figures are not CC licensed, so
     the pipeline is drawn and the picture is his clip.
   - 25:40-28:19 the same recipe for hands: close to solved, not fully (his words).
   The opening question and the 17-of-25 count are from slides 3-4 (the Day 10 reflection form).
   Titles and the final discussion question are drafts. No speaker notes. */
{
section('Closing');

const CL_TALK = 'Jitendra Malik, “Vision and Robotics for Embodied AI”, talk at ETH Zurich, 2026';
const clClip = (start, end, title, step) => `<div class="d11-yt d11-mk-clip b" data-step="${step}"><iframe src="https://www.youtube-nocookie.com/embed/HvDU7Vk4pbc?start=${start}&end=${end}&rel=0" title="${title}" allow="fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;

st(`
  <h1 class="t">Learn like a child</h1>
  <div class="d11-col">
    <div class="d11-split d11-mk-split">
      <div class="d11-swap">
        <div class="d11-close-quote b" data-step="1">“Why not rather try to produce one which simulates the child’s?”<small>Alan Turing, 1950</small></div>
        ${clClip(1224, 1333, 'Malik talk: how a child learns by watching and practicing', 5)}
      </div>
      <div class="d11-side">
        <div class="d11-step b" data-step="2">Imitation is not copying: no one controls the child’s muscles for her</div>
        <div class="d11-step b" data-step="3">She watches her father wash dishes. But she can’t see the forces, and her hands are smaller</div>
        <div class="d11-callout b" data-step="4">So she practices in her own body: trial and error, and play. Malik: “just replace the girl by a robot”</div>
      </div>
    </div>
  </div>
  ${cite('A. M. Turing, Computing Machinery and Intelligence, Mind, 1950 · ' + CL_TALK)}
`);

const CL_PIPE = [
  ['Watch', 'a phone video of a person climbing stairs or sitting down'],
  ['Rebuild in 3D', 'the person and the scene around them'],
  ['Move it to a robot body', 'map the person’s motion onto a humanoid'],
  ['Practice', 'in a simulator, by trial and error, until it is robust'],
];
st(`
  <h1 class="t">It already works for walking</h1>
  <div class="d11-col">
   <div class="d11-swap d11-close-swap">
    <div class="d11-close-body b" data-step="1">
    <div class="d11-close-pipe">
      ${CL_PIPE.map(([b, s], k) => `<div class="d11-vstep b" data-step="${k + 1}"><b>${b}</b><span>${s}</span></div>${k < CL_PIPE.length - 1 ? `<div class="d11-varrow b" data-step="${k + 2}">→</div>` : ''}`).join('')}
    </div>
    <div class="d11-step d11-close-c b" data-step="5">About 100 example motions in total, not thousands of hours: the simulator supplies the variety</div>
    <div class="d11-callout b" data-step="6">Next: the same recipe for hands. Malik: close, but not fully solved</div>
    </div>
    ${clClip(1344, 1506, 'Malik talk: a humanoid that learned from videos of a person', 7)}
   </div>
  </div>
  ${cite('Allshire et al. (with Malik), Visual Imitation Enables Contextual Humanoid Control (VideoMimic), CoRL 2025 · ' + CL_TALK)}
`);

st(`
  <h1 class="t">Back to our question</h1>
  <div class="d11-col">
    <div class="popquote b" data-step="1">“An AI does not need to experience the world to understand it”</div>
    <div class="d11-sum b" data-step="2"><b>17 of 25</b> of you disagreed</div>
    <div class="d11-close-ans b" data-step="3">Malik’s answer for robots: watching is not enough. A robot has to practice, <b>in its own body</b></div>
    <div class="d11-callout b" data-step="4">If a robot learns that way, is it experiencing the world?</div>
  </div>
  ${cite('Day 10 reflection form, 25 answers · ' + CL_TALK)}
`);
}

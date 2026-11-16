/* PART: child (Day 11), about 16 minutes. Owner: Fernanda. Shared styles and helpers are in ../lib.js.
   Malik getting out of the corner: the talk from 19:12 to 35:14, chapters 5 and 6 of
   ../reference/malik-talk-map.md. The part before this one ends with all three ways of getting robot data
   knocked down; this one opens with Turing.

   Round 3 (2026-11-16): THIRTEEN SLIDES MERGED INTO FIVE, at Fernanda's request, because the session felt
   repetitive. Nothing was deleted. Each old slide became a beat on a bigger slide, and the notes were joined
   in the same order, so the argument runs exactly as it did:
     1 Turing, 1950                       <- old 1
     2 What imitation actually is          <- old 2, 3, 4, 5 (the nugget, in one build of six beats)
     3 From a video of a person to a policy in a body  <- old 6, 7 (blind/seeing, then the pipeline)
     4 And it walks, a bit drunk           <- old 8, 9, 13 (both videos, and his own timeline)
     5 Getting the 3D                      <- old 10, 11, 12 (the droppable block, now ONE slide)
   26 clicks, down from 43. Slide 5 is still the self-contained 3D half: if the session has to be shorter it
   is now a one-line deletion, and the part then ends on slide 4, which closes with his timeline.

   Round 2 kept: the on-screen word budget in ../reference/check-slides.js. The Turing quotation is READ
   ALOUD, not displayed. The pipeline is pictures and single words. Paper titles, authors and links live in
   the citation line, which is where a citation belongs.

   Sourcing: no figure of Malik's is used anywhere. Every drawing here is inline SVG written in this file.
   The one photograph is public domain (Turing at 16, Wikimedia Commons). The two videos are the paper
   authors' own, played from their own project pages, which is linking and not copying. The kitchen scene is
   DRAWN on purpose: it would otherwise want a photograph of somebody's small child on a public course site.
   See ../assets/child/SOURCES.md. All notes are drafts. */
{
section('The child');

const TALK = 'After ' + d11Link('Jitendra Malik, "Vision and Robotics for Embodied AI" (ETH Zurich, 2026)', MALIK_TALK);

/* local styles; every class starts with child- */
(() => {
  if(document.getElementById('child-style')) return;
  const el = document.createElement('style'); el.id = 'child-style';
  el.textContent = `
  .child-split{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 14em; gap:3vw; align-items:center; }
  .child-photo{ margin:0; width:100%; }
  .child-photo img{ width:100%; border-radius:10px; filter:saturate(.9); }
  .child-stack{ display:flex; flex-direction:column; gap:3vh; min-width:0; }
  .child-vid{ width:100%; min-height:0; max-height:42vh; border:2px solid var(--line);
    border-radius:12px; background:#000; }
  .child-punch{ text-align:center; font-weight:700; font-size:clamp(1.8rem, 3.8vw, 3.4rem); line-height:1.1; }
  /* two videos side by side, each with its own caption underneath */
  .child-two{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1fr;
    grid-template-rows:1fr auto; gap:1.6vh 2.4vw; align-items:center; }
  .child-cap{ text-align:center; font-weight:700; font-size:clamp(1.1rem, 2.1vw, 1.8rem); }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){
    .child-split{ grid-template-columns:1fr; }
    .child-two{ grid-template-columns:1fr; grid-template-rows:auto; }
  }
  `;
  document.head.appendChild(el);
})();

/* ---- drawing pieces, all local to this part ---- */
/* d11Box centres its label with flexbox, so a <br>-separated label lands side by side: wrap it in one block */
const childBox = (x, y, w, h, t, o = {}) => d11Box(x, y, w, h, `<div style="width:100%">${t}</div>`, o);

const childFig = (x, y, h, o = {}) => {              /* a plain standing person: head, body, arm, legs */
  const s = h / 100, hd = 13 * s;
  return `<g stroke="var(--ink)" stroke-width="${Math.max(2.4, 3.2 * s)}" fill="none" stroke-linecap="round">
    <circle cx="${x}" cy="${y - h + hd}" r="${hd}" fill="${o.fill || '#fff'}"/>
    <path d="M ${x} ${y - h + 2 * hd} L ${x} ${y - 38 * s}"/>
    <path d="M ${x} ${y - 38 * s} L ${x - 14 * s} ${y} M ${x} ${y - 38 * s} L ${x + 14 * s} ${y}"/>
    <path d="M ${x} ${y - h + 2.8 * hd} L ${x + (o.reach || 22) * s} ${y - (o.hand || 46) * s}"/>
  </g>`;
};

/* the five glyphs of the pipeline, each drawn in its own 120 by 86 space, placed at (x, y) */
const childGlyph = (kind, x, y) => {
  const g = {
    video: `<rect x="8" y="10" width="104" height="66" rx="8" fill="none" stroke="var(--ink)" stroke-width="3"/>
            <path d="M 50 30 L 78 43 L 50 56 Z" fill="var(--ink)"/>
            <path fill="none" d="M 8 24 L 112 24 M 8 62 L 112 62" stroke="var(--ink)" stroke-width="2" stroke-dasharray="5 6"/>`,
    recon: `<rect x="8" y="10" width="104" height="66" rx="8" fill="none" stroke="var(--ink)" stroke-width="2.2" stroke-dasharray="7 6"/>
            ${['M 8 26 L 8 10 L 24 10', 'M 96 10 L 112 10 L 112 26', 'M 8 60 L 8 76 L 24 76', 'M 96 76 L 112 76 L 112 60']
              .map(d => `<path fill="none" d="${d}" stroke="var(--ink)" stroke-width="3.6"/>`).join('')}
            ${childFig(60, 68, 48, { reach: 26, hand: 30 })}`,
    sim:   `<path fill="none" d="M 10 68 L 110 68" stroke="var(--ink)" stroke-width="3"/>
            <circle cx="44" cy="50" r="16" fill="none" stroke="var(--ink)" stroke-width="3"/>
            <path fill="none" d="M 64 50 L 98 50" stroke="var(--ink)" stroke-width="3" marker-end="url(#child-pipe-head)"/>
            <path fill="none" d="M 44 30 L 44 12" stroke="var(--ink)" stroke-width="3" marker-end="url(#child-pipe-head)"/>`,
    rl:    `${[0, 1, 2].map(i => `<rect x="${12 + i * 18}" y="${12 + i * 10}" width="72" height="48" rx="7"
              fill="#fff" stroke="var(--ink)" stroke-width="${i === 2 ? 3.6 : 2.2}"/>`).join('')}`,
    robot: `<rect x="34" y="14" width="52" height="40" rx="8" fill="none" stroke="var(--ink)" stroke-width="3"/>
            <circle cx="48" cy="32" r="5" fill="var(--ink)"/><circle cx="72" cy="32" r="5" fill="var(--ink)"/>
            <path fill="none" d="M 60 14 L 60 6" stroke="var(--ink)" stroke-width="3"/><circle cx="60" cy="4" r="4" fill="var(--ink)"/>
            <path fill="none" d="M 44 54 L 44 76 M 76 54 L 76 76 M 44 76 L 76 76" stroke="var(--ink)" stroke-width="3"/>`,
  }[kind];
  return `<g transform="translate(${x} ${y})">${g}</g>`;
};

/* ------------------------------------------------------------------ 1. Turing (4 clicks) */
st(`
  <h1 class="t">Turing, 1950</h1>
  <div class="d11-body">
    <div class="child-split">
      <div class="child-stack">
        <div class="child-punch b" data-step="1">Not the adult.<br>The child.</div>
        <svg class="d11-svg b" data-step="2" style="max-height:17vh" viewBox="0 0 700 110" role="img"
             aria-label="A span from 1950 to 2026, seventy six years wide">
          ${d11Arrow('child-tur-head')}
          <path fill="none" d="M 80 60 L 620 60" stroke="var(--ink)" stroke-width="3.5" marker-start="url(#child-tur-head)" marker-end="url(#child-tur-head)"/>
          <path fill="none" d="M 80 46 L 80 74 M 620 46 L 620 74" stroke="var(--ink)" stroke-width="3.5"/>
          <text x="80" y="34" style="font-size:25px;font-weight:700">1950</text>
          <text x="620" y="34" style="font-size:25px;font-weight:700">2026</text>
          <text x="350" y="100" style="font-size:25px;font-weight:700">76 years</text>
        </svg>
      </div>
      <figure class="child-photo b" data-step="1"><img src="assets/child/turing-aged-16.jpg" alt="Alan Turing as a schoolboy of sixteen"></figure>
    </div>
    <div class="d11-chips b" data-step="3">
      <span>touch</span><span>hierarchies</span><span>physical search</span><span>imitation</span><span>language</span>
    </div>
    <div class="lead b" data-step="4" style="text-align:center">A can of verbs</div>
  </div>
  ${cite('Turing, "Computing Machinery and Intelligence", Mind, 1950, section 7 · photograph of Turing at sixteen: public domain, Wikimedia Commons · ' + TALK)}
`, { notes: [
  "(draft) He has just talked himself into a corner. Teleoperation puts the human in an awkward rig, human video has no forces, simulation needs rewards nobody can write. His own words: so what the hell am I going to do? And then he puts up a slide he says he has used for ten years and intends to keep using.",
  "(draft) Turing, 1950, the same paper as the imitation game. Read it out loud: instead of trying to produce a programme to simulate the adult mind, why not rather try to produce one which simulates the child? If this were then subjected to an appropriate course of education, one would obtain the adult brain. Notice what the claim is. The hard thing is not the finished competence. It is the thing that can acquire competence.",
  "(draft) And then his own aside, which I like him for. Turing wrote that in 1950. It is now 2026. That is seventy six years, and in the meantime psychologists have written thousands of papers about how children actually learn, which he says he is not going to summarise for us. In other words: the advice was taken by almost nobody in his field.",
  "(draft) What he does flash up is what the child has that the robot does not. Several senses at once, not just a camera: touch and proprioception as well as vision. A hierarchy, so it is not all one policy. Physical search, which means going and messing with things. Social imitation. And language last, not first.",
  "(draft) His phrase for this is that it opens up a whole can of verbs. Hold onto that, because the next slide is where the argument actually turns, and in my view it is the best idea in the talk."
]});

/* ------------------------------------------------------------------ 2. The nugget, all of it (6 clicks).
   This one slide was four: behaviour cloning taken literally, the kitchen, the two reasons, the formula.
   Three panels, left to right, and the argument walks across them. */
st(`
  <h1 class="t">What imitation actually is</h1>
  <div class="d11-body">
    <svg class="d11-svg" viewBox="0 0 1000 440" role="img"
         aria-label="Three panels: behaviour cloning taken literally and crossed out; a drawn kitchen where a small child watches her father wash dishes; and the chain watch, do it yourself, the skill, with the girl swapped for a robot">
      ${d11Arrow('child-n-head')}

      <g class="b" data-step="1">
        ${childBox(14, 10, 300, 58, '<b>behaviour cloning</b>', { fs: 24 })}
        ${childFig(110, 300, 170, { reach: 40, hand: 46 })}
        ${childFig(240, 300, 96, { reach: -28, hand: 44 })}
        <path fill="none" d="M 186 214 C 206 200 216 220 230 232" stroke="var(--ink)" stroke-width="2.8"
              stroke-dasharray="7 6" marker-end="url(#child-n-head)"/>
      </g>
      <g class="b" data-step="2">
        <path fill="none" d="M 56 136 L 294 306 M 294 136 L 56 306" stroke="var(--ink)" stroke-width="7" stroke-linecap="round" opacity=".9"/>
        <text x="165" y="384" style="font-size:26px;font-weight:700">This ain&rsquo;t happening</text>
      </g>

      <g class="b" data-step="3">
        <path fill="none" d="M 356 300 L 654 300" stroke="var(--ink)" stroke-width="4"/>
        <path d="M 430 300 L 430 262 L 540 262 L 540 300" stroke="var(--ink)" stroke-width="3.4" fill="#fff"/>
        <path fill="none" d="M 460 262 L 460 232 L 488 232" stroke="var(--ink)" stroke-width="3.2"/>
        <path fill="none" d="M 492 238 L 492 254" stroke="var(--ink)" stroke-width="2.2" stroke-dasharray="4 5"/>
        ${childFig(400, 300, 162, { reach: 36, hand: 40 })}
        ${childFig(590, 300, 90, { reach: -24, hand: 40 })}
        <path fill="none" d="M 570 228 C 530 216 494 224 474 236" stroke="var(--ink)" stroke-width="2.6"
              stroke-dasharray="7 6" marker-end="url(#child-n-head)"/>
        <text x="505" y="348" style="font-size:24px">parents · peers · apprentice</text>
      </g>
      <g class="b" data-step="4">
        ${childBox(352, 10, 148, 54, 'no forces', { fs: 21 })}
        ${childBox(512, 10, 148, 54, 'itty-bitty hands', { fs: 19 })}
      </g>

      <g class="b" data-step="5">
        ${childBox(694, 10, 292, 62, '<b>watch</b>', { fs: 28 })}
        <path fill="none" d="M 840 76 L 840 102" stroke="var(--ink)" stroke-width="3.4" marker-end="url(#child-n-head)"/>
        ${childBox(694, 110, 292, 62, '<b>do it yourself</b>', { fs: 24, sw: 5 })}
        <path fill="none" d="M 840 176 L 840 202" stroke="var(--ink)" stroke-width="3.4" marker-end="url(#child-n-head)"/>
        ${childBox(694, 210, 292, 62, '<b>the skill</b>', { fs: 28 })}
      </g>
      <g class="b" data-step="6">
        ${childGlyph('robot', 780, 294)}
        <text x="840" y="414" style="font-size:26px;font-weight:700">a robot</text>
      </g>
    </svg>
    <div class="child-punch b" data-step="6">Done</div>
  </div>
  ${cite(d11Link('Malik, ETH Zurich, 2026, 20:24 to 22:24 — "this ain&rsquo;t happening" and "itty-bitty hands" are quoted', MALIK_TALK)
    + ' · drawn here, not his figure; the kitchen scene is drawn deliberately rather than photographed')}
`, { notes: [
  "(draft) This is the slide I would keep if I had to throw the rest of the session away. It has four moves in it, so stay with me.",
  "(draft) The standard story in robotics is that imitation learning means behaviour cloning. You record what an expert did, and you fit a policy to copy it, action by action. Every paper in the teleoperation line is doing this, and the word imitation is doing a lot of quiet work in that sentence. His words: you are being fed a story when you are told that imitation learning is behaviour cloning. So take it literally for a second. If a child learned by behaviour cloning, it would mean the adult reaches into the child and sets her motor commands, so that her hand closes on the object. The adult is driving the child's neural circuits.",
  "(draft) And his verdict, which is the whole turn of the talk: this ain't happening. Nothing like this happens to any child anywhere. Whatever imitation is in a human being, it is not that. So the field has named its method after a thing that does not exist, and then inherited all the problems of the thing it actually built.",
  "(draft) Here is what does happen, and it is the most ordinary scene in the world. A father is washing the dishes. His small daughter is standing next to him, watching his hands. I have drawn it rather than found a photograph, because I would rather not put somebody's actual child on a public course page. And this, he says, is how essentially all cultural knowledge moves from one body to another. From parents. From peers and teachers. From the apprentice who sweeps up in the bicycle shop and after two years can true a wheel. Nobody in any of those cases is writing anybody else's motor commands.",
  "(draft) But now the part that makes it a research programme instead of a nice observation. She is watching him, and she still cannot copy him, for two separate reasons, and they are exactly the two objections we already met. First: what she sees does not contain what matters. She sees where his fingers go. She does not see the grip force, she does not see the friction keeping the plate from sliding, she does not see him taking up the weight before he lifts. That is the no-contact-forces problem, in a kitchen. Second, in a phrase you will remember: she has itty-bitty hands. Her hand is not his hand. Even if she could see every force, the forces she needs are different, because the body applying them is different. That is the embodiment gap — the standard objection to learning from human video. And notice: the human case works anyway. So the gap cannot be fatal.",
  "(draft) Which is why the answer is the chain on the right. One: you watch somebody do it, and what you get out of that is a hint. Not a trajectory to replay, not a list of torques: a hint about what the goal is, which objects matter, roughly how it goes. That is the cultural part, the part that comes from other people. Two, the load-bearing box: then you work it out in your own body, by playing and getting it wrong. That is where the forces come from, which is the information watching could never give you. And because it happens in your body, the embodiment gap stops being a problem — you were never trying to reproduce his muscle commands. Three: out the other end comes the skill.",
  "(draft) And then his line, which got a laugh in the room. So to me this is the formula. Just replace the girl by a robot. Done. He is only half joking: he says he intends to spend the next few years of his career making this slide into a solution for robotic manipulation. The rest of my section is the evidence that it is not just a slide."
]});

/* ------------------------------------------------------------------ 3. Blind, then not blind, then the
   pipeline (5 clicks). Was two slides. Pictures and single words, not captioned paragraphs. */
st(`
  <h1 class="t">From a video of a person to a policy in a body</h1>
  <div class="d11-body">
    <svg class="d11-svg" viewBox="0 0 1000 520" role="img"
         aria-label="Above: the same staircase twice, once with a robot that has no vision and feels for the edge, once with a robot that can see the steps ahead. Below: five stages drawn as pictures, a video, a reconstruction, a physics simulator, many simulated variations, and a robot">
      ${d11Arrow('child-pipe-head')}

      ${[0, 1].map(k => { const ox = k * 520;
        const steps = [0, 1, 2, 3].map(i => `<path fill="none" d="M ${ox + 90 + i * 52} ${210 - i * 36} l 0 -36 l 52 0"
          stroke="var(--ink)" stroke-width="3.4"/>`).join('');
        return `<g class="b" data-step="${k + 1}">
          <path fill="none" d="M ${ox + 26} 210 L ${ox + 90} 210" stroke="var(--ink)" stroke-width="3.4"/>
          ${steps}
          ${childFig(ox + 58, 210, 96, { reach: k ? 26 : 38, hand: 40 })}
          ${k
            ? `<path d="M ${ox + 72} 126 L ${ox + 206} 84 L ${ox + 212} 152 Z" fill="var(--early)" fill-opacity=".22" stroke="var(--ink)" stroke-width="2.2"/>`
            : `<path fill="none" d="M ${ox + 74} 180 q 26 -18 50 2" stroke="var(--ink)" stroke-width="2.6" stroke-dasharray="6 5" marker-end="url(#child-pipe-head)"/>`}
          <text x="${ox + 180}" y="258" style="font-size:25px;font-weight:700">${k ? 'vision is for the stairs' : 'no vision'}</text>
        </g>`; }).join('')}
      <path class="b" data-step="2" fill="none" d="M 440 150 L 486 150" stroke="var(--ink)" stroke-width="3.4" marker-end="url(#child-pipe-head)"/>

      ${[['video', 'video', 3], ['recon', '3D', 3], ['sim', 'physics', 4], ['rl', 'practice', 4], ['robot', 'the robot', 4]]
        .map(([kind, word, step], i) => { const x = 14 + i * 198;
          return `<g class="b" data-step="${step}">
            <rect x="${x}" y="300" width="166" height="124" rx="14" fill="#fff" stroke="var(--ink)" stroke-width="3"/>
            ${childGlyph(kind, x + 23, 318)}
            <text x="${x + 83}" y="458" style="font-size:25px;font-weight:700">${word}</text>
            ${i < 4 ? `<path fill="none" d="M ${x + 170} 362 L ${x + 206} 362" stroke="var(--ink)" stroke-width="3.4" marker-end="url(#child-pipe-head)"/>` : ''}
          </g>`; }).join('')}
      <text class="b" data-step="5" x="500" y="506" style="font-size:26px;font-weight:700">about 100 trajectories</text>
    </svg>
  </div>
  ${cite('After ' + d11Link('Allshire, Choi, Zhang, McAllister and colleagues, "Visual Imitation Enables Contextual Humanoid Control", CoRL 2025 (Best Student Paper)', 'https://videomimic.net/')
    + ' · ' + d11Link('Malik, ETH Zurich, 2026, 22:24', MALIK_TALK)
    + ' · drawn here; the 100 figure is Malik&rsquo;s own, spoken in the talk, not read off the paper')}
`, { notes: [
  "(draft) The existence proof he offers is in locomotion, not manipulation, and it is worth a minute, because the recipe is the formula you just saw with the boxes filled in.",
  "(draft) Start with what blind locomotion means. A quadruped or a humanoid with no vision at all, walking by proprioception and reflex, feeling for the ground with its feet and correcting. That works astonishingly well on flat ground and even on broken ground, and it is most of what you have seen in robot videos.",
  "(draft) Now give it vision. It can see the step before it gets there, so it can place a foot rather than discover an edge with its shin. And this is the honest version of why vision matters for action, which is the thread running through this whole session. Not because seeing is nice to have, but because stairs and rough terrain are exactly the cases where the information you need arrives too late if it arrives through your feet.",
  "(draft) So here is how that walking policy was actually made. One: RGB video of a person. An ordinary camera, no motion capture suit, no markers, no instrumented room. Two: reconstruct it in 3D — and not just the person. The person and the ground they are walking on, the step, the slope, the obstacle. This is the hard stage, and it is where the rest of my section goes.",
  "(draft) Three: drop that reconstruction into a physics simulator. This is the move that fixes the missing forces, because a simulator has forces by construction. Watching the video never gave you a contact force; now you have one. Four: let it practise. Reinforcement learning on top — not to invent the behaviour from scratch, which is where rewards become impossible to write, but to make the behaviour robust, and to let the simulator throw a thousand variations of the same staircase at it. Five: out comes one policy, running in the robot's own body, on nothing but proprioception and a local height map.",
  "(draft) And the number is the point. About a hundred trajectories in total, against the thousands of hours of teleoperation the other approach pays people to collect. The variety did not come from people, it came from the simulator — which is exactly the child practising, rather than the child being replayed."
]});

/* ------------------------------------------------------------------ 4. Both videos, and his timeline
   (5 clicks). Was three slides. The two honest admissions sit side by side, and his own six years closes it,
   so the part ends properly here if slide 5 ever comes out. */
st(`
  <h1 class="t">And it walks, a bit drunk</h1>
  <div class="d11-body">
    <div class="child-two">
      <div class="b" data-step="1">
        <video class="child-vid" src="https://videomimic.net/stairs/2.mp4" controls muted loop playsinline preload="metadata"
          title="A humanoid climbing steps, from the VideoMimic project page"></video>
      </div>
      <div class="b" data-step="3">
        <video class="child-vid" src="https://do-as-i-do.com/assets/trailer.mp4" controls muted loop playsinline preload="metadata"
          title="Human videos retargeted to a dexterous robot hand, from the Do as I Do project page"></video>
      </div>
      <div class="child-cap b" data-step="2">a bit drunk</div>
      <div class="child-cap b" data-step="3">whisking &middot; pouring &middot; brushing</div>
    </div>
    <div class="lead b" data-step="4" style="text-align:center;margin-top:2.2vh">Cherry-picked, he says so</div>
    <div class="d11-big b" data-step="5">six years, not two</div>
  </div>
  ${cite('Authors&rsquo; own videos, played from ' + d11Link('videomimic.net', 'https://videomimic.net/')
    + ' (Allshire, Choi, Zhang, McAllister, Zhang, Kim, Darrell, Abbeel, Malik and Kanazawa, CoRL 2025, Best Student Paper, '
    + d11Link('arXiv:2505.03729', 'https://arxiv.org/abs/2505.03729') + ') and '
    + d11Link('do-as-i-do.com', 'https://do-as-i-do.com/')
    + ' (Paliwal, Etukuru, Liang, Abbeel, Shafiullah and Malik, "Do as I Do", Berkeley, 2026, '
    + d11Link('arXiv:2606.19333', 'https://arxiv.org/abs/2606.19333') + ') · needs internet in the room · the timeline is his own account, at 27:47 · ' + TALK)}
`, { notes: [
  "(draft) Rather than tell you about it, here it is: the authors' own videos, played straight off their project pages. If the room has no internet, read the addresses out loud and move on, because the pipeline slide already carries the argument.",
  "(draft) On the left, a humanoid going up real steps outdoors, from a policy built out of about a hundred videos of people and a simulator. The first author is Arthur Allshire, and when Malik says in the talk that Arthur is the human being reconstructed, he means the first author put himself in the training data. The paper won the best student paper award at CoRL.",
  "(draft) And I want you to notice him say it, because very few talks do: it looks a little bit drunk. He is not pretending this is solved. The standard answer in the field, he says, is that if you just train it a bit longer it will stop looking drunk. Hold that thought for thirty seconds.",
  "(draft) Locomotion is the easy case and he knows it. So on the right is the same recipe pointed at manipulation, which at the time of the talk was hot off the press. A human doing something in ordinary video, and the same action performed by a robot with multi-fingered hands. Same pipeline as the walking: video, reconstruction, simulator, practice in its own body. Whisking, pouring, brushing. Also stirring, hammering, spreading. These are kitchen and workshop verbs, which is deliberate: they are the things a twelve year old can do and no robot could.",
  "(draft) And then the sentence I want you to take away from this whole session about how to read a robotics demo. He says, out loud, of course these are cherry-picked videos, like they always are. That is not a confession, it is a norm. When you watch any robot video, including this one, the honest question is not what did it do. It is how many takes.",
  "(draft) One last thing before we go to the vision, and you almost never hear this said in a talk. In 2020 he thought this whole programme would take one or two years. He says so plainly, in public, on a stage. It is 2026. He has been at it five or six years, and his own verdict is: close to solved, not fully solved. Put that next to the picture of the field you get from paper abstracts and company announcements. The person whose argument we have followed all hour was off by a factor of three, and says so out loud. That is what an honest research timeline looks like, and it is worth knowing before you write the schedule for your own project."
]});

/* ================================================================================================
   5. The 3D half, all of it on one slide: how you actually get the second box of the pipeline.
   This was three slides (RGB video, reconstruction by recognition, SAM 3D). It is the LAST slide of the
   part on purpose: if Day 11 has to come down in length, delete this one st(...) call and nothing before
   it has to be rewritten — slide 4 already closes the section on his timeline.
   ================================================================================================ */
st(`
  <h1 class="t">Getting the 3D</h1>
  <div class="d11-body">
    <svg class="d11-svg" viewBox="0 0 1000 540" role="img"
         aria-label="Top: a depth camera against ordinary video, which already exists in enormous quantity, and the order it was solved in, bodies then hands then objects. Middle: two viewpoints triangulating, crossed out because a video may have no parallax, against a single image retrieving a remembered three-dimensional model. Bottom: what was missing was paired data, made from CAD models and then from people choosing between two reconstructions">
      ${d11Arrow('child-g-head')}

      <g class="b" data-step="1">
        ${childBox(20, 16, 280, 70, '<b>RGB-D</b>', { fs: 28 })}
        ${childBox(330, 16, 280, 70, '<b>plain video</b>', { fs: 28, sw: 5 })}
        <text x="470" y="126" style="font-size:24px;font-weight:700">already on YouTube</text>
      </g>
      <g class="b" data-step="2">
        <path fill="none" d="M 680 76 L 964 76" stroke="var(--ink)" stroke-width="3.4"/>
        ${[[704, 'bodies'], [822, 'hands'], [940, 'objects']]
          .map(([x, t]) => `<g><circle cx="${x}" cy="76" r="8" fill="var(--ink)"/>
            <text x="${x}" y="52" style="font-size:23px;font-weight:700">${t}</text></g>`).join('')}
      </g>

      <g class="b" data-step="3">
        <path d="M 66 268 l 44 -24 l 0 48 Z" fill="none" stroke="var(--ink)" stroke-width="3"/>
        <path d="M 302 268 l -44 -24 l 0 48 Z" fill="none" stroke="var(--ink)" stroke-width="3"/>
        <circle cx="184" cy="268" r="15" fill="none" stroke="var(--ink)" stroke-width="3"/>
        <path fill="none" d="M 112 256 L 168 266 M 256 256 L 200 266" stroke="var(--ink)" stroke-width="2.3" stroke-dasharray="6 5"/>
        <path fill="none" d="M 52 222 L 316 314 M 316 222 L 52 314" stroke="var(--ink)" stroke-width="6.5" stroke-linecap="round" opacity=".88"/>
        <text x="184" y="346" style="font-size:25px;font-weight:700">no parallax</text>
      </g>
      <g class="b" data-step="4">
        <rect x="560" y="226" width="118" height="84" rx="8" fill="none" stroke="var(--ink)" stroke-width="3"/>
        <circle cx="612" cy="268" r="17" fill="none" stroke="var(--ink)" stroke-width="2.6"/>
        <path fill="none" d="M 631 258 q 17 10 0 20" stroke="var(--ink)" stroke-width="2.6"/>
        <path fill="none" d="M 696 268 L 742 268" stroke="var(--ink)" stroke-width="3.4" marker-end="url(#child-g-head)"/>
        <path fill="none" d="M 766 246 L 846 246 L 846 306 L 766 306 Z" stroke="var(--ink)" stroke-width="3"/>
        <path fill="none" d="M 766 246 L 786 226 L 866 226 L 846 246 M 846 306 L 866 286 L 866 226" stroke="var(--ink)" stroke-width="2.6"/>
        <text x="760" y="346" style="font-size:25px;font-weight:700">recognition, not geometry</text>
      </g>

      <text class="b" data-step="5" x="500" y="402" style="font-size:27px;font-weight:700">paired data</text>
      <g class="b" data-step="6">
        ${childBox(40, 426, 196, 74, '<b>CAD</b>', { fs: 28 })}
        <path fill="none" d="M 246 463 L 288 463" stroke="var(--ink)" stroke-width="3.4" marker-end="url(#child-g-head)"/>
        ${childBox(298, 426, 196, 74, '<b>people</b>', { fs: 28 })}
        <path fill="none" d="M 504 463 L 546 463" stroke="var(--ink)" stroke-width="3.4" marker-end="url(#child-g-head)"/>
        ${childBox(556, 426, 92, 74, 'A', { fs: 30, fw: 700 })}
        ${childBox(662, 426, 92, 74, 'B', { fs: 30, fw: 700 })}
        <text x="880" y="472" style="font-size:25px;font-weight:700">which is better?</text>
      </g>
    </svg>
  </div>
  ${cite(d11Link('Malik, ETH Zurich, 2026, 28:26 to 35:14', MALIK_TALK)
    + ' · bodies: Kanazawa, Black, Jacobs and Malik, CVPR 2018 · hands: Pavlakos and colleagues, CVPR 2024 · '
    + d11Link('SAM 3D: 3Dfy Anything in Images', 'https://ai.meta.com/blog/sam-3d/') + ', Meta Superintelligence Labs with Malik, CVPR 2026, open weights ('
    + d11Link('paper', 'https://openaccess.thecvf.com/content/CVPR2026/papers/Chen_SAM_3D_3Dfy_Anything_in_Images_CVPR_2026_paper.pdf') + ', '
    + d11Link('code', 'https://github.com/facebookresearch/sam-3d-objects') + ') · the diagram is ours; no figure from the paper')}
`, { notes: [
  "(draft) Back to the second box of the pipeline, because that is where the vision is, and this is a vision course. This one slide is the whole 3D story, in six steps.",
  "(draft) The practical way to get 3D out of a person doing something is a depth camera. RGB-D. It makes life much easier and plenty of groups work that way. He refuses it, and the reason is about data, not accuracy. If you only need ordinary RGB video, then the data problem just disappears, because everything is already there on YouTube. Nobody has to be paid, nobody has to be recorded, and the variety is free. He has quoted five billion videos and a hundred and fifty six million hours.",
  "(draft) The history of getting there, in his lab: human bodies in 3D from single images, with Angjoo Kanazawa, from about 2018. Then hands, with Georgios Pavlakos — he jokes that after fighting that battle for six years he feels all right about it. And then objects, which turned out to be the real challenge. If you think about the kitchen scene, of course it did: what you need to know is not only where her hand was, it is what she was holding, and what shape it is.",
  "(draft) Now the idea underneath his 3D work, which is a genuinely old-fashioned computer vision argument and I think the most interesting thing in the back half of the talk. Normally 3D is framed as multi-view geometry: you get two views of a thing, you work out where the cameras were, you triangulate. A hundred and fifty years of photogrammetry sits behind that. His objection is brutally practical. In a real video of a person doing something, there may be no parallax at all. She is standing still at the sink, the camera is on a tripod, the mug does not move. Geometry has nothing to work with.",
  "(draft) So he wants to approach 3D by recognition instead. You are not seeing this mug for the first time. You have seen mugs from above, from the side, upside down in a dishwasher, and you are carrying a model of mug-shape around with you. Then a single image is enough, because it is not a measurement, it is a retrieval: the image picks out the 3D model you already hold, and it comes back as full 3D rather than a depth map — not a two-and-a-half-D sketch, not a point cloud. If that sounds like the ventral stream recognising an object rather than a surveyor measuring one, that is the right association to have. The system that does it is called SAM 3D: a team at Meta that he works with, it was at CVPR, and the weights are open and downloadable, so you could run it on a final project this term. The links are in the corner.",
  "(draft) And here is the good scientific question he asks about his own result. Photogrammetry is about a hundred and fifty years old. People have been recovering shape from photographs since the eighteen seventies. So why does this work in 2026 and not before? His answer is not about architectures. What was missing was paired data: images with the true 3D shape attached. Hold that next to everything else in this session — it is the same diagnosis as the data wall, one level down.",
  "(draft) So how do you manufacture that data? Stage one, pre-train on CAD models, because for a CAD model the ground truth 3D is free. Then people, and then computer graphics artists for the hard cases. And the trick is in how you ask the people. Humans are bad at reconstructing an object metrically — you cannot look at a mug and type in its shape. But show a person two reconstructions and they will reliably tell you which one is better. So the annotation task is a comparison, not a measurement. And his closing line is really a claim about representation: once you have reconstructed a million objects, every new object is like a combination of old objects. Which is the same sentence as the child at the sink. You are never starting from nothing."
]});
}

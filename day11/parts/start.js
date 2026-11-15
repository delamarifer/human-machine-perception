/* PART: start (Day 10, owner: Shreya). Rebuilt 2026-11-13 from Shreya's edited Google Slides, slides 1-5:
   new title; the NYC video; "Who is Refik Anadol?" (comment: "write this as just a few bullets");
   "What does he actually make?" (comment: "merge this with showing some of his different work. just include titles but not
   to much other text") = the video gallery plus her three images; "What does machine hallucination mean?" (comment: "post 2
   questions with answer that also animate", from her text). Images: day10/assets/, downloaded from her slides.
   The titles of her three installation images are not known yet: they show a visible "title to add" box. No speaker notes. */
{
section('Start');

st(`
  <div class="center" style="margin:auto">
    <div class="statement" style="font-weight:700;font-size:clamp(2rem,3.7vw,3.3rem)">What if a machine could dream?</div>
    <div class="label" style="margin-top:2.2vh">Day 11 · Exploring the intersection of artificial intelligence, creativity and human perception</div>
  </div>
`);

/* the hook. Machine Hallucination: NYC, 5 min 36 s on Vimeo; play about 2 minutes. */
st(`
  <h1 class="t">What would you need to build this?</h1>
  <div class="d10-col">
    ${d10Vimeo('450313024', 'Machine Hallucination: NYC (Refik Anadol Studio)', 'Machine Hallucination: NYC <small>Refik Anadol Studio, 2019</small>')}
  </div>
`);

/* A short intro to generative art (Shreya, 2026-11-15: "just the 2"). Definition after Galanter (2003): art made with a
   system that runs with some autonomy (rules, a program, a machine). Timeline examples checked 2026-11-15: Frieder Nake
   exhibited computer drawings in 1965; Harold Cohen's AARON first shown 1972-73; Anna Ridler, Myriad (Tulips), 2018,
   about 10,000 hand-labeled photos of tulips (V&A, Wikipedia). LeWitt and Processing dated by decade only. */
/* What is generative art? as a diagram: Artist -> System -> Work, one box per click. The Work box holds a small canvas that
   draws a new random pattern every time it appears (lib.js, d10DrawGen): same rules, different result. */
st(`
  <h1 class="t">What is generative art?</h1>
  <div class="d10-col">
    <div class="d10-genflow">
      <div class="d10-gbox b" data-step="1"><small>The artist</small><b>designs a system</b>
        <span class="d10-chips"><i>rules</i><i>randomness</i><i>limits</i><i>inputs</i></span></div>
      <div class="d10-garrow b" data-step="2">→</div>
      <div class="d10-gbox b" data-step="2"><small>The system</small><b>runs on its own</b>
        <span>with some autonomy</span></div>
      <div class="d10-garrow b" data-step="3">→</div>
      <div class="d10-gbox d10-gwork b" data-step="3"><small>The work</small><canvas class="d10-gen-canvas" width="480" height="300" aria-label="A pattern of short lines drawn by a simple program, different every time"></canvas>
        <span>the artist gives up some control</span></div>
    </div>
    <div class="d10-gnote b" data-step="4">The system can be <b>instructions</b>, a <b>machine</b>, <b>code</b> or a <b>trained model</b>: it does not need a computer.</div>
  </div>
  ${cite('After Philip Galanter, "What is Generative Art?" (2003)')}
`);

/* The timeline: each click shows that step's example large in the spotlight (replacing the one before) and adds its
   label to the row below; earlier labels fade. The last click replaces the spotlight with the takeaway line. */
const D10_GEN = [
  ['gen-lewitt.jpg', '', 'A Sol LeWitt wall drawing of large colored geometric shapes in a gallery', 'Sol LeWitt, <i>Wall Drawing 831 (Geometric Forms)</i>, Guggenheim Bilbao',
    '1960s', 'Written rules', 'instructions that other people carry out'],
  ['gen-molnar.jpg', 'd10-fit', 'A Vera Molnar plotter drawing of many small lines', 'Vera Molnar, <i>Interruptions à recouvrements</i>, 1969',
    '1960s–70s', 'Code', 'plotter drawings by Molnar and Nake; Cohen’s AARON drew on its own for decades'],
  ['gen-processing.jpg', 'd10-fit', 'A Processing window with a few lines of code and the moiré pattern it draws', 'A few lines of Processing code and the pattern they draw',
    '2000s', 'Creative coding', 'Processing (Reas and Fry) brings code to artists and designers'],
  ['gen-ridler.jpg', '', 'Anna Ridler, Mosaic Virus: a wall of many tulip images', 'Anna Ridler, <i>Mosaic Virus</i>, 2019: a GAN trained on her own 10,000 hand-labeled tulip photos',
    '2010s–now', 'Learned models', 'GANs, then diffusion: the artist trains the system on data'],
];
st(`
  <h1 class="t">A short history: what is the system made of?</h1>
  <div class="d10-col d10-hist">
    <div class="d10-stack d10-spot">
      ${D10_GEN.map(([img, fit, alt, cap], k) => `
        <figure class="d10-one b" data-step="${k + 1}"><img class="${fit}" src="assets/${img}" alt="${alt}"><figcaption>${cap}</figcaption></figure>`).join('')}
      <div class="d10-one d10-shift b" data-step="5">The artist’s work shifts:<br><b>drawing</b> → <b>writing rules</b> → <b>choosing data</b></div>
    </div>
    <div class="d10-time">
      ${D10_GEN.map(([, , , , when, what, how], k) => `
        <div class="b" data-step="${k + 1}"><small>${when}</small><b>${what}</b><span>${how}</span></div>`).join('')}
    </div>
  </div>
  ${cite('Photos: Zarateman (CC0) · Vera Molnar (CC0) · Jean-no (CC0) · art_inthecity (CC BY 2.0), via Wikimedia Commons')}
`);

st(`
  <h1 class="t">Who is Refik Anadol?</h1>
  <div class="d10-col">
    <div class="d10-who">
      <ul class="d10-list">
        <li class="b">Media artist and director</li>
        <li class="b">Works with data, machine learning and architecture</li>
        <li class="b">Explores nature, memory, human imagination and shared experience</li>
      </ul>
      <img class="d10-portrait b" data-step="1" src="assets/anadol-portrait.jpg" alt="Refik Anadol">
    </div>
  </div>
`);

/* three works, one per click, each a large embedded video replacing the one before (so it reads from the back of the room).
   Videos: the studio's own Vimeo uploads. Dates: Unsupervised opened at MoMA on 19 November 2022 (MoMA press release; the
   closing date differs between sources, so "2022-23"); Large Nature Model at NVIDIA GTC 2024 (the video's title);
   Echoes of the Earth at Serpentine North, 16 February to 7 April 2024 (Serpentine's listing). */
st(`
  <h1 class="t">What does he actually make?</h1>
  <div class="d10-col">
    <div class="d10-stack">
      <div class="d10-one b" data-step="1">${d10Vimeo('778348607', 'Unsupervised, MoMA (Refik Anadol Studio)', 'Unsupervised <small>MoMA, New York · 2022–23</small>', '1')}</div>
      <div class="d10-one b" data-step="2">${d10Vimeo('952896412', 'Large Nature Model: Rainforest (Refik Anadol Studio)', 'Large Nature Model: Rainforest <small>NVIDIA GTC · 2024</small>', '2')}</div>
      <div class="d10-one b" data-step="3">${d10Vimeo('952230679', 'Echoes of the Earth: Living Archive (Refik Anadol Studio)', 'Echoes of the Earth: Living Archive <small>Serpentine North, London · 2024</small>', '3')}</div>
    </div>
  </div>
`);

/* two questions, each answer on its own click (from Shreya's text, in simple English). Shreya (2026-11-13): add a text
   example of an LLM hallucination to contrast with the generative-art one. The chat is made up on purpose: there is no
   Nobel Prize in computer vision, and the person is invented. In the right column, the chat (click 2) is replaced by
   Anadol's images (click 4). */
st(`
  <h1 class="t">What does machine hallucination mean?</h1>
  <div class="d10-col">
    <div class="d10-hall">
      <div class="d10-qa">
        <div class="d10-qq b" data-step="1">In a chatbot (an LLM), what is a hallucination?</div>
        <div class="d10-qans b" data-step="3">An answer that sounds right, but is made up or wrong.</div>
        <div class="d10-qq b" data-step="4">What does Anadol mean by a <i>machine hallucination</i>?</div>
        <div class="d10-qans b" data-step="5">New images that a model imagines after learning patterns in data.
          The machine is not dreaming or feeling anything: it makes new combinations of what it learned.</div>
      </div>
      <div class="d10-stack">
        <div class="d10-one d10-chat b" data-step="2">
          <div class="d10-msg d10-user">Who won the Nobel Prize in Computer Vision in 2019?</div>
          <div class="d10-msg d10-bot">Dr. Lena Ortiz won it in 2019 for her work on 3D scene understanding.</div>
          <div class="d10-truth">There is no Nobel Prize in Computer Vision, and Dr. Ortiz is not real.</div>
        </div>
        <div class="d10-one d10-hall-imgs b" data-step="4">
          <img src="assets/hallucination-1.jpg" alt="">
          <img src="assets/hallucination-2.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
`);
}

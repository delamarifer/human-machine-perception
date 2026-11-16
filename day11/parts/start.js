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
    <div class="statement" style="font-weight:700;font-size:clamp(2.4rem,4.6vw,4.2rem)">Generative art</div>
    <div class="statement" style="font-size:clamp(1.5rem,2.6vw,2.4rem);margin-top:1.4vh">What if a machine could dream?</div>
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

/* Opening poll (Shreya, 2026-11-16): a quick Google Form, a 1-5 agree scale then one open question. Form:
   https://forms.gle/TPYtFArkZh8B6rgH8 (QR code made with segno). Results are shown live from the form's Responses tab. */
st(`
  <h1 class="t">Can AI be creative?</h1>
  <div class="d10-col">
    <div class="d10-poll">
      <div class="d10-poll-qs">
        <div class="d10-poll-claim b" data-step="1">“AI can be creative.”</div>
        <div class="d10-scale b" data-step="1">
          <div><b>1</b><span>Strongly disagree</span></div><div><b>2</b></div><div><b>3</b></div><div><b>4</b></div><div><b>5</b><span>Strongly agree</span></div>
        </div>
        <div class="d10-poll-why b" data-step="2">Why did you choose that number?</div>
      </div>
      <div class="d10-qr b" data-step="1"><img src="assets/creative-poll-qr.svg" alt="QR code for the poll form"><span>forms.gle/TPYtFArkZh8B6rgH8</span></div>
    </div>
  </div>
`);

/* After the poll results: the theory, to settle what the class just disagreed on. Standard definition: Runco and Jaeger,
   "The Standard Definition of Creativity", Creativity Research Journal 24(1), 2012 (tracing it to Stein 1953). Three kinds:
   Margaret Boden, The Creative Mind (1990). */
st(`
  <h1 class="t">What do we mean by creative?</h1>
  <div class="d10-col">
    <div class="d10-crea">
      <div class="d10-crea-def b" data-step="1"><small>A common definition</small><b>creative = <u>new</u> + <u>useful</u></b></div>
      <div class="d10-crea-kinds b" data-step="2">
        <small>Three kinds of creativity</small>
        <div><b>Combining</b><span>familiar ideas in a new way</span></div>
        <div><b>Exploring</b><span>a space of possibilities</span></div>
        <div><b>Transforming</b><span>the space itself, so new things become possible</span></div>
      </div>
      <div class="d10-gnote b" data-step="3">Which of these can AI do?</div>
    </div>
  </div>
  ${cite('Runco and Jaeger, "The Standard Definition of Creativity" (2012) · Margaret Boden, <i>The Creative Mind</i> (1990)')}
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
`, {notes: `(draft) Generative art is much older than AI, and even older than computers. The question for this slide is simple: what is the system made of? We will see four answers, from the 1960s to today. Each time, the artist still designs the system, but the system changes. As we go, ask yourself: where is the art? In the idea, in the system, or in the final object?
[click] (draft) We start in the 1960s with Sol LeWitt. This is Wall Drawing 831, Geometric Forms, at the Guggenheim in Bilbao. LeWitt did not paint this himself. He wrote instructions, and other people, often a team of assistants, drew it on the wall. The instructions can be carried out again in another museum, by other people, and the result will be a little different each time. LeWitt wrote that the idea becomes a machine that makes the art. So here the system is just written rules, and the people who follow them are the machine. No computer at all.
[click] (draft) In the 1960s and 70s, artists start to use real computers. This is Vera Molnar, Interruptions à recouvrements, from 1969. She wrote programs that place many short lines, then add small random changes and gaps, and a plotter, a machine that holds a pen, draws the result. At the same time, Frieder Nake showed computer drawings in Stuttgart in 1965. Harold Cohen, a painter, built a program called AARON in the early 1970s, which made drawings on its own, and he kept working on it for decades. Now the system is code: the artist writes the rules in a language the computer understands, and the computer carries them out. Randomness is part of the design.
[click] (draft) In the 2000s, Processing, made by Casey Reas and Ben Fry, made code much easier for artists and designers. It is free, and it is made for drawing. On the left you see six lines of Processing code: they draw two sets of circles, one around each of two centers. On the right is the result. Where the circles overlap, a new pattern appears that nobody drew directly. This is called creative coding: a very small rule can give a rich image. The pattern on our previous slide works the same way, with some randomness added, so it is new every time.[click] (draft) Today, the system can be a model that learns from data. This is Anna Ridler, Mosaic Virus, from 2019. She took about 10,000 photos of tulips herself and labeled each one by hand. Then she trained a GAN, a kind of generative model, on those photos, and it makes new tulips that never existed. Notice where her work went: not into drawing tulips, and not into writing rules for tulips, but into making and labeling the dataset. After GANs came diffusion models, which power most of today's image generators. This is the world Refik Anadol works in.
[click] (draft) So the artist's work keeps shifting: from drawing, to writing rules, to choosing data. In all four cases, the artist designs a system and gives up some control. What changes is what they design. Keep this in mind when we look at Anadol: a lot of his art is in the data he chooses, how he cleans it, and how he shows the result. That is exactly the pipeline we will reverse-engineer today.`});

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

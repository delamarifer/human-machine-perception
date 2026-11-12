/* Day 9 helpers (owner: Shreya). Class names carry the d8l- prefix. */
(() => {
  const el = document.createElement('style'); el.id = 'd8l-style';
  el.textContent = `
  .d8l-col{ display:flex; flex-direction:column; gap:2.6vh; flex:1 1 auto; min-height:0; justify-content:center; }
  .d8l-q{ font-size:clamp(1.69rem, 3.62vw, 3.25rem); font-weight:600; line-height:1.3; text-align:center; max-width:30em; margin:0 auto; }
  .d8l-more{ display:flex; flex-direction:column; gap:1.6vh; max-width:44em; margin:0 auto; padding:0; list-style:none; }
  .d8l-more > li{ font-size:clamp(1.25rem, 2.31vw, 2.06rem); line-height:1.35; color:var(--mute); padding-left:1.1em; position:relative; }
  .d8l-more > li::before{ content:'→'; position:absolute; left:0; }
  .d8l-cards{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:1.6vw; align-items:stretch; }
  .d8l-card{ border:2px solid var(--ink); border-radius:12px; padding:2vh 1.2vw; display:flex; flex-direction:column; gap:1.1vh; min-width:0; }
  .d8l-card small{ font-size:clamp(0.94rem, 1.31vw, 1.25rem); text-transform:uppercase; letter-spacing:.08em; color:var(--mute); }
  .d8l-card b{ font-size:clamp(1.31rem, 2.31vw, 2.12rem); line-height:1.2; }
  .d8l-card span{ font-size:clamp(1.06rem, 1.62vw, 1.5rem); line-height:1.35; }
  .d8l-card a{ color:inherit; font-size:clamp(1.06rem, 1.56vw, 1.44rem); margin-top:auto; }
  .d8l-list{ margin:0 auto; padding-left:1.4em; display:flex; flex-direction:column; gap:2vh; max-width:42em; }
  .d8l-list > li{ font-size:clamp(1.31rem, 2.5vw, 2.25rem); line-height:1.3; }
  .d8l-list a{ color:inherit; }
  .d8l-list .d8l-sub{ display:block; font-size:.72em; color:var(--mute); margin-top:.3vh; }
  .d8l-agenda{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:1.6vw; }
  .d8l-agenda > div{ border-top:6px solid var(--ink); padding-top:1.6vh; }
  .d8l-agenda b{ display:block; font-size:clamp(2rem, 4.4vw, 4rem); line-height:1; }
  .d8l-agenda span{ font-size:clamp(1.25rem, 2.38vw, 2.12rem); }
  .d8l-theories{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:1.6vh 1.6vw; }
  .d8l-theories .d8l-card{ padding:1.4vh 1.2vw; gap:.6vh; }
  .d8l-theories .d8l-card small{ text-transform:none; letter-spacing:0; }
  .d8l-card .d8l-for{ font-style:italic; }
  .d8l-theories .d8l-card span a{ font-size:inherit; margin:0; }
  .d8l-ex-card{ flex-direction:row !important; align-items:center; justify-content:space-between; gap:1vw !important; }
  .d8l-ex-card > div{ display:flex; flex-direction:column; gap:.6vh; min-width:0; }
  .d8l-ex-img{ height:20vh; width:auto; border-radius:6px; flex:none; }
  .d8l-vote{ text-align:center; font-size:clamp(1.25rem, 2.25vw, 2rem); color:var(--mute); }
  .d8l-claims{ margin:0 auto; padding:0; list-style:none; display:flex; flex-direction:column; gap:1.8vh; max-width:66em; width:100%; }
  .d8l-claims > li{ font-size:clamp(1.31rem, 2.44vw, 2.19rem); line-height:1.3; }
  .d8l-claims em{ display:inline; margin-left:.5em; font-style:normal; font-weight:700; font-size:.8em; white-space:nowrap; }
  .d8l-claims em::before{ content:'→ '; }
  .d8l-tasks{ max-width:52em; }
  .d8l-tasks > li{ font-size:clamp(1.19rem, 2vw, 1.81rem); }
  .d8l-form{ display:flex; align-items:center; justify-content:center; gap:4vw; }
  .d8l-form img{ height:30vh; width:auto; flex:0 0 auto; }
  .d8l-svg{ width:100%; height:auto; max-height:58vh; flex:0 1 auto; min-height:44vh; overflow:visible; }
  .d8l-svg ~ .d8l-q{ font-size:clamp(1.35rem, 2.6vw, 2.35rem); max-width:none; }   /* keep the drawings large on the Turing and Chinese room slides */
  .d8l-svg ~ .d8l-vote{ font-size:clamp(1.15rem, 2vw, 1.8rem); }
  .d8l-svg .d8l-ln{ fill:none; stroke:var(--ink); stroke-width:3; }
  .d8l-svg .d8l-wall{ stroke:var(--ink); stroke-width:10; stroke-dasharray:2 14; stroke-linecap:round; }
  .d8l-svg .d8l-wall2{ fill:#f1f5f9; stroke:var(--ink); stroke-width:5; }
  .d8l-svg .d8l-slot{ stroke:#fff; stroke-width:8; }
  .d8l-svg .d8l-bub{ fill:#fff; stroke:var(--ink); stroke-width:2.5; }
  .d8l-svg .d8l-book{ fill:#fff; stroke:var(--ink); stroke-width:3; }
  .d8l-svg .d8l-tag{ fill:var(--ink); }
  .d8l-svg text{ fill:var(--ink); font-family:var(--font); }
  .d8l-svg .d8l-t{ font-size:24px; font-weight:600; }
  .d8l-svg .d8l-bt{ font-size:18px; font-weight:600; }
  .d8l-svg .d8l-s{ font-size:20px; fill:var(--mute); }
  .d8l-svg .d8l-inv{ fill:#fff; font-weight:700; }
  .d8l-svg .d8l-q2{ font-size:26px; font-weight:700; }
  .d8l-svg .d8l-zh{ font-size:28px; font-weight:600; }
  .d8l-svg .d8l-c{ text-anchor:middle; }
  /* messages slide across the wall: right when sent to the players, left when they answer */
  .d8l-svg .b.d8l-fly-r{ transform:translateX(-60px); transition:opacity .5s ease, transform 1.1s ease; }
  .d8l-svg .b.d8l-fly-l{ transform:translateX(60px); transition:opacity .5s ease, transform 1.1s ease; }
  .d8l-svg .b.shown{ transform:none; }
  /* Turing test and Chinese room drawings */
  .d8l-svg .d8l-big{ font-size:76px; font-weight:700; fill:var(--mute); }
  .d8l-svg .d8l-dash{ fill:none; stroke:var(--ink); stroke-width:3; stroke-dasharray:10 8; }
  .d8l-svg .d8l-laptop{ fill:#fff; stroke:var(--ink); stroke-width:3; }
  .d8l-svg .d8l-tokbox{ fill:#fff; stroke:var(--ink); stroke-width:3; }
  .d8l-svg .d8l-dot{ fill:var(--ink); }
  .d8l-svg .d8l-unknown{ transition:opacity .4s ease; }
  .d8l-svg:has(.d8l-reveal.shown) .d8l-unknown{ opacity:0; }
  .d8l-svg .d8l-reveal .d8l-ln, .d8l-svg .d8l-reveal path, .d8l-svg .d8l-reveal circle{ fill:#fff; }
  .d8l-svg .d8l-back{ fill:#f8fafc; stroke:var(--ink); stroke-width:3; }
  .d8l-svg .d8l-wallp{ fill:#e2e8f0; stroke:var(--ink); stroke-width:3; }
  .d8l-svg .d8l-floor{ fill:#cbd5e1; stroke:var(--ink); stroke-width:3; }
  .d8l-svg .d8l-sign, .d8l-svg .d8l-notep, .d8l-svg .d8l-bookp{ fill:#fff; stroke:var(--ink); stroke-width:2.5; }
  .d8l-svg .d8l-slotp{ fill:var(--ink); }
  .d8l-svg .d8l-ink{ fill:var(--ink); font-weight:700; }
  .d8l-svg .d8l-tile{ font-size:22px; font-weight:600; }
  .d8l-room .d8l-zh{ font-size:22px; }
  .d8l-svg .d8l-rule{ font-size:17px; font-weight:600; }
  .d8l-room:has(.shown > .d8l-note-out) .d8l-note-in{ animation:none; opacity:0; }   /* the question is used up once the reply goes out */
  .d8l-svg [class*="d8l-up-"], .d8l-svg [class*="d8l-down-"], .d8l-svg .d8l-note-in, .d8l-svg .d8l-note-out{ opacity:0; }
  /* one click, one trip: questions go up from the judge, answers come back down */
  .shown > .d8l-up-a{ animation:d8l-up-a 1.8s ease-in-out forwards; }
  .shown > .d8l-up-b{ animation:d8l-up-b 1.8s ease-in-out forwards; }
  .shown > .d8l-down-a{ animation:d8l-down-a 1.8s ease-in-out forwards; }
  .shown > .d8l-down-b{ animation:d8l-down-b 1.8s ease-in-out forwards; }
  @keyframes d8l-up-a{ 0%{ opacity:1; transform:translate(470px,296px); } 25%{ transform:translate(470px,240px); } 75%{ transform:translate(230px,240px); } 95%{ opacity:1; transform:translate(230px,185px); } 100%{ opacity:0; transform:translate(230px,185px); } }
  @keyframes d8l-up-b{ 0%{ opacity:1; transform:translate(530px,296px); } 25%{ transform:translate(530px,240px); } 75%{ transform:translate(770px,240px); } 95%{ opacity:1; transform:translate(770px,185px); } 100%{ opacity:0; transform:translate(770px,185px); } }
  @keyframes d8l-down-a{ 0%{ opacity:1; transform:translate(230px,185px); } 25%{ transform:translate(230px,240px); } 75%{ transform:translate(470px,240px); } 95%{ opacity:1; transform:translate(470px,296px); } 100%{ opacity:0; transform:translate(470px,296px); } }
  @keyframes d8l-down-b{ 0%{ opacity:1; transform:translate(770px,185px); } 25%{ transform:translate(770px,240px); } 75%{ transform:translate(530px,240px); } 95%{ opacity:1; transform:translate(530px,296px); } 100%{ opacity:0; transform:translate(530px,296px); } }
  /* the note goes in through the IN slot to the person; the reply goes out through the OUT slot */
  .shown > .d8l-note-in{ animation:d8l-note-in 2.2s ease-in-out forwards; }
  .shown > .d8l-note-out{ animation:d8l-note-out 2.2s ease-in-out forwards; }
  @keyframes d8l-note-in{ 0%{ opacity:1; transform:translate(120px,218px); } 40%{ transform:translate(270px,200px); } 100%{ opacity:1; transform:translate(440px,200px); } }
  @keyframes d8l-note-out{ 0%{ opacity:1; transform:translate(560px,200px); } 60%{ transform:translate(730px,200px); } 100%{ opacity:1; transform:translate(880px,218px); } }
  /* the four theory slides: question as title, a hands-up line, an animated example, then the theory */
  h1.t:has(+ .d8l-th){ font-size:clamp(1.6rem, 3vw, 2.6rem); line-height:1.15; }
  .d8l-th{ gap:1.4vh; }
  .d8l-hands{ text-align:center; color:var(--mute); font-size:clamp(1.1rem, 1.8vw, 1.6rem); }
  .d8l-svg.d8l-th-svg{ max-height:47vh; min-height:36vh; }
  .d8l-th-svg .d8l-s{ font-size:27px; }
  .d8l-th-svg .d8l-bt{ font-size:26px; }
  .d8l-th-svg .d8l-t{ font-size:30px; }
  .d8l-th-svg .d8l-q2{ font-size:36px; }
  .d8l-stage{ display:grid; justify-items:center; align-items:center; }
  .d8l-stage > *{ grid-area:1 / 1; }
  .d8l-video{ display:flex; flex-direction:column; align-items:center; gap:.8vh; }
  .d8l-video iframe{ height:43vh; aspect-ratio:16 / 9; border:0; border-radius:10px; background:#000; }
  .d8l-video:not(.shown), .d8l-stage:has(.d8l-gor-reveal.shown) .d8l-video{ opacity:0; pointer-events:none; }
  .d8l-theory{ border:2px solid var(--ink); border-radius:12px; padding:1.1vh 1.4vw; display:flex; flex-wrap:wrap; align-items:baseline; gap:.4vh 1.2vw; font-size:clamp(1.05rem, 1.8vw, 1.6rem); line-height:1.3; }
  .d8l-theory a{ color:inherit; }
  .d8l-theory > a{ margin-left:auto; font-size:.85em; }
  .d8l-svg .d8l-ring{ fill:none; stroke:var(--ink); stroke-width:3; stroke-dasharray:8 6; }
  .d8l-svg .d8l-arrow{ fill:none; stroke:var(--ink); stroke-width:3; stroke-linecap:round; }
  .d8l-svg .d8l-bg, .d8l-svg .d8l-halo{ paint-order:stroke; stroke:#fff; stroke-width:10px; stroke-linejoin:round; }
  .d8l-svg:has(.d8l-bg.shown) .d8l-ask, .d8l-svg:has(.d8l-cut.shown) .d8l-ask, .d8l-gw:has(.d8l-gor-reveal.shown) .d8l-ask{ opacity:0; }
  .d8l-pp:has(.d8l-rab.shown) .d8l-duck{ opacity:0; }
  .d8l-svg .d8l-court{ fill:#f8fafc; stroke:var(--ink); stroke-width:2; }
  .d8l-svg .d8l-pw{ fill:#fff; stroke:var(--ink); stroke-width:3; }
  .d8l-svg .d8l-pb{ fill:var(--ink); }
  .d8l-svg .d8l-ball{ fill:#fff; stroke:var(--ink); stroke-width:3; }
  .d8l-svg .d8l-gor-fig circle, .d8l-svg .d8l-gor-fig ellipse{ fill:var(--ink); }
  .d8l-svg .d8l-arm{ fill:none; stroke:var(--ink); stroke-width:16; stroke-linecap:round; }
  .d8l-svg .d8l-veil{ fill:#fff; opacity:.75; }
  .d8l-svg .d8l-gor-walk{ opacity:0; }
  .shown > .d8l-ball-w{ animation:d8l-pass-w 3.6s ease-in-out infinite; }
  .shown > .d8l-ball-b{ animation:d8l-pass-b 3.2s ease-in-out infinite; }
  .shown > .d8l-gor-walk{ animation:d8l-walk 9s linear 4s both; }
  .d8l-gw:has(.d8l-gor-reveal.shown) .d8l-ball{ animation-play-state:paused; }
  .d8l-gw:has(.d8l-gor-reveal.shown) .d8l-gor-walk{ animation:none; opacity:0; }
  @keyframes d8l-pass-w{ 0%,8%{ transform:translate(300px,140px); } 30%,41%{ transform:translate(520px,320px); } 63%,74%{ transform:translate(730px,130px); } 97%,100%{ transform:translate(300px,140px); } }
  @keyframes d8l-pass-b{ 0%,8%{ transform:translate(420px,100px); } 30%,41%{ transform:translate(660px,290px); } 63%,74%{ transform:translate(260px,310px); } 97%,100%{ transform:translate(420px,100px); } }
  @keyframes d8l-walk{ 0%{ opacity:0; transform:translate(900px,225px); } 4%{ opacity:1; } 42%,58%{ transform:translate(520px,225px); } 96%{ opacity:1; } 100%{ opacity:0; transform:translate(140px,225px); } }
  .d8l-svg .d8l-hemi{ fill:#f1f5f9; stroke:var(--ink); stroke-width:3; }
  .d8l-svg .d8l-bridge{ fill:#cbd5e1; stroke:var(--ink); stroke-width:3; }
  .d8l-svg .d8l-gap{ fill:#fff; }
  .d8l-svg .d8l-key{ fill:none; stroke:var(--ink); stroke-width:5; stroke-linecap:round; }
  .shown > .d8l-flash{ animation:d8l-flash 2.4s ease forwards; }
  @keyframes d8l-flash{ 0%,55%{ opacity:1; } 100%{ opacity:.2; } }
  .d8l-svg .d8l-hand rect{ fill:#fff; stroke:var(--ink); stroke-width:3; }
  .d8l-svg .d8l-rubber rect{ fill:#e2e8f0; }
  .d8l-svg .d8l-screen{ fill:var(--ink); }
  .d8l-svg .d8l-cloth{ fill:#cbd5e1; stroke:var(--ink); stroke-width:2; }
  .d8l-svg .d8l-bristle{ fill:var(--ink); }
  .d8l-svg .d8l-handle{ stroke:var(--ink); stroke-width:7; stroke-linecap:round; }
  .shown > .d8l-brush{ animation:d8l-brush 1.4s ease-in-out infinite; }
  .d8l-rh:has(.d8l-threat.shown) .d8l-brush{ animation-play-state:paused; }
  @keyframes d8l-brush{ 0%,100%{ transform:translate(0,150px); } 50%{ transform:translate(0,232px); } }
  .d8l-svg .d8l-hammer rect{ fill:var(--ink); }
  .d8l-svg .d8l-hammer path{ stroke:var(--ink); stroke-width:9; stroke-linecap:round; }
  .shown > .d8l-hammer{ animation:d8l-hammer 1.2s ease-in forwards; }
  .shown > .d8l-flinch{ animation:d8l-flinch 1.2s forwards; }
  @keyframes d8l-hammer{ 0%{ transform:translate(0,0); } 70%,100%{ transform:translate(0,70px); } }
  @keyframes d8l-flinch{ 0%,65%{ opacity:0; } 75%,100%{ opacity:1; } }
  .d8l-quote{ font-size:clamp(1.62rem, 3.25vw, 2.88rem); font-style:italic; text-align:center; }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){
    .d8l-form{ flex-direction:column; }
    .d8l-cards, .d8l-agenda, .d8l-theories{ grid-template-columns:1fr; gap:1.4vh; }
  }
`;
  document.head.appendChild(el);
})();

/* Embedded videos (the gorilla slide): when the video is hidden again, reload it so it stops playing. */
(function(){
  const sync = () => document.querySelectorAll('.d8l-stage').forEach(st => {
    const v = st.querySelector('.d8l-video'), f = v && v.querySelector('iframe');
    if (!f) return;
    const on = v.classList.contains('shown') && !st.querySelector('.d8l-gor-reveal.shown');
    if (on) f.dataset.live = '1';
    else if (f.dataset.live) { delete f.dataset.live; f.src = f.src; }
  });
  new MutationObserver(sync).observe(document.documentElement, { subtree:true, attributes:true, attributeFilter:['class'] });
})();

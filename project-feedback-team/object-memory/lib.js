/* Deep dive helpers, copied from day07-part2/lib.js (only the parts this deck uses). Loaded by deck.html before the parts. */
(() => {
  const el = document.createElement('style'); el.id = 'dd-style';
  el.textContent = `
  .stage{ padding:7.2vh 5.2vw 9.5vh; gap:1.5vh; }
  .stage > .cite{ position:static; margin-top:auto; padding-top:.8vh; font-size:clamp(.8rem, 1.12vw, 1.15rem); color:var(--mute); }
  .stage > .cite a{ color:var(--mute); }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){
    .stage{ padding:6vh 4vw 6.5vh; gap:1vh; }
    .stage h1.t{ font-size:clamp(1.18rem, 4vw, 1.7rem); }
    .stage .statement{ font-size:clamp(1rem, 3.2vw, 1.4rem); }
    .stage .lead, .stage ul.frag li{ font-size:clamp(.9rem, 2.6vw, 1.2rem); line-height:1.26; }
    .stage .label{ font-size:clamp(.76rem, 2.2vw, 1rem); line-height:1.25; }
  }
`;
  document.head.appendChild(el);
})();
/* A citation that arrives with the content, so the slide still opens on its title alone. */
window.rdCite = (t, step = 1) => `<div class="cite b" data-step="${step}">${t}</div>`;

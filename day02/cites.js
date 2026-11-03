/* Day 2: every citation line (.cite) collapses into "Expand for citations and resources" (Fernanda, 2026-11-02).
   Click the line to open or close the full references; the click never advances the deck. Loaded by
   day02/deck.html and by Day 2 scenes. Day 1 and the shared engine are untouched. */
function collapseCites(root){
  if(!document.getElementById('cites-style')){
    const st = document.createElement('style'); st.id = 'cites-style';
    st.textContent = `
      .cite details{ max-width:80vw; }
      .cite summary{ cursor:pointer; list-style:none; color:var(--mute, #64748b); font-size:clamp(.85rem, 1.05vw, 1.05rem); }
      .cite summary::-webkit-details-marker{ display:none; }
      .cite summary::before{ content:'＋ '; }
      .cite details[open] summary::before{ content:'− '; }
      .cite details > div{ margin-top:.6vh; background:#fff; border:1px solid var(--line, #e2e8f0); border-radius:10px;
        padding:1vh 1vw; box-shadow:0 4px 18px rgba(15,23,42,.08); }`;
    document.head.appendChild(st);
  }
  (root || document).querySelectorAll('.cite').forEach(c => {
    if(c.querySelector('details')) return;
    c.innerHTML = `<details><summary>Expand for citations and resources</summary><div>${c.innerHTML}</div></details>`;
    const d = c.querySelector('details');
    ['click', 'mousedown', 'pointerdown'].forEach(ev => d.addEventListener(ev, e => e.stopPropagation()));
  });
}

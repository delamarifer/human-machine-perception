/* Scene controller shared by the Object Recognition scenes.
   orScene(name, notes, render): notes has one passage per beat (beat 0 = title alone).
   Elements with data-from="k" appear at beat k; data-to="m" removes them after beat m. */
function orScene(name, notes, render){
  const N = notes.length - 1; let beat = 0;
  function go(b){
    beat = b;
    document.querySelectorAll('[data-from]').forEach(e => {
      const from = +e.dataset.from, to = e.dataset.to != null ? +e.dataset.to : Infinity;
      e.classList.toggle('on', b >= from && b <= to);
      e.classList.toggle('gone', b > to || (e.dataset.to != null && b < from));
    });
    render(b);
  }
  window[name] = {
    advance(){ if(beat < N) go(beat + 1); }, back(){ if(beat > 0) go(beat - 1); },
    atStart: () => beat === 0, atEnd: () => beat === N,
    reset(){ go(0); }, resetToEnd(){ go(N); }, getBeat: () => beat, notes
  };
  if(window.parent === window){
    addEventListener('keydown', e => {
      if(['ArrowRight', ' ', 'Enter'].includes(e.key)) window[name].advance();
      if(e.key === 'ArrowLeft') window[name].back();
    });
    addEventListener('click', () => window[name].advance());
  }
  go(0);
}

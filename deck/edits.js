/* Script edits made in the presenter view (E), shared by presenter.html and script.html.

   Edits live in this browser's localStorage only, keyed by deck, slide label and click, and they
   remember the ORIGINAL passage they replaced. An edit is applied only while that original is
   still the passage on that click; if the slide's notes change underneath it (someone edited the
   part), the edit is listed as "outdated" instead of landing on the wrong click.

   Edits never change the part files. Click "Copy my edits" and paste the list to the session that
   owns the slides (or the coordinator), which folds them into the parts' notes. */
const Edits = (() => {
  const KEY = deck => 'talk-edits:' + deck;
  const load = deck => { try{ return JSON.parse(localStorage.getItem(KEY(deck)) || '{}'); }catch(e){ return {}; } };
  const save = (deck, all) => { try{ localStorage.setItem(KEY(deck), JSON.stringify(all)); }catch(e){} };
  const id = (label, k) => label + '|' + k;
  const plain = html => { const d = document.createElement('div'); d.innerHTML = html || ''; return d.textContent.trim(); };
  return {
    /* the passage to show: the edit if it still matches, else the original */
    apply(deck, label, k, original){
      const e = load(deck)[id(label, k)];
      if(e && e.original === plain(original)) return {text: e.text, edited: true};
      return {text: original, edited: false, outdated: !!e};
    },
    set(deck, label, k, original, text, title){
      const all = load(deck), o = plain(original);
      if(text.trim() === o) delete all[id(label, k)];
      else all[id(label, k)] = {label, k, title, original: o, text: text.trim(), at: new Date().toISOString()};
      save(deck, all);
    },
    clear(deck, label, k){ const all = load(deck); delete all[id(label, k)]; save(deck, all); },
    count: deck => Object.keys(load(deck)).length,
    /* a list to paste to Claude: one block per edited click */
    report(deck){
      const all = Object.values(load(deck)).sort((a, b) => (parseFloat(a.label) - parseFloat(b.label)) || a.label.localeCompare(b.label) || a.k - b.k);
      if(!all.length) return 'No edits.';
      return `Script edits from the presenter view (${deck}). Apply each NOW to the notes passage for that click, word for word:\n\n` +
        all.map(e => `Slide ${e.label} · ${e.k === 0 ? 'title' : 'click ' + e.k} · ${e.title || ''}\nWAS: ${e.original || '(empty)'}\nNOW: ${e.text || '(say nothing on this click)'}`).join('\n\n');
    },
    plain
  };
})();

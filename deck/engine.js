/* ================================================================
   Animated talk engine (template).

   A deck is a list of slides built by "part" files (parts/<name>.js),
   loaded in the order given in deck/order.js. Each part is owned by
   one chat/person, so many people (or Claude sessions) can build the
   talk in parallel without touching each other's files.

   Authoring API (globals, call them from a part file):
     section(name)                    start a section (shown in the progress bar)
     st(html, opts)                   static slide; elements with class "b" build in on click
     sc(name, src, opts)              iframe scene; the page at src exposes
                                        window[name] = {advance, back, atStart, atEnd,
                                                        reset, resetToEnd, getBeat}
     cite(text)                       citation line, bottom-left
     fig(src, caption)                a figure, letterboxed
     rfig(src, aspect, marks, cap)    figure with reveal marks in normalized image coords:
                                        marks = [{r:[x,y,w,h], k:'cov'|'ring'|'dim', step}]
                                        cov = white cover that fades away, ring = pulsing
                                        outline, dim = wash that fades in

   opts: {notes, blank, sub}
     notes   speaker script. Split it with [click]: passage 0 is said when the slide
             appears (the title), passage k after click k. One passage per click.
             (An array of strings works too.)
     blank   false = no white lead-in before this slide (use for a slide that
             continues the previous one)
     sub     true = share the previous slide's number (3A, 3B); false = force a new one

   Builds: each click reveals the next .b element in DOM order. Give elements
   data-step="k" to reveal several at once or out of order.

   Keys: → / space / enter next · ← back · PageUp/PageDown jump slides ·
         Home/End · n notes panel · p presenter window · f fullscreen
   URL:  #12 lands on slide 12 fully built · ?only=part1,part2 previews parts ·
         ?blank=0 turns off the white lead-ins
   ================================================================ */

const $ = s => document.querySelector(s);
const S = [];
let CUR_SEC = '';

function section(name){ CUR_SEC = name; }
function st(html, o = {}){ S.push({kind: 'static', sec: CUR_SEC, html, ...o}); }
function sc(name, src, o = {}){ S.push({kind: 'scene', sec: CUR_SEC, name, src, ...o}); }

const cite = t => `<div class="cite">${t}</div>`;
const fig = (src, cap = '') => `
  <figure class="fig"><div class="well"><img src="${src}" alt=""></div>
  ${cap ? `<figcaption class="label">${cap}</figcaption>` : ''}</figure>`;
const rfig = (src, ar, marks = [], cap = '') => `
  <figure class="fig"><div class="well rwell"><div class="fw" data-ar="${ar}">
    <img src="${src}" alt="">
    ${marks.map(m => { const [x, y, w, h] = m.r;
      return `<div class="${m.k || 'cov'} b" ${m.step != null ? `data-step="${m.step}"` : ''}
        style="left:${x*100}%;top:${y*100}%;width:${w*100}%;height:${h*100}%"></div>`; }).join('')}
  </div></div>${cap ? `<figcaption class="label">${cap}</figcaption>` : ''}</figure>`;

/* notes → one passage per click */
const splitNotes = n => (Array.isArray(n) ? n : String(n || '').split(/\[click\]/i)).map(t => String(t).trim());

/* ================= runtime ================= */
function startDeck(cfg = {}){
  const P = new URLSearchParams(location.search);
  const MIRROR = P.get('mirror') === '1';            // the presenter's live preview
  const AT = parseInt(P.get('at'), 10);             // a thumbnail: slide AT, fully built, frozen
  const LEAD = cfg.leadIn !== false && P.get('blank') !== '0' && !MIRROR;
  const root = $('#root'), els = [], frames = {};
  let cur = 0, blank = false, notesOn = false;

  S.forEach(s => {
    const d = document.createElement('div'); d.className = 'slide';
    if(s.kind === 'static') d.innerHTML = `<div class="stage">${s.html}</div>`;
    root.appendChild(d); els.push(d);
  });
  const host = document.createElement('div'); host.className = 'scenehost'; root.appendChild(host);

  function frameFor(s){
    if(!frames[s.src]){
      const f = document.createElement('iframe');
      f.src = s.src + (s.src.includes('?') ? '&' : '?') + 'cb=' + Date.now();   // never a stale scene
      f.addEventListener('load', () => { try{
        f.contentWindow.addEventListener('keydown', onKey, true);
        if(!MIRROR) f.contentWindow.addEventListener('click', () => fwd());   // a click on a scene advances it
      }catch(e){} });
      frames[s.src] = f; host.appendChild(f);
    }
    return frames[s.src];
  }
  if(!Number.isFinite(AT)) S.forEach(s => { if(s.kind === 'scene') frameFor(s); });   // preload scenes (not in thumbnails)
  const ctrl = s => { try{ return frameFor(s).contentWindow[s.name] || null; }catch(e){ return null; } };

  /* ---- builds ---- */
  function groups(i = cur){
    const bs = [...els[i].querySelectorAll('.b')];
    if(!bs.some(b => b.dataset.step != null)) return bs.map(b => [b]);
    const m = new Map();
    bs.forEach(b => { const k = b.dataset.step != null ? +b.dataset.step : 999; if(!m.has(k)) m.set(k, []); m.get(k).push(b); });
    return [...m.keys()].sort((a, b) => a - b).map(k => m.get(k));
  }
  function beat(){
    const s = S[cur];
    if(s.kind === 'scene'){ const c = ctrl(s); try{ return c && c.getBeat ? c.getBeat() : 0; }catch(e){ return 0; } }
    return groups().filter(g => g.every(b => b.classList.contains('shown'))).length;
  }
  function fitFigures(){
    els[cur].querySelectorAll('.fw').forEach(fw => {
      const W = fw.parentNode.clientWidth, H = fw.parentNode.clientHeight, ar = +fw.dataset.ar;
      if(!W || !H) return;
      let w = W, h = W / ar; if(h > H){ h = H; w = H * ar; }
      fw.style.width = w + 'px'; fw.style.height = h + 'px';
    });
  }
  addEventListener('resize', fitFigures);

  /* ---- slide numbers: whole numbers; slides that continue one thing get letters (3A, 3B) ---- */
  const key = s => s.kind === 'scene' ? 'sc:' + s.src.split('?')[0]
    : ((s.html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '').replace(/<[^>]+>/g, '').trim() || null;
  const NUM = [], SUB = [];
  S.forEach((s, i) => {
    const p = S[i-1], join = i > 0 && (s.sub === true || (s.sub !== false && key(s) && key(s) === key(p) && s.sec === p.sec));
    NUM[i] = join ? NUM[i-1] : (i ? NUM[i-1] + 1 : 1); SUB[i] = join ? SUB[i-1] + 1 : 0;
  });
  const LABEL = S.map((s, i) => NUM[i] + ((SUB[i] || NUM[i+1] === NUM[i]) ? String.fromCharCode(65 + SUB[i]) : ''));
  const titleOf = i => { const s = S[i]; if(s.title) return s.title;
    if(s.kind === 'static'){ const k = key(s); return k || ''; }
    try{ const t = frameFor(s).contentDocument.querySelector('h1, .deck-title'); return t ? t.textContent.trim() : s.name; }catch(e){ return s.name; } };

  /* ---- white lead-in: a blank screen before each new slide, so the speaker can talk into it ---- */
  const leadIn = i => LEAD && i > 0 && S[i].blank !== false && SUB[i] === 0;
  const setBlank = v => { blank = v; document.body.classList.toggle('preblank', v); };

  /* ---- section progress bar ---- */
  const SECS = [...new Set(S.map(s => s.sec))].filter(x => x && !/^(Title|Backup)/i.test(x));
  $('#secbar').innerHTML = SECS.map(x => `<span>${x}</span>`).join('');
  if(cfg.minutes) [...$('#secbar').children].forEach((el, k) => { const m = cfg.minutes[SECS[k]]; if(m) el.style.flexGrow = m; });

  function show(i, dir){
    cur = Math.max(0, Math.min(S.length - 1, i));
    const s = S[cur];
    els.forEach((d, j) => d.classList.toggle('active', j === cur));
    Object.values(frames).forEach(f => f.classList.remove('shown'));
    if(s.kind === 'scene'){
      const f = frameFor(s), c = ctrl(s); f.classList.add('shown');
      if(c){ dir < 0 ? c.resetToEnd() : c.reset(); }
      setTimeout(() => { try{ f.contentWindow.focus(); }catch(e){} }, 30);
    } else {
      groups().flat().forEach(b => b.classList.toggle('shown', dir < 0));
      window.focus(); requestAnimationFrame(fitFigures);
    }
    const ci = SECS.indexOf(s.sec);
    [...$('#secbar').children].forEach((el, k) => { el.classList.toggle('active', k === ci); el.classList.toggle('done', k < ci); });
    $('#secbar').style.visibility = ci < 0 ? 'hidden' : 'visible';
    if(ci >= 0){ const idx = S.map((x, j) => j).filter(j => S[j].sec === s.sec);
      $('#secbar').children[ci].style.setProperty('--p', ((idx.indexOf(cur) + 1) / idx.length).toFixed(3)); }
    $('#hud').textContent = `${LABEL[cur]} / ${NUM[S.length-1]}`;
    setBlank(dir > 0 && leadIn(cur));
    renderNotes(); broadcast();
    if(!MIRROR) try{ history.replaceState(null, '', location.pathname + location.search + '#' + (cur + 1)); }catch(e){}
  }

  function fwd(){
    if(blank){ setBlank(false); return after(); }
    const s = S[cur];
    if(s.kind === 'scene'){ const c = ctrl(s); if(c && !c.atEnd()){ c.advance(); return after(); } }
    else { const g = groups().find(g => g.some(b => !b.classList.contains('shown')));
      if(g){ g.forEach(b => b.classList.add('shown')); return after(); } }
    if(cur < S.length - 1) show(cur + 1, +1);
  }
  function bwd(){
    const s = S[cur];
    if(s.kind === 'scene'){ const c = ctrl(s); if(c && !c.atStart()){ c.back(); return after(); } }
    else { const g = groups().reverse().find(g => g.some(b => b.classList.contains('shown')));
      if(g){ g.forEach(b => b.classList.remove('shown')); return after(); } }
    if(!blank && leadIn(cur)){ setBlank(true); return after(); }
    if(cur > 0) show(cur - 1, -1);
  }
  const after = () => { renderNotes(); broadcast(); };

  /* go to slide i, beat b (used by the presenter preview and #n links) */
  function goto(i, b = Infinity, isBlank = false){
    show(i, 0); setBlank(false);
    if(isBlank && leadIn(i)){ setBlank(true); return after(); }
    const s = S[cur];
    if(s.kind === 'scene'){ const c = ctrl(s); if(c){ c.reset(); for(let k = 0; k < b && !c.atEnd(); k++) c.advance(); } }
    else groups().forEach((g, k) => g.forEach(x => x.classList.toggle('shown', k < b)));
    after();
  }

  /* ---- notes: the slide's passage for the current click ---- */
  const passages = i => { const s = S[i];
    if(s.kind === 'scene'){ const c = ctrl(s); if(c && Array.isArray(c.notes)) return c.notes; }
    return splitNotes(s.notes); };
  function renderNotes(){
    const ps = passages(cur), k = Math.min(beat(), ps.length - 1);
    $('#notes').classList.toggle('shown', notesOn);
    $('#notes-body').innerHTML = ps.map((p, j) => `<p class="${j === k ? 'cur' : j < k ? 'past' : ''}">${p || '<i>(nothing on this click)</i>'}</p>`).join('');
  }

  /* ---- presenter link: the deck broadcasts its state; the presenter sends commands back ---- */
  const ch = 'BroadcastChannel' in window ? new BroadcastChannel('talk-deck') : null;
  function broadcast(){
    if(!ch || MIRROR) return;
    ch.postMessage({type: 'state', cur, beat: beat(), blank, n: S.length, labels: LABEL,
      label: LABEL[cur], title: titleOf(cur), sec: S[cur].sec, notes: passages(cur),
      next: cur + 1 < S.length ? {label: LABEL[cur+1], title: titleOf(cur + 1)} : null, secs: SECS});
  }
  if(ch) ch.onmessage = e => { const m = e.data || {};
    if(MIRROR && !Number.isFinite(AT) && m.type === 'state') goto(m.cur, m.beat, m.blank);
    if(!MIRROR && m.type === 'cmd'){ if(m.cmd === 'fwd') fwd(); if(m.cmd === 'bwd') bwd(); if(m.cmd === 'hello') broadcast(); if(m.cmd === 'goto') show(m.i, 0); } };
  setInterval(() => { if(S[cur].kind === 'scene') { renderNotes(); broadcast(); } }, 400);   // scenes clicked with the mouse

  function onKey(e){
    if(e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key, mine = ['ArrowRight', ' ', 'Enter', 'PageDown', 'ArrowLeft', 'PageUp', 'Home', 'End', 'n', 'p', 'f'];
    if(!mine.includes(k) || MIRROR) return;
    e.preventDefault(); e.stopImmediatePropagation();
    if(k === 'PageDown') show(cur + 1, +1);
    else if(k === 'PageUp') show(cur - 1, -1);
    else if(k === 'Home') show(0, 0);
    else if(k === 'End') show(S.length - 1, 0);
    else if(k === 'n'){ notesOn = !notesOn; renderNotes(); }
    else if(k === 'p'){ fullscreen(true); window.open('presenter.html', 'talk-presenter', 'width=1400,height=850'); }
    else if(k === 'f') fullscreen();
    else if(k === 'ArrowLeft') bwd();
    else fwd();
  }
  function fullscreen(on){ try{
    if(document.fullscreenElement && on !== true) document.exitFullscreen();
    else if(!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
  }catch(e){} }
  addEventListener('keydown', onKey, true);
  root.addEventListener('click', () => { if(!MIRROR && (S[cur].kind === 'static' || blank)) fwd(); });

  const fromHash = () => { const n = parseInt(location.hash.slice(1), 10); goto(Number.isFinite(n) ? n - 1 : 0, Number.isFinite(n) ? Infinity : 0); };
  if(!MIRROR){ addEventListener('hashchange', fromHash); fromHash(); }
  else if(Number.isFinite(AT)){
    const tryAt = (k = 0) => { const s = S[AT - 1];
      if(s && s.kind === 'scene' && !ctrl(s) && k < 60) return setTimeout(() => tryAt(k + 1), 150);   // wait for the scene
      goto(AT - 1); };
    show(AT - 1, 0); tryAt(); }
  else show(0, 0);
  window.deck = {show, fwd, bwd, goto, S, LABEL, titleOf, passages, get cur(){ return cur; }, get beat(){ return beat(); }};
}

/* loads the parts listed in order.js (or ?only=…) from a folder, then starts the deck */
async function loadParts(folder, list, cfg){
  const only = (new URLSearchParams(location.search).get('only') || '').split(',').filter(Boolean);
  for(const f of (only.length ? list.filter(p => only.includes(p)) : list)) await new Promise(ok => {
    const s = document.createElement('script');
    s.src = `${folder}/${f}.js?v=${Date.now()}`;
    s.onload = ok; s.onerror = () => { console.warn('missing part', f); ok(); };
    document.body.appendChild(s);
  });
  startDeck(cfg);
}

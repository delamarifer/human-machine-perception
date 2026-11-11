/* Day 8 part B: small drawing helpers shared by the two flow matching equation scenes (fm-intro, fm-simple). Owner: Fernanda.
   Conventions as in d8-toy.js: flow matching runs t = 0 (noise) to t = 1 (data); d8Vel gives the exact marginal velocity,
   which is what a perfectly trained network u_t^theta would output. */
function fmLabel(V, txt, p, dx = 0, dy = 0, opt = {}){
  const c = V.ctx, f = Math.max(13 * V.px, V.h / 25) * (opt.size || 1), [X, Y] = V.P(p);
  c.font = `${opt.italic === false ? '' : 'italic '}${opt.bold ? 'bold ' : ''}${f}px 'Cambria Math', Cambria, Georgia, serif`;
  c.textAlign = 'center'; c.textBaseline = 'middle';
  const w = c.measureText(txt).width, x = X + dx * f, y = Y + dy * f;
  c.fillStyle = 'rgba(255,255,255,.88)'; c.fillRect(x - w / 2 - f * .25, y - f * .62, w + f * .5, f * 1.24);
  c.fillStyle = '#0f172a'; c.fillText(txt, x, y);
}
function fmTag(V, txt){   /* the current t, top left of the plot */
  const c = V.ctx, f = Math.max(13 * V.px, V.h / 22); c.font = `bold ${f}px Calibri, Carlito, Arial, sans-serif`;
  c.fillStyle = '#0f172a'; c.textAlign = 'left'; c.textBaseline = 'top'; c.fillText(txt, f * .4, f * .3);
}
const FM_GRID = (() => { const g = []; for(let i = -3.4; i <= 3.41; i += .5) for(let j = -3.4; j <= 3.41; j += .5) g.push([i, j]); return g; })();
function fmField(V, mix, t, alpha = .45){
  FM_GRID.forEach(p => { const u = d8Vel(mix, p, t), L = Math.hypot(u[0], u[1]) || 1e-9, m = .36 * (1 - Math.exp(-L * .35));
    V.arrow(p, [u[0] / L * m, u[1] / L * m], '#0f172a', 1.2, alpha, 5); });
}

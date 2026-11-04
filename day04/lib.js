/* Day 4 helpers shared by the parts. Every number comes from D4 (assets/result.js, made by assets/pipeline.py). */
const A = 'assets/';
const fmt = n => Number(n).toLocaleString('en-US');
const pct = p => (100 * p).toFixed(p >= 0.1 ? 0 : 1) + '%';
const M = s => `<code class="m">${s}</code>`;

/* top-5 class probabilities as horizontal bars */
const bars = (top, o = {}) => `<div class="d4-bars">${top.map((t, k) => `
  <div class="row ${o.build ? 'b' : ''}" ${o.build ? `data-step="${(o.step || 1) + (o.together ? 0 : k)}"` : ''}>
    <span class="nm">${t.label}</span>
    <span class="bar"><i style="width:${Math.max(1, 100 * t.p)}%"></i></span>
    <span class="v">${pct(t.p)}</span>
  </div>`).join('')}</div>`;

/* a small table: rows of cells, first row is the header */
const table = (rows, o = {}) => `<table class="d4-tbl ${o.cls || ''}"><thead><tr>${rows[0].map(c => `<th>${c}</th>`).join('')}</tr></thead>
  <tbody>${rows.slice(1).map((r, k) => `<tr class="${o.build ? 'b' : ''}" ${o.build ? `data-step="${(o.step || 1) + k}"` : ''}>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;

const counts = c => Object.entries(c).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${v} ${k}`).join(' · ');

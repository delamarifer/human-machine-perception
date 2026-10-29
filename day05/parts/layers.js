/* PART: layers (Day 5). Owner: to decide (see README.md). Plan: 15 min, linear layer to nonlinear network.
   1. one unit: weighted sum, then a ReLU; a layer is many units
   2. scene: a linear layer, then a hidden ReLU layer, both trained live on toy 2D data */
{
section('Linear to nonlinear');

/* ReLU drawn as a small chart (computed: y = max(0, z) on [-2, 2]) */
const layersRelu = `<svg viewBox="-2.4 -2.4 4.8 4.8" style="height:22vh;display:block" aria-label="ReLU">
  <line x1="-2.2" y1="0" x2="2.2" y2="0" stroke="#94a3b8" stroke-width=".04"/>
  <line x1="0" y1="2.2" x2="0" y2="-2.2" stroke="#94a3b8" stroke-width=".04"/>
  <polyline points="-2,0 0,0 2,-2" fill="none" stroke="#0f172a" stroke-width=".12"/>
  <text x="2.25" y=".45" font-size=".45" text-anchor="end" fill="#0f172a">z</text></svg>`;

st(`
  <h1 class="t">One unit, then a layer</h1>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:4vw;align-items:center;margin:auto 0">
    <div class="b" data-step="1">
      <div class="statement">z = w₁x₁ + w₂x₂ + b</div>
      <div class="label" style="margin-top:1vh">weighted sum, plus a bias</div>
    </div>
    <div class="b" data-step="2" style="display:flex;align-items:center;gap:2vw">
      ${layersRelu}
      <div><div class="statement">ReLU(z) = max(0, z)</div><div class="label" style="margin-top:1vh">keep positives, zero the rest</div></div>
    </div>
  </div>
  <div class="statement center b" data-step="3">a layer: y = ReLU(W x + b)</div>
`, { notes: [
  "(draft) Let's build a network from its smallest piece.",
  "(draft) One unit takes its inputs, multiplies each by a weight, adds them up and adds a bias. That is a linear function, the same arithmetic as one output pixel of a filter.",
  "(draft) Then it passes the result through a nonlinearity. The most common one is the ReLU: if the sum is positive, keep it; if it is negative, output zero.",
  "(draft) A layer is many of these units side by side, each with its own weights. In matrix form: multiply by W, add b, apply the ReLU. Why do we need that ReLU at all? Let's see."
]});

sc('boundaryScene', 'scenes/boundary.html');
}

# Pattern B — SVG/DOM step reveal

Use when the figure is authored here rather than imported: method schematics, apparatus diagrams,
pipelines, slopegraphs, timelines.

## The generic stepper

For any scene that's just "reveal these elements in order," don't write a module — mark up the
elements and use the factory:

```html
<p class="buildline" data-step="1">The usual test — predict cortical responses.</p>
<p class="buildline q-big" data-step="3">We need a test that <em>can</em> fail.</p>
```

```js
function makeStepper(selector, max){
  let step = 0;
  const el = () => document.querySelector(selector);
  function render(){
    const sec = el(); if(!sec) return;
    sec.dataset.beat = step;
    sec.querySelectorAll('[data-step]').forEach(n=>{
      n.classList.toggle('shown', step >= parseInt(n.getAttribute('data-step'),10));
    });
  }
  return {
    reset(){ step=0; render(); },
    resetToEnd(){ step=max; render(); },
    advance(){ if(step<max){ step++; render(); } },
    back(){ if(step>0){ step--; render(); } },
    atStart(){ return step<=0; },
    atEnd(){ return step>=max; },
    getBeat(){ return step; },
    count(){ return max+1; },
    setBeat(b){ step=Math.max(0,Math.min(max,b)); render(); }
  };
}
```

Multiple elements can share a `data-step` — they arrive together. Steps may skip numbers.

CSS does the transition:

```css
[data-step]{ opacity:0; transform:translateY(10px);
             transition:opacity .5s ease, transform .5s ease; }
[data-step].shown{ opacity:1; transform:none; }
```

Print and presenter views override with `.scene [data-step]{ opacity:1 !important; ... }` so every
build shows at once on paper.

## Bespoke modules

When a scene needs more than reveals — recolored states, recording flashes, an apparatus that
rescales — write a module with a **beat table** and a single `render()`:

```js
const BEATS = [
  { act:0, label:'Title'                    },
  { act:1, label:'Natural → response'       },
  { act:2, label:'Natural sound + save', rec:'orig' },
  { act:3, label:'Robust model-matched', active:'robust' },
];
```

Each beat is data: `act` groups beats into stages, and extra keys (`rec`, `active`, `play`) declare
what that beat *does*. `render()` reads only `BEATS[beat]` and sets classes — it never mutates
incrementally. That's what makes jumping to any beat correct by construction.

```js
function render(){
  root.dataset.beat = beat;
  const cur = BEATS[beat];
  root.querySelectorAll('[data-step]').forEach(el=>
    el.classList.toggle('shown', beat >= +el.getAttribute('data-step')));
  root.querySelector('#def-stage').classList.toggle('live', cur.act >= 1);
  root.classList.toggle('lit-last', cur.act === 3);
  root.querySelectorAll('[data-rep]').forEach(el=>
    el.classList.toggle('playing', el.getAttribute('data-rep') === cur.active));
}
```

Restarting a CSS animation (a recording flash) needs a reflow between remove and add:

```js
brain.classList.remove('recording');
void brain.offsetWidth;            // forces reflow — without it the class re-add is a no-op
brain.classList.add('recording');
```

Expose the same interface as `makeStepper` (plus `getBeat`/`count`/`setBeat`) so the deck controller
is uniform across scenes.

## Drawing figures in SVG

Build markup with small generator functions rather than by hand, so parameters stay editable:

```js
function defModel(){
  const LAYERS = [82,74,82,62,50,38,28];   // feature-map heights, shrinking
  const READOUT = 2;                        // the stage the response is read from
  ...  // each slab = front + top + right face, giving a thin 3D card
}
```

Useful idioms from the MMS scene:

- **Waveforms as SVG paths** with `Q`/`T` curves; the *shape* carries meaning (smooth = structured,
  jagged polyline = noise). Keep them in a `MODELS` table beside the model name.
- **Activation matrices** as a grid of `<span class="rcell" style="--v:.8;--c:3;--r:1">`, with CSS
  reading `--v` for brightness and `--c`/`--r` to stagger a shimmer. Cheaper than canvas and
  themeable.
- **Custom properties for animation params** (`--fillx` driving a `scaleX`) so JS sets one number
  and CSS owns the motion.

# Pattern A — canvas overlay on a real figure


Use when a real figure image exists and you want to show signal flowing through it. The figure is
never modified — you draw it to canvas each frame and composite light on top.

## Structure

```
<div id="stage"><canvas id="cv"></canvas></div>
<footer><div id="dots"></div></footer>
```

`#stage` is `flex:1`, canvas is `position:absolute; inset:0`. Body is `overflow:hidden`,
`cursor:pointer`, `user-select:none`.

## Sizing

```js
function resize(){
  const st = document.getElementById('stage');
  const dpr = window.devicePixelRatio || 1;
  W = st.clientWidth; H = st.clientHeight;
  cv.width = Math.round(W*dpr); cv.height = Math.round(H*dpr);
  ctx.setTransform(dpr,0,0,dpr,0,0);
  const s = Math.min(W/IMG_W, H/IMG_H);        // letterbox, never stretch
  IW = IMG_W*s; IH = IMG_H*s;
  IX = (W-IW)/2; IY = (H-IH)/2;
}
const px = u => IX + u*IW;   // normalized [0,1] -> screen
const py = v => IY + v*IH;
```

Call `resize()` on `window.resize` AND on `img.onload` (native dimensions may be hardcoded but the
stage size isn't known until layout).

Radii are expressed as a fraction of `IW` (not `IH`) so they scale uniformly with the figure.

## Finding anchors

Do not eyeball. Write a throwaway Python script that scans the image for the marker colors and
prints normalized centroids:

```python
from PIL import Image
import numpy as np
im = np.asarray(Image.open('images/model_architecture.jpg').convert('RGB')).astype(int)
h, w, _ = im.shape
target = np.array([104,168,52])                      # the green g-node circles
mask = (np.abs(im-target).sum(2) < 90)
ys, xs = np.nonzero(mask)
# cluster by x, print each cluster's normalized center
```

Cluster columns, print `u = x/w`, `v = y/h`, paste into the constants block. Do the same per marker
class (gate nodes, cabinet bounding boxes, colorbar borders). Bounding boxes come out as
`[u0,v0,u1,v1]` from each cluster's min/max.

Delete the script afterward or keep it next to the HTML if the figure may be re-exported.

## The two light helpers

**`elight(pt, rxF, ryF, rgb, alpha, plateau)`** — even, flat illumination of a whole layer. The
gradient holds full alpha out to `plateau` (default 0.6) and only then falls off, so the layer reads
as uniformly lit rather than spotlit. `ctx.scale(1, ry/rx)` makes it elliptical for tall slabs.

**`glow(pt, rFrac, rgb, alpha, aspect)`** — a tight spotlight for a single node. Falls off from the
center immediately (stop at 0.35 already halves alpha).

**`fillSplit(bb, alpha)`** — tints a box with two soft radials (top half one color, bottom the
other), clipped to a rounded rect. Used for the L/R binaural split. Soft radials rather than hard
rects so the fill hugs a *tilted* drawn cabinet without boxy edges giving away the overlay.

Both bail early on `alpha <= 0.012` — with dozens of lights per frame this matters.

## Compositing

```js
ctx.globalCompositeOperation = 'source-over';   // colors that must read as themselves
// ... the L/R tints: red on a teal cabinet washes out under 'lighter'
ctx.globalCompositeOperation = 'lighter';       // glows, gains, gates
// ... all the node lights
ctx.globalCompositeOperation = 'source-over';   // restore before drawing text
```

## Frame loop and beat progress

Redraw the image every frame (`ctx.clearRect` then `drawImage`) — cheap, and it means lights never
accumulate.

```js
const pulse = 0.5 + 0.5*Math.sin(now*0.005);          // shared breathing
const tPhase = now - transStart;
const jumped = transStart < 0;                         // jumped in: no animation
const p0 = phase > 0 ? 1 : (jumped ? 1 : clamp01(tPhase/2600));
```

One progress variable per animated phase, each with its own duration. `phase > n ? 1` means an
already-passed phase is fully drawn and static. The `jumped` flag is what makes deck restore land
correctly instead of replaying a 4-second build.

Sequential reveal inside a phase:

```js
for (let i = 0; i < 6; i++){
  const local = clamp01((p2 - i/6) * 6);
  const gate = sstep(clamp01(local/0.4));            // gate lights first
  const lay  = sstep(clamp01((local-0.35)/0.65));    // then the layer it feeds
  ...
}
```

`sstep` is smoothstep: `t*t*(3-2*t)`. Use it on every reveal — linear alpha ramps look mechanical.

## Caption

Rendered in canvas, lower-left, screen space, `#475569`, size `max(13, IW*0.016)` so it tracks the
figure. One line per phase, from a `PHASE_LABEL` array parallel to the phases.

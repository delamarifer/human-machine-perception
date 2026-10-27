# Palette and typography

## Default — committee palette (talk figures, light ground)

Formalized July 2026 for the thesis committee deck, replacing the 3MT's bright primaries. This is
the default for any new talk figure.

```css
:root{
  --bg:#ffffff; --ink:#0f172a; --body:#334155; --muted:#64748b;
  --border:#e2e8f0; --panel:#f8fafc;
  --blue:#38506e;    /* muted slate-blue — natural / reference condition */
  --purple:#7a5ea0;  /* plum — model-matched / readout */
  --green:#3f7357;   /* pine — good, same, done */
  --amber:#b45309;   /* ochre — attention, in-progress */
  --red:#dc2626;     /* brick — bad, different, deadline */
  --purple-soft:#efeaf6; --blue-soft:#e7ecf3; --green-soft:#e6f0ea;
  --serif:'Fraunces', Georgia, 'Times New Roman', serif;
  --sans:'Helvetica Neue', -apple-system, BlinkMacSystemFont, Arial, sans-serif;
}
```

Canvas glow colors (RGB triples, for the overlay pattern — brighter than the CSS palette because
they're composited additively over a figure):

```js
const GREEN  = [104,168,52];    // gains
const GOLD   = [255,208,90];    // gates firing
const PURPLE = [150,150,220];   // classifier / readout
const CORAL  = [255,130,70];    // the mixture stream
const WHITE  = [235,255,255];   // hot core of a traveling pulse
const CH_L   = [40,105,245];    // left channel  (blue)
const CH_R   = [235,44,44];     // right channel (red)
```

## Rules

**Never restyle real data.** The scientific NSE colorbar (cyan→magenta→yellow) and any published
figure's own colors stay exactly as they are. The palette governs the annotation layer only.

**Match the figure you're overlaying.** In the attentional-gain slide, blue/red for the binaural
channels was chosen because the cochleagram in the underlying figure already had blue/red borders.
Inherit meaning that's already on screen instead of inventing a second code for it.

**One meaning per color, across the whole talk.** If green is "gain" on one slide it can't be
"good" on the next. Write the mapping down in a comment at the top of the file.

**Semantic pairs that recurred in the original talk:** natural/reference = blue, model-matched = purple,
same/good/done = green, different/bad = brick, attention/in-progress = ochre.

## Neon-on-dark — personal tools, not talks

Do NOT use for talk figures — it doesn't project well and it clashes with journal figures.

```css
:root{
  --bg:#05070a; --panel:#0c1410; --panel2:#10171c; --line:#1c2a24;
  --line2:#2b4138; --text:#eafff2; --text2:#8fb6a6; --text3:#5d7a6e;
  --green:#2bff88; --magenta:#ff2bd6;
}
```

Glow via `box-shadow`/`text-shadow` halos, colors written as `rgba(var(--green-rgb), …)` so themes
can recolor everything from one place. The timeline also carries `light` (cream/ink, no glow) and
`dusk` (warm plum, pastel glow) variants selected from a `THEMES` map.

## Typography

Fraunces for display/titles (700 and 900 weights), Helvetica Neue for body and all in-figure
labels. Load Fraunces from Google Fonts with `preconnect`. Canvas captions use the sans stack at
`max(13, IW*0.016)` px so they scale with the figure but never go unreadably small.

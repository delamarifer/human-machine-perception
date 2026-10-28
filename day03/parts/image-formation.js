/* PART: image-formation (Day 3). Owner: to decide (see README.md). Plan: 20 min.
   Brainstorm: "Lecture 2 trimmed to pinhole + color (Ch 5)".
   Slides: the road from light to numbers · pinhole camera (scene) · pixels as numbers (scene) · color sensors */
{
section('Image formation');

st(`
  <h1 class="t">From light to numbers</h1>
  <div class="flow" style="margin:auto 2vw">
    <div class="step b" data-step="1"><b>Light</b><span class="label">from the world</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Camera</b><span class="label">projects 3D to 2D</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>Sensor</b><span class="label">samples and counts</span></div>
    <div class="arrow b" data-step="4">→</div>
    <div class="step b" data-step="4"><b>Array</b><span class="label">numbers we compute on</span></div>
  </div>
`, { notes: [
  "(draft) Here is the road from the world to the numbers in your notebook.",
  "(draft) It starts with light, coming from a light source and bouncing off surfaces in the world.",
  "(draft) A camera collects some of that light and projects the 3D world onto a 2D surface.",
  "(draft) A sensor on that surface samples it on a grid and counts how much light lands on each cell.",
  "(draft) What comes out is an array of numbers. Everything we do for the rest of the course starts from that array."
]});

sc('pinhole', 'scenes/pinhole.html');
sc('pixels', 'scenes/pixels.html');

/* Bayer mosaic: the standard RGGB 2x2 tile, repeated. Cell colors are the filter colors (data). */
const bayer = [...Array(64)].map((_, k) => { const r = k >> 3, c = k & 7;
  const col = r % 2 === 0 ? (c % 2 === 0 ? '#d64545' : '#4c9a4c') : (c % 2 === 0 ? '#4c9a4c' : '#4a6fd0');
  return `<i style="background:${col}"></i>`; }).join('');
st(`
  <h1 class="t">Color: three kinds of sensor</h1>
  <div style="flex:1 1 auto;min-height:0;display:grid;grid-template-columns:1fr 1fr;gap:5vw;align-items:center">
    <div class="b" data-step="1" style="display:flex;flex-direction:column;align-items:center;gap:2vh">
      <div style="display:grid;grid-template-columns:repeat(8,1fr);gap:3px;width:min(28vw,46vh);aspect-ratio:1">${bayer}</div>
      <div class="lead">Camera: red, green, blue filters</div>
      <div class="label">one filter per pixel (Bayer mosaic)</div>
    </div>
    <div class="b" data-step="2" style="display:flex;flex-direction:column;align-items:center;gap:2vh">
      <div class="todo" style="width:min(28vw,46vh);aspect-ratio:1;display:flex;flex-direction:column;justify-content:center">Figure: the three cone types and their sensitivity curves (L, M, S). source: to add</div>
      <div class="lead">Eye: three cone types</div>
      <div class="label">long, medium, short wavelengths</div>
    </div>
  </div>
`, { notes: [
  "(draft) One more piece of image formation: color.",
  "(draft) A camera sensor only counts light; it cannot tell wavelengths apart. To get color, most cameras put a tiny color filter over each pixel, red, green or blue, in a repeating pattern called a Bayer mosaic. There are twice as many green filters as red or blue. The camera then fills in the two missing colors at every pixel from its neighbors.",
  "(draft) Your eye does something similar. The retina has three kinds of cone, most sensitive to long, medium and short wavelengths. Color, for you and for the camera, starts as three numbers per location."
]});
}

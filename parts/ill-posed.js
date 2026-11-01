/* PART: ill-posed. Owner: Fernanda (see README.md).
   Outline slide 7 asked: "animate the different versions". The scene turns one line drawing into
   several 3D shapes along the lines of sight, then collapses them back to the same image.
   It opens on the classic figure and rebuilds it in the same layout (eye below, vertical lines of sight). */
{
section('Seeing');

/* From Fernanda's "Untitled presentation.pptx" (2026-10-28): the question, then the same
   patch as numbers and as a picture. */
st(`
  <div class="center">
    <div class="question" style="font-size:clamp(2.4rem,4.2vw,3.8rem)">Why is vision hard?</div>
  </div>
`, { title: 'Why is vision hard?', notes: [
  "(draft) This slide is only the question. Do not answer it yet. Seeing feels instant, which is why the difficulty is easy to miss. The next slide takes one tiny patch of a picture and shows the only thing a camera stored: a table of brightness numbers, and then those same numbers drawn as gray squares. The slide after that is a line drawing that fits many different solid shapes. Two different difficulties. This slide just names them."
]});

/* The numbers first, then the same patch drawn as gray squares, then the point. */
st(`
  <style>
    .ill-posed-input{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1.55fr; gap:4vw; align-items:center;
      transition:opacity .9s ease, filter .9s ease; }
    .ill-posed-input .col{ height:100%; min-height:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1.5vh; }
    .ill-posed-input img{ max-width:100%; max-height:52vh; object-fit:contain; display:block; }
    .ill-posed-input .label{ text-align:center; }
    .stage:has(.ill-posed-pop.shown) .ill-posed-input{ opacity:.22; filter:blur(2px); }
    .ill-posed-pop{ position:absolute; left:50%; top:55%; translate:-50% -50%; width:80vw; }
  </style>
  <h1 class="t">The input</h1>
  <div class="ill-posed-input">
    <div class="col b" data-step="2">
      <div class="label">What we see</div>
      <img src="assets/ill-posed/input-what-we-see.png" alt="A small grayscale image patch on m, n axes">
    </div>
    <div class="col b" data-step="1">
      <img src="assets/ill-posed/input-pixel-values.png" alt="The same patch as a matrix I of pixel values">
    </div>
  </div>
  <div class="popquote ill-posed-pop b" data-step="3">The camera is a measurement device, not a vision system</div>
`, { notes: [
  "(draft) Title only: The input. This is the first half of the answer to the question you just asked. A camera does not store objects, edges, or distance. It stores a brightness at every pixel. The next click puts up one small patch as that table of numbers, on the right. The click after that draws the same numbers as gray squares, on the left, which is the picture a person can recognize. The last click is the sentence to leave them with.",
  "(draft) The table on the right is one patch, written out. It is called I. Each entry is the brightness of one pixel, about 0 for black and about 255 for white. Roughly sixteen rows and sixteen columns. Do not read the numbers out. Point at the middle columns: the values fall off, through the hundreds, into the twenties and thirties, then climb again. That dip is a dark vertical stroke, but the table does not say so. There is no edge here, no object, and no depth. This list of integers is the whole input.",
  "(draft) Same patch, now on the left, drawn. The vertical axis is m, the row. The horizontal axis is n, the column. Both run from 0 to about 16. Each number has become a gray square. The dip in the middle of the table is the black bar you can now see, lighter gray around it. Nothing was added between the two pictures. Painting the numbers is enough for a person to see a mark.",
  "(draft) Leave the sentence up, and let the two pictures fade behind it. The camera recorded a brightness at each pixel. It did not record that there is a bar, or how far away the bar is, or what the bar is. Measurement is the table. Seeing is whatever has to be inferred after that. Tomorrow the lab starts from an array like this one. The next slide is the other half of the difficulty: even a clean line drawing still fits many different solid shapes."
]});

sc('illPosed', 'scenes/ill-posed-shapes.html');

/* The classic figure now opens the scene (beat 1), so the scene's own animation can mirror its layout. */
}

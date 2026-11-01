{
section('Images');

st(`
  <h1 class="t">An image is an array</h1>
  <ul class="frag">
    <li class="b">Pixels</li>
    <li class="b">Channels: red, green, blue</li>
    <li class="b">Resolution</li>
  </ul>
`, { notes: [
  "(draft) Before any vision system, the data.",
  "(draft) A pixel is one location. Its value is a number, or three numbers.",
  "(draft) A color photograph has three channels.",
  "(draft) Resolution is how many pixels. More pixels is not more understanding."
]});

st(`
  <h1 class="t">NumPy</h1>
  <ul class="frag">
    <li class="b">shape is rows, columns, channels</li>
    <li class="b">Indexing: image[row, column]</li>
    <li class="b">A slice is a crop</li>
  </ul>
`, { notes: [
  "(draft) In the notebook, the picture is a NumPy array.",
  "(draft) Shape is rows, then columns, then channels. Rows count down from the top.",
  "(draft) One pixel is image[row, column].",
  "(draft) A slice cuts a rectangle out. That is a crop. Nothing about the scene has been inferred yet."
]});
}

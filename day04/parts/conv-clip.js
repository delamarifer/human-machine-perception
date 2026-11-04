/* PART: conv-clip (Day 4). Owner: Fernanda. Goes right after Shreya's `convolution` part, in her Section 3.
   One short 3Blue1Brown clip (under 60 s, credited, linked, per 3blue1brown.com/faq), cut on the video's own
   chapter mark "Image processing". */
{
section('3. Convolution');

st(`
  <h1 class="t">3Blue1Brown: convolution on images</h1>
  <div class="b" style="flex:1 1 auto;min-height:0;display:flex;justify-content:center">
    <iframe loading="lazy" style="height:100%;aspect-ratio:16/9;max-width:100%;border:0;border-radius:10px"
      src="https://www.youtube-nocookie.com/embed/KuXjwB4LzSA?start=512&end=570&rel=0"
      title="3Blue1Brown, But what is a convolution?" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>
  </div>
  ${cite('Clip: 3Blue1Brown, “But what is a convolution?”, 8:32–9:30 · youtube.com/watch?v=KuXjwB4LzSA')}
`, { notes: [
  "(draft) One more view of the same operation, from 3Blue1Brown.",
  "(to write) Play the clip: the chapter called Image processing, 8:32 to 9:30. Watch it before class to confirm the cut. After it: in a CNN, nobody chooses these kernels; they are learned, like the weights of the digit network."
]});
}

/* PART: nn-scenes (Day 4). Owner: Fernanda. Goes right after Shreya's `networks` part, in her Section 1.
   Two animated scenes drawn here from a real trained network (assets/nn/train_digits.py), in the spirit of
   3Blue1Brown's Deep learning series, plus two short 3Blue1Brown clips.
   3Blue1Brown's terms (3blue1brown.com/faq): under 60 s, clear on-screen credit, a link to the original.
   The clips start and stop on the video's own chapter marks (from its YouTube description). */
{
section('1. Networks');

/* a credited YouTube clip; loading="lazy" so it loads only when its slide is shown */
const clip3b1b = (id, start, end, video, chapter) => `
  <h1 class="t">3Blue1Brown: ${chapter}</h1>
  <div class="b" style="flex:1 1 auto;min-height:0;display:flex;justify-content:center">
    <iframe loading="lazy" style="height:100%;aspect-ratio:16/9;max-width:100%;border:0;border-radius:10px"
      src="https://www.youtube-nocookie.com/embed/${id}?start=${start}&end=${end}&rel=0"
      title="3Blue1Brown, ${video}" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>
  </div>
  ${cite(`Clip: 3Blue1Brown, “${video}”, ${Math.floor(start / 60)}:${String(start % 60).padStart(2, '0')}–${Math.floor(end / 60)}:${String(end % 60).padStart(2, '0')} · youtube.com/watch?v=${id}`)}`;

sc('nnDigits', 'scenes/nn-digits.html');

st(clip3b1b('aircAruvnKk', 331, 389, 'But what is a neural network? | Deep learning chapter 1', 'why layers?'), { notes: [
  "(draft) Here is how Grant Sanderson, of 3Blue1Brown, explains why we stack layers. Under a minute.",
  "(to write) Play the clip: the chapter called Why layers? in the video, 5:31 to 6:29. We have not checked its content line by line; watch it before class. After it: the hope that layers build up from small pieces to bigger ones is exactly what convolutional networks are designed for, and we will test whether it holds."
]});

st(clip3b1b('IHZwWFHWa-w', 415, 473, 'Gradient descent, how neural networks learn | Deep Learning Chapter 2', 'gradient descent'), { notes: [
  "(draft) Where do the weights come from? First, 3Blue1Brown's picture of it.",
  "(to write) Play the clip: the chapter called Gradient descent, 6:55 to 7:53. Watch it before class to confirm the cut. After it: now the same idea on our own digit network."
]});

sc('nnDescent', 'scenes/nn-descent.html');
}

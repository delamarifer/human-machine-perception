/* PART: examples (Final presentations, owner: Shreya), 2026-11-16. Three real write-ups in three formats (Shreya,
   2026-11-16: show a write-up vs an interactive vs a blog post), each embedded beside what to notice in it.
   1. Paper: Geirhos et al. (2019, ICLR), PDF from arXiv 1811.12231 in assets/, page 1 (Figure 1, the elephant-texture cat).
      People label cue-conflict images by shape, ImageNet CNNs by texture; Stylized-ImageNet raises shape bias.
      The limits row is a question for the class, not a claim about the paper.
   2. Interactive: Olah, Mordvintsev and Schubert (2017), Feature Visualization, Distill (live page, checked 2026-11-16:
      optimization to make a neuron fire, diversity, high-frequency artifacts fixed with regularization).
   3. Blog: Karpathy (2014), What I learned from competing against a ConvNet on ImageNet (live page, checked 2026-11-16:
      he built a labeling interface and labeled 1500 test images himself; his error 5.1%, GoogLeNet 6.8% on the same
      images; GoogLeNet missed small or thin objects, he struggled with fine-grained classes like dog breeds).
   The two live pages need the internet in the room; each has an Open link. No speaker notes. */
{
section('Examples');

/* the write-up itself, embedded; appears on the first click, the parts follow */
const prPaper = (show, full) => `<div class="pr-paper b" data-step="0">
  <iframe src="${show}" title="example write-up"></iframe>
  <a href="${full}" target="_blank">Open it in a new tab</a></div>`;

st(`
  <h1 class="t">Three ways to write it up</h1>
  <div class="pr-col">
    <div class="pr-cards">
      <div class="pr-card b"><small>Write-up</small><b>A short paper</b><span>Sections in a fixed order, figures with numbers</span></div>
      <div class="pr-card b"><small>Interactive</small><b>An interactive article</b><span>The reader moves through the figures themselves</span></div>
      <div class="pr-card b"><small>Blog post</small><b>A blog post</b><span>One story in your own voice, quick to read</span></div>
    </div>
    <ul class="pr-list"><li class="b"><b>Any format still has the five parts</b></li></ul>
  </div>
`);

st(`
  <h1 class="t">A short paper</h1>
  <div class="pr-col pr-paperwrap">
    ${prPaper('assets/geirhos2019-texture-bias.pdf#view=FitH&navpanes=0', 'assets/geirhos2019-texture-bias.pdf')}
    <div class="pr-ex">
      <div class="pr-part b" data-step="1">Problem</div><div class="b" data-step="1">Do networks trained on ImageNet recognise objects by shape, as people do, or by texture?</div>
      <div class="pr-part b" data-step="2">Method</div><div class="b" data-step="2">Cue-conflict images: the shape of one object with the texture of another, like a cat covered in elephant skin. People and networks label the same images.</div>
      <div class="pr-part b" data-step="3">Results</div><div class="b" data-step="3">People mostly chose the shape; the networks mostly chose the texture.</div>
      <div class="pr-part b" data-step="4">A fix</div><div class="b" data-step="4">Training on Stylized-ImageNet, where textures are swapped, made the network rely more on shape.</div>
      <div class="pr-part b" data-step="5">Limits</div><div class="b pr-ask" data-step="5">Your turn: what can this experiment not tell us?</div>
    </div>
  </div>
  ${cite('Geirhos, Rubisch, Michaelis, Bethge, Wichmann and Brendel (2019). ImageNet-trained CNNs are biased towards texture. ICLR.')}
`);

st(`
  <h1 class="t">An interactive article</h1>
  <div class="pr-col pr-paperwrap">
    ${prPaper('https://distill.pub/2017/feature-visualization/', 'https://distill.pub/2017/feature-visualization/')}
    <div class="pr-ex">
      <div class="pr-part b" data-step="1">Problem</div><div class="b" data-step="1">What does a single neuron in a network respond to?</div>
      <div class="pr-part b" data-step="2">Method</div><div class="b" data-step="2">Start from noise and change the image until the neuron fires as strongly as it can</div>
      <div class="pr-part b" data-step="3">Results</div><div class="b" data-step="3">Figures the reader explores: pick a neuron, see the images that drive it</div>
      <div class="pr-part b" data-step="4">Failure cases</div><div class="b" data-step="4">Left alone, the images fill with high-frequency noise; they show the fixes side by side</div>
    </div>
  </div>
  ${cite('Olah, Mordvintsev and Schubert (2017). Feature Visualization. Distill.')}
`);

st(`
  <h1 class="t">A blog post</h1>
  <div class="pr-col pr-paperwrap">
    ${prPaper('https://karpathy.github.io/2014/09/02/what-i-learned-from-competing-against-a-convnet-on-imagenet/', 'https://karpathy.github.io/2014/09/02/what-i-learned-from-competing-against-a-convnet-on-imagenet/')}
    <div class="pr-ex">
      <div class="pr-part b" data-step="1">Problem</div><div class="b" data-step="1">How well does a person do on ImageNet, next to the best network?</div>
      <div class="pr-part b" data-step="2">Method</div><div class="b" data-step="2">He built a labeling interface, trained himself, then labeled 1500 test images</div>
      <div class="pr-part b" data-step="3">Results</div><div class="b" data-step="3">His error was 5.1%, the network&rsquo;s 6.8% on the same images</div>
      <div class="pr-part b" data-step="4">Failure cases</div><div class="b" data-step="4">The network missed small or thin objects; he struggled with dog breeds</div>
    </div>
  </div>
  ${cite('Karpathy (2014). What I learned from competing against a ConvNet on ImageNet. Blog post.')}
`);

st(`
  <h1 class="t">Before Thursday</h1>
  <div class="pr-col">
    <ul class="pr-list">
      <li class="b"><b>Sign up for one slot</b><span class="pr-sub">In the sign-up doc</span></li>
      <li class="b"><b>Showing a demo? Record it</b><span class="pr-sub">A screen recording, in case the live demo fails</span></li>
      <li class="b"><b>Rehearse once with a timer</b></li>
      <li class="b"><b>Listen closely to the other talks</b><span class="pr-sub">Assignment 2 is about two of them</span></li>
      <li class="b"><b>Finish the write-up</b></li>
      <li class="b"><b>Hand in your slides, write-up and code</b><span class="pr-sub">Through the <a href="https://forms.gle/cNFBCB6xVkyc3eRG8" target="_blank">submission form</a>, by the last day</span></li>
    </ul>
  </div>
`);
}

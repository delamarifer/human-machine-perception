/* UNUSED (not in ORDER): the first discussion draft, course-linked prompts. Replaced on 2026-11-12 by discuss.js (Turing test to the mind). Kept to reuse. */
/* was: generative models and illusions, the Turing test, the Chinese room, Moravec's paradox, embodiment. Questions are (draft). */
{
section('Discussion');

st(`
  <h1 class="t">How we will discuss</h1>
  <div class="d8l-col">
    <ul class="d8l-list">
      <li class="b">Three rounds, ten minutes each</li>
      <li class="b">One minute to think alone</li>
      <li class="b">Three minutes with a neighbor</li>
      <li class="b">Then share with the room. There is no right answer.</li>
    </ul>
  </div>
`);

/* Round 1: seeing is guessing */
st(`
  <h1 class="t">Round 1 · Is seeing a guess?</h1>
  <div class="d8l-col">
    <div class="d8l-q b">Helmholtz: seeing is unconscious inference. A VAE encoder infers hidden causes from pixels. Is it seeing?</div>
    <ul class="d8l-more">
      <li class="b">Our priors come from a life. Its prior is a Gaussian and a dataset.</li>
      <li class="b">What would it need that it does not have?</li>
    </ul>
  </div>
  ${cite('Helmholtz, Handbuch der physiologischen Optik (1867)')}
`);

st(`
  <h1 class="t">Round 1 · Metamers</h1>
  <div class="d8l-col">
    <div class="d8l-q b">Two images look the same to a model and different to you. Who is wrong?</div>
    <ul class="d8l-more">
      <li class="b">Lab 2: you made metamers for models of seeing and hearing</li>
      <li class="b">Many model metamers look like noise to people</li>
      <li class="b">What would a metamer for a generative model be?</li>
    </ul>
  </div>
  ${cite('Feather et al., Model metamers reveal divergent invariances between biological and artificial neural networks, Nature Neuroscience (2023)')}
`);

/* Round 2: generating and understanding */
st(`
  <h1 class="t">Round 2 · To make is to understand?</h1>
  <div class="d8l-col">
    <div class="d8l-quote b">“What I cannot create, I do not understand.”</div>
    <div class="d8l-q b">A model generates a convincing face. Does it understand faces?</div>
    <ul class="d8l-more">
      <li class="b">Analysis by synthesis: perceive by generating guesses and checking them</li>
    </ul>
  </div>
  ${cite('Richard Feynman, on his blackboard (1988)')}
`);

st(`
  <h1 class="t">Round 2 · A Turing test for images</h1>
  <div class="d8l-col">
    <div class="d8l-q b">If people cannot tell generated photos from real ones, what has the model passed?</div>
    <ul class="d8l-more">
      <li class="b">Turing asked whether a machine can imitate. He did not ask whether it understands.</li>
      <li class="b">Generated images can test us: what do we notice, and what do we miss?</li>
    </ul>
  </div>
  ${cite('Turing, Computing Machinery and Intelligence, Mind (1950)')}
`);

/* Round 3: minds and bodies */
st(`
  <h1 class="t">Round 3 · The Chinese room</h1>
  <div class="d8l-col">
    <div class="d8l-q b">A person follows a rulebook to answer in Chinese, without knowing Chinese. Does the room understand?</div>
    <ul class="d8l-more">
      <li class="b">An autoregressive model follows learned rules for the next token</li>
      <li class="b">Is that the same room, or a different one?</li>
    </ul>
  </div>
  ${cite('Searle, Minds, Brains, and Programs, Behavioral and Brain Sciences (1980)')}
`);

st(`
  <h1 class="t">Round 3 · Moravec’s paradox</h1>
  <div class="d8l-col">
    <div class="d8l-q b">What is hard for us is easy for machines, and what is easy for us is hard.</div>
    <ul class="d8l-more">
      <li class="b">A computer beat the chess world champion in 1997. Folding laundry is still hard.</li>
      <li class="b">Which perception tasks from this course are still hard for models?</li>
    </ul>
  </div>
  ${cite('Moravec, Mind Children (1988)')}
`);

st(`
  <h1 class="t">Round 3 · Embodiment</h1>
  <div class="d8l-col">
    <div class="d8l-q b">A child learns depth by moving, reaching and falling. A model learns from photos. Can it learn the same world?</div>
    <ul class="d8l-more">
      <li class="b">Kittens carried around, without walking themselves, did not learn to guide their paws by sight</li>
      <li class="b">Coming up: robots that act, and see what their actions change</li>
    </ul>
  </div>
  ${cite('Held and Hein, Movement-produced stimulation in the development of visually guided behavior, J. Comp. Physiol. Psychol. (1963)')}
`);
}

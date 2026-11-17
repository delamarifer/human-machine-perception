/* PART: review (Day 13, owner: Shreya). Slide 1 of Shreya's outline: supervised, unsupervised, RL, with the apple
   examples from the MIT 6.S191 deep RL lecture (redrawn as text cards, not the screenshot). Her bullet:
   "RL: dynamic environment when we dont have this info" becomes the closing callout. No speaker notes. */
{
st(`
  <h1 class="t">Review: three ways to learn</h1>
  <div class="d13-col">
    <div class="d13-cards">
      <div class="d13-card b">
        <b>Supervised learning</b>
        <small>Data</small><span>${d13t('(x, y)')}: ${d13t('x')} is data, ${d13t('y')} is the label</span>
        <small>Goal</small><span>Learn a function that maps ${d13t('x \\to y')}</span>
        <span class="d13-eg">“This thing is an apple.”</span>
      </div>
      <div class="d13-card b">
        <b>Unsupervised learning</b>
        <small>Data</small><span>${d13t('x')}: data, no labels</span>
        <small>Goal</small><span>Learn the underlying structure</span>
        <span class="d13-eg">“This thing is like the other thing.”</span>
      </div>
      <div class="d13-card b">
        <b>Reinforcement learning</b>
        <small>Data</small><span>State–action pairs</span>
        <small>Goal</small><span>Maximize future rewards over many time steps</span>
        <span class="d13-eg">“Eat this thing because it will keep you alive.”</span>
      </div>
    </div>
    <div class="d13-callout b">Reinforcement learning: a changing world, and no labels that say what the right action is</div>
  </div>
  ${cite('After MIT 6.S191, Introduction to Deep Learning, lecture on deep reinforcement learning')}
`);
}

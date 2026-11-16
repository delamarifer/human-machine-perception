/* PART: agents (Day 11, owner: Shreya). Built 2026-11-15 from Shreya's Google Slides, slides 6-8:
   "What are examples of an embodied agent?" (physical vs virtual and interface; "[ insert photo examples ]"),
   her video slide (a Drive video, no title on the slide), "What are common problems?" (her six items and her closing line).
   Photos: Wikimedia Commons, licenses in the cite line. The virtual examples are figures from CC BY 4.0 papers (see below).
   No speaker notes. */
{
section('Embodied agents');

const D11_PHYS = [
  ['ex-roomba.jpg', 'A Roomba robot vacuum on a floor', 'A robot vacuum'],
  ['ex-spot.jpg', 'Boston Dynamics Spot, a four-legged robot', 'A legged robot'],
  ['ex-waymo.jpg', 'A Waymo self-driving car with sensors on the roof', 'A self-driving car'],
  ['ex-perseverance.jpg', 'The Perseverance rover on Mars, a selfie', 'A Mars rover'],
];

/* Virtual examples: real images (Shreya: "use real photos instead of these made up animations"), each a figure from a
   CC BY 4.0 paper on arXiv, cropped to one panel:
   sim: Makoviychuk et al., Isaac Gym, 2021 (arXiv 2108.10470), header figure, middle two columns.
   game: Fan et al., MineDojo, NeurIPS 2022 (arXiv 2206.08853), agent behavior figure, "shear a sheep", last frame
     (the agent's own view in Minecraft).
   computer: Xie et al., OSWorld, NeurIPS 2024 (arXiv 2404.07972), a screenshot of the desktop the agent controls.
   character: Peng et al., ASE, SIGGRAPH 2022 (arXiv 2205.01906), the simulated sword-and-shield character. */
const D11_VIRT = [
  ['ex-sim.jpg', 'Simulated robots: a humanoid, an arm, a legged robot and a hand, learning in a physics simulator', 'Robots in a simulator'],
  ['ex-game.jpg', 'The first-person view of an AI agent in Minecraft, shearing a sheep', 'An agent in a game world'],
  ['ex-computer.jpg', 'A computer desktop with an email app open: the screen an AI agent sees and controls', 'An agent that uses a computer'],
  ['ex-character.jpg', 'A simulated warrior character with a sword and shield, controlled by a learned policy', 'A simulated character'],
];

st(`
  <h1 class="t">What are examples of an embodied agent?</h1>
  <div class="d11-col">
    <div class="d11-kinds">
      <div class="d11-kind b" data-step="1"><h2>Physical (robotic) embodied agents</h2>
        <div class="d11-tiles">${D11_PHYS.map(([img, alt, cap]) => `
          <figure class="d11-tile"><img src="assets/${img}" alt="${alt}"><figcaption>${cap}</figcaption></figure>`).join('')}</div></div>
      <div class="d11-kind b" data-step="2"><h2>Virtual and interface embodied agents</h2>
        <div class="d11-tiles">${D11_VIRT.map(([img, alt, cap]) => `
          <figure class="d11-tile"><img src="assets/${img}" alt="${alt}"><figcaption>${cap}</figcaption></figure>`).join('')}</div></div>
    </div>
  </div>
  ${cite('Photos: Larry D. Moore (CC BY 4.0) · Jonte (CC BY-SA 4.0) · Dllu (CC BY 4.0) · NASA/JPL-Caltech/MSSS, via Wikimedia Commons. Virtual: Isaac Gym (Makoviychuk et al. 2021) · MineDojo (Fan et al. 2022) · OSWorld (Xie et al. 2024) · ASE (Peng et al. 2022), all CC BY 4.0')}
`);

/* Google slide 7: Shreya's Drive video (9ED16C18-....MP4, 14 MB, portrait 900 x 1600): a humanoid robot walking on a busy
   city sidewalk. Shreya: "its called rizzbot". Rizzbot ("Jake the Rizzbot") is a Unitree G1 humanoid in a cowboy hat that
   went viral in 2025 (Austin, Los Angeles, New York). Reports say a human operator nearby controls much of it (Spectrum News
   1 Texas, 2025-07-01; NBC, 2025-07; Unitree's own press release calls it a G1 "operated by users"). That makes it a test
   of slide 2's definition: who is making the decisions? Title and questions are drafts.
   The Drive player only plays for viewers signed in with access, unless the file is shared "anyone with the link". */
st(`
  <h1 class="t">Meet Rizzbot</h1>
  <div class="d11-col">
    <div class="d11-rizz">
      <div class="d11-video b" data-step="1"><iframe src="https://drive.google.com/file/d/1NqSyWv1mEJnL5OSuNrYRtzMkkHmRSkcI/preview" title="Rizzbot, a humanoid robot, walking on a city sidewalk" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
      <div class="d11-rizz-side">
        <div class="d11-q b" data-step="2">Is it an embodied agent?</div>
        <div class="d11-ans b" data-step="3">A Unitree G1 humanoid. Reports say a person nearby controls much of what it does.<br><b>Who is making the decisions?</b></div>
      </div>
    </div>
  </div>
  ${cite('Spectrum News 1 Texas (2025) · NBC (2025) · Unitree press release')}
`);

/* Google slide 8, her items in her order; short names on top, her words underneath. Item 3 had no name in her slide. */
const D11_PROBS = [
  ['Environment state estimation', 'Maybe 3D, figure out how heavy an object is, etc.'],
  ['My own state estimation', 'Where am I, what pose is my body in'],
  ['Configuration', 'Being aware of your configuration relevant to the environment'],
  ['Simulation', 'What will happen next'],
  ['Planning', 'What actions do I have to accomplish'],
  ['Control', 'Given intended trajectory and initial action, how do I follow the intended trajectory'],
];
st(`
  <h1 class="t">What are common problems?</h1>
  <div class="d11-col">
    <div class="d11-probs">
      ${D11_PROBS.map(([name, text], k) => `
        <div class="d11-prob b"><small>${k + 1}</small><b>${name}</b><span>${text}</span></div>`).join('')}
    </div>
    <div class="d11-take b">Closely related to vision / perception problems!</div>
  </div>
`);
}

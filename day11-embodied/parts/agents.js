/* PART: agents (Day 11, owner: Shreya). Built 2026-11-15 from Shreya's Google Slides, slides 6-8:
   "What are examples of an embodied agent?" (physical vs virtual and interface; "[ insert photo examples ]"),
   her video slide (a Drive video, no title on the slide), "What are common problems?" (her six items and her closing line).
   Photos: Wikimedia Commons, licenses in the cite line. The virtual examples are simple drawings made for this deck.
   No speaker notes. */
{
section('Embodied agents');

const D11_PHYS = [
  ['ex-roomba.jpg', 'A Roomba robot vacuum on a floor', 'A robot vacuum'],
  ['ex-spot.jpg', 'Boston Dynamics Spot, a four-legged robot', 'A legged robot'],
  ['ex-waymo.jpg', 'A Waymo self-driving car with sensors on the roof', 'A self-driving car'],
  ['ex-perseverance.jpg', 'The Perseverance rover on Mars, a selfie', 'A Mars rover'],
];

/* Drawings for the virtual examples (no photo needed): ink lines on a light panel. */
const D11_SVG = {
  sim: `<svg viewBox="0 0 160 120" role="img" aria-label="A drawing of a stick-figure robot walking on a grid floor in a simulator">
    <rect width="160" height="120" fill="#f1f5f9"/>
    <g stroke="#cbd5e1" stroke-width="1">${[0,1,2,3,4,5].map(i => `<line x1="${10+i*28}" y1="96" x2="${-20+i*40}" y2="120"/>`).join('')}<line x1="0" y1="96" x2="160" y2="96"/><line x1="0" y1="106" x2="160" y2="106"/></g>
    <g stroke="#0f172a" stroke-width="3" stroke-linecap="round" fill="none">
      <circle cx="80" cy="30" r="9" fill="#fff"/><line x1="80" y1="39" x2="80" y2="66"/>
      <line x1="80" y1="47" x2="66" y2="58"/><line x1="80" y1="47" x2="95" y2="55"/>
      <line x1="80" y1="66" x2="70" y2="94"/><line x1="80" y1="66" x2="92" y2="92"/></g>
    <text x="8" y="16" font-size="9" fill="#64748b" font-family="sans-serif">physics simulator</text></svg>`,
  game: `<svg viewBox="0 0 160 120" role="img" aria-label="A drawing of a block-world game: an agent, a tree and a goal flag">
    <rect width="160" height="120" fill="#f1f5f9"/>
    <g fill="#cbd5e1">${[0,1,2,3,4,5,6,7].map(i => `<rect x="${i*20}" y="96" width="19" height="24"/>`).join('')}</g>
    <rect x="30" y="66" width="14" height="14" fill="#0f172a"/><rect x="30" y="80" width="14" height="16" fill="#334155"/>
    <rect x="72" y="76" width="6" height="20" fill="#64748b"/><rect x="62" y="58" width="26" height="20" fill="#94a3b8"/>
    <line x1="128" y1="56" x2="128" y2="96" stroke="#0f172a" stroke-width="3"/><path d="M128 56 L146 63 L128 70 Z" fill="#0f172a"/>
    <text x="8" y="16" font-size="9" fill="#64748b" font-family="sans-serif">game world</text></svg>`,
  web: `<svg viewBox="0 0 160 120" role="img" aria-label="A drawing of a browser window with a cursor clicking a button">
    <rect width="160" height="120" fill="#f1f5f9"/>
    <rect x="18" y="16" width="124" height="88" rx="6" fill="#fff" stroke="#0f172a" stroke-width="2.5"/>
    <line x1="18" y1="30" x2="142" y2="30" stroke="#0f172a" stroke-width="2"/>
    <circle cx="27" cy="23" r="2.5" fill="#0f172a"/><circle cx="35" cy="23" r="2.5" fill="#0f172a"/>
    <g fill="#cbd5e1"><rect x="28" y="40" width="80" height="6" rx="3"/><rect x="28" y="52" width="100" height="6" rx="3"/><rect x="28" y="64" width="60" height="6" rx="3"/></g>
    <rect x="28" y="80" width="40" height="14" rx="4" fill="#0f172a"/>
    <path d="M60 86 L60 104 L65 99 L69 108 L73 106 L69 97 L76 97 Z" fill="#fff" stroke="#0f172a" stroke-width="2" stroke-linejoin="round"/></svg>`,
  avatar: `<svg viewBox="0 0 160 120" role="img" aria-label="A drawing of a virtual character on a screen with a speech bubble">
    <rect width="160" height="120" fill="#f1f5f9"/>
    <rect x="20" y="20" width="76" height="84" rx="6" fill="#fff" stroke="#0f172a" stroke-width="2.5"/>
    <circle cx="58" cy="52" r="14" fill="none" stroke="#0f172a" stroke-width="3"/>
    <path d="M36 98 Q58 70 80 98" fill="none" stroke="#0f172a" stroke-width="3"/>
    <circle cx="53" cy="50" r="2" fill="#0f172a"/><circle cx="63" cy="50" r="2" fill="#0f172a"/>
    <path d="M104 28 h44 a6 6 0 0 1 6 6 v20 a6 6 0 0 1 -6 6 h-30 l-10 9 v-9 h-4 a6 6 0 0 1 -6 -6 v-20 a6 6 0 0 1 6 -6 z" fill="#fff" stroke="#0f172a" stroke-width="2.5"/>
    <g fill="#cbd5e1"><rect x="108" y="36" width="34" height="5" rx="2.5"/><rect x="108" y="46" width="24" height="5" rx="2.5"/></g></svg>`,
};
const D11_VIRT = [['sim', 'A robot in a simulator'], ['game', 'An agent in a game world'], ['web', 'An agent that uses a computer'], ['avatar', 'A virtual character']];

st(`
  <h1 class="t">What are examples of an embodied agent?</h1>
  <div class="d11-col">
    <div class="d11-kinds">
      <div class="d11-kind b" data-step="1"><h2>Physical (robotic) embodied agents</h2>
        <div class="d11-tiles">${D11_PHYS.map(([img, alt, cap]) => `
          <figure class="d11-tile"><img src="assets/${img}" alt="${alt}"><figcaption>${cap}</figcaption></figure>`).join('')}</div></div>
      <div class="d11-kind b" data-step="2"><h2>Virtual and interface embodied agents</h2>
        <div class="d11-tiles">${D11_VIRT.map(([k, cap]) => `
          <figure class="d11-tile">${D11_SVG[k]}<figcaption>${cap}</figcaption></figure>`).join('')}</div></div>
    </div>
  </div>
  ${cite('Photos: Larry D. Moore (CC BY 4.0) · Jonte (CC BY-SA 4.0) · Dllu (CC BY 4.0) · NASA/JPL-Caltech/MSSS, via Wikimedia Commons')}
`);

/* Google slide 7: Shreya's Drive video (9ED16C18-....MP4, 14 MB). The Google slide has no title: "Watch" is a placeholder.
   The Drive player only plays for viewers signed in with access, unless the file is shared "anyone with the link". */
st(`
  <h1 class="t">Watch</h1>
  <div class="d11-col">
    <div class="d11-video b"><iframe src="https://drive.google.com/file/d/1NqSyWv1mEJnL5OSuNrYRtzMkkHmRSkcI/preview" title="Video from the Day 11 slides" allow="autoplay; fullscreen" allowfullscreen></iframe></div>
  </div>
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

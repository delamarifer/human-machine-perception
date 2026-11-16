/* PART: tedrake (Day 11, owner: Shreya). Added 2026-11-16 at Shreya's request: "a segment on Tedrake and the dual
   academic and industry partnership ... something the students are interested in eventually getting to and knowing how".
   Sources (read 2026-11-16):
   - His MIT page, groups.csail.mit.edu/locomotion/russt.html: Toyota Professor of EECS, Aero/Astro, MechE; "spent 10 years
     as the Senior Vice President of Robotics Research and Large Behavior Models at the Toyota Research Institute"; now
     "leading a stealth startup in physical AI"; B.S.E. Computer Engineering, Michigan 1999; Ph.D. EECS, MIT 2004 with
     Sebastian Seung; postdoc in MIT Brain and Cognitive Sciences; time at Microsoft, Microsoft Research and the Santa Fe
     Institute during his education; teaches 6.8210 Underactuated Robotics and 6.4210 Robotic Manipulation (notes and video
     lectures online); Drake.
   - Drake: started by Tedrake and the Robot Locomotion Group at MIT (from 2005, MIT CSAIL case study) and the Robotics
     Division at TRI (drake.mit.edu credits); core development led by TRI; BSD license.
   - Diffusion Policy (Chi et al.; arXiv 2303.04137): authors include Russ Tedrake; Columbia, TRI and MIT.
   - TRI press release, 2025-08-20: Boston Dynamics and TRI partnership from October 2024; a Large Behavior Model controls
     the whole Atlas humanoid; co-led by Scott Kuindersma and Russ Tedrake; skills "added quickly via demonstrations".
   Placed after the MIT labs part (Shreya, 2026-11-16: it introduces the people and tools that come later).
   Titles and the closing question are drafts. No speaker notes. */
{
section('Academia and industry');

st(`
  <h1 class="t">One person, two worlds: Russ Tedrake</h1>
  <div class="d11-col">
    <div class="d11-ted2">
      <div class="d11-tedside b" data-step="1"><small>Academia</small><b>MIT professor</b>
        <ul>
          <li>Electrical engineering and computer science, aero/astro, mechanical engineering</li>
          <li>Leads the Robot Locomotion Group (on our MIT labs slide)</li>
          <li>Teaches Underactuated Robotics and Robotic Manipulation: notes and lectures free online</li>
        </ul></div>
      <div class="d11-tedside b" data-step="2"><small>Industry</small><b>10 years at Toyota Research Institute</b>
        <ul>
          <li>Senior vice president of Robotics Research and Large Behavior Models</li>
          <li>Now leading a startup in physical AI</li>
        </ul></div>
    </div>
    <div class="d11-callout b" data-step="3">Both at the same time: a lab that asks questions, and a company that builds at scale</div>
  </div>
  ${cite('Russ Tedrake’s MIT page (groups.csail.mit.edu/locomotion), read Nov 2026')}
`);

/* How the two sides feed each other: three real examples, one per click. */
const D11_TED = [
  ['Software', 'Drake', 'A robot simulator started in his MIT group in 2005. Toyota Research Institute now leads its development, and it is free and open source.'],
  ['Research', 'Diffusion Policy', 'The way of learning from demonstrations we just saw: written by researchers at Columbia, Toyota Research Institute and MIT, Tedrake among them.'],
  ['Robots', 'Atlas learns from demonstrations', 'Boston Dynamics and Toyota Research Institute, partners since 2024: one Large Behavior Model controls the whole humanoid, and new skills come from human demonstrations.'],
];
st(`
  <h1 class="t">How the two sides feed each other</h1>
  <div class="d11-col">
    <div class="d11-tedflow">
      ${D11_TED.map(([kind, name, text]) => `
        <div class="d11-tedcard b"><small>${kind}</small><b>${name}</b><span>${text}</span></div>`).join('')}
    </div>
    <div class="d11-callout b">Ideas start in the lab, industry gives them data, robots and engineers, and the tools come back to everyone</div>
  </div>
  ${cite('drake.mit.edu · Chi et al., Diffusion Policy (arXiv 2303.04137) · Toyota Research Institute press release, 20 Aug 2025')}
`);

/* His path, from his own biography. */
const D11_PATH = [
  ['1999', 'B.S.E. in computer engineering', 'University of Michigan'],
  ['', 'Time at Microsoft, Microsoft Research and the Santa Fe Institute', 'during his studies'],
  ['2004', 'Ph.D. at MIT', 'with Sebastian Seung, a neuroscientist'],
  ['', 'Postdoc in Brain and Cognitive Sciences', 'MIT'],
  ['', 'MIT faculty, then also Toyota Research Institute', '10 years in both'],
];
st(`
  <h1 class="t">How did he get there?</h1>
  <div class="d11-col">
    <div class="d11-tedpath">
      ${D11_PATH.map(([yr, what, where]) => `
        <div class="d11-tedstep b"><i>${yr}</i><b>${what}</b><small>${where}</small></div>`).join('')}
    </div>
    <div class="d11-take b">You can start today: his course notes, lectures and the Drake simulator are all free online</div>
  </div>
  ${cite('Russ Tedrake’s MIT page: biography · underactuated.mit.edu · manipulation.mit.edu · drake.mit.edu')}
`);
}

/* PART: roles (Day 12, owner: Shreya). Built 2026-11-18. Six industry roles placed between new knowledge and a working
   product, then how to start. Role descriptions are general (titles and duties vary by company), not data.
   No speaker notes. */
{
section('Roles');

const D12_ROLES = [
  ['Research scientist', 'New methods and papers', 'Research taste, maths, careful experiments'],
  ['Research engineer', 'The code and infrastructure behind research at scale', 'Software, training large models'],
  ['Applied scientist', 'Research adapted to one product problem', 'Modelling, evaluation, the domain'],
  ['ML engineer', 'Models in production: pipelines, serving, monitoring', 'Software engineering, MLOps'],
  ['Computer vision engineer', 'Vision features that ship: detection, tracking, calibration', 'Cameras, geometry, real-time code'],
  ['Robotics engineer', 'Robots that work: perception, planning, control on hardware', 'Control, kinematics, systems'],
];
st(`
  <h1 class="t">Six roles, from research to product</h1>
  <div class="d12-col">
    <div class="d12-axis b"><span>New knowledge</span><i></i><span>A working product</span></div>
    <div class="d12-roles">
      ${D12_ROLES.map(([t, out, sk]) => `
        <div class="d12-role b"><b>${t}</b><small>Makes</small><span>${out}</span><small>Needs</small><span>${sk}</span></div>`).join('')}
    </div>
  </div>
`);

d12Bul('How to start from here', [
  '<b>Reproduce a paper</b> from this course, then change one thing',
  '<b>Contribute to open source:</b> PyTorch, Hugging Face, Drake',
  '<b>Do an internship:</b> the fastest way to see industry from the inside',
  '<b>Show your work:</b> GitHub, a short write-up, a poster at Deep Learning Indaba',
]);
}

/* PART: open (Day 12, owner: Shreya). Built 2026-11-18. Open research questions, opportunities, and the closing
   discussion, which returns to the opening question.
   Sources: DeVries, Misra, Wang and van der Maaten, "Does Object Recognition Work for Everyone?", CVPR Workshops 2019
   (arXiv 1906.02659, read 2026-11-18): systems perform relatively poorly on household items common in countries with
   low household income. Lam et al., "Learning skillful medium-range global weather forecasting", Science 2023
   (GraphCast). Nearing et al., "Global prediction of extreme floods in ungauged watersheds", Nature 2024. Beede et al.,
   CHI 2020. Walden LBM 2.0 (Nov 2026). Masakhane (masakhane.io). No speaker notes. */
{
section('Open questions');

d12Bul('Open research questions', [
  '<b>Robustness:</b> models break when lighting, cameras or places change',
  '<b>Data for robots:</b> there is no internet-scale dataset of actions',
  '<b>Honest evaluation:</b> few trials, wide error bars, numbers reported by the companies themselves',
  '<b>Simulation to reality:</b> what works in a simulator often fails on hardware',
  '<b>Works for everyone?</b> Object recognition does worse on household items common in low-income countries',
], null, 'DeVries et al., “Does Object Recognition Work for Everyone?”, CVPR Workshops 2019');

d12Bul('Where the opportunities are', [
  '<b>Healthcare:</b> screening where specialists are scarce',
  '<b>Climate and weather:</b> ML weather forecasts; flood warnings where river gauges are scarce',
  '<b>Manufacturing and logistics:</b> robots that learn on the job',
  '<b>Language:</b> technology for African languages',
], null,
'Beede et al., CHI 2020 · Lam et al., Science 2023 · Nearing et al., Nature 2024 · Walden, LBM 2.0 · masakhane.io');

d12Bul('Discussion', [
  'What does research mean to you now?',
  'Where would you want to do it: a university, a lab, a startup, a company?',
  'Pick a model from this course: what would break first in deployment?',
]);
}

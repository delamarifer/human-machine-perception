/* PART: domains (Day 4). Owner: Fernanda · Shreya.
   Section 7, 10 min: convolution beyond photographs. CT (assets/unet), Sentinel-2 (assets/photos),
   a spectrogram (assets/audio, synthetic) and a time series (synthetic, drawn here). */
{
section('7. Domains');

/* a synthetic ECG-like trace: a beat every 0.8 s, one early beat (the anomaly to find) */
const ecg = (() => {
  const pts = [], beats = [0.3, 1.1, 1.9, 2.45, 3.5, 4.3];
  for(let i = 0; i <= 500; i++){
    const t = i / 100; let v = 0.03 * Math.sin(2 * Math.PI * 0.3 * t);
    beats.forEach(b => { const d = t - b;
      v += 0.12 * Math.exp(-((d + 0.16) ** 2) / 0.0008) + Math.exp(-(d ** 2) / 0.00009) - 0.22 * Math.exp(-((d - 0.03) ** 2) / 0.0002) + 0.25 * Math.exp(-((d - 0.25) ** 2) / 0.003); });
    pts.push(`${(i / 500 * 600).toFixed(1)},${(120 - v * 85).toFixed(1)}`);
  }
  return `<svg viewBox="0 0 600 150" style="width:100%;aspect-ratio:4/3;background:#f8fafc;border-radius:8px" preserveAspectRatio="none">
    <rect x="${2.3 / 5 * 600}" y="4" width="${0.4 / 5 * 600}" height="142" fill="rgba(217,119,6,.18)"/>
    <polyline points="${pts.join(' ')}" fill="none" stroke="#0f172a" stroke-width="2"/></svg>`;
})();

const tile = (img, name, task, change, step) => `<div class="d4-card b" data-step="${step}">
  ${img}<h3 style="margin-top:.6vh">${name}</h3><div class="label">${task}</div><div class="label" style="color:var(--mute)">${change}</div></div>`;
const im = src => `<img src="${A}${src}" alt="" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:8px">`;

st(`
  <h1 class="t">Is there local structure that repeats? Then convolution fits.</h1>
  <div class="d4-grid4">
    ${tile(im('unet/ct-slice.png'), 'Medical', 'organs, tumours; parasites in blood smears', '3D convolutions, small labelled sets, costly errors', 1)}
    ${tile(im('photos/cairo-sentinel2.jpg'), 'Satellite', 'land cover, crops, buildings, floods', 'more than 3 channels; no “up”, so rotate freely', 2)}
    ${tile(im('audio/spectrogram.png'), 'Audio', 'speech, bird and animal calls, machine sounds', 'axes differ: a time shift keeps meaning, a pitch shift changes it', 3)}
    ${tile(ecg, 'Time series', 'arrhythmia (an early beat, shaded), sensor anomalies', '1D convolutions over time; dilated for long ranges', 4)}
  </div>
  ${cite('Sentinel-2A image of Cairo: ESA, CC BY-SA 3.0 IGO · CT: Medical Segmentation Decathlon · spectrogram and ECG trace: synthetic, made for this deck')}
`, { notes: [
  "Convolution is not only for photographs. The test for each domain is the one from Section 2: is there local structure that repeats across positions? If yes, locality and weight sharing are reasonable assumptions.",
  "Medical imaging: CT and MRI are 3D, so we use 3D convolutions, as the spleen U-Net did. Microscopy too: detecting malaria parasites in blood-smear images is a well-studied CNN application. Labelled data is scarce and errors are costly.",
  "Satellite imagery: this is Sentinel-2 over Cairo and the Nile. Tasks include land cover, crop type, building footprints, flood mapping. Two differences: Sentinel-2 records 13 spectral bands, not 3, so the first layer takes more channels; and there is no up in an image from above, so rotating training images is a free augmentation.",
  "Audio: a spectrogram is an image of time against frequency, so image CNNs work on it. But the axes mean different things. Shifting a sound in time keeps its meaning; shifting it up in frequency changes the pitch. So full weight sharing along the frequency axis is a questionable assumption.",
  "Time series: an ECG is a 1D signal, so we slide 1D filters along time. Here, a synthetic trace with one early beat shaded: the kind of local pattern a 1D CNN can learn to flag. Dilated convolutions reach long time ranges cheaply."
]});

st(`
  <div class="center" style="max-width:66vw">
    <div class="label" style="color:var(--mute)">Pairs, 2 minutes</div>
    <div class="question" style="margin-top:2vh">For your project: what is the “pixel”, what is the “neighbourhood”, and is weight sharing justified?</div>
  </div>
`, { notes: "Two minutes with your neighbour. Think about the data in your project. What is the basic unit, the pixel? What counts as a neighbourhood? And would a pattern that matters in one place matter just as much everywhere else? If not, which part of the CNN recipe would you change?" });
}

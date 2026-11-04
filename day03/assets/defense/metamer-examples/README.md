# Metamer examples (shared by ch1-adv-vulnerability and ch1-adv-training)

Real stimuli from Feather et al. (2023), *Nature Neuroscience*, "Model metamers reveal divergent invariances
between biological and artificial neural networks". No synthesis here: the files are downloaded as published.

**Audio, experiment 7** (CochResNet50 with cochleagram adversarial training; Fer's robust network is
`cochresnet50_l2_1_robust_cochleagram`), example index 0, 2 s at 20 kHz. Source (the lab's MTurk stimulus
server, used by the paper's code, github.com/jenellefeather/model_metamers_pytorch,
notebooks/notebook_helpers.py + model_analysis_folders/all_model_info.py):
https://mcdermottlab.mit.edu/mturk_stimuli/audio_word_rec_metamers/experiment7_audio/
- `feather2023-audio-ex0-original.wav` ← `0_orig/0_orig/0_orig_orig.wav`
- `…-standard-layer4.wav` ← `1_cochresnet50/5_layer4_fake_relu/0_cochresnet50_layer4_fake_relu.wav`
- `…-standard-final.wav` ← `1_cochresnet50/7_final/0_cochresnet50_final.wav`
- `…-robust-layer4.wav` ← `2_cochresnet50_l2_1_robust_cochleagram/5_layer4_fake_relu/0_cochresnet50_l2_1_robust_cochleagram_layer4_fake_relu.wav`
- `…-robust-final.wav` ← `2_cochresnet50_l2_1_robust_cochleagram/7_final/0_cochresnet50_l2_1_robust_cochleagram_final.wav`
- `*-coch.png`: cochleagrams of these files, drawn with the paper's code
  (~/Developer/figures/final/fig1_approach/cochleagram.py; 38 ERB filters, 50–8000 Hz, magma),
  all five on ONE shared colour scale so they can be compared.
The word spoken is not in the published metadata, so don't label it on screen.
`_candidates/` holds examples 0–5 that were considered (example 0 chosen: clean speech; the standard
layer4 metamer looks noise-like; the robust layer4 metamer keeps the speech structure).

**Images:** ch1-adv-vulnerability uses Feather et al. (2023) Fig. 2e crops (ResNet50, natural image and
layer4 metamer), in `../feather2023-met-img-{natural,layer4,final}.png`. The robust visual metamers for the
same dog are in Fig. 5d of the paper (not cropped here).

**Images, robust comparison (added by ch1-adv-training, 2026-10-12).** The Fig. 2e dog is also in the
paper's ResNet50 adversarial-training experiment (repo "Visual Experiment 7", Fig. 4), as example 257
(pixel correlation with the Fig. 2e crop 0.97), so slide 5 shows the SAME dog as slide 4. Source:
https://mcdermottlab.mit.edu/mturk_stimuli/imagerec_robust_models_v1/experiment3_images/
- `feather2023-img-ex257-original.png` ← `0_orig/0_orig/257_orig_orig.png`
- `feather2023-img-ex257-standard-layer4.png` ← `1_resnet50/4_layer4_fake_relu/257_resnet50_layer4_fake_relu.png`
- `feather2023-img-ex257-robust-layer4.png` ← `2_resnet50_l2_3_robust/4_layer4_fake_relu/257_resnet50_l2_3_robust_layer4_fake_relu.png` (L2, ε = 3)
Slide 5 uses these three, plus audio example 0 (original, standard layer4, robust layer4) above.

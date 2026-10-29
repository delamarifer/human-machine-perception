# Day 2 image sources and model outputs

Every image here has a known source and license, and every number on a slide comes from
`result.json` next to it. `pipeline.py` regenerates them (scratch env: torch 2.15.0,
torchvision 0.29.2, transformers 5.21.0, opencv 5.0.0; run on CPU on 2026-10-28):

    python pipeline.py <photo.jpg> <out_dir>

It does exactly what the Day 2 scene shows: OpenCV load, BGR to RGB, center square crop, resize to
224 x 224; torchvision ResNet-18 (`ResNet18_Weights.IMAGENET1K_V1`) top-5 on the crop; the Hugging Face
`depth-estimation` pipeline with `depth-anything/Depth-Anything-V2-Small-hf` on the crop
(brighter = nearer). `photo.jpg` is the 1280 px wide Wikimedia thumbnail; `crop.jpg` is the crop.

## one-photo/ (the spine of the lecture)
- "Warm cup of coffee on a table at a cafe" by Shixart1985, CC BY 2.0,
  https://commons.wikimedia.org/wiki/File:Warm_cup_of_coffee_on_a_table_at_a_cafe.jpg
  Changes: resized, cropped. Top-5: espresso 85.9%, cup 9.4%, coffee mug 2.9%, eggnog 1.1%, soup bowl 0.3%.

## human-vs-machine/
- "Elephant bronze sculpture" by Carlos Valenzuela, CC BY-SA 4.0,
  https://commons.wikimedia.org/wiki/File:Elephant_bronze_sculpture.jpg
  Changes: resized, cropped. Top-5: triceratops 28.7%, cowboy boot 26.6%, shield 5.8%, chain mail 4.4%,
  cuirass 2.6%. The elephant classes rank 9th (Indian elephant, 1.3%), 11th (African elephant, 1.2%)
  and 25th (tusker, 0.4%).
  Chosen from eight Commons photos as one this model gets wrong (selection, not a random sample).

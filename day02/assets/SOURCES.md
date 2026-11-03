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

## cube/ (section 2 of the lab; not used on the slides)
- "Rubik's Cube" by William Warby, CC BY 2.0,
  https://commons.wikimedia.org/wiki/File:Rubiks_Cube_(11913436786).jpg
  `photo.jpg` is the 960px Wikimedia thumbnail. No other edits. The notebook downloads that same thumbnail.

## human-vs-machine/
- "Elephant bronze sculpture" by Carlos Valenzuela, CC BY-SA 4.0,
  https://commons.wikimedia.org/wiki/File:Elephant_bronze_sculpture.jpg
  Changes: resized, cropped. Top-5: triceratops 28.7%, cowboy boot 26.6%, shield 5.8%, chain mail 4.4%,
  cuirass 2.6%. The elephant classes rank 9th (Indian elephant, 1.3%), 11th (African elephant, 1.2%)
  and 25th (tusker, 0.4%).
  Chosen from eight Commons photos as one this model gets wrong (selection, not a random sample).

## simple-system/
Made by running the code cells of `notebooks/day01-lab-simple-vision-system.ipynb` (its solved build,
`python notebooks/build/day01_lab.py --solved`) on 2026-11-02, NumPy 2.5.4, SciPy 1.18.1:
- `world.png`: section 1, the rendered box world.
- `recovered-front.png`, `recovered-behind.png`: section 6, the recovered heights Y and depths Z, every pixel
  drawn at its 3D position in its own color (the notebook's `show_3d`, but with every floor pixel and no axes),
  seen from near the camera (azim 100, elev 28) and from the far side (azim -90, elev 35). The white regions in
  the far-side view are floor the boxes hid from the camera; nothing was recovered there. Printed by the same run:
  "tallest box: true height 70.0, recovered 68.6"; "typical error on the boxes: 2.9 units"; 45046 equations,
  33000 unknowns.
- `floating-box.png`: section 7, a box 35 units in the air: input, recovered height, true height.
- `gray.png`, `dx.png`, `edge-pixels.png` (sections 2–3) and `figure-ground.png`, `contact-occlusion.png`,
  `vertical-horizontal.png` (sections 4–5): the notebook's own figures, unchanged, from a later run of the same
  solved build (same NumPy and SciPy, Matplotlib 3.11.2, Agg backend, 150 dpi): its code cells executed in order,
  each `plt.show()` saved as it came. Grayscale; horizontal derivative (RdBu, ±0.3); edge pixels (strength > 0.03);
  figure/ground mask (saturation > 0.15); occlusion (orange) and contact (teal) edges; vertical (red) and
  horizontal (blue) 3D edges. Each cropped to its non-white pixels plus 12 px, detected from the pixels.
  The same run printed 45046 equations for 33000 unknowns and "tallest box: true height 70.0, recovered 68.6".

## shuffle/ (texture or shape)
Made by `shuffle.py` on 2026-11-02 (torch 2.15.0, torchvision 0.29.2, opencv 5.0.0) from the same two Commons photos
(1280 px thumbnails, re-downloaded), with the same OpenCV crop as `pipeline.py`, so "intact" matches the slides.
Shuffled = the 224 x 224 crop cut into a 4 x 4 or 8 x 8 grid, tiles permuted with seed 0. Changes to the photos:
resized, cropped, tiles shuffled (credits as above: Shixart1985, CC BY 2.0; Carlos Valenzuela, CC BY-SA 4.0).
- Coffee: intact espresso 85.9%; 4 x 4 toilet tissue 30.5% (espresso 4th, 7.5%); 8 x 8 wardrobe 14.2% (espresso 326th).
- Elephant: intact triceratops 28.7%; 4 x 4 sock 40.7%, cowboy boot 24.1%; 8 x 8 wine bottle 24.0%, barrel, quilt.
Two photos, one seed: a probe for class, not a measurement.

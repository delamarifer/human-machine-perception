# Day 4 image sources and model outputs

Every photo here has a known source and license, and every number on a slide comes from `result.json`
(the deck reads the same values from `result.js`). `pipeline.py` regenerates all of it. It was run on CPU on
2026-11-03 in a scratch env: torch 2.15.0, torchvision 0.29.2, ultralytics 8.4.201, monai 1.6.1.

    python pipeline.py --bundle <dir with spleen_ct_segmentation> --spleen <Task09_Spleen>

The bundle comes from `monai.bundle.download(name="spleen_ct_segmentation", bundle_dir=<dir>)` (version 0.6.1).
`Task09_Spleen` is the Medical Segmentation Decathlon spleen set (CC BY-SA 4.0),
https://msd-for-monai.s3-us-west-2.amazonaws.com/Task09_Spleen.tar (1.5 GB; not kept in this repo).

## photos/ (Wikimedia Commons 1280 px thumbnails, no other edits)

| file | Commons file | author | license |
|---|---|---|---|
| `street.jpg` (the running example) | [Tom Mboya Street, 2025 (03).jpg](https://commons.wikimedia.org/wiki/File:Tom_Mboya_Street,_2025_(03).jpg) | Bahnfrend | CC BY-SA 4.0 |
| `nairobi-tom-mboya.jpg` | [Tom Mboya Street, 2025 (01).jpg](https://commons.wikimedia.org/wiki/File:Tom_Mboya_Street,_2025_(01).jpg) | Bahnfrend | CC BY-SA 4.0 |
| `nairobi-moi-avenue.jpg` | [Moi Avenue (Nairobi), 2025 (02).jpg](https://commons.wikimedia.org/wiki/File:Moi_Avenue_(Nairobi),_2025_(02).jpg) | Bahnfrend | CC BY-SA 4.0 |
| `nairobi-koinange.jpg` | [Koinange Street, 2025 (02).jpg](https://commons.wikimedia.org/wiki/File:Koinange_Street,_2025_(02).jpg) | Bahnfrend | CC BY-SA 4.0 |
| `accra-taxi.jpg` | [Accra Traffic (3587916998).jpg](https://commons.wikimedia.org/wiki/File:Accra_Traffic_(3587916998).jpg) | Francisco Anzola | CC BY 2.0 |
| `accra-street.jpg` | [Streets of Accra.jpg](https://commons.wikimedia.org/wiki/File:Streets_of_Accra.jpg) | Enyonamakwetea | CC BY-SA 4.0 |
| `accra-traffic.jpg` | [Traffic, Accra (P1090903).jpg](https://commons.wikimedia.org/wiki/File:Traffic,_Accra_(P1090903).jpg) | Matti Blume | CC BY-SA 4.0 |
| `kampala-pipes.jpg` | [Kampala 2009-08-27 10-29-48.JPG](https://commons.wikimedia.org/wiki/File:Kampala_2009-08-27_10-29-48.JPG) | Simisa | CC BY-SA 3.0 |
| `kampala-road.jpg` | [Transport in Kampala 07.jpg](https://commons.wikimedia.org/wiki/File:Transport_in_Kampala_07.jpg) | Douglaseru | CC BY-SA 4.0 |
| `kampala-boda.jpg` | [Motorcycle Transportation in a busy Kampala Street.jpg](https://commons.wikimedia.org/wiki/File:Motorcycle_Transportation_in_a_busy_Kampala_Street.jpg) | ObbyK | CC BY-SA 4.0 |
| `goats.jpg` | [Goats feeding on leaves in the bush in Kuria East Kenya.jpg](https://commons.wikimedia.org/wiki/File:Goats_feeding_on_leaves_in_the_bush_in_Kuria_East_Kenya.jpg) | Elite Jac | CC BY-SA 4.0 |
| `bananas.jpg` | [DFC 4184 Bunches of ripe bananas … market stall ….jpg](https://commons.wikimedia.org/wiki/File:DFC_4184_Bunches_of_ripe_bananas_neatly_arranged_at_a_bustling_market_stall_ready_for_shoppers.jpg) | PattayaPatrol | CC BY-SA 4.0 |
| `dhow.jpg` | [Dhow boat Zanzibar.jpg](https://commons.wikimedia.org/wiki/File:Dhow_boat_Zanzibar.jpg) | Anton Zelenov | CC BY-SA 3.0 |
| `cairo-sentinel2.jpg` (Section 7 only) | [Cairo, Egypt ESA349457.jpg](https://commons.wikimedia.org/wiki/File:Cairo,_Egypt_ESA349457.jpg), Sentinel-2A, 13 August | European Space Agency (contains modified Copernicus Sentinel data) | CC BY-SA 3.0 IGO |
| `coffee.jpg`, `elephant.jpg`, `cube.jpg` | copied from Day 2 (`day02/assets/`, see its SOURCES.md) | Shixart1985 · Carlos Valenzuela · William Warby | CC BY 2.0 · CC BY-SA 4.0 · CC BY 2.0 |

The street photos were chosen from 12 Commons search results (Nairobi, Accra, Kampala, Cape Town) for
having buses, cars, motorbikes, people and buildings in one frame. Selection, not a random sample.
`photos/sources.json` keeps the full Commons metadata.

## What each folder is

- `resnet/`: torchvision ResNet-18, `ResNet18_Weights.IMAGENET1K_V1`, with its own transforms (resize 256,
  center crop 224). `street-crop.jpg` is that crop. `street-permuted.png` is the crop with one fixed random
  pixel permutation (seed 0). `conv1-learned.png` / `conv1-random.png` are the 64 first-layer 7×7×3 filters,
  each scaled to its own range, trained and at random init (`torch.manual_seed(0)`). `fm-<stage>.png` are the
  4 channels with the highest mean activation at each stage for the street crop, each scaled to its own range,
  magma colormap, nearest-neighbor upscaling. Receptive fields in `result.json` are theoretical (main path).
- `search/`: thumbnails of the 15-image gallery. Ranking = cosine similarity of 512-d ResNet-18 embeddings
  (`fc` replaced by identity), compared with cosine similarity of raw 32×32 pixels.
- `audio/spectrogram.png`: a synthetic 2.5 s signal (four rising chirps, a held 440 + 880 Hz tone, noise, seed 1),
  STFT 512/384 at 16 kHz, 70 dB range. Made in `pipeline.py`, not a recording. ResNet-18 top-5 on it is in `result.json`.
- `yolo/`: Ultralytics YOLO11n (`yolo11n.pt`, COCO, 80 classes), default image size 640, drawn with
  `Results.plot`. Street at conf 0.10, 0.25, 0.60; the Kampala photos at 0.25.
- `seg/`: torchvision DeepLabV3-ResNet50, `COCO_WITH_VOC_LABELS_V1` (20 VOC classes + background). Used on the
  street because there is no standard pretrained U-Net for street scenes. Bus purple, car blue, motorbike green,
  person orange.
- `unet/`: the MONAI `spleen_ct_segmentation` bundle (3D U-Net, channels 16-32-64-128-256) on `spleen_56`, the
  first case of the bundle's own validation split (the last 9 files in sorted order, which it does not train on),
  with the bundle's preprocessing (RAS, 1.5×1.5×2.0 mm, HU −57…164 → 0…1) and 96³ sliding-window inference.
  One axial slice (the one with the most spleen in the reference label), radiological view; orange = spleen.
  `ct-pred.png` is the model, `ct-truth.png` the reference label. Dice over the whole volume is in `result.json`.

## Copied from the instructors repo for the public deck

- `scenes/convolution.html` and `assets/numbers.js`: copied from `day03-part2/` (the Day 3 convolution scene this deck uses). Pixel values come from `day03-part2/assets/photo.jpg` (Muizenberg), generated by `day03-part2/make_figures.py`. That photo's source is not listed in the instructors repo: source to add.

# Sources: assets/konkle/

All three images are cropped from Konkle, T. & Alvarez, G. A. (2022). A self-supervised domain-general learning
framework for human ventral stream representation. *Nature Communications* 13, 491.
https://doi.org/10.1038/s41467-022-28091-4. Open access under a Creative Commons Attribution 4.0 International
License (CC BY 4.0), which allows reuse with credit. Each slide that shows one credits it.

| File | Figure | From |
|---|---|---|
| `fig1a-ipcl.png` | Fig. 1a, instance-prototype contrastive learning | PDF page 3 |
| `fig1b-tsne.png` | Fig. 1b, t-SNE of the embedding space | PDF page 3 |
| `fig4-accuracy-vs-brain.png` | Fig. 4, classification accuracy vs brain predictivity (Inanimate Objects) | PDF page 7 |

Made with `pdftoppm -r 300`. The crop boxes were found by a script from the rendered pages (the blank rows and
columns around each panel), not by eye. Unchanged apart from cropping.

## CLIP figure and lab outputs (added 2026-11-06)
- `clip-fig1.png`: Radford et al., 2021, *Learning Transferable Visual Models From Natural Language Supervision*,
  Fig. 1, as published in github.com/openai/CLIP (MIT License). Image supplied by Fernanda (895 x 343).
- `lab-*.png`: outputs of `notebooks/day05-lab-part2-views-rsa.ipynb` from a run of the solved notebook (CPU,
  CIFAR-10 test images from the Hugging Face copy uoft-cs/cifar10, CLIP ViT-B/32). Our own figures. The printed
  numbers on the slides come from the same run: instance accuracy 97 / 94 / 86%; Spearman 0.39 (CLIP), 0.08 (pixels).

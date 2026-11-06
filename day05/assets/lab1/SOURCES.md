# Sources: assets/lab1/

Outputs of `notebooks/day05-lab-clip-embeddings.ipynb` (lab part 1), from one run of the **solved** notebook built
at commit af9e11e (`python3 notebooks/build/day05_lab.py --solved`), run with `jupyter execute` on CPU
(Python 3.14, PyTorch 2.15, transformers 5.22.1; CLIP ViT-B/32 from Hugging Face; CIFAR-10 test set, Hugging
Face copy uoft-cs/cifar10), 2026-11-06. Nothing is typed or edited by hand.

| File | Cell |
|---|---|
| `embed-images.png` | section 1 (`#scrollTo=embed`), the ten images |
| `similarity-matrix.png` | Your turn 1, the 10 × 10 similarity matrix |
| `zero-shot-wrong.png` | the cell after Your turn 3, twenty wrong guesses |

The text outputs on the same slides (f-clip, f-selfsup, f-lab1) are copied from that run's printed output by a
script. For the extra outputs the run had three added cells, copies of notebook cells with one value changed:
Your turn 2 at temperature 0.01 and 1.0 (besides the notebook's 0.07; the slide drops the repeated last line,
CLIP's own temperature, from the first two), and the leave-classes-out cell with "cat" and "truck" deleted.

# Figure sources for the object memory deep dive

Paper figures come from each paper's arXiv source (`https://arxiv.org/e-print/<id>`). They are unchanged except for cropping, resizing and file format. Crop boxes were found from the image with a script (tight ink boxes and whitespace gutters, PIL), not by eye. Each paper keeps its own copyright, and each figure is credited on its slide. The licence listed is the one shown on the paper's arXiv page.

| file | source | licence |
|---|---|---|
| `orbit-keys.jpg`, `orbit-keys-clutter.jpg` | Massiceti et al. (2021), ORBIT: A Real-World Few-Shot Dataset for Teachable Object Recognition, ICCV. The keys frames from the "high-variation examples" figure (`figures/keys.PNG`, a clean video, and `figures/keys_clutter.PNG`, a clutter video), unchanged. https://arxiv.org/abs/2104.03841 | CC BY 4.0 |
| `mempal-find.jpg` | Maniar et al. (2025), MemPal: Leveraging Multimodal AI and LLMs for Voice-Activated Object Retrieval in Homes of Older Adults. Teaser figure (`figures/banner.pdf`), the first two panels (Object Placing, Object Retrieval), cut at the whitespace gutter before the safety-reminder panel. https://arxiv.org/abs/2502.01801 | CC BY-NC-SA 4.0 |
| `mempal-photo-vs-voice.jpg` | Maniar et al. (2025), study conditions figure (`figures/conditions.pdf`): the MemPal (audio) and Visual conditions. | CC BY-NC-SA 4.0 |
| `gofinder-last-frame.jpg` | Yagi et al. (2021), GO-Finder: A Registration-Free Wearable System for Assisting Users in Finding Lost Objects via Hand-Held Object Discovery, ACM IUI. Teaser figure (`figures/teaser.pdf`). https://arxiv.org/abs/2101.07314 | arXiv non-exclusive distribution licence |
| `ego4d-last-seen.jpg` | Grauman et al. (2022), Ego4D: Around the World in 3,000 Hours of Egocentric Video, CVPR. Visual queries 2D localization examples (`EM-figures/Ego4D-VQ2D-example.pdf`). https://arxiv.org/abs/2110.07058 | arXiv non-exclusive distribution licence |
| `emqa-keys.jpg` | Datta et al. (2022), Episodic Memory Question Answering, CVPR. Teaser figure (`figures/teaser_shrunk.png`). https://arxiv.org/abs/2205.01652 | arXiv non-exclusive distribution licence |
| `wallet-lookalikes.jpg` | Xu et al. (2022), Where is my Wallet? Modeling Object Proposal Sets for Egocentric Visual Query Localization. First figure (`img/VQ2D_intro.pdf`), the bottom grid (visual query, target object, distractor), cut at the whitespace gutter below the top diagram. https://arxiv.org/abs/2211.10528 | arXiv non-exclusive distribution licence |
| `wallet-false-peaks.jpg` | Xu et al. (2022), results visualization (`img/VQ2D_vis.pdf`), the left video (frying pan), baseline (top) and their model (bottom), cut at the whitespace gutter between the two videos. The row labels "baseline" and "ours" are cut off; the slide notes name the rows. | arXiv non-exclusive distribution licence |

Numbers on slides, and where they were checked (in the paper text, not only the review):
- ORBIT: 3,822 videos, 486 objects, 77 collectors who are blind or low vision (paper, dataset section).
- MemPal: 15 older adults aged 62 to 96, at home; the phone streams video to a server and GPT-4V describes tiled frames (system section); rooms searched (path length) Baseline 1.93, MemPal 1.10, Visual 1.09, computed on trials with correct system output only (28% of MemPal and 47% of Visual data were excluded as inaccurate); audio descriptions accurate 72%, Visual images 53% (results section).
- GO-Finder: average localization rate 85.6%; black wallet 66.7% over 12 trials; "small and black objects were difficult" (system evaluation section).
- Where is my Wallet: distractor scores 0.721, 0.803, 0.954 (first model) and 0.027, 0.352, 0.712 (their model), as printed in the figure; false peak (b) in the baseline as described in the figure caption.
- Chalfonte and Johnson (1996), Feature memory and binding in young and older adults, Memory and Cognition 24(4), 403-416, https://doi.org/10.3758/BF03200930: older adults had "a specific and disproportionate deficit in recognition memory for location, but not for item or for color" (abstract, read on PubMed, PMID 8757490). Healthy young and older adults, colored items in an array.

Drawn by us, not data:
- The point diagram on "The Intuition: Close Means Same".
- The boxes on "Why a Smaller Project?", "What We Suggest" and "Trap: Wrong Is Worse Than Not Seen".
- The number line on "Trap: Small Samples" is arithmetic, not data: 0.70 ± 1.96 × sqrt(0.70 × 0.30 / 60) = 0.70 ± 0.116, so about 58% to 82%.
- The sketches on "Examples of What to Report" and "Example: Choose the Threshold" are drawings, not data.

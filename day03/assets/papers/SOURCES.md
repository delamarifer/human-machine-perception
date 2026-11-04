# Day 3 metamers: paper figures and examples

Collected 2026-11-03 for the TO DO boxes in `day03/parts/metamers.js` (branch `claude/day03-1f9db2`).
Every citation below was checked against Crossref (authors, year, venue, volume, pages, DOI).
Licenses were read from the publisher page, Europe PMC, the bioRxiv API or the repository itself.
Crop boxes are (left, top, right, bottom) in pixels of the publisher's full-size image, found from pixel
profiles (rows and columns that switch between white and non-white), not by eye.

## Republishable: in this folder

### bashivan2019/: V4 "drive" images (Bashivan, Kar & DiCarlo, 2019)

- **Paper:** Bashivan, P., Kar, K. & DiCarlo, J. J. (2019). Neural population control via deep image
  synthesis. *Science* 364(6439), eaav9436. https://doi.org/10.1126/science.aav9436 (paywalled).
  Preprint: bioRxiv 10.1101/461525 (2018), CC BY-NC-ND 4.0.
- **What is here:** the released stimuli and recorded responses, not the paper's figures. Source:
  https://github.com/dicarlolab/npc ("Data and Code for Neural Population Control", MIT License,
  copyright 2019 Pouya Bashivan; license text in `bashivan2019/LICENSE-npc.txt`, which must travel with
  the files). Data file: https://s3.amazonaws.com/npc-v4-data/npc_v4_data.h5.zip (57.7 MB, unchanged
  since 2019-02-21; not committed).
- **Files:** monkey S, session 1, read from the h5 file and saved unchanged as 8-bit grayscale PNGs (299 × 299).
  - `stretch-site04-synth-1..5.png`: the five "Stretch" images for V4 site 4 (images 15–19 of
    `images/synthetic/monkey_s/stretch/session_1`).
  - `stretch-site04-natural-best.png`: the naturalistic image (of 640) that drove site 4 most
    (index 162 of `images/naturalistic`).
  - `onehot-site13-synth-1..5.png`: the five "One-hot population" images for site 13
    (images 50–54 of `images/synthetic/monkey_s/ohp/session_1`).
  - `responses.json`: the measured responses for those images, plus all 640 naturalistic responses of site 4
    and the whole population (22 sites) for the one-hot images.
- **Measured (normalized firing rate, a.u., mean over repetitions):** site 4: synthetic 5.39, 7.62, 5.54,
  5.68, 5.47; best of 640 natural images 2.13; median natural 0.19; best curvature stimulus 1.35. All five
  synthetic images beat every natural image, as the paper describes for its Fig. 2A example. Site 13
  one-hot: target 2.42–3.36 while the mean of the other 21 sites is −0.47 to −0.11.
- **Caveat (inferred, not documented):** the h5 readme does not say which synthetic images belong to which
  target site. I assumed blocks of 5 images in the order of `target_inds`. The data support this: in monkey S,
  the target site responds most to its own block for most sites. In monkey M, session 1, the target indices
  (up to 53) don't fit the 39 recorded sites, so I did not use monkey M.
- **Wording for the slide:** the paper has two modes. "Stretch": drive one site above its natural maximum.
  "One-hot population": drive one site while the others stay at baseline. It does not silence sites on their
  own. "Drive or silence" on the current slide should read "drive one site, or drive one and keep the rest quiet".
- **Not in the release:** where the naturalistic images came from (rendered objects on natural backgrounds,
  from the DiCarlo lab's sets). The face in `stretch-site04-natural-best.png` is a rendered 3D model, not a photo.

### wallis2019/: Freeman & Simoncelli model metamer with central fixation

- **Paper:** Wallis, T. S. A., Funke, C. M., Ecker, A. S., Gatys, L. A., Wichmann, F. A. & Bethge, M. (2019).
  Image content is more important than Bouma's Law for scene metamers. *eLife* 8, e42512.
  https://doi.org/10.7554/eLife.42512. **CC BY 4.0** (eLife API: license CC-BY-4.0, holder Wallis et al.).
- **Source image:** https://iiif.elifesciences.org/lax/42512%2Felife-42512-fig4-v1.tif/full/full/0/default.png (2400 × 870).
  Panel A's photo is "Geotemporal Anomaly" by Pete Birkinshaw (2010), https://www.flickr.com/photos/binaryape/5203086981,
  CC BY 2.0, as the caption says. Credit him too.
- **Files:**
  - `wallis2019-fig4-full.jpg`: the whole figure (A original, B texture distortions, C FS model).
  - `wallis2019-fig4A-original.jpg`: crop (21, 73, 802, 854): the original with a central bullseye.
  - `wallis2019-fig4C-fs-synthesis.jpg`: crop (1623, 75, 2400, 855): synthesis from the Freeman & Simoncelli
    model at scale 0.46, with pooling regions drawn as red circles along one meridian. The published file cuts
    panel C at its right edge, so this crop is 777 px wide, not 781.
- **Caveat for the story:** Wallis et al. used these images to show that FS-model syntheses at scale 0.46 are
  often **not** metamers for scenes (people tell them apart). They are real FS-model syntheses, but if the slide
  says "people cannot tell them apart", these images argue against that. Their Fig. 2 (towers, Women's Toilet sign;
  original next to FS 0.25 and 0.46) makes the same point. Not downloaded; link above with `fig2`.

### rosenholtz2020/: mongrels

- **Paper:** Rosenholtz, R. (2020). Demystifying visual awareness: Peripheral encoding plus limited decision
  complexity resolve the paradox of rich visual experience and curious perceptual failures. *Attention,
  Perception, & Psychophysics* 82, 901–925. https://doi.org/10.3758/s13414-019-01968-1. **CC BY 4.0**
  (Europe PMC PMC7303063; "© The Author(s) 2020"). No third-party credit line on Figs. 4 or 8.
- **Source images:** `https://media.springernature.com/full/springer-static/image/art%3A10.3758%2Fs13414-019-01968-1/MediaObjects/13414_2019_1968_Fig{4,8}_HTML.png`
- **Files:**
  - `rosenholtz2020-fig8-original.jpg`: crop (0, 57, 752, 622) of Fig. 8, an office desk scene.
  - `rosenholtz2020-fig8-mongrel.jpg`: crop (772, 57, 1524, 622) of Fig. 8, its mongrel. Fixation is the red
    cross at image center (the caption says so; it is the red "+" on the shelf).
  - `rosenholtz2020-fig4a-original-pooling.jpg`: crop (1, 2, 756, 569) of Fig. 4: a street scene with pooling
    regions that grow with eccentricity drawn on it.
  - `rosenholtz2020-fig4b-synthesized.jpg`: crop (769, 2, 1523, 569) of Fig. 4: the image synthesized to match
    its local statistics.
  - `rosenholtz2020-fig{4,8}-full.jpg`: whole figures (Fig. 8 includes the "Original image" / "Mongrel" titles).
- **Note:** Fig. 8 shows a person at a desk, from behind. The paper is CC BY, but people who know the
  person could recognize them.
- This is Rosenholtz 2020, not Balas, Nakano & Rosenholtz 2009 (see below). Cite whichever the slide shows.

## Not republishable: link only

| Item | Verified citation | License | Where the figure is |
|---|---|---|---|
| Bashivan et al. paper figures | *Science* 364(6439), eaav9436 (2019), doi 10.1126/science.aav9436 | © AAAS, paywalled. Preprint CC BY-NC-ND 4.0 | Preprint https://www.biorxiv.org/content/10.1101/461525v1.full.pdf: Fig. 2 "Maximal drive of individual neural sites (Stretch)", Fig. 3 "Neural Population Control", Fig. 5 example controller images in both settings for six sites. ND forbids cropping; a whole figure could be shown non-commercially. |
| Tuckute et al. figures | Tuckute, Sathe, Srikant, Taliaferro, Wang, Schrimpf, Kay & Fedorenko (2024). Driving and suppressing the human language network using large language models. *Nature Human Behaviour* 8(3), 544–561. doi 10.1038/s41562-023-01783-7 | Not open access: "Springer Nature or its licensor … holds exclusive rights" | Fig. 1 (encoding model and sentence selection), Fig. 2 (drive and suppress sentences raise and lower responses in the language network). https://www.nature.com/articles/s41562-023-01783-7 |
| Tuckute et al. data (sentences and responses) | as above | Code on GitHub is MIT (https://github.com/gretatuckute/drive_suppress_brains); the data on OSF (https://osf.io/ru38b, `data.tar`, 7.8 MB) has **no license set** | `data/brain-lang-data_participant_20230728.csv`, ROI `lang_LH_netw`, `cond_approach` D_search / S_search / B. An extract (top 15 drive, top 15 suppress, 10 baseline, with measured responses) is in the session notes folder, not in the repo. See decisions. |
| Portilla & Simoncelli figures | Portilla, J. & Simoncelli, E. P. (2000). A parametric texture model based on joint statistics of complex wavelet coefficients. *IJCV* 40(1), 49–70. doi 10.1023/A:1026553619983 | © Kluwer/Springer, not open | Reprint https://www.cns.nyu.edu/pub/lcv/portilla99-reprint.pdf. The paper has no single model diagram: Fig. 1 steerable pyramid system diagram, Fig. 9 synthesis block diagram. **Figs. 3, 4, 6, 8 ("Necessity of marginal / raw autocorrelation / magnitude correlation / cross-scale phase constraints") are the "drop a group of statistics" comparison.** Lab page https://www.cns.nyu.edu/~lcv/texture/ (no license stated). |
| McDermott & Simoncelli figures | McDermott, J. H. & Simoncelli, E. P. (2011). Sound texture perception via statistics of the auditory periphery: evidence from sound synthesis. *Neuron* 71(5), 926–940. doi 10.1016/j.neuron.2011.06.032 | Elsevier user license (free to read, not to republish); PMC4143345 is an author manuscript, not open-licensed | Fig. 1 model architecture; Fig. 4 synthesis algorithm and examples; Fig. 8 "Analogous model of visual texture representation" (drawn like Fig. 1, could be the image model diagram too). PDF on the lab site: https://mcdermottlab.mit.edu/papers/McDermott_Simoncelli_2011_sound_texture_synthesis.pdf |
| McDermott & Simoncelli sound examples | as above | No license on the page | https://mcdermottlab.mit.edu/texture_examples/index.html (+ `texture_examples2.html`, `texture_examples3.html`). For each sound (stream, bubbling water, wind, fire, waves, …): original, synthetic "spectrum", "marginals", "full set of statistics". Files sit next to the page, e.g. `norm_fire1_excerpt.wav`, `fire1_excerpt_10000000000000.wav` (spectrum), `…_10111100000000.wav` (marginals), `…_10111119000110.wav` (full). Originals of the 168 textures: https://mcdermottlab.mit.edu/McDermott_Simoncelli_2011_168_Sound_Textures.zip (34.9 MB). Several originals carry sound-effects-library IDs ("ASE-08 Bubbling Water", "CSE-48 Wind whistling", "SSE-41 Lapping Waves"), so they may be commercial recordings. |
| Freeman & Simoncelli figures | Freeman, J. & Simoncelli, E. P. (2011). Metamers of the ventral stream. *Nature Neuroscience* 14(9), 1195–1201. doi 10.1038/nn.2889 | © Nature; PMC3164938 is an author manuscript under Nature's terms (academic research only) | Fig. 2 "Mid-ventral model, example metameric stimuli and experimental task". Reprint https://www.cns.nyu.edu/pub/lcv/freeman10-reprint.pdf. Code (MIT): https://github.com/freeman-lab/metamers (the license covers the code, not the paper's images). |
| Balas, Nakano & Rosenholtz mongrels | Balas, B., Nakano, L. & Rosenholtz, R. (2009). A summary-statistic representation in peripheral vision explains visual crowding. *Journal of Vision* 9(12):13. doi 10.1167/9.12.13 | © ARVO; Europe PMC lists no open license (PMC2923917) | https://jov.arvojournals.org/article.aspx?doi=10.1167/9.12.13 |
| Rosenholtz, Huang & Ehinger mongrels | (2012). Rethinking the role of top-down attention in vision: effects attributable to a lossy representation in peripheral vision. *Frontiers in Psychology* 3:13. doi 10.3389/fpsyg.2012.00013 | **CC BY-NC 3.0** | Usable on a non-commercial course site if Fernanda accepts NC. Not downloaded. |

## Wright and Guild color matching

- Wright, W. D. (1929). A re-determination of the trichromatic coefficients of the spectral colours.
  *Transactions of the Optical Society* 30(4), 141–164. doi 10.1088/1475-4878/30/4/301 (volume dated 1928–29;
  Crossref issue date March 1929).
- Guild, J. (1931). The colorimetric properties of the spectrum. *Philosophical Transactions of the Royal
  Society A* 230, 149–187. doi 10.1098/rsta.1932.0005 (Crossref issue date 24 June 1931, although the DOI says 1932).
- Secondary source for how the CIE 1931 functions came from both: Fairman, H. S., Brill, M. H. &
  Hemmendinger, H. (1997). How the CIE 1931 color-matching functions were derived from Wright–Guild data.
  *Color Research & Application* 22(1), 11–23. doi 10.1002/(SICI)1520-6378(199702)22:1<11::AID-COL4>3.0.CO;2-7.
- **2° bipartite field, 10 observers (Wright) and 7 (Guild):** confirmed only from secondary sources (Wikipedia's
  "CIE 1931 color space", citing the two papers above, and industry notes from X-Rite and HunterLab). I could not
  open either primary paper (both paywalled) or Fairman et al., so the field size is **not verified from the primary
  source**. The usual citation is "Wright (1928–29) and Guild (1931)".

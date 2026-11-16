# Sources for `day11/parts/child.js` (the "child" part)

Covers Malik's ETH Zurich talk from 19:12 to 35:14. Nothing here is copied from his slides or his course
PDFs, so this part needs no permission from him or from anyone else.

## Images in this folder

| File | What it is | Licence | Author / source | Changes |
|---|---|---|---|---|
| `turing-aged-16.jpg` | Alan Turing as a schoolboy of sixteen | **Public domain** (Wikimedia Commons, `File:Alan Turing Aged 16.jpg`, tagged PD) | Photograph possibly by Arthur Reginald Chaffin (1893–1954); scan credited to the Turing Digital Archive, King's College Cambridge, AMT/K/7/4 | none; shown at its own aspect ratio, slight CSS desaturation only |

Source page: https://commons.wikimedia.org/wiki/File:Alan_Turing_Aged_16.jpg
The slide prints "Photograph: public domain, Wikimedia Commons" under the image.

## Why the kitchen scene is drawn and not photographed

The turning point of this section is Malik's picture of **a father washing dishes and his small daughter
watching**. Every honest route to a photograph of that scene puts **a real, identifiable child** on a public
course website, whatever the licence says, and that child cannot consent to being a teaching example for
the rest of the internet. So slide 3 is **drawn here in inline SVG**, and the citation line on the slide says
so out loud: *"the scene is drawn here, deliberately, rather than photographed"*. The same goes for the two
hands on slide 4, which are schematic and carry a note on the slide saying no measurement is implied.

## Videos (played from the authors' own pages, not copied here)

Both slides use a plain `<video src="https://…">` pointing at the paper authors' own project page. Nothing is
downloaded into this repository; this is linking, in the same spirit as the YouTube embeds elsewhere in Day 11.
Both need internet in the room, and both speaker notes say what to do if there is none.

1. **Perceptive locomotion** — slide 8.
   `https://videomimic.net/stairs/2.mp4` (about 9 s, 1280×720, 5.5 MB).
   Allshire, Choi, Zhang, McAllister, Zhang, Kim, Darrell, Abbeel, Malik and Kanazawa,
   *Visual Imitation Enables Contextual Humanoid Control*, CoRL 2025 (**Best Student Paper**, as stated on the
   authors' own project page). Project page https://videomimic.net · arXiv:2505.03729.
   Other clips on the same page if you want a longer one: `single/g1.mp4` (30 s), `figs/videomimic_teaser.mp4`
   (95 s, 37 MB — the full trailer, slow to load), `stairs/1.mp4`, `traversing/1.mp4`.

2. **Dexterous manipulation** — slide 9.
   `https://do-as-i-do.com/assets/trailer.mp4` (about 4 MB).
   Paliwal, Etukuru, Liang, Abbeel, Shafiullah and Malik, *Do as I Do: Dexterous Manipulation Data from
   Everyday Human Videos*, Berkeley, 2026. Project page https://do-as-i-do.com · arXiv:2606.19333.

**If either link dies**, the citation line under the slide still carries the paper, the authors and the
project-page link, and the argument is on the drawn pipeline slide before it. Replace the `src` or delete the
`<video>` element; nothing else breaks.

Round 2 moved the paper cards off the slide face and into the citation line, as part of the on-screen word
budget (`reference/check-slides.js`). Nothing about the licences changed: the attribution is still printed on
the slide, in the place a citation belongs.

## Links cited on slides (no asset copied)

- Turing, *Computing Machinery and Intelligence*, Mind 59 (236), 1950, section 7 — quoted in his own words,
  three sentences, attributed on the slide.
- SAM 3D: *SAM 3D: 3Dfy Anything in Images*, Meta Superintelligence Labs, CVPR 2026.
  Blog https://ai.meta.com/blog/sam-3d/ · paper (CVPR open access)
  https://openaccess.thecvf.com/content/CVPR2026/papers/Chen_SAM_3D_3Dfy_Anything_in_Images_CVPR_2026_paper.pdf ·
  code https://github.com/facebookresearch/sam-3d-objects.
  No figure from the paper is used; the diagram on slide 13 is ours. **No authors' video could be embedded**:
  Meta's page serves its videos from signed, expiring CDN URLs and refuses framing (`X-Frame-Options: DENY`),
  and the GitHub repository ships no media.
- 3D humans: Kanazawa, Black, Jacobs and Malik, *End-to-end Recovery of Human Shape and Pose*, CVPR 2018.
  3D hands: Pavlakos and colleagues, *Reconstructing Hands in 3D with Transformers*, CVPR 2024.
  Cited on slide 11 as names and years only, which is how Malik gives them in the talk.

## Numbers, and whose they are

- **"about 100 trajectories"** (slide 7) is **Malik's figure, spoken at 22:24**, not a number read off the
  paper. The citation line on the slide says exactly that.
- **"76 years"** (slide 1) is arithmetic: 1950 to 2026.
- **"about 150 years"** of photogrammetry (slide 13) is his phrasing in the talk, as an order of magnitude.
- **"five or six years", "one or two years" (2020), "close but not solved" (2026)** (slide 10) are his own
  account of his own timeline, at 27:47.
- Nothing on these slides is a measurement from a study, and no plot of results appears anywhere in this part.

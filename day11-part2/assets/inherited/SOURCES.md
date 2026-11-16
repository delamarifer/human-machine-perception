# Inherited images (Day 11 Part 2)

These seven images were **copied from `day11-embodied/assets/`**, Shreya's Day 11 Embodied Intelligence deck
in this same repository, on 2026-11-16, at Fernanda's request. Shreya is not presenting that session, so
rather than let the figures go unused they are reused here.

## What is and is not known about them

**`day11-embodied/` carries no `SOURCES.md` and no licence record for any of its images.** So the provenance
below is what can be inferred from the file names, the alt text written for them, and what the talk shows at
the matching moments — it is not a licence trail, and nobody should treat it as one.

The `mk-` prefix reads as Malik. Judging by their content, these almost certainly originate as **figures from
the papers the talk discusses, or as captures from the talk's own slides**. The slide citations therefore say
"by way of the talk" rather than naming a licence, because naming one would be inventing it.

| File | What it shows | Used on | Most likely origin |
|---|---|---|---|
| `mk-goat.jpg` | GOAT: goals given as an image, a sentence or a category, and the path through a home to four goals | `three`, the Airbnb test | the GOAT paper (Chang, Gervet, Khanna, Yenamandra and colleagues, RSS 2024, arXiv 2311.06430) |
| `mk-goat-map.jpg` | a floor plan with the robot's path to four goals | **not used** &mdash; `mk-goat.jpg` already contains this map | as above |
| `mk-walk-sf.jpg` | twelve photographs of a humanoid walking around San Francisco | `three`, Locomotion | the Berkeley humanoid locomotion work (Radosavovic and colleagues) |
| `mk-walk-panel.jpg` | a panel of the humanoid walking outdoors | **not used** &mdash; `mk-walk-sf.jpg` is the fuller version of the same thing | as above |
| `mk-droid.jpg` | the DROID rig: a robot arm on a portable desk with cameras, and the operator's headset | `data`, teleoperation | the DROID dataset (Khazatsky and colleagues, 2024) |
| `mk-dexmv.jpg` | human hand video, the hand and object recovered in 3D, then a robot hand doing the same in simulation | `child`, the video-to-policy pipeline | the retargeting work the talk shows around 26:26 |
| `ex-sim.jpg` | robots learning in a physics simulator: a humanoid, an arm, a legged robot, a hand | `data`, the Simulation door | unclear |

## What this changed in the deck

Three stand-in photographs were replaced. Each of them had a citation that apologised for not being the real
thing, and those apologies are now gone:

- `three`, the Airbnb test: was a Wikimedia photograph of a Spot quadruped, cited as "not a photograph from
  these experiments". Now the GOAT figure itself.
- `three`, Locomotion: was a Wikimedia photograph of a steep San Francisco street, cited as "not the street in
  the talk". Now the robot actually walking those streets.
- `data`, teleoperation: was a NASA public-domain photograph of an astronaut driving Robonaut 2, cited as
  "not a data-collection rig". Now a real data-collection rig.

The replaced files are still in `assets/three/` and `assets/data/` with their licences intact, so any of the
three swaps can be reverted in one line.

## Two of the seven are deliberately unused

`mk-goat-map.jpg` and `mk-walk-panel.jpg` are not wired in, and should not be: each duplicates something
already on the slide. `mk-goat.jpg` already contains the floor plan and path, and `mk-walk-sf.jpg` is the
fuller version of the walking panel. Adding them would repeat a picture rather than add one.

## The open question, stated plainly

**Before this deck is relied on beyond this course, these seven images need their provenance established.**
They sit on a public site. Fernanda was told this and asked to proceed, which is her call to make; this file
exists so that the decision is visible rather than buried, and so that whoever picks it up later knows exactly
which images carry an unresolved question and which do not. Everything else in this deck is either drawn here
or carries a named licence with its attribution printed on the slide.

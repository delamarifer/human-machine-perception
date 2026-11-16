# Day 11 (The easy problems are hard), owner: Fernanda

## Round 1 (2026-11-15): the deck built on Moravec's paradox

Fernanda sent the recording of **Jitendra Malik, "Vision and Robotics for Embodied AI"**
(Frontiers of Embodied AI, ETH Zurich, 29 May 2026, with Koltun, LeCun and Shuran Song) and asked to present
on it. No slides were posted for the talk. His Berkeley course **"Robots that Learn" (CS 294-277, Spring 2026)**
posts 20 decks publicly, and **Lecture 1** is the same argument laid out for teaching; that is the source this
session is built from. Chosen spine: **Moravec's paradox**, because it is the mirror of Day 10 — LLMR and SONORA
are models acting on worlds they cannot perceive, and this is the account of why that is the hard direction.

14 slides, 41 clicks, 50 minutes of content across seven parts.

| Part | Slides | Carries |
|---|---|---|
| `start` | title | hands the argument to Malik out loud, in the first note |
| `gap` | 2 | the kitchen verbs a twelve year old can do; a sixteen year old learns to drive in under 20 hours |
| `paradox` | 2 | which problems fell first; Moravec 1988 and Pinker 1994, quoted short |
| `why` | 2 | Moravec's answer (evolution) against Malik's (it was never written down) |
| `bodies` | 2 | the Cambrian and Gibson; hands, and Anaxagoras |
| `scorecard` | 2 | navigation / locomotion / manipulation, and the data wall |
| `close` | 3 | the three levels; the omelette; the discussion, back to the opening question |

### How it was sourced
**No figure of Malik's is used.** Everything on these slides is typeset or drawn by us. The timeline on the
"Moravec answer" slide is real SVG drawn to scale: the bar is 540 million years and the 50,000-year language
marker is 0.0093 percent of it, which is why it renders as a line and not a band — and the slide says so on its
own face, so nobody reads it as a stylistic choice. The kitchen verbs are ordinary English cooking words set as
chips, not his figure. The omelette steps are our own plain paraphrase of a standard method, **not** a model
transcript, and the citation line says that.

Quotations are short and attributed on the slide: Moravec (*Mind Children*, 1988), Pinker (*The Language
Instinct*, 1994), Gibson, Anaxagoras via Aristotle. The Cambrian account is credited to Parker,
*In the Blink of an Eye* (2003), which is the source Malik credits.

Two claims are labelled on the slide as **his judgement rather than a measurement**: the three-way scorecard
("nearly done" / "good progress" / "a long way to go") and the **10,000×** data-hunger figure. Both come off a
lecture slide with no study attached, and the notes say that out loud rather than letting a number do work it
has not earned.

### Questions for Fernanda
1. **Do you want his figures?** Right now the deck needs no permission from anyone: it is our drawings and our
   words. If you want his actual figures — the Cambrian seafloor painting, the kitchen-verb grid, the robot on
   the 41 percent San Francisco hill — that is one email to him, and in my experience he would say yes for a
   course. Tell me and I will draft it. **Until then, nothing here needs clearing.**
2. **The 10,000× figure.** I have kept it with a health warning. Would you rather cut it, or shall I try to find
   a real citation for a child-versus-LLM data comparison to put under it?
3. **Length.** 50 minutes of content, 41 clicks. If Day 11 is an hour with discussion, `bodies` is the part to
   cut — it is the most beautiful and the least load-bearing. Say the word and it goes.
4. **The opening claim is yours to check.** The first note has you say the argument is Malik's and point the
   class at the talk. If you would rather present it as your own synthesis, the deck still works, but I think
   naming him in the first thirty seconds is both right and more interesting for them.
5. **Tie to Day 10.** The title note points back at LLMR and SONORA ("language models building worlds they could
   not perceive"). That only works if Day 10 actually ran. Adjust if it did not.
6. **Draft notes.** All mine, marked `(draft)`. Slides 7 (the data answer), 11 (the data wall) and 14 (the
   discussion) are where the argument is carried in my wording and most wants yours.

### Not verified
The deck has **not been opened in a browser**. The sandbox in this session refuses to start a local preview
server, so it was checked by script instead: every part parses, every slide has one note passage per click plus
one for the title, `data-step` numbers run contiguously from 1 on all 14 slides, and the running order resolves
to all seven part files. Layout, the SVG timeline especially, is unchecked. Worth one pass with
`python3 -m http.server 8148` and `day11/deck.html` before class.

### Source material on disk
The 20 "Robots that Learn" decks (797 pages) are downloaded, but they are in a **temporary scratch folder that
routine cleanup can wipe**. Say the word and I will move them somewhere durable. They are Malik's, so they do
not belong in this repository.

## Round 2 (2026-11-15): our own animation, and other people's videos instead of their figures

Fernanda: "we can make our own animations and just find relevant videos". So the deck stays free of anyone's
figures, and where a still image would have been lifted we either draw it or embed the authors' own recording.
Now **17 slides, 49 clicks, about 58 minutes** of content.

**New: `bodies` slide 9, "One loop, not two systems."** A drawn four-step cycle — you look somewhere, you see
only what is there to see, you move, the world shows you something else — revealed one box and one arrow per
click, closing on the Gibson line. Inline SVG, our own diagram, with its own arrowhead marker so the slide still
draws when previewed alone. The last note ties it straight back to Day 10: LLMR is handed a list once and never
moves, so there is no loop at all, and nothing it could do would show it anything new. That connection is the
reason this slide exists.

The Cambrian slide before it lost the Gibson quote (it moved here) and now ends on a plain line instead.

**New: `scorecard` slide 12, "What good progress looks like."** The authors' own YouTube video of
*Humanoid Locomotion as Next Token Prediction* (Radosavovic, Zhang, Shi, Rajasegaran, Kamat, Darrell, Sreenath
and Malik, Berkeley, NeurIPS 2024), embedded, with the paper card above it. Embedding is linking, not copying,
so this needs no permission either.

**New: `close` slide 17, "If interested, watch it..."** Malik's ETH talk embedded, with the course link, in the
same shape as the LLMR part's closing slide.

### Videos: what I found and did not
- **Locomotion** — found, embedded. ✔
- **Navigation** — **no official video found.** GOAT (RSS 2024) has no project page I could locate and no
  authors' video on YouTube; only a co-author's slide deck. That slide stays text for now. Say the word and I
  will look again, or we drop the navigation claim to one line.
- **Manipulation** — nothing embedded on purpose. The point of that row is that it has *not* worked, and a
  video of a robot succeeding at one narrow task in a lab would undercut it. If you would rather show a failure
  reel, those exist, but I would want to pick one that is fair rather than mocking.

### Still true from Round 1
Both embeds need internet in the room, and both notes tell you what to say if there is none. Nothing in this
deck requires permission from anyone. **It still has not been opened in a browser** — checked by script only
(17 slides, passages == clicks + 1 on every one, `data-step` contiguous from 1, running order resolves). The new
SVG loop and the two iframes are exactly the things a script cannot check, so this deck wants a browser pass
more than the last one did.

**Length is now the open question.** 58 minutes of content before discussion. `bodies` is still the part to cut
if Day 11 is an hour — and note that cutting it now costs you the loop diagram, which I think is the best thing
in the deck. The alternative is to cut `paradox` slide 4 ("Which problems fell first") and go straight to the
quotations.

## Round 3 (2026-11-16): one slide cut, and the deck finally opened in a browser

**Cut (Fernanda): "Which problems fell first."** The two-column slide that used to open `paradox` is gone, so
that part is now one slide and about 4 minutes instead of 7. Nothing was lost: its argument — chess, checkers
and theorem proving fell decades ago, picking up an unfamiliar mug did not, and in 1960 everyone would have
predicted the opposite — is now the first spoken note of "Moravec names it". The `bodies` part and the loop
diagram survive, which was the point of cutting here instead.

Now **16 slides, 46 clicks**, Moravec section down to 4 minutes.

### Opened in a browser at last, and it caught two things a script could not
Served on 8148 and walked end to end: **61 steps forward** (15 slide changes plus 46 clicks), **61 back** to the
start, **console completely clean**, every local file 200.

1. **The timeline caption was invisible.** On "Moravec answer: it is old", the line *"drawn to scale, which is
   why it is a line and not a band"* sat at y=270 in an SVG whose viewBox was only 250 tall, so it was silently
   clipped. The slide was making a claim about scale with the sentence that justifies it cut off. viewBox is now
   300 and the caption renders. **This is exactly what the script check could not see**, and it was the most
   load-bearing sentence on the slide.
2. **My own earlier count was wrong, not the deck.** The offline checker reported the loop slide as having 9
   beats; the engine groups by `data-step`, so it is 5, which is what the notes assume. Verified against the
   engine's own grouping: passages == clicks + 1 on all 16 slides.

Screenshots taken of the loop slide and the timeline; both lay out correctly.

### One thing still unverified: the two video embeds
Both iframes are in the page with the right URLs and the right size, but **no request to youtube.com was ever
made** — this browser pane blocks the third-party frame, so the player shows as a black rectangle here. That is
a property of the preview pane, not evidence that the embed is broken; the LLMR part embeds a third-party page
the same way. **Please click through slides 11 and 16 in your own browser once before class**, and if YouTube
will not embed, both notes already tell you to read the address out loud instead.

## Round 4 (2026-11-16): drawn visuals on every slide that was text

Fernanda: "can you add visuals and animations for everything? right now it's a bit too text heavy". Nine slides
that were columns of prose are now click-stepped drawings. Everything is inline SVG drawn here; still no figure
copied from anyone. **17 slides, 48 clicks, 11 drawings.**

| Slide | Was | Now |
|---|---|---|
| Twenty hours | two text columns | a real 1980-2026 axis with five milestones at their own years, and the twenty-hour tick on its own line below |
| The order came out backwards | *(had been cut in round 3)* | two ranked columns, 1960's guess against how it went, with every line crossing |
| Malik answer | two text columns | two bins: one filling with what people typed out, one dashed and empty |
| Vision came first | two text columns | an eye opens, and three arrows fan out: hide, flee, armour yourself |
| Then hands | two text columns | a 5-million-year strip with upright, thumb and tools at their own marks, and language as a tick at the end |
| Where it actually stands | three text rows | one errand in three stages, each with a tick, a half circle or a cross |
| The wall is data | two text lines | the pile that was already there, against one block that costs an hour of a real robot |
| Three levels | three text rows | a stack of three, senses alongside, with a bracket round the top row |
| The sixteen year old | two text columns | one question forking into two futures |

### This undoes the round 3 cut, and you should know that
"The order came out backwards" is back, as a drawing. I think it earns its place — the inversion is the one idea
in the session that is genuinely hard to say and trivial to show, and every line crossing does the work four
sentences could not. But it is the slide **you asked me to cut for time**, so: 17 slides and about 56 minutes
again. If time is the binding constraint, say so and it goes back out; the long note that replaced it is still
in the git history at 3c91bba.

### Browser pass, and what it caught this time
Walked end to end at an emulated 1280x720, the shape a projector actually is: **64 steps forward, 64 back,
console clean**, passages == clicks + 1 on all 17.

Two layout bugs found and fixed, neither of which a script would have seen:
1. **Timeline labels collided.** On "Twenty hours", *first robot cars* (1986) and *no hands across America*
   (1995) sat at the same height nine years apart and overlapped; *still not a profitable industry* at 2026 ran
   off the right edge. Labels are now staggered by hand and the last two are end-anchored.
2. **Text crossing a drawing.** On "The wall is data", the caption ran left across the pile of marks. The right
   half is now stacked vertically and nothing crosses.

The checker now compares text against text, text against every filled shape, and everything against its own
viewBox, across all 11 drawings. It reports zero problems. That check is worth re-running after any edit.

### Honesty notes on the drawings
- The timeline, the hominid strip and the 540-million-year bar are drawn to real scale on real axes.
- The marks in the two bins and in the data pile are a **texture, not a count**. They mean "a great many" and
  "one". No number is implied and the citation line on that slide says so.
- The tick, half circle and cross on the scorecard are **qualitative**, and the slide repeats underneath that
  these are Malik's judgement and not a benchmark.
- The twenty-hour tick is deliberately **not** on the 1980-2026 axis, because hours of learning and years of a
  field are not the same units. The slide says that in small type and the note says it out loud.

---

## Part: three (the opening of the ETH talk, 0:00 to 7:44) — round 1

New part, `parts/three.js`, built from `reference/malik-talk-map.md` chapters 1 and 2. Ten slides,
about eight minutes, 39 clicks. It is **not wired into `order.js`** — the coordinator does that.

### What it covers, by slide
1. **Connecting perception to action.** His definition, then the three central problems drawn as three
   panels: navigation, locomotion, manipulation. 4 clicks.
2. **The Airbnb test.** A drawn floor plan: an apartment it knows nothing about, the robot set down at the
   door, the goal given three ways (in words, as a picture, as a place), the exploring, and the partial
   semantic map with one room left grey. Ends on his line, it builds the part of the map it needs. 5 clicks.
3. **What they found building it.** A photograph of a Spot, and his three findings: end to end did not do
   well, modular with the best vision model per part did, and the thing that needs learning is efficient
   exploration. Then the consequence: what fails is vision, so wait for the next model. 5 clicks.
4. **Locomotion, and a simulator.** The authors own video embedded, trained in simulation, zero shot
   outdoors, next token prediction then RL. 3 clicks.
5. **Then they pointed it at the hills.** The 29% slope and the 41% street, drawn at their true angles from
   one origin, with the 41% marked as outside its training range. A steep San Francisco street alongside.
   4 clicks.
6. **The verdict he says will offend people.** Navigation nearly done, locomotion good progress,
   manipulation a long way to go. Marked as his judgement, twice. 4 clicks.
7. **The data is the wrong shape.** Sensorimotor trajectories, sketched, in the body doing it; and the
   shelf that is full for language and empty for this, for people as well as robots. 3 clicks.
8. **His arithmetic.** A million words a month, times twelve, times ten, equals a hundred million, against
   close to a trillion. Done as a calculation rather than as the answer. 4 clicks.
9A. **Ten thousand times**, on a log ruler from 10^6 to 10^12, with the scale stated on the slide.
9B. **Ten thousand times**, again, by area: a square, and the child as a speck in its corner.

### What I verified
Served at 8161, walked at an emulated 1280x720. **48 steps forward and 48 back, console clean**, every
slide reaching its last beat and returning to zero. **Passages == clicks + 1 on all ten slides**, counted
by distinct `data-step` values the way the engine groups them. Nothing outside its SVG viewBox, nothing
outside the stage box, no text over other text, no text over a filled shape, on every slide fully built.

### Questions for Fernanda
- [ ] **There is no official GOAT video.** I looked: the arXiv page lists no project page, and the search
      turned up only the paper, the RSS proceedings PDF and the separate GOAT-Bench repository. I did not
      substitute anything unofficial. If you know of one, slide 2 can take an embed the way slide 4 does.
- [ ] **Does this replace `scorecard.js`?** Slide 6 here is the same verdict that part already carries, and
      slide 3 of `scorecard.js` embeds the same locomotion video. The two cannot both be in the running
      order. I have not touched that file.
- [ ] **`order.js` and `SEC_MINUTES`.** This part calls `section('Three problems')`. It needs an entry in
      `SEC_MINUTES` (I would say 8) when it is wired in. Coordinator job, not mine.
- [ ] **Order of the verdict.** He says it as locomotion, navigation, manipulation. I put it in the order
      the three problems were introduced, navigation first, so the list reads down. Say if you want his.
- [ ] **Two slides for one number.** 9A and 9B make the same point twice, the ruler honestly and the square
      viscerally. If the section runs long, 9B is the one to cut, not 9A.
- [ ] **The Airbnb floor plan is invented.** The rooms, the path and which room it misses are mine, drawn to
      carry his argument. No part of it is from the paper. Say if you would rather it were plainer.
- [ ] **Slide 1 verbs.** I glossed the three problems as get to the thing, cross the ground, do the thing.
      They are my words, not his. Change them freely; they are the spine of the section.

### Honesty notes on the drawings
- The two slopes on slide 5 are drawn to his two real grades, 29% and 41%, at their true angles from a
  shared origin. The photograph next to them is **not** that street, and the slide says so.
- The traces on slide 7 are a **sketch of a shape**, not data. No axis, no numbers, and the note says it.
- Slides 9A and 9B carry one real quantity, 10^8 against 10^12. A linear bar would have been a lie, so 9A
  is a log ruler with "each step is ten times the one before" printed on it, and 9B scales by **area**, with
  the ratio stated. The child is a 4-unit square inside a 420-unit square, which is correct for 10,000x of
  area, and a dashed ring marks where it is because at that size it is nearly invisible. That is the point.
- The tick, half circle and cross on slide 6 are qualitative, and the slide says under them that these are
  his judgement and not a benchmark.
- Every number on these slides is his or from the GOAT paper, and each slide says which.
- Image licences are in `assets/three/SOURCES.md`: Spot photograph, Jonte, Wikimedia Commons, CC BY-SA 4.0;
  steep street, Hakan Dahlstrom, Wikimedia Commons, CC BY 2.0. Both attributed on the slide. Nothing is
  copied from Malik's own slides or his course PDFs.
## Part `levels` (2026-11-16): the hierarchy, rebuilt from the ETH talk

New file `parts/levels.js` plus `assets/levels/`, covering **7:44 to 12:45** of Malik's ETH talk (chapter 3 of
`reference/malik-talk-map.md`), with the naming of the three levels pulled forward from **42:02**.
**8 slides, 32 clicks, about 12 minutes.** Nothing outside `parts/levels.js`, `assets/levels/` and this
section was touched; `order.js` is untouched, so the coordinator still has to add `['levels', '...']` to the
running order. It belongs between `scorecard` and `close`.

| # | Slide | Clicks | What it shows |
|---|---|---|---|
| 1 | I cannot plan a trip to New York in muscle commands | 3 | drawn: the journey as three plan boxes, then the same journey as a dense strip of muscle-command ticks, then the line that the two cannot live at the same level |
| 2 | Three levels | 5 | drawn: the stack — goals and plans, motion trajectories in 4D, forces and torques — then his names, Aristotle, Euclid, Newton, then a bracket round the lower two: most of the action is in these two |
| 3 | The top level really is solved | 4 | the omelette method in six steps, the line that this level genuinely has the knowledge, the sentence *crack the eggs into the bowl* pulled out, then a photograph of two hands doing it and the question of how you operationalise that in a body |
| 4 | His fake equation | 4 | action = movement + goal, every term named in plain English underneath; language is good at the goal half, bad at the movement half because it is a compression device, so a sentence never specifies a trajectory |
| 5 | Two words of English | 4 | *pick up*, then a one-centimetre sugar cube, then a loaded tray; the semantics is what the word captures, the motion is not in the word |
| 6 | What lifting a glass actually takes | 5 | F = ma in words, the four things your hand solves at once, then a drawn **schematic** of load force and grip force over time with the slip line and the contact events |
| 7 | And the signal that tells you | 3 | Merkel and Meissner, one diagram each, what each one reports, and the line that a parallel-jaw gripper finds out the glass slipped by watching it fall |
| 8 | The credo, which he refuses to argue | 4 | his own framing that this is a religious belief, a real two-finger gripper against a multi-fingered hand holding a light bulb, the 250-dollar wine bottle, and that his lab does not use parallel-jaw grippers at all |

### Colour: photographs, not coloured words
Fernanda asked for colour. The house rule forbids colouring words, so the colour here is **seven real
photographs and medical illustrations**, all freely licensed, all logged in `assets/levels/SOURCES.md` with
source URL, author and licence, and **all attributed on the slide itself**:

- `egg-crack.jpg` — Shixart1985, Wikimedia Commons, **CC BY 2.0**
- `sugar-cubes.jpg` — Uwe Hermann, Wikimedia Commons, **CC BY-SA 3.0**
- `tray-waiter.jpg` — Shixart1985, Wikimedia Commons, **CC BY 2.0**
- `skin-merkel.jpg` and `skin-meissner.jpg` — BruceBlaus, Blausen.com staff (2014), **CC BY 3.0**
- `gripper-jaw.jpg` (a Baxter) — Gustavo A. Casañ, Wikimedia Commons, **CC BY-SA 4.0**
- `hand-bulb.jpg` (a Shadow hand holding a light bulb) — Richard Greenhill and Hugo Elias, Shadow Robot
  Company, Wikimedia Commons, **CC BY-SA 3.0**

Every file is used **unmodified apart from a downscale**; nothing is cropped. **No figure of Malik's is used
anywhere in this part**, so it still needs nobody's permission.

### Honesty notes
- **Nothing is in quotation marks.** The talk map was made from auto-generated captions, so his exact wording
  is approximate. Where a line is recognisably his — the fake equation, the religious belief, the wine bottle
  — the citation line says *his wording, via auto-captions, so approximate*, and the notes say "he says" rather
  than quoting him.
- **The grip-force plot is a schematic and says so on its own face.** No axis carries a number. The shape is
  cited to Johansson and Flanagan, *Nature Reviews Neuroscience* 10 (2009), which is the real measurement and
  which I verified by DOI; it is paywalled, which is why we drew the shape instead of reproducing a figure.
  The receptor roles on slide 7 are cited to the same paper.
- **The omelette steps are our own plain paraphrase** of a standard method, not a transcript of any model.
  The citation line on slide 3 says that out loud.
- **The strip of muscle-command ticks on slide 1 is a texture, not a count.** The slide says so.

### Verified in a browser
Served on 8162 at an emulated **1280x720**, the shape a projector is. **46 steps forward** (32 clicks, 7 slide
changes, 7 white lead-ins), **46 back**, landing exactly on the start. **Console completely clean**, every
local file 200 or 304, all seven images decoded at full size. Checked by the engine's own `data-step`
grouping: **passages == clicks + 1 on all 8 slides**, `data-step` contiguous from 1, every note marked
`(draft)`. A geometry check across both drawings found no text over text, no text over an ink-filled shape, no
text crossing a stroked line, nothing outside its viewBox and nothing running under the absolute citation
line. Also loaded **alongside the whole existing deck** (25 slides) to confirm no clash of class names,
section names or globals: clean, and it sits as section *Levels* between *Scorecard* and *Close*.

Three layout bugs were caught this way and fixed: the muscle-command caption sat on top of the tick marks; the
curve labels on the force plot crossed the curves (they are now a legend in the empty top-left of the plot);
and the equation terms overflowed onto the `=` and `+` signs.

### A bug in somebody else's file, not touched
`parts/close.js` slide "Three levels, three senses" has the same `d11Box` problem I hit: a `<b>…</b><br><span>`
inside the box renders **side by side instead of stacked**, because the box content is a flex container and
each child becomes a flex item. On that slide "Forces and torques" runs straight into "how hard, and when to
give way" with no gap. The fix is one character of nesting — wrap the content in a `<div>` — and it is done
that way in `levels.js`. **I have not touched `close.js`**, since it is not mine. Worth passing to whoever owns
it, and worth checking any other part that uses `d11Box` with a `<br>`.

### Questions for Fernanda
1. **Length.** This part is about 12 minutes on its own, and Day 11 was already running long. If you need to
   cut, the two candidates are **slide 7 (Merkel and Meissner)** and **slide 1 (the New York drawing)**. Slide
   7 is the most beautiful and the least load-bearing; slide 1 is the clearest motivation for why there is a
   hierarchy at all. I would cut 7 before 1. Say the word and either goes.
2. **It overlaps `close.js`.** The old closing part already has a "Three levels" slide and an omelette slide,
   both built from the Berkeley Lecture 1 version. If `levels` goes in, **those two slides in `close` should
   come out** or the class hears the same argument twice. That is a call for whoever owns `close.js`, not me.
3. **The omelette.** Do you want a real model transcript on slide 3 instead of my paraphrase? If so, generate
   it yourself so it is yours, send it to me, and I will put it up labelled with which model and when. Right
   now the slide is honest but it loses a little of the force of his version, which was a screenshot of an
   actual answer.
4. **How hard do you want to push the credo?** Slide 8 presents the multi-fingered-hands claim as a stated
   belief, because that is exactly how he frames it. If you would rather present it as a live research
   question with evidence on both sides, that is a different slide and I can write it, but it would stop being
   a report of what he said.
5. **The receptor slide is the one place I added science he only named in passing.** He says "Merkel and
   Meissner" and moves on; I give each of them a job (sustained pressure, and change or micro-slip), cited to
   Johansson and Flanagan. That is standard touch physiology, but it is **my addition, not his**, and you
   should know that before you say it as his.
6. **Draft notes, all mine.** Slides 4 (the compression argument) and 5 (the sugar cube against the tray) are
   where the teaching actually happens and most want your wording.
## Round 5 (2026-11-16): a new `data` part, rebuilt from the ETH talk (12:45 to 19:12)

Built in its own session from `reference/malik-talk-map.md`, chapter 4. This is the section where he puts up
the three standard answers to "where does robot data come from" and knocks all three down, and ends by saying
out loud that he has argued himself into a corner. The part **stops in the corner on purpose** — Turing and
the child are the next part, and nothing here pre-empts them.

**9 slides, 29 clicks, about 14 minutes.** New files only: `parts/data.js` and `assets/data/`. Nothing shared
was touched: `order.js`, `lib.js`, `deck.html` and every other part file are untouched, so **the coordinator
still has to add `['data', ...]` to the running order** before it appears in the deck.

| # | Slide | What it shows | Clicks |
|---|---|---|---|
| 1 | Three places the data could come from | three drawn panels: a human driving a robot, a person with a head camera, a physics engine | 3 |
| 2 | Someone has to be the robot | the NASA photograph, then the three cues: leader and follower, it makes a human behave like a robot, vision is the only channel | 4 |
| 3 | And then it gets sped up | **5×** as the headline number, then two time bars: what the operator did against what the room gets shown | 3 |
| 4 | Two objections, and only one is about money | human sensorimotor limits (money cannot fix) against the domain gap (money probably can) | 3 |
| 5 | The natural signal | the Ego-Exo4D project's own video, embedded, with its paper card | 2 |
| 6 | What the video does not have | a hand against a two-prong gripper; a grip with the forces drawn as absent; then the three levels with the force level dashed out | 3 |
| 7 | The objection he refuses | navigation and locomotion both arriving at "cracked in simulation"; then sim-to-real struck through and his reply | 4 |
| 8 | Ten terms, and then a hundred and fifty | a ten-line reward list for pouring, each line needing a coefficient, next to a much taller block labelled 150 | 4 |
| 9 | Three doors, all closed | the three candidates struck out, a figure in a corner, and his question | 3 |

### Where the colour came from
One real photograph and one embedded video, as asked; everything else is drawn here as inline SVG. **No figure
of Malik's and no figure from anyone else's paper**, so this part still needs nobody's permission.

- **`assets/data/teleop-robonaut2-iss.jpg`** — NASA, ISS035-E-030791, Tom Marshburn teleoperating Robonaut 2
  on the ISS, 2013. **Public domain**; resized only, no crop. Via Wikimedia Commons.
- **Ego-Exo4D introduction video** — embedded from the Ego4D project's own YouTube channel, the exact video
  the official repository links as its introduction. An embed is a link; nothing is copied in.
- Three further Commons photographs were licence-checked and **not** used (two ESA, CC BY-SA 2.0; one Idaho
  National Laboratory, CC BY 2.0). They are listed in `assets/data/SOURCES.md` if you want a second image.
- **Could not find** a reusable photograph of someone wearing a head camera, or a real first-person kitchen
  frame. Commons has nothing; Epic-Kitchens is CC BY-NC, which this repo has avoided. So slide 6 is drawn.

### Honesty labels, on the slide face
- **The 5× figure** is his characterisation of how teleoperation results get presented in general, **not** a
  measurement of any one paper, and the slide says so under the number. Some groups do label their videos
  honestly, and the note says that out loud too.
- **The ten reward terms on slide 8 are ours, not his.** He gave the count and described the experience; he
  did not enumerate the list. The slide carries that line under the drawing, and the note repeats it.
- **150 is his own hypothetical** ("there might be some task where this list goes to 150"), not a reported
  number, and the stripes drawn for it are a texture, not a count. Said on the slide.
- **The photograph is not a data-collection rig**, and its caption says so.

### Verified in a browser
Served on 8163 from a throwaway preview page (since `data` is not in `order.js` yet; the page was deleted
after). At an emulated **1280x720**: **37 steps forward, 37 back**, console completely clean, every local file
200 or 304. Passages == clicks + 1 on all 9 slides, checked against the engine's own `data-step` grouping.
A geometry check over all seven drawings — text against text, text against every filled shape, everything
against its own viewBox, plus every `foreignObject` against the box that holds it — reports **zero problems**.
Screenshots taken of all nine.

Three things the browser caught that a script would not have:
1. **The two-line labels inside `d11Box` were laid out side by side and clipped.** The helper's inner div is
   `display:flex`, so a `<b>` and a `<span>` separated by `<br>` become two flex items in a row. Fixed here by
   wrapping each two-line label in a single `<div>`. **`parts/scorecard.js` slide 1 uses the same pattern and
   almost certainly has the same bug** — worth a look, but it is not my file so I left it alone.
2. **The simulation box overflowed its own rounded rectangle** by two pixels at 1280x720. Shortened the
   subtitle.
3. **The arrows on slide 7 only grew one arrowhead**, because `marker-end` fires once per path, not once per
   subpath. Split into two paths.

### The embed, same caveat as the others
No request to youtube.com is ever made in this preview pane — it blocks third-party frames, so the player is a
black rectangle here. That is the pane, not the embed. **Please click slide 5 in your own browser once before
class**, and the note already tells you what to say if the room has no internet.

### Questions for Fernanda
1. **Length.** 14 minutes for a six-and-a-half-minute stretch of his talk. If Day 11 is already long, the two
   slides I would cut first are **4** ("two objections, and only one is about money") and **6** ("what the
   video does not have"), in that order. Slide 4 is the most transferable idea in the part — telling a
   research problem from a budget — so I would rather keep it than slide 6, but it is the most cuttable.
2. **The two quotations are transcribed from auto-generated captions**, which the reference map warns about.
   They are: *"I don't buy this. It's just more engineering."* (slide 7) and *"So now I've put myself into a
   corner. So what the hell am I going to do?"* (slide 9). Both are in quotation marks on the slide. Would you
   listen to 16:30 and 18:50 once and confirm the wording, or would you rather I drop the quotation marks and
   render them as reported speech?
3. **The swearing on slide 9.** His line has "hell" in it. It is his sentence and it is the punchline of the
   section. Keep it verbatim, or soften it?
4. **The photograph.** It is an astronaut, not a data farm, and the caption admits it. If that bothers you,
   the alternative is to draw the rig instead, or to use one of the two ESA photographs listed in SOURCES.md,
   which are share-alike and would need their attribution printed on the slide.
5. **Slide 2 cue wording.** "It makes a human behave like a robot" is close to his phrasing and I think it is
   the line of the slide. The sub-line "his phrase for it is almost a torture session" puts the strong word at
   one remove. Say so if you would rather own it directly.
6. **Slide 9 ends in a discussion prompt** ("which of the three would you take, and which objection would you
   try to beat, thirty seconds with your neighbour"). That is my addition, not his. Cut it if the next part
   should follow straight on.
7. **All notes are drafts and all mine.** Slides 3, 7 and 8 are where the argument is carried in my wording
   and most wants yours.
## Part `child` (2026-11-16): Malik gets out of the corner — the talk from 19:12 to 35:14

Built as a new part, `day11/parts/child.js`, from chapters 5 and 6 of `reference/malik-talk-map.md`. It picks
up where the data-strategies part leaves off, with all three ways of training a robot knocked down. **13 slides,
44 clicks, roughly 20 minutes.** Nothing from his slides or his course PDFs is used; every drawing is ours.
**It is not wired into `order.js`** — the coordinator adds it when merging: `['child', 'Turing, the child, and the way out']` in `ORDER` (straight after the data part, which ends in the corner), and `'The child': 20` in `SEC_MINUTES`. The part calls `section('The child')` and every class it adds starts with `child-`.

| # | Slide | Carries |
|---|---|---|
| 1 | Turing had the answer in 1950 | the quote in Turing's own words, the public-domain photograph of him at sixteen, the 1950→2026 span and his aside about 76 years and thousands of unread psychology papers, the insight chips, "a whole can of verbs" |
| 2 | You are being fed a story | behaviour cloning taken literally — an adult wiring the child's motor commands — struck out, closing on **this ain't happening** |
| 3 | What actually happens | the drawn kitchen: her father washing up, her watching his hands; parents, peers, the apprentice in the bicycle shop; "and yet she cannot copy him" |
| 4 | She has itty-bitty hands | the two hands around the same mug; the forces are not visible; her body is not his body — **the embodiment gap**, which is the objection raised against human video in the previous part |
| 5 | So replace the girl by a robot | watch (a hint) → work it out in your own body → the skill; then the girl is swapped for a robot and nothing else changes; **Done** |
| 6 | Blind, and then not blind | a flight of stairs twice: feeling for the edge, and seeing it |
| 7 | From a video of a person to a policy in a body | the pipeline, one link per click: RGB video → 3D reconstruction → physics simulator → RL on top → one policy in the robot; **about 100 trajectories in all** |
| 8 | And it walks, a bit drunk | the VideoMimic authors' own clip, playing from their project page, with the paper card; his "looks a little bit drunk" |
| 9 | The same recipe, with hands | the *Do as I Do* trailer from the authors' page; whisking, pouring, brushing, stirring, hammering; **and the slide says cherry-picked, because he does** |
| 10 | How long he thought this would take | 2020 he expected one or two years; it is 2026, five or six years in, close but not solved |
| 11 | The hard stage is the second box | RGB-D against plain RGB, and why he insists on RGB (the data problem disappears); bodies → hands → objects, and objects were the real fight |
| 12 | Reconstruction by recognition | multi-view geometry struck out because a real video may have no parallax; one image retrieves a model you already hold |
| 13 | SAM 3D, and why it waited until now | the card with three live links; paired data was the shortage; CAD pre-training, then humans in the loop judging **which of two reconstructions is better**; "every new object is a combination of old objects" |

### What was verified, in a browser, at an emulated 1280×720
Served on 8164 and walked end to end through a temporary preview page: **68 steps forward, 68 back** to the
start, **console completely clean**, every local request 200. Passages == clicks + 1 on **all 13 slides**,
counted by the engine's own `data-step` grouping. A geometry check over all ten drawings reports **zero**
text-over-text, text-over-filled-shape, box-overflow or out-of-viewBox problems. Both videos were confirmed to
load and show picture in the pane.

Four things the browser caught that a script would not have:
1. **An `<b>` inside an SVG `<text>` silently ended the whole SVG** on slide 13 — the HTML parser closes the
   `<svg>` there, so half the drawing was laid out as block elements down the page. It is a `<tspan>` now.
   Worth knowing for the other parts: **never put HTML tags inside SVG `<text>`.**
2. **`d11Box` centres its label with flexbox**, so a `<br>` in a label puts the two lines *side by side*
   instead of stacking. This part wraps every label in one block (`childBox` in `parts/child.js`).
   **Other parts that pass `<br>` labels to `d11Box` almost certainly have the same bug** — `scorecard.js`
   does it on the three-problems slide. I have not touched them; one line in `lib.js` would fix it for
   everybody, if Fernanda wants it.
3. Three boxes were a line too short for their own text, so the top line was being clipped by the border.
4. Two stick figures had an arm shooting off above the head, from a units slip in the figure helper.

### Questions for Fernanda
1. **Length.** 20 minutes and 44 clicks for one section is a lot. If it has to come down, the two I would cut
   are **slide 10 (how long he thought this would take)** and **slide 6 (blind, and then not blind)** — in that
   order. I kept 10 because students almost never hear a senior person say in public that they were off by a
   factor of three, but it is an aside, not the argument.
2. **Slide 2 is the one I would protect.** If you only keep four slides from this part, keep 2, 3, 4 and 5.
3. **Colour.** The house rule forbids colouring words, so the colour in this part comes from the two embedded
   videos and one faint vision cone on slide 6. If you want more colour, the honest way is more of other
   people's video, not recoloured text. Say the word and I will look for a clip for the kitchen scene — but
   see the next point.
4. **The kitchen scene is drawn, on purpose.** A photograph of a father and his small daughter means a real
   identifiable child on a public site. If you would rather have a photograph, tell me and I will look for
   one in which nobody is identifiable, but I would not put a child's face on this page by default.
5. **"This ain't happening."** The slide prints it as he says it, contraction and all. If you would rather
   have your own words there, tell me what they are and I will swap it — but I think the quotation is better.
6. **Do you want the longer locomotion clip?** Slide 8 uses a 9-second loop. The authors' full 95-second
   trailer is listed in `assets/child/SOURCES.md` if you want to let it run for a minute.
7. **Draft notes, all mine.** Slides 2, 4, 5 and 9 carry the argument in my wording and most want yours —
   especially the last note on slide 9, about how to read any robot demo.
8. **Both videos need internet in the room.** They are hotlinked from the authors' project pages, so if those
   pages move, the clips go dark. The notes already tell you to read the address out loud and move on.
## Coordinator round (2026-11-16): the deck rebuilt on the talk, and assembled

Fernanda watched the ETH talk and said she had hoped we would recreate it. We were not recreating it: the deck
was built from his Berkeley course **Lecture 1**, which opens on the phylogeny of intelligence and Moravec's
paradox. **The talk never mentions Moravec.** I pulled the talk's transcript off YouTube's transcript panel and
mapped it in `reference/malik-talk-map.md`, and four worktree sessions plus this one rebuilt the session on the
talk's own structure.

**Running order is now the talk, section by section**, with the timestamp ranges in `order.js`:
`start` · `three` (0:00-7:44) · `levels` (7:44-12:45) · `data` (12:45-19:12) · `child` (19:12-35:14) ·
`touch` (35:14-42:30) · `questions` (43:25-50:28).

**The Moravec version is not deleted.** `parts/gap.js`, `paradox.js`, `why.js`, `bodies.js`, `scorecard.js` and
`close.js` are all still on disk and simply not listed in `order.js`. Putting that version back is one edit, and
it is also whole in the history at `59abf85`. Fernanda has not yet said which she wants kept.

### Assembled and verified
Merged `claude/d11-three-7506c7`, `claude/d11-levels-956bc9`, `claude/d11-data-f2ee1e` and
`claude/d11-child-012e52`. The only conflicts were in this file, where every session appended its own round;
all of them were kept.

Whole deck in a browser: **50 slides, 174 clicks, 35 drawings, 11 photographs, 2 embedded videos.** Console
clean, no broken image, passages == clicks + 1 on all 50, and the geometry sweep (text against text, text
against filled shapes, everything against its own viewBox) reports zero problems across all 35 drawings.

### The thing Fernanda has to decide: it is roughly twice a class
174 clicks is somewhere around 90 to 110 minutes with discussion. For a one-hour session this is about double.
That is not a defect of any one part — each section is a faithful length for what the talk spends on it — it is
that the talk is 50 minutes of a man talking quickly with no exercises, and a class is not.

Rough shape of the cost, so the cut can be made with eyes open:

| part | slides | clicks | what it is |
|---|---|---|---|
| `three` | 10 | 39 | the three problems, the Airbnb test, the hills, the verdict, the data gap |
| `levels` | 8 | 32 | Aristotle / Euclid / Newton, the omelette, why verbs under-specify, hands |
| `data` | 9 | 29 | teleoperation, human video, simulation, and the reward function problem |
| `child` | 13 | 44 | Turing, the girl and her father, perceptive locomotion, 3D from video |
| `touch` | 5 | 16 | where a body senses force, what touch is worth, peeling, the conclusion |
| `questions` | 4 | 14 | Gibson and von Uexkull; metamerism and the tie back to Day 3 |

My own read, for what it is worth. `child` is the biggest and also the best: the girl watching her father is
the idea students will remember, and the 3D reconstruction half of it is the part that could be cut to a
single slide without hurting the argument. `three` could lose the navigation detail and keep the verdict.
`questions` should not be cut, because it is the only part that connects to the rest of your course.

### What this part added (coordinator)
- **`touch`**: where a body senses force (skin, joints, muscles); Digit 360 and his own admission that the
  downstream uses of tactile sensing are limited; what touch is worth, with the bars drawn **schematically**
  because only his spoken 85 and 99 are in the talk and the paper's numbers are not; peeling a vegetable judged
  by a human; and the closing provocation that VLMs are a distraction and the real bar is cracking an egg
  99.99 percent of the time with generalization.
- **`questions`**: the first question (perceive for the task) with Gibson and von Uexkull, and his argument
  against training a vision encoder inside one task. Then **metamerism**, drawn as the infinite spectrum
  collapsing onto three cones beside the world collapsing onto a robot's few contacts, with his line "you are
  going to have a metamerism problem, but metamerism here is good". Day 3 taught metamers as a limitation of
  the eye; this is the same mathematics with the opposite moral, and it is why a policy trained on fractal
  terrain walks on a beach. The part closes by asking the class what a metamer is for their own project, and
  how they would ever find out they were wrong.
- `start.js` retitled to the talk, and its note now says plainly that the session is one talk, that the
  structure and opinions are his, and that they should go and watch it.

### Still open
- **Both embeds need internet in the room**, and neither has been seen to play: this browser pane blocks
  third-party frames, so the players render black here. Click slides with video in your own browser once.
- Every session logged its own questions above. The ones that need you most: how to cite things where the
  auto-generated captions are the only source for his wording, and whether the schematic bars on `touch` should
  stay schematic or be replaced with the real figures from the papers.

### Part: three — round 2, cut to the word budget

| | before | after |
|---|---|---|
| on-screen words per slide, median | 46 | **17** |
| on-screen words per slide, mean | 48 | **15** |
| total on-screen words, 10 slides | 484 | **153** |
| slides over the 25-word budget | 9 of 10 | **0** |
| figure labels over 6 words | 11 | **0** |

Every click survived: still ten slides and 39 clicks, still passages == clicks + 1 everywhere. Nothing was
deleted, only moved. Where it went:

- **Sentences became cues.** "Training one network end to end, pixels straight to motion, did not do well"
  is now **end to end** with a cross beside it, and the sentence is in the note. The whole of slide 3 went
  from 87 words to 16, which also let the photograph grow from a third of the slide to half of it.
- **Captions became citations.** The two photograph captions carried provenance (not from these experiments;
  not the street in his video). Provenance belongs in the citation line, so it moved there, where the
  checker does not count it and where it is still on screen and still honest.
- **The paper card became a citation.** Slide 4 had the full author list of the locomotion paper in a box
  next to the video, 26 words competing with the thing you are meant to be watching. It is now in the
  citation line, with the project-page link intact, and the slide says **trained in simulation / zero shot
  outdoors / next token prediction, then RL**.
- **One framing sentence became speech.** Slide 6 opened on "He offers this knowing it will annoy a lot of
  the field". The title already says it will offend people, so the sentence is now spoken and the first
  click goes straight to Navigation.
- **No quotations were on screen in this part**, so nothing had to be moved on that count.

One small layout change while I was in there: the arithmetic on slide 8 now has a rule above the last row
as well as above the total, so that a hundred million and a trillion read as two quantities being compared
rather than as one sum continuing.

Verified again at an emulated 1280x720: **48 steps forward and 48 back, console clean**, nothing outside a
viewBox or the stage, no text over text or over a filled shape, on every slide fully built.

**One thing to push back on, gently.** The 66 percent of my remaining on-screen words that sit inside
figures is not the same problem the measurement found. It is 101 words across ten drawings, and they are
axis ticks, two slope grades, three one-word trace labels and the names of the three problems. The ratio
went up because the prose around them shrank faster, not because the figures got wordier. I would read
that percentage as a flag to go and look, not as a number to drive down.
## Part `levels`, round 2 (2026-11-16): cut to the on-screen word budget

The measurement in `reference/check-slides.js` said this part was the heaviest in the session, and it was
right. Applied the pass.

| | before | after |
|---|---|---|
| words on screen, whole part | 639 | **132** |
| median per slide | 78 | **17** |
| mean per slide | 80 | **17** |
| slides over the 25-word budget | 8 of 8 | **0 of 8** |
| figure labels over 6 words | 7 | **0** |
| worst slide | "The credo" at 127 | "Three levels" at 23 |

No `levels` slide now appears in the deck-wide worst list at all. Clicks went 32 to 31, slides stayed at 8,
and **every idea and every citation survived** — the words moved into the notes, which is where the house rule
puts full sentences.

### What moved, slide by slide
- **1 "Here to New York"** (was "I cannot plan a trip to New York in muscle commands"). 61 to 18. The boxes
  are now *to the airport / fly / across town*; the two explanatory sentences under the drawing are spoken.
- **2 "Three levels"**. 48 to 23. The boxes keep the level names only; what each level *means* is said, not
  printed. Aristotle, Euclid, Newton still arrive on their own click.
- **3 "The top level really is solved"**. 91 to 20. The six-step recipe is now **six words** — crack, season,
  whisk, butter, pour, fold — and I say the method aloud. That is better than the old version, not just
  shorter: the slide now *demonstrates* the compression it is about.
- **4 "His fake equation"**. 69 to 22. Each term keeps a two-or-three-word gloss, because the rule for this
  deck is that any symbol on a slide gets labelled in plain language. The three-row argument became three
  cues.
- **5 "Two words of English"**. 78 to 11. Two photographs, *pick up* between them, one closing cue. This is
  the slide the budget improved most.
- **6 "What lifting a glass takes"**. 89 to 20, and **one click fewer** (5 to 4). The four things a hand
  solves at once were a list on the screen; they are now one spoken passage, and the figure keeps two-word
  curve labels.
- **7 "And the signal that tells you"**. 76 to 11. Each receptor is a three-word label.
- **8 "The credo"**. 127 to 13 — the worst slide in the deck became one of the lightest. The wine bottle, the
  burning at the stake and the lab's practice are all spoken.

### Attributions moved into the citation line
The seven photo credits were ~60 words of on-screen text across four slides. They are now in the `cite()`
line of the slide each image appears on, which is excluded from the budget and is where a credit belongs.
**No licence obligation was weakened**: every CC BY and CC BY-SA image still names its author and licence on
the same slide, and `assets/levels/SOURCES.md` is unchanged except to record where the credits now print.

### Verified
Served on 8162 at an emulated 1280x720. This part alone: 45 steps forward, 45 back, landing on the start,
passages == clicks + 1 on all 8, every note still marked `(draft)`. The whole assembled deck, 50 slides:
**264 steps forward, 264 back, console clean**. The geometry check caught one new bug — "most of the action"
on slide 2 was clipped by its own viewBox after the boxes were resized — and it is fixed; it now reports
nothing on either drawing.

### Two things worth raising
1. **Slide 7 now overlaps `parts/touch.js` slide 1.** Both name Merkel and Meissner. Mine shows them with
   illustrations at 10:14, where he first names them; `touch` says them in a note at 35:14. Not a clash, but
   somebody should decide which one is the first mention, because the second one will sound like a repeat.
2. **The skin illustrations have words baked into the picture** — "Merkel Cell (Tactile Disc)" and "Tactile
   Corpuscle (Meissner's Corpuscle)" are part of the image, so `checkSlides()` cannot count them. They are the
   authors' labels and I would keep them, but it means slide 7 reads slightly heavier than its score of 11
   suggests. Flagging it so the number is not trusted blindly.

The earlier questions for Fernanda in the round above still stand, except the one about length: at 31 clicks
and far less reading time per slide, this part should now run closer to 10 minutes than 12.
## Round 6 (2026-11-16): `data` cut to the on-screen word budget

Measured with `reference/check-slides.js`, run on `deck.html?only=data`.

| | before | after |
|---|---|---|
| total on-screen words (9 slides) | **434** | **103** |
| median per slide | **41** | **12** |
| slides over the 25-word budget | **9 of 9** | **0** |
| worst slide | 104 ("Ten terms…") | 18 ("Two objections…") |
| figure labels over 6 words | **16** | **0** |
| quotations displayed | 2 | **0** |

Per slide: 5, 13, 8, 18, 12, 12, 10, 17, 8.

**Click structure is unchanged.** Still 9 slides and 29 clicks, 37 steps forward and 37 back, and passages ==
clicks + 1 on every slide. No idea was dropped and no citation was dropped — the sentences moved into the
notes, which is where the house rule says full sentences belong.

### What moved where
- **Both quotations are now read aloud, not displayed.** "I don't buy this. It's just more engineering."
  (slide 7) and "So now I've put myself into a corner. So what the hell am I going to do?" (slide 9) are in
  the notes verbatim, with Fernanda saying them. The slides keep three words and four words of cue instead:
  *just more engineering*, and *So what now?*. This also settles question 2 and question 3 from round 5: the
  wording and the swearing are now a speaking decision, not a typesetting one.
- **Figure labels are nouns.** "Human sensorimotor limits / slow, clumsy, and no feel for the object" became
  "Human sensorimotor limits". "video hands you the top two. Manipulation lives in the third" became three
  boxes reading *goals*, *trajectories*, *forces*, and one short line.
- **Sourcing and honesty lines moved into the citation line**, which the budget excludes and which is still on
  the slide face. The photo caption ("not a data-collection rig"), the 5× health warning, and the note that 150
  is his hypothetical are all still printed — just in the citation slot rather than competing with the cue.
  Say if you would rather have any of them back in the body at full size.

### The reward slide was rebuilt, not trimmed
This is the one where the *shape* was always the argument, and the ten named reward terms were getting in the
way of it: the room was reading a list instead of seeing how long a list can get. So the terms are gone from
the screen — Fernanda says them — and the slide now draws the list. Ten readable lines for pouring, against a
block of **exactly a hundred and fifty** hairlines for a task that needs a hundred and fifty terms. The lines
are drawn to count, not to be read, and the count is checked in the browser.

This also fixes a problem from round 5 that I had flagged under its own heading: the ten named terms were
**our** breakdown, not his, since he gave the count and not the list. Lines assert nothing, so that caveat is
gone and only his own hypothetical "150" needs labelling.

104 words to 18.

### Verified again
At an emulated 1280x720: 37 steps forward, 37 back, console clean apart from the checker's own output, every
local file 200. The geometry check (text against text, text against every filled shape, everything against its
viewBox, every `foreignObject` against its box, and `.stage` overflow) reports zero problems. Screenshots of
all nine. The YouTube embed is still a black rectangle in this preview pane — that is the pane, not the embed.
One drawing fix while in there: the hundred and fifty lines had varying widths set by an arithmetic sweep,
which produced a visible diagonal moiré that read as decoration; the widths are now scattered so the block
reads as a ragged list.

### Open from round 5, still open
Length (14 minutes for a six-and-a-half-minute stretch; slide 4 then slide 6 are the cut order), whether the
NASA photograph should be replaced by a drawing, and the slide 9 discussion prompt, which is my addition and
not his. All notes are still drafts.
## Part `child`, round 2 (2026-11-16): cut to the on-screen word budget

Fernanda has said three times that the slides are too text-heavy, and a measurement of the assembled deck put
the blame partly here: `child` was the biggest block of text in the session. Measured with
`reference/check-slides.js`, on screen, not counting the title or the citation line:

| | before | after |
|---|---|---|
| words in the part | **659** | **146** |
| median words per slide | **46** | **11** |
| slides over the 25-word budget | **12 of 13** | **0 of 13** |
| figure labels over the 6-word budget | **20+** | **0** |
| worst slide | SAM 3D, 90 words | SAM 3D, 19 words |

No content was lost. Every sentence that came off the screen went into the speaker note, which is where the
house rule puts full sentences. Clicks went from 44 to 43 and the notes still run one passage per click plus
one for the title on all 13 slides.

**What changed, concretely**
- **The Turing quotation is no longer on the wall.** The screen says *Not the adult. The child.* and the
  quotation — "instead of trying to produce a programme to simulate the adult mind…" — is in the note, for
  Fernanda to read aloud. It is the best sentence in the section and it belongs in her mouth. The slide title
  is now just **Turing, 1950**.
- **The pipeline is five pictures and five words**: a film frame, a dashed reconstruction box with a figure in
  it, a ball being pushed on the ground, three stacked variation frames, a robot. The words underneath are
  *video, 3D, physics, practice, the robot*. It used to be five captioned paragraphs, 59 words, all of it in
  the figure. The explanation of each stage is in its note.
- **The two paper cards moved into the citation line.** Titles, full author lists and arXiv numbers are a
  citation, not a cue; they are still on the slide, still clickable, in the place a citation goes. That alone
  took 38 and 41 words off those two slides.
- Labels everywhere cut to one to four words: *parents · peers · the bicycle shop*, *watch → do it yourself →
  the skill*, *no vision / it can see*, *triangulate / no parallax*, *CAD models → then people → A | B*.
- Two in-figure sentences were dropped from the face and are only spoken now: "how cultural knowledge gets
  from a body to a body", and "the variety is manufactured inside the simulator, not collected by people".

**The 3D half is now a clean cut.** Fernanda has not decided whether Day 11 comes down to one class, so
nothing is cut — but the order changed so that the decision is cheap. The 3D block is **slides 10, 11 and 12**
(RGB video · reconstruction by recognition · SAM 3D), consecutive and self-contained, and the section now
**ends on slide 13, "How long he thought this would take"**, which used to sit in the middle. Drop 10 to 12
and the part still opens on Turing and still closes on his honest timeline, with nothing before or after
needing a rewrite. That takes the part from 13 slides to 10 and from about 18 minutes to about 13.

**Where the rest of the deck stands**, measured at the same time, so the coordinator can aim the next pass
(median on-screen words per slide): `levels` **78** across 8 slides, `three` **46** across 10, `data` **41**
across 9, `start` **30**, `touch` **17**, `questions` **15**, `child` **11**. The whole deck is 50 slides,
1888 words, median 33, with 28 slides still over budget — and 26 of those 28 are in `levels`, `three` and
`data`.

### Verified again
Served on 8164, walked end to end at an emulated 1280×720: **67 steps forward, 67 back**, console clean,
passages == clicks + 1 on all 13 slides, and the geometry check reports zero text-over-text,
text-over-filled-shape, box-overflow or out-of-viewBox problems across all eleven drawings. Both videos still
load and show picture.

### Questions this round
1. **Is "Not the adult. The child." enough on the Turing slide?** It is four words carrying the most important
   idea in the section. If you would rather the class saw the sentence, the note has it verbatim and it can go
   back on the slide in one edit — but then that slide is 50 words again.
2. **Do slides 10 to 12 go?** They are now a clean three-slide cut. I would keep them if Day 11 gets two
   classes and cut them if it gets one; the argument survives either way, and only the vision content is lost.
3. The earlier questions still stand: whether the kitchen scene should be photographed rather than drawn
   (I think not — a real child on a public site), whether "This ain't happening" stays in his words, and the
   draft notes on slides 2, 4, 5 and 9, which most want your wording now that they carry more of the talking.
## Coordinator round (2026-11-16, later): the whole deck cut to the on-screen word budget

Fernanda, for the third time: there is too much text on the slides. So it got measured instead of guessed.

**Before:** 2,791 on-screen words across 50 slides, median 51 a slide. And the finding that explained why two
earlier attempts had failed: **43 percent of all on-screen words were inside the SVG figures**, as labels in
boxes. Adding "visuals" had made it worse, because the visuals were diagrams built out of labelled rectangles,
and a sentence in a rectangle is still a sentence on the wall.

**After:** **694 words, median 14 a slide. A 75 percent cut, with all 50 slides and every idea intact.**

| part | words/slide before | after |
|---|---|---|
| `three` | 48 | 15 |
| `levels` | 80 | 17 |
| `data` | 48 | 11 |
| `child` | 51 | 11 |
| `touch` | 56 | 19 |
| `questions` | 67 | 15 |

Nothing was deleted. Every sentence that came off a slide went into its note, which is where the house rule
puts full sentences. All the quotations are now read aloud rather than displayed.

`reference/check-slides.js` holds the budget and measures it in the browser: 25 words a slide, 6 a figure
label. Load it on the running deck and call `checkSlides()`. **It currently reports zero slides and zero
labels over budget.** Run it after any edit.

### Verified on the whole deck
215 steps forward and 215 back, console clean, no broken image, passages == clicks + 1 on all 50 slides, and
the geometry sweep reports zero problems across all 35 drawings. 49 slide transitions plus 166 clicks; the
cuts removed 8 beats that were carrying nothing but words.

### Two slides worth looking at, because they show what the budget bought
- **`levels`, "Two words of English"**: a photograph of a sugar cube beside a photograph of a loaded tray,
  with "pick up" above them and "Same words. Different problem." below. Eight words, and the argument lands
  before anyone has finished reading.
- **`data`, "Ten terms, and then a hundred and fifty"**: ten readable bars becoming a wall of unreadable
  ones. The shape is the argument. The citation says plainly that 150 is his own hypothetical rather than a
  reported number, and that the lines are drawn to count and not to be read.

### Still open
- **Length.** The cut removed words, not slides: 50 slides and 166 clicks still runs well over an hour. That
  decision is still Fernanda's, and `feedback` above has the per-part cost.
- **The two video embeds** still have not been seen to play; this preview pane blocks third-party frames.
- The Moravec version is still on disk, unlisted in `order.js`, and whole in the history at `59abf85`.

## Coordinator round (2026-11-16, evening): the drama turned down

Fernanda, on seeing the credo slide: "omg lol sooo dramatic… can you remove some of that violent drama?"

Fair. The deck had picked up Malik's more theatrical phrasings and then repeated them, which read as melodrama
rather than as reporting. Changed:

- **`levels`, the credo note.** The Middle Ages and the burning at the stake are gone. The note now says he
  states it as an article of faith and will not argue for it, which is the substance — the point is that he is
  telling you which of his claims is evidence and which is a bet, and that survives without the pyre.
- **`data`.** The word "suffering" appeared five times across the notes and once on a slide. The on-screen line
  "Nobody suffered" is now "Nobody puppeteering", and the notes say the job is tedious and physically awkward,
  which is both less lurid and more accurate.
- **`child`.** "Teleoperation tortures the human" is now "puts the human in an awkward rig".

**And then that one went too** (Fernanda: "cut it too"). The note on `data` slide 20 now says he is blunt
about how unpleasant the job is, and leaves it there. His objection still rests on the human cost, which the
rest of the note carries: tedious, physically awkward, done at scale by thousands of people, with vision as
the only sense. **A scan of all 50 slides and every note now finds no instance of stake, burning, torture or
suffering, on screen or in the notes.**

Verified after the change: 50 slides, median 14 on-screen words, nothing over budget, passages == clicks + 1
everywhere, console clean.

**Note for Fernanda:** the slide in your screenshot was the pre-cut version of the credo slide, with a subtitle
paragraph under the title. That slide is now a cue, two photographs and "You need hands". Your browser was
showing a cached copy — add a query string to the URL, as in `deck.html?x=1`, or hard-reload.

## Coordinator round (2026-11-16, later still): the second credo, and Ted Adelson

Fernanda asked whether the credo is about touch, whether Adelson says the same thing and is quoted, and for a
slide with the checkershadow.

**One correction, because it matters for how you present it.** His credo at 11:42 is about **hands**: to get
human-like physical intelligence you need multi-fingered hands. The touch claim is a **second** belief, made
much later at 37:43: he does not think robotics gets solved without solving tactile sensing. He flags both,
deliberately, as beliefs rather than results. So you were half right, and the half you were missing makes the
talk better: the same bet is placed twice, from both ends — **hands are the instrument, touch is the sense.**
Both parts now say so: `levels` names this as the first of two, and `touch` slide 2 has a third beat,
"His second belief · no robotics without touch", with the pairing spelled out in the note.

**And Malik does not quote Adelson.** At 37:59 he says only that the sensor tradition goes back to GelSight,
and GelSight is Adelson's, with Micah Kimo Johnson and others at MIT. The rest of the connection is ours.

**New slide, `touch` slide 3: "The same person, twice."** The checkershadow, then the proof bar showing A and B
are the same grey, then "He also built GelSight", then "A camera, looking at a gel". Four clicks, fourteen
words on screen.

The reason it earns its place is the rhyme, and the note says it out loud: the man who spent a career showing
that seeing is **inference** rather than measurement then built a way for a robot to **feel by looking**.
GelSight is a soft gel with a camera behind it, watching the gel deform. And that sets up the metamerism slide
at the end of the session, because both are about the same thing — what a sense actually delivers is never the
world itself.

Images: `assets/touch/checkershadow.svg` (CC BY-SA 4.0) and `assets/touch/checkershadow-proof.svg`, both from
Adelson's MIT page via Wikimedia Commons. **The attribution line is printed on the slide and must stay.**

- [x] **Licence on the proof image: decided, keep it.** It is tagged "copyrighted free use" on Commons
      rather than carrying a named licence, and that tag says to verify at the source; Adelson's own page grants
      use for non-commercial educational purposes, which this is. Fernanda was shown this and chose to keep it
      (2026-11-16). The exit, if it is ever needed, is written down in `assets/touch/SOURCES.md`.

Verified: 51 slides, 221 steps forward and back, median 14 on-screen words, nothing over budget, no broken
image, passages == clicks + 1 everywhere, console clean.

### Part: three — round 3, ten slides into four

Four slides now, 36 clicks, every idea kept. New titles:

1. **Connecting perception to action** (14 clicks) — perception to action and the three problems, then the
   Airbnb floor plan, then the Spot photograph and the three findings.
2. **Locomotion** (7) — the authors video and the recipe, then the 29 and 41 percent grades and the street.
3. **The verdict he says will offend people** (4) — unchanged.
4. **The data is the wrong shape** (11) — sensorimotor trajectories, then the arithmetic, then the log ruler.

**How the merging works, because it is new in this file.** Each of slides 1, 2 and 4 is built from
**stages**. A stage is one figure with its own clicks and its own citation line, and when a stage arrives
the previous one is hidden, so **only one figure is on screen at a time**. Stages are written in reverse
order in the DOM and ordered by `data-step`, which lets plain CSS hide a replaced stage with a
following-sibling selector and no `:has()`. The engine reveals by `data-step`, not DOM order, so the clicks
still run forwards, and back works the same way. If this shape is useful, it is four lines of CSS and it
would let the other long parts merge the same way.

**The word budget, and a measurement problem it creates.** `checkSlides()` counts the whole slide
including the stages that are not on screen, so it now reports these four slides at 49, 17, 17 and 58
words and calls three of them over budget. That number is not what anybody sees. I walked all 36 clicks
and measured what is actually on screen at each one:

| slide | stage | words on screen |
|---|---|---|
| 1 | perception to action | 11 |
| 1 | the Airbnb plan | 21 |
| 1 | what they found | 17 |
| 2 | the video | 10 |
| 2 | the hills | 7 |
| 3 | the verdict | 17 |
| 4 | trajectories | 18 |
| 4 | the arithmetic | 18 |
| 4 | the log ruler | 22 |

Nothing over 22, and the maximum is still under 25. If the checker is going to keep being the referee,
it needs to skip elements whose computed display is none — that is a one-line change in
`check-slides.js`, which is not my file, so I have not made it.

**One thing did go, and it was mine.** The second "Ten thousand times" slide, the one that showed the
gap as a square with the child as a speck in the corner, is gone. It said the same thing as the log ruler,
I flagged it as the cut in round 1, and the suggested shape for slide 4 did not include it. Its sentence
survives in the last note, so Fernanda can still say it over the ruler. If she wants the picture back it
is in the history at 1e7c77d.

**Verified** at an emulated 1280x720: 36 clicks forward and back, console clean, **exactly one stage
visible at every beat in both directions**, passages == clicks + 1 on all four (15, 8, 5, 12), nothing
outside a viewBox or the stage box, and no text over text or over a filled shape, checked on every stage.

Note for whoever updates `order.js`: the section is still called `Three problems`.
## levels — round 3: eight slides merged down to five

Fernanda says the session reads as repetitive and wants roughly 25 slides. `levels` went from 8 slides
and 31 clicks to **5 slides and 27 clicks**. Nothing was deleted. Each merge turns two slides into one
slide with more clicks, and every idea, every citation and all seven image credits survived.

| was | now | clicks |
|---|---|---|
| 1 Here to New York + 2 Three levels | **1 Three levels** | 7 |
| 3 The top level really is solved + 4 The fake equation | **2 The top level is solved** | 7 |
| 5 Two words of English | **3 Two words of English** (untouched) | 4 |
| 6 What lifting a glass takes | **4 What lifting a glass takes** (untouched) | 4 |
| 7 And the signal that tells you + 8 The credo | **5 Touch, and the case for hands** | 5 |

**One departure from the suggested shape, and why.** The suggestion was to merge 6, 7 and 8 into one
"Forces, and hands" slide, falling back to keeping the credo separate. I tried the forces plot and the two
receptor illustrations on one screen at 1280x720 and it does not hold: the plot has to shrink to about half
width, and at that size its own axis and curve labels stop being readable from the back of a room. So the
receptors merged into the credo instead. Same slide count, and it reads better anyway — the top row is what
a hand has, the bottom row is what a robot has and what he thinks it should have, and "a gripper has neither"
is now a label on the gripper photograph rather than a separate line.

Also: the omelette quotation ("Crack the eggs into the bowl") is off the screen entirely. It was a quotation,
and the budget rule is that quotations are read aloud. It is in the note, where it lands harder.

**On screen, after the merge** (`checkSlides()`): 99 words over 5 slides, median 21, mean 20, **0 of 5 over
the 25-word budget**, 0 figure labels over 6 words. Deck-wide the whole 49-slide deck now has 0 slides over
budget, median 13.

**Verified** at an emulated 1280x720: this part alone, 35 steps forward and 35 back, landing exactly on the
start; passages == clicks + 1 on all 5 slides by the engine's own `data-step` grouping; all notes still
`(draft)`. The whole assembled deck, 262 steps forward and 262 back, console completely clean. The geometry
checker (text over text, text over ink, outside the viewBox, under the citation line) reports nothing.

**Still open from earlier rounds**, unchanged: whether this part or `parts/touch.js` is the first mention of
Merkel and Meissner (my slide 5 is at 10:14, touch slide 1 is at 35:14 — now that mine is a four-image slide
the overlap is more visible, so it is worth a decision); and `parts/close.js` still has the `d11Box` flex bug.
## Round 7 — the data part, ten slides down to four (2026-11-16)

Fernanda said the deck feels repetitive and wants about 25 slides instead of 54, by merging rather than
deleting. The `data` part is now **four numbered slides** instead of ten. Nothing was deleted.

How: the stages are joined with the engine's `sub: true`, so a group shares one slide number and gets no
white lead-in between its beats. The five teleoperation beats play as one slide, `1A` to `1E`, and the HUD
reads `1C / 4`. True single-stage merging was not possible here — each of those beats is a full-stage figure
— so this is the merge the engine supports, and it is what removes the repeated full-screen reset that makes
a deck feel long.

| | before | after |
|---|---|---|
| numbered slides | 10 | **4** |
| stages (beats) | 10 | 10 |
| clicks | 31 | 30 |
| on-screen words, total | — | 137 (median 14) |
| slides over the 25-word budget | — | 0 |

The four: **1 Where the data comes from** (the three candidates, the rig, the clip, the 5x speed-up, the two
objections) · **2 Videos of humans** (the natural signal, the wrong body, no forces) · **3 Simulation** (the
objection he refuses, and the reward wall) · **4 Three doors, all closed**.

Each beat keeps the wording of its old title as a small muted kicker under the group title, so no idea lost
its label: "candidate one: teleoperation", "the trajectories were slow", "two objections", "the natural
signal", "two problems", "the objection he refuses", "the real problem". They cost three or four words each
and every slide is still inside the budget.

**The clip Fernanda asked for.** The coordinator said it had added a slide, "Watch someone be the robot",
embedding the talk at 13:38. That slide is not on this branch and is not in any branch here, so I built the
beat: the talk embedded from 13:38, as `1C`. **Please check that 13:38 is the moment you meant** — the
transcript map in `reference/malik-talk-map.md` does not record what is shown there, so I have not described
it on the slide or in the note beyond "the rig at work".

Fixed in passing: the "what you were shown" bar on the 5x beat sat two pixels below its viewBox.

Still open from round 5: the part runs about 14 minutes for a 6.5-minute stretch of talk (cut order:
the two-objections beat, then the wrong-body/no-forces beat); whether the NASA photograph should be a
drawing instead; and whether the discussion prompt at the end is wanted, since it is mine and not his.
## Part `child` — round 3: thirteen slides merged into five (2026-11-16)

Fernanda said the session felt repetitive and asked for roughly 25 slides instead of 54, by merging rather
than deleting. `child` was the largest part in the deck, so this is the biggest single saving available.

**13 slides, 43 clicks → 5 slides, 26 clicks.** Nothing was cut. Each old slide became a beat on a bigger
slide, and the notes were joined in the same order, so the argument runs exactly as it did.

| new slide | clicks | was |
|---|---|---|
| 1. Turing, 1950 | 4 | old 1, unchanged |
| 2. What imitation actually is | 6 | old 2 + 3 + 4 + 5 — the whole nugget as one build of three panels |
| 3. From a video of a person to a policy in a body | 5 | old 6 + 7 — blind/seeing stairs, then the pipeline |
| 4. And it walks, a bit drunk | 5 | old 8 + 9 + 13 — both videos side by side, and his own timeline |
| 5. Getting the 3D | 6 | old 10 + 11 + 12 — the droppable 3D block, now ONE slide |

Slide 2 is now three panels left to right: behaviour cloning taken literally and crossed out ("This ain't
happening"); the drawn kitchen with "parents · peers · apprentice" and the two reasons she cannot copy him
("no forces", "itty-bitty hands"); and the chain watch → do it yourself → the skill, with the girl swapped
for a robot. Six clicks walk across it. It reads better as one build than it did as four screens, because
the earlier panels are still on the wall when the formula arrives.

Slide 4 puts the two videos side by side with a caption each — "a bit drunk" under the walking robot,
"whisking · pouring · brushing" under the hands — then "Cherry-picked, he says so", then "six years, not
two". Three honest admissions in a row, which is a better slide than three separate ones.

**The 3D half is still a clean cut, and is now one line.** Slide 5 is the last `st(...)` call in the file.
Delete it and the part is 4 slides and about 11 minutes, ending on his timeline. Nothing before it changes.

**Word budget held.** `checkSlides()`: 5 slides, 92 on-screen words, median 16, worst slide 23, nothing over
the 25-word budget, no figure label over 6 words. (Round 2 was 13 slides / 146 words.)

**Verified** at an emulated 1280×720: 30 steps forward and back to the start, console clean, passages ==
clicks + 1 on all five slides, and zero text-over-text, text-over-fill, box-overflow, out-of-viewBox or
orphaned-SVG problems with every beat revealed. Both videos load and show picture.

### Questions for Fernanda
- [ ] Slide 2 carries four old slides. Is six clicks on one picture the right pace, or should the kitchen
      panel split back out on its own?
- [ ] Slide 4 ends the section on "six years, not two". If slide 5 stays, that line now sits in the middle
      of the part rather than at its end. Keep it on slide 4, or move it to the end of slide 5?
- [ ] Does slide 5 go? It is one deletion either way.
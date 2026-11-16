# Jitendra Malik, "Vision and Robotics for Embodied AI" — what the talk actually says

ETH Zurich, Frontiers of Embodied AI. 50:44. Recording: https://www.youtube.com/watch?v=HvDU7Vk4pbc
Transcribed from YouTube's auto-generated captions (read off the transcript panel, 2026-11-16). Timestamps are
the caption timestamps. Quotations below are from the **auto-generated** captions, so wording is approximate
and names are often mangled — check any quote against the video before it goes on a slide in quotation marks.

**This is not the same talk as his course Lecture 1.** Lecture 1 opens on the phylogeny of intelligence and
Moravec's paradox. This talk never mentions Moravec. It opens on the three central problems of robotics and
spends most of its length on **manipulation and where the data will come from**. Our Day 11 deck as of
`59abf85` is built on the Lecture 1 frame, not this one.

## Chapter structure (YouTube's own chapters)
1. Navigation and locomotion (0:00)
2. The manipulation challenge (4:08)
3. Hierarchical robotics control (7:44)
4. Data acquisition strategies (12:45)
5. Learning from human behavior (19:12)
6. 3D reconstruction and vision (26:26)
7. Tactile sensing and research (35:14)
8. Concluding thoughts (41:10)

## The spine

**0:24 — The definition and the three problems.** Robotics is "connecting perception to action". The central
problems "that most people would agree" are **navigation, locomotion and manipulation**.

**0:42 — Navigation: the Airbnb test.** GOAT, "go to anything", about two years old. He told the team the
challenge is: rent an Airbnb, know nothing about it, open the door, put the robot down, give it a task. "Go
find the television, go find a potted plant" — the goal can be given as **language, as an image, or as a
geometric location**. Spot robot, but he says the robot is not the point, the software is. It builds a
**partial semantic map**, not a full SLAM: "It builds what is needed. This is how we humans operate." Trained
in simulation, so it knows where kitchens are likely to be. ~200 object instances evaluated.
**Scientific findings he states:** end-to-end policies did not do well; a **modular** approach with the best
vision system per module is wise; what you do need learning for is **efficient exploration policies**.
Failure rates are mostly computer-vision failures — "if you don't like the results you just wait for the next
generation of your foundation model".

**4:08 — Locomotion.** Quadrupeds then humanoids. Trained in simulation, **zero-shot** in the real world. Long
hikes around Berkeley. Then San Francisco hills: a 29% slope, and then he asked for the steepest street in the
city, found one at **41%**, and it worked — "it was not trained with that big a range in simulation". The Digit
robot (Jonathan Hurst / Agility). Method: a stage of **self-supervised learning** (next-token prediction on
sensorimotor sequences) then a stage of **reinforcement learning**.

**6:01 — The sweeping remark**, offered as something that will "probably offend people": **locomotion, good
progress. Navigation, nearly done. Manipulation, a long way to go.** Most of the talk is manipulation.

**6:17 — Why: data.** Much harder to get than for language and vision, "because a very fundamental reason is
that the relevant data here is **sensorimotor trajectories**, and we need sensorimotor trajectories in the body
of the robot. We don't even have sensorimotor trajectories for humans, much less for robots."
**The 10,000× figure, with his arithmetic:** an LLM has on the order of 10,000× more data than a human child.
"A human child hears a million words a month. So at the age of 10 you have about 100 million words. And
obviously we are operating at close to a trillion." So it is 10^12 against 10^8. **We cannot afford to be as
wasteful in this domain as we could be in language.**

**7:44 — The hierarchy.** "If I talk about how I can go from here to New York, I cannot plan it at the level of
muscle commands." Three levels:
- **Goals and plans** → connects to cognitive vision
- **Motion trajectories in 4D**
- **Forces and torques**
At the end of the talk (42:02) he gives them names: **"the level of Aristotle"** (high-level planning),
**"the level of Euclid"** (the middle), **"the level of Newton"** (the bottom). "Most of the action is at the
level of Euclid and Newton."

**8:11 — The omelette.** He asked an LLM how to make an omelette; the slide is **Google Gemini's answer**.
There is a sentence in it: "crack eggs into the bowl". "Now the question is how do you operationalize that in
the body of a robot?" LLMs and VLMs are the right tool for *this* level and have the knowledge for it.

**8:52 — "A fake equation": action = movement + goal.** Behaviour is goal-directed, but actions are achieved by
movements in the physical world. "Language is good for the goal part but not for the movement part. Language is
a compression device, so you do not specify trajectories in detail."

**9:32 — Atomic actions and why verbs under-specify.** Actions at the scale of one or two seconds, matched to
verbs. "Pick up and put down — this is just one phrase in English. But how you pick up an object? You could be
picking up a sugar cube which is 1 cm. You could be picking up a big tray which is much heavier. We use the
same term. So the semantics is what is captured. The actual motion trajectory can vary a lot."

**10:14 — Forces, the third level.** F = ma. A neuroscience figure of picking up an object: normal force, grip
force, friction so it does not slip, compensating for gravity, contact events changing forces. Tactile signal
from the skin and fingertips — he names **Merkel** and **Meissner** receptors.

**11:42 — The credo.** He explicitly refuses to argue it: "I'm just going to state that as a religious belief…
if it was the Middle Ages, you didn't like it, you could burn me at the stake." The credo: **to achieve
human-like physical intelligence we need multi-fingered hands.** Evidence offered: everyday tasks done with
parallel-jaw grippers have high failure rates — "if that bottle of wine was worth $250 you probably want a
power grasp rather than a two-point grasp". "Everything I do in my lab — we don't do parallel-jaw grippers."

**12:45 — How should we train robots? Three standard answers, and he attacks all three.**

1. **Teleoperation** (leader–follower; the dominant approach). "This is where there are maybe thousands or
   millions of people all around the world doing this, this I think very painful job." Why painful: **it makes
   a human behave like a robot** — "it's like a torture session almost". The only sensory modality is vision;
   **no haptic feedback**; you are a puppeteer. So the recorded trajectories "are very slow because this poor
   human is suffering… and so therefore all those results are after that **sped up by 5×** so as to make them
   appealing to you." Two problems: human sensorimotor limitations (the strong one), and domain gap (the weak
   one — "probably with enough money you can solve that, but you can't use money to solve the first problem").
2. **Videos of humans** (egocentric or exocentric). As an ex-computer-vision person, "I love this. I think this
   is the natural signal." The problems: an **embodiment gap** (the data is in the human body, not the robot's,
   so it needs retargeting) and **no contact forces** — "you don't have that information if you just collect
   visual data".
3. **Simulation.** You get forces, because it is a physics simulator. And the existence proofs are on his side:
   navigation and locomotion were **both cracked with simulation**, "so this should in fact be your prior".
   On the standard **sim-to-real** critique: "I don't buy this… those are fundamentally surmountable problems.
   It's just more engineering." He repeats this later (36:08) with the analogy that people complained neural
   nets needed too much tuning versus SVMs in 2012–13, and then learned to tune them.
   **The real problem with simulation is specifying RL rewards.** Easy for locomotion, hard for manipulation.
   His student's pouring task needed every stage specified painfully, ~10 reward terms, "but there might be
   some task where this list goes to 150, and then there are coefficients". **"I think this is actually the
   reason why people have given up"** — whereas with behaviour cloning on teleop trajectories "you're good to
   go on day two".

**18:50 — "So now I've put myself into a corner… So what the hell am I going to do?"** Then the hope.

**19:12 — Turing, 1950**, a quote he says he has used for ten years and will keep using: instead of trying to
produce a program to simulate the adult mind, why not rather try to produce one which simulates the child, and
then subject it to a course of education. "Turing was writing this paper in 1950 and now it's 26, so that's 76
years later", and in the meantime psychologists have written thousands of papers. Insights he flashes:
**multimodality (vision, touch, proprioception), hierarchies, physical search, social imitation learning,
language.** "This is essentially opening up a whole can of verbs."

**20:24 — The nugget: what imitation learning actually is.** "You are being fed a story when you are being told
imitation learning is behaviour cloning. Behaviour cloning would mean that the adult controls the neural
circuits of the child so that the child can pick up the object. **This ain't happening.**"
What actually happens: a **father washing dishes and his little daughter watching**. That is how cultural
knowledge is transmitted — parents, peers, teachers, the apprentice in the bicycle shop. But she cannot copy
him directly: she does not know the contacts and forces, and **there is an embodiment gap between the girl and
her father** — "she has itty-bitty hands". So she has to **learn the task in her own body**, with a hint from
watching, by **play and trial and error**. "So to me this is the formula. **Just replace the girl by a robot.**
Done. I intend to devote the next few years of my [career] to making this slide a way to solve robotic
manipulation."

**22:24 — The existence proof: perceptive locomotion** (CoRL paper, prize-winning). Blind vs perceptive
locomotion; vision is what you need for stairs and difficult terrain. How it was trained: **collect RGB video
of humans → 3D reconstruction → put it in a physics simulator → RL on top to make it robust.** "Arthur" is the
human whose actions are reconstructed and retargeted to a humanoid. **About 100 trajectories total**, "a much
smaller number than the thousands of hours that people collect", because the variation is created inside the
simulator. He notes the robot "looks a little bit drunk", and that the standard RL answer is "if I just train
it a bit more it will no longer look [drunk]".

**25:34 — The recipe, stated plainly:** learn the cultural part from video (affordances), then **practise in
your own body** in a simulator. "So now the data problem is gone. YouTube has 5 billion plus videos. I looked a
few years ago, it was 156 million hours. So you do not need to pay all those people who are suffering."

**26:26 — Hot off the press**, a CoRL submission: top row, actions performed by a human; bottom row, the same
actions performed by a robot with dexterous hands — whisking in a kitchen, brushing, pouring. "Of course these
are cherry-picked videos like they always are."

**27:47 — The honest aside about how long this took.** "I have been in this enterprise for years now, for five
or six years… in 2020 I thought oh we can do it in two years or one year, and it's 2026 and even now it's not
fully solved. It's close to solved but not fully solved."

**28:26 — 3D from RGB video is the hard first stage.** RGB-D makes life much easier and many do it, "but I want
to solve this with RGB video because then the data problem just disappears. Everything is there on YouTube."
History: 3D humans with **Angjoo Kanazawa** from ~2018, then hands with **Georgios Pavlakos**, "and after
fighting that battle for six years I feel okay, we've solved it" (said half-joking). Then objects turned out to
be the real challenge.
**Reconstruction by recognition, not multi-view geometry.** "The typical way people approach 3D is as
multi-view geometry. But I don't want to approach it as multi-view geometry… there may not be much of a
parallax signal. So I want to approach 3D really by recognition." You have seen the object before from other
viewpoints, you have a 3D model in memory, a single image retrieves it. That is **SAM 3D**, with a team at
Meta, appearing at CVPR. Full 3D per object, "not just a 2.5D sketch, not a point cloud".
Why it waited until 2026 when photogrammetrists have been at it for 150 years: **shortage of paired data.**
How they got it: CAD models for pre-training, then mid-training and fine-tuning, then **humans in the loop** —
"humans are not necessarily good at reconstructing objects metrically, but if you give them two
reconstructions they can choose which one is better" — and finally computer-graphics artists for the hard
cases. "Once you have reconstructed a million objects, every new object is like a combination of old objects."
The model is **open, downloadable**.

**35:14 — Dexterous manipulation results**, offered with a caveat: "my results are not going to be the most
impressive demos that you can see in dexterous manipulation, but I want to show these because these are
consistent with my philosophy." He flags reward hacking as something to avoid. "The set of manipulation tasks
is infinite, so there's a long way to go."

**36:52 — Forces and tactile sensing.** Sensing at the finger and at the joints; humans have both tactile
sensors and sensors in joints and muscles. **Digit 360** is "the gold-plated Cadillac version", "an amazing
sensor", "probably overkill" — and the honest problem is that **downstream uses of tactile sensing have been
rather limited**: "we really need to do a lot of research showing that tactile sensing is indispensable, which
is what I believe. I don't think that we can solve robotics without solving the problem of tactile sensing."
The design tradition goes back to **GelSight**.
**The key figure (38:16):** a comparison of vision only / proprioception only / vision + touch / touch only
against ground truth. **Vision + proprioception + touch almost reaches ground truth.** "If you don't use touch
you will get a certain cherry-picked demo if you like, but the numbers you will lose. You will not get to 99.
You will get to 85. And that may be all the difference between being real or not."
**39:05 — Better sensing means fewer demos.** With a sharper hand and good sensing: a few hundred demos rather
than the few thousand a typical VLA-style policy needs. Architecture direction: **next-touch prediction**.
**40:07 — Peeling vegetables with a knife**, needing position *and* force control, trained with an **RLHF-style
loop**: a human judges what counts as a good peeling job. "Michelin three-star restaurants do not have to worry
just yet, but it's a step in the right direction."

**41:10 — Conclusion.** "**Focusing on VLMs and VLAs is a distraction for the robotics community. They are
focusing on the wrong parts of the problem.**" We can turn "making an omelette" into a recipe; LLMs can do
that. "But this is not where the problem is. The problem is **how to crack an egg, and how to crack it
successfully 99.99% of the time, and to do it with generalization**" — generalization across location, across
different objects in a category, across clutter. Then the Aristotle / Euclid / Newton naming, and: "at the end
we'll need language because we need to communicate to the robot, but that's the easy part. The hard part is the
good old fight of contact, forces, trajectories."

## The two questions, which are where the course connections are

**Q1 (43:25) — "Shouldn't you turn it around?"** The questioner argues robotics is about solving a task, and
perception should follow from the task: you don't have to perceive everything, only what the task needs.
Malik's answer: nothing he said is counter to that, and **the person who articulated this was Gibson** — "we
see in order to move and we move in order to see" — and before Gibson, **von Uexküll** (captions mangle this as
"Fonikul"), who talked about the **Umwelt** (captions: "welt").
But: for a fly it is direct; **for humans the range of tasks is so wide that our vision system ends up being
somewhat general purpose.** So he argues against end-to-end pixels-to-torques: "the vision system that you'll
develop in the course of that is going to be a very flimsy vision system. It'll have had access to rather
little data. Whereas why not throw [in] a beefy foundation model of vision?" — its *use* modulated by the task.
He grants the human analogy: "a V1 lights up… the retina doesn't get modulated from top-down input, at the
later stages it does." And he has **hard evidence from navigation**: a vision encoder trained inside the task
overfits to the small subset of trajectories you explored, and "that encoder doesn't work".

**Q2 (46:59) — simulation fidelity, and the metamerism answer.** *This is the one Fernanda asked for.*
The questioner asks whether classical physics engines can model deformables, friction and so on, or whether
learned world models are the way.
Malik: everything should be tried, learned simulators are plausible, physics simulators are also fine. "But I
want to make one point, which is that **we do not need detailed physics.**"
His example is locomotion: the RMA work from ~2021 trained in a simulator whose terrain was just **fractal
terrains**. Fractal terrains do not capture walking on a beach. "But it turns out that these are **proxies**."
Then the argument, in his words (captions spell it "metamarism" and "metamorrism", which is why a search for
"metamer" finds nothing):

> "The world manifests itself to the robot through a **low-dimensional interface**. And the low-dimensional
> interface is the parts of the actuators and the joints and the hands and the feet. So essentially you're
> going to have a **metamerism problem. But metamerism here is good.**
> In human perception, colour vision is mediated through **three cone types**. The distribution of light
> wavelengths is **infinite**, but it's all projected down to this **three-dimensional subspace**. That's why
> you can mix colours and create new [ones] with just a basis set of three.
> **The same thing is happening in manipulation.** You have your end effectors, you're going to feel forces
> through them, you have to stay balanced. So you essentially have a low-dimensional interface and a
> low-dimensional latent. **The full complexity of the world doesn't matter. It is the projection onto this
> latent space.**"

Follow-up: but humans get feedback from the real world, whereas in a simulator you only get feedback from the
simulator — so if the physics prior is wrong for a deformable object? Malik: "**All models are wrong but some
models are useful.** So the question is, are they good enough for certain purposes, and I think that depends."
In locomotion the simulators are very crude and the policies still worked; for dexterous manipulation the
demands are much greater, and better simulators would currently be too slow, "but I think all this will get
solved over time."

### Why this matters for our course
Metamers are already ours: Day 3 ran a metamer lab and there is a metamers project deep dive in this repo. The
usual classroom framing of metamerism is a **limitation** — two physically different spectra that a
three-cone system cannot tell apart, the thing that makes colour illusions and texture metamers possible.
Malik inverts it: the same collapse is **what makes simulation work at all**, because the robot only ever
touches the world through a low-dimensional interface, so a crude simulator that is metameric with the real
world on that interface is good enough. Same mathematics, opposite moral. That is a genuinely good slide and it
ties Day 11 back to Day 3.

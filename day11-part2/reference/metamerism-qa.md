# The metamerism exchange, verbatim

From the end of Jitendra Malik, "Vision and Robotics for Embodied AI", ETH Zurich.
https://www.youtube.com/watch?v=HvDU7Vk4pbc — second question from the floor, 46:59 to 50:28.

## Read this first: what "verbatim" can and cannot mean here

**The only transcript available is YouTube's auto-generated one.** There is no published transcript and no
human-checked captions. So what follows is a machine's hearing of the room, not a record of what was said.
Two things follow from that, and both matter if any of this goes on a slide in quotation marks:

1. **Proper nouns and technical terms are unreliable.** The captions render *metamerism* as "metamarism" and
   then "metamorrism" in consecutive sentences. Elsewhere in the talk they render *von Uexküll* as "Fonikul",
   *GelSight* as "gel site", *dexterous* as "text" and *end effectors* as "end aectors". A word that only
   appears once should be treated as a guess.
2. **The questioner is harder to hear than the speaker.** Audience microphones were not working — Malik says
   so at 42:45, "I don't think you can. Huh? It doesn't work" — and asks people to come forward. The question
   below is transcribed from a more distant voice and is correspondingly rougher.

Below, **A is the raw caption text**, unedited, including the stammers. **B is a light clean** with filler
removed and the mangled terms restored, which is what the speaker notes use. Nothing is added, reordered or
smoothed in meaning. If a quotation goes on a slide, use B and attribute it as "from the auto-generated
captions", or write to the organisers for a corrected transcript.

---

## The question

### A. Raw captions (46:59)

> "Hello. So you said that the sim to real gap is just an engineering problem. Um so my question is do you
> think that we're able to model the physics and its complexity and especially for like dextrous manipulation
> um with like classical physics engine also like for deformable objects which are like harder to model right
> in its friction and so on or do you think that like um like the hypothesis that like through video models we
> could like learn in lat like latent space um like extract physics by learning through video itself instead
> handcrafting these uh features. Um do you think that like like neuro simulators based on world model
> approaches would be like the next step or do you think that it's possible just with handcrafted physics
> features?"

### B. Lightly cleaned

> "You said that the sim-to-real gap is just an engineering problem. So my question is: do you think that we
> are able to model the physics and its complexity, especially for dexterous manipulation, with a classical
> physics engine — also for deformable objects, which are harder to model, in their friction and so on? Or do
> you think that through video models we could learn in latent space, extract physics by learning through
> video itself instead of handcrafting these features? Do you think neural simulators based on world-model
> approaches would be the next step, or do you think it is possible just with handcrafted physics features?"

---

## The answer

### A. Raw captions (47:45)

> "I I I think everything should be tried. So certainly the kind of simulators that you can learn from world
> models trained on lots of videos as a plausible way to go. I think uh we can also use physics simulators. I
> want to make one point which is that we do not need detailed physics. So in particular just take locomotion
> as an example. We have these locomotion systems which are trained with simulators. So like the work from uh
> Berkeley the the RMA work from like 2021. The simulator was just some used fractal terrains. Now fractal
> terrains do not capture the full variety of the real world like walking on a beach or something like that.
> But it turns out that these are proxies. See, the world manifests itself to the to the robot through a
> lowdimensional interface. And the lowdimensional interface is the the the parts of the actuators and the
> joints and the hands and the feet and so on. So, so essentially you're going to have a metamarism uh
> problem. But metamorrism here is good. So okay in in uh human perception color vision is mediated through
> three cone types. The distribution of light wavelengths is infinite but it's all projected down to this
> three-dimensional subspace. Right? That's why you can mix colors and create new and with with just three a
> basis set of three. So the same thing is happening in manipulation. you have ultimately the the you have
> your your end aectors and uh you're going to feel forces through them and you have to stay balanced and so
> on. So you essentially have a lowdimensional interface and a lowdimensional latent the full complexity of
> the world doesn't matter. It is the projection onto this latent space."

### B. Lightly cleaned

> "I think everything should be tried. Certainly the kind of simulators that you can learn from world models
> trained on lots of videos is a plausible way to go. I think we can also use physics simulators.
>
> I want to make one point, which is that **we do not need detailed physics.**
>
> Just take locomotion as an example. We have these locomotion systems which are trained with simulators —
> like the work from Berkeley, the RMA work from like 2021. The simulator just used fractal terrains. Now,
> fractal terrains do not capture the full variety of the real world, like walking on a beach or something
> like that. But it turns out that these are **proxies**.
>
> See, the world manifests itself to the robot through a **low-dimensional interface**. And the
> low-dimensional interface is the actuators and the joints and the hands and the feet and so on. So
> essentially **you are going to have a metamerism problem. But metamerism here is good.**
>
> In human perception, colour vision is mediated through three cone types. The distribution of light
> wavelengths is infinite, but it is all projected down to this three-dimensional subspace. That is why you
> can mix colours and create new ones with just a basis set of three.
>
> So the same thing is happening in manipulation. You have your end effectors, you are going to feel forces
> through them, and you have to stay balanced and so on. So you essentially have a low-dimensional interface
> and a low-dimensional latent. **The full complexity of the world does not matter. It is the projection onto
> this latent space.**"

---

## The follow-up, and the second answer

### A. Raw captions (49:38)

> Questioner: "But could one not argue that human actually get feedback from the real world whereas in the
> simulator you only get feedback from the simulator. So if like the physics prior are wrong for let's say a
> deformable object"
>
> Malik: "I I the classic answer all models are wrong but some models are useful. So the question is are they
> good enough for certain purposes and I I think that depends. So I'm not cannot give a crisp a universal
> answer but uh that's where there is some modeling to be done and uh yeah so I like in locomotion we have
> simulators which are very crude and yet we could train policies which worked in uh text manipulation the
> demands are much greater. So currently we could build better simulators but they would be too slow but I
> think all this will get solved over time."

### B. Lightly cleaned

> Questioner: "But could one not argue that humans actually get feedback from the real world, whereas in the
> simulator you only get feedback from the simulator? So if the physics priors are wrong for, let us say, a
> deformable object —"
>
> Malik: "The classic answer: **all models are wrong, but some models are useful.** So the question is, are
> they good enough for certain purposes, and I think that depends. I cannot give a crisp, universal answer,
> but that is where there is some modelling to be done. In locomotion we have simulators which are very crude
> and yet we could train policies which worked. In dexterous manipulation the demands are much greater. So
> currently we could build better simulators, but they would be too slow. I think all this will get solved
> over time."

*(In the last answer the captions render "dexterous" as "text", which is why B differs there. That is a
correction, not a smoothing, and it is the only place in these three passages where a word has been changed
rather than removed.)*

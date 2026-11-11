/* PART: guidance (Day 8 part B). Owner: Fernanda. About 8 minutes.
   Follows the Welch Labs video (25:00 to 34:19): conditioning on text or a class, classifier-free guidance, negative prompts.
   Replaces two flow matching equation slides (Fernanda, 2026-11-11). Animations are our own, computed exactly on the toy spiral
   split into three classes (scenes/guide-lib.js on top of scenes/d8-toy.js). With exact fields, conditioning alone already works,
   so the slides show what guidance really does there (less variety, points pushed to the middle of the class, then off the spiral);
   the video's failures without guidance (the cat point that misses, the missing tree) are in the notes only, credited to the video.
   Sources checked: the video's transcript; Ho and Salimans, arXiv 2207.12598 (abstract); the Wan 2.1 repository
   (wan/configs/shared_config.py for the default negative prompt, wan/text2video.py for the guidance formula, guide_scale 5.0).
   Every number in the notes was measured in the scenes (they print it to the console). Notes are drafts. */
{
section('Guidance');

sc('d8GuideCond', 'scenes/guide-cond.html', { notes: [
  "(draft) So far we can generate images, but we cannot choose which image. By early 2021 diffusion models made good images, but steering them with a text prompt was still very limited. The next idea is called conditioning.",
  "(draft) Back to our spiral one last time. Pretend that each part of it is one kind of image: the inner part is images of people, the middle part is dogs, and the outer part is cats. This is the video's example.",
  "(draft) The simplest way to steer is to give the network one more input. We already give it the time t. Now we also give it the class: people, dogs or cats. For real images, the class is replaced by the text prompt, turned into a vector by a text encoder, for example CLIP's. Some models pass that vector in through a mechanism called cross-attention, others simply append it to the input. Training does not change: remove the noise, now from image and caption pairs.",
  "(draft) First, generating with no class. These are the exact fields of the whole spiral, run with DDIM from 256 starting points. The points land all along the spiral, about a third on each class.",
  "(draft) Now the same 256 starting points with the class set to cats. With the exact field, 255 of the 256 points land on the cat arm. A trained network does worse: in the video, some cat points do not quite make it, and in Stable Diffusion conditioning alone gives a desert and a shadow, but no tree. Our exact field cannot show that failure, because it is not a trained network. Real models needed one more idea."
]});

sc('d8GuideCfg', 'scenes/guide-cfg.html', { notes: [
  "(draft) That idea is classifier-free guidance, from Jonathan Ho and Tim Salimans at Google, 2022.",
  "(draft) The trick is in training: for some of the training examples, leave the class out. Then one network can answer two questions: where does the data go in general, and where do the cats go. Here are the two exact fields: gray with no class, and the cat field on top. At t equals one, with this much noise, they point the same way, toward the middle of the data.",
  "(draft) Now watch as t goes down to 0.2. The two fields part ways: the gray field points to the nearest part of the spiral, the cat field points to the cat arm. We measured the angle between them: almost zero at t equals one, about 25 degrees at t equals 0.4, and about 50 degrees at t equals 0.2.",
  "(draft) Let us zoom in on one point at t equals 0.2. The gray arrow is where the field with no class sends it. The cat arrow is where the cat field sends it.",
  "(draft) Take the difference: the arrow from the tip of the gray arrow to the tip of the cat arrow. It removes the part that only says go toward the data, and keeps the part that says go toward the cats. In the formula, that is class minus gray.",
  "(draft) Now stretch that difference by a number alpha, here three, add it to the gray arrow, and use this new arrow in place of the cat arrow. With alpha equal to one we get the cat arrow back, and with alpha equal to zero, the gray one. The paper writes the same formula with w equal to alpha minus one."
]});

sc('d8GuideAlpha', 'scenes/guide-alpha.html', { notes: [
  "(draft) What does alpha do to the generated points? Same 256 starting points, three values of alpha. Below the plot: where the points land along the cat arm, which we cut into 21 parts.",
  "(draft) Alpha equal to one is the class alone, what we had before guidance. The points cover the whole cat arm: all 21 parts.",
  "(draft) Alpha equal to three. The points crowd toward the middle of the cat arm, and its ends empty out: 18 of the 21 parts are reached. Ho and Salimans describe guidance exactly as this trade: better samples, less variety.",
  "(draft) Alpha equal to seven. Fewer places still, 15 of the 21 parts, and some points leave the spiral altogether: 9 percent. So in our exact toy, guidance does not fix a failure: it trades variety for points pushed into the middle of the class. In the video's trained model it does fix one. The cat points land on their arm, and in Stable Diffusion a tiny tree appears at an alpha of about two, then grows in size and detail as alpha goes up."
]});

sc('d8GuideNeg', 'scenes/guide-neg.html', { notes: [
  "(draft) The open video model Wan 2.1, from a team at Alibaba, takes guidance one step further, with a negative prompt.",
  "(draft) Here is part of its default negative prompt, from the Wan 2.1 code: extra fingers, badly drawn hands, three legs, walking backwards, blurry details, worst quality. There are 28 items, and they are written in Chinese. The translations are ours.",
  "(draft) The recipe is the same. In place of the gray arrow, the prediction with no text, Wan uses the prediction for this list of unwanted features. New equals negative plus alpha times prompt minus negative: the push goes away from the unwanted list and toward the prompt. In Wan's code, alpha is five by default.",
  "(draft) A toy version on our spiral. The prompt is the spiral itself, with no class. The negative is a blurry spiral: the same centers, with clusters three times wider, shown as the gray wash. Take one point just off the spiral, at t equals 0.1. The gray arrow is where the blurry negative sends it, the blue arrow is where the prompt sends it; the prompt points to the spiral more firmly. The new arrow starts from the negative and goes three times the difference: it points to the spiral much more strongly.",
  "(draft) Generating with that push, the points hug the spiral: their typical distance to it is 0.015, against 0.10 with no negative, and 0.11 for the real data. They are tighter than the data itself. 62 of the 64 parts of the spiral are still reached.",
  "(draft) A warning: a negative only says where not to go. Here the negative is the whole dog arm, with no prompt, and alpha only 1.5. Fewer points land on the dogs, 18 percent instead of 31, but 73 percent of them are pushed right off the spiral. Wan's list is made of flaws, not of other subjects. The video shows a Wan video made without the negative prompt: parts of the scene turn cartoonish and no longer fit together."
]});
}

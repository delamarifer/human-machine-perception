/* PART: flow matching (Day 8 part B). Owner: Fernanda. Flow matching basics, following the opening section of the NeurIPS 2024
   tutorial (Lipman, Chen, Ben-Hamu). About 15 minutes. Time convention here: t = 0 is noise, t = 1 is data, as in that tutorial.
   Animations are computed exactly on the toy mixture (scenes/d8-toy.js). Notes are drafts. */
{
section('Flow Matching');
const v = d8v;

/* Both equation slides are scenes now: each term lights up while the plot shows it (Fernanda, 2026-11-11: "show these lines with plots
   on the flow or the dataset and relate each part to the plot"). */
sc('d8FmIntro', 'scenes/fm-intro.html', { notes: [
  "(draft) Back to generation without guidance for a moment. With DDIM we saw that generating can mean following a velocity field, with no random steps. Flow matching starts from that idea directly. One warning: in this section time runs the other way, from t equals zero, noise, to t equals one, data.",
  "(draft) X zero is a starting point drawn from the noise, the gray cloud. The squiggle means drawn from, and p is the noise distribution. Here is one starting point.",
  "(draft) X one is drawn from the data, q, our spiral. That is where we want to end up: points that look like the data.",
  "(draft) X t is where the point is at time t, somewhere in between. Here is our point at t equals 0.6, partway along its path.",
  "(draft) The model is the velocity: d X t by d t, how the point moves at this moment, which way and how fast. The network, u t theta, theta being its weights, takes the point and the time and gives back that arrow. Behind it is the whole field of arrows at this time: the same kind of vector field as before.",
  "(draft) That is the whole recipe, in the tutorial's own summary: train by regressing a velocity, and sample by following it. Watch: start from noise and follow the arrows, while the field changes with t, and the points arrive on the spiral. The question for the next slide is what to regress onto, because nobody gives us the true arrows."
]});

sc('d8FmSimple', 'scenes/fm-simple.html', { notes: [
  "(draft) Here is the simplest version, and it fits on a whiteboard. Three papers proposed it at about the same time: Lipman and colleagues, Liu and colleagues with rectified flow, and Albergo and Vanden-Eijnden.",
  "(draft) Take one noise point, X zero, and one data point, X one, and join them with a straight line.",
  "(draft) X t is the point on that line at time t. At t equals zero it is all X zero; at t equals one it is all X one; in between, it is a mix: one minus t of the start plus t of the end. Watch the weights change as it slides.",
  "(draft) Along a straight line the velocity never changes: it is the end minus the start, X one minus X zero. Same arrow at every t.",
  "(draft) So the loss is a regression: at a point on the line, the network gives its arrow, and we compare it with the target arrow, X one minus X zero. The loss is the squared length of the gap between their tips. Here the network's arrow is the ideal one, and it is short: at this point, near the middle, it averages the arrows of every pair that passes through, which nearly cancel. So the error for this one pair is large. The next slide shows why that is exactly right.",
  "(draft) The E in front means: average over many random pairs and many random times. Every training step picks a noise point, a data point and a time, and nudges the network toward that pair's arrow. Compare it with DDPM's loss: same shape. Pick a sample, pick a time, mix with noise, and regress."
]});

sc('d8Fm', 'scenes/fm.html', { notes: [
  "(draft) But why would that work? Each training line goes to one specific data point, and at test time we do not know which data point we are heading to.",
  "(draft) Here is the noise in gray and the data in blue, with random pairs joined by straight lines. This is what the training loop sees. Notice that the lines cross all over the place.",
  "(draft) Look at one point, halfway through time. Many lines pass through it, going in many different directions. Each arrow is the direction of one pair that passes through this point.",
  "(draft) The network gets this same input with all these different targets. With a squared error loss, the best it can do is predict their average. That average is the thick arrow. The formula says the same thing: the expected direction, given that you are at x at time t.",
  "(draft) Do that at every point, and you get a velocity field. This is the field at time one half.",
  "(draft) Now follow the field from the noise. The paths curve, and they do not cross, because a field has only one direction per point. They land on the clusters. So we train on straight lines that cross, and we get a flow that generates the whole distribution."
]});

sc('d8Euler', 'scenes/euler.html', { notes: [
  "(draft) Once the network is trained, sampling means solving an ODE. Any solver works; the simplest is Euler's method.",
  "(draft) With one step, you take the velocity at the noise and jump all the way. At t equals zero, the velocity is the mean of the data minus x, so every sample lands on the mean of the data. For our spiral, that is its center, where there is no data at all: the blurry average again.",
  "(draft) With four steps, the clusters begin to appear.",
  "(draft) With forty steps, the samples match the data. Here too the number of network evaluations is the cost of a sample, and paths that bend need more steps."
]});
}

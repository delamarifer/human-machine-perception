/* PART: projects (Day 8 part B). Owner: Fernanda. About 4 minutes. Closing section: potential projects and mentors
   for modeling cognition, for students who want to join as mentees. Two projects, each as an animated schematic:
   Fernanda and Eric (courts that do not pay attention, and perceived control) and Aryan Zoroufi (intuitive physics).
   Nothing drawn here is data. Notes marked (Fernanda) are her own words, split across clicks, not rewritten; the rest are drafts.
   Open items: feedback/projects.md. */
{
section('Projects');

/* The overview slide was removed (Fernanda, 2026-11-11: "just jump into the two project ideas ... include pictures of the researchers"). */
sc('projectsCourt', 'scenes/projects-court.html', { notes: [
  "(Fernanda) It's a formal model of what happens to people when judges don't really pay attention to them.",
  "(draft) Picture one person who comes before a court again and again. Each column is one encounter. A check means they followed the rules, showed up, complied. A cross means they did not.",
  "(draft) In an attentive court, the outcome follows what they did. A smile is a good outcome, a frown a bad one. When they comply, it goes well; when they do not, it goes badly.",
  "(Fernanda) The core idea is that if a court overlooks what a litigant actually did (whether they followed the rules, showed up, complied), the litigant learns that their own conduct doesn't change the outcome.",
  "(draft) Now imagine a learner who reasons perfectly from what they have seen. This is a sketch of the idea, not data. In the attentive court, their sense of control stays high: what they do matters.",
  "(Fernanda) Over repeated encounters that produces a loss of perceived control, the kind of helplessness that's relevant to trauma.",
  "(Fernanda) The key twist is that this doesn't require the litigant to be irrational or catastrophizing. Even someone who reasons perfectly correctly from what they've seen would reach the conclusion that complying offers no protection, because in their experience it hasn't.",
  "(Fernanda) So the harm comes from the court's inattention, not from a flaw in the person."
]});

sc('projectsTower', 'scenes/projects-tower.html', { notes: [
  "(draft) Aryan works on intuitive physics. He uses models and deep learning to understand how people predict what physical scenes will do. Here is a classic kind of question in that field, drawn by us. It is not one of his results.",
  "(draft) Look at this tower of blocks. Will it fall? And if so, which way? Take a second to decide.",
  "(draft) It falls to the right: the top five blocks together sit too far past the edge of the bottom block. You probably called it at a glance, without writing down any equations.",
  "(draft) One influential model says we run a rough physics simulation in our heads. Our view is blurry, so we do not know exactly where each block is. So the model nudges every block a little at random and simulates the tower, many times. Here are twelve such runs. The idea is from Battaglia, Hamrick and Tenenbaum, 2013.",
  "(draft) Count the runs where it falls: here, 9 of 12. So the answer is graded, a degree of confidence, not just yes or no. That count comes from our twelve drawings, not from an experiment.",
  "(draft) Another approach trains a deep network on many examples, here one picture of a tower, to predict whether it will fall, or what happens next. Lerer, Gross and Fergus trained networks like this on block towers in 2016.",
  "(draft) And here is the research question: which kind of model makes the same predictions as people, including the same mistakes? Comparing models with what people predict tells us what the mind might be computing.",
  "(draft) If you are curious about joining Aryan, ask me after class and I will connect you."
]});

st(`
  <h1 class="t">Interested?</h1>
  <div class="d8-body">
    <div class="statement b" data-step="1">Join one of these projects as a mentee</div>
    <div class="lead b" data-step="2">Talk to Fernanda after class</div>
  </div>
`, { notes: [
  "(draft) If either project interests you, we would love to hear from you.",
  "(draft) You can join one of these projects as a mentee.",
  "(draft) If you are interested, come talk to me after class."
]});
}

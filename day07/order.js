/* Day 7 running order. Follows the Google deck "Day 7" (fileId 1-d7HaWYSEP3EMU8Eu3EZsc9huoF877sANLRL4F8uW2U), an outline:
     1. Data Worksheet Review        (not built yet)
     2. Transfer Learning            = the adapt and future parts, moved from day06-reduced (Google Day 6 deck p43-59),
                                       then the agents part (Google Day 7 deck: Where does learning live? to Evaluation)
     3. Quiz Review                  (not built yet)
     4. Project Review: ideas, what we liked, what people did not consider   (not built yet)
     5. Project Review: groupings, what goes into the project plan            (not built yet)
     6. Open Questions: AI review, how to use AI, how to work                  (not built yet)
   Add each part in its place when it is built. Avoid apostrophes inside the strings. */
const ORDER = [
  ['start',  'Title'],
  ['adapt',  'Day 6 Google deck p43-55: adapting trained models, problem setup, fine-tuning, learning from a teacher, knowledge distillation (math and code), use cases, continual learning'],
  ['future', 'Day 6 Google deck p55-59: future data, RL environments, robotics data gap, discussions'],
  ['agents', 'Day 7 Google deck: where learning lives, from model to agent, challenges, types of memory, memory in humans, agent memory, evaluation'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (only sets the widths in the progress bar), carried over from day06-reduced. */
const SEC_MINUTES = {
  'Start': 2,
  'Transfer Learning': 17,
};

/* Day 7 running order. Follows the Google deck "Day 7" (fileId 1-d7HaWYSEP3EMU8Eu3EZsc9huoF877sANLRL4F8uW2U), an outline:
     1. Data Worksheet Review        (not built yet)
     2. Transfer Learning            = the adapt and future parts, moved from day06-reduced (Google Day 6 deck p43-59),
                                       then "Where does learning live?" (start of the agents part)
        Agents and Memory               = the rest of the agents part (Google Day 7 deck: From model to agent to Evaluation)
     3. Quiz Review                  (not built yet)
     4. Project Review               = the project part: placeholders (TO DO boxes) for Project Review (two slides),
                                       Project Plan Rubric and Project Rubric, her outline lines kept as written
     6. Open Questions: AI review, how to use AI, how to work                  (not built yet)
   Add each part in its place when it is built. Avoid apostrophes inside the strings. */
const ORDER = [
  ['start',  'Title'],
  ['adapt',  'Day 6 Google deck p43-55: adapting trained models, problem setup, fine-tuning, learning from a teacher, knowledge distillation (math and code), use cases, continual learning'],
  ['future', 'Day 6 Google deck p55-59: future data, RL environments, robotics data gap, discussions'],
  ['agents', 'Day 7 Google deck: where learning lives, from model to agent, challenges, types of memory, memory in humans, agent memory, evaluation'],
  ['project', 'Day 7 Google deck: Project Review (two slides), Project Plan Rubric, Project Rubric. Placeholders only'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (only sets the widths in the progress bar), carried over from day06-reduced. */
const SEC_MINUTES = {
  'Start': 2,
  'Transfer Learning': 17,
  'Agents and Memory': 15,   /* a guess for the bar width only (Shreya to set) */
  'Project Review': 15,      /* a guess for the bar width only (Shreya to set) */
};

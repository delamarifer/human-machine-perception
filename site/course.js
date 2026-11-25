/* ==========================================================================
   Course data: the one place to add a day, an assignment or an announcement.
   The home page, schedule.html and assignments.html all
   render from this file (with site/components.js), so they never disagree.

   Rules
   - Copy wording and URLs exactly. Never invent a date, deadline or link.
   - `due` is only for a deadline that was explicitly posted:
       an ISO time when one was given ('2026-11-04T14:00:00+02:00'),
       or a date for "end of day" ('2026-11-13'). Leave it out otherwise;
       `dueText` keeps the wording students saw.
   - Status is computed from `due` only. The site never says a student has
     done something; it only says whether a posted deadline has passed.

   Kinds:  lecture · lab · reading · homework · project · response
   Link types: slides · notes · colab · form · doc · paper · page
   ========================================================================== */

const COLAB = 'https://colab.research.google.com/github/delamarifer/human-machine-perception/blob/main/';

window.COURSE = {
  title: 'Visual Perception',
  description: [
    'Computer vision has long taken its questions from the study of human vision, and this course teaches the two together. It starts with images as arrays and linear filtering, relating a bank of filters to the receptive fields of early visual cortex, then covers convolutional networks for recognition, Vision Transformers and attention, and learning visual representations without labels through contrastive methods and CLIP. Later sessions cover dataset quality and model evaluation, adapting pretrained models through fine-tuning and distillation, and generative models. Throughout, models are tested against perceptual phenomena such as metamers, the shape–texture bias and the Thatcher illusion. Students finish with an original project: either a working demo of a new application that combines ideas from the course, or an experiment that measures the limitations of current artificial vision systems.',
  ],
  instructors: [
    { name: 'Shreya Pandit', short: 'Shreya', email: 'shreyalpandit@gmail.com',
      lines: ['Schedule time to chat <a href="https://calendly.com/shreyalpandit/30min" target="_blank" rel="noopener">here</a>.',
              'Office hours from 4-5pm M-F in lecture room.',
              'Email or talk to me if you need time outside of that!'] },
    { name: 'Fernanda de la Torre', short: 'Fernanda', email: 'dlatorre@mit.edu',
      lines: ['After the course ends, if I take too long to reply, please email me asking for my WhatsApp until I do :)'] },
  ],
  discord: 'https://discord.gg/2kN726ZZ6',
  feedback: { title: 'How Was Class?', text: 'We welcome anonymous feedback to help improve the course!', href: 'https://forms.gle/Js3vcF7hgkhXQELt5' },

  /* What the home page puts first. Set by the instructors, from the latest
     announcements; it is not computed from student progress. */
  now: {
    label: 'Final project',
    title: 'Presentations, Write-Ups and Assignment 2',
    text: 'The final project and Assignment 2 were due Saturday, Nov 21, at midnight.',
    source: 'Deadlines as posted.',
    actions: [
      { label: 'Submit your final project', href: 'https://docs.google.com/forms/d/e/1FAIpQLSdmsW9G8xVku244fgk12IUlv_Q41IL8bkywNaW5uPtE29PXaA/viewform', type: 'form' },
      { label: 'Assignment 2 questions', href: 'assignment2.html', type: 'page' },
      { label: 'Submit Assignment 2', href: 'https://docs.google.com/forms/d/e/1FAIpQLSdxf8CBPdRtlhMLtgEj30jcM8wq0rj4I6iI-Tb5_eRZkK_LZg/viewform', type: 'form' },
      { label: 'Presentation slots', href: 'https://docs.google.com/document/d/1uivAlhELC4kQgEJz5DlX36Vvx4gCwKj4pAYVWrP9Of4/edit', type: 'doc' },
      { label: 'Presentations: notes', href: 'presentations/notes.html', type: 'notes' },
    ],
  },

  /* Newest first. */
  announcements: [
    { date: 'Nov 17', label: 'Final project', title: 'Presentations and Write-Ups',
      text: 'When you present, the ideas to cover, how the talk is graded, the write-up, and one example of a paper, an interactive article, and a blog post.',
      links: [{ label: 'Slides', href: 'presentations/deck.html', type: 'slides' }, { label: 'Notes', href: 'presentations/notes.html', type: 'notes' }] },
    { date: 'Nov 16', label: 'Final project', title: 'Sign Up for a Presentation Slot',
      text: 'Presentations are Thursday and Friday, 2 to 4 pm, in 20-minute slots. Each team takes one free slot: write your project title and names in an empty row.',
      links: [{ label: 'Sign-up document', href: 'https://docs.google.com/document/d/1uivAlhELC4kQgEJz5DlX36Vvx4gCwKj4pAYVWrP9Of4/edit', type: 'doc' }] },
    { date: 'Nov 8', label: 'Assignment 1', title: 'If Colab Has Been Crashing',
      text: 'We fixed the starter notebook. It now saves every answer to your Google Drive as it goes, so after a crash you rerun the cells and it continues where it stopped. Already working in your own copy? Keep it, and follow the steps on the assignment page. If it keeps crashing, or you run out of free GPU time, use Qwen/Qwen3-VL-2B-Instruct and say so in your write-up.',
      links: [{ label: 'Colab help', href: 'assignment1.html#colab-help', type: 'page' }] },
  ],

  /* --------------------------------------------------------------- days --- */
  /* `date` is left out: no per-day dates have been posted. */
  days: [
    { n: 1, title: 'Introduction to Visual Systems', description: 'What does it mean to see?',
      items: [
        { kind: 'lecture', title: 'Introduction to Visual Systems', links: [
          { label: 'Slides', href: 'deck.html', type: 'slides' }, { label: 'Notes', href: 'lecture-notes.html', type: 'notes' }] },
        { kind: 'lab', note: 'In-class lab (continued at home)', title: 'Images as Arrays', text: 'Checker-shadow image. NumPy slices and arithmetic.', links: [
          { label: 'Open in Colab', href: COLAB + 'notebooks/day01-practice-numpy-images.ipynb', type: 'colab' }] },
        { kind: 'reading', title: 'Perception viewed as an inverse problem', text: 'Zygmunt Pizlo, Vision Research, 2001', links: [
          { label: 'PDF', href: 'https://www.cogconfluence.com/wp-content/uploads/2017/09/perception_inverse_problem.pdf', type: 'paper' }],
          optional: [
            { title: 'Stabilized images on the retina', text: 'Roy M. Pritchard, Scientific American, 1961', href: 'https://www.cogconfluence.com/wp-content/uploads/2017/09/Pritchard_stabilization.pdf' },
            { title: 'Chapter 2, A Simple Vision System', text: 'Torralba, Isola, and Freeman, Foundations of Computer Vision. This is the system we build next.', href: 'https://visionbook.mit.edu/simplesystem.html' }] },
        { kind: 'homework', title: 'Homework', text: 'Day 1 survey, one reading, and finish Images as arrays. Pritchard and Chapter 2 are optional.', links: [
          { label: 'Homework page', href: 'homework.html', type: 'page' },
          { label: 'Day 1 questionnaire', href: 'https://forms.gle/3EP5zfyj7UvarX9B7', type: 'form' }] },
      ] },
    { n: 2, title: 'Computer Vision: Promise, Pitfalls, and Your Place in It', description: 'What computer vision can do, where it still fails, and your project.',
      items: [
        { kind: 'lecture', title: 'Computer Vision: Promise, Pitfalls, and Your Place in It', links: [
          { label: 'Slides', href: 'day02/deck.html', type: 'slides' }, { label: 'Notes', href: 'day02/lecture-notes.html', type: 'notes' }] },
        { kind: 'lab', note: 'In-class lab (continued at home)', title: 'A Simple Vision System', text: 'Recover 3D from one image of a blocks world.', links: [
          { label: 'Open in Colab', href: COLAB + 'notebooks/day01-lab-simple-vision-system.ipynb', type: 'colab' }] },
        { kind: 'reading', title: 'Metamers Primer', text: 'Our own short reading, with an interactive color demo', links: [
          { label: 'Read the primer', href: 'metamers.html', type: 'page' }] },
        { kind: 'homework', title: 'Homework', text: 'Read the primer; you write a short response on it by hand at the start of next class. Also: finish the simple vision system lab, and send your project idea by Saturday night.', assignment: 'day2-hw' },
      ] },
    { n: 3, title: 'Image Representation and Processing', description: 'Part 1, metamers, then Part 2, image filters. The Slides link plays them in that order.',
      items: [
        { kind: 'lecture', title: 'Parts 1 and 2, in One Slide Deck', links: [
          { label: 'Slides', href: 'day03/deck.html', type: 'slides' }, { label: 'Part 1 notes', href: 'day03/lecture-1-notes.html', type: 'notes' },
          { label: 'Part 2 notes', href: 'day03/lecture-2-notes.html', type: 'notes' }] },
        { kind: 'lab', note: 'Part 1', title: 'Metamers as Windows into Representations', text: 'Make your own metamers with plenoptic, for models of seeing and hearing, and test whether a classmate can tell them apart.', links: [
          { label: 'Open in Colab', href: COLAB + 'notebooks/day03-lab-metamers.ipynb', type: 'colab' }] },
        { kind: 'lab', note: 'Part 2', title: 'Image Filtering', text: 'Filter a photograph and turn it into a printable trifold name tag.', links: [
          { label: 'Open in Colab', href: COLAB + 'notebooks/day03-lab2-image-filtering.ipynb', type: 'colab' }] },
        { kind: 'homework', title: 'Finish Both Labs', text: 'No reading this time. Finish Part 1, metamers, and Part 2, image filtering.', assignment: 'day3-hw', links: [
          { label: 'Readings', href: 'readings.html#assigned', type: 'page' }] },
      ] },
    { n: 4, title: 'CNNs and Visual Recognition', description: 'From neurons to convolutional networks, then classification, detection and segmentation with pretrained models.',
      items: [
        { kind: 'lecture', title: 'CNNs and Visual Recognition', links: [
          { label: 'Part 1 slides', href: 'day04/deck.html', type: 'slides' }, { label: 'Part 1 notes', href: 'day04/lecture-notes.html', type: 'notes' },
          { label: 'Part 2 slides', href: 'day04-part2/deck.html', type: 'slides' }, { label: 'Part 2 notes', href: 'day04-part2/lecture-notes.html', type: 'notes' }] },
        { kind: 'lab', note: 'In-class lab', title: 'Handwritten Digits: A Fully Connected Network, Then a CNN', text: 'Train both on MNIST, look inside the CNN, and shuffle the pixels. Adapted from MIT 6.S191.', assignment: 'day4-lab', links: [
          { label: 'Open in Colab', href: COLAB + 'notebooks/day04-lab-cnn-mnist.ipynb', type: 'colab' }] },
        { kind: 'reading', title: 'Self-Supervised Learning and the Ventral Stream', text: 'Read Konkle & Alvarez (Nature Communications, 2022); you write a short response on it by hand at the start of next class.', links: [
          { label: 'PDF', href: 'https://konklab.fas.harvard.edu/Papers/Konkle_2022_NatComm.pdf', type: 'paper' }] },
      ] },
    { n: 5, title: 'Transformers and Visual Representations', description: 'Part 1 · Transformers and Visual Representations. Part 2 · Learning Without Labels.',
      items: [
        { kind: 'lecture', note: 'Part 1', title: 'Transformers and Visual Representations', text: 'The Vision Transformer step by step: patches, embeddings, position, query, key and value, attention, and how it compares with CNNs.', links: [
          { label: 'Part 1 slides', href: 'day05-planb/deck.html', type: 'slides' }, { label: 'Part 1 notes', href: 'day05-planb/lecture-notes.html', type: 'notes' }] },
        { kind: 'lecture', note: 'Part 2', title: 'Learning Without Labels', text: 'Embeddings, contrastive learning and CLIP, then the Konkle & Alvarez reading and RSA.', links: [
          { label: 'Part 2 slides', href: 'day05-hour2/deck.html', type: 'slides' }, { label: 'Part 2 notes', href: 'day05-hour2/lecture-notes.html', type: 'notes' }] },
        { kind: 'lab', note: 'Part 1', title: 'Transformer Exercises', text: 'Short exercises on tokens, attention and multi-head attention.', links: [
          { label: 'Open in Colab', href: COLAB + 'notebooks/day05-lab-transformer-exercises.ipynb', type: 'colab' }] },
        { kind: 'lab', note: 'Part 2', title: 'Views and Representations', text: "After the reading: test Konkle & Alvarez's idea on CLIP, then compare representations with RSA.", links: [
          { label: 'Open in Colab', href: COLAB + 'notebooks/day05-lab-part2-views-rsa.ipynb', type: 'colab' }] },
        { kind: 'reading', title: 'Formal Algorithms for Transformers', text: 'Phuong & Hutter (2022).', links: [
          { label: 'arXiv', href: 'https://arxiv.org/abs/2207.09238', type: 'paper' }, { label: 'PDF', href: 'https://arxiv.org/pdf/2207.09238', type: 'paper' },
          { label: "latest version, on Hutter's site", href: 'http://www.hutter1.net/publ/transalg.pdf', type: 'paper' }],
          optional: [
            { title: 'Do Vision Transformers See Like Convolutional Neural Networks?', text: 'Raghu et al. (NeurIPS 2021).', href: 'https://arxiv.org/abs/2108.08810',
              more: [{ label: 'NeurIPS PDF', href: 'https://papers.neurips.cc/paper_files/paper/2021/file/652cf38361a209088302ba2b8b7f51e0-Paper.pdf' }] }] },
      ] },
    { n: 6, title: 'Data, Generalization and Evaluation', description: 'Why models fail in the real world, how to get and check data, and how to evaluate models.',
      items: [
        { kind: 'lecture', title: 'Data, Generalization and Evaluation', links: [
          { label: 'Slides', href: 'day06-reduced/deck.html', type: 'slides' }, { label: 'Notes', href: 'day06-reduced/lecture-notes.html', type: 'notes' }] },
        { kind: 'reading', title: 'Model Evaluation, Model Selection, and Algorithm Selection in Machine Learning', text: 'Raschka (arXiv, 2018).', links: [
          { label: 'arXiv', href: 'https://arxiv.org/abs/1811.12808', type: 'paper' }, { label: 'PDF', href: 'https://arxiv.org/pdf/1811.12808', type: 'paper' }] },
        { kind: 'homework', title: 'Dataset Worksheet', text: 'Find a dataset and check whether you can trust it, or investigate a simulator.', assignment: 'day6-hw', links: [
          { label: 'Make your copy', href: 'https://docs.google.com/document/d/1xjpczaeKj8Uit8yj66oVpVdMn0LQgGtcZpbdf9-vEtY/copy', type: 'doc' },
          { label: 'View', href: 'https://docs.google.com/document/d/1xjpczaeKj8Uit8yj66oVpVdMn0LQgGtcZpbdf9-vEtY/preview', type: 'doc' }] },
      ] },
    { n: 7, title: 'Adaptation and Agents', description: 'Adapting trained models: fine-tuning, knowledge distillation and continual learning, then agents and how they remember.',
      items: [
        { kind: 'lecture', title: 'Adaptation and Agents', links: [
          { label: 'Part 1 slides', href: 'day07/deck.html', type: 'slides' }, { label: 'Part 1 notes', href: 'day07/lecture-notes.html', type: 'notes' },
          { label: 'Part 2 slides', href: 'day07-part2/deck.html', type: 'slides' }] },
        { kind: 'project', title: 'Proposal Template', text: 'Make your own copy and fill it in. Due Wednesday 11 November, end of day.', links: [
          { label: 'Proposal template', href: 'https://docs.google.com/document/d/12sPqbfitV3cYsndd5KX4C2FHXcTZOh4MR-vegbdWSEQ/edit?usp=sharing', type: 'doc' }] },
        { kind: 'project', title: 'Proposal Grading Rubric', text: 'How we grade your detailed proposal.', links: [
          { label: 'Rubric', href: 'https://docs.google.com/document/d/1snJ5o0smRKS6KVBizKk2YTd0CbG-Fv97Zivw6_bE2ss/edit?usp=sharing', type: 'doc' }] },
      ] },
    { n: 8, title: 'Generative Modeling', description: 'How machines generate images: autoencoders, variational autoencoders, GANs and autoregressive models.',
      items: [
        { kind: 'lecture', title: 'Generative Modeling', links: [
          { label: 'Part 1 slides', href: 'day08/deck.html', type: 'slides' }, { label: 'Part 1 notes', href: 'day08/lecture-notes.html', type: 'notes' },
          { label: 'Part 2 slides', href: 'day08-part2/deck.html', type: 'slides' }] },
      ] },
    { n: 9, title: 'Theory of Minds &amp; Machines', description: 'Part 1 is not posted yet. Part 2: Discuss, Practice, Build.',
      items: [
        { kind: 'lecture', note: 'Part 1', missing: true, title: 'Slides Not Posted Yet', text: 'The first half of the class.' },
        { kind: 'lecture', note: 'Part 2', title: 'Discuss, Practice, Build', links: [
          { label: 'Slides', href: 'day09/deck.html', type: 'slides' }] },
        { kind: 'lab', note: 'Optional', title: 'Workbooks: Generative Models', text: 'For practice on your own. These were not covered in class.', links: [
          { label: 'Autoencoders and VAEs', href: COLAB + 'day09/workbook/autoencoders-and-vaes.ipynb', type: 'colab' },
          { label: 'GANs', href: COLAB + 'day09/workbook/gans-from-2d-to-digits.ipynb', type: 'colab' },
          { label: 'Diffusion', href: COLAB + 'day09/workbook/diffusion-on-a-spiral.ipynb', type: 'colab' }] },
      ] },
    { n: 10, title: 'Slides Not Posted Yet', description: 'The opening question for the day is below.',
      items: [
        { kind: 'response', note: 'Start of class', title: 'Opening Question: Can a Machine Dream?', text: 'Answer at the start of class. You get the point for answering, not for a right answer, and it counts toward your daily response grade.', assignment: 'day10-q' },
      ] },
    { n: 11, title: 'Generative Art', description: "What if a machine could dream? Generative art, Refik Anadol's AI artworks, and how a generative system goes from archive to artwork.",
      items: [
        { kind: 'lecture', note: 'Part 1', title: 'Generative Art', links: [
          { label: 'Part 1 slides', href: 'day11/deck.html', type: 'slides' }, { label: 'Part 1 notes', href: 'day11/lecture-notes.html', type: 'notes' }] },
        { kind: 'lecture', note: 'Part 2', title: 'Embodied AI', text: 'Navigation, locomotion and the one we still cannot do. Where robot data comes from and why every source falls short, the three levels from goals to forces, and why metamerism is the reason a crude simulator works at all. Adapted from a talk by Jitendra Malik.', links: [
          { label: 'Part 2 slides', href: 'day11-part2/deck.html', type: 'slides' }] },
        { kind: 'lab', note: 'In-class lab', title: 'Generative System Lab', text: 'Build a small generative art pipeline on Fashion-MNIST: curate, represent, generate, render and evaluate, using the models from our labs. Runs on a CPU. When you finish, submit your Colab link.', assignment: 'day11-lab', links: [
          { label: 'Open in Colab', href: COLAB + 'day11/workbook/generative-system-lab.ipynb', type: 'colab' }] },
      ] },
    { n: 12, title: 'Slides Not Posted Yet', description: 'The slides for this day are not posted yet.',
      items: [
        { kind: 'lecture', missing: true, title: 'Slides Not Posted Yet', text: 'The lecture slides for this day.' },
      ] },
    { n: 13, title: 'ML in Industry', description: 'Why research, where it happens, physical AI, the ML lifecycle, academia and industry, and roles.',
      items: [
        { kind: 'lecture', title: 'ML in Industry', links: [
          { label: 'Slides', href: 'day12/deck.html', type: 'slides' }] },
      ] },
    { n: 14, title: 'Final Project Presentations', description: 'Student presentations.',
      items: [
        { kind: 'project', title: 'Presentations and Write-Ups', text: 'When you present, the ideas to cover, how the talk is graded, and the write-up.', links: [
          { label: 'Slides', href: 'presentations/deck.html', type: 'slides' }, { label: 'Notes', href: 'presentations/notes.html', type: 'notes' },
          { label: 'Presentation slots', href: 'https://docs.google.com/document/d/1uivAlhELC4kQgEJz5DlX36Vvx4gCwKj4pAYVWrP9Of4/edit', type: 'doc' }] },
      ] },
    { n: 15, title: 'Final Project Presentations', description: 'Student presentations.',
      items: [
        { kind: 'project', title: 'Presentations and Write-Ups', text: 'When you present, the ideas to cover, how the talk is graded, and the write-up.', links: [
          { label: 'Slides', href: 'presentations/deck.html', type: 'slides' }, { label: 'Notes', href: 'presentations/notes.html', type: 'notes' },
          { label: 'Presentation slots', href: 'https://docs.google.com/document/d/1uivAlhELC4kQgEJz5DlX36Vvx4gCwKj4pAYVWrP9Of4/edit', type: 'doc' }] },
      ] },
  ],

  /* --------------------------------------------------------- assignments --- */
  assignments: [
    { id: 'a2', kind: 'assignment', weight: '15%', title: 'Assignment 2', label: 'After the talks',
      description: 'Five questions on each of two projects by other teams, then one question about both.',
      instructions: { label: 'Instructions', href: 'assignment2.html' },
      due: '2026-11-21', dueText: 'Due Sat, Nov 21, midnight',
      submit: { label: 'Submit Assignment 2', href: 'https://docs.google.com/forms/d/e/1FAIpQLSdxf8CBPdRtlhMLtgEj30jcM8wq0rj4I6iI-Tb5_eRZkK_LZg/viewform' },
      submitNote: 'Pick two projects by other teams from the final presentations. For each one: the main problem, their solution, where it could go next, something new you learned, and a question for the team.' },
    { id: 'day10-q', kind: 'response', day: 10, title: 'Day 10 Opening Question',
      description: 'Can a Machine Dream?',
      due: '2026-11-16T14:00:00+02:00', dueText: 'Due Mon, Nov 16, 2pm',
      submit: { label: 'Answer the question', href: 'https://forms.gle/EP9wFUVDqFJkkbdx8' } },
    { id: 'day11-lab', kind: 'lab', day: 11, title: 'Day 11 Lab: Generative System Lab',
      description: 'Submit your Colab link for the generative art lab',
      starter: { label: 'Open in Colab', href: COLAB + 'day11/workbook/generative-system-lab.ipynb' },
      due: '2026-11-17T14:00:00+02:00', dueText: 'Due Tue, Nov 17, 2pm',
      submit: { label: 'Submit', href: 'https://forms.gle/RksDxmwqRrxhoKpf9' } },
    { id: 'a1', kind: 'assignment', weight: '15%', title: 'Assignment 1', label: 'Assignment',
      description: 'Are vision models still blind? Test newer models on BlindTest. Submit your Colab link and one-page PDF',
      instructions: { label: 'Instructions', href: 'assignment1.html' },
      starter: { label: 'Starter notebook', href: COLAB + 'notebooks/assignment1-starter.ipynb' },
      readings: [{ label: 'Vision Language Models Are Blind', href: 'https://vlmsareblind.github.io/' }],
      due: '2026-11-13T14:00:00+02:00', dueText: 'Due Fri, Nov 13, 2pm',
      submit: { label: 'Submit', href: 'https://forms.gle/F3TMeyRNz44h1rDA8' } },
    { id: 'day6-hw', kind: 'homework', day: 6, title: 'Day 6 Homework',
      description: 'Dataset Worksheet: submit the link to your copy',
      starter: { label: 'Make your copy', href: 'https://docs.google.com/document/d/1xjpczaeKj8Uit8yj66oVpVdMn0LQgGtcZpbdf9-vEtY/copy' },
      readings: [{ label: 'Raschka (arXiv, 2018)', href: 'https://arxiv.org/abs/1811.12808' }],
      due: '2026-11-10T14:00:00+02:00', dueText: 'Due Tue, Nov 10, 2pm',
      submit: { label: 'Submit', href: 'https://docs.google.com/forms/d/e/1FAIpQLSfgjJJzLQf1eEjQe6r2k5P2TNp-1dWN1zzCzBLme3vfOme5eg/viewform' } },
    { id: 'day4-lab', kind: 'lab', day: 4, title: 'Day 4 Lab',
      description: 'Submit your Colab link for the handwritten digits lab',
      starter: { label: 'Open in Colab', href: COLAB + 'notebooks/day04-lab-cnn-mnist.ipynb' },
      due: '2026-11-06T14:00:00+02:00', dueText: 'Due Fri, Nov 6, 2pm',
      submit: { label: 'Submit', href: 'https://forms.gle/aKgRbKQpWfukdbG78' } },
    { id: 'day3-hw', kind: 'homework', day: 3, title: 'Day 3 Homework',
      description: 'Both Day 3 labs: metamers and image filtering',
      starter: { label: 'Part 1 in Colab', href: COLAB + 'notebooks/day03-lab-metamers.ipynb' },
      starter2: { label: 'Part 2 in Colab', href: COLAB + 'notebooks/day03-lab2-image-filtering.ipynb' },
      due: '2026-11-05T14:00:00+02:00', dueText: 'Due Thu, Nov 5, 2pm',
      submit: { label: 'Submit', href: 'https://forms.gle/urPSQVh27DA7rAC37' } },
    { id: 'day2-hw', kind: 'homework', day: 2, title: 'Day 2 Homework',
      description: 'A simple vision system',
      starter: { label: 'Open in Colab', href: COLAB + 'notebooks/day01-lab-simple-vision-system.ipynb' },
      readings: [{ label: 'Metamers primer', href: 'metamers.html' }],
      due: '2026-11-04T14:00:00+02:00', dueText: 'Due Wed, Nov 4, 2pm',
      submit: { label: 'Submit', href: 'https://forms.gle/hLbcz7Yy3YNtnBws6' } },
  ],

  /* ------------------------------------------------------------- project --- */
  /* Every line below is quoted from the syllabus, templates.html or
     presentations/notes.html. */
  project: {
    title: 'Final Project',
    summary: 'Students design and build an original computer vision application using concepts and techniques from the course.',
    brief: [
      { label: 'Research question', text: 'In one sentence, with no jargon: what do you want to make or find out?', src: 'Step 1 form' },
      { label: 'Connection to human perception', text: 'Is there a link to human vision? Optional. An illusion, a thing people do easily that models get wrong, or the other way round. In the talk, idea 5, <i>What it means</i>: for how models see, for how people see, and what you would do with another week.', src: 'Step 1 form; presentation notes' },
      { label: 'Computer vision technique', text: '<b>Track 1 · Build a demo.</b> An application or demo that someone can try, built from the models in the course. <b>Track 2 · Run an experiment.</b> Explore a limitation of a vision model, or try to overcome one, and answer with a measurement.', src: 'Syllabus' },
      { label: 'Expected deliverable', text: '<b>Presentation</b>, last day, 15%: the five ideas in the <a href="presentations/notes.html">presentation notes</a>, in that order. <b>Write-up</b>, last day, 20%: a paper, an interactive article, or a blog post, with a link to your code or demo.', src: 'Presentation notes' },
      { label: 'How to hand it in', text: 'Put your slides, write-up, and code in your project folder on Google Drive. What is there on the last day is what we grade. Then tick the <a href="https://forms.gle/cNFBCB6xVkyc3eRG8">hand-in form</a>: your project number and one checkbox.', src: 'Presentation notes' },
    ],
    directions: ['Visual search or an image memory system', 'Image generation or a creative exploration tool', 'A multimodal assistant for image understanding',
      'Object detection or segmentation', 'A domain-specific computer vision application', 'An exploration of human perception, ambiguity, or hallucination in vision models'],
    steps: [
      { id: 'p-submit', title: 'Final Project Submission', description: 'Submit your final project through this form.', due: '2026-11-21', dueText: 'Due Sat, Nov 21, midnight',
        submit: { label: 'Submit your final project', href: 'https://docs.google.com/forms/d/e/1FAIpQLSdmsW9G8xVku244fgk12IUlv_Q41IL8bkywNaW5uPtE29PXaA/viewform' } },
      { id: 'p-talk', title: 'Presentation', weight: '15%', dueText: 'Last day',
        description: 'Thursday and Friday, 2 to 4 pm, 20-minute slots. One slot per team.',
        instructions: { label: 'Slides', href: 'presentations/deck.html' },
        instructions2: { label: 'Notes', href: 'presentations/notes.html' },
        starter: { label: 'Template', href: 'templates.html#presentation' },
        submit: { label: 'Sign up for a slot', href: 'https://docs.google.com/document/d/1uivAlhELC4kQgEJz5DlX36Vvx4gCwKj4pAYVWrP9Of4/edit' } },
      { id: 'p-writeup', title: 'Write-Up', weight: '20%', dueText: 'Last day',
        description: 'A paper, an interactive article, or a blog post, with a link to your code or demo.',
        instructions: { label: 'Notes', href: 'presentations/notes.html' },
        starter: { label: 'Template', href: 'templates.html#writeup' } },
      { id: 'p-proposal', title: 'Detailed Project Proposal', weight: '5%',
        description: 'Put the doc in your feedback folder, then submit its link, one per group.',
        due: '2026-11-13', dueText: 'Due Friday 13 November, end of day',
        starter: { label: 'Proposal template', href: 'https://docs.google.com/document/d/12sPqbfitV3cYsndd5KX4C2FHXcTZOh4MR-vegbdWSEQ/edit?usp=sharing' },
        readings: [{ label: 'Proposal grading rubric', href: 'https://docs.google.com/document/d/1snJ5o0smRKS6KVBizKk2YTd0CbG-Fv97Zivw6_bE2ss/edit?usp=sharing' }],
        submit: { label: 'Submit', href: 'https://docs.google.com/forms/d/e/1FAIpQLSeKfRjfohCkwKyCzKejCxdWIn8ltVMpynYcA9qozk48matJrA/viewform' } },
      { id: 'p-idea', title: 'General Idea', weight: '2%', dueText: 'Due Saturday night',
        description: 'A few sentences, not a plan. We share every idea with the class so you can find teammates.',
        instructions: { label: 'Form questions', href: 'templates.html#idea' } },
    ],
    templates: { label: 'Project templates', href: 'templates.html', text: 'Idea, proposal, presentation and write-up, for a built demo or an experiment.' },
  },
};

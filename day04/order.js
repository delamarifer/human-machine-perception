/* Day 4 running order: 2-hour (120 min) Master's lecture.
   "CNNs and Visual Recognition". Plan: ../day04-guide.html.
   Instructors: Fernanda De La Torre and Shreya Pandit.
   The earlier Day 4 parts (opening, cnns, recognition, bias, human-vs-machine, transfer, lab, wrapup)
   are still in parts/ but are no longer loaded.
   Avoid apostrophes inside the strings. */
const ORDER = [
  // part                 what
  ['start',               'Added by Fernanda: quiz, recap, course site, what is due, how to submit the proposal'],
  ['title',               'Title, one image and four questions, the path through today'],
  ['networks',            'Section 1 (0:00-0:10, 10 min): neurons, layers, loss, backpropagation, learned representations'],
  ['nn-scenes',           'Section 1, added by Fernanda: a real digit network, why layers, gradient descent, its training run, overfitting, open questions'],
  ['images',              'Section 2 (0:10-0:20, 10 min): flattening, parameter count, pixel permutation, locality, weight sharing'],
  ['convolution',         'Section 3 (0:20-0:28, 8 min): Day 3 convolution scene, hand-designed vs learned filters, output size'],
  ['architecture',        'Section 4 (0:28-0:45, 17 min): channels, conv-ReLU-pool, receptive fields, hierarchy, head, equivariance'],
  ['classification',      'Section 5 (0:45-1:00, 15 min): ImageNet, ResNet-18 on the street, softmax, embeddings, visual search'],
  ['detect-segment',      'Section 6 (1:00-1:25, 25 min): YOLO detection, thresholds and NMS, U-Net segmentation, CT example'],
  ['domains',             'Section 7 (1:25-1:35, 10 min): medical, satellite, audio, time series'],
  ['pretrained',          'Section 8 (1:35-1:55, 20 min): architecture vs weights, five questions, ResNet-18, YOLO11n, MONAI U-Net'],
  ['project',             'Section 9 (1:55-2:00, 5 min): lab directions and homework'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (the progress bar): adds up to exactly 120 minutes. */
const SEC_MINUTES = {
  'Start': 15,   // added by Fernanda: quiz (5-10 min) and the opening slides, on top of the 120
  '1. Networks': 10,
  '2. Images': 10,
  '3. Convolution': 8,
  '4. CNNs': 17,
  '5. Classify & search': 18,
  '6. YOLO & U-Net': 25,
  '7. Domains': 7,
  '8. Pretrained': 20,
  '9. Lab': 5,
};

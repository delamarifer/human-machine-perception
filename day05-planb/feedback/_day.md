# Day 5 (Plan B): Vision Transformer, after one video

Standalone backup deck. Follows "Vision Transformer" by AGI Lambda on YouTube
(https://www.youtube.com/watch?v=vJF3TBI8esQ, 5:05, no description or chapters; auto-captions read from
YouTube's transcript panel). Every animation is rebuilt from scratch as a canvas scene; no frames, audio or
narration from the video are used. Credit on the title slide and in the notes.

Preview: `python3 -m http.server 8171` from the repo root, then `day05-planb/deck.html`.
(Port 8161 from the brief was taken by another session's server.)

## Concepts in the video, in order, and where each one is

| Time | Concept in the video | How the video animates it | Slide |
|---|---|---|---|
| 0:00 | Divide the image into patches | grid laid over a cat photo | 2, click 2 |
| 0:07 | A patch is its pixel values | one patch pulled out to a grid of numbers | 2, click 3 |
| 0:15 | RGB: three channels per patch | the grid splits into red, green, blue grids | 2, click 4 |
| 0:22 | Normalize 0 to 255 into 0 to 1 | numbers change in place | 2, click 5 |
| 0:33 | 8 x 8 = 64 patches for clarity; paper uses 16 x 16 | text beside the grid, patches numbered | 2 click 2 (notes), 3 click 1 |
| 0:42 | Flatten the three channels into one vector, for every patch | channels unroll into a strip; strips for all patches | 3, clicks 2 and 3 |
| 0:54 | Rearrange the vectors | strips lined up in a row ("Inputs") | 3, click 4 |
| 0:57 | Each vector through a neural network: embedding | small network, one patch at a time, "Embeddings" row | 4, clicks 1 to 4 |
| 1:14 | Embeddings act like word embeddings | (narration) | 4, click 5 |
| 1:17 | Three copies into query, key, value matrices | one vector, three copies, x Q, K, V boxes, three outputs | 5, clicks 1 to 4 |
| 1:31 | Processed in parallel | highlight along the row | 5, click 5 |
| 1:36 | Problem: which patch is first, tenth, last? | (narration) | 6, click 1 |
| 1:42 | Word order changes meaning | a sentence with two words swapped | 6, clicks 2 and 3 (our own sentence) |
| 1:52 | Patch position matters for the image | cat grid beside the sentences | 6, click 4 (patches shuffled) |
| 2:03 | Add positional encoding to each embedding | "Pos" row, plus signs, "Final input" row | 6, click 5 |
| 2:12 | Several attention blocks, then outputs | stacked "Attention" bars, output row | 7 |
| 2:25 | Classifier network with softmax at the end | small network under the outputs | 8, click 1 |
| 2:30 | Option: last patch's output, as in next-token generation | last output token to the classifier | 8, click 2 |
| 2:36 | Extra learnable embedding (class token) gathers information | extra token at the front; curve gathering the outputs | 8, clicks 3 to 5 |
| 2:55 | Attention of the first patch with all others; then every patch | lines fan out from patch 1; then the whole grid lights up | 9 |
| 3:17 | First and last patch: global receptive field | the two corner patches boxed | 15, clicks 1 to 3 |
| 3:33 | CNNs: local receptive fields, built-in inductive bias | (narration) | 15, clicks 4 to 6 |
| 3:40 | CNNs may use texture, ViTs global shape | two illustrative edge images (the video says they are not from real models) | 16 |
| 4:10 | Fixed 16 x 16 patches; 128, 256, 512, 2048 px images; attention count per layer | the grid gets finer, counts beside it | 17, clicks 1 to 5 |
| 4:47 | "What is an alternative?" (asked, not answered) | (narration) | 17, click 6 |
| 4:51 | ViTs need large datasets to compete with CNNs | (narration) | 18 |

Not in the video, added (each marked in its notes): slide 10, Shreya's "Query, key, value" slide (Day 5 slide 15, copied at
Fernanda's request, on-screen wording unchanged); slide 11, the attention score computation
(q.k / sqrt d, softmax, weighted sum of values); slides 12, 13, 14A-C, Shreya's "Attention in four steps", "Attention by hand" and "Exercise 2"
(her Day 5 slides 16, 17, 18A-C, copied at Fernanda's request, text unchanged, notes ours); the evidence citations on
slide 16; the human-vision question on slide 18; the recap, slide 19.

Not in the video and not in the deck: multi-head attention, the MLP, layer norm and skip connections
inside the block (one sentence in the notes of slide 7), training.

## Numbers and where they come from
- 8 x 8 grid of 64 patches, 16 x 16 paper patch size, image sides 128 / 256 / 512 / 2048: from the video.
- Attention counts (4,096; 65,536; 1,048,576; 268,435,456): computed on screen as patches x patches,
  the video's counting (it leaves out the class token).
- D = 768 and 12 blocks for ViT-Base, linear patch projection, learned position embeddings,
  ImageNet vs larger-dataset result: Dosovitskiy et al. (2021), stated in the notes only.
- Pixel values on slides 2 and 3: read from the photo at 64 x 64. Blue-eye patch picked by script.
- Softmax bars on slide 8: schematic, labeled "schematic" on screen and in the notes.

## Questions for Fernanda
- [ ] "Slides 15-18" of the live Day 5 deck: I used the numbers shown on screen (15 Query, key, value; 16 Attention in
      four steps; 17 Attention by hand; 18A-C Exercise 2), which matches your earlier "slide 15 = query, key, value".
      Counting positions instead gives 13B (Exercise 1, second screen), 14 (How does a token gather relevant
      information?), 15 and 16. Want 13B and 14 added too?
- [ ] Overlap: slide 11 (ours, Inside one attention score) and slide 12 (Shreya's Attention in four steps) teach the
      same computation, for one patch vs for the whole matrix. Keep both, or drop 11 (recommended if time is short)?
- [ ] Shreya's slides count 196 tokens (224-pixel image, 16-pixel patches); the rest of Plan B uses 64. The notes say so.
- [ ] Slides 10 (Shreya's query, key, value) and 11 (attention score) go beyond the video. Keep it, move it to backup, or cut it?
- [ ] Multi-head attention is not in the video. Add a slide, or leave it out of Plan B?
- [ ] Slide 16 cites Geirhos et al. (2019) and Tuli et al. (2021) as evidence for texture vs shape. Please
      confirm you are happy citing them (the video itself shows only illustrations).
- [ ] Slide 18 ends with a question of ours, "What might this say about how people learn to see?" Keep?
- [ ] The photo is the odd-eyed cat from day05/assets/cnn-limits (copied, square crop). OK, or another image?
- [ ] Length: about 45 minutes as written (89 clicks). For a 2-hour class it would need a lab or discussion
      block after it. Anything to add?
- [ ] Colors: embeddings use the deck accent (#4f6d9a); R, G, B are used only for the three channels;
      the class token is solid ink. No new course-wide color meanings. OK?

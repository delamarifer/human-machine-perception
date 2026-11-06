/* PART: f-cliptrain (Day 5). Owner: Fernanda. One live-computed scene: how CLIP is trained (after Foundations of
   Computer Vision, Sec. 51.3, and Radford et al., 2021): two encoders into one circle, the N x N similarity matrix
   of a batch, the symmetric InfoNCE loss trained live, then zero-shot classification of new images.
   Replaces the text slides "The model we will use: CLIP" (f-clip) and "One example: how CLIP was trained" (f-lab1).
   Its notes are in the scene's own notes array, marked (draft). */
{
section('7. Task-free');

sc('clipTrainScene', 'scenes/cliptrain.html');
}

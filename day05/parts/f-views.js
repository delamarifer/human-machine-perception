/* PART: f-views (Day 5). Owner: Fernanda. One live-computed scene: the views decide what is kept. A tiny CNN is trained
   with InfoNCE on 12 toy images (3 shapes x 4 colors), once with crops-only views and once with crops + color changes.
   Our own version of the toy experiment in Foundations of Computer Vision, Sec. 30.10.2 (no figures copied).
   Sets up the Konkle and Alvarez discussion: their IPCL views are crops and color jitter.
   Its notes are in the scene's own notes array, marked (draft). */
{
section('7. Task-free');

sc('viewsScene', 'scenes/views.html');
}

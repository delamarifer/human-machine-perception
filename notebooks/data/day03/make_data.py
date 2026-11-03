"""Makes the Day 3 lab's data from the original files (sources and licenses in SOURCES.md).

Images: center square crop, resized to 256 x 256 (plenoptic's texture model needs a side divisible by 16).
Sounds: a 4-second cut, mono, 16 kHz, peak-normalized to 0.5, 16-bit WAV.

    python3 make_data.py <folder with the downloaded originals>     (needs Pillow, numpy, soundfile, ffmpeg)
"""
import os, subprocess, sys
import numpy as np, soundfile as sf
from PIL import Image

src, here = sys.argv[1], os.path.dirname(os.path.abspath(__file__))
IMAGES = {'pebbles.jpg': '1280px-Gfp-pebbles-on-the-ground.jpg', 'brick.jpg': '1280px-Brick_Wall_Tarks.jpg'}
SOUNDS = {   # name: (original file, start in seconds)
    'speech.wav': ('Librivox_-_Zimmermann_Telegram.mp3', 3.35),   # "This is a LibriVox recording. All LibriVox recordings are in the public domain."
    'rain.wav': ('Rain_against_the_window.ogg', 20.0),
    'stream.wav': ('433589_jackthemurray_stream-river-water-up-close.wav', 10.0),
    'applause.wav': ('Sound_Effects_-_Applause_after_a_concert.ogg', 5.0),
}
for out, f in IMAGES.items():
    im = Image.open(os.path.join(src, f)).convert('RGB'); w, h = im.size; s = min(w, h)
    im.crop(((w - s) // 2, (h - s) // 2, (w - s) // 2 + s, (h - s) // 2 + s)).resize((256, 256), Image.LANCZOS) \
      .save(os.path.join(here, out), quality=92)
for out, (f, t0) in SOUNDS.items():
    tmp = os.path.join(here, '_tmp.wav')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(t0), '-t', '4.0', '-i', os.path.join(src, f),
                    '-ac', '1', '-ar', '16000', tmp], check=True)
    w, sr = sf.read(tmp, dtype='float32'); os.remove(tmp)
    sf.write(os.path.join(here, out), 0.5 * w / np.abs(w).max(), sr, subtype='PCM_16')
print('done')

# Day 3 lab data: sources

All from Wikimedia Commons, downloaded 2026-11-03. `make_data.py` makes the copies here from the originals
(images: center square crop, resized to 256 x 256; sounds: a 4-second cut, mono, 16 kHz, peak 0.5, 16-bit WAV).

| File | Original | Author | License | Cut |
|---|---|---|---|---|
| `pebbles.jpg` | [Gfp-pebbles-on-the-ground.jpg](https://commons.wikimedia.org/wiki/File:Gfp-pebbles-on-the-ground.jpg) (1280 px thumbnail) | Yinan Chen, goodfreephotos.com | Public domain | center square |
| `brick.jpg` | [Brick Wall Tarks.jpg](https://commons.wikimedia.org/wiki/File:Brick_Wall_Tarks.jpg) (1280 px thumbnail) | railyaal (Pixabay) | CC0 | center square |
| `speech.wav` | [Librivox - Zimmermann Telegram.mp3](https://commons.wikimedia.org/wiki/File:Librivox_-_Zimmermann_Telegram.mp3) | LibriVox, read by Nicholi Volta | Public domain | 3.35-7.35 s: "This is a LibriVox recording. All LibriVox recordings are in the public domain." |
| `rain.wav` | [Rain against the window.ogg](https://commons.wikimedia.org/wiki/File:Rain_against_the_window.ogg) | cori | Public domain | 20-24 s |
| `stream.wav` | [433589 jackthemurray stream-river-water-up-close.wav](https://commons.wikimedia.org/wiki/File:433589_jackthemurray_stream-river-water-up-close.wav) | jackthemurray | CC0 | 10-14 s |
| `applause.wav` | [Sound Effects - Applause after a concert.ogg](https://commons.wikimedia.org/wiki/File:Sound_Effects_-_Applause_after_a_concert.ogg) | Amada44 | CC0 | 5-9 s |

The words in `speech.wav` were checked with torchaudio's wav2vec 2.0 recognizer (WAV2VEC2_ASR_BASE_960H) on the
original file, which reads "THIS IS A LIBERFOX RECORDING ALL LIBERFOX RECORTERING ITS WHON THE PUBLIC DON'T"
(LibriVox's standard opening; "LIBERFOX" is the recognizer's spelling).

The notebook also uses `assets/metamers/coffee.jpg` (Shixart1985, CC BY 2.0; see `assets/metamers/SOURCES.md`).

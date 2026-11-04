# Portilla–Simoncelli texture syntheses: sources and how they were made

For the Day 3 slides "Textures: statistics as knobs" (Portilla & Simoncelli, 2000).

## Images

Copied from `notebooks/data/day03/` on branch `claude/day03-metamer-lab-d865a4` (the Day 3 lab data). Both are
from Wikimedia Commons, downloaded 2026-11-03, center square crop, resized to 256 × 256.

| File | Original | Author | License |
|---|---|---|---|
| `pebbles-source.jpg` | [Gfp-pebbles-on-the-ground.jpg](https://commons.wikimedia.org/wiki/File:Gfp-pebbles-on-the-ground.jpg) (1280 px thumbnail) | Yinan Chen, goodfreephotos.com | Public domain |
| `brick-source.jpg` | [Brick Wall Tarks.jpg](https://commons.wikimedia.org/wiki/File:Brick_Wall_Tarks.jpg) (1280 px thumbnail) | railyaal (Pixabay) | CC0 |

`*-original.png` is the source in grayscale (PIL `convert("L")`). Every other PNG is a synthesis made here.

## How the syntheses were made

`make_ps_textures.py` (this folder), with plenoptic 2.1.2 and torch 2.15.0 on CPU (Apple-silicon Mac), in float64.

- Model: `po.models.PortillaSimoncelli`, 4 scales, 4 orientations, `spatial_corr_width=7` (plenoptic's defaults).
- Loss: `po.loss.portilla_simoncelli_loss_factory(model, image)`.
- Optimizer: LBFGS (`max_iter=10, max_eval=10, history_size=100, line_search_fn="strong_wolfe", lr=1`), up to
  300 outer steps. These are the settings in plenoptic's documentation and in the Day 3 lab.
- Start: white noise, uniform in [0, 1] (`torch.rand_like` after `po.set_seed(0)`), saved as `*-noise.png`. All
  syntheses of one texture start from that same image.
- Saved as 8-bit grayscale PNGs, 256 × 256, clipped to [0, 1]. Under 0.1% of the pixels were outside that range in
  any synthesis (`fraction_clipped` in `manifest.json`).

**Groups of statistics.** The four groups, their names and the statistics in each are the ones in plenoptic's
documentation page "Understanding Portilla-Simoncelli model statistics"
(`docs/user_guide/models_and_metrics/portilla_simoncelli/understanding/ps_understand_stats.md` in the plenoptic
repository). A group is removed the way that page does it: a subclass (`PortillaSimoncelliRemove`) sets those
statistics to zero in the model's output, so the synthesis is free to give them any value.

| Group (file name) | plenoptic's name | Statistics |
|---|---|---|
| `pixel_marginal` | Pixel statistics + marginal statistics | `pixel_statistics` (mean, variance, skew, kurtosis, min, max of the image), `skew_reconstructed`, `kurtosis_reconstructed` (of the lowpass image at each scale) |
| `coefficient_correlations` | Coefficient correlations | `auto_correlation_reconstructed`, `std_reconstructed` |
| `magnitude_correlations` | Magnitude correlation | `auto_correlation_magnitude`, `cross_orientation_correlation_magnitude`, `cross_scale_correlation_magnitude`, `magnitude_std` |
| `cross_scale_phase` | Cross-scale phase statistics | `cross_scale_correlation_real` |

`var_highpass_residual` (the variance of the finest, highpass band) is in none of the documentation's groups, so it
is kept in every synthesis.

**Files.** For each texture:

- `*-original.png`, `*-noise.png`
- `*-all.png`: all statistics
- `*-without-<group>.png`: all statistics except one group
- cumulative series, adding the groups in the order above: `*-cumulative-1-pixel_marginal.png`,
  `*-cumulative-2-pixel_marginal+coefficient_correlations.png`, then `*-without-cross_scale_phase.png` (three groups:
  the same synthesis, so it is not repeated) and `*-all.png` (four groups).

`manifest.json` lists every file with the groups kept and removed, the number of steps, the first and last loss,
the seed and the plenoptic version, and also `loss_on_all_statistics`: the full model's loss for that image against
the original, which says how far each synthesis is from the original on all the statistics, including the ones it
was not asked to match.

**Convergence.** Every run reached a loss at least four orders of magnitude below its start (final losses
1e-5 to 1e-3). The two "pixel + marginal only" runs stopped early (74 and 77 steps) because the loss stopped
changing. The others ran all 300 steps; their loss was still falling slowly at the end (by 5 to 33% over the last
20 steps, on values near 1e-4). As a check, `pebbles-all` was run again for 600 steps: its loss fell from 1.6e-4
(step 300) to 5.2e-5 (step 600), but the image hardly changed (mean absolute difference 0.46 gray levels out of 255;
correlation 0.9999 with the 300-step image). So 300 steps is enough for what the slides show.

Run it again with:

    python make_ps_textures.py            # about 7 minutes per synthesis on a laptop CPU, 14 syntheses

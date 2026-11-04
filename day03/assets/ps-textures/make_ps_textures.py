"""Portilla-Simoncelli texture syntheses for the Day 3 slides "Textures: statistics as knobs".

For each texture (pebbles, brick): the original, the white-noise start, a synthesis with all statistics,
one synthesis per removed group of statistics, and a cumulative series that adds the groups one at a time.
Writes 8-bit grayscale 256 x 256 PNGs and manifest.json next to this file.

The groups and the way they are removed (zeroing them in the model's output) follow plenoptic's
documentation page "Understanding Portilla-Simoncelli model statistics" (its PortillaSimoncelliRemove
class); the optimizer settings are the ones that page and the Day 3 lab use. Requires plenoptic==2.1.2.

    python make_ps_textures.py                    # everything
    python make_ps_textures.py --texture brick    # one texture (the manifest is merged, not overwritten)
    python make_ps_textures.py --steps 20         # a quick test
"""
import argparse
import json
import time
from collections import OrderedDict
from pathlib import Path

import numpy as np
import plenoptic as po
import torch
from PIL import Image

HERE = Path(__file__).resolve().parent
SEED = 0
STEPS = 300          # default number of outer LBFGS steps (each up to 10 inner evaluations)
OPT_KWARGS = dict(max_iter=10, max_eval=10, history_size=100, line_search_fn="strong_wolfe", lr=1)
TEXTURES = ["pebbles", "brick"]

# The groups, with the names and keys used in plenoptic's documentation (section headings of
# "Understanding Portilla-Simoncelli model statistics"). var_highpass_residual is in no group there,
# so it is always kept.
GROUPS = OrderedDict([
    ("pixel_marginal", dict(name="Pixel statistics + marginal statistics",
                            keys=["pixel_statistics", "skew_reconstructed", "kurtosis_reconstructed"])),
    ("coefficient_correlations", dict(name="Coefficient correlations",
                                      keys=["auto_correlation_reconstructed", "std_reconstructed"])),
    ("magnitude_correlations", dict(name="Magnitude correlation",
                                    keys=["magnitude_std", "cross_orientation_correlation_magnitude",
                                          "cross_scale_correlation_magnitude", "auto_correlation_magnitude"])),
    ("cross_scale_phase", dict(name="Cross-scale phase statistics",
                               keys=["cross_scale_correlation_real"])),
])


class PortillaSimoncelliRemove(po.models.PortillaSimoncelli):
    """PortillaSimoncelli with some statistics set to zero (from plenoptic's documentation)."""

    def __init__(self, im_shape, remove_keys):
        super().__init__(im_shape, n_scales=4, n_orientations=4, spatial_corr_width=7)
        self.remove_keys = remove_keys

    def forward(self, image, scales=None):
        stats_dict = self.convert_to_dict(super().forward(image))
        for kk in self.remove_keys:
            if isinstance(stats_dict[kk], OrderedDict):
                for key in stats_dict[kk]:
                    stats_dict[kk][key] *= 0
            else:
                stats_dict[kk] *= 0
        stats_vec = self.convert_to_tensor(stats_dict)
        if scales is not None:
            stats_vec = self.remove_scales(stats_vec, scales)
        return stats_vec


def variants():
    """(file stem, groups kept, groups removed) for every synthesis."""
    names = list(GROUPS)
    out = [("all", names, [])]
    out += [(f"without-{g}", [k for k in names if k != g], [g]) for g in names]
    out += [(f"cumulative-{i}-" + "+".join(names[:i]), names[:i], names[i:]) for i in (1, 2)]
    return out   # the cumulative series goes on with "without-cross_scale_phase" (three groups), then "all"


def load_gray(path):
    im = Image.open(path).convert("L")
    assert im.size == (256, 256), im.size
    return torch.tensor(np.array(im) / 255.0, dtype=torch.float64)[None, None]


def save_png(x, path):
    a = x.detach().squeeze().clamp(0, 1).numpy()
    Image.fromarray(np.round(a * 255).astype(np.uint8), mode="L").save(path)


def synthesize(image, init, removed_groups, steps):
    keys = [k for g in removed_groups for k in GROUPS[g]["keys"]]
    model = PortillaSimoncelliRemove(image.shape[-2:], remove_keys=keys).eval()
    po.remove_grad(model)
    loss = po.loss.portilla_simoncelli_loss_factory(model, image)
    po.set_seed(SEED)
    met = po.Metamer(image, model, loss_function=loss)
    met.setup(initial_image=init.clone(), optimizer=torch.optim.LBFGS, optimizer_kwargs=OPT_KWARGS)
    t0 = time.time()
    met.synthesize(max_iter=steps, stop_criterion=1e-8, stop_iters_to_check=20)
    return met, time.time() - t0


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--texture", choices=TEXTURES, nargs="*", default=TEXTURES)
    ap.add_argument("--steps", type=int, default=STEPS)
    args = ap.parse_args()

    manifest_path = HERE / "manifest.json"
    manifest = {}
    manifest.update(plenoptic=po.__version__, torch=torch.__version__, seed=SEED,
                    optimizer=dict(name="LBFGS", **OPT_KWARGS), max_outer_steps=args.steps,
                    groups={g: v for g, v in GROUPS.items()},
                    always_kept=["var_highpass_residual"],
                    seconds="wall-clock time of each synthesis (includes any time the computer slept)")
    files = {}
    full_model = po.models.PortillaSimoncelli((256, 256)).eval()

    for tex in args.texture:
        image = load_gray(HERE / f"{tex}-source.jpg")
        save_png(image, HERE / f"{tex}-original.png")
        files[f"{tex}-original.png"] = dict(file=f"{tex}-original.png", texture=tex, kind="original",
                                            note=f"{tex}-source.jpg in grayscale (PIL convert('L'))")
        po.set_seed(SEED)
        init = torch.rand_like(image)   # white noise, uniform in [0, 1]: plenoptic's default start
        save_png(init, HERE / f"{tex}-noise.png")
        files[f"{tex}-noise.png"] = dict(file=f"{tex}-noise.png", texture=tex, kind="white-noise start",
                                         seed=SEED, note="torch.rand_like after po.set_seed(0); every synthesis of this texture starts here")
        full_loss = po.loss.portilla_simoncelli_loss_factory(full_model, image)
        target_stats = full_model(image)

        for stem, kept, removed in variants():
            met, secs = synthesize(image, init, removed, args.steps)
            losses = [float(l) for l in met.losses]
            x = met.metamer.detach()
            name = f"{tex}-{stem}.png"
            save_png(x, HERE / name)
            last = losses[-21:] if len(losses) > 21 else losses
            files[name] = dict(
                file=name, texture=tex, kind="synthesis", groups_kept=kept, groups_removed=removed,
                iterations=len(losses) - 1, seconds=round(secs, 1),
                initial_loss=losses[0], final_loss=losses[-1],
                loss_relative_change_last_20=(last[0] - last[-1]) / last[0] if last[0] else 0.0,
                loss_every_10_steps=losses[::10],
                loss_on_all_statistics=float(full_loss(full_model(x), target_stats)),
                pixel_range_before_clipping=[float(x.min()), float(x.max())],
                fraction_clipped=float(((x < 0) | (x > 1)).double().mean()),
                seed=SEED, plenoptic=po.__version__)
            print(f"{name}: {len(losses) - 1} steps, {secs:.0f} s, loss {losses[0]:.3g} -> {losses[-1]:.3g}, "
                  f"all-stats loss {files[name]['loss_on_all_statistics']:.3g}", flush=True)

    # re-read just before writing, so two runs (one per texture) can share the manifest
    if manifest_path.exists():
        files = {f["file"]: f for f in json.loads(manifest_path.read_text())["files"]} | files
    manifest["cumulative_series"] = {t: [f"{t}-cumulative-1-pixel_marginal.png",
                                         f"{t}-cumulative-2-pixel_marginal+coefficient_correlations.png",
                                         f"{t}-without-cross_scale_phase.png", f"{t}-all.png"] for t in TEXTURES}
    manifest["files"] = sorted(files.values(), key=lambda f: (f["texture"], f["file"]))
    manifest_path.write_text(json.dumps(manifest, indent=2) + "\n")


if __name__ == "__main__":
    main()

"""Build the Day 9 workbooks, each in two versions (owner: Shreya).

    python3 day09/workbook/solutions/build.py

Student versions  -> day09/workbook/<name>.ipynb             (public, linked from the deck)
Solution versions -> day09/workbook/solutions/<name>-solutions.ipynb   (in the public repo, not linked from the deck)

In a code cell, a block between
    #>> TODO: what to write
    ...solution lines...
    #<<
becomes, in the student version, the TODO line plus `raise NotImplementedError(...)` at the same indentation.
This file holds the solutions, so keep it beside them and don't link it from the deck.
"""
import json, re, sys
from pathlib import Path
import nbformat as nbf

ROOT = Path(__file__).resolve().parents[3]
OUT_STUDENT = ROOT / "day09" / "workbook"
OUT_SOLUTION = Path(__file__).resolve().parent

md = lambda s: ("md", s.strip("\n"))
code = lambda s: ("code", s.strip("\n"))

MARK = re.compile(r"^(?P<ind>[ \t]*)#>> TODO(?P<n> \d+)?: (?P<msg>.*)$")


def render(src, solution):
    out, i, lines = [], 0, src.split("\n")
    while i < len(lines):
        m = MARK.match(lines[i])
        if not m:
            out.append(lines[i]); i += 1; continue
        ind, msg = m.group("ind"), m.group("msg")
        j = i + 1
        while lines[j].strip() != "#<<":
            j += 1
        body = lines[i + 1:j]
        if solution:
            out.append(f"{ind}# TODO: {msg}")
            out.extend(body)
        else:
            out.append(f"{ind}# TODO: {msg}")
            out.append(f'{ind}raise NotImplementedError("TODO: {msg}")')
        i = j + 1
    return "\n".join(out)


def write(name, cells, title_note):
    for solution in (False, True):
        nb = nbf.v4.new_notebook(metadata={"kernelspec": {"display_name": "Python 3", "language": "python", "name": "python3"},
                                           "language_info": {"name": "python"}})
        for kind, src in cells:
            if kind == "md":
                if solution and src.startswith("# "):
                    src = src.replace("\n", "\n\n> **Solutions.** Teacher copy, not for posting.\n", 1)
                nb.cells.append(nbf.v4.new_markdown_cell(src))
            else:
                nb.cells.append(nbf.v4.new_code_cell(render(src, solution)))
        path = (OUT_SOLUTION / f"{name}-solutions.ipynb") if solution else (OUT_STUDENT / f"{name}.ipynb")
        for i, c in enumerate(nb.cells):
            c.id = f"c{i:03d}"  # fixed ids, so a rebuild only changes what changed
        path.parent.mkdir(parents=True, exist_ok=True)
        nbf.write(nb, path)
        print("wrote", path.relative_to(ROOT))


# ---------------------------------------------------------------------------------------------
# Track A: autoencoders and VAEs. Built from the Day 8 workbook (sections 1 and 2), with TODOs.
# ---------------------------------------------------------------------------------------------
def track_a():
    src = json.load(open(ROOT / "day08" / "workbook" / "generative-models-workbook.ipynb"))
    old = ["".join(c["source"]) for c in src["cells"]]
    kinds = [c["cell_type"] for c in src["cells"]]
    cells = [md("""
# Compress, then Generate: Autoencoders and VAEs

**Day 9 · Human and Machine Perception**

An autoencoder squeezes an image through a small code and rebuilds it. A variational autoencoder (VAE) does the same, but forces the codes to follow a known distribution, so you can make new images by decoding random codes.

**How to use it:** run the cells top to bottom. When a cell stops with `NotImplementedError`, that is a **TODO** for you. Write the missing lines where the `# TODO` comment is, delete the `raise` line, and run the cell again. The check cell right after each TODO tells you if it works.

| TODO | Where | What you write |
|---|---|---|
| 1 | 1.1 | The decoder of the autoencoder |
| 2 | Shared helpers | The reconstruction loss |
| 3 | 2.1 | The reparameterization trick |
| 4 | 2.1 | The VAE loss: reconstruction plus KL |
| 5 | 2.5 | A walk between two digits in the code space |

Training runs on a CPU: about 3 minutes in all.

*The autoencoder section is adapted from priyammaz/PyTorch-Adventures, "Intro to AutoEncoders" (MIT License). The code is rewritten. The MP4 analogy and the compact-latent argument follow the original.*
""")]
    # Day 8 cells 2..39 (setup through VAE), with the TODO cells swapped in.
    for k in range(2, 40):
        s = old[k]
        if k == 5:   # shared helpers: TODO 2, the reconstruction loss
            s = s.replace("            loss = F.mse_loss(recon, x)\n",
                          "            #>> TODO 2: the reconstruction loss, the mean squared error between recon and x\n"
                          "            loss = F.mse_loss(recon, x)\n            #<<\n")
            assert "#>> TODO 2" in s
        if k == 8:   # TODO 1, the decoder
            s = s.replace("""        self.decoder = nn.Sequential(
            nn.Linear(bottleneck, 32), nn.ReLU(),
            nn.Linear(32, 64), nn.ReLU(),
            nn.Linear(64, 128), nn.ReLU(),
            nn.Linear(128, 32 * 32), nn.Sigmoid(),
        )
""", """        #>> TODO 1: the decoder, the encoder in reverse: bottleneck -> 32 -> 64 -> 128 -> 32*32, ReLU between layers, Sigmoid at the end
        self.decoder = nn.Sequential(
            nn.Linear(bottleneck, 32), nn.ReLU(),
            nn.Linear(32, 64), nn.ReLU(),
            nn.Linear(64, 128), nn.ReLU(),
            nn.Linear(128, 32 * 32), nn.Sigmoid(),
        )
        #<<
""")
            assert "#>> TODO 1" in s
            s = s.replace("\n\nnonlinear_ae = MLPAutoEncoder(bottleneck=2)\nnonlinear_hist = train(nonlinear_ae, epochs=5)", "")
            cells.append(("code", s))
            cells.append(md("**Check TODO 1.** The output must be a batch of 32 × 32 images with pixels between 0 and 1. Then train for 5 epochs; this also checks TODO 2."))
            cells.append(code("""
z_check, r_check = MLPAutoEncoder(bottleneck=2)(torch.rand(4, 1, 32, 32))
assert tuple(z_check.shape) == (4, 2), f"code shape is {tuple(z_check.shape)}, expected (4, 2)"
assert tuple(r_check.shape) == (4, 1, 32, 32), f"output shape is {tuple(r_check.shape)}, expected (4, 1, 32, 32)"
assert 0 <= r_check.min() and r_check.max() <= 1, "pixels must be in [0, 1]: end the decoder with a Sigmoid"
print("TODO 1 works.")

nonlinear_ae = MLPAutoEncoder(bottleneck=2)
nonlinear_hist = train(nonlinear_ae, epochs=5)
"""))
            continue
        if k == 26:  # TODO 3 and 4
            s = """def reparameterize(mu, logvar):
    #>> TODO 3: sample z = mu + sigma * eps, where sigma = exp(logvar / 2) and eps ~ N(0, I) has the shape of sigma
    std = torch.exp(0.5 * logvar)
    eps = torch.randn_like(std)
    return mu + std * eps
    #<<


def vae_loss(x, recon, mu, logvar, kl_weight=1.0):
    #>> TODO 4: recon_loss = squared error summed over each image's pixels, averaged over the batch; kl = the closed-form KL above, summed over code dimensions, averaged over the batch
    recon_loss = F.mse_loss(recon, x, reduction="none").flatten(1).sum(dim=1).mean()
    kl = -0.5 * torch.sum(1 + logvar - mu.pow(2) - logvar.exp(), dim=1).mean()
    #<<
    return recon_loss + kl_weight * kl, recon_loss, kl"""
            cells.append(("code", s))
            cells.append(md("**Check TODOs 3 and 4.** With $\\mu = 0$ and $\\log\\sigma^2 = 0$ the code is already N(0, I), so the KL must be 0. A perfect reconstruction has zero error."))
            cells.append(code("""
torch.manual_seed(0)
mu_c, logvar_c = torch.zeros(1000, 2), torch.zeros(1000, 2)
z_c = reparameterize(mu_c, logvar_c)
assert tuple(z_c.shape) == (1000, 2), "z must have the same shape as mu"
assert abs(z_c.mean().item()) < 0.1 and abs(z_c.std().item() - 1) < 0.1, "z should look like N(0, I) here"
assert reparameterize(torch.ones(5, 2), torch.full((5, 2), -50.0)).allclose(torch.ones(5, 2), atol=1e-4), "with tiny sigma, z should equal mu"

x_c = torch.rand(8, 1, 32, 32)
total, rec, kl = vae_loss(x_c, x_c, torch.zeros(8, 2), torch.zeros(8, 2))
assert abs(rec.item()) < 1e-6 and abs(kl.item()) < 1e-6, "perfect reconstruction and mu=0, logvar=0 should give zero loss"
_, rec2, kl2 = vae_loss(torch.ones(2, 1, 32, 32), torch.zeros(2, 1, 32, 32), torch.ones(2, 2), torch.zeros(2, 2))
assert abs(rec2.item() - 1024) < 1e-3, f"reconstruction should be summed over the 1024 pixels: got {rec2.item():.1f}"
assert abs(kl2.item() - 1.0) < 1e-5, f"KL for mu=1, logvar=0 in 2 dimensions should be 1.0: got {kl2.item():.3f}"
print("TODOs 3 and 4 work.")
"""))
            continue
        if k == 33:  # before "Generate from the prior": add TODO 5, a walk between two digits
            cells.append(md("""
### 2.5 Walk between two digits

Encode two test digits, then decode the points on the straight line between their codes. In a VAE the space between codes is filled, so the digit should morph smoothly. The renumbered next section, 2.6, generates from the prior.
"""))
            cells.append(code("""
@torch.no_grad()
def walk(model, x_a, x_b, steps=10):
    model.eval()
    z_a, _ = model.encode(x_a.unsqueeze(0).to(device))
    z_b, _ = model.encode(x_b.unsqueeze(0).to(device))
    frames = []
    for t in np.linspace(0, 1, steps):
        #>> TODO 5: the point a fraction t of the way from z_a to z_b
        z = (1 - t) * z_a + t * z_b
        #<<
        frames.append(model.decoder(z).view(32, 32).cpu().numpy())
    return frames


# Find a 1 and a 7 in the test set and walk between them
idx_1 = next(i for i in range(len(test_set)) if test_set[i][1] == 1)
idx_7 = next(i for i in range(len(test_set)) if test_set[i][1] == 7)
frames = walk(vae_b1, test_set[idx_1][0], test_set[idx_7][0])
assert len(frames) == 10
fig, axes = plt.subplots(1, 10, figsize=(12, 2))
for ax, img in zip(axes, frames):
    ax.imshow(img, cmap="gray")
    ax.axis("off")
plt.suptitle("From a 1 to a 7 through the VAE code space")
plt.show()
print("TODO 5 works if the row morphs from a 1 to a 7.")
"""))
            s = s.replace("### 2.5 Generate from the prior", "### 2.6 Generate from the prior")
        # renumber the later VAE headings after the new 2.5
        for a, b in [("### 2.6 A convolutional VAE", "### 2.7 A convolutional VAE"),
                     ("### 2.7 Reconstructions and samples: the blur", "### 2.8 Reconstructions and samples: the blur"),
                     ("### 2.8 Check yourself", "### 2.9 Check yourself"), ("### 2.9 Exercises", "### 2.10 Exercises")]:
            s = s.replace(a, b)
        cells.append(("md" if kinds[k] == "markdown" else "code", s))
    assert "Day 8" not in "\n".join(c[1] for c in cells), "the student never saw the Day 8 workbook: no Day 8 mentions"
    write("autoencoders-and-vaes", cells, "")


# ---------------------------------------------------------------------------------------------
# Track B: GANs, from a ring of 2D points to MNIST digits. Runs on a CPU in under a minute.
# ---------------------------------------------------------------------------------------------
def track_b():
    cells = [
md(r"""
# Generator vs Discriminator: GANs from 2D Points to Digits

**Day 9 · Human and Machine Perception**

A generative adversarial network (GAN) trains two networks against each other. The **generator** turns random noise into samples. The **discriminator** tries to tell real samples from generated ones. Each one gets better by beating the other.

**How to use it:** run the cells top to bottom. When a cell stops with `NotImplementedError`, that is a **TODO** for you. Write the missing lines where the `# TODO` comment is, delete the `raise` line, and run the cell again.

| TODO | Where | What you write |
|---|---|---|
| 1 | Training loop | The discriminator's loss |
| 2 | Training loop | The generator's loss |
| 3 | Part 2 | A walk between two noise vectors |

Everything runs on a CPU: Part 1 trains in about 10 seconds, Part 2 in under a minute.
"""),
md("## Setup\n\nNeeds `torch`, `torchvision` and `matplotlib`, which Colab already has. MNIST downloads into `data/` the first time you run Part 2."),
code(r"""
import time
import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F
import matplotlib.pyplot as plt
from torch.utils.data import DataLoader
from torchvision import datasets, transforms

torch.manual_seed(0)
np.random.seed(0)
device = "cuda" if torch.cuda.is_available() else "cpu"
print("Running on", device)
"""),
md(r"""
---
## The idea and the math

The discriminator $D(x)$ outputs the probability that $x$ is real. The generator $G(z)$ maps noise $z \sim \mathcal{N}(0, I)$ to a sample. They play a min-max game (Goodfellow et al., 2014):

$$\min_G \max_D \; \mathbb{E}_{x \sim p_\text{data}}\big[\log D(x)\big] + \mathbb{E}_{z \sim \mathcal{N}(0,I)}\big[\log\big(1 - D(G(z))\big)\big]$$

- $D$ wants $D(x) \to 1$ on real data and $D(G(z)) \to 0$ on fakes.
- $G$ wants $D(G(z)) \to 1$, so its fakes pass as real.

In practice the generator maximizes $\log D(G(z))$ instead of minimizing $\log(1 - D(G(z)))$. It is the same goal, but the gradient is stronger early on, when the fakes are easy to spot.

Each training step has two halves:
1. **Discriminator step:** show it a real batch (label 1) and a fake batch (label 0), and update $D$ only.
2. **Generator step:** make a fresh fake batch, label it 1, and update $G$ only, through $D$.

`D` outputs a raw score (a logit). `bce = nn.BCEWithLogitsLoss()` applies the sigmoid for us: `bce(scores, labels)` is the binary cross-entropy between the scores and the 0 or 1 labels.
"""),
code(r"""
def train_gan(G, D, real_batches, steps, z_dim, lr=2e-4, snapshot_at=(), fixed_z=None):
    # real_batches(): returns one batch of real data. Returns the loss history and samples from fixed_z at each snapshot step.
    G, D = G.to(device), D.to(device)
    opt_G = torch.optim.Adam(G.parameters(), lr=lr, betas=(0.5, 0.999))
    opt_D = torch.optim.Adam(D.parameters(), lr=lr, betas=(0.5, 0.999))
    bce = nn.BCEWithLogitsLoss()
    history, snapshots = {"D": [], "G": []}, {}
    for step in range(1, steps + 1):
        x = real_batches().to(device)
        n = x.shape[0]
        ones, zeros = torch.ones(n, 1, device=device), torch.zeros(n, 1, device=device)

        # 1. discriminator step
        fake = G(torch.randn(n, z_dim, device=device)).detach()   # detach: do not update G here
        #>> TODO 1: loss_D = the BCE of D on the real batch x against ones, plus the BCE of D on fake against zeros
        loss_D = bce(D(x), ones) + bce(D(fake), zeros)
        #<<
        opt_D.zero_grad(); loss_D.backward(); opt_D.step()

        # 2. generator step
        fake = G(torch.randn(n, z_dim, device=device))
        #>> TODO 2: loss_G = the BCE of D on the new fake batch against ones (the generator wants its fakes called real)
        loss_G = bce(D(fake), ones)
        #<<
        opt_G.zero_grad(); loss_G.backward(); opt_G.step()

        history["D"].append(loss_D.item()); history["G"].append(loss_G.item())
        if step in snapshot_at and fixed_z is not None:
            G.eval()                      # batch norm: use running statistics when sampling
            with torch.no_grad():
                snapshots[step] = G(fixed_z.to(device)).cpu()
            G.train()
    return history, snapshots


def plot_losses(history, every=1, title="Losses"):
    plt.figure(figsize=(7, 3))
    for k in history:
        h = np.convolve(history[k], np.ones(every) / every, mode="valid")
        plt.plot(h, label=f"{k} loss")
    plt.xlabel("training step"); plt.legend(); plt.title(title); plt.show()
"""),
md(r"""
---
## Part 1. A GAN on 2D points

Real data: points from 8 small clusters on a ring. With only two numbers per sample we can **see** everything: the real data, the fakes, and how the generator moves them during training.

A good generator puts points on **all 8** clusters. A common failure is **mode collapse**: the generator finds a few clusters that fool the discriminator and stops covering the rest.
"""),
code(r"""
N_MODES, RADIUS, SPREAD = 8, 2.0, 0.05
angles = torch.arange(N_MODES) * 2 * np.pi / N_MODES
centers = torch.stack([RADIUS * torch.cos(angles), RADIUS * torch.sin(angles)], dim=1)

def ring_batch(n=256):
    idx = torch.randint(0, N_MODES, (n,))
    return centers[idx] + SPREAD * torch.randn(n, 2)

def modes_covered(samples, min_share=0.02):
    # a mode counts as covered if at least 2% of samples land within 3 standard deviations of its center
    d = torch.cdist(samples, centers)
    near = d.min(dim=1).values < 3 * SPREAD
    which = d.argmin(dim=1)[near]
    counts = torch.bincount(which, minlength=N_MODES).float() / len(samples)
    return int((counts >= min_share).sum()), near.float().mean().item()

real = ring_batch(2000)
plt.figure(figsize=(4, 4)); plt.scatter(real[:, 0], real[:, 1], s=2)
plt.axis("equal"); plt.title("Real data: 8 clusters on a ring"); plt.show()
"""),
md("**Train it.** This runs TODOs 1 and 2. If they are right, the red points spread out to cover the clusters by step 3000."),
code(r"""
Z2 = 2
def make_2d_gan(width=64):
    G = nn.Sequential(nn.Linear(Z2, width), nn.ReLU(), nn.Linear(width, width), nn.ReLU(), nn.Linear(width, 2))
    D = nn.Sequential(nn.Linear(2, width), nn.ReLU(), nn.Linear(width, width), nn.ReLU(), nn.Linear(width, 1))
    return G, D

torch.manual_seed(0)
G2, D2 = make_2d_gan()
fixed_z2 = torch.randn(1000, Z2)
snaps = (1, 250, 500, 1000, 2000, 3000)

t0 = time.time()
hist2, shots2 = train_gan(G2, D2, ring_batch, steps=3000, z_dim=Z2, lr=1e-3, snapshot_at=snaps, fixed_z=fixed_z2)
print(f"trained in {time.time() - t0:.1f} s")

fig, axes = plt.subplots(1, len(snaps), figsize=(3 * len(snaps), 3))
for ax, s in zip(axes, snaps):
    ax.scatter(real[:, 0], real[:, 1], s=1, c="lightgray")
    ax.scatter(shots2[s][:, 0], shots2[s][:, 1], s=2, c="crimson")
    m, q = modes_covered(shots2[s])
    ax.set_title(f"step {s}\n{m}/8 modes, {q:.0%} on target", fontsize=9)
    ax.set_xlim(-3, 3); ax.set_ylim(-3, 3); ax.set_aspect("equal"); ax.axis("off")
plt.suptitle("Gray: real data. Red: generator samples (same noise every time)"); plt.tight_layout(); plt.show()

plot_losses(hist2, every=50, title="2D GAN losses (moving average)")
m, q = modes_covered(shots2[3000])
print(f"Final: {m}/8 modes covered.", "TODOs 1 and 2 look right." if m >= 6 else "Fewer than 6 modes: check TODOs 1 and 2.")
"""),
md(r"""
### Try it (Part 1)

Each run takes seconds, so change one thing at a time and re-run the training cell.

1. **Read the losses.** Do they go to zero, or do they settle? Why can't both players win at once?
2. **Mode collapse.** Re-run with `torch.manual_seed(1)`, `2` and `3`. How many of the 8 modes does each run cover? Does a lower generator loss mean better coverage?
3. **An unfair game.** Make the discriminator weak with `make_2d_gan(width=8)`, or give it a much higher learning rate than the generator. What happens to the samples?
4. **Noise size.** The generator gets 2 numbers of noise (`Z2 = 2`). Try `Z2 = 1`. Can a 1-number input still cover a ring of 8 clusters? Look at the shape the samples form.
"""),
md(r"""
---
## Part 2. A GAN on MNIST digits

Same training loop, now on 28×28 images. Both networks are small fully connected networks, so this stays fast on a CPU. The generator uses batch normalization, which helps it train in only a few epochs. It ends with `tanh`, so pixels are scaled to [-1, 1].

We keep one fixed batch of noise and decode it after every epoch, so you can watch the **same** noise vectors turn into digits.
"""),
code(r"""
mnist = datasets.MNIST("data", train=True, download=True)
X_mnist = mnist.data.view(-1, 28 * 28).float() / 127.5 - 1      # all 60,000 images in memory, pixels in [-1, 1]
BATCH = 64

def mnist_batch():
    return X_mnist[torch.randint(0, len(X_mnist), (BATCH,))]

ZM = 64
Gm = nn.Sequential(nn.Linear(ZM, 256), nn.BatchNorm1d(256), nn.LeakyReLU(0.2),
                   nn.Linear(256, 512), nn.BatchNorm1d(512), nn.LeakyReLU(0.2),
                   nn.Linear(512, 28 * 28), nn.Tanh())
Dm = nn.Sequential(nn.Linear(28 * 28, 512), nn.LeakyReLU(0.2),
                   nn.Linear(512, 256), nn.LeakyReLU(0.2),
                   nn.Linear(256, 1))

def show_digits(x, title, n_row=2):
    x = (x.view(-1, 28, 28) + 1) / 2
    n = x.shape[0]; per = n // n_row
    grid = torch.cat([torch.cat(list(x[r * per:(r + 1) * per]), dim=1) for r in range(n_row)], dim=0)
    plt.figure(figsize=(per * 0.8, n_row * 0.8)); plt.imshow(grid, cmap="gray"); plt.axis("off"); plt.title(title); plt.show()
"""),
code(r"""
EPOCHS = 3                      # an epoch here is 937 random batches of 64: about 10 seconds on a CPU
steps_per_epoch = len(X_mnist) // BATCH
torch.manual_seed(0)
fixed_zm = torch.randn(16, ZM)

t0 = time.time()
histm, shotsm = train_gan(Gm, Dm, mnist_batch, steps=EPOCHS * steps_per_epoch, z_dim=ZM, lr=5e-4,
                          snapshot_at={e * steps_per_epoch for e in range(1, EPOCHS + 1)} | {100}, fixed_z=fixed_zm)
print(f"trained {EPOCHS} epochs in {time.time() - t0:.0f} s")

for s in sorted(shotsm):
    show_digits(shotsm[s], f"step {s} (epoch {s / steps_per_epoch:.2f})")
plot_losses(histm, every=100, title="MNIST GAN losses (moving average)")
"""),
md(r"""
### Walk through the noise space

Pick two noise vectors and decode the points on the straight line between them. If the generator has learned a smooth space, the digit should morph gradually instead of jumping.
"""),
code(r"""
torch.manual_seed(3)
z_a, z_b = torch.randn(ZM), torch.randn(ZM)
ts = torch.linspace(0, 1, 10)
zs = []
for t in ts:
    #>> TODO 3: the noise vector a fraction t of the way from z_a to z_b
    z = (1 - t) * z_a + t * z_b
    #<<
    zs.append(z)
assert torch.allclose(zs[0], z_a) and torch.allclose(zs[-1], z_b), "the walk must start at z_a and end at z_b"
Gm.eval()
with torch.no_grad():
    walk = Gm(torch.stack(zs).to(device)).cpu()
show_digits(walk, "From noise A to noise B", n_row=1)
print("TODO 3 works.")
"""),
md(r"""
### Try it (Part 2)

1. **Sharp but strange.** If a classmate did the autoencoder track, compare these samples to their VAE samples. Which are sharper? Which look more like real digits? Why might a GAN be sharper than a VAE?
2. **Which digits?** Count the digit classes in the last grid. Are all ten there? Is this the same failure as mode collapse in Part 1?
3. **Is the discriminator fooled?** Run `Gm.eval(); torch.sigmoid(Dm(Gm(fixed_zm.to(device)))).mean()`. What does the discriminator think of the fakes? Do you agree with it?
4. **Perception link.** A GAN is trained only to fool another network. What would it take for its digits to fool a *person*? How would you test that in an experiment?
5. **If you have time:** set `EPOCHS = 6` and re-run from the cell that builds `Gm` and `Dm`. Does it keep improving?
"""),
md(r"""
---
**Reference.** Goodfellow, Pouget-Abadie, Mirza, Xu, Warde-Farley, Ozair, Courville and Bengio. *Generative Adversarial Nets.* NeurIPS (2014).
"""),
    ]
    write("gans-from-2d-to-digits", cells, "")


# ---------------------------------------------------------------------------------------------
# Track C: diffusion on a 2D spiral, from scratch in plain PyTorch. Our own code; the setup
# (spiral data, log-linear noise levels, sigma embedding, deterministic sampler) follows the
# design of Chenyang Yuan's smalldiffusion library.
# ---------------------------------------------------------------------------------------------
def track_c():
    cells = [
md(r"""
# From Noise to a Spiral: Diffusion from Scratch

**Day 9 · Human and Machine Perception**

A diffusion model learns to undo noise. Training: take real data, add noise, and teach a network to predict the noise you added. Generation: start from pure noise and remove the predicted noise a little at a time, until data appears.

We do it on 2D points shaped like a spiral, so every step is something you can plot.

**How to use it:** run the cells top to bottom. When a cell stops with `NotImplementedError`, that is a **TODO** for you. Write the missing lines where the `# TODO` comment is, delete the `raise` line, and run the cell again.

| TODO | Where | What you write |
|---|---|---|
| 1 | 2 | Add noise to the data |
| 2 | 4 | The training loss |
| 3 | 5 | One step of the sampler |
| 4 | 7, if you have time | A faster sampler |

Training runs on a CPU in about a minute.

*The setup follows the design of Chenyang Yuan's [smalldiffusion](https://github.com/yuanchenyang/smalldiffusion) library. The code here is written from scratch in plain PyTorch.*
"""),
md("## Setup"),
code(r"""
import math, time
import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F
import matplotlib.pyplot as plt

torch.manual_seed(0)
np.random.seed(0)
print("Running on CPU")
"""),
md(r"""
---
## 1. The data: 200 points on a spiral

Each data point is just two numbers, $x_0 \in \mathbb{R}^2$. The model never sees the formula for the spiral, only these points.
"""),
code(r"""
def spiral(n=200, start=np.pi / 2, end=5 * np.pi):
    t = np.linspace(start, end, n)
    pts = np.stack([t * np.cos(t), t * np.sin(t)], axis=1) / end   # scale to about [-1, 1]
    return torch.tensor(pts, dtype=torch.float32)

data = spiral()
def plot_points(pts, ax=None, **kw):
    ax = ax or plt.gca()
    pts = pts.detach().cpu().numpy()
    ax.scatter(pts[:, 0], pts[:, 1], s=kw.pop("s", 6), **kw)
    ax.set_aspect("equal"); ax.set_xlim(-1.3, 1.3); ax.set_ylim(-1.3, 1.3)

plt.figure(figsize=(4, 4)); plot_points(data); plt.title("200 real points"); plt.show()
"""),
md(r"""
---
## 2. Adding noise

The noise level is a number $\sigma$. A noisy version of a point is

$$x_\sigma = x_0 + \sigma\,\varepsilon, \qquad \varepsilon \sim \mathcal{N}(0, I)$$

Small $\sigma$ barely moves the point. Large $\sigma$ buries it: at $\sigma = 10$ the spiral is gone. We use 200 noise levels, spaced evenly on a log scale from $\sigma_\text{max} = 10$ down to $\sigma_\text{min} = 0.005$.
"""),
code(r"""
SIGMA_MAX, SIGMA_MIN, N_LEVELS = 10.0, 0.005, 200
sigmas = torch.exp(torch.linspace(math.log(SIGMA_MAX), math.log(SIGMA_MIN), N_LEVELS))

def add_noise(x0, sigma):
    # x0: points, shape (n, 2). sigma: a number, or a tensor of shape (n, 1).
    # Returns the noisy points and the noise eps that was added.
    eps = torch.randn_like(x0)
    #>> TODO 1: the noisy points x0 + sigma * eps
    x_noisy = x0 + sigma * eps
    #<<
    return x_noisy, eps

plt.figure(figsize=(4, 2.5)); plt.plot(sigmas); plt.yscale("log"); plt.xlabel("level"); plt.ylabel("sigma"); plt.title("Noise levels"); plt.show()
"""),
md("**Check TODO 1.** With $\\sigma = 0$ nothing should change. The plots show the spiral fading as $\\sigma$ grows."),
code(r"""
x_same, _ = add_noise(data, 0.0)
assert torch.allclose(x_same, data), "with sigma = 0, add_noise must return the points unchanged"
x_n, e_n = add_noise(data, 0.5)
assert torch.allclose(x_n, data + 0.5 * e_n), "the noisy points must be x0 + sigma * eps, with the same eps you return"
print("TODO 1 works.")

fig, axes = plt.subplots(1, 4, figsize=(12, 3))
for ax, s in zip(axes, [0.0, 0.05, 0.2, 1.0]):
    plot_points(add_noise(data, s)[0], ax=ax); ax.set_title(f"sigma = {s}")
plt.tight_layout(); plt.show()
"""),
md(r"""
---
## 3. The model: predict the noise

The network sees a noisy point and its noise level, and predicts the noise $\varepsilon$ that was added: $\varepsilon_\theta(x_\sigma, \sigma)$.

The noise level spans 10 to 0.005, which is a bad range for a network input. So we encode it as two bounded numbers, $[\sin(\tfrac{1}{2}\log\sigma),\ \cos(\tfrac{1}{2}\log\sigma)]$, and feed those next to the point. The network is a small MLP.
"""),
code(r"""
def embed_sigma(sigma):
    s = torch.as_tensor(sigma, dtype=torch.float32).reshape(-1, 1)
    return torch.cat([torch.sin(torch.log(s) / 2), torch.cos(torch.log(s) / 2)], dim=1)

class NoisePredictor(nn.Module):
    def __init__(self, hidden=(16, 128, 128, 128, 128, 16)):
        super().__init__()
        dims, layers = (4,) + hidden, []
        for a, b in zip(dims[:-1], dims[1:]):
            layers += [nn.Linear(a, b), nn.GELU()]
        self.net = nn.Sequential(*layers, nn.Linear(dims[-1], 2))

    def forward(self, x, sigma):
        e = embed_sigma(sigma)
        if e.shape[0] == 1:
            e = e.expand(x.shape[0], 2)
        return self.net(torch.cat([x, e], dim=1))

model = NoisePredictor()
print(model)
"""),
md(r"""
---
## 4. Training

For each training step: pick a random noise level for every point, add that much noise, and ask the model for the noise. The loss is the squared error between the predicted noise and the true noise:

$$\mathcal{L}(\theta) = \mathbb{E}_{x_0,\ \sigma,\ \varepsilon}\Big[\big\lVert \varepsilon_\theta(x_0 + \sigma\varepsilon,\ \sigma) - \varepsilon \big\rVert^2\Big]$$
"""),
code(r"""
def diffusion_loss(model, x0):
    # one random noise level per point, picked from the 200 levels
    sigma = sigmas[torch.randint(0, N_LEVELS, (x0.shape[0],))].unsqueeze(1)   # shape (n, 1)
    #>> TODO 2: add noise to x0 at these levels (use add_noise), predict the noise with model(x_noisy, sigma), and return the mean squared error against the true noise
    x_noisy, eps = add_noise(x0, sigma)
    eps_hat = model(x_noisy, sigma)
    return F.mse_loss(eps_hat, eps)
    #<<

def train(model, steps=15000, lr=1e-3):
    opt = torch.optim.AdamW(model.parameters(), lr=lr)
    losses = []
    for _ in range(steps):
        loss = diffusion_loss(model, data)
        opt.zero_grad(); loss.backward(); opt.step()
        losses.append(loss.item())
    return losses

torch.manual_seed(0)
model = NoisePredictor()
t0 = time.time()
losses = train(model)
print(f"trained in {time.time() - t0:.0f} s")

plt.figure(figsize=(6, 3))
plt.plot(np.convolve(losses, np.ones(200) / 200, mode="valid"))
plt.yscale("log"); plt.xlabel("step"); plt.ylabel("loss (moving average)"); plt.show()
print("TODO 2 looks right." if np.mean(losses[-500:]) < 0.75 * np.mean(losses[:500]) else "The loss did not go down: check TODO 2.")
"""),
md(r"""
---
## 5. Sampling: from noise to the spiral

Start with pure noise at the top level, $x = \sigma_\text{max}\,\varepsilon$. Then walk down a list of decreasing noise levels $\sigma_{t} > \sigma_{t-1} > \dots > 0$. At each step, remove the noise the model predicts, scaled by how much the level drops:

$$x_{t-1} = x_t - (\sigma_t - \sigma_{t-1})\ \varepsilon_\theta(x_t, \sigma_t)$$

This is a deterministic sampler (DDIM). Once the starting noise is chosen, there is no more randomness.
"""),
code(r"""
def sample_levels(steps):
    # `steps` levels from sigma_max down to sigma_min, spaced on a log scale, then a final 0
    lv = torch.exp(torch.linspace(math.log(SIGMA_MAX), math.log(SIGMA_MIN), steps))
    return torch.cat([lv, torch.zeros(1)])

@torch.no_grad()
def sample(model, steps=20, n=2000, x=None):
    levels = sample_levels(steps)
    x = levels[0] * torch.randn(n, 2) if x is None else x
    path = [x]
    for sig, sig_prev in zip(levels[:-1], levels[1:]):
        #>> TODO 3: one sampler step: x minus (sig - sig_prev) times the model's predicted noise at level sig
        x = x - (sig - sig_prev) * model(x, sig)
        #<<
        path.append(x)
    return x, path

torch.manual_seed(1)
x_gen, path = sample(model, steps=20)
fig, axes = plt.subplots(1, 2, figsize=(9, 4.5))
plot_points(data, ax=axes[0], c="lightgray", s=10); plot_points(x_gen, ax=axes[0], s=2, c="crimson")
axes[0].set_title("Gray: training points. Red: 2000 new samples")
# the paths of 30 samples, from noise to the spiral
P = torch.stack(path)[:, :30].numpy()
plot_points(data, ax=axes[1], c="lightgray", s=10)
for i in range(P.shape[1]):
    axes[1].plot(P[:, i, 0], P[:, i, 1], lw=0.8)
axes[1].set_title("Paths of 30 samples (they start far outside)")
plt.tight_layout(); plt.show()
near = torch.cdist(x_gen, data).min(dim=1).values
print(f"{(near < 0.1).float().mean():.0%} of samples land within 0.1 of a training point.",
      "TODO 3 looks right." if (near < 0.1).float().mean() > 0.6 else "Few samples near the spiral: check TODO 3.")
"""),
md(r"""
---
## 6. What did the model learn?

For a fixed noise level, draw the predicted denoising direction, $-\varepsilon_\theta(x, \sigma)$, at every point of a grid. At a large $\sigma$ the arrows point roughly toward the middle of the data. At a small $\sigma$ they point to the nearest part of the spiral.
"""),
code(r"""
@torch.no_grad()
def plot_field(model, sigma, ax):
    g = np.linspace(-1.3, 1.3, 21)
    X = torch.tensor(np.array(np.meshgrid(g, g)).reshape(2, -1).T, dtype=torch.float32)
    d = -model(X, sigma)
    d = d / d.norm(dim=1, keepdim=True)
    plot_points(data, ax=ax, c="lightgray", s=8)
    ax.quiver(X[:, 0], X[:, 1], d[:, 0], d[:, 1], scale=30, width=0.004)
    ax.set_title(f"sigma = {sigma}")

fig, axes = plt.subplots(1, 3, figsize=(13, 4.5))
for ax, s in zip(axes, [2.0, 0.3, 0.02]):
    plot_field(model, s, ax)
plt.tight_layout(); plt.show()
"""),
md(r"""
### Try it

1. **Steps.** Sample with `steps=5`, `20` and `100`. How do the samples change? What does fewer steps cost you, and what does it save?
2. **The arrows.** In Section 6, try other values of $\sigma$. Describe how the direction of the arrows changes as $\sigma$ goes from large to small.
3. **Memorize or generalize?** Train on far fewer points: `data = spiral(n=10)`, then re-run from Section 4. Do the new samples fill the spiral, or pile up on the 10 training points?
4. **Perception link.** Your visual system also starts from a noisy signal and settles on an interpretation. Where is that like this sampler, and where is it not?
"""),
md(r"""
---
## 7. If you have time: a faster sampler

The sampler above uses only the current prediction. A faster one mixes in the previous prediction, with a weight $\gamma \ge 1$:

$$\bar\varepsilon_t = \gamma\,\varepsilon_\theta(x_t, \sigma_t) + (1 - \gamma)\,\varepsilon_\theta(x_{t+1}, \sigma_{t+1}), \qquad x_{t-1} = x_t - (\sigma_t - \sigma_{t-1})\,\bar\varepsilon_t$$

On the first step there is no previous prediction, so use the current one. With $\gamma = 1$ this is the sampler from Section 5. Try $\gamma = 2$ with only 10 steps.
"""),
code(r"""
@torch.no_grad()
def sample_fast(model, steps=10, n=2000, gamma=2.0):
    levels = sample_levels(steps)
    x = levels[0] * torch.randn(n, 2)
    eps_prev = None
    for sig, sig_prev in zip(levels[:-1], levels[1:]):
        eps = model(x, sig)
        #>> TODO 4: eps_bar = gamma * eps + (1 - gamma) * eps_prev, or just eps on the first step; then the update for x; then remember eps as eps_prev
        eps_bar = eps if eps_prev is None else gamma * eps + (1 - gamma) * eps_prev
        x = x - (sig - sig_prev) * eps_bar
        eps_prev = eps
        #<<
    return x

torch.manual_seed(1)
fig, axes = plt.subplots(1, 3, figsize=(13, 4.5))
for ax, g in zip(axes, [1.0, 2.0, 3.0]):
    plot_points(data, ax=ax, c="lightgray", s=10); plot_points(sample_fast(model, steps=10, gamma=g), ax=ax, s=2, c="crimson")
    ax.set_title(f"10 steps, gamma = {g}")
plt.tight_layout(); plt.show()
"""),
    ]
    write("diffusion-on-a-spiral", cells, "")


if __name__ == "__main__":
    track_a(); track_b(); track_c()

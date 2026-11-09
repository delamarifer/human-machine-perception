"""
Continual learning demo for a CV lecture: catastrophic forgetting and four fixes.

Runs on a laptop CPU in about a minute. Uses sklearn's 8x8 digits (1,797 images),
so there is nothing to download.

Two scenarios (van de Ven & Tolias taxonomy):
  - class-incremental: Split-Digits, 5 tasks of 2 classes each, ONE shared 10-way head,
    no task id at test time.
  - domain-incremental: Rotated-Digits, same 10 classes, each task rotates every image
    by a different angle (0, 30, 60, 90, 120 degrees) - a pure input-distribution shift.

Methods:
  finetune  plain SGD on each task in turn (the forgetting baseline)
  ewc       Elastic Weight Consolidation (Kirkpatrick et al. 2017), one penalty per past task,
            empirical diagonal Fisher (true labels, not sampled ones)
  lwf       Learning without Forgetting (Li & Hoiem 2016), distillation on old outputs
  replay    experience replay from a small class-balanced memory buffer
  joint     train on all tasks at once (upper bound; not continual)

Metrics, with R[i, j] = accuracy on task j after training on task i:
  average accuracy  A_T = (1/T) sum_j R[T-1, j]
  forgetting        F_j = max_{i<T-1} R[i, j] - R[T-1, j], averaged over j < T-1
  backward transfer BWT = (1/(T-1)) sum_{j<T-1} (R[T-1, j] - R[j, j])
"""

import argparse
import copy
import json
import warnings

warnings.filterwarnings("ignore", category=RuntimeWarning)  # nanstd on the joint baseline

import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F
from scipy.ndimage import rotate
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split

torch.set_num_threads(2)


# ----------------------------------------------------------------------------- data
def load_base(seed):
    d = load_digits()
    X = (d.images / 16.0).astype(np.float32)          # (N, 8, 8) in [0, 1]
    y = d.target.astype(np.int64)
    return train_test_split(X, y, test_size=0.3, random_state=seed, stratify=y)


def split_tasks(X, y, classes_per_task=2):
    """Class-incremental: task t holds classes {2t, 2t+1}."""
    tasks = []
    for t in range(10 // classes_per_task):
        cls = list(range(t * classes_per_task, (t + 1) * classes_per_task))
        m = np.isin(y, cls)
        tasks.append((X[m], y[m]))
    return tasks


def rotated_tasks(X, y, angles=(0, 30, 60, 90, 120)):
    """Domain-incremental: same labels, every image rotated by the task's angle."""
    tasks = []
    for a in angles:
        Xr = np.stack([rotate(img, a, reshape=False, order=1, mode="constant") for img in X])
        tasks.append((Xr.astype(np.float32), y))
    return tasks


def to_t(X, y):
    return torch.from_numpy(X).reshape(len(X), -1), torch.from_numpy(y)


# ---------------------------------------------------------------------------- model
class MLP(nn.Module):
    def __init__(self, d_in=64, h=128, n_out=10):
        super().__init__()
        self.net = nn.Sequential(nn.Linear(d_in, h), nn.ReLU(),
                                 nn.Linear(h, h), nn.ReLU(),
                                 nn.Linear(h, n_out))

    def forward(self, x):
        return self.net(x)


@torch.no_grad()
def accuracy(model, X, y):
    return (model(X).argmax(1) == y).float().mean().item()


def batches(X, y, bs, gen):
    idx = torch.randperm(len(X), generator=gen)
    for i in range(0, len(X), bs):
        j = idx[i:i + bs]
        yield X[j], y[j]


# ------------------------------------------------------------------------ EWC parts
def fisher_diag(model, X, y, n_samples=200):
    """Diagonal empirical Fisher: F_k = E[(d log p(y|x) / d theta_k)^2], per-example grads."""
    fisher = {n: torch.zeros_like(p) for n, p in model.named_parameters()}
    model.eval()
    idx = torch.randperm(len(X))[:n_samples]
    for i in idx:
        model.zero_grad()
        logp = F.log_softmax(model(X[i:i + 1]), dim=1)
        logp[0, y[i]].backward()
        for n, p in model.named_parameters():
            fisher[n] += p.grad.detach() ** 2
    model.train()
    return {n: f / len(idx) for n, f in fisher.items()}


def ewc_penalty(model, anchors):
    """sum over past consolidations of sum_k F_k (theta_k - theta*_k)^2."""
    loss = 0.0
    for fisher, star in anchors:
        for n, p in model.named_parameters():
            loss = loss + (fisher[n] * (p - star[n]) ** 2).sum()
    return loss


# ---------------------------------------------------------------------- training loop
def run(method, tasks_train, tasks_test, seed, epochs=30, lr=0.05, bs=32,
        ewc_lambda=100.0, lwf_alpha=1.0, lwf_T=2.0, mem_per_class=10, class_il=True):
    torch.manual_seed(seed)
    gen = torch.Generator().manual_seed(seed)
    model = MLP()
    T = len(tasks_train)
    R = np.zeros((T, T))

    if method == "joint":
        X = torch.cat([to_t(*t)[0] for t in tasks_train])
        y = torch.cat([to_t(*t)[1] for t in tasks_train])
        opt = torch.optim.SGD(model.parameters(), lr=lr, momentum=0.9)
        for _ in range(epochs):
            for xb, yb in batches(X, y, bs, gen):
                opt.zero_grad()
                F.cross_entropy(model(xb), yb).backward()
                opt.step()
        for j in range(T):
            R[T - 1, j] = accuracy(model, *to_t(*tasks_test[j]))
        R[:T - 1] = np.nan
        return R

    anchors = []                 # EWC: list of (fisher, theta*)
    old_model = None             # LwF: frozen copy from end of previous task
    seen = []                    # classes seen so far (for LwF's old-output slice)
    memX, memy = [], []          # replay buffer

    for t, (Xtr, ytr) in enumerate(tasks_train):
        X, y = to_t(Xtr, ytr)
        opt = torch.optim.SGD(model.parameters(), lr=lr, momentum=0.9)
        for _ in range(epochs):
            for xb, yb in batches(X, y, bs, gen):
                if method == "replay" and memX:
                    mX, my = torch.cat(memX), torch.cat(memy)
                    k = torch.randint(len(mX), (len(xb),), generator=gen)
                    xb, yb = torch.cat([xb, mX[k]]), torch.cat([yb, my[k]])
                opt.zero_grad()
                out = model(xb)
                loss = F.cross_entropy(out, yb)
                if method == "ewc" and anchors:
                    loss = loss + (ewc_lambda / 2) * ewc_penalty(model, anchors)
                if method == "lwf" and old_model is not None:
                    with torch.no_grad():
                        old_out = old_model(xb)
                    cols = seen if class_il else list(range(10))
                    p_old = F.softmax(old_out[:, cols] / lwf_T, dim=1)
                    logp_new = F.log_softmax(out[:, cols] / lwf_T, dim=1)
                    loss = loss + lwf_alpha * lwf_T ** 2 * F.kl_div(
                        logp_new, p_old, reduction="batchmean")
                loss.backward()
                opt.step()

        # end-of-task bookkeeping
        if method == "ewc":
            star = {n: p.detach().clone() for n, p in model.named_parameters()}
            anchors.append((fisher_diag(model, X, y), star))
        if method == "lwf":
            old_model = copy.deepcopy(model).eval()
            seen = sorted(set(seen) | set(ytr.tolist()))
        if method == "replay":
            for c in np.unique(ytr):
                m = (y == int(c)).nonzero().flatten()
                pick = m[torch.randperm(len(m), generator=gen)[:mem_per_class]]
                memX.append(X[pick]); memy.append(y[pick])

        for j in range(T):
            R[t, j] = accuracy(model, *to_t(*tasks_test[j]))
    return R


def metrics(R):
    T = R.shape[0]
    A = R[-1].mean()
    if np.isnan(R[0, 0]):
        return dict(avg_acc=A, forgetting=np.nan, bwt=np.nan)
    forget = np.mean([R[:-1, j].max() - R[-1, j] for j in range(T - 1)])
    bwt = np.mean([R[-1, j] - R[j, j] for j in range(T - 1)])
    return dict(avg_acc=A, forgetting=forget, bwt=bwt)


# ----------------------------------------------------------------------------- main
if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--seeds", type=int, default=3)
    ap.add_argument("--out", default="cl_results.json")
    args = ap.parse_args()

    methods = ["finetune", "ewc", "lwf", "replay", "joint"]
    results = {}
    for scenario in ["class_incremental", "domain_incremental"]:
        results[scenario] = {}
        for m in methods:
            Rs, ms = [], []
            for s in range(args.seeds):
                Xtr, Xte, ytr, yte = load_base(s)
                if scenario == "class_incremental":
                    tr, te = split_tasks(Xtr, ytr), split_tasks(Xte, yte)
                    kw = dict(class_il=True, ewc_lambda=100.0)
                else:
                    tr, te = rotated_tasks(Xtr, ytr), rotated_tasks(Xte, yte)
                    kw = dict(class_il=False, ewc_lambda=100.0, mem_per_class=5)
                R = run(m, tr, te, seed=s, **kw)
                Rs.append(R); ms.append(metrics(R))
            agg = {k: (float(np.nanmean([x[k] for x in ms])), float(np.nanstd([x[k] for x in ms])))
                   for k in ms[0]}
            results[scenario][m] = dict(metrics=agg, R_seed0=np.round(Rs[0], 3).tolist())
            a, f = agg["avg_acc"], agg["forgetting"]
            print(f"{scenario:19s} {m:9s} avg_acc={a[0]:.3f}±{a[1]:.3f}  "
                  f"forgetting={f[0]:.3f}±{f[1]:.3f}  bwt={agg['bwt'][0]:+.3f}")
    with open(args.out, "w") as fh:
        json.dump(results, fh, indent=1)

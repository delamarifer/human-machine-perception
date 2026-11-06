#!/usr/bin/env python3
"""Stability check on the digit network (train_overfit.py's data, network and rule): train on all 1,300
training digits, then again with one training digit left out, same starting weights, and count how many of
the 497 test digits get a different answer. Repeated for K left-out digits. Prints the numbers used on the
'How do they even learn?' slide (nn-scenes.js)."""
import sys, numpy as np
sys.argv = sys.argv[:1]
import train_overfit as T

def fit(Xtr, ytr, steps=1500, lr=0.5):
    r = np.random.default_rng(0); r.permutation(len(T.X)); P = T.init(r)
    for _ in range(steps):
        G = T.grads(P, Xtr, ytr); P = [(W - lr * gW, b - lr * gb) for (W, b), (gW, gb) in zip(P, G)]
    return T.forward(P, T.Xte)[1].argmax(1)

full = fit(T.Xall, T.yall)
K = 10; out = np.random.default_rng(1).choice(len(T.yall), K, replace=False)
changed = [int((fit(np.delete(T.Xall, i, 0), np.delete(T.yall, i)) != full).sum()) for i in out]
print('test digits whose answer changes, per left-out training digit:', changed, 'of', len(T.yte))
print('mean %.1f (%.1f%%)' % (np.mean(changed), 100 * np.mean(changed) / len(T.yte)))

import sys, os, nbformat, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
nb = nbformat.read(sys.argv[1], as_version=4); out = sys.argv[2]
n = [0]
def show(*a, **k):
    fig = plt.gcf(); n[0] += 1
    t = fig.axes[0].get_title() if fig.axes else ""
    fig.savefig(f"{out}/{n[0]:02d}.png", dpi=150); print("FIG", n[0], repr(t)); plt.close(fig)
plt.show = show
g = {"__name__": "__main__"}
import builtins
for c in nb.cells:
    if c.cell_type != "code": continue
    src = "\n".join(l for l in c.source.splitlines() if not l.lstrip().startswith(("%", "!")))
    exec(compile(src, "cell", "exec"), g)

# Helper code for the Day 1 lab. Students run this cell; they don't need to read it.
import numpy as np
import matplotlib.pyplot as plt
from scipy import sparse
from scipy.sparse.linalg import lsqr

THETA = np.deg2rad(35)            # camera tilt (angle between the line of sight and the Z axis)
H, W = 150, 220                   # image size in pixels
LIGHT = np.array([-0.39, 0.87, 0.29]); LIGHT = LIGHT / np.linalg.norm(LIGHT)

def make_box(x, z, width, height, depth, angle, color, base=0):
    """A box standing on the ground (or floating `base` units above it), turned by `angle` degrees."""
    return dict(center=(x, z), size=(width, height, depth), angle=angle, color=color, base=base)

def render(boxes, theta=THETA):
    """Draw a world of boxes on a white floor with parallel projection.
    Returns the image (H x W x 3, values 0-1) and the true world coordinates Y, Z of every pixel."""
    rows, cols = np.mgrid[0:H, 0:W]
    x = cols - W / 2
    y = H * 0.62 - rows                       # y grows upward
    s, c = np.sin(theta), np.cos(theta)
    # The ray through pixel (x, y) is (X, Y, Z) = (x, y*c + t*s, -y*s + t*c); the camera is at t = +infinity.
    t_best = -y * c / s                       # where the ray meets the floor (Y = 0)
    normal = np.zeros((H, W, 3)); normal[..., 1] = 1
    color = np.ones((H, W, 3))
    for b in boxes:
        cx, cz = b['center']; sx, sy, sz = b['size']; phi = np.deg2rad(b['angle'])
        cp, sp = np.cos(phi), np.sin(phi)
        X0, Y0, Z0 = x - cx, y * c - b['base'] - sy / 2, -y * s - cz
        o = [cp * X0 + sp * Z0, Y0, -sp * X0 + cp * Z0]      # ray start in the box's own frame
        d = [sp * c, s, cp * c]                               # ray direction in the box's own frame
        half = [sx / 2, sy / 2, sz / 2]
        t_near = np.full((H, W), -np.inf); t_far = np.full((H, W), np.inf)
        axis = np.zeros((H, W), int); sign = np.zeros((H, W))
        for a in range(3):
            if abs(d[a]) < 1e-12:
                t_near = np.where(np.abs(o[a]) <= half[a], t_near, np.inf)
                continue
            t1 = (-half[a] - o[a]) / d[a]; t2 = (half[a] - o[a]) / d[a]
            closer = np.maximum(t1, t2) < t_far
            sign = np.where(closer, np.where(t1 > t2, -1.0, 1.0), sign)
            axis = np.where(closer, a, axis)
            t_near = np.maximum(t_near, np.minimum(t1, t2)); t_far = np.minimum(t_far, np.maximum(t1, t2))
        hit = (t_near <= t_far) & (t_far > t_best)
        n_local = np.stack([np.where(axis == a, sign, 0.0) for a in range(3)], -1)
        n = np.stack([cp * n_local[..., 0] - sp * n_local[..., 2], n_local[..., 1],
                      sp * n_local[..., 0] + cp * n_local[..., 2]], -1)
        t_best = np.where(hit, t_far, t_best)
        normal[hit] = n[hit]; color[hit] = b['color']
    shade = 0.3 + 0.7 * np.clip(normal @ LIGHT, 0, 1)
    image = np.clip(color * shade[..., None], 0, 1)
    Y = y * c + t_best * s
    Z = -y * s + t_best * c
    return image, Y, Z

def sobel(gray):
    """Smoothed image derivatives: d/dx (left to right) and d/dy (bottom to top)."""
    p = np.pad(gray, 1, mode='edge')
    dx = (p[:-2, 2:] + 2 * p[1:-1, 2:] + p[2:, 2:] - p[:-2, :-2] - 2 * p[1:-1, :-2] - p[2:, :-2]) / 4
    dy = (p[:-2, :-2] + 2 * p[:-2, 1:-1] + p[:-2, 2:] - p[2:, :-2] - 2 * p[2:, 1:-1] - p[2:, 2:]) / 4
    return dx, dy

def reconstruct(figure, edges, vertical, contact, dx, dy, theta=THETA):
    """Recover the height Y of every pixel by least squares from the constraints of the simple world.
    Returns Y and Z as images."""
    c = np.cos(theta)
    strength = np.hypot(dx, dy) + 1e-9
    nx, ny = dx / strength, dy / strength
    idx = np.arange(H * W).reshape(H, W)
    rows, cols, vals, rhs = [], [], [], []
    def constraint(pixels, coefs, value, weight=1.0):
        for p, cf in zip(pixels, coefs):
            rows.append(len(rhs)); cols.append(p); vals.append(cf * weight)
        rhs.append(value * weight)
    for r in range(H):
        for q in range(W):
            i = idx[r, q]
            if not figure[r, q] or r in (0, H - 1) or q in (0, W - 1):
                constraint([i], [1], 0)                       # the floor: Y = 0
                continue
            if contact[r, q]:
                constraint([i], [1], 0)                       # objects rest on the floor
            if vertical[r, q] and vertical[r - 1, q]:
                constraint([idx[r - 1, q], i], [1, -1], 1 / c)   # 3D vertical edge: Y grows 1/cos(theta) per row
            elif edges[r, q] and not vertical[r, q]:
                qq = q + 1 if figure[r, q + 1] else q - 1        # 3D horizontal edge: Y doesn't change along it
                rr = r - 1 if figure[r - 1, q] else r + 1
                if figure[r, qq] and figure[rr, q]:
                    sx, sy = qq - q, r - rr
                    constraint([idx[r, qq], i, idx[rr, q], i],
                               [-ny[r, q] * sx, ny[r, q] * sx, nx[r, q] * sy, -nx[r, q] * sy], 0)
            if not edges[r, q]:                                   # flat faces: second derivatives are 0
                w = 0.1
                if figure[r, q - 1] and figure[r, q + 1]:
                    constraint([idx[r, q - 1], i, idx[r, q + 1]], [-1, 2, -1], 0, w)
                if figure[r - 1, q] and figure[r + 1, q]:
                    constraint([idx[r - 1, q], i, idx[r + 1, q]], [-1, 2, -1], 0, w)
                if figure[r - 1:r + 2, q - 1:q + 2].all():
                    constraint([idx[r - 1, q - 1], idx[r - 1, q + 1], idx[r + 1, q - 1], idx[r + 1, q + 1]],
                               [1, -1, -1, 1], 0, w)
    A = sparse.csr_matrix((vals, (rows, cols)), shape=(len(rhs), H * W))
    Y = lsqr(A, np.array(rhs), atol=1e-10, btol=1e-10, iter_lim=20000)[0].reshape(H, W)
    y = H * 0.62 - np.mgrid[0:H, 0:W][0]
    Z = (np.cos(theta) * Y - y) / np.sin(theta)
    print(f"solved {len(rhs)} equations for {H * W} unknowns")
    return Y, Z

def show_3d(Y, Z, image, figure, title="", elev=20, azim=-75):
    """Draw every pixel as a dot at its 3D position (X, Z, Y), in its own color, from a new viewpoint."""
    X = np.mgrid[0:H, 0:W][1] - W / 2
    keep = figure.copy(); keep[::4, ::4] = True        # all object pixels, a sparse grid of the floor
    fig = plt.figure(figsize=(8, 6))
    ax = fig.add_subplot(projection='3d')
    ax.scatter(X[keep], Z[keep], Y[keep], c=image[keep], s=2, depthshade=False)
    ax.set_xlabel('X'); ax.set_ylabel('Z'); ax.set_zlabel('Y (height)')
    ax.set_box_aspect((np.ptp(X[keep]), np.ptp(Z[keep]), max(np.ptp(Y[keep]), 1)))
    ax.view_init(elev=elev, azim=azim); ax.set_title(title)
    plt.show()

RED, GREEN, BLUE = (0.85, 0.2, 0.2), (0.2, 0.65, 0.3), (0.2, 0.35, 0.85)
WORLD = [make_box(-55, 25, 40, 45, 40, 30, RED),
         make_box(25, 0, 30, 70, 30, -25, GREEN),
         make_box(70, 55, 45, 18, 30, 40, BLUE)]

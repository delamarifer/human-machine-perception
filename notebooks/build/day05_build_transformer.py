"""Builds notebooks/day05-lab-build-a-transformer.ipynb.

Six-step lab: image to tokens, attention by hand, an attention module, self-attention, an encoder
block, and a full Vision Transformer. Students build the modules and check shapes; nothing is trained.

Solutions and answers sit in collapsed dropdowns in the notebook (Shreya's decision), so they are public.
Blank exercise cells raise an error until they are filled in.
"""
from textwrap import dedent

from nbtools import md, code, hidden, turn, answer, badge, main

SOL = {1: '# Your turn 1. Predict the sequence for a patch size of 32.\n# 224 / 32 = 7 patches per side, so 7 x 7 = 49 tokens\nn_tokens = (224 // 32) ** 2\n# each patch holds 32 x 32 pixels with 3 colors\npatch_length = 32 * 32 * 3\nprint("tokens:", n_tokens, " numbers per patch:", patch_length)', 2: 'def attention_by_hand(Q, K, V):\n    # compare: every query against every key\n    scores = Q @ K.transpose(-1, -2)\n    # scale: divide by the square root of the key size\n    scaled = scores / K.shape[-1] ** 0.5\n    # softmax along each row: weights that sum to 1\n    weights = torch.softmax(scaled, dim=-1)\n    # mix: each output row is a weighted sum of the values\n    output = weights @ V\n    return output, weights\n\n\nT = tokens.detach()   # the sequence we use from here on\nW_q, W_k, W_v = (nn.Linear(D, D, bias=False) for _ in range(3))\nQ, K, V = W_q(T), W_k(T), W_v(T)\noutput, weights = attention_by_hand(Q, K, V)\nprint("weights", tuple(weights.shape), " row 0 sums to", round(weights[0, 0].sum().item(), 4))\nprint("output ", tuple(output.shape))\n# PyTorch\'s own function does the same computation, so this should be close to 0\nprint("largest difference from PyTorch:", (output - F.scaled_dot_product_attention(Q, K, V)).abs().max().item())', 3: '# Your turn 3. Count the learnable numbers.\n# parameters() lists the weights the module registered: three 64 x 64 matrices\nn_params = sum(p.numel() for p in attention.parameters())\nprint("learnable numbers:", n_params)', 4: '# Your turn 4. Self-attention: the same tokens on both sides.\n# the same sequence asks and answers, so every token reads every token\nself_out = attention(T, T)\nprint("self-attention output", tuple(self_out.shape))', 5: '# Your turn 5. Stack three encoder blocks.\n# the list makes three separate blocks, each with its own weights\nstack = nn.Sequential(*[EncoderBlock(D, 4, 4 * D) for _ in range(3)])\nprint("out", tuple(stack(T).shape))', 6: '# Your turn 6. Change one setting.\n# larger patches: fewer tokens, but each patch has more numbers to embed\nmy_model = VisionTransformer(patch=32)\nprint("tokens with [cls] ", tuple(my_model.position.shape))\nprint("logits out        ", tuple(my_model(x[None]).shape))\nprint("learnable numbers ", sum(p.numel() for p in my_model.parameters()))'}
ANS = {1: "**Answer.** 49 tokens of 3,072 numbers each. Larger patches mean fewer, longer tokens.\n\n**Common misunderstandings.** Students often answer 224 / 32 = 7, forgetting that the grid has two dimensions, or forget the three color channels. Position is not the patch's content: it is a learned code for each place, and at this point it is still at its random starting value.", 2: '**Answer.** The weights are 1 × 196 × 196, a batch of one, and each row sums to 1. The difference from PyTorch is rounding error, around 1e-7.\n\n**Common misunderstandings.** Softmax runs along each row (`dim=-1`), not down columns. Students often forget the scaling; the result still runs, so the PyTorch check is what catches it.', 3: '**Answer.** 3 × 64 × 64 = 12,288, with no biases.\n\n**Common misunderstandings.** The attention matrix is not a parameter: it is computed fresh for every input. That is the main point of the section. The count does not depend on the number of tokens.', 4: '**Answer.** `attention(T, T)`, shape (1, 196, 64). Nothing else in the module changes. All 196 output rows change when one token changes, because every token reads token 0.\n\n**Common misunderstandings.** Self-attention is not a different layer. Q, K and V are still three different projections, even though they come from one sequence.', 5: '**Answer.** `nn.Sequential(*[EncoderBlock(D, 4, 4 * D) for _ in range(3)])`. The shape stays (1, 196, 64).\n\n**Common misunderstandings.** `[block] * 3` would reuse one block, sharing its weights three times. The MLP works on each token separately: only attention mixes tokens.', 6: '**Answer.** With patch 32: 7 × 7 = 49 patches, so 50 tokens with the classification token. The embedding layer grows, because each patch is longer, and the position table shrinks. Depth adds learnable numbers in proportion to the number of blocks. Heads change neither the token count nor the learnable numbers: each head gets a smaller slice.\n\n**Common misunderstandings.** A patch size that does not divide 224, such as 30, does not crash: `unfold` silently drops the pixels at the edge, so check sizes yourself. The logits are meaningless here, because nothing is trained. The attention matrix is not a parameter, so adding tokens does not add attention weights. Only the position table depends on the token count.'}

FILE = "day05-lab-build-a-transformer.ipynb"
BADGE = badge(FILE)


def M(s):
    md(dedent(s).strip())


def C(s):
    code(dedent(s).strip())


def H(s):
    hidden(dedent(s).strip())


def T(n, blank):
    turn(dedent(blank).strip(), SOL.get(n, ""))


def A(n):
    answer(ANS.get(n, ""))


M(f"""
{BADGE}

# Day 5 · Lab: build a Transformer

**Transformers and Visual Representations** · Day 5 · Fernanda De La Torre & Shreya Pandit

You will build a Vision Transformer one piece at a time, and pass an image through it.

**By the end you will be able to:**
- turn an image into a sequence of tokens with positions;
- compute attention by hand, and explain each step;
- write attention as a PyTorch module, and say why;
- show that self-attention is attention with the same sequence on both sides;
- assemble an encoder block and a full Vision Transformer.

**How to use this notebook.** Run the cells in order. A "Your turn" cell raises an error until you fill it in, and the next cells need it, so finish each one before moving on. If you get stuck, open "Show a solution" under the cell. **Nothing here is trained.** The weights are random, so the cells show the steps and the shapes, not what a trained model has learned.
""")

M("""
## 0 · Setup

This cell is collapsed. Run it, and if it finishes, you are ready. A CPU runtime is enough.
""")

H("""
from io import BytesIO
from urllib.request import urlopen
import numpy as np
import torch, torch.nn as nn, torch.nn.functional as F
import matplotlib.pyplot as plt
from PIL import Image, ImageOps

torch.manual_seed(0)
print("torch", torch.__version__)

URL = "https://raw.githubusercontent.com/delamarifer/human-machine-perception/main/day04/assets/photos/goats.jpg"
img = ImageOps.fit(Image.open(BytesIO(urlopen(URL).read())).convert("RGB"), (224, 224))
plt.imshow(img); plt.axis("off")
plt.title("Photo: Elite Jac, CC BY-SA 4.0", fontsize=8); plt.show()
""")

M("""
## 1 · Image to tokens

A transformer works on a sequence, so we cut the image into patches, flatten each patch, project it to an embedding, and add its position.

$$T = X W + E_{pos}$$

$X$ holds one flattened patch per row, $W$ is the learned projection, $E_{pos}$ holds one position code per row, and $T$ is the token matrix.
""")

C("""
# 1. Load image: (H, W, RGB) -> (RGB, H, W)
x = torch.tensor(np.array(img)).float()
x = x.permute(2, 0, 1) / 255.0

# 2. Choose patch size and embedding dimension
P, D = 16, 64

# 3. Divide image into non-overlapping patches
grid = x.unfold(1, P, P).unfold(2, P, P)

# 4. Flatten each patch into a vector
# Each patch: 16 x 16 x 3 = 768 values
patches = grid.permute(1, 2, 0, 3, 4).reshape(-1, 3 * P * P)

# 5. Project each patch into a D-dimensional token
patch_embed = nn.Linear(3 * P * P, D)
tokens = patch_embed(patches)

# 6. Initialize learnable positional embeddings
num_patches = tokens.shape[0]
position = nn.Parameter(torch.empty(1, num_patches, D))
nn.init.trunc_normal_(position, std=0.02)

# 7. Add positional information to each token
tokens = tokens.unsqueeze(0) + position

print("image:   ", tuple(x.shape))
print("patches: ", tuple(patches.shape))
print("tokens:  ", tuple(tokens.shape))
""")

M("""
The first number in the token shape is the batch: one image.

### Try it yourself

Predict what a patch size of 32 would give: how many tokens, and how many numbers in each patch?
""")

T(1, """
# Your turn 1. Predict the sequence for a patch size of 32.
n_tokens = None      # TODO
patch_length = None  # TODO
if n_tokens is None or patch_length is None:
    raise NotImplementedError("Your turn 1: fill in n_tokens and patch_length.")
print("tokens:", n_tokens, " numbers per patch:", patch_length)
""")
A(1)

M("""
## 2 · Attention: the basic calculation

Each token asks a question (query), offers a match (key), and carries information (value). Attention has four steps: compare, scale, softmax, mix.

$$A = \\mathrm{softmax}\\left(\\frac{Q K^\\top}{\\sqrt{d_k}}\\right) \\qquad \\text{output} = A V$$

$A$ is the attention matrix: one row of weights per query. $d_k$ is the length of each key.
""")

T(2, """
def attention_by_hand(Q, K, V):
    # Your turn 2. Compare, scale, softmax, mix. Return the output and the weights.
    scores = None   # TODO: Q times K transposed (use K.transpose(-1, -2))
    scaled = None   # TODO: divide by the square root of the key dimension
    weights = None  # TODO: softmax, so that each row sums to 1
    output = None   # TODO: weights times V
    return output, weights


T = tokens.detach()   # the sequence we use from here on
W_q, W_k, W_v = (nn.Linear(D, D, bias=False) for _ in range(3))
Q, K, V = W_q(T), W_k(T), W_v(T)
output, weights = attention_by_hand(Q, K, V)
if output is None:
    raise NotImplementedError("Your turn 2: fill in the four lines.")
print("weights", tuple(weights.shape), " row 0 sums to", round(weights[0, 0].sum().item(), 4))
print("output ", tuple(output.shape))
print("largest difference from PyTorch:", (output - F.scaled_dot_product_attention(Q, K, V)).abs().max().item())
""")
A(2)

M("""
## 3 · An attention module, and why

The function above needed three weight matrices that we made by hand. A module keeps them together. That gives us three things:

- the weights are registered, so an optimizer can **train** them;
- we can **reuse** the same layer many times;
- it **composes**: larger models are built from modules.

This module takes two inputs: the tokens that ask, and the tokens that are read.

$$Q = T_{\\text{ask}}\\, W_q \\qquad K = T_{\\text{read}}\\, W_k \\qquad V = T_{\\text{read}}\\, W_v$$
""")

C("""
class Attention(nn.Module):

    def __init__(self, dim):
        super().__init__()
        # three learned projections: the weights a model trains
        self.query = nn.Linear(dim, dim, bias=False)
        self.key = nn.Linear(dim, dim, bias=False)
        self.value = nn.Linear(dim, dim, bias=False)

    def forward(self, queries_from, tokens):
        # queries come from one sequence; keys and values from the other
        q = self.query(queries_from)
        k, v = self.key(tokens), self.value(tokens)
        # Q Kᵀ divided by √d_k: how well each query matches each key
        scores = q @ k.transpose(-1, -2) / k.shape[-1] ** 0.5
        # softmax: each row becomes weights that sum to 1
        weights = torch.softmax(scores, dim=-1)
        # A V: each query gets a weighted mix of values
        return weights @ v


attention = Attention(D)
question = torch.randn(1, 3, D)             # three tokens from somewhere else
print("3 queries read 196 tokens:", tuple(attention(question, T).shape))
""")

M("""
### Try it yourself

Predict how many numbers this module can learn, then count them with `sum(p.numel() for p in attention.parameters())`.
""")

T(3, """
# Your turn 3. Count the learnable numbers.
n_params = None  # TODO
if n_params is None:
    raise NotImplementedError("Your turn 3: count the learnable numbers.")
print("learnable numbers:", n_params)
""")
A(3)

M("""
## 4 · From attention to self-attention

So far the queries came from another sequence. That is cross-attention. In self-attention, the tokens ask about each other, so the same sequence goes in both places.
""")

T(4, """
# Your turn 4. Self-attention: the same tokens on both sides.
self_out = None  # TODO: call attention
if self_out is None:
    raise NotImplementedError("Your turn 4: call attention on the same tokens twice.")
print("self-attention output", tuple(self_out.shape))
""")
A(4)

M("""
Every token reads every token, so changing one token changes every output.
""")

C("""
changed = T.clone()
changed[0, 0] += 1.0
before, after = attention(T, T), attention(changed, changed)
print("rows of the output that changed:", int(((before - after).abs().amax(-1) > 1e-6).sum()), "of", T.shape[1])
""")

M("""
## 5 · A Transformer encoder block

A block does two things: attention mixes tokens, then an MLP transforms each token on its own. Two more pieces make deep stacks trainable. A **residual connection** adds the input back, so each step refines the tokens. **Layer normalization** keeps their scale steady.

$$x \\leftarrow x + \\mathrm{Attention}(\\mathrm{LN}(x)) \\qquad x \\leftarrow x + \\mathrm{MLP}(\\mathrm{LN}(x))$$

From here we use PyTorch's multi-head attention: the same idea, with several heads in parallel.
""")

C("""
class EncoderBlock(nn.Module):

    def __init__(self, dim, heads, hidden):
        super().__init__()
        self.norm1, self.norm2 = nn.LayerNorm(dim), nn.LayerNorm(dim)
        self.attn = nn.MultiheadAttention(dim, heads, batch_first=True)
        self.mlp = nn.Sequential(nn.Linear(dim, hidden), nn.GELU(), nn.Linear(hidden, dim))

    def forward(self, x):
        # mix tokens, and add the input back
        h = self.norm1(x)
        x = x + self.attn(h, h, h, need_weights=False)[0]
        # transform each token on its own, and add the input back
        return x + self.mlp(self.norm2(x))


block = EncoderBlock(dim=D, heads=4, hidden=4 * D)
print("in ", tuple(T.shape))
print("out", tuple(block(T).shape))
""")

M("""
### Try it yourself

A block returns the same shape it receives, so blocks can be stacked. Build a stack of three blocks with `nn.Sequential`, and check the output shape.
""")

T(5, """
# Your turn 5. Stack three encoder blocks.
stack = None  # TODO
if stack is None:
    raise NotImplementedError("Your turn 5: build a stack of three blocks.")
print("out", tuple(stack(T).shape))
""")
A(5)

M("""
## 6 · The full Transformer

Now everything comes together. We add one extra classification token with no patch of its own. After the blocks, its vector goes to the classification head, which is a single linear layer.
""")

C("""
class VisionTransformer(nn.Module):

    def __init__(self, patch=16, dim=64, depth=3, heads=4, classes=10, size=224):
        super().__init__()
        n = (size // patch) ** 2
        self.patch = patch
        self.embed = nn.Linear(3 * patch * patch, dim)          # section 1: tokens
        self.position = nn.Parameter(torch.empty(1, n + 1, dim))
        self.cls = nn.Parameter(torch.empty(1, 1, dim))         # the classification token
        nn.init.trunc_normal_(self.position, std=0.02)
        nn.init.trunc_normal_(self.cls, std=0.02)
        self.blocks = nn.Sequential(*[EncoderBlock(dim, heads, 4 * dim) for _ in range(depth)])
        self.norm = nn.LayerNorm(dim)
        self.head = nn.Linear(dim, classes)                     # the classification head

    def forward(self, images):
        b, p = images.shape[0], self.patch
        grid = images.unfold(2, p, p).unfold(3, p, p)
        patches = grid.permute(0, 2, 3, 1, 4, 5).reshape(b, -1, 3 * p * p)
        x = torch.cat([self.cls.expand(b, -1, -1), self.embed(patches)], dim=1) + self.position
        x = self.blocks(x)
        return self.head(self.norm(x[:, 0]))


model = VisionTransformer()
logits = model(x[None])
print("image in          ", tuple(x[None].shape))
print("tokens with [cls] ", tuple(model.position.shape))
print("logits out        ", tuple(logits.shape))
print("learnable numbers ", sum(p.numel() for p in model.parameters()))
""")

M("""
These logits mean nothing yet, because the weights are random. Training would adjust every one of those learnable numbers. The structure you just built would stay the same.

### Try it yourself

Change one setting and predict what happens to the number of tokens and the learnable numbers: the patch size (one that divides 224), the depth, or the number of heads.
""")

T(6, """
# Your turn 6. Change one setting.
my_model = None  # TODO: for example VisionTransformer(patch=32)
if my_model is None:
    raise NotImplementedError("Your turn 6: build a model with one setting changed.")
print("tokens with [cls] ", tuple(my_model.position.shape))
print("logits out        ", tuple(my_model(x[None]).shape))
print("learnable numbers ", sum(p.numel() for p in my_model.parameters()))
""")
A(6)

if __name__ == "__main__":
    main(FILE)

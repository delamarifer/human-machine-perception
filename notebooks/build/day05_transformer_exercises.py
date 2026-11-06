"""Builds notebooks/day05-lab-transformer-exercises.ipynb.

Three short exercises that run alongside the Day 5 lecture: tokenization, attention and
multi-head attention. Nothing here is trained: the weights are random, or attention is computed from
mean color as in Fig. 26.12 of the Vision Book, and the notebook says so.

Solutions and answers sit in collapsed dropdowns in the notebook (Shreya's decision), so they are public.
Blank exercise cells raise an error until they are filled in.
"""
from textwrap import dedent

from nbtools import md, code, turn, answer, badge, main

SOL = {1: '# Your turn 1. Try a patch size of 32.\n# larger patches: 7 x 7 = 49 tokens, each 32 x 32 x 3 = 3,072 numbers long\nP = 32\ngrid = x.unfold(1, P, P).unfold(2, P, P)\nprint("flattened patches", tuple(grid.permute(1, 2, 0, 3, 4).reshape(-1, 3 * P * P).shape))', 2: '# Your turn 2. Choose a query patch.\n# any number from 0 to 195; row = i // 14, column = i % 14\ni = 30\nshow_row(A_color, i)', 3: '# Your turn 3. Try H = 8, then H = 5.\n# 64 / 8 = 8 numbers per head; H = 5 fails, because 64 does not divide by 5\nH = 8\nmulti_head(T, H)'}
ANS = {1: '**Answer.** 224 / 16 = 14 patches per side, so 14 × 14 = 196 tokens of length 16 × 16 × 3 = 768. With P = 32: 7 × 7 = 49 tokens of length 3,072.\n\n**Common misunderstandings.** Students often answer 224 / 16 = 14, forgetting that the grid has two dimensions. Some forget the three color channels in the patch length. Larger patches mean fewer, longer tokens: attention gets cheaper, and detail is coarser. The projection `W_tokenize` is random here, so these embeddings carry no learned meaning.', 2: "**Answer.** A is 196 × 196. Row i holds the weights that token i places on all 196 tokens, and it sums to 1. It describes how token i's new vector is mixed. Column j is not a distribution.\n\n**Common misunderstandings.** This map comes from mean color, so bright patches are simply patches of similar color: a goat patch lights up other pale patches, wherever they are. It is not what a trained model attends to. Even for a trained model, attention weights show how information is mixed; they are not a full explanation of its reasoning. The factor 40 only sharpens the picture.", 3: "**Answer.** d_h = 64 / 4 = 16. Attention is 4 × 196 × 196, one matrix per head. After concatenation, the shape is 196 × 64 again, and the output projection keeps it. With H = 8, d_h = 8. With H = 5, the code fails at `view`, because 64 is not divisible by 5.\n\n**Common misunderstandings.** More heads do not add parameters to the projections here: each head gets a smaller slice. Heads are not guaranteed to specialize, and with random weights their differences mean nothing. The output projection is what lets the heads' results combine."}

FILE = "day05-lab-transformer-exercises.ipynb"
BADGE = badge(FILE)


def M(s):
    md(dedent(s).strip())


def C(s):
    code(dedent(s).strip())


def T(n, blank):
    turn(dedent(blank).strip(), SOL.get(n, ""))


def A(n):
    answer(ANS.get(n, ""))


M(f"""
{BADGE}

# Day 5 · Exercises: from an image to multi-head attention

**Transformers and Visual Representations** · Day 5 · Fernanda De La Torre & Shreya Pandit

Three short exercises to go with the lecture:

1. **Tokenization:** how do we represent an image as a sequence?
2. **Attention:** how does a token gather relevant information?
3. **Multi-head attention:** what if we look for different relationships at the same time?

Each exercise starts with a prediction. Write yours down before you run the cell.

**Nothing in this notebook is trained.** The weights are random, so these cells show the shapes and the steps, not what a trained Transformer has learned. A CPU runtime is enough.
""")

M("""
## 0 · Setup
""")

C("""
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
## Exercise 1 · Tokenization: how do we represent an image as a sequence?

We divide an image into patches and turn each patch into a numerical representation, or token.

**Predict first.** The image is 224 × 224, and each patch is 16 × 16. How many tokens will we get?
""")

C("""
x = torch.tensor(np.array(img)).float().permute(2, 0, 1) / 255
print("image tensor      ", tuple(x.shape))

P = 16
grid = x.unfold(1, P, P).unfold(2, P, P)
print("grid of patches   ", tuple(grid.shape))

patches = grid.permute(1, 2, 0, 3, 4).reshape(-1, 3 * P * P)
print("flattened patches ", tuple(patches.shape))

D = 64
W_tokenize = nn.Linear(3 * P * P, D)
tokens = W_tokenize(patches)
print("embedded tokens   ", tuple(tokens.shape))

position = 0.02 * torch.randn(196, D)   # one code per place; a real model learns these
T = (tokens + position).detach()        # each token now carries its place
print("tokens + position ", tuple(T.shape))
""")

M("""
### Try it yourself

Change the patch size to 32. Predict the number of tokens and the length of each flattened patch, then fill in `P` and run the cell.
""")

T(1, """
# Your turn 1. Try a patch size of 32.
P = None  # TODO
if P is None:
    raise NotImplementedError("Your turn 1: choose a patch size.")
grid = x.unfold(1, P, P).unfold(2, P, P)
print("flattened patches", tuple(grid.permute(1, 2, 0, 3, 4).reshape(-1, 3 * P * P).shape))
""")
A(1)

M("""
## Exercise 2 · Attention: how does a token gather relevant information?

Each token compares itself with other tokens to determine which information to draw from them and how much.

- **Query:** what a token is looking for.
- **Key:** what a token offers for matching.
- **Value:** the information a token contributes.

There are 196 tokens, so the attention matrix is 196 × 196: one weight for every pair of tokens. **Predict first.** What does one row of it represent?

""")

C("""
class SingleHeadAttention(nn.Module):

    def __init__(self, embedding_dim, attention_dim):
        super().__init__()
        # three learned projections: these are the weights a model trains
        self.query = nn.Linear(embedding_dim, attention_dim, bias=False)
        self.key = nn.Linear(embedding_dim, attention_dim, bias=False)
        self.value = nn.Linear(embedding_dim, attention_dim, bias=False)

    def forward(self, queries_from, tokens):
        # queries from one sequence; keys and values from the other
        q = self.query(queries_from)
        k, v = self.key(tokens), self.value(tokens)
        # Q K^T divided by sqrt(d_k): how well each query matches each key
        scores = q @ k.transpose(1, 2) / k.shape[-1] ** 0.5
        # softmax: each row becomes weights that sum to 1
        weights = torch.softmax(scores, dim=-1)
        # A V: each query gets a weighted mix of values
        return weights @ v


D = 64
attention = SingleHeadAttention(embedding_dim=D, attention_dim=D)
batch = T[None]                       # add a batch dimension
print("tokens in ", tuple(batch.shape))
print("tokens out", tuple(attention(batch, batch).shape))
""")

M("""
### The same steps, one at a time

Here are the steps inside `forward`, with the shape after each one.
""")

C("""
W_q, W_k, W_v = attention.query, attention.key, attention.value
Q, K, V = W_q(T), W_k(T), W_v(T)
print("Q, K, V       ", tuple(Q.shape), tuple(K.shape), tuple(V.shape))

scores = Q @ K.T
print("1. Q K^T      ", tuple(scores.shape))

scaled = scores / K.shape[-1] ** 0.5
print("2. scaled     ", tuple(scaled.shape))

A_ = torch.softmax(scaled, dim=-1)
print("3. softmax    ", tuple(A_.shape), " row 0 sums to", round(A_[0].sum().item(), 4))

out = A_ @ V
print("4. weighted V ", tuple(out.shape))
print("largest difference from the class:", (attention(batch, batch)[0] - out).abs().max().item())
""")

M("""
### In practice

We write the steps by hand to understand them. In real code, we call an optimized library function that does the same computation.
""")

C("""
library = F.scaled_dot_product_attention(Q, K, V)
print("largest difference from our version:", (library - out).abs().max().item())
""")

M("""
### An attention map over the image

The weights above are random, so a map of them would mean nothing. Here is a map we can read. As in Fig. 26.12 of the Vision Book, each token's query and key are set to its mean color, as a unit vector. **This is computed from color. It is not learned, and it does not show what a trained model attends to.**
""")

C("""
color = x.unfold(1, 16, 16).unfold(2, 16, 16).mean((3, 4)).permute(1, 2, 0).reshape(196, 3)
color = F.normalize(color, dim=-1)
A_color = torch.softmax(40 * color @ color.T, dim=-1)   # 40 sharpens the map, so that it is easy to see

def show_row(A, i):
    fig, ax = plt.subplots(1, 2, figsize=(8, 4))
    ax[0].imshow(img); ax[0].set_title(f"query patch {i}")
    ax[0].add_patch(plt.Rectangle((i % 14 * 16, i // 14 * 16), 16, 16, fill=False, color="white", lw=2))
    ax[1].imshow(img); ax[1].set_title("row of A, over the patches")
    ax[1].imshow(np.kron(A[i].reshape(14, 14).detach().numpy(), np.ones((16, 16))), alpha=.75, cmap="gray")
    for a in ax: a.axis("off")
    plt.show()

show_row(A_color, 85)
""")

M("""
### Try it yourself

Pick another query patch, from 0 to 195. Predict which patches will light up, then run the cell.
""")

T(2, """
# Your turn 2. Choose a query patch.
i = None  # TODO
if i is None:
    raise NotImplementedError("Your turn 2: choose a query patch from 0 to 195.")
show_row(A_color, i)
""")
A(2)

M("""
## Exercise 3 · Multi-head attention: what if we look for different relationships at the same time?

Multiple attention heads operate in parallel, allowing the model to capture different patterns and relationships between tokens. Each head works on a smaller slice of the embedding. Heads *can* learn different relationships, but no head is guaranteed to have a role with a name.

**Predict first.** With `D = 64` and `H = 4`, what is the size of each head? What is the shape of the output after concatenation?
""")

C("""
def multi_head(T, H):
    N, D = T.shape
    d_h = D // H
    split = lambda Z: Z.view(N, H, d_h).transpose(0, 1)
    Q, K, V = split(W_q(T)), split(W_k(T)), split(W_v(T))
    print("per head Q        ", tuple(Q.shape))
    A = torch.softmax(Q @ K.transpose(-1, -2) / d_h ** 0.5, dim=-1)
    print("attention per head", tuple(A.shape))
    heads = A @ V
    print("output per head   ", tuple(heads.shape))
    concat = heads.transpose(0, 1).reshape(N, D)
    print("concatenated      ", tuple(concat.shape))
    return W_o(concat), A

W_o = nn.Linear(64, 64, bias=False)
final, A_heads = multi_head(T, H=4)
print("after projection  ", tuple(final.shape))
""")

M("""
The library version does all of this in one module:
""")

C("""
mha = nn.MultiheadAttention(embed_dim=64, num_heads=4, batch_first=True)
y, w = mha(T[None], T[None], T[None], average_attn_weights=False)
print("output ", tuple(y.shape))
print("weights", tuple(w.shape))
""")

M("""
### Try it yourself

Try `H = 8`, then `H = 5`. Predict what happens to the size of each head before you run the cell.
""")

T(3, """
# Your turn 3. Try H = 8, then H = 5.
H = None  # TODO
if H is None:
    raise NotImplementedError("Your turn 3: choose a number of heads.")
multi_head(T, H)
""")
A(3)

M("""
## Going further: what does position change?

**Predict first.** Shuffle the 196 tokens and run attention. What happens to the output?
""")

C("""
plain = tokens.detach()                   # the tokens without position
order = torch.randperm(196)
shuffled = attention(plain[order][None], plain[order][None])[0]
print("shuffled input gives shuffled output:", torch.allclose(shuffled, attention(plain[None], plain[None])[0][order], atol=1e-5))

moved_in = (plain[order] + position)[None]
moved = attention(moved_in, moved_in)[0]
print("with position, still just shuffled:  ", torch.allclose(moved, attention(T[None], T[None])[0][order], atol=1e-5))
""")

M("""
Attention alone treats the tokens as a set. This is why we added `position` in Exercise 1: once each place has its own code, moving a patch changes the result. The Vision Transformer adds a learned code to each token; the Vision Book (section 26.11) also describes sinusoidal codes.
""")

M("""
## What this was, and what it was not

These cells are a simplified teaching version. A complete Transformer also has residual connections, layer normalization and an MLP in every block, and its weights are trained on data. In real work, you would use library code and pretrained models.
""")

if __name__ == "__main__":
    main(FILE)

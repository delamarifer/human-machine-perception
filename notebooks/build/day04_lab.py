"""Builds notebooks/day04-lab-cnn-mnist.ipynb: the Day 4 in-class lab.
Adapted from MIT 6.S191 Lab 2 Part 1, "MNIST Digit Classification" (PyTorch version,
https://github.com/MITDeepLearning/introtodeeplearning/blob/master/lab2/PT_Part1_MNIST.ipynb), MIT License,
© MIT Introduction to Deep Learning, http://introtodeeplearning.com.
Changes from MIT's version: no Comet, no mitdeeplearning package, no GPU requirement; train() uses its
arguments; one learning rate (0.1) in text and code; the fully connected model is given as the baseline
and the CNN is the main exercise; MNIST is held in memory so an epoch takes seconds on a CPU; two closing
sections (learned filters and feature maps; the pixel-permutation test).
See nbtools.py for how to build and check it."""
from nbtools import md, code, hidden, turn, answer, resources, badge, main

# The solutions live in a git-ignored file, private/day04_lab_solutions.py (the repository is public).
# Without it, this script still builds the student notebook; --teacher and --solved need it.
try:
    from private.day04_lab_solutions import SOL, ANSWERS
except ImportError:
    SOL, ANSWERS = {}, {}

FILE = 'day04-lab-cnn-mnist.ipynb'
MIT_LAB = 'https://github.com/MITDeepLearning/introtodeeplearning/blob/master/lab2/PT_Part1_MNIST.ipynb'
MIT_IMG = 'https://raw.githubusercontent.com/MITDeepLearning/introtodeeplearning/master/lab2/img'

# ---------------------------------------------------------------------------------------------
md(f"""
{badge(FILE)}

# Day 4 lab · Handwritten digits: a fully connected network, then a CNN

**Human-Machine Perception** · Day 4 · Fernanda & Shreya

> Adapted from **MIT 6.S191 Lab 2, Part 1: MNIST Digit Classification** ([original notebook]({MIT_LAB})).
> Copyright MIT Introduction to Deep Learning, licensed under the MIT License.
> **© MIT Introduction to Deep Learning · http://introtodeeplearning.com**

In lecture we saw why a plain fully connected network is a poor fit for images, and how a
convolutional network (convolve → ReLU → pool, repeated) builds in assumptions about images instead.
Today you test that claim on MNIST: 70,000 small pictures of handwritten digits, 0 to 9.

By the end you will be able to:

1. load an image dataset in PyTorch and look at it
2. train and test a **fully connected** network (our baseline)
3. **build a CNN** from `nn.Conv2d`, `nn.MaxPool2d` and `nn.Linear`, and compare it with the baseline
4. look inside a trained CNN: its **learned filters** and the **feature maps** they produce
5. run the **pixel-permutation test** and explain what it shows about a CNN's built-in assumptions

**How to use this notebook.** Click a gray code cell and press **Shift + Enter** to run it. Run the
cells in order. Cells marked **Your turn** are for you: they run as they are (if you leave one blank,
the notebook uses the course's answer so later cells still work), and use your version once you fill
it in. We go over the solutions together in class.

**Time.** About 40 minutes. No GPU needed. Each network trains for two epochs: the fully connected
network in a few seconds, the CNN in about 25 seconds on our laptop's CPU (2 threads). A free Colab CPU
is usually slower; expect up to a couple of minutes per CNN. Times are printed as you go. A GPU
(*Runtime → Change runtime type → T4 GPU*) makes it faster but is optional.
""")

md("""
## 0 · Set up

Run the next two cells. The first loads PyTorch and picks the GPU if there is one, otherwise the CPU.
The second holds the lab's **helper code** (plots, and the course's CNN that a blank *Your turn* falls
back on). It is folded away; you don't need to read it.
""")
code("""
import sys, time
import numpy as np
import matplotlib.pyplot as plt
import torch
import torch.nn as nn
import torch.optim as optim
import torchvision
import torchvision.datasets as datasets
import torchvision.transforms as transforms
from torch.utils.data import DataLoader, TensorDataset

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

print("Python     ", sys.version.split()[0])
print("PyTorch    ", torch.__version__)
print("torchvision", torchvision.__version__)
print("Running in Colab:", "google.colab" in sys.modules)
print("Device:", device, "(a GPU is optional)" if device.type == "cpu" else "")
""")
hidden('''
#@title Helper code: run this cell (no need to read it)

def count_params(model):
    """Number of learned numbers (weights and biases) in a model."""
    return sum(p.numel() for p in model.parameters())


def plot_loss(losses, title):
    """The training loss after every batch, plus a smoothed line."""
    losses = np.asarray(losses)
    k = 25
    smooth = np.convolve(losses, np.ones(k) / k, mode="valid")
    plt.figure(figsize=(7, 3.5))
    plt.plot(losses, color="0.75", lw=0.8, label="each batch")
    plt.plot(np.arange(k - 1, len(losses)), smooth, color="k", lw=1.5, label=f"average of {k} batches")
    plt.yscale("log")
    plt.xlabel("training step (batch)")
    plt.ylabel("loss (cross entropy)")
    plt.title(title)
    plt.legend()
    plt.show()


def show_predictions(model, images, labels, n=20):
    """The first n test digits, the model's guess, and how sure it is. Wrong guesses are marked with an x."""
    model.eval()
    with torch.no_grad():
        probs = torch.softmax(model(images[:n].to(device)), dim=1).cpu()
    conf, guess = probs.max(dim=1)
    cols = 10
    plt.figure(figsize=(cols * 1.2, (n // cols) * 1.5))
    for i in range(n):
        plt.subplot(n // cols, cols, i + 1)
        plt.imshow(images[i, 0], cmap="binary")
        ok = guess[i].item() == labels[i].item()
        plt.title(f"{guess[i].item()} ({100 * conf[i]:.0f}%)" + ("" if ok else f"  x  true {labels[i].item()}"),
                  fontsize=8)
        plt.axis("off")
    plt.tight_layout()
    plt.show()


class CourseCNN(nn.Module):
    """The course's CNN, used when the Your turn 1 cell is left blank or doesn't run yet."""
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(1, 24, kernel_size=3)
        self.pool1 = nn.MaxPool2d(kernel_size=2)
        self.conv2 = nn.Conv2d(24, 36, kernel_size=3)
        self.pool2 = nn.MaxPool2d(kernel_size=2)
        self.flatten = nn.Flatten()
        self.fc1 = nn.Linear(36 * 5 * 5, 128)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(128, 10)

    def forward(self, x):
        x = self.pool1(self.relu(self.conv1(x)))
        x = self.pool2(self.relu(self.conv2(x)))
        x = self.relu(self.fc1(self.flatten(x)))
        return self.fc2(x)


def make_cnn(cnn_class):
    """Builds your CNN and checks it turns a 28 x 28 digit into 10 scores; otherwise uses the course's CNN."""
    torch.manual_seed(0)
    try:
        model = cnn_class()
        out = model(torch.zeros(1, 1, 28, 28))
        assert out is not None, "forward() returns None"
        assert tuple(out.shape) == (1, 10), f"the output has shape {tuple(out.shape)}, not (1, 10)"
        assert hasattr(model, "conv1") and isinstance(model.conv1, nn.Conv2d), "self.conv1 is not an nn.Conv2d"
        print("Your CNN works: one digit in, 10 scores out.")
    except Exception as err:
        print(f"Your CNN isn't finished yet ({type(err).__name__}: {err}).")
        print("Using the course's CNN for now, so the rest of the notebook runs.")
        torch.manual_seed(0)
        model = CourseCNN()
    return model.to(device)
''')

# ---------------------------------------------------------------------------------------------
md("""
## 1 · The MNIST dataset

MNIST has 60,000 training images and 10,000 test images of handwritten digits. Each image is
28 × 28 pixels, gray values from 0 (black) to 1 (white), with a label: the digit it shows.

The next cell downloads it (about 10 seconds). `transforms.ToTensor()` turns each picture into a
PyTorch **tensor** (an array) and scales the pixel values from 0–255 to 0–1.
""")
code("""
transform = transforms.Compose([transforms.ToTensor()])
train_dataset = datasets.MNIST(root="./data", train=True, download=True, transform=transform)
test_dataset = datasets.MNIST(root="./data", train=False, download=True, transform=transform)

image, label = train_dataset[0]
print("one image:", tuple(image.shape), "(1 channel, 28 rows, 28 columns)")
print("its label:", label)
""")
md("""
MNIST is small, so we hold all of it in memory as two big tensors. This makes training much faster on
a CPU than reading the pictures one at a time. `X_train` has shape
`(60000, 1, 28, 28)`: 60,000 images, one gray channel each.
""")
code("""
X_train = train_dataset.data.unsqueeze(1).float() / 255     # (60000, 1, 28, 28), values 0 to 1
y_train = train_dataset.targets                             # (60000,)  digits 0 to 9
X_test = test_dataset.data.unsqueeze(1).float() / 255       # (10000, 1, 28, 28)
y_test = test_dataset.targets
print("X_train", tuple(X_train.shape), "  X_test", tuple(X_test.shape))

plt.figure(figsize=(9, 9))
rng = np.random.default_rng(0)
for i, idx in enumerate(rng.choice(len(X_train), 36, replace=False)):
    plt.subplot(6, 6, i + 1)
    plt.imshow(X_train[idx, 0], cmap="binary")
    plt.title(int(y_train[idx]), fontsize=10)
    plt.axis("off")
plt.tight_layout()
plt.show()
""")
md("""
A **DataLoader** serves the data in small random **batches** (here 64 images at a time). The network
looks at one batch, adjusts its weights a little, and moves on to the next. One pass through all
60,000 training images is one **epoch**.
""")
code("""
BATCH_SIZE = 64
trainset_loader = DataLoader(TensorDataset(X_train, y_train), batch_size=BATCH_SIZE, shuffle=True)
testset_loader = DataLoader(TensorDataset(X_test, y_test), batch_size=1000, shuffle=False)
print(len(trainset_loader), "training batches per epoch")
""")

# ---------------------------------------------------------------------------------------------
md(f"""
## 2 · The baseline: a fully connected network

Our first model ignores that the input is an image. `nn.Flatten` lines up the 28 × 28 pixels as one
list of 784 numbers, row after row. Then come two **fully connected** (`nn.Linear`) layers: 784 → 128
→ 10. Every one of the 128 units is connected to every pixel. The 10 outputs are one score
(**logit**) per digit; the largest score is the network's guess.

![Fully connected network for MNIST]({MIT_IMG}/mnist_2layers_arch.png)

*Figure: MIT 6.S191 Lab 2. (MIT's figure shows a softmax at the end; in PyTorch, `nn.CrossEntropyLoss`
applies it for us, so the model outputs raw scores.)*

This model is complete: run it as it is. It is the number to beat.
""")
code("""
class FullyConnectedModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.flatten = nn.Flatten()
        self.fc1 = nn.Linear(28 * 28, 128)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(128, 10)        # 10 scores, one per digit

    def forward(self, x):
        x = self.flatten(x)                  # (batch, 1, 28, 28) -> (batch, 784)
        x = self.relu(self.fc1(x))
        return self.fc2(x)

torch.manual_seed(0)
fc_model = FullyConnectedModel().to(device)
print(fc_model)
print("learned numbers (weights and biases):", f"{count_params(fc_model):,}")
""")
md("""
### Loss, optimizer, and the training loop

- The **loss function** measures how wrong the guesses are. For choosing one class out of ten we use
  [cross entropy](https://pytorch.org/docs/stable/generated/torch.nn.CrossEntropyLoss.html).
- The **optimizer** changes the weights to lower the loss. We use stochastic gradient descent (SGD)
  with a **learning rate of 0.1**: how big a step to take each time.

`train()` runs the loop from lecture for every batch: forward pass, loss, `backward()` to get the
gradients, `optimizer.step()` to update the weights. It records the loss after every batch so we can
plot it. `evaluate()` measures accuracy on the 10,000 **test** images, which the model never trains on.
""")
code("""
def train(model, dataloader, loss_function, optimizer, epochs):
    \"\"\"Trains `model` on `dataloader`; returns the loss after every batch.\"\"\"
    model.train()
    losses = []
    start = time.time()
    for epoch in range(epochs):
        total_loss, correct_pred, total_pred = 0.0, 0, 0
        for images, labels in dataloader:
            images, labels = images.to(device), labels.to(device)
            outputs = model(images)                 # forward pass: 10 scores per image
            loss = loss_function(outputs, labels)   # how wrong are they?
            optimizer.zero_grad()                   # clear the old gradients
            loss.backward()                         # backpropagation
            optimizer.step()                        # update the weights

            losses.append(loss.item())
            total_loss += loss.item() * images.size(0)
            correct_pred += (outputs.argmax(dim=1) == labels).sum().item()
            total_pred += labels.size(0)
        print(f"Epoch {epoch + 1}: loss {total_loss / total_pred:.3f}, "
              f"training accuracy {correct_pred / total_pred:.4f}  ({time.time() - start:.0f} s so far)")
    return losses


def evaluate(model, dataloader, loss_function):
    \"\"\"Average loss and accuracy of `model` on `dataloader`.\"\"\"
    model.eval()
    test_loss, correct_pred, total_pred = 0.0, 0, 0
    with torch.no_grad():                           # no gradients needed to test
        for images, labels in dataloader:
            images, labels = images.to(device), labels.to(device)
            outputs = model(images)
            test_loss += loss_function(outputs, labels).item() * images.size(0)
            correct_pred += (outputs.argmax(dim=1) == labels).sum().item()
            total_pred += labels.size(0)
    return test_loss / total_pred, correct_pred / total_pred
""")
md("""
Now train the baseline for **two epochs** (a few seconds on a CPU) and test it.
""")
code("""
EPOCHS = 2
loss_function = nn.CrossEntropyLoss()
optimizer = optim.SGD(fc_model.parameters(), lr=0.1)

fc_losses = train(fc_model, trainset_loader, loss_function, optimizer, EPOCHS)
plot_loss(fc_losses, "Fully connected network")

fc_test_loss, fc_test_acc = evaluate(fc_model, testset_loader, loss_function)
print(f"Fully connected network, test accuracy: {fc_test_acc:.4f}")
""")
md("""
The test accuracy is usually a little lower than the training accuracy: the model does slightly better
on images it has seen. That gap is a small amount of **overfitting**.

*Try it (optional, later):* change the learning rate (0.01? 0.5?) or `EPOCHS`, re-run the model cell
and the training cell, and see how the test accuracy moves.
""")

# ---------------------------------------------------------------------------------------------
md(f"""
## 3 · A convolutional network (CNN)

Now a network that knows it is looking at an image. It is the building block from lecture, twice:
**convolve → ReLU → pool**, then two fully connected layers to read out the digit.

![CNN for MNIST]({MIT_IMG}/convnet_fig.png)

*Figure: MIT 6.S191 Lab 2.*

Layer by layer, for one 28 × 28 digit:

| Layer | What it does | Output shape |
|---|---|---|
| `conv1 = nn.Conv2d(1, 24, kernel_size=3)` | 24 learned 3 × 3 filters slide over the image | 24 × 26 × 26 |
| ReLU, then `pool1 = nn.MaxPool2d(kernel_size=2)` | keep the largest value in each 2 × 2 patch | 24 × 13 × 13 |
| `conv2 = nn.Conv2d(24, 36, kernel_size=3)` | 36 filters, each looking at all 24 maps | 36 × 11 × 11 |
| ReLU, then `pool2 = nn.MaxPool2d(kernel_size=2)` | | 36 × 5 × 5 |
| `flatten`, `fc1 = nn.Linear(36 * 5 * 5, 128)`, ReLU | | 128 |
| `fc2 = nn.Linear(128, 10)` | one score per digit | 10 |

Each 3 × 3 convolution with no padding trims one pixel from every border (28 → 26), and each pooling
halves the size, rounding down (11 → 5).
""")
md("""
**Your turn 1 · Build the CNN.** Fill in the four layers marked `None` and the forward pass, following the table. The `fc1` and ReLU
layers are already there. When you run the cell, `make_cnn` checks your network: if it doesn't run
yet, it tells you why and uses the course's CNN so you can keep going. Fix it and run the cell again.
""")
turn("""
# YOUR TURN 1 · Define the CNN layers, then the forward pass.
class CNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = None        # 1 input channel -> 24 filters, 3 x 3
        self.pool1 = None        # max pooling over 2 x 2
        self.conv2 = None        # 24 channels -> 36 filters, 3 x 3
        self.pool2 = None        # max pooling over 2 x 2

        self.flatten = nn.Flatten()
        self.fc1 = nn.Linear(36 * 5 * 5, 128)
        self.relu = nn.ReLU()
        self.fc2 = None          # 128 -> 10 scores, one per digit

    def forward(self, x):
        # 1. conv1, ReLU, pool1
        # 2. conv2, ReLU, pool2
        # 3. flatten, fc1, ReLU, fc2
        return None              # replace with the 10 scores

cnn_model = make_cnn(CNN)
print(cnn_model)
print("learned numbers (weights and biases):", f"{count_params(cnn_model):,}")
""", SOL.get(1, ""))
resources(('nn.Conv2d', 'https://pytorch.org/docs/stable/generated/torch.nn.Conv2d.html'),
          ('nn.MaxPool2d', 'https://pytorch.org/docs/stable/generated/torch.nn.MaxPool2d.html'),
          ('nn.Linear', 'https://pytorch.org/docs/stable/generated/torch.nn.Linear.html'),
          ('Defining a model by subclassing nn.Module', 'https://pytorch.org/tutorials/beginner/basics/buildmodel_tutorial.html'))
md("""
### Train and test the CNN

Same loss, same optimizer and learning rate, same two epochs, so the comparison is fair. A CNN does
much more arithmetic per image, so this takes longer: about 25 seconds on our laptop CPU, up to a couple
of minutes on a Colab CPU, a few seconds on a GPU.
""")
code("""
optimizer = optim.SGD(cnn_model.parameters(), lr=0.1)
cnn_losses = train(cnn_model, trainset_loader, loss_function, optimizer, EPOCHS)
plot_loss(cnn_losses, "CNN")

cnn_test_loss, cnn_test_acc = evaluate(cnn_model, testset_loader, loss_function)
print(f"Fully connected network, test accuracy: {fc_test_acc:.4f}   ({count_params(fc_model):,} learned numbers)")
print(f"CNN,                     test accuracy: {cnn_test_acc:.4f}   ({count_params(cnn_model):,} learned numbers)")
""")
md("""
**Your turn 2 · Read out one prediction.** The model's output for one image is 10 scores. Its guess is the digit with the **largest** score.
Use `torch.argmax` to get it, then compare with the true label.
""")
turn("""
# YOUR TURN 2 · Which digit does the CNN pick for the first test image?
test_image, test_label = X_test[0], int(y_test[0])
cnn_model.eval()
with torch.no_grad():
    scores = cnn_model(test_image.unsqueeze(0).to(device))   # shape (1, 10)
print("scores:", np.round(scores.cpu().numpy()[0], 1))

prediction = None    # replace None with the index of the largest score (a plain int: add .item())

if prediction is not None:
    print("CNN's guess:", prediction, "  true label:", test_label)
plt.figure(figsize=(2, 2))
plt.imshow(test_image[0], cmap="binary")
plt.axis("off")
plt.show()
""", SOL.get(2, ""))
resources(('torch.argmax', 'https://pytorch.org/docs/stable/generated/torch.argmax.html'),
          ('Tensor.item', 'https://pytorch.org/docs/stable/generated/torch.Tensor.item.html'))
md("""
Here are the first 20 test digits with the CNN's guess and its confidence (the softmax of the
scores). An **x** marks a wrong guess. A network can be very confident and still wrong.
""")
code("""
show_predictions(cnn_model, X_test, y_test, n=20)
""")
md("""
### Your turn 3 · Talk it over

Compare the two test accuracies and the two counts of learned numbers printed above. Which model
does better, and which one has more weights? What does the CNN assume about images that the fully
connected network does not? (Think back to lecture: what is shared across positions, and what does each
unit get to look at?)
""")
answer(ANSWERS.get(3, ""))

# ---------------------------------------------------------------------------------------------
md("""
## 4 · Inside the CNN: learned filters and feature maps

In lecture we contrasted **hand-designed** filters (Day 3) with **learned** ones. Here are the 24
filters of `conv1` after training, each a 3 × 3 grid of weights. Nobody designed them: they came out
of training. Red weights are positive, blue negative.
""")
code("""
w = cnn_model.conv1.weight.detach().cpu()[:, 0]        # (24, 3, 3)
lim = w.abs().max()
plt.figure(figsize=(10, 2.6))
for i in range(w.shape[0]):
    plt.subplot(2, 12, i + 1)
    plt.imshow(w[i], cmap="RdBu_r", vmin=-lim, vmax=lim)
    plt.title(i, fontsize=8)
    plt.axis("off")
plt.suptitle("The 24 learned conv1 filters (3 x 3)")
plt.show()
""")
md("""
Each filter, slid over a digit, gives a **feature map**: a 26 × 26 image that is bright where that
part of the digit matches the filter. Below: one test digit, and its 24 feature maps after `conv1` and
ReLU. Look for maps that light up on only one edge of a stroke (the top, or the left side), maps that
light up on the whole stroke, and maps that stay dark: a filter whose responses to this digit are all
negative is set to zero by the ReLU.
""")
code("""
digit = X_test[0:1].to(device)
cnn_model.eval()
with torch.no_grad():
    maps = torch.relu(cnn_model.conv1(digit))[0].cpu()  # (24, 26, 26)

plt.figure(figsize=(2.2, 2.2))
plt.imshow(digit[0, 0].cpu(), cmap="binary")
plt.title(f"test digit 0 (label {int(y_test[0])})", fontsize=9)
plt.axis("off")
plt.show()

plt.figure(figsize=(12, 2.8))
for i in range(maps.shape[0]):
    plt.subplot(2, 12, i + 1)
    plt.imshow(maps[i], cmap="gray")
    plt.title(i, fontsize=8)
    plt.axis("off")
plt.suptitle("Its 24 feature maps after conv1 and ReLU (bright = strong response)")
plt.show()
""")
md("""
The same 24 small filters are applied at every position of the image (**weight sharing**). That is why
`conv1` has only 24 × (3 × 3 + 1) = 240 learned numbers, while the first layer of the fully connected
network has 784 × 128 + 128 = 100,480.
""")

# ---------------------------------------------------------------------------------------------
md("""
## 5 · The pixel-permutation test

A CNN assumes that **pixels next to each other belong together**: each filter looks at a small
neighborhood, and the same filter is used everywhere. The fully connected network assumes nothing about
which pixels are neighbors; to it the image is just a list of 784 numbers.

Here is a test of that difference. Pick **one** random shuffle of the 784 pixel positions and apply that
same shuffle to every image, in training and in test. No information is lost: the shuffle can be
undone exactly. But the neighbors are gone.
""")
code("""
g = torch.Generator().manual_seed(0)
perm = torch.randperm(28 * 28, generator=g)        # one fixed shuffle of the 784 positions

def shuffle_pixels(X):
    \"\"\"Applies the same pixel shuffle `perm` to every image in X (shape (N, 1, 28, 28)).\"\"\"
    return X.reshape(len(X), -1)[:, perm].reshape(len(X), 1, 28, 28)

X_train_perm, X_test_perm = shuffle_pixels(X_train), shuffle_pixels(X_test)

plt.figure(figsize=(10, 2.6))
for i in range(6):
    plt.subplot(2, 6, i + 1); plt.imshow(X_test[i, 0], cmap="binary"); plt.axis("off")
    plt.title(int(y_test[i]), fontsize=9)
    plt.subplot(2, 6, i + 7); plt.imshow(X_test_perm[i, 0], cmap="binary"); plt.axis("off")
plt.suptitle("Top: test digits. Bottom: the same digits with the pixels shuffled (same shuffle for all)")
plt.show()
""")
md("""
### Your turn 4 · Predict first

Before running the next cell, write down your prediction. We will train a **new** fully connected
network and a **new** CNN on the shuffled images, exactly as before (same layers, two epochs, same
learning rate), and test them on shuffled test images.

1. What happens to the fully connected network's accuracy? Why?
2. What happens to the CNN's accuracy? Why?
""")
answer(ANSWERS.get(4, ""))
md("""
Now run it. It trains two networks, so it takes about as long as sections 2 and 3 together.
""")
code("""
perm_train_loader = DataLoader(TensorDataset(X_train_perm, y_train), batch_size=BATCH_SIZE, shuffle=True)
perm_test_loader = DataLoader(TensorDataset(X_test_perm, y_test), batch_size=1000, shuffle=False)

torch.manual_seed(0)
fc_perm = FullyConnectedModel().to(device)
print("Fully connected network on shuffled pixels:")
train(fc_perm, perm_train_loader, loss_function, optim.SGD(fc_perm.parameters(), lr=0.1), EPOCHS)
_, fc_perm_acc = evaluate(fc_perm, perm_test_loader, loss_function)

cnn_perm = make_cnn(CNN)
print("CNN on shuffled pixels:")
train(cnn_perm, perm_train_loader, loss_function, optim.SGD(cnn_perm.parameters(), lr=0.1), EPOCHS)
_, cnn_perm_acc = evaluate(cnn_perm, perm_test_loader, loss_function)

print()
print(f"{'test accuracy':<25}{'original':>10}{'shuffled':>10}{'change':>10}")
print(f"{'fully connected':<25}{fc_test_acc:>10.4f}{fc_perm_acc:>10.4f}{fc_perm_acc - fc_test_acc:>+10.4f}")
print(f"{'CNN':<25}{cnn_test_acc:>10.4f}{cnn_perm_acc:>10.4f}{cnn_perm_acc - cnn_test_acc:>+10.4f}")

x = np.arange(2)
plt.figure(figsize=(5, 3.5))
plt.bar(x - 0.2, [fc_test_acc, cnn_test_acc], 0.4, color="0.3", label="original images")
plt.bar(x + 0.2, [fc_perm_acc, cnn_perm_acc], 0.4, color="0.7", label="shuffled pixels")
plt.xticks(x, ["fully connected", "CNN"])
plt.ylabel("test accuracy (axis starts at 0.8)")
plt.ylim(0.8, 1.0)
plt.legend(loc="lower right")
plt.show()
""")
md("""
Compare the two changes in the table with your prediction.

To the fully connected network, shuffling the pixels only changes the order of its 784 inputs, and the
order never mattered to it: every unit is connected to every pixel anyway. Up to the luck of the random
starting weights, it faces the same problem as before.

The CNN's filters look for patterns in 3 × 3 neighborhoods, but after the shuffle a neighborhood holds
pixels that came from all over the digit. Its built-in assumption, the thing that helped it on real
images, no longer fits the data. An assumption that matches the world helps; one that doesn't, hurts.
People are similar: we read digits easily, and the shuffled images above are hopeless to us, though
they carry exactly the same information.
""")

# ---------------------------------------------------------------------------------------------
md("""
## What you learned

- A **fully connected** network treats an image as a list of numbers; it already does well on MNIST.
- A **CNN** (convolve → ReLU → pool) builds in two assumptions about images: nearby pixels belong
  together (small filters), and the same pattern can appear anywhere (weight sharing). With far fewer
  weights in its first layer, it does better.
- Its **learned filters** were not designed by anyone; some of them act like the edge filters of Day 3,
  lighting up on one side of a stroke.
- The **pixel-permutation test** shows what those assumptions are worth: shuffle the neighbors away, and
  the CNN loses its advantage, while the fully connected network doesn't notice.

**Homework:** finish any *Your turn* cells you didn't get to in class. Optional: train both models for
more epochs, or try `optim.Adam(model.parameters(), lr=1e-3)`, and see how close to 100% you can get.
""")

if __name__ == '__main__':
    main(FILE, private_solutions=True)

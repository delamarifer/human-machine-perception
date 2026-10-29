/* PART: lab (Day 5). Owner: to decide (see README.md). Plan: 30 min, PyTorch lab; then homework.
   1. the training loop from the last slide, as PyTorch code, one line per click
   2. the lab: train a small classifier, plot loss and accuracy
   3. homework */
{
section('PyTorch lab');

const labCss = `<style>
  .lab-code{ font:clamp(1.05rem,1.55vw,1.45rem)/1.6 Menlo, Consolas, monospace; background:#f8fafc; border:1px solid var(--line);
    border-radius:12px; padding:2.4vh 2vw; white-space:pre; margin:auto 0; }
  .lab-code .b{ display:block; }
  .lab-code .lab-c{ color:var(--mute); }
</style>`;

st(`${labCss}
  <h1 class="t">The same loop in PyTorch</h1>
  <div class="lab-code"><span class="b" data-step="1">model = nn.Sequential(nn.Flatten(), nn.Linear(784, 128), nn.ReLU(), nn.Linear(128, 10))</span><span class="b" data-step="2">loss_fn = nn.CrossEntropyLoss()</span><span class="b" data-step="3">opt = torch.optim.SGD(model.parameters(), lr=0.1)</span><span class="b" data-step="4">for x, y in train_loader:</span><span class="b" data-step="4">    logits = model(x)            <span class="lab-c"># forward</span></span><span class="b" data-step="5">    loss = loss_fn(logits, y)    <span class="lab-c"># loss</span></span><span class="b" data-step="6">    opt.zero_grad()
    loss.backward()              <span class="lab-c"># backprop</span></span><span class="b" data-step="7">    opt.step()                   <span class="lab-c"># gradient step</span></span></div>
`, { notes: [
  "(draft) Here is the whole day as PyTorch code.",
  "(draft) The model: flatten a 28 by 28 image into 784 numbers, a linear layer to 128 hidden units, a ReLU, and a linear layer to 10 logits, one per class.",
  "(draft) The loss: cross-entropy. PyTorch's version takes logits directly and does the softmax inside.",
  "(draft) The optimizer: plain stochastic gradient descent with learning rate 0.1. Swapping in Adam is a one-line change.",
  "(draft) The loop: for each batch of images x and labels y, the forward pass gives logits.",
  "(draft) The loss compares them with the labels.",
  "(draft) zero_grad clears the old gradients, and loss.backward runs backpropagation through the whole network.",
  "(draft) And opt.step moves every weight against its gradient. Eight lines, and every one of them is something we drew today."
]});

st(`
  <h1 class="t">Lab: train a small classifier</h1>
  <ul class="frag">
    <li class="b">Build a small network (nn.Module)</li>
    <li class="b">Train it with the loop</li>
    <li class="b">Plot loss and accuracy, on training and test images</li>
    <li class="b">Change one thing and watch the curves</li>
  </ul>
  <div class="todo b">Colab link: notebooks/day05-lab-… (notebook to add)</div>
`, { notes: [
  "(draft) For the rest of the session, you train one yourself.",
  "(draft) First, write the network as an nn.Module: the layers, and a forward function.",
  "(draft) Then train it with exactly the loop we just read.",
  "(draft) As it trains, plot the loss and the accuracy, both on the training images and on test images it has never seen. The gap between the two will matter on Day 6.",
  "(draft) Then change one thing, the learning rate, the number of hidden units, or how long you train, and see what happens to the curves.",
  "(draft) (to write) Where to find the notebook."
]});

st(`
  <h1 class="t">Homework</h1>
  <ul class="frag">
    <li class="b">Reading<div class="todo">chapters to add (blank in the plan)</div></li>
    <li class="b">Finish the training-loop exercise</li>
    <li class="b">Change one training variable; explain what happened, and why</li>
  </ul>
`, { notes: [
  "(draft) Homework for next time.",
  "(draft) (to write) The reading.",
  "(draft) Finish the training-loop exercise from the lab.",
  "(draft) And pick one training variable, run the experiment, and write a few sentences: what changed in the curves, and why you think it did."
]});
}

/* PART: research (Day 2). Owner: to decide. Plan: 5 min. The three kinds of questions are the plan's own wording.
   Each kind carries one example students saw earlier today, with the same images and numbers:
   theory = our shuffle test (assets/shuffle, real ResNet-18 outputs) and Geirhos's train-on-shape idea;
   limitations = Vision language models are blind (the paper's numbers, as on the motivation slide);
   application = the Canopy Height demo (no image: Meta's pages can't be reused, so a schematic of the pipeline).
   Click 5 maps the kinds onto the two project tracks of templates.html (build a demo / run an experiment). */
{
section('Research and papers');

st(`
  <h1 class="t">A research question, or a building project?</h1>
  <div class="label research-outcome"><b>By the end, you can</b> · tell a research question from a building project</div>
  <div class="question b" data-step="1">What kinds of questions are research?</div>
  <div class="research-kinds">
    <div class="research-kind b" data-step="2">
      <b>Theory</b><div class="label">How do we change the way these systems learn?</div>
      <div class="research-ex">
        <div class="research-shuf"><img src="assets/shuffle/coffee/intact.png" alt=""><span>→</span><img src="assets/shuffle/coffee/shuffled-8.png" alt=""></div>
        <div class="label research-exname">Earlier: texture, not shape?</div>
        <div class="label research-mute">Train on shape instead</div>
      </div>
    </div>
    <div class="research-kind b" data-step="3">
      <b>Limitations</b><div class="label">In which settings do these tools fail? Find new failures.</div>
      <div class="research-ex">
        <div class="research-bars">
          <div class="label">Four VLMs, average</div><div class="research-tr"><div style="width:58.07%"></div></div><div class="label">58.07%</div>
          <div class="label">Best model</div><div class="research-tr"><div style="width:77.84%"></div></div><div class="label">77.84%</div>
          <div class="label">People, expected</div><div class="research-tr"><div style="width:100%"></div></div><div class="label">100%</div>
        </div>
        <div class="label research-exname">Earlier: VLMs are blind</div>
        <div class="label research-mute">Do circles overlap? How many lines cross?</div>
      </div>
    </div>
    <div class="research-kind b" data-step="4">
      <b>Application</b><div class="label">What is a useful way to apply these tools?</div>
      <div class="research-ex">
        <div class="research-pipe"><span>Satellite images</span><i>↓</i><span>DINOv3 features</span><i>↓</i><span>Tree height, worldwide</span></div>
        <div class="label research-exname">Earlier: Canopy Height Maps</div>
        <div class="label research-mute">Meta and World Resources Institute</div>
      </div>
    </div>
  </div>
  <div class="research-tracks b" data-step="5">
    <div class="research-track" style="grid-column:1 / span 2"><b>Run an experiment</b> · answer with a measurement</div>
    <div class="research-track"><b>Build a demo</b> · someone can try it</div>
  </div>
  ${cite('Geirhos et al., ICLR 2019 · Rahmanzadehgervi et al., ACCV 2024 · Canopy Height Maps v2, Meta and WRI · Photo: Shixart1985, CC BY 2.0')}
  <style>
    .research-outcome{ color:var(--mute); } .research-outcome b{ color:var(--ink); }
    .research-kinds{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:2vw; }
    .research-kind{ border:2px solid var(--ink); border-radius:14px; padding:1.6vh 1.2vw; display:flex; flex-direction:column; gap:1vh; min-height:0; }
    .research-kind > b{ font-size:clamp(1.5rem, 2.4vw, 2.2rem); }
    .research-ex{ margin-top:auto; flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:flex-end; gap:.6vh;
      border-top:1px solid var(--line); padding-top:1.2vh; }
    .research-exname{ font-weight:700; }
    .research-mute{ color:var(--mute); font-size:clamp(.95rem, 1.3vw, 1.25rem); }
    .research-shuf{ flex:1 1 auto; min-height:0; display:flex; align-items:center; justify-content:center; gap:.8vw; }
    .research-shuf img{ height:min(13vh, 8vw); aspect-ratio:1; border-radius:6px; border:1px solid var(--line); }
    .research-shuf span, .research-pipe i{ color:var(--mute); font-style:normal; font-size:clamp(1.2rem, 2vw, 1.8rem); }
    .research-bars{ flex:1 1 auto; display:grid; grid-template-columns:auto 1fr auto; gap:.8vh .6vw; align-items:center; align-content:center; }
    .research-bars .label{ font-size:clamp(.85rem, 1.15vw, 1.1rem); }
    .research-tr{ height:2vh; background:#f1f5f9; border-radius:4px; overflow:hidden; }
    .research-tr > div{ height:100%; background:var(--ink); border-radius:4px; }
    .research-pipe{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:.1vh; }
    .research-pipe span{ border:1.5px solid var(--ink); border-radius:8px; padding:.2vh .7vw; font-size:clamp(.85rem, 1.15vw, 1.1rem); }
    .research-pipe i{ line-height:.9; font-size:clamp(.8rem, 1.1vw, 1rem); }
    .research-tracks{ display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:2vw; }
    .research-track{ text-align:center; padding:.8vh .6vw; border-top:4px solid var(--ink); font-size:clamp(1.05rem, 1.6vw, 1.45rem); }
  </style>
`, { notes: [
  "(draft) A research question, or a building project? By the end of this part, you can tell one from the other.",
  "(draft) What kinds of questions are research?",
  "(draft) Mathematical or theoretical: how do we change the way these systems learn? Training on images where texture is unreliable, so the network learns shape, is an example. You saw the problem earlier: shuffle the pieces of the coffee photo and the network stops saying espresso.",
  "(draft) Fully exploring a limitation, or finding new ones: in which settings do these tools fail? Vision language models are blind, and does object recognition work for everyone, are both papers of this kind. Remember the numbers: 58 percent on average, 78 for the best model, on questions a person gets right.",
  "(draft) Application: what is a useful way to apply these tools? Mapping tree height across the planet from satellite images is one.",
  "(draft) And this is how it maps onto your project. Building a useful application is the demo track; exploring or overcoming a limitation, and answering with a measurement, is the experiment track."
]});
}

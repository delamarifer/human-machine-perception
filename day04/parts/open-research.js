/* PART: open-research (Day 4). Owner: Fernanda. Goes right after `architecture`, at the end of Section 4.
   Added at Fernanda's request (2026-11-05): CNNs are still an open research topic. Two current McDermott-lab
   projects get a scene each (Griffith, Hess & McDermott 2025; Govindarajan, Alavilli & McDermott 2025, both
   bioRxiv preprints). Both scenes are drawn schematics, not data; every number on screen is quoted from the papers.
   The confidence scene (scenes/or-confidence.html) is listed in classification.js, right after
   'A probability is not a confidence', so students see softmax first. */
{
section('4. CNNs');

st(`
  <h1 class="t">Open research areas in CNNs</h1>
  <ul class="frag open-research-list" style="margin:auto 0">
    <li class="b"><b>Attention:</b> listening for one voice in a crowd <span class="open-research-who">→ Griffith, Hess &amp; McDermott (2025)</span></li>
    <li class="b"><b>Knowing what you don’t know:</b> calibrated confidence <span class="open-research-who">→ Govindarajan, Alavilli &amp; McDermott (2025), in Section 5</span></li>
    <li class="b"><b>Invariances people don’t share:</b> model metamers <span class="open-research-who">→ Feather et al. (2023)</span></li>
    <li class="b"><b>Why they generalize at all</b> <span class="open-research-who">→ “How do they even learn?” (Section 1)</span></li>
  </ul>
  ${cite('Griffith, Hess &amp; McDermott (2025), bioRxiv preprint, doi.org/10.1101/2025.05.28.656682 · Govindarajan, Alavilli &amp; McDermott (2025), bioRxiv preprint, doi.org/10.1101/2025.10.31.685933 · Feather, Leclerc, Mądry &amp; McDermott (2023), Nature Neuroscience')}
  <style>.open-research-who{ color:var(--mute); white-space:nowrap; }</style>
`, { notes: [
  "(draft) Title only. CNNs are not a finished story. Here are four questions people are working on right now, two of them in our own lab.",
  "(draft) First, attention. You can follow one voice at a noisy party. Can a CNN learn to do that, and does it then succeed and fail where people do? Ian Griffith built such a model; the next slide shows how.",
  "(draft) Second, knowing what you don't know. A standard classifier always gives an answer, and its softmax is not a confidence; we will see why in the next section. Lakshmi Govindarajan built models that report how uncertain they are, and compared them with people's confidence; we will look at her model right after that.",
  "(draft) Third, invariances people don't share. We just saw metamers: images a model treats as the same that people see as completely different. Feather and colleagues showed this across many models, and closing that gap is open.",
  "(draft) Fourth, why they generalize at all. This is the puzzle from Section 1, How do they even learn: networks with more parameters than examples still work on new data. There are partial answers, not a finished theory."
]});

sc('orAttention', 'scenes/or-attention.html');
}

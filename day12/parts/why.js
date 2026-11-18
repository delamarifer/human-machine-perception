/* PART: why (Day 12, owner: Shreya). Built 2026-11-18. Why do we do research, and who benefits?
   Sources: Deng et al., "ImageNet: A large-scale hierarchical image database", CVPR 2009; Krizhevsky, Sutskever and
   Hinton, "ImageNet classification with deep convolutional neural networks", NeurIPS 2012 (won ILSVRC 2012);
   Vaswani et al., "Attention is all you need", NeurIPS 2017 (Google); Jumper et al., Nature 2021 (AlphaFold 2);
   AlphaFold Protein Structure Database with EMBL-EBI (alphafold.ebi.ac.uk: over 200 million predictions);
   Nobel Prize in Chemistry 2024 (half to Hassabis and Jumper, half to Baker), nobelprize.org. No speaker notes. */
{
section('Why research');

d12Bul('Why do research?', [
  '<b>Curiosity:</b> how do we see? How does a robot learn to grasp?',
  '<b>To solve a problem</b> someone has: screening eyes where specialists are scarce',
  '<b>To build tools</b> others use: datasets, code, simulators',
  '<b>To train people:</b> every PhD becomes a researcher or engineer somewhere',
], 'Which of these did you name?');

d12Bul('Who benefits, and when?', [
  '<b>ImageNet</b> (academia, 2009): a dataset. In 2012, AlexNet won its challenge, and modern computer vision followed',
  '<b>The Transformer</b> (Google, 2017): one paper, now behind most large models',
  '<b>AlphaFold</b> (DeepMind): a free database of over 200 million predicted protein structures, with EMBL-EBI; Nobel Prize in Chemistry, 2024',
], 'The benefit often goes to people other than the authors, years later',
'Deng et al., CVPR 2009 · Krizhevsky et al., NeurIPS 2012 · Vaswani et al., NeurIPS 2017 · Jumper et al., Nature 2021 · alphafold.ebi.ac.uk · nobelprize.org');
}

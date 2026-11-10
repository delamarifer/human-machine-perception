# Figure sources for the metamers deep dive

Paper figures come from Feather, Leclerc, Mądry and McDermott (2023), Model metamers reveal divergent invariances between biological and artificial neural networks, Nature Neuroscience 26, 2017–2034. Open access, CC BY 4.0. https://doi.org/10.1038/s41593-023-01442-0 (figures downloaded from the article page).
Figures are unchanged except for cropping and file format. Crop boxes were found from the image with a script (whitespace gutters and tight ink boxes), not by eye. Each is credited on its slide.

| file | source |
|---|---|
| `bears-standard.jpg` | Fig. 4d, top row (standard training) with the column headers. |
| `bears-robust.jpg` | Fig. 4d, middle row (L2 adversarial training). |
| `bears-smooth.jpg` | Fig. 4f, the three image columns with their headers; the row labels are cut off and the slide caption names the rows. |
| `task.png` | Fig. 2b, the human recognition task. |
| `other-models.png` | Fig. 8e, human versus other-model recognition across 219 visual model stages (rho = 0.94); the panel title is cut off. |
| `ipcl-metamers.png` | Fig. 3d, IPCL and its supervised comparison. The panel letter "d" was painted white. |

The line charts on "People Agree" and "Trap: Deeper Is Harder" are plotted in the slide from the public human data in https://github.com/jenellefeather/model_metamers_pytorch (MIT licence), `VisionBehavioralExperiments/EXP4_ANALYSIS/VisionExperiment4_network_vs_humans_datamatrix_alexnet{,_l2_3_robust,_random_l2_3_perturb}_public.mat`: mean of `participant_data_matrix[:, :, 0]` over the 20 participants, with s.e.m. They match Fig. 4c of the paper.

The diagram on "The Idea: Look Inside" and the layer boxes on "Look Below the Matched Layer" are drawn by us; they are diagrams, not data.

The sketches on "Examples of What to Report" and "Example: One Dot Is One Condition" are drawings, not data.

# Figure sources for the tennis and signs deep dive

Figures are unchanged except for cropping and file format. Crops were found from the image (whitespace bands or marker colors). `thetis-3d.jpg` is also enlarged 2x.
Paper figures come from each paper's arXiv source. THETIS frames come from the public dataset repository. Each paper keeps its own copyright, and each is credited on its slide.

| file | source |
|---|---|
| `thetis-modalities.jpg` | Gourgari, Goudelis, Karpouzis, Kollias (2013), THETIS, CVPR Workshops, Figure 3. https://github.com/THETIS-dataset/dataset |
| `thetis-2d.jpg`, `thetis-3d.jpg` | THETIS repository, `VIDEO_Skelet2D` and `VIDEO_Skelet3D`, `flat_service/p10_serflat_skelet*_s2.avi`, frame at 40% of the clip |
| `stgcn-pipeline.jpg` | Yan, Xiong, Lin (2018), ST-GCN, AAAI, pipeline figure. https://arxiv.org/abs/1801.07455 |
| `flow-points.png` | Han, Wang, Zhang (2024), Flow Snapshot Neurons in Action, intro figure. https://arxiv.org/abs/2405.16493 |
| `body-vs-hand.png` | Shamil et al. (2024), On the Utility of 3D Hand Poses for Action Recognition. https://arxiv.org/abs/2403.09805 |
| `pose-ntu-2d.jpg`, `pose-gym-2d.jpg`, `pose-ntu-3d.jpg`, `pose-gym-3d.jpg` | Duan et al. (2022), Revisiting Skeleton-based Action Recognition (PoseC3D), CVPR, Figure 1. https://arxiv.org/abs/2104.13586 |
| `motion-finetune.png` | Zhu et al. (2023), MotionBERT, ICCV, "II. Finetune" half of the pipeline figure. https://arxiv.org/abs/2210.06551 |
| `hand-face-photo.jpg`, `hand-face-pose.png`, `hand-frames-box.png` | Moryossef et al. (2021), Evaluating the Immediate Applicability of Pose Estimation for Sign Language Recognition, CVPR Workshops. https://arxiv.org/abs/2104.10166 |
| `sign-depth-avoid-behind.jpg` | Lee, Oh, Lee (2023), Human Part-wise 3D Motion Context Learning for Sign Language Recognition (P3D), ICCV, Figure 1. https://arxiv.org/abs/2308.09305 |

## Numbers on the slides

- 55 players, 12 strokes, 31 beginners, 24 experts, 1,217 of 1,980 skeleton videos: THETIS README.
- 3D 63.70 vs 2D 58.92: Shamil et al. (2024), table "Impact of using 2D vs. 3D poses" (HandFormer-B/6, verbs, Assembly101).
- 2D 92.0 vs lifted 3D 90.2 (FineGYM): Duan et al. (2022), supplementary tables (HRNet-2D; VideoLift).
- 85.13% vs 79.78%: Moryossef et al. (2021), section on presence or absence of hand pose.
- CASL-W60 has 60 signs: Wanchi et al. (2026), TransSLR.
- 60.24 (2D positions), 41.09 (3D positions), 72.87 (3D joint angles) on WLASL 100, and 35.99, 31.69, 38.60 on WLASL 2000: Lee et al. (2023), per-instance top-1, ablation table on input pose representations.
- MediaPipe depth described as unreliable: Roh et al. (2024), Preprocessing Mediapipe Keypoints with Keypoint Reconstruction and Anchors for Isolated Sign Language Recognition, sign-lang workshop. https://aclanthology.org/2024.signlang-1.36.pdf

The bar and grid figures on the "Examples" slides are drawings made for this deck. They are not data.

# Images used by the `levels` part of Day 11

Every file here is freely licensed. **No figure of Malik's is used**, and nothing here comes from his slides
or his course PDFs. Each image is used unmodified except for a downscale (longest edge 1100–1500 px) and JPEG
recompression, which is why the two Blausen illustrations are `.jpg` here although Commons serves them as
`.png`; **nothing is cropped**, so the files are the authors' own framing. Where the licence requires
attribution, the author and licence are printed in the **citation line of the slide the image appears on**.
They sat under each image until round 2, when this part was cut to the on-screen word budget: an attribution
is a credit, not a cue, and the budget counts every word a reader has to read. Nothing was weakened by the
move — every CC BY and CC BY-SA image still names its author and licence on the same slide.

| File | Slide | Source | Author | Licence |
|---|---|---|---|---|
| `egg-crack.jpg` | 3, the omelette | [Cracking an egg in a kitchen](https://commons.wikimedia.org/wiki/File:Cracking_an_egg_in_a_kitchen.jpg) | Shixart1985 | CC BY 2.0 |
| `sugar-cubes.jpg` | 5, "pick up" | [Sugar cubes](https://commons.wikimedia.org/wiki/File:Sugar_cubes.jpg) | Uwe Hermann | CC BY-SA 3.0 |
| `tray-waiter.jpg` | 5, "pick up" | [Serving coffee in a cafe during the morning hours with a waiter carrying a tray of drinks for customers](https://commons.wikimedia.org/wiki/File:Serving_coffee_in_a_cafe_during_the_morning_hours_with_a_waiter_carrying_a_tray_of_drinks_for_customers.jpg) | Shixart1985 | CC BY 2.0 |
| `skin-merkel.jpg` | 7, the skin | [Blausen 0805 Skin MerkelCell](https://commons.wikimedia.org/wiki/File:Blausen_0805_Skin_MerkelCell.png) | BruceBlaus (Blausen.com staff, 2014) | CC BY 3.0 |
| `skin-meissner.jpg` | 7, the skin | [Blausen 0808 Skin TactileCorpuscle](https://commons.wikimedia.org/wiki/File:Blausen_0808_Skin_TactileCorpuscle.png) | BruceBlaus (Blausen.com staff, 2014) | CC BY 3.0 |
| `gripper-jaw.jpg` | 8, the credo | [Baxter robot's gripper](https://commons.wikimedia.org/wiki/File:Baxter_robot%27s_gripper.JPG) | Gustavo A. Casañ | CC BY-SA 4.0 |
| `hand-bulb.jpg` | 8, the credo | [Shadow Hand Bulb large](https://commons.wikimedia.org/wiki/File:Shadow_Hand_Bulb_large.jpg) | Richard Greenhill and Hugo Elias, Shadow Robot Company | CC BY-SA 3.0 |

## Notes on two of them

**`skin-meissner.jpg`** is titled *Tactile Corpuscle* by its author. A tactile corpuscle **is** a Meissner
corpuscle; the slide says both names so nobody has to take that on trust.

**`gripper-jaw.jpg`** is a Baxter (Rethink Robotics), which is the ordinary two-finger parallel-jaw gripper
Malik is arguing against. It is a real lab photograph rather than a render, which is why it was chosen over
[Pneumatic Gripper Arm](https://commons.wikimedia.org/wiki/File:Pneumatic_Gripper_Arm.jpg) (CC0), a 3D model
in which the jaws are too small to read from the back of a room. Naming the robot is not a criticism of
Rethink Robotics; it is the standard end effector, which is the whole point.

## Drawn here, not photographed

The hierarchy stack (slide 2), the journey diagram (slide 1), the equation (slide 4) and the **grip force
and load force plot (slide 6)** are inline SVG written in `parts/levels.js`.

The grip-force plot is a **schematic**, and the slide says so on its own face. It is drawn to show the shape
of the relationship — grip force rising with load force and staying above the force at which the object would
slip — and **no axis carries a number**, because no measurement of ours is behind it. The real measurements
are in Johansson and Flanagan, "Coding and use of tactile signals from the fingertips in object manipulation
tasks", *Nature Reviews Neuroscience* 10 (2009), which is cited on the slide. That paper is not open access,
which is why we drew the shape rather than reproducing a figure.

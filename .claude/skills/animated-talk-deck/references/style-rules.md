# Style rules, with where each one came from

These came in "rounds": the speaker, the advisor or the committee reacted to the deck, and the
coordinator turned each reaction into a rule for every part. Keep your own rounds in
`feedback/_deck-wide.md` the same way (date, who said it, their words, the rule, what was done
centrally). Apply a rule once in `deck.css` or `engine.js` whenever you can, instead of asking
15 sessions to make the same edit.

## Structure of a slide

| Rule | Why |
|---|---|
| **Title first**: the slide opens on its title alone; the first click brings the content in, animated. | The speaker wanted to introduce each slide before the audience starts reading it. |
| **White lead-in** before every new slide (engine option, `?blank=0` to turn off). Not on continuation slides, not on slides that must stay visually continuous (e.g. a brain that stays on screen across a sequence). | "A white screen before the title so I can talk and lean into it before the slide begins." |
| **One idea per click.** Every motion that introduces new content is its own click. Small staggers inside one visual element (bars of one chart) are fine. | Automatic motion ran ahead of the speaker during practice. |
| **Slower motion** (about 1.5x the first draft) and fewer things per click. | Practice talk: "the animations were faster than speech." |
| **One thing at a time**: when text appears over a figure, dim or blur the figure. | The audience can't read and watch motion at once. |
| **New content gets a new slide number.** If the screen changes to entirely new content, split it (a scene can be shown as two slides with `?from=&to=` beat ranges). | Feedback by slide number only works if a number means one screen. |
| **Slide numbers are whole numbers**; slides that continue one thing get letters (3A, 3B). | "Click 14.3" numbering confused everyone; whole numbers matched the speaker's outline. |

## Text

| Rule | Why |
|---|---|
| **Cues, not sentences.** Labels, short keywords, the slide's one statement. The explanation goes in the notes. | "I can just explain this out loud... just cues and animations that remind me what to say." |
| **Everything on the slide is said aloud.** | The advisor's slide=script principle. |
| **Wording close to the paper**, precise and qualified. No punchy fragments ("standard fails, robust holds"), no em dashes on screen. | The advisor: the text "feels Claude-generated; could be more scientific/precise." |
| **Observer-level language** if it fits your field: "listeners hear", "cortex responds", not "the brain does X". | The lab's convention; worth agreeing on one up front. |
| **One type scale**: title, statement, body, label, citation, pop-up quote. Classes in `deck.css`; no ad-hoc sizes; no full sentence below body size. | Random small bullets "just sitting around being smaller." |
| **Text 1.5x bigger than you think.** | Practice talk in a real room. |
| **Questions look like questions** (their own style), and **pop-up statements over a figure** are large, bold, on a soft white glow. | Both got lost against busy figures. |
| **No colored words.** Color is for data only; a word naming a colored series stays black with a small swatch next to it. | Colored text read as decoration and clashed with the data colors. |
| **Citations readable**: about 1.3vw, black, bottom-left. | "Citations need to be bigger, all across the presentation." |
| **Decide up front how to cite your own work.** This speaker chose never to cite herself on screen. | "Please don't cite myself anywhere. Please, please, please." |
| **Names spelled exactly as the person writes them** (capitalization included). | A name capitalized wrong in a byline is the first thing a committee sees. |

## Figures and data

| Rule | Why |
|---|---|
| **Never invent data.** Every number, map and example comes from a real file; a schematic is labeled as one in the notes; never put made-up values on a colorbar. | The fastest way to lose a committee's trust. |
| **Never restyle real data** (colorbars, published figures). | They are evidence, not decoration. |
| **Use the paper's current figure**, not an older version, and check numbers against the latest draft. | One slide showed a superseded figure panel; a claim said "all six" where the paper said "four of six." |
| **Detect coordinates from the image** (whitespace bands, marker colors with PIL), never by eye. | Eyeballed covers drifted off their panels. |
| **Illustrator or source files are authoritative** over rebuilt figures; check before regenerating anything. | Hand edits in the .ai files were not in the build scripts. |
| **Recurring visuals stay put**: if a figure (e.g. a brain) stays on screen across slides, fix its box geometry in a shared CSS file and a written contract that names the owner. | Otherwise it jumps between slides. |
| **A recurring visual only where it belongs.** | A brain on conceptual slides "kind of feels random." |

## Notes (the presenter script)

| Rule | Why |
|---|---|
| **One passage per click**, split with `[click]` (or an array). Passage 0 is the title. | The presenter highlights the passage for the current click; a mismatch puts the speaker out of sync mid-talk. |
| **Text removed from the screen moves into the notes.** Nothing is lost. | Lets you cut slide text aggressively. |
| **The speaker's own wording is sacred.** Paste it verbatim; don't "fix" pronoun mixes or style; ask before suggesting changes. | Their voice, especially in acknowledgements. |
| **Mark draft passages** (e.g. a `[new]` tag rendered in red) so the speaker sees what they haven't approved yet. | Distinguishes new text from rehearsed text. |

/* PART: writeup (Final presentations, owner: Shreya), 2026-11-16. The five write-up parts and weights from templates.html
   #writeup. One write-up for everyone (Shreya, 2026-11-16: no separate tracks). One row per click. No speaker notes. */
{
section('Write-up');

const PR_WRITE = [
  ['Problem and motivation', 'Your question or problem, what was known, and what you expected', 15],
  ['Method', 'Your setup: data, models, what you measured. Enough that a classmate could redo it', 25],
  ['Results and evaluation', 'The main figure with numbers, examples, and one comparison that rules out a boring explanation', 25],
  ['Limitations and failure cases', 'Failures with your explanation; what it is meant for, not for, and who it may work worse for', 20],
  ['Clarity', 'Readable, labeled figures, credit for everything you did not make', 15],
];
st(`
  <h1 class="t">The write-up has five parts</h1>
  <div class="pr-col">
    <table class="pr-tbl">
      <tr><th>Part</th><th>In one line</th><th></th><th class="pr-num">Weight</th></tr>
      ${PR_WRITE.map(([p, w, n]) => `<tr class="b"><td>${p}</td><td>${w}</td><td style="width:18%"><div class="pr-bar" style="width:${n / 25 * 100}%"></div></td><td class="pr-num">${n}%</td></tr>`).join('')}
    </table>
  </div>
`);

}

/* ==========================================================================
   Course site components. Each one is a function that takes data from
   site/course.js and returns HTML. Pages mark where each goes with
   data-render="…" and call Site.render() once.

     SiteNav(active)            the main navigation bar
     ResourceLink(link)         one link to slides, notes, Colab, a form…
     KindLabel(kind)            LECTURE · HANDS-ON LAB · READING · HOMEWORK · PROJECT
     DailyLesson(day, opts)     one collapsible day of the schedule
     AssignmentItem(a, opts)    one assignment, project step or homework
     ProjectBrief(project)      what the final project asks for

   Text in course.js is written by the instructors and may contain links,
   so it is inserted as HTML.
   ========================================================================== */
(function () {
  const C = window.COURSE;

  const KINDS = { lecture: 'Lecture', lab: 'Hands-on lab', reading: 'Reading', homework: 'Homework',
                  project: 'Project', response: 'In-class response', assignment: 'Assignment' };
  const isExternal = href => /^https?:\/\//.test(href);
  const attr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');

  /* --------------------------------------------------------- basics --- */
  function ResourceLink(l, cls = '') {
    const ext = isExternal(l.href);
    return `<a class="rlink rlink-${l.type || 'page'} ${cls}" href="${attr(l.href)}">${l.label}` +
      (ext ? `<span class="ext" aria-hidden="true">↗</span><span class="sr-only"> (external site)</span>` : '') + `</a>`;
  }
  const KindLabel = kind => `<span class="kind kind-${kind}">${KINDS[kind] || kind}</span>`;

  /* Status comes from a posted deadline only, never from student progress. */
  function status(a, now = new Date()) {
    if (!a.due) return { key: 'open', text: a.dueText || 'No due date posted' };
    const deadline = a.due.length === 10 ? new Date(a.due + 'T23:59:59') : new Date(a.due);
    return now > deadline ? { key: 'past', text: 'Deadline passed', due: a.dueText }
                          : { key: 'upcoming', text: a.dueText, due: a.dueText };
  }
  const StatusChip = s => `<span class="status-chip status-${s.key}">${s.key === 'past' ? `${s.due} · deadline passed` : s.text}</span>`;

  /* A day whose title is the placeholder reads as one, in grey italic. */
  const isMissing = day => day.title === 'Slides Not Posted Yet';
  const latestDay = () => C.days.reduce((a, d) => (d.n > a.n ? d : a), C.days[0]);
  const findAssignment = id => C.assignments.find(a => a.id === id) || C.project.steps.find(a => a.id === id);

  /* ---------------------------------------------------------- nav --- */
  const NAV = [
    ['home', 'Home', 'index.html'], ['syllabus', 'Syllabus', 'syllabus.html'], ['schedule', 'Schedule', 'schedule.html'],
    ['assignments', 'Assignments &amp; Projects', 'assignments.html'],
  ];
  function SiteNav(active, base = '') {
    return `<nav class="sitenav" aria-label="Course"><div class="sitenav-in">
      <a class="sitenav-brand" href="${base}index.html"><b>Visual Perception</b><span>Human &amp; machine perception</span></a>
      <ul>${NAV.filter(([k]) => k !== 'home').map(([k, label, href]) =>
        `<li><a href="${base}${href}"${k === active ? ' aria-current="page"' : ''}>${label}</a></li>`).join('')}</ul>
    </div></nav>`;
  }

  /* --------------------------------------------------- DailyLesson --- */
  function LessonItem(item) {
    const a = item.assignment ? findAssignment(item.assignment) : null;
    const s = a ? status(a) : null;
    const links = (item.links || []).map(l => ResourceLink(l));
    if (a && a.submit) links.push(ResourceLink({ ...a.submit, type: 'form' }, s.key === 'past' ? '' : 'rlink-submit'));
    const optional = item.optional ? `<details class="optional"><summary>Optional reading</summary><ul>${item.optional.map(o =>
      `<li><a href="${attr(o.href)}">${o.title}</a> <span class="muted">${o.text}</span>${(o.more || []).map(m => ` · <a href="${attr(m.href)}">${m.label}</a>`).join('')}</li>`).join('')}</ul></details>` : '';
    return `<li class="lesson-item item-${item.kind}">
      <div class="lesson-item-label">${KindLabel(item.kind)}${item.note ? `<span class="item-note">${item.note}</span>` : ''}</div>
      <div class="lesson-item-main">
        <h4${item.missing ? ' class="is-missing"' : ''}>${item.title}</h4>
        ${item.text ? `<p>${item.text}</p>` : ''}
        ${s && a.dueText ? `<p class="item-due">${StatusChip(s)}</p>` : ''}
        ${links.length ? `<p class="links">${links.join('')}</p>` : ''}
        ${optional}
      </div></li>`;
  }
  function DailyLesson(day, { open = false, current = false, date } = {}) {
    const d = date || day.date;
    return `<details class="lesson${current ? ' is-current' : ''}" id="day-${day.n}"${open ? ' open' : ''}>
      <summary class="lesson-head">
        <span class="lesson-num" aria-hidden="true"><small>Day</small>${String(day.n).padStart(2, '0')}</span>
        <span class="lesson-titles">
          <span class="lesson-meta"><span class="sr-only">Day ${day.n}. </span>${current ? '<span class="badge-current">Most recent</span>' : ''}${d ? `<time>${d}</time>` : ''}</span>
          <span class="lesson-title${isMissing(day) ? ' is-missing' : ''}">${day.title}</span>
          <span class="lesson-desc">${day.description || ''}</span>
        </span>
        <span class="lesson-chev" aria-hidden="true"></span>
      </summary>
      <ul class="lesson-body">${day.items.map(LessonItem).join('')}</ul>
    </details>`;
  }

  /* ------------------------------------------------ AssignmentItem --- */
  function AssignmentItem(a, { kind = 'homework' } = {}) {
    const s = status(a);
    kind = a.kind || kind;
    const res = [];
    if (a.instructions) res.push(ResourceLink({ ...a.instructions, type: 'page' }));
    if (a.instructions2) res.push(ResourceLink({ ...a.instructions2, type: 'notes' }));
    if (a.starter) res.push(ResourceLink({ ...a.starter, type: /colab/.test(a.starter.href) ? 'colab' : 'doc' }));
    if (a.starter2) res.push(ResourceLink({ ...a.starter2, type: 'colab' }));
    (a.readings || []).forEach(r => res.push(ResourceLink({ ...r, type: 'paper' })));
    if (a.day) res.push(ResourceLink({ label: `Day ${a.day} materials`, href: `schedule.html#day-${a.day}`, type: 'page' }));
    return `<article class="assignment status-${s.key}" id="${a.id}">
      <div class="assignment-head">
        <p class="assignment-meta">${KindLabel(kind)}${a.weight ? `<span class="weight">${a.weight} of grade</span>` : ''}</p>
        <h3>${a.title}</h3>
        <p class="assignment-desc">${a.description || ''}</p>
        ${a.submitNote ? `<p class="assignment-note">${a.submitNote}</p>` : ''}
        ${res.length ? `<p class="links">${res.join('')}</p>` : ''}
      </div>
      <div class="assignment-side">
        <p class="assignment-due"><small>Due</small>${s.key === 'past' ? `<span>${a.dueText}</span>` : `<span>${a.dueText || 'No due date posted'}</span>`}</p>
        ${s.key === 'past' ? '<p class="status-chip status-past">Deadline passed</p>' : ''}
        ${a.submit ? ResourceLink({ ...a.submit, type: 'form' }, s.key === 'past' ? 'btn-secondary' : 'btn-primary') : ''}
      </div>
    </article>`;
  }

  /* ------------------------------------------------ SubmissionRow --- */
  /* One compact row: what it is, when it was due, and its links (submit last). */
  function SubmissionRow(a, { n } = {}) {
    /* Collapsed: title, weight and due date. Open: what to do and every link (submit last). */
    const s = status(a);
    const links = [];
    if (a.instructions) links.push(ResourceLink({ ...a.instructions, type: 'page' }));
    if (a.instructions2) links.push(ResourceLink({ ...a.instructions2, type: 'notes' }));
    if (a.starter) links.push(ResourceLink({ ...a.starter, type: /colab/.test(a.starter.href) ? 'colab' : 'doc' }));
    if (a.starter2) links.push(ResourceLink({ ...a.starter2, type: 'colab' }));
    (a.readings || []).forEach(r => links.push(ResourceLink({ ...r, type: 'paper' })));
    if (a.day) links.push(ResourceLink({ label: `Day ${a.day} materials`, href: `schedule.html#day-${a.day}`, type: 'page' }));
    if (a.submit) links.push(ResourceLink({ ...a.submit, type: 'form' }, s.key === 'past' ? '' : 'rlink-submit'));
    return `<li class="sub-row st-${s.key}"><details${a.id ? ` id="${a.id}"` : ''}>
      <summary class="sub-head">
        ${n ? `<span class="sub-num" aria-hidden="true">${n}</span>` : ''}
        <span class="sub-title"><h3>${a.title}${a.weight ? `<span class="weight">${a.weight}</span>` : ''}</h3></span>
        <span class="sub-due"><small>Due</small><span>${a.dueText || 'No date posted'}</span>${s.key === 'past' ? '<em>Deadline passed</em>' : ''}</span>
        <span class="lesson-chev" aria-hidden="true"></span>
      </summary>
      <div class="sub-body">
        ${a.description ? `<p>${a.description}</p>` : ''}
        ${a.submitNote ? `<p class="assignment-note">${a.submitNote}</p>` : ''}
        ${links.length ? `<p class="links">${links.join('')}</p>` : ''}
      </div>
    </details></li>`;
  }

  /* -------------------------------------------------- ProjectBrief --- */
  function ProjectBrief(p) {
    return `<div class="brief">
      <p class="brief-summary">${p.summary}</p>
      <dl>${p.brief.map(b => `<div class="brief-row"><dt>${b.label}</dt><dd>${b.text}</dd></div>`).join('')}</dl>
      <details class="optional"><summary>Possible directions</summary><ul>${p.directions.map(d => `<li>${d}</li>`).join('')}</ul></details>
    </div>`;
  }

  /* ------------------------------------------------- page sections --- */
  const R = {
    nav: el => SiteNav(el.dataset.active, el.dataset.base || ''),

    /* schedule.html */
    schedule() {
      const cur = latestDay();
      const target = (location.hash.match(/^#day-(\d+)$/) || [])[1];
      return C.days.map(d => DailyLesson(d, { current: d === cur, open: target ? +target === d.n : d === cur })).join('');
    },

    /* assignments.html: three sections, each in date order */
    gradedAssignments: () => ['a1', 'a2'].map(id => SubmissionRow(C.assignments.find(a => a.id === id))).join(''),
    projectBrief: () => ProjectBrief(C.project),
    projectSteps() {
      const order = ['p-idea', 'p-proposal', 'p-talk', 'p-writeup', 'p-submit'];
      return order.map((id, i) => SubmissionRow(C.project.steps.find(x => x.id === id), { n: i + 1 })).join('');
    },
    homework() {
      /* Every homework, lab and in-class form, by day: an assignment when the day has one, else the form itself. */
      const rows = [];
      C.days.forEach(d => d.items.forEach(i => {
        const a = i.assignment && C.assignments.find(x => x.id === i.assignment);
        if (a) rows.push(SubmissionRow(a));
        else (i.links || []).filter(l => l.type === 'form').forEach(l =>
          rows.push(SubmissionRow({ title: `Day ${d.n} ${i.kind === 'response' ? 'Opening Question' : i.title}`, day: d.n,
            description: i.kind === 'response' ? i.title.replace(/^Opening Question: /, '') : (i.text || ''), submit: { label: l.label, href: l.href } })));
      }));
      return rows.join('');
    },

    /* index.html */
    now() {
      const n = C.now;
      return `<p class="now-label"><span class="kind kind-project">${n.label}</span></p>
        <h2 class="now-title">${n.title}</h2>
        <p class="now-text">${n.text}</p>
        <p class="now-actions">${n.actions.map(l => ResourceLink(l, l.primary ? 'btn-primary' : '')).join('')}</p>
        <p class="now-source">${n.source}</p>`;
    },
    latestDay() {
      const d = latestDay();
      return `<p class="label">Most recent day on the site</p>
        <h3><a href="schedule.html#day-${d.n}">Day ${d.n} · ${d.title}</a></h3>
        <ul class="mini-items">${d.items.map(i => `<li>${KindLabel(i.kind)}<span>${i.title}</span><span class="links">${(i.links || []).map(l => ResourceLink(l)).join('')}${i.assignment && findAssignment(i.assignment)?.submit ? ResourceLink({ ...findAssignment(i.assignment).submit, type: 'form' }, 'rlink-submit') : ''}</span></li>`).join('')}</ul>`;
    },
    announcements() {
      return C.announcements.map(a => `<li class="announcement">
        <p class="announcement-meta"><time>${a.date}</time><span>${a.label}</span></p>
        <h3>${a.title}</h3><p>${a.text}</p>
        <p class="links">${a.links.map(l => ResourceLink(l)).join('')}</p></li>`).join('');
    },
    preview() {
      const cur = latestDay();
      return C.days.map(d => `<li${d === cur ? ' class="is-current"' : ''}><a href="schedule.html#day-${d.n}">
        <span class="pv-num">${String(d.n).padStart(2, '0')}</span>
        <span class="pv-title${isMissing(d) ? ' is-missing' : ''}">${d.title}${d === cur ? '<span class="badge-current">Most recent</span>' : ''}</span></a></li>`).join('');
    },
    instructors() {
      return C.instructors.map(p => `<div class="person"><p><b>${p.name}</b> <a href="mailto:${p.email}">${p.email}</a></p>${p.lines.map(l => `<p>${l}</p>`).join('')}</div>`).join('');
    },

  };

  function render(root = document) {
    root.querySelectorAll('[data-render]').forEach(el => {
      const fn = R[el.dataset.render];
      if (fn) el.innerHTML = fn(el);
    });
    /* Sort toggles: <button data-sort="#list" data-labels="Newest first|Oldest first">.
       Each click reverses the list and shows the order it is now in. */
    root.querySelectorAll('[data-sort]').forEach(b => {
      const list = document.querySelector(b.dataset.sort);
      const [first, second] = b.dataset.labels.split('|');
      const show = flipped => { b.innerHTML = `<span class="sort-arrow" aria-hidden="true">${flipped ? '↑' : '↓'}</span>${flipped ? second : first}`;
        b.setAttribute('aria-label', `Sorted ${flipped ? second : first}. Change the order.`); b.setAttribute('aria-pressed', flipped); };
      let flipped = false; show(flipped);
      b.addEventListener('click', () => { [...list.children].reverse().forEach(c => list.appendChild(c)); flipped = !flipped; show(flipped); });
    });
    /* Opening a #day-N link opens that day. */
    const openHash = () => {
      const t = location.hash && document.getElementById(location.hash.slice(1));
      if (t && t.tagName === 'DETAILS') { t.open = true; t.scrollIntoView(); }
    };
    window.addEventListener('hashchange', openHash);
    if (location.hash) requestAnimationFrame(openHash);
  }

  window.Site = { render, status, components: { SiteNav, ResourceLink, KindLabel, DailyLesson, AssignmentItem, SubmissionRow, ProjectBrief } };
})();

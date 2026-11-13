/* Project deep dive: an offline assistant that shows where an object was last seen. Its own deck, not part of any day. One part file, one session.
   Avoid apostrophes inside the strings. */
const ORDER = [
  ['object-memory', 'Deep dive: where did I last see my object?'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (only sets the widths in the progress bar). A guess. */
const SEC_MINUTES = {
  'Object Memory': 18,
};

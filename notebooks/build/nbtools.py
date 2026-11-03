"""Shared tools for the notebook build scripts in this folder.

A build script describes its cells with md(), code(), hidden(), turn() and answer(), then calls
main(FILE). With main(FILE, private_solutions=True):
- `python3 notebooks/build/<script>.py` writes the student notebook, notebooks/<FILE>, with outputs
  cleared and no solutions in it (the repository is public);
- `python3 notebooks/build/<script>.py --teacher` writes the teacher copy, with every solution under
  a "Solution" heading right below its exercise, to notebooks/teacher/ (git-ignored, never committed);
- `python3 notebooks/build/<script>.py --solved out.ipynb` writes a copy with every "Your turn" cell
  replaced by its solution, to check that the solutions run too.
Without private_solutions (older notebooks), the student notebook shows each solution in a collapsed
"Show a solution" block, and --teacher is not available.
"""
import os
import sys
import nbformat as nbf

REPO = 'delamarifer/human-machine-perception'
NOTEBOOKS = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEACHER_DIR = os.path.join(NOTEBOOKS, 'teacher')
cells = []   # (kind, source, solution or None, hidden); kind 'answer' is a teacher-only markdown cell


def badge(file):
    url = f'https://colab.research.google.com/github/{REPO}/blob/main/notebooks/{file}'
    return f'[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)]({url})'


def md(s):
    cells.append(('md', s.strip(), None, False))


def code(s):
    cells.append(('code', s.strip(), None, False))


def hidden(s):
    """A code cell shown collapsed in Colab (helper code students run but don't need to read)."""
    cells.append(('code', s.strip(), None, True))


def turn(s, solution):
    """A "Your turn" code cell. It must run without errors when left blank."""
    cells.append(('code', s.strip(), solution.strip(), False))


def answer(s):
    """The answer to a talk-it-over "Your turn" (markdown). Only the teacher copy shows it."""
    cells.append(('answer', s.strip(), None, False))


def build(mode='student', private_solutions=False):
    """mode: 'student' (no solutions), 'teacher' (solutions below each exercise), 'solved' (for testing)."""
    nb = nbf.v4.new_notebook()
    if mode == 'teacher':
        nb.cells.append(nbf.v4.new_markdown_cell(
            '**Teacher copy, with solutions. Do not share it with students or commit it to the course '
            'repository.**'))
    for kind, src, sol, hide in cells:
        if kind == 'md':
            nb.cells.append(nbf.v4.new_markdown_cell(src))
        elif kind == 'answer':
            if mode == 'teacher':
                nb.cells.append(nbf.v4.new_markdown_cell('#### Solution\n\n' + src))
            elif not private_solutions:
                nb.cells.append(nbf.v4.new_markdown_cell(
                    '<details><summary><b>Show an answer</b> (try it yourself first)</summary>\n\n'
                    + src + '\n\n</details>'))
        else:
            cell = nbf.v4.new_code_cell(sol if (mode == 'solved' and sol) else src)
            if hide:
                cell.metadata['cellView'] = 'form'
            nb.cells.append(cell)
            if sol and mode == 'teacher':
                nb.cells.append(nbf.v4.new_markdown_cell('#### Solution'))
                nb.cells.append(nbf.v4.new_code_cell(sol))
            elif sol and mode == 'student' and not private_solutions:
                nb.cells.append(nbf.v4.new_markdown_cell(
                    '<details><summary><b>Show a solution</b> (try it yourself first)</summary>\n\n'
                    '```python\n' + sol + '\n```\n\n</details>'))
    nb.metadata = {
        'kernelspec': {'name': 'python3', 'display_name': 'Python 3', 'language': 'python'},
        'language_info': {'name': 'python'},
        'colab': {'provenance': [], 'toc_visible': True},
    }
    return nb


def main(file, private_solutions=False):
    args = sys.argv[1:]
    if len(args) == 2 and args[0] == '--solved':
        nbf.write(build('solved', private_solutions), args[1])
    elif args == ['--teacher']:
        if not private_solutions:
            sys.exit('this notebook still shows its solutions in the student copy; no teacher copy needed')
        os.makedirs(TEACHER_DIR, exist_ok=True)
        out = os.path.join(TEACHER_DIR, file.replace('.ipynb', '-teacher.ipynb'))
        nbf.write(build('teacher', private_solutions), out)
        print('wrote', out)
    else:
        out = os.path.join(NOTEBOOKS, file)
        nbf.write(build('student', private_solutions), out)
        print('wrote', out)

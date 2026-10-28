"""Shared tools for the notebook build scripts in this folder.

A build script describes its cells with md(), code(), hidden() and turn(), then calls main(FILE).
`python3 notebooks/build/<script>.py` writes notebooks/<FILE> with outputs cleared;
`python3 notebooks/build/<script>.py --solved out.ipynb` writes a copy with every "Your turn" cell
replaced by its solution, to check that the solutions run too.
"""
import os
import sys
import nbformat as nbf

REPO = 'delamarifer/human-machine-perception'
cells = []   # (kind, source, solution or None, hidden)


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
    """A "Your turn" code cell. It must run without errors when left blank; the solution is shown
    in a collapsed block right after it."""
    cells.append(('code', s.strip(), solution.strip(), False))
    cells.append(('md', '<details><summary><b>Show a solution</b> (try it yourself first)</summary>\n\n'
                  '```python\n' + solution.strip() + '\n```\n\n</details>', None, False))


def build(solved=False):
    nb = nbf.v4.new_notebook()
    for kind, src, sol, hide in cells:
        if kind == 'md':
            nb.cells.append(nbf.v4.new_markdown_cell(src))
        else:
            cell = nbf.v4.new_code_cell(sol if (solved and sol) else src)
            if hide:
                cell.metadata['cellView'] = 'form'
            nb.cells.append(cell)
    nb.metadata = {
        'kernelspec': {'name': 'python3', 'display_name': 'Python 3', 'language': 'python'},
        'language_info': {'name': 'python'},
        'colab': {'provenance': [], 'toc_visible': True},
    }
    return nb


def main(file):
    if len(sys.argv) == 3 and sys.argv[1] == '--solved':
        nbf.write(build(solved=True), sys.argv[2])
    else:
        out = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), file)
        nbf.write(build(), out)
        print('wrote', out)

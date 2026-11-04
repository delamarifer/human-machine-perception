"""Build the Day 3 lab, notebooks/day03-lab.ipynb.

Part 1 is the metamers lab. Part 2 is the image-filtering lab.

    python3 notebooks/build/day03_lab.py

Pass the instructor copies to also write those:

    python3 notebooks/build/day03_lab.py \
        --instructor-metamers ../human-machine-perception-instructors/notebooks/instructor/day03-lab-metamers-instructor.ipynb \
        --instructor-filtering ../human-machine-perception-instructors/notebooks/instructor/day03-lab2-image-filtering-instructor.ipynb \
        --out-instructor ../human-machine-perception-instructors/notebooks/instructor/day03-lab-instructor.ipynb \
        --out-student-private ../human-machine-perception-instructors/notebooks/student/day03-lab-student.ipynb
"""
import argparse
from pathlib import Path

import nbformat as nbf

HERE = Path(__file__).resolve().parent
NOTEBOOKS = HERE.parent
PUBLIC = "https://colab.research.google.com/github/delamarifer/human-machine-perception/blob/main/notebooks/day03-lab.ipynb"
PRIVATE_STUDENT = ("https://colab.research.google.com/github/shreyalpandit/human-machine-perception-instructors/"
                   "blob/main/notebooks/student/day03-lab-student.ipynb")
PRIVATE_INSTRUCTOR = ("https://colab.research.google.com/github/shreyalpandit/human-machine-perception-instructors/"
                      "blob/main/notebooks/instructor/day03-lab-instructor.ipynb")

BADGE = "[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)]({url})"

INTRO = """
# Day 3 lab

**Visual Perception** · Fernanda De La Torre & Shreya Pandit

One lab, in two parts. Run the cells from top to bottom with **Shift + Enter**.

**Part 1 · Metamers.** Make stimuli that a model of seeing or hearing cannot tell apart from a real photograph or sound. Wear headphones for the sound sections.

**Part 2 · Image filtering** (about 30 minutes). Turn a photograph of your choice into a printable trifold name tag, using spatial filters and a Gabor filter bank.

Part 2 does not use the pictures from Part 1. Finish Part 1, then continue.
""".strip()

INSTRUCTOR_BANNER = """**Instructor version. Do not share this notebook with students.**

Exercise cells already contain the sample solutions. The blank cell students start from is under *What students see*. Where the student notebook collapses helper code, that code is expanded here.
""".strip()

STUDENT_BANNER = """**Student version.** Exercises are blank. This notebook does not include the solutions. Helper code stays collapsed, the way the class sees it.
""".strip()


def text(cell):
    src = cell.get("source", "")
    return "".join(src) if isinstance(src, list) else src


def is_banner(src):
    return src.startswith("**Instructor version") or src.startswith("**Student version")


def copy(cell):
    kind = cell["cell_type"]
    made = nbf.v4.new_markdown_cell(text(cell)) if kind == "markdown" else nbf.v4.new_code_cell(text(cell))
    made.metadata = dict(cell.get("metadata") or {})
    return made


def retitle(cell, heading):
    lines = text(cell).splitlines()
    out = []
    skipped_badge = False
    replaced = False
    for line in lines:
        if not skipped_badge and line.startswith("[![Open In Colab]"):
            skipped_badge = True
            continue
        if not replaced and line.startswith("# "):
            out.append(heading)
            replaced = True
            continue
        out.append(line)
    # drop the blank line left where the badge was
    while out and out[0] == "":
        out.pop(0)
    made = nbf.v4.new_markdown_cell("\n".join(out).strip() + "\n")
    made.metadata = dict(cell.get("metadata") or {})
    return made


def opening(url, instructor=False, private_student=False):
    cells = [nbf.v4.new_markdown_cell(BADGE.format(url=url) + "\n\n" + INTRO + "\n")]
    if instructor:
        cells.append(nbf.v4.new_markdown_cell(INSTRUCTOR_BANNER + "\n"))
    elif private_student:
        cells.append(nbf.v4.new_markdown_cell(STUDENT_BANNER + "\n"))
    return cells


def part_cells(path, heading):
    nb = nbf.read(path, as_version=4)
    cells = [c for c in nb.cells if not is_banner(text(c))]
    # the first markdown cell carries the old title and, in the public copy, the badge
    first = 0
    while first < len(cells) and cells[first].cell_type != "markdown":
        first += 1
    cells[first] = retitle(cells[first], heading)
    return [cells[first]] + [copy(c) for c in cells[first + 1:]]


def build(metamers, filtering, url, instructor=False, private_student=False):
    nb = nbf.v4.new_notebook()
    nb.cells = (
        opening(url, instructor, private_student)
        + part_cells(metamers, "# Part 1 · Make your own metamers")
        + part_cells(filtering, "# Part 2 · Image filtering")
    )
    nb.metadata = {
        "kernelspec": {"name": "python3", "display_name": "Python 3", "language": "python"},
        "language_info": {"name": "python"},
        "colab": {"provenance": [], "toc_visible": True},
    }
    return nb


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--metamers", type=Path, default=NOTEBOOKS / "day03-lab-metamers.ipynb")
    parser.add_argument("--filtering", type=Path, default=NOTEBOOKS / "day03-lab2-image-filtering.ipynb")
    parser.add_argument("--out", type=Path, default=NOTEBOOKS / "day03-lab.ipynb")
    parser.add_argument("--instructor-metamers", type=Path)
    parser.add_argument("--instructor-filtering", type=Path)
    parser.add_argument("--out-instructor", type=Path)
    parser.add_argument("--out-student-private", type=Path)
    args = parser.parse_args()

    # the public student notebook is built from the public student parts
    nbf.write(build(args.metamers, args.filtering, PUBLIC), args.out)
    print("wrote", args.out)

    if args.out_student_private:
        nbf.write(build(args.metamers, args.filtering, PRIVATE_STUDENT, private_student=True), args.out_student_private)
        print("wrote", args.out_student_private)
    if args.instructor_metamers and args.instructor_filtering and args.out_instructor:
        nbf.write(build(args.instructor_metamers, args.instructor_filtering, PRIVATE_INSTRUCTOR, instructor=True),
                  args.out_instructor)
        print("wrote", args.out_instructor)


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Push a finished part into the final deck (final.html).

    python3 deck/publish.py <part> --by "<who>" --note "<what changed>"
    python3 deck/publish.py <part> --unpublish
    python3 deck/publish.py --status

Run it only when the speaker says "push". It:
  1. checks that <part> is listed in deck/order.js (a push never chooses a position);
  2. syntax-checks the part with node, if node is installed;
  3. freezes a copy of parts/<part>.js into final/parts/<part>.js, and of every scene
     (files a scene loads itself, like its images, are not copied: never overwrite them; add new names)
     and asset it references (scenes/x.html -> scenes/x.final-<part>.html,
     assets/y.png -> final/assets/<part>/y.png), rewriting the frozen part to point at them;
  4. bumps the part's version in final/log.json and rewrites final/status.js
     (read by final.html) and final/STATUS.md (a table for humans).

Later edits to the draft never leak into the final deck until the next push, so you can keep
working on a part while the pushed version is safe to rehearse. Each part writes only its own
files, so two people pushing at once can't conflict.
Never edit anything under final/ by hand: edit the draft and push again.
"""
import argparse, datetime, json, os, re, shutil, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FIN = os.path.join(ROOT, 'final')
LOG = os.path.join(FIN, 'log.json')
MEDIA = r'(?:png|jpe?g|webp|gif|svg|mp4|mov|webm|mp3|wav|m4a|json|csv)'

def order():
    txt = open(os.path.join(ROOT, 'deck', 'order.js')).read()
    return re.findall(r"\[\s*'([\w-]+)'\s*,\s*'([^']*)'\s*,\s*'([^']*)'\s*\]", txt)

def load_log():
    return json.load(open(LOG)) if os.path.exists(LOG) else {}

def write_status(log):
    os.makedirs(FIN, exist_ok=True)
    pushed = {p: e['version'] for p, e in log.items() if not e.get('unpublished')}
    open(os.path.join(FIN, 'status.js'), 'w').write('window.PUSHED = ' + json.dumps(pushed) + ';\n')
    rows = ['| part | slides | version | pushed | by | note |', '|---|---|---|---|---|---|']
    for part, slides, what in order():
        e = log.get(part)
        if e and not e.get('unpublished'):
            rows.append(f"| `{part}` | {slides} | **v{e['version']}** | {e['at']} | {e['by']} | {e['note']} |")
        else:
            rows.append(f'| `{part}` | {slides} | not pushed | | | {what} |')
    open(os.path.join(FIN, 'STATUS.md'), 'w').write('# Final deck status\n\n' + '\n'.join(rows) + '\n')
    return '\n'.join(rows)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('part', nargs='?')
    ap.add_argument('--by', default='')
    ap.add_argument('--note', default='')
    ap.add_argument('--unpublish', action='store_true')
    ap.add_argument('--status', action='store_true')
    a = ap.parse_args()
    log = load_log()
    if a.status or not a.part:
        print(write_status(log)); return
    parts = [p for p, _, _ in order()]
    if a.part not in parts:
        sys.exit(f'"{a.part}" is not in deck/order.js. Add it there first (only the speaker/coordinator does).')
    if a.unpublish:
        log.setdefault(a.part, {'version': 0})['unpublished'] = True
        json.dump(log, open(LOG, 'w'), indent=1); write_status(log)
        print(f'{a.part} taken out of the final deck.'); return

    src = os.path.join(ROOT, 'parts', a.part + '.js')
    if not os.path.exists(src): sys.exit(f'missing {src}')
    if shutil.which('node'):
        r = subprocess.run(['node', '--check', src], capture_output=True, text=True)
        if r.returncode: sys.exit('syntax error, not pushed:\n' + r.stderr)
    code = open(src).read()

    # freeze scenes
    for scene in sorted(set(re.findall(r"scenes/([\w./-]+?)\.html", code))):
        if '.final-' in scene: continue
        s_src = os.path.join(ROOT, 'scenes', scene + '.html')
        if not os.path.exists(s_src): print('  warning: scene not found:', scene); continue
        frozen = f'{scene}.final-{a.part}.html'
        shutil.copyfile(s_src, os.path.join(ROOT, 'scenes', frozen))
        code = code.replace(f'scenes/{scene}.html', f'scenes/{frozen}')
        print('  scene  ', scene, '->', frozen)
    # freeze assets
    for asset in sorted(set(re.findall(r"assets/([\w./-]+?\." + MEDIA + r")", code))):
        a_src = os.path.join(ROOT, 'assets', asset)
        if not os.path.exists(a_src): print('  warning: asset not found:', asset); continue
        dst = os.path.join(FIN, 'assets', a.part, asset)
        os.makedirs(os.path.dirname(dst), exist_ok=True); shutil.copyfile(a_src, dst)
        code = code.replace(f"assets/{asset}", f"final/assets/{a.part}/{asset}")
    if '${' in code and re.search(r"assets/[^'\"`]*\$\{", code):
        print('  warning: an asset path is built with ${...}; those files are NOT frozen. Never overwrite them; save new filenames instead.')

    os.makedirs(os.path.join(FIN, 'parts'), exist_ok=True)
    open(os.path.join(FIN, 'parts', a.part + '.js'), 'w').write(code)
    v = log.get(a.part, {}).get('version', 0) + 1
    log[a.part] = {'version': v, 'at': datetime.datetime.now().strftime('%Y-%m-%d %H:%M'), 'by': a.by, 'note': a.note.replace('|', '/')}
    json.dump(log, open(LOG, 'w'), indent=1)
    write_status(log)
    print(f'pushed {a.part} v{v}. Check it: final.html?gaps=0')

if __name__ == '__main__':
    main()

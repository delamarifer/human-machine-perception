/* A generated street: every pixel's class and instance come from the generator itself,
   so masks and boxes are exact. No third-party image. */
const WORLD = (() => {
  const W = 640, H = 360, HORIZON = 150, ROAD = 215;
  const CLS = ['sky', 'grass', 'road', 'car', 'person'];
  const cars = [{x: 95, y: 170, w: 190, h: 92, c: [71, 85, 105]}, {x: 262, y: 186, w: 200, h: 98, c: [148, 163, 184]}];
  const man = {x: 450, y: 150, w: 44, h: 150};
  const rr = (x, y, x0, y0, w, h, r) => { const dx = Math.max(x0 + r - x, 0, x - (x0 + w - r)), dy = Math.max(y0 + r - y, 0, y - (y0 + h - r));
    return x >= x0 && x <= x0 + w && y >= y0 && y <= y0 + h && dx * dx + dy * dy <= r * r; };
  function carPart(c, x, y){
    const wy = c.y + c.h * .86, wr = c.h * .17;
    for(const fx of [.2, .8]){ const wx = c.x + c.w * fx; if((x - wx) ** 2 + (y - wy) ** 2 <= wr * wr) return 'wheel'; }
    if(rr(x, y, c.x, c.y + c.h * .4, c.w, c.h * .46, 10)) return 'body';
    const t = (y - c.y) / (c.h * .42);
    if(t >= 0 && t <= 1.02){ const l = c.x + c.w * (.3 - .14 * t), r = c.x + c.w * (.7 + .14 * t);
      if(x >= l && x <= r) return (x > l + 6 && x < r - 6 && y > c.y + 6) ? 'win' : 'body'; }
    return null;
  }
  function manPart(x, y){
    const m = man, cx = m.x + m.w / 2;
    if((x - cx) ** 2 + (y - m.y - 15) ** 2 <= 15 * 15) return 'head';
    if(rr(x, y, m.x, m.y + 32, m.w, 62, 9)) return 'torso';
    if(y > m.y + 90 && y <= m.y + m.h && ((x >= m.x + 5 && x <= m.x + 19) || (x >= m.x + 25 && x <= m.x + 39))) return 'leg';
    return null;
  }
  const cls = new Uint8Array(W * H), inst = new Uint8Array(W * H), rgb = new Uint8ClampedArray(W * H * 4);
  const noise = (x, y) => { const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453; return s - Math.floor(s); };
  for(let y = 0; y < H; y++) for(let x = 0; x < W; x++){
    const i = y * W + x; let k, id = 0, col;
    const mp = manPart(x, y), c2 = carPart(cars[1], x, y), c1 = carPart(cars[0], x, y);
    if(mp){ k = 4; id = 3; col = mp === 'head' ? [214, 170, 130] : mp === 'torso' ? [180, 83, 9] : [51, 65, 85]; }
    else if(c2 || c1){ const c = c2 ? cars[1] : cars[0], p = c2 || c1; k = 3; id = c2 ? 2 : 1;
      col = p === 'wheel' ? [15, 23, 42] : p === 'win' ? [203, 213, 225] : c.c; }
    else if(y < HORIZON){ k = 0; const t = y / HORIZON; col = [150 + 60 * t, 195 + 35 * t, 235 + 12 * t]; }
    else if(y < ROAD){ k = 1; const n = noise(x, y) * 26; col = [120 + n, 150 + n, 95 + n * .6]; }
    else { k = 2; const n = noise(x, y) * 10; col = [105 + n, 110 + n, 118 + n];
      if(y > 318 && y < 324 && x % 80 < 44) col = [226, 232, 240]; }
    cls[i] = k; inst[i] = id; rgb.set([col[0], col[1], col[2], 255], i * 4);
  }
  function bbox(id){ let x0 = W, y0 = H, x1 = 0, y1 = 0;
    for(let y = 0; y < H; y++) for(let x = 0; x < W; x++) if(inst[y * W + x] === id){
      if(x < x0) x0 = x; if(x > x1) x1 = x; if(y < y0) y0 = y; if(y > y1) y1 = y; }
    return [x0, y0, x1 + 1, y1 + 1]; }
  const iou = (a, b) => { const w = Math.min(a[2], b[2]) - Math.max(a[0], b[0]), h = Math.min(a[3], b[3]) - Math.max(a[1], b[1]);
    if(w <= 0 || h <= 0) return 0; const I = w * h;
    return I / ((a[2] - a[0]) * (a[3] - a[1]) + (b[2] - b[0]) * (b[3] - b[1]) - I); };
  function paint(ctx, f){ const im = ctx.createImageData(W, H);
    for(let i = 0; i < W * H; i++){ const c = f(i); im.data.set([c[0], c[1], c[2], 255], i * 4); }
    ctx.putImageData(im, 0, 0); }
  function photo(ctx){ ctx.putImageData(new ImageData(rgb, W, H), 0, 0); }
  function box(ctx, b, col, tag, lw = 4){
    ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.strokeRect(b[0], b[1], b[2] - b[0], b[3] - b[1]);
    if(tag){ ctx.font = '700 17px Arial'; const w = ctx.measureText(tag).width + 10;
      ctx.fillStyle = col; ctx.fillRect(b[0] - lw / 2, b[1] - 22, w, 22); ctx.fillStyle = '#fff'; ctx.fillText(tag, b[0] + 3, b[1] - 6); }
  }
  return {W, H, CLS, cls, inst, bbox, iou, paint, photo, box};
})();

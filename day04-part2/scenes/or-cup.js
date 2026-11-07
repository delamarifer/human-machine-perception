/* The recurring cup for the benchmark scenes. CUP (assets/cup-mask.js) holds our outline, in photo pixels.
   VIEW is the part of the photo shown in every panel. */
const VIEW = {x: 380, y: 215, w: 470, h: 370};
const cupImg = new Image();
cupImg.src = '../../day04/assets/photos/coffee.jpg';

const toCanvas = (cv, x, y) => [(x - VIEW.x) / VIEW.w * cv.width, (y - VIEW.y) / VIEW.h * cv.height];
function cupPhoto(cv){
  const c = cv.getContext('2d');
  c.setLineDash([]); c.drawImage(cupImg, VIEW.x, VIEW.y, VIEW.w, VIEW.h, 0, 0, cv.width, cv.height);
  return c;
}
function cupBox(cv, b, col, lw = 4, dash = []){
  const c = cv.getContext('2d'), [x0, y0] = toCanvas(cv, b[0], b[1]), [x1, y1] = toCanvas(cv, b[2], b[3]);
  c.setLineDash(dash); c.strokeStyle = col; c.lineWidth = lw; c.strokeRect(x0, y0, x1 - x0, y1 - y0); c.setLineDash([]);
}
function cupPath(cv, dx = 0, dy = 0){
  const c = cv.getContext('2d');
  c.beginPath();
  CUP.polys.forEach(p => { p.forEach((q, k) => { const [x, y] = toCanvas(cv, q[0] + dx, q[1] + dy); k ? c.lineTo(x, y) : c.moveTo(x, y); }); c.closePath(); });
  return c;
}
function cupTag(cv, s){
  const c = cv.getContext('2d'), f = Math.round(cv.width / 15);
  c.font = `700 ${f}px Arial`;
  const w = c.measureText(s).width + f;
  c.fillStyle = '#0f172a'; c.fillRect(10, 10, w, f * 1.6);
  c.fillStyle = '#fff'; c.fillText(s, 10 + f / 2, 10 + f * 1.15);
}
const boxIoU = (a, b) => { const w = Math.min(a[2], b[2]) - Math.max(a[0], b[0]), h = Math.min(a[3], b[3]) - Math.max(a[1], b[1]);
  if(w <= 0 || h <= 0) return 0; const I = w * h;
  return I / ((a[2] - a[0]) * (a[3] - a[1]) + (b[2] - b[0]) * (b[3] - b[1]) - I); };

/* IoU and Dice between the outline and the same outline moved by (dx, dy), counted on pixels. */
function maskScores(dx, dy){
  const W = CUP.size[0], H = CUP.size[1];
  const paint = (ox, oy) => { const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const c = cv.getContext('2d'); c.fillStyle = '#000'; c.beginPath();
    CUP.polys.forEach(p => { p.forEach((q, k) => k ? c.lineTo(q[0] + ox, q[1] + oy) : c.moveTo(q[0] + ox, q[1] + oy)); c.closePath(); });
    c.fill('evenodd'); return c.getImageData(0, 0, W, H).data; };
  const A = paint(0, 0), B = paint(dx, dy);
  let a = 0, b = 0, i = 0;
  for(let k = 3; k < A.length; k += 4){ const p = A[k] > 127, q = B[k] > 127; if(p) a++; if(q) b++; if(p && q) i++; }
  return {iou: i / (a + b - i), dice: 2 * i / (a + b)};
}

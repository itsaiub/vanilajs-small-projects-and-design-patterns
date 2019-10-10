const canvasEl = document.querySelector("#draw");
const ctx = canvasEl.getContext("2d");

canvasEl.width = window.innerWidth;
canvasEl.height = window.innerHeight;

ctx.strokeStyle = "#bada55";
ctx.lineJoin = "round";
//ctx.lineCap = "round";
ctx.lineWidth = 10;
// ctx.globalCompositeOperation = "multiply";

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
  if (!isDrawing) return;

  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  // ctx.lineWidth = hue;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue++;
  if (hue > 360) {
    hue = 0;
  }
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

canvasEl.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvasEl.addEventListener("mousemove", draw);
canvasEl.addEventListener("mouseup", () => (isDrawing = false));
canvasEl.addEventListener("mouseout", () => (isDrawing = false));

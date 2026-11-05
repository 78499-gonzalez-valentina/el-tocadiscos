import * as THREE from "three";

function crearCanvas(size: number) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  return { canvas, ctx: canvas.getContext("2d")! };
}

export function crearTexturaSurcos(colorBase = "#111111"): THREE.CanvasTexture {
  const size = 1024;
  const { canvas, ctx } = crearCanvas(size);
  const cx = size / 2;
  const cy = size / 2;

  ctx.fillStyle = colorBase;
  ctx.fillRect(0, 0, size, size);

  for (let r = size * 0.075; r < size * 0.495; r += 2.4) {
    const ruido = Math.sin(r * 1.3) * 5 + Math.sin(r * 0.37) * 4;
    const brillo = 18 + ruido;
    ctx.strokeStyle = `rgba(${brillo + 10},${brillo + 10},${brillo + 14},0.9)`;
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  const brillo = ctx.createLinearGradient(0, 0, size, size);
  brillo.addColorStop(0, "rgba(255,255,255,0.05)");
  brillo.addColorStop(0.5, "rgba(255,255,255,0)");
  brillo.addColorStop(1, "rgba(255,255,255,0.04)");
  ctx.fillStyle = brillo;
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.495, 0, Math.PI * 2);
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

export function crearTexturaEtiqueta(
  titulo: string,
  artista: string,
  colorFunda: string,
  colorOscuro: string
): THREE.CanvasTexture {
  const size = 512;
  const { canvas, ctx } = crearCanvas(size);
  const cx = size / 2;
  const cy = size / 2;

  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, size, size);

  const grad = ctx.createRadialGradient(cx - 40, cy - 60, 10, cx, cy, size * 0.5);
  grad.addColorStop(0, colorFunda);
  grad.addColorStop(1, colorOscuro);
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(0,0,0,0.35)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.48, 0, Math.PI * 2);
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255,255,255,0.94)";
  ctx.font = "bold 40px Arial, sans-serif";
  ctx.fillText(titulo.toUpperCase(), cx, cy - 18);
  ctx.font = "26px Arial, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.68)";
  ctx.fillText(artista, cx, cy + 22);

  ctx.fillStyle = "#0a0a0a";
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.045, 0, Math.PI * 2);
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

export function crearTexturaFunda(
  titulo: string,
  artista: string,
  colorFunda: string,
  colorOscuro: string
): THREE.CanvasTexture {
  const size = 512;
  const { canvas, ctx } = crearCanvas(size);

  const grad = ctx.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0, colorFunda);
  grad.addColorStop(1, colorOscuro);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 10;
  ctx.strokeRect(5, 5, size - 10, size - 10);

  ctx.beginPath();
  ctx.arc(size * 0.5, size * 0.4, size * 0.22, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0,0,0,0.22)";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(size * 0.5, size * 0.4, size * 0.05, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.fill();

  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.font = "bold 34px Arial, sans-serif";
  ctx.fillText(titulo.toUpperCase(), size / 2, size * 0.78);
  ctx.font = "22px Arial, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.fillText(artista, size / 2, size * 0.85);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

const canvas = document.getElementById("tokamak");
const ctx = canvas.getContext("2d");

const palette = [
  "rgba(178, 90, 255, 0.72)",
  "rgba(248, 84, 175, 0.74)",
  "rgba(123, 92, 255, 0.72)",
  "rgba(255, 140, 74, 0.7)",
];

const stars = [];
const particles = [];
let width = 0;
let height = 0;
let dpr = 1;
let time = 0;

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = canvas.clientWidth;
  height = canvas.clientHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  stars.length = 0;
  for (let i = 0; i < 140; i += 1) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.4 + 0.3,
      a: Math.random() * 0.6 + 0.2,
    });
  }

  particles.length = 0;
  for (let i = 0; i < 450; i += 1) {
    particles.push({
      angle: Math.random() * Math.PI * 2,
      speed: 0.03 + Math.random() * 0.20,
      drift: 0.004 + Math.random() * 0.012,
      radialPhase: Math.random() * Math.PI * 2,
      radialSpeed: 0.008 + Math.random() * 0.01,
      offset: Math.random() * Math.PI * 2,
      radius: 0.6 + Math.random() * 0.5,
      size: 0.8 + Math.random() * 3.2,
      hue: palette[Math.floor(Math.random() * palette.length)],
    });
  }
}

function drawBackground() {
  const gradient = ctx.createRadialGradient(
    width * 0.55,
    height * 0.35,
    40,
    width * 0.55,
    height * 0.35,
    height * 0.7
  );
  gradient.addColorStop(0, "rgba(88, 34, 119, 0.62)");
  gradient.addColorStop(0.4, "rgba(31, 13, 53, 0.9)");
  gradient.addColorStop(1, "rgba(6, 5, 16, 1)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(244, 220, 255, 0.5)";
  stars.forEach((star) => {
    ctx.globalAlpha = star.a;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

function drawTokamakShell(cx, cy, outerR, innerR, tilt) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(1, tilt);

  const glow = ctx.createRadialGradient(0, 0, innerR * 0.2, 0, 0, outerR);
  glow.addColorStop(0, "rgba(122, 52, 174, 0.32)");
  glow.addColorStop(0.4, "rgba(184, 78, 255, 0.36)");
  glow.addColorStop(0.8, "rgba(255, 95, 180, 0.31)");
  glow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, outerR, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(0, 0, innerR, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";

  ctx.strokeStyle = "rgba(203, 122, 255, 0.38)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, outerR, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

function drawVacuumVessel(cx, cy, outerR, tilt) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(1, tilt);

  ctx.strokeStyle = "rgba(143, 98, 230, 0.28)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.ellipse(0, 0, outerR * 1.02, outerR * 0.62, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(233, 112, 196, 0.24)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(0, 0, outerR * 0.92, outerR * 0.55, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

function drawSeparatrix(cx, cy, outerR, tilt) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(1, tilt);

  ctx.strokeStyle = "rgba(255, 145, 88, 0.32)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-outerR * 0.65, outerR * 0.18);
  ctx.bezierCurveTo(
    -outerR * 0.2,
    outerR * 0.05,
    -outerR * 0.12,
    outerR * 0.32,
    0,
    outerR * 0.28
  );
  ctx.bezierCurveTo(
    outerR * 0.12,
    outerR * 0.32,
    outerR * 0.2,
    outerR * 0.05,
    outerR * 0.65,
    outerR * 0.18
  );
  ctx.stroke();

  ctx.restore();
}

function drawTokamakHardware(cx, cy, outerR, tilt) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(1, tilt);

  const columnWidth = outerR * 0.2;
  const columnHeight = outerR * 1.05;
  ctx.fillStyle = "rgba(90, 51, 149, 0.28)";
  ctx.strokeStyle = "rgba(199, 105, 255, 0.44)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(
    -columnWidth / 2,
    -columnHeight / 2,
    columnWidth,
    columnHeight,
    columnWidth * 0.25
  );
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 144, 82, 0.37)";
  ctx.lineWidth = 3;
  for (let i = -2; i <= 2; i += 1) {
    const yOffset = i * outerR * 0.15;
    ctx.beginPath();
    ctx.ellipse(0, yOffset, outerR * 0.85, outerR * 0.35, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(255, 121, 63, 0.36)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 10; i += 1) {
    const angle = (Math.PI * 2 * i) / 10;
    const x = Math.cos(angle) * outerR * 0.78;
    const y = Math.sin(angle) * outerR * 0.45;
    ctx.beginPath();
    ctx.ellipse(x, y, outerR * 0.2, outerR * 0.55, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.restore();
}

function drawFluxSurfaces(cx, cy, outerR, innerR, tilt) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(1, tilt);

  const count = 7;
  for (let i = 0; i < count; i += 1) {
    const t = i / (count - 1);
    const rx = innerR + (outerR * 0.85 - innerR) * t;
    const ry = rx * 0.62;
    ctx.strokeStyle = `rgba(140, 101, 246, ${0.08 + t * 0.08})`;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.restore();
}

function drawHelicalLines(cx, cy, outerR, innerR, tilt) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(1, tilt);

  const layers = 4;
  for (let i = 0; i < layers; i += 1) {
    const phase = time * 0.01 + i * (Math.PI / 2);
    const base = innerR + (outerR - innerR) * (0.25 + i * 0.18);
    ctx.strokeStyle = `rgba(255, 108, 183, ${0.16 + i * 0.05})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let t = 0; t <= Math.PI * 2.2; t += 0.08) {
      const r = base + Math.sin(t * 2 + phase) * outerR * 0.08;
      const x = Math.cos(t) * r;
      const y = Math.sin(t) * r * 0.7;
      if (t === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  ctx.restore();
}

function drawParticles(cx, cy, outerR, innerR, tilt) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(1, tilt);

  ctx.shadowBlur = 10;
  ctx.lineCap = "round";

  particles.forEach((p) => {
    const swirl = Math.sin(time * 0.006 + p.offset) * p.drift;
    p.angle += p.speed + swirl;
    p.radialPhase += p.radialSpeed;
    const wobble = Math.sin(time * 0.004 + p.offset) * 0.12;
    const spiral = Math.sin(p.angle * 1.6 + p.radialPhase) * outerR * 0.12;
    const radialPulse = Math.sin(p.radialPhase + p.offset) * outerR * 0.06;
    const ringR =
      innerR +
      (outerR - innerR) * (0.35 + 0.35 * p.radius + wobble) +
      spiral +
      radialPulse;

    const x = Math.cos(p.angle) * ringR;
    const y = Math.sin(p.angle) * ringR * 0.7;
    const depth = (Math.sin(p.angle + p.offset) + 1) / 2;
    const size = p.size + depth * 1.4;
    const tailAngle = p.angle - 0.22 - p.speed * 1.9;
    const tailR = ringR - outerR * 0.05;
    const tailX = Math.cos(tailAngle) * tailR;
    const tailY = Math.sin(tailAngle) * tailR * 0.7;
    const controlAngle = p.angle - 0.1 + Math.sin(p.radialPhase) * 0.2;
    const controlR = ringR - outerR * 0.02;
    const controlX = Math.cos(controlAngle) * controlR;
    const controlY = Math.sin(controlAngle) * controlR * 0.7;

    ctx.shadowColor = p.hue;
    ctx.strokeStyle = p.hue;
    ctx.globalAlpha = 0.18 + depth * 0.32;
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(tailX, tailY);
    ctx.quadraticCurveTo(controlX, controlY, x, y);
    ctx.stroke();

    ctx.fillStyle = p.hue;
    ctx.globalAlpha = 0.32 + depth * 0.42;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
  ctx.lineCap = "butt";
}

function drawTokamak() {
  const cx = width * 0.5;
  const cy = height * 0.46;
  const outerR = Math.min(width, height) * 0.52;
  const innerR = outerR * 0.48;
  const tilt = 0.85;

  drawVacuumVessel(cx, cy, outerR, tilt);
  drawTokamakShell(cx, cy, outerR, innerR, tilt);
  drawTokamakHardware(cx, cy, outerR, tilt);
  drawFluxSurfaces(cx, cy, outerR, innerR, tilt);
  drawHelicalLines(cx, cy, outerR, innerR, tilt);
  drawSeparatrix(cx, cy, outerR, tilt);
  drawParticles(cx, cy, outerR * 0.95, innerR, tilt);
}

function render() {
  time += 1;
  ctx.clearRect(0, 0, width, height);
  drawBackground();
  drawTokamak();
  requestAnimationFrame(render);
}

window.addEventListener("resize", resize);
resize();
requestAnimationFrame(render);

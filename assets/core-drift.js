// === CORE DRIFT EFFECT ===
const canvas = document.getElementById('coredrift');
if (canvas) {
  const ctx = canvas.getContext('2d');
  function resizeCore() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCore();
  window.addEventListener('resize', resizeCore);

  const particles = [];
  const count = 60;

  for (let i = 0; i < count; i++) {
    particles.push({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * 200 + 80,
      speed: 0.002 + Math.random() * 0.001,
      size: Math.random() * 1.8 + 0.5,
      offset: Math.random() * 1000
    });
  }

  function drawCore() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    particles.forEach(p => {
      p.angle += p.speed;
      const x = cx + Math.cos(p.angle) * p.radius;
      const y = cy + Math.sin(p.angle + Math.sin(p.offset)) * (p.radius * 0.4);

      const flicker = (Math.sin(Date.now() * 0.002 + p.offset) + 1) * 0.3 + 0.4;
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,255,247,${flicker})`;
      ctx.fill();
    });

    requestAnimationFrame(drawCore);
  }
  drawCore();
}

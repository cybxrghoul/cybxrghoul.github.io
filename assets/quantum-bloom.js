// === QUANTUM BLOOM EFFECT ===
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement("canvas");
    canvas.id = "quantumbloom";
    document.body.appendChild(canvas);
  
    const ctx = canvas.getContext("2d");
  
    function resizeBloom() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeBloom();
    window.addEventListener("resize", resizeBloom);
  
    const petals = [];
    const count = 70;
  
    for (let i = 0; i < count; i++) {
      petals.push({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * 200 + 50,
        speed: (Math.random() * 0.002 + 0.0006) * (Math.random() < 0.5 ? -1 : 1),
        size: Math.random() * 1.8 + 0.5,
        hue: 160 + Math.random() * 180,
        offset: Math.random() * 1000
      });
    }
  
    function drawBloom() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
  
      petals.forEach(p => {
        p.angle += p.speed;
        const spiral = Math.sin(Date.now() * 0.0002 + p.offset) * 0.5 + 0.5;
        const r = p.radius + spiral * 40 * Math.sin(p.offset);
        const x = cx + Math.cos(p.angle) * r;
        const y = cy + Math.sin(p.angle * 1.2) * (r * 0.5);
  
        const flicker = (Math.sin(Date.now() * 0.003 + p.offset) + 1) * 0.3 + 0.4;
        const color = `hsla(${p.hue}, 100%, 60%, ${flicker})`;
  
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });
  
      requestAnimationFrame(drawBloom);
    }
  
    drawBloom();
  });
  
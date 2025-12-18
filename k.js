const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");
const DPR = window.devicePixelRatio || 1;

// ⭐ Constelación K
const Kstars = [
    { x: 0,  y: 0,   size: 3.2 },
    { x: 0,  y: 40,  size: 2.6 },
    { x: 0,  y: 80,  size: 3.0 },
    { x: 0,  y: 120, size: 2.7 },
    { x: 0,  y: 160, size: 3.1 },
    { x: 35, y: 80,  size: 2.8 },
    { x: 65, y: 40,  size: 2.4 },
    { x: 65, y: 160, size: 2.6 }
];

let stars = [];
const STAR_COUNT = 700;

function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.width = w * DPR;
    canvas.height = h * DPR;

    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    initStars();
}

function initStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * canvas.width / DPR,
            y: Math.random() * canvas.height / DPR,
            r: Math.random() * 1.5 + 0.3,
            tw: Math.random() * Math.PI * 2
        });
    }
}

function drawStar(x, y, r, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.shadowBlur = r * 6;
    ctx.shadowColor = "rgba(150,190,255,0.9)";
    ctx.fillStyle = "white";
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function animate(time) {
    requestAnimationFrame(animate);
    const w = canvas.width / DPR;
    const h = canvas.height / DPR;

    ctx.clearRect(0, 0, w, h);

    // 🌌 Estrellas de fondo
    stars.forEach(s => {
        s.tw += 0.01;
        const alpha = 0.2 + 0.6 * Math.sin(s.tw);
        drawStar(s.x, s.y, s.r, alpha);
    });

    // ✨ Constelación K
    const ox = w / 2 - 40;
    const oy = h / 2 - 90;

    ctx.strokeStyle = "rgba(120,170,255,0.35)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();

    // línea vertical
    for (let i = 0; i < 4; i++) {
        ctx.moveTo(Kstars[i].x + ox, Kstars[i].y + oy);
        ctx.lineTo(Kstars[i + 1].x + ox, Kstars[i + 1].y + oy);
    }

    // diagonales
    ctx.moveTo(Kstars[2].x + ox, Kstars[2].y + oy);
    ctx.lineTo(Kstars[6].x + ox, Kstars[6].y + oy);

    ctx.moveTo(Kstars[2].x + ox, Kstars[2].y + oy);
    ctx.lineTo(Kstars[7].x + ox, Kstars[7].y + oy);

    ctx.stroke();

    // estrellas principales
    Kstars.forEach((s, i) => {
        const flicker = Math.sin(time / 700 + i) * 0.4;
        drawStar(s.x + ox, s.y + oy, s.size + flicker, 1);
    });

    // 🌫️ halo
    const g = ctx.createRadialGradient(
        w / 2, h / 2, 40,
        w / 2, h / 2, Math.min(w, h)
    );
    g.addColorStop(0, "rgba(30,60,120,0.08)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
}

resize();
window.addEventListener("resize", resize);
requestAnimationFrame(animate);

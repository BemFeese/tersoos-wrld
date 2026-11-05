"use client";

import { useEffect, useRef } from "react";
import { site } from "../lib/data";

/* ------------------------------------------------------------
   Hero — the doorway into the wrld.
   A live paint canvas breathes behind the name; the visitor
   literally paints the site as they move. Every piece of Tersoo's
   art is him expressing himself — so the site itself is a canvas.
   ------------------------------------------------------------ */

function HeroCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf = 0;
    let W, H;
    const DPR = Math.min(devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    addEventListener("resize", resize);

    // drifting pigment blobs — the wrld breathing
    const pigments = ["#ff5d1f", "#f4d903", "#19c8c8", "#c6f24e"].map((c, i) => ({
      c,
      x: Math.random(), y: Math.random(),
      r: 90 + Math.random() * 160,
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0005,
      a: 0.16 + Math.random() * 0.1,
      phase: i * 2,
    }));

    const mouse = { x: -999, y: -999, down: false, in: false };
    const strokes = [];

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.in = mouse.y >= 0 && mouse.y <= rect.height;
    };
    const onDown = () => { mouse.down = true; };
    const onUp = () => { mouse.down = false; };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    let t = 0;
    const frame = () => {
      t += 0.005;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      // breathe
      for (const p of pigments) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -0.2 || p.x > 1.2) p.vx *= -1;
        if (p.y < -0.2 || p.y > 1.2) p.vy *= -1;
        const wob = 1 + Math.sin(t * 2 + p.phase) * 0.12;
        const g = ctx.createRadialGradient(p.x * W, p.y * H, 0, p.x * W, p.y * H, p.r * wob);
        g.addColorStop(0, p.c);
        g.addColorStop(1, "transparent");
        ctx.globalAlpha = p.a * (mouse.in ? 1.35 : 1);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r * wob, 0, 7);
        ctx.fill();
      }

      // visitor's brush — holding the mouse down paints thick strokes
      if (mouse.in) {
        strokes.push({ x: mouse.x, y: mouse.y, life: 1, hue: pigments[(t * 10) % 4 | 0].c });
      }
      for (let i = strokes.length - 1; i >= 0; i--) {
        const s = strokes[i];
        s.life -= 0.012;
        if (s.life <= 0) { strokes.splice(i, 1); continue; }
        ctx.globalAlpha = s.life * 0.5;
        ctx.fillStyle = s.hue;
        const r = (mouse.down ? 16 : 4) * s.life;
        ctx.beginPath();
        ctx.arc(s.x + (Math.sin(t * 9 + i) * 3), s.y + (Math.cos(t * 7 + i) * 3), r, 0, 7);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("mousemove", onMove);
      removeEventListener("mousedown", onDown);
      removeEventListener("mouseup", onUp);
    };
  }, []);

  return <canvas className="hero-canvas" ref={ref} aria-hidden />;
}

export default function Hero() {
  return (
    <section className="hero">
      <HeroCanvas />
      <div>
        <p className="hero-kicker">{site.location} — A GRAPHIC DESIGNER &amp; ILLUSTRATOR PAINTS HIS WAY OUT</p>
        <h1 className="hero-title">
          <span className="line">TERSOO&apos;S</span>
          <span className="line outline">WR<span className="miss" style={{ WebkitTextStroke: "0" }}>L</span>D</span>
        </h1>
        <p className="hero-hand">every misspelling here is on purpose. that&apos;s the signature. ↓</p>
        <div className="hero-meta">
          <a className="hero-cta" href="#wrld">ENTER THE WRLD</a>
          <a className="hero-cta" style={{ background: "transparent", color: "var(--chalk)", border: "1.5px solid var(--chalk)" }} href="#shop">
            WRLDSHOP ⟶
          </a>
          <span style={{ color: "var(--chalk-dim)" }}>EST. THE MOMENT HE PICKED UP A BRUSH</span>
        </div>
      </div>
      <span className="scroll-hint">SCROLL / PAINT / FLY</span>
    </section>
  );
}

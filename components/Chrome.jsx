"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "../lib/cart-store";
import CartDrawer from "./CartDrawer";
import CheckoutModal from "./CheckoutModal";

/* ------------------------------------------------------------
   Chrome — the atmosphere that never leaves:
   paint cursor, splatter canvas, film grain, nav, cart drawer
   ------------------------------------------------------------ */

function InkCursor() {
  const soft = useRef(null);
  const dot = useRef(null);

  useEffect(() => {
    let raf = 0;
    let x = -100, y = -100, tx = x, ty = y;
    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${tx}px, ${ty}px) translate(-50%,-50%)`;
      const hovered = e.target.closest("a, button, .g-card, .p-card, input, textarea, select");
      soft.current?.classList.toggle("is-hover", !!hovered);
    };
    const loop = () => {
      x += (tx - x) * 0.18; y += (ty - y) * 0.18;
      if (soft.current) soft.current.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div className="cursor" ref={soft} aria-hidden />
      <div className="cursor-dot" ref={dot} aria-hidden />
    </>
  );
}

function SplatCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf = 0, running = true;
    let last = { x: 0, y: 0 };
    const colors = ["#ff5d1f", "#f4d903", "#19c8c8", "#c6f24e", "#f2ede4"];

    const resize = () => {
      canvas.width = innerWidth * devicePixelRatio;
      canvas.height = innerHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    addEventListener("resize", resize);

    // one splat: a burst of droplets that fade like drying ink
    const splat = (x, y, big = false) => {
      const n = big ? 3 : 1;
      for (let j = 0; j < n; j++) {
        const cx = x + (Math.random() - 0.5) * (big ? 60 : 26);
        const cy = y + (Math.random() - 0.5) * (big ? 60 : 26);
        const color = colors[(Math.random() * colors.length) | 0];
        const r = (big ? 2 + Math.random() * 5 : 1 + Math.random() * 2.4);
        const parts = 2 + ((Math.random() * 4) | 0);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.5 + Math.random() * 0.35;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 7);
        ctx.fill();
        for (let i = 0; i < parts; i++) {
          const a = Math.random() * Math.PI * 2;
          const d = r + Math.random() * (big ? 26 : 14);
          ctx.globalAlpha = 0.25 + Math.random() * 0.3;
          ctx.beginPath();
          ctx.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d, r * 0.3, 0, 7);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    let throttle = 0;
    const onMove = (e) => {
      const now = performance.now();
      if (now - throttle < 70) return;
      throttle = now;
      if (Math.hypot(e.clientX - last.x, e.clientY - last.y) > 40) {
        last = { x: e.clientX, y: e.clientY };
        splat(e.clientX, e.clientY, false);
      }
    };
    const onClick = (e) => splat(e.clientX, e.clientY, true);

    // slow fade — ink drying off the page
    const fade = () => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.018)";
      ctx.fillRect(0, 0, innerWidth, innerHeight);
      ctx.globalCompositeOperation = "source-over";
      if (running) raf = requestAnimationFrame(fade);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick, { passive: true });
    raf = requestAnimationFrame(fade);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("mousemove", onMove);
      removeEventListener("click", onClick);
    };
  }, []);

  return <canvas id="splat-canvas" ref={ref} aria-hidden />;
}

function Nav() {
  const pathname = usePathname();
  const cart = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const links = [
    { href: "/", label: "Home" },
    { href: "/#wrld", label: "The Wrld" },
    { href: "/#shop", label: "WRLDSHOP" },
    { href: "/commission", label: "CØMMISSION" },
    { href: "/#contact", label: "Contact" },
  ];
  return (
    <nav className="nav">
      <a href="/" className="nav-logo" aria-label="TERSOO'S WRLD home">
        TERSOO&apos;S <span>WRLD</span>
      </a>
      <div className="nav-links">
        {links.map((l) => (
          <a key={l.label} href={l.href} className={pathname === l.href ? "active" : ""}>
            {l.label}
          </a>
        ))}
        <button className="nav-cart" onClick={() => cart.setOpen(true)}>
          CART
          {mounted && cart.count > 0 && <span className="badge">{cart.count}</span>}
        </button>
      </div>
    </nav>
  );
}

export default function Chrome() {
  const [checkout, setCheckout] = useState(false);

  return (
    <>
      <InkCursor />
      <SplatCanvas />
      <div className="grain" aria-hidden />
      <Nav />
      <CartDrawer onCheckout={() => setCheckout(true)} />
      {checkout && <CheckoutModal onClose={() => setCheckout(false)} />}
    </>
  );
}

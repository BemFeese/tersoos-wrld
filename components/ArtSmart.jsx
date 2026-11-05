"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------
   ArtSmart — shows /public/art/…jpg when the file exists,
   otherwise paints a generative stand-in seeded from the title.
   Tersoo never has to touch code: drop the file, it just appears.
   ------------------------------------------------------------ */

function hashCode(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function SplatSVG({ seed, accent }) {
  const h = hashCode(seed);
  const rand = mulberry(h);
  function mulberry(a) {
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const c2 = ["#f4d903", "#19c8c8", "#c6f24e", "#ff5d1f", "#f2ede4"][h % 5];
  const blobs = Array.from({ length: 6 }, (_, i) => ({
    cx: 12 + rand() * 76, cy: 12 + rand() * 76,
    r: 3 + rand() * 16,
    fill: i % 2 ? accent : c2,
    o: 0.25 + rand() * 0.45,
  }));
  const bits = Array.from({ length: 10 }, () => ({
    cx: rand() * 100, cy: rand() * 100,
    r: 0.6 + rand() * 2,
    fill: c2, o: 0.3 + rand() * 0.4,
  }));
  return (
    <svg className="splat" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {blobs.map((b, i) => (
        <circle key={"b" + i} cx={b.cx} cy={b.cy} r={b.r} fill={b.fill} opacity={b.o}
          style={{ transformOrigin: "center", transform: `scale(${0.9 + rand() * 0.3})` }} />
      ))}
      {bits.map((b, i) => <circle key={"t" + i} cx={b.cx} cy={b.cy} r={b.r} fill={b.fill} opacity={b.o} />)}
    </svg>
  );
}

export default function ArtSmart({ src, title, accent = "#ff5d1f", className = "", alt, quiet = false }) {
  const [broken, setBroken] = useState(false);
  const ref = useRef(null);

  // An image can 404 before React attaches onError (SSR race),
  // so probe its load state a few times after mount.
  // Only a *finished* request (complete) with zero content counts as broken —
  // a slow big artwork is never falsely swapped out.
  useEffect(() => {
    let tries = 0;
    const t = setInterval(() => {
      const img = ref.current;
      if (!img || broken) { clearInterval(t); return; }
      if (img.complete && img.naturalWidth === 0) { setBroken(true); clearInterval(t); }
      else if (++tries >= 6) clearInterval(t);
    }, 1000);
    return () => clearInterval(t);
  }, [broken]);

  if (broken || !src) {
    return (
      <div className={`art-placeholder ball ${className}`} style={{ "--ph-c": accent }}>
        <div className="ball-2" />
        <SplatSVG seed={title || "wrld"} accent={accent} />
        <div className="ph-name">{title}</div>
        {!quiet && <div className="ph-note">→ drop /{src?.replace(/^\//, "")} into /public</div>}
      </div>
    );
  }
  return (
    <img
      ref={ref}
      src={src}
      alt={alt || title}
      className={className}
      onError={() => setBroken(true)}
      loading="lazy"
    />
  );
}

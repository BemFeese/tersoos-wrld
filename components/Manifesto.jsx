"use client";

import { useEffect, useRef } from "react";
import { manifesto } from "../lib/data";

/* ------------------------------------------------------------
   Manifesto — lines ignite as they pass through the reading band.
   The messages ARE the art, so they get the loudest typography.
   ------------------------------------------------------------ */
export default function Manifesto() {
  const ref = useRef(null);

  useEffect(() => {
    const lines = ref.current.querySelectorAll(".manifesto-line");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => en.target.classList.toggle("lit", en.isIntersecting));
      },
      { rootMargin: "-30% 0px -30% 0px" }
    );
    lines.forEach((l) => io.observe(l));
    return () => io.disconnect();
  }, []);

  return (
    <section className="section" id="wrld" ref={ref}>
      <p className="section-label">THE MANÌFESTO — READ IT WRLD</p>
      {manifesto.map((line, i) => (
        <div className="manifesto-line" key={i}>
          {i === 0 ? (
            <>
              MY ART IS ME, <span className="miss">MISSPELLED</span>.
            </>
          ) : (
            line.toUpperCase()
          )}
        </div>
      ))}
      <p className="manifesto-note">
        — misspelled words, stammerers, monkeys with a mouth full. a child who couldn&apos;t spell grew up and made the spelling the brand. who&apos;s laughing now?
      </p>
    </section>
  );
}

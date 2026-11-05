"use client";

import { products, site } from "../lib/data";
import ArtSmart from "./ArtSmart";
import Reveal from "./Reveal";
import { useCart, naira } from "../lib/cart-store";
import { useState } from "react";
import OneOfOne from "./OneOfOne";

/* ------------------------------------------------------------
   Shop — WRLDSHOP.
   Rakitecht's soul, rebirthed: limited edition stamps the moment
   the piece lands, misspelled names, "choose options" flow,
   sold-out stamps. But the voice is 100% Tersoo.
   ------------------------------------------------------------ */

const COLLECTIONS = ["ALL", "TEES", "PRINTS", "OBJECTS"];

function ProductCard({ p }) {
  const cart = useCart();
  const [size, setSize] = useState(p.sizes ? p.sizes[0] : null);
  const sold = p.stock <= 0;

  const add = () => {
    cart.add({ id: p.id, name: p.name, price: p.price, size: size || undefined, colorway: p.colorway, img: p.img, accent: p.accent });
  };

  return (
    <article className="p-card" style={{ "--p-accent": p.accent }}>
      <div className="p-frame">
        <span className="p-edition">{p.editions}</span>
        {sold && <div className="p-sold">SØLD</div>}
        <ArtSmart src={p.img} title={p.name} accent={p.accent} className="p-frame-img" alt={p.name} quiet />
      </div>
      <h3 className="p-name">{p.name}</h3>
      <p className="p-blurb">{p.blurb}</p>
      {p.sizes && (
        <div className="p-opt" role="radiogroup" aria-label={`sizes for ${p.name}`}>
          {p.sizes.map((s) => (
            <button key={s} type="button" className={s === size ? "sel" : ""} disabled={sold} onClick={() => setSize(s)}>
              {s}
            </button>
          ))}
        </div>
      )}
      <div className="p-row">
        <span className="p-price">{naira(p.price)}</span>
        <button className="p-add" disabled={sold} onClick={add}>
          {sold ? "GØNE" : p.sizes ? "ADD — CHØSEN" : "ADD TØ CART"}
        </button>
      </div>
    </article>
  );
}

export default function Shop({ compact = false }) {
  const [col, setCol] = useState("ALL");
  const shown = (col === "ALL" ? products : products.filter((p) => p.collection === col)).slice(
    0,
    compact && col === "ALL" ? 4 : undefined
  );

  return (
    <section className="section" id="shop">
      <div className="shop-head">
        <div>
          <p className="section-label">WRLDSHOP — HAND-DRAWN, HAND-PAINTED, HAND-STAMPED</p>
          <h2 className="section-title">
            OWN A PIECE OF THE <span className="miss">WRLD</span>
          </h2>
        </div>
        {compact && (
          <a className="hero-cta" style={{ background: "transparent", color: "var(--chalk)", border: "1.5px solid var(--chalk)" }} href="/shop">
            SEE EVERYTHING →
          </a>
        )}
      </div>

      {!compact && (
        <div className="collection-chips">
          {COLLECTIONS.map((c) => (
            <button key={c} className={`chip${col === c ? " on" : ""}`} onClick={() => setCol(c)}>
              {c === "ALL" ? "EVRYTHING (yes)" : c}
            </button>
          ))}
        </div>
      )}

      <div className="shop-grid">
        {shown.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>

      <OneOfOne compact={compact} />

      <Reveal as="p" className="manifesto-note" style={{ marginTop: "3rem" }}>
        every piece is checked, signed and misspelled by the artist before it ships. no exceptions.
      </Reveal>
    </section>
  );
}

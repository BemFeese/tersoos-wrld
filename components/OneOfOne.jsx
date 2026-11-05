"use client";

import { originals } from "../lib/data";
import ArtSmart from "./ArtSmart";
import { useCart, naira } from "../lib/cart-store";

/* ------------------------------------------------------------
   1/1 GALLERY — buy the painting, not the print.
   Museum plaques for the one-of-one originals. Every piece
   ships with the hand-signed CÈRTIFICATE OF MÏSSPELLING.
   ------------------------------------------------------------ */

function OriginalCard({ p }) {
  const cart = useCart();
  const sold = p.stock <= 0;
  return (
    <article className="oo-card" style={{ "--p-accent": p.accent }}>
      <div className="oo-frame">
        <span className="p-edition">{p.editions}</span>
        {sold && <div className="p-sold">HØME SØMEDAY</div>}
        <ArtSmart src={p.img} title={p.name} accent={p.accent} alt={p.name} quiet />
      </div>
      <div className="oo-body">
        <div className="oo-medium">{p.medium}</div>
        <h3 className="p-name">{p.name}</h3>
        <p className="p-blurb">{p.blurb}</p>
        <p className="oo-cert">ships with the CÈRTIFICATE of MÏSSPELLING — hand-signed, hand-glitched ✕</p>
        <div className="p-row">
          <span className="p-price">{naira(p.price)}</span>
          <button className="p-add" disabled={sold} onClick={() => cart.add({ id: p.id, name: p.name, price: p.price, img: p.img, accent: p.accent })}>
            {sold ? "ØWNED" : "ACQUÌRE"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function OneOfOne({ compact = false }) {
  const available = originals.filter((p) => p.stock > 0);
  const shown = compact ? available.slice(0, 1) : originals;

  return (
    <section className="oo-band">
      <div className="shop-head">
        <div>
          <p className="section-label">1/1 GALERY — THE OBJECTS THAT EXIST ONCE</p>
          <h2 className="section-title">
            BUY THE PA<span style={{ color: "var(--orange)" }}>Ì</span>NTING,
            <br />
            NOT THE PR<span style={{ color: "var(--orange)" }}>Ì</span>NT
          </h2>
        </div>
        {compact && <a className="hero-cta" style={{ background: "transparent", color: "var(--chalk)", border: "1.5px solid var(--chalk)" }} href="/shop">FULL 1/1 GALERY →</a>}
      </div>

      <div className="oo-grid">
        {shown.map((p) => <OriginalCard key={p.id} p={p} />)}
      </div>

      {!compact && (
        <p className="manifesto-note" style={{ marginTop: "2.5rem" }}>
          a 1/1 in my wrld means: no reprints, no restock, no second chance. some things should only happen once.
        </p>
      )}
    </section>
  );
}

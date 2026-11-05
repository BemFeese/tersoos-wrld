/* Marquee — the wrld muttering its own myths as you scroll past */
export default function Marquee({ items, alt = false, rev = false }) {
  const row = items.map((t, i) => (
    <span className="marquee-item" key={i}>
      {t} <span className="star">✕</span>
    </span>
  ));
  return (
    <div className={`marquee${rev ? " rev" : ""}${alt ? " alt" : ""}`} aria-hidden>
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
}

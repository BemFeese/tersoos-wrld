"use client";

import { useRef, useState } from "react";
import { artworks } from "../lib/data";
import ArtSmart from "./ArtSmart";

/* ------------------------------------------------------------
   Gallery — a horizontal corridor of works.
   Drag to walk the corridor. Click a piece to hear its story:
   because in this wrld, every piece has a message.
   ------------------------------------------------------------ */

function StoryTitle({ title }) {
  // paint ONLY the misspelled (diacritic) letters orange — keep the whole word
  return (
    <h3 className="story-title">
      {[...title].map((ch, i) =>
        /[ÌÍÏÒÓÖÙÚÜÀÁÂÈÉÊËÅÆÇ]/.test(ch) ? <span className="miss" key={i}>{ch}</span> : ch
      )}
    </h3>
  );
}

function StoryModal({ piece, onClose }) {
  if (!piece) return null;
  return (
    <div className="modal-wrap" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-label={piece.title}>
        <button className="modal-x" onClick={onClose} aria-label="Close">✕</button>
        <div className="story-media">
          <ArtSmart src={piece.img} title={piece.title} />
        </div>
        <div className="story-kicker">
          {piece.kind} — {piece.year} {piece.tags?.length ? "· " + piece.tags.join(" · ") : ""}
        </div>
        <StoryTitle title={piece.title} />
        <p className="story-body">{piece.story}</p>
        {piece.link && (
          <a className="story-link" href={piece.link} target="_blank" rel="noreferrer">
            {piece.linkLabel || "SEE MORE"} →
          </a>
        )}
      </div>
    </div>
  );
}

const SPEECH = ["ALL", "DIGITAL", "TRADITIØNAL", "MOTION", "MESSAGES", "PØRTRAITS"];

function pieceSpeaks(piece, speech) {
  if (speech === "ALL") return true;
  if (speech === "TRADITIØNAL")
    return piece.tags?.some((t) => /traditional/i.test(t)) || /poster colour|hand-crafted/i.test(piece.kind);
  if (speech === "MESSAGES") return piece.tags?.some((t) => /message|symbolism/i.test(t));
  return piece.tags?.some((t) => new RegExp(speech.replace(/[ØÌË]/g, "."), "i").test(t));
}

export default function Gallery() {
  const trackRef = useRef(null);
  const [story, setStory] = useState(null);
  const [speech, setSpeech] = useState("ALL");
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });

  const shown = artworks.filter((a) => pieceSpeaks(a, speech));

  const down = (e) => {
    const t = trackRef.current;
    drag.current = { down: true, x: e.clientX, left: t.scrollLeft, moved: false };
  };
  const move = (e) => {
    if (!drag.current.down) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 6) drag.current.moved = true;
    trackRef.current.scrollLeft = drag.current.left - dx;
  };
  const up = () => { drag.current.down = false; };

  const clickCard = (piece) => (e) => {
    if (drag.current.moved) return; // it was a drag, not a click
    setStory(piece);
  };

  return (
    <section className="section" style={{ paddingLeft: 0, paddingRight: 0 }}>
      <div style={{ padding: "0 var(--pad)" }}>
        <p className="section-label">THE EXHÌBITION — DRAG TO WALK</p>
        <h2 className="section-title">
          WORKS THAT <span className="miss">SPEAK</span>, MANY OF THEM WRONG
        </h2>
        <div className="collection-chips">
          {SPEECH.map((s) => (
            <button key={s} className={`chip${speech === s ? " on" : ""}`} onClick={() => setSpeech(s)}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div
        className="gallery-track"
        ref={trackRef}
        onMouseDown={down}
        onMouseMove={move}
        onMouseUp={up}
        onMouseLeave={up}
      >
        {shown.map((piece, i) => (
          <figure className="g-card" key={piece.id} onClick={clickCard(piece)}>
            <div className="g-frame">
              <span className="g-tag">{piece.kind}</span>
              <ArtSmart src={piece.img} title={piece.title} alt={piece.title} />
              <span className="g-hand">click for the story ✕</span>
            </div>
            <figcaption className="g-cap">
              <span className="g-name">{piece.title}</span>
              <span className="g-kind">{piece.year}</span>
            </figcaption>
          </figure>
        ))}
        <div style={{ flex: "0 0 10vw" }} aria-hidden />
      </div>

      <StoryModal piece={story} onClose={() => setStory(null)} />
    </section>
  );
}

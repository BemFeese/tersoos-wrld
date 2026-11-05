"use client";

import { useState } from "react";
import { site } from "../lib/data";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  async function subscribe(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setMsg(res.ok ? "you're inside the wrld now ✕" : "hmm, try again");
      if (res.ok) setEmail("");
    } catch {
      setMsg("hmm, try again");
    }
  }

  return (
    <footer className="footer" id="contact">
      <div className="footer-grid">
        <div>
          <h2 className="footer-title">
            DON&apos;T JUST WATCH THE <span className="miss">WRLD</span>.
          </h2>
          <p className="footer-hand">get every drop before evryone else — yes, evryone is also misspelled.</p>
          <form className="news-form" onSubmit={subscribe}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@wrld.com"
              aria-label="Email address"
            />
            <button type="submit">JØIN</button>
          </form>
          {msg && <p className="footer-hand" style={{ marginTop: "0.8rem" }}>{msg}</p>}
        </div>
        <div className="footer-links">
          <a href="/commission">CØMMISSIØN THE ARTIST →</a>
          <a href={"mailto:" + site.email}>{site.email}</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">ÌNSTAGRAM ↗</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">X / TWÌTTER ↗</a>
          <a href="https://behance.net" target="_blank" rel="noreferrer">BÉHANCE ↗</a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">YOUTUBE (THE PROCESS) ↗</a>
        </div>
      </div>
      <div className="footer-base">
        <span>© {new Date().getFullYear()} {site.artist} — {site.name}</span>
        <span className="footer-hand">bÙilt in the wrld, for the wrld</span>
        <span>SPELLING MÌSTAKES: INTENTIONAL</span>
      </div>
    </footer>
  );
}

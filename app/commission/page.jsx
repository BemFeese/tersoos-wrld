import { Suspense } from "react";
import Marquee from "../../components/Marquee";
import CommissionForm from "../../components/CommissionForm";
import Footer from "../../components/Footer";

export const metadata = { title: "CØMMISSION — brief the artist · Tersoo's Wrld" };

export default function CommissionPage() {
  return (
    <main style={{ paddingTop: "calc(var(--nav-h) + 3rem)" }}>
      <Marquee
        alt
        rev
        items={["COMMISSÌONS — OPEN", "COVER ART / BRAND / PORTRAÌT / OTHERWISE", "TERSOO READS THEM HÌMSELF", "48 HOURS, ÌF THE INK DRIES"]}
      />
      <section className="section" style={{ textAlign: "center", maxWidth: 900, margin: "0 auto" }}>
        <p className="section-label" style={{ justifyContent: "center" }}>CØMMISSION THE WRLD</p>
        <h1 className="section-title" style={{ marginBottom: "1.2rem" }}>
          HAVE SOMETHÌNG THAT <span className="miss">NEEDS SAYING?</span>
        </h1>
        <p style={{ color: "var(--chalk-dim)", maxWidth: "58ch", margin: "0 auto 0.8rem", lineHeight: 1.7 }}>
          Covers, brands, portraits of you — glitched on purpose. Or something else entirely,
          which is his favourite. Tell him the message, not just the medium.
        </p>
        <p className="footer-hand" style={{ color: "var(--yellow)" }}>
          “don&apos;t tell me what you want it to look like. tell me what you want it to feel like.” — T.
        </p>
      </section>
      <CommissionForm />
      <Footer />
    </main>
  );
}

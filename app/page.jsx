import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Manifesto from "../components/Manifesto";
import Gallery from "../components/Gallery";
import Ribbon from "../components/Ribbon";
import Shop from "../components/Shop";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee
        items={["CRULE WRLD", "MONSTROÏD", "FREE BÌRD", "SËLF ËLEVATION", "WAR ÌN MÏND", "DAMN.", "SÌLENT DEMÌSE"]}
      />
      <Manifesto />
      <Gallery />
      <Ribbon />
      <Marquee
        rev
        alt
        items={["WRLDSHOP", "ONLY 5 EDITIONS EVER", "HAND-DRAWN", "SHIPS WRLDWÌDE", "SPELLED WRONG ON PURPOSE"]}
      />
      <Shop compact />
      <section className="cta-band">
        <div>
          <h3>GÒT SOMETHÌNG THAT <span className="miss">NEEDS SAYING?</span></h3>
          <p className="hero-hand">covers, brands, portraits of you — glitched on purpose. brief the artist himself.</p>
        </div>
        <a className="hero-cta" href="/commission">CØMMÌSSION →</a>
      </section>
      <Footer />
    </main>
  );
}

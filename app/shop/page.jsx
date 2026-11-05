import Shop from "../../components/Shop";
import Marquee from "../../components/Marquee";
import Footer from "../../components/Footer";

export const metadata = { title: "WRLDSHOP — Tersoo's Wrld" };

export default function ShopPage() {
  return (
    <main style={{ paddingTop: "calc(var(--nav-h) + 3rem)" }}>
      <Marquee
        alt
        items={["WRLDSHOP", "EVERY PAINTING I'VE EVER MADE, FROM MY TABLE TO YOUR WALL", "ONLY X EDITIONS EVER", "SPELLED WRONG ON PURPOSE"]}
      />
      <Shop />
      <Footer />
    </main>
  );
}

import { site } from "../lib/data";

/* The giant quote that tears across the page like painted tape */
export default function Ribbon() {
  return (
    <section className="ribbon" aria-label="Artist quote">
      <p className="quote">
        “ALL BIRDS BORN IN A CAGE THINK FLYING IS AN ILLNESS.”
      </p>
      <p className="attr">— {site.artist}, FÌRST WORDS OF THE WRLD</p>
    </section>
  );
}

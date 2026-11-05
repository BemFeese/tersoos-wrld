import "./globals.css";
import { CartProvider } from "../lib/cart-store";
import Chrome from "../components/Chrome";
import { site } from "../lib/data";

export const metadata = {
  title: "TERSOO'S WRLD — spelled wrong, on purpose",
  description:
    "The art world of Tersoo Dzoho — graphic designer & illustrator. Portfolio, stories, and WRLDSHOP: limited edition tees, prints and objects.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;700&family=Caveat:wght@600&display=swap"
          rel="stylesheet"
        />
        <meta name="description" content={site.role + " — portfolio & WRLDSHOP"} />
      </head>
      <body>
        <CartProvider>
          <Chrome />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

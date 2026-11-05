"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { naira } from "../lib/cart-store";

/* ------------------------------------------------------------
   /paid?ref=WRLD-XXXX
   Paystack lands here after checkout. We verify server-side and
   match the energy of the brand either way.
   ------------------------------------------------------------ */

export default function PaidStatus() {
  const params = useSearchParams();
  const ref = params.get("ref") || params.get("trxref") || params.get("reference");
  const [state, setState] = useState("checking");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!ref) { setState("missing"); return; }
    let tries = 0;
    const check = async () => {
      try {
        const res = await fetch("/api/verify?ref=" + encodeURIComponent(ref));
        const data = await res.json();
        if (data.status === "paid") {
          setOrder(data);
          setState("paid");
          return;
        }
        if (tries++ < 6) setTimeout(check, 4000); // bank/webhook lag — retry then give up gracefully
        else { setOrder(data); setState("pending"); }
      } catch {
        if (tries++ < 6) setTimeout(check, 4000);
        else setState("pending");
      }
    };
    check();
  }, [ref]);

  return (
    <section className="section" style={{ minHeight: "60vh" }}>
      {state === "checking" && (
        <div className="pay-done">
          <div className="big" style={{ color: "var(--yellow)" }}>STAMPING…</div>
          <p>Checking the wrld&apos;s ledger for order {ref}.</p>
        </div>
      )}

      {state === "paid" && (
        <div className="pay-done">
          <div className="big">PAÌD ✕ WELCOME TØ THE WRLD</div>
          <p>Order <strong style={{ color: "var(--chalk)" }}>{order.ref}</strong> — {naira(order.total)} — confirmed.</p>
          <p style={{ marginTop: "0.8rem" }}>
            The artist has been informed. Your pieces are being checked, signed and misspelled right now.
            Expect a dispatch message soon.
          </p>
          <p style={{ marginTop: "1.4rem" }}><a className="story-link" href="/">BACK TO THE WRLD →</a></p>
        </div>
      )}

      {(state === "pending" || state === "missing") && (
        <div className="pay-done">
          <div className="big" style={{ color: "var(--orange)" }}>SÒON CONFIRM</div>
          <p>
            We see order {ref || "(no ref)"} but payment hasn&apos;t been confirmed yet —
            the bank can be slow. Keep this reference; refresh in a minute, or message us with it.
          </p>
          <p style={{ marginTop: "1.4rem" }}><a className="story-link" href="/">BACK TO THE WRLD →</a></p>
        </div>
      )}
    </section>
  );
}

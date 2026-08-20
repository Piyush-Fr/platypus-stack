"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

import { Vortex } from "./ui/vortex";

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".footer-reveal",
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.1,
          scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <footer
      ref={containerRef}
      id="connect"
      className="relative"
      style={{ background: "#0A0A0A" }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "160px 32px 96px" }}>

        {/* Label row */}
        <div className="footer-reveal flex items-center gap-6" style={{ marginBottom: 96 }}>
          <span className="section-label shrink-0">
            06 — Get in Touch
          </span>
        </div>

        {/* Giant stacked CTA with Vortex */}
        <div className="footer-reveal mb-20 relative flex flex-col items-start overflow-hidden">
          <Vortex
            backgroundColor="transparent"
            particleCount={500}
            baseHue={180}
            className="w-full flex flex-col"
            containerClassName="w-full overflow-hidden"
          >
            {/* Vignette/Shadow overlay to fade the edges */}
            <div 
              className="absolute inset-0 z-0 pointer-events-none shadow-[inset_0_0_60px_40px_#0a0a0a] md:shadow-[inset_0_0_120px_80px_#0a0a0a]"
            />
            
            <div className="relative z-10 mix-blend-difference text-white w-full py-16">
              <h2
                className="font-extrabold uppercase tracking-tighter leading-[0.88]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3rem, 8.5vw, 8.5rem)",
                }}
              >
                Let&apos;s Build
              </h2>
              <h2
                className="font-extrabold uppercase tracking-tighter leading-[0.88]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3rem, 8.5vw, 8.5rem)",
                }}
              >
                Something
              </h2>
              <h2
                className="font-extrabold uppercase tracking-tighter leading-[0.88]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3rem, 8.5vw, 8.5rem)",
                }}
              >
                Together.
              </h2>
            </div>
          </Vortex>
        </div>

        {/* Footer bottom info */}
        <div
          className="footer-reveal flex flex-col items-end text-right w-full pt-4 gap-12"
        >
          <div className="flex flex-col items-end">
            <span
              className="block mb-2 font-bold uppercase tracking-widest text-[10px]"
              style={{ fontFamily: "var(--font-display)", color: "#444444" }}
            >
              Email us
            </span>
            <a
              href="mailto:platypusstack@gmail.com"
              className="font-bold transition-colors duration-200"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
                color: "#EDEDED",
              }}
              onMouseEnter={e => ((e.target as HTMLAnchorElement).style.color = "#E8FF58")}
              onMouseLeave={e => ((e.target as HTMLAnchorElement).style.color = "#EDEDED")}
            >
              platypusstack@gmail.com
            </a>
          </div>

          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              color: "#333333",
            }}
          >
            © Platypus Stack. All rights reserved.
          </span>
        </div>

      </div>
    </footer>
  );
}

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
          <div
            className="flex-1 h-[1px]"
            style={{ background: "#1E1E1E" }}
          />
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

        {/* Email + nav row */}
        <div
          className="footer-reveal flex flex-col md:flex-row md:items-end justify-between gap-10 pt-12"
          style={{ borderTop: "1px solid #1E1E1E" }}
        >
          <div>
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

          {/* Footer nav */}
          <nav className="flex flex-wrap gap-8">
            {[
              { label: "Work", href: "#work" },
              { label: "Manifesto", href: "#manifesto" },
              { label: "Capabilities", href: "#services" },
              { label: "Agency", href: "#team" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="font-bold uppercase tracking-widest text-[10px] hover:text-[#EDEDED] transition-colors duration-200"
                style={{ fontFamily: "var(--font-display)", color: "#444444" }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Copyright strip */}
        <div
          className="footer-reveal flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-16 pt-6"
          style={{ borderTop: "1px solid #1A1A1A" }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              color: "#333333",
            }}
          >
            © Platypus Stack. All rights reserved.
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.6rem",
              color: "#2A2A2A",
              letterSpacing: "0.15em",
            }}
            className="uppercase font-bold"
          >
            Built with Next.js · Tailwind v4 · GSAP · Lenis
          </span>
        </div>

      </div>
    </footer>
  );
}

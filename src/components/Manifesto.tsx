"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

import { Vortex } from "./ui/vortex";

const MANIFESTO =
  "For twelve years we've helped serious organisations feel alive on screen — calm on the surface, a little obsessive underneath.";

export default function Manifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".manifesto-word",
        { opacity: 0.1 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "bottom 30%",
            scrub: 2,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="manifesto"
      className="relative overflow-hidden"
      style={{ background: "#0A0A0A" }}
    >
      {/* Shadcn/Aceternity Aurora Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible z-0">
        <div
          className="absolute -inset-[50px] opacity-40 will-change-transform filter blur-[10px]"
          style={{
            backgroundImage: "repeating-linear-gradient(100deg, #0A0A0A 0%, #0A0A0A 7%, transparent 10%, transparent 12%, #0A0A0A 16%), repeating-linear-gradient(100deg, #3b82f6 10%, #a5b4fc 15%, #93c5fd 20%, #ddd6fe 25%, #60a5fa 30%)",
            backgroundSize: "300% 200%",
            backgroundPosition: "50% 50%, 50% 50%",
            maskImage: "radial-gradient(ellipse at 50% 50%, black 10%, transparent 70%)"
          }}
        >
          <div 
            className="absolute inset-0 animate-aurora mix-blend-difference"
            style={{
              backgroundImage: "repeating-linear-gradient(100deg, #0A0A0A 0%, #0A0A0A 7%, transparent 10%, transparent 12%, #0A0A0A 16%), repeating-linear-gradient(100deg, #3b82f6 10%, #a5b4fc 15%, #93c5fd 20%, #ddd6fe 25%, #60a5fa 30%)",
              backgroundSize: "200% 100%",
              backgroundAttachment: "fixed"
            }}
          />
        </div>
        {/* Vignette overlay */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none" 
          style={{ boxShadow: "inset 0 0 120px 80px #0a0a0a" }} 
        />
      </div>

      <div className="relative z-10" style={{ maxWidth: 1440, margin: "0 auto", padding: "160px 32px 112px" }}>
        {/* Label row */}
        <div className="flex items-center gap-6" style={{ marginBottom: 96 }}>
          <span className="section-label shrink-0">
            03 — Manifesto
          </span>
        </div>

        {/* Scroll-revealed text */}
        <p
          ref={textRef}
          className="font-extrabold uppercase tracking-tight relative z-10"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.6rem, 3.5vw, 3.5rem)",
            lineHeight: 1.2,
            color: "#EDEDED",
            mixBlendMode: "overlay"
          }}
        >
          {MANIFESTO.split(" ").map((word, i, arr) => (
            <React.Fragment key={i}>
              <span className="manifesto-word inline-block">{word}</span>
              {i < arr.length - 1 && " "}
            </React.Fragment>
          ))}
        </p>

        {/* Bottom accent bar */}
        <div
          className="flex items-center gap-6 mt-28 pt-12"
        >
          <span
            className="font-bold uppercase tracking-widest"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.6rem",
              letterSpacing: "0.22em",
              color: "#E8FF58",
            }}
          >
            Platypus Belief System
          </span>
        </div>
      </div>
    </section>
  );
}

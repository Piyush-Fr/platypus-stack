"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-reveal",
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, stagger: 0.08 }
      );

      tl.fromTo(
        ".hero-divider",
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 1.2, ease: "power4.out" },
        "<0.2"
      );

      // Parallax effect for the giant title
      gsap.to(".hero-parallax", {
        y: 150, // Move down as user scrolls down
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

    },
    { scope: containerRef }
  );

  const darkGradient = "repeating-linear-gradient(100deg, #0A0A0A 0%, #0A0A0A 7%, transparent 10%, transparent 12%, #0A0A0A 16%)";
  const auroraGradient = "repeating-linear-gradient(100deg, #3b82f6 10%, #a5b4fc 15%, #93c5fd 20%, #ddd6fe 25%, #60a5fa 30%)";

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col overflow-hidden"
      style={{ background: "#0A0A0A", minHeight: "100svh" }}
    >
      {/* Spacer for fixed header */}
      <div style={{ height: 72 }} />

      {/* Content */}
      <div
        style={{ maxWidth: 1440, flex: 1 }}
        className="mx-auto px-8 w-full flex flex-col justify-between py-16"
      >
        {/* Label row */}
        <div>
          <div className="hero-divider divider mb-8" />
          <div className="flex items-center justify-between mb-14">
            <span className="section-label">01 — Intro</span>
            <span className="section-label">Est. 2024 · Remote Agency</span>
          </div>
        </div>

        {/* Giant headline with Aurora Background */}
        <div className="flex-1 flex flex-col justify-center items-center mb-16 w-full relative z-10 hero-parallax">
          
          {/* Shadcn/Aceternity Aurora Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
            <div
              className="absolute -inset-[10px] opacity-40 will-change-transform filter blur-[10px]"
              style={{
                backgroundImage: `${darkGradient}, ${auroraGradient}`,
                backgroundSize: "300% 200%",
                backgroundPosition: "50% 50%, 50% 50%",
                maskImage: "radial-gradient(ellipse at 50% 50%, black 10%, transparent 70%)"
              }}
            >
              <div 
                className="absolute inset-0 animate-aurora mix-blend-difference"
                style={{
                  backgroundImage: `${darkGradient}, ${auroraGradient}`,
                  backgroundSize: "200% 100%",
                  backgroundAttachment: "fixed"
                }}
              />
            </div>
          </div>

          <h1 
            className="relative z-10 font-black text-center text-white leading-none tracking-tighter mix-blend-overlay"
            style={{ 
              fontSize: "clamp(4rem, 16vw, 18rem)", 
              fontFamily: "var(--font-display)",
            }}
          >
            PLATYPUS
          </h1>
        </div>

        {/* Bottom row */}
        <div>
          <div className="hero-divider divider mb-8" />
          <div className="hero-reveal grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
            {/* Description + buttons */}
            <div className="md:col-span-2">
              <p
                className="leading-relaxed w-full"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(0.875rem, 1.05vw, 1rem)",
                  color: "#666666",
                  marginBottom: "48px"
                }}
              >
                A four-person creative studio engineering high-end websites, brand identities, and fluid digital experiences — <br className="hidden md:block" /> from pixel-perfect UI to blazing-fast stacks.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#work" className="btn-primary">
                  View Our Work
                  <svg
                    width="13"
                    height="13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <Link href="#connect" className="btn-outline">
                  Get in Touch
                </Link>
              </div>
            </div>

          </div>

          {/* Scroll cue */}
          <div className="hero-divider divider mt-8 mb-5" />
          <div className="hero-reveal flex items-center justify-center gap-3 w-full">
            <div className="w-6 h-[1px] bg-[#333333]" />
            <span className="section-label">Scroll to Explore</span>
            <div className="w-6 h-[1px] bg-[#333333]" />
          </div>
        </div>
      </div>
    </section>
  );
}

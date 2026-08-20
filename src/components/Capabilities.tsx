"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const services = [
  {
    num: "UX-01",
    title: "Product & UX",
    desc: "The thinking that happens before the pretty part — user research, user flows, wireframing, and interactive prototypes. We align the plan before arguing about colors.",
  },
  {
    num: "UI-02",
    title: "Interfaces & Systems",
    desc: "Design systems built to last — proper component libraries with clear token hierarchies. Everything stays clean and scalable as content grows.",
  },
  {
    num: "MO-03",
    title: "Motion & Interaction",
    desc: "GSAP scroll choreography, Lenis smooth scroll, and micro-interactions that serve a purpose. If an animation isn't guiding the user, it doesn't make the cut.",
  },
  {
    num: "AD-04",
    title: "Art Direction",
    desc: "The taste layer — typography, image direction, and grid layouts that make the brand feel like itself on every device.",
  },
];

const technologies = [
  "Next.js 16",
  "React 19",
  "Tailwind CSS v4",
  "GSAP",
  "Lenis Scroll",
  "TypeScript",
  "Node.js",
  "WebGL",
];

export default function Capabilities() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".cap-header",
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 1,
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".service-row",
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".services-list", start: "top 76%" },
        }
      );
      gsap.fromTo(
        ".tech-item",
        { opacity: 0, y: 12 },
        {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: "power2.out",
          scrollTrigger: { trigger: ".tech-list", start: "top 85%" },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative"
      style={{ background: "#0A0A0A" }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "160px 32px 96px" }}>

        {/* Header */}
        <div className="cap-header" style={{ marginBottom: 64 }}>
          <span className="section-label block mb-4">04 — Capabilities</span>
          <h2
            className="font-extrabold uppercase tracking-tighter leading-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 4.5rem)",
              color: "#EDEDED",
            }}
          >
            Our Creative Engine
          </h2>
        </div>

        {/* Services rows */}
        <div className="services-list">
          <div className="divider" />
          {services.map((s, i) => (
            <div key={i}>
              <div className="service-row group flex flex-col md:flex-row items-start md:gap-16" style={{ gap: "1.5rem", padding: "56px 0" }}>
                <span
                  className="shrink-0 w-16 pt-1 font-bold uppercase tracking-widest text-[#E8FF58] group-hover:opacity-70 transition-opacity duration-200"
                  style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", letterSpacing: "0.18em" }}
                >
                  {s.num}
                </span>
                <h3
                  className="font-bold uppercase tracking-tight shrink-0 md:w-56 group-hover:text-[#E8FF58] transition-colors duration-200"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
                    color: "#EDEDED",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  className="leading-relaxed max-w-lg"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    color: "#666666",
                  }}
                >
                  {s.desc}
                </p>
              </div>
              <div className="divider" />
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div className="mt-20">
          <span className="section-label block mb-6">Core Tech Stack</span>
          <div className="tech-list flex flex-wrap gap-2">
            {technologies.map((tech, i) => (
              <span
                key={i}
                className="tech-item px-4 py-2 border border-[#1E1E1E] font-bold uppercase tracking-widest text-[10px] hover:border-[#E8FF58] hover:text-[#E8FF58] transition-all duration-200 cursor-default"
                style={{ fontFamily: "var(--font-display)", color: "#555555" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

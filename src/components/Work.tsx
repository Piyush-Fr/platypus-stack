"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const projects = [
  {
    num: "01",
    title: "King's College",
    category: "Web Design · Design System",
    year: "2026",
    tags: ["Higher Ed", "Next.js"],
  },
  {
    num: "02",
    title: "Bravura Fintech",
    category: "Web Design · UI System",
    year: "2026",
    tags: ["Fintech", "Design System"],
  },
  {
    num: "03",
    title: "Digit Research",
    category: "Branding · Web Design",
    year: "2026",
    tags: ["Research", "Branding"],
  },
];

export default function Work() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".work-header",
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 1,
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".project-row",
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".project-list", start: "top 78%" },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="work"
      className="relative"
      style={{ background: "#0A0A0A" }}
    >

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "160px 32px 96px" }}>
        {/* Header */}
        <div className="work-header" style={{ marginBottom: 64 }}>
          <span className="section-label block" style={{ marginBottom: 20 }}>02 — Selected Work</span>
          <div className="flex items-end justify-between">
            <h2
              className="font-extrabold uppercase tracking-tighter leading-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 4.5rem)",
                color: "#EDEDED",
              }}
            >
              Featured Projects
            </h2>
            <span className="section-label hidden md:block">{projects.length} Projects</span>
          </div>
        </div>

        {/* Project rows */}
        <div className="project-list">
          <div className="divider" />
          {projects.map((p, i) => (
            <div key={i}>
              <div
                className="project-row group flex flex-col md:flex-row items-start md:items-center justify-between gap-6 cursor-pointer"
                style={{ padding: "64px 0" }}
              >
                {/* Number */}
                <span
                  className="section-label shrink-0 w-10 group-hover:text-[#E8FF58] transition-colors duration-200"
                >
                  {p.num}
                </span>

                {/* Title */}
                <h3
                  className="flex-1 font-extrabold uppercase tracking-tight leading-none group-hover:text-[#E8FF58] transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.6rem, 3.5vw, 3rem)",
                    color: "#EDEDED",
                  }}
                >
                  {p.title}
                </h3>

                {/* Category */}
                <div className="hidden md:block w-52 shrink-0">
                  <span className="section-label">{p.category}</span>
                </div>

                {/* Tags + year + arrow */}
                <div className="flex flex-wrap items-center gap-3">
                  {p.tags.map((t, ti) => (
                    <span
                      key={ti}
                      className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border border-[#222222] text-[#555555] group-hover:border-[#444444] group-hover:text-[#888888] transition-colors duration-200"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {t}
                    </span>
                  ))}
                  <span className="section-label ml-2">{p.year}</span>
                  <svg
                    className="w-4 h-4 text-[#333333] group-hover:text-[#E8FF58] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 ml-1"
                    fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="divider" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

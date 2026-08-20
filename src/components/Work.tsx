"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const projects = [
  {
    num: "01",
    title: "SHRI JI TRADERS",
    category: "E-Commerce",
    year: "2024",
    tags: ["Trading", "Web"],
    link: "https://nihonurbanization.vercel.app/",
    image: "/shri ji.png",
  },
  {
    num: "02",
    title: "SACHIN PORTFOLIO",
    category: "Portfolio",
    year: "2024",
    tags: ["Personal", "Portfolio"],
    link: "https://sachin-portfolio-mauve.vercel.app/",
    image: "/sachin.png",
  },
  {
    num: "03",
    title: "CRIV MEDIA",
    category: "Agency",
    year: "2024",
    tags: ["Agency", "Media"],
    link: "https://crivmedia.framer.website/",
    image: "/criv.png",
  },
  {
    num: "04",
    title: "NIHON URBANIZATION",
    category: "Corporate",
    year: "2024",
    tags: ["Corporate", "Web"],
    link: "https://nihonurbanization.vercel.app/",
    image: "/nihon urb.png",
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
            <div key={i} className="relative group">
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-row flex flex-col md:flex-row items-start md:items-center justify-between gap-6 cursor-pointer"
                style={{ padding: "64px 0", display: "flex" }}
              >
                {/* Number */}
                <span
                  className="section-label shrink-0 w-10 group-hover:text-[#E8FF58] transition-colors duration-200"
                >
                  {p.num}
                </span>

                {/* Title */}
                <h3
                  className="flex-1 font-extrabold uppercase tracking-tight leading-none group-hover:text-[#E8FF58] transition-colors duration-300 relative z-10"
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

                {/* Tags + arrow */}
                <div className="flex flex-wrap items-center gap-3 relative z-10">
                  {p.tags.map((t, ti) => (
                    <span
                      key={ti}
                      className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border border-[#222222] text-[#555555] group-hover:border-[#444444] group-hover:text-[#888888] transition-colors duration-200"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {t}
                    </span>
                  ))}
                  <svg
                    className="w-4 h-4 text-[#333333] group-hover:text-[#E8FF58] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 ml-1"
                    fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </a>
              
              {/* Windows Taskbar Style Hover Preview */}
              <div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[40%] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:-translate-y-[60%] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-0 rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#333333] hidden md:block"
                style={{ width: "420px", aspectRatio: "16/9" }}
              >
                <img src={p.image} alt={p.title} className="w-full h-full object-cover object-top scale-105 group-hover:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />
              </div>
              <div className="divider m-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

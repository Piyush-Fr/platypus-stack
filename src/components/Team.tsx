"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const team = [
  {
    name: "Tushar Kaushik",
    role: "Lead Developer",
    tag: "DEV",
    github: "https://github.com/Tusharkaushik1106",
  },
  {
    name: "Shubham Ahuja",
    role: "UI/UX Designer",
    tag: "DESIGN",
    github: "https://github.com/shubhamahuja9999",
  },
  {
    name: "Piyush Thakur",
    role: "Motion Engineer",
    tag: "MOTION",
    github: "https://github.com/Piyush-Fr",
  },
  {
    name: "Purav Bhatt",
    role: "Brand Strategist",
    tag: "BRAND",
    github: "https://github.com/puravbhatt0504",
  },
];

export default function Team() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".team-header",
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 1,
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".member-card",
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".team-grid", start: "top 76%" },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="team"
      className="relative"
      style={{ background: "#111111" }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "160px 32px 96px" }}>

        {/* Header */}
        <div className="team-header" style={{ marginBottom: 64 }}>
          <span className="section-label block mb-4">05 — The Agency</span>
          <div className="flex items-end justify-between">
            <h2
              className="font-extrabold uppercase tracking-tighter leading-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 4.5rem)",
                color: "#EDEDED",
              }}
            >
              OUR TEAM
            </h2>
            <span className="section-label hidden md:block">4 People · Remote</span>
          </div>
        </div>

        <div className="divider mb-0" />

        {/* Team Grid */}
        <div
          className="team-grid grid grid-cols-2 lg:grid-cols-4"
          style={{ gap: "1px", background: "#1E1E1E" }}
        >
          {team.map((member, i) => (
            <a
              key={i}
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="member-card group relative overflow-hidden flex flex-col justify-between p-5 lg:p-10 bg-[#111111] hover:bg-[#161616] transition-colors duration-300 aspect-square lg:aspect-auto lg:min-h-[380px]"
            >
              {/* Background PFP Image + Tint Overlay */}
              <div className="absolute inset-0 z-0 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <img src={`${member.github}.png`} alt={member.name} className="w-full h-full object-cover grayscale-0 lg:grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 lg:scale-105 group-hover:scale-100" />
                <div className="absolute inset-0 bg-black/60 transition-colors duration-500" />
              </div>

              {/* Top: Arrow */}
              <div className="relative z-10 flex items-start justify-end">
                <svg
                  className="w-3.5 h-3.5 text-[#E8FF58] lg:text-[#333333] opacity-100 lg:opacity-0 group-hover:opacity-100 group-hover:text-[#E8FF58] transition-all duration-300"
                  fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Bottom: name */}
              <div className="relative z-10">
                <h3
                  className="font-extrabold uppercase tracking-tight text-[#E8FF58] lg:text-[#EDEDED] group-hover:text-[#E8FF58] transition-colors duration-300 mb-4"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
                  }}
                >
                  {member.name}
                </h3>
                <span
                  className="text-[10px] font-semibold uppercase tracking-widest text-[#E8FF58] lg:text-[#333333] group-hover:text-[#E8FF58] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  GitHub ↗
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 rounded-none bg-[#0A0A0A]/60 backdrop-blur-md border-b border-[#1E1E1E]"
    >
      <div
        style={{ maxWidth: 1440 }}
        className="mx-auto px-8 h-[72px] flex items-center justify-between"
      >
        {/* Left: Empty (was Brand Name) */}
        <div className="flex-1 flex justify-start"></div>

        {/* Center: Logo */}
        <div className="flex-1 flex justify-center pointer-events-auto">
          <Link href="/" className="w-9 h-9 relative flex items-center justify-center hover:scale-105 transition-transform duration-300">
            <Image
              src="/platypus.png"
              alt="Platypus logo"
              width={36}
              height={36}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Right: CTA */}
        <div className="flex-1 flex justify-end items-center gap-5 pointer-events-auto">
          {/* Available pill */}
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8FF58]" />
            <span
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.15em" }}
              className="text-[10px] font-bold uppercase text-[#888888]"
            >
              Available
            </span>
          </div>

          <Link href="#connect" className="btn-primary text-xs">
            Start a Project
          </Link>
        </div>
      </div>
    </header>
  );
}

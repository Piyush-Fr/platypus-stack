"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Lock scroll while preloader is active
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0); // Force to top
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setIsComplete(true);
      }
    });

    // 1. Fill up the logo
    tl.fromTo(fillRef.current, {
      clipPath: "inset(100% 0 0 0)"
    }, {
      clipPath: "inset(0% 0 0 0)",
      duration: 2.0,
      ease: "power2.inOut"
    })
    // 2. Fade out logo container quickly
    .to(logoContainerRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.4,
      ease: "power2.inOut"
    }, "+=0.2")
    // 3. Open the horizontal curtains (top goes up, bottom goes down)
    .to(topCurtainRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut"
    }, "open")
    .to(bottomCurtainRef.current, {
      yPercent: 100,
      duration: 1.2,
      ease: "power4.inOut"
    }, "open");

  }, { scope: containerRef });

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-auto"
    >
      {/* Top Half Curtain */}
      <div 
        ref={topCurtainRef}
        className="absolute top-0 left-0 w-full h-[50vh] origin-top"
        style={{ background: "#0A0A0A" }}
      />
      
      {/* Bottom Half Curtain */}
      <div 
        ref={bottomCurtainRef}
        className="absolute bottom-0 left-0 w-full h-[50vh] origin-bottom border-t border-[#1a1a1a]"
        style={{ background: "#0A0A0A" }}
      />

      {/* Logo Fill Animation */}
      <div 
        ref={logoContainerRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="relative w-32 h-32 md:w-40 md:h-40">
          {/* Dimmed background logo */}
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/platypus.png"
              alt="Loading..."
              fill
              className="object-contain"
              priority
            />
          </div>
          
          {/* Filled foreground logo */}
          <div 
            ref={fillRef}
            className="absolute inset-0"
            style={{ clipPath: "inset(100% 0 0 0)" }}
          >
            <Image
              src="/platypus.png"
              alt="Loading..."
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}

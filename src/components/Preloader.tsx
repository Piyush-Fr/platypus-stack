"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
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
    // 3. Fade out the entire preloader
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut"
    });

  }, { scope: containerRef });

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-auto flex items-center justify-center"
      style={{ background: "#0A0A0A" }}
    >
      {/* Logo Fill Animation */}
      <div 
        ref={logoContainerRef}
        className="relative w-32 h-32 md:w-40 md:h-40 pointer-events-none"
      >
        {/* Dimmed background logo */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/logo.png"
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
            src="/logo.png"
            alt="Loading..."
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}

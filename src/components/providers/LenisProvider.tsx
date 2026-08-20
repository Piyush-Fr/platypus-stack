"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard expo out easing
      autoRaf: false, // Let GSAP ticker drive Lenis RAF
    });

    // Notify ScrollTrigger on Lenis scroll
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    
    lenis.on("scroll", handleScroll);

    // Hook Lenis into GSAP ticker
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000); // convert seconds to ms
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.off("scroll", handleScroll);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

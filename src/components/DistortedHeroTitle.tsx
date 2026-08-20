"use client";

import React, { useRef, useEffect } from "react";

const SPRING_TENSION = 0.2;
const SPRING_FRICTION = 0.7;
const SLICE_HEIGHT = 2;
const INTERACTION_RADIUS = 60;
const PUSH_FORCE = 0.15;
const MAX_OFFSET = 60; // Max pixels a slice can be displaced

export default function DistortedHeroTitle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let textCanvas: HTMLCanvasElement;
    let textCtx: CanvasRenderingContext2D;
    let slices: { y: number; xOffset: number; velocity: number }[] = [];

    let mouse = { x: -1000, y: -1000, vx: 0, vy: 0 };
    let lastMouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      if (lastMouse.x !== -1000) {
        mouse.vx = currentX - lastMouse.x;
        mouse.vy = currentY - lastMouse.y;
      }

      // Cap extreme velocities from switching windows/tabs
      if (Math.abs(mouse.vx) > 50) mouse.vx = Math.sign(mouse.vx) * 50;

      mouse.x = currentX;
      mouse.y = currentY;

      lastMouse.x = currentX;
      lastMouse.y = currentY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.vx = 0;
      mouse.vy = 0;
      lastMouse.x = -1000;
      lastMouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const initCanvas = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      textCanvas = document.createElement("canvas");
      textCanvas.width = width * dpr;
      textCanvas.height = height * dpr;
      textCtx = textCanvas.getContext("2d") as CanvasRenderingContext2D;
      textCtx.scale(dpr, dpr);

      // Render Text
      textCtx.clearRect(0, 0, width, height);
      textCtx.fillStyle = "#FFFFFF";
      textCtx.textBaseline = "middle";
      textCtx.textAlign = "center";
      
      const fontSize = Math.min(width * 0.18, 400); 
      textCtx.font = `900 ${fontSize}px "Space Grotesk", "Inter", sans-serif`;

      // Draw slightly shifted up to align visually
      textCtx.fillText("PLATYPUS", width / 2, height / 2 + fontSize * 0.05);

      const numSlices = Math.ceil(height / SLICE_HEIGHT);
      slices = Array.from({ length: numSlices }).map((_, i) => ({
        y: i * SLICE_HEIGHT,
        xOffset: 0,
        velocity: 0,
      }));
    };

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const dpr = window.devicePixelRatio || 1;

      for (let i = 0; i < slices.length; i++) {
        const slice = slices[i];

        if (mouse.x !== -1000) {
          const dy = mouse.y - slice.y;
          const dist = Math.abs(dy);

          if (dist < INTERACTION_RADIUS) {
            // Gaussian-like falloff for smoother distortion curve
            const influence = Math.exp(-(dist * dist) / (2 * (INTERACTION_RADIUS / 2) * (INTERACTION_RADIUS / 2)));
            slice.velocity += mouse.vx * influence * PUSH_FORCE;
          }
        }

        const force = -slice.xOffset * SPRING_TENSION;
        slice.velocity += force;
        slice.velocity *= SPRING_FRICTION;
        slice.xOffset += slice.velocity;

        // Hard clamp to prevent the text from smearing indefinitely
        if (slice.xOffset > MAX_OFFSET) slice.xOffset = MAX_OFFSET;
        if (slice.xOffset < -MAX_OFFSET) slice.xOffset = -MAX_OFFSET;

        // Ensure we don't try to draw outside bounds which causes IndexSizeError
        if (slice.y >= height) continue;
        const currentSliceHeight = Math.min(SLICE_HEIGHT, height - slice.y);

        ctx.drawImage(
          textCanvas,
          0, slice.y * dpr, width * dpr, currentSliceHeight * dpr, 
          slice.xOffset, slice.y, width, currentSliceHeight
        );
      }

      mouse.vx *= 0.5;
      mouse.vy *= 0.5;

      animationFrameId = requestAnimationFrame(render);
    };

    document.fonts.ready.then(() => {
      initCanvas();
      render();
    });

    const handleResize = () => {
      initCanvas();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[60vh] md:h-[70vh] flex items-center justify-center cursor-crosshair">
      <canvas ref={canvasRef} className="block pointer-events-none" />
    </div>
  );
}

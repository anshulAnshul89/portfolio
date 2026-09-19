"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Configuration
  const frameCount169 = 239;
  const frameCount916 = 240;

  useEffect(() => {
    // 1. Initialize Lenis for Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 2. Setup Canvas and Preload Images
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let isMobile = window.innerWidth <= 768;
    let frameCount = isMobile ? frameCount916 : frameCount169;
    const folder = isMobile ? "frames916" : "frames169";

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const currentFrame = (index: number) =>
      `/${folder}/frame_${String(index).padStart(3, "0")}.jpg`;

    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (i === 1) {
          render(0); // Render first frame immediately once loaded
        }
        if (loadedCount === frameCount) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        console.error("Failed to load frame:", img.src);
        // Still increment to not block loading indefinitely
        loadedCount++;
        if (loadedCount === frameCount) {
          setImagesLoaded(true);
        }
      };
      images.push(img);
    }

    const render = (index: number) => {
      if (images[index] && images[index].complete) {
        // Draw image covering the canvas (object-fit: cover equivalent for canvas)
        const img = images[index];
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
          drawHeight = canvas.width / imgRatio;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    // 3. Setup GSAP ScrollTrigger
    const frameObj = { frame: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    tl.to(frameObj, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: () => render(frameObj.frame),
    }, 0); // Start at beginning of timeline

    // Animate text: fade in and scale up as user scrolls
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.2, // take up first 20% of the scroll timeline
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "20% top", // Finishes animating 20% down
            scrub: true,
          }
        }
      );
      
      // Optional: Fade out near the end
      gsap.to(textRef.current, {
        opacity: 0,
        scale: 1.1,
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "80% top", // Starts fading out at 80% scroll
          end: "bottom bottom",
          scrub: true,
        }
      });
    }

    // Handle Resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const newIsMobile = window.innerWidth <= 768;
      if (newIsMobile !== isMobile) {
        // Simple reload on breakpoint crossing to fetch correct frames
        window.location.reload(); 
      } else {
        render(frameObj.frame);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      ScrollTrigger.getAll().forEach(t => t.kill());
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 3D Text CSS directly applied for convenience
  const text3DStyle = {
    textShadow: `
      1px 1px 0 #555, 
      2px 2px 0 #444, 
      3px 3px 0 #333, 
      4px 4px 0 #222, 
      5px 5px 0 #111, 
      6px 6px 5px rgba(0,0,0,0.8),
      0 0 15px rgba(255,255,255,0.2)
    `,
  };

  return (
    <div ref={containerRef} className="relative w-full h-[600vh] bg-transparent">
      {!imagesLoaded && (
        <div className="fixed inset-0 flex items-center justify-center text-white z-50 pointer-events-none font-sans">
          Loading frames...
        </div>
      )}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block" />
        
        {/* Overlay Content */}
        <div 
          ref={textRef}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 text-white mix-blend-difference px-4 text-center"
        >
          <h1 
            className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-[0.1em] mb-8"
            style={text3DStyle}
          >
            Anshul
          </h1>
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-sm md:text-base lg:text-xl font-bold tracking-widest uppercase opacity-90 max-w-5xl">
            <span>Web Designer</span>
            <span className="hidden md:inline text-gray-500">•</span>
            <span>Social Media</span>
            <span className="hidden md:inline text-gray-500">•</span>
            <span>Scripting</span>
            <span className="hidden md:inline text-gray-500">•</span>
            <span>Video Editing</span>
            <span className="hidden md:inline text-gray-500">•</span>
            <span>Meta Ads</span>
            <span className="hidden md:inline text-gray-500">•</span>
            <span>GMB</span>
          </div>
        </div>
      </div>
    </div>
  );
}

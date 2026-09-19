"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const galleryData = [
  {
    src: "graphicdesigner.png",
    title: "Brand Identity",
    desc: "Complete visual overhaul and modern aesthetic design.",
  },
  {
    src: "webdev.png",
    title: "Web Experience",
    desc: "Interactive landing pages built for high conversion.",
  },
  {
    src: "socialmediamanagement.png",
    title: "Social Campaigns",
    desc: "Engaging social media assets and Meta ad creatives.",
  },
  {
    src: "metaads.png",
    title: "Product Launch",
    desc: "Strategic design for launching new digital products.",
  },
  {
    src: "videoediting.png",
    title: "Motion Graphics",
    desc: "Smooth animations and video editing for modern web.",
  },
  {
    src: "google my business .png",
    title: "Digital Marketing",
    desc: "Data-driven SEO setups and Google My Business optimization.",
  },
];

export default function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const textSliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !sliderRef.current || !textSliderRef.current) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".gallery-item");
      const textSections = gsap.utils.toArray(".text-item");
      
      // Animate both the images and the text simultaneously
      gsap.to([sections, textSections], {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center center",
          pin: true,
          scrub: 1,
          end: () => "+=" + (sliderRef.current?.offsetWidth || 0) * 0.5,
        },
      });
    }, containerRef);

    return () => {
      ctx.revert(); 
    };
  }, []);

  const cardColors = [
    "bg-amber-200",
    "bg-sky-200",
    "bg-emerald-200",
    "bg-fuchsia-200",
    "bg-orange-200",
    "bg-indigo-200",
  ];

  return (
    <div className="w-full overflow-x-hidden overflow-y-visible py-32">
      {/* 
        The pinned container is now taller (e.g. 60vh) to hold both 
        the 33vh chocolate background and the text area underneath.
      */}
      <section ref={containerRef} className="relative h-[60vh] md:h-[70vh] w-full flex flex-col justify-center">
        
        {/* Background Strip removed */}
        
        {/* Title block removed */}

        {/* The Image Scrolling Track */}
        <div 
          ref={sliderRef}
          className="flex w-max items-center mt-[-10vh]"
        >
          {galleryData.map((data, index) => {
            const rotationClass = index % 2 === 0 ? "rotate-[-2deg]" : "rotate-[3deg]";
            const colorClass = cardColors[index % cardColors.length];
            
            return (
              <div 
                key={index} 
                className="gallery-item w-[100vw] md:w-[60vw] lg:w-[45vw] flex items-center justify-center flex-shrink-0 px-4 md:px-8"
              >
                <div 
                  className={`relative w-full h-[45vh] md:h-[50vh] ${colorClass} p-3 md:p-5 pb-10 md:pb-14 shadow-2xl ${rotationClass} hover:rotate-0 hover:scale-[1.03] hover:z-20 transition-all duration-500 rounded-lg`}
                  style={{
                    clipPath: "polygon(1% 2%, 5% 0%, 15% 3%, 25% 0%, 35% 2%, 45% 0%, 55% 2%, 65% 0%, 75% 3%, 85% 0%, 95% 2%, 99% 1%, 98% 15%, 100% 25%, 98% 35%, 100% 45%, 97% 55%, 100% 65%, 98% 75%, 100% 85%, 98% 95%, 99% 99%, 95% 98%, 85% 100%, 75% 97%, 65% 100%, 55% 98%, 45% 100%, 35% 98%, 25% 100%, 15% 97%, 5% 100%, 1% 99%, 2% 85%, 0% 75%, 3% 65%, 0% 55%, 2% 45%, 0% 35%, 2% 25%, 0% 15%)"
                  }}
                >
                  <div className="relative w-full h-full overflow-hidden bg-black/20 rounded-md">
                    <Image
                      src={`/assets/${data.src}`}
                      alt={data.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* The Text Scrolling Track (Appears in the blank spot below) */}
        <div 
          ref={textSliderRef}
          className="flex w-max items-start mt-8 md:mt-12"
        >
          {galleryData.map((data, index) => (
            <div 
              key={index} 
              className="text-item w-[100vw] md:w-[60vw] lg:w-[45vw] flex flex-col items-center text-center flex-shrink-0 px-8"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{data.title}</h3>
              <p className="text-gray-400 max-w-sm">{data.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 px-8 py-4 flex justify-between items-center text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-32'}`}>
      <div className="text-2xl font-bold tracking-tighter">
        <Link href="/">ANSHUL.</Link>
      </div>
      <ul className="flex gap-4 md:gap-8 text-xs md:text-sm uppercase tracking-widest font-semibold">
        <li>
          <Link href="#work" className="hover:text-rose-500 transition-colors">Work</Link>
        </li>
        <li>
          <Link href="#projects" className="hover:text-rose-500 transition-colors">Projects</Link>
        </li>
        <li>
          <Link href="#about" className="hover:text-rose-500 transition-colors">About</Link>
        </li>
        <li>
          <Link href="#contact" className="hover:text-rose-500 transition-colors">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

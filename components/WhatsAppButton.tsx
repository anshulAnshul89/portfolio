import React from "react";
import Link from "next/link";

export default function WhatsAppButton() {
  return (
    <Link
      href="https://wa.me/919039369278" // Using Anshul's provided number with India country code
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:bottom-16 md:right-32 z-50 flex items-center justify-center w-14 h-14 md:w-20 md:h-20 bg-green-500 rounded-full text-white hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(34,197,94,0.6)] hover:shadow-[0_0_25px_rgba(34,197,94,0.9)] group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8 md:w-12 md:h-12"
      >
        <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.146.564 4.167 1.55 5.962L.15 24l6.183-1.62c1.745.926 3.702 1.455 5.765 1.455 6.643 0 12.028-5.385 12.028-12.028S18.674 0 12.031 0zm0 21.84c-1.843 0-3.564-.475-5.068-1.306l-.36-.199-3.722.977.994-3.633-.22-.35A9.972 9.972 0 012.057 12.03c0-5.52 4.49-10.01 10.012-10.01 5.523 0 10.011 4.49 10.011 10.01 0 5.522-4.488 10.01-10.049 10.01zm5.545-7.466c-.304-.152-1.794-.886-2.072-.988-.278-.101-.481-.152-.684.152-.202.304-.784.988-.96 1.19-.178.203-.355.228-.659.076-1.553-.787-2.73-1.442-3.805-2.914-.202-.279.05-.285.45-.678.1-.102.203-.203.253-.304.051-.102.026-.203-.025-.304-.051-.102-.684-1.648-.937-2.256-.247-.594-.497-.514-.683-.523-.178-.01-.38-.01-.582-.01s-.532.076-.81.38c-.279.304-1.064 1.039-1.064 2.533s1.089 2.939 1.24 3.142c.152.202 2.14 3.266 5.18 4.532.723.301 1.286.48 1.727.615.727.23 1.388.197 1.905.12.58-.087 1.794-.735 2.047-1.444.253-.709.253-1.317.178-1.444-.076-.127-.279-.203-.583-.355z" />
      </svg>
      <div className="absolute inset-0 rounded-full border-2 border-green-400 opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
    </Link>
  );
}

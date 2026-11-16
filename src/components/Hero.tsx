import React, { useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { playClickSound } from '../utils/soundEffects';

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Garantizar autoplay en bucle
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const scrollToContent = () => {
    playClickSound();
    const element = document.getElementById('felicitacion');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen w-full flex flex-col justify-end items-center overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      {/* 1. Video en Pantalla Completa: Pura Experiencia Visual Sin Texto */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        tabIndex={-1}
        aria-hidden="true"
        poster="/images/belle_summer_preview.gif"
        className="absolute inset-0 z-0 h-full w-full object-cover object-center filter brightness-[0.92] contrast-[1.08]"
      >
        <source src="/videos/UNDEAD-Belle-Summer.mp4" type="video/mp4" />
      </video>

      {/* 2. Texturas Sutiles: Líneas de Escaneo CRT & Gradientes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 scanline-bg opacity-25"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#090b0e] via-[#090b0e]/70 to-transparent z-10"
      />

      {/* Indicador de Scroll hacia el mensaje de cumpleaños */}
      <button
        onClick={scrollToContent}
        className="relative z-20 mb-8 p-3 rounded-full bg-black/60 hover:bg-black/85 border border-yellow-400/40 text-yellow-400 hover:text-yellow-300 transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-xl animate-bounce flex items-center justify-center"
        aria-label="Ver mensaje de cumpleaños"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
};

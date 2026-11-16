import React from 'react';
import { motion } from 'framer-motion';
import { GACHA_CONFIG } from '../data/gachaConfig';
import { playClickSound } from '../utils/soundEffects';

interface GachaBannerSectionProps {
  onOpenGacha: () => void;
}

export const GachaBannerSection: React.FC<GachaBannerSectionProps> = ({ onOpenGacha }) => {
  return (
    <section id="banner" className="py-16 md:py-24 px-4 sm:px-6 max-w-5xl mx-auto relative">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-3xl sm:text-5xl font-black text-white font-hud tracking-wide uppercase italic mb-2">
          El Banner de Cumpleaños
        </h2>
        <p className="text-slate-300 text-sm sm:text-base font-light">
          Canal Phaethon sintonizado al 100%. Presiona el botón para tirar al gacha y ver qué juego te ganas.
        </p>
      </div>

      {/* Banner Interactive Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="w-full liquid-glass-gold rounded-3xl p-6 sm:p-10 backdrop-blur-2xl border-2 border-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.25)] relative overflow-hidden"
      >
        {/* Tira Hazard en el interior de la tarjeta */}
        <div className="absolute top-0 inset-x-0 h-1.5 hazard-tape" />

        {/* Main Action Call */}
        <div className="flex flex-col items-center justify-center text-center space-y-6 pt-4">
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-4xl font-black text-white font-hud uppercase italic">
              ¿Listo para revelar tu regalo, {GACHA_CONFIG.friendName}?
            </h3>
          </div>

          <button
            onClick={() => {
              playClickSound();
              onOpenGacha();
            }}
            className="w-full sm:w-auto px-10 py-5 rounded-2xl zzz-cut-lg bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:via-amber-300 hover:to-yellow-400 text-slate-950 font-black text-lg sm:text-xl font-hud tracking-widest shadow-2xl hover:shadow-yellow-400/60 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer glow-gold-pulse group"
          >
            <span>SINTONIZAR x1 (PULL S-RANK DE REGALO)</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
};

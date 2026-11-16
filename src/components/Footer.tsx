import React from 'react';
import { Heart } from 'lucide-react';
import { GACHA_CONFIG } from '../data/gachaConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#050912] py-14 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <h3 className="text-2xl sm:text-3xl font-black text-white font-hud tracking-wide mb-4 uppercase italic">
          ¡Feliz Cumpleaños, {GACHA_CONFIG.friendName}!
        </h3>

        {/* Crew Tagline */}
        <div className="flex items-center gap-1.5 text-xs font-mono text-yellow-400">
          <span>Hecho con cariño</span>
          <Heart className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span>por Diezos</span>
        </div>
      </div>
    </footer>
  );
};

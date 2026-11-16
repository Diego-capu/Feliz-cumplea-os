import React from 'react';
import { Disc, Shield, Gift, Volume2, VolumeX } from 'lucide-react';
import { playClickSound } from '../utils/soundEffects';

interface NavbarProps {
  onOpenGacha?: () => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isMusicPlaying,
  onToggleMusic,
}) => {
  return (
    <header className="fixed top-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between sm:justify-center gap-4 sm:gap-6 px-6 py-2.5 rounded-full liquid-pill border border-yellow-400/30 shadow-2xl">
        {/* Navigation Quick Links */}
        <div className="flex items-center gap-5 sm:gap-7 text-xs sm:text-sm font-hud tracking-wider text-slate-300">
          <a
            href="#felicitacion"
            onClick={playClickSound}
            className="hover:text-yellow-400 transition-colors flex items-center gap-1.5"
          >
            <Shield className="w-4 h-4 text-yellow-400" />
            <span>Cumpleaños</span>
          </a>
          <a
            href="#banner"
            onClick={playClickSound}
            className="hover:text-yellow-400 transition-colors flex items-center gap-1.5"
          >
            <Gift className="w-4 h-4 text-yellow-400" />
            <span>Banner Gacha</span>
          </a>
          <a
            href="#random-play"
            onClick={playClickSound}
            className="hover:text-yellow-400 transition-colors flex items-center gap-1.5"
          >
            <Disc className="w-4 h-4 text-yellow-400" />
            <span>Random Play</span>
          </a>
        </div>

        {/* Music Toggle */}
        <button
          onClick={() => {
            playClickSound();
            onToggleMusic();
          }}
          title={isMusicPlaying ? 'Pausar música' : 'Reproducir música'}
          className="p-1.5 sm:p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer ml-1 sm:ml-2"
        >
          {isMusicPlaying ? (
            <Volume2 className="w-4 h-4 text-yellow-400 animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>
      </nav>
    </header>
  );
};

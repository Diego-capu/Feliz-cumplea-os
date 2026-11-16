import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Disc } from 'lucide-react';
import DiscCascadeCarousel, { type DiscCascadeItem } from './ui/disc-cascade-carousel';
import { GACHA_CONFIG } from '../data/gachaConfig';
import { playClickSound } from '../utils/soundEffects';

export const RandomPlayVault: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Mapeamos los 3 juegos a los items de DiscCascadeCarousel (Componente de 21st)
  const discItems: DiscCascadeItem[] = GACHA_CONFIG.games.map((game) => ({
    title: game.title,
    label: game.tag,
    labelStyle: 'block',
    palette: game.discPalette,
    src: game.coverImage,
    credits: [
      { label: 'Estudio', value: game.developer },
      { label: 'Rareza', value: '5★ DORADO' },
      { label: 'Lanzamiento', value: game.releaseYear },
    ],
    reviews: [
      {
        source: 'Belle // Random Play',
        quote: game.quote,
        stars: 5,
      },
    ],
  }));

  const currentGame = GACHA_CONFIG.games[activeIndex] || GACHA_CONFIG.games[0];

  return (
    <section id="random-play" className="py-20 md:py-32 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Glow ambiental */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-yellow-500/10 blur-[120px] pointer-events-none rounded-full"
      />

      {/* Header Sección */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-hud tracking-wide mb-3">
          Las 3 Cintas Candidatas al Regalo
        </h2>
        <p className="text-slate-300 text-sm sm:text-base font-light">
          Belle ha seleccionado tres de las mejores obras de los videojuegos. Desliza o gira los discos para explorar cada título candidato.
        </p>
      </div>

      {/* Tarjeta de Anfitriona: Belle */}
      <div className="max-w-2xl mx-auto mb-10 p-4 rounded-2xl liquid-glass border border-yellow-500/20 flex items-center gap-4">
        <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-yellow-400/50">
          <img
            src="/images/belle_chibi_icon.jpg"
            alt="Belle"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-yellow-400/10" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-xs font-bold font-hud text-yellow-300">
              BELLE
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 italic">
            "¡Ey {GACHA_CONFIG.friendName}! Estos tres juegos son joyas absolutas. Cualquiera que te toque en la sintonización dorada te va a dar cientos de horas de vicio."
          </p>
        </div>
      </div>

      {/* 21st UI Component: Disc Cascade Carousel */}
      <div className="relative w-full rounded-3xl liquid-glass border border-yellow-500/20 p-6 sm:p-10 overflow-hidden mb-10 shadow-2xl">
        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Disc className="w-5 h-5 text-yellow-400 animate-spin" />
            <span className="text-xs font-mono text-slate-300 tracking-wider">
              ESTUCHES FÍSICOS DE COLECCIÓN
            </span>
          </div>
          <span className="text-xs font-mono text-amber-300">
            JUEGO {activeIndex + 1} DE 3
          </span>
        </div>

        {/* El carrusel de 21st */}
        <div className="py-4">
          <DiscCascadeCarousel
            items={discItems}
            index={activeIndex}
            onIndexChange={(idx) => {
              playClickSound();
              setActiveIndex(idx);
            }}
            isSpinning={false}
            height="200px"
            discSize="clamp(130px, 32vw, 160px)"
            spacing={0.82}
            rise={0.08}
            depth={0.35}
            yaw={12}
            fan={-8}
            tilt={-4}
            roll={22}
            spin={15}
          />
        </div>

        {/* Detalle del Juego Activo */}
        <motion.div
          key={currentGame.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8 pt-6 border-t border-white/10"
        >
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-hud tracking-wide">
              {currentGame.title}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              {currentGame.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

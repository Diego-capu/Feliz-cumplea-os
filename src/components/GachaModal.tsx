import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { X, RotateCcw, CheckCircle2, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import { GACHA_CONFIG, type GameItem } from '../data/gachaConfig';
import { playClickSound, playGold5StarChime } from '../utils/soundEffects';

interface GachaModalProps {
  isOpen: boolean;
  onClose: () => void;
  volume: number;
  onVolumeChange?: (vol: number) => void;
  isMuted: boolean;
  onToggleMute?: () => void;
}

type GachaPhase = 'video' | 'reveal';

export const GachaModal: React.FC<GachaModalProps> = ({
  isOpen,
  onClose,
  volume,
  onVolumeChange,
  isMuted,
  onToggleMute,
}) => {
  const [phase, setPhase] = useState<GachaPhase>('video');
  const [selectedGame, setSelectedGame] = useState<GameItem>(GACHA_CONFIG.games[0]);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const effectiveMuted = isMuted || isVideoMuted;
  const targetVolume = Math.max(0, Math.min(1, volume));

  // Sincronizar el volumen del video del gacha con la barra de sonido
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = targetVolume;
      videoRef.current.muted = effectiveMuted;
    }
  }, [targetVolume, effectiveMuted]);

  // Lanza el confetti dorado S-Rank de New Eridu
  const triggerConfetti = useCallback(() => {
    try {
      const count = 250;
      const defaults = { origin: { y: 0.65 }, zIndex: 9999 };

      function fire(particleRatio: number, opts: confetti.Options) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      fire(0.25, {
        spread: 30,
        startVelocity: 60,
        colors: ['#facc15', '#f59e0b', '#ffffff'],
      });
      fire(0.2, {
        spread: 70,
        colors: ['#00f0ff', '#facc15', '#ca8a04'],
      });
      fire(0.35, {
        spread: 110,
        decay: 0.91,
        scalar: 0.9,
        colors: ['#ffd700', '#facc15', '#ffffff'],
      });
      fire(0.1, {
        spread: 130,
        startVelocity: 30,
        decay: 0.92,
        scalar: 1.2,
      });
    } catch (e) {
      console.warn('Confetti trigger skipped', e);
    }
  }, []);

  const triggerReveal = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setPhase('reveal');
    playGold5StarChime();
    triggerConfetti();
  }, [triggerConfetti]);

  // Iniciar tirada y reproducir el video oficial de ZZZ
  const startPull = useCallback(() => {
    // Determinar juego ganador
    let winnerIndex = 0;
    if (GACHA_CONFIG.forcedWinnerIndex !== null) {
      winnerIndex = GACHA_CONFIG.forcedWinnerIndex % GACHA_CONFIG.games.length;
    } else {
      winnerIndex = Math.floor(Math.random() * GACHA_CONFIG.games.length);
    }
    setSelectedGame(GACHA_CONFIG.games[winnerIndex]);

    setPhase('video');

    // Reproducir video ZZZ con el volumen sincronizado de la música
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.volume = targetVolume;
        videoRef.current.muted = effectiveMuted;
        videoRef.current.play().catch(() => {
          // Si el navegador bloquea autoplay con sonido, mutear y reproducir
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsVideoMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      }
    }, 150);
  }, [targetVolume, effectiveMuted]);

  // Al abrir el modal
  useEffect(() => {
    if (isOpen) {
      startPull();
    }
  }, [isOpen, startPull]);

  // Manejar el final del video
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      // El video dura 22 segundos; al acercarse al final o en onEnded se dispara la revelación
      if (videoRef.current.currentTime >= 21.5 && phase === 'video') {
        triggerReveal();
      }
    }
  };

  const handleSkip = () => {
    playClickSound();
    triggerReveal();
  };

  const toggleVideoMute = () => {
    playClickSound();
    if (onToggleMute) {
      onToggleMute();
      if (isVideoMuted) setIsVideoMuted(false);
    } else {
      if (videoRef.current) {
        videoRef.current.muted = !isVideoMuted;
        setIsVideoMuted(!isVideoMuted);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Backdrop Oscuro Inmersivo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
          onClick={phase === 'reveal' ? onClose : undefined}
        />

        {/* 1. FASE DE VIDEO: PULL ANIMATION OFICIAL DE ZENLESS ZONE ZERO */}
        {phase === 'video' && (
          <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
            {/* Controles de Video con volumen sincronizado a la barra de música */}
            <div className="w-full flex items-center justify-between mb-3 px-2 text-xs font-mono gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/70 border border-yellow-400/30 backdrop-blur-md">
                <button
                  onClick={toggleVideoMute}
                  className="text-slate-300 hover:text-yellow-400 transition-colors flex items-center gap-1 cursor-pointer"
                  title={effectiveMuted ? 'Activar sonido' : 'Mutear sonido'}
                >
                  {effectiveMuted ? (
                    <VolumeX className="w-4 h-4 text-red-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-yellow-400" />
                  )}
                </button>

                <div className="flex items-center gap-1.5">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.02"
                    value={effectiveMuted ? 0 : volume}
                    onChange={(e) => {
                      const newVol = parseFloat(e.target.value);
                      onVolumeChange?.(newVol);
                      if (effectiveMuted && onToggleMute) {
                        onToggleMute();
                      }
                      if (isVideoMuted) setIsVideoMuted(false);
                    }}
                    className="w-20 sm:w-28 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-yellow-400 hover:accent-yellow-300"
                    title={`Volumen: ${effectiveMuted ? '0%' : Math.round(volume * 100) + '%'}`}
                  />
                  <span className="text-[10px] font-mono text-slate-300 w-7 text-right">
                    {effectiveMuted ? '0%' : `${Math.round(volume * 100)}%`}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSkip}
                className="px-4 py-1.5 rounded zzz-cut bg-yellow-400 hover:bg-yellow-300 text-slate-950 text-xs font-bold font-hud tracking-wider transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-yellow-400/30 shrink-0"
              >
                <span>SALTAR</span>
              </button>
            </div>

            {/* Marco de Pantalla CRT con el Video Oficial ZZZ */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-yellow-400/60 shadow-[0_0_50px_rgba(250,204,21,0.35)] bg-black">
              {/* Líneas de Escaneo CRT */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10 scanline-bg opacity-30"
              />

              {/* Tiras de Advertencia ZZZ en las esquinas */}
              <div className="absolute top-0 inset-x-0 h-1.5 hazard-tape z-10" />
              <div className="absolute bottom-0 inset-x-0 h-1.5 hazard-tape z-10" />

              <video
                ref={videoRef}
                src="/videos/video_project_5.mp4"
                playsInline
                onLoadedMetadata={() => {
                  if (videoRef.current) {
                    videoRef.current.volume = targetVolume;
                    videoRef.current.muted = effectiveMuted;
                  }
                }}
                onPlay={() => {
                  if (videoRef.current) {
                    videoRef.current.volume = targetVolume;
                  }
                }}
                onTimeUpdate={handleTimeUpdate}
                onEnded={triggerReveal}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Pie de pantalla con instrucciones */}
            <div className="mt-3 text-center text-xs text-slate-400 font-mono tracking-wider">
              SINTONIZANDO SEÑAL S-RANK // PROXY: {GACHA_CONFIG.friendName}
            </div>
          </div>
        )}

        {/* 2. FASE DE REVELACIÓN: EL JUEGO GANADOR CON ESTILO S-RANK DE ZZZ */}
        {phase === 'reveal' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 22, stiffness: 200 }}
            className="relative z-10 w-full max-w-2xl bg-[#0d1017] border-2 border-yellow-400 rounded-3xl p-6 sm:p-9 shadow-[0_0_80px_rgba(250,204,21,0.4)] overflow-hidden"
          >
            {/* Tiras Hazard en bordes */}
            <div className="absolute top-0 inset-x-0 h-2 hazard-tape" />

            {/* Botón Cerrar */}
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-6 pt-2">
              <h2 className="text-2xl sm:text-4xl font-black text-white font-hud tracking-wide uppercase italic">
                ¡FELICIDADES, {GACHA_CONFIG.friendName}!
              </h2>
            </div>

            {/* Tarjeta Visual del Juego Ganador estilo Cinta ZZZ */}
            <div className="relative rounded-2xl overflow-hidden border border-yellow-400/50 bg-black/60 p-5 sm:p-6 mb-6 shadow-inner">
              <div className="flex flex-col sm:flex-row gap-5 items-center">
                {/* Carátula */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-xl overflow-hidden shrink-0 border-2 border-yellow-400 shadow-xl group">
                  <img
                    src={selectedGame.coverImage}
                    alt={selectedGame.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-yellow-400 text-slate-950 font-mono font-black text-[10px]">
                    S-RANK
                  </div>
                </div>

                {/* Info del Juego */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-yellow-400/20 text-yellow-300 text-xs font-mono font-semibold">
                      {selectedGame.tag}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {selectedGame.developer} · {selectedGame.releaseYear}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white font-hud tracking-wider mb-2 text-yellow-300 uppercase">
                    {selectedGame.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
                    {selectedGame.description}
                  </p>

                  <div className="p-2.5 rounded-lg bg-yellow-400/10 border-l-2 border-yellow-400 text-xs text-yellow-200 italic font-mono mb-2">
                    "{selectedGame.quote}"
                  </div>

                  {selectedGame.steamUrl && (
                    <a
                      href={selectedGame.steamUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-yellow-400 hover:text-yellow-300 font-mono underline underline-offset-4"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Ver ficha en Steam</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => {
                  playClickSound();
                  startPull();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white text-xs font-hud tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>REPETIR ANIMACIÓN ZZZ</span>
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl zzz-cut bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-slate-950 font-black text-xs sm:text-sm font-hud tracking-wider shadow-xl shadow-yellow-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>¡RECLAMAR REGALO CON LA CREW!</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

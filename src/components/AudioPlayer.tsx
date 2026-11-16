import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, Volume, Volume1, Volume2, VolumeX, SkipForward } from 'lucide-react';
import { playClickSound } from '../utils/soundEffects';

interface AudioPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onPlaybackStateChange?: (playing: boolean) => void;
}

const PLAYLIST = [
  {
    title: 'Burning Desires',
    file: '/music/burning_desires.mp3',
  },
  {
    title: 'Tu Cumpleaños',
    file: '/music/cumpleanos_diomedes.mp3',
  },
];

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  isPlaying,
  onTogglePlay,
  onPlaybackStateChange,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.2); // Volumen por defecto al 20%

  const currentSong = PLAYLIST[currentTrackIndex];

  // Configurar volumen al 20% por defecto e intentar reproducir automáticamente
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Fijar volumen al 20%
    audio.volume = 0.2;

    // Intento 1: Reproducción directa
    const tryAutoplay = () => {
      audio
        .play()
        .then(() => {
          onPlaybackStateChange?.(true);
        })
        .catch(() => {
          // Activador reactivo si el navegador bloquea la reproducción sin interacción
          const handleFirstInteraction = () => {
            audio
              .play()
              .then(() => {
                onPlaybackStateChange?.(true);
              })
              .catch(() => {});
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('pointerdown', handleFirstInteraction);
            window.removeEventListener('scroll', handleFirstInteraction);
            window.removeEventListener('keydown', handleFirstInteraction);
          };

          window.addEventListener('click', handleFirstInteraction, { once: true });
          window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
          window.addEventListener('scroll', handleFirstInteraction, { once: true });
          window.addEventListener('keydown', handleFirstInteraction, { once: true });
        });
    };

    tryAutoplay();
  }, [onPlaybackStateChange]);

  // Sincronizar play/pause con los botones de la interfaz
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Manejar cambio de canción
  const handleNextTrack = () => {
    playClickSound();
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  // Cuando cambia el track, cargar y reproducir si corresponde
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentSong.file;
      audioRef.current.volume = isMuted ? 0 : volume;
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [currentTrackIndex]);

  // Sincronizar cambios de volumen
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      if (newVol > 0 && isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  const toggleMute = () => {
    playClickSound();
    if (audioRef.current) {
      const nextMuted = !isMuted;
      audioRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  // Icono dinámico según el volumen actual
  const renderVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX className="w-4 h-4 text-red-400" />;
    if (volume < 0.35) return <Volume className="w-4 h-4 text-yellow-300" />;
    if (volume < 0.7) return <Volume1 className="w-4 h-4 text-yellow-400" />;
    return <Volume2 className="w-4 h-4 text-yellow-400" />;
  };

  return (
    <aside
      aria-label="Reproductor de música de cumpleaños"
      className="fixed bottom-4 left-4 z-40 flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl liquid-pill border border-yellow-400/30 shadow-2xl backdrop-blur-xl text-white max-w-[360px] sm:max-w-md"
    >
      <audio
        ref={audioRef}
        src={currentSong.file}
        playsInline
        onEnded={handleNextTrack}
        onPlay={() => onPlaybackStateChange?.(true)}
        onPause={() => onPlaybackStateChange?.(false)}
      />

      {/* Mini Avatar Belle con giro al reproducir */}
      <div
        className={`w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-400 shadow-md flex items-center justify-center shrink-0 ${
          isPlaying ? 'animate-spin' : ''
        }`}
        style={{ animationDuration: '4s' }}
      >
        <img
          src="/images/belle_chibi_icon.jpg"
          alt="Belle"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info de la Canción */}
      <div className="flex-1 min-w-0 pr-1">
        <div className="text-xs font-bold font-hud truncate text-white uppercase">
          {currentSong.title}
        </div>
      </div>

      {/* Controles: Play/Pause + Siguiente + Control de Volumen */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={() => {
            playClickSound();
            onTogglePlay();
          }}
          className="p-2 rounded-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 transition-transform hover:scale-105 active:scale-95 cursor-pointer shrink-0"
          title={isPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-950" />}
        </button>

        <button
          onClick={handleNextTrack}
          className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-yellow-400 transition-colors cursor-pointer shrink-0"
          title="Siguiente canción"
        >
          <SkipForward className="w-4 h-4" />
        </button>

        {/* Control Deslizante de Volumen */}
        <div className="flex items-center gap-1.5 pl-1 border-l border-white/10">
          <button
            onClick={toggleMute}
            className="p-1 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={isMuted ? 'Desmutear' : 'Mutear'}
          >
            {renderVolumeIcon()}
          </button>

          <div className="flex items-center gap-1">
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-14 sm:w-20 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-yellow-400 hover:accent-yellow-300"
              title={`Volumen: ${isMuted ? '0%' : Math.round(volume * 100) + '%'}`}
            />
            <span className="text-[10px] font-mono text-slate-400 w-6 text-right hidden sm:inline-block">
              {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

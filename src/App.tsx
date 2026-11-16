import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { BirthdayGreeting } from './components/BirthdayGreeting';
import { GachaBannerSection } from './components/GachaBannerSection';
import { RandomPlayVault } from './components/RandomPlayVault';
import { GachaModal } from './components/GachaModal';
import { AudioPlayer } from './components/AudioPlayer';
import { Footer } from './components/Footer';

export function App(): React.JSX.Element {
  const [isGachaOpen, setIsGachaOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [wasMusicPlayingBeforeGacha, setWasMusicPlayingBeforeGacha] = useState(true);
  const [volume, setVolume] = useState(0.2); // 20% por defecto
  const [isMuted, setIsMuted] = useState(false);

  const handleOpenGacha = () => {
    setWasMusicPlayingBeforeGacha(isMusicPlaying);
    setIsMusicPlaying(false);
    setIsGachaOpen(true);
  };

  const handleCloseGacha = () => {
    setIsGachaOpen(false);
    if (wasMusicPlayingBeforeGacha) {
      setIsMusicPlaying(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#090b0e] text-[#f8fafc] selection:bg-yellow-400/30 selection:text-yellow-200 font-sans">
      {/* Main Content Sections con la Nueva Jerarquía */}
      <main>
        {/* 1. Hero: Video puro a pantalla completa sin texto */}
        <Hero />

        {/* 2. Felicitación de Cumpleaños a Zopas + Mensaje de Belle donde su regalo es el Banner */}
        <BirthdayGreeting />

        {/* 3. Random Play Vault: Las 3 Cintas en 3D Disc Carousel de 21st */}
        <RandomPlayVault />

        {/* 4. El Banner Gacha S-Rank */}
        <GachaBannerSection onOpenGacha={handleOpenGacha} />
      </main>

      {/* Terminal Footer de New Eridu */}
      <Footer />

      {/* Interactive Gacha Modal (Cinemática del video ZZZ con volumen sincronizado) */}
      <GachaModal
        isOpen={isGachaOpen}
        onClose={handleCloseGacha}
        volume={volume}
        onVolumeChange={setVolume}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted((prev) => !prev)}
      />

      {/* Floating Audio Player de Random Play con Tu Cumpleaños de Diomedes Díaz */}
      <AudioPlayer
        isPlaying={isMusicPlaying}
        onTogglePlay={() => setIsMusicPlaying((prev) => !prev)}
        onPlaybackStateChange={setIsMusicPlaying}
        volume={volume}
        onVolumeChange={setVolume}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted((prev) => !prev)}
      />
    </div>
  );
}

export default App;

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { GACHA_CONFIG } from '../data/gachaConfig';

export const BirthdayGreeting: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Garantizar autoplay del video de Belle
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section id="felicitacion" className="py-20 md:py-28 px-4 sm:px-6 max-w-5xl mx-auto relative">
      {/* Tira Hazard Warning */}
      <div className="w-full h-1 hazard-tape mb-14 rounded-full opacity-80" />

      {/* 1. Encabezado Principal de Felicitación */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-white font-hud tracking-wide uppercase italic mb-4 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
        >
          ¡FELIZ CUMPLEAÑOS,{' '}
          <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent underline decoration-yellow-400/60 underline-offset-8">
            Brochacho
          </span>
          !
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-200 text-base sm:text-lg leading-relaxed font-light max-w-2xl mx-auto"
        >
          Un año más de partidas inolvidables, desveladas en Discord, momentos y troleadas épicas. Ahora te toca cambiar de servidor rumbo a España, pero antes de empezar esa nueva aventura, que la suerte esté 100% de tu lado. ¡Anulo mufa!
        </motion.p>
      </div>

      {/* 2. Tarjeta Especial: Belle y la Revelación del Regalo (El Banner Gacha) */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="liquid-glass rounded-3xl p-6 sm:p-10 border-2 border-yellow-400/50 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 inset-x-0 h-1.5 hazard-tape" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center pt-2">
          {/* Video Animado de Belle en Formato Original 9:16 */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[9/16] rounded-3xl overflow-hidden border-2 border-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.35)] bg-black group">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                tabIndex={-1}
                aria-hidden="true"
                poster="/images/belle_card_frame.jpg"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              >
                <source src="/videos/belle_card_video.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Mensaje de Belle Explicando el Regalo */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-6">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-hud tracking-wide uppercase italic leading-tight">
              ¡Tu regalo es un Banner Gacha S-Rank!
            </h3>

            {/* Globo de diálogo */}
            <div className="relative p-6 sm:p-8 rounded-2xl bg-black/60 border border-yellow-500/30 text-slate-200 text-base sm:text-lg leading-relaxed italic shadow-inner">
              <MessageCircle className="w-6 h-6 text-yellow-400 mb-3 opacity-90" />
              "¡Ey, {GACHA_CONFIG.friendName}! ¡Feliz cumpleaños! En Random Play no regalamos cosas aburridas, y menos antes de que cambies de servidor rumbo a España. He cargado en el sistema un banner de sintonización exclusivo de cumpleaños con 3 juegazos en la ruleta. Tira al gacha de abajo y el juego que te salga... ¡es tuyo! Muchísima suerte en esta nueva aventura, proxy, ¡y que el RNG te acompañe para ganar todos los 50/50!"
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

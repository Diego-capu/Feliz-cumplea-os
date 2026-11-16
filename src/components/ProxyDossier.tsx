import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Trophy, Flame, Sparkles, Heart } from 'lucide-react';
import { GACHA_CONFIG } from '../data/gachaConfig';

export const ProxyDossier: React.FC = () => {
  return (
    <section id="expediente" className="py-20 md:py-28 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-4">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          <span>INTER-KNOT NETWORK DOSSIER</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-hud tracking-wide mb-3">
          Expediente Oficial: {GACHA_CONFIG.friendName}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base font-light">
          Registro clasificado de la base de datos de Solaris-3 y New Eridu.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Perfil de Resonador / Proxy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="liquid-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-cyan-500/20 md:col-span-2 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono">
                LICENCIA DE PROXY // RANGO S
              </span>
              <span className="text-xs font-mono text-slate-400">ID: #ZOPAS-BDAY</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-hud tracking-wide mb-2">
              El Legendario {GACHA_CONFIG.friendName}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
              Conocido en New Eridu por sus incursiones en las Cavidades y en Solaris-3 por sintonizar ecos legendarios a la primera. No hay boss de Souls ni enemigo de Hollow que se resista cuando se pone serio.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-4 text-center">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
              <div className="text-xs text-slate-400 font-mono mb-1">PITY HOY</div>
              <div className="text-base sm:text-lg font-bold text-amber-400 font-hud">79/80</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
              <div className="text-xs text-slate-400 font-mono mb-1">50/50 RATE</div>
              <div className="text-base sm:text-lg font-bold text-yellow-400 font-hud">100%</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
              <div className="text-xs text-slate-400 font-mono mb-1">ESTATUS</div>
              <div className="text-base sm:text-lg font-bold text-cyan-400 font-hud">CUMPLEAÑERO</div>
            </div>
          </div>
        </motion.div>

        {/* Card 2: 50/50 Win Rate Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="liquid-glass-gold rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-amber-500/30"
        >
          <div>
            <div className="p-2.5 w-fit rounded-xl bg-amber-500/20 border border-amber-500/30 mb-4">
              <Trophy className="w-6 h-6 text-amber-400" />
            </div>
            <h4 className="text-xl font-bold text-white font-hud tracking-wide mb-2">
              Protección Anti-Qiqi
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              En este cumpleaños, cualquier probabilidad de perder el 50/50 ha sido anulada permanentemente. Las estrellas doradas caen a tu favor.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-amber-500/20 flex items-center gap-2 text-xs font-mono text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>5★ DORADO GARANTIZADO</span>
          </div>
        </motion.div>

        {/* Card 3: La Crew (Los Amigos) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="liquid-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-white/10 md:col-span-2"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                <Users className="w-5 h-5 text-yellow-400" />
              </div>
              <span className="text-xs font-mono text-yellow-300 uppercase tracking-wider">
                COMPAÑEROS DE EQUIPO // LA CREW
              </span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-white font-hud tracking-wide mb-2">
              Los que están en cada lobby, discord y partida
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
              Los verdaderos 5 estrellas son los amigos con los que compartes cada risa, cada noche de pláticas y cada derrota antes de la victoria.
            </p>

            {/* Tags de amigos */}
            <div className="flex flex-wrap gap-2">
              {GACHA_CONFIG.crew.map((member) => (
                <span
                  key={member}
                  className={`px-3 py-1 rounded-full text-xs font-mono border transition-all ${
                    member === GACHA_CONFIG.friendName
                      ? 'bg-amber-500/30 border-amber-400/80 text-amber-200 font-bold scale-105'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:border-yellow-400/40 hover:text-white'
                  }`}
                >
                  {member === GACHA_CONFIG.friendName ? `👑 ${member} (Festeyado)` : member}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Servidor: LATAM / Global</span>
            <span className="text-yellow-400 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-yellow-400" /> Recuerdos Invaluables
            </span>
          </div>
        </motion.div>

        {/* Card 4: Protocolo de Cumpleaños */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="liquid-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-white/10"
        >
          <div>
            <div className="p-2.5 w-fit rounded-xl bg-orange-500/20 border border-orange-500/30 mb-4">
              <Flame className="w-6 h-6 text-orange-400" />
            </div>
            <h4 className="text-xl font-bold text-white font-hud tracking-wide mb-2">
              Misión Prioritaria
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              1. Sintonizar el regalo en el Banner.<br />
              2. Reclamar el juego a los compas.<br />
              3. Instalar y viciar hasta la madrugada.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 text-xs font-mono text-orange-300">
            MISIÓN ACTIVA // NO RECHAZABLE
          </div>
        </motion.div>
      </div>
    </section>
  );
};

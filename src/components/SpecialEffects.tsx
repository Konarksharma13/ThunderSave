/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { EffectType } from '../types';
import { Zap, Trophy, Star } from 'lucide-react';

interface SpecialEffectsProps {
  effect: EffectType;
}

export function SpecialEffects({ effect }: SpecialEffectsProps) {
  const getEffectContent = () => {
    switch (effect) {
      case 'rank-up':
        return {
          title: "RANK UP!",
          subtitle: "Your financial breathing has reached a new level!",
          icon: <Zap className="w-20 h-20 text-zenitsu-yellow fill-current" />,
          color: "from-zenitsu-yellow/40 to-transparent"
        };
      case 'goal-reached':
        return {
          title: "GOAL REACHED!",
          subtitle: "Mission Accomplished! You've hit your target!",
          icon: <Trophy className="w-20 h-20 text-zenitsu-amber fill-current" />,
          color: "from-zenitsu-amber/40 to-transparent"
        };
      case 'achievement-unlocked':
        return {
          title: "ACHIEVEMENT!",
          subtitle: "A new milestone has been mastered!",
          icon: <Star className="w-20 h-20 text-white fill-current" />,
          color: "from-white/40 to-transparent"
        };
      default:
        return null;
    }
  };

  const content = getEffectContent();

  return (
    <AnimatePresence>
      {effect && content && (
        <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden">
          {/* Flash Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, times: [0, 0.2, 1] }}
            className="absolute inset-0 bg-white z-10"
          />

          {/* Background Rays */}
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{ scale: 4, opacity: 1, rotate: 180 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={`absolute w-full h-full bg-gradient-radial ${content.color} blur-3xl`}
          />

          {/* Speed Lines Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 speed-lines-intense"
          />

          {/* Main Content */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.5, opacity: 0, y: -50 }}
            transition={{ type: "spring", damping: 12, stiffness: 200 }}
            className="relative z-20 flex flex-col items-center text-center"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: 2 }}
              className="mb-6 glow-yellow p-6 rounded-full bg-black/20 backdrop-blur-md border-4 border-zenitsu-yellow"
            >
              {content.icon}
            </motion.div>
            
            <h2 className="text-6xl font-black italic tracking-tighter text-gray-900 drop-shadow-[0_4px_4px_rgba(252,227,0,0.8)] mb-2">
              {content.title}
            </h2>
            <p className="text-xl font-bold uppercase tracking-[0.2em] text-gray-700 bg-white/80 px-6 py-2 rounded-full glass">
              {content.subtitle}
            </p>
          </motion.div>

          {/* Lightning Bolts */}
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: [0, 1, 0], pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            >
              <Zap className="w-12 h-12 text-zenitsu-yellow fill-current blur-[1px]" />
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

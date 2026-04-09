/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

export function BackgroundEffects() {
  // Create an array for particles
  const particles = Array.from({ length: 15 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
      {/* Dynamic Gradient Background */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(252, 227, 0, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, rgba(252, 227, 0, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 80%, rgba(252, 227, 0, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(252, 227, 0, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 20%, rgba(252, 227, 0, 0.05) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0"
      />

      {/* Floating Sparks/Particles */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.3 + 0.1,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, "-20%", "120%"],
            x: [null, (Math.random() - 0.5) * 20 + "%"],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 10,
          }}
          className="absolute w-1 h-1 bg-zenitsu-yellow rounded-full spark-glow"
        />
      ))}

      {/* Subtle Lightning Pulses */}
      <motion.div
        animate={{
          opacity: [0, 0.05, 0, 0.08, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          times: [0, 0.1, 0.2, 0.3, 1],
          delay: 2
        }}
        className="absolute inset-0 bg-zenitsu-yellow pointer-events-none"
      />

      {/* Intermittent Lightning Streaks */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={`streak-${i}`}
          initial={{ opacity: 0, scaleX: 0, x: "-100%", y: "20%" }}
          animate={{
            opacity: [0, 0.15, 0],
            scaleX: [0, 1.5, 0],
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: Math.random() * 10 + 5,
            ease: "easeInOut",
            delay: i * 3,
          }}
          style={{
            rotate: "-35deg",
            top: `${20 + i * 20}%`,
          }}
          className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zenitsu-yellow to-transparent blur-[2px]"
        />
      ))}
    </div>
  );
}

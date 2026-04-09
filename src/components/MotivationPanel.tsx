/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote } from 'lucide-react';

const QUOTES = [
  "Even fear can become strength.",
  "Small savings strike like lightning.",
  "Discipline today, power tomorrow.",
  "Master one thing to perfection.",
  "Don't ever give up. Even if it's painful.",
];

export function MotivationPanel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % QUOTES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass-yellow p-6 rounded-2xl relative overflow-hidden group">
      <div className="absolute -top-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Quote size={80} className="text-zenitsu-yellow" />
      </div>
      
      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zenitsu-amber mb-4">
        Thunder Wisdom
      </h3>

      <div className="h-16 flex items-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-lg font-medium italic text-gray-700 leading-tight"
          >
            "{QUOTES[index]}"
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { RANKS } from '../types';
import { cn } from '../lib/utils';

interface RankTrackerProps {
  currentSavings: number;
  goal: number;
}

export function RankTracker({ currentSavings, goal }: RankTrackerProps) {
  return (
    <div className="glass p-6 rounded-2xl w-full">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-black uppercase tracking-widest text-zenitsu-amber">
          Savings Rank System
        </h2>
        <div className="text-right">
          <p className="text-xs font-bold uppercase text-gray-400">Current Savings</p>
          <p className="text-2xl font-black text-glow-yellow">${currentSavings.toLocaleString()}</p>
        </div>
      </div>

      <div className="relative flex justify-between items-center px-4">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0" />
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, (currentSavings / goal) * 100)}%` }}
          className="absolute top-1/2 left-0 h-1 bg-zenitsu-yellow glow-yellow -translate-y-1/2 z-0"
        />

        {RANKS.map((rank, index) => {
          const isCompleted = currentSavings >= rank.threshold;
          const isCurrent = currentSavings < rank.threshold && (index === 0 || currentSavings >= RANKS[index-1].threshold);

          return (
            <div key={rank.name} className="relative z-10 flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                  isCompleted ? "bg-zenitsu-yellow border-zenitsu-amber glow-yellow" : 
                  isCurrent ? "bg-white border-zenitsu-yellow animate-pulse-yellow" : "bg-gray-100 border-gray-300"
                )}
              >
                <span className="text-lg">{rank.icon.slice(0, 2)}</span>
              </motion.div>
              
              <div className="absolute top-12 whitespace-nowrap text-center">
                <p className={cn(
                  "text-[10px] font-black uppercase tracking-tighter",
                  isCompleted || isCurrent ? "text-zenitsu-amber" : "text-gray-400"
                )}>
                  {rank.name}
                </p>
                <p className="text-[8px] font-bold text-gray-400">${rank.threshold}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

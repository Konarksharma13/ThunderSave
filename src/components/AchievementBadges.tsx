/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Achievement } from '../types';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface AchievementBadgesProps {
  achievements: Achievement[];
}

export function AchievementBadges({ achievements }: AchievementBadgesProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {achievements.map((achievement) => (
        <motion.div
          key={achievement.id}
          initial={false}
          animate={achievement.unlocked ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0.5 }}
          className={cn(
            "px-4 py-2 rounded-full glass flex items-center gap-2 transition-all duration-500",
            achievement.unlocked ? "border-zenitsu-yellow glow-yellow bg-white/40" : "grayscale"
          )}
        >
          <span className="text-lg">{achievement.icon}</span>
          <span className="text-[10px] font-black uppercase tracking-wider text-gray-700">
            {achievement.title}
          </span>
          {achievement.unlocked && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-2 h-2 rounded-full bg-zenitsu-yellow"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

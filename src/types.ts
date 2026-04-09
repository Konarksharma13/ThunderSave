/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: TransactionType;
}

export interface Achievement {
  id: string;
  title: string;
  unlocked: boolean;
  icon: string;
}

export interface UserProfile {
  name: string;
  savingsGoal: number;
  streak: number;
  achievements: Achievement[];
}

export type EffectType = 'rank-up' | 'goal-reached' | 'achievement-unlocked' | null;

export interface FinanceState {
  transactions: Transaction[];
  profile: UserProfile;
  activeEffect: EffectType;
}

export const RANKS = [
  { name: 'Rookie', threshold: 100, icon: '⚡' },
  { name: 'Thunder Breather', threshold: 500, icon: '⚡⚡' },
  { name: 'Lightning Hashira', threshold: 1000, icon: '⚡⚡⚡' },
];

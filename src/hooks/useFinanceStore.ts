/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { FinanceState, Transaction, UserProfile, Achievement } from '../types';

const STORAGE_KEY = 'zenitsu_finance_data';

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: '1', title: 'First $100 Saved', unlocked: false, icon: '💰' },
  { id: '2', title: 'No Spend Day', unlocked: false, icon: '🚫' },
  { id: '3', title: 'Savings Streak', unlocked: false, icon: '🔥' },
];

const DEMO_DATA: FinanceState = {
  transactions: [
    { id: 'd1', amount: 5000, category: 'Salary', description: 'Monthly Salary', date: new Date(Date.now() - 86400000 * 5).toISOString(), type: 'income' },
    { id: 'd2', amount: 2000, category: 'Rent', description: 'Apartment Rent', date: new Date(Date.now() - 86400000 * 4).toISOString(), type: 'expense' },
    { id: 'd3', amount: 7000, category: 'Bonus', description: 'Project Bonus', date: new Date(Date.now() - 86400000 * 3).toISOString(), type: 'income' },
    { id: 'd4', amount: 3000, category: 'Shopping', description: 'New Katana', date: new Date(Date.now() - 86400000 * 2).toISOString(), type: 'expense' },
    { id: 'd5', amount: 6500, category: 'Freelance', description: 'Web Dev Gig', date: new Date(Date.now() - 86400000 * 1).toISOString(), type: 'income' },
    { id: 'd6', amount: 2500, category: 'Food', description: 'Ramen Feast', date: new Date().toISOString(), type: 'expense' },
  ],
  profile: {
    name: 'Zenitsu',
    savingsGoal: 1000,
    streak: 5,
    achievements: INITIAL_ACHIEVEMENTS.map(a => a.id === '1' ? { ...a, unlocked: true } : a),
  },
  activeEffect: null,
};

const INITIAL_STATE: FinanceState = {
  transactions: [],
  profile: {
    name: 'Hero',
    savingsGoal: 1000,
    streak: 0,
    achievements: INITIAL_ACHIEVEMENTS,
  },
  activeEffect: null,
};

export function useFinanceStore() {
  const [state, setState] = useState<FinanceState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEMO_DATA;
    const parsed = JSON.parse(saved);
    return { ...parsed, activeEffect: null }; // Reset effect on load
  });

  useEffect(() => {
    const { activeEffect, ...rest } = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
  }, [state]);

  const triggerEffect = (effect: FinanceState['activeEffect']) => {
    setState(prev => ({ ...prev, activeEffect: effect }));
    setTimeout(() => {
      setState(prev => ({ ...prev, activeEffect: null }));
    }, 3000);
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: crypto.randomUUID() };
    
    setState((prev) => {
      const newTransactions = [newTransaction, ...prev.transactions];
      
      const income = newTransactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
      const expense = newTransactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
      const totalSavings = income - expense;

      const oldIncome = prev.transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
      const oldExpense = prev.transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
      const oldSavings = oldIncome - oldExpense;

      let effect: FinanceState['activeEffect'] = null;

      // Check for goal reached
      if (oldSavings < prev.profile.savingsGoal && totalSavings >= prev.profile.savingsGoal) {
        effect = 'goal-reached';
      }

      // Check for achievement unlocked
      const newAchievements = prev.profile.achievements.map(a => {
        if (a.id === '1' && totalSavings >= 100 && !a.unlocked) {
          if (!effect) effect = 'achievement-unlocked';
          return { ...a, unlocked: true };
        }
        return a;
      });

      // Check for rank up
      const currentRankIndex = [100, 500, 1000].findIndex(t => oldSavings < t);
      const newRankIndex = [100, 500, 1000].findIndex(t => totalSavings < t);
      if (newRankIndex > currentRankIndex && currentRankIndex !== -1) {
        effect = 'rank-up';
      }

      const newState = {
        ...prev,
        transactions: newTransactions,
        profile: {
          ...prev.profile,
          achievements: newAchievements,
        },
        activeEffect: effect,
      };

      return newState;
    });

    // Reset effect after delay
    setTimeout(() => {
      setState(s => ({ ...s, activeEffect: null }));
    }, 3000);
  };

  const deleteTransaction = (id: string) => {
    setState((prev) => ({
      ...prev,
      transactions: prev.transactions.filter(t => t.id !== id),
    }));
  };

  const loadDemoData = () => setState(DEMO_DATA);
  const resetData = () => setState(INITIAL_STATE);
  const updateGoal = (goal: number) => setState(prev => ({ ...prev, profile: { ...prev.profile, savingsGoal: goal } }));

  return {
    state,
    addTransaction,
    deleteTransaction,
    loadDemoData,
    resetData,
    updateGoal,
  };
}

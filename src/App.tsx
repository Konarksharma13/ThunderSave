/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useFinanceStore } from './hooks/useFinanceStore';
import { RankTracker } from './components/RankTracker';
import { ChartsSection } from './components/ChartsSection';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { MotivationPanel } from './components/MotivationPanel';
import { AchievementBadges } from './components/AchievementBadges';
import { BackgroundEffects } from './components/BackgroundEffects';
import { SpecialEffects } from './components/SpecialEffects';
import { motion } from 'motion/react';
import { Zap, RotateCcw, Database, TrendingUp } from 'lucide-react';
import { formatCurrency } from './lib/utils';

export default function App() {
  const { state, addTransaction, deleteTransaction, loadDemoData, resetData } = useFinanceStore();

  const totalSavings = state.transactions.reduce((acc, t) => 
    t.type === 'income' ? acc + t.amount : acc - t.amount, 0
  );

  return (
    <div className="min-h-screen relative pb-20">
      {/* High Impact Anime Effects */}
      <SpecialEffects effect={state.activeEffect} />

      {/* Animated Background Effects */}
      <BackgroundEffects />
      
      <header className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-zenitsu-yellow rounded-xl flex items-center justify-center glow-yellow">
            <Zap className="text-white fill-current" />
          </div>
          <div>
            <h1 className="text-2xl font-black italic tracking-tighter text-gray-800">
              Thunder<span className="text-zenitsu-amber">Save</span>
            </h1>
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={loadDemoData}
            className="glass px-4 py-2 rounded-xl text-xs font-bold uppercase flex items-center gap-2 hover:bg-white/40 transition-colors"
          >
            <Database size={14} />
            Demo Data
          </button>
          <button 
            onClick={resetData}
            className="glass px-4 py-2 rounded-xl text-xs font-bold uppercase flex items-center gap-2 hover:bg-red-50 transition-colors text-red-500"
          >
            <RotateCcw size={14} />
            Reset
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 space-y-8">
        {/* Top: Savings Progress */}
        <section>
          <RankTracker currentSavings={totalSavings} goal={state.profile.savingsGoal} />
        </section>

        {/* Middle: Charts */}
        <section>
          <ChartsSection transactions={state.transactions} />
        </section>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Transactions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black uppercase tracking-widest text-gray-700 flex items-center gap-2">
                <TrendingUp className="text-zenitsu-amber" />
                Recent Missions
              </h2>
              <div className="glass px-4 py-1 rounded-full flex items-center gap-2">
                <Zap size={14} className="text-zenitsu-yellow fill-current" />
                <span className="text-xs font-black">{state.profile.streak} Day Streak</span>
              </div>
            </div>
            <div className="glass rounded-3xl overflow-hidden">
              <TransactionList 
                transactions={state.transactions.slice(0, 10)} 
                onDelete={deleteTransaction} 
              />
            </div>
          </div>

          {/* Right: Form & Sidebar */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-sm font-black uppercase tracking-widest text-gray-500">New Transaction</h2>
              <div className="glass rounded-3xl p-2">
                <TransactionForm onAdd={addTransaction} />
              </div>
            </div>

            <MotivationPanel />

            <div className="space-y-4">
              <h2 className="text-sm font-black uppercase tracking-widest text-gray-500">Achievements</h2>
              <AchievementBadges achievements={state.profile.achievements} />
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-20 text-center opacity-30 text-[10px] font-black uppercase tracking-[0.5em]">
        Thunder Breathing: First Form - Thunderclap and Flash
      </footer>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TransactionType } from '../types';
import { motion } from 'motion/react';
import { Plus, Minus, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface TransactionFormProps {
  onAdd: (transaction: {
    amount: number;
    category: string;
    description: string;
    date: string;
    type: TransactionType;
  }) => void;
}

const CATEGORIES = ['Food', 'Entertainment', 'Rent', 'Salary', 'Gift', 'Other'];

export function TransactionForm({ onAdd }: TransactionFormProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<TransactionType>('expense');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;

    onAdd({
      amount: Number(amount),
      category,
      description,
      date: new Date().toISOString(),
      type,
    });

    setAmount('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div className="flex gap-2 p-1 glass rounded-xl">
        <button
          type="button"
          onClick={() => setType('expense')}
          className={cn(
            "flex-1 py-2 font-bold uppercase transition-all rounded-lg text-xs",
            type === 'expense' ? "bg-red-500 text-white shadow-lg" : "text-gray-500"
          )}
        >
          Expense
        </button>
        <button
          type="button"
          onClick={() => setType('income')}
          className={cn(
            "flex-1 py-2 font-bold uppercase transition-all rounded-lg text-xs",
            type === 'income' ? "bg-green-500 text-white shadow-lg" : "text-gray-500"
          )}
        >
          Income
        </button>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Amount</label>
        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-zenitsu-yellow/50 transition-all"
            required
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">$</span>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-zenitsu-yellow/50 transition-all appearance-none"
        >
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What was this for?"
          className="w-full bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-zenitsu-yellow/50 transition-all"
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02, backgroundColor: '#fce300' }}
        whileTap={{ scale: 0.9, rotate: [0, -5, 5, 0] }}
        type="submit"
        className="w-full py-4 rounded-xl font-black uppercase tracking-widest bg-zenitsu-yellow/80 text-gray-800 shadow-lg flex items-center justify-center gap-2 relative overflow-hidden group"
      >
        <motion.div
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />
        <Zap className="w-4 h-4 fill-current group-hover:animate-pulse" />
        Strike!
      </motion.button>
    </form>
  );
}

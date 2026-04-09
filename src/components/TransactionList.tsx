/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Transaction } from '../types';
import { formatCurrency, cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { format } from 'date-fns';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export function TransactionList({ transactions, onDelete }: TransactionListProps) {
  return (
    <div className="space-y-0">
      <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {transactions.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-12 text-center text-gray-400 italic"
            >
              No missions completed yet. Start your journey!
            </motion.div>
          ) : (
            transactions.map((t) => (
              <motion.div
                key={t.id}
                layout
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                className="flex items-center justify-between p-4 border-b border-white/10 hover:bg-white/30 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                    t.type === 'income' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                  )}>
                    {t.type === 'income' ? <ArrowUpCircle size={20} /> : <ArrowDownCircle size={20} />}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{t.description || t.category}</p>
                    <p className="text-[10px] text-gray-400 font-mono">
                      {format(new Date(t.date), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className={cn(
                      "font-black text-lg",
                      t.type === 'income' ? "text-green-600" : "text-red-600"
                    )}>
                      {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                    </p>
                    <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest">{t.category}</p>
                  </div>
                  
                  <button
                    onClick={() => onDelete(t.id)}
                    className="p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

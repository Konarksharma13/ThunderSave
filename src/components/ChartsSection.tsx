/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';
import { Transaction } from '../types';
import { formatCurrency } from '../lib/utils';
import { motion } from 'motion/react';

interface ChartsSectionProps {
  transactions: Transaction[];
}

const COLORS = ['#fce300', '#ffb300', '#fff176', '#ffd54f', '#ffca28'];

export function ChartsSection({ transactions }: ChartsSectionProps) {
  const data = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    
    const categoryData = transactions
      .filter(t => t.type === 'income')
      .reduce((acc: any[], t) => {
        const existing = acc.find(item => item.name === t.category);
        if (existing) existing.value += t.amount;
        else acc.push({ name: t.category, value: t.amount });
        return acc;
      }, []);

    const expenseData = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc: any[], t) => {
        const existing = acc.find(item => item.name === t.category);
        if (existing) existing.value += t.amount;
        else acc.push({ name: t.category, value: t.amount });
        return acc;
      }, []);

    // Timeline data for savings
    const timeline = transactions.reduce((acc: any[], t) => {
      const date = t.date.split('T')[0];
      const existing = acc.find(item => item.date === date);
      const val = t.type === 'income' ? t.amount : -t.amount;
      if (existing) existing.savings += val;
      else acc.push({ date, savings: val });
      return acc;
    }, []).sort((a, b) => a.date.localeCompare(b.date));

    let runningTotal = 0;
    const cumulativeTimeline = timeline.map(item => {
      runningTotal += item.savings;
      return { date: item.date, savings: runningTotal };
    });

    return { income, expense, categoryData, expenseData, cumulativeTimeline };
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-6 rounded-2xl h-80">
        <h3 className="text-sm font-black uppercase mb-4 text-gray-500">Total Income</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data.categoryData}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.categoryData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass p-6 rounded-2xl h-80">
        <h3 className="text-sm font-black uppercase mb-4 text-gray-500">Total Expenses</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.expenseData}>
            <XAxis dataKey="name" hide />
            <Tooltip 
              contentStyle={{ background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '12px' }}
            />
            <Bar dataKey="value" fill="#ffb300" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass p-6 rounded-2xl h-80">
        <h3 className="text-sm font-black uppercase mb-4 text-gray-500">Total Savings</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.cumulativeTimeline}>
            <Tooltip 
              contentStyle={{ background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '12px' }}
            />
            <Line type="monotone" dataKey="savings" stroke="#fce300" strokeWidth={4} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}

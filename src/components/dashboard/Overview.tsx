
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { formatRupiah } from '@/utils/formatters';

const data = [
  {
    name: 'Jan',
    total: 2400,
  },
  {
    name: 'Feb',
    total: 1398,
  },
  {
    name: 'Mar',
    total: 9800,
  },
  {
    name: 'Apr',
    total: 3908,
  },
  {
    name: 'May',
    total: 4800,
  },
  {
    name: 'Jun',
    total: 3800,
  },
  {
    name: 'Jul',
    total: 4300,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip 
          formatter={(value) => [formatRupiah(value), 'Revenue']}
          cursor={{fill: 'rgba(0, 0, 0, 0.05)'}}
        />
        <Bar 
          dataKey="total" 
          fill="currentColor" 
          radius={[4, 4, 0, 0]} 
          className="fill-primary" 
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

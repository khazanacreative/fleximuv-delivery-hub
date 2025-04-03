
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
import { formatRupiah, formatRupiahInThousands } from '@/utils/formatters';

const data = [
  {
    name: 'Jan',
    total: 12400000,
  },
  {
    name: 'Feb',
    total: 21398000,
  },
  {
    name: 'Mar',
    total: 19800000,
  },
  {
    name: 'Apr',
    total: 23908000,
  },
  {
    name: 'May',
    total: 34800000,
  },
  {
    name: 'Jun',
    total: 33800000,
  },
  {
    name: 'Jul',
    total: 42300000,
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
          tickFormatter={(value) => formatRupiahInThousands(value, false)}
        />
        <Tooltip 
          formatter={(value: number | string) => [formatRupiah(value), 'Revenue']}
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


import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/hooks/use-auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, Wallet, CalendarDays, TrendingUp } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";

interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: string;
  description: string;
}

// Generate mock earnings data
const generateMockEarnings = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  
  // Generate last 7 days data
  const dailyData = Array(7).fill(0).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      earnings: Math.floor(Math.random() * 300) + 100,
      deliveries: Math.floor(Math.random() * 8) + 2,
    };
  });
  
  // Generate monthly data for the year
  const monthlyData = months.map((month, i) => {
    return {
      month,
      earnings: i <= currentMonth ? Math.floor(Math.random() * 3000) + 1000 : 0,
      deliveries: i <= currentMonth ? Math.floor(Math.random() * 60) + 20 : 0,
    };
  });
  
  // Generate transactions
  const transactions: Transaction[] = Array(5).fill(0).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      id: `trx-${Date.now() + i}`,
      date: date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }),
      amount: Math.floor(Math.random() * 100) + 20,
      type: i % 3 === 0 ? 'bonus' : 'delivery',
      description: i % 3 === 0 ? 'Performance bonus' : `Order delivery #${Math.floor(Math.random() * 10000)}`
    };
  });
  
  return { dailyData, monthlyData, transactions };
};

const DriverEarnings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("daily");
  const [earningsData, setEarningsData] = useState<{
    dailyData: any[];
    monthlyData: any[];
    transactions: Transaction[];
  }>({ dailyData: [], monthlyData: [], transactions: [] });
  
  useEffect(() => {
    // Generate mock data
    const mockData = generateMockEarnings();
    setEarningsData(mockData);
  }, []);
  
  const totalEarnings = earningsData.dailyData.reduce((sum, day) => sum + day.earnings, 0);
  const totalDeliveries = earningsData.dailyData.reduce((sum, day) => sum + day.deliveries, 0);
  const averagePerDelivery = totalDeliveries > 0 ? Math.round(totalEarnings / totalDeliveries) : 0;
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Earnings Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Earnings (This Week)
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEarnings}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium flex items-center">
                +5% <ArrowUpRight className="h-3 w-3 ml-1" />
              </span>{" "}
              from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Deliveries
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDeliveries}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium flex items-center">
                +2% <ArrowUpRight className="h-3 w-3 ml-1" />
              </span>{" "}
              from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Per Delivery
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averagePerDelivery}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium flex items-center">
                +3% <ArrowUpRight className="h-3 w-3 ml-1" />
              </span>{" "}
              from last week
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Earnings Overview</CardTitle>
          <CardDescription>
            View your earnings performance over time
          </CardDescription>
          <Tabs 
            defaultValue="daily" 
            className="w-full"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full max-w-sm grid-cols-2">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={300}>
            {activeTab === "daily" ? (
              <BarChart data={earningsData.dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Earnings']}
                  labelFormatter={(value) => `${value}`}
                />
                <Bar 
                  dataKey="earnings" 
                  fill="#4f46e5" 
                  name="Earnings"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            ) : (
              <LineChart data={earningsData.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Earnings']}
                  labelFormatter={(value) => `${value}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="earnings" 
                  stroke="#4f46e5" 
                  name="Earnings"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Your latest earnings activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {earningsData.transactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between p-2 border-b last:border-0"
              >
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">{transaction.date}</p>
                </div>
                <div className={`font-medium ${
                  transaction.type === 'bonus' ? 'text-green-600' : ''
                }`}>
                  +${transaction.amount}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverEarnings;

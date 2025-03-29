import { useState } from 'react';
import { BarChart, Calendar, Download, Filter, PieChart, TrendingUp, Package, CreditCard } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockOrders, mockTransactions } from '@/data/mock-data';

// Import from recharts
import { 
  ResponsiveContainer, 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

// Mock data for charts
const monthlyData = [
  { name: 'Jan', orders: 65, revenue: 4000 },
  { name: 'Feb', orders: 59, revenue: 3800 },
  { name: 'Mar', orders: 80, revenue: 5200 },
  { name: 'Apr', orders: 81, revenue: 5100 },
  { name: 'May', orders: 56, revenue: 3600 },
  { name: 'Jun', orders: 55, revenue: 3500 },
  { name: 'Jul', orders: 40, revenue: 2800 },
];

const serviceTypeData = [
  { name: 'Same Day Delivery', value: 35 },
  { name: 'Food Delivery', value: 25 },
  { name: 'Package Delivery', value: 20 },
  { name: 'Grocery Delivery', value: 15 },
  { name: 'Documents', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Reports = () => {
  const [timeRange, setTimeRange] = useState('this_week');
  const [reportType, setReportType] = useState('sales');
  
  // Calculate summary metrics
  const totalOrders = mockOrders.length;
  const totalRevenue = mockTransactions
    .filter(t => t.type === 'order_payment')
    .reduce((sum, t) => sum + t.amount, 0);
  const averageOrderValue = totalRevenue / totalOrders;
  
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">
            Analyze your business performance and delivery metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            <span>Date Range</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* Time Period Selector */}
      <div className="flex justify-between items-center">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="this_week">This Week</SelectItem>
            <SelectItem value="last_week">Last Week</SelectItem>
            <SelectItem value="this_month">This Month</SelectItem>
            <SelectItem value="last_month">Last Month</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Download Report
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Excel (.xlsx)</DropdownMenuItem>
            <DropdownMenuItem>CSV (.csv)</DropdownMenuItem>
            <DropdownMenuItem>PDF (.pdf)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Report Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-4 md:w-[600px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="finances">Finances</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-0">
                  <CardTitle className="text-base text-left">Total Orders</CardTitle>
                  <CardDescription className="text-left">This {timeRange.replace('_', ' ')}</CardDescription>
                </div>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-left">{totalOrders}</div>
                <p className="text-xs text-muted-foreground mt-1 text-left">
                  <span className="text-green-600">↑ 12%</span> from last period
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-0">
                  <CardTitle className="text-base text-left">Revenue</CardTitle>
                  <CardDescription className="text-left">This {timeRange.replace('_', ' ')}</CardDescription>
                </div>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-left">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(totalRevenue)}
                </div>
                <p className="text-xs text-muted-foreground mt-1 text-left">
                  <span className="text-green-600">↑ 8%</span> from last period
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-0">
                  <CardTitle className="text-base text-left">Average Order Value</CardTitle>
                  <CardDescription className="text-left">This {timeRange.replace('_', ' ')}</CardDescription>
                </div>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-left">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(averageOrderValue)}
                </div>
                <p className="text-xs text-muted-foreground mt-1 text-left">
                  <span className="text-red-600">↓ 3%</span> from last period
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-left">Monthly Performance</CardTitle>
                <CardDescription className="text-left">Orders and revenue over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={monthlyData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="orders" fill="#8884d8" name="Orders" />
                    <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue (×1000 IDR)" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-left">Order Distribution</CardTitle>
                <CardDescription className="text-left">By service type</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={serviceTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {serviceTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Other tabs would be implemented similarly */}
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-left">Order Analytics</CardTitle>
              <CardDescription className="text-left">Detailed order metrics will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-left">This section will provide detailed analytics about orders, including completion rates, cancellation rates, and delivery times.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="drivers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-left">Driver Performance</CardTitle>
              <CardDescription className="text-left">Detailed driver metrics will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-left">This section will show driver performance metrics, including on-time delivery rate, average delivery time, and customer ratings.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="finances" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-left">Financial Reports</CardTitle>
              <CardDescription className="text-left">Detailed financial metrics will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-left">This section will display financial metrics, including revenue, costs, profits, and transaction histories.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;

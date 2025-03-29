import { useState, useEffect } from 'react';
import { BarChart, Calendar, Download, Filter, PieChart, TrendingUp, Package, CreditCard, Clock, Users, MapPin, Truck, Share2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockOrders, mockTransactions } from '@/data/mock-data';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import RoleGate from '@/components/permissions/RoleGate';
import LiveMap from '@/components/maps/LiveMap';

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
  Cell,
  LineChart,
  Line,
  TooltipProps
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

const courierPerformanceData = [
  { name: 'Team A', onTime: 85, lateDelivery: 15 },
  { name: 'Team B', onTime: 78, lateDelivery: 22 },
  { name: 'Team C', onTime: 92, lateDelivery: 8 },
  { name: 'Team D', onTime: 80, lateDelivery: 20 },
];

const dailyOrdersData = [
  { day: 'Mon', orders: 28 },
  { day: 'Tue', orders: 35 },
  { day: 'Wed', orders: 42 },
  { day: 'Thu', orders: 38 },
  { day: 'Fri', orders: 50 },
  { day: 'Sat', orders: 65 },
  { day: 'Sun', orders: 45 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Reports = () => {
  const [timeRange, setTimeRange] = useState('this_week');
  const [reportType, setReportType] = useState('overview');
  const [shareLink, setShareLink] = useState('');
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Calculate summary metrics
  const totalOrders = mockOrders.length;
  const totalRevenue = mockTransactions
    .filter(t => t.type === 'order_payment')
    .reduce((sum, t) => sum + t.amount, 0);
  const averageOrderValue = totalRevenue / totalOrders;

  // Check if user is partner with courier service
  const isPartnerWithCourier = user?.role === 'partner' && user?.partnerType === 'courier';
  
  useEffect(() => {
    // Redirect to dashboard if guest user tries to access reports directly
    if (!user && window.location.pathname === '/reports') {
      navigate('/dashboard');
      toast({
        title: "Access Denied",
        description: "You need to log in to view reports",
        variant: "destructive"
      });
    }
  }, [user, navigate]);

  const handleExport = (format: string) => {
    toast({
      title: "Export Started",
      description: `Exporting reports as ${format.toUpperCase()}...`
    });
    
    // Simulasi delay ekspor
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `Your report has been exported as ${format.toUpperCase()}`
      });
    }, 1500);
  };

  const handleShareReport = () => {
    // Generate a sharing link for guest access
    const shareableLink = `https://app.example.com/shared/report/${reportType}/${timeRange}/${Math.random().toString(36).substring(2, 15)}`;
    setShareLink(shareableLink);
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareableLink).then(() => {
      toast({
        title: "Link Generated",
        description: "Shareable link copied to clipboard"
      });
    });
  };
  
  // Currency formatter helper function
  const formatCurrency = (value: any): string => {
    // Ensure value is a number before formatting
    if (typeof value === 'string') {
      value = parseFloat(value);
    }
    
    // Check if value is a valid number after conversion
    if (isNaN(value)) {
      return 'Invalid amount';
    }
    
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      maximumFractionDigits: 0 
    }).format(value);
  };

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
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Date Range</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExport('excel')}>Excel (.xlsx)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('csv')}>CSV (.csv)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('pdf')}>PDF (.pdf)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <RoleGate allowedRoles={['admin', 'partner']}>
            <Button variant="outline" size="sm" className="gap-2" onClick={handleShareReport}>
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
          </RoleGate>
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
        
        {shareLink && (
          <div className="text-xs text-muted-foreground hidden md:block">
            <span>Share link: </span>
            <span className="font-mono bg-muted px-1 py-0.5 rounded">{shareLink.substring(0, 30)}...</span>
          </div>
        )}
      </div>

      {/* Report Tabs - Different tabs based on user role */}
      <Tabs defaultValue="overview" value={reportType} onValueChange={setReportType} className="space-y-6">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 md:w-[600px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          
          <RoleGate allowedRoles={['admin', 'partner']}>
            <TabsTrigger value="drivers">Drivers</TabsTrigger>
          </RoleGate>
          
          <RoleGate allowedRoles={['admin', 'partner']}>
            <TabsTrigger value="finances">Finances</TabsTrigger>
          </RoleGate>
          
          {!user?.role && (
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
          )}
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
            
            <RoleGate allowedRoles={['admin', 'partner']} fallback={
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-0">
                    <CardTitle className="text-base text-left">On-Time Deliveries</CardTitle>
                    <CardDescription className="text-left">Delivery performance</CardDescription>
                  </div>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-left">92%</div>
                  <p className="text-xs text-muted-foreground mt-1 text-left">
                    <span className="text-green-600">↑ 3%</span> from last period
                  </p>
                </CardContent>
              </Card>
            }>
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
                    {formatCurrency(totalRevenue)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 text-left">
                    <span className="text-green-600">↑ 8%</span> from last period
                  </p>
                </CardContent>
              </Card>
            </RoleGate>
            
            <RoleGate allowedRoles={['admin', 'partner']} fallback={
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-0">
                    <CardTitle className="text-base text-left">Active Drivers</CardTitle>
                    <CardDescription className="text-left">Currently on duty</CardDescription>
                  </div>
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-left">24</div>
                  <p className="text-xs text-muted-foreground mt-1 text-left">
                    <span className="text-green-600">↑ 2</span> more than yesterday
                  </p>
                </CardContent>
              </Card>
            }>
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
                    {formatCurrency(averageOrderValue)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 text-left">
                    <span className="text-red-600">↓ 3%</span> from last period
                  </p>
                </CardContent>
              </Card>
            </RoleGate>
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
          
          {/* Live Map - Visible only for specific roles */}
          <RoleGate allowedRoles={['admin', 'partner', 'driver']}>
            <LiveMap title="Live Courier Tracking" height="400px" />
          </RoleGate>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-left">Daily Order Volume</CardTitle>
                <CardDescription className="text-left">Last 7 days order count</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={dailyOrdersData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-left">Order Status Breakdown</CardTitle>
                <CardDescription className="text-left">Current order statuses</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={[
                        { name: 'Completed', value: 65 },
                        { name: 'In Progress', value: 15 },
                        { name: 'Pending', value: 10 },
                        { name: 'Cancelled', value: 5 },
                      ]}
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
          
          <RoleGate allowedRoles={['admin', 'partner']}>
            <Card>
              <CardHeader>
                <CardTitle className="text-left">Order Processing Time Analysis</CardTitle>
                <CardDescription className="text-left">Average processing time by order type</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={[
                      { name: 'Food Delivery', processingTime: 15, deliveryTime: 25 },
                      { name: 'Document Delivery', processingTime: 10, deliveryTime: 40 },
                      { name: 'Package Delivery', processingTime: 20, deliveryTime: 60 },
                      { name: 'Grocery Delivery', processingTime: 18, deliveryTime: 35 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="processingTime" fill="#8884d8" name="Processing Time (min)" />
                    <Bar dataKey="deliveryTime" fill="#82ca9d" name="Delivery Time (min)" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </RoleGate>
        </TabsContent>
        
        {/* Drivers Tab - Only for admin and partner */}
        <TabsContent value="drivers" className="space-y-6">
          <RoleGate allowedRoles={['admin', 'partner']}>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-0">
                    <CardTitle className="text-base text-left">Active Drivers</CardTitle>
                    <CardDescription className="text-left">Currently on duty</CardDescription>
                  </div>
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-left">24</div>
                  <p className="text-xs text-muted-foreground mt-1 text-left">
                    <span className="text-green-600">↑ 2</span> more than yesterday
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-0">
                    <CardTitle className="text-base text-left">Average Rating</CardTitle>
                    <CardDescription className="text-left">Customer satisfaction</CardDescription>
                  </div>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-left">4.7 / 5</div>
                  <p className="text-xs text-muted-foreground mt-1 text-left">
                    <span className="text-green-600">↑ 0.2</span> from last period
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-0">
                    <CardTitle className="text-base text-left">On-Time Delivery</CardTitle>
                    <CardDescription className="text-left">Performance metric</CardDescription>
                  </div>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-left">92%</div>
                  <p className="text-xs text-muted-foreground mt-1 text-left">
                    <span className="text-green-600">↑ 3%</span> from last period
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-left">Driver Performance</CardTitle>
                <CardDescription className="text-left">On-time vs. late deliveries by team</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={courierPerformanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="onTime" stackId="a" fill="#82ca9d" name="On-Time (%)" />
                    <Bar dataKey="lateDelivery" stackId="a" fill="#ff8042" name="Late (%)" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <LiveMap title="Driver Location Tracking" height="400px" />
          </RoleGate>
        </TabsContent>
        
        {/* Finances Tab - Only for admin and partner */}
        <TabsContent value="finances" className="space-y-6">
          <RoleGate allowedRoles={['admin', 'partner']}>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-0">
                    <CardTitle className="text-base text-left">Total Revenue</CardTitle>
                    <CardDescription className="text-left">This {timeRange.replace('_', ' ')}</CardDescription>
                  </div>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-left">
                    {formatCurrency(totalRevenue)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 text-left">
                    <span className="text-green-600">↑ 8%</span> from last period
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-0">
                    <CardTitle className="text-base text-left">Expenses</CardTitle>
                    <CardDescription className="text-left">This {timeRange.replace('_', ' ')}</CardDescription>
                  </div>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-left">
                    {formatCurrency(totalRevenue * 0.65)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 text-left">
                    <span className="text-red-600">↑ 5%</span> from last period
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-0">
                    <CardTitle className="text-base text-left">Net Profit</CardTitle>
                    <CardDescription className="text-left">This {timeRange.replace('_', ' ')}</CardDescription>
                  </div>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-left">
                    {formatCurrency(totalRevenue * 0.35)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 text-left">
                    <span className="text-green-600">↑ 12%</span> from last period
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-left">Revenue by Service Type</CardTitle>
                  <CardDescription className="text-left">Distribution of earnings</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={[
                          { name: 'Same Day Delivery', value: 45 },
                          { name: 'Food Delivery', value: 20 },
                          { name: 'Package Delivery', value: 25 },
                          { name: 'Grocery Delivery', value: 10 },
                        ]}
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
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-left">Monthly Revenue Trend</CardTitle>
                  <CardDescription className="text-left">Last 6 months</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: 'Jan', revenue: 4200 },
                        { month: 'Feb', revenue: 4500 },
                        { month: 'Mar', revenue: 5100 },
                        { month: 'Apr', revenue: 5700 },
                        { month: 'May', revenue: 6200 },
                        { month: 'Jun', revenue: 6800 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: any) => {
                          return [formatCurrency(value), 'Revenue'];
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </RoleGate>
        </TabsContent>
        
        {/* Tracking Tab - Only for guest users */}
        <TabsContent value="tracking" className="space-y-6">
          <LiveMap title="Package Tracking Map" height="500px" />
          
          <Card>
            <CardHeader>
              <CardTitle className="text-left">Delivery Status Timeline</CardTitle>
              <CardDescription className="text-left">Real-time updates on your delivery</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                    <Package className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Order Confirmed</p>
                    <p className="text-sm text-muted-foreground">Today, 10:30 AM</p>
                    <p className="text-sm">Your order has been confirmed and is being processed.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-green-500 text-green-500">
                    <Truck className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Assigned to Driver</p>
                    <p className="text-sm text-muted-foreground">Today, 11:15 AM</p>
                    <p className="text-sm">Your order has been assigned to Ahmad (Driver ID: DRV-123).</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-muted-foreground text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Out for Delivery</p>
                    <p className="text-sm text-muted-foreground">Estimated</p>
                    <p className="text-sm">Your package is on the way to your location.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;

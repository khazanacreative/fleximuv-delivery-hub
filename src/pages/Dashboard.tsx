
import { BarChart3, CreditCard, Package, Truck, Users } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatisticCard from "@/components/dashboard/StatisticCard";
import RecentOrdersTable from "@/components/dashboard/RecentOrdersTable";
import DriverStatusCard from "@/components/dashboard/DriverStatusCard";
import TransactionsList from "@/components/dashboard/TransactionsList";
import { mockOrders, mockDrivers, mockUsers } from "@/data/mock-data";

const Dashboard = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  const isAdmin = user.role === 'admin';
  const isPartner = user.role === 'partner';
  const isDriver = user.role === 'driver';
  
  // Calculate statistics
  const totalOrders = mockOrders.length;
  const pendingOrders = mockOrders.filter(order => order.status === 'pending').length;
  const activeDrivers = mockDrivers.filter(driver => driver.status !== 'offline').length;
  const totalPartners = mockUsers.filter(user => user.role === 'partner').length;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  return (
    <>
      <DashboardHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* All users see wallet balance */}
        <StatisticCard
          title="Wallet Balance"
          value={formatCurrency(user.balance)}
          description="Available for transactions"
          icon={<CreditCard className="h-8 w-8" />}
        />
        
        {/* All users see orders statistic */}
        <StatisticCard
          title="Total Orders"
          value={totalOrders}
          description={`${pendingOrders} pending`}
          icon={<Package className="h-8 w-8" />}
          trend="up"
          trendValue="+12.5% this week"
        />
        
        {/* Admin and Partner specific statistics */}
        {(isAdmin || isPartner) && (
          <StatisticCard
            title="Active Drivers"
            value={activeDrivers}
            description={`${mockDrivers.length} total drivers`}
            icon={<Truck className="h-8 w-8" />}
          />
        )}
        
        {/* Admin specific statistics */}
        {isAdmin && (
          <StatisticCard
            title="Total Partners"
            value={totalPartners}
            description="Active business partners"
            icon={<Users className="h-8 w-8" />}
            trend="up"
            trendValue="+2 this month"
          />
        )}
        
        {/* Driver specific statistics */}
        {isDriver && (
          <>
            <StatisticCard
              title="Completed Orders"
              value={mockDrivers[0].completedOrders}
              description="Lifetime deliveries"
              icon={<Package className="h-8 w-8" />}
            />
            
            <StatisticCard
              title="Rating"
              value={mockDrivers[0].rating.toFixed(1)}
              description="Customer satisfaction"
              icon={<BarChart3 className="h-8 w-8" />}
              trend="up"
              trendValue="+0.2 this month"
            />
          </>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrdersTable />
        </div>
        
        <div className="space-y-6">
          {(isAdmin || isPartner) && <DriverStatusCard />}
          <TransactionsList />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

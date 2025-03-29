
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatisticCard from "@/components/dashboard/StatisticCard";
import DriverStatusCard from "@/components/dashboard/DriverStatusCard";
import TransactionsList from "@/components/dashboard/TransactionsList";
import RecentOrdersTable from "@/components/dashboard/RecentOrdersTable";
import Overview from "@/components/dashboard/Overview";
import FAQ from "@/components/dashboard/FAQ";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatisticCard
          title="Total Revenue"
          value="$45,231.89"
          description="+20.1% from last month"
          trend="up"
        />
        <StatisticCard
          title="Active Orders"
          value="12"
          description="+2 from yesterday"
          trend="up"
        />
        <StatisticCard
          title="Active Drivers"
          value="7"
          description="-1 from yesterday"
          trend="down"
        />
        <StatisticCard
          title="Completed Today"
          value="9"
          description="+3 from yesterday"
          trend="up"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Your revenue and orders data from the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <DriverStatusCard className="md:col-span-3" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RecentOrdersTable className="md:col-span-4" />
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Recent financial activity</CardDescription>
          </CardHeader>
          <CardContent>
            <TransactionsList />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Answers to common questions about our services</CardDescription>
        </CardHeader>
        <CardContent>
          <FAQ />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

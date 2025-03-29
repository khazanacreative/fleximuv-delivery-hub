
import { useAuth } from "@/hooks/use-auth";

const DashboardHeader = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };
  
  const getRoleTitle = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'partner':
        return 'Partner';
      case 'driver':
        return 'Driver';
      case 'customer':
        return 'Customer';
      default:
        return 'User';
    }
  };
  
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold tracking-tight">
        {getGreeting()}, {user.name.split(' ')[0]}
      </h1>
      <p className="text-muted-foreground">
        Welcome to your {getRoleTitle(user.role)} dashboard
      </p>
    </div>
  );
};

export default DashboardHeader;

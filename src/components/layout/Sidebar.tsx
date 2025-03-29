
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Users, Truck, Package, CreditCard, 
  Settings, BarChart, LogOut, Menu, ChevronLeft 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useSidebar } from '@/contexts/SidebarContext';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Sidebar = () => {
  const { collapsed, toggleSidebar } = useSidebar();
  const location = useLocation();
  const { user, logout } = useAuth();
  const isMobile = useIsMobile();

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      // collapseSidebar();
    }
  }, [location.pathname, isMobile]);

  if (!user) return null;

  const isAdmin = user.role === 'admin';
  const isPartner = user.role === 'partner';
  const isDriver = user.role === 'driver';
  const isCustomer = user.role === 'customer';

  const commonLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
  ];

  const adminLinks = [
    { name: 'Partners', path: '/partners', icon: Users },
    { name: 'Drivers', path: '/drivers', icon: Truck },
    { name: 'Orders', path: '/orders', icon: Package },
    { name: 'Finances', path: '/finances', icon: CreditCard },
    { name: 'Reports', path: '/reports', icon: BarChart },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const partnerLinks = [
    { name: 'Drivers', path: '/drivers', icon: Truck },
    { name: 'Orders', path: '/orders', icon: Package },
    { name: 'Finances', path: '/finances', icon: CreditCard },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const driverLinks = [
    { name: 'My Orders', path: '/orders', icon: Package },
    { name: 'Earnings', path: '/earnings', icon: CreditCard },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const customerLinks = [
    { name: 'Orders', path: '/orders', icon: Package },
    { name: 'Wallet', path: '/wallet', icon: CreditCard },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  let links = [...commonLinks];
  if (isAdmin) links = [...links, ...adminLinks];
  else if (isPartner) links = [...links, ...partnerLinks];
  else if (isDriver) links = [...links, ...driverLinks];
  else if (isCustomer) links = [...links, ...customerLinks];

  return (
    <div 
      className={cn(
        "flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        isMobile && !collapsed && "absolute z-50 inset-y-0 left-0 shadow-lg"
      )}
    >
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-fleximov-500 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">FM</span>
            </div>
            <span className="font-semibold text-lg">Fleximov</span>
          </Link>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-auto" 
          onClick={toggleSidebar}
        >
          {collapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      <Separator />

      <ScrollArea className="flex-1">
        <div className="p-2">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors rounded-md",
                  location.pathname === link.path
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground"
                )}
              >
                <link.icon size={18} />
                {!collapsed && <span>{link.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </ScrollArea>

      <div className="p-3 mt-auto">
        {!collapsed && (
          <div className="mb-2 px-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-fleximov-200 flex items-center justify-center">
              <span className="text-fleximov-700 font-medium text-sm">
                {user.name?.charAt(0)}
              </span>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
            </div>
          </div>
        )}
        <Button 
          variant="ghost" 
          className={cn(
            "w-full flex items-center gap-3 justify-start text-muted-foreground hover:text-foreground",
            collapsed && "justify-center p-2"
          )}
          onClick={logout}
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;

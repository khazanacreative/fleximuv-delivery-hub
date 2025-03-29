
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Users, Truck, Package, CreditCard, 
  Settings, BarChart, LogOut
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
    { name: 'Reports', path: '/reports', icon: BarChart },
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
      {/* Navigation Links - with ScrollArea */}
      <ScrollArea className="flex-1 overflow-x-hidden">
        <div className="p-2 mt-4">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-xl backdrop-blur-sm morph-card",
                  location.pathname === link.path
                    ? "bg-sidebar-accent/70 text-sidebar-accent-foreground shadow-sm border border-sidebar-border/40"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground hover:border hover:border-sidebar-border/20"
                )}
              >
                <link.icon size={18} className="flex-shrink-0" />
                {!collapsed && <span>{link.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </ScrollArea>

      {/* Logout Button - Fixed at bottom */}
      <div className={cn(
        "border-t border-sidebar-border p-3 mt-auto bg-sidebar",
      )}>
        <Button 
          variant="ghost" 
          className={cn(
            "w-full flex items-center gap-3 justify-start text-muted-foreground rounded-xl px-4 py-3 hover:bg-destructive/10 hover:text-destructive morph-card",
            collapsed && "justify-center p-2"
          )}
          onClick={logout}
        >
          <LogOut size={18} className="flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;

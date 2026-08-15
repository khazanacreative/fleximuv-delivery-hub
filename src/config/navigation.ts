import {
  Home, Users, Truck, Package, CreditCard,
  BarChart, Wallet, LucideIcon
} from 'lucide-react';

export type NavItem = {
  name: string;
  path: string;
  icon: LucideIcon;
};

/**
 * Mobile bottom navigation: uniform across pages, max 5 direct links per role.
 * Settings lives in the header profile menu, not in the bottom nav.
 */
export const getMobileNavItems = (role?: string): NavItem[] => {
  switch (role) {
    case 'admin':
      return [
        { name: 'Dashboard', path: '/dashboard', icon: Home },
        { name: 'Orders', path: '/orders', icon: Package },
        { name: 'Drivers', path: '/drivers', icon: Truck },
        { name: 'Partners', path: '/partners', icon: Users },
        { name: 'Finances', path: '/finances', icon: CreditCard },
      ];
    case 'partner':
      return [
        { name: 'Dashboard', path: '/dashboard', icon: Home },
        { name: 'Orders', path: '/orders', icon: Package },
        { name: 'Drivers', path: '/drivers', icon: Truck },
        { name: 'Finances', path: '/finances', icon: CreditCard },
        { name: 'Reports', path: '/reports', icon: BarChart },
      ];
    case 'driver':
      return [
        { name: 'Dashboard', path: '/dashboard', icon: Home },
        { name: 'My Orders', path: '/my-orders', icon: Package },
        { name: 'Earnings', path: '/earnings', icon: CreditCard },
      ];
    case 'customer':
      return [
        { name: 'Dashboard', path: '/dashboard', icon: Home },
        { name: 'Orders', path: '/orders', icon: Package },
        { name: 'Wallet', path: '/finances', icon: Wallet },
      ];
    default:
      return [{ name: 'Dashboard', path: '/dashboard', icon: Home }];
  }
};

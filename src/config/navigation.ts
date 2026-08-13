import {
  Home, Users, Truck, Package, CreditCard,
  Settings, BarChart, Wallet, LucideIcon
} from 'lucide-react';

export type NavItem = {
  name: string;
  path?: string;
  icon: LucideIcon;
  /** Sub items — only used for the single optional "merged" entry */
  children?: { name: string; path: string; icon: LucideIcon }[];
};

/**
 * Mobile bottom navigation: max 5 entries per role.
 * Main menus are always direct links; only the least-used pair is merged.
 */
export const getMobileNavItems = (role?: string): NavItem[] => {
  switch (role) {
    case 'admin':
      return [
        { name: 'Dashboard', path: '/dashboard', icon: Home },
        { name: 'Orders', path: '/orders', icon: Package },
        { name: 'Drivers', path: '/drivers', icon: Truck },
        { name: 'Partners', path: '/partners', icon: Users },
        {
          name: 'Finance',
          icon: CreditCard,
          children: [
            { name: 'Finances', path: '/finances', icon: CreditCard },
            { name: 'Reports', path: '/reports', icon: BarChart },
            { name: 'Settings', path: '/settings', icon: Settings },
          ],
        },
      ];
    case 'partner':
      return [
        { name: 'Dashboard', path: '/dashboard', icon: Home },
        { name: 'Orders', path: '/orders', icon: Package },
        { name: 'Drivers', path: '/drivers', icon: Truck },
        {
          name: 'Finance',
          icon: CreditCard,
          children: [
            { name: 'Finances', path: '/finances', icon: CreditCard },
            { name: 'Reports', path: '/reports', icon: BarChart },
          ],
        },
        { name: 'Settings', path: '/settings', icon: Settings },
      ];
    case 'driver':
      return [
        { name: 'Dashboard', path: '/dashboard', icon: Home },
        { name: 'My Orders', path: '/orders', icon: Package },
        { name: 'Earnings', path: '/earnings', icon: CreditCard },
        { name: 'Settings', path: '/settings', icon: Settings },
      ];
    case 'customer':
      return [
        { name: 'Dashboard', path: '/dashboard', icon: Home },
        { name: 'Orders', path: '/orders', icon: Package },
        { name: 'Wallet', path: '/wallet', icon: Wallet },
        { name: 'Settings', path: '/settings', icon: Settings },
      ];
    default:
      return [{ name: 'Dashboard', path: '/dashboard', icon: Home }];
  }
};

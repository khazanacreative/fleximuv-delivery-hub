
import { useEffect, useState, useRef } from 'react';
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
  const [activeDescription, setActiveDescription] = useState('');
  const [hoveredLink, setHoveredLink] = useState('');
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      // collapseSidebar();
    }
  }, [location.pathname, isMobile]);

  // Setup double click handler for sidebar toggle
  useEffect(() => {
    const handleDoubleClick = (e: MouseEvent) => {
      if (sidebarRef.current && sidebarRef.current.contains(e.target as Node)) {
        toggleSidebar();
      }
    };

    document.addEventListener('dblclick', handleDoubleClick);
    return () => {
      document.removeEventListener('dblclick', handleDoubleClick);
    };
  }, [toggleSidebar]);

  if (!user) return null;

  const isAdmin = user?.role === 'admin';
  const isPartner = user?.role === 'partner';
  const isDriver = user?.role === 'driver';
  const isCustomer = user?.role === 'customer';

  const commonLinks = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: Home,
      description: 'Pantau statistik dan aktivitas terbaru di satu tempat. Lihat ringkasan pesanan, driver, dan transaksi.'
    },
  ];

  const adminLinks = [
    { 
      name: 'Partners', 
      path: '/partners', 
      icon: Users,
      description: 'Kelola semua partner bisnis Anda. Tambah, edit, atau nonaktifkan akun partner dengan mudah.'
    },
    { 
      name: 'Drivers', 
      path: '/drivers', 
      icon: Truck,
      description: 'Kelola semua driver aktif. Pantau status, performa, dan ketersediaan driver secara real-time.'
    },
    { 
      name: 'Orders', 
      path: '/orders', 
      icon: Package,
      description: 'Kelola semua pesanan pengiriman dan tetap bisa komunikasi dan memantau melalui notifikasi WhatsApp.'
    },
    { 
      name: 'Finances', 
      path: '/finances', 
      icon: CreditCard,
      description: 'Kelola semua transaksi keuangan. Pantau pendapatan, biaya, dan laporan keuangan bulanan.'
    },
    { 
      name: 'Reports', 
      path: '/reports', 
      icon: BarChart,
      description: 'Lihat laporan dan analisis lengkap tentang bisnis Anda. Unduh laporan dalam berbagai format.'
    },
    { 
      name: 'Settings', 
      path: '/settings', 
      icon: Settings,
      description: 'Sesuaikan pengaturan aplikasi, profil pengguna, notifikasi, dan preferensi lainnya.'
    },
  ];

  const partnerLinks = [
    { 
      name: 'Drivers', 
      path: '/drivers', 
      icon: Truck,
      description: 'Kelola driver Anda. Tambahkan driver baru, pantau kinerja, dan atur jadwal pengiriman.'
    },
    { 
      name: 'Orders', 
      path: '/orders', 
      icon: Package,
      description: 'Kelola semua pesanan pengiriman dan tetap bisa komunikasi dan memantau melalui notifikasi WhatsApp.'
    },
    { 
      name: 'Finances', 
      path: '/finances', 
      icon: CreditCard,
      description: 'Pantau pendapatan, biaya, dan saldo. Lihat riwayat transaksi dan penarikan dana.'
    },
    { 
      name: 'Reports', 
      path: '/reports', 
      icon: BarChart,
      description: 'Lihat laporan performa bisnis dan analisis pengiriman Anda dalam periode tertentu.'
    },
    { 
      name: 'Settings', 
      path: '/settings', 
      icon: Settings,
      description: 'Sesuaikan pengaturan profil, notifikasi, dan preferensi layanan Anda.'
    },
  ];

  const driverLinks = [
    { 
      name: 'My Orders', 
      path: '/orders', 
      icon: Package,
      description: 'Lihat semua pesanan yang ditugaskan kepada Anda. Update status pengiriman dengan mudah.'
    },
    { 
      name: 'Earnings', 
      path: '/earnings', 
      icon: CreditCard,
      description: 'Pantau pendapatan Anda. Lihat riwayat pembayaran dan bonus yang telah diterima.'
    },
    { 
      name: 'Settings', 
      path: '/settings', 
      icon: Settings,
      description: 'Atur profil, notifikasi, dan preferensi akun Anda sebagai driver.'
    },
  ];

  const customerLinks = [
    { 
      name: 'Orders', 
      path: '/orders', 
      icon: Package,
      description: 'Pantau status pesanan Anda. Lihat riwayat pesanan dan buat pesanan baru dengan mudah.'
    },
    { 
      name: 'Wallet', 
      path: '/wallet', 
      icon: CreditCard,
      description: 'Kelola saldo dan metode pembayaran Anda. Lihat riwayat transaksi dan isi ulang saldo.'
    },
    { 
      name: 'Settings', 
      path: '/settings', 
      icon: Settings,
      description: 'Sesuaikan pengaturan profil, alamat, dan preferensi notifikasi Anda.'
    },
  ];

  let links = [...commonLinks];
  if (isAdmin) links = [...links, ...adminLinks];
  else if (isPartner) links = [...links, ...partnerLinks];
  else if (isDriver) links = [...links, ...driverLinks];
  else if (isCustomer) links = [...links, ...customerLinks];

  // Find the active link description based on current path
  useEffect(() => {
    const activeLink = links.find(link => link.path === location.pathname);
    if (activeLink) {
      setActiveDescription(activeLink.description);
    }
  }, [location.pathname, links]);

  return (
    <div 
      ref={sidebarRef}
      className={cn(
        "flex flex-col h-[calc(100vh-4rem)] bg-sidebar border-r border-sidebar-border fixed top-16 left-0 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        isMobile && !collapsed && "z-50 shadow-lg"
      )}
    >
      <div className="pt-1">
        {/* Removed the toggle button, using double-click instead */}
      </div>
      
      <div className="flex flex-col h-full">
        {/* Navigation Links - with ScrollArea */}
        <ScrollArea className="flex-1 overflow-x-hidden">
          <div className="p-2">
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
                  onMouseEnter={() => {
                    if (!collapsed) {
                      setHoveredLink(link.path);
                      setActiveDescription(link.description);
                    }
                  }}
                  onMouseLeave={() => {
                    if (!collapsed) {
                      setHoveredLink('');
                      const activeLink = links.find(l => l.path === location.pathname);
                      setActiveDescription(activeLink ? activeLink.description : '');
                    }
                  }}
                >
                  <link.icon size={18} className="flex-shrink-0" />
                  {!collapsed && <span>{link.name}</span>}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Description area - only shows when sidebar is expanded */}
          {!collapsed && activeDescription && (
            <div className="px-4 py-3 mt-2 mb-4 mx-2 text-xs text-muted-foreground bg-sidebar-accent/20 rounded-lg">
              {activeDescription}
            </div>
          )}
        </ScrollArea>

        {/* Logout Button - Fixed at bottom */}
        <div className={cn(
          "border-t border-sidebar-border p-3 bg-sidebar sticky bottom-0 mt-auto",
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
    </div>
  );
};

export default Sidebar;

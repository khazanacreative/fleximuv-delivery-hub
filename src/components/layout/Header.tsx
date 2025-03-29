
import { useState } from 'react';
import { Bell, Search, MapPin, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from '@/components/ui/badge';

const Header = () => {
  const { user, logout } = useAuth();
  // Mock notifications
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'order', title: 'Order #12345 updated', message: 'Status changed to In Progress', time: '5 min ago', read: false },
    { id: 2, type: 'driver', title: 'Driver assigned', message: 'Budi S. has been assigned to order #12346', time: '15 min ago', read: false },
    { id: 3, type: 'system', title: 'System update', message: 'New features available', time: '1 hour ago', read: true },
  ]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'order': return <Package className="h-4 w-4" />;
      case 'driver': return <MapPin className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-30">
      <div className="flex items-center justify-between h-full px-4">
        {/* Logo Area */}
        <div className="flex items-center gap-8">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-fleximov-500 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">FM</span>
            </div>
            <span className="font-semibold text-lg ml-2 hidden md:inline-block">Fleximov</span>
          </div>
          
          {/* Search bar - moved further right */}
          <div className="relative ml-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Search..." 
              className="pl-10 bg-muted/30 border-muted/50 w-[200px] md:w-[300px] h-9 rounded-xl"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground rounded-full hover:bg-accent/50 relative">
                <Bell size={20} />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[18px] h-[18px] text-[10px] bg-red-500 text-white border-none rounded-full">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-3 border-b">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Notifications</h4>
                  {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" className="h-auto text-xs" onClick={markAllAsRead}>
                      Mark all as read
                    </Button>
                  )}
                </div>
              </div>
              <div className="max-h-[300px] overflow-auto">
                {notifications.length === 0 ? (
                  <div className="py-6 text-center text-muted-foreground">
                    <p>No notifications</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-3 border-b hover:bg-muted/50 transition-colors cursor-pointer ${notification.read ? 'opacity-70' : 'bg-muted/20'}`}
                    >
                      <div className="flex gap-3">
                        <div className={`rounded-full p-2 ${notification.read ? 'bg-muted' : 'bg-primary/10 text-primary'}`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{notification.title}</div>
                          <p className="text-xs text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="p-2 border-t">
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full h-8 w-8 ml-1 hover:bg-accent/50"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-fleximov-100 text-fleximov-700">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl backdrop-blur-sm bg-background/95 border border-border/50">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{user?.name}</span>
                  <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-accent/50">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-destructive/10 hover:text-destructive" onClick={logout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;

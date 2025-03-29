
import { Bell, Search } from 'lucide-react';
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

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-30">
      <div className="flex items-center justify-between h-full px-4">
        {/* Logo Area */}
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-fleximov-500 rounded-md flex items-center justify-center mr-2">
              <span className="text-white font-bold text-sm">FM</span>
            </div>
            <span className="font-semibold text-lg hidden md:inline-block">Fleximov</span>
          </div>
          
          {/* Search bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Search..." 
              className="pl-10 bg-muted/50 w-[200px] md:w-[300px] h-9"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bell size={20} />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full h-8 w-8 ml-1"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-fleximov-100 text-fleximov-700">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{user?.name}</span>
                  <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={logout}>
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

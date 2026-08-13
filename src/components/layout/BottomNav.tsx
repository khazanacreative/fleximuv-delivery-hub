import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { getMobileNavItems } from '@/config/navigation';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const BottomNav = () => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const items = getMobileNavItems(user.role);

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-border/60 bg-background/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
      <ul className="flex items-stretch justify-around">
        {items.map((item) => {
          const active = item.path
            ? pathname === item.path
            : !!item.children?.some((c) => c.path === pathname);

          const content = (
            <span
              className={cn(
                'flex flex-col items-center justify-center gap-1 py-2 px-1 w-full text-[11px] font-medium transition-colors',
                active ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <item.icon size={20} className="flex-shrink-0" />
              <span className="truncate max-w-[68px]">{item.name}</span>
            </span>
          );

          return (
            <li key={item.name} className="flex-1 flex">
              {item.path ? (
                <Link to={item.path} className="flex-1 flex">
                  {content}
                </Link>
              ) : (
                <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger className="flex-1 flex">{content}</SheetTrigger>
                  <SheetContent side="bottom" className="rounded-t-2xl">
                    <SheetHeader className="text-left">
                      <SheetTitle>{item.name}</SheetTitle>
                    </SheetHeader>
                    <div className="grid gap-1 py-3">
                      {item.children?.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          onClick={() => setOpen(false)}
                          className={cn(
                            'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                            pathname === child.path
                              ? 'bg-accent text-accent-foreground'
                              : 'hover:bg-accent/50'
                          )}
                        >
                          <child.icon size={18} />
                          {child.name}
                        </Link>
                      ))}
                      <Button
                        variant="ghost"
                        className="justify-start gap-3 rounded-xl px-4 py-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => {
                          setOpen(false);
                          logout();
                        }}
                      >
                        <LogOut size={18} />
                        Logout
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNav;

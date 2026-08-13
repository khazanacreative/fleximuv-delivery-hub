import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { getMobileNavItems } from '@/config/navigation';
import { cn } from '@/lib/utils';

const BottomNav = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();

  if (!user) return null;

  const items = getMobileNavItems(user.role);

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-border/60 bg-background/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
      <ul className="flex items-stretch justify-around">
        {items.map((item) => {
          const active = pathname === item.path;

          return (
            <li key={item.name} className="flex-1 flex">
              <Link to={item.path} className="flex-1 flex">
                <span
                  className={cn(
                    'flex flex-col items-center justify-center gap-1 py-2 px-1 w-full text-[11px] font-medium transition-colors',
                    active ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  <span className="truncate max-w-[68px]">{item.name}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNav;

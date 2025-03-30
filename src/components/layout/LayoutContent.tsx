
import { Suspense, ReactNode, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import PageLoader from "@/components/shared/PageLoader";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

interface LayoutContentProps {
  children?: ReactNode;
}

const LayoutContent = ({ children }: LayoutContentProps) => {
  const { collapsed } = useSidebar();
  const { user } = useAuth();
  
  // Ensure sidebar is always visible for authenticated users
  useEffect(() => {
    // Verify the sidebar container element is properly rendered
    const sidebarElement = document.querySelector('.sidebar-container');
    if (!sidebarElement && user) {
      console.log('Sidebar element not found but user is authenticated, forcing re-render');
      // Force a re-render by toggling a class on the body
      document.body.classList.add('force-sidebar-visible');
      setTimeout(() => {
        document.body.classList.remove('force-sidebar-visible');
      }, 100);
    }
  }, [user]);
  
  if (!user) {
    return <PageLoader />;
  }
  
  return (
    <div className="min-h-screen flex w-full bg-background/98">
      <Header />
      <div className="flex flex-1 pt-16"> {/* Header height space */}
        <Sidebar />
        <div className={cn(
          "flex-1 flex flex-col min-h-screen transition-all duration-300",
          collapsed ? "ml-16" : "ml-64"  /* Account for fixed sidebar width */
        )}>
          <main className="flex-1 overflow-auto">
            <div className="px-6 md:px-8 pt-4 pb-8 max-w-7xl mx-auto"> {/* Updated horizontal padding */}
              <Suspense fallback={<PageLoader />}>
                {children || <Outlet />}
              </Suspense>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LayoutContent;

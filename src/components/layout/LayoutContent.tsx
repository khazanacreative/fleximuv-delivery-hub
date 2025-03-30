
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
  const { collapsed, expandSidebar } = useSidebar();
  const { user } = useAuth();
  
  // Force sidebar to be visible when first rendering the dashboard
  useEffect(() => {
    if (user) {
      // Add a small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        const sidebarElement = document.querySelector('.sidebar-container');
        if (!sidebarElement) {
          console.log('Sidebar element not found, forcing sidebar to be visible');
          // Force the sidebar to appear by triggering an expand
          expandSidebar();
        }
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [user, expandSidebar]);
  
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

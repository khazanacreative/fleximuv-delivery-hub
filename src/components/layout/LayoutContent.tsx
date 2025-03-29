
import { Suspense, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import PageLoader from "@/components/shared/PageLoader";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";

interface LayoutContentProps {
  children?: ReactNode;
}

const LayoutContent = ({ children }: LayoutContentProps) => {
  const { collapsed } = useSidebar();
  
  return (
    <div className="min-h-screen flex w-full bg-background/98">
      <Header />
      <div className="flex flex-1 pt-16"> {/* Header height space */}
        <Sidebar />
        <div className={cn(
          "flex-1 flex flex-col min-h-screen",
          collapsed ? "ml-16" : "ml-64"  /* Account for fixed sidebar width */
        )}>
          <main className="flex-1 overflow-auto">
            <div className="px-5 pt-1 max-w-7xl"> {/* Top margin 5px (pt-1) */}
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

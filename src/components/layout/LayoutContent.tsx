
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
      <div className="flex flex-1 pt-16"> {/* Added pt-16 to account for header height */}
        <div className="z-10"> 
          <Sidebar />
        </div>
        <div className={cn(
          "flex-1 flex flex-col min-h-screen transition-[margin] duration-300",
          collapsed ? "ml-16" : "ml-64"
        )}>
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto px-6 py-6 max-w-7xl">
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

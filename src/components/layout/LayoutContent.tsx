
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
      <Sidebar />
      <div className={cn(
        "flex-1 flex flex-col min-h-screen transition-[margin] duration-300",
        collapsed ? "ml-16" : "ml-64"
      )}>
        <Header />
        <main className="flex-1 mt-16 overflow-auto">
          <div className="container mx-auto px-6 py-6 max-w-7xl">
            <Suspense fallback={<PageLoader />}>
              {children || <Outlet />}
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LayoutContent;

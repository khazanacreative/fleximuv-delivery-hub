
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
        <div className="flex-1 flex flex-col min-h-screen">
          <main className="flex-1 overflow-auto">
            <div className="px-5 pt-1 max-w-7xl"> {/* Reduced top margin to 5px (pt-1), left padding to 20px (px-5) */}
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

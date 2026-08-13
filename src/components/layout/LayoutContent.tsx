
import { Suspense, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import BottomNav from "./BottomNav";
import PageLoader from "@/components/shared/PageLoader";
import { useSidebar } from "@/contexts/SidebarContext";
import { useAuth } from "@/hooks/use-auth";
import { usePermissions } from "@/hooks/use-permissions";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface LayoutContentProps {
  children?: ReactNode;
}

const LayoutContent = ({ children }: LayoutContentProps) => {
  const { collapsed } = useSidebar();
  const { user } = useAuth();
  const { isDriver } = usePermissions();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex w-full bg-background/98">
      <Header />
      <div className="flex flex-1 pt-16 w-full"> {/* Header height space */}
        {!isMobile && <Sidebar />}
        <div className={cn(
          "flex-1 flex flex-col min-w-0",
          !isMobile && (collapsed ? "ml-16" : "ml-64"),
          isDriver ? "bg-gradient-to-br from-fleximuv-50/50 to-background" : ""
        )}>
          <main className="flex-1 overflow-x-hidden">
            <div className={cn(
              "px-4 sm:px-6 md:px-8 pt-4 pb-24 md:pb-8 max-w-7xl mx-auto w-full",
              isDriver ? "pt-6" : ""
            )}>
              <Suspense fallback={<PageLoader />}>
                {children || <Outlet />}
              </Suspense>
            </div>
          </main>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default LayoutContent;

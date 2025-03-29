
import { Suspense, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { SidebarProvider } from "@/contexts/SidebarContext";
import PageLoader from "@/components/shared/PageLoader";
import { useAuth } from "@/hooks/use-auth";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated } = useAuth();
  const { collapsed } = useSidebar();

  if (!isAuthenticated) return null;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background/98">
        <Sidebar />
        <div className={cn(
          "flex-1 flex flex-col min-h-screen",
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
    </SidebarProvider>
  );
};

export default Layout;

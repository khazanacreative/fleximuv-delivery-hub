
import { Suspense, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { SidebarProvider } from "@/contexts/SidebarContext";
import PageLoader from "@/components/shared/PageLoader";
import { useAuth } from "@/hooks/use-auth";

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 mt-16 overflow-auto">
            {/* Search bar relocated here */}
            <div className="border-b p-4">
              <div className="relative max-w-md mx-auto md:mx-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  placeholder="Search..." 
                  className="pl-10 bg-muted/50"
                />
              </div>
            </div>
            <div className="container mx-auto p-4 md:p-6">
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

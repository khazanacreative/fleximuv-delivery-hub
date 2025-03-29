
import { ReactNode } from "react";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { useAuth } from "@/hooks/use-auth";
import LayoutContent from "./LayoutContent";

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <SidebarProvider>
      <LayoutContent children={children} />
    </SidebarProvider>
  );
};

export default Layout;

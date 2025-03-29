
import React, { createContext, useContext, useState } from 'react';

interface SidebarContextType {
  collapsed: boolean;
  toggleSidebar: () => void;
  expandSidebar: () => void;
  collapseSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);
  const expandSidebar = () => setCollapsed(false);
  const collapseSidebar = () => setCollapsed(true);

  return (
    <SidebarContext.Provider value={{ collapsed, toggleSidebar, expandSidebar, collapseSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

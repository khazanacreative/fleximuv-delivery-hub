import React, { createContext, useContext, useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarContextType {
  collapsed: boolean;
  toggleSidebar: () => void;
  expandSidebar: () => void;
  collapseSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const SIDEBAR_STATE_KEY = 'fleximov-sidebar-state';

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(() => {
    // Get initial state from localStorage if available
    const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
    // On mobile devices, default to collapsed
    if (isMobile) return true;
    // Otherwise use saved state or default to expanded (false)
    return savedState ? JSON.parse(savedState) : false;
  });

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(collapsed));
  }, [collapsed]);

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

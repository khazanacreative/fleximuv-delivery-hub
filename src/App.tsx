
import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/use-auth";
import Layout from "@/components/layout/Layout";
import Login from "@/pages/Login";
import Index from "@/pages/Index";
import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";
import PageLoader from "@/components/shared/PageLoader";

// Lazy-loaded pages for future implementation
const Partners = lazy(() => import("@/pages/Partners"));
const Drivers = lazy(() => import("@/pages/Drivers"));
const Orders = lazy(() => import("@/pages/Orders"));
const Finances = lazy(() => import("@/pages/Finances"));
const Settings = lazy(() => import("@/pages/Settings"));

// Create placeholders for lazy-loaded pages
const PartnersPage = () => (
  <Suspense fallback={<PageLoader />}>
    <Partners />
  </Suspense>
);

const DriversPage = () => (
  <Suspense fallback={<PageLoader />}>
    <Drivers />
  </Suspense>
);

const OrdersPage = () => (
  <Suspense fallback={<PageLoader />}>
    <Orders />
  </Suspense>
);

const FinancesPage = () => (
  <Suspense fallback={<PageLoader />}>
    <Finances />
  </Suspense>
);

const SettingsPage = () => (
  <Suspense fallback={<PageLoader />}>
    <Settings />
  </Suspense>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/landing" element={<Landing />} />
            
            <Route path="/" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="partners" element={<PartnersPage />} />
              <Route path="drivers" element={<DriversPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="finances" element={<FinancesPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

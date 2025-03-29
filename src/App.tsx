
import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/use-auth";
import Layout from "@/components/layout/Layout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
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
const Reports = lazy(() => import("@/pages/Reports"));
const OrderTracker = lazy(() => import("@/components/orders/OrderTracker"));

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

const ReportsPage = () => (
  <Suspense fallback={<PageLoader />}>
    <Reports />
  </Suspense>
);

const TrackingPage = () => (
  <Suspense fallback={<PageLoader />}>
    <OrderTracker />
  </Suspense>
);

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/landing" element={<Landing />} />
    <Route path="/track/:trackingCode" element={<TrackingPage />} />
    
    <Route path="/" element={<Layout />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="partners" element={<PartnersPage />} />
      <Route path="drivers" element={<DriversPage />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="finances" element={<FinancesPage />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="reports" element={<ReportsPage />} />
    </Route>
    
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;

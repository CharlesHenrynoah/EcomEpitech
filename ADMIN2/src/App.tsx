import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";

// Pages
import Dashboard from "./pages/Dashboard";
import SneakyAssistantPage from "./pages/SneakyAssistant";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import CustomerDetail from "./pages/CustomerDetail";
import AccountManagement from "./pages/AccountManagement";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Legal from "./pages/Legal";
import Profile from "./pages/Profile";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 bg-muted/30">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

// Placeholder pages for remaining routes
const Scraper = () => (
  <div className="animate-fade-in">
    <h1 className="text-3xl font-bold">Scraper</h1>
    <p className="text-muted-foreground mt-2">Gestion du scraper - À venir</p>
  </div>
);



const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth route */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedLayout>
                <Dashboard />
              </ProtectedLayout>
            } />
            <Route path="/sneaky" element={
              <ProtectedLayout>
                <ProtectedRoute requiredPage="/sneaky">
                  <SneakyAssistantPage />
                </ProtectedRoute>
              </ProtectedLayout>
            } />
            <Route path="/products" element={
              <ProtectedLayout>
                <Products />
              </ProtectedLayout>
            } />
            <Route path="/categories" element={
              <ProtectedLayout>
                <Categories />
              </ProtectedLayout>
            } />
            <Route path="/customers" element={
              <ProtectedLayout>
                <ProtectedRoute requiredPage="/customers">
                  <Customers />
                </ProtectedRoute>
              </ProtectedLayout>
            } />
            <Route path="/customers/:customerId" element={
              <ProtectedLayout>
                <ProtectedRoute requiredPage="/customers">
                  <CustomerDetail />
                </ProtectedRoute>
              </ProtectedLayout>
            } />
            <Route path="/orders" element={
              <ProtectedLayout>
                <ProtectedRoute requiredPage="/orders">
                  <Orders />
                </ProtectedRoute>
              </ProtectedLayout>
            } />
            <Route path="/scraper" element={
              <ProtectedLayout>
                <ProtectedRoute requiredPage="/scraper">
                  <Scraper />
                </ProtectedRoute>
              </ProtectedLayout>
            } />
            <Route path="/account-management" element={
              <ProtectedLayout>
                <ProtectedRoute requiredPage="/account-management">
                  <AccountManagement />
                </ProtectedRoute>
              </ProtectedLayout>
            } />
            <Route path="/legal" element={
              <ProtectedLayout>
                <ProtectedRoute requiredPage="/legal">
                  <Legal />
                </ProtectedRoute>
              </ProtectedLayout>
            } />
            <Route path="/profile" element={
              <ProtectedLayout>
                <Profile />
              </ProtectedLayout>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

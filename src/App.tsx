
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import MainLayout from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import UsersPage from "@/pages/users/UsersPage";
import RolesPage from "@/pages/roles/RolesPage";
import MenusPage from "@/pages/menus/MenusPage";
import OfficesPage from "@/pages/master/OfficesPage";
import DepartmentsPage from "@/pages/master/DepartmentsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// App wrapper with the needed providers
const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {children}
        <Toaster richColors />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// Layout wrapper for authenticated routes
const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return <MainLayout>{children}</MainLayout>;
};

const App = () => (
  <AppWrapper>
    <BrowserRouter>
      <Routes>
        {/* Root route with layout */}
        <Route
          path="/"
          element={
            <LayoutWrapper>
              <Dashboard />
            </LayoutWrapper>
          }
        />
        
        {/* User Management */}
        <Route
          path="/users"
          element={
            <LayoutWrapper>
              <UsersPage />
            </LayoutWrapper>
          }
        />
        
        {/* Role Management */}
        <Route
          path="/roles"
          element={
            <LayoutWrapper>
              <RolesPage />
            </LayoutWrapper>
          }
        />
        
        {/* Menu Management */}
        <Route
          path="/menus"
          element={
            <LayoutWrapper>
              <MenusPage />
            </LayoutWrapper>
          }
        />
        
        {/* Master Data - Offices */}
        <Route
          path="/master/offices"
          element={
            <LayoutWrapper>
              <OfficesPage />
            </LayoutWrapper>
          }
        />
        
        {/* Master Data - Departments */}
        <Route
          path="/master/departments"
          element={
            <LayoutWrapper>
              <DepartmentsPage />
            </LayoutWrapper>
          }
        />
        
        {/* Master Data - Positions will be added later */}
        
        {/* Master Data - Assets will be added later */}
        
        {/* Settings will be added later */}
        
        {/* Catch all 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </AppWrapper>
);

export default App;

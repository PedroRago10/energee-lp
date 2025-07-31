import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ContentManagement from "./pages/ContentManagement";
import PlansManagement from "./pages/PlansManagement";
import FormSubmissions from "./pages/FormSubmissions";
import FAQManagement from "./pages/FAQManagement";
import SettingsManagement from "./pages/SettingsManagement";
import NotFound from "./pages/NotFound";

// Create QueryClient instance outside component to prevent recreation
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/content" element={<ContentManagement />} />
          <Route path="/admin/plans" element={<PlansManagement />} />
          <Route path="/admin/forms" element={<FormSubmissions />} />
          <Route path="/admin/faq" element={<FAQManagement />} />
          <Route path="/admin/settings" element={<SettingsManagement />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminPanel from "./pages/AdminPanel";
import AdminMessages from "./pages/AdminMessages";
import MessageView from "./pages/MessageView";
import AdminLogin from "./pages/AdminLogin";
import StaffLogin from "./pages/StaffLogin";
import StaffPanel from "./pages/StaffPanel";
import StaffMessages from "./pages/StaffMessages";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedStaffRoute from "./components/ProtectedStaffRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/bc-admin/login" element={<AdminLogin />} />
          <Route path="/bc-sp=login" element={<StaffLogin />} />
          <Route path="/bc-sp=panel" element={
            <ProtectedStaffRoute>
              <StaffPanel />
            </ProtectedStaffRoute>
          } />
          <Route path="/bc-sp=vm" element={
            <ProtectedStaffRoute>
              <StaffMessages />
            </ProtectedStaffRoute>
          } />
          <Route path="/bc-admin" element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } />
          <Route path="/bc-admin/messages/admin/show" element={
            <ProtectedRoute>
              <AdminMessages />
            </ProtectedRoute>
          } />
          <Route path="/messages/submitted/:id" element={
            <ProtectedRoute>
              <MessageView />
            </ProtectedRoute>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);

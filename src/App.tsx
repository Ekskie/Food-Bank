
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import FoodBanks from "./pages/FoodBanks";
import FoodBankLocator from "./pages/FoodBankLocator";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import DonatePage from "./pages/DonatePage";
import ManageUsers from "./pages/admin/ManageUsers";
import InventoryManagement from "./pages/admin/InventoryManagement";
import BeneficiaryManagement from "./pages/admin/BeneficiaryManagement";
import NotFound from "./pages/NotFound";
import DonationHistory from "./pages/DonationHistory";
import SchedulePickup from "./pages/SchedulePickup";
import RequestAssistance from "./pages/RequestAssistance";
import RewardSystem from "./pages/RewardSystem";
import ProfilePage from "./pages/ProfilePage";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/food-banks" element={<FoodBanks />} />
              <Route path="/food-bank-locator" element={<FoodBankLocator />} />
              <Route path="/donate" element={<DonatePage />} />
              <Route path="/donation-history" element={<DonationHistory />} />
              <Route path="/schedule-pickup" element={<SchedulePickup />} />
              <Route path="/request-assistance" element={<RequestAssistance />} />
              <Route path="/rewards" element={<RewardSystem />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/manage-users" element={<ManageUsers />} />
              <Route path="/inventory" element={<InventoryManagement />} />
              <Route path="/beneficiaries" element={<BeneficiaryManagement />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

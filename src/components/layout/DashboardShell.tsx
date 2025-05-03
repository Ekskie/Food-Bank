
import { ReactNode } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const { user, isLoading } = useAuth();

  // If authentication is still loading, show a loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen flex-col">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  );
}


import { DashboardShell } from "@/components/layout/DashboardShell";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { DonorDashboard } from "@/components/dashboard/DonorDashboard";
import { VolunteerDashboard } from "@/components/dashboard/VolunteerDashboard";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  const renderDashboardByRole = () => {
    switch (user?.role) {
      case "admin":
        return <AdminDashboard />;
      case "donor":
        return <DonorDashboard />;
      case "volunteer":
        return <VolunteerDashboard />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold mb-2">Welcome to Your Dashboard</h2>
            <p className="text-muted-foreground">Your role-specific dashboard is loading...</p>
          </div>
        );
    }
  };

  return (
    <DashboardShell>
      {renderDashboardByRole()}
    </DashboardShell>
  );
}

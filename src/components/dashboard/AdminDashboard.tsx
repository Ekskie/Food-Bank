
import { DashboardHeader } from "./DashboardHeader";
import { StatCard } from "./StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Users, ShoppingBag, Calendar, Clock, Package } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col space-y-6">
      <DashboardHeader
        title={`Welcome, ${user?.name}`}
        description="Here's what's happening with your food bank network."
        role="admin"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value="12,345"
          icon={<Users className="h-4 w-4" />}
          change={{ value: "12%", positive: true }}
        />
        <StatCard
          title="Food Banks"
          value="48"
          icon={<ShoppingBag className="h-4 w-4" />}
          change={{ value: "5%", positive: true }}
        />
        <StatCard
          title="Active Donors"
          value="3,721"
          icon={<Users className="h-4 w-4" />}
          change={{ value: "8%", positive: true }}
        />
        <StatCard
          title="Food Distributed"
          value="195,462 lbs"
          icon={<Package className="h-4 w-4" />}
          change={{ value: "15%", positive: true }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Donation Overview</CardTitle>
            <CardDescription>
              Food donation trends over the past 30 days
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center rounded-md">
              <BarChart className="h-8 w-8 text-muted" />
              <span className="ml-2 text-sm text-muted-foreground">Chart visualization would go here</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              Food drives and donation schedules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="min-w-fit rounded-md bg-primary/10 p-2">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Community Food Drive</p>
                  <p className="text-sm text-muted-foreground">Downtown Community Center</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>Tomorrow, 10:00 AM</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="min-w-fit rounded-md bg-primary/10 p-2">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Restaurant Partner Pickup</p>
                  <p className="text-sm text-muted-foreground">5 Locations</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>Friday, 2:00 PM</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="min-w-fit rounded-md bg-primary/10 p-2">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Monthly Distribution</p>
                  <p className="text-sm text-muted-foreground">All Food Bank Locations</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>Next Week, Monday</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates and notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="text-sm font-semibold">New Food Bank Registered</h4>
                <p className="text-sm text-muted-foreground">Westside Community Aid Center joined the network</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h4 className="text-sm font-semibold">Low Inventory Alert</h4>
                <p className="text-sm text-muted-foreground">North District Food Bank is low on canned goods</p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h4 className="text-sm font-semibold">Large Donation Received</h4>
                <p className="text-sm text-muted-foreground">Local Supermarket Chain donated 2,500 lbs of food</p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-4 hover:border-primary hover:bg-primary/5 transition-colors">
                <Users className="h-6 w-6 mb-2 text-primary" />
                <span className="text-sm font-medium">Manage Users</span>
              </button>
              <button className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-4 hover:border-primary hover:bg-primary/5 transition-colors">
                <Package className="h-6 w-6 mb-2 text-primary" />
                <span className="text-sm font-medium">Update Inventory</span>
              </button>
              <button className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-4 hover:border-primary hover:bg-primary/5 transition-colors">
                <ShoppingBag className="h-6 w-6 mb-2 text-primary" />
                <span className="text-sm font-medium">Add Food Bank</span>
              </button>
              <button className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-4 hover:border-primary hover:bg-primary/5 transition-colors">
                <BarChart className="h-6 w-6 mb-2 text-primary" />
                <span className="text-sm font-medium">Generate Reports</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

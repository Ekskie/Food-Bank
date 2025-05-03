
import { DashboardHeader } from "./DashboardHeader";
import { StatCard } from "./StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, Package, Calendar, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export function VolunteerDashboard() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col space-y-6">
      <DashboardHeader
        title={`Welcome, ${user?.name}`}
        description="Manage assistance requests and inventory."
        role="volunteer"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Requests"
          value="18"
          icon={<Users className="h-4 w-4" />}
          change={{ value: "3", positive: false }}
        />
        <StatCard
          title="Inventory Items"
          value="482"
          icon={<Package className="h-4 w-4" />}
          change={{ value: "12%", positive: true }}
        />
        <StatCard
          title="Critical Items"
          value="5"
          icon={<Package className="h-4 w-4" />}
          description="Items nearing expiry"
        />
        <StatCard
          title="Volunteer Hours"
          value="32"
          icon={<Clock className="h-4 w-4" />}
          description="This month"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Assistance Requests</CardTitle>
            <CardDescription>
              Recent assistance requests needing review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Family of 4</p>
                    <p className="text-sm text-muted-foreground">Emergency Food Assistance</p>
                  </div>
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">Urgent</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">Submitted 2 hours ago</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="h-7 px-2">Review</Button>
                    <Button size="sm" className="h-7 px-2">Approve</Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Senior Citizen</p>
                    <p className="text-sm text-muted-foreground">Weekly Food Box</p>
                  </div>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">High Priority</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">Submitted yesterday</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="h-7 px-2">Review</Button>
                    <Button size="sm" className="h-7 px-2">Approve</Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">College Student</p>
                    <p className="text-sm text-muted-foreground">Food Pantry Access</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">New</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">Submitted 2 days ago</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="h-7 px-2">Review</Button>
                    <Button size="sm" className="h-7 px-2">Approve</Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-center">
              <Button variant="outline" size="sm">View All Requests</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Inventory Alerts</CardTitle>
            <CardDescription>
              Items requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                  <div>
                    <p className="font-medium">Milk (1 gallon)</p>
                    <p className="text-xs text-muted-foreground">Expires in 2 days</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">12 units</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                  <div>
                    <p className="font-medium">Fresh Bread</p>
                    <p className="text-xs text-muted-foreground">Expires tomorrow</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">24 loaves</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                  <div>
                    <p className="font-medium">Canned Soup</p>
                    <p className="text-xs text-muted-foreground">Low stock</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">8 units</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                  <div>
                    <p className="font-medium">Rice (5lb bags)</p>
                    <p className="text-xs text-muted-foreground">Low stock</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">5 bags</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-center">
              <Button variant="outline" size="sm">Update Inventory</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-3 md:col-span-1">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>
              Your volunteer activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="min-w-fit rounded-md bg-primary/10 p-2">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Inventory Count</p>
                  <p className="text-sm text-muted-foreground">Cold Storage Section</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>9:00 AM - 11:00 AM</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="min-w-fit rounded-md bg-primary/10 p-2">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Food Distribution</p>
                  <p className="text-sm text-muted-foreground">Main Hall</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>1:00 PM - 4:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 md:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common volunteer activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-4 hover:border-primary hover:bg-primary/5 transition-colors">
                <Users className="h-6 w-6 mb-2 text-primary" />
                <span className="text-sm font-medium">Manage Requests</span>
              </button>
              <button className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-4 hover:border-primary hover:bg-primary/5 transition-colors">
                <Package className="h-6 w-6 mb-2 text-primary" />
                <span className="text-sm font-medium">Update Inventory</span>
              </button>
              <button className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-4 hover:border-primary hover:bg-primary/5 transition-colors">
                <Calendar className="h-6 w-6 mb-2 text-primary" />
                <span className="text-sm font-medium">Schedule</span>
              </button>
              <button className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-4 hover:border-primary hover:bg-primary/5 transition-colors">
                <ShoppingBag className="h-6 w-6 mb-2 text-primary" />
                <span className="text-sm font-medium">Find Food Banks</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

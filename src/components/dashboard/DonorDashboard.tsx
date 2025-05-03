
import { DashboardHeader } from "./DashboardHeader";
import { StatCard } from "./StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Gift, Star, Calendar, ShoppingBag, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export function DonorDashboard() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col space-y-6">
      <DashboardHeader
        title={`Welcome, ${user?.name}`}
        description="Track your donations and make a difference."
        role="donor"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Donations"
          value="24"
          icon={<Gift className="h-4 w-4" />}
          change={{ value: "4", positive: true }}
        />
        <StatCard
          title="Food Donated"
          value="248 lbs"
          icon={<ShoppingBag className="h-4 w-4" />}
          change={{ value: "12%", positive: true }}
        />
        <StatCard
          title="Impact Score"
          value="820"
          icon={<Star className="h-4 w-4" />}
          change={{ value: "5%", positive: true }}
        />
        <StatCard
          title="People Helped"
          value="~124"
          icon={<BarChart className="h-4 w-4" />}
          description="Estimated impact"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Donation History</CardTitle>
            <CardDescription>
              Your recent food donations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Canned Goods Package</p>
                  <p className="text-sm text-muted-foreground">Central Food Bank</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">12 lbs</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Fresh Produce</p>
                  <p className="text-sm text-muted-foreground">Westside Community Center</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">18 lbs</p>
                  <p className="text-xs text-muted-foreground">1 week ago</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Boxed Meals</p>
                  <p className="text-sm text-muted-foreground">South District Food Bank</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">22 lbs</p>
                  <p className="text-xs text-muted-foreground">2 weeks ago</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-center">
              <Button variant="outline" size="sm">View All Donations</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Scheduled Pickups</CardTitle>
            <CardDescription>
              Your upcoming donation pickups
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="min-w-fit rounded-md bg-primary/10 p-2">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Regular Donation</p>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Confirmed</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Central Food Bank</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>Tomorrow, 2:00 PM</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="min-w-fit rounded-md bg-primary/10 p-2">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Monthly Donation</p>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Pending</span>
                  </div>
                  <p className="text-sm text-muted-foreground">North District Food Bank</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>Next Monday, 10:00 AM</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button className="w-full">Schedule New Pickup</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Reward Status</CardTitle>
            <CardDescription>
              Your current rewards and benefits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Current Tier</span>
                <span className="text-sm font-bold text-primary">Silver</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-primary" style={{ width: "60%" }}></div>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">60% to Gold Tier</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Available Points</span>
                <span className="text-sm font-medium">1,240</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Next Reward</span>
                <span className="text-sm font-medium">Gift Card ($25)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Points Needed</span>
                <span className="text-sm font-medium">260 more</span>
              </div>
            </div>
            
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                <Star className="mr-2 h-4 w-4" />
                View Rewards
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common donor activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-4 hover:border-primary hover:bg-primary/5 transition-colors">
                <Gift className="h-6 w-6 mb-2 text-primary" />
                <span className="text-sm font-medium">Donate Food</span>
              </button>
              <button className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-4 hover:border-primary hover:bg-primary/5 transition-colors">
                <Calendar className="h-6 w-6 mb-2 text-primary" />
                <span className="text-sm font-medium">Schedule Pickup</span>
              </button>
              <button className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-4 hover:border-primary hover:bg-primary/5 transition-colors">
                <ShoppingBag className="h-6 w-6 mb-2 text-primary" />
                <span className="text-sm font-medium">Find Food Banks</span>
              </button>
              <button className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-4 hover:border-primary hover:bg-primary/5 transition-colors">
                <Star className="h-6 w-6 mb-2 text-primary" />
                <span className="text-sm font-medium">Claim Rewards</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, CheckCircle, Clock, MapPin, Package, Truck, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const upcomingPickups = [
  {
    id: "PIC-001",
    type: "Regular Donation",
    date: "Tomorrow",
    time: "2:00 PM",
    foodBank: "Central Food Bank",
    status: "Confirmed",
    items: "Canned goods, rice, pasta",
    address: "123 Main St, Anytown, CA"
  },
  {
    id: "PIC-002",
    type: "Monthly Donation",
    date: "Next Monday",
    time: "10:00 AM",
    foodBank: "North District Food Bank",
    status: "Pending",
    items: "Fresh produce, bread, dairy products",
    address: "456 Park Ave, Anytown, CA"
  }
];

const pastPickups = [
  {
    id: "PIC-003",
    date: "April 15, 2025",
    foodBank: "Westside Community Center",
    status: "Completed",
    weight: "15 lbs",
    items: "Mixed non-perishables"
  },
  {
    id: "PIC-004",
    date: "March 28, 2025",
    foodBank: "South District Food Bank",
    status: "Completed",
    weight: "22 lbs",
    items: "Fresh produce and dairy"
  },
  {
    id: "PIC-005",
    date: "March 10, 2025",
    foodBank: "Central Food Bank",
    status: "Completed",
    weight: "18 lbs",
    items: "Canned goods and dry items"
  }
];

export default function SchedulePickup() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "Pickup Scheduled",
      description: "Your donation pickup has been scheduled successfully.",
    });
  };

  const handleTabChange = (tabId: string) => {
    // Find the tab trigger element and trigger navigation programmatically
    const tabElement = document.querySelector(`[data-value="${tabId}"]`) as HTMLElement | null;
    if (tabElement) {
      tabElement.click();
    }
  };

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Schedule Donation Pickup</h1>
          <p className="text-muted-foreground">
            Arrange for a volunteer to pick up your food donation
          </p>
        </div>

        <Tabs defaultValue="schedule" className="space-y-4">
          <TabsList>
            <TabsTrigger value="schedule">Schedule Pickup</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Pickups</TabsTrigger>
            <TabsTrigger value="past">Past Pickups</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Schedule a Donation Pickup</CardTitle>
                <CardDescription>
                  Arrange for a volunteer to pick up your donation
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="rounded-full bg-green-100 p-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium">Pickup Scheduled!</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Your donation pickup has been scheduled. A confirmation has been sent to your email.
                    </p>
                    <Button className="mt-4" onClick={() => setSubmitted(false)}>
                      Schedule Another Pickup
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="pickup-date">Pickup Date</Label>
                          <div className="relative">
                            <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input id="pickup-date" type="date" className="pl-9" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pickup-time">Preferred Time</Label>
                          <div className="relative">
                            <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <select
                              id="pickup-time"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              required
                            >
                              <option value="">Select a time</option>
                              <option value="morning">Morning (9AM - 12PM)</option>
                              <option value="afternoon">Afternoon (12PM - 5PM)</option>
                              <option value="evening">Evening (5PM - 8PM)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="food-bank">Select Food Bank</Label>
                        <select
                          id="food-bank"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          required
                        >
                          <option value="">Select a food bank</option>
                          <option value="1">Central Community Food Bank</option>
                          <option value="2">Westside Hunger Relief Center</option>
                          <option value="3">Eastside Community Pantry</option>
                          <option value="4">Northside Food Assistance</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="pickup-address">Pickup Address</Label>
                        <div className="relative">
                          <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input id="pickup-address" placeholder="Enter pickup address" className="pl-9" required />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="donation-items">What are you donating?</Label>
                        <div className="relative">
                          <Package className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Textarea
                            id="donation-items"
                            placeholder="Describe the items you are donating"
                            className="min-h-[100px] pl-9"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="estimated-weight">Estimated Weight (lbs)</Label>
                          <Input
                            id="estimated-weight"
                            type="number"
                            min="0"
                            placeholder="0"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="donation-type">Donation Type</Label>
                          <select
                            id="donation-type"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            required
                          >
                            <option value="">Select type</option>
                            <option value="perishable">Perishable Food</option>
                            <option value="non-perishable">Non-Perishable Food</option>
                            <option value="prepared">Prepared Meals</option>
                            <option value="mixed">Mixed Items</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="pickup-instructions">Special Instructions</Label>
                        <Textarea
                          id="pickup-instructions"
                          placeholder="Any special instructions for pickup (e.g., parking details, access codes)"
                          className="min-h-[80px]"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="contact">Contact Number</Label>
                        <Input id="contact" type="tel" placeholder="(555) 123-4567" required />
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button type="submit" className="flex-1">Schedule Pickup</Button>
                        <Button variant="outline" className="flex-1">Save for Later</Button>
                      </div>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upcoming">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Pickups</CardTitle>
                <CardDescription>
                  Your scheduled donation pickups
                </CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingPickups.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground opacity-20" />
                    <h3 className="mt-4 text-lg font-medium">No Upcoming Pickups</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      You don't have any scheduled pickups at the moment.
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => handleTabChange("schedule")}
                    >
                      Schedule a Pickup
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {upcomingPickups.map((pickup) => (
                      <div key={pickup.id} className="rounded-lg border">
                        <div className="p-4 bg-muted/50">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <h3 className="font-medium">{pickup.type}</h3>
                              <p className="text-sm text-muted-foreground">{pickup.foodBank}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={pickup.status === "Confirmed" 
                                ? "bg-green-100 text-green-800 hover:bg-green-200" 
                                : "bg-blue-100 text-blue-800 hover:bg-blue-200"}>
                                {pickup.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              <div className="flex-1">
                                <p className="text-sm"><span className="font-medium">Pickup Date:</span> {pickup.date}, {pickup.time}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center">
                              <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                              <div className="flex-1">
                                <p className="text-sm"><span className="font-medium">Items:</span> {pickup.items}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                              <div className="flex-1">
                                <p className="text-sm"><span className="font-medium">Address:</span> {pickup.address}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col xs:flex-row gap-2 mt-4">
                            <Button variant="outline" size="sm" className="flex-1">
                              Reschedule
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:text-red-600">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="past">
            <Card>
              <CardHeader>
                <CardTitle>Past Pickups</CardTitle>
                <CardDescription>
                  Your previously completed donation pickups
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pastPickups.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Clock className="h-12 w-12 text-muted-foreground opacity-20" />
                    <h3 className="mt-4 text-lg font-medium">No Past Pickups</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      You haven't had any donation pickups yet.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pastPickups.map((pickup) => (
                      <div key={pickup.id} className="flex flex-col sm:flex-row justify-between p-4 border rounded-lg">
                        <div className="flex flex-col gap-1">
                          <div className="font-medium">{pickup.foodBank}</div>
                          <div className="text-sm text-muted-foreground">{pickup.date}</div>
                          <div className="text-sm">Items: {pickup.items}</div>
                        </div>
                        <div className="flex flex-col items-end gap-1 mt-2 sm:mt-0">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                            {pickup.status}
                          </Badge>
                          <div className="text-sm font-medium">{pickup.weight}</div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <UserCheck className="h-3 w-3 mr-1" />
                            <span>Verified</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex justify-center mt-6">
                  <Button variant="outline">View All Past Pickups</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>How Donation Pickup Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-1">1. Schedule</h3>
                <p className="text-sm text-muted-foreground">
                  Select a date and time that works for you and provide details about your donation.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-1">2. Pickup</h3>
                <p className="text-sm text-muted-foreground">
                  A volunteer will arrive at the scheduled time to collect your food donation.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <UserCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-1">3. Verification</h3>
                <p className="text-sm text-muted-foreground">
                  Receive confirmation and impact points once your donation has been processed.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}

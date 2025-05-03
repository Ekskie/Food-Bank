
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Clock, Phone } from "lucide-react";

export default function FoodBanks() {
  // Mock data for food banks
  const foodBanks = [
    {
      id: 1,
      name: "Central Community Food Bank",
      address: "123 Main Street, Downtown",
      hours: "Mon-Fri: 9AM-5PM, Sat: 10AM-2PM",
      phone: "(555) 123-4567",
      urgentNeeds: ["Canned Vegetables", "Rice", "Baby Formula"],
      distance: "1.2 miles",
    },
    {
      id: 2,
      name: "Westside Hunger Relief Center",
      address: "456 Oak Avenue, West District",
      hours: "Mon-Thu: 8AM-6PM, Fri: 8AM-4PM",
      phone: "(555) 987-6543",
      urgentNeeds: ["Protein Items", "Hygiene Products", "Cooking Oil"],
      distance: "2.8 miles",
    },
    {
      id: 3,
      name: "Eastside Community Pantry",
      address: "789 Elm Street, East District",
      hours: "Tue-Sat: 10AM-7PM",
      phone: "(555) 456-7890",
      urgentNeeds: ["Dairy Products", "Fresh Produce", "Peanut Butter"],
      distance: "3.5 miles",
    },
    {
      id: 4,
      name: "Northside Food Assistance",
      address: "101 Pine Road, North District",
      hours: "Mon-Wed-Fri: 9AM-6PM",
      phone: "(555) 234-5678",
      urgentNeeds: ["Canned Tuna", "Pasta", "Cereal"],
      distance: "4.1 miles",
    },
  ];

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Food Bank Locator</h1>
          <p className="text-muted-foreground">
            Find food banks in your area, view their needs, and get in touch.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Find Food Banks</CardTitle>
                <CardDescription>
                  Search by location or specific needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="location" className="text-sm font-medium mb-1 block">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        placeholder="Enter your location"
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="search" className="text-sm font-medium mb-1 block">
                      Search
                    </label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Search by name or need"
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <Button className="w-full">Search Food Banks</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="distance" className="text-sm font-medium mb-1 block">
                      Distance
                    </label>
                    <select
                      id="distance"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="5">Within 5 miles</option>
                      <option value="10">Within 10 miles</option>
                      <option value="25">Within 25 miles</option>
                      <option value="50">Within 50 miles</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="needs" className="text-sm font-medium mb-1 block">
                      Food Needs
                    </label>
                    <select
                      id="needs"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="all">All Needs</option>
                      <option value="canned">Canned Goods</option>
                      <option value="fresh">Fresh Produce</option>
                      <option value="dairy">Dairy Products</option>
                      <option value="protein">Protein Items</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="open-now" className="text-sm font-medium mb-1 block">
                      Hours
                    </label>
                    <select
                      id="open-now"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="all">Any Hours</option>
                      <option value="open">Open Now</option>
                      <option value="weekend">Open on Weekends</option>
                      <option value="evening">Evening Hours</option>
                    </select>
                  </div>
                  <Button variant="outline" className="w-full">Apply Filters</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Food Banks Near You</h2>
            <div className="grid gap-4">
              {foodBanks.map((bank) => (
                <Card key={bank.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold">{bank.name}</h3>
                          <span className="text-sm text-muted-foreground md:hidden">{bank.distance}</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <span className="text-sm">{bank.address}</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <span className="text-sm">{bank.hours}</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <span className="text-sm">{bank.phone}</span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 md:text-right">
                        <span className="text-sm font-medium text-muted-foreground hidden md:block">
                          {bank.distance}
                        </span>
                        <div className="mt-2">
                          <h4 className="text-sm font-medium">Urgent Needs:</h4>
                          <div className="flex flex-wrap gap-2 mt-1 justify-start md:justify-end">
                            {bank.urgentNeeds.map((need, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                              >
                                {need}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 mt-4">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button size="sm">Request Assistance</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}


import { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPinIcon, Clock, Phone, Mail, Search, ChevronRight } from "lucide-react";
import { MapComponent } from "@/components/maps/MapComponent";

export default function FoodBankLocator() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFoodBank, setSelectedFoodBank] = useState<any>(null);

  // Mock data for food banks with properly typed coordinates as [number, number] tuples
  const foodBanks = [
    {
      id: 1,
      name: "Central Community Food Bank",
      address: "123 Main Street, Downtown",
      hours: "Mon-Fri: 9AM-5PM, Sat: 10AM-2PM",
      phone: "(555) 123-4567",
      email: "contact@centralfoodbank.org",
      urgentNeeds: ["Canned Vegetables", "Rice", "Baby Formula"],
      coordinates: [-74.0060, 40.7128] as [number, number], // New York City
      distance: "1.2 miles",
    },
    {
      id: 2,
      name: "Westside Hunger Relief Center",
      address: "456 Oak Avenue, West District",
      hours: "Mon-Thu: 8AM-6PM, Fri: 8AM-4PM",
      phone: "(555) 987-6543",
      email: "info@westsidehungerrelief.org",
      urgentNeeds: ["Protein Items", "Hygiene Products", "Cooking Oil"],
      coordinates: [-118.2437, 34.0522] as [number, number], // Los Angeles
      distance: "2.8 miles",
    },
    {
      id: 3,
      name: "Eastside Community Pantry",
      address: "789 Elm Street, East District",
      hours: "Tue-Sat: 10AM-7PM",
      phone: "(555) 456-7890",
      email: "help@eastsidepantry.org",
      urgentNeeds: ["Dairy Products", "Fresh Produce", "Peanut Butter"],
      coordinates: [-87.6298, 41.8781] as [number, number], // Chicago
      distance: "3.5 miles",
    },
    {
      id: 4,
      name: "Northside Food Assistance",
      address: "101 Pine Road, North District",
      hours: "Mon-Wed-Fri: 9AM-6PM",
      phone: "(555) 234-5678",
      email: "support@northsidefood.org",
      urgentNeeds: ["Canned Tuna", "Pasta", "Cereal"],
      coordinates: [-71.0589, 42.3601] as [number, number], // Boston
      distance: "4.1 miles",
    },
  ];

  const filteredFoodBanks = foodBanks.filter(bank => 
    bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bank.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bank.urgentNeeds.some(need => need.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleFoodBankSelect = (foodBank: any) => {
    setSelectedFoodBank(foodBank);
  };

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Food Bank Locator</h1>
          <p className="text-muted-foreground">
            Find and manage food banks in the network, view their needs and contact information.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Search Food Banks</CardTitle>
                <CardDescription>
                  Find by name, location or specific needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search food banks..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button className="w-full">Advanced Search</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Food Banks ({filteredFoodBanks.length})</CardTitle>
                <CardDescription>
                  Click on a food bank for details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {filteredFoodBanks.length > 0 ? (
                    filteredFoodBanks.map((bank) => (
                      <div
                        key={bank.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedFoodBank?.id === bank.id 
                            ? "bg-primary/10 border border-primary/20" 
                            : "bg-card hover:bg-accent border border-border"
                        }`}
                        onClick={() => handleFoodBankSelect(bank)}
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{bank.name}</h3>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <MapPinIcon className="h-3 w-3 mr-1" />
                          <span>{bank.distance}</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {bank.urgentNeeds.slice(0, 2).map((need, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {need}
                            </Badge>
                          ))}
                          {bank.urgentNeeds.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{bank.urgentNeeds.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      No food banks match your search.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card className="h-[500px] overflow-hidden">
              <MapComponent 
                foodBanks={foodBanks} 
                selectedFoodBank={selectedFoodBank} 
                onSelectFoodBank={handleFoodBankSelect} 
              />
            </Card>

            {selectedFoodBank && (
              <Card>
                <CardHeader>
                  <CardTitle>{selectedFoodBank.name}</CardTitle>
                  <CardDescription>{selectedFoodBank.address}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="needs">Current Needs</TabsTrigger>
                      <TabsTrigger value="contact">Contact</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="details" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Hours</p>
                            <p className="text-sm text-muted-foreground">{selectedFoodBank.hours}</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <MapPinIcon className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Distance</p>
                            <p className="text-sm text-muted-foreground">{selectedFoodBank.distance}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between pt-4">
                        <Button variant="outline">View Full Details</Button>
                        <Button>Request Assistance</Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="needs">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">Urgent Needs</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedFoodBank.urgentNeeds.map((need: string, index: number) => (
                              <Badge key={index} className="bg-red-100 text-red-800 hover:bg-red-200">
                                {need}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-between pt-4">
                          <Button variant="outline">View Full Inventory</Button>
                          <Button>Donate Items</Button>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="contact">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-start space-x-2">
                            <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Phone</p>
                              <p className="text-sm text-muted-foreground">{selectedFoodBank.phone}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-2">
                            <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Email</p>
                              <p className="text-sm text-muted-foreground">{selectedFoodBank.email}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between pt-4">
                          <Button variant="outline">Send Message</Button>
                          <Button>Call Now</Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

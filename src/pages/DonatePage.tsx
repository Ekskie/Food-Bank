
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Package } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function DonatePage() {
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Donate Food</h1>
          <p className="text-muted-foreground">
            Help your community by donating food items to local food banks
          </p>
        </div>

        <Tabs defaultValue="donate" className="space-y-4">
          <TabsList>
            <TabsTrigger value="donate">Donate Food</TabsTrigger>
            <TabsTrigger value="schedule">Schedule Pickup</TabsTrigger>
            <TabsTrigger value="history">Donation History</TabsTrigger>
          </TabsList>

          <TabsContent value="donate">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Food Donation Form</CardTitle>
                  <CardDescription>
                    Provide details about the food items you wish to donate
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="rounded-full bg-green-100 p-3">
                        <svg
                          className="h-6 w-6 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h3 className="mt-4 text-lg font-medium">Thank you for your donation!</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Your donation has been recorded. A volunteer will contact you shortly to coordinate the pickup.
                      </p>
                      <Button className="mt-4" onClick={() => setSubmitted(false)}>
                        Make Another Donation
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="donation-type">Donation Type</Label>
                        <RadioGroup defaultValue="perishable">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="perishable" id="perishable" />
                            <Label htmlFor="perishable">Perishable Food</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="non-perishable" id="non-perishable" />
                            <Label htmlFor="non-perishable">Non-Perishable Food</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="prepared" id="prepared" />
                            <Label htmlFor="prepared">Prepared Meals</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other">Other Items</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe the food items you are donating (type, quantity, etc.)"
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="estimated-weight">Estimated Weight (lbs)</Label>
                          <Input
                            id="estimated-weight"
                            type="number"
                            min="0"
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="expiry-date">Expiry Date (if applicable)</Label>
                          <Input id="expiry-date" type="date" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="food-bank">Select Food Bank</Label>
                        <select
                          id="food-bank"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Select a food bank</option>
                          <option value="1">Central Community Food Bank</option>
                          <option value="2">Westside Hunger Relief Center</option>
                          <option value="3">Eastside Community Pantry</option>
                          <option value="4">Northside Food Assistance</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          placeholder="Any special handling instructions or additional information"
                          rows={2}
                        />
                      </div>

                      <Button type="submit" className="w-full">Submit Donation</Button>
                    </form>
                  )}
                </CardContent>
              </Card>

              <div className="md:col-span-1 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Donation Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">Accepted Items:</h3>
                        <ul className="mt-2 ml-6 list-disc text-sm">
                          <li>Canned fruits, vegetables, and proteins</li>
                          <li>Dry goods (pasta, rice, cereal)</li>
                          <li>Cooking oils and condiments</li>
                          <li>Hygiene products</li>
                          <li>Baby formula and food</li>
                          <li>Fresh produce and dairy (check with food bank)</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium">Items We Cannot Accept:</h3>
                        <ul className="mt-2 ml-6 list-disc text-sm">
                          <li>Expired food items</li>
                          <li>Open or partially used items</li>
                          <li>Homemade items without proper labeling</li>
                          <li>Alcohol or medications</li>
                          <li>Items with damaged packaging</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Most Needed Items</CardTitle>
                    <CardDescription>
                      These items are currently in high demand
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                        Canned Protein
                      </span>
                      <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                        Rice
                      </span>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Baby Formula
                      </span>
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                        Pasta
                      </span>
                      <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                        Cereal
                      </span>
                      <span className="inline-flex items-center rounded-full bg-pink-100 px-2.5 py-0.5 text-xs font-medium text-pink-800">
                        Cooking Oil
                      </span>
                      <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                        Peanut Butter
                      </span>
                      <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
                        Toilet Paper
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Your Impact</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Total Donations</div>
                      <div className="font-medium">24</div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-sm">Food Donated</div>
                      <div className="font-medium">248 lbs</div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-sm">People Helped</div>
                      <div className="font-medium">~124</div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div className="text-sm font-medium">Current Tier</div>
                    <div className="font-medium text-primary">Silver Donor</div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Schedule a Donation Pickup</CardTitle>
                <CardDescription>
                  Arrange for a volunteer to pick up your donation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="pickup-date">Pickup Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input id="pickup-date" type="date" className="pl-9" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pickup-time">Preferred Time</Label>
                      <div className="relative">
                        <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <select
                          id="pickup-time"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                    <Label htmlFor="pickup-address">Pickup Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="pickup-address" placeholder="Enter pickup address" className="pl-9" />
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
                      />
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
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button type="submit" className="flex-1">Schedule Pickup</Button>
                    <Button variant="outline" className="flex-1">Save for Later</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Your Donation History</CardTitle>
                <CardDescription>
                  Track your past donations and their impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="rounded-lg border">
                    <div className="p-4 bg-muted/50">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h3 className="font-medium">Canned Goods Package</h3>
                          <p className="text-sm text-muted-foreground">Central Food Bank</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Completed
                          </span>
                          <span className="text-sm text-muted-foreground">2 days ago</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="grid gap-2 sm:grid-cols-3">
                        <div>
                          <p className="text-sm font-medium">Donation Type</p>
                          <p className="text-sm text-muted-foreground">Non-Perishable</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Quantity</p>
                          <p className="text-sm text-muted-foreground">12 lbs</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Impact Points</p>
                          <p className="text-sm text-muted-foreground">+60 points</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border">
                    <div className="p-4 bg-muted/50">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h3 className="font-medium">Fresh Produce</h3>
                          <p className="text-sm text-muted-foreground">Westside Community Center</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Completed
                          </span>
                          <span className="text-sm text-muted-foreground">1 week ago</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="grid gap-2 sm:grid-cols-3">
                        <div>
                          <p className="text-sm font-medium">Donation Type</p>
                          <p className="text-sm text-muted-foreground">Perishable</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Quantity</p>
                          <p className="text-sm text-muted-foreground">18 lbs</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Impact Points</p>
                          <p className="text-sm text-muted-foreground">+90 points</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border">
                    <div className="p-4 bg-muted/50">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h3 className="font-medium">Boxed Meals</h3>
                          <p className="text-sm text-muted-foreground">South District Food Bank</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Completed
                          </span>
                          <span className="text-sm text-muted-foreground">2 weeks ago</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="grid gap-2 sm:grid-cols-3">
                        <div>
                          <p className="text-sm font-medium">Donation Type</p>
                          <p className="text-sm text-muted-foreground">Prepared Meals</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Quantity</p>
                          <p className="text-sm text-muted-foreground">22 lbs</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Impact Points</p>
                          <p className="text-sm text-muted-foreground">+110 points</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <Button variant="outline">View Complete History</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  );
}

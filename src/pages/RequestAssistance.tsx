
import { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle, Clock, FileText, MapPin, ShoppingBag } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

export default function RequestAssistance() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "Request Submitted",
      description: "Your assistance request has been submitted successfully.",
    });
  };

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Request Food Assistance</h1>
          <p className="text-muted-foreground">
            Submit a request for food assistance from local food banks
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Assistance Request Form</CardTitle>
              <CardDescription>
                Please provide details about your food assistance needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="rounded-full bg-green-100 p-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">Request Submitted!</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your assistance request has been received. A representative will contact you shortly.
                  </p>
                  <Button className="mt-4" onClick={() => setSubmitted(false)}>
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="request-type">Assistance Type</Label>
                    <RadioGroup defaultValue="emergency">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="emergency" id="emergency" />
                        <Label htmlFor="emergency">Emergency Food Assistance</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="regular" id="regular" />
                        <Label htmlFor="regular">Regular Food Support</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="special" id="special" />
                        <Label htmlFor="special">Special Dietary Needs</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="household-size">Household Size</Label>
                      <Input
                        id="household-size"
                        type="number"
                        min="1"
                        placeholder="1"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="urgency">Urgency Level</Label>
                      <select
                        id="urgency"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      >
                        <option value="">Select urgency</option>
                        <option value="critical">Critical (Next 24 hours)</option>
                        <option value="urgent">Urgent (2-3 days)</option>
                        <option value="soon">Soon (This week)</option>
                        <option value="planning">Planning ahead</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="food-preferences">Food Preferences/Restrictions</Label>
                    <Textarea
                      id="food-preferences"
                      placeholder="List any dietary restrictions, allergies, or food preferences"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Delivery Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="address" placeholder="Enter your address" className="pl-9" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact Number</Label>
                    <Input id="contact" type="tel" placeholder="(555) 123-4567" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any additional information that might help us process your request"
                      rows={2}
                    />
                  </div>

                  <Button type="submit" className="w-full">Submit Request</Button>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">1</div>
                    <div>
                      <h4 className="font-medium">Submit your request</h4>
                      <p className="text-sm text-muted-foreground">Complete the form with your food assistance needs.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">2</div>
                    <div>
                      <h4 className="font-medium">Application review</h4>
                      <p className="text-sm text-muted-foreground">A volunteer will review your request within 24 hours.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">3</div>
                    <div>
                      <h4 className="font-medium">Assistance coordination</h4>
                      <p className="text-sm text-muted-foreground">We'll match your needs with available food resources.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">4</div>
                    <div>
                      <h4 className="font-medium">Food distribution</h4>
                      <p className="text-sm text-muted-foreground">Pick up your food package or arrange delivery.</p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Food Resources</CardTitle>
                <CardDescription>Current inventory at nearby food banks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                      <span>Canned Goods</span>
                    </div>
                    <span className="text-sm font-medium text-green-600">High Availability</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                      <span>Fresh Produce</span>
                    </div>
                    <span className="text-sm font-medium text-yellow-600">Medium Availability</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                      <span>Dairy Products</span>
                    </div>
                    <span className="text-sm font-medium text-red-600">Limited Availability</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                      <span>Baby Formula</span>
                    </div>
                    <span className="text-sm font-medium text-yellow-600">Medium Availability</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Request History</CardTitle>
            <CardDescription>
              Track the status of your previous assistance requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border">
                <div className="p-4 bg-muted/50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-medium">Weekly Food Package</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>Submitted 3 days ago</span>
                      </div>
                    </div>
                    <div>
                      <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                        Processing
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-start space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm"><span className="font-medium">Household Size:</span> 3 people</p>
                      <p className="text-sm"><span className="font-medium">Urgency Level:</span> Soon (This week)</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <p className="text-sm">Central Food Bank</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border">
                <div className="p-4 bg-muted/50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-medium">Emergency Food Assistance</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>Submitted 2 weeks ago</span>
                      </div>
                    </div>
                    <div>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-start space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm"><span className="font-medium">Household Size:</span> 2 people</p>
                      <p className="text-sm"><span className="font-medium">Urgency Level:</span> Critical (Next 24 hours)</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <p className="text-sm">Westside Community Center</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}

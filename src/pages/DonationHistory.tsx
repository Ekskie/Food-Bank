
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useState } from "react";
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Filter, 
  History, 
  Search, 
  Star 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock donation history data
const donationData = [
  {
    id: "DON-001",
    date: "2025-04-25",
    type: "Non-Perishable",
    foodBank: "Central Food Bank",
    quantity: "12 lbs",
    status: "Completed",
    impact: "+60 points"
  },
  {
    id: "DON-002",
    date: "2025-04-15",
    type: "Perishable",
    foodBank: "Westside Community Center",
    quantity: "18 lbs",
    status: "Completed", 
    impact: "+90 points"
  },
  {
    id: "DON-003",
    date: "2025-04-02",
    type: "Prepared Meals",
    foodBank: "South District Food Bank",
    quantity: "22 lbs",
    status: "Completed",
    impact: "+110 points"
  },
  {
    id: "DON-004",
    date: "2025-03-20",
    type: "Non-Perishable",
    foodBank: "Eastside Community Pantry",
    quantity: "15 lbs",
    status: "Completed",
    impact: "+75 points"
  },
  {
    id: "DON-005",
    date: "2025-03-10",
    type: "Mixed Items",
    foodBank: "Northside Food Assistance",
    quantity: "20 lbs",
    status: "Completed",
    impact: "+100 points"
  }
];

const stats = [
  { name: "Total Donations", value: "24" },
  { name: "Total Weight", value: "248 lbs" },
  { name: "People Helped", value: "~124" },
  { name: "Impact Score", value: "1,240" }
];

export default function DonationHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredDonations = donationData.filter(donation => 
    donation.foodBank.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Donation History</h1>
          <p className="text-muted-foreground">
            Track your past donations and their impact
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.name}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                  {stat.name === "Impact Score" && <Star className="h-4 w-4 text-yellow-500" />}
                  {stat.name === "Total Donations" && <History className="h-4 w-4 text-blue-500" />}
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle>Donation Records</CardTitle>
                <CardDescription>
                  A detailed history of all your food donations
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search donations..." 
                    className="pl-9 w-full sm:w-[200px]" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Calendar className="h-4 w-4" />
                  <span className="sr-only">Calendar</span>
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Donation ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Food Bank</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Impact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDonations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell className="font-medium">{donation.id}</TableCell>
                      <TableCell>{donation.date}</TableCell>
                      <TableCell>{donation.type}</TableCell>
                      <TableCell>{donation.foodBank}</TableCell>
                      <TableCell>{donation.quantity}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                          {donation.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-primary font-medium">{donation.impact}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Showing <strong>5</strong> of <strong>5</strong> results
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Donation Trends</CardTitle>
              <CardDescription>
                Your donation activity over the past 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full flex items-end gap-2">
                {[35, 60, 45, 75, 55, 70].map((height, i) => (
                  <div key={i} className="relative flex-1">
                    <div 
                      className="absolute inset-x-0 bottom-0 bg-primary rounded-t-md transition-all duration-300 hover:bg-primary/80"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-muted-foreground">Nov</span>
                <span className="text-xs text-muted-foreground">Dec</span>
                <span className="text-xs text-muted-foreground">Jan</span>
                <span className="text-xs text-muted-foreground">Feb</span>
                <span className="text-xs text-muted-foreground">Mar</span>
                <span className="text-xs text-muted-foreground">Apr</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Donation Types</CardTitle>
              <CardDescription>
                Breakdown of your donation categories
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
              <div className="w-full max-w-[250px] h-[200px] relative">
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-xl font-bold">248</span>
                  <span className="text-sm text-muted-foreground">Total lbs</span>
                </div>
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f0f0f0" strokeWidth="15" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3B82F6" strokeWidth="15" strokeDasharray="125.6 251.2" strokeDashoffset="0" transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10B981" strokeWidth="15" strokeDasharray="75.36 251.2" strokeDashoffset="-125.6" transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F59E0B" strokeWidth="15" strokeDasharray="50.24 251.2" strokeDashoffset="-201" transform="rotate(-90 50 50)" />
                </svg>
              </div>
            </CardContent>
            <div className="flex justify-around px-8 pb-4">
              <div className="flex items-center gap-1 text-sm">
                <span className="h-3 w-3 rounded-full bg-[#3B82F6]"></span>
                <span>Non-Perishable</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="h-3 w-3 rounded-full bg-[#10B981]"></span>
                <span>Perishable</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="h-3 w-3 rounded-full bg-[#F59E0B]"></span>
                <span>Prepared</span>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="flex justify-center">
          <Button variant="outline">Download Complete Donation History</Button>
        </div>
      </div>
    </DashboardShell>
  );
}

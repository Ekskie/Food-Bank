
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; 
import { BarChart, Calendar, Download, FileText, PieChart, TrendingUp } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";

export default function Analytics() {
  // Mock data for donation trends
  const donationData = [
    { month: 'Jan', donations: 120, value: 2400 },
    { month: 'Feb', donations: 98, value: 1800 },
    { month: 'Mar', donations: 142, value: 3200 },
    { month: 'Apr', donations: 135, value: 3000 },
    { month: 'May', donations: 165, value: 3800 },
    { month: 'Jun', donations: 180, value: 4000 },
    { month: 'Jul', donations: 190, value: 4200 },
    { month: 'Aug', donations: 178, value: 3900 },
    { month: 'Sep', donations: 145, value: 3300 },
    { month: 'Oct', donations: 158, value: 3600 },
    { month: 'Nov', donations: 172, value: 3800 },
    { month: 'Dec', donations: 210, value: 5000 },
  ];

  // Mock data for food categories
  const foodCategoryData = [
    { name: 'Canned Goods', value: 35 },
    { name: 'Fresh Produce', value: 20 },
    { name: 'Dairy', value: 15 },
    { name: 'Protein Items', value: 18 },
    { name: 'Grains', value: 12 },
  ];

  // Mock data for food bank efficiency
  const foodBankEfficiencyData = [
    { name: 'Central', efficiency: 92, processing: 85, distribution: 90 },
    { name: 'Westside', efficiency: 88, processing: 82, distribution: 85 },
    { name: 'Eastside', efficiency: 94, processing: 90, distribution: 92 },
    { name: 'Northside', efficiency: 86, processing: 85, distribution: 80 },
    { name: 'Downtown', efficiency: 90, processing: 87, distribution: 88 },
  ];

  const colors = {
    donations: "#8884d8",
    value: "#82ca9d",
    efficiency: "#8884d8",
    processing: "#82ca9d",
    distribution: "#ffc658"
  };

  const pieColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#f09ea4'];

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Analytics & Reports</h1>
          <p className="text-muted-foreground">
            Track donation trends, analyze food distribution, and generate reports.
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>Interactive charts and metrics to visualize system data</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="year">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                    <SelectItem value="all">All Time</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download data</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="donations" className="w-full">
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="donations">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Donation Trends
                  </TabsTrigger>
                  <TabsTrigger value="categories">
                    <PieChart className="h-4 w-4 mr-2" />
                    Food Categories
                  </TabsTrigger>
                  <TabsTrigger value="efficiency">
                    <BarChart className="h-4 w-4 mr-2" />
                    Food Bank Efficiency
                  </TabsTrigger>
                  <TabsTrigger value="demand">
                    <FileText className="h-4 w-4 mr-2" />
                    Demand Forecast
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="donations" className="h-[400px]">
                  <ChartContainer 
                    config={{
                      donations: { label: "Donations", color: colors.donations },
                      value: { label: "Value ($)", color: colors.value },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={donationData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" orientation="left" stroke={colors.donations} />
                        <YAxis yAxisId="right" orientation="right" stroke={colors.value} />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="donations" 
                          stroke={colors.donations} 
                          activeDot={{ r: 8 }} 
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="value" 
                          stroke={colors.value} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </TabsContent>

                <TabsContent value="categories" className="h-[400px]">
                  <ChartContainer 
                    config={
                      foodCategoryData.reduce((acc, item, index) => {
                        acc[item.name] = { label: item.name, color: pieColors[index % pieColors.length] };
                        return acc;
                      }, {} as any)
                    }
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={foodCategoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={150}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {foodCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </TabsContent>

                <TabsContent value="efficiency" className="h-[400px]">
                  <ChartContainer 
                    config={{
                      efficiency: { label: "Overall Efficiency", color: colors.efficiency },
                      processing: { label: "Processing Speed", color: colors.processing },
                      distribution: { label: "Distribution Rate", color: colors.distribution },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={foodBankEfficiencyData} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="efficiency" fill={colors.efficiency} name="Overall Efficiency" />
                        <Bar dataKey="processing" fill={colors.processing} name="Processing Speed" />
                        <Bar dataKey="distribution" fill={colors.distribution} name="Distribution Rate" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </TabsContent>

                <TabsContent value="demand" className="flex justify-center items-center h-[400px]">
                  <div className="text-center p-8 max-w-md">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-lg font-semibold mb-2">Demand Forecasting</h3>
                    <p className="text-muted-foreground mb-4">
                      Use historical data to predict future food demand and optimize inventory management.
                    </p>
                    <Button>Generate Forecast</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Available Reports</CardTitle>
                <CardDescription>
                  Generate and download reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-accent/50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Monthly Donation Report</p>
                        <p className="text-xs text-muted-foreground">Summary of all donations by month</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Generate</Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-accent/50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Food Bank Performance</p>
                        <p className="text-xs text-muted-foreground">Efficiency and distribution metrics</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Generate</Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-accent/50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Inventory Status Report</p>
                        <p className="text-xs text-muted-foreground">Current inventory levels and expiry tracking</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Generate</Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-accent/50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Beneficiary Impact Report</p>
                        <p className="text-xs text-muted-foreground">Statistics on people helped and assistance provided</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Generate</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export Data</CardTitle>
                <CardDescription>
                  Download system data in various formats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Donation Records</p>
                      <p className="text-xs text-muted-foreground">All donation details and metadata</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">CSV</Button>
                      <Button variant="outline" size="sm">Excel</Button>
                      <Button variant="outline" size="sm">PDF</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Food Bank Directory</p>
                      <p className="text-xs text-muted-foreground">Complete list with contact details</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">CSV</Button>
                      <Button variant="outline" size="sm">Excel</Button>
                      <Button variant="outline" size="sm">PDF</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">User Activity Logs</p>
                      <p className="text-xs text-muted-foreground">System usage and activity tracking</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">CSV</Button>
                      <Button variant="outline" size="sm">Excel</Button>
                      <Button variant="outline" size="sm">PDF</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Financial Summary</p>
                      <p className="text-xs text-muted-foreground">Donation values and financial metrics</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">CSV</Button>
                      <Button variant="outline" size="sm">Excel</Button>
                      <Button variant="outline" size="sm">PDF</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

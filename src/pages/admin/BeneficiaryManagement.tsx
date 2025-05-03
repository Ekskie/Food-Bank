
import { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Beneficiary, FoodItem } from "@/types/user";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Edit, FileText, Check, X, Calendar, Package } from "lucide-react";

// Mock data for beneficiaries
const mockBeneficiaries: Beneficiary[] = [
  {
    id: "1",
    name: "Jane Smith",
    email: "jane@example.com",
    phoneNumber: "555-123-4567",
    address: "123 Main St, Apt 4B",
    familySize: 3,
    dietaryRestrictions: ["Gluten-free", "Dairy-free"],
    registeredDate: "2023-01-15T00:00:00Z",
    status: "active",
    lastAssistanceDate: "2023-04-20T00:00:00Z",
    notes: "Single mother with two children",
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    phoneNumber: "555-234-5678",
    address: "456 Oak Ave",
    familySize: 1,
    registeredDate: "2023-02-10T00:00:00Z",
    status: "active",
    lastAssistanceDate: "2023-04-18T00:00:00Z",
  },
  {
    id: "3",
    name: "Maria Garcia",
    email: "maria@example.com",
    phoneNumber: "555-345-6789",
    address: "789 Elm St",
    familySize: 5,
    dietaryRestrictions: ["Halal"],
    registeredDate: "2023-02-20T00:00:00Z",
    status: "active",
    lastAssistanceDate: "2023-04-25T00:00:00Z",
    notes: "Family with three children",
  },
  {
    id: "4",
    name: "Robert Johnson",
    email: "robert@example.com",
    phoneNumber: "555-456-7890",
    address: "101 Pine St",
    familySize: 2,
    dietaryRestrictions: ["Vegetarian"],
    registeredDate: "2023-03-05T00:00:00Z",
    status: "inactive",
    lastAssistanceDate: "2023-03-15T00:00:00Z",
    notes: "Senior citizen with mobility issues",
  },
  {
    id: "5",
    name: "Sarah Williams",
    email: "sarah@example.com",
    phoneNumber: "555-567-8901",
    address: "202 Maple Ave",
    familySize: 4,
    dietaryRestrictions: ["Nut allergy"],
    registeredDate: "2023-03-15T00:00:00Z",
    status: "pending",
    notes: "New registration, needs verification",
  },
  {
    id: "6",
    name: "David Brown",
    email: "david@example.com",
    phoneNumber: "555-678-9012",
    address: "303 Cedar Blvd",
    familySize: 3,
    registeredDate: "2023-04-01T00:00:00Z",
    status: "pending",
    notes: "Referred by social services",
  },
];

// Mock data for assistance requests
const mockAssistanceRequests = [
  {
    id: "req1",
    beneficiaryId: "1",
    beneficiaryName: "Jane Smith",
    requestDate: "2023-05-02T10:15:00Z",
    items: ["Canned goods", "Dairy products", "Bread"],
    status: "pending",
    urgency: "high",
    notes: "Needs food for the weekend",
  },
  {
    id: "req2",
    beneficiaryId: "3",
    beneficiaryName: "Maria Garcia",
    requestDate: "2023-05-01T14:30:00Z",
    items: ["Rice", "Beans", "Fresh produce"],
    status: "approved",
    urgency: "medium",
    notes: "Monthly food assistance",
  },
  {
    id: "req3",
    beneficiaryId: "2",
    beneficiaryName: "John Doe",
    requestDate: "2023-05-03T09:45:00Z",
    items: ["Protein", "Cereals"],
    status: "pending",
    urgency: "low",
    notes: "",
  },
];

// Mock data for allocated food
const mockAllocatedItems: (FoodItem & { beneficiaryId: string, beneficiaryName: string, allocationDate: string })[] = [
  {
    id: "4",
    name: "Milk",
    category: "Dairy",
    quantity: 24,
    unit: "gallons",
    expiryDate: "2023-05-07",
    donorId: "2",
    donorName: "Donor User",
    nutritionalInfo: "Calcium, Vitamin D, Protein",
    allergens: ["Lactose"],
    storageRequirements: "Refrigerated",
    createdAt: "2023-05-02T11:20:00Z",
    status: "allocated",
    beneficiaryId: "1",
    beneficiaryName: "Jane Smith",
    allocationDate: "2023-05-02T12:00:00Z",
  },
  {
    id: "6",
    name: "Chicken",
    category: "Meat",
    quantity: 30,
    unit: "lbs",
    expiryDate: "2023-05-09",
    donorId: "6",
    donorName: "Mark Johnson",
    nutritionalInfo: "Protein: 26g",
    storageRequirements: "Frozen",
    createdAt: "2023-05-03T15:30:00Z",
    status: "allocated",
    beneficiaryId: "3",
    beneficiaryName: "Maria Garcia",
    allocationDate: "2023-05-03T16:00:00Z",
  },
];

// Dietary restrictions options
const dietaryOptions = [
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Dairy-free",
  "Nut allergy",
  "Shellfish allergy",
  "Halal",
  "Kosher",
  "Diabetic",
  "Low sodium",
];

export default function BeneficiaryManagement() {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(mockBeneficiaries);
  const [assistanceRequests, setAssistanceRequests] = useState(mockAssistanceRequests);
  const [allocatedItems, setAllocatedItems] = useState(mockAllocatedItems);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("beneficiaries");
  const { toast } = useToast();

  const [newBeneficiary, setNewBeneficiary] = useState<Omit<Beneficiary, "id" | "registeredDate">>({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    familySize: 1,
    dietaryRestrictions: [],
    status: "pending",
    notes: "",
  });
  
  const beneficiaryColumns = [
    { key: "name", label: "Name" },
    { key: "familySize", label: "Family Size" },
    { key: "phoneNumber", label: "Phone" },
    { key: "address", label: "Address" },
    { key: "status", label: "Status" },
    { key: "lastAssistanceDate", label: "Last Assistance" },
  ];

  const requestColumns = [
    { key: "beneficiaryName", label: "Beneficiary" },
    { key: "requestDate", label: "Request Date" },
    { key: "items", label: "Items" },
    { key: "urgency", label: "Urgency" },
    { key: "status", label: "Status" },
  ];

  const allocationColumns = [
    { key: "name", label: "Item" },
    { key: "category", label: "Category" },
    { key: "quantity", label: "Quantity" },
    { key: "unit", label: "Unit" },
    { key: "beneficiaryName", label: "Beneficiary" },
    { key: "allocationDate", label: "Allocated On" },
  ];

  const handleAddBeneficiary = () => {
    const id = `beneficiary-${Date.now()}`;
    const registeredDate = new Date().toISOString();
    
    const beneficiary: Beneficiary = {
      id,
      registeredDate,
      ...newBeneficiary,
    };
    
    setBeneficiaries([...beneficiaries, beneficiary]);
    setIsAddDialogOpen(false);
    setNewBeneficiary({
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      familySize: 1,
      dietaryRestrictions: [],
      status: "pending",
      notes: "",
    });
    
    toast({
      title: "Beneficiary added",
      description: `${beneficiary.name} has been registered as a beneficiary.`,
    });
  };

  const handleUpdateBeneficiary = () => {
    if (!selectedBeneficiary) return;
    
    const updatedBeneficiaries = beneficiaries.map(beneficiary => 
      beneficiary.id === selectedBeneficiary.id ? selectedBeneficiary : beneficiary
    );
    
    setBeneficiaries(updatedBeneficiaries);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Beneficiary updated",
      description: `${selectedBeneficiary.name}'s information has been updated.`,
    });
  };

  const handleStatusChange = (id: string, status: "active" | "inactive" | "pending") => {
    const updatedBeneficiaries = beneficiaries.map(beneficiary => 
      beneficiary.id === id ? { ...beneficiary, status } : beneficiary
    );
    
    setBeneficiaries(updatedBeneficiaries);
    
    toast({
      title: "Status updated",
      description: `Beneficiary status has been updated to ${status}.`,
    });
  };

  const handleRequestStatusChange = (id: string, status: "pending" | "approved" | "rejected") => {
    const updatedRequests = assistanceRequests.map(request => 
      request.id === id ? { ...request, status } : request
    );
    
    setAssistanceRequests(updatedRequests);
    
    toast({
      title: "Request status updated",
      description: `Assistance request has been ${status}.`,
    });
  };

  const beneficiaryActions = (beneficiary: Beneficiary) => (
    <>
      <Button
        size="sm"
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
          setSelectedBeneficiary(beneficiary);
          setIsEditDialogOpen(true);
        }}
      >
        <Edit className="h-4 w-4 mr-1" />
        Edit
      </Button>
      
      {beneficiary.status === "pending" && (
        <>
          <Button
            size="sm"
            variant="outline"
            className="bg-green-500 text-white hover:bg-green-600"
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange(beneficiary.id, "active");
            }}
          >
            <Check className="h-4 w-4 mr-1" />
            Approve
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange(beneficiary.id, "inactive");
            }}
          >
            <X className="h-4 w-4 mr-1" />
            Reject
          </Button>
        </>
      )}
      
      {beneficiary.status === "active" && (
        <Button
          size="sm"
          variant="outline"
          className="bg-blue-500 text-white hover:bg-blue-600"
          onClick={(e) => {
            e.stopPropagation();
            // In a real app, this would open a dialog to allocate food items
            toast({
              title: "Allocate Food",
              description: "This would open the food allocation interface in a real application.",
            });
          }}
        >
          <Package className="h-4 w-4 mr-1" />
          Allocate Food
        </Button>
      )}
    </>
  );

  const requestActions = (request: any) => (
    <>
      {request.status === "pending" && (
        <>
          <Button
            size="sm"
            variant="outline"
            className="bg-green-500 text-white hover:bg-green-600"
            onClick={(e) => {
              e.stopPropagation();
              handleRequestStatusChange(request.id, "approved");
            }}
          >
            <Check className="h-4 w-4 mr-1" />
            Approve
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={(e) => {
              e.stopPropagation();
              handleRequestStatusChange(request.id, "rejected");
            }}
          >
            <X className="h-4 w-4 mr-1" />
            Reject
          </Button>
        </>
      )}
      
      {request.status === "approved" && (
        <Button
          size="sm"
          variant="outline"
          className="bg-blue-500 text-white hover:bg-blue-600"
          onClick={(e) => {
            e.stopPropagation();
            // In a real app, this would open a dialog to allocate specific food items
            toast({
              title: "Fulfill Request",
              description: "This would open the food allocation interface in a real application.",
            });
          }}
        >
          <Package className="h-4 w-4 mr-1" />
          Fulfill
        </Button>
      )}
      
      <Button
        size="sm"
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
          // In a real app, this would show request details
          toast({
            title: "View Details",
            description: "This would show the full request details in a real application.",
          });
        }}
      >
        <FileText className="h-4 w-4 mr-1" />
        Details
      </Button>
    </>
  );

  const allocationActions = (allocation: any) => (
    <>
      <Button
        size="sm"
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
          // In a real app, this would show allocation details
          toast({
            title: "View Details",
            description: "This would show the full allocation details in a real application.",
          });
        }}
      >
        <FileText className="h-4 w-4 mr-1" />
        Details
      </Button>
    </>
  );

  const activeCount = beneficiaries.filter(b => b.status === "active").length;
  const pendingCount = beneficiaries.filter(b => b.status === "pending").length;
  const pendingRequestsCount = assistanceRequests.filter(r => r.status === "pending").length;
  const totalFamilyMembers = beneficiaries
    .filter(b => b.status === "active")
    .reduce((sum, b) => sum + b.familySize, 0);

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Beneficiary Management</h1>
            <p className="text-muted-foreground">
              Register, approve, and manage food assistance beneficiaries.
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Register Beneficiary
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Register New Beneficiary</DialogTitle>
                <DialogDescription>
                  Register a new beneficiary for food assistance.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newBeneficiary.name}
                    onChange={(e) => setNewBeneficiary({ ...newBeneficiary, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newBeneficiary.email}
                    onChange={(e) => 
                      setNewBeneficiary({ ...newBeneficiary, email: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={newBeneficiary.phoneNumber}
                    onChange={(e) => 
                      setNewBeneficiary({ ...newBeneficiary, phoneNumber: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right">
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={newBeneficiary.address}
                    onChange={(e) => 
                      setNewBeneficiary({ ...newBeneficiary, address: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="familySize" className="text-right">
                    Family Size
                  </Label>
                  <Input
                    id="familySize"
                    type="number"
                    min="1"
                    value={newBeneficiary.familySize}
                    onChange={(e) => 
                      setNewBeneficiary({ 
                        ...newBeneficiary, 
                        familySize: parseInt(e.target.value) || 1 
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dietary" className="text-right">
                    Dietary Restrictions
                  </Label>
                  <Select
                    value={newBeneficiary.dietaryRestrictions?.[0] || ""}
                    onValueChange={(value) => 
                      setNewBeneficiary({ 
                        ...newBeneficiary, 
                        dietaryRestrictions: value ? [value] : [] 
                      })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select dietary restriction" />
                    </SelectTrigger>
                    <SelectContent>
                      {dietaryOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Textarea
                    id="notes"
                    value={newBeneficiary.notes || ""}
                    onChange={(e) => 
                      setNewBeneficiary({ ...newBeneficiary, notes: e.target.value })
                    }
                    className="col-span-3"
                    placeholder="Any additional information"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddBeneficiary}>Register</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Beneficiaries
              </CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCount}</div>
              <p className="text-xs text-muted-foreground">
                Registered and approved
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Family Members
              </CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalFamilyMembers}</div>
              <p className="text-xs text-muted-foreground">
                People being served
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Approvals
              </CardTitle>
              <Calendar className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCount}</div>
              <p className="text-xs text-muted-foreground">
                New beneficiary registrations
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Requests
              </CardTitle>
              <FileText className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingRequestsCount}</div>
              <p className="text-xs text-muted-foreground">
                Food assistance requests
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="beneficiaries">Beneficiaries</TabsTrigger>
            <TabsTrigger value="requests">Assistance Requests</TabsTrigger>
            <TabsTrigger value="allocations">Food Allocations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="beneficiaries" className="mt-4">
            <DataTable
              data={beneficiaries}
              columns={beneficiaryColumns}
              actions={beneficiaryActions}
              onRowClick={(beneficiary) => {
                setSelectedBeneficiary(beneficiary);
                setIsEditDialogOpen(true);
              }}
            />
          </TabsContent>
          
          <TabsContent value="requests" className="mt-4">
            <DataTable
              data={assistanceRequests.map(req => ({
                ...req,
                items: Array.isArray(req.items) ? req.items.join(", ") : req.items
              }))}
              columns={requestColumns}
              actions={requestActions}
              caption="Recent assistance requests from beneficiaries"
            />
          </TabsContent>
          
          <TabsContent value="allocations" className="mt-4">
            <DataTable
              data={allocatedItems}
              columns={allocationColumns}
              actions={allocationActions}
              caption="Recently allocated food items"
            />
          </TabsContent>
        </Tabs>
        
        {selectedBeneficiary && (
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Edit Beneficiary</DialogTitle>
                <DialogDescription>
                  Update information for {selectedBeneficiary.name}.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="edit-name"
                    value={selectedBeneficiary.name}
                    onChange={(e) => 
                      setSelectedBeneficiary({ ...selectedBeneficiary, name: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={selectedBeneficiary.email}
                    onChange={(e) => 
                      setSelectedBeneficiary({ ...selectedBeneficiary, email: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="edit-phone"
                    value={selectedBeneficiary.phoneNumber}
                    onChange={(e) => 
                      setSelectedBeneficiary({ ...selectedBeneficiary, phoneNumber: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-address" className="text-right">
                    Address
                  </Label>
                  <Input
                    id="edit-address"
                    value={selectedBeneficiary.address}
                    onChange={(e) => 
                      setSelectedBeneficiary({ ...selectedBeneficiary, address: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-familySize" className="text-right">
                    Family Size
                  </Label>
                  <Input
                    id="edit-familySize"
                    type="number"
                    min="1"
                    value={selectedBeneficiary.familySize}
                    onChange={(e) => 
                      setSelectedBeneficiary({ 
                        ...selectedBeneficiary, 
                        familySize: parseInt(e.target.value) || 1 
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-status" className="text-right">
                    Status
                  </Label>
                  <Select
                    value={selectedBeneficiary.status}
                    onValueChange={(value) => 
                      setSelectedBeneficiary({ 
                        ...selectedBeneficiary, 
                        status: value as "active" | "inactive" | "pending" 
                      })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-dietary" className="text-right">
                    Dietary Restrictions
                  </Label>
                  <Input
                    id="edit-dietary"
                    value={selectedBeneficiary.dietaryRestrictions?.join(", ") || ""}
                    onChange={(e) => 
                      setSelectedBeneficiary({ 
                        ...selectedBeneficiary, 
                        dietaryRestrictions: e.target.value.split(",").map(d => d.trim())
                      })
                    }
                    placeholder="e.g. Gluten-free, Dairy-free (comma separated)"
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-notes" className="text-right">
                    Notes
                  </Label>
                  <Textarea
                    id="edit-notes"
                    value={selectedBeneficiary.notes || ""}
                    onChange={(e) => 
                      setSelectedBeneficiary({ ...selectedBeneficiary, notes: e.target.value })
                    }
                    className="col-span-3"
                    placeholder="Any additional information"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateBeneficiary}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardShell>
  );
}

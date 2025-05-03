
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FoodItem } from "@/types/user";
import { useToast } from "@/hooks/use-toast";
import { Package, Edit, AlertTriangle, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for inventory
const mockInventory: FoodItem[] = [
  {
    id: "1",
    name: "Canned Beans",
    category: "Canned Goods",
    quantity: 120,
    unit: "cans",
    expiryDate: "2024-06-15",
    donorId: "2",
    donorName: "Donor User",
    nutritionalInfo: "Protein: 7g, Fiber: 5g",
    allergens: ["None"],
    storageRequirements: "Room temperature",
    createdAt: "2023-04-15T10:30:00Z",
    status: "available",
  },
  {
    id: "2",
    name: "Rice",
    category: "Grains",
    quantity: 50,
    unit: "kg",
    expiryDate: "2024-12-01",
    donorId: "5",
    donorName: "Local Restaurant",
    nutritionalInfo: "Carbs: 28g",
    storageRequirements: "Cool, dry place",
    createdAt: "2023-04-17T14:15:00Z",
    status: "available",
  },
  {
    id: "3",
    name: "Fresh Apples",
    category: "Produce",
    quantity: 75,
    unit: "lbs",
    expiryDate: "2023-05-10",
    donorId: "6",
    donorName: "Mark Johnson",
    nutritionalInfo: "Vitamin C, Fiber",
    storageRequirements: "Refrigerated",
    createdAt: "2023-05-01T09:00:00Z",
    status: "available",
  },
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
  },
  {
    id: "5",
    name: "Bread",
    category: "Bakery",
    quantity: 45,
    unit: "loaves",
    expiryDate: "2023-05-08",
    donorId: "5",
    donorName: "Local Restaurant",
    allergens: ["Gluten", "Wheat"],
    storageRequirements: "Room temperature",
    createdAt: "2023-05-03T08:45:00Z",
    status: "available",
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
  },
];

// Food categories
const foodCategories = [
  "Canned Goods",
  "Produce",
  "Grains",
  "Dairy",
  "Meat",
  "Bakery",
  "Beverages",
  "Snacks",
  "Condiments",
  "Baby Food",
  "Other",
];

export default function InventoryManagement() {
  const [inventory, setInventory] = useState<FoodItem[]>(mockInventory);
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  const [newItem, setNewItem] = useState<Omit<FoodItem, "id" | "createdAt" | "donorId" | "donorName">>({
    name: "",
    category: "Canned Goods",
    quantity: 0,
    unit: "items",
    expiryDate: new Date().toISOString().split("T")[0],
    nutritionalInfo: "",
    allergens: [],
    storageRequirements: "",
    status: "available",
  });

  const columns = [
    { key: "name", label: "Name" },
    { key: "category", label: "Category" },
    { key: "quantity", label: "Quantity" },
    { key: "unit", label: "Unit" },
    { key: "expiryDate", label: "Expires" },
    { key: "donorName", label: "Donor" },
    { key: "status", label: "Status" },
  ];

  const getExpiryStatus = (date: string) => {
    const today = new Date();
    const expiryDate = new Date(date);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { status: "expired", label: "Expired" };
    if (diffDays < 7) return { status: "warning", label: `Expires in ${diffDays} days` };
    return { status: "good", label: date };
  };

  const filteredInventory = inventory.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "expiring-soon") {
      const expiryStatus = getExpiryStatus(item.expiryDate);
      return expiryStatus.status === "warning";
    }
    if (activeTab === "allocated") return item.status === "allocated";
    if (activeTab === "available") return item.status === "available";
    if (activeTab === "expired") {
      const expiryStatus = getExpiryStatus(item.expiryDate);
      return expiryStatus.status === "expired";
    }
    return true;
  });

  const itemWithFormattedExpiry = filteredInventory.map(item => {
    const expiryStatus = getExpiryStatus(item.expiryDate);
    return {
      ...item,
      formattedExpiry: expiryStatus
    };
  });

  const handleAddItem = () => {
    const id = `item-${Date.now()}`;
    const createdAt = new Date().toISOString();
    
    // Using mock donor for demo purposes
    const item: FoodItem = {
      id,
      createdAt,
      donorId: "2", // Mock donor ID
      donorName: "Donor User", // Mock donor name
      ...newItem,
    };
    
    setInventory([...inventory, item]);
    setIsAddDialogOpen(false);
    setNewItem({
      name: "",
      category: "Canned Goods",
      quantity: 0,
      unit: "items",
      expiryDate: new Date().toISOString().split("T")[0],
      nutritionalInfo: "",
      allergens: [],
      storageRequirements: "",
      status: "available",
    });
    
    toast({
      title: "Item added",
      description: `${item.name} has been added to inventory.`,
    });
  };

  const handleUpdateItem = () => {
    if (!selectedItem) return;
    
    const updatedInventory = inventory.map(item => 
      item.id === selectedItem.id ? selectedItem : item
    );
    
    setInventory(updatedInventory);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Item updated",
      description: `${selectedItem.name} has been updated.`,
    });
  };

  const handleStatusChange = (itemId: string, status: "available" | "allocated" | "expired") => {
    const updatedInventory = inventory.map(item => 
      item.id === itemId ? { ...item, status } : item
    );
    
    setInventory(updatedInventory);
    
    toast({
      title: "Status updated",
      description: `Item status has been updated to ${status}.`,
    });
  };

  const itemActions = (item: FoodItem) => {
    const expiryStatus = getExpiryStatus(item.expiryDate);
    
    return (
      <>
        <Button
          size="sm"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedItem(item);
            setIsEditDialogOpen(true);
          }}
        >
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
        
        {item.status === "available" ? (
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange(item.id, "allocated");
            }}
          >
            Allocate
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange(item.id, "available");
            }}
          >
            Unallocate
          </Button>
        )}
        
        {expiryStatus.status === "expired" && (
          <Button
            size="sm"
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange(item.id, "expired");
            }}
          >
            Mark Expired
          </Button>
        )}
      </>
    );
  };

  const viewItemDetails = (item: FoodItem) => {
    setSelectedItem(item);
  };

  // Custom cell renderer for the status column
  const renderStatus = (item: FoodItem & { formattedExpiry?: { status: string, label: string } }) => (
    <div className="flex items-center gap-2">
      <Badge variant={
        item.status === "available" 
          ? "outline" 
          : item.status === "allocated" 
            ? "secondary" 
            : "destructive"
      }>
        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
      </Badge>
      
      {item.formattedExpiry && item.formattedExpiry.status === "warning" && (
        <Badge variant="warning" className="bg-yellow-500">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Expiring Soon
        </Badge>
      )}
      
      {item.formattedExpiry && item.formattedExpiry.status === "expired" && (
        <Badge variant="destructive">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Expired
        </Badge>
      )}
    </div>
  );

  // Statistics for the inventory
  const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const totalCategories = [...new Set(inventory.map(item => item.category))].length;
  const expiringSoon = inventory.filter(item => {
    const expiryStatus = getExpiryStatus(item.expiryDate);
    return expiryStatus.status === "warning";
  }).length;
  const allocated = inventory.filter(item => item.status === "allocated").length;

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>
            <p className="text-muted-foreground">
              Manage food items, track expiry dates, and allocate resources.
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Package className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Food Item</DialogTitle>
                <DialogDescription>
                  Add a new food item to the inventory.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select
                    value={newItem.category}
                    onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {foodCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newItem.quantity}
                    onChange={(e) => 
                      setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 0 })
                    }
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="unit" className="text-right">
                    Unit
                  </Label>
                  <Input
                    id="unit"
                    value={newItem.unit}
                    onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="expiryDate" className="text-right">
                    Expiry Date
                  </Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={newItem.expiryDate}
                    onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nutritionalInfo" className="text-right">
                    Nutritional Info
                  </Label>
                  <Input
                    id="nutritionalInfo"
                    value={newItem.nutritionalInfo || ""}
                    onChange={(e) => setNewItem({ ...newItem, nutritionalInfo: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="allergens" className="text-right">
                    Allergens
                  </Label>
                  <Input
                    id="allergens"
                    value={newItem.allergens?.join(", ") || ""}
                    onChange={(e) => 
                      setNewItem({ 
                        ...newItem, 
                        allergens: e.target.value.split(",").map(a => a.trim()) 
                      })
                    }
                    placeholder="e.g. Nuts, Dairy, Gluten (comma separated)"
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="storage" className="text-right">
                    Storage
                  </Label>
                  <Input
                    id="storage"
                    value={newItem.storageRequirements || ""}
                    onChange={(e) => 
                      setNewItem({ ...newItem, storageRequirements: e.target.value })
                    }
                    placeholder="e.g. Refrigerated, Room temperature"
                    className="col-span-3"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddItem}>Add Item</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Items
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalItems}</div>
              <p className="text-xs text-muted-foreground">
                Across {inventory.length} unique entries
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Categories
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCategories}</div>
              <p className="text-xs text-muted-foreground">
                Different food categories
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Expiring Soon
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{expiringSoon}</div>
              <p className="text-xs text-muted-foreground">
                Items expiring within 7 days
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Allocated
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allocated}</div>
              <p className="text-xs text-muted-foreground">
                Items allocated to beneficiaries
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
            <TabsTrigger value="allocated">Allocated</TabsTrigger>
            <TabsTrigger value="expiring-soon">Expiring Soon</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-4">
            <DataTable
              data={itemWithFormattedExpiry}
              columns={columns}
              actions={itemActions}
              onRowClick={viewItemDetails}
            />
          </TabsContent>
        </Tabs>
        
        {selectedItem && (
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Food Item</DialogTitle>
                <DialogDescription>
                  Update information for {selectedItem.name}.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="edit-name"
                    value={selectedItem.name}
                    onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-category" className="text-right">
                    Category
                  </Label>
                  <Select
                    value={selectedItem.category}
                    onValueChange={(value) => setSelectedItem({ ...selectedItem, category: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {foodCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-quantity" className="text-right">
                    Quantity
                  </Label>
                  <Input
                    id="edit-quantity"
                    type="number"
                    value={selectedItem.quantity}
                    onChange={(e) => 
                      setSelectedItem({ 
                        ...selectedItem, 
                        quantity: parseInt(e.target.value) || 0 
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-unit" className="text-right">
                    Unit
                  </Label>
                  <Input
                    id="edit-unit"
                    value={selectedItem.unit}
                    onChange={(e) => 
                      setSelectedItem({ ...selectedItem, unit: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-expiryDate" className="text-right">
                    Expiry Date
                  </Label>
                  <Input
                    id="edit-expiryDate"
                    type="date"
                    value={selectedItem.expiryDate.split("T")[0]}
                    onChange={(e) => 
                      setSelectedItem({ ...selectedItem, expiryDate: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-status" className="text-right">
                    Status
                  </Label>
                  <Select
                    value={selectedItem.status}
                    onValueChange={(value) => 
                      setSelectedItem({ 
                        ...selectedItem, 
                        status: value as "available" | "allocated" | "expired" 
                      })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="allocated">Allocated</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-nutritionalInfo" className="text-right">
                    Nutritional Info
                  </Label>
                  <Input
                    id="edit-nutritionalInfo"
                    value={selectedItem.nutritionalInfo || ""}
                    onChange={(e) => 
                      setSelectedItem({ ...selectedItem, nutritionalInfo: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-allergens" className="text-right">
                    Allergens
                  </Label>
                  <Input
                    id="edit-allergens"
                    value={selectedItem.allergens?.join(", ") || ""}
                    onChange={(e) => 
                      setSelectedItem({ 
                        ...selectedItem, 
                        allergens: e.target.value.split(",").map(a => a.trim()) 
                      })
                    }
                    placeholder="e.g. Nuts, Dairy, Gluten (comma separated)"
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-storage" className="text-right">
                    Storage
                  </Label>
                  <Input
                    id="edit-storage"
                    value={selectedItem.storageRequirements || ""}
                    onChange={(e) => 
                      setSelectedItem({ ...selectedItem, storageRequirements: e.target.value })
                    }
                    placeholder="e.g. Refrigerated, Room temperature"
                    className="col-span-3"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateItem}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardShell>
  );
}

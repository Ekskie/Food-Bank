
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
import { User, UserRole } from "@/types/user";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Edit, UserX, UserSearch } from "lucide-react";

// Mock data for users
const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    profileImage: "/placeholder.svg",
    phoneNumber: "555-123-4567",
    address: "123 Admin St, City",
    createdAt: "2023-01-01T00:00:00Z",
    lastLogin: "2023-05-01T12:30:00Z",
    status: "active",
  },
  {
    id: "2",
    name: "Donor User",
    email: "donor@example.com",
    role: "donor",
    profileImage: "/placeholder.svg",
    phoneNumber: "555-234-5678",
    address: "456 Donor Ave, Town",
    createdAt: "2023-01-15T00:00:00Z",
    lastLogin: "2023-04-28T09:15:00Z",
    status: "active",
  },
  {
    id: "3",
    name: "Volunteer User",
    email: "volunteer@example.com",
    role: "volunteer",
    profileImage: "/placeholder.svg",
    phoneNumber: "555-345-6789",
    address: "789 Helper Rd, Village",
    createdAt: "2023-02-01T00:00:00Z",
    lastLogin: "2023-05-02T14:45:00Z",
    status: "active",
  },
  {
    id: "4",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "beneficiary",
    phoneNumber: "555-456-7890",
    address: "101 Need St, Suburb",
    createdAt: "2023-02-15T00:00:00Z",
    status: "active",
  },
  {
    id: "5",
    name: "Local Restaurant",
    email: "restaurant@example.com",
    role: "partner",
    phoneNumber: "555-567-8901",
    address: "202 Business Blvd, City",
    createdAt: "2023-03-01T00:00:00Z",
    lastLogin: "2023-04-29T11:20:00Z",
    status: "active",
  },
  {
    id: "6",
    name: "Mark Johnson",
    email: "mark@example.com",
    role: "donor",
    phoneNumber: "555-678-9012",
    address: "303 Giver Lane, Town",
    createdAt: "2023-03-15T00:00:00Z",
    lastLogin: "2023-04-30T16:10:00Z",
    status: "inactive",
  },
];

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "volunteer" as UserRole,
    phoneNumber: "",
    address: "",
    status: "active" as "active" | "inactive" | "suspended",
  });
  const { toast } = useToast();

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "phoneNumber", label: "Phone" },
    { key: "status", label: "Status" },
    { key: "createdAt", label: "Created" },
  ];

  const handleAddUser = () => {
    const id = `user-${Date.now()}`;
    const createdAt = new Date().toISOString();
    
    const user: User = {
      id,
      createdAt,
      ...newUser,
    };
    
    setUsers([...users, user]);
    setIsAddDialogOpen(false);
    setNewUser({
      name: "",
      email: "",
      role: "volunteer" as UserRole,
      phoneNumber: "",
      address: "",
      status: "active" as "active" | "inactive" | "suspended",
    });
    
    toast({
      title: "User added",
      description: `${user.name} has been added successfully.`,
    });
  };

  const handleUpdateUser = () => {
    if (!selectedUser) return;
    
    const updatedUsers = users.map(user => 
      user.id === selectedUser.id ? selectedUser : user
    );
    
    setUsers(updatedUsers);
    setIsEditDialogOpen(false);
    
    toast({
      title: "User updated",
      description: `${selectedUser.name}'s information has been updated.`,
    });
  };

  const handleStatusChange = (userId: string, status: "active" | "inactive" | "suspended") => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, status } : user
    );
    
    setUsers(updatedUsers);
    
    toast({
      title: "Status updated",
      description: `User status has been updated to ${status}.`,
    });
  };

  const userActions = (user: User) => (
    <>
      <Button
        size="sm"
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
          setSelectedUser(user);
          setIsEditDialogOpen(true);
        }}
      >
        <Edit className="h-4 w-4 mr-1" />
        Edit
      </Button>
      
      <Button
        size="sm"
        variant={user.status === "active" ? "destructive" : "outline"}
        onClick={(e) => {
          e.stopPropagation();
          handleStatusChange(
            user.id,
            user.status === "active" ? "suspended" : "active"
          );
        }}
      >
        {user.status === "active" ? (
          <>
            <UserX className="h-4 w-4 mr-1" />
            Suspend
          </>
        ) : (
          <>
            <UserSearch className="h-4 w-4 mr-1" />
            Activate
          </>
        )}
      </Button>
    </>
  );

  const viewUserDetails = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">
              Manage all users in the system, update their information, or change their status.
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account in the system.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
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
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(value) => setNewUser({ ...newUser, role: value as UserRole })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="donor">Donor</SelectItem>
                      <SelectItem value="volunteer">Volunteer</SelectItem>
                      <SelectItem value="beneficiary">Beneficiary</SelectItem>
                      <SelectItem value="partner">Partner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={newUser.phoneNumber}
                    onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right">
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={newUser.address}
                    onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select
                    value={newUser.status}
                    onValueChange={(value) => 
                      setNewUser({ 
                        ...newUser, 
                        status: value as "active" | "inactive" | "suspended" 
                      })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUser}>Add User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <DataTable
          data={users}
          columns={columns}
          actions={userActions}
          onRowClick={viewUserDetails}
        />
        
        {selectedUser && (
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit User</DialogTitle>
                <DialogDescription>
                  Update user information for {selectedUser.name}.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="edit-name"
                    value={selectedUser.name}
                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
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
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-role" className="text-right">
                    Role
                  </Label>
                  <Select
                    value={selectedUser.role}
                    onValueChange={(value) => 
                      setSelectedUser({ ...selectedUser, role: value as UserRole })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="donor">Donor</SelectItem>
                      <SelectItem value="volunteer">Volunteer</SelectItem>
                      <SelectItem value="beneficiary">Beneficiary</SelectItem>
                      <SelectItem value="partner">Partner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="edit-phone"
                    value={selectedUser.phoneNumber || ""}
                    onChange={(e) => 
                      setSelectedUser({ ...selectedUser, phoneNumber: e.target.value })
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
                    value={selectedUser.address || ""}
                    onChange={(e) => 
                      setSelectedUser({ ...selectedUser, address: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-status" className="text-right">
                    Status
                  </Label>
                  <Select
                    value={selectedUser.status}
                    onValueChange={(value) => 
                      setSelectedUser({ 
                        ...selectedUser, 
                        status: value as "active" | "inactive" | "suspended" 
                      })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateUser}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardShell>
  );
}

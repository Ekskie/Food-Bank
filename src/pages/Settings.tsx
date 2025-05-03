
import { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Bell,
  Globe,
  Lock,
  Mail,
  PaintBucket,
  Save,
  Shield,
  Smartphone,
  User
} from "lucide-react";

export default function Settings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Example form state for settings
  const [profileSettings, setProfileSettings] = useState({
    organizationName: "GivingGroceries Admin",
    email: "admin@givinggroceries.org",
    phone: "(555) 123-4567",
    address: "123 Main Street, Suite 100, Anytown, USA",
    website: "https://givinggroceries.org",
    logo: ""
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newDonationAlert: true,
    lowInventoryAlert: true,
    systemUpdates: true,
    marketingEmails: false
  });

  const handleProfileChange = (field: string, value: string) => {
    setProfileSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profile Updated",
        description: "Your organization profile has been updated successfully."
      });
    }, 1000);
  };

  const handleSaveNotifications = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Notification Preferences Updated",
        description: "Your notification settings have been saved."
      });
    }, 1000);
  };

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance">
              <PaintBucket className="h-4 w-4 mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Organization Profile</CardTitle>
                  <CardDescription>
                    Manage your organization's information visible to partners and users.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-3">
                    <Label htmlFor="organizationName">Organization Name</Label>
                    <Input
                      id="organizationName"
                      value={profileSettings.organizationName}
                      onChange={(e) => handleProfileChange("organizationName", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileSettings.email}
                      onChange={(e) => handleProfileChange("email", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileSettings.phone}
                      onChange={(e) => handleProfileChange("phone", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={profileSettings.address}
                      onChange={(e) => handleProfileChange("address", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profileSettings.website}
                      onChange={(e) => handleProfileChange("website", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="logo">Organization Logo</Label>
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files && handleProfileChange("logo", URL.createObjectURL(e.target.files[0]))}
                    />
                    {profileSettings.logo && (
                      <div className="mt-2">
                        <img 
                          src={profileSettings.logo} 
                          alt="Logo Preview" 
                          className="h-20 w-auto object-contain"
                        />
                      </div>
                    )}
                  </div>
                  <Button 
                    onClick={handleSaveProfile} 
                    disabled={isLoading}
                    className="w-full md:w-auto"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Profile
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Configure how and when you receive notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Communication Channels</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="emailNotifications" className="text-sm">
                            Email Notifications
                          </Label>
                        </div>
                        <Switch
                          id="emailNotifications"
                          checked={notificationSettings.emailNotifications}
                          onCheckedChange={(checked) => 
                            handleNotificationChange("emailNotifications", checked)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Smartphone className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="smsNotifications" className="text-sm">
                            SMS Notifications
                          </Label>
                        </div>
                        <Switch
                          id="smsNotifications"
                          checked={notificationSettings.smsNotifications}
                          onCheckedChange={(checked) => 
                            handleNotificationChange("smsNotifications", checked)
                          }
                        />
                      </div>

                      <Separator className="my-4" />

                      <h3 className="text-sm font-medium">Notification Types</h3>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="newDonationAlert" className="text-sm">
                          New Donation Alerts
                        </Label>
                        <Switch
                          id="newDonationAlert"
                          checked={notificationSettings.newDonationAlert}
                          onCheckedChange={(checked) => 
                            handleNotificationChange("newDonationAlert", checked)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="lowInventoryAlert" className="text-sm">
                          Low Inventory Alerts
                        </Label>
                        <Switch
                          id="lowInventoryAlert"
                          checked={notificationSettings.lowInventoryAlert}
                          onCheckedChange={(checked) => 
                            handleNotificationChange("lowInventoryAlert", checked)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="systemUpdates" className="text-sm">
                          System Updates
                        </Label>
                        <Switch
                          id="systemUpdates"
                          checked={notificationSettings.systemUpdates}
                          onCheckedChange={(checked) => 
                            handleNotificationChange("systemUpdates", checked)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="marketingEmails" className="text-sm">
                          Marketing Emails
                        </Label>
                        <Switch
                          id="marketingEmails"
                          checked={notificationSettings.marketingEmails}
                          onCheckedChange={(checked) => 
                            handleNotificationChange("marketingEmails", checked)
                          }
                        />
                      </div>
                    </div>
                    <Button 
                      onClick={handleSaveNotifications} 
                      disabled={isLoading}
                      className="w-full md:w-auto"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize how the platform looks for your organization.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Theme</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border rounded-md p-3 cursor-pointer hover:border-primary">
                        <div className="h-12 bg-white mb-2 rounded"></div>
                        <p className="text-sm font-medium text-center">Light</p>
                      </div>
                      <div className="border rounded-md p-3 cursor-pointer hover:border-primary">
                        <div className="h-12 bg-gray-900 mb-2 rounded"></div>
                        <p className="text-sm font-medium text-center">Dark</p>
                      </div>
                      <div className="border rounded-md p-3 cursor-pointer hover:border-primary border-primary">
                        <div className="h-12 bg-gradient-to-r from-white to-gray-900 mb-2 rounded"></div>
                        <p className="text-sm font-medium text-center">System</p>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <h3 className="text-sm font-medium">Accent Color</h3>
                    <div className="grid grid-cols-6 gap-2">
                      <div className="h-8 bg-red-500 rounded-md cursor-pointer"></div>
                      <div className="h-8 bg-orange-500 rounded-md cursor-pointer"></div>
                      <div className="h-8 bg-green-500 rounded-md cursor-pointer"></div>
                      <div className="h-8 bg-blue-500 rounded-md cursor-pointer"></div>
                      <div className="h-8 bg-purple-500 rounded-md cursor-pointer"></div>
                      <div className="h-8 bg-pink-500 rounded-md cursor-pointer"></div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <h3 className="text-sm font-medium">Language & Region</h3>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="language">Language</Label>
                        <select
                          id="language"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="en">English (US)</option>
                          <option value="es">Español</option>
                          <option value="fr">Français</option>
                          <option value="de">Deutsch</option>
                        </select>
                      </div>
                    </div>
                    
                    <Button className="mt-4 w-full md:w-auto">
                      <Save className="h-4 w-4 mr-2" />
                      Save Appearance Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account's security and access controls.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Password</h3>
                    <div className="grid gap-3">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button className="mt-2 w-full md:w-auto">
                      <Lock className="h-4 w-4 mr-2" />
                      Update Password
                    </Button>
                    
                    <Separator className="my-4" />
                    
                    <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Enhance your account security</p>
                        <p className="text-xs text-muted-foreground">
                          Protect your account with an additional security layer
                        </p>
                      </div>
                      <Button variant="outline">Enable 2FA</Button>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <h3 className="text-sm font-medium">Sessions</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="text-sm font-medium">Current Session</p>
                          <p className="text-xs text-muted-foreground">
                            Chrome on Windows • IP 192.168.1.1 • Started 2 hours ago
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="text-xs">Active</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button variant="destructive" size="sm">Log Out All Other Devices</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </DashboardShell>
  );
}

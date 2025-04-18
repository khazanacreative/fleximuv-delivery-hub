
import { useState } from 'react';
import { 
  Bell, Building, CreditCard, Globe, Lock, Mail, Phone, 
  Save, Shield, User, Webhook, Truck, Calculator, Percent
} from 'lucide-react';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hooks/use-auth';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const isAdmin = user?.role === 'admin';
  const isPartnerWithDrivers = user?.role === 'partner' && user?.hasDrivers;

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully.",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid grid-cols-4 md:grid-cols-7 lg:w-[900px]">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          {(isAdmin || isPartnerWithDrivers) && (
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
          )}
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-left">Profile Information</CardTitle>
              <CardDescription className="text-left">
                Update your basic profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1 text-left">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={user?.name} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1 text-left">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue={user?.email} />
                </div>
                <div className="space-y-1 text-left">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+62 812 3456 7890" />
                </div>
              </div>
              <div className="space-y-1 text-left">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="Jl. Pahlawan No. 123, Surabaya" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-start">
              <Button onClick={handleSave} disabled={saving} className="gap-2">
                {saving ? "Saving..." : "Save Changes"}
                <Save size={16} />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-left">Business Information</CardTitle>
              <CardDescription className="text-left">
                Configure your business details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1 text-left">
                <Label htmlFor="business-name">Business Name</Label>
                <Input id="business-name" defaultValue="UMKM Sejahtera" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1 text-left">
                  <Label htmlFor="business-type">Business Type</Label>
                  <Input id="business-type" defaultValue="Retail" />
                </div>
                <div className="space-y-1 text-left">
                  <Label htmlFor="tax-id">Tax ID</Label>
                  <Input id="tax-id" defaultValue="12.345.678.9-012.000" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-start">
              <Button onClick={handleSave} disabled={saving} className="gap-2">
                {saving ? "Saving..." : "Save Changes"}
                <Save size={16} />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-left">Account Settings</CardTitle>
              <CardDescription className="text-left">
                Manage your account preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 text-left">
                  <Label className="text-base">Language</Label>
                  <p className="text-sm text-muted-foreground">
                    Select your preferred language
                  </p>
                </div>
                <div className="text-left">
                  <select className="morph-input p-2 rounded-lg border border-gray-300">
                    <option value="id">Bahasa Indonesia</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 text-left">
                  <Label className="text-base">Time Zone</Label>
                  <p className="text-sm text-muted-foreground">
                    Set your local time zone
                  </p>
                </div>
                <div className="text-left">
                  <select className="morph-input p-2 rounded-lg border border-gray-300">
                    <option value="Asia/Jakarta">Asia/Jakarta (GMT+7)</option>
                    <option value="Asia/Singapore">Asia/Singapore (GMT+8)</option>
                    <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
                  </select>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 text-left">
                  <Label className="text-base">Currency</Label>
                  <p className="text-sm text-muted-foreground">
                    Select your display currency
                  </p>
                </div>
                <div className="text-left">
                  <select className="morph-input p-2 rounded-lg border border-gray-300">
                    <option value="IDR">IDR - Indonesian Rupiah</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="SGD">SGD - Singapore Dollar</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-start">
              <Button onClick={handleSave} disabled={saving} className="gap-2">
                {saving ? "Saving..." : "Save Changes"}
                <Save size={16} />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-left">Notification Preferences</CardTitle>
              <CardDescription className="text-left">
                Choose how you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 text-left">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive order updates via email
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 text-left">
                  <Label className="text-base">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive order updates via SMS
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 text-left">
                  <Label className="text-base">WhatsApp Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive order updates via WhatsApp
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 text-left">
                  <Label className="text-base">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications in your browser
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
            <CardFooter className="flex justify-start">
              <Button onClick={handleSave} disabled={saving} className="gap-2">
                {saving ? "Saving..." : "Save Changes"}
                <Save size={16} />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Additional tabs with basic structure */}
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-left">Billing Information</CardTitle>
              <CardDescription className="text-left">
                Manage your billing details and payment methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-4">
                  <CreditCard className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Current Plan: Free Trial</h3>
                    <p className="text-sm text-muted-foreground">Your trial ends in 14 days</p>
                  </div>
                </div>
                <Separator />
                <h3 className="font-medium">Payment Methods</h3>
                <p className="text-sm text-muted-foreground">Add or manage payment methods</p>
                <Button variant="outline" className="gap-2">
                  <CreditCard size={16} />
                  Add Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-left">Security Settings</CardTitle>
              <CardDescription className="text-left">
                Manage your account security and authentication
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-left">
                <div className="space-y-4">
                  <h3 className="font-medium">Change Password</h3>
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button className="gap-2">
                    <Lock size={16} />
                    Update Password
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-left">Integrations</CardTitle>
              <CardDescription className="text-left">
                Connect with other services and applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Webhook className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">WhatsApp Business</h3>
                      <p className="text-sm text-muted-foreground">Connect your WhatsApp Business account</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Globe className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Google Maps</h3>
                      <p className="text-sm text-muted-foreground">Connect for route optimization</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <Building className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Accounting Software</h3>
                      <p className="text-sm text-muted-foreground">Connect your accounting software</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* New Pricing Tab for Admin and Partners with Drivers */}
        {(isAdmin || isPartnerWithDrivers) && (
          <TabsContent value="pricing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-left">Delivery Pricing Settings</CardTitle>
                <CardDescription className="text-left">
                  Configure pricing for delivery services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Small Vehicle & SME Pricing</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Flat rate pricing for motorcycles, cars, and SME businesses
                  </p>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2 text-left">
                      <Label htmlFor="token-price">Token Price (per delivery)</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                          IDR
                        </span>
                        <Input id="token-price" type="number" placeholder="15000" className="rounded-l-none" />
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-left">
                      <Label htmlFor="distance-limit">Distance Limit (km)</Label>
                      <div className="flex">
                        <Input id="distance-limit" type="number" placeholder="100" />
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md">
                          km
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2 text-left">
                    <Label htmlFor="extra-distance-fee">Extra Distance Fee (per km)</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                        IDR
                      </span>
                      <Input id="extra-distance-fee" type="number" placeholder="1500" className="rounded-l-none" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Large Vehicle & Enterprise Pricing</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Percentage-based pricing for trucks, pickups, and enterprise businesses
                  </p>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2 text-left">
                      <Label htmlFor="base-percentage">Base Percentage</Label>
                      <div className="flex">
                        <Input id="base-percentage" type="number" placeholder="5" />
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md">
                          %
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-left">
                      <Label htmlFor="minimum-fee">Minimum Fee</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                          IDR
                        </span>
                        <Input id="minimum-fee" type="number" placeholder="25000" className="rounded-l-none" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2 text-left">
                    <Label htmlFor="vehicle-type">Vehicle Type Adjustment</Label>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Pickup</span>
                        <div className="flex">
                          <Input id="pickup-adjustment" type="number" placeholder="0" className="w-20" />
                          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md">
                            %
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Small Truck</span>
                        <div className="flex">
                          <Input id="small-truck-adjustment" type="number" placeholder="2" className="w-20" />
                          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md">
                            %
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Large Truck</span>
                        <div className="flex">
                          <Input id="large-truck-adjustment" type="number" placeholder="3" className="w-20" />
                          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md">
                            %
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {isPartnerWithDrivers && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-lg font-medium mb-4">Your Delivery Service Pricing</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Configure pricing for your own delivery services
                      </p>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2 text-left">
                          <Label htmlFor="partner-base-price">Base Price</Label>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                              IDR
                            </span>
                            <Input id="partner-base-price" type="number" placeholder="20000" className="rounded-l-none" />
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-left">
                          <Label htmlFor="partner-distance-pricing">Per Kilometer Price</Label>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                              IDR
                            </span>
                            <Input id="partner-distance-pricing" type="number" placeholder="2000" className="rounded-l-none" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-2 text-left">
                        <Label htmlFor="partner-special-areas">Special Area Surcharges</Label>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Input placeholder="Area name" className="w-1/2 mr-2" />
                            <div className="flex w-1/2">
                              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                                IDR
                              </span>
                              <Input type="number" placeholder="5000" className="rounded-l-none" />
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="w-full mt-2">
                            + Add Another Area
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={saving} className="gap-2">
                  {saving ? "Saving..." : "Save Pricing Settings"}
                  <Save size={16} />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Settings;

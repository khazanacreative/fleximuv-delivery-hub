
import { useState, useCallback } from "react";
import { Truck, Plus, User, Phone, MapPin, Star, MoreHorizontal, Edit, UserX, UserCheck, Filter } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { mockDrivers } from "@/data/mock-data";
import { Driver } from "@/types";

const Drivers = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [drivers, setDrivers] = useState(mockDrivers);
  const [filteredDrivers, setFilteredDrivers] = useState(mockDrivers);
  const [addDriverOpen, setAddDriverOpen] = useState(false);
  const [viewProfileOpen, setViewProfileOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  // Filter states
  const [statusFilters, setStatusFilters] = useState({
    available: false,
    busy: false,
    offline: false,
  });

  const isAdmin = user?.role === 'admin';
  const isPartner = user?.role === 'partner';

  // Apply filters
  const applyFilters = useCallback(() => {
    if (Object.values(statusFilters).every(v => v === false)) {
      setFilteredDrivers(drivers);
    } else {
      const activeFilters = Object.keys(statusFilters).filter(key => statusFilters[key]);
      setFilteredDrivers(drivers.filter(driver => activeFilters.includes(driver.status)));
    }
  }, [drivers, statusFilters]);

  // Update when filters change
  const handleFilterChange = (status: string, checked: boolean) => {
    setStatusFilters(prev => ({
      ...prev,
      [status]: checked
    }));
  };

  // Apply filters when they change
  useState(() => {
    applyFilters();
  }, [applyFilters, statusFilters]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'busy':
        return 'bg-blue-100 text-blue-800';
      case 'offline':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewProfile = (driver: Driver) => {
    setSelectedDriver(driver);
    setViewProfileOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Truck className="h-8 w-8" />
            Drivers
          </h2>
          <p className="text-muted-foreground">
            Manage your delivery personnel and track their status
          </p>
        </div>
        
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter by Status
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56" align="end">
              <div className="space-y-4">
                <h4 className="font-medium text-sm">Filter by Status</h4>
                <div className="space-y-2">
                  {Object.keys(statusFilters).map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox 
                        id={status} 
                        checked={statusFilters[status]} 
                        onCheckedChange={(checked) => {
                          handleFilterChange(status, checked === true);
                        }}
                      />
                      <Label htmlFor={status} className="text-sm capitalize">
                        {status}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setStatusFilters({
                        available: false,
                        busy: false,
                        offline: false,
                      });
                    }}
                  >
                    Clear
                  </Button>
                  <Button size="sm" onClick={applyFilters}>Apply</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Dialog open={addDriverOpen} onOpenChange={setAddDriverOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Driver
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Driver</DialogTitle>
                <DialogDescription>
                  Enter the details for the new delivery driver
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-left">
                    Full Name
                  </Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-left">
                    Phone
                  </Label>
                  <Input id="phone" type="tel" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-left">
                    Email
                  </Label>
                  <Input id="email" type="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-left">
                    Address
                  </Label>
                  <Input id="address" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="vehicle" className="text-left">
                    Vehicle Type
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="motorcycle">Motorcycle</SelectItem>
                      <SelectItem value="car">Car</SelectItem>
                      <SelectItem value="van">Van</SelectItem>
                      <SelectItem value="truck">Truck</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="license" className="text-left">
                    License Plate
                  </Label>
                  <Input id="license" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddDriverOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  toast({
                    title: "Driver Added",
                    description: "New driver has been successfully added",
                  });
                  setAddDriverOpen(false);
                }}>
                  Add Driver
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDrivers.map((driver) => (
          <Card key={driver.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center">
                    {driver.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <Phone className="h-3 w-3" /> {driver.phone}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(driver.status)}>
                  {driver.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-sm">{driver.currentLocation || 'No location data'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">{driver.rating}</span>
                    <span className="text-xs text-muted-foreground">({driver.completedOrders} orders)</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">{driver.vehicleType}</span>
                    <span className="text-muted-foreground"> • {driver.licensePlate || driver.vehicleNumber || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleViewProfile(driver)}
              >
                <User className="h-4 w-4 mr-2" />
                View Profile
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Details
                  </DropdownMenuItem>
                  
                  {driver.status === 'offline' ? (
                    <DropdownMenuItem>
                      <UserCheck className="h-4 w-4 mr-2" />
                      Activate Driver
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem>
                      <UserX className="h-4 w-4 mr-2" />
                      Deactivate Driver
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* View Profile Dialog */}
      <Dialog open={viewProfileOpen} onOpenChange={setViewProfileOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Driver Profile</DialogTitle>
            <DialogDescription>
              Detailed information about this driver
            </DialogDescription>
          </DialogHeader>

          {selectedDriver && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedDriver.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getStatusColor(selectedDriver.status)}>
                      {selectedDriver.status}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{selectedDriver.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Contact Information</h4>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedDriver.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedDriver.currentLocation || 'No location data'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Vehicle Information</h4>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-start gap-2">
                      <Truck className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p>{selectedDriver.vehicleType}</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedDriver.licensePlate || selectedDriver.vehicleNumber || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-muted-foreground">Performance</h4>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div className="bg-muted/30 p-3 rounded-lg text-center">
                    <p className="text-lg font-bold">{selectedDriver.completedOrders}</p>
                    <p className="text-xs text-muted-foreground">Completed Orders</p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-lg text-center">
                    <p className="text-lg font-bold">{selectedDriver.rating}</p>
                    <p className="text-xs text-muted-foreground">Average Rating</p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-lg text-center">
                    <p className="text-lg font-bold">{(Math.round(selectedDriver.completedOrders * 0.92)).toString()}</p>
                    <p className="text-xs text-muted-foreground">On-Time Delivery</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <span className="text-sm text-muted-foreground">
                  Driver since: {new Date(selectedDriver.createdAt).toLocaleDateString()}
                </span>
                <span className="text-sm font-medium">
                  ID: {selectedDriver.id}
                </span>
              </div>
            </div>
          )}

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setViewProfileOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              // Add action to contact driver here
              toast({
                title: "WhatsApp Opened",
                description: `Ready to message ${selectedDriver?.name}`,
              });
              setViewProfileOpen(false);
            }}>
              Contact via WhatsApp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Drivers;

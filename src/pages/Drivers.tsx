
import { useState, useCallback, useEffect } from "react";
import { Truck, Plus } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { usePermissions } from "@/hooks/use-permissions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { mockDrivers } from "@/data/mock-data";
import { Driver } from "@/types";
import DriversList from "@/components/drivers/DriversList";
import DriverFilters from "@/components/drivers/DriverFilters";
import AddDriverDialog from "@/components/drivers/AddDriverDialog";
import EditDriverDialog from "@/components/drivers/EditDriverDialog";
import DriverProfileDialog from "@/components/drivers/DriverProfileDialog";

const Drivers = () => {
  const { user } = useAuth();
  const { can, isAdmin, isFleetPartner, isIndependentCourier } = usePermissions();
  const { toast } = useToast();
  const [drivers, setDrivers] = useState(mockDrivers);
  const [filteredDrivers, setFilteredDrivers] = useState(mockDrivers);
  const [addDriverOpen, setAddDriverOpen] = useState(false);
  const [editDriverOpen, setEditDriverOpen] = useState(false);
  const [driverToEdit, setDriverToEdit] = useState<Driver | null>(null);
  const [viewProfileOpen, setViewProfileOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [statusFilters, setStatusFilters] = useState({
    available: false,
    busy: false,
    offline: false,
  });

  const applyFilters = useCallback(() => {
    let filteredByPermission = drivers;
    if (!isAdmin) {
      filteredByPermission = drivers.filter(driver => driver.partnerId === user?.id);
    }
    
    if (Object.values(statusFilters).every(v => v === false)) {
      setFilteredDrivers(filteredByPermission);
    } else {
      const activeFilters = Object.keys(statusFilters).filter(key => statusFilters[key]);
      setFilteredDrivers(filteredByPermission.filter(driver => activeFilters.includes(driver.status)));
    }
  }, [drivers, statusFilters, user, isAdmin]);

  const handleFilterChange = (status: string, checked: boolean) => {
    setStatusFilters(prev => ({
      ...prev,
      [status]: checked
    }));
  };

  const clearFilters = () => {
    setStatusFilters({
      available: false,
      busy: false,
      offline: false,
    });
  };

  useEffect(() => {
    applyFilters();
  }, [applyFilters, user]);

  const handleViewProfile = (driver: Driver) => {
    setSelectedDriver(driver);
    setViewProfileOpen(true);
  };

  const handleEditDriver = (driver: Driver) => {
    setDriverToEdit(driver);
    setEditDriverOpen(true);
  };

  const handleUpdateDriver = (updatedDriver: Driver) => {
    setDrivers(prev => 
      prev.map(driver => driver.id === updatedDriver.id ? updatedDriver : driver)
    );
    
    toast({
      title: "Driver Updated",
      description: "Driver information has been successfully updated",
    });
  };

  const handleAddDriver = (newDriverData: any) => {
    const newDriverObj: Driver = {
      id: `d-${Date.now()}`,
      name: newDriverData.name,
      phone: newDriverData.phone,
      email: newDriverData.email || "",
      partnerId: user?.id || "",
      vehicleType: newDriverData.vehicleType,
      vehicleNumber: newDriverData.licensePlate,
      status: 'available' as 'available' | 'busy' | 'offline',
      completedOrders: 0,
      rating: 5.0,
      balance: 0,
      createdAt: new Date(),
      currentLocation: newDriverData.address || "Not specified",
      licensePlate: newDriverData.licensePlate,
    };

    setDrivers(prev => [newDriverObj, ...prev]);
    
    toast({
      title: "Driver Added",
      description: "New driver has been successfully added to your fleet",
    });
  };

  const handleDeleteDriver = (driverId: string) => {
    setDrivers(prev => prev.filter(driver => driver.id !== driverId));
    
    toast({
      title: "Driver Removed",
      description: "The driver has been successfully removed from your fleet",
    });
  };

  const handleDriverStatusChange = (driver: Driver, newStatus: 'available' | 'busy' | 'offline') => {
    const updatedDriver = { ...driver, status: newStatus };
    setDrivers(prev => prev.map(d => d.id === driver.id ? updatedDriver : d));
    
    toast({
      title: newStatus === 'offline' ? "Driver Deactivated" : "Driver Activated",
      description: `Driver status has been set to ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`,
    });
  };

  const openWhatsApp = (phone: string) => {
    const formattedPhone = phone.replace(/\D/g, '');
    window.open(`https://wa.me/${formattedPhone}`, '_blank');
  };

  const shareLocationViaWhatsApp = (driver: Driver) => {
    if (driver.currentLocation) {
      const mockLatitude = -7.2575;
      const mockLongitude = 112.7521;
      const locationUrl = `https://maps.google.com/maps?q=${mockLatitude},${mockLongitude}`;
      window.open(`https://wa.me/?text=Driver's Location: ${locationUrl}`, '_blank');
    } else {
      toast({
        title: "Location not available",
        description: "This driver's location is not currently available",
      });
    }
  };

  // Check if the current user can add drivers
  const canManageDrivers = isAdmin || 
                          (user?.role === 'partner' && user?.hasDrivers === true) || 
                          (user?.role === 'driver' && user?.partnerType === 'courier');

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
          <DriverFilters
            statusFilters={statusFilters}
            onFilterChange={handleFilterChange}
            onApplyFilters={applyFilters}
            onClearFilters={clearFilters}
          />
          
          {canManageDrivers && (
            <Button
              onClick={() => setAddDriverOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Driver
            </Button>
          )}
        </div>
      </div>

      <DriversList
        drivers={filteredDrivers}
        onViewProfile={handleViewProfile}
        onDeleteDriver={handleDeleteDriver}
        onStatusChange={handleDriverStatusChange}
        onEditDriver={handleEditDriver}
      />

      <DriverProfileDialog
        isOpen={viewProfileOpen}
        onOpenChange={(open) => {
          setViewProfileOpen(open);
          if (!open) setSelectedDriver(null);
        }}
        selectedDriver={selectedDriver}
        onContactWhatsApp={openWhatsApp}
        onShareLocation={shareLocationViaWhatsApp}
      />
      
      <AddDriverDialog
        isOpen={addDriverOpen}
        onOpenChange={setAddDriverOpen}
        onAddDriver={handleAddDriver}
        currentUser={user}
      />

      {driverToEdit && (
        <EditDriverDialog
          isOpen={editDriverOpen}
          onOpenChange={setEditDriverOpen}
          driver={driverToEdit}
          onUpdateDriver={handleUpdateDriver}
        />
      )}
    </div>
  );
};

export default Drivers;

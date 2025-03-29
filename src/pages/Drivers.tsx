import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { usePermissions } from "@/hooks/use-permissions";
import { useToast } from "@/hooks/use-toast";
import { Driver, User } from "@/types";
import DriversList from "@/components/drivers/DriversList";
import DriversHeader from "@/components/drivers/DriversHeader";
import DriversDialogs from "@/components/drivers/DriversDialogs";
import { useDrivers } from "@/hooks/use-drivers";
import IndependentCouriersList from "@/components/drivers/IndependentCouriersList";
import { mockUsers } from "@/data/mock-data";

const Drivers = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { isAdmin, isFleetPartner, isIndependentCourier, isBusinessPartner } = usePermissions();
  
  // Determine if the user can manage drivers
  const canManageDrivers = isAdmin || isFleetPartner || isIndependentCourier;
  
  console.log("User role checks:", {
    user,
    isAdmin,
    isFleetPartner,
    isIndependentCourier,
    isBusinessPartner,
    canManageDrivers
  });
  
  const {
    filteredDrivers,
    statusFilters,
    handleFilterChange,
    applyFilters,
    clearFilters,
    handleAddDriver,
    handleUpdateDriver,
    handleDeleteDriver,
    handleDriverStatusChange,
  } = useDrivers();

  const [addDriverOpen, setAddDriverOpen] = useState(false);
  const [editDriverOpen, setEditDriverOpen] = useState(false);
  const [driverToEdit, setDriverToEdit] = useState<Driver | null>(null);
  const [viewProfileOpen, setViewProfileOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  
  // For business partners, get list of independent couriers
  const independentCouriers = mockUsers.filter(
    user => user.role === 'partner' && user.partnerType === 'courier'
  );

  const handleViewProfile = (driver: Driver) => {
    setSelectedDriver(driver);
    setViewProfileOpen(true);
  };

  const handleEditDriver = (driver: Driver) => {
    setDriverToEdit(driver);
    setEditDriverOpen(true);
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

  return (
    <div className="space-y-6">
      <DriversHeader 
        onAddDriverClick={() => setAddDriverOpen(true)}
        statusFilters={statusFilters}
        onFilterChange={handleFilterChange}
        onApplyFilters={applyFilters}
        onClearFilters={clearFilters}
        canManageDrivers={canManageDrivers}
      />

      {isBusinessPartner ? (
        // Business partners only see list of independent couriers
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Available Independent Couriers</h2>
          <IndependentCouriersList couriers={independentCouriers} />
        </div>
      ) : (
        // Other users see the regular drivers list
        <DriversList
          drivers={filteredDrivers}
          onViewProfile={handleViewProfile}
          onDeleteDriver={handleDeleteDriver}
          onStatusChange={handleDriverStatusChange}
          onEditDriver={handleEditDriver}
        />
      )}

      <DriversDialogs
        addDriverOpen={addDriverOpen}
        setAddDriverOpen={setAddDriverOpen}
        editDriverOpen={editDriverOpen}
        setEditDriverOpen={setEditDriverOpen}
        viewProfileOpen={viewProfileOpen}
        setViewProfileOpen={setViewProfileOpen}
        driverToEdit={driverToEdit}
        setDriverToEdit={setDriverToEdit}
        selectedDriver={selectedDriver}
        setSelectedDriver={setSelectedDriver}
        onAddDriver={handleAddDriver}
        onUpdateDriver={handleUpdateDriver}
        onContactWhatsApp={openWhatsApp}
        onShareLocation={shareLocationViaWhatsApp}
        currentUser={user}
      />
    </div>
  );
};

export default Drivers;

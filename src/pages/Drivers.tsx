
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { usePermissions } from "@/hooks/use-permissions";
import { useToast } from "@/hooks/use-toast";
import { Driver } from "@/types";
import DriversList from "@/components/drivers/DriversList";
import DriversHeader from "@/components/drivers/DriversHeader";
import DriversDialogs from "@/components/drivers/DriversDialogs";
import { useDrivers } from "@/hooks/use-drivers";

const Drivers = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { isAdmin, isFleetPartner, isIndependentCourier } = usePermissions();
  
  // This is specifically moved before the useEffect
  const canManageDrivers = isAdmin || isFleetPartner || isIndependentCourier;
  
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

      <DriversList
        drivers={filteredDrivers}
        onViewProfile={handleViewProfile}
        onDeleteDriver={handleDeleteDriver}
        onStatusChange={handleDriverStatusChange}
        onEditDriver={handleEditDriver}
      />

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

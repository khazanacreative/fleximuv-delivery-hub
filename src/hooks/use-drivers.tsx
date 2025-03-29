
import { useState, useEffect, useCallback } from "react";
import { Driver, User } from "@/types";
import { mockDrivers } from "@/data/mock-data";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { usePermissions } from "@/hooks/use-permissions";

export const useDrivers = () => {
  const { user } = useAuth();
  const { isAdmin } = usePermissions();
  const { toast } = useToast();
  
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);
  const [statusFilters, setStatusFilters] = useState({
    available: false,
    busy: false,
    offline: false,
  });

  useEffect(() => {
    const savedDrivers = localStorage.getItem('fleximov_drivers');
    if (savedDrivers) {
      try {
        const parsedDrivers = JSON.parse(savedDrivers);
        setDrivers(parsedDrivers);
        setFilteredDrivers(parsedDrivers);
      } catch (error) {
        console.error("Error parsing saved drivers:", error);
        setDrivers(mockDrivers);
        setFilteredDrivers(mockDrivers);
      }
    } else {
      setDrivers(mockDrivers);
      setFilteredDrivers(mockDrivers);
    }
  }, []);

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

    const updatedDrivers = [newDriverObj, ...drivers];
    setDrivers(updatedDrivers);
    
    localStorage.setItem('fleximov_drivers', JSON.stringify(updatedDrivers));
    
    toast({
      title: "Driver Added",
      description: "New driver has been successfully added to your fleet",
    });
  };

  const handleUpdateDriver = (updatedDriver: Driver) => {
    const updatedDrivers = drivers.map(driver => 
      driver.id === updatedDriver.id ? updatedDriver : driver
    );
    setDrivers(updatedDrivers);
    
    localStorage.setItem('fleximov_drivers', JSON.stringify(updatedDrivers));
    
    toast({
      title: "Driver Updated",
      description: "Driver information has been successfully updated",
    });
  };

  const handleDeleteDriver = (driverId: string) => {
    const updatedDrivers = drivers.filter(driver => driver.id !== driverId);
    setDrivers(updatedDrivers);
    
    localStorage.setItem('fleximov_drivers', JSON.stringify(updatedDrivers));
    
    toast({
      title: "Driver Removed",
      description: "The driver has been successfully removed from your fleet",
    });
  };

  const handleDriverStatusChange = (driver: Driver, newStatus: 'available' | 'busy' | 'offline') => {
    const updatedDriver = { ...driver, status: newStatus };
    const updatedDrivers = drivers.map(d => d.id === driver.id ? updatedDriver : d);
    setDrivers(updatedDrivers);
    
    localStorage.setItem('fleximov_drivers', JSON.stringify(updatedDrivers));
    
    toast({
      title: newStatus === 'offline' ? "Driver Deactivated" : "Driver Activated",
      description: `Driver status has been set to ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`,
    });
  };

  return {
    drivers,
    filteredDrivers,
    statusFilters,
    handleFilterChange,
    applyFilters,
    clearFilters,
    handleAddDriver,
    handleUpdateDriver,
    handleDeleteDriver,
    handleDriverStatusChange,
  };
};


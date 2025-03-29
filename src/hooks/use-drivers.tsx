
import { useState, useEffect, useCallback } from "react";
import { Driver, User } from "@/types";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { usePermissions } from "@/hooks/use-permissions";
import { supabase } from "@/integrations/supabase/client";

export const useDrivers = () => {
  const { user } = useAuth();
  const { isAdmin } = usePermissions();
  const { toast } = useToast();
  
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilters, setStatusFilters] = useState({
    available: false,
    busy: false,
    offline: false,
  });

  const fetchDrivers = useCallback(async () => {
    setIsLoading(true);
    try {
      let query = supabase.from('drivers').select('*');
      
      // Apply permission-based filtering
      if (!isAdmin && user) {
        query = query.eq('partner_id', user.id);
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      if (data) {
        const formattedDrivers: Driver[] = data.map(d => ({
          id: d.id,
          name: d.name,
          phone: d.phone,
          email: d.email || '',
          partnerId: d.partner_id,
          vehicleType: d.vehicle_type,
          vehicleNumber: d.vehicle_number,
          licensePlate: d.license_plate,
          status: d.status as 'available' | 'busy' | 'offline',
          currentLocation: d.current_location,
          completedOrders: d.completed_orders,
          rating: d.rating,
          balance: d.balance,
          createdAt: new Date(d.created_at),
        }));
        setDrivers(formattedDrivers);
        setFilteredDrivers(formattedDrivers);
      }
    } catch (error) {
      console.error("Error fetching drivers:", error);
      toast({
        title: "Error",
        description: "Failed to fetch drivers. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [isAdmin, user, toast]);

  useEffect(() => {
    if (user) {
      fetchDrivers();
    }
  }, [user, fetchDrivers]);

  const applyFilters = useCallback(() => {
    if (Object.values(statusFilters).every(v => v === false)) {
      setFilteredDrivers(drivers);
    } else {
      const activeFilters = Object.keys(statusFilters).filter(key => statusFilters[key as keyof typeof statusFilters]);
      setFilteredDrivers(drivers.filter(driver => activeFilters.includes(driver.status)));
    }
  }, [drivers, statusFilters]);

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
  }, [applyFilters, drivers, statusFilters]);

  const handleAddDriver = async (newDriverData: any) => {
    try {
      const { data, error } = await supabase
        .from('drivers')
        .insert([{
          name: newDriverData.name,
          phone: newDriverData.phone,
          email: newDriverData.email || null,
          partner_id: user?.id || null,
          vehicle_type: newDriverData.vehicleType,
          vehicle_number: newDriverData.vehicleNumber || null,
          license_plate: newDriverData.licensePlate || null,
          status: 'available',
          current_location: newDriverData.address || null,
        }])
        .select();
      
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        const newDriver: Driver = {
          id: data[0].id,
          name: data[0].name,
          phone: data[0].phone,
          email: data[0].email || '',
          partnerId: data[0].partner_id,
          vehicleType: data[0].vehicle_type,
          vehicleNumber: data[0].vehicle_number,
          licensePlate: data[0].license_plate,
          status: data[0].status as 'available' | 'busy' | 'offline',
          currentLocation: data[0].current_location,
          completedOrders: data[0].completed_orders,
          rating: data[0].rating,
          balance: data[0].balance,
          createdAt: new Date(data[0].created_at),
        };
        
        setDrivers(prev => [newDriver, ...prev]);
        
        toast({
          title: "Driver Added",
          description: "New driver has been successfully added to your fleet",
        });
      }
    } catch (error) {
      console.error("Error adding driver:", error);
      toast({
        title: "Error",
        description: "Failed to add driver. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleUpdateDriver = async (updatedDriver: Driver) => {
    try {
      const { error } = await supabase
        .from('drivers')
        .update({
          name: updatedDriver.name,
          phone: updatedDriver.phone,
          email: updatedDriver.email || null,
          vehicle_type: updatedDriver.vehicleType,
          vehicle_number: updatedDriver.vehicleNumber || null,
          license_plate: updatedDriver.licensePlate || null,
          current_location: updatedDriver.currentLocation || null,
        })
        .eq('id', updatedDriver.id);
      
      if (error) {
        throw error;
      }
      
      setDrivers(prev => prev.map(driver => 
        driver.id === updatedDriver.id ? updatedDriver : driver
      ));
      
      toast({
        title: "Driver Updated",
        description: "Driver information has been successfully updated",
      });
    } catch (error) {
      console.error("Error updating driver:", error);
      toast({
        title: "Error",
        description: "Failed to update driver. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteDriver = async (driverId: string) => {
    try {
      const { error } = await supabase
        .from('drivers')
        .delete()
        .eq('id', driverId);
      
      if (error) {
        throw error;
      }
      
      setDrivers(prev => prev.filter(driver => driver.id !== driverId));
      
      toast({
        title: "Driver Removed",
        description: "The driver has been successfully removed from your fleet",
      });
    } catch (error) {
      console.error("Error deleting driver:", error);
      toast({
        title: "Error",
        description: "Failed to delete driver. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDriverStatusChange = async (driver: Driver, newStatus: 'available' | 'busy' | 'offline') => {
    try {
      const { error } = await supabase
        .from('drivers')
        .update({ status: newStatus })
        .eq('id', driver.id);
      
      if (error) {
        throw error;
      }
      
      const updatedDriver = { ...driver, status: newStatus };
      setDrivers(prev => prev.map(d => d.id === driver.id ? updatedDriver : d));
      
      toast({
        title: newStatus === 'offline' ? "Driver Deactivated" : "Driver Activated",
        description: `Driver status has been set to ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`,
      });
    } catch (error) {
      console.error("Error changing driver status:", error);
      toast({
        title: "Error",
        description: "Failed to update driver status. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    drivers,
    filteredDrivers,
    statusFilters,
    isLoading,
    handleFilterChange,
    applyFilters,
    clearFilters,
    handleAddDriver,
    handleUpdateDriver,
    handleDeleteDriver,
    handleDriverStatusChange,
    refreshDrivers: fetchDrivers,
  };
};

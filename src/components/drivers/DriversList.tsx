
import { Driver } from "@/types";
import DriverCard from "./DriverCard";

interface DriversListProps {
  drivers: Driver[];
  onViewProfile: (driver: Driver) => void;
  onDeleteDriver: (driverId: string) => void;
  onStatusChange: (driver: Driver, newStatus: 'available' | 'busy' | 'offline') => void;
}

const DriversList = ({ 
  drivers, 
  onViewProfile, 
  onDeleteDriver, 
  onStatusChange 
}: DriversListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {drivers.map((driver) => (
        <DriverCard
          key={driver.id}
          driver={driver}
          onViewProfile={onViewProfile}
          onDeleteDriver={onDeleteDriver}
          onStatusChange={onStatusChange}
        />
      ))}
      
      {drivers.length === 0 && (
        <div className="col-span-full text-center py-10 text-muted-foreground">
          No drivers found matching your criteria
        </div>
      )}
    </div>
  );
};

export default DriversList;

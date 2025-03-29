
import { Truck, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import DriverFilters from "./DriverFilters";

interface DriversHeaderProps {
  onAddDriverClick: () => void;
  statusFilters: {
    available: boolean;
    busy: boolean;
    offline: boolean;
  };
  onFilterChange: (status: string, checked: boolean) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  canManageDrivers: boolean;
}

const DriversHeader = ({
  onAddDriverClick,
  statusFilters,
  onFilterChange,
  onApplyFilters,
  onClearFilters,
  canManageDrivers,
}: DriversHeaderProps) => {
  return (
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
          onFilterChange={onFilterChange}
          onApplyFilters={onApplyFilters}
          onClearFilters={onClearFilters}
        />
        
        {canManageDrivers && (
          <Button
            onClick={onAddDriverClick}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Driver
          </Button>
        )}
      </div>
    </div>
  );
};

export default DriversHeader;

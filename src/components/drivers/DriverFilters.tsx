
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter } from "lucide-react";

interface DriverFiltersProps {
  statusFilters: Record<string, boolean>;
  onFilterChange: (status: string, checked: boolean) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

const DriverFilters = ({ 
  statusFilters, 
  onFilterChange, 
  onApplyFilters, 
  onClearFilters 
}: DriverFiltersProps) => {
  return (
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
                    onFilterChange(status, checked === true);
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
              onClick={onClearFilters}
            >
              Clear
            </Button>
            <Button size="sm" onClick={onApplyFilters}>Apply</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DriverFilters;

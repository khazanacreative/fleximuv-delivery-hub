
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter } from "lucide-react";

interface OrderFiltersProps {
  statusFilters: Record<string, boolean>;
  setStatusFilters: (filters: Record<string, boolean>) => void;
}

const OrderFilters = ({ statusFilters, setStatusFilters }: OrderFiltersProps) => {
  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
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
                    setStatusFilters({
                      ...statusFilters,
                      [status]: checked === true
                    });
                  }}
                />
                <Label htmlFor={status} className="text-sm capitalize">
                  {formatStatus(status)}
                </Label>
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setStatusFilters({
                pending: false,
                accepted: false,
                assigned: false,
                in_progress: false,
                completed: false,
                cancelled: false,
              })}
            >
              Clear
            </Button>
            <Button size="sm">Apply</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default OrderFilters;

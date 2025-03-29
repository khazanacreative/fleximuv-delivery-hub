
import { useCallback } from "react";
import { User, Phone, MapPin, Star, MoreHorizontal, Edit, UserX, UserCheck, Trash } from "lucide-react";
import { Driver } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DriverCardProps {
  driver: Driver;
  onViewProfile: (driver: Driver) => void;
  onDeleteDriver: (driverId: string) => void;
  onStatusChange: (driver: Driver, newStatus: 'available' | 'busy' | 'offline') => void;
}

const DriverCard = ({ 
  driver, 
  onViewProfile, 
  onDeleteDriver, 
  onStatusChange 
}: DriverCardProps) => {
  const { toast } = useToast();

  const getStatusColor = useCallback((status: string) => {
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
  }, []);

  return (
    <Card>
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
          onClick={() => onViewProfile(driver)}
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
            <DropdownMenuItem onClick={() => toast({
              title: "Edit Driver",
              description: "Edit driver functionality would be implemented here",
            })}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Details
            </DropdownMenuItem>
            
            {driver.status === 'offline' ? (
              <DropdownMenuItem onClick={() => onStatusChange(driver, 'available')}>
                <UserCheck className="h-4 w-4 mr-2" />
                Activate Driver
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => onStatusChange(driver, 'offline')}>
                <UserX className="h-4 w-4 mr-2" />
                Deactivate Driver
              </DropdownMenuItem>
            )}
            
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive"
              onClick={() => onDeleteDriver(driver.id)}
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete Driver
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

export default DriverCard;

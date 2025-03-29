
import { useCallback } from "react";
import { Star, User, Phone, MapPin, Truck, Share2 } from "lucide-react";
import { Driver } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DriverProfileDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDriver: Driver | null;
  onContactWhatsApp: (phone: string) => void;
  onShareLocation: (driver: Driver) => void;
}

const DriverProfileDialog = ({
  isOpen,
  onOpenChange,
  selectedDriver,
  onContactWhatsApp,
  onShareLocation,
}: DriverProfileDialogProps) => {
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

  if (!selectedDriver) return null;

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => {
        onOpenChange(open);
      }}
    >
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Driver Profile</DialogTitle>
          <DialogDescription>
            Detailed information about this driver
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{selectedDriver.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={getStatusColor(selectedDriver.status)}>
                  {selectedDriver.status}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{selectedDriver.rating}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Contact Information</h4>
              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedDriver.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedDriver.currentLocation || 'No location data'}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Vehicle Information</h4>
              <div className="space-y-2 mt-2">
                <div className="flex items-start gap-2">
                  <Truck className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p>{selectedDriver.vehicleType}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedDriver.licensePlate || selectedDriver.vehicleNumber || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-muted-foreground">Performance</h4>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div className="bg-muted/30 p-3 rounded-lg text-center">
                <p className="text-lg font-bold">{selectedDriver.completedOrders}</p>
                <p className="text-xs text-muted-foreground">Completed Orders</p>
              </div>
              <div className="bg-muted/30 p-3 rounded-lg text-center">
                <p className="text-lg font-bold">{selectedDriver.rating}</p>
                <p className="text-xs text-muted-foreground">Average Rating</p>
              </div>
              <div className="bg-muted/30 p-3 rounded-lg text-center">
                <p className="text-lg font-bold">{(Math.round(selectedDriver.completedOrders * 0.92)).toString()}</p>
                <p className="text-xs text-muted-foreground">On-Time Delivery</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <span className="text-sm text-muted-foreground">
              Driver since: {new Date(selectedDriver.createdAt).toLocaleDateString()}
            </span>
            <span className="text-sm font-medium">
              ID: {selectedDriver.id}
            </span>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={() => onContactWhatsApp(selectedDriver.phone)}>
            Contact via WhatsApp
          </Button>
          <Button 
            variant="secondary"
            onClick={() => onShareLocation(selectedDriver)}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share Location
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DriverProfileDialog;


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import LiveMap from "@/components/maps/LiveMap";
import { Order } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LocationMapProps {
  mapOpen: boolean;
  setMapOpen: (open: boolean) => void;
  selectedOrder: Order | null;
  handleShareLocation: (order: Order) => void;
}

const LocationMap = ({
  mapOpen,
  setMapOpen,
  selectedOrder,
  handleShareLocation,
}: LocationMapProps) => {
  if (!selectedOrder) return null;

  return (
    <Dialog 
      open={mapOpen} 
      onOpenChange={(open) => {
        setMapOpen(open);
        // Ensure we clean up properly when closing
        if (!open) {
          setTimeout(() => {
            // Short delay to ensure state is updated properly
          }, 100);
        }
      }}
    >
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Order Location</DialogTitle>
          <DialogDescription>
            {`Tracking Order #${selectedOrder.id.substring(0, 6)}`}
          </DialogDescription>
        </DialogHeader>
        <div className="h-[400px] w-full mb-8">
          <LiveMap title={`Order #${selectedOrder.id.substring(0, 6)} Tracking`} height="400px" />
        </div>
        <DialogFooter className="flex justify-between items-center mt-8 mb-2">
          <Button variant="outline" onClick={() => setMapOpen(false)}>
            Close
          </Button>
          <Button onClick={() => {
            handleShareLocation(selectedOrder);
            setMapOpen(false);
          }}>
            <Share2 className="mr-2 h-4 w-4" />
            Share to WhatsApp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LocationMap;

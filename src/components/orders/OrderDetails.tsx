
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/types";

interface OrderDetailsProps {
  viewOrderDetails: Order | null;
  setViewOrderDetails: (order: Order | null) => void;
  handleShareLocation: (order: Order) => void;
}

const OrderDetails = ({
  viewOrderDetails,
  setViewOrderDetails,
  handleShareLocation,
}: OrderDetailsProps) => {
  if (!viewOrderDetails) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'assigned':
        return 'bg-purple-100 text-purple-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-indigo-100 text-indigo-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase());
  };
  
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog 
      open={viewOrderDetails !== null} 
      onOpenChange={(open) => !open && setViewOrderDetails(null)}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>
            Complete information about this order
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-medium">#{viewOrderDetails.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge className={getStatusColor(viewOrderDetails.status)}>
                {formatStatus(viewOrderDetails.status)}
              </Badge>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Customer</p>
            <p className="font-medium">{viewOrderDetails.customer || viewOrderDetails.customerName}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-muted-foreground">Created Date</p>
              <p className="font-medium">{formatDate(viewOrderDetails.date || viewOrderDetails.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estimated Delivery</p>
              <p className="font-medium">{formatDate(viewOrderDetails.scheduledFor || new Date(new Date(viewOrderDetails.date || viewOrderDetails.createdAt).getTime() + 3600000))}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Items</p>
            <p className="font-medium">{viewOrderDetails.items ? viewOrderDetails.items.join(", ") : viewOrderDetails.serviceType}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-muted-foreground">Pickup Location</p>
              <p className="font-medium">{viewOrderDetails.pickup || viewOrderDetails.pickupAddress || "Jakarta"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Delivery Location</p>
              <p className="font-medium">{viewOrderDetails.destination || viewOrderDetails.deliveryAddress || "Bandung"}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Driver</p>
            <p className="font-medium">{viewOrderDetails.driver || (viewOrderDetails.driverId ? `Driver #${viewOrderDetails.driverId}` : "Unassigned")}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Notes</p>
            <p className="font-medium">{viewOrderDetails.notes || "No special instructions"}</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setViewOrderDetails(null)}>
            Close
          </Button>
          <Button onClick={() => {
            handleShareLocation(viewOrderDetails);
            setViewOrderDetails(null);
          }}>
            Share Tracking Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetails;

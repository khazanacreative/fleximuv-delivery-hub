
import { useState, useEffect } from "react";
import { Package, Plus, MapPin, Filter, ArrowUpDown, MoreHorizontal, Trash, Edit, Eye } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { mockOrders } from "@/data/mock-data";
import { Map } from "@/components/maps/LivePositionMap"; // Import the map component

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);
  const [open, setOpen] = useState(false);
  const [viewOrderDetails, setViewOrderDetails] = useState(null);
  const [mapOpen, setMapOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilters, setStatusFilters] = useState({
    pending: false,
    accepted: false,
    assigned: false,
    in_progress: false,
    completed: false,
    cancelled: false,
  });

  const isAdmin = user?.role === 'admin';
  const isPartner = user?.role === 'partner';
  const isDriver = user?.role === 'driver';

  useEffect(() => {
    if (Object.values(statusFilters).every(v => v === false)) {
      setFilteredOrders(orders);
    } else {
      const activeFilters = Object.keys(statusFilters).filter(key => statusFilters[key]);
      setFilteredOrders(orders.filter(order => activeFilters.includes(order.status)));
    }
  }, [statusFilters, orders]);

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

  const handleViewDetails = (order) => {
    setViewOrderDetails(order);
  };

  const handleShowLocation = (order) => {
    setSelectedOrder(order);
    setMapOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Package className="h-8 w-8" />
            Orders
          </h2>
          <p className="text-muted-foreground">
            Kelola semua pesanan pengiriman dan tetap bisa komunikasi dan memantau melalui notifikasi WhatsApp
          </p>
        </div>
        
        <div className="flex gap-2">
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
                    onClick={() => setStatusFilters(
                      Object.keys(statusFilters).reduce((acc, key) => ({ ...acc, [key]: false }), {})
                    )}
                  >
                    Clear
                  </Button>
                  <Button size="sm">Apply</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create Order
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Order</DialogTitle>
                <DialogDescription>
                  Enter the details for the new delivery order
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="customer" className="text-left">
                    Customer
                  </Label>
                  <Input id="customer" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="pickup" className="text-left">
                    Pickup
                  </Label>
                  <Input id="pickup" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="destination" className="text-left">
                    Destination
                  </Label>
                  <Input id="destination" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="items" className="text-left">
                    Items
                  </Label>
                  <Input id="items" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="driver" className="text-left">
                    Driver
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a driver" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="driver1">Agus Wahyudi</SelectItem>
                      <SelectItem value="driver2">Budi Santoso</SelectItem>
                      <SelectItem value="driver3">Candra Wijaya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  // Add new order logic here
                  setOpen(false);
                }}>
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Date <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id.substring(0, 6)}</TableCell>
                <TableCell>{order.customer || order.customerName}</TableCell>
                <TableCell>{new Date(order.date || order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{order.items ? order.items.join(", ") : order.serviceType}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(order.status)}>
                    {formatStatus(order.status)}
                  </Badge>
                </TableCell>
                <TableCell>{order.driver || (order.driverId ? `Driver #${order.driverId}` : "Unassigned")}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleViewDetails(order)}>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShowLocation(order)}>
                        <MapPin className="mr-2 h-4 w-4" /> View Location
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" /> Edit Order
                      </DropdownMenuItem>
                      {(isAdmin || isPartner) && (
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" /> Cancel Order
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={viewOrderDetails !== null} onOpenChange={(open) => !open && setViewOrderDetails(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Complete information about this order
            </DialogDescription>
          </DialogHeader>
          {viewOrderDetails && (
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
                  <p className="font-medium">{new Date(viewOrderDetails.date || viewOrderDetails.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                  <p className="font-medium">{new Date(viewOrderDetails.date || viewOrderDetails.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Items</p>
                <p className="font-medium">{viewOrderDetails.items ? viewOrderDetails.items.join(", ") : viewOrderDetails.serviceType}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-muted-foreground">Pickup Location</p>
                  <p className="font-medium">{viewOrderDetails.pickup || "Jakarta"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Delivery Location</p>
                  <p className="font-medium">{viewOrderDetails.destination || "Bandung"}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Driver</p>
                <p className="font-medium">{viewOrderDetails.driver || (viewOrderDetails.driverId ? `Driver #${viewOrderDetails.driverId}` : "Unassigned")}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewOrderDetails(null)}>
              Close
            </Button>
            <Button onClick={() => {
              // Handle further actions
              setViewOrderDetails(null);
            }}>
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Map Dialog */}
      <Dialog open={mapOpen} onOpenChange={setMapOpen}>
        <DialogContent className="sm:max-w-[700px] h-[600px]">
          <DialogHeader>
            <DialogTitle>Order Location</DialogTitle>
            <DialogDescription>
              {selectedOrder && `Tracking Order #${selectedOrder.id.substring(0, 6)}`}
            </DialogDescription>
          </DialogHeader>
          <div className="h-[450px] w-full">
            {selectedOrder && (
              <div className="h-full border rounded-md">
                <div className="p-6 text-center">
                  <p className="text-muted-foreground">Map view would appear here with location markers</p>
                  <p className="mt-2">
                    <Badge className={getStatusColor(selectedOrder.status)}>
                      {formatStatus(selectedOrder.status)}
                    </Badge>
                  </p>
                  <div className="mt-4 flex justify-between px-8">
                    <div className="text-left">
                      <p className="text-sm text-muted-foreground">Pickup</p>
                      <p className="font-medium">{selectedOrder.pickup || "Jakarta"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Destination</p>
                      <p className="font-medium">{selectedOrder.destination || "Bandung"}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMapOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;

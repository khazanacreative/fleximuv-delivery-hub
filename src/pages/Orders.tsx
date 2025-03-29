
import { useState, useEffect, useCallback } from "react";
import { Package, Plus, MapPin, Filter, ArrowUpDown, MoreHorizontal, Trash, Edit, Eye, Share2, Check } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { usePermissions } from "@/hooks/use-permissions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
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
import LiveMap from "@/components/maps/LiveMap";
import RoleGate from "@/components/permissions/RoleGate";
import { Order, OrderStatus } from "@/types";

const Orders = () => {
  const { user } = useAuth();
  const { can, isAdmin, isPartner, isDriver } = usePermissions();
  const { toast } = useToast();
  const [orders, setOrders] = useState(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);
  const [open, setOpen] = useState(false);
  const [viewOrderDetails, setViewOrderDetails] = useState(null);
  const [mapOpen, setMapOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [partnerForOrder, setPartnerForOrder] = useState("");
  const [statusFilters, setStatusFilters] = useState({
    pending: false,
    accepted: false,
    assigned: false,
    in_progress: false,
    completed: false,
    cancelled: false,
  });

  const applyFilters = useCallback(() => {
    let permissionFiltered = orders;
    
    if (!isAdmin) {
      if (isPartner && user?.hasDrivers) {
        permissionFiltered = orders.filter(order => 
          !order.partnerId || order.partnerId === user?.id
        );
      } else if (isPartner && !user?.hasDrivers) {
        permissionFiltered = orders.filter(order => 
          order.customerId === user?.id
        );
      } else if (isDriver) {
        permissionFiltered = orders.filter(order => 
          !order.partnerId || order.partnerId === user?.id || order.driverId === user?.id
        );
      }
    }
    
    if (Object.values(statusFilters).every(v => v === false)) {
      setFilteredOrders(permissionFiltered);
    } else {
      const activeFilters = Object.keys(statusFilters).filter(key => statusFilters[key]);
      setFilteredOrders(permissionFiltered.filter(order => activeFilters.includes(order.status)));
    }
  }, [statusFilters, orders, isAdmin, isPartner, isDriver, user]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

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

  const handleViewDetails = (order) => {
    setViewOrderDetails({...order});
  };

  const handleShowLocation = (order) => {
    setSelectedOrder({...order});
    setMapOpen(true);
  };

  const handleShareLocation = (order) => {
    toast({
      title: "Link Generated",
      description: "Live tracking link has been copied. Ready to share via WhatsApp.",
    });
    
    const trackingUrl = `https://track.example.com/order/${order.id}`;
    window.open(`https://wa.me/?text=Track your order here: ${trackingUrl}`, '_blank');
  };

  const canEditOrder = (status) => {
    return status === 'pending';
  };

  const handleCancelOrder = (order) => {
    if (order.status !== 'pending') {
      toast({
        title: "Cannot Cancel Order",
        description: "Only pending orders can be cancelled.",
      });
      return;
    }

    setOrders(prev => prev.filter(o => o.id !== order.id));
    
    toast({
      title: "Order Cancelled",
      description: "The order has been successfully cancelled and removed from the list.",
    });
  };

  const handleAcceptOrder = (order) => {
    const updatedOrder = {
      ...order,
      status: 'accepted',
      partnerId: user?.id || order.partnerId
    };
    
    setOrders(prev => 
      prev.map(o => o.id === order.id ? updatedOrder : o)
    );
    
    toast({
      title: "Order Accepted",
      description: "You have successfully accepted this order.",
    });
  };

  const handleCreateOrder = () => {
    // Create new order
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      customerName: "New Customer",
      customerId: user?.id || "",
      partnerId: partnerForOrder || "",
      status: "pending" as OrderStatus,
      createdAt: new Date(),
      amount: Math.floor(Math.random() * 100) + 10,
      serviceType: "Standard Delivery",
      pickupAddress: "123 Pickup St",
      deliveryAddress: "456 Delivery Ave",
    };
    
    setOrders(prev => [newOrder, ...prev]);
    
    setOpen(false);
    toast({
      title: "Order Created",
      description: partnerForOrder 
        ? "New order has been created and assigned to the selected partner" 
        : "New order has been created and is available for all partners"
    });
    
    setPartnerForOrder("");
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
            Manage all delivery orders and stay connected through WhatsApp notifications
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
          
          <RoleGate permissions={['create_orders']}>
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
                    <Label htmlFor="pickupTime" className="text-left">
                      Pickup Time
                    </Label>
                    <Input id="pickupTime" type="datetime-local" className="col-span-3" />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="partner" className="text-left">
                      Assign to Partner
                    </Label>
                    <Select value={partnerForOrder} onValueChange={setPartnerForOrder}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Leave unassigned for all partners" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Leave unassigned (all partners can see)</SelectItem>
                        <SelectItem value="partner1">AgungCargo Express</SelectItem>
                        <SelectItem value="partner2">FastWheels Delivery</SelectItem>
                        <SelectItem value="partner3">Wira Logistics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateOrder}>
                    Create
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </RoleGate>
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
                <TableCell>{formatDate(order.date || order.createdAt)}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleShareLocation(order)}>
                        <Share2 className="mr-2 h-4 w-4" /> Share to WhatsApp
                      </DropdownMenuItem>
                      
                      <RoleGate permissions={['edit_orders']}>
                        <DropdownMenuItem 
                          disabled={!canEditOrder(order.status)}
                          className={!canEditOrder(order.status) ? "opacity-50 cursor-not-allowed" : ""}
                          onClick={() => {
                            if (canEditOrder(order.status)) {
                              toast({
                                title: "Edit Order",
                                description: "Editing functionality would open here",
                              });
                            }
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" /> Edit Order
                        </DropdownMenuItem>
                      </RoleGate>
                      
                      <RoleGate permissions={['accept_orders']}>
                        {order.status === 'pending' && (!order.partnerId || order.partnerId === user?.id) && (
                          <DropdownMenuItem onClick={() => handleAcceptOrder(order)}>
                            <Check className="mr-2 h-4 w-4" /> Accept Order
                          </DropdownMenuItem>
                        )}
                      </RoleGate>
                      
                      <RoleGate permissions={['cancel_orders']}>
                        {canEditOrder(order.status) && (
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => handleCancelOrder(order)}
                          >
                            <Trash className="mr-2 h-4 w-4" /> Cancel Order
                          </DropdownMenuItem>
                        )}
                      </RoleGate>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

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
          )}
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

      <Dialog open={mapOpen} onOpenChange={setMapOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Order Location</DialogTitle>
            <DialogDescription>
              {selectedOrder && `Tracking Order #${selectedOrder.id.substring(0, 6)}`}
            </DialogDescription>
          </DialogHeader>
          <div className="h-[450px] w-full">
            {selectedOrder && (
              <LiveMap title={`Order #${selectedOrder.id.substring(0, 6)} Tracking`} height="450px" />
            )}
          </div>
          <DialogFooter className="flex justify-between items-center">
            <Button variant="outline" onClick={() => setMapOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              handleShareLocation(selectedOrder);
            }}>
              <Share2 className="mr-2 h-4 w-4" />
              Share to WhatsApp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;

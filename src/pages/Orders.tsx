
import { useState, useEffect, useCallback } from "react";
import { Package, Plus } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { usePermissions } from "@/hooks/use-permissions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import RoleGate from "@/components/permissions/RoleGate";
import { mockOrders } from "@/data/mock-data";
import { Order, OrderStatus } from "@/types";

// Import newly created components
import OrdersTable from "@/components/orders/OrdersTable";
import OrderDetails from "@/components/orders/OrderDetails";
import OrderForm from "@/components/orders/OrderForm";
import LocationMap from "@/components/orders/LocationMap";
import OrderFilters from "@/components/orders/OrderFilters";

const Orders = () => {
  const { user } = useAuth();
  const { can, isAdmin, isPartner, isDriver } = usePermissions();
  const { toast } = useToast();
  const [orders, setOrders] = useState(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);
  const [viewOrderDetails, setViewOrderDetails] = useState(null);
  const [mapOpen, setMapOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [createOrderOpen, setCreateOrderOpen] = useState(false);
  const [statusFilters, setStatusFilters] = useState({
    pending: false,
    accepted: false,
    assigned: false,
    in_progress: false,
    completed: false,
    cancelled: false,
  });

  // Load orders from localStorage on component mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('fleximov_orders');
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);
        setOrders(parsedOrders);
        setFilteredOrders(parsedOrders);
      } catch (error) {
        console.error("Error parsing saved orders:", error);
      }
    }
  }, []);

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

  const handleCancelOrder = (order) => {
    if (order.status !== 'pending') {
      toast({
        title: "Cannot Cancel Order",
        description: "Only pending orders can be cancelled.",
      });
      return;
    }

    const updatedOrders = orders.filter(o => o.id !== order.id);
    setOrders(updatedOrders);
    
    // Save to localStorage for persistence
    localStorage.setItem('fleximov_orders', JSON.stringify(updatedOrders));
    
    toast({
      title: "Order Cancelled",
      description: "The order has been successfully cancelled and removed from the list.",
    });
  };

  const handleAcceptOrder = (order) => {
    const updatedOrder = {
      ...order,
      status: 'accepted' as OrderStatus,
      partnerId: user?.id || order.partnerId
    };
    
    const updatedOrders = orders.map(o => o.id === order.id ? updatedOrder : o);
    setOrders(updatedOrders);
    
    // Save to localStorage for persistence
    localStorage.setItem('fleximov_orders', JSON.stringify(updatedOrders));
    
    toast({
      title: "Order Accepted",
      description: "You have successfully accepted this order.",
    });
  };

  const generateOrderNumber = () => {
    // Generate a unique order number format: FLX-YYYYMMDD-XXXX
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    
    return `FLX-${year}${month}${day}-${random}`;
  };

  const handleAddOrder = (newOrderData: any) => {
    // Create a new order with generated ID and order number
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: generateOrderNumber(),
      customerName: newOrderData.customerName,
      customerId: user?.id || "",
      customerPhone: newOrderData.customerPhone,
      partnerId: "",
      pickupAddress: newOrderData.pickupAddress,
      deliveryAddress: newOrderData.deliveryAddress,
      packageDetails: newOrderData.packageDetails,
      deliveryNotes: newOrderData.deliveryNotes,
      status: 'pending' as OrderStatus,
      createdAt: new Date(),
      updatedAt: new Date(),
      scheduledFor: newOrderData.scheduledDate ? new Date(newOrderData.scheduledDate) : undefined,
      amount: parseFloat(newOrderData.amount) || 0,
      serviceType: newOrderData.serviceType,
      paymentMethod: newOrderData.paymentMethod,
      paymentStatus: 'pending',
      notes: newOrderData.notes || "",
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    
    // Save to localStorage for persistence
    localStorage.setItem('fleximov_orders', JSON.stringify(updatedOrders));
    
    toast({
      title: "Order Created",
      description: `New order #${newOrder.orderNumber} has been successfully created.`,
    });
    
    // Close the dialog after order creation
    setCreateOrderOpen(false);
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
          <OrderFilters 
            statusFilters={statusFilters}
            setStatusFilters={setStatusFilters}
          />
          
          <RoleGate permissions={['create_orders']}>
            <Button
              onClick={() => setCreateOrderOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Order
            </Button>
          </RoleGate>
        </div>
      </div>

      <OrdersTable 
        filteredOrders={filteredOrders}
        handleViewDetails={handleViewDetails}
        handleShowLocation={handleShowLocation}
        handleShareLocation={handleShareLocation}
        handleAcceptOrder={handleAcceptOrder}
        handleCancelOrder={handleCancelOrder}
      />

      <OrderDetails 
        viewOrderDetails={viewOrderDetails}
        setViewOrderDetails={setViewOrderDetails}
        handleShareLocation={handleShareLocation}
      />

      <LocationMap 
        mapOpen={mapOpen}
        setMapOpen={setMapOpen}
        selectedOrder={selectedOrder}
        handleShareLocation={handleShareLocation}
      />
      
      <OrderForm 
        isOpen={createOrderOpen}
        onOpenChange={setCreateOrderOpen}
        addOrder={handleAddOrder}
      />
    </div>
  );
};

export default Orders;

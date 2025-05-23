
import { useState, useEffect, useCallback } from "react";
import { Package, Plus, Coins } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { usePermissions } from "@/hooks/use-permissions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import RoleGate from "@/components/permissions/RoleGate";
import { mockOrders } from "@/data/mock-data";
import { Order, OrderStatus } from "@/types";

// Import components
import OrdersTable from "@/components/orders/OrdersTable";
import OrderDetails from "@/components/orders/OrderDetails";
import OrderForm from "@/components/orders/OrderForm";
import LocationMap from "@/components/orders/LocationMap";
import OrderFilters from "@/components/orders/OrderFilters";
import DriverOrdersContent from "@/components/drivers/DriverOrdersContent";

const Orders = () => {
  const { user } = useAuth();
  const { can, isAdmin, isPartner, isDriver, isFleetPartner, isIndependentCourier, isBusinessPartner } = usePermissions();
  const { toast } = useToast();
  const [orders, setOrders] = useState(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);
  const [viewOrderDetails, setViewOrderDetails] = useState(null);
  const [mapOpen, setMapOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [createOrderOpen, setCreateOrderOpen] = useState(false);
  const [editOrderOpen, setEditOrderOpen] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState<Order | null>(null);
  const [statusFilters, setStatusFilters] = useState({
    pending: false,
    accepted: false,
    assigned: false,
    in_progress: false,
    completed: false,
    cancelled: false,
  });

  useEffect(() => {
    const savedOrders = localStorage.getItem('fleximuv_orders');
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
      if (isFleetPartner) {
        permissionFiltered = orders.filter(order => 
          !order.partnerId || order.partnerId === user?.id
        );
      } else if (isPartner && !user?.hasDrivers) {
        permissionFiltered = orders.filter(order => 
          order.customerId === user?.id
        );
      } else if (isDriver) {
        if (isIndependentCourier) {
          permissionFiltered = orders.filter(order => 
            !order.partnerId || order.partnerId === user?.id || order.driverId === user?.id
          );
        } else {
          permissionFiltered = orders.filter(order => 
            order.driverId === user?.id
          );
        }
      }
    }
    
    if (Object.values(statusFilters).every(v => v === false)) {
      setFilteredOrders(permissionFiltered);
    } else {
      const activeFilters = Object.keys(statusFilters).filter(key => statusFilters[key]);
      setFilteredOrders(permissionFiltered.filter(order => activeFilters.includes(order.status)));
    }
  }, [statusFilters, orders, isAdmin, isPartner, isDriver, isFleetPartner, isIndependentCourier, user]);

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
    if (order.trackingCode) {
      const baseUrl = window.location.origin;
      const trackingUrl = `${baseUrl}/track/${order.trackingCode}`;
      window.open(`https://wa.me/?text=Track your order here: ${trackingUrl}`, '_blank');
      
      toast({
        title: "Link Shared",
        description: "Tracking link has been shared via WhatsApp",
      });
    } else {
      toast({
        title: "Link Generated",
        description: "Live tracking link has been copied. Ready to share via WhatsApp.",
      });
      
      const trackingUrl = `https://track.example.com/order/${order.id}`;
      window.open(`https://wa.me/?text=Track your order here: ${trackingUrl}`, '_blank');
    }
  };

  const handleCancelOrder = (order) => {
    if (order.status !== 'pending') {
      toast({
        title: "Cannot Cancel Order",
        description: "Only pending orders can be cancelled.",
      });
      return;
    }

    const updatedOrder = { ...order, status: 'cancelled' as OrderStatus };
    const updatedOrders = orders.map(o => o.id === order.id ? updatedOrder : o);
    setOrders(updatedOrders);
    
    localStorage.setItem('fleximuv_orders', JSON.stringify(updatedOrders));
    
    toast({
      title: "Order Cancelled",
      description: "The order has been successfully cancelled.",
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
    
    localStorage.setItem('fleximuv_orders', JSON.stringify(updatedOrders));
    
    toast({
      title: "Order Accepted",
      description: "You have successfully accepted this order.",
    });
  };

  const handleAddOrder = (newOrderData: any) => {
    const updatedOrders = [newOrderData, ...orders];
    setOrders(updatedOrders);
    
    localStorage.setItem('fleximuv_orders', JSON.stringify(updatedOrders));
    
    toast({
      title: "Order Created",
      description: `New order #${newOrderData.orderNumber} has been successfully created.`,
    });
    
    applyFilters();
  };

  const handleEditOrder = (order: Order) => {
    if (order.status !== 'pending') {
      toast({
        title: "Cannot Edit Order",
        description: "Only pending orders can be edited.",
      });
      return;
    }
    
    setOrderToEdit({...order});
    setEditOrderOpen(true);
  };

  const handleUpdateOrder = (updatedOrder: Order) => {
    const updatedOrders = orders.map(o => 
      o.id === updatedOrder.id ? updatedOrder : o
    );
    
    setOrders(updatedOrders);
    localStorage.setItem('fleximuv_orders', JSON.stringify(updatedOrders));
    
    toast({
      title: "Order Updated",
      description: `Order #${updatedOrder.orderNumber || updatedOrder.id.substring(0, 6)} has been updated successfully.`,
    });
    
    setEditOrderOpen(false);
    setOrderToEdit(null);
    applyFilters();
  };

  return (
    <div className="space-y-6">
      {isDriver && !isIndependentCourier ? (
        <div className="space-y-8">
          <DriverOrdersContent />
        </div>
      ) : (
        <>
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
              
              {(isAdmin || isPartner) && (
                <Button
                  onClick={() => setCreateOrderOpen(true)}
                  className="flex items-center gap-2 px-5 py-2 h-11"
                  size="lg"
                >
                  <Plus className="h-5 w-5" />
                  Create Order
                </Button>
              )}

              {isPartner && (
                <Button
                  onClick={() => window.location.href = '/finances?tab=top-up'}
                  className="flex items-center gap-2 px-5 py-2 h-11 bg-fleximuv-500 hover:bg-fleximuv-600"
                  size="lg"
                >
                  <Coins className="h-5 w-5" />
                  Top Up Tokens
                </Button>
              )}
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
        </>
      )}

      <OrderDetails 
        viewOrderDetails={viewOrderDetails}
        setViewOrderDetails={setViewOrderDetails}
        handleShareLocation={handleShareLocation}
        handleEditOrder={handleEditOrder}
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
        orderToEdit={null}
        updateOrder={null}
      />

      <OrderForm 
        isOpen={editOrderOpen}
        onOpenChange={setEditOrderOpen}
        addOrder={handleAddOrder}
        orderToEdit={orderToEdit}
        updateOrder={handleUpdateOrder}
      />
    </div>
  );
};

export default Orders;

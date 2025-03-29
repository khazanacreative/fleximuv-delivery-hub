
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertCircle, Check, Truck, Package, MapPin, Share2 } from 'lucide-react';
import LiveMap from '@/components/maps/LiveMap';
import { Order } from '@/types';

const OrderTracker = () => {
  const { trackingCode } = useParams();
  const { toast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call to your backend
        // For now, we'll use localStorage
        const savedOrders = localStorage.getItem('fleximov_orders');
        if (savedOrders) {
          const orders = JSON.parse(savedOrders);
          const foundOrder = orders.find(
            (order: Order) => order.trackingCode === trackingCode
          );
          
          if (foundOrder) {
            setOrder(foundOrder);
          } else {
            setError('Order not found. Please check your tracking code.');
          }
        } else {
          setError('No orders found in the system.');
        }
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('An error occurred while fetching the order.');
      } finally {
        setLoading(false);
      }
    };

    if (trackingCode) {
      fetchOrder();
    }
  }, [trackingCode]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'accepted':
        return <Check className="h-5 w-5 text-blue-500" />;
      case 'assigned':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'in_progress':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'completed':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

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

  const formatDate = (date: Date | string) => {
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

  const handleShareLocation = () => {
    if (!order) return;
    
    const currentUrl = window.location.href;
    const whatsappUrl = `https://wa.me/?text=Track my delivery here: ${currentUrl}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Link Shared",
      description: "Tracking link has been shared via WhatsApp",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen px-4">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-center mb-2">Order Not Found</h1>
        <p className="text-muted-foreground text-center mb-6">{error}</p>
        <Button asChild>
          <a href="/">Return to Home</a>
        </Button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col justify-center items-center h-screen px-4">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-center mb-2">Order Not Found</h1>
        <p className="text-muted-foreground text-center mb-6">We couldn't find an order with this tracking code.</p>
        <Button asChild>
          <a href="/">Return to Home</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 max-w-3xl">
      <Card className="shadow-lg">
        <CardHeader className="border-b">
          <CardTitle className="flex justify-between items-center">
            <span>Order #{order.orderNumber}</span>
            <Badge className={getStatusColor(order.status)}>
              {formatStatus(order.status)}
            </Badge>
          </CardTitle>
          <CardDescription>
            Tracking Code: {trackingCode}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Created Date</h3>
                <p className="text-base">{formatDate(order.createdAt)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Estimated Delivery</h3>
                <p className="text-base">
                  {order.scheduledFor 
                    ? formatDate(order.scheduledFor) 
                    : formatDate(new Date(new Date(order.createdAt).getTime() + 3600000))}
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Package Details</h3>
              <p className="text-base">{order.packageDetails || order.serviceType}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">Pickup Address</h3>
                <p className="text-base flex items-start">
                  <MapPin className="h-4 w-4 mr-1 mt-1 flex-shrink-0" />
                  <span>{order.pickupAddress}</span>
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">Delivery Address</h3>
                <p className="text-base flex items-start">
                  <MapPin className="h-4 w-4 mr-1 mt-1 flex-shrink-0" />
                  <span>{order.deliveryAddress}</span>
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Live Location</h3>
              <div className="h-[300px] rounded-md overflow-hidden border">
                <LiveMap title={`Order #${order.orderNumber} Tracking`} height="300px" />
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Delivery Status</h3>
              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-muted"></div>
                <div className="space-y-8 relative">
                  <StatusStep 
                    title="Order Created" 
                    description={`Your order has been received`}
                    time={formatDate(order.createdAt)}
                    isCompleted={true}
                  />
                  <StatusStep 
                    title="Order Accepted" 
                    description="Your order has been accepted by courier"
                    time={order.status !== 'pending' ? "Completed" : "Waiting"}
                    isCompleted={order.status !== 'pending'}
                  />
                  <StatusStep 
                    title="Driver Assigned" 
                    description="A driver has been assigned to your order"
                    time={['assigned', 'in_progress', 'completed'].includes(order.status) ? "Completed" : "Waiting"}
                    isCompleted={['assigned', 'in_progress', 'completed'].includes(order.status)}
                  />
                  <StatusStep 
                    title="In Progress" 
                    description="Your order is being delivered"
                    time={['in_progress', 'completed'].includes(order.status) ? "Completed" : "Waiting"}
                    isCompleted={['in_progress', 'completed'].includes(order.status)}
                  />
                  <StatusStep 
                    title="Delivered" 
                    description="Your order has been delivered"
                    time={order.status === 'completed' ? formatDate(order.completedAt || new Date()) : "Waiting"}
                    isCompleted={order.status === 'completed'}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="border-t flex justify-between">
          <p className="text-sm text-muted-foreground">
            Thank you for using our delivery service
          </p>
          <Button onClick={handleShareLocation} size="sm" variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

interface StatusStepProps {
  title: string;
  description: string;
  time: string;
  isCompleted: boolean;
}

const StatusStep = ({ title, description, time, isCompleted }: StatusStepProps) => {
  return (
    <div className="relative pl-10">
      <div className={`absolute left-0 -translate-x-1/2 p-1 rounded-full ${
        isCompleted ? 'bg-primary text-white' : 'bg-muted border border-input'
      }`}>
        {isCompleted ? (
          <Check className="h-4 w-4" />
        ) : (
          <div className="h-4 w-4" />
        )}
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className={`text-xs ${isCompleted ? 'text-primary' : 'text-muted-foreground'}`}>
          {time}
        </p>
      </div>
    </div>
  );
};

export default OrderTracker;


import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Order } from '@/types';

interface OrderFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  addOrder: (order: Order) => void;
}

const OrderForm = ({ isOpen, onOpenChange, addOrder }: OrderFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    pickupAddress: '',
    deliveryAddress: '',
    packageDetails: '',
    deliveryNotes: '',
    paymentMethod: 'cash',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const orderNumber = `FLX-${Math.floor(Math.random() * 90000) + 10000}`;
      
      const newOrder: Order = {
        id: `order-${Date.now()}`,
        orderNumber: orderNumber,
        customerId: user?.id || '',
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        partnerId: user?.role === 'partner' ? user?.id : '',
        driverId: '',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        pickupAddress: formData.pickupAddress,
        deliveryAddress: formData.deliveryAddress,
        packageDetails: formData.packageDetails,
        deliveryNotes: formData.deliveryNotes,
        paymentMethod: formData.paymentMethod,
        paymentStatus: 'pending',
        amount: Math.floor(Math.random() * 50) + 10,
        serviceType: formData.packageDetails || 'General Delivery'
      };
      
      addOrder(newOrder);
      
      toast({
        title: "Order Created",
        description: `Order ${newOrder.orderNumber} has been created successfully.`,
      });

      // Reset form
      setFormData({
        customerName: '',
        customerPhone: '',
        pickupAddress: '',
        deliveryAddress: '',
        packageDetails: '',
        deliveryNotes: '',
        paymentMethod: 'cash',
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Error",
        description: "Failed to create order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new delivery order
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="Customer name"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="customerPhone">Customer Phone</Label>
                <Input
                  id="customerPhone"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  placeholder="Customer phone number"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="pickupAddress">Pickup Address</Label>
                <Textarea
                  id="pickupAddress"
                  name="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  placeholder="Pickup address"
                  required
                  rows={2}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="deliveryAddress">Delivery Address</Label>
                <Textarea
                  id="deliveryAddress"
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  placeholder="Delivery address"
                  required
                  rows={2}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="packageDetails">Package Details</Label>
                <Input
                  id="packageDetails"
                  name="packageDetails"
                  value={formData.packageDetails}
                  onChange={handleChange}
                  placeholder="Package details"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="deliveryNotes">Delivery Notes</Label>
                <Textarea
                  id="deliveryNotes"
                  name="deliveryNotes"
                  value={formData.deliveryNotes}
                  onChange={handleChange}
                  placeholder="Delivery notes"
                  rows={2}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleSelectChange('paymentMethod', value)}
                >
                  <SelectTrigger id="paymentMethod">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash on Delivery</SelectItem>
                    <SelectItem value="online">Online Payment</SelectItem>
                    <SelectItem value="wallet">Wallet Balance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Order"}
              </Button>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default OrderForm;

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { usePermissions } from '@/hooks/use-permissions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Copy } from 'lucide-react';
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
import { Order, Driver, User } from '@/types';
import { Switch } from '@/components/ui/switch';
import { mockUsers } from '@/data/mock-data';

interface OrderFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  addOrder: (order: Order) => void;
  orderToEdit: Order | null;
  updateOrder: ((order: Order) => void) | null;
}

const OrderForm = ({ isOpen, onOpenChange, addOrder, orderToEdit, updateOrder }: OrderFormProps) => {
  const { user } = useAuth();
  const { isFleetPartner, isIndependentCourier, isBusinessPartner } = usePermissions();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isGuestOrder, setIsGuestOrder] = useState(false);
  const [availableDrivers, setAvailableDrivers] = useState<Driver[]>([]);
  const [availablePartners, setAvailablePartners] = useState<User[]>([]);
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [selectedPartnerId, setSelectedPartnerId] = useState('');
  const [trackingLink, setTrackingLink] = useState('');
  const [showTrackingLink, setShowTrackingLink] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    pickupAddress: '',
    deliveryAddress: '',
    packageDetails: '',
    deliveryNotes: '',
    paymentMethod: 'cash',
  });
  
  const isEditMode = Boolean(orderToEdit && updateOrder);

  useEffect(() => {
    if (isEditMode && orderToEdit) {
      setFormData({
        customerName: orderToEdit.customerName || orderToEdit.customer || '',
        customerPhone: orderToEdit.customerPhone || '',
        customerEmail: orderToEdit.customerEmail || '',
        pickupAddress: orderToEdit.pickupAddress || '',
        deliveryAddress: orderToEdit.deliveryAddress || '',
        packageDetails: orderToEdit.packageDetails || '',
        deliveryNotes: orderToEdit.deliveryNotes || orderToEdit.notes || '',
        paymentMethod: orderToEdit.paymentMethod || 'cash',
      });
      setIsGuestOrder(orderToEdit.isGuestOrder || false);
      setSelectedDriverId(orderToEdit.driverId || '');
      setSelectedPartnerId(orderToEdit.partnerId || '');
    } else {
      resetForm();
    }
  }, [orderToEdit, isEditMode, isOpen]);

  useEffect(() => {
    if (isFleetPartner || isIndependentCourier) {
      const savedDrivers = localStorage.getItem('fleximov_drivers');
      if (savedDrivers) {
        try {
          const parsedDrivers = JSON.parse(savedDrivers);
          const filteredDrivers = parsedDrivers.filter(
            (driver: Driver) => 
              (driver.partnerId === user?.id || (isIndependentCourier && driver.id === user?.id)) && 
              driver.status === 'available'
          );
          setAvailableDrivers(filteredDrivers);
        } catch (error) {
          console.error("Error parsing saved drivers:", error);
        }
      }
    }
    
    if (isBusinessPartner) {
      try {
        const independentCouriers = mockUsers.filter(
          u => u.role === 'partner' && u.partnerType === 'courier'
        );
        setAvailablePartners(independentCouriers);
      } catch (error) {
        console.error("Error loading available partners:", error);
      }
    }
  }, [isFleetPartner, isIndependentCourier, isBusinessPartner, user, isOpen]);

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

  const generateOrderNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(1000 + Math.random() * 9000);
    return `FLX-${year}${month}${day}-${random}`;
  };

  const generateTrackingCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const effectivePartnerId = isBusinessPartner && selectedPartnerId 
        ? selectedPartnerId 
        : (user?.role === 'partner' ? user?.id : '');
      
      if (isEditMode && orderToEdit && updateOrder) {
        const updatedOrder: Order = {
          ...orderToEdit,
          customerName: formData.customerName,
          customerPhone: formData.customerPhone,
          customerEmail: formData.customerEmail,
          partnerId: effectivePartnerId,
          driverId: selectedDriverId,
          status: selectedDriverId && orderToEdit.status === 'pending' ? 'assigned' : orderToEdit.status,
          updatedAt: new Date(),
          pickupAddress: formData.pickupAddress,
          deliveryAddress: formData.deliveryAddress,
          packageDetails: formData.packageDetails,
          deliveryNotes: formData.deliveryNotes,
          paymentMethod: formData.paymentMethod,
          isGuestOrder: isGuestOrder,
        };
        
        updateOrder(updatedOrder);
        toast({
          title: "Order Updated",
          description: `Order ${updatedOrder.orderNumber || updatedOrder.id.substring(0, 6)} has been updated successfully.`,
        });
        
        resetForm();
        onOpenChange(false);
      } else {
        const orderNumber = generateOrderNumber();
        const trackingCode = generateTrackingCode();
        
        const newOrder: Order = {
          id: `order-${Date.now()}`,
          orderNumber: orderNumber,
          customerId: isGuestOrder ? '' : user?.id || '',
          customerName: formData.customerName,
          customerPhone: formData.customerPhone,
          customerEmail: formData.customerEmail,
          partnerId: effectivePartnerId,
          driverId: selectedDriverId,
          status: selectedDriverId ? 'assigned' : 'pending',
          createdAt: new Date(),
          updatedAt: new Date(),
          pickupAddress: formData.pickupAddress,
          deliveryAddress: formData.deliveryAddress,
          packageDetails: formData.packageDetails,
          deliveryNotes: formData.deliveryNotes,
          paymentMethod: formData.paymentMethod,
          paymentStatus: 'pending',
          amount: Math.floor(Math.random() * 50) + 10,
          serviceType: formData.packageDetails || 'General Delivery',
          trackingCode: trackingCode,
          isGuestOrder: isGuestOrder,
        };
        
        addOrder(newOrder);
        
        if (isGuestOrder) {
          const baseUrl = window.location.origin;
          const link = `${baseUrl}/track/${trackingCode}`;
          setTrackingLink(link);
          setShowTrackingLink(true);
        } else {
          onOpenChange(false);
        }
        
        toast({
          title: "Order Created",
          description: `Order ${newOrder.orderNumber} has been created successfully.`,
        });

        if (!isGuestOrder) {
          resetForm();
        }
      }
    } catch (error) {
      console.error('Error processing order:', error);
      toast({
        title: "Error",
        description: "Failed to process order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      pickupAddress: '',
      deliveryAddress: '',
      packageDetails: '',
      deliveryNotes: '',
      paymentMethod: 'cash',
    });
    setIsGuestOrder(false);
    setSelectedDriverId('');
    setSelectedPartnerId('');
    setShowTrackingLink(false);
    setTrackingLink('');
    setIsLoading(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(trackingLink);
    toast({
      title: "Link Copied",
      description: "Tracking link has been copied to clipboard",
    });
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=Track your order here: ${trackingLink}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh]">
        {!showTrackingLink ? (
          <>
            <DialogHeader>
              <DialogTitle>{isEditMode ? "Edit Order" : "Create New Order"}</DialogTitle>
              <DialogDescription>
                {isEditMode ? "Update the order details below" : "Fill out the form below to create a new delivery order"}
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] pr-4">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  {!isEditMode && (
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="guest-mode"
                        checked={isGuestOrder}
                        onCheckedChange={setIsGuestOrder}
                      />
                      <Label htmlFor="guest-mode">Create order for guest user</Label>
                    </div>
                  )}
                  
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
                  
                  {(isGuestOrder || orderToEdit?.isGuestOrder) && (
                    <div className="grid gap-2">
                      <Label htmlFor="customerEmail">Customer Email (optional)</Label>
                      <Input
                        id="customerEmail"
                        name="customerEmail"
                        value={formData.customerEmail}
                        onChange={handleChange}
                        placeholder="Customer email"
                      />
                    </div>
                  )}
                  
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
                  
                  {isBusinessPartner && (
                    <div className="grid gap-2">
                      <Label htmlFor="partnerId">Select Courier Partner</Label>
                      <Select
                        value={selectedPartnerId}
                        onValueChange={setSelectedPartnerId}
                      >
                        <SelectTrigger id="partnerId">
                          <SelectValue placeholder="Select a courier partner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">No specific partner</SelectItem>
                          {availablePartners.map((partner) => (
                            <SelectItem key={partner.id} value={partner.id}>
                              {partner.name} - Independent Courier
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  {(isFleetPartner || isIndependentCourier) && availableDrivers.length > 0 && (
                    <div className="grid gap-2">
                      <Label htmlFor="driverId">Assign Driver (Optional)</Label>
                      <Select
                        value={selectedDriverId}
                        onValueChange={setSelectedDriverId}
                      >
                        <SelectTrigger id="driverId">
                          <SelectValue placeholder="Select a driver" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">None (Assign Later)</SelectItem>
                          {availableDrivers.map((driver) => (
                            <SelectItem key={driver.id} value={driver.id}>
                              {driver.name} - {driver.vehicleType}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                <DialogFooter className="mt-6">
                  <Button type="button" variant="outline" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (isEditMode ? "Updating..." : "Creating...") : (isEditMode ? "Update Order" : "Create Order")}
                  </Button>
                </DialogFooter>
              </form>
            </ScrollArea>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Order Created Successfully</DialogTitle>
              <DialogDescription>
                Share this tracking link with the guest customer
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="flex items-center space-x-2">
                <Input value={trackingLink} readOnly className="flex-1" />
                <Button size="icon" variant="outline" onClick={handleCopyLink}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-col space-y-2">
                <Button onClick={handleWhatsAppShare} className="w-full">
                  Share via WhatsApp
                </Button>
                <Button variant="outline" onClick={handleClose} className="w-full">
                  Close
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderForm;

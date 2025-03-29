
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Order, OrderStatus } from "@/types";

interface OrderFormProps {
  addOrder: (order: Order) => void;
}

const OrderForm = ({ addOrder }: OrderFormProps) => {
  const [open, setOpen] = useState(false);
  const [partnerForOrder, setPartnerForOrder] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();

  const handleCreateOrder = () => {
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
    
    addOrder(newOrder);
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
            <Input id="customer" className="col-span-3" defaultValue="New Customer" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pickup" className="text-left">
              Pickup
            </Label>
            <Input id="pickup" className="col-span-3" defaultValue="123 Pickup St" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="destination" className="text-left">
              Destination
            </Label>
            <Input id="destination" className="col-span-3" defaultValue="456 Delivery Ave" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="items" className="text-left">
              Items
            </Label>
            <Input id="items" className="col-span-3" defaultValue="Standard Delivery" />
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
  );
};

export default OrderForm;

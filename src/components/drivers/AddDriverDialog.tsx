
import { useState } from "react";
import { User } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddDriverDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddDriver: (driverData: any) => void;
  currentUser: User | null;
}

const AddDriverDialog = ({ 
  isOpen, 
  onOpenChange, 
  onAddDriver,
  currentUser
}: AddDriverDialogProps) => {
  const { toast } = useToast();
  const [newDriver, setNewDriver] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    vehicleType: "motorcycle",
    licensePlate: "",
  });

  const handleNewDriverChange = (field: string, value: string) => {
    setNewDriver(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddDriver = () => {
    if (!newDriver.name || !newDriver.phone || !newDriver.vehicleType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (name, phone, vehicle type)",
      });
      return;
    }

    onAddDriver(newDriver);
    
    // Reset form
    setNewDriver({
      name: "",
      phone: "",
      email: "",
      address: "",
      vehicleType: "motorcycle",
      licensePlate: "",
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Driver</DialogTitle>
          <DialogDescription>
            Enter the details for the new delivery driver
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Full Name
            </Label>
            <Input 
              id="name" 
              value={newDriver.name}
              onChange={(e) => handleNewDriverChange('name', e.target.value)}
              className="col-span-3" 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-left">
              Phone
            </Label>
            <Input 
              id="phone" 
              type="tel" 
              value={newDriver.phone}
              onChange={(e) => handleNewDriverChange('phone', e.target.value)}
              className="col-span-3" 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-left">
              Email
            </Label>
            <Input 
              id="email" 
              type="email" 
              value={newDriver.email}
              onChange={(e) => handleNewDriverChange('email', e.target.value)}
              className="col-span-3" 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-left">
              Address
            </Label>
            <Input 
              id="address" 
              value={newDriver.address}
              onChange={(e) => handleNewDriverChange('address', e.target.value)}
              className="col-span-3" 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="vehicle" className="text-left">
              Vehicle Type
            </Label>
            <Select 
              value={newDriver.vehicleType}
              onValueChange={(value) => handleNewDriverChange('vehicleType', value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="motorcycle">Motorcycle</SelectItem>
                <SelectItem value="car">Car</SelectItem>
                <SelectItem value="van">Van</SelectItem>
                <SelectItem value="truck">Truck</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="license" className="text-left">
              License Plate
            </Label>
            <Input 
              id="license" 
              value={newDriver.licensePlate}
              onChange={(e) => handleNewDriverChange('licensePlate', e.target.value)}
              className="col-span-3" 
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddDriver}>
            Add Driver
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDriverDialog;

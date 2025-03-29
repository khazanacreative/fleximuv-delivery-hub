
import { useState, useEffect } from "react";
import { Driver } from "@/types";
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
import { ScrollArea } from "@/components/ui/scroll-area";

interface EditDriverDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  driver: Driver;
  onUpdateDriver: (updatedDriver: Driver) => void;
}

const EditDriverDialog = ({ 
  isOpen, 
  onOpenChange, 
  driver,
  onUpdateDriver
}: EditDriverDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    vehicleType: "",
    licensePlate: "",
  });

  // Load driver data when the dialog opens
  useEffect(() => {
    if (driver) {
      setFormData({
        name: driver.name || "",
        phone: driver.phone || "",
        email: driver.email || "",
        address: driver.currentLocation || "",
        vehicleType: driver.vehicleType || "motorcycle",
        licensePlate: driver.licensePlate || driver.vehicleNumber || "",
      });
    }
  }, [driver]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateDriver = () => {
    if (!formData.name || !formData.phone || !formData.vehicleType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (name, phone, vehicle type)",
      });
      return;
    }

    const updatedDriver: Driver = {
      ...driver,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      currentLocation: formData.address,
      vehicleType: formData.vehicleType,
      licensePlate: formData.licensePlate,
      vehicleNumber: formData.licensePlate,
    };

    onUpdateDriver(updatedDriver);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Edit Driver</DialogTitle>
          <DialogDescription>
            Update the details for {driver?.name}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-left">
                Full Name
              </Label>
              <Input 
                id="name" 
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
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
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
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
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-left">
                Location
              </Label>
              <Input 
                id="address" 
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vehicle" className="text-left">
                Vehicle Type
              </Label>
              <Select 
                value={formData.vehicleType}
                onValueChange={(value) => handleChange('vehicleType', value)}
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
                value={formData.licensePlate}
                onChange={(e) => handleChange('licensePlate', e.target.value)}
                className="col-span-3" 
              />
            </div>
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdateDriver}>
            Update Driver
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDriverDialog;


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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Partner } from "@/types/partner";

interface AddPartnerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPartner: (partnerData: Omit<Partner, 'id' | 'joinDate' | 'totalDrivers' | 'status'>) => void;
}

const AddPartnerDialog = ({ open, onOpenChange, onAddPartner }: AddPartnerDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    type: "business",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    onAddPartner(formData);
    setFormData({
      name: "",
      address: "",
      phone: "",
      email: "",
      type: "business",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-left">Add New Partner</DialogTitle>
          <DialogDescription className="text-left">
            Enter the details for the new business partner
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Business Name
            </Label>
            <Input 
              id="name" 
              className="col-span-3" 
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-left">
              Address
            </Label>
            <Input 
              id="address" 
              className="col-span-3" 
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-left">
              Phone
            </Label>
            <Input 
              id="phone" 
              type="tel" 
              className="col-span-3" 
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-left">
              Email
            </Label>
            <Input 
              id="email" 
              type="email" 
              className="col-span-3" 
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Add Partner
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPartnerDialog;

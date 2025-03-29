
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Partner {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  totalDrivers: number;
  status: string;
  joinDate: string;
  type?: string;
}

interface PartnerEditDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  partner: Partner | null;
  onUpdatePartner: (partner: Partner) => void;
}

const PartnerEditDialog = ({
  isOpen,
  onOpenChange,
  partner,
  onUpdatePartner,
}: PartnerEditDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Partner>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form data when partner changes
  useEffect(() => {
    if (partner) {
      setFormData({
        name: partner.name,
        address: partner.address,
        phone: partner.phone,
        email: partner.email,
        type: partner.type || 'business',
        status: partner.status
      });
    }
  }, [partner]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!partner) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedPartner = {
        ...partner,
        ...formData,
      };
      
      onUpdatePartner(updatedPartner);
      
      toast({
        title: "Partner Updated",
        description: `${updatedPartner.name} has been successfully updated.`,
      });
      
      setIsLoading(false);
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh]">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl">Edit Partner</DialogTitle>
          <DialogDescription>
            Update partner details and settings
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-left">
                Business Name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={formData.name || ''}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-left">
                Partner Type
              </Label>
              <div className="col-span-3">
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => handleSelectChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select partner type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="business">Business Partner</SelectItem>
                    <SelectItem value="fleet">Fleet Partner</SelectItem>
                    <SelectItem value="courier">Independent Courier</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-left">
                Status
              </Label>
              <div className="col-span-3">
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-left">
                Address
              </Label>
              <Input
                id="address"
                className="col-span-3"
                value={formData.address || ''}
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
                value={formData.phone || ''}
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
                value={formData.email || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Partner"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerEditDialog;

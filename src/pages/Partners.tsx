
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Phone, Mail, Users, MoreHorizontal, Edit, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { usePermissions } from "@/hooks/use-permissions";
import PartnerEditDialog from "@/components/partners/PartnerEditDialog";

// Sample partner data
const initialPartners = [
  {
    id: "part-1",
    name: "Rumah Makan Padang Sederhana",
    address: "Jl. Raya Darmo 45, Surabaya",
    phone: "+6282134567890",
    email: "rm.padang@example.com",
    totalDrivers: 12,
    status: "active",
    joinDate: "2023-04-15",
  },
  {
    id: "part-2",
    name: "Ayam Geprek Bu Tini",
    address: "Jl. Diponegoro 78, Surabaya",
    phone: "+6281234567890",
    email: "ayamgeprek@example.com",
    totalDrivers: 8,
    status: "active",
    joinDate: "2023-06-22",
  },
  {
    id: "part-3",
    name: "Seafood Pak Karyo",
    address: "Jl. Mayjen Sungkono 120, Surabaya",
    phone: "+6287812345678",
    email: "seafood.karyo@example.com",
    totalDrivers: 15,
    status: "pending",
    joinDate: "2023-09-08",
  },
];

const Partners = () => {
  const [partners, setPartners] = useState(initialPartners);
  const [open, setOpen] = useState(false);
  const [editPartnerOpen, setEditPartnerOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  
  const { toast } = useToast();
  const { canEditPartnerDetails } = usePermissions();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleAddPartner = () => {
    const newPartner = {
      id: `part-${Date.now()}`,
      ...formData,
      totalDrivers: 0,
      status: "active",
      joinDate: new Date().toISOString().split('T')[0],
    };
    
    setPartners([...partners, newPartner]);
    setFormData({
      name: "",
      address: "",
      phone: "",
      email: "",
    });
    setOpen(false);
    
    toast({
      title: "Partner added",
      description: `${newPartner.name} has been successfully added as a partner.`,
    });
  };

  const handleEditPartner = (partner) => {
    setSelectedPartner(partner);
    setEditPartnerOpen(true);
  };

  const handleUpdatePartner = (updatedPartner) => {
    const updatedPartners = partners.map(p => 
      p.id === updatedPartner.id ? updatedPartner : p
    );
    setPartners(updatedPartners);
  };

  const handleDeletePartner = (partnerId) => {
    const updatedPartners = partners.filter(p => p.id !== partnerId);
    setPartners(updatedPartners);
    
    toast({
      title: "Partner deleted",
      description: "The partner has been removed from your network.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Building className="h-8 w-8" />
            Partners
          </h2>
          <p className="text-muted-foreground">
            Manage restaurant and business partners in your delivery network
          </p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Partner</Button>
          </DialogTrigger>
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
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPartner}>
                Add Partner
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {partners.map((partner) => (
          <Card key={partner.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{partner.name}</CardTitle>
                <Badge className={getStatusColor(partner.status)}>
                  {partner.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-sm">{partner.address}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-sm">{partner.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-sm">{partner.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <Users className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-sm">{partner.totalDrivers} Drivers</span>
              </div>
            </CardContent>
            <CardFooter className="pt-0 justify-between">
              <div className="text-sm text-muted-foreground">
                Joined: {new Date(partner.joinDate).toLocaleDateString()}
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleEditPartner(partner)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Users className="h-4 w-4 mr-2" />
                    Manage Drivers
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-destructive"
                    onClick={() => handleDeletePartner(partner.id)}
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete Partner
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>

      <PartnerEditDialog 
        isOpen={editPartnerOpen}
        onOpenChange={setEditPartnerOpen}
        partner={selectedPartner}
        onUpdatePartner={handleUpdatePartner}
      />
    </div>
  );
};

export default Partners;

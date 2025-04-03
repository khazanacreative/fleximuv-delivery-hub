
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePermissions } from "@/hooks/use-permissions";
import { Partner } from "@/types/partner";
import PartnerList from "@/components/partners/PartnerList";
import AddPartnerDialog from "@/components/partners/AddPartnerDialog";
import PartnerEditDialog from "@/components/partners/PartnerEditDialog";

// Sample partner data
const initialPartners = [
  {
    id: "part-1",
    name: "Joko Widodo",
    address: "Jl. Patimura 45, Jakarta",
    phone: "+6282134567123",
    email: "jokowi@fleximov.id",
    totalDrivers: 15,
    status: "active",
    joinDate: "2024-08-15",
    type: "fleet"
  },
  {
    id: "part-2",
    name: "Agus Santoso",
    address: "Jl. Ahmad Yani 78, Surabaya",
    phone: "+6281234567321",
    email: "agus@courier.id",
    totalDrivers: 1,
    status: "active",
    joinDate: "2024-07-22",
    type: "courier"
  },
  {
    id: "part-3",
    name: "Siti Rahayu",
    address: "Jl. Thamrin 88, Jakarta",
    phone: "+6287812345678",
    email: "siti.rahayu@business.co.id",
    totalDrivers: 0,
    status: "active",
    joinDate: "2024-09-10",
    type: "business"
  },
  {
    id: "part-4",
    name: "Rumah Makan Padang Sederhana",
    address: "Jl. Raya Darmo 45, Surabaya",
    phone: "+6282134567890",
    email: "rm.padang@example.com",
    totalDrivers: 12,
    status: "active",
    joinDate: "2023-04-15",
    type: "business"
  },
  {
    id: "part-5",
    name: "Ayam Geprek Bu Tini",
    address: "Jl. Diponegoro 78, Surabaya",
    phone: "+6281234567890",
    email: "ayamgeprek@example.com",
    totalDrivers: 8,
    status: "active",
    joinDate: "2023-06-22",
    type: "business"
  },
  {
    id: "part-6",
    name: "Seafood Pak Karyo",
    address: "Jl. Mayjen Sungkono 120, Surabaya",
    phone: "+6287812345678",
    email: "seafood.karyo@example.com",
    totalDrivers: 15,
    status: "pending",
    joinDate: "2023-09-08",
    type: "business"
  },
];

const Partners = () => {
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editPartnerOpen, setEditPartnerOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  
  const { toast } = useToast();
  const { canEditPartnerDetails } = usePermissions();

  const handleAddPartner = (partnerData: Omit<Partner, 'id' | 'joinDate' | 'totalDrivers' | 'status'>) => {
    const newPartner: Partner = {
      id: `part-${Date.now()}`,
      ...partnerData,
      totalDrivers: 0,
      status: "active",
      joinDate: new Date().toISOString().split('T')[0],
    };
    
    setPartners([...partners, newPartner]);
    setAddDialogOpen(false);
    
    toast({
      title: "Partner added",
      description: `${newPartner.name} has been successfully added as a partner.`,
    });
  };

  const handleEditPartner = (partner: Partner) => {
    setSelectedPartner(partner);
    setEditPartnerOpen(true);
  };

  const handleUpdatePartner = (updatedPartner: Partner) => {
    const updatedPartners = partners.map(p => 
      p.id === updatedPartner.id ? updatedPartner : p
    );
    setPartners(updatedPartners);
  };

  const handleDeletePartner = (partnerId: string) => {
    const updatedPartners = partners.filter(p => p.id !== partnerId);
    setPartners(updatedPartners);
    
    toast({
      title: "Partner deleted",
      description: "The partner has been removed from your network.",
    });
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
        
        <Button onClick={() => setAddDialogOpen(true)}>Add Partner</Button>
      </div>

      <PartnerList 
        partners={partners} 
        onEditPartner={handleEditPartner} 
        onDeletePartner={handleDeletePartner} 
      />

      <AddPartnerDialog 
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onAddPartner={handleAddPartner}
      />

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

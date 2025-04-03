
import { Partner } from "@/types/partner";
import PartnerCard from "./PartnerCard";

interface PartnerListProps {
  partners: Partner[];
  onEditPartner: (partner: Partner) => void;
  onDeletePartner: (partnerId: string) => void;
}

const PartnerList = ({ partners, onEditPartner, onDeletePartner }: PartnerListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {partners.map((partner) => (
        <PartnerCard 
          key={partner.id} 
          partner={partner} 
          onEdit={onEditPartner} 
          onDelete={onDeletePartner} 
        />
      ))}
    </div>
  );
};

export default PartnerList;


import { CardContent, CardFooter, CardHeader, CardTitle, Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Users, MoreHorizontal, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Partner } from "@/types/partner";

interface PartnerCardProps {
  partner: Partner;
  onEdit: (partner: Partner) => void;
  onDelete: (partnerId: string) => void;
}

const PartnerCard = ({ partner, onEdit, onDelete }: PartnerCardProps) => {
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
    <Card>
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
            <DropdownMenuItem onClick={() => onEdit(partner)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Users className="h-4 w-4 mr-2" />
              Manage Drivers
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-destructive"
              onClick={() => onDelete(partner.id)}
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete Partner
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

export default PartnerCard;

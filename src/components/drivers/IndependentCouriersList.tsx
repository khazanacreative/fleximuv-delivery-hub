
import { User } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare } from "lucide-react";

interface IndependentCouriersListProps {
  couriers: User[];
}

const IndependentCouriersList = ({ couriers }: IndependentCouriersListProps) => {
  const handleContactWhatsApp = (phone: string) => {
    if (phone) {
      const formattedPhone = phone.replace(/\D/g, '');
      window.open(`https://wa.me/${formattedPhone}`, '_blank');
    }
  };

  const handleCall = (phone: string) => {
    if (phone) {
      window.open(`tel:${phone}`, '_blank');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {couriers.map((courier) => (
        <Card key={courier.id} className="overflow-hidden">
          <CardHeader className="bg-fleximov-50 pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-fleximov-500 text-white">
                  {courier.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {courier.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{courier.email}</p>
              </div>
              
              {courier.phone && (
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{courier.phone}</p>
                </div>
              )}
              
              <div className="flex space-x-2 pt-2">
                {courier.phone && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                      onClick={() => handleCall(courier.phone || '')}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                      onClick={() => handleContactWhatsApp(courier.phone || '')}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {couriers.length === 0 && (
        <div className="col-span-full text-center py-10 text-muted-foreground">
          No independent couriers available
        </div>
      )}
    </div>
  );
};

export default IndependentCouriersList;

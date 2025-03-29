
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockDrivers } from "@/data/mock-data";
import { cn } from "@/lib/utils";

interface DriverStatusCardProps {
  className?: string;
}

const DriverStatusCard = ({ className }: DriverStatusCardProps) => {
  const activeDrivers = mockDrivers.filter(driver => driver.status !== 'offline');
  
  return (
    <Card className={cn("md:col-span-3", className)}>
      <CardHeader className="pb-2">
        <CardTitle>Active Drivers</CardTitle>
        <CardDescription>Drivers currently available or on duty</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeDrivers.map((driver) => (
            <div key={driver.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-fleximov-100 text-fleximov-700">
                    {driver.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{driver.name}</p>
                  <p className="text-xs text-muted-foreground">{driver.vehicleType} · {driver.vehicleNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`h-2.5 w-2.5 rounded-full ${
                  driver.status === 'available' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
                <span className="text-xs font-medium capitalize">{driver.status}</span>
              </div>
            </div>
          ))}
          
          {activeDrivers.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No active drivers at the moment
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DriverStatusCard;

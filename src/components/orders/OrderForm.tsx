
import React, { useState } from 'react';
import { MapPin, Truck, Bike, Package, Calculator, Clock } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Mock data for driver suggestions
const suggestedDrivers = [
  {
    id: 1,
    name: "John Smith",
    vehicle: "Motorcycle",
    rating: 4.8,
    distance: "0.8 km",
    estimatedTime: "5-10 mins",
    fee: "$3.50"
  },
  {
    id: 2,
    name: "Sarah Lee",
    vehicle: "Car",
    rating: 4.9,
    distance: "1.2 km",
    estimatedTime: "7-12 mins",
    fee: "$5.00"
  },
  {
    id: 3,
    name: "David Wong",
    vehicle: "Van",
    rating: 4.7,
    distance: "1.5 km",
    estimatedTime: "10-15 mins",
    fee: "$7.50"
  }
];

interface OrderFormProps {
  className?: string;
}

const OrderForm = ({ className }: OrderFormProps) => {
  const [pickupType, setPickupType] = useState("motorcycle");
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);
  const [showFeeCalculator, setShowFeeCalculator] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    weight: "1",
    distance: "5",
    urgency: "standard"
  });
  
  // Calculated fee based on delivery details
  const calculateFee = () => {
    const baseRate = 2.50;
    const weightFee = parseFloat(deliveryDetails.weight) * 0.5;
    const distanceFee = parseFloat(deliveryDetails.distance) * 0.75;
    const urgencyMultiplier = deliveryDetails.urgency === "express" ? 1.5 : 
                            deliveryDetails.urgency === "same_day" ? 1.2 : 1;
    const vehicleMultiplier = pickupType === "car" ? 1.3 : 
                            pickupType === "van" ? 1.8 : 1;
    
    return ((baseRate + weightFee + distanceFee) * urgencyMultiplier * vehicleMultiplier).toFixed(2);
  };

  const handleDriverSelect = (driverId: number) => {
    setSelectedDriver(driverId);
  };

  const handleDeliveryDetailChange = (field: string, value: string) => {
    setDeliveryDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getVehicleIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'car': return <Truck className="h-4 w-4" />;
      case 'van': return <Truck className="h-4 w-4 rotate-180" />;
      default: return <Bike className="h-4 w-4" />;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Create New Order</CardTitle>
        <CardDescription>Enter the order details and select a delivery method</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sender Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Sender Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 text-left">
              <Label htmlFor="senderName">Sender Name</Label>
              <Input id="senderName" placeholder="Enter sender name" />
            </div>
            <div className="space-y-2 text-left">
              <Label htmlFor="senderPhone">Phone Number</Label>
              <Input id="senderPhone" placeholder="+1 (555) 000-0000" />
            </div>
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="pickupAddress">Pickup Address</Label>
            <div className="flex gap-2">
              <Input id="pickupAddress" placeholder="Enter pickup address" className="flex-1" />
              <Button variant="outline" size="icon" className="shrink-0">
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Recipient Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Recipient Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 text-left">
              <Label htmlFor="recipientName">Recipient Name</Label>
              <Input id="recipientName" placeholder="Enter recipient name" />
            </div>
            <div className="space-y-2 text-left">
              <Label htmlFor="recipientPhone">Phone Number</Label>
              <Input id="recipientPhone" placeholder="+1 (555) 000-0000" />
            </div>
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="deliveryAddress">Delivery Address</Label>
            <Tabs defaultValue="map">
              <TabsList className="w-full grid grid-cols-2 mb-2">
                <TabsTrigger value="map">Google Maps</TabsTrigger>
                <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              </TabsList>
              <TabsContent value="map" className="border rounded-md h-40 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Google Maps integration would be here</p>
                  <p className="text-xs">(Select a location from the map)</p>
                </div>
              </TabsContent>
              <TabsContent value="manual">
                <div className="flex gap-2">
                  <Input id="deliveryAddress" placeholder="Enter delivery address" className="flex-1" />
                  <Button variant="outline" size="icon" className="shrink-0">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Package Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Package Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 text-left">
              <Label htmlFor="packageType">Package Type</Label>
              <Select defaultValue="parcel">
                <SelectTrigger id="packageType">
                  <SelectValue placeholder="Select package type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="parcel">Parcel</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="fragile">Fragile Item</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 text-left">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input 
                id="weight" 
                type="number" 
                placeholder="Enter weight" 
                value={deliveryDetails.weight}
                onChange={(e) => handleDeliveryDetailChange('weight', e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Describe the package contents" />
          </div>
        </div>

        {/* Delivery Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Delivery Options</h3>
          <div className="grid gap-4">
            <div className="space-y-2 text-left">
              <Label>Vehicle Type</Label>
              <div className="grid grid-cols-3 gap-4">
                <Button 
                  type="button" 
                  variant={pickupType === "motorcycle" ? "default" : "outline"}
                  className="flex flex-col items-center justify-center h-20 space-y-1"
                  onClick={() => setPickupType("motorcycle")}
                >
                  <Bike className="h-8 w-8" />
                  <span className="text-xs">Motorcycle</span>
                </Button>
                <Button 
                  type="button" 
                  variant={pickupType === "car" ? "default" : "outline"}
                  className="flex flex-col items-center justify-center h-20 space-y-1"
                  onClick={() => setPickupType("car")}
                >
                  <Truck className="h-8 w-8" />
                  <span className="text-xs">Car</span>
                </Button>
                <Button 
                  type="button" 
                  variant={pickupType === "van" ? "default" : "outline"}
                  className="flex flex-col items-center justify-center h-20 space-y-1"
                  onClick={() => setPickupType("van")}
                >
                  <Package className="h-8 w-8" />
                  <span className="text-xs">Van</span>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 text-left">
                <Label htmlFor="distance">Estimated Distance (km)</Label>
                <Input 
                  id="distance" 
                  type="number" 
                  placeholder="Enter distance" 
                  value={deliveryDetails.distance}
                  onChange={(e) => handleDeliveryDetailChange('distance', e.target.value)}
                />
              </div>
              <div className="space-y-2 text-left">
                <Label htmlFor="urgency">Delivery Speed</Label>
                <Select 
                  defaultValue="standard"
                  onValueChange={(value) => handleDeliveryDetailChange('urgency', value)}
                >
                  <SelectTrigger id="urgency">
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard (24-48h)</SelectItem>
                    <SelectItem value="same_day">Same Day</SelectItem>
                    <SelectItem value="express">Express (1-3h)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Fee Calculator */}
        <Collapsible open={showFeeCalculator} onOpenChange={setShowFeeCalculator}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" type="button" className="flex w-full gap-2 justify-center">
              <Calculator className="h-4 w-4" />
              <span>{showFeeCalculator ? 'Hide' : 'Show'} Fee Calculator</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Base Rate:</span>
                    <span className="font-medium">$2.50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Weight Fee ({deliveryDetails.weight} kg):</span>
                    <span className="font-medium">${(parseFloat(deliveryDetails.weight) * 0.5).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Distance Fee ({deliveryDetails.distance} km):</span>
                    <span className="font-medium">${(parseFloat(deliveryDetails.distance) * 0.75).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Vehicle Type ({pickupType}):</span>
                    <span className="font-medium">
                      {pickupType === "car" ? "x1.3" : pickupType === "van" ? "x1.8" : "x1.0"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Urgency ({deliveryDetails.urgency}):</span>
                    <span className="font-medium">
                      {deliveryDetails.urgency === "express" ? "x1.5" : 
                      deliveryDetails.urgency === "same_day" ? "x1.2" : "x1.0"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="font-semibold">Total Estimated Fee:</span>
                    <span className="font-bold text-primary">${calculateFee()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        {/* Driver Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Recommended Drivers</h3>
          <div className="grid gap-3">
            {suggestedDrivers.map(driver => (
              <div 
                key={driver.id}
                className={`border rounded-lg p-3 flex flex-col sm:flex-row gap-3 transition-colors cursor-pointer ${
                  selectedDriver === driver.id ? 'bg-primary/10 border-primary' : 'hover:bg-muted/30'
                }`}
                onClick={() => handleDriverSelect(driver.id)}
              >
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                  {getVehicleIcon(driver.vehicle)}
                </div>
                <div className="flex-grow grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <div className="font-medium">{driver.name}</div>
                    <div className="text-xs text-muted-foreground">{driver.vehicle} • ⭐ {driver.rating}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">{driver.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">{driver.estimatedTime}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-between sm:justify-end">
                  <div className="font-medium text-right">{driver.fee}</div>
                  <Button 
                    variant={selectedDriver === driver.id ? "default" : "outline"}
                    size="sm" 
                    className="whitespace-nowrap"
                  >
                    {selectedDriver === driver.id ? "Selected" : "Select"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button>Create Order</Button>
      </CardFooter>
    </Card>
  );
};

export default OrderForm;

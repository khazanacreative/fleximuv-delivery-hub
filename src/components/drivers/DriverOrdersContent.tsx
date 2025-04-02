
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MapPin, CheckCircle, Clock, FileText, AlertTriangle } from "lucide-react";
import { useAuth } from '@/hooks/use-auth';
import { mockOrders } from "@/data/mock-data";
import { Order } from "@/types";

const getStatusIcon = (status: string) => {
  switch(status) {
    case 'pending': return <Clock className="h-5 w-5 text-yellow-500" />;
    case 'in_progress': return <Clock className="h-5 w-5 text-purple-500" />;
    case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'cancelled': return <AlertTriangle className="h-5 w-5 text-red-500" />;
    default: return <FileText className="h-5 w-5 text-blue-500" />;
  }
};

const getStatusColor = (status: string) => {
  const colors = {
    'pending': "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    'accepted': "bg-blue-100 text-blue-800 hover:bg-blue-200",
    'assigned': "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
    'in_progress': "bg-purple-100 text-purple-800 hover:bg-purple-200",
    'completed': "bg-green-100 text-green-800 hover:bg-green-200",
    'cancelled': "bg-red-100 text-red-800 hover:bg-red-200"
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

const DriverOrdersContent = () => {
  const { user } = useAuth();
  
  // Filter orders for this driver
  const driverOrders = mockOrders.filter(order => 
    order.driverId === user?.id || 
    (order.status === 'assigned' && !order.driverId)
  );
  
  // Group orders by status
  const currentOrders = driverOrders.filter(order => 
    ['assigned', 'accepted', 'in_progress'].includes(order.status)
  );
  
  const completedOrders = driverOrders.filter(order => 
    order.status === 'completed'
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold">My Orders</h2>
      
      {currentOrders.length === 0 && completedOrders.length === 0 ? (
        <Card className="bg-gradient-to-br from-white to-fleximuv-50 border-fleximuv-100">
          <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[200px]">
            <FileText className="h-12 w-12 text-fleximuv-300 mb-3" />
            <h3 className="text-lg font-medium mb-2">No Orders Yet</h3>
            <p className="text-muted-foreground text-center max-w-md">
              You don't have any orders assigned to you at the moment. Orders will appear here when they're assigned to you.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Current Orders Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Current Orders</h3>
            {currentOrders.length === 0 ? (
              <Card className="border-fleximuv-100/50 bg-fleximuv-50/30">
                <CardContent className="pt-6 pb-6 text-center">
                  <p className="text-muted-foreground">No active orders at the moment.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {currentOrders.map((order) => (
                  <Card key={order.id} className="overflow-hidden border-fleximuv-100">
                    <CardHeader className="bg-gradient-to-r from-fleximuv-50 to-white border-b border-fleximuv-100/50 py-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.replace('_', ' ')}
                          </Badge>
                          <span className="font-semibold text-sm">Order #{order.orderNumber || order.id.substring(0, 6)}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex justify-between">
                        <div className="space-y-1">
                          <div className="text-sm font-medium">{order.customerName}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {order.deliveryAddress?.substring(0, 30)}...
                          </div>
                          <div className="text-sm font-medium mt-2">${order.totalAmount}</div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="h-8 text-xs rounded-lg border-fleximuv-200 text-fleximuv-700 hover:bg-fleximuv-50">
                              <Eye className="h-3.5 w-3.5 mr-1" /> Details
                            </Button>
                            <Button size="sm" className="h-8 text-xs rounded-lg bg-fleximuv-500 hover:bg-fleximuv-600">
                              <MapPin className="h-3.5 w-3.5 mr-1" /> Track
                            </Button>
                          </div>
                          <Badge variant="outline" className="font-normal bg-fleximuv-50">
                            {order.paymentMethod}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Completed Orders Section */}
          <div className="space-y-4 mt-8">
            <h3 className="text-lg font-medium">Completed Orders</h3>
            {completedOrders.length === 0 ? (
              <Card className="border-fleximuv-100/50 bg-fleximuv-50/30">
                <CardContent className="pt-6 pb-6 text-center">
                  <p className="text-muted-foreground">No completed orders yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {completedOrders.slice(0, 5).map((order) => (
                  <Card key={order.id} className="border-gray-200 bg-gray-50/50">
                    <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b py-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.replace('_', ' ')}
                          </Badge>
                          <span className="font-medium text-sm">Order #{order.orderNumber || order.id.substring(0, 6)}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex justify-between">
                        <div className="space-y-1">
                          <div className="text-sm font-medium">{order.customerName}</div>
                          <div className="text-sm text-muted-foreground">${order.totalAmount}</div>
                        </div>
                        <div>
                          <Button size="sm" variant="outline" className="h-8 text-xs rounded-lg">
                            <Eye className="h-3.5 w-3.5 mr-1" /> Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            {completedOrders.length > 5 && (
              <div className="text-center mt-4">
                <Button variant="outline" size="sm" className="text-fleximuv-600 border-fleximuv-200">
                  View All Completed Orders
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DriverOrdersContent;

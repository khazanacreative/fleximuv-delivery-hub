
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MapPin, Edit } from "lucide-react";
import { cn } from "@/lib/utils";

interface Order {
  id: string;
  customer: string;
  status: 'pending' | 'accepted' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  date: string;
  address: string;
  amount: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD-5692",
    customer: "John Smith",
    status: "pending",
    date: "2023-09-12",
    address: "123 Main St, City",
    amount: "$24.50"
  },
  {
    id: "ORD-5693",
    customer: "Sarah Johnson",
    status: "in_progress",
    date: "2023-09-12",
    address: "456 Oak St, City",
    amount: "$36.20"
  },
  {
    id: "ORD-5694",
    customer: "Michael Brown",
    status: "completed",
    date: "2023-09-11",
    address: "789 Pine St, City",
    amount: "$19.99"
  },
  {
    id: "ORD-5695",
    customer: "Emily Davis",
    status: "cancelled",
    date: "2023-09-11",
    address: "101 Maple St, City",
    amount: "$42.80"
  },
  {
    id: "ORD-5696",
    customer: "Daniel Wilson",
    status: "assigned",
    date: "2023-09-10",
    address: "202 Cedar St, City",
    amount: "$31.25"
  }
];

const getStatusColor = (status: Order['status']) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    accepted: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    assigned: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
    in_progress: "bg-purple-100 text-purple-800 hover:bg-purple-200",
    completed: "bg-green-100 text-green-800 hover:bg-green-200",
    cancelled: "bg-red-100 text-red-800 hover:bg-red-200"
  };
  return colors[status];
};

interface RecentOrdersTableProps {
  className?: string;
}

const RecentOrdersTable = ({ className }: RecentOrdersTableProps) => {
  return (
    <Card className={cn("md:col-span-4", className)}>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>View and manage your most recent orders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left">Order</th>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{order.id}</td>
                    <td className="px-4 py-3">{order.customer}</td>
                    <td className="px-4 py-3">
                      <Badge className={getStatusColor(order.status)} variant="outline">
                        {order.status.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">{order.date}</td>
                    <td className="px-4 py-3">{order.amount}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View details</span>
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <MapPin className="h-4 w-4" />
                          <span className="sr-only">View location</span>
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit order</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentOrdersTable;

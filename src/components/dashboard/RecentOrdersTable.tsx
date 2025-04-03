
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MapPin, Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePermissions } from '@/hooks/use-permissions';
import { formatRupiah } from '@/utils/formatters';

interface Order {
  id: string;
  customer: string;
  status: 'pending' | 'accepted' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  date: string;
  address: string;
  amount: string | number;
}

const mockOrders: Order[] = [
  {
    id: "ORD-5692",
    customer: "Andi Pratama",
    status: "pending",
    date: "2025-03-12",
    address: "Jl. Pahlawan No. 17, Surabaya",
    amount: 245000
  },
  {
    id: "ORD-5693",
    customer: "Sari Rahmawati",
    status: "in_progress",
    date: "2025-03-12",
    address: "Jl. Diponegoro No. 42, Surabaya",
    amount: 362000
  },
  {
    id: "ORD-5694",
    customer: "Bambang Wijaya",
    status: "completed",
    date: "2025-03-11",
    address: "Jl. Ahmad Yani No. 89, Surabaya",
    amount: 199000
  },
  {
    id: "ORD-5695",
    customer: "Dian Purnama",
    status: "cancelled",
    date: "2025-03-11",
    address: "Jl. Raya Darmo No. 15, Surabaya",
    amount: 428000
  },
  {
    id: "ORD-5696",
    customer: "Eko Santoso",
    status: "assigned",
    date: "2025-03-10",
    address: "Jl. Pemuda No. 33, Surabaya",
    amount: 312500
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
  const { isDriver } = usePermissions();
  
  return (
    <Card className={cn(
      "md:col-span-4", 
      className,
      isDriver ? "border-fleximuv-100 overflow-hidden" : ""
    )}>
      <CardHeader className={isDriver ? "bg-gradient-to-r from-fleximuv-50 to-white border-b border-fleximuv-100/50" : ""}>
        <CardTitle className={isDriver ? "font-display" : ""}>Recent Orders</CardTitle>
        <CardDescription>View and manage your most recent orders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={cn(
                  "border-b",
                  isDriver ? "bg-fleximuv-50/80" : "bg-muted/50"
                )}>
                  <th className="px-4 py-3 text-left font-medium">Order</th>
                  <th className="px-4 py-3 text-left font-medium">Customer</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                  <th className="px-4 py-3 text-left font-medium">Amount</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-fleximuv-50/30">
                    <td className="px-4 py-3 font-medium">{order.id}</td>
                    <td className="px-4 py-3">{order.customer}</td>
                    <td className="px-4 py-3">
                      <Badge className={getStatusColor(order.status)} variant="outline">
                        {order.status.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">{order.date}</td>
                    <td className="px-4 py-3">{formatRupiah(order.amount)}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-fleximuv-700 hover:text-fleximuv-800 hover:bg-fleximuv-100">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View details</span>
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-fleximuv-700 hover:text-fleximuv-800 hover:bg-fleximuv-100">
                          <MapPin className="h-4 w-4" />
                          <span className="sr-only">View location</span>
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-fleximuv-700 hover:text-fleximuv-800 hover:bg-fleximuv-100">
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

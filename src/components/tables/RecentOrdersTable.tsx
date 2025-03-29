
import React from 'react';
import { Calendar, Package } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

type OrderStatus = "pending" | "accepted" | "assigned" | "in_progress" | "completed" | "cancelled";

interface Order {
  id: string;
  customerName: string;
  serviceType: string;
  status: OrderStatus;
  createdAt: string;
}

// Mock data for orders
const mockOrders: Order[] = [
  {
    id: "ORD-1234",
    customerName: "John Doe",
    serviceType: "Express Delivery",
    status: "completed",
    createdAt: "2023-07-15T10:30:00Z",
  },
  {
    id: "ORD-1235",
    customerName: "Jane Smith",
    serviceType: "Same Day Delivery",
    status: "in_progress",
    createdAt: "2023-07-15T11:45:00Z",
  },
  {
    id: "ORD-1236",
    customerName: "Bob Johnson",
    serviceType: "Standard Delivery",
    status: "pending",
    createdAt: "2023-07-15T12:15:00Z",
  },
  {
    id: "ORD-1237",
    customerName: "Alice Brown",
    serviceType: "Express Delivery",
    status: "assigned",
    createdAt: "2023-07-15T13:20:00Z",
  },
  {
    id: "ORD-1238",
    customerName: "Charlie Wilson",
    serviceType: "Standard Delivery",
    status: "cancelled",
    createdAt: "2023-07-15T14:10:00Z",
  },
];

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "accepted":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "assigned":
      return "bg-purple-100 text-purple-800 hover:bg-purple-200";
    case "in_progress":
      return "bg-indigo-100 text-indigo-800 hover:bg-indigo-200";
    case "completed":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "cancelled":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

const formatStatus = (status: OrderStatus) => {
  return status.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase());
};

export function RecentOrdersTable() {
  const recentOrders = mockOrders.slice(0, 5);
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentOrders.map((order: Order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.customerName}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span>{order.serviceType}</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="outline" className={getStatusColor(order.status)}>
                {formatStatus(order.status)}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}</span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

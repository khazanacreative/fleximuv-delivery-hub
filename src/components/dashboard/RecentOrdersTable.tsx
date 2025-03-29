
import { Calendar, Package } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockOrders } from "@/data/mock-data";
import { Order, OrderStatus } from "@/types";
import { formatDistanceToNow } from "date-fns";

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

const RecentOrdersTable = () => {
  const recentOrders = mockOrders.slice(0, 5);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>View your recent orders and their status</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="h-8">
          View All
        </Button>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default RecentOrdersTable;

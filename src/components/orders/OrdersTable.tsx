
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";
import { usePermissions } from "@/hooks/use-permissions";
import { MapPin, MoreHorizontal, Trash, Edit, Eye, Share2, Check, ArrowUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import RoleGate from "@/components/permissions/RoleGate";
import { Order, OrderStatus } from "@/types";
import { formatRupiah } from "@/utils/formatters";

interface OrdersTableProps {
  filteredOrders: Order[];
  handleViewDetails: (order: Order) => void;
  handleShowLocation: (order: Order) => void;
  handleShareLocation: (order: Order) => void;
  handleAcceptOrder: (order: Order) => void;
  handleCancelOrder: (order: Order) => void;
}

const OrdersTable = ({
  filteredOrders,
  handleViewDetails,
  handleShowLocation,
  handleShareLocation,
  handleAcceptOrder,
  handleCancelOrder,
}: OrdersTableProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'assigned':
        return 'bg-purple-100 text-purple-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-indigo-100 text-indigo-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const canEditOrder = (status) => {
    return status === 'pending';
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                Date <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Driver</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">#{order.id.substring(0, 6)}</TableCell>
              <TableCell>{order.customer || order.customerName}</TableCell>
              <TableCell>{formatDate(order.date || order.createdAt)}</TableCell>
              <TableCell>{order.items ? order.items.join(", ") : order.serviceType}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(order.status)}>
                  {formatStatus(order.status)}
                </Badge>
              </TableCell>
              <TableCell>{formatRupiah(order.amount)}</TableCell>
              <TableCell>{order.driver || (order.driverId ? `Driver #${order.driverId}` : "Unassigned")}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleViewDetails(order)}>
                      <Eye className="mr-2 h-4 w-4" /> View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShowLocation(order)}>
                      <MapPin className="mr-2 h-4 w-4" /> View Location
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShareLocation(order)}>
                      <Share2 className="mr-2 h-4 w-4" /> Share to WhatsApp
                    </DropdownMenuItem>
                    
                    <RoleGate permissions={['edit_orders']}>
                      <DropdownMenuItem 
                        disabled={!canEditOrder(order.status)}
                        className={!canEditOrder(order.status) ? "opacity-50 cursor-not-allowed" : ""}
                        onClick={() => {
                          if (canEditOrder(order.status)) {
                            toast({
                              title: "Edit Order",
                              description: "Editing functionality would open here",
                            });
                          }
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" /> Edit Order
                      </DropdownMenuItem>
                    </RoleGate>
                    
                    <RoleGate permissions={['accept_orders']}>
                      {order.status === 'pending' && (!order.partnerId || order.partnerId === user?.id) && (
                        <DropdownMenuItem onClick={() => handleAcceptOrder(order)}>
                          <Check className="mr-2 h-4 w-4" /> Accept Order
                        </DropdownMenuItem>
                      )}
                    </RoleGate>
                    
                    <RoleGate permissions={['cancel_orders']}>
                      {canEditOrder(order.status) && (
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleCancelOrder(order)}
                        >
                          <Trash className="mr-2 h-4 w-4" /> Cancel Order
                        </DropdownMenuItem>
                      )}
                    </RoleGate>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;

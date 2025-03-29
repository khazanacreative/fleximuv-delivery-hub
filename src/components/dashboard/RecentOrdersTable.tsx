
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
          <div className="p-4 text-sm text-muted-foreground text-center">
            Recent orders table would be displayed here
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentOrdersTable;

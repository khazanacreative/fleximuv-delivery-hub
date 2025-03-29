
import { ArrowDown, ArrowUp, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTransactions } from "@/data/mock-data";
import { Transaction } from "@/types";
import { format } from "date-fns";

const getTransactionIcon = (type: Transaction['type']) => {
  switch (type) {
    case 'top_up':
      return <ArrowDown className="h-4 w-4 text-green-500" />;
    case 'order_payment':
      return <ArrowUp className="h-4 w-4 text-red-500" />;
    case 'driver_payment':
      return <ArrowUp className="h-4 w-4 text-blue-500" />;
    case 'refund':
      return <ArrowDown className="h-4 w-4 text-orange-500" />;
    case 'commission':
      return <ArrowDown className="h-4 w-4 text-purple-500" />;
    default:
      return <Clock className="h-4 w-4 text-gray-500" />;
  }
};

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const TransactionsList = () => {
  const recentTransactions = mockTransactions.slice(0, 5);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your recent financial activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(transaction.createdAt), "MMM d, yyyy · HH:mm")}
                  </p>
                </div>
              </div>
              <div className={`text-sm font-medium ${
                transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatAmount(transaction.amount)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsList;

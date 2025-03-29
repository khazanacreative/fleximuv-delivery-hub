import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowDownIcon, ArrowUpIcon, CreditCard, DollarSign, BadgePercent, Plus, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const initialTransactions = [
  {
    id: "trx-1",
    date: "2023-10-15",
    description: "Order #12345 Payment",
    amount: 150000,
    type: "income",
    partner: "Padang Simple Restaurant",
  },
  {
    id: "trx-2",
    date: "2023-10-14",
    description: "Driver Payment - ID #D8721",
    amount: 50000,
    type: "expense",
    partner: "System",
  },
  {
    id: "trx-3",
    date: "2023-10-13",
    description: "Order #12342 Payment",
    amount: 85000,
    type: "income",
    partner: "Spicy Chicken Mrs. Tini",
  },
  {
    id: "trx-4",
    date: "2023-10-12",
    description: "Platform Fee",
    amount: 25000,
    type: "expense",
    partner: "System",
  },
  {
    id: "trx-5",
    date: "2023-10-11",
    description: "Order #12337 Payment",
    amount: 120000,
    type: "income",
    partner: "Mr. Karyo Seafood",
  },
];

const Finances = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "income",
    partner: "",
  });
  
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleAddTransaction = () => {
    const newTransaction = {
      id: `trx-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      description: formData.description,
      amount: parseFloat(formData.amount),
      type: formData.type,
      partner: formData.partner,
    };
    
    setTransactions([newTransaction, ...transactions]);
    setFormData({
      description: "",
      amount: "",
      type: "income",
      partner: "",
    });
    setOpen(false);
    
    toast({
      title: "Transaction added",
      description: `A new ${formData.type} transaction has been recorded.`,
    });
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const profit = totalIncome - totalExpense;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <CreditCard className="h-8 w-8" />
            Finances
          </h2>
          <p className="text-muted-foreground">
            Track income, expenses, and manage financial transactions
          </p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader className="text-left">
              <DialogTitle>Add New Transaction</DialogTitle>
              <DialogDescription>
                Enter the details for the new financial transaction
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-left">
                  Description
                </Label>
                <Input 
                  id="description" 
                  className="col-span-3" 
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-left">
                  Amount
                </Label>
                <Input 
                  id="amount" 
                  type="number" 
                  className="col-span-3" 
                  value={formData.amount}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-left">
                  Type
                </Label>
                <Select 
                  onValueChange={(value) => handleSelectChange("type", value)}
                  defaultValue={formData.type}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select transaction type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="partner" className="text-left">
                  Partner
                </Label>
                <Input 
                  id="partner" 
                  className="col-span-3" 
                  value={formData.partner}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter className="flex justify-end">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTransaction}>
                Add Transaction
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ArrowUpIcon className="mr-2 h-4 w-4 text-green-500" />
              <div className="text-2xl font-bold">{formatCurrency(totalIncome)}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ArrowDownIcon className="mr-2 h-4 w-4 text-red-500" />
              <div className="text-2xl font-bold">{formatCurrency(totalExpense)}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Net Profit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-blue-500" />
              <div className="text-2xl font-bold">{formatCurrency(profit)}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Partner</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Amount <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.partner}</TableCell>
                  <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                  <TableCell>
                    <Badge className={transaction.type === 'income' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                    }>
                      {transaction.type === 'income' ? 'Income' : 'Expense'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Finances;

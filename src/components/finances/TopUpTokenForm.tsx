
import React, { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Coins, CreditCard, Wallet } from 'lucide-react';
import { mockUsers } from '@/data/mock-data';

const TopUpTokenForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  
  // Flat rate of $0.1 per token
  const tokenRate = 0.1;

  const handleTopUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const topUpAmount = parseInt(amount);
      if (isNaN(topUpAmount) || topUpAmount <= 0) {
        toast({
          title: "Invalid amount",
          description: "Please enter a valid amount",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Update user balance in the mock data (in a real app, this would be a database update)
      const userIndex = mockUsers.findIndex(u => u.id === user?.id);
      if (userIndex !== -1) {
        mockUsers[userIndex].balance += topUpAmount;
      }

      toast({
        title: "Top-up Successful",
        description: `${topUpAmount} tokens have been added to your account!`,
      });
      
      setAmount('');
      setIsLoading(false);
    }, 1500);
  };

  const predefinedAmounts = [5, 10, 20, 50];
  
  return (
    <Card className="border-fleximuv-100 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-fleximuv-50 to-white border-b border-fleximuv-100/50">
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-fleximuv-500" />
          Top Up Delivery Tokens
        </CardTitle>
        <CardDescription>Add delivery tokens to your account for future orders</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleTopUp}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Number of Tokens (${tokenRate.toFixed(1)} each)</Label>
              <div className="relative mt-1">
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter number of tokens"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {predefinedAmounts.map((tokens) => (
                <Button
                  key={tokens}
                  type="button"
                  variant="outline"
                  className="border-fleximuv-200 hover:bg-fleximuv-50"
                  onClick={() => setAmount(tokens.toString())}
                >
                  {tokens} tokens
                </Button>
              ))}
            </div>

            <div className="space-y-2">
              <Label>Payment Method</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={paymentMethod === 'creditCard' ? 'default' : 'outline'}
                  className={`flex items-center justify-center gap-2 ${
                    paymentMethod === 'creditCard' 
                      ? 'bg-fleximuv-500 hover:bg-fleximuv-600'
                      : 'border-fleximuv-200 hover:bg-fleximuv-50'
                  }`}
                  onClick={() => setPaymentMethod('creditCard')}
                >
                  <CreditCard className="h-4 w-4" />
                  Credit Card
                </Button>
                <Button
                  type="button"
                  variant={paymentMethod === 'bankTransfer' ? 'default' : 'outline'}
                  className={`flex items-center justify-center gap-2 ${
                    paymentMethod === 'bankTransfer' 
                      ? 'bg-fleximuv-500 hover:bg-fleximuv-600'
                      : 'border-fleximuv-200 hover:bg-fleximuv-50'
                  }`}
                  onClick={() => setPaymentMethod('bankTransfer')}
                >
                  <Wallet className="h-4 w-4" />
                  Bank Transfer
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-600">Current Balance:</span>
              <span className="font-semibold">{user?.balance || 0} tokens</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm font-medium text-gray-600">Top-up Amount:</span>
              <span className="font-semibold">{amount ? parseInt(amount) : 0} tokens</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm font-medium text-gray-600">Total Price:</span>
              <span className="font-semibold">${amount ? (parseInt(amount) * tokenRate).toFixed(2) : '0.00'}</span>
            </div>
            <div className="border-t border-gray-200 my-2"></div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-600">New Balance:</span>
              <span className="font-semibold">{(user?.balance || 0) + (parseInt(amount) || 0)} tokens</span>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t border-gray-200">
        <Button
          onClick={handleTopUp}
          disabled={isLoading || !amount}
          className="w-full bg-fleximuv-500 hover:bg-fleximuv-600"
        >
          {isLoading ? 'Processing...' : 'Top Up Now'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TopUpTokenForm;

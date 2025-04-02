
import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { usePermissions } from '@/hooks/use-permissions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, Coins, ArrowUpRight, ArrowDownRight, CreditCard, Receipt } from "lucide-react";
import TopUpTokenForm from '@/components/finances/TopUpTokenForm';

const Finances = () => {
  const { user } = useAuth();
  const { isPartner, isAdmin, isDriver } = usePermissions();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Finances</h2>
        <p className="text-muted-foreground">
          Manage your financial transactions and balance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user?.balance || 0} tokens</div>
            <p className="text-xs text-muted-foreground">
              Available for deliveries
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+250 tokens</div>
            <p className="text-xs text-muted-foreground">
              +20% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Used Tokens</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145 tokens</div>
            <p className="text-xs text-muted-foreground">
              For deliveries this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          {isPartner && <TabsTrigger value="top-up">Top Up Tokens</TabsTrigger>}
          {(isAdmin || isPartner) && <TabsTrigger value="payouts">Payouts</TabsTrigger>}
          {isDriver && <TabsTrigger value="earnings">Earnings</TabsTrigger>}
        </TabsList>
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>History of your financial activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center">
                    <div className={`${i % 2 === 0 ? 'bg-green-100' : 'bg-blue-100'} p-2 rounded-full mr-4`}>
                      {i % 2 === 0 ? 
                        <ArrowUpRight className={`h-4 w-4 ${i % 2 === 0 ? 'text-green-600' : 'text-blue-600'}`} /> : 
                        <Coins className={`h-4 w-4 ${i % 2 === 0 ? 'text-green-600' : 'text-blue-600'}`} />
                      }
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-none">
                        {i % 2 === 0 ? 'Payment Received' : 'Token Top-up'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`font-medium ${i % 2 === 0 ? 'text-green-600' : 'text-blue-600'}`}>
                      {i % 2 === 0 ? `+${i * 50}` : `+${i * 100}`} tokens
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {isPartner && (
          <TabsContent value="top-up">
            <div className="grid gap-4 md:grid-cols-2">
              <TopUpTokenForm />
              
              <Card>
                <CardHeader>
                  <CardTitle>Token Usage Guide</CardTitle>
                  <CardDescription>How to use your delivery tokens</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">What are delivery tokens?</h4>
                    <p className="text-sm text-muted-foreground">
                      Delivery tokens are credits that you can use to pay for delivery services.
                      Each token equals one credit for a delivery.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">How to use tokens</h4>
                    <p className="text-sm text-muted-foreground">
                      When creating a new order, your token balance will be automatically used.
                      One delivery = one token deducted from your balance.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Benefits</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                      <li>No need to pay for each order separately</li>
                      <li>Bulk discounts when purchasing tokens</li>
                      <li>Streamlined accounting and billing</li>
                      <li>Priority service for token-based orders</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}
        
        {(isAdmin || isPartner) && (
          <TabsContent value="payouts">
            <Card>
              <CardHeader>
                <CardTitle>Payout Settings</CardTitle>
                <CardDescription>Manage your payout preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Configure your payout methods and schedules here. This feature is coming soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        )}
        
        {isDriver && (
          <TabsContent value="earnings">
            <Card>
              <CardHeader>
                <CardTitle>Your Earnings</CardTitle>
                <CardDescription>Track your delivery income</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  View detailed reports of your earnings here. This feature is coming soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Finances;

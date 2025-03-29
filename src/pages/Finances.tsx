
import { Button } from "@/components/ui/button";

const Finances = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Finances</h2>
        <Button>Add Transaction</Button>
      </div>
      <p className="text-muted-foreground">
        This page will display financial information and transaction history.
      </p>
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        Financial management interface will be implemented here.
      </div>
    </div>
  );
};

export default Finances;

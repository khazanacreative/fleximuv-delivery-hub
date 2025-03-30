
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from "sonner";
import { migrateData } from '@/utils/migrate-data';

const InitDbButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const initializeDatabase = async () => {
    setIsLoading(true);
    
    try {
      // Use the migrateData utility instead of direct RPC call
      const result = await migrateData();
      
      if (result.success) {
        toast.success('Demo accounts initialized', {
          description: 'Test accounts are now ready to use. You can now login with them.',
          duration: 5000,
        });
      } else {
        toast.error('Failed to initialize demo accounts', {
          description: result.message || 'An unknown error occurred',
        });
      }
    } catch (error: any) {
      console.error('Error initializing database:', error);
      toast.error('Failed to initialize demo accounts', {
        description: error.message || 'An unknown error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={initializeDatabase}
      disabled={isLoading}
      variant="outline"
      className="h-10 flex items-center px-6 py-2.5"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Initializing...
        </>
      ) : (
        'Initialize Demo Accounts'
      )}
    </Button>
  );
};

export default InitDbButton;

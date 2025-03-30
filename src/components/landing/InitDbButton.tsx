
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

const InitDbButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const initializeDatabase = async () => {
    setIsLoading(true);
    
    try {
      // Call the RPC function to initialize demo users
      const { data, error } = await supabase.rpc('initialize_demo_users');
      
      if (error) {
        throw new Error(error.message);
      }
      
      console.log('Initialize database response:', data);
      
      if (data) {
        toast.success('Demo accounts initialized', {
          description: 'Test accounts are now ready to use. You can now login with them.',
          duration: 5000,
        });
      } else {
        toast.error('Failed to initialize demo accounts', {
          description: 'An unknown error occurred',
        });
      }
    } catch (error) {
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

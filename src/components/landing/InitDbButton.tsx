
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { migrateData } from '@/utils/migrate-data';

const InitDbButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleMigrateData = async () => {
    setIsLoading(true);
    
    try {
      const result = await migrateData();
      
      if (result.success) {
        toast({
          title: "Success",
          description: "Test data has been migrated successfully. You can now log in with the test accounts.",
        });
      } else {
        if (result.message?.includes("already performed")) {
          toast({
            title: "Info",
            description: "Test data was already migrated. You can log in with the test accounts.",
          });
        } else {
          toast({
            title: "Error",
            description: result.message || "Failed to migrate data",
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      console.error("Error migrating data:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      className="text-white bg-green-600 hover:bg-green-700"
      onClick={handleMigrateData}
      disabled={isLoading}
    >
      {isLoading ? "Initializing..." : "Initialize Test Data"}
    </Button>
  );
};

export default InitDbButton;


import { supabase } from "@/integrations/supabase/client";

export const migrateData = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('migrate-data', {
      method: 'POST',
    });
    
    if (error) {
      console.error('Error migrating data:', error);
      return { success: false, message: error.message };
    }
    
    return data;
  } catch (error) {
    console.error('Error calling migration function:', error);
    return { success: false, message: error.message };
  }
};

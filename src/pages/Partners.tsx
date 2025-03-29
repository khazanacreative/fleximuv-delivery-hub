
import { Button } from "@/components/ui/button";

const Partners = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Partners</h2>
        <Button>Add Partner</Button>
      </div>
      <p className="text-muted-foreground">
        This page will display a list of partners with management features.
      </p>
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        Partner management interface will be implemented here.
      </div>
    </div>
  );
};

export default Partners;

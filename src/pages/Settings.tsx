
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      <p className="text-muted-foreground">
        Manage your account settings and preferences.
      </p>
      
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="border rounded-lg p-6">
          <div className="text-center text-muted-foreground p-8">
            Account settings interface will be implemented here.
          </div>
        </TabsContent>
        <TabsContent value="appearance" className="border rounded-lg p-6">
          <div className="text-center text-muted-foreground p-8">
            Appearance settings will be implemented here.
          </div>
        </TabsContent>
        <TabsContent value="notifications" className="border rounded-lg p-6">
          <div className="text-center text-muted-foreground p-8">
            Notification preferences will be implemented here.
          </div>
        </TabsContent>
        <TabsContent value="billing" className="border rounded-lg p-6">
          <div className="text-center text-muted-foreground p-8">
            Billing information will be implemented here.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;

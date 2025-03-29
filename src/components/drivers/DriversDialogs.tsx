
import { Driver, User } from "@/types";
import AddDriverDialog from "./AddDriverDialog";
import EditDriverDialog from "./EditDriverDialog";
import DriverProfileDialog from "./DriverProfileDialog";

interface DriversDialogsProps {
  addDriverOpen: boolean;
  setAddDriverOpen: (open: boolean) => void;
  editDriverOpen: boolean;
  setEditDriverOpen: (open: boolean) => void;
  viewProfileOpen: boolean;
  setViewProfileOpen: (open: boolean) => void;
  driverToEdit: Driver | null;
  setDriverToEdit: (driver: Driver | null) => void;
  selectedDriver: Driver | null;
  setSelectedDriver: (driver: Driver | null) => void;
  onAddDriver: (driverData: any) => void;
  onUpdateDriver: (driver: Driver) => void;
  onContactWhatsApp: (phone: string) => void;
  onShareLocation: (driver: Driver) => void;
  currentUser: User | null;
}

const DriversDialogs = ({
  addDriverOpen,
  setAddDriverOpen,
  editDriverOpen,
  setEditDriverOpen,
  viewProfileOpen,
  setViewProfileOpen,
  driverToEdit,
  setDriverToEdit,
  selectedDriver,
  setSelectedDriver,
  onAddDriver,
  onUpdateDriver,
  onContactWhatsApp,
  onShareLocation,
  currentUser,
}: DriversDialogsProps) => {
  return (
    <>
      <DriverProfileDialog
        isOpen={viewProfileOpen}
        onOpenChange={(open) => {
          setViewProfileOpen(open);
          if (!open) setSelectedDriver(null);
        }}
        selectedDriver={selectedDriver}
        onContactWhatsApp={onContactWhatsApp}
        onShareLocation={onShareLocation}
      />
      
      <AddDriverDialog
        isOpen={addDriverOpen}
        onOpenChange={setAddDriverOpen}
        onAddDriver={onAddDriver}
        currentUser={currentUser}
      />

      {driverToEdit && (
        <EditDriverDialog
          isOpen={editDriverOpen}
          onOpenChange={(open) => {
            setEditDriverOpen(open);
            if (!open) setDriverToEdit(null);
          }}
          driver={driverToEdit}
          onUpdateDriver={onUpdateDriver}
        />
      )}
    </>
  );
};

export default DriversDialogs;

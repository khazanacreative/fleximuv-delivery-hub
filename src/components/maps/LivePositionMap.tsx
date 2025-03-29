
import React from "react";
import { MapPin } from "lucide-react";

export const Map = ({ className, ...props }) => {
  return (
    <div className={`bg-muted/20 border rounded-md p-4 flex flex-col items-center justify-center min-h-[200px] ${className}`} {...props}>
      <MapPin className="h-8 w-8 text-muted-foreground mb-2" />
      <p className="text-muted-foreground text-sm">Map would be displayed here</p>
      <p className="text-xs text-muted-foreground mt-1">This is a placeholder for the actual map component</p>
    </div>
  );
};

export default Map;

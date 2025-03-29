
import { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { RefreshCw, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Menggunakan Leaflet sebagai alternatif gratis untuk peta
const LiveMap = ({ title = "Live Tracking Map", height = "400px" }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [mapInitialized, setMapInitialized] = useState(false);
  const { toast } = useToast();
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // Data lokasi simulasi
  const mockDriverLocations = [
    { id: 1, name: "Ahmad Driver", lat: -6.2088, lng: 106.8456, status: "available" },
    { id: 2, name: "Budi Driver", lat: -6.2000, lng: 106.8200, status: "busy" },
    { id: 3, name: "Charlie Driver", lat: -6.1800, lng: 106.8300, status: "available" },
  ];

  const initializeMap = async () => {
    if (!mapRef.current || mapInitialized) return;
    
    setLoading(true);
    
    try {
      // Dynamically import leaflet
      const L = await import('leaflet');
      await import('leaflet/dist/leaflet.css');
      
      // Create map instance
      const map = L.map(mapRef.current).setView([-6.2088, 106.8456], 12);
      
      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      // Store map reference
      leafletMapRef.current = map;
      
      // Add markers for drivers
      mockDriverLocations.forEach(driver => {
        const markerColor = driver.status === 'available' ? 'green' : 'orange';
        
        const driverIcon = L.divIcon({
          html: `<div class="flex items-center justify-center w-8 h-8 rounded-full bg-${markerColor}-500 border-2 border-white text-white shadow-lg">
                  <span class="text-xs font-bold">${driver.id}</span>
                </div>`,
          className: '',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });
        
        const marker = L.marker([driver.lat, driver.lng], { icon: driverIcon })
          .addTo(map)
          .bindPopup(`<b>${driver.name}</b><br>Status: ${driver.status}`);
        
        markersRef.current.push(marker);
      });
      
      // Add event listener for map click
      map.on('click', (e: any) => {
        const { lat, lng } = e.latlng;
        toast({
          title: "Location Selected",
          description: `Latitude: ${lat.toFixed(4)}, Longitude: ${lng.toFixed(4)}`,
        });
      });
      
      setMapInitialized(true);
    } catch (error) {
      console.error("Error initializing map:", error);
      toast({
        title: "Map Error",
        description: "Failed to load the map. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshMap = () => {
    if (!leafletMapRef.current) return;
    
    toast({
      title: "Refreshing Map",
      description: "Updating driver locations..."
    });
    
    // Simulate location updates
    mockDriverLocations.forEach((driver, index) => {
      if (markersRef.current[index]) {
        const newLat = driver.lat + (Math.random() - 0.5) * 0.01;
        const newLng = driver.lng + (Math.random() - 0.5) * 0.01;
        markersRef.current[index].setLatLng([newLat, newLng]);
      }
    });
  };

  useEffect(() => {
    initializeMap();
    
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
        markersRef.current = [];
        setMapInitialized(false);
      }
    };
  }, []);

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={refreshMap} 
          disabled={loading || !mapInitialized}
          className="gap-1"
        >
          <RefreshCw className="h-4 w-4" />
          <span className="hidden sm:inline">Refresh</span>
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="w-full h-[400px] rounded-md" />
        ) : (
          <div 
            ref={mapRef} 
            className="w-full rounded-md overflow-hidden border border-border" 
            style={{ height }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default LiveMap;


import { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { RefreshCw, MapPin, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface DriverLocation {
  id: number;
  name: string;
  lat: number;
  lng: number;
  status: string;
  vehicleType: string;
  lastUpdated: string;
}

const LivePositionMap = ({ 
  title = "Live Position Tracking", 
  height = "400px",
  filterable = true,
  showCourierDetails = true,
  shareable = true
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [mapInitialized, setMapInitialized] = useState(false);
  const { toast } = useToast();
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedDriver, setSelectedDriver] = useState<DriverLocation | null>(null);

  // Data lokasi simulasi with more detailed information
  const mockDriverLocations: DriverLocation[] = [
    { 
      id: 1, 
      name: "Ahmad Kurniawan", 
      lat: -6.2088, 
      lng: 106.8456, 
      status: "available", 
      vehicleType: "Motor",
      lastUpdated: "2 menit yang lalu"
    },
    { 
      id: 2, 
      name: "Budi Santoso", 
      lat: -6.2000, 
      lng: 106.8200, 
      status: "busy", 
      vehicleType: "Mobil",
      lastUpdated: "5 menit yang lalu"
    },
    { 
      id: 3, 
      name: "Charlie Putra", 
      lat: -6.1800, 
      lng: 106.8300, 
      status: "available", 
      vehicleType: "Motor",
      lastUpdated: "1 menit yang lalu"
    },
    { 
      id: 4, 
      name: "Diana Putri", 
      lat: -6.1900, 
      lng: 106.8100, 
      status: "busy", 
      vehicleType: "Motor",
      lastUpdated: "10 menit yang lalu"
    },
    { 
      id: 5, 
      name: "Eko Prasetyo", 
      lat: -6.2100, 
      lng: 106.8500, 
      status: "available", 
      vehicleType: "Mobil",
      lastUpdated: "3 menit yang lalu"
    },
  ];

  const filteredDrivers = selectedFilter === 'all' 
    ? mockDriverLocations 
    : mockDriverLocations.filter(driver => driver.status === selectedFilter);

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
      updateMarkers(filteredDrivers);
      
      // Add event listener for map click
      map.on('click', (e: any) => {
        setSelectedDriver(null);
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

  const updateMarkers = (drivers: DriverLocation[]) => {
    if (!leafletMapRef.current) return;
    
    const L = require('leaflet');
    
    // Clear existing markers
    markersRef.current.forEach(marker => {
      leafletMapRef.current.removeLayer(marker);
    });
    markersRef.current = [];
    
    // Add new markers
    drivers.forEach(driver => {
      const markerColor = driver.status === 'available' ? 'green' : 'orange';
      const vehicleEmoji = driver.vehicleType === 'Motor' ? '🛵' : '🚗';
      
      const driverIcon = L.divIcon({
        html: `<div class="flex items-center justify-center w-8 h-8 rounded-full bg-${markerColor}-500 border-2 border-white text-white shadow-lg">
                ${vehicleEmoji}
              </div>`,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });
      
      const marker = L.marker([driver.lat, driver.lng], { icon: driverIcon })
        .addTo(leafletMapRef.current)
        .bindPopup(`<b>${driver.name}</b><br>Status: ${driver.status}<br>Kendaraan: ${driver.vehicleType}`);
      
      marker.on('click', () => {
        setSelectedDriver(driver);
      });
      
      markersRef.current.push(marker);
    });
  };

  const refreshMap = () => {
    if (!leafletMapRef.current) return;
    
    toast({
      title: "Refreshing Map",
      description: "Updating driver locations..."
    });
    
    // Simulate location updates
    const updatedDrivers = mockDriverLocations.map(driver => ({
      ...driver,
      lat: driver.lat + (Math.random() - 0.5) * 0.01,
      lng: driver.lng + (Math.random() - 0.5) * 0.01,
      lastUpdated: "Baru saja"
    }));
    
    updateMarkers(selectedFilter === 'all' ? updatedDrivers : updatedDrivers.filter(d => d.status === selectedFilter));
  };

  const copyTrackingLink = () => {
    if (!selectedDriver) return;
    
    // Generate a mock tracking link
    const trackingLink = `https://track.fleximov.com/courier/${selectedDriver.id}`;
    
    navigator.clipboard.writeText(trackingLink)
      .then(() => {
        toast({
          title: "Link Copied",
          description: "Tracking link has been copied to clipboard",
        });
      })
      .catch(() => {
        toast({
          title: "Copy Failed",
          description: "Failed to copy tracking link",
          variant: "destructive",
        });
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

  useEffect(() => {
    if (mapInitialized) {
      updateMarkers(filteredDrivers);
    }
  }, [selectedFilter, mapInitialized]);

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="flex items-center gap-2">
          {filterable && (
            <div className="flex gap-1">
              <Button 
                variant={selectedFilter === 'all' ? "default" : "outline"} 
                size="sm" 
                onClick={() => setSelectedFilter('all')}
                className="text-xs"
              >
                Semua
              </Button>
              <Button 
                variant={selectedFilter === 'available' ? "default" : "outline"} 
                size="sm" 
                onClick={() => setSelectedFilter('available')}
                className="text-xs"
              >
                Tersedia
              </Button>
              <Button 
                variant={selectedFilter === 'busy' ? "default" : "outline"} 
                size="sm" 
                onClick={() => setSelectedFilter('busy')}
                className="text-xs"
              >
                Sibuk
              </Button>
            </div>
          )}
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
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {showCourierDetails && (
            <div className="md:col-span-1 order-2 md:order-1">
              <div className="border rounded-md p-3 h-full">
                <h3 className="font-medium mb-2">Kurir Aktif ({filteredDrivers.length})</h3>
                <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
                  {filteredDrivers.map(driver => (
                    <div 
                      key={driver.id} 
                      className={`border rounded-md p-2 cursor-pointer transition-colors ${
                        selectedDriver?.id === driver.id ? 'bg-fleximov-50 border-fleximov-200' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        setSelectedDriver(driver);
                        if (leafletMapRef.current) {
                          leafletMapRef.current.setView([driver.lat, driver.lng], 14);
                          markersRef.current.find(marker => 
                            marker.getLatLng().lat === driver.lat && 
                            marker.getLatLng().lng === driver.lng
                          )?.openPopup();
                        }
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-sm">{driver.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {driver.vehicleType} • ID: {driver.id}
                          </div>
                        </div>
                        <Badge variant={driver.status === 'available' ? 'default' : 'secondary'} 
                               className={driver.status === 'available' 
                                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                        : 'bg-orange-100 text-orange-800 hover:bg-orange-200'}>
                          {driver.status === 'available' ? 'Tersedia' : 'Sibuk'}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Update: {driver.lastUpdated}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <div className={`${showCourierDetails ? 'md:col-span-3' : 'col-span-full'} order-1 md:order-2`}>
            {loading ? (
              <Skeleton className="w-full h-[400px] rounded-md" />
            ) : (
              <div className="relative">
                <div 
                  ref={mapRef} 
                  className="w-full rounded-md overflow-hidden border border-border" 
                  style={{ height }}
                />
                
                {selectedDriver && shareable && (
                  <div className="absolute bottom-4 right-4 z-[1000]">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="default" 
                            className="rounded-full w-10 h-10 p-0 shadow-md"
                            onClick={copyTrackingLink}
                          >
                            <Share2 size={16} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy tracking link</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LivePositionMap;

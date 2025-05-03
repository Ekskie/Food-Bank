
import { useEffect, useRef } from 'react';

interface MapComponentProps {
  foodBanks: Array<{
    id: number;
    name: string;
    coordinates: [number, number];
  }>;
  selectedFoodBank: any | null;
  onSelectFoodBank: (foodBank: any) => void;
}

export function MapComponent({ 
  foodBanks, 
  selectedFoodBank, 
  onSelectFoodBank 
}: MapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This is a placeholder for actual map implementation
    // In a real app, you would initialize a map library here (like Mapbox, Google Maps, or Leaflet)
    const mapContainer = mapContainerRef.current;
    if (!mapContainer) return;

    // Sample structure for what map initialization would look like
    // Using a placeholder implementation
    const initializeMap = () => {
      // Create markers for each food bank
      const markers = foodBanks.map(bank => {
        const marker = document.createElement('div');
        marker.className = 'map-marker';
        marker.innerHTML = `
          <div class="${selectedFoodBank?.id === bank.id ? 'marker active' : 'marker'}">
            <div class="marker-icon"></div>
          </div>
        `;
        marker.style.position = 'absolute';
        
        // Position marker based on relative position in the map container
        // This is just a mockup - in a real map these would be positioned using geographical coordinates
        const x = Math.random() * 80 + 10; // 10-90% of container width
        const y = Math.random() * 80 + 10; // 10-90% of container height
        
        marker.style.left = `${x}%`;
        marker.style.top = `${y}%`;
        marker.style.transform = 'translate(-50%, -50%)';
        
        marker.addEventListener('click', () => {
          onSelectFoodBank(bank);
        });
        
        return marker;
      });
      
      // Clear existing markers
      mapContainer.innerHTML = '';
      
      // Add map background
      const mapBackground = document.createElement('div');
      mapBackground.className = 'map-background';
      mapBackground.style.position = 'absolute';
      mapBackground.style.inset = '0';
      mapBackground.style.backgroundImage = 'url(https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-98,40,3/1200x800?access_token=placeholder)';
      mapBackground.style.backgroundSize = 'cover';
      mapBackground.style.backgroundPosition = 'center';
      mapBackground.style.opacity = '0.8';
      mapContainer.appendChild(mapBackground);
      
      // Add markers to the map
      markers.forEach(marker => {
        mapContainer.appendChild(marker);
      });
      
      // Add styling
      const style = document.createElement('style');
      style.textContent = `
        .map-marker {
          cursor: pointer;
          z-index: 2;
        }
        .marker {
          width: 30px;
          height: 30px;
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }
        .marker:hover, .marker.active {
          transform: scale(1.2);
          background-color: #f59e0b;
        }
        .marker-icon {
          width: 12px;
          height: 12px;
          background-color: #ef4444;
          border-radius: 50%;
        }
        .marker.active .marker-icon {
          background-color: white;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    };

    const cleanup = initializeMap();
    
    return () => {
      if (cleanup) cleanup();
    };
  }, [foodBanks, selectedFoodBank, onSelectFoodBank]);

  return (
    <div ref={mapContainerRef} className="w-full h-full relative bg-muted rounded-md overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <p className="text-sm text-muted-foreground bg-background/80 px-4 py-2 rounded-full">
          Map integration placeholder - would be replaced with a real map service in production
        </p>
      </div>
    </div>
  );
}

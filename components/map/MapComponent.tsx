'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Custom marker icon
const createCustomIcon = (color: string) => {
  return new L.Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="32" height="32">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    `)}`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })
}

interface Destination {
  id: string
  name: string
  country: string
  coordinates: [number, number]
  description: string
  image: string
  rating: number
  tips: string[]
  bestTime: string
  category: 'adventure' | 'culture' | 'nature' | 'city' | 'beach'
}

interface MapComponentProps {
  destinations: Destination[]
  selectedDestination: Destination | null
  onDestinationSelect: (destination: Destination | null) => void
}

// Component to handle map updates
function MapUpdater({ selectedDestination }: { selectedDestination: Destination | null }) {
  const map = useMap()

  useEffect(() => {
    if (selectedDestination) {
      map.flyTo(selectedDestination.coordinates, 8, {
        duration: 1.5
      })
    }
  }, [selectedDestination, map])

  return null
}

export default function MapComponent({ 
  destinations, 
  selectedDestination, 
  onDestinationSelect 
}: MapComponentProps) {
  const getCategoryColor = (category: string) => {
    const colors = {
      adventure: '#ef4444', // red
      culture: '#8b5cf6',   // purple
      nature: '#22c55e',    // green
      city: '#3b82f6',      // blue
      beach: '#f59e0b'      // amber
    }
    return colors[category as keyof typeof colors] || '#6b7280'
  }

  return (
    <div className="h-96 w-full">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="h-full w-full z-0"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater selectedDestination={selectedDestination} />
        
        {destinations.map((destination) => (
          <Marker
            key={destination.id}
            position={destination.coordinates}
            icon={createCustomIcon(getCategoryColor(destination.category))}
            eventHandlers={{
              click: () => {
                onDestinationSelect(destination)
              },
            }}
          >
            <Popup>
              <div className="max-w-xs">
                <h3 className="font-bold text-lg text-travel-dark mb-2">
                  {destination.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  📍 {destination.country}
                </p>
                <p className="text-gray-700 text-sm mb-3">
                  {destination.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-500">
                    ⭐ {destination.rating}
                  </div>
                  <button
                    onClick={() => onDestinationSelect(destination)}
                    className="text-travel-primary text-sm font-medium hover:underline"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { MapPin, Camera, Info, Star } from 'lucide-react'
import AdSpace from '@/components/ads/AdSpace'

// Dynamically import map to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/map/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gray-200 animate-pulse flex items-center justify-center">
      <div className="text-gray-500">Loading map...</div>
    </div>
  )
})

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

const destinations: Destination[] = [
  {
    id: '1',
    name: 'Santorini',
    country: 'Greece',
    coordinates: [36.3932, 25.4615],
    description: 'A stunning Greek island known for its white-washed buildings and incredible sunsets.',
    image: '/destinations/santorini.jpg',
    rating: 4.8,
    tips: [
      'Visit during sunset for the best views',
      'Book accommodation in Oia for premium sunset views',
      'Try local wines at sunset viewpoints'
    ],
    bestTime: 'April to October',
    category: 'beach'
  },
  {
    id: '2',
    name: 'Kyoto',
    country: 'Japan',
    coordinates: [35.0116, 135.7681],
    description: 'Ancient capital with thousands of temples, traditional gardens, and geisha districts.',
    image: '/destinations/kyoto.jpg',
    rating: 4.9,
    tips: [
      'Visit temples early morning to avoid crowds',
      'Try traditional kaiseki cuisine',
      'Rent a kimono for authentic photos'
    ],
    bestTime: 'March to May, September to November',
    category: 'culture'
  },
  {
    id: '3',
    name: 'Patagonia',
    country: 'Chile/Argentina',
    coordinates: [-50.9423, -73.4068],
    description: 'Vast wilderness with glaciers, mountains, and incredible hiking opportunities.',
    image: '/destinations/patagonia.jpg',
    rating: 4.7,
    tips: [
      'Pack layers - weather changes quickly',
      'Book accommodations well in advance',
      'Bring good hiking boots'
    ],
    bestTime: 'December to March',
    category: 'adventure'
  },
  {
    id: '4',
    name: 'Bali',
    country: 'Indonesia',
    coordinates: [-8.4095, 115.1889],
    description: 'Tropical paradise with temples, rice terraces, and beautiful beaches.',
    image: '/destinations/bali.jpg',
    rating: 4.6,
    tips: [
      'Rent a scooter to explore freely',
      'Visit rice terraces early morning',
      'Respect local temple customs'
    ],
    bestTime: 'April to October',
    category: 'beach'
  },
  {
    id: '5',
    name: 'Iceland',
    country: 'Iceland',
    coordinates: [64.9631, -19.0208],
    description: 'Land of fire and ice with geysers, waterfalls, and northern lights.',
    image: '/destinations/iceland.jpg',
    rating: 4.8,
    tips: [
      'Rent a 4WD for Ring Road trip',
      'Visit Blue Lagoon early or late',
      'Check aurora forecasts for northern lights'
    ],
    bestTime: 'June to August, September to March (aurora)',
    category: 'nature'
  }
]

const categories = [
  { id: 'all', name: 'All Destinations', icon: '🌍' },
  { id: 'adventure', name: 'Adventure', icon: '🏔️' },
  { id: 'culture', name: 'Culture', icon: '🏛️' },
  { id: 'nature', name: 'Nature', icon: '🌲' },
  { id: 'city', name: 'City', icon: '🏙️' },
  { id: 'beach', name: 'Beach', icon: '🏖️' }
]

export default function MapPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>(destinations)

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredDestinations(destinations)
    } else {
      setFilteredDestinations(
        destinations.filter(dest => dest.category === selectedCategory)
      )
    }
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-travel-dark mb-2">
            Interactive Travel Map
          </h1>
          <p className="text-gray-600">
            Explore amazing destinations around the world with insider tips and recommendations.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            {/* Category Filter */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`btn btn-sm ${
                      selectedCategory === category.id
                        ? 'btn-primary'
                        : 'btn-outline'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <MapComponent
                destinations={filteredDestinations}
                selectedDestination={selectedDestination}
                onDestinationSelect={setSelectedDestination}
              />
            </div>

            {/* Ad Space */}
            <div className="mt-6">
              <AdSpace 
                id="map-banner"
                className="w-full h-24"
                placeholder="Map Advertisement - 728x90"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Destination Details */}
            {selectedDestination ? (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-travel-primary to-travel-secondary flex items-center justify-center text-white text-6xl">
                  📍
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-travel-dark">
                      {selectedDestination.name}
                    </h3>
                    <div className="flex items-center text-amber-500">
                      <Star className="w-4 h-4 fill-current mr-1" />
                      {selectedDestination.rating}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-2" />
                    {selectedDestination.country}
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    {selectedDestination.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-travel-dark mb-2 flex items-center">
                        <Info className="w-4 h-4 mr-2" />
                        Travel Tips
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {selectedDestination.tips.map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-travel-primary mr-2">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-travel-dark mb-1">
                        Best Time to Visit
                      </h4>
                      <p className="text-sm text-gray-600">
                        {selectedDestination.bestTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <MapPin className="w-12 h-12 text-travel-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-travel-dark mb-2">
                  Select a Destination
                </h3>
                <p className="text-gray-600">
                  Click on any marker on the map to see detailed information, 
                  tips, and recommendations for that destination.
                </p>
              </div>
            )}

            {/* Destination List */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-travel-dark mb-4 flex items-center">
                <Camera className="w-5 h-5 mr-2" />
                All Destinations
              </h3>
              <div className="space-y-3">
                {filteredDestinations.map((destination) => (
                  <button
                    key={destination.id}
                    onClick={() => setSelectedDestination(destination)}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      selectedDestination?.id === destination.id
                        ? 'bg-travel-primary text-white'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className={`font-medium ${
                          selectedDestination?.id === destination.id
                            ? 'text-white'
                            : 'text-travel-dark'
                        }`}>
                          {destination.name}
                        </h4>
                        <p className={`text-sm ${
                          selectedDestination?.id === destination.id
                            ? 'text-blue-100'
                            : 'text-gray-600'
                        }`}>
                          {destination.country}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 fill-current text-amber-400 mr-1" />
                        <span className={`text-sm ${
                          selectedDestination?.id === destination.id
                            ? 'text-white'
                            : 'text-gray-600'
                        }`}>
                          {destination.rating}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar Ad */}
            <AdSpace 
              id="map-sidebar"
              className="w-full h-64"
              placeholder="Sidebar Advertisement"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
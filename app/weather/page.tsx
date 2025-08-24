'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Cloud, MapPin, Search, Thermometer, Wind, Droplets } from 'lucide-react'
import WeatherWidget from '@/components/weather/WeatherWidget'
import AdSpace from '@/components/ads/AdSpace'

const popularDestinations = [
  { name: 'Paris', country: 'France', coords: [48.8566, 2.3522] },
  { name: 'Tokyo', country: 'Japan', coords: [35.6762, 139.6503] },
  { name: 'New York', country: 'USA', coords: [40.7128, -74.0060] },
  { name: 'London', country: 'UK', coords: [51.5074, -0.1278] },
  { name: 'Sydney', country: 'Australia', coords: [-33.8688, 151.2093] },
  { name: 'Rio de Janeiro', country: 'Brazil', coords: [-22.9068, -43.1729] }
]

export default function WeatherPage() {
  const [searchCity, setSearchCity] = useState('')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
        <div className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Cloud className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Travel Weather Forecast
            </h1>
            <p className="text-xl opacity-90">
              Check weather conditions worldwide to plan your perfect trip.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Search Section */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-travel-dark">
              Search Weather by City
            </h2>
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter city name..."
                  className="input input-bordered pl-10 w-full"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                />
              </div>
              <button className="btn btn-primary">
                <Search className="w-4 h-4 mr-2" />
                Search
              </button>
            </div>
          </div>
        </section>

        {/* Popular Destinations Weather */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-travel-dark text-center mb-8">
            Popular Destinations
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularDestinations.map((destination, index) => (
              <motion.div
                key={destination.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{destination.name}</h3>
                      <p className="opacity-80 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {destination.country}
                      </p>
                    </div>
                    <div className="text-4xl">☀️</div>
                  </div>
                  
                  <div className="text-3xl font-bold mb-2">22°C</div>
                  <div className="text-sm opacity-90 mb-4">Partly Cloudy</div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Droplets className="w-4 h-4 mr-2" />
                      Humidity: 65%
                    </div>
                    <div className="flex items-center">
                      <Wind className="w-4 h-4 mr-2" />
                      Wind: 12 km/h
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Best for travel</span>
                    <span className="badge badge-success badge-sm">Excellent</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Ad Space */}
        <section className="mb-12">
          <AdSpace 
            id="weather-banner"
            className="w-full h-32"
            placeholder="Weather Page Advertisement"
          />
        </section>

        {/* Interactive Widget */}
        <section>
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-travel-dark mb-6 text-center">
              Interactive Weather Widget
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <WeatherWidget />
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-travel-dark">
                  Travel Weather Tips
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-travel-primary mr-2">•</span>
                    Check weather 7-10 days before your trip
                  </li>
                  <li className="flex items-start">
                    <span className="text-travel-primary mr-2">•</span>
                    Pack layers for temperature changes
                  </li>
                  <li className="flex items-start">
                    <span className="text-travel-primary mr-2">•</span>
                    Consider seasonal patterns for your destination
                  </li>
                  <li className="flex items-start">
                    <span className="text-travel-primary mr-2">•</span>
                    Download offline weather apps for remote areas
                  </li>
                  <li className="flex items-start">
                    <span className="text-travel-primary mr-2">•</span>
                    Check local weather alerts and warnings
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
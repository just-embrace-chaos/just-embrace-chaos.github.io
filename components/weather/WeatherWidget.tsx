'use client'

import { useState, useEffect } from 'react'
import { Cloud, Sun, CloudRain, MapPin, Thermometer } from 'lucide-react'

interface WeatherData {
  location: string
  temperature: number
  description: string
  humidity: number
  windSpeed: number
  icon: string
}

const DEMO_CITIES = [
  'Paris', 'Tokyo', 'New York', 'London', 'Sydney', 'Rio de Janeiro'
]

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCity, setSelectedCity] = useState('Paris')

  // Demo weather data (replace with real API in production)
  const getDemoWeather = (city: string): WeatherData => {
    const demos: { [key: string]: WeatherData } = {
      'Paris': {
        location: 'Paris, FR',
        temperature: 22,
        description: 'Partly cloudy',
        humidity: 65,
        windSpeed: 12,
        icon: '⛅'
      },
      'Tokyo': {
        location: 'Tokyo, JP',
        temperature: 28,
        description: 'Sunny',
        humidity: 70,
        windSpeed: 8,
        icon: '☀️'
      },
      'New York': {
        location: 'New York, US',
        temperature: 25,
        description: 'Light rain',
        humidity: 80,
        windSpeed: 15,
        icon: '🌦️'
      },
      'London': {
        location: 'London, UK',
        temperature: 18,
        description: 'Cloudy',
        humidity: 75,
        windSpeed: 10,
        icon: '☁️'
      },
      'Sydney': {
        location: 'Sydney, AU',
        temperature: 24,
        description: 'Clear sky',
        humidity: 60,
        windSpeed: 14,
        icon: '☀️'
      },
      'Rio de Janeiro': {
        location: 'Rio de Janeiro, BR',
        temperature: 30,
        description: 'Thunderstorm',
        humidity: 85,
        windSpeed: 20,
        icon: '⛈️'
      }
    }
    return demos[city] || demos['Paris']
  }

  // Uncomment and configure for real OpenWeatherMap API
  /*
  const fetchWeather = async (city: string) => {
    try {
      const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      const data = await response.json()
      
      setWeather({
        location: `${data.name}, ${data.sys.country}`,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
        icon: getWeatherIcon(data.weather[0].main)
      })
    } catch (error) {
      console.error('Error fetching weather:', error)
      setWeather(getDemoWeather(city))
    } finally {
      setLoading(false)
    }
  }
  */

  useEffect(() => {
    setLoading(true)
    // Simulate API call delay
    const timer = setTimeout(() => {
      setWeather(getDemoWeather(selectedCity))
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [selectedCity])

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear': return '☀️'
      case 'clouds': return '☁️'
      case 'rain': return '🌧️'
      case 'thunderstorm': return '⛈️'
      case 'snow': return '❄️'
      default: return '⛅'
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-white/30 rounded mb-2"></div>
        <div className="h-8 bg-white/30 rounded mb-2"></div>
        <div className="h-4 bg-white/30 rounded"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* City Selector */}
      <select 
        className="select select-bordered select-sm w-full bg-white/20 text-white border-white/30"
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        {DEMO_CITIES.map(city => (
          <option key={city} value={city} className="text-black">
            {city}
          </option>
        ))}
      </select>

      {weather && (
        <>
          {/* Main Weather Display */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center text-sm opacity-90 mb-1">
                <MapPin className="w-3 h-3 mr-1" />
                {weather.location}
              </div>
              <div className="text-3xl font-bold flex items-center">
                <span className="text-2xl mr-2">{weather.icon}</span>
                {weather.temperature}°C
              </div>
              <div className="text-sm opacity-80 capitalize">
                {weather.description}
              </div>
            </div>
          </div>

          {/* Weather Details */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center">
              <Thermometer className="w-3 h-3 mr-1" />
              Humidity: {weather.humidity}%
            </div>
            <div className="flex items-center">
              <Cloud className="w-3 h-3 mr-1" />
              Wind: {weather.windSpeed} km/h
            </div>
          </div>
        </>
      )}
    </div>
  )
}
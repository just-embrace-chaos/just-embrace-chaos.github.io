'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Cloud, Mail, Globe, Camera, Heart } from 'lucide-react'
import WeatherWidget from '@/components/weather/WeatherWidget'
import BlogPreview from '@/components/blog/BlogPreview'
import AdSpace from '@/components/ads/AdSpace'

export default function HomePage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="loading-shimmer h-screen"></div>
  }

  return (
    <>
      {/* Hero Section with Animated Blob */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50">
        {/* Animated Background Blob */}
        <div className="absolute top-20 left-10 w-72 h-72 blob animate-blob opacity-20"></div>
        <div className="absolute top-40 right-10 w-64 h-64 blob animate-blob-slow opacity-15"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 blob animate-blob opacity-10"></div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold text-travel-dark mb-6 text-shadow"
          >
            Just Embrace
            <br />
            <span className="text-travel-primary">CHAOS</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-travel-dark/70 mb-8 leading-relaxed"
          >
            Discover the world's most incredible destinations, get real-time weather updates, 
            and let wanderlust guide your next adventure.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {/* <Link href="/destinations" className="btn btn-primary btn-lg">
              <Globe className="w-5 h-5 mr-2" />
              Explore Destinations
            </Link> */}
            <Link href="/map" className="btn btn-outline btn-lg">
              <MapPin className="w-5 h-5 mr-2" />
              Explore Destinations
            </Link>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 left-10 text-4xl opacity-30"
        >
          ✈️
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 right-20 text-4xl opacity-30"
        >
          🗺️
        </motion.div>
      </section>

      {/* Quick Access Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Weather Widget */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="card bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg"
            >
              <div className="card-body">
                <h3 className="card-title flex items-center">
                  <Cloud className="w-6 h-6 mr-2" />
                  Weather Forecast
                </h3>
                <WeatherWidget />
              </div>
            </motion.div>

            {/* Latest Blog Posts */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card bg-base-100 shadow-lg"
            >
              <div className="card-body">
                <h3 className="card-title flex items-center text-travel-dark">
                  <Camera className="w-6 h-6 mr-2" />
                  Latest Adventures
                </h3>
                <BlogPreview />
                <div className="card-actions">
                  <Link href="/blog" className="btn btn-primary btn-sm">
                    Read All Posts
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Contact Form Teaser */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg"
            >
              <div className="card-body">
                <h3 className="card-title flex items-center">
                  <Heart className="w-6 h-6 mr-2" />
                  Join Our Community
                </h3>
                <p className="mb-4">
                  Share your travel stories and get personalized recommendations!
                </p>
                <div className="card-actions">
                  <Link href="/contact" className="btn btn-outline btn-white">
                    <Mail className="w-4 h-4 mr-2" />
                    Get In Touch
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ad Space */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <AdSpace 
            id="home-banner"
            className="w-full h-32"
            placeholder="Advertisement Banner - 728x90"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-travel-primary to-travel-secondary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Embrace the Chaos?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start your journey today and discover destinations that will change your perspective.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/map" className="btn btn-white btn-lg">
              <MapPin className="w-5 h-5 mr-2" />
              Explore Map
            </Link>
            <Link href="/contact" className="btn btn-outline btn-white btn-lg">
              <Mail className="w-5 h-5 mr-2" />
              Plan My Trip
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
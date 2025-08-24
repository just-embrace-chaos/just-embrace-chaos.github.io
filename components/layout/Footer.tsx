import Link from 'next/link'
import { Globe, Mail, MapPin, FileText, Cloud } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-travel-dark text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center text-2xl font-bold mb-4">
              <Globe className="w-8 h-8 mr-3 text-travel-primary" />
              Just Embrace Chaos
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              Your ultimate travel companion for discovering amazing destinations, 
              getting weather updates, and embracing the beautiful chaos of wanderlust.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="btn btn-circle btn-outline btn-sm" aria-label="Facebook">
                📘
              </a>
              <a href="#" className="btn btn-circle btn-outline btn-sm" aria-label="Twitter">
                🐦
              </a>
              <a href="#" className="btn btn-circle btn-outline btn-sm" aria-label="Instagram">
                📷
              </a>
              <a href="#" className="btn btn-circle btn-outline btn-sm" aria-label="YouTube">
                📺
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-travel-primary">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="flex items-center text-gray-300 hover:text-white transition-colors">
                  <Globe className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/map" className="flex items-center text-gray-300 hover:text-white transition-colors">
                  <MapPin className="w-4 h-4 mr-2" />
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/blog" className="flex items-center text-gray-300 hover:text-white transition-colors">
                  <FileText className="w-4 h-4 mr-2" />
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/weather" className="flex items-center text-gray-300 hover:text-white transition-colors">
                  <Cloud className="w-4 h-4 mr-2" />
                  Weather
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-travel-primary">Get in Touch</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-2" />
                hello@justembracechaos.com
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Form
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-gray-300 hover:text-white transition-colors">
                  Interactive Map
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Just Embrace Chaos. All rights reserved. 
            Built with ❤️ for travelers worldwide.
          </p>
        </div>
      </div>
    </footer>
  )
}
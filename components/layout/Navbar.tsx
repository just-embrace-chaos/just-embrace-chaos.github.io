'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Globe, Map, FileText, Mail, Cloud } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/', icon: Globe },
  { name: 'Destinations', href: '/map', icon: Map },
  { name: 'Blog', href: '/blog', icon: FileText },
  { name: 'Weather', href: '/weather', icon: Cloud },
  { name: 'Contact', href: '/contact', icon: Mail },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="navbar bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto">
        {/* Logo */}
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost text-xl font-bold text-travel-primary">
            <Globe className="w-6 h-6 mr-2" />
            Just Embrace Chaos
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className={`flex items-center gap-2 ${
                      isActive 
                        ? 'bg-travel-primary text-white' 
                        : 'hover:bg-travel-primary hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="navbar-end lg:hidden">
          <button
            className="btn btn-ghost"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg lg:hidden">
            <ul className="menu p-4 gap-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className={`flex items-center gap-2 ${
                        isActive 
                          ? 'bg-travel-primary text-white' 
                          : 'hover:bg-travel-primary hover:text-white'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}
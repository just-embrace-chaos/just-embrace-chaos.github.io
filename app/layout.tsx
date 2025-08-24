import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://just-embrace-chaos.github.io'),
  title: {
    default: 'Just Embrace Chaos - Travel the World',
    template: '%s | Just Embrace Chaos'
  },
  description: 'Discover amazing travel destinations, get weather updates, explore interactive maps, and embrace the chaos of wanderlust. Your ultimate travel companion.',
  keywords: [
    'travel',
    'adventure',
    'destinations',
    'weather',
    'maps',
    'travel tips',
    'wanderlust',
    'explore world'
  ],
  authors: [{ name: 'Just Embrace Chaos Team' }],
  creator: 'Just Embrace Chaos',
  publisher: 'Just Embrace Chaos',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://just-embrace-chaos.github.io',
    siteName: 'Just Embrace Chaos',
    title: 'Just Embrace Chaos - Travel the World',
    description: 'Discover amazing travel destinations and embrace the chaos of wanderlust.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Just Embrace Chaos Travel'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Just Embrace Chaos - Travel the World',
    description: 'Discover amazing travel destinations and embrace the chaos of wanderlust.',
    creator: '@justembracechaos',
    images: ['/og-image.jpg']
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0ea5e9'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="travel">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="preconnect"
          href="https://api.openweathermap.org"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
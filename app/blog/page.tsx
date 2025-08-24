'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Calendar, User, Tag, Search, ArrowRight, Clock } from 'lucide-react'
import AdSpace from '@/components/ads/AdSpace'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  category: string
  tags: string[]
  image: string
  slug: string
  readTime: number
  featured: boolean
}

// Demo blog posts (in production, this would come from a CMS or API)
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Hidden Gems of Southeast Asia: Beyond the Tourist Trail',
    excerpt: 'Discover breathtaking locations off the beaten path in Southeast Asia that will leave you mesmerized and wanting more.',
    content: '# Hidden Gems of Southeast Asia\n\nSoutheast Asia is known for its popular destinations like Bali, Thailand, and Singapore. But venture off the beaten path, and you\'ll discover hidden treasures...',
    date: '2024-08-20',
    author: 'Sarah Chen',
    category: 'Destinations',
    tags: ['Southeast Asia', 'Hidden Gems', 'Adventure'],
    image: '/blog/southeast-asia.jpg',
    slug: 'hidden-gems-southeast-asia',
    readTime: 8,
    featured: true
  },
  {
    id: '2',
    title: 'Budget Travel Tips for Europe: Exploring Without Breaking the Bank',
    excerpt: 'Learn how to explore Europe affordably with insider tips on accommodation, transportation, and dining.',
    content: '# Budget Travel Tips for Europe\n\nEurope doesn\'t have to be expensive. With these proven strategies, you can explore the continent on a shoestring budget...',
    date: '2024-08-18',
    author: 'Mike Rodriguez',
    category: 'Tips & Guides',
    tags: ['Budget Travel', 'Europe', 'Money Saving'],
    image: '/blog/europe-budget.jpg',
    slug: 'budget-travel-europe',
    readTime: 12,
    featured: false
  },
  {
    id: '3',
    title: 'Best Photography Spots in Iceland: Capturing the Land of Fire and Ice',
    excerpt: 'From dramatic waterfalls to stunning northern lights, discover Iceland\'s most photogenic locations.',
    content: '# Photography in Iceland\n\nIceland is a photographer\'s paradise. From the otherworldly landscapes to the dancing northern lights...',
    date: '2024-08-15',
    author: 'Emma Thompson',
    category: 'Photography',
    tags: ['Iceland', 'Photography', 'Landscape'],
    image: '/blog/iceland-photography.jpg',
    slug: 'iceland-photography-spots',
    readTime: 10,
    featured: true
  },
  {
    id: '4',
    title: 'Solo Female Travel Safety: Essential Tips for Confident Adventures',
    excerpt: 'Comprehensive guide to staying safe while traveling solo as a woman, with practical tips from experienced travelers.',
    content: '# Solo Female Travel Safety\n\nTraveling solo as a woman can be incredibly empowering and rewarding. Here are essential safety tips...',
    date: '2024-08-12',
    author: 'Lisa Park',
    category: 'Safety',
    tags: ['Solo Travel', 'Female Travel', 'Safety'],
    image: '/blog/solo-female-travel.jpg',
    slug: 'solo-female-travel-safety',
    readTime: 15,
    featured: false
  },
  {
    id: '5',
    title: 'Sustainable Travel: How to Explore the World Responsibly',
    excerpt: 'Learn how to minimize your environmental impact while traveling and support local communities.',
    content: '# Sustainable Travel Guide\n\nTraveling sustainably is more important than ever. Here\'s how you can explore the world while being environmentally conscious...',
    date: '2024-08-10',
    author: 'David Kim',
    category: 'Sustainability',
    tags: ['Sustainable Travel', 'Eco-friendly', 'Responsible Tourism'],
    image: '/blog/sustainable-travel.jpg',
    slug: 'sustainable-travel-guide',
    readTime: 9,
    featured: false
  },
  {
    id: '6',
    title: 'Food Adventures: Street Food Capitals of the World',
    excerpt: 'Embark on a culinary journey through the world\'s best street food destinations and learn what to try.',
    content: '# World\'s Best Street Food\n\nStreet food offers an authentic taste of local culture. Here are the top destinations for food lovers...',
    date: '2024-08-08',
    author: 'Maria Garcia',
    category: 'Food & Culture',
    tags: ['Street Food', 'Culinary Travel', 'Food Culture'],
    image: '/blog/street-food.jpg',
    slug: 'street-food-capitals',
    readTime: 11,
    featured: false
  }
]

const categories = ['All', 'Destinations', 'Tips & Guides', 'Photography', 'Safety', 'Sustainability', 'Food & Culture']

export default function BlogPage() {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  // Filter posts based on category and search term
  useEffect(() => {
    let filtered = blogPosts

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredPosts(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [selectedCategory, searchTerm])

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)
  const featuredPosts = blogPosts.filter(post => post.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-travel-primary to-travel-secondary text-white">
        <div className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Travel Stories & Guides
            </h1>
            <p className="text-xl opacity-90">
              Real experiences, practical tips, and inspiring adventures from travelers around the world.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-travel-dark mb-6">Featured Stories</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.slice(0, 2).map((post) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="h-64 bg-gradient-to-br from-travel-primary to-travel-secondary flex items-center justify-center text-6xl text-white">
                    📸
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <span className="badge badge-primary badge-sm mr-2">{post.category}</span>
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                      <Clock className="w-4 h-4 ml-4 mr-1" />
                      {post.readTime} min read
                    </div>
                    <h3 className="text-xl font-bold text-travel-dark mb-3 hover:text-travel-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="btn btn-primary btn-sm"
                      >
                        Read More <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        )}

        {/* Filter and Search Section */}
        <section className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="input input-bordered pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`btn btn-sm ${
                      selectedCategory === category
                        ? 'btn-primary'
                        : 'btn-outline'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Ad Space */}
        <section className="mb-8">
          <AdSpace 
            id="blog-banner"
            className="w-full h-32"
            placeholder="Blog Advertisement Banner"
          />
        </section>

        {/* Blog Posts Grid */}
        <section className="mb-8">
          {paginatedPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-4xl text-white">
                    🌍
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-xs text-gray-600 mb-3">
                      <span className="badge badge-outline badge-xs mr-2">{post.category}</span>
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                      <Clock className="w-3 h-3 ml-3 mr-1" />
                      {post.readTime} min
                    </div>
                    <h3 className="text-lg font-bold text-travel-dark mb-3 hover:text-travel-primary transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-600">
                        <User className="w-3 h-3 mr-1" />
                        {post.author}
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-travel-primary text-sm font-medium hover:underline flex items-center"
                      >
                        Read More <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>
                    </div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="badge badge-ghost badge-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No articles found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <section className="flex justify-center">
            <div className="join">
              <button
                className="join-item btn"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                «
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`join-item btn ${
                    currentPage === page ? 'btn-active' : ''
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                className="join-item btn"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                »
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
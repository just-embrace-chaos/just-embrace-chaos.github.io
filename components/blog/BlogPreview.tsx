import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  image: string
  slug: string
}

// Demo blog posts (in a real app, this would come from your CMS or API)
const recentPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Hidden Gems of Southeast Asia',
    excerpt: 'Discover breathtaking locations off the beaten path...',
    date: '2024-08-20',
    image: '/blog/southeast-asia.jpg',
    slug: 'hidden-gems-southeast-asia'
  },
  {
    id: '2',
    title: 'Budget Travel Tips for Europe',
    excerpt: 'How to explore Europe without breaking the bank...',
    date: '2024-08-18',
    image: '/blog/europe-budget.jpg',
    slug: 'budget-travel-europe'
  },
  {
    id: '3',
    title: 'Best Photography Spots in Iceland',
    excerpt: 'Capture the magic of the land of fire and ice...',
    date: '2024-08-15',
    image: '/blog/iceland-photography.jpg',
    slug: 'iceland-photography-spots'
  }
]

export default function BlogPreview() {
  return (
    <div className="space-y-3">
      {recentPosts.slice(0, 2).map((post) => (
        <Link
          key={post.id}
          href={`/blog/${post.slug}`}
          className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group"
        >
          <div className="flex items-start space-x-3">
            <div className="w-16 h-16 bg-gradient-to-br from-travel-primary to-travel-secondary rounded-lg flex-shrink-0 flex items-center justify-center text-white font-semibold">
              📸
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-gray-900 group-hover:text-travel-primary transition-colors line-clamp-2">
                {post.title}
              </h4>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center text-xs text-gray-500 mt-2">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
                <ArrowRight className="w-3 h-3 ml-auto group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
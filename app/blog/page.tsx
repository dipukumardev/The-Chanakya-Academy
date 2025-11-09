'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Plus, Calendar, User, Eye, Heart, MessageCircle, Tag, FileText, Sparkles, Filter, TrendingUp, BookOpen } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

interface Blog {
  _id: string
  title: string
  excerpt: string
  author: {
    name: string
  }
  tags: string[]
  publishedAt: string
  views: number
  likes: string[]
  comments: any[]
  featuredImage?: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  })
  const [allTags, setAllTags] = useState<string[]>([])

  useEffect(() => {
    fetchBlogs()
    fetchTags()
  }, [pagination.page, searchTerm, selectedTag])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(searchTerm && { search: searchTerm }),
        ...(selectedTag && { tag: selectedTag })
      })

      const response = await fetch(`/api/blogs?${params}`)
      const data = await response.json()

      if (data.success) {
        setBlogs(data.blogs)
        setPagination(data.pagination)
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTags = async () => {
    try {
      const response = await fetch('/api/blogs/tags')
      const data = await response.json()
      if (data.success) {
        setAllTags(data.tags)
      }
    } catch (error) {
      console.error('Error fetching tags:', error)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="h-20 w-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-lg">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 h-8 w-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-yellow-800" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover insights, tips, and stories from The Chanakya Academy community. 
            Learn from experts and share your knowledge with fellow learners.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-8"
        >
          <div className="flex items-center mb-6">
            <Filter className="h-6 w-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-bold text-gray-900">Search & Filter</h2>
          </div>
          
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search blogs by title, content, or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 text-gray-900"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg"
            >
              <Search className="w-5 h-5 mr-2 inline" />
              Search
            </motion.button>
          </form>

          {/* Tags Filter */}
          <div className="space-y-3">
            <div className="flex items-center">
              <Tag className="h-5 w-5 text-gray-600 mr-2" />
              <span className="text-sm font-semibold text-gray-700">Filter by Tags:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <motion.button
                onClick={() => setSelectedTag('')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedTag === '' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : 'bg-white/60 text-gray-700 hover:bg-white/80 border border-gray-200'
                }`}
              >
                <TrendingUp className="inline w-4 h-4 mr-2" />
                All Posts
              </motion.button>
              {allTags.map((tag) => (
                <motion.button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedTag === tag 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                      : 'bg-white/60 text-gray-700 hover:bg-white/80 border border-gray-200'
                  }`}
                >
                  <Tag className="inline w-4 h-4 mr-2" />
                  {tag}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Create Blog Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 text-center"
        >
          <Link
            href="/blog/create"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
          >
            <Plus className="w-6 h-6 mr-3" />
            Write a New Blog Post
          </Link>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
              <div className="absolute inset-0 rounded-full border-2 border-blue-200"></div>
            </div>
            <p className="mt-6 text-gray-600 text-lg font-medium">Loading amazing content...</p>
          </motion.div>
        )}

        {/* Blogs Grid */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-white/20 group"
              >
                {blog.featuredImage ? (
                  <div className="h-56 bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                ) : (
                  <div className="h-56 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <FileText className="h-16 w-16 text-white opacity-80" />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs rounded-full font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                    {blog.tags.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                        +{blog.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="font-medium">{blog.author.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                      <span>{formatDate(blog.publishedAt)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1 text-green-500" />
                        <span className="font-medium">{blog.views}</span>
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-1 text-red-500" />
                        <span className="font-medium">{blog.likes.length}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1 text-blue-500" />
                        <span className="font-medium">{blog.comments.length}</span>
                      </div>
                    </div>
                    
                    <Link
                      href={`/blog/${blog._id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors group-hover:translate-x-1 transform duration-200"
                    >
                      Read More
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && blogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-12 max-w-md mx-auto">
              <div className="text-gray-400 mb-6">
                <FileText className="w-20 h-20 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No blogs found</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {searchTerm || selectedTag 
                  ? 'Try adjusting your search terms or filters to find what you\'re looking for.'
                  : 'Be the first to share your knowledge and insights with the community!'
                }
              </p>
              <Link
                href="/blog/create"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg"
              >
                <Plus className="w-6 h-6 mr-3" />
                {searchTerm || selectedTag ? 'Clear Filters' : 'Write First Blog'}
              </Link>
            </div>
          </motion.div>
        )}

        {/* Pagination */}
        {!loading && pagination.pages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-center mt-16"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4">
              <div className="flex space-x-2">
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                  <motion.button
                    key={page}
                    onClick={() => setPagination(prev => ({ ...prev, page }))}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                      page === pagination.page
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-white/60 text-gray-700 hover:bg-white/80 border border-gray-200'
                    }`}
                  >
                    {page}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  )
}

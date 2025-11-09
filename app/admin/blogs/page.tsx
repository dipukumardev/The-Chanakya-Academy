'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  FileText, Search, Filter, Plus, Edit, Trash2, Eye, 
  Users, Heart, MessageCircle, Calendar, TrendingUp, 
  MoreVertical, Download, Upload, EyeOff, CheckCircle
} from 'lucide-react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

interface Blog {
  id: string
  title: string
  excerpt: string
  author: string
  publishedAt: string
  status: 'published' | 'draft' | 'archived'
  views: number
  likes: number
  comments: number
  category: string
  featuredImage: string
  tags: string[]
}

export default function AdminBlogs() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [selectedBlogs, setSelectedBlogs] = useState<string[]>([])

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/admin/login')
      return
    }
    if (session.user.role !== 'admin') {
      router.push('/student/dashboard')
      return
    }
    
    fetchBlogs()
  }, [session, status, router])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      // Fetch real blog data from API
      const response = await fetch('/api/blogs?limit=50')
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.blogs) {
          const transformedBlogs = data.blogs.map((blog: any) => ({
            id: blog._id || blog.id,
            title: blog.title || 'Untitled',
            excerpt: blog.excerpt || 'No excerpt available',
            author: typeof blog.author === 'object' ? blog.author?.name || 'Unknown Author' : blog.author || 'Unknown Author',
            publishedAt: blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : 'Unknown Date',
            status: blog.published ? 'published' : 'draft',
            views: blog.views || 0,
            likes: blog.likes || 0,
            comments: blog.comments || 0,
            category: blog.tags?.[0] || 'General',
            featuredImage: blog.featuredImage || '',
            tags: blog.tags || []
          }))
          setBlogs(transformedBlogs)
        }
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
      // Fallback to mock data
      const mockBlogs: Blog[] = [
        {
          id: '1',
          title: 'How to Prepare for IIT JEE 2024',
          excerpt: 'Complete guide to IIT JEE preparation with study tips and strategies.',
          author: 'Dr. Rajesh Kumar',
          publishedAt: '2024-01-20',
          status: 'published',
          views: 1250,
          likes: 89,
          comments: 23,
          category: 'Engineering',
          featuredImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
          tags: ['Engineering', 'IIT JEE', 'Preparation']
        },
        {
          id: '2',
          title: 'NEET 2024: Biology Preparation Tips',
          excerpt: 'Essential biology topics and preparation strategies for NEET aspirants.',
          author: 'Prof. Priya Sharma',
          publishedAt: '2024-01-18',
          status: 'published',
          views: 980,
          likes: 67,
          comments: 15,
          category: 'Medical',
          featuredImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
          tags: ['Medical', 'NEET', 'Biology']
        },
        {
          id: '3',
          title: 'UPSC Current Affairs: January 2024',
          excerpt: 'Important current affairs for UPSC preparation covering national and international events.',
          author: 'Dr. Amit Singh',
          publishedAt: '2024-01-15',
          status: 'published',
          views: 750,
          likes: 45,
          comments: 12,
          category: 'Civil Services',
          featuredImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
          tags: ['Civil Services', 'UPSC', 'Current Affairs']
        },
        {
          id: '4',
          title: 'Banking Exam Preparation Guide',
          excerpt: 'Comprehensive guide for banking exam preparation with tips and tricks.',
          author: 'Ms. Neha Gupta',
          publishedAt: '2024-01-12',
          status: 'draft',
          views: 0,
          likes: 0,
          comments: 0,
          category: 'Banking',
          featuredImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
          tags: ['Banking', 'SSC', 'Preparation']
        }
      ]
      setBlogs(mockBlogs)
    } finally {
      setLoading(false)
    }
  }

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || blog.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || blog.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleSelectBlog = (blogId: string) => {
    setSelectedBlogs(prev => 
      prev.includes(blogId) 
        ? prev.filter(id => id !== blogId)
        : [...prev, blogId]
    )
  }

  const handleSelectAll = () => {
    setSelectedBlogs(
      selectedBlogs.length === filteredBlogs.length 
        ? [] 
        : filteredBlogs.map(b => b.id)
    )
  }

  const handleDeleteBlog = async (blogId: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        const response = await fetch(`/api/blogs/${blogId}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          setBlogs(prev => prev.filter(blog => blog.id !== blogId))
        }
      } catch (error) {
        console.error('Error deleting blog:', error)
      }
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Blog Management
              </h1>
              <p className="text-gray-600">
                Manage all blog posts and content for The Chanakya Academy
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              <button 
                onClick={() => router.push('/blog/create')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Post
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900">{blogs.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">
                  {blogs.filter(b => b.status === 'published').length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">
                  {blogs.reduce((acc, b) => acc + b.views, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Heart className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Likes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {blogs.reduce((acc, b) => acc + b.likes, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search blogs by title, author, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="Engineering">Engineering</option>
                <option value="Medical">Medical</option>
                <option value="Civil Services">Civil Services</option>
                <option value="Banking">Banking</option>
                <option value="General">General</option>
              </select>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </button>
            </div>
          </div>
        </motion.div>

        {/* Blogs Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Blog Posts ({filteredBlogs.length})
              </h2>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedBlogs.length === filteredBlogs.length && filteredBlogs.length > 0}
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-600">Select All</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Post
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Engagement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Published
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBlogs.map((blog, index) => (
                  <motion.tr
                    key={blog.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedBlogs.includes(blog.id)}
                          onChange={() => handleSelectBlog(blog.id)}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded mr-3"
                        />
                        <div className="flex items-center">
                          {blog.featuredImage ? (
                            <img
                              src={blog.featuredImage}
                              alt={blog.title}
                              className="h-12 w-12 rounded-lg object-cover mr-4"
                            />
                          ) : (
                            <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                              <FileText className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900 line-clamp-1">
                              {blog.title}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-1">
                              {blog.excerpt}
                            </div>
                            <div className="text-xs text-gray-400">
                              {blog.category}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{blog.author}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        blog.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : blog.status === 'draft'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {blog.views}
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          {blog.likes}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {blog.comments}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{blog.publishedAt}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => router.push(`/blog/${blog.id}`)}
                          className="text-blue-600 hover:text-blue-900" 
                          title="View Post"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => router.push(`/blog/${blog.id}/edit`)}
                          className="text-indigo-600 hover:text-indigo-900" 
                          title="Edit Post"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteBlog(blog.id)}
                          className="text-red-600 hover:text-red-900" 
                          title="Delete Post"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900" title="More Options">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}

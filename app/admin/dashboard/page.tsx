'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Users, BookOpen, TrendingUp, DollarSign, Plus, Edit, Trash2, Eye, FileText, BarChart3, Settings, LogOut, Heart, Calendar, MessageCircle } from 'lucide-react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

interface Blog {
  id: string
  title: string
  excerpt: string
  author: string
  publishedAt: string
  status: 'published' | 'draft'
  views: number
  likes: number
  comments: number
  category: string
  featuredImage: string
}

interface Activity {
  id: number
  type: string
  message: string
  time: string
  icon: any
}

interface RealData {
  students: any[]
  courses: any[]
  blogs: Blog[]
  recentActivity: Activity[]
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalRevenue: 0,
    activeUsers: 0
  })
  const [loading, setLoading] = useState(true)
  const [realData, setRealData] = useState<RealData>({
    students: [],
    courses: [],
    blogs: [],
    recentActivity: []
  })

  const fetchRealData = async () => {
    try {
      setLoading(true)
      
      // Fetch admin statistics
      const statsResponse = await fetch('/api/admin/stats')
      let adminStats = null
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        if (statsData.success && statsData.stats) {
          adminStats = statsData.stats
        }
      }

      // Fetch blogs data
      const blogResponse = await fetch('/api/blogs?limit=10')
      let blogs = []
      if (blogResponse.ok) {
        const blogData = await blogResponse.json()
          if (blogData.success && blogData.blogs) {
            blogs = blogData.blogs
              .filter((blog: any) => blog && typeof blog === 'object') // Filter out invalid blogs
              .map((blog: any) => ({
                id: String(blog._id || blog.id || Math.random().toString()),
                title: String(blog.title || 'Untitled'),
                excerpt: String(blog.excerpt || 'No excerpt available'),
                author: typeof blog.author === 'object' 
                  ? String(blog.author?.name || 'Unknown Author') 
                  : String(blog.author || 'Unknown Author'),
                publishedAt: blog.publishedAt 
                  ? String(new Date(blog.publishedAt).toLocaleDateString()) 
                  : 'Unknown Date',
                status: blog.published ? 'published' : 'draft',
                views: Number(blog.views) || 0,
                likes: Number(blog.likes) || 0,
                comments: Number(blog.comments) || 0,
                category: String(blog.tags?.[0] || 'General'),
                featuredImage: String(blog.featuredImage || '')
              }))
              .filter((blog: any) => blog && blog.id) // Filter out blogs without valid IDs
          }
      }

      // Calculate real stats from blogs
      const totalBlogs = blogs.length
      const totalViews = blogs.reduce((acc: number, blog: Blog) => acc + blog.views, 0)
      const totalLikes = blogs.reduce((acc: number, blog: Blog) => acc + blog.likes, 0)
      const publishedBlogs = blogs.filter((blog: Blog) => blog.status === 'published').length

      // Update stats with real data from API
      setStats({
        totalStudents: adminStats?.users?.totalStudents || 0,
        totalCourses: adminStats?.courses?.total || 0,
        totalRevenue: adminStats?.revenue?.total || 0,
        activeUsers: adminStats?.users?.activeUsers || 0
      })

      // Create real activity based on actual data
      const realActivities: Activity[] = []
      
      // Add blog activities based on real blog data
      blogs.slice(0, 3).forEach((blog: Blog, index: number) => {
        realActivities.push({
          id: index + 1,
          type: blog.status === 'published' ? 'blog_published' : 'blog_created',
          message: blog.status === 'published' 
            ? `Blog "${blog.title}" published` 
            : `Blog "${blog.title}" created`,
          time: blog.publishedAt,
          icon: FileText
        })
      })
      
      // Add engagement activity based on real stats
      if (adminStats?.blogs?.totalViews || totalViews > 0) {
        realActivities.push({
          id: realActivities.length + 1,
          type: 'engagement',
          message: `Total blog views: ${(adminStats?.blogs?.totalViews || totalViews).toLocaleString()}`,
          time: new Date().toLocaleDateString(),
          icon: TrendingUp
        })
      }
      
      // Add user activity based on real stats
      if (adminStats?.users?.totalStudents > 0) {
        realActivities.push({
          id: realActivities.length + 1,
          type: 'users',
          message: `${adminStats.users.totalStudents} total students enrolled`,
          time: new Date().toLocaleDateString(),
          icon: Users
        })
      }

      // Set real data
      setRealData({
        students: [], // Would be fetched from users API
        courses: [], // Would be fetched from courses API
        blogs: blogs.slice(0, 5), // Recent 5 blogs
        recentActivity: realActivities
      })

    } catch (error) {
      console.error('Error fetching real data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (status === 'loading') return
    
    // Wait a bit for session to be fully established
    const checkSession = () => {
      if (!session) {
        router.push('/admin/login')
        return
      }
      if (session.user?.role !== 'admin') {
        router.push('/student/dashboard')
        return
      }
      
      fetchRealData()
    }
    
    // Small delay to ensure session is properly loaded
    const timer = setTimeout(checkSession, 100)
    return () => clearTimeout(timer)
  }, [session, status, router])

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  // Use real data from state
  const students = realData.students
  const courses = realData.courses
  const recentActivity = realData.recentActivity

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Manage students, courses, and monitor academy performance
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={fetchRealData}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Refresh Data
              </button>
              <button 
                onClick={() => router.push('/admin/courses')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Manage Courses
              </button>
              <button 
                onClick={() => router.push('/admin/students')}
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
              >
                <Users className="h-4 w-4 mr-2" />
                Manage Students
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button 
              onClick={() => router.push('/admin/dashboard')}
              className="border-b-2 border-red-600 py-4 px-1 text-sm font-medium text-red-600"
            >
              Dashboard
            </button>
            <button 
              onClick={() => router.push('/admin/students')}
              className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              Students
            </button>
            <button 
              onClick={() => router.push('/admin/courses')}
              className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              Courses
            </button>
            <button 
              onClick={() => router.push('/admin/blogs')}
              className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              Blogs
            </button>
            <button 
              onClick={() => router.push('/admin/analytics')}
              className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              Analytics
            </button>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudents.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Real data from database</p>
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
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
                <p className="text-xs text-gray-500">Real data from database</p>
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
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{stats.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Real data from database</p>
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
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Real data from database</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Blogs Cards */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Recent Blog Posts</h2>
                  <p className="text-sm text-gray-600 mt-1">Latest content from your academy</p>
                </div>
                <button 
                  onClick={() => router.push('/admin/blogs')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View All
                </button>
              </div>
              
              {realData.blogs.length > 0 ? (
                <div className="space-y-4">
                  {realData.blogs.map((blog, index) => (
                    <motion.div
                      key={blog.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                              {String(blog.title || 'Untitled')}
                            </h3>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              blog.status === 'published' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {String(blog.status || 'draft')}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {String(blog.excerpt || 'No excerpt available')}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                <span>{String(blog.author || 'Unknown Author')}</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>{String(blog.publishedAt || 'Unknown Date')}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Eye className="h-4 w-4 mr-1" />
                                <span>{Number(blog.views) || 0}</span>
                              </div>
                              <div className="flex items-center">
                                <Heart className="h-4 w-4 mr-1" />
                                <span>{Number(blog.likes) || 0}</span>
                              </div>
                              <div className="flex items-center">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                <span>{Number(blog.comments) || 0}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          <button 
                            onClick={() => router.push(`/blog/${blog.id}`)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Post"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => router.push(`/blog/${blog.id}/edit`)}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="Edit Post"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => router.push('/admin/blogs')}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Manage"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
                  <p className="text-gray-600 mb-4">Start creating content for your academy</p>
                  <button 
                    onClick={() => router.push('/blog/create')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Create First Post
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <activity.icon className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{String(activity.message || 'No message')}</p>
                      <p className="text-xs text-gray-500">{String(activity.time || 'Unknown time')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

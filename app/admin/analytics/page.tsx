'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  TrendingUp, Users, BookOpen, DollarSign, Eye, Heart, 
  MessageCircle, Calendar, Download, Filter, RefreshCw,
  BarChart3, PieChart, LineChart, Activity
} from 'lucide-react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

interface AnalyticsData {
  overview: {
    totalStudents: number
    totalCourses: number
    totalRevenue: number
    totalBlogs: number
    activeUsers: number
    courseCompletionRate: number
    averageRating: number
    monthlyGrowth: number
  }
  studentStats: {
    newStudents: number
    activeStudents: number
    inactiveStudents: number
    completionRate: number
  }
  courseStats: {
    totalEnrollments: number
    averagePrice: number
    topCourses: Array<{
      name: string
      enrollments: number
      revenue: number
    }>
  }
  blogStats: {
    totalViews: number
    totalLikes: number
    totalComments: number
    topPosts: Array<{
      title: string
      views: number
      likes: number
    }>
  }
  revenueData: Array<{
    month: string
    revenue: number
    students: number
  }>
}

export default function AdminAnalytics() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30d')

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
    
    fetchAnalytics()
  }, [session, status, router, timeRange])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      // Mock analytics data - replace with actual API call
      const mockData: AnalyticsData = {
        overview: {
          totalStudents: 2847,
          totalCourses: 24,
          totalRevenue: 12500000,
          totalBlogs: 156,
          activeUsers: 1234,
          courseCompletionRate: 78,
          averageRating: 4.7,
          monthlyGrowth: 15
        },
        studentStats: {
          newStudents: 156,
          activeStudents: 1234,
          inactiveStudents: 1457,
          completionRate: 78
        },
        courseStats: {
          totalEnrollments: 4567,
          averagePrice: 45000,
          topCourses: [
            { name: 'IIT JEE Main & Advanced', enrollments: 1250, revenue: 62500000 },
            { name: 'NEET Medical Preparation', enrollments: 980, revenue: 44100000 },
            { name: 'UPSC Civil Services', enrollments: 750, revenue: 45000000 },
            { name: 'Banking & SSC', enrollments: 650, revenue: 22750000 },
            { name: 'CAT & MBA Preparation', enrollments: 420, revenue: 16800000 }
          ]
        },
        blogStats: {
          totalViews: 45678,
          totalLikes: 2345,
          totalComments: 567,
          topPosts: [
            { title: 'How to Prepare for IIT JEE 2024', views: 1250, likes: 89 },
            { title: 'NEET 2024: Biology Preparation Tips', views: 980, likes: 67 },
            { title: 'UPSC Current Affairs: January 2024', views: 750, likes: 45 },
            { title: 'Banking Exam Preparation Guide', views: 650, likes: 34 },
            { title: 'Time Management for Competitive Exams', views: 520, likes: 28 }
          ]
        },
        revenueData: [
          { month: 'Jan', revenue: 1200000, students: 156 },
          { month: 'Feb', revenue: 1350000, students: 178 },
          { month: 'Mar', revenue: 1420000, students: 189 },
          { month: 'Apr', revenue: 1580000, students: 201 },
          { month: 'May', revenue: 1650000, students: 215 },
          { month: 'Jun', revenue: 1720000, students: 228 }
        ]
      }
      setAnalyticsData(mockData)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!session || !analyticsData) {
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
                Analytics Dashboard
              </h1>
              <p className="text-gray-600">
                Comprehensive insights into academy performance and growth
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button 
                onClick={fetchAnalytics}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
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
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalStudents.toLocaleString()}</p>
                <p className="text-xs text-green-600">+{analyticsData.overview.monthlyGrowth}% this month</p>
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
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{(analyticsData.overview.totalRevenue / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-green-600">+12% from last month</p>
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
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Courses</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalCourses}</p>
                <p className="text-xs text-green-600">+2 new courses</p>
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
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.courseCompletionRate}%</p>
                <p className="text-xs text-green-600">+5% improvement</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
              <div className="flex items-center space-x-2">
                <LineChart className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">Monthly</span>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {analyticsData.revenueData.map((data, index) => (
                <div key={data.month} className="flex flex-col items-center flex-1">
                  <div 
                    className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg w-full mb-2 transition-all duration-500 hover:from-blue-700 hover:to-blue-500"
                    style={{ height: `${(data.revenue / 2000000) * 200}px` }}
                  ></div>
                  <span className="text-xs text-gray-600">{data.month}</span>
                  <span className="text-xs text-gray-500">₹{(data.revenue / 100000).toFixed(0)}L</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Top Performing Courses</h3>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">By Revenue</span>
              </div>
            </div>
            <div className="space-y-4">
              {analyticsData.courseStats.topCourses.slice(0, 5).map((course, index) => (
                <div key={course.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-semibold mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">{course.name}</p>
                      <p className="text-xs text-gray-500">{course.enrollments} enrollments</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">₹{(course.revenue / 1000000).toFixed(1)}M</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Student Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Student Distribution</h3>
              <div className="flex items-center space-x-2">
                <PieChart className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">Status</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Active Students</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{analyticsData.studentStats.activeStudents}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Inactive Students</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{analyticsData.studentStats.inactiveStudents}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">New Students (This Month)</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{analyticsData.studentStats.newStudents}</span>
              </div>
            </div>
          </motion.div>

          {/* Blog Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Top Blog Posts</h3>
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">By Views</span>
              </div>
            </div>
            <div className="space-y-4">
              {analyticsData.blogStats.topPosts.slice(0, 5).map((post, index) => (
                <div key={post.title} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-semibold mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">{post.title}</p>
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {post.views}
                        </span>
                        <span className="flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          {post.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{analyticsData.overview.averageRating}</div>
              <div className="text-sm text-gray-600">Average Course Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{analyticsData.blogStats.totalViews.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Blog Views</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">₹{(analyticsData.courseStats.averagePrice / 1000).toFixed(0)}K</div>
              <div className="text-sm text-gray-600">Average Course Price</div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}

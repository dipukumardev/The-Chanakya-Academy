'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { BookOpen, Clock, Award, Calendar, Users, BarChart3, Play, FileText, Eye, Heart, MessageCircle, RefreshCw } from 'lucide-react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

interface Course {
  id: number
  title: string
  instructor: string
  progress: number
  nextLesson: string
  duration: string
  totalLessons: number
  completedLessons: number
  lastAccessed: string
  averageScore: number
  thumbnail: string
}

interface Activity {
  id: number
  type: string
  title: string
  course: string
  time: string
  score: number | null
  icon: any
}

interface Event {
  id: number
  title: string
  time: string
  type: string
  duration: string
  subject: string
}

interface Blog {
  id: number
  title: string
  excerpt: string
  author: string
  publishedAt: string
  views: number
  likes: number
  comments: number
  category: string
  featuredImage?: string
}

export default function StudentDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    currentStreak: 0,
    mockTestsTaken: 0,
    assignmentsSubmitted: 0,
    doubtSessionsAttended: 0
  })
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([])
  const [recentActivity, setRecentActivity] = useState<Activity[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
      return
    }
    if (session.user.role !== 'student') {
      router.push('/admin/dashboard')
      return
    }
    
    // Fetch student data
    fetchStudentData()
  }, [session, status, router])

  const fetchStudentData = async () => {
    try {
      setLoading(true)
      
      // Fetch recent blog posts
      try {
        const blogResponse = await fetch('/api/blogs?limit=6')
        if (blogResponse.ok) {
          const blogData = await blogResponse.json()
          console.log('Blog data received:', blogData) // Debug log
          
          if (blogData.success && blogData.blogs) {
            // Transform blog data to match our interface
            const transformedBlogs = blogData.blogs
              .filter((blog: any) => blog && typeof blog === 'object') // Filter out invalid blogs
              .map((blog: any) => {
                console.log('Processing blog:', blog) // Debug log
                
                return {
                  id: blog._id || blog.id || Math.random().toString(),
                  title: blog.title || 'Untitled',
                  excerpt: blog.excerpt || 'No excerpt available',
                  author: typeof blog.author === 'object' ? blog.author?.name || 'Unknown Author' : blog.author || 'Unknown Author',
                  publishedAt: blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : 'Unknown Date',
                  views: blog.views || 0,
                  likes: blog.likes || 0,
                  comments: blog.comments || 0,
                  category: blog.tags?.[0] || 'General',
                  featuredImage: blog.featuredImage || ''
                }
              })
              .filter((blog: any) => blog && blog.id) // Filter out blogs without valid IDs
            console.log('Transformed blogs:', transformedBlogs) // Debug log
            setRecentBlogs(transformedBlogs)
          } else {
            console.log('No blogs found or API error:', blogData)
            setRecentBlogs([])
          }
        } else {
          console.error('Blog API response not ok:', blogResponse.status)
          setRecentBlogs([])
        }
      } catch (blogError) {
        console.error('Error fetching blogs:', blogError)
        setRecentBlogs([])
      }

      // TODO: Replace with actual API calls for other data when database is connected
      // For now, show empty state for other data
      setStats({
        currentStreak: 0,
        mockTestsTaken: 0,
        assignmentsSubmitted: 0,
        doubtSessionsAttended: 0
      })
      setEnrolledCourses([])
      setRecentActivity([])
      setUpcomingEvents([])
    } catch (error) {
      console.error('Error fetching student data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
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
                Welcome back, {session.user.name}!
              </h1>
              <p className="text-gray-600">
                Continue your learning journey with The Chanakya Academy
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Current Streak</p>
                <p className="text-2xl font-bold text-blue-600">{stats.currentStreak} days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Mock Tests Taken</p>
                <p className="text-2xl font-bold text-gray-900">{stats.mockTestsTaken}</p>
                <p className="text-xs text-gray-500">This semester</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Assignments</p>
                <p className="text-2xl font-bold text-gray-900">{stats.assignmentsSubmitted}</p>
                <p className="text-xs text-gray-500">Submitted</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center">
              <div className="p-2 bg-teal-100 rounded-lg">
                <Users className="h-6 w-6 text-teal-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Doubt Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.doubtSessionsAttended}</p>
                <p className="text-xs text-gray-500">Attended</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enrolled Courses */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {enrolledCourses.length > 0 ? (
                  enrolledCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{course.title}</h3>
                          <p className="text-sm text-gray-600">by {course.instructor}</p>
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                              <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                              <span>Avg: {course.averageScore}%</span>
                            </div>
                          </div>
                          <div className="mt-2 space-y-1">
                            <p className="text-sm text-gray-500">
                              Next: {course.nextLesson} ({course.duration})
                            </p>
                            <p className="text-xs text-gray-400">
                              Last accessed: {course.lastAccessed}
                            </p>
                          </div>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                          Continue
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No courses enrolled</h3>
                    <p className="text-gray-500 mb-4">Start your learning journey by enrolling in courses</p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                      Browse Courses
                    </button>
                  </div>
                )}
              </div>
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
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, index) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <activity.icon className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.course}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-gray-400">{activity.time}</p>
                          {activity.score && (
                            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                              {activity.score}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No recent activity</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event, index) => (
                    <div key={event.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{event.title}</p>
                        <p className="text-xs text-gray-500">{event.time}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-400">{event.duration}</span>
                          <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                            {event.subject}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No upcoming events</p>
                  </div>
                )}
              </div>
            </motion.div>

          </div>
        </div>

        {/* Recent Blog Posts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <FileText className="h-6 w-6 text-blue-600 mr-2" />
                Recent Blog Posts
              </h2>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={fetchStudentData}
                  className="text-gray-600 hover:text-blue-600 font-medium flex items-center"
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Refresh
                </button>
                <button 
                  onClick={() => router.push('/blog')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  View All Posts
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentBlogs.length > 0 ? (
                recentBlogs.map((blog, index) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
                    onClick={() => router.push(`/blog/${blog.id}`)}
                  >
                    <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center relative overflow-hidden">
                      {blog.featuredImage ? (
                        <img 
                          src={blog.featuredImage} 
                          alt={blog.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FileText className="h-16 w-16 text-white opacity-80" />
                      )}
                      <div className="absolute inset-0 bg-black/20"></div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {String(blog.title || 'Untitled')}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        {String(blog.excerpt || 'No excerpt available')}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span>{String(blog.author || 'Unknown Author')}</span>
                        <span>{String(blog.publishedAt || 'Unknown Date')}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {Number(blog.views) || 0}
                          </div>
                          <div className="flex items-center">
                            <Heart className="h-3 w-3 mr-1" />
                            {Number(blog.likes) || 0}
                          </div>
                          <div className="flex items-center">
                            <MessageCircle className="h-3 w-3 mr-1" />
                            {Number(blog.comments) || 0}
                          </div>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                          {String(blog.category || 'General')}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts available</h3>
                  <p className="text-gray-500 mb-4">Check back later for new educational content</p>
                  <button 
                    onClick={() => router.push('/blog')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Browse All Posts
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}

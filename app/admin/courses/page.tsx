'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  BookOpen, Search, Filter, Plus, Edit, Trash2, Eye, 
  Users, Star, DollarSign, Calendar, TrendingUp, 
  MoreVertical, Download, Upload, Play
} from 'lucide-react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

interface Course {
  id: string
  title: string
  instructor: string
  description: string
  price: number
  students: number
  rating: number
  status: 'active' | 'inactive' | 'draft'
  createdDate: string
  category: string
  duration: string
  image: string
}

export default function AdminCourses() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])

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
    
    fetchCourses()
  }, [session, status, router])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      // Mock data for now - replace with actual API call
      const mockCourses: Course[] = [
        {
          id: '1',
          title: 'IIT JEE Main & Advanced',
          instructor: 'Dr. Rajesh Kumar',
          description: 'Comprehensive preparation for IIT JEE Main and Advanced examinations with expert guidance.',
          price: 50000,
          students: 1250,
          rating: 4.8,
          status: 'active',
          createdDate: '2024-01-01',
          category: 'Engineering',
          duration: '12 months',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
        },
        {
          id: '2',
          title: 'NEET Medical Preparation',
          instructor: 'Prof. Priya Sharma',
          description: 'Complete NEET preparation with biology, physics, and chemistry modules.',
          price: 45000,
          students: 980,
          rating: 4.7,
          status: 'active',
          createdDate: '2024-01-05',
          category: 'Medical',
          duration: '10 months',
          image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop'
        },
        {
          id: '3',
          title: 'UPSC Civil Services',
          instructor: 'Dr. Amit Singh',
          description: 'Comprehensive UPSC preparation covering all subjects and current affairs.',
          price: 60000,
          students: 750,
          rating: 4.9,
          status: 'active',
          createdDate: '2024-01-10',
          category: 'Civil Services',
          duration: '18 months',
          image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop'
        },
        {
          id: '4',
          title: 'Banking & SSC',
          instructor: 'Ms. Neha Gupta',
          description: 'Preparation for banking exams and Staff Selection Commission tests.',
          price: 35000,
          students: 650,
          rating: 4.6,
          status: 'active',
          createdDate: '2024-01-15',
          category: 'Banking',
          duration: '8 months',
          image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop'
        },
        {
          id: '5',
          title: 'CAT & MBA Preparation',
          instructor: 'Prof. Vikram Joshi',
          description: 'Complete CAT preparation with quantitative aptitude, verbal ability, and logical reasoning.',
          price: 40000,
          students: 420,
          rating: 4.5,
          status: 'draft',
          createdDate: '2024-01-20',
          category: 'MBA',
          duration: '6 months',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
        }
      ]
      setCourses(mockCourses)
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    )
  }

  const handleSelectAll = () => {
    setSelectedCourses(
      selectedCourses.length === filteredCourses.length 
        ? [] 
        : filteredCourses.map(c => c.id)
    )
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading courses...</p>
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
                Course Management
              </h1>
              <p className="text-gray-600">
                Manage all courses offered by The Chanakya Academy
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Create Course
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
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
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
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">
                  {courses.reduce((acc, c) => acc + c.students, 0).toLocaleString()}
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
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Price</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{(courses.reduce((acc, c) => acc + c.price, 0) / courses.length / 1000).toFixed(0)}K
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
                <Star className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(courses.reduce((acc, c) => acc + c.rating, 0) / courses.length).toFixed(1)}
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
                  placeholder="Search courses by title, instructor, or description..."
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
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
                <option value="MBA">MBA</option>
              </select>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </button>
            </div>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Courses ({filteredCourses.length})
            </h2>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedCourses.length === filteredCourses.length && filteredCourses.length > 0}
                onChange={handleSelectAll}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-600">Select All</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      course.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : course.status === 'inactive'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {course.status}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <input
                      type="checkbox"
                      checked={selectedCourses.includes(course.id)}
                      onChange={() => handleSelectCourse(course.id)}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      {course.category}
                    </span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{course.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>By {course.instructor}</span>
                    <span>{course.duration}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students.toLocaleString()} students
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      ₹{course.price.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </button>
                    <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                    <button className="p-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors duration-200">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}

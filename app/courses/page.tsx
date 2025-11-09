'use client'

import React, { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { 
  BookOpen, Clock, Users, Star, Filter, Search, 
  TrendingUp, Award, Play, ArrowRight, CheckCircle,
  Zap, Target, Globe, Heart, Shield, Lightbulb,
  Calendar, MapPin, Phone, Mail, Facebook, Twitter,
  Instagram, Linkedin, ChevronDown, X, Menu
} from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState('grid') // grid or list

  const categories = [
    { id: 'all', name: 'All Categories', icon: BookOpen, color: 'from-blue-500 to-purple-500' },
    { id: 'IIT JEE', name: 'IIT JEE', icon: TrendingUp, color: 'from-red-500 to-orange-500' },
    { id: 'NEET', name: 'NEET', icon: Heart, color: 'from-green-500 to-teal-500' },
    { id: 'UPSC', name: 'UPSC', icon: Award, color: 'from-purple-500 to-pink-500' },
    { id: 'Banking', name: 'Banking', icon: Target, color: 'from-blue-500 to-cyan-500' },
    { id: 'SSC', name: 'SSC', icon: Shield, color: 'from-indigo-500 to-blue-500' },
    { id: 'Defense', name: 'Defense', icon: Zap, color: 'from-yellow-500 to-orange-500' }
  ]
  
  const levels = [
    { id: 'all', name: 'All Levels', color: 'bg-gray-100 text-gray-800' },
    { id: 'beginner', name: 'Beginner', color: 'bg-green-100 text-green-800' },
    { id: 'intermediate', name: 'Intermediate', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'advanced', name: 'Advanced', color: 'bg-red-100 text-red-800' }
  ]

  const courses = [
    {
      id: 1,
      title: 'IIT JEE Main & Advanced',
      description: 'Comprehensive preparation for IIT JEE with Physics, Chemistry, and Mathematics. Includes mock tests, doubt sessions, and personalized study plans.',
      instructor: 'Dr. Rajesh Kumar',
      duration: '24 months',
      level: 'intermediate',
      category: 'IIT JEE',
      price: 50000,
      originalPrice: 60000,
      rating: 4.8,
      students: 1250,
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      instructorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      features: ['Live Classes', 'Mock Tests', 'Doubt Sessions', 'Study Material'],
      isPopular: true,
      isNew: false,
      discount: 17
    },
    {
      id: 2,
      title: 'NEET Medical Preparation',
      description: 'Complete NEET preparation covering Physics, Chemistry, and Biology. Special focus on NCERT syllabus and previous year papers.',
      instructor: 'Prof. Priya Sharma',
      duration: '24 months',
      level: 'intermediate',
      category: 'NEET',
      price: 45000,
      originalPrice: 55000,
      rating: 4.7,
      students: 980,
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      instructorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      features: ['Video Lectures', 'Practice Tests', 'Biology Focus', 'NCERT Coverage'],
      isPopular: true,
      isNew: false,
      discount: 18
    },
    {
      id: 3,
      title: 'UPSC Civil Services',
      description: 'Strategic preparation for UPSC with comprehensive coverage of all subjects, current affairs, and essay writing.',
      instructor: 'Dr. Amit Singh',
      duration: '36 months',
      level: 'advanced',
      category: 'UPSC',
      price: 60000,
      originalPrice: 75000,
      rating: 4.9,
      students: 750,
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      instructorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      features: ['Current Affairs', 'Essay Writing', 'Interview Prep', 'Test Series'],
      isPopular: false,
      isNew: true,
      discount: 20
    },
    {
      id: 4,
      title: 'Banking & SSC Combined',
      description: 'Complete preparation for Banking and SSC exams with Quantitative Aptitude, Reasoning, English, and General Awareness.',
      instructor: 'Ms. Anjali Verma',
      duration: '12 months',
      level: 'beginner',
      category: 'Banking',
      price: 25000,
      originalPrice: 30000,
      rating: 4.6,
      students: 2100,
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
      instructorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      features: ['Quantitative Aptitude', 'Reasoning', 'English', 'General Awareness'],
      isPopular: false,
      isNew: false,
      discount: 17
    },
    {
      id: 5,
      title: 'Defense Services (NDA/CDS)',
      description: 'Specialized preparation for Defense Services examinations including NDA, CDS, and other defense-related exams.',
      instructor: 'Col. Ravi Sharma',
      duration: '18 months',
      level: 'intermediate',
      category: 'Defense',
      price: 35000,
      originalPrice: 40000,
      rating: 4.5,
      students: 650,
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      instructorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      features: ['Mathematics', 'General Ability', 'English', 'SSB Interview'],
      isPopular: false,
      isNew: false,
      discount: 13
    },
    {
      id: 6,
      title: 'SSC CGL & CHSL',
      description: 'Comprehensive preparation for SSC CGL and CHSL with focus on all four sections and previous year question analysis.',
      instructor: 'Mr. Vikas Gupta',
      duration: '15 months',
      level: 'beginner',
      category: 'SSC',
      price: 30000,
      originalPrice: 35000,
      rating: 4.4,
      students: 1800,
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
      instructorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      features: ['Quantitative Aptitude', 'English Language', 'General Intelligence', 'General Awareness'],
      isPopular: false,
      isNew: false,
      discount: 14
    }
  ]

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel
    
    return matchesSearch && matchesCategory && matchesLevel
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4 mr-2 text-yellow-400" />
              {courses.length}+ Premium Courses Available
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Master Your
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Competitive Exams
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Choose from our comprehensive range of courses designed by expert faculty to help you succeed in your dream career.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <button className="group bg-white text-blue-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 flex items-center">
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Demo
            </button>
            <button className="group border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Browse Courses
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">10,000+</div>
              <div className="text-white/80 text-sm">Students Enrolled</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-white/80 text-sm">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-white/80 text-sm">Expert Faculty</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">15+</div>
              <div className="text-white/80 text-sm">Years Experience</div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-3 bg-white/70 rounded-full mt-2"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Category</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our specialized course categories designed for different competitive exams
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-12">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative p-4 rounded-2xl transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:shadow-md'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedCategory === category.id
                      ? 'bg-white/20'
                      : `bg-gradient-to-r ${category.color}`
                  }`}>
                    <category.icon className={`w-6 h-6 ${
                      selectedCategory === category.id ? 'text-white' : 'text-white'
                    }`} />
                  </div>
                  <span className="text-xs font-medium text-center leading-tight">
                    {category.name}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search courses, instructors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm text-gray-900"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm text-gray-900"
                >
                  {levels.map(level => (
                    <option key={level.id} value={level.id}>{level.name}</option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm text-gray-900 hover:bg-gray-50 transition-colors"
              >
                {viewMode === 'grid' ? 'List View' : 'Grid View'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {filteredCourses.length} Course{filteredCourses.length !== 1 ? 's' : ''} Found
            </h2>
            <p className="text-gray-600">
              Showing results for your search criteria
            </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Sort by:</span>
              <select className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                <option>Most Popular</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>
            </div>
          </div>

          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <div className="h-48 md:h-56 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {course.isPopular && (
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        🔥 Popular
                      </span>
                    )}
                    {course.isNew && (
                      <span className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        ✨ New
                      </span>
                    )}
                    {course.discount > 0 && (
                      <span className="bg-gradient-to-r from-red-400 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {course.discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
                      {course.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                      levels.find(l => l.id === course.level)?.color || 'bg-gray-100 text-gray-800'
                    }`}>
                      {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                    </span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700 ml-1">{course.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  
                  {/* Instructor */}
                  <div className="flex items-center mb-4">
                    <img
                      src={course.instructorImage}
                      alt={course.instructor}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{course.instructor}</p>
                      <p className="text-xs text-gray-500">Instructor</p>
                    </div>
                  </div>
                  
                  {/* Course Stats */}
                  <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </span>
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students.toLocaleString()}
                    </span>
                  </div>
                  
                  {/* Features */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {course.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-lg">
                          {feature}
                        </span>
                      ))}
                      {course.features.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
                          +{course.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900">
                        ₹{course.price.toLocaleString()}
                      </span>
                        {course.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ₹{course.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">/course</span>
                    </div>
                    <Link
                      href={`/courses/${course.id}`}
                      className="group/btn bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-12 w-12 text-gray-400" />
            </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No courses found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                  setSelectedLevel('all')
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your <span className="text-yellow-300">Success Journey?</span>
          </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Join thousands of successful students who achieved their dreams with The Chanakya Academy. Get personalized guidance and start your preparation today.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            <Link
              href="/contact"
              className="group bg-white text-blue-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
            >
              <Phone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Get Free Consultation
            </Link>
            <Link
              href="/auth/signup"
              className="group border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 flex items-center"
            >
              <BookOpen className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Enroll Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300 mb-2">10,000+</div>
              <div className="text-blue-100 text-sm">Students Enrolled</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300 mb-2">95%</div>
              <div className="text-blue-100 text-sm">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300 mb-2">50+</div>
              <div className="text-blue-100 text-sm">Expert Faculty</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300 mb-2">15+</div>
              <div className="text-blue-100 text-sm">Years Experience</div>
          </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

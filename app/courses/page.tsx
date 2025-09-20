'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, Clock, Users, Star, Filter, Search } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')

  const categories = ['all', 'IIT JEE', 'NEET', 'UPSC', 'Banking', 'SSC', 'Defense']
  const levels = ['all', 'beginner', 'intermediate', 'advanced']

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
      rating: 4.8,
      students: 1250,
      thumbnail: '/api/placeholder/300/200',
      features: ['Live Classes', 'Mock Tests', 'Doubt Sessions', 'Study Material']
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
      rating: 4.7,
      students: 980,
      thumbnail: '/api/placeholder/300/200',
      features: ['Video Lectures', 'Practice Tests', 'Biology Focus', 'NCERT Coverage']
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
      rating: 4.9,
      students: 750,
      thumbnail: '/api/placeholder/300/200',
      features: ['Current Affairs', 'Essay Writing', 'Interview Prep', 'Test Series']
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
      rating: 4.6,
      students: 2100,
      thumbnail: '/api/placeholder/300/200',
      features: ['Quantitative Aptitude', 'Reasoning', 'English', 'General Awareness']
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
      rating: 4.5,
      students: 650,
      thumbnail: '/api/placeholder/300/200',
      features: ['Mathematics', 'General Ability', 'English', 'SSB Interview']
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
      rating: 4.4,
      students: 1800,
      thumbnail: '/api/placeholder/300/200',
      features: ['Quantitative Aptitude', 'English Language', 'General Intelligence', 'General Awareness']
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
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Our Courses
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            >
              Choose from our comprehensive range of courses designed to help you succeed in competitive exams.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {categories.slice(1).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Levels</option>
                {levels.slice(1).map(level => (
                  <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {filteredCourses.length} Course{filteredCourses.length !== 1 ? 's' : ''} Found
            </h2>
            <p className="text-gray-600">
              Showing results for your search criteria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg card-hover overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-white" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {course.category}
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {course.level}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="flex items-center mr-4">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </span>
                    <span className="flex items-center mr-4">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students} students
                    </span>
                    <span className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-400" />
                      {course.rating}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Instructor: {course.instructor}</p>
                    <div className="flex flex-wrap gap-1">
                      {course.features.map((feature, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">
                        ₹{course.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">/course</span>
                    </div>
                    <Link
                      href={`/courses/${course.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Contact us to discuss custom courses or get personalized guidance on choosing the right course for your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
            >
              Contact Us
            </Link>
            <Link
              href="/auth/signup"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

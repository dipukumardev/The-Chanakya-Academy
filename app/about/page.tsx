'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Users, Award, Target, CheckCircle, Star } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function About() {
  const values = [
    {
      icon: BookOpen,
      title: 'Excellence in Education',
      description: 'We strive for the highest standards in teaching and learning, ensuring every student receives quality education.'
    },
    {
      icon: Users,
      title: 'Student-Centric Approach',
      description: 'Every decision we make is focused on the success and well-being of our students.'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Our track record speaks for itself with thousands of successful students in competitive exams.'
    },
    {
      icon: Target,
      title: 'Goal-Oriented Learning',
      description: 'We help students set clear goals and provide the roadmap to achieve them.'
    }
  ]

  const achievements = [
    { number: '15+', label: 'Years of Excellence' },
    { number: '10,000+', label: 'Successful Students' },
    { number: '95%', label: 'Success Rate' },
    { number: '50+', label: 'Expert Faculty' },
    { number: '100+', label: 'Courses Offered' },
    { number: '25+', label: 'Cities Served' }
  ]

  const team = [
    {
      name: 'Dr. Rajesh Kumar',
      position: 'Founder & Director',
      experience: '20+ years',
      specialization: 'Physics & Mathematics'
    },
    {
      name: 'Prof. Priya Sharma',
      position: 'Academic Head',
      experience: '15+ years',
      specialization: 'Chemistry & Biology'
    },
    {
      name: 'Dr. Amit Singh',
      position: 'Head of Operations',
      experience: '12+ years',
      specialization: 'Mathematics & Reasoning'
    }
  ]

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
              About The Chanakya Academy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            >
              Empowering students with world-class education and personalized coaching to achieve their dreams and excel in competitive exams.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To provide exceptional education and coaching that empowers students to achieve their academic and career goals. We believe in nurturing talent, building confidence, and creating future leaders through innovative teaching methods and personalized attention.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Quality education for all</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Personalized learning approach</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Continuous innovation in teaching</span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 mb-6">
                To be India's leading coaching institute, recognized for excellence in education and student success. We envision a future where every student has access to quality education and the tools to achieve their dreams.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Our Commitment</h3>
                <p className="text-blue-800">
                  We are committed to providing world-class education, fostering innovation, and creating an environment where every student can thrive and succeed.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These values guide everything we do and shape our commitment to student success.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg card-hover text-center"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers that reflect our commitment to excellence and student success.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {achievement.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced educators and leaders dedicated to student success.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-8 rounded-xl shadow-lg card-hover text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-2">
                  {member.position}
                </p>
                <p className="text-gray-600 mb-2">
                  Experience: {member.experience}
                </p>
                <p className="text-sm text-gray-500">
                  Specialization: {member.specialization}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose The Chanakya Academy?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We provide the perfect blend of traditional teaching methods and modern technology to ensure your success.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Faculty</h3>
              <p className="text-blue-100">
                Learn from experienced teachers with proven track records in competitive exam preparation.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-yellow-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Comprehensive Study Material</h3>
              <p className="text-blue-100">
                Access to well-researched study materials, practice tests, and mock exams.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-yellow-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Attention</h3>
              <p className="text-blue-100">
                Small batch sizes ensure individual attention and doubt resolution for every student.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

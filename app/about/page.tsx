'use client'

import React, { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  BookOpen, Users, Award, Target, CheckCircle, Star, 
  TrendingUp, Globe, Heart, Lightbulb, Shield, Zap,
  Quote, ArrowRight, Play, Calendar, MapPin, Phone,
  Mail, Facebook, Twitter, Instagram, Linkedin
} from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function About() {
  const [activeTab, setActiveTab] = useState('mission')
  const [animatedStats, setAnimatedStats] = useState({
    years: 0,
    students: 0,
    successRate: 0,
    faculty: 0,
    courses: 0,
    cities: 0
  })

  const values = [
    {
      icon: BookOpen,
      title: 'Excellence in Education',
      description: 'We strive for the highest standards in teaching and learning, ensuring every student receives quality education.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Users,
      title: 'Student-Centric Approach',
      description: 'Every decision we make is focused on the success and well-being of our students.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Our track record speaks for itself with thousands of successful students in competitive exams.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Target,
      title: 'Goal-Oriented Learning',
      description: 'We help students set clear goals and provide the roadmap to achieve them.',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const achievements = [
    { number: 15, label: 'Years of Excellence', suffix: '+' },
    { number: 10000, label: 'Successful Students', suffix: '+' },
    { number: 95, label: 'Success Rate', suffix: '%' },
    { number: 50, label: 'Expert Faculty', suffix: '+' },
    { number: 100, label: 'Courses Offered', suffix: '+' },
    { number: 25, label: 'Cities Served', suffix: '+' }
  ]

  const team = [
    {
      name: 'Dr. Rajesh Kumar',
      position: 'Founder & Director',
      experience: '20+ years',
      specialization: 'Physics & Mathematics',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      achievements: ['IIT Delhi Graduate', '20+ Years Experience', '1000+ Students Mentored']
    },
    {
      name: 'Prof. Priya Sharma',
      position: 'Academic Head',
      experience: '15+ years',
      specialization: 'Chemistry & Biology',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      achievements: ['PhD in Chemistry', '15+ Years Experience', 'Expert in NEET Preparation']
    },
    {
      name: 'Dr. Amit Singh',
      position: 'Head of Operations',
      experience: '12+ years',
      specialization: 'Mathematics & Reasoning',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      achievements: ['IIT Kanpur Graduate', '12+ Years Experience', 'Quantitative Aptitude Expert']
    }
  ]

  const testimonials = [
    {
      name: 'Rahul Sharma',
      exam: 'JEE Advanced',
      score: 'AIR 45',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      quote: 'The Chanakya Academy transformed my approach to learning. The personalized attention and expert guidance helped me achieve my dream of getting into IIT.'
    },
    {
      name: 'Priya Patel',
      exam: 'NEET',
      score: 'AIR 78',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      quote: 'The faculty here is exceptional. They not only teach concepts but also build confidence. I couldn\'t have achieved this without their support.'
    },
    {
      name: 'Arjun Kumar',
      exam: 'UPSC',
      score: 'Rank 12',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      quote: 'The comprehensive study material and mock tests at Chanakya Academy prepared me thoroughly for the UPSC examination.'
    }
  ]

  const timeline = [
    {
      year: '2008',
      title: 'Foundation',
      description: 'The Chanakya Academy was established with a vision to provide quality education.'
    },
    {
      year: '2012',
      title: 'First Success',
      description: 'Our first batch achieved 100% success rate in competitive exams.'
    },
    {
      year: '2015',
      title: 'Expansion',
      description: 'Opened branches in 5 major cities across India.'
    },
    {
      year: '2018',
      title: 'Digital Innovation',
      description: 'Launched online learning platform and mobile app.'
    },
    {
      year: '2021',
      title: 'Global Recognition',
      description: 'Received Best Coaching Institute award from Education Ministry.'
    },
    {
      year: '2024',
      title: 'Future Ready',
      description: 'Introducing AI-powered personalized learning and virtual reality classrooms.'
    }
  ]

  // Animate statistics
  useEffect(() => {
    const timer = setTimeout(() => {
      achievements.forEach((achievement, index) => {
        const duration = 2000
        const steps = 60
        const increment = achievement.number / steps
        let current = 0
        
        const counter = setInterval(() => {
          current += increment
          if (current >= achievement.number) {
            current = achievement.number
            clearInterval(counter)
          }
          
          setAnimatedStats(prev => ({
            ...prev,
            [Object.keys(prev)[index]]: Math.floor(current)
          }))
        }, duration / steps)
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

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
              <Star className="w-4 h-4 mr-2 text-yellow-400" />
              Trusted by 10,000+ Students
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              About
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                The Chanakya Academy
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Empowering students with world-class education and personalized coaching to achieve their dreams and excel in competitive exams.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="group bg-white text-blue-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 flex items-center">
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Our Story
            </button>
            <button className="group border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Explore Courses
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
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

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Purpose</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Driving educational excellence through innovation, dedication, and student-centered approach
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 p-2 rounded-2xl">
              <button
                onClick={() => setActiveTab('mission')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'mission'
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Mission
              </button>
              <button
                onClick={() => setActiveTab('vision')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'vision'
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Vision
              </button>
              <button
                onClick={() => setActiveTab('values')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'values'
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Values
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            {activeTab === 'mission' && (
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-12 rounded-3xl">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    To provide exceptional education and coaching that empowers students to achieve their academic and career goals. We believe in nurturing talent, building confidence, and creating future leaders through innovative teaching methods and personalized attention.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                      <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">Quality Education</h4>
                      <p className="text-sm text-gray-600">World-class education for all students</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                      <Users className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">Personalized Learning</h4>
                      <p className="text-sm text-gray-600">Tailored approach for every student</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                      <Lightbulb className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">Innovation</h4>
                      <p className="text-sm text-gray-600">Continuous innovation in teaching</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-12 rounded-3xl">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Globe className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h3>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    To be India's leading coaching institute, recognized for excellence in education and student success. We envision a future where every student has access to quality education and the tools to achieve their dreams.
                  </p>
                  <div className="bg-white p-8 rounded-2xl shadow-sm">
                    <h4 className="text-2xl font-semibold text-gray-900 mb-4">Our Commitment</h4>
                    <p className="text-gray-700 leading-relaxed">
                      We are committed to providing world-class education, fostering innovation, and creating an environment where every student can thrive and succeed. Our vision extends beyond academic success to building character, leadership, and lifelong learning skills.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'values' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6`}>
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Achievements</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers that reflect our commitment to excellence and student success
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                    {Object.values(animatedStats)[index]}{achievement.suffix}
                  </div>
                  <div className="text-gray-600 font-semibold text-sm">
                    {achievement.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Leadership Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced educators and leaders dedicated to student success
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto rounded-3xl overflow-hidden shadow-lg">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-semibold mb-3">
                      {member.position}
                    </p>
                    <p className="text-gray-600 mb-4">
                      {member.experience} • {member.specialization}
                    </p>
                    
                    <div className="space-y-2">
                      {member.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-center justify-center text-sm text-gray-500">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A timeline of milestones that shaped our growth and success
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white shadow-lg"></div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Student <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Success Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our successful students who achieved their dreams
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg mr-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-blue-600 font-semibold">{testimonial.exam}</p>
                      <p className="text-green-600 font-bold">{testimonial.score}</p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Quote className="w-8 h-8 text-blue-500/30 absolute -top-2 -left-2" />
                    <p className="text-gray-700 leading-relaxed pl-6">
                      "{testimonial.quote}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="text-yellow-300">The Chanakya Academy?</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We provide the perfect blend of traditional teaching methods and modern technology to ensure your success
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center group"
            >
              <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star className="h-10 w-10 text-yellow-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Expert Faculty</h3>
              <p className="text-blue-100 leading-relaxed">
                Learn from experienced teachers with proven track records in competitive exam preparation
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center group"
            >
              <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-10 w-10 text-yellow-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Comprehensive Study Material</h3>
              <p className="text-blue-100 leading-relaxed">
                Access to well-researched study materials, practice tests, and mock exams
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center group"
            >
              <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-10 w-10 text-yellow-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Personalized Attention</h3>
              <p className="text-blue-100 leading-relaxed">
                Small batch sizes ensure individual attention and doubt resolution for every student
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

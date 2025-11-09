'use client'

import React, { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowRight, BookOpen, Users, Award, CheckCircle, 
  Star, TrendingUp, Clock, Target, Zap, Heart,
  Play, Globe, Shield, Sparkles, Crown, Rocket
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TeachingCarousel from '../components/TeachingCarousel'

export default function Home() {
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0])

  const features = [
    {
      icon: BookOpen,
      title: 'Expert Faculty',
      description: 'Learn from industry experts with years of teaching experience',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      icon: Users,
      title: 'Personalized Learning',
      description: 'Customized study plans tailored to your learning style',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Consistent track record of student success in competitive exams',
      color: 'from-green-500 to-teal-500',
      bgColor: 'from-green-50 to-teal-50'
    },
    {
      icon: Target,
      title: 'Strategic Approach',
      description: 'Data-driven teaching methods for maximum learning efficiency',
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Rigorous quality control and continuous improvement processes',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-50 to-purple-50'
    },
    {
      icon: Zap,
      title: 'Modern Technology',
      description: 'Cutting-edge learning tools and digital resources',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50'
    }
  ]

  const stats = [
    { number: 10000, label: 'Students Taught', suffix: '+' },
    { number: 95, label: 'Success Rate', suffix: '%' },
    { number: 50, label: 'Expert Faculty', suffix: '+' },
    { number: 15, label: 'Years Experience', suffix: '+' }
  ]

  const courses = [
    {
      title: 'IIT JEE Preparation',
      description: 'Comprehensive preparation for IIT JEE Main & Advanced with personalized mentoring',
      duration: '2 Years',
      students: '500+',
      price: '₹50,000',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      features: ['Mock Tests', 'Doubt Sessions', 'Study Material', 'Personal Mentoring'],
      rating: 4.9,
      color: 'from-blue-600 to-purple-600'
    },
    {
      title: 'NEET Medical',
      description: 'Complete NEET preparation with mock tests and doubt sessions',
      duration: '2 Years',
      students: '400+',
      price: '₹45,000',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      features: ['Biology Focus', 'Chemistry Lab', 'Physics Concepts', 'Medical Guidance'],
      rating: 4.8,
      color: 'from-green-600 to-teal-600'
    },
    {
      title: 'UPSC Civil Services',
      description: 'Strategic preparation for UPSC with current affairs and test series',
      duration: '3 Years',
      students: '300+',
      price: '₹60,000',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      features: ['Current Affairs', 'Test Series', 'Interview Prep', 'Essay Writing'],
      rating: 4.9,
      color: 'from-purple-600 to-pink-600'
    }
  ]

  const testimonials = [
    {
      name: 'Priya Sharma',
      exam: 'IIT JEE',
      result: 'AIR 45',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      quote: 'The Chanakya Academy transformed my approach to learning. The personalized attention and expert guidance helped me achieve my dream rank.'
    },
    {
      name: 'Rahul Kumar',
      exam: 'NEET',
      result: 'AIR 12',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      quote: 'The faculty here is exceptional. They not only teach concepts but also build confidence. I couldn\'t have done it without them.'
    },
    {
      name: 'Anita Singh',
      exam: 'UPSC',
      result: 'IAS Officer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      quote: 'The comprehensive preparation and strategic approach at Chanakya Academy made all the difference in my UPSC journey.'
    }
  ]

  // Animate stats on scroll
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats(stats.map(stat => stat.number))
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-purple-900/85 to-indigo-900/85"></div>
        </div>
        
        {/* Animated Background Elements */}
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
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-lg font-medium mb-8">
              <Crown className="w-6 h-6 mr-3 text-yellow-400" />
              India's #1 Coaching Institute
              <Sparkles className="w-5 h-5 ml-3 text-yellow-400" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Transform Your Future with
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                The Chanakya Academy
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-12">
              Join thousands of successful students who achieved their dreams with our expert guidance, 
              personalized learning, and proven teaching methods.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <Link
              href="/auth/signup"
              className="group bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-10 py-5 rounded-2xl text-xl font-bold transition-all duration-300 flex items-center shadow-2xl hover:shadow-yellow-500/25 hover:scale-105"
            >
              <Rocket className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              Start Your Journey
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/courses"
              className="group border-2 border-white/50 text-white hover:bg-white hover:text-blue-900 px-10 py-5 rounded-2xl text-xl font-bold transition-all duration-300 flex items-center backdrop-blur-sm hover:scale-105"
            >
              <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              Explore Courses
            </Link>
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
              <div className="text-white/80 text-sm">Students Taught</div>
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

      {/* Teaching Carousel Section with Background */}
      <section 
        className="py-20 relative overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1588072432836-e1089225d81d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-blue-50/90 to-white/90"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Experience Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Learning Environment</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Take a glimpse into our modern classrooms, interactive learning sessions, and the vibrant academic atmosphere that makes The Chanakya Academy special.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <TeachingCarousel />
          </motion.div>
        </div>
      </section>

      {/* Stats Section with Background */}
      <section 
        className="py-20 relative overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/90 to-indigo-900/90"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Achievements</span>
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Numbers that speak for our commitment to excellence and student success
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 group-hover:scale-105 border border-white/20">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-3">
                    {animatedStats[index].toLocaleString()}{stat.suffix}
                  </div>
                  <div className="text-white/90 font-medium text-lg">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">The Chanakya Academy?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive coaching with modern teaching methods and personalized attention to every student.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className={`bg-gradient-to-br ${feature.bgColor} p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 border border-white/50 h-full`}>
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section with Background */}
      <section 
        className="py-20 relative overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1576267423429-a2d0c3785e9d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-blue-900/80 to-purple-900/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Popular Courses</span>
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Choose from our comprehensive range of courses designed for different competitive exams.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-white text-sm font-semibold">{course.rating}</span>
                    </div>
                    <div className={`absolute bottom-4 left-4 bg-gradient-to-r ${course.color} px-4 py-2 rounded-xl`}>
                      <span className="text-white font-bold text-lg">{course.price}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      {course.title}
                    </h3>
                    <p className="text-white/80 mb-4 leading-relaxed">
                      {course.description}
                    </p>
                    <div className="flex justify-between items-center text-sm text-white/70 mb-4">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {course.students} students
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {course.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-white/80 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/courses"
                      className={`w-full bg-gradient-to-r ${course.color} hover:opacity-90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center group-hover:scale-105`}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              href="/courses"
              className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-10 py-4 rounded-2xl text-xl font-bold transition-all duration-300 inline-flex items-center border border-white/20 hover:scale-105"
            >
              View All Courses
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
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
              Success <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our students who achieved their dreams with The Chanakya Academy
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
                <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 border border-gray-100 h-full">
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.exam}</p>
                      <p className="text-sm font-semibold text-blue-600">{testimonial.result}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Background */}
      <section 
        className="py-20 relative overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/90 to-indigo-900/90"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-lg font-medium mb-8">
              <Heart className="w-6 h-6 mr-3 text-red-400" />
              Join Our Success Family
              <Sparkles className="w-5 h-5 ml-3 text-yellow-400" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Start Your <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Success Story?</span>
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
              Join thousands of successful students who achieved their dreams with The Chanakya Academy. 
              Your journey to excellence starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/auth/signup"
                className="group bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-10 py-5 rounded-2xl text-xl font-bold transition-all duration-300 flex items-center shadow-2xl hover:shadow-yellow-500/25 hover:scale-105"
              >
                <Rocket className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                Enroll Now
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="group border-2 border-white/50 text-white hover:bg-white hover:text-blue-900 px-10 py-5 rounded-2xl text-xl font-bold transition-all duration-300 flex items-center backdrop-blur-sm hover:scale-105"
              >
                <Globe className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

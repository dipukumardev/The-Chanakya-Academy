'use client'

import React, { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  MapPin, Phone, Mail, Clock, Send, CheckCircle, 
  User, MessageSquare, Calendar, Star, Award,
  ArrowRight, Globe, Facebook, Twitter, Instagram, 
  Linkedin, Youtube, MessageCircle, Headphones,
  BookOpen, Users, Target, Zap, Heart, Shield
} from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState('form')
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      preferredContact: 'email'
    })
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Campus',
      details: ['123 Education Street', 'New Delhi, 110001', 'India'],
      color: 'from-red-500 to-pink-500',
      action: 'Get Directions',
      link: '#'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 98765 43210', '+91 11 2345 6789'],
      color: 'from-green-500 to-teal-500',
      action: 'Call Now',
      link: 'tel:+919876543210'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@chanakyaacademy.com', 'admissions@chanakyaacademy.com'],
      color: 'from-blue-500 to-cyan-500',
      action: 'Send Email',
      link: 'mailto:info@chanakyaacademy.com'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 4:00 PM', 'Sunday: Closed'],
      color: 'from-purple-500 to-indigo-500',
      action: 'Schedule Visit',
      link: '#'
    }
  ]

  const subjects = [
    'General Inquiry',
    'Course Information',
    'Admission Process',
    'Fee Structure',
    'Faculty Information',
    'Technical Support',
    'Career Guidance',
    'Scholarship Information',
    'Other'
  ]

  const faqs = [
    {
      question: 'What courses do you offer?',
      answer: 'We offer comprehensive courses for IIT JEE, NEET, UPSC, Banking, SSC, and Defense Services. Each course is designed by expert faculty with proven track records.'
    },
    {
      question: 'How can I apply for admission?',
      answer: 'You can apply online through our website, visit our campus, or call our admission helpline. Our counselors will guide you through the entire process.'
    },
    {
      question: 'What is the fee structure?',
      answer: 'Our fees vary by course and duration. We offer flexible payment options and scholarships for deserving students. Contact us for detailed fee information.'
    },
    {
      question: 'Do you provide study materials?',
      answer: 'Yes, we provide comprehensive study materials, practice tests, mock exams, and access to our digital learning platform for all enrolled students.'
    },
    {
      question: 'What are your success rates?',
      answer: 'We maintain a 95% success rate with thousands of students successfully clearing competitive exams and achieving their career goals.'
    },
    {
      question: 'Do you offer online classes?',
      answer: 'Yes, we offer both offline and online classes. Our online platform includes live classes, recorded lectures, and interactive doubt sessions.'
    }
  ]

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', color: 'from-blue-600 to-blue-700', link: '#' },
    { icon: Twitter, name: 'Twitter', color: 'from-sky-500 to-sky-600', link: '#' },
    { icon: Instagram, name: 'Instagram', color: 'from-pink-500 to-rose-500', link: '#' },
    { icon: Linkedin, name: 'LinkedIn', color: 'from-blue-700 to-blue-800', link: '#' },
    { icon: Youtube, name: 'YouTube', color: 'from-red-500 to-red-600', link: '#' }
  ]

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
              <MessageCircle className="w-4 h-4 mr-2 text-yellow-400" />
              We're Here to Help You Succeed
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Get In
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Touch With Us
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Have questions about our courses, admissions, or need guidance? Our expert team is ready to help you achieve your academic goals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <button className="group bg-white text-blue-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 flex items-center">
              <Phone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Call Now
            </button>
            <button className="group border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300 flex items-center">
              <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Send Email
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Quick Contact Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">24h</div>
              <div className="text-white/80 text-sm">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-white/80 text-sm">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">5+</div>
              <div className="text-white/80 text-sm">Contact Methods</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/80 text-sm">Support Available</div>
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

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Multiple Ways to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Connect</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose your preferred way to get in touch with us. We're available through multiple channels to assist you.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 border border-gray-100">
                  <div className={`w-20 h-20 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <info.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    {info.title}
                  </h3>
                  <div className="space-y-2 mb-6">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 text-center text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <a
                    href={info.link}
                    className="block w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-500 hover:to-purple-500 text-gray-700 hover:text-white px-6 py-3 rounded-xl text-center font-semibold transition-all duration-300 group-hover:shadow-lg"
                  >
                    {info.action}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Questions Answered</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Send us a message or check our frequently asked questions for quick answers
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white p-2 rounded-2xl shadow-lg">
              <button
                onClick={() => setActiveTab('form')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'form'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MessageSquare className="inline w-5 h-5 mr-2" />
                Contact Form
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'faq'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Headphones className="inline w-5 h-5 mr-2" />
                FAQ
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
            {activeTab === 'form' && (
              <div className="bg-white p-8 rounded-3xl shadow-xl">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Send us a Message
                  </h3>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you within 24 hours
                  </p>
                </div>
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-12 w-12 text-green-500" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-3">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-gray-600 mb-6">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                          <User className="inline w-4 h-4 mr-2" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-gray-900"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          <Mail className="inline w-4 h-4 mr-2" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-gray-900"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                          <Phone className="inline w-4 h-4 mr-2" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-gray-900"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                          <MessageSquare className="inline w-4 h-4 mr-2" />
                          Subject *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-gray-900"
                        >
                          <option value="">Select a subject</option>
                          {subjects.map(subject => (
                            <option key={subject} value={subject}>{subject}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        <MessageSquare className="inline w-4 h-4 mr-2" />
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-gray-900"
                        placeholder="Enter your message here..."
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-3" />
                          Send Message
                          <ArrowRight className="h-5 w-5 ml-3" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                      className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </h3>
                      <div className={`transform transition-transform duration-200 ${
                        expandedFAQ === index ? 'rotate-180' : ''
                      }`}>
                        <ArrowRight className="h-5 w-5 text-gray-500" />
                      </div>
                    </button>
                    {expandedFAQ === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-8 pb-6"
                      >
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Social Media & Follow Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Follow Us on <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Social Media</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay connected with us for updates, tips, and success stories from our students
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className={`bg-gradient-to-r ${social.color} p-6 rounded-2xl text-center hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}>
                  <social.icon className="h-8 w-8 text-white mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-white font-semibold text-sm">{social.name}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Why Contact Us */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-3xl"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Course Information
              </h3>
              <p className="text-gray-600 mb-4">
                Get detailed information about our courses, curriculum, and study materials.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Course details and syllabus
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Study material overview
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Faculty information
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-3xl"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Admission Support
              </h3>
              <p className="text-gray-600 mb-4">
                Get personalized guidance on admission process and course selection.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Admission process guidance
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Course selection help
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Scholarship information
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <Headphones className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Quick Support
              </h3>
              <p className="text-gray-600 mb-4">
                Get instant help with technical issues and academic queries.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  24/7 support available
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Technical assistance
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Academic guidance
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Visit Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Campus</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience our world-class facilities and meet our expert faculty in person
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="bg-white p-8 rounded-3xl shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Campus Location</h3>
                </div>
                <div className="space-y-3 text-gray-600">
                  <p className="font-semibold">The Chanakya Academy</p>
                  <p>123 Education Street</p>
                  <p>New Delhi, 110001</p>
                  <p>India</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Visiting Hours</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <p><span className="font-semibold">Monday - Friday:</span> 9:00 AM - 6:00 PM</p>
                  <p><span className="font-semibold">Saturday:</span> 9:00 AM - 4:00 PM</p>
                  <p><span className="font-semibold">Sunday:</span> Closed</p>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl">
                <Calendar className="h-5 w-5 mr-3" />
                Schedule a Campus Visit
                <ArrowRight className="h-5 w-5 ml-3" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl h-96 flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Interactive Map
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Google Maps integration would be added here
                  </p>
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg">
                    Get Directions
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

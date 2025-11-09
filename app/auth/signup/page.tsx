'use client'

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Eye, EyeOff, BookOpen, CheckCircle, User, Mail, Phone, Lock, GraduationCap, ArrowRight, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'student'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          role: formData.role,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Account created successfully! Please sign in.')
        router.push('/auth/signin')
      } else {
        toast.error(data.message || 'An error occurred. Please try again.')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="h-16 w-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-6 w-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-yellow-800" />
                </div>
          </div>
        </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Join The Chanakya Academy
            </h1>
            <p className="text-gray-600">
              Start your journey to academic excellence
            </p>
          </motion.div>

          {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                Full Name
              </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 text-gray-900"
                    placeholder="Enter your full name"
                  />
              </div>
            </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Email Address
              </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 text-gray-900"
                    placeholder="Enter your email"
                  />
              </div>
            </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                Phone Number
              </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 text-gray-900"
                    placeholder="Enter your phone number"
                  />
              </div>
            </div>

              {/* Role Selection */}
              <div className="space-y-2 w-1/2">
                <label htmlFor="role" className="block text-sm font-semibold text-gray-700">
                  Account Type
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <GraduationCap className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 appearance-none text-gray-900"
                  >
                    <option value="student">Student</option>
                  </select>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password
              </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 text-gray-900"
                    placeholder="Enter your password"
                  />
                <button
                  type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                Confirm Password
              </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 text-gray-900"
                    placeholder="Confirm your password"
                  />
                <button
                  type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-3">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                required
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
                <label htmlFor="agree-terms" className="text-sm text-gray-700">
                I agree to the{' '}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-500 font-medium">
                  Terms of Service
                </Link>{' '}
                and{' '}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-500 font-medium">
                  Privacy Policy
                </Link>
              </label>
            </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full flex justify-center items-center py-4 px-6 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Creating your account...
                  </div>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
          </form>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/80 text-gray-500 font-medium">Benefits of joining</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center text-sm text-gray-700">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                Access to all courses and study materials
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                Personalized study plans and progress tracking
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                Expert faculty support and doubt resolution
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                Mock tests and practice sessions
              </div>
            </div>
          </motion.div>

          {/* Sign In Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                href="/auth/signin"
                className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </motion.div>
        </motion.div>
        </div>
      </div>

      {/* Right Side - Visual Elements */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-indigo-400/20 rounded-3xl"></div>
          
          {/* Floating Elements */}
          <div className="relative z-10 p-12">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Welcome to Excellence
              </h2>
              <p className="text-lg text-gray-600">
                Join thousands of successful students who achieved their dreams with The Chanakya Academy
              </p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <GraduationCap className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Expert Faculty</h3>
                    <p className="text-sm text-gray-600">Learn from industry experts</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Comprehensive Courses</h3>
                    <p className="text-sm text-gray-600">All competitive exam preparations</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Proven Results</h3>
                    <p className="text-sm text-gray-600">95% success rate</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

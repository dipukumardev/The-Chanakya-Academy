'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Users, BookOpen, FileText, BarChart3, 
  Home, LogOut, Settings, Shield
} from 'lucide-react'
import { signOut } from 'next-auth/react'

interface AdminLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
}

export default function AdminLayout({ children, title, description }: AdminLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
    { name: 'Students', href: '/admin/students', icon: Users },
    { name: 'Courses', href: '/admin/courses', icon: BookOpen },
    { name: 'Blogs', href: '/admin/blogs', icon: FileText },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  ]

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/admin/login' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center mr-3">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSignOut}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <button
                  key={item.name}
                  onClick={() => router.push(item.href)}
                  className={`flex items-center py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                    isActive
                      ? 'border-red-600 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.name}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}

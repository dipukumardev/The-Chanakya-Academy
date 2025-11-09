'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, Eye, Tag, Image as ImageIcon } from 'lucide-react'
import Navbar from '../../../../components/Navbar'
import Footer from '../../../../components/Footer'
import toast from 'react-hot-toast'

interface Blog {
  _id: string
  title: string
  content: string
  excerpt: string
  author: {
    id: string
    name: string
    email: string
  }
  tags: string[]
  featuredImage?: string
  published: boolean
}

export default function EditBlogPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    featuredImage: '',
    published: false
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchBlog()
    }
  }, [params.id])

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin?callbackUrl=/blog')
    }
  }, [session, status, router])

  const fetchBlog = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/blogs/${params.id}`)
      const data = await response.json()

      if (data.success) {
        setBlog(data.blog)
        setFormData({
          title: data.blog.title,
          content: data.blog.content,
          excerpt: data.blog.excerpt,
          tags: data.blog.tags.join(', '),
          featuredImage: data.blog.featuredImage || '',
          published: data.blog.published
        })
      } else {
        toast.error(data.error || 'Failed to load blog')
        router.push('/blog')
      }
    } catch (error) {
      console.error('Error fetching blog:', error)
      toast.error('Failed to load blog')
      router.push('/blog')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.content.trim() || !formData.excerpt.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    if (!blog || session?.user?.id !== blog.author.id) {
      toast.error('You are not authorized to edit this blog')
      return
    }

    try {
      setSubmitting(true)
      
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      const response = await fetch(`/api/blogs/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags
        }),
      })

      const data = await response.json()
      
      if (data.success) {
        toast.success('Blog updated successfully!')
        router.push(`/blog/${params.id}`)
      } else {
        toast.error(data.error || 'Failed to update blog')
      }
    } catch (error) {
      console.error('Error updating blog:', error)
      toast.error('Failed to update blog')
    } finally {
      setSubmitting(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!session || !blog || session.user.id !== blog.author.id) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-6">You are not authorized to edit this blog.</p>
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Blogs
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            href={`/blog/${params.id}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blog
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Edit Blog Post
          </h1>
          <p className="text-gray-600 mt-2">
            Update your blog post content and settings
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter a compelling title for your blog post"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt *
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Write a brief summary of your blog post (this will be shown in the blog listing)"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.excerpt.length}/500 characters
              </p>
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your blog post content here..."
                rows={15}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="inline w-4 h-4 mr-1" />
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Enter tags separated by commas (e.g., education, learning, tips)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                Separate multiple tags with commas
              </p>
            </div>

            {/* Featured Image */}
            <div>
              <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-2">
                <ImageIcon className="inline w-4 h-4 mr-1" />
                Featured Image URL
              </label>
              <input
                type="url"
                id="featuredImage"
                name="featuredImage"
                value={formData.featuredImage}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                Optional: Add a featured image for your blog post
              </p>
            </div>

            {/* Published Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
                Publish this blog post
              </label>
            </div>

            {/* Preview */}
            {formData.title && formData.excerpt && (
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Preview:</h3>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{formData.title}</h4>
                <p className="text-gray-600">{formData.excerpt}</p>
                {formData.tags && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.tags.split(',').map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <Link
                href={`/blog/${params.id}`}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </Link>
              
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, published: false }))}
                  className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Draft
                </button>
                
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  {submitting ? 'Updating...' : 'Update Blog'}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}

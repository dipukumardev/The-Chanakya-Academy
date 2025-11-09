'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, Eye, Tag, Image as ImageIcon, FileText, Sparkles, Upload, Type, AlignLeft, Hash, Globe, X, Camera } from 'lucide-react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import toast from 'react-hot-toast'

export default function CreateBlogPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    featuredImage: '',
    published: false
  })
  const [submitting, setSubmitting] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  // Redirect if not authenticated
  React.useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin?callbackUrl=/blog/create')
    }
  }, [session, status, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleImageSelect = async (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      // Upload image to server
      await uploadImage(file)
    } else {
      toast.error('Please select a valid image file')
    }
  }

  const uploadImage = async (file: File) => {
    try {
      setUploadingImage(true)
      
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setFormData(prev => ({
          ...prev,
          featuredImage: data.imageUrl
        }))
        toast.success('Image uploaded successfully!')
      } else {
        toast.error(data.message || 'Failed to upload image')
        setSelectedImage(null)
        setImagePreview(null)
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Failed to upload image')
      setSelectedImage(null)
      setImagePreview(null)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageSelect(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageSelect(e.dataTransfer.files[0])
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    setFormData(prev => ({ ...prev, featuredImage: '' }))
    toast.success('Image removed')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.content.trim() || !formData.excerpt.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      setSubmitting(true)
      
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      const response = await fetch('/api/blogs', {
        method: 'POST',
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
        toast.success('Blog created successfully!')
        router.push(`/blog/${data.blog._id}`)
      } else {
        toast.error(data.error || 'Failed to create blog')
      }
    } catch (error) {
      console.error('Error creating blog:', error)
      toast.error('Failed to create blog')
    } finally {
      setSubmitting(false)
    }
  }

  if (status === 'loading') {
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

  if (!session) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
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
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blogs
          </Link>
          
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="h-16 w-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-6 w-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-yellow-800" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Create New Blog Post
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Share your knowledge, insights, and experiences with The Chanakya Academy community
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 max-w-4xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title */}
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                <Type className="inline w-4 h-4 mr-2" />
                Blog Title *
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter a compelling title for your blog post"
                  className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 text-gray-900"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Type className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <label htmlFor="excerpt" className="block text-sm font-semibold text-gray-700">
                <AlignLeft className="inline w-4 h-4 mr-2" />
                Blog Excerpt *
              </label>
              <div className="relative">
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Write a brief summary of your blog post (this will be shown in the blog listing)"
                  rows={3}
                  className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 bg-white/50 text-gray-900"
                  required
                />
                <div className="absolute top-4 left-4 flex items-center pointer-events-none">
                  <AlignLeft className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Brief summary that will appear in blog listings
                </p>
                <p className="text-sm text-gray-500">
                  {formData.excerpt.length}/500 characters
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label htmlFor="content" className="block text-sm font-semibold text-gray-700">
                <FileText className="inline w-4 h-4 mr-2" />
                Blog Content *
              </label>
              <div className="relative">
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Write your blog post content here... You can use markdown formatting for better structure."
                  rows={15}
                  className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 bg-white/50 text-gray-900"
                  required
                />
                <div className="absolute top-4 left-4 flex items-center pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Write your main content here. You can use markdown for formatting.
              </p>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label htmlFor="tags" className="block text-sm font-semibold text-gray-700">
                <Hash className="inline w-4 h-4 mr-2" />
                Tags
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Enter tags separated by commas (e.g., education, learning, tips)"
                  className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 text-gray-900"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Hash className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Separate multiple tags with commas to help readers find your content
              </p>
            </div>

            {/* Featured Image Upload */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">
                <Camera className="inline w-4 h-4 mr-2" />
                Featured Image
              </label>
              
              {!imagePreview ? (
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                    dragActive
                      ? 'border-blue-500 bg-blue-50'
                      : uploadingImage
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    disabled={uploadingImage}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                      {uploadingImage ? (
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      ) : (
                        <Upload className="h-8 w-8 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900">
                        {uploadingImage 
                          ? 'Uploading image...' 
                          : dragActive 
                          ? 'Drop your image here' 
                          : 'Upload an image'
                        }
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {uploadingImage 
                          ? 'Please wait while we upload your image'
                          : 'Drag and drop an image, or click to browse'
                        }
                      </p>
                    </div>
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                      <span>JPG, PNG, GIF</span>
                      <span>•</span>
                      <span>Max 5MB</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="relative rounded-xl overflow-hidden border border-gray-200">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-500">
                      Image selected: {selectedImage?.name}
                    </p>
                    {formData.featuredImage && (
                      <p className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                        ✓ Uploaded successfully
                      </p>
                    )}
                  </div>
                </div>
              )}
              
              <p className="text-sm text-gray-500">
                Optional: Add a featured image to make your blog post more engaging
              </p>
            </div>

            {/* Published Checkbox */}
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <input
                type="checkbox"
                id="published"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="published" className="block text-sm font-medium text-gray-700">
                <Globe className="inline w-4 h-4 mr-2" />
                Publish immediately
              </label>
              <p className="text-xs text-gray-500 ml-auto">
                Uncheck to save as draft
              </p>
            </div>

            {/* Preview */}
            {formData.title && formData.excerpt && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-gray-50 to-blue-50"
              >
                <div className="flex items-center mb-4">
                  <Eye className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
                </div>
                <div className="space-y-4">
                  {imagePreview && (
                    <div className="rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  <h4 className="text-xl font-bold text-gray-800">{formData.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{formData.excerpt}</p>
                  {formData.tags && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.split(',').map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
                        >
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Submit Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-200">
              <Link
                href="/blog"
                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
              >
                Cancel
              </Link>
              
              <div className="flex space-x-4">
                <motion.button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, published: false }))}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium shadow-sm"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Draft
                </motion.button>
                
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Globe className="w-5 h-5 mr-2" />
                      Publish Blog
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}

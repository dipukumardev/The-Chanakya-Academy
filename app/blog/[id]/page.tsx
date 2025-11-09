'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, User, Eye, Heart, MessageCircle, Tag, ArrowLeft, Edit, Trash2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
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
  publishedAt: string
  views: number
  likes: string[]
  comments: {
    id: string
    author: {
      id: string
      name: string
      email: string
    }
    content: string
    createdAt: string
    likes: string[]
  }[]
}

export default function BlogPostPage() {
  const params = useParams()
  const { data: session } = useSession()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')
  const [submittingComment, setSubmittingComment] = useState(false)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchBlog()
    }
  }, [params.id])

  useEffect(() => {
    if (blog && session?.user) {
      setLiked(blog.likes.includes(session.user.id))
    }
  }, [blog, session])

  const fetchBlog = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/blogs/${params.id}`)
      const data = await response.json()

      if (data.success) {
        setBlog(data.blog)
      } else {
        toast.error(data.error || 'Failed to load blog')
      }
    } catch (error) {
      console.error('Error fetching blog:', error)
      toast.error('Failed to load blog')
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async () => {
    if (!session?.user || !blog) return

    try {
      const response = await fetch(`/api/blogs/${blog._id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      if (data.success) {
        setLiked(!liked)
        setBlog(prev => prev ? {
          ...prev,
          likes: liked 
            ? prev.likes.filter(id => id !== session.user.id)
            : [...prev.likes, session.user.id]
        } : null)
      }
    } catch (error) {
      console.error('Error liking blog:', error)
      toast.error('Failed to like blog')
    }
  }

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim() || !session?.user || !blog) return

    try {
      setSubmittingComment(true)
      const response = await fetch(`/api/blogs/${blog._id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: comment.trim() }),
      })

      const data = await response.json()
      if (data.success) {
        setComment('')
        toast.success('Comment added successfully')
        fetchBlog() // Refresh comments
      } else {
        toast.error(data.error || 'Failed to add comment')
      }
    } catch (error) {
      console.error('Error adding comment:', error)
      toast.error('Failed to add comment')
    } finally {
      setSubmittingComment(false)
    }
  }

  const handleDelete = async () => {
    if (!session?.user || !blog || blog.author.id !== session.user.id) return

    if (!confirm('Are you sure you want to delete this blog?')) return

    try {
      const response = await fetch(`/api/blogs/${blog._id}`, {
        method: 'DELETE',
      })

      const data = await response.json()
      if (data.success) {
        toast.success('Blog deleted successfully')
        window.location.href = '/blog'
      } else {
        toast.error(data.error || 'Failed to delete blog')
      }
    } catch (error) {
      console.error('Error deleting blog:', error)
      toast.error('Failed to delete blog')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatCommentDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog not found</h1>
            <p className="text-gray-600 mb-6">The blog you're looking for doesn't exist or has been removed.</p>
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

  const isAuthor = session?.user?.id === blog.author.id

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blogs
          </Link>
        </motion.div>

        {/* Blog Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          {/* Featured Image */}
          {blog.featuredImage && (
            <div className="h-64 md:h-96 bg-gray-200">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                {blog.author.name}
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {formatDate(blog.publishedAt)}
              </div>
              <div className="flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                {blog.views} views
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLike}
                  disabled={!session?.user}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    liked
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  } ${!session?.user ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Heart className={`w-5 h-5 mr-2 ${liked ? 'fill-current' : ''}`} />
                  {blog.likes.length} {blog.likes.length === 1 ? 'Like' : 'Likes'}
                </button>
                <div className="flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {blog.comments.length} {blog.comments.length === 1 ? 'Comment' : 'Comments'}
                </div>
              </div>

              {isAuthor && (
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/blog/${blog._id}/edit`}
                    className="flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="flex items-center px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                </div>
              )}
            </div>

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }}
            />
          </div>
        </motion.article>

        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-white rounded-lg shadow-md p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Comments ({blog.comments.length})
          </h3>

          {/* Add Comment Form */}
          {session?.user ? (
            <form onSubmit={handleComment} className="mb-8">
              <div className="mb-4">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submittingComment || !comment.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submittingComment ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          ) : (
            <div className="mb-8 p-4 bg-gray-100 rounded-lg text-center">
              <p className="text-gray-600 mb-4">Please sign in to leave a comment.</p>
              <Link
                href="/auth/signin"
                className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Link>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {blog.comments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
            ) : (
              blog.comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{comment.author.name}</h4>
                      <p className="text-sm text-gray-500">{formatCommentDate(comment.createdAt)}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}

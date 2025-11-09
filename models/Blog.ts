import mongoose, { Document, Schema } from 'mongoose'

export interface IBlog extends Document {
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
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
  views: number
  likes: string[] // Array of user IDs who liked
  comments: {
    id: string
    author: {
      id: string
      name: string
      email: string
    }
    content: string
    createdAt: Date
    likes: string[] // Array of user IDs who liked this comment
  }[]
}

const BlogSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 500
  },
  author: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  tags: [{
    type: String,
    trim: true
  }],
  featuredImage: {
    type: String,
    default: ''
  },
  published: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    type: String
  }],
  comments: [{
    id: {
      type: String,
      required: true
    },
    author: {
      id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      }
    },
    content: {
      type: String,
      required: true,
      maxlength: 1000
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    likes: [{
      type: String
    }]
  }]
}, {
  timestamps: true
})

// Index for better query performance
BlogSchema.index({ published: 1, publishedAt: -1 })
BlogSchema.index({ 'author.id': 1 })
BlogSchema.index({ tags: 1 })

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema)


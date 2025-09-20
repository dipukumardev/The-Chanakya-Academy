import mongoose, { Document, Schema } from 'mongoose'

export interface ICourse extends Document {
  title: string
  description: string
  instructor: string
  duration: number // in weeks
  price: number
  level: 'beginner' | 'intermediate' | 'advanced'
  category: string
  thumbnail: string
  videos: {
    title: string
    url: string
    duration: number // in minutes
    isPreview: boolean
  }[]
  students: mongoose.Types.ObjectId[]
  rating: number
  totalRatings: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const CourseSchema = new Schema<ICourse>({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  instructor: {
    type: String,
    required: [true, 'Instructor name is required'],
    trim: true
  },
  duration: {
    type: Number,
    required: [true, 'Course duration is required'],
    min: [1, 'Duration must be at least 1 week']
  },
  price: {
    type: Number,
    required: [true, 'Course price is required'],
    min: [0, 'Price cannot be negative']
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: [true, 'Course level is required']
  },
  category: {
    type: String,
    required: [true, 'Course category is required'],
    trim: true
  },
  thumbnail: {
    type: String,
    required: [true, 'Course thumbnail is required']
  },
  videos: [{
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    isPreview: {
      type: Boolean,
      default: false
    }
  }],
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

export default mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema)

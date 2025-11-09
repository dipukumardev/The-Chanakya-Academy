'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselImage {
  id: number
  src: string
  alt: string
  title: string
  description: string
}

const TeachingCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Teaching images from the internet
  const images: CarouselImage[] = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      alt: 'Students learning in classroom',
      title: 'Interactive Learning',
      description: 'Our students engage in hands-on learning experiences'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      alt: 'Group study session',
      title: 'Collaborative Study',
      description: 'Students working together to achieve academic excellence'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1523240798030-4b38b0c7c2b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      alt: 'Teacher explaining concepts',
      title: 'Expert Guidance',
      description: 'Our experienced faculty providing personalized attention'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      alt: 'Modern classroom with technology',
      title: 'Modern Infrastructure',
      description: 'State-of-the-art facilities for enhanced learning'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      alt: 'Students taking exam',
      title: 'Exam Preparation',
      description: 'Comprehensive test series and mock exams'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      alt: 'Science laboratory',
      title: 'Practical Learning',
      description: 'Hands-on experiments and practical demonstrations'
    }
  ]

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, images.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <div className="carousel-container relative w-full h-[500px] md:h-[600px]">
      {/* Main Image Container */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="carousel-image w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="carousel-overlay absolute inset-0" />
            
            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-4"
                  >
                    {images[currentIndex].title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl md:text-2xl text-gray-200 mb-8"
                  >
                    {images[currentIndex].description}
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="carousel-nav-button absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={goToNext}
        className="carousel-nav-button absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`carousel-dot w-3 h-3 rounded-full ${
              index === currentIndex
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
        aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
      >
        {isAutoPlaying ? (
          <div className="w-4 h-4 flex space-x-1">
            <div className="w-1 h-4 bg-white rounded"></div>
            <div className="w-1 h-4 bg-white rounded"></div>
          </div>
        ) : (
          <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent ml-1"></div>
        )}
      </button>
    </div>
  )
}

export default TeachingCarousel

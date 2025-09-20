import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Chanakya Academy - Premier Coaching Institute',
  description: 'Transform your future with The Chanakya Academy - India\'s leading coaching institute for competitive exams and academic excellence.',
  keywords: 'coaching, education, competitive exams, IIT, NEET, JEE, UPSC, Chanakya Academy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  )
}

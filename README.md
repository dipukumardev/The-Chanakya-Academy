# The Chanakya Academy - Coaching Institute Website

A modern, responsive website for The Chanakya Academy coaching institute built with Next.js 14, TypeScript, and MongoDB.

## Features

- 🏠 **5 Main Pages**: Home, About, Courses, Contact, and Authentication
- 👥 **Dual User System**: Student and Admin dashboards
- 🔐 **Authentication**: Secure login/signup with NextAuth.js
- 📚 **Course Management**: Browse and manage courses
- 📊 **Admin Dashboard**: Manage students, courses, and analytics
- 🎓 **Student Dashboard**: Track progress and access courses
- 📱 **Responsive Design**: Modern UI with Tailwind CSS
- 🗄️ **Database**: MongoDB with Mongoose for data storage

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **UI Components**: Lucide React Icons
- **Forms**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd the-chanakya-academy
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/chanakya-academy
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   ```

4. **Set up MongoDB**
   - For local MongoDB: Install and start MongoDB service
   - For MongoDB Atlas: Get connection string and update MONGODB_URI

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js 14 app directory
│   ├── auth/              # Authentication pages
│   ├── student/           # Student dashboard
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
├── lib/                   # Utility functions
├── models/                # MongoDB models
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

## Pages Overview

### Public Pages
- **Home** (`/`): Hero section, features, courses showcase
- **About** (`/about`): Mission, vision, team, achievements
- **Courses** (`/courses`): Course catalog with search and filters
- **Contact** (`/contact`): Contact form and information

### Authentication
- **Sign In** (`/auth/signin`): Student/Admin login
- **Sign Up** (`/auth/signup`): New user registration

### Dashboards
- **Student Dashboard** (`/student/dashboard`): Course progress, activities
- **Admin Dashboard** (`/admin/dashboard`): Manage students, courses, analytics

## Demo Accounts

For testing purposes, you can use these demo accounts:

**Student Account:**
- Email: student@example.com
- Password: password123

**Admin Account:**
- Email: admin@example.com
- Password: admin123

## Database Models

### User Model
- Personal information (name, email, phone)
- Authentication (password, role)
- Course enrollments
- Profile settings

### Course Model
- Course details (title, description, instructor)
- Pricing and duration
- Video content and materials
- Student enrollments and ratings

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth.js authentication
- Additional endpoints for course management, student data, etc.

## Customization

### Adding New Courses
1. Use the admin dashboard to create courses
2. Or directly add to the database using the Course model

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `app/globals.css` for global styles
- Component-specific styles in individual files

### Features
- Add new course categories in the courses page
- Extend user roles in the User model
- Add new dashboard widgets

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
1. Build the application: `npm run build`
2. Start production server: `npm start`
3. Configure MongoDB connection
4. Set up environment variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Email: info@chanakyaacademy.com
- Phone: +91 98765 43210

---

**The Chanakya Academy** - Empowering students with world-class education and personalized coaching to achieve their dreams and excel in competitive exams.

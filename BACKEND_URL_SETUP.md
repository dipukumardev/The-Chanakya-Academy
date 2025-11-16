# Backend URL Configuration Guide

## Overview

Your application has been configured to use a separate backend API deployed on Render. All frontend API calls now point to your backend URL: `https://the-chanakya-academy.onrender.com`

## What Was Changed

### 1. Created API Utility (`lib/api.ts`)
- Created a utility function `apiUrl()` that automatically prepends your backend URL to all API paths
- Uses the `NEXT_PUBLIC_API_URL` environment variable
- Defaults to `https://the-chanakya-academy.onrender.com` if not set

### 2. Updated All Frontend API Calls
The following files have been updated to use the backend URL:
- `app/blog/create/page.tsx` - Blog creation and image upload
- `app/blog/page.tsx` - Blog listing and tags
- `app/blog/[id]/page.tsx` - Blog details, likes, comments
- `app/blog/[id]/edit/page.tsx` - Blog editing
- `app/auth/signup/page.tsx` - User registration
- `app/student/dashboard/page.tsx` - Student dashboard
- `app/admin/dashboard/page.tsx` - Admin dashboard
- `app/admin/blogs/page.tsx` - Admin blog management
- `app/admin/students/page.tsx` - Admin student management

### 3. Environment Variable Configuration

## Where to Add the Backend URL

### For Local Development

Create a `.env.local` file in the root of your project:

```env
NEXT_PUBLIC_API_URL=https://the-chanakya-academy.onrender.com
MONGODB_URI=your-mongodb-connection-string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
NODE_ENV=development
```

### For Vercel Deployment

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://the-chanakya-academy.onrender.com`
   - **Environment**: Select all (Production, Preview, Development)

4. Make sure you also have these other environment variables:
   - `MONGODB_URI` - Your MongoDB connection string
   - `NEXTAUTH_URL` - Your Vercel frontend URL (e.g., `https://the-chanakya-academy.vercel.app`)
   - `NEXTAUTH_SECRET` - A secure random string
   - `NODE_ENV` - Set to `production`

## How It Works

All API calls in your frontend now use the `apiUrl()` helper function:

```typescript
// Before:
fetch('/api/blogs')

// After:
fetch(apiUrl('api/blogs'))
// This becomes: https://the-chanakya-academy.onrender.com/api/blogs
```

## Testing

1. **Test Backend API Directly**:
   - Visit: `https://the-chanakya-academy.onrender.com/api/blogs`
   - Should return JSON data

2. **Test Frontend**:
   - Deploy to Vercel with the environment variable set
   - Check browser console for any CORS errors
   - Test API calls from the frontend

## Important Notes

### CORS Configuration
If you encounter CORS errors, you may need to configure CORS on your Render backend to allow requests from your Vercel frontend domain (`https://the-chanakya-academy.vercel.app`).

### NextAuth
NextAuth is currently configured to connect directly to MongoDB from the frontend. If you want to move authentication to the backend API, you'll need to update the authentication flow.

### Image Uploads
Image uploads currently go to `/api/upload/image` on your backend. Make sure this endpoint is working on your Render backend.

## Troubleshooting

### API Calls Not Working
1. Check that `NEXT_PUBLIC_API_URL` is set correctly in Vercel
2. Verify your Render backend is running
3. Check browser console for errors
4. Test the backend API directly in your browser

### CORS Errors
- Add your Vercel domain to CORS allowed origins on your Render backend
- Check Render backend logs for CORS-related errors

### Environment Variables Not Working
- Remember: `NEXT_PUBLIC_*` variables are exposed to the browser
- Restart your development server after changing `.env.local`
- Redeploy on Vercel after changing environment variables

## Quick Reference

**Backend URL**: `https://the-chanakya-academy.onrender.com`  
**Frontend URL**: `https://the-chanakya-academy.vercel.app`  
**Environment Variable**: `NEXT_PUBLIC_API_URL`


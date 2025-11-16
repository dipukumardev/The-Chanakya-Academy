# Deployment Guide

This guide will help you deploy The Chanakya Academy Next.js application to **Vercel** (recommended for Next.js) or **Render**.

---

# 🚀 Deploying to Vercel (Recommended)

Vercel is the platform created by the Next.js team and offers the best experience for Next.js applications with automatic optimizations, edge functions, and zero-configuration deployment.

## Prerequisites

1. **GitHub Account** - Your code should be pushed to a GitHub repository
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com) (free tier available)
3. **MongoDB Atlas Account** - For database (free tier available at [mongodb.com/atlas](https://www.mongodb.com/atlas))

---

## Step 1: Push Code to GitHub

1. Initialize git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a new repository on GitHub

3. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 2: Set Up MongoDB Atlas

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) and sign up/login
2. Create a new cluster (choose the free M0 tier)
3. Create a database user:
   - Go to "Database Access" → "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
4. Whitelist IP addresses:
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0) for Vercel
5. Get your connection string:
   - Go to "Database" → "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your database name (e.g., `chanakya-academy`)

**Example connection string:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/chanakya-academy?retryWrites=true&w=majority
```

---

## Step 3: Deploy to Vercel

### Method 1: Using Vercel Dashboard (Recommended)

1. **Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up or login (you can use your GitHub account for easy integration)

2. **Import Your Project**
   - Click "Add New..." → "Project"
   - Connect your GitHub account if not already connected
   - Select your repository
   - Click "Import"

3. **Configure Project**
   - **Project Name**: `the-chanakya-academy` (or your preferred name)
   - **Framework Preset**: Vercel will auto-detect Next.js (no changes needed)
   - **Root Directory**: Leave as `.` (root)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Add Environment Variables**
   Click "Environment Variables" and add these:

   ```
   NODE_ENV=production
   NEXT_PUBLIC_API_URL=https://the-chanakya-academy.onrender.com
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/chanakya-academy?retryWrites=true&w=majority
   NEXTAUTH_URL=https://your-app-name.vercel.app
   NEXTAUTH_SECRET=your-super-secret-random-string-here
   ```

   **Important Notes:**
   - **`NEXT_PUBLIC_API_URL`**: This is your backend API URL on Render. Set it to `https://the-chanakya-academy.onrender.com` (or your actual Render backend URL)
   - Replace `MONGODB_URI` with your actual MongoDB Atlas connection string
   - Replace `NEXTAUTH_URL` with your Vercel app URL (you'll get this after deployment)
   - For `NEXTAUTH_SECRET`, generate a secure random string:
     ```bash
     openssl rand -base64 32
     ```
     Or use an online generator: [generate-secret.vercel.app](https://generate-secret.vercel.app/32)

5. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app
   - Wait for deployment to complete (2-5 minutes)
   - You'll get a URL like: `https://the-chanakya-academy.vercel.app`

### Method 2: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   Follow the prompts to link your project.

4. **Add Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_API_URL
   vercel env add MONGODB_URI
   vercel env add NEXTAUTH_URL
   vercel env add NEXTAUTH_SECRET
   vercel env add NODE_ENV
   ```
   
   When prompted, enter:
   - `NEXT_PUBLIC_API_URL`: `https://the-chanakya-academy.onrender.com` (your Render backend URL)
   - `MONGODB_URI`: Your MongoDB connection string
   - `NEXTAUTH_URL`: Your Vercel frontend URL (after first deploy)
   - `NEXTAUTH_SECRET`: A secure random string
   - `NODE_ENV`: `production`

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

---

## Step 4: Update Environment Variables After First Deploy

After your first deployment, Vercel will give you a URL like:
`https://the-chanakya-academy.vercel.app`

1. Go to your project settings on Vercel dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Update `NEXTAUTH_URL` to match your actual Vercel URL:
   ```
   NEXTAUTH_URL=https://the-chanakya-academy.vercel.app
   ```
4. Verify `NEXT_PUBLIC_API_URL` is set to your Render backend:
   ```
   NEXT_PUBLIC_API_URL=https://the-chanakya-academy.onrender.com
   ```
5. Save and redeploy (or push a new commit to trigger auto-deployment)

---

## Step 5: Verify Deployment

1. Visit your app URL (e.g., `https://your-app.vercel.app`)
2. Test the following:
   - Home page loads
   - Sign up/Sign in works
   - API routes are accessible
   - Database connection works

---

## Important Notes for Vercel

### File Uploads
⚠️ **Current Limitation**: The app currently saves uploaded images to the local filesystem (`public/uploads`). On Vercel, the filesystem is read-only except for `/tmp`, meaning uploaded files won't persist.

**Solutions:**
1. **Use Cloud Storage** (Recommended for production):
   - AWS S3
   - Cloudinary (easy integration)
   - Uploadcare
   - Vercel Blob Storage (Vercel's own solution)

2. **For now**: The app will work, but uploaded images won't persist. You'll need to implement cloud storage.

### Vercel Free Tier Benefits
- ✅ No cold starts (unlike Render)
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments on git push
- ✅ Preview deployments for pull requests
- ✅ 100GB bandwidth per month
- ✅ Serverless functions included

### Database
- Use MongoDB Atlas (free tier available)
- Ensure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0) or add Vercel's IP ranges

---

## Troubleshooting Vercel Deployment

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version (Vercel uses Node 18.x by default)
- Check for TypeScript errors

### Database Connection Errors
- Verify `MONGODB_URI` is correct in environment variables
- Check MongoDB Atlas network access settings (allow 0.0.0.0/0)
- Ensure database user has correct permissions
- Check Vercel function logs for detailed error messages

### Authentication Not Working
- Verify `NEXTAUTH_URL` matches your actual Vercel URL (including `https://`)
- Ensure `NEXTAUTH_SECRET` is set and is a secure random string
- Check that both URLs use HTTPS

### 404 Errors on API Routes
- Ensure you're using Next.js 14 App Router (which you are)
- Check that API routes are in `app/api/` directory
- Verify the route structure matches the URL
- Check Vercel function logs

### Image Upload Issues
- Remember: Vercel's filesystem is read-only
- You must use cloud storage for file uploads
- Consider using Vercel Blob Storage or Cloudinary

### Backend API Connection Issues
- Verify `NEXT_PUBLIC_API_URL` is set correctly in Vercel environment variables
- Ensure your Render backend is running and accessible
- Check browser console for CORS errors
- If you see CORS errors, you may need to configure CORS on your Render backend to allow requests from your Vercel frontend domain
- Test the backend API directly: `https://the-chanakya-academy.onrender.com/api/blogs`

---

## Updating Your Vercel Deployment

1. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push
   ```

2. Vercel will automatically detect changes and redeploy
3. Monitor the deployment in the Vercel dashboard

**Note:** Each push creates a new preview deployment. Merges to main branch create production deployments.

---

## Vercel Production Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Environment variables set correctly in Vercel
- [ ] **NEXT_PUBLIC_API_URL** set to your Render backend URL (`https://the-chanakya-academy.onrender.com`)
- [ ] NEXTAUTH_URL matches production URL
- [ ] NEXTAUTH_SECRET is a secure random string
- [ ] Database connection tested
- [ ] Authentication working
- [ ] API routes accessible (calling backend on Render)
- [ ] File upload solution implemented (cloud storage)
- [ ] Custom domain configured (optional)
- [ ] Analytics enabled (optional)

---

## Vercel-Specific Features

### Preview Deployments
- Every push to a branch creates a preview URL
- Perfect for testing before merging to main
- Share preview URLs with team members

### Environment Variables per Environment
- Set different variables for Production, Preview, and Development
- Useful for different database instances

### Analytics
- Enable Vercel Analytics in project settings
- Track page views and performance metrics

---

# 📦 Deploying to Render

This guide will help you deploy The Chanakya Academy Next.js application to Render.

## Prerequisites

1. **GitHub Account** - Your code should be pushed to a GitHub repository
2. **Render Account** - Sign up at [render.com](https://render.com) (free tier available)
3. **MongoDB Atlas Account** - For database (free tier available at [mongodb.com/atlas](https://www.mongodb.com/atlas))

---

## Step 1: Push Code to GitHub

1. Initialize git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a new repository on GitHub

3. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 2: Set Up MongoDB Atlas

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) and sign up/login
2. Create a new cluster (choose the free M0 tier)
3. Create a database user:
   - Go to "Database Access" → "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
4. Whitelist IP addresses:
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0) for Render
5. Get your connection string:
   - Go to "Database" → "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your database name (e.g., `chanakya-academy`)

**Example connection string:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/chanakya-academy?retryWrites=true&w=majority
```

---

## Step 3: Deploy to Render

### Option A: Using render.yaml (Recommended)

1. **Login to Render Dashboard**
   - Go to [dashboard.render.com](https://dashboard.render.com)
   - Sign up or login

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub account if not already connected
   - Select your repository

3. **Configure Service**
   - **Name**: `the-chanakya-academy` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Choose "Free" (or paid plan for better performance)

4. **Add Environment Variables**
   Click "Advanced" and add these environment variables:

   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/chanakya-academy?retryWrites=true&w=majority
   NEXTAUTH_URL=https://your-app-name.onrender.com
   NEXTAUTH_SECRET=your-super-secret-random-string-here
   NEXT_PUBLIC_FRONTEND_URL=https://the-chanakya-academy.vercel.app
   ```

   **Important Notes:**
   - Replace `MONGODB_URI` with your actual MongoDB Atlas connection string
   - Replace `NEXTAUTH_URL` with your Render app URL (you'll get this after deployment)
   - **`NEXT_PUBLIC_FRONTEND_URL`**: Set this to your Vercel frontend URL (`https://the-chanakya-academy.vercel.app`) - This is used for CORS configuration to allow requests from your frontend
   - For `NEXTAUTH_SECRET`, generate a secure random string:
     ```bash
     openssl rand -base64 32
     ```
     Or use an online generator: [generate-secret.vercel.app](https://generate-secret.vercel.app/32)

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your app
   - Wait for deployment to complete (5-10 minutes)

### Option B: Manual Configuration

1. Follow steps 1-2 from Option A
2. Instead of using render.yaml, manually configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - Add all environment variables as shown above

---

## Step 4: Update Environment Variables After First Deploy

After your first deployment, Render will give you a URL like:
`https://the-chanakya-academy.onrender.com`

1. Go to your service settings
2. Update `NEXTAUTH_URL` to match your actual app URL:
   ```
   NEXTAUTH_URL=https://the-chanakya-academy.onrender.com
   ```
3. Save and redeploy

---

## Step 5: Verify Deployment

1. Visit your app URL (e.g., `https://your-app.onrender.com`)
2. Test the following:
   - Home page loads
   - Sign up/Sign in works
   - API routes are accessible
   - Database connection works

---

## Important Notes

### File Uploads
⚠️ **Current Limitation**: The app currently saves uploaded images to the local filesystem (`public/uploads`). On Render, the filesystem is ephemeral, meaning uploaded files will be lost when the service restarts.

**Solutions:**
1. **Use Cloud Storage** (Recommended for production):
   - AWS S3
   - Cloudinary
   - Uploadcare
   - Render Disk (paid feature)

2. **For now**: The app will work, but uploaded images won't persist across deployments.

### Free Tier Limitations
- Render free tier services **spin down after 15 minutes of inactivity**
- First request after spin-down may take 30-60 seconds (cold start)
- Consider upgrading to a paid plan for production use

### Database
- Use MongoDB Atlas (free tier available)
- Ensure your MongoDB Atlas cluster allows connections from Render's IPs (0.0.0.0/0)

---

## Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Database Connection Errors
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas network access settings
- Ensure database user has correct permissions

### Authentication Not Working
- Verify `NEXTAUTH_URL` matches your actual Render URL
- Ensure `NEXTAUTH_SECRET` is set and is a secure random string
- Check that both URLs use the same protocol (https)

### 404 Errors on API Routes
- Ensure you're using Next.js 14 App Router (which you are)
- Check that API routes are in `app/api/` directory
- Verify the route structure matches the URL

---

## Updating Your Deployment

1. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push
   ```

2. Render will automatically detect changes and redeploy
3. Monitor the deployment in the Render dashboard

---

## Production Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Environment variables set correctly
- [ ] NEXTAUTH_URL matches production URL
- [ ] NEXTAUTH_SECRET is a secure random string
- [ ] Database connection tested
- [ ] Authentication working
- [ ] API routes accessible
- [ ] File upload solution implemented (if needed)
- [ ] Custom domain configured (optional)

---

## Support

If you encounter issues:
1. Check Render deployment logs
2. Check MongoDB Atlas connection status
3. Verify all environment variables are set
4. Review Next.js build output

For Render-specific help: [render.com/docs](https://render.com/docs)


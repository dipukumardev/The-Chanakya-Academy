# Deployment Guide for Render

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
   ```

   **Important Notes:**
   - Replace `MONGODB_URI` with your actual MongoDB Atlas connection string
   - Replace `NEXTAUTH_URL` with your Render app URL (you'll get this after deployment)
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


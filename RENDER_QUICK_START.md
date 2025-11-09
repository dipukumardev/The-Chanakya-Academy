# Render Deployment - Quick Start Guide

## 🚀 Quick Steps

### 1. **Prepare MongoDB Atlas**
   - Sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Create free cluster (M0 tier)
   - Create database user
   - Whitelist IP: `0.0.0.0/0` (allow all)
   - Copy connection string

### 2. **Push Code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

### 3. **Deploy on Render**
   - Go to [dashboard.render.com](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect GitHub repo
   - Use these settings:
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
     - **Plan**: Free

### 4. **Add Environment Variables**
   In Render dashboard, add:
   ```
   NODE_ENV=production
   MONGODB_URI=your-mongodb-atlas-connection-string
   NEXTAUTH_URL=https://your-app-name.onrender.com
   NEXTAUTH_SECRET=generate-random-32-char-string
   ```

### 5. **Generate NEXTAUTH_SECRET**
   Run this command or use [generate-secret.vercel.app/32](https://generate-secret.vercel.app/32):
   ```bash
   openssl rand -base64 32
   ```

### 6. **Deploy & Update**
   - Click "Create Web Service"
   - Wait for deployment
   - After getting your URL, update `NEXTAUTH_URL` with the actual URL
   - Redeploy if needed

---

## 📋 Environment Variables Checklist

- [ ] `NODE_ENV=production`
- [ ] `MONGODB_URI` (from MongoDB Atlas)
- [ ] `NEXTAUTH_URL` (your Render app URL)
- [ ] `NEXTAUTH_SECRET` (random secure string)

---

## ⚠️ Important Notes

1. **Free Tier**: Services spin down after 15 min inactivity (cold start ~30-60s)
2. **File Uploads**: Current file uploads won't persist (use cloud storage for production)
3. **First Deploy**: May take 5-10 minutes
4. **Auto Deploy**: Render auto-deploys on git push

---

## 🔗 Useful Links

- [Render Dashboard](https://dashboard.render.com)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Generate Secret](https://generate-secret.vercel.app/32)

---

For detailed instructions, see `DEPLOYMENT.md`


# Deployment Guide for Render

This guide provides step-by-step instructions for deploying the BGMI Scoreboard on Render.

## 📋 Prerequisites

1. A [Render account](https://render.com) (free tier works)
2. Your code pushed to a GitHub repository
3. Basic understanding of environment variables

## 🚀 Quick Deploy (Recommended)

### Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Ready for deployment"
   ```

2. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy via Render Blueprint

1. **Go to Render Dashboard**
   - Visit [https://dashboard.render.com/](https://dashboard.render.com/)
   - Sign in or create an account

2. **Create New Blueprint**
   - Click **"New"** → **"Blueprint"**
   - Click **"Connect a repository"**
   - Authorize Render to access your GitHub
   - Select your `bgmi-scoreboard` repository

3. **Render Auto-Detection**
   - Render will automatically detect the `render.yaml` file
   - It will show you 2 services to be created:
     - `bgmi-scoreboard-backend` (Web Service)
     - `bgmi-scoreboard-frontend` (Static Site)

4. **Review and Deploy**
   - Review the configuration
   - Click **"Apply"**
   - Render will start deploying both services

### Step 3: Configure Frontend Environment Variables

After the initial deployment completes:

1. **Get Backend URL**
   - Go to your backend service in Render dashboard
   - Copy the URL (e.g., `https://bgmi-scoreboard-backend.onrender.com`)

2. **Update Frontend Environment Variables**
   - Go to your frontend service in Render dashboard
   - Click **"Environment"** in the left sidebar
   - Add these environment variables:
     ```
     VITE_API_URL=https://bgmi-scoreboard-backend.onrender.com/api
     VITE_SOCKET_URL=https://bgmi-scoreboard-backend.onrender.com
     ```
   - Click **"Save Changes"**

3. **Redeploy Frontend**
   - Click **"Manual Deploy"** → **"Deploy latest commit"**
   - Wait for deployment to complete

### Step 4: Test Your Deployment

1. **Test Backend**
   - Visit: `https://bgmi-scoreboard-backend.onrender.com/api/health`
   - Should return: `{"success": true, "message": "Server is healthy"}`

2. **Test Frontend**
   - Visit: `https://bgmi-scoreboard-frontend.onrender.com`
   - Should show the scoreboard
   - Check browser console for any errors

3. **Test Real-time Connection**
   - Open browser console
   - Should see: "Socket connected"
   - No WebSocket errors

## 🔧 Manual Deployment (Alternative)

If you prefer to deploy services individually:

### Deploy Backend

1. **Create Web Service**
   - Dashboard → **New** → **Web Service**
   - Connect repository
   - Configure:
     ```
     Name: bgmi-scoreboard-backend
     Root Directory: backend
     Environment: Node
     Build Command: npm install
     Start Command: npm start
     ```

2. **Add Environment Variables**
   ```
   NODE_ENV=production
   ```

3. **Deploy**
   - Click **"Create Web Service"**
   - Wait for deployment

### Deploy Frontend

1. **Create Static Site**
   - Dashboard → **New** → **Static Site**
   - Connect repository
   - Configure:
     ```
     Name: bgmi-scoreboard-frontend
     Root Directory: frontend
     Build Command: npm install && npm run build
     Publish Directory: dist
     ```

2. **Add Environment Variables**
   ```
   VITE_API_URL=https://YOUR-BACKEND-URL.onrender.com/api
   VITE_SOCKET_URL=https://YOUR-BACKEND-URL.onrender.com
   ```

3. **Deploy**
   - Click **"Create Static Site"**
   - Wait for deployment

## ⚙️ Environment Variables Reference

### Backend
| Variable | Value | Required |
|----------|-------|----------|
| `NODE_ENV` | `production` | Yes |
| `PORT` | `10000` | Auto-set by Render |

### Frontend
| Variable | Value | Required |
|----------|-------|----------|
| `VITE_API_URL` | `https://your-backend.onrender.com/api` | Yes |
| `VITE_SOCKET_URL` | `https://your-backend.onrender.com` | Yes |

## 🎯 Post-Deployment Checklist

- [ ] Backend health check returns success
- [ ] Frontend loads without errors
- [ ] Socket.IO connection established
- [ ] Admin panel accessible at `/admin`
- [ ] Can add teams via admin panel
- [ ] Can start and submit matches
- [ ] Leaderboard updates in real-time
- [ ] Export functions work (JSON/Excel)

## 🐛 Common Issues

### Issue: Frontend shows "Cannot connect to server"

**Solution:**
1. Check `VITE_API_URL` is correct
2. Ensure backend is running (not sleeping)
3. Check backend logs for errors
4. Verify CORS is enabled (already configured)

### Issue: WebSocket connection failed

**Solution:**
1. Ensure `VITE_SOCKET_URL` uses HTTPS (not HTTP)
2. Check browser console for specific error
3. Verify backend supports WebSocket (already configured)
4. Try refreshing the page

### Issue: Backend service is sleeping

**Solution:**
- Free tier services sleep after 15 minutes of inactivity
- First request will wake it up (takes 30-60 seconds)
- Consider upgrading to paid plan for production use

### Issue: Build fails on Render

**Solution:**
1. Check Render build logs for specific error
2. Verify `package.json` has all dependencies
3. Ensure Node version compatibility
4. Try building locally first: `npm run build`

## 🔄 Updating Your Deployment

### Push Updates
```bash
git add .
git commit -m "Your update message"
git push origin main
```

Render will automatically detect the push and redeploy both services.

### Manual Redeploy
1. Go to service in Render dashboard
2. Click **"Manual Deploy"**
3. Select **"Deploy latest commit"**

## 💰 Render Free Tier Limits

- **Web Services**: 750 hours/month (shared across all services)
- **Bandwidth**: 100 GB/month
- **Build Minutes**: 500 minutes/month
- **Sleep After**: 15 minutes of inactivity
- **Spin-up Time**: 30-60 seconds

For active tournaments, consider upgrading to a paid plan ($7/month per service).

## 🔐 Security Recommendations

For production use, consider:

1. **Add Authentication** to admin panel
2. **Restrict CORS** to specific domains
3. **Add Rate Limiting** to prevent abuse
4. **Use Environment Variables** for sensitive data
5. **Enable HTTPS** (automatic on Render)

## 📊 Monitoring

### View Logs
1. Go to service in Render dashboard
2. Click **"Logs"** tab
3. View real-time logs

### View Metrics
1. Go to service in Render dashboard
2. Click **"Metrics"** tab
3. View CPU, memory, and bandwidth usage

## 🆘 Support

If you encounter issues:

1. Check Render's [documentation](https://render.com/docs)
2. Review Render's [status page](https://status.render.com/)
3. Check this project's GitHub issues
4. Contact Render support (for Render-specific issues)

## 🎉 Success!

Once deployed, share these URLs with your tournament participants:

- **Scoreboard**: `https://bgmi-scoreboard-frontend.onrender.com`
- **Admin Panel**: `https://bgmi-scoreboard-frontend.onrender.com/admin`

---

**Happy Tournament Management! 🎮🏆**

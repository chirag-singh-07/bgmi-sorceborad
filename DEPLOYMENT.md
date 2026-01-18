# Manual Deployment Guide for Render

This guide shows how to deploy the backend and frontend separately on Render **without using Blueprint**.

## 🚀 Step-by-Step Manual Deployment

### Part 1: Deploy Backend (5 minutes)

#### 1. Create Backend Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Click **"Build and deploy from a Git repository"** → **"Next"**
4. Connect your GitHub account (if not already connected)
5. Find and select your `bgmi-scoreboard` repository
6. Click **"Connect"**

#### 2. Configure Backend Service

Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `bgmi-scoreboard-backend` |
| **Region** | Singapore (or closest to you) |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | `Free` |

#### 3. Add Backend Environment Variables

Click **"Advanced"** and add:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |

#### 4. Configure Health Check (Optional but Recommended)

- **Health Check Path**: `/api/health`

#### 5. Deploy Backend

1. Click **"Create Web Service"**
2. Wait for deployment to complete (2-3 minutes)
3. **Copy your backend URL** (e.g., `https://bgmi-scoreboard-backend.onrender.com`)
4. Test it: Visit `https://your-backend-url.onrender.com/api/health`
   - Should return: `{"success": true, "message": "Server is healthy"}`

---

### Part 2: Deploy Frontend (5 minutes)

#### 1. Create Frontend Static Site

1. Go back to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Static Site"**
3. Click **"Build and deploy from a Git repository"** → **"Next"**
4. Select your `bgmi-scoreboard` repository
5. Click **"Connect"**

#### 2. Configure Frontend Service

Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `bgmi-scoreboard-frontend` |
| **Region** | Singapore (or same as backend) |
| **Branch** | `main` |
| **Root Directory** | `frontend` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

#### 3. Add Frontend Environment Variables

Click **"Advanced"** and add these environment variables:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://YOUR-BACKEND-URL.onrender.com/api` |
| `VITE_SOCKET_URL` | `https://YOUR-BACKEND-URL.onrender.com` |

**Important**: Replace `YOUR-BACKEND-URL` with the actual backend URL you copied in Part 1!

Example:
```
VITE_API_URL=https://bgmi-scoreboard-backend.onrender.com/api
VITE_SOCKET_URL=https://bgmi-scoreboard-backend.onrender.com
```

#### 4. Deploy Frontend

1. Click **"Create Static Site"**
2. Wait for deployment to complete (2-3 minutes)
3. **Copy your frontend URL** (e.g., `https://bgmi-scoreboard-frontend.onrender.com`)

---

## ✅ Verify Deployment

### Test Backend
1. Visit: `https://your-backend-url.onrender.com/api/health`
2. Should see: `{"success": true, "message": "Server is healthy"}`

### Test Frontend
1. Visit: `https://your-frontend-url.onrender.com`
2. Should see the scoreboard loading
3. Open browser console (F12)
4. Should see: "Socket connected" (no errors)

### Test Admin Panel
1. Visit: `https://your-frontend-url.onrender.com/admin`
2. Should be able to add teams
3. Should be able to start matches

---

### Part 3: Keep Backend Awake (Optional but Recommended)

To prevent your backend from sleeping on the free tier, set up a cron job that pings it every 14 minutes.

#### 1. Create Cron Job

1. Go back to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Cron Job"**
3. Click **"Build and deploy from a Git repository"** → **"Next"**
4. Select your `bgmi-scoreboard` repository
5. Click **"Connect"**

#### 2. Configure Cron Job

Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `bgmi-scoreboard-keep-alive` |
| **Region** | Singapore (same as backend) |
| **Branch** | `main` |
| **Runtime** | `Node` |
| **Build Command** | `echo "Keep alive cron"` |
| **Start Command** | See below ⬇️ |
| **Schedule** | `*/14 * * * *` |
| **Plan** | `Free` |

#### 3. Set Start Command

**IMPORTANT**: Replace `YOUR-BACKEND-URL` with your actual backend URL from Part 1!

```bash
curl https://YOUR-BACKEND-URL.onrender.com/api/health || wget -q -O- https://YOUR-BACKEND-URL.onrender.com/api/health
```

**Example**:
```bash
curl https://bgmi-scoreboard-backend.onrender.com/api/health || wget -q -O- https://bgmi-scoreboard-backend.onrender.com/api/health
```

#### 4. Create Cron Job

1. Click **"Create Cron Job"**
2. Wait for initial setup to complete
3. Done! Your backend will now stay awake 24/7! ✅

**Result**: No more 30-60 second delays when accessing your scoreboard!

For detailed instructions and alternative methods, see [KEEP_ALIVE_SETUP.md](./KEEP_ALIVE_SETUP.md).

---

## 📝 Your Deployment URLs

Record your URLs here for reference:

```
Backend API: https://________________________________.onrender.com
Frontend:    https://________________________________.onrender.com
Admin Panel: https://________________________________.onrender.com/admin
```

---

## 🔄 Updating Your Deployment

### Update Backend
1. Push changes to GitHub: `git push origin main`
2. Render will auto-deploy (or click "Manual Deploy" in dashboard)

### Update Frontend
1. Push changes to GitHub: `git push origin main`
2. Render will auto-deploy (or click "Manual Deploy" in dashboard)

### Update Environment Variables
1. Go to service in Render dashboard
2. Click **"Environment"** in left sidebar
3. Update variables
4. Click **"Save Changes"**
5. Service will automatically redeploy

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: Build fails
- Check Render logs for specific error
- Verify `package.json` exists in `backend/` directory
- Ensure all dependencies are listed

**Problem**: Service crashes on start
- Check logs for error messages
- Verify `npm start` works locally
- Check that port is set via `process.env.PORT`

### Frontend Issues

**Problem**: Build fails
- Check Render logs for specific error
- Verify `package.json` exists in `frontend/` directory
- Test build locally: `cd frontend && npm run build`

**Problem**: "Cannot connect to server"
- Verify `VITE_API_URL` is correct
- Ensure backend is running (not sleeping)
- Check backend URL is HTTPS (not HTTP)

**Problem**: WebSocket connection failed
- Verify `VITE_SOCKET_URL` is correct
- Ensure it's HTTPS (not HTTP)
- Check browser console for specific error

**Problem**: Blank page or 404 errors
- Verify `Publish Directory` is set to `dist`
- Check that build completed successfully
- Verify routes are configured (should be automatic for static sites)

---

## 💰 Free Tier Limitations

- **Web Services**: Sleep after 15 minutes of inactivity
- **Spin-up Time**: 30-60 seconds on first request after sleep
- **Build Minutes**: 500 minutes/month
- **Bandwidth**: 100 GB/month

For active tournaments, consider upgrading to paid plan ($7/month per service).

---

## 🔐 Security Notes

### Current Setup (Development-Friendly)
- ✅ CORS set to `*` (all origins)
- ⚠️ No admin authentication
- ✅ HTTPS automatic on Render

### For Production Use
Consider adding:
1. Admin authentication
2. Restrict CORS to specific domains
3. Rate limiting
4. Input validation

---

## 📊 Monitoring

### View Logs
1. Go to service in Render dashboard
2. Click **"Logs"** tab
3. View real-time logs
4. Filter by severity

### View Metrics
1. Go to service in Render dashboard
2. Click **"Metrics"** tab
3. View CPU, memory, bandwidth usage

### Set Up Alerts (Paid Plans)
- Configure email alerts for service issues
- Monitor uptime and performance

---

## 🎉 Success!

Once both services are deployed and tested, you're ready to use your scoreboard!

**Share these URLs with your tournament participants:**
- **Scoreboard**: `https://your-frontend-url.onrender.com`
- **Admin Panel**: `https://your-frontend-url.onrender.com/admin`

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Render Status Page](https://status.render.com/)
- Project README: `README.md`
- API Documentation: `API_EXAMPLES.md`

---

**Ready for Tournament! 🎮🏆**

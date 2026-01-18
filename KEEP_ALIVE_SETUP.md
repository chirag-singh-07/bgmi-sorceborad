# Keep Backend Awake - Cron Job Setup

This guide shows how to set up a cron job on Render to keep your backend from sleeping on the free tier.

## 🎯 Why You Need This

On Render's free tier:
- Services sleep after **15 minutes** of inactivity
- First request after sleep takes **30-60 seconds**
- This can be frustrating during tournaments

**Solution**: A cron job that pings your backend every 14 minutes to keep it awake!

## 🚀 Setup Cron Job on Render

### Step 1: Create Cron Job

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New +** → **Cron Job**
3. Click **"Build and deploy from a Git repository"** → **Next**
4. Select your repository
5. Click **Connect**

### Step 2: Configure Cron Job

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

### Step 3: Set Start Command

**IMPORTANT**: Replace `YOUR-BACKEND-URL` with your actual backend URL!

```bash
curl https://YOUR-BACKEND-URL.onrender.com/api/health || wget -q -O- https://YOUR-BACKEND-URL.onrender.com/api/health
```

**Example**:
```bash
curl https://bgmi-scoreboard-backend.onrender.com/api/health || wget -q -O- https://bgmi-scoreboard-backend.onrender.com/api/health
```

### Step 4: Create Cron Job

1. Click **Create Cron Job**
2. Wait for initial setup to complete
3. Done! ✅

## 📋 What This Does

- **Schedule**: `*/14 * * * *` means "every 14 minutes"
- **Command**: Pings your backend's health check endpoint
- **Result**: Backend stays awake and responsive!

## ✅ Verify It's Working

### Check Cron Job Logs
1. Go to your cron job in Render dashboard
2. Click **Logs** tab
3. You should see successful pings every 14 minutes

### Check Backend Logs
1. Go to your backend service in Render dashboard
2. Click **Logs** tab
3. You should see health check requests every 14 minutes

## 🔧 Alternative: Use External Service

If you prefer not to use Render's cron jobs, you can use free external services:

### Option 1: UptimeRobot
1. Go to [UptimeRobot](https://uptimerobot.com/)
2. Create free account
3. Add new monitor:
   - **Type**: HTTP(s)
   - **URL**: `https://your-backend.onrender.com/api/health`
   - **Interval**: 5 minutes (free tier)
4. Done!

### Option 2: Cron-Job.org
1. Go to [Cron-Job.org](https://cron-job.org/)
2. Create free account
3. Create new cron job:
   - **URL**: `https://your-backend.onrender.com/api/health`
   - **Schedule**: Every 14 minutes
4. Done!

### Option 3: GitHub Actions (Free)

Create `.github/workflows/keep-alive.yml`:

```yaml
name: Keep Backend Awake

on:
  schedule:
    # Runs every 14 minutes
    - cron: '*/14 * * * *'
  workflow_dispatch: # Allow manual trigger

jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Backend
        run: |
          curl https://YOUR-BACKEND-URL.onrender.com/api/health || true
```

## 💰 Cost Comparison

| Method | Cost | Reliability | Setup |
|--------|------|-------------|-------|
| **Render Cron Job** | Free | High | Easy |
| **UptimeRobot** | Free | High | Very Easy |
| **Cron-Job.org** | Free | High | Very Easy |
| **GitHub Actions** | Free | High | Medium |

## ⚠️ Important Notes

### Free Tier Limits
- Render free tier includes cron jobs
- No additional cost for keep-alive pings
- Uses minimal resources

### Schedule Timing
- **14 minutes** is optimal (just before 15-minute sleep)
- Don't go below 5 minutes (unnecessary load)
- Don't go above 14 minutes (might sleep)

### Health Check Endpoint
- Must return 200 status code
- Already configured at `/api/health`
- Lightweight and fast

## 🎯 Recommended Setup

**For Best Results**:
1. Use **Render Cron Job** (simplest, all in one place)
2. Set schedule to `*/14 * * * *`
3. Monitor logs occasionally to ensure it's working

**For Maximum Reliability**:
1. Use **Render Cron Job** as primary
2. Add **UptimeRobot** as backup (5-minute interval)
3. Get email alerts if backend goes down

## 🐛 Troubleshooting

### Cron job fails
- Check backend URL is correct
- Ensure backend is deployed and running
- Verify health check endpoint works manually

### Backend still sleeps
- Check cron job logs for errors
- Verify schedule is `*/14 * * * *`
- Ensure cron job is enabled

### Too many requests
- 14-minute interval is optimal
- Don't add multiple keep-alive services
- One cron job is sufficient

## 📊 Monitor Your Setup

### Render Dashboard
- Backend service → Metrics → See uptime
- Cron job → Logs → See successful pings
- Both should show consistent activity

### Expected Behavior
- Backend never sleeps
- Instant response times
- No 30-60 second delays
- Happy tournament participants! 🎉

---

**Your backend will now stay awake 24/7! 🚀**

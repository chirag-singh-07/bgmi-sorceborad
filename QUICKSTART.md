# Quick Start Guide - BGMI Scoreboard Deployment

## 🎯 What You Need

1. **GitHub Account** - To host your code
2. **Render Account** - Free tier is fine ([render.com](https://render.com))
3. **5 Minutes** - That's all it takes!

## 🚀 Deploy in 3 Steps

### Step 1: Push to GitHub (2 minutes)

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Add your GitHub repo
git remote add origin https://github.com/YOUR_USERNAME/bgmi-scoreboard.git

# Push
git push -u origin main
```

### Step 2: Deploy on Render (2 minutes)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New** → **Blueprint**
3. Connect your GitHub repository
4. Click **Apply** (Render will create both services automatically)

### Step 3: Configure Frontend (1 minute)

After deployment completes:

1. Go to your **backend service** → Copy the URL
2. Go to your **frontend service** → **Environment** tab
3. Add these variables:
   ```
   VITE_API_URL=https://YOUR-BACKEND-URL.onrender.com/api
   VITE_SOCKET_URL=https://YOUR-BACKEND-URL.onrender.com
   ```
4. Click **Manual Deploy** → **Deploy latest commit**

## ✅ Done! 

Your scoreboard is live at:
- **Scoreboard**: `https://bgmi-scoreboard-frontend.onrender.com`
- **Admin Panel**: `https://bgmi-scoreboard-frontend.onrender.com/admin`

## 📱 Share With Your Team

Send these links to tournament participants:
- **View Scoreboard**: `https://your-frontend-url.onrender.com`
- **Admin Access**: `https://your-frontend-url.onrender.com/admin`

## 🎮 Using the Scoreboard

### For Admins:
1. Go to `/admin`
2. Add all participating teams
3. Start a new match when ready
4. Submit results after each match
5. Export data for records

### For Viewers:
1. Go to main URL
2. Watch live updates
3. See real-time leaderboard
4. View match status

## 🔧 Troubleshooting

### "Cannot connect to server"
- Wait 60 seconds (free tier wakes up from sleep)
- Check environment variables are set correctly
- Verify backend URL is correct

### "WebSocket connection failed"
- Ensure URLs use HTTPS (not HTTP)
- Refresh the page
- Check browser console for errors

## 💡 Pro Tips

1. **Free Tier Limits**: Services sleep after 15 minutes of inactivity
2. **Wake Up Time**: First request takes 30-60 seconds
3. **For Active Tournaments**: Consider upgrading to paid plan ($7/month)
4. **Mobile Friendly**: Works on all devices
5. **Real-time**: No refresh needed, updates automatically

## 📊 Features

- ✅ Real-time score updates
- ✅ Automatic ranking with tie-breakers
- ✅ Match state management
- ✅ Qualification tracking
- ✅ Excel & JSON export
- ✅ Beautiful responsive UI
- ✅ Admin panel
- ✅ LAN support

## 🆘 Need Help?

Check these files:
- `DEPLOYMENT.md` - Detailed deployment guide
- `DEPLOYMENT_CHECKLIST.md` - Step-by-step checklist
- `README.md` - Full documentation

## 🎉 Success Checklist

- [ ] Backend deployed and healthy
- [ ] Frontend deployed and loading
- [ ] Socket connection working
- [ ] Can add teams
- [ ] Can submit matches
- [ ] Leaderboard updates in real-time
- [ ] Export functions work

---

**Ready for Tournament! 🎮🏆**

Made with ❤️ by Chirag Singh

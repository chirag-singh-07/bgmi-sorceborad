# 🚀 Quick Deploy Guide (Manual Method)

Deploy your BGMI Scoreboard in **10 minutes** without using Blueprint!

## Part 1: Deploy Backend (5 min)

### Step 1: Create Web Service
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Click **Connect**

### Step 2: Configure
```
Name:           bgmi-scoreboard-backend
Region:         Singapore
Root Directory: backend
Runtime:        Node
Build Command:  npm install
Start Command:  npm start
Plan:           Free
```

### Step 3: Add Environment Variable
```
NODE_ENV = production
```

### Step 4: Deploy
- Click **Create Web Service**
- Wait 2-3 minutes
- **Copy your backend URL** ✅

---

## Part 2: Deploy Frontend (5 min)

### Step 1: Create Static Site
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New +** → **Static Site**
3. Connect your GitHub repository
4. Click **Connect**

### Step 2: Configure
```
Name:            bgmi-scoreboard-frontend
Region:          Singapore
Root Directory:  frontend
Build Command:   npm install && npm run build
Publish Dir:     dist
Plan:            Free
```

### Step 3: Add Environment Variables
**IMPORTANT**: Use your actual backend URL from Part 1!

```
VITE_API_URL     = https://YOUR-BACKEND-URL.onrender.com/api
VITE_SOCKET_URL  = https://YOUR-BACKEND-URL.onrender.com
```

Example:
```
VITE_API_URL     = https://bgmi-scoreboard-backend.onrender.com/api
VITE_SOCKET_URL  = https://bgmi-scoreboard-backend.onrender.com
```

### Step 4: Deploy
- Click **Create Static Site**
- Wait 2-3 minutes
- **Your app is live!** 🎉

---

## ✅ Test Your Deployment

### Backend Test
Visit: `https://your-backend-url.onrender.com/api/health`  
Should see: `{"success": true, "message": "Server is healthy"}`

### Frontend Test
Visit: `https://your-frontend-url.onrender.com`  
Should see: Scoreboard loading with no errors

### Admin Panel Test
Visit: `https://your-frontend-url.onrender.com/admin`  
Should be able to add teams and manage matches

---

## 📱 Share With Your Team

**Scoreboard**: `https://your-frontend-url.onrender.com`  
**Admin Panel**: `https://your-frontend-url.onrender.com/admin`

---

## 🔧 Common Issues

### "Cannot connect to server"
- Wait 60 seconds (free tier wakes from sleep)
- Check `VITE_API_URL` is correct
- Ensure backend URL uses HTTPS

### "WebSocket connection failed"
- Check `VITE_SOCKET_URL` is correct
- Ensure it uses HTTPS (not HTTP)
- Refresh the page

---

## 💡 Important Notes

- **Free Tier**: Services sleep after 15 minutes
- **Wake Time**: First request takes 30-60 seconds
- **Auto Deploy**: Pushes to GitHub trigger redeployment
- **HTTPS**: Automatic on Render

---

## 📚 Need More Help?

See `DEPLOYMENT.md` for detailed step-by-step instructions with screenshots and troubleshooting.

---

**Ready for Tournament! 🎮🏆**

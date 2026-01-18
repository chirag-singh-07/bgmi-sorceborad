# 🚀 Deployment Checklist

Use this checklist before deploying to Render.

## Pre-Deployment

- [ ] All code is committed to Git
- [ ] Code is pushed to GitHub
- [ ] `.env` files are NOT committed (check `.gitignore`)
- [ ] `.env.example` is committed for reference
- [ ] All dependencies are listed in `package.json`
- [ ] Build works locally (`npm run build` in frontend)
- [ ] Backend starts without errors (`npm start` in backend)

## Local Testing

- [ ] Backend health check works: `http://localhost:5000/api/health`
- [ ] Frontend loads without errors: `http://localhost:5173`
- [ ] Socket.IO connection established (check browser console)
- [ ] Can add teams via admin panel
- [ ] Can start and submit matches
- [ ] Leaderboard updates in real-time
- [ ] Export functions work (JSON/Excel)

## Render Configuration

### Backend Service
- [ ] Service name: `bgmi-scoreboard-backend`
- [ ] Root directory: `backend`
- [ ] Environment: `Node`
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] Environment variable: `NODE_ENV=production`
- [ ] Health check path: `/api/health`

### Frontend Service
- [ ] Service name: `bgmi-scoreboard-frontend`
- [ ] Root directory: `frontend`
- [ ] Build command: `npm install && npm run build`
- [ ] Publish directory: `dist`
- [ ] Environment variables set:
  - [ ] `VITE_API_URL` = `https://your-backend.onrender.com/api`
  - [ ] `VITE_SOCKET_URL` = `https://your-backend.onrender.com`

## Post-Deployment Testing

- [ ] Backend health check returns success
- [ ] Frontend loads without errors
- [ ] No console errors in browser
- [ ] Socket.IO connection established
- [ ] Admin panel accessible at `/admin`
- [ ] Can add teams
- [ ] Can start matches
- [ ] Can submit match results
- [ ] Leaderboard updates in real-time
- [ ] Export JSON works
- [ ] Export Excel works

## Production URLs

Record your deployed URLs here:

```
Backend URL: https://_____________________________.onrender.com
Frontend URL: https://_____________________________.onrender.com
Admin Panel: https://_____________________________.onrender.com/admin
```

## Environment Variables (Production)

### Frontend
```
VITE_API_URL=https://_____________________________.onrender.com/api
VITE_SOCKET_URL=https://_____________________________.onrender.com
```

## Common Issues

### Issue: Frontend shows "Cannot connect to server"
- [ ] Check `VITE_API_URL` is correct
- [ ] Ensure backend is running (not sleeping)
- [ ] Check backend logs for errors
- [ ] Verify CORS is enabled

### Issue: WebSocket connection failed
- [ ] Ensure `VITE_SOCKET_URL` uses HTTPS (not HTTP)
- [ ] Check browser console for specific error
- [ ] Verify backend supports WebSocket
- [ ] Try refreshing the page

### Issue: Backend service is sleeping
- [ ] Free tier services sleep after 15 minutes
- [ ] First request will wake it up (30-60 seconds)
- [ ] Consider upgrading to paid plan

## Final Verification

- [ ] Share scoreboard URL with test users
- [ ] Verify real-time updates work across multiple devices
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices
- [ ] Document any issues and solutions

## Ready for Tournament! 🎮🏆

Once all items are checked, your BGMI Scoreboard is ready for production use!

---

**Deployment Date:** _______________
**Deployed By:** _______________
**Notes:** 
_______________________________________________
_______________________________________________
_______________________________________________

# BGMI Esports Live Scoreboard

Production-ready full-stack application for managing BGMI college tournament scoreboard with real-time updates, accurate scoring, and data export capabilities.

## 🎯 Features

- ✅ Real-time score updates via Socket.IO
- ✅ Accurate BGMI point calculation (Placement + Kill points)
- ✅ Automatic leaderboard ranking with tie-breaker logic
- ✅ Match state management (UPCOMING, LIVE, UPDATING, COMPLETED)
- ✅ Qualification system (configurable top N teams)
- ✅ Excel & JSON export for post-tournament records
- ✅ Beautiful, responsive UI with live animations
- ✅ Admin panel for tournament management
- ✅ LAN-ready for local network tournaments

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - REST API framework
- **Socket.IO** - Real-time bidirectional communication
- **ExcelJS** - Excel file generation

### Frontend
- **React** - UI framework
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Socket.IO Client** - Real-time updates
- **React Router** - Navigation

## 📦 Local Development

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd bgmi-sorceborad
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm start
   ```
   Server runs on: `http://localhost:5000`

3. **Frontend Setup** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend runs on: `http://localhost:5173`

## 🚀 Deployment on Render

This project is ready for deployment on Render. Deploy the backend and frontend separately.

### Quick Deploy (10 Minutes)

#### 1. Deploy Backend
1. Go to [Render Dashboard](https://dashboard.render.com/) → **New +** → **Web Service**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `bgmi-scoreboard-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variable**: `NODE_ENV=production`
4. Click **Create Web Service**
5. **Copy your backend URL** (e.g., `https://bgmi-scoreboard-backend.onrender.com`)

#### 2. Deploy Frontend
1. Go to [Render Dashboard](https://dashboard.render.com/) → **New +** → **Static Site**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `bgmi-scoreboard-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Environment Variables**:
     - `VITE_API_URL`: `https://your-backend-url.onrender.com/api`
     - `VITE_SOCKET_URL`: `https://your-backend-url.onrender.com`
4. Click **Create Static Site**

#### 3. Done!
Your app is live at:
- **Scoreboard**: `https://bgmi-scoreboard-frontend.onrender.com`
- **Admin Panel**: `https://bgmi-scoreboard-frontend.onrender.com/admin`

### Detailed Instructions

See [QUICKSTART.md](./QUICKSTART.md) for a quick guide or [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed step-by-step instructions.

### Important Notes

- **Free Tier**: Services sleep after 15 minutes of inactivity
- **Wake Time**: First request takes 30-60 seconds
- **Auto Deploy**: Pushes to GitHub automatically trigger redeployment
- **HTTPS**: Automatic on Render

## 🌐 Production URLs

After deployment, you'll have:
- **Backend API**: `https://bgmi-scoreboard-backend.onrender.com`
- **Frontend**: `https://bgmi-scoreboard-frontend.onrender.com`
- **Admin Panel**: `https://bgmi-scoreboard-frontend.onrender.com/admin`

## 📡 API Endpoints

### Public Endpoints
- `GET /api/health` - Server health check
- `GET /api/teams` - Get all teams
- `GET /api/leaderboard` - Get ranked leaderboard
- `GET /api/match/status` - Get current match status

### Admin Endpoints
- `POST /api/admin/match/submit` - Submit match results
- `POST /api/admin/match/start` - Start new match
- `GET /api/admin/export/json` - Download JSON export
- `GET /api/admin/export/excel` - Download Excel export

See [API_EXAMPLES.md](./API_EXAMPLES.md) for detailed API documentation.

## 📊 Scoring System

### Placement Points
| Position | Points |
|----------|--------|
| 1st | 10 |
| 2nd | 6 |
| 3rd | 5 |
| 4th | 4 |
| 5th | 3 |
| 6th | 2 |
| 7th-8th | 1 |
| 9th-16th | 0 |

### Kill Points
- **1 kill = 1 point**

### Total Match Points
```
Total Points = Placement Points + Kill Points
```

## 🎮 Usage

1. **Access the Scoreboard**: Visit your frontend URL
2. **Access Admin Panel**: Visit `<frontend-url>/admin`
3. **Add Teams**: Use admin panel to add participating teams
4. **Start Match**: Click "Start New Match" when ready
5. **Submit Results**: After match ends, submit results for all teams
6. **View Leaderboard**: Real-time updates on scoreboard
7. **Export Data**: Download Excel/JSON for records

## 🔒 Security Considerations

- **Admin Panel**: Currently no authentication (add if needed)
- **CORS**: Set to `*` for ease of use (restrict in production if needed)
- **Rate Limiting**: Not implemented (add if needed)

## 🐛 Troubleshooting

### Backend not responding
- Check Render logs in dashboard
- Verify environment variables are set
- Ensure service is not sleeping (free tier)

### Frontend can't connect to backend
- Verify `VITE_API_URL` and `VITE_SOCKET_URL` are correct
- Check CORS settings
- Ensure backend is running

### Socket connection failed
- Verify WebSocket URL is HTTPS (not HTTP)
- Check browser console for errors
- Ensure backend supports WebSocket

## 📁 Project Structure

```
bgmi-sorceborad/
├── backend/                 # Node.js backend
│   ├── config/             # Configuration files
│   ├── controllers/        # API controllers
│   ├── models/             # Data models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── sockets/            # Socket.IO handlers
│   └── index.js            # Server entry point
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── App.jsx         # Main app component
│   └── index.html          # HTML entry point
├── render.yaml             # Render deployment config
└── README.md               # This file
```

## 👨‍💻 Author

**Chirag Singh**
- Project: BGMI Esports Live Scoreboard
- Purpose: College Tournament Management

## 📄 License

ISC

---

**Ready for Tournament! 🎮🏆**

For detailed backend documentation, see [backend/README.md](./backend/README.md)
For frontend documentation, see [frontend/README.md](./frontend/README.md)

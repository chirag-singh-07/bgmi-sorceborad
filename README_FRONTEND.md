# BGMI Esports Live Scoreboard - Frontend

Premium, real-time React application for managing and displaying BGMI tournament scores.

## 🚀 Features

- **Admin Panel (`/admin`)**: Match control, result entry, and data export.
- **Scoreboard Display (`/scoreboard`)**: High-impact, projector-ready live standings.
- **Real-Time Updates**: Instant UI synchronization via Socket.IO.
- **Adaptive Layouts**: Automatic switching between Live Match and Leaderboard views.
- **Esports Aesthetics**: Dark theme, high-contrast visuals, and professional typography.

## 🛠️ Tech Stack

- **React + Vite**: Fast, modern frontend framework.
- **Tailwind CSS**: Utility-first styling with custom esports theme.
- **Socket.IO Client**: Real-time communication with the backend.
- **Axios**: Promised-based HTTP client for REST APIs.
- **Lucide React**: Clean and consistent iconography.
- **React Router**: Client-side routing.

## 📦 Installation

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Modify `.env` if your backend is running on a different port or IP.
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_SOCKET_URL=http://localhost:5000
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

## 🖥️ Screen Usage

### 🟡 Admin Panel (`/admin`)
Designed for the operator's laptop. Use this to:
1. Start/End matches.
2. Enter team kills and placement positions.
3. Download JSON/CSV reports.

### 🟢 Scoreboard Display (`/scoreboard`)
Designed for the projector or main stage screen.
- **During Match**: Shows "LIVE" status and match info.
- **Post Match**: Automatically transitions to the detailed leaderboard.

## 🌐 LAN Setup

To access the scoreboard from other devices on the same network (e.g., a dedicated projector laptop):
1. Find your server IP (e.g., `192.168.1.100`).
2. Update `.env` with this IP.
3. Run `npm run dev -- --host` to expose the frontend.
4. Access via `http://192.168.1.100:5173/scoreboard`.

## 📜 Development Notes

- **Real-time Synchronization**: The app listens for `matchStatusUpdate` and `leaderboardUpdate` events.
- **Conditional Rendering**: Responsive components switch styles when in "Big Screen" mode.
- **Error Handling**: Graceful disconnection handling with auto-reconnect.

---

**Built for competition. 🎮🏆**

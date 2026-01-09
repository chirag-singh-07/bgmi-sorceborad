# BGMI Esports Live Scoreboard - Backend

Production-ready Node.js backend for managing BGMI college tournament scoreboard with real-time updates, accurate scoring, and data export capabilities.

## 🎯 Features

- ✅ Real-time score updates via Socket.IO
- ✅ Accurate BGMI point calculation (Placement + Kill points)
- ✅ Automatic leaderboard ranking with tie-breaker logic
- ✅ Match state management (UPCOMING, LIVE, UPDATING, COMPLETED)
- ✅ Qualification system (configurable top N teams)
- ✅ Excel & JSON export for post-tournament records
- ✅ In-memory storage (easily upgradable to database)
- ✅ LAN-ready for local network tournaments
- ✅ Clean, well-commented code for viva/evaluation

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - REST API framework
- **Socket.IO** - Real-time bidirectional communication
- **ExcelJS** - Excel file generation
- **CORS** - Cross-origin resource sharing
- **Body-Parser** - Request body parsing

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Setup Steps

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies** (already done)
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

   Or for development:
   ```bash
   npm run dev
   ```

4. **Server will start on:**
   - Local: `http://localhost:5000`
   - Network: `http://<YOUR_IP>:5000`

## 🏗️ Project Structure

```
backend/
├── index.js                    # Main server entry point
├── config/
│   └── constants.js            # Scoring rules, match states
├── models/
│   ├── team.js                 # Team data & in-memory storage
│   └── match.js                # Match state management
├── services/
│   ├── scoringService.js       # Point calculation logic
│   ├── rankingService.js       # Leaderboard sorting
│   └── exportService.js        # JSON/Excel export
├── controllers/
│   ├── teamController.js       # Team API handlers
│   ├── matchController.js      # Match API handlers
│   └── exportController.js     # Export API handlers
├── routes/
│   └── api.js                  # All REST API routes
├── sockets/
│   └── socketHandler.js        # Socket.IO event handlers
└── exports/                    # Generated export files
```

## 📡 API Endpoints

### Public Endpoints (Frontend/Scoreboard)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |
| GET | `/api/teams` | Get all teams |
| GET | `/api/teams/:id` | Get single team |
| GET | `/api/leaderboard` | Get ranked leaderboard |
| GET | `/api/stats` | Get tournament statistics |
| GET | `/api/match/status` | Get current match status |
| GET | `/api/match/history` | Get match history |
| GET | `/api/export/data` | Get JSON data (no download) |

### Admin Endpoints (Admin Panel)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/teams` | Add new team |
| DELETE | `/api/admin/teams/reset` | Reset all teams |
| POST | `/api/admin/match/start` | Start new match |
| POST | `/api/admin/match/submit` | Submit match results |
| POST | `/api/admin/match/status` | Update match status |
| POST | `/api/admin/match/undo` | Undo last match |
| POST | `/api/admin/qualification/update` | Update qualification |
| POST | `/api/admin/tournament/reset` | Reset entire tournament |
| GET | `/api/admin/export/json` | Download JSON export |
| GET | `/api/admin/export/excel` | Download Excel export |

## 🔌 Socket.IO Events

### Events Emitted by Server (Client Receives)

| Event | Description | Payload |
|-------|-------------|---------|
| `initialData` | Sent when client connects | `{ leaderboard, matchState, timestamp }` |
| `currentState` | Current state on request | `{ leaderboard, matchState, timestamp }` |
| `leaderboardUpdate` | Leaderboard changed | `{ leaderboard, timestamp }` |
| `matchStatusUpdate` | Match status changed | `{ matchState, timestamp }` |
| `qualificationUpdate` | Qualification updated | `{ qualified, eliminated, timestamp }` |
| `matchSubmitted` | Match results submitted | `{ matchData, timestamp }` |

### Events Received by Server (Client Sends)

| Event | Description |
|-------|-------------|
| `requestCurrentState` | Request current state |

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

### Leaderboard Ranking (Priority Order)
1. Higher Total Points
2. Higher First-Place Finishes
3. Higher Total Placement Points
4. Higher Total Kill Points

## 🎮 Usage Examples

### 1. Submit Match Results

**Request:**
```bash
POST http://localhost:5000/api/admin/match/submit
Content-Type: application/json

{
  "results": [
    {
      "teamName": "Team Alpha",
      "kills": 12,
      "placement": 1
    },
    {
      "teamName": "Team Beta",
      "kills": 8,
      "placement": 2
    },
    {
      "teamName": "Team Gamma",
      "kills": 5,
      "placement": 3
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Match results submitted successfully",
  "data": {
    "matchNumber": 1,
    "results": [
      {
        "teamName": "Team Alpha",
        "kills": 12,
        "placement": 1,
        "placementPoints": 10,
        "killPoints": 12,
        "totalPoints": 22
      }
    ],
    "leaderboard": [...]
  }
}
```

### 2. Get Leaderboard

**Request:**
```bash
GET http://localhost:5000/api/leaderboard
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "stats": {
    "totalTeams": 3,
    "totalMatches": 1,
    "totalKills": 25,
    "avgPointsPerTeam": 18.67
  },
  "data": [
    {
      "rank": 1,
      "id": 1,
      "name": "Team Alpha",
      "matchesPlayed": 1,
      "totalKills": 12,
      "totalPlacementPoints": 10,
      "totalKillPoints": 12,
      "totalPoints": 22,
      "firstPlaceFinishes": 1,
      "qualificationStatus": "PENDING"
    }
  ]
}
```

### 3. Update Match Status

**Request:**
```bash
POST http://localhost:5000/api/admin/match/status
Content-Type: application/json

{
  "state": "LIVE"
}
```

### 4. Update Qualification

**Request:**
```bash
POST http://localhost:5000/api/admin/qualification/update
Content-Type: application/json

{
  "qualificationLimit": 8
}
```

## 🌐 LAN Setup for Tournament

### Find Your IP Address

**Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" (e.g., 192.168.1.100)

**Mac/Linux:**
```bash
ifconfig
```

### Connect from Other Devices

Once server is running, other devices on the same network can access:
- **API:** `http://192.168.1.100:5000/api/leaderboard`
- **Socket.IO:** `ws://192.168.1.100:5000`

## 📥 Export System

### JSON Export
- Contains complete tournament data
- Includes all team statistics
- Timestamped filename
- Saved in `exports/` folder

### Excel Export
- Professional leaderboard format
- Color-coded qualification status
- Formatted headers and borders
- Suitable for certificates and records
- Saved in `exports/` folder

## 🔒 Data Validation

The backend includes comprehensive validation:
- ✅ Team names cannot be empty
- ✅ Kills must be non-negative
- ✅ Placement must be 1-16
- ✅ No duplicate placements in same match
- ✅ No duplicate teams in same match
- ✅ Match state must be valid

## 🚀 Future Database Integration

The code is structured for easy database integration:

1. Replace `models/team.js` with database queries
2. Replace `models/match.js` with database queries
3. Keep all services and controllers unchanged
4. Recommended: MongoDB, PostgreSQL, or MySQL

## 📝 Notes for Viva/Evaluation

- All code is well-commented and self-explanatory
- Follows clean architecture principles
- Separation of concerns (Models, Services, Controllers)
- Error handling at every level
- Console logging for debugging
- Ready for production use

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in config/constants.js
PORT: 5001
```

### CORS Issues
- Already configured for `*` (all origins)
- Suitable for LAN tournaments

### Socket Connection Failed
- Check firewall settings
- Ensure server IP is accessible
- Verify port is not blocked

## 👨‍💻 Author

**Chirag Singh**
- Project: BGMI Esports Live Scoreboard
- Purpose: College Tournament Management

## 📄 License

ISC

---

**Ready for Tournament! 🎮🏆**

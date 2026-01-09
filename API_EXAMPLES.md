# API Testing Examples

Use these examples with Postman, Thunder Client, or curl to test the backend.

## Base URL
```
http://localhost:5000
```

---

## 1. Health Check

**GET** `/api/health`

```bash
curl http://localhost:5000/api/health
```

**Response:**
```json
{
  "success": true,
  "status": "Server is running",
  "timestamp": "2026-01-09T11:07:00.000Z",
  "connectedClients": 0
}
```

---

## 2. Start a New Match

**POST** `/api/admin/match/start`

```bash
curl -X POST http://localhost:5000/api/admin/match/start
```

**Response:**
```json
{
  "success": true,
  "message": "Match #1 started",
  "data": {
    "state": "LIVE",
    "matchNumber": 1,
    "startTime": "2026-01-09T11:07:30.000Z",
    "endTime": null
  }
}
```

---

## 3. Submit Match Results

**POST** `/api/admin/match/submit`

```bash
curl -X POST http://localhost:5000/api/admin/match/submit \
  -H "Content-Type: application/json" \
  -d '{
    "results": [
      {
        "teamName": "Soul",
        "kills": 15,
        "placement": 1
      },
      {
        "teamName": "GodLike",
        "kills": 12,
        "placement": 2
      },
      {
        "teamName": "TSM",
        "kills": 10,
        "placement": 3
      },
      {
        "teamName": "Orange Rock",
        "kills": 8,
        "placement": 4
      },
      {
        "teamName": "Revenant",
        "kills": 7,
        "placement": 5
      },
      {
        "teamName": "8Bit",
        "kills": 6,
        "placement": 6
      },
      {
        "teamName": "Enigma",
        "kills": 5,
        "placement": 7
      },
      {
        "teamName": "Velocity",
        "kills": 4,
        "placement": 8
      }
    ]
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Match results submitted successfully",
  "data": {
    "matchNumber": 1,
    "results": [...],
    "leaderboard": [...]
  }
}
```

---

## 4. Get Leaderboard

**GET** `/api/leaderboard`

```bash
curl http://localhost:5000/api/leaderboard
```

**Response:**
```json
{
  "success": true,
  "count": 8,
  "stats": {
    "totalTeams": 8,
    "totalMatches": 1,
    "totalKills": 67,
    "avgPointsPerTeam": 12.5
  },
  "data": [
    {
      "rank": 1,
      "id": 1,
      "name": "Soul",
      "matchesPlayed": 1,
      "totalKills": 15,
      "totalPlacementPoints": 10,
      "totalKillPoints": 15,
      "totalPoints": 25,
      "firstPlaceFinishes": 1,
      "qualificationStatus": "PENDING"
    }
  ]
}
```

---

## 5. Get Match Status

**GET** `/api/match/status`

```bash
curl http://localhost:5000/api/match/status
```

**Response:**
```json
{
  "success": true,
  "data": {
    "state": "COMPLETED",
    "matchNumber": 1,
    "startTime": "2026-01-09T11:07:30.000Z",
    "endTime": "2026-01-09T11:15:00.000Z"
  }
}
```

---

## 6. Update Match Status

**POST** `/api/admin/match/status`

```bash
curl -X POST http://localhost:5000/api/admin/match/status \
  -H "Content-Type: application/json" \
  -d '{"state": "LIVE"}'
```

**Valid States:**
- `UPCOMING`
- `LIVE`
- `UPDATING`
- `COMPLETED`

---

## 7. Update Qualification

**POST** `/api/admin/qualification/update`

```bash
curl -X POST http://localhost:5000/api/admin/qualification/update \
  -H "Content-Type: application/json" \
  -d '{"qualificationLimit": 8}'
```

**Response:**
```json
{
  "success": true,
  "message": "Qualification status updated",
  "data": {
    "qualified": [
      {"id": 1, "name": "Soul", "rank": 1},
      {"id": 2, "name": "GodLike", "rank": 2}
    ],
    "eliminated": [],
    "qualificationLimit": 8
  }
}
```

---

## 8. Export JSON

**GET** `/api/admin/export/json`

```bash
curl -O http://localhost:5000/api/admin/export/json
```

Downloads: `leaderboard_match1_2026-01-09T11-15-00-000Z.json`

---

## 9. Export Excel

**GET** `/api/admin/export/excel`

```bash
curl -O http://localhost:5000/api/admin/export/excel
```

Downloads: `leaderboard_match1_2026-01-09T11-15-00-000Z.xlsx`

---

## 10. Get All Teams

**GET** `/api/teams`

```bash
curl http://localhost:5000/api/teams
```

---

## 11. Get Match History

**GET** `/api/match/history`

```bash
curl http://localhost:5000/api/match/history
```

---

## 12. Reset Tournament

**POST** `/api/admin/tournament/reset`

```bash
curl -X POST http://localhost:5000/api/admin/tournament/reset
```

⚠️ **Warning:** This will delete all teams and match data!

---

## Complete Match Flow Example

```bash
# 1. Start Match
curl -X POST http://localhost:5000/api/admin/match/start

# 2. Update status to LIVE
curl -X POST http://localhost:5000/api/admin/match/status \
  -H "Content-Type: application/json" \
  -d '{"state": "LIVE"}'

# 3. Submit results after match ends
curl -X POST http://localhost:5000/api/admin/match/submit \
  -H "Content-Type: application/json" \
  -d '{"results": [...]}'

# 4. Check leaderboard
curl http://localhost:5000/api/leaderboard

# 5. Export data
curl -O http://localhost:5000/api/admin/export/excel
```

---

## Testing with Postman

1. Import these requests as a collection
2. Set base URL as environment variable: `{{baseUrl}} = http://localhost:5000`
3. Use `{{baseUrl}}/api/leaderboard` format

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Server Error

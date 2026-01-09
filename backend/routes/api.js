/**
 * API Routes
 * All REST API endpoints
 */

import express from 'express';
const router = express.Router();

// Import controllers
import * as teamController from '../controllers/teamController.js';
import * as matchController from '../controllers/matchController.js';
import * as exportController from '../controllers/exportController.js';

// ============================================
// PUBLIC ROUTES (for frontend/scoreboard)
// ============================================

// Team & Leaderboard Routes
router.get('/teams', teamController.getTeams);
router.get('/teams/:id', teamController.getTeam);
router.get('/leaderboard', teamController.getLeaderboardData);
router.get('/stats', teamController.getStats);

// Match Status Routes
router.get('/match/status', matchController.getMatchStatus);
router.get('/match/history', matchController.getHistory);

// Export Routes (Read-only data)
router.get('/export/data', exportController.getJsonData);
router.get('/export/files', exportController.listExports);

// ============================================
// ADMIN ROUTES (for admin panel)
// ============================================

// Team Management
router.post('/admin/teams', teamController.addTeam);
router.delete('/admin/teams/reset', teamController.resetTeams);

// Match Control
router.post('/admin/match/start', matchController.startMatch);
router.post('/admin/match/submit', matchController.submitMatchResults);
router.post('/admin/match/status', matchController.updateMatchStatus);
router.post('/admin/match/undo', matchController.undoLastMatch);

// Qualification Management
router.post('/admin/qualification/update', matchController.updateQualificationStatus);

// Tournament Management
router.post('/admin/tournament/reset', matchController.resetTournament);
router.post('/admin/audio', matchController.handleAudioAction);

// Export Generation
router.get('/admin/export/json', exportController.exportJson);
router.get('/admin/export/excel', exportController.exportExcel);

// ============================================
// HEALTH CHECK
// ============================================
router.get('/health', async (req, res) => {
  const { getConnectedClientsCount } = await import('../sockets/socketHandler.js');
  
  res.json({
    success: true,
    status: 'Server is running',
    timestamp: new Date().toISOString(),
    connectedClients: getConnectedClientsCount()
  });
});

export default router;

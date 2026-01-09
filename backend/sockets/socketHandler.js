/**
 * Socket Handler
 * Manages Socket.IO events and real-time communication
 */

import { getCurrentMatchState } from '../models/match.js';
import { getAllTeams } from '../models/team.js';
import { getLeaderboard } from '../services/rankingService.js';

let io = null;

/**
 * Initialize Socket.IO
 * @param {object} socketIO - Socket.IO instance
 */
const initializeSocket = (socketIO) => {
  io = socketIO;
  
  io.on('connection', (socket) => {
    console.log(`✅ Client connected: ${socket.id}`);
    
    // Send initial data to newly connected client
    const teams = getAllTeams();
    const leaderboard = getLeaderboard(teams);
    const matchState = getCurrentMatchState();
    
    socket.emit('initialData', {
      leaderboard,
      matchState,
      timestamp: new Date().toISOString()
    });
    
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
    
    // Handle client requesting current state
    socket.on('requestCurrentState', () => {
      const teams = getAllTeams();
      const leaderboard = getLeaderboard(teams);
      const matchState = getCurrentMatchState();
      
      socket.emit('currentState', {
        leaderboard,
        matchState,
        timestamp: new Date().toISOString()
      });
    });
  });
};

/**
 * Broadcast leaderboard update to all clients
 */
const broadcastLeaderboardUpdate = () => {
  if (!io) {
    console.error('Socket.IO not initialized');
    return;
  }
  
  const teams = getAllTeams();
  const leaderboard = getLeaderboard(teams);
  
  io.emit('leaderboardUpdate', {
    leaderboard,
    timestamp: new Date().toISOString()
  });
  
  console.log('📊 Broadcasted leaderboard update to all clients');
};

/**
 * Broadcast match status update to all clients
 * @param {object} matchState - Current match state
 */
const broadcastMatchStatusUpdate = (matchState) => {
  if (!io) {
    console.error('Socket.IO not initialized');
    return;
  }
  
  io.emit('matchStatusUpdate', {
    matchState,
    timestamp: new Date().toISOString()
  });
  
  console.log(`🎮 Broadcasted match status: ${matchState.state} (Match #${matchState.matchNumber})`);
};

/**
 * Broadcast qualification update to all clients
 * @param {object} qualificationData - Qualification data
 */
const broadcastQualificationUpdate = (qualificationData) => {
  if (!io) {
    console.error('Socket.IO not initialized');
    return;
  }
  
  io.emit('qualificationUpdate', {
    ...qualificationData,
    timestamp: new Date().toISOString()
  });
  
  console.log('🏆 Broadcasted qualification update to all clients');
};

/**
 * Broadcast match submission confirmation
 * @param {object} matchData - Match submission data
 */
const broadcastMatchSubmitted = (matchData) => {
  if (!io) {
    console.error('Socket.IO not initialized');
    return;
  }
  
  io.emit('matchSubmitted', {
    matchData,
    timestamp: new Date().toISOString()
  });
  
  console.log('✅ Broadcasted match submission confirmation');
};

/**
 * Get connected clients count
 * @returns {number} Number of connected clients
 */
const getConnectedClientsCount = () => {
  if (!io) return 0;
  return io.engine.clientsCount;
};

/**
 * Broadcast audio action (play/pause/mute) to all scoreboards
 * @param {object} audioAction - Audio action data { action, volume, loop }
 */
const broadcastAudioAction = (audioAction) => {
  if (!io) {
    console.error('Socket.IO not initialized');
    return;
  }
  
  io.emit('audioAction', {
    ...audioAction,
    timestamp: new Date().toISOString()
  });
  
  console.log(`🔊 Broadcasted audio action: ${audioAction.action}`);
};

export {
  initializeSocket,
  broadcastLeaderboardUpdate,
  broadcastMatchStatusUpdate,
  broadcastQualificationUpdate,
  broadcastMatchSubmitted,
  broadcastAudioAction,
  getConnectedClientsCount
};

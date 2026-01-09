/**
 * Match Controller
 * Handles match-related API logic and admin operations
 */

import { 
  getCurrentMatchState, 
  setMatchState, 
  startNewMatch, 
  completeMatch,
  addToHistory,
  getMatchHistory,
  removeLastMatch,
  resetMatchState
} from '../models/match.js';
import { updateTeamStats, getAllTeams, updateQualificationStatus, resetAllTeams } from '../models/team.js';
import { validateMatchResults, calculateMatchPoints } from '../services/scoringService.js';
import { getLeaderboard, updateQualification } from '../services/rankingService.js';
import { 
  broadcastLeaderboardUpdate, 
  broadcastMatchStatusUpdate,
  broadcastQualificationUpdate,
  broadcastMatchSubmitted
} from '../sockets/socketHandler.js';
import { MATCH_STATES, DEFAULT_QUALIFICATION_LIMIT } from '../config/constants.js';

/**
 * Get current match status
 */
const getMatchStatus = (req, res) => {
  try {
    const matchState = getCurrentMatchState();
    
    res.json({
      success: true,
      data: matchState
    });
  } catch (error) {
    console.error('Error getting match status:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Update match state (admin only)
 */
const updateMatchStatus = (req, res) => {
  try {
    const { state } = req.body;
    
    if (!state) {
      return res.status(400).json({
        success: false,
        error: 'Match state is required'
      });
    }
    
    const matchState = setMatchState(state);
    
    // Broadcast update to all clients
    broadcastMatchStatusUpdate(matchState);
    
    res.json({
      success: true,
      message: `Match state updated to ${state}`,
      data: matchState
    });
  } catch (error) {
    console.error('Error updating match status:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Start a new match (admin only)
 */
const startMatch = (req, res) => {
  try {
    const matchState = startNewMatch();
    
    // Broadcast update to all clients
    broadcastMatchStatusUpdate(matchState);
    
    res.json({
      success: true,
      message: `Match #${matchState.matchNumber} started`,
      data: matchState
    });
  } catch (error) {
    console.error('Error starting match:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Submit match results (admin only)
 * This is the main endpoint for updating scores after a match
 */
const submitMatchResults = (req, res) => {
  try {
    const { results } = req.body;
    
    // Validate input
    if (!results || !Array.isArray(results)) {
      return res.status(400).json({
        success: false,
        error: 'Results must be an array of team results'
      });
    }
    
    // Validate all results
    validateMatchResults(results);
    
    // Process each team's result
    const processedResults = results.map(result => {
      const { teamName, kills, placement } = result;
      
      // Calculate points
      const points = calculateMatchPoints(placement, kills);
      
      // Update team stats
      const team = updateTeamStats(
        teamName,
        kills,
        points.placementPoints,
        points.killPoints,
        placement
      );
      
      return {
        teamName,
        kills,
        placement,
        ...points,
        teamId: team.id
      };
    });
    
    // Add to match history
    const matchState = getCurrentMatchState();
    addToHistory({
      matchNumber: matchState.matchNumber,
      results: processedResults
    });
    
    // Complete the match
    completeMatch();
    
    // Broadcast updates
    broadcastMatchSubmitted({
      matchNumber: matchState.matchNumber,
      results: processedResults
    });
    broadcastLeaderboardUpdate();
    broadcastMatchStatusUpdate(getCurrentMatchState());
    
    console.log(`✅ Match #${matchState.matchNumber} results submitted successfully`);
    
    res.json({
      success: true,
      message: 'Match results submitted successfully',
      data: {
        matchNumber: matchState.matchNumber,
        results: processedResults,
        leaderboard: getLeaderboard(getAllTeams())
      }
    });
  } catch (error) {
    console.error('Error submitting match results:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Undo last match submission (admin only)
 */
const undoLastMatch = (req, res) => {
  try {
    const lastMatch = removeLastMatch();
    
    if (!lastMatch) {
      return res.status(400).json({
        success: false,
        error: 'No match to undo'
      });
    }
    
    // Note: Full undo would require reverting team stats
    // This is a simplified version - for production, implement full rollback
    
    res.json({
      success: true,
      message: 'Last match removed from history',
      data: lastMatch,
      warning: 'Team statistics were not reverted. Consider resetting tournament for accurate data.'
    });
  } catch (error) {
    console.error('Error undoing match:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get match history
 */
const getHistory = (req, res) => {
  try {
    const history = getMatchHistory();
    
    res.json({
      success: true,
      count: history.length,
      data: history
    });
  } catch (error) {
    console.error('Error getting match history:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Update qualification status (admin only)
 */
const updateQualificationStatusHandler = (req, res) => {
  try {
    const { qualificationLimit = DEFAULT_QUALIFICATION_LIMIT } = req.body;
    
    const teams = getAllTeams();
    const qualificationData = updateQualification(teams, qualificationLimit);
    
    // Update team qualification status
    const qualifiedIds = qualificationData.qualified.map(t => t.id);
    const eliminatedIds = qualificationData.eliminated.map(t => t.id);
    updateQualificationStatus(qualifiedIds, eliminatedIds);
    
    // Broadcast update
    broadcastQualificationUpdate(qualificationData);
    broadcastLeaderboardUpdate();
    
    res.json({
      success: true,
      message: 'Qualification status updated',
      data: qualificationData
    });
  } catch (error) {
    console.error('Error updating qualification:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Reset entire tournament (admin only)
 */
const resetTournament = (req, res) => {
  try {
    resetMatchState();
    resetAllTeams();
    
    // Broadcast updates
    broadcastMatchStatusUpdate(getCurrentMatchState());
    broadcastLeaderboardUpdate();
    
    res.json({
      success: true,
      message: 'Tournament has been reset'
    });
  } catch (error) {
    console.error('Error resetting tournament:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Handle audio actions (play/pause/volume)
 */
const handleAudioAction = async (req, res) => {
  try {
    const { action, volume = 0.5, loop = true } = req.body;
    
    if (!action) {
      return res.status(400).json({
        success: false,
        error: 'Audio action is required'
      });
    }
    
    const audioData = { action, volume, loop };
    
    // Broadcast to all scoreboards
    const { broadcastAudioAction } = await import('../sockets/socketHandler.js');
    broadcastAudioAction(audioData);
    
    res.json({
      success: true,
      message: `Audio action ${action} broadcasted`,
      data: audioData
    });
  } catch (error) {
    console.error('Error handling audio action:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export {
  getMatchStatus,
  updateMatchStatus,
  startMatch,
  submitMatchResults,
  undoLastMatch,
  getHistory,
  updateQualificationStatusHandler as updateQualificationStatus,
  resetTournament,
  handleAudioAction
};

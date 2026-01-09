/**
 * Team Controller
 * Handles team-related API logic
 */

import { getAllTeams, getTeamById, createTeam, resetAllTeams, getTeamCount } from '../models/team.js';
import { getLeaderboard, getStatsSummary } from '../services/rankingService.js';

/**
 * Get all teams
 */
const getTeams = (req, res) => {
  try {
    const teams = getAllTeams();
    
    res.json({
      success: true,
      count: teams.length,
      data: teams
    });
  } catch (error) {
    console.error('Error getting teams:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get leaderboard with ranking
 */
const getLeaderboardData = (req, res) => {
  try {
    const teams = getAllTeams();
    const leaderboard = getLeaderboard(teams);
    const stats = getStatsSummary(teams);
    
    res.json({
      success: true,
      count: leaderboard.length,
      stats,
      data: leaderboard
    });
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get single team by ID
 */
const getTeam = (req, res) => {
  try {
    const { id } = req.params;
    const team = getTeamById(parseInt(id));
    
    if (!team) {
      return res.status(404).json({
        success: false,
        error: 'Team not found'
      });
    }
    
    res.json({
      success: true,
      data: team
    });
  } catch (error) {
    console.error('Error getting team:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Create a new team (manual registration)
 */
const addTeam = (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name || name.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Team name is required'
      });
    }
    
    const team = createTeam(name);
    
    res.status(201).json({
      success: true,
      message: 'Team created successfully',
      data: team
    });
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Reset all teams (new tournament)
 */
const resetTeams = (req, res) => {
  try {
    resetAllTeams();
    
    res.json({
      success: true,
      message: 'All teams have been reset'
    });
  } catch (error) {
    console.error('Error resetting teams:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get team statistics
 */
const getStats = (req, res) => {
  try {
    const teams = getAllTeams();
    const stats = getStatsSummary(teams);
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export {
  getTeams,
  getLeaderboardData,
  getTeam,
  addTeam,
  resetTeams,
  getStats
};

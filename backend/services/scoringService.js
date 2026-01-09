/**
 * Scoring Service
 * Handles all point calculations based on BGMI rules
 */

import { PLACEMENT_POINTS, KILL_POINTS_PER_KILL } from '../config/constants.js';

/**
 * Calculate placement points based on final position
 * @param {number} placement - Final position (1-16)
 * @returns {number} Placement points
 */
const calculatePlacementPoints = (placement) => {
  // Validate placement
  if (placement < 1 || placement > 16) {
    throw new Error('Placement must be between 1 and 16');
  }
  
  return PLACEMENT_POINTS[placement] || 0;
};

/**
 * Calculate kill points
 * @param {number} kills - Number of kills
 * @returns {number} Kill points
 */
const calculateKillPoints = (kills) => {
  // Validate kills
  if (kills < 0) {
    throw new Error('Kills cannot be negative');
  }
  
  return kills * KILL_POINTS_PER_KILL;
};

/**
 * Calculate total match points
 * @param {number} placement - Final position
 * @param {number} kills - Number of kills
 * @returns {object} { placementPoints, killPoints, totalPoints }
 */
const calculateMatchPoints = (placement, kills) => {
  const placementPoints = calculatePlacementPoints(placement);
  const killPoints = calculateKillPoints(kills);
  const totalPoints = placementPoints + killPoints;
  
  return {
    placementPoints,
    killPoints,
    totalPoints
  };
};

/**
 * Validate match result data
 * @param {object} result - Match result object
 * @returns {boolean} True if valid
 */
const validateMatchResult = (result) => {
  const { teamName, kills, placement } = result;
  
  // Check required fields
  if (!teamName || teamName.trim() === '') {
    throw new Error('Team name is required');
  }
  
  if (typeof kills !== 'number' || kills < 0) {
    throw new Error('Kills must be a non-negative number');
  }
  
  if (typeof placement !== 'number' || placement < 1 || placement > 16) {
    throw new Error('Placement must be between 1 and 16');
  }
  
  return true;
};

/**
 * Validate multiple match results (check for duplicate placements)
 * @param {array} results - Array of match results
 * @returns {boolean} True if valid
 */
const validateMatchResults = (results) => {
  if (!Array.isArray(results) || results.length === 0) {
    throw new Error('Match results must be a non-empty array');
  }
  
  // Check each result
  results.forEach(result => validateMatchResult(result));
  
  // Check for duplicate placements
  const placements = results.map(r => r.placement);
  const uniquePlacements = new Set(placements);
  
  if (placements.length !== uniquePlacements.size) {
    throw new Error('Duplicate placements detected. Each team must have a unique placement.');
  }
  
  // Check for duplicate team names
  const teamNames = results.map(r => r.teamName.toLowerCase());
  const uniqueTeamNames = new Set(teamNames);
  
  if (teamNames.length !== uniqueTeamNames.size) {
    throw new Error('Duplicate team names detected. Each team can only appear once per match.');
  }
  
  return true;
};

export {
  calculatePlacementPoints,
  calculateKillPoints,
  calculateMatchPoints,
  validateMatchResult,
  validateMatchResults
};

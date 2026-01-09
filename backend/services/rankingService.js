/**
 * Ranking Service
 * Handles leaderboard sorting and qualification logic
 */

import { DEFAULT_QUALIFICATION_LIMIT } from '../config/constants.js';

/**
 * Sort teams for leaderboard
 * Priority: Total Points > First Place Finishes > Placement Points > Kill Points
 * @param {array} teams - Array of team objects
 * @returns {array} Sorted teams with rank
 */
const sortTeams = (teams) => {
  // Create a copy to avoid mutating original
  const sortedTeams = [...teams].sort((a, b) => {
    // 1. Higher Total Points
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    
    // 2. Higher First Place Finishes
    if (b.firstPlaceFinishes !== a.firstPlaceFinishes) {
      return b.firstPlaceFinishes - a.firstPlaceFinishes;
    }
    
    // 3. Higher Total Placement Points
    if (b.totalPlacementPoints !== a.totalPlacementPoints) {
      return b.totalPlacementPoints - a.totalPlacementPoints;
    }
    
    // 4. Higher Total Kill Points
    if (b.totalKillPoints !== a.totalKillPoints) {
      return b.totalKillPoints - a.totalKillPoints;
    }
    
    // If all are equal, maintain original order
    return 0;
  });
  
  // Add rank to each team
  sortedTeams.forEach((team, index) => {
    team.rank = index + 1;
  });
  
  return sortedTeams;
};

/**
 * Get leaderboard with ranking
 * @param {array} teams - Array of team objects
 * @returns {array} Ranked leaderboard
 */
const getLeaderboard = (teams) => {
  return sortTeams(teams);
};

/**
 * Update qualification status based on ranking
 * @param {array} teams - Array of team objects
 * @param {number} qualificationLimit - Number of teams to qualify
 * @returns {object} { qualified, eliminated }
 */
const updateQualification = (teams, qualificationLimit = DEFAULT_QUALIFICATION_LIMIT) => {
  const rankedTeams = sortTeams(teams);
  
  const qualified = rankedTeams.slice(0, qualificationLimit);
  const eliminated = rankedTeams.slice(qualificationLimit);
  
  return {
    qualified: qualified.map(t => ({ id: t.id, name: t.name, rank: t.rank })),
    eliminated: eliminated.map(t => ({ id: t.id, name: t.name, rank: t.rank })),
    qualificationLimit
  };
};

/**
 * Get top N teams
 * @param {array} teams - Array of team objects
 * @param {number} count - Number of top teams to return
 * @returns {array} Top teams
 */
const getTopTeams = (teams, count) => {
  const rankedTeams = sortTeams(teams);
  return rankedTeams.slice(0, count);
};

/**
 * Get team statistics summary
 * @param {array} teams - Array of team objects
 * @returns {object} Statistics summary
 */
const getStatsSummary = (teams) => {
  const totalTeams = teams.length;
  const totalMatches = teams.length > 0 ? Math.max(...teams.map(t => t.matchesPlayed)) : 0;
  const totalKills = teams.reduce((sum, t) => sum + t.totalKills, 0);
  const avgPointsPerTeam = totalTeams > 0 ? teams.reduce((sum, t) => sum + t.totalPoints, 0) / totalTeams : 0;
  
  return {
    totalTeams,
    totalMatches,
    totalKills,
    avgPointsPerTeam: Math.round(avgPointsPerTeam * 100) / 100
  };
};

export {
  sortTeams,
  getLeaderboard,
  updateQualification,
  getTopTeams,
  getStatsSummary
};

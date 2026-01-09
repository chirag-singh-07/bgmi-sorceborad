/**
 * Team Data Model - In-Memory Storage
 * Manages team data and cumulative statistics
 */

// In-memory team storage
let teams = [];
let teamIdCounter = 1;

/**
 * Team Data Structure:
 * {
 *   id: number,
 *   name: string,
 *   matchesPlayed: number,
 *   totalKills: number,
 *   totalPlacementPoints: number,
 *   totalKillPoints: number,
 *   totalPoints: number,
 *   firstPlaceFinishes: number,
 *   qualificationStatus: 'QUALIFIED' | 'ELIMINATED' | 'PENDING'
 * }
 */

// Get all teams
const getAllTeams = () => {
  return teams;
};

// Get team by ID
const getTeamById = (id) => {
  return teams.find(team => team.id === id);
};

// Get team by name (case-insensitive)
const getTeamByName = (name) => {
  return teams.find(team => team.name.toLowerCase() === name.toLowerCase());
};

// Create a new team
const createTeam = (name) => {
  const existingTeam = getTeamByName(name);
  if (existingTeam) {
    return existingTeam;
  }

  const newTeam = {
    id: teamIdCounter++,
    name: name.trim(),
    matchesPlayed: 0,
    totalKills: 0,
    totalPlacementPoints: 0,
    totalKillPoints: 0,
    totalPoints: 0,
    firstPlaceFinishes: 0,
    qualificationStatus: 'PENDING'
  };

  teams.push(newTeam);
  return newTeam;
};

// Update team statistics after a match
const updateTeamStats = (teamName, kills, placementPoints, killPoints, placement) => {
  let team = getTeamByName(teamName);
  
  // If team doesn't exist, create it
  if (!team) {
    team = createTeam(teamName);
  }

  // Update cumulative stats
  team.matchesPlayed += 1;
  team.totalKills += kills;
  team.totalPlacementPoints += placementPoints;
  team.totalKillPoints += killPoints;
  team.totalPoints += (placementPoints + killPoints);
  
  // Track first place finishes
  if (placement === 1) {
    team.firstPlaceFinishes += 1;
  }

  return team;
};

// Update qualification status for all teams
const updateQualificationStatus = (qualifiedTeamIds, eliminatedTeamIds) => {
  teams.forEach(team => {
    if (qualifiedTeamIds.includes(team.id)) {
      team.qualificationStatus = 'QUALIFIED';
    } else if (eliminatedTeamIds.includes(team.id)) {
      team.qualificationStatus = 'ELIMINATED';
    } else {
      team.qualificationStatus = 'PENDING';
    }
  });
};

// Reset all teams (for new tournament)
const resetAllTeams = () => {
  teams = [];
  teamIdCounter = 1;
};

// Get team count
const getTeamCount = () => {
  return teams.length;
};

export {
  getAllTeams,
  getTeamById,
  getTeamByName,
  createTeam,
  updateTeamStats,
  updateQualificationStatus,
  resetAllTeams,
  getTeamCount
};

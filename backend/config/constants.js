/**
 * BGMI Esports Scoreboard - Constants & Configuration
 * Contains all scoring rules, match states, and system constants
 */

// Match States
const MATCH_STATES = {
  UPCOMING: 'UPCOMING',
  LIVE: 'LIVE',
  UPDATING: 'UPDATING',
  COMPLETED: 'COMPLETED'
};

// Placement Points Rules (EXACT as per requirements)
const PLACEMENT_POINTS = {
  1: 10,
  2: 6,
  3: 5,
  4: 4,
  5: 3,
  6: 2,
  7: 1,
  8: 1,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
  13: 0,
  14: 0,
  15: 0,
  16: 0
};

// Kill Points Rule
const KILL_POINTS_PER_KILL = 1;

// Default Qualification Settings
const DEFAULT_QUALIFICATION_LIMIT = 8;

// Server Configuration
const SERVER_CONFIG = {
  PORT: process.env.PORT || 5000,
  HOST: '0.0.0.0' // Listen on all network interfaces for LAN access
};

// Export Directory
const EXPORT_DIR = './exports';

export {
  MATCH_STATES,
  PLACEMENT_POINTS,
  KILL_POINTS_PER_KILL,
  DEFAULT_QUALIFICATION_LIMIT,
  SERVER_CONFIG,
  EXPORT_DIR
};

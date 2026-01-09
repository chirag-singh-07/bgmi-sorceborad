/**
 * Match State Model - In-Memory Storage
 * Manages current match state and match history
 */

import { MATCH_STATES } from '../config/constants.js';

// Current match state
let currentMatch = {
  state: MATCH_STATES.UPCOMING,
  matchNumber: 0,
  startTime: null,
  endTime: null
};

// Match history (for undo functionality)
let matchHistory = [];

// Get current match state
const getCurrentMatchState = () => {
  return currentMatch;
};

// Set match state
const setMatchState = (state) => {
  if (!Object.values(MATCH_STATES).includes(state)) {
    throw new Error(`Invalid match state: ${state}`);
  }
  
  currentMatch.state = state;
  
  // Track timestamps
  if (state === MATCH_STATES.LIVE) {
    currentMatch.startTime = new Date().toISOString();
  } else if (state === MATCH_STATES.COMPLETED) {
    currentMatch.endTime = new Date().toISOString();
  }
  
  return currentMatch;
};

// Start a new match
const startNewMatch = () => {
  currentMatch = {
    state: MATCH_STATES.LIVE,
    matchNumber: currentMatch.matchNumber + 1,
    startTime: new Date().toISOString(),
    endTime: null
  };
  
  return currentMatch;
};

// Complete current match
const completeMatch = () => {
  currentMatch.state = MATCH_STATES.COMPLETED;
  currentMatch.endTime = new Date().toISOString();
  
  return currentMatch;
};

// Add match to history
const addToHistory = (matchData) => {
  matchHistory.push({
    matchNumber: currentMatch.matchNumber,
    timestamp: new Date().toISOString(),
    data: matchData
  });
};

// Get match history
const getMatchHistory = () => {
  return matchHistory;
};

// Get last match from history
const getLastMatch = () => {
  return matchHistory.length > 0 ? matchHistory[matchHistory.length - 1] : null;
};

// Remove last match from history (for undo)
const removeLastMatch = () => {
  return matchHistory.pop();
};

// Reset match state (for new tournament)
const resetMatchState = () => {
  currentMatch = {
    state: MATCH_STATES.UPCOMING,
    matchNumber: 0,
    startTime: null,
    endTime: null
  };
  matchHistory = [];
};

export {
  getCurrentMatchState,
  setMatchState,
  startNewMatch,
  completeMatch,
  addToHistory,
  getMatchHistory,
  getLastMatch,
  removeLastMatch,
  resetMatchState
};

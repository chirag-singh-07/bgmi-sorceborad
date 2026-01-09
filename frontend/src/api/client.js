import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const teamApi = {
  getAll: () => api.get('/teams'),
  getLeaderboard: () => api.get('/leaderboard'),
  getStats: () => api.get('/stats'),
};

export const matchApi = {
  getStatus: () => api.get('/match/status'),
  getHistory: () => api.get('/match/history'),
  
  // Admin methods
  startMatch: () => api.post('/admin/match/start'),
  submitResults: (results) => api.post('/admin/match/submit', { results }),
  updateStatus: (state) => api.post('/admin/match/status', { state }),
  undoLast: () => api.post('/admin/match/undo'),
};

export const exportApi = {
  getJson: () => api.get('/admin/export/json', { responseType: 'blob' }),
  getExcel: () => api.get('/admin/export/excel', { responseType: 'blob' }),
};

// Audio Control API
export const audioApi = {
  broadcast: (data) => api.post('/admin/audio', data)
};

export default {
  teams: teamApi,
  match: matchApi,
  export: exportApi,
  audio: audioApi
};

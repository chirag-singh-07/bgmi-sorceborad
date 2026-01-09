/**
 * BGMI Esports Live Scoreboard - Backend Server
 * Production-ready backend for college tournament
 * 
 * Author: Chirag Singh
 * Description: Real-time scoreboard with Socket.IO, REST API, and Excel/JSON export
 */

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import configuration
import { SERVER_CONFIG } from './config/constants.js';

// Import routes
import apiRoutes from './routes/api.js';

// Import socket handler
import { initializeSocket } from './sockets/socketHandler.js';

// ============================================
// SERVER SETUP
// ============================================

const app = express();
const server = createServer(app);

// Socket.IO setup with CORS for LAN access
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for LAN access
    methods: ['GET', 'POST']
  }
});

// ============================================
// MIDDLEWARE
// ============================================

// Enable CORS for all routes
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// Static files (for exports)
app.use('/exports', express.static(path.join(__dirname, 'exports')));

// ============================================
// API ROUTES
// ============================================

app.use('/api', apiRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'BGMI Esports Scoreboard API',
    version: '1.0.0',
    author: 'Chirag Singh',
    endpoints: {
      health: '/api/health',
      teams: '/api/teams',
      leaderboard: '/api/leaderboard',
      matchStatus: '/api/match/status',
      adminSubmit: '/api/admin/match/submit',
      exportJson: '/api/admin/export/json',
      exportExcel: '/api/admin/export/excel'
    },
    socketEvents: {
      client: ['initialData', 'currentState', 'leaderboardUpdate', 'matchStatusUpdate', 'qualificationUpdate', 'matchSubmitted'],
      server: ['requestCurrentState']
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// ============================================
// SOCKET.IO INITIALIZATION
// ============================================

initializeSocket(io);

// ============================================
// START SERVER
// ============================================

server.listen(SERVER_CONFIG.PORT, SERVER_CONFIG.HOST, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🎮 BGMI ESPORTS SCOREBOARD - BACKEND SERVER');
  console.log('='.repeat(60));
  console.log(`✅ Server running on: http://localhost:${SERVER_CONFIG.PORT}`);
  console.log(`🌐 Network access: http://<YOUR_IP>:${SERVER_CONFIG.PORT}`);
  console.log(`🔌 Socket.IO ready for real-time updates`);
  console.log('='.repeat(60));
  console.log('\n📋 Available Endpoints:');
  console.log(`   - Health Check: http://localhost:${SERVER_CONFIG.PORT}/api/health`);
  console.log(`   - Leaderboard: http://localhost:${SERVER_CONFIG.PORT}/api/leaderboard`);
  console.log(`   - Match Status: http://localhost:${SERVER_CONFIG.PORT}/api/match/status`);
  console.log(`   - Submit Match: POST http://localhost:${SERVER_CONFIG.PORT}/api/admin/match/submit`);
  console.log(`   - Export JSON: http://localhost:${SERVER_CONFIG.PORT}/api/admin/export/json`);
  console.log(`   - Export Excel: http://localhost:${SERVER_CONFIG.PORT}/api/admin/export/excel`);
  console.log('\n🔥 Server is ready for tournament!\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n⚠️  SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n⚠️  SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

export { app, server, io };

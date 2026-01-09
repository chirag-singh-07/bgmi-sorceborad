import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SocketProvider } from './contexts/SocketContext';
import Admin from './pages/Admin';
import Scoreboard from './pages/Scoreboard';

function App() {
  return (
    <SocketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/scoreboard" replace />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
        </Routes>
      </Router>
    </SocketProvider>
  );
}

export default App;

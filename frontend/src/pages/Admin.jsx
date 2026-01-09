import React, { useState, useEffect } from 'react';
import { useSocket } from '../contexts/SocketContext';
import { matchApi, teamApi } from '../api/client';
import MatchControl from '../components/admin/MatchControl';
import ResultForm from '../components/admin/ResultForm';
import ExportPanel from '../components/admin/ExportPanel';
import { Trophy, Activity, Layout, Music, Volume2, VolumeX } from 'lucide-react';
import { cn } from '../utils';

const Admin = () => {
  const { socket, connected } = useSocket();
  const [matchState, setMatchState] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [audioLoading, setAudioLoading] = useState(false);

  const handleAudioAction = async (action, volume = 0.5) => {
    try {
      setAudioLoading(true);
      const { audio } = await import('../api/client');
      await audio.broadcast({ action, volume });
    } catch (error) {
      alert('Audio broadcast failed: ' + error.message);
    } finally {
      setAudioLoading(false);
    }
  };

  useEffect(() => {
// ... existing useEffect ...
    const fetchInitialData = async () => {
      try {
        const [statusRes, leaderboardRes] = await Promise.all([
          matchApi.getStatus(),
          teamApi.getLeaderboard()
        ]);
        setMatchState(statusRes.data.data);
        setLeaderboard(leaderboardRes.data.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();

    if (socket) {
      socket.on('initialData', (data) => {
        setMatchState(data.matchState);
        setLeaderboard(data.leaderboard);
      });

      socket.on('matchStatusUpdate', (data) => {
        setMatchState(data.matchState);
      });

      socket.on('leaderboardUpdate', (data) => {
        setLeaderboard(data.leaderboard);
      });
    }

    return () => {
      if (socket) {
        socket.off('initialData');
        socket.off('matchStatusUpdate');
        socket.off('leaderboardUpdate');
      }
    };
  }, [socket]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="flex flex-col items-center gap-4">
             <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
             <div className="text-gold font-teko text-xl tracking-widest animate-pulse">ESTABLISHING UPLINK...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans text-gray-100 selection:bg-gold selection:text-black overflow-x-hidden">
       {/* Global Environment Effects */}
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-40 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-scanlines opacity-10 pointer-events-none z-50 transition-opacity duration-300" />
      <div className="fixed top-0 left-0 w-full h-32 bg-linear-to-b from-black/80 to-transparent z-0" />

      <div className="relative z-10 max-w-[1800px] mx-auto px-6 py-8">
        {/* Command Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-white/10 pb-6 relative">
           <div className="absolute bottom-[-1px] left-0 w-32 h-[3px] bg-gold shadow-[0_0_15px_#eab308]" />
           
          <div>
            <div className="flex items-center gap-3 mb-1">
                <span className="text-[10px] font-black bg-white/10 px-2 py-0.5 rounded-sm text-gold tracking-widest uppercase border border-white/5">
                    Authorized Personnel Only
                </span>
                <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
                    System Online
                </span>
            </div>
            <h1 className="text-7xl font-teko font-bold flex items-center gap-4 leading-[0.8] uppercase text-white tracking-tight">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-gold via-white to-gold">Mission Control</span>
            </h1>
            <p className="text-gray-400 font-bold tracking-[0.3em] uppercase text-xs mt-2 pl-1">
              ROYAL-DROP BGMI CHAMPIONSHIP • OPERATOR TERMINAL
            </p>
          </div>
          
          <div className="flex items-center gap-4">
               <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Connection Status</span>
                    <div className={cn(
                        "text-xl font-teko font-bold uppercase flex items-center gap-2",
                        connected ? "text-success drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "text-danger"
                    )}>
                        {connected ? "SECURE UPLINK ESTABLISHED" : "CONNECTION SEVERED"}
                         <div className={cn("w-2 h-2 rounded-full", connected ? "bg-success animate-ping" : "bg-danger")} />
                    </div>
               </div>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* LEFT COLUMN: CRITICAL CONTROLS (Match & Audio) */}
          <div className="xl:col-span-3 space-y-8">
            <section className="custom-card p-1 clip-angled-sm group">
              <div className="bg-black/40 p-6 backdrop-blur-sm h-full">
                  <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                      <h2 className="text-3xl font-teko font-bold flex items-center gap-3 uppercase tracking-wide text-white group-hover:text-gold transition-colors">
                        <Activity className="w-6 h-6" />
                        Match Protocol
                      </h2>
                      <div className="px-2 py-0.5 bg-gold/10 text-gold text-[10px] font-black tracking-widest border border-gold/20">CTRL-01</div>
                  </div>
                  <MatchControl matchState={matchState} />
              </div>
            </section>

             <section className="custom-card p-1 clip-angled-sm group">
              <div className="bg-black/40 p-6 backdrop-blur-sm h-full">
                 <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                    <h2 className="text-3xl font-teko font-bold flex items-center gap-3 uppercase tracking-wide text-white group-hover:text-gold transition-colors">
                      <Music className="w-6 h-6" />
                      Audio Broadcast
                    </h2>
                     <div className="px-2 py-0.5 bg-gold/10 text-gold text-[10px] font-black tracking-widest border border-gold/20">AUDIO-FX</div>
                 </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleAudioAction('PLAY')}
                    disabled={audioLoading}
                    className="flex items-center justify-center gap-2 py-4 bg-success/10 border border-success/30 text-success font-black uppercase text-sm tracking-widest hover:bg-success/20 transition-all clip-angled-sm disabled:opacity-50 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                  >
                    <Volume2 size={18} />
                    PLAY LOOP
                  </button>
                  <button
                    onClick={() => handleAudioAction('STOP')}
                    disabled={audioLoading}
                    className="flex items-center justify-center gap-2 py-4 bg-danger/10 border border-danger/30 text-danger font-black uppercase text-sm tracking-widest hover:bg-danger/20 transition-all clip-angled-sm disabled:opacity-50 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                  >
                    <VolumeX size={18} />
                    SILENCE
                  </button>
                  
                  <div className="col-span-2 pt-4 px-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Master Volume</span>
                      <span className="text-[10px] text-gold font-black">50%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.1" 
                      defaultValue="0.5"
                      onChange={(e) => handleAudioAction('VOLUME', parseFloat(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold hover:accent-white transition-colors"
                    />
                  </div>
                </div>
              </div>
            </section>
            
             <section className="custom-card p-1 clip-angled-sm group">
              <div className="bg-black/40 p-6 backdrop-blur-sm h-full">
                  <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                    <h2 className="text-3xl font-teko font-bold flex items-center gap-3 uppercase tracking-wide text-white group-hover:text-gold transition-colors">
                      <Trophy className="w-6 h-6" />
                      Data Extraction
                    </h2>
                     <div className="px-2 py-0.5 bg-gold/10 text-gold text-[10px] font-black tracking-widest border border-gold/20">EXP-03</div>
                 </div>
                 <ExportPanel />
              </div>
            </section>
          </div>

          {/* CENTER/RIGHT: DATA ENTRY & MONITORING */}
          <div className="xl:col-span-9 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section className="lg:col-span-2 custom-card p-1 clip-angled-sm">
               <div className="bg-black/40 p-8 backdrop-blur-sm h-full relative">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                      <Layout size={100} className="text-white" />
                  </div>
                  <div className="flex items-center justify-between mb-8">
                      <div>
                          <h2 className="text-4xl font-teko font-bold uppercase tracking-wide text-white">Result Submission Terminal</h2>
                          <p className="text-xs font-bold text-gray-500 tracking-[0.2em] uppercase">Manual Data Entry / Live Override</p>
                      </div>
                      {matchState?.state === 'COMPLETED' && (
                          <div className="bg-success/20 text-success border border-success/50 px-4 py-2 text-xs font-black uppercase flex items-center gap-3 tracking-widest shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                              Ready For Ingestion
                          </div>
                      )}
                  </div>
                  <ResultForm matchState={matchState} />
               </div>
            </section>

            <section className="lg:col-span-2 custom-card p-1 clip-angled-sm">
                <div className="bg-black/40 p-8 backdrop-blur-sm h-full min-h-[400px]">
                    <h2 className="text-3xl font-teko font-bold mb-6 uppercase tracking-wide flex items-center justify-between border-b border-white/10 pb-4">
                        <span className="flex items-center gap-3"><Activity className="text-gold" /> Live Telemetry Preview</span>
                        <span className="text-[10px] text-gray-500 font-sans font-bold italic tracking-wider">Sync: REALTIME</span>
                    </h2>
                     <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-gray-500 border-b border-white/5 font-bold uppercase text-[10px] tracking-[0.2em]">
                            <th className="pb-4 pr-4">Rank</th>
                            <th className="pb-4 px-4">Team Designation</th>
                            <th className="pb-4 px-4 text-center">Wins</th>
                            <th className="pb-4 px-4 text-center">Elims</th>
                            <th className="pb-4 px-6 text-right">Agg. Points</th>
                          </tr>
                        </thead>
                        <tbody className="font-teko">
                          {leaderboard.slice(0, 10).map((team) => (
                            <tr key={team.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                              <td className="py-3 pr-4 font-black italic text-xl text-slate-500 group-hover:text-white">#{team.rank}</td>
                              <td className="py-3 px-4 text-xl uppercase tracking-tight text-gray-300 group-hover:text-gold transition-colors font-bold">{team.name}</td>
                              <td className="py-3 px-4 text-center text-lg text-gray-500">{team.firstPlaceFinishes}</td>
                              <td className="py-3 px-4 text-center text-lg text-gray-500">{team.totalKills}</td>
                              <td className="py-3 px-6 text-right font-black text-2xl text-white group-hover:text-gold drop-shadow-sm">{team.totalPoints}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {leaderboard.length === 0 && (
                        <div className="text-center py-24 text-gray-600 italic font-bold tracking-widest text-xs uppercase border border-dashed border-white/10 rounded-sm">
                            <div className="mb-2 opacity-50"><Activity size={30} className="mx-auto" /></div>
                            No active telemetry data found.
                        </div>
                      )}
                    </div>
                </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

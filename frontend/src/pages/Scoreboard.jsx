import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../contexts/SocketContext';
import { matchApi, teamApi } from '../api/client';
import LeaderboardTable from '../components/scoreboard/LeaderboardTable';
import MatchStatus from '../components/scoreboard/MatchStatus';
import LoadingScreen from '../components/scoreboard/LoadingScreen';
import SplashScreen from '../components/scoreboard/SplashScreen';
import { cn } from '../utils';

const Scoreboard = () => {
  const { socket, connected } = useSocket();
  const [matchState, setMatchState] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Audio Refs
  const audioRef = useRef(null);
  const [audioState, setAudioState] = useState({ playing: false, volume: 0.5 });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [statusRes, leaderboardRes] = await Promise.all([
          matchApi.getStatus(),
          teamApi.getLeaderboard()
        ]);
        setMatchState(statusRes.data.data);
        setLeaderboard(leaderboardRes.data.data);
      } catch (error) {
        console.error('Error fetching scoreboard data:', error);
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
      
      socket.on('audioAction', (data) => {
        const { action, volume } = data;
        if (audioRef.current) {
          if (action === 'PLAY') {
            audioRef.current.play().catch(e => console.log("Audio play blocked by browser. User interaction required."));
            setAudioState(prev => ({ ...prev, playing: true }));
          } else if (action === 'STOP') {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setAudioState(prev => ({ ...prev, playing: false }));
          } else if (action === 'VOLUME') {
            audioRef.current.volume = volume;
            setAudioState(prev => ({ ...prev, volume }));
          }
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('initialData');
        socket.off('matchStatusUpdate');
        socket.off('leaderboardUpdate');
        socket.off('audioAction');
      }
    };
  }, [socket]);

  if (loading) return <LoadingScreen message="Initializing Tournament View..." />;

  // Display states mapping
  // No Match Data / Fresh Tournament -> SplashScreen
  // LIVE -> MatchStatus (Upcoming/Live Screen)
  // UPDATING -> LoadingScreen
  // COMPLETED/UPCOMING -> LeaderboardTable

  const isFreshTournament = !matchState || (matchState.matchNumber === 0 && leaderboard.length === 0);
  
  if (isFreshTournament) return (
    <div className="min-h-screen bg-background flex flex-col uppercase">
       <audio ref={audioRef} loop src="/assets/ambient_loop.mp3" />
       <SplashScreen />
    </div>
  );

  const isUpdating = matchState.state === 'UPDATING';
  const isMatchActive = matchState.state === 'LIVE';

  return (
    <div className="min-h-screen bg-background relative flex flex-col font-condensed overflow-hidden uppercase">
      {/* Background Audio (Hidden) */}
      <audio ref={audioRef} loop src="/assets/ambient_loop.mp3" />

      {/* Texture Overlays */}
      <div className="absolute inset-0 bg-esports-noise opacity-[0.03] pointer-events-none z-50" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gold/5 blur-[120px] -z-10 rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-danger/5 blur-[100px] -z-10 rounded-full" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col max-w-[1900px] mx-auto w-full px-8 py-6 z-10">
        {isUpdating ? (
          <LoadingScreen message="UPDATING TOURNAMENT STANDINGS..." />
        ) : isMatchActive ? (
          <MatchStatus matchState={matchState} />
        ) : (
          <div className="flex flex-col h-full space-y-6">
            {/* Broadcast Overlay Header */}
            <div className="flex items-end justify-between border-b-2 border-gold/50 pb-4 relative z-20">
              <div className="absolute -bottom-[2px] left-0 w-64 h-[2px] bg-white shadow-[0_0_20px_white]" />
              <div className="flex items-center gap-6">
                 {/* Event Logo Placeholder */}
                 <div className="w-24 h-24 bg-black border border-gold/30 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gold/10 animate-pulse"></div>
                    <span className="text-5xl font-teko font-black text-gold z-10">SSR</span>
                 </div>
                 
                 <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="bg-danger text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-widest animate-pulse">
                            LIVE BROADCAST
                        </span>
                        <span className="text-xs font-black text-gold uppercase tracking-[0.2em]">
                            OFFICIAL FEED
                        </span>
                    </div>
                    <h1 className="text-8xl font-teko font-bold tracking-tighter text-white uppercase leading-[0.8]">
                      ROYAL-DROP <span className="text-transparent bg-clip-text bg-linear-to-r from-gold to-white">CHAMPIONSHIP</span>
                    </h1>
                    <div className="flex items-center gap-3 mt-1 px-1">
                      <p className="text-lg font-bold tracking-[0.4em] text-gray-400 uppercase">
                        SSR COLLEGE OF ACS PRESENT
                      </p>
                    </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-2 flex justify-end gap-2 items-center">
                    <span className={cn("w-2 h-2 rounded-full", connected ? "bg-success shadow-[0_0_10px_#22c55e]" : "bg-danger")}></span>
                    {connected ? "DATA STREAM ACTIVE" : "SIGNAL LOST"}
                </div>
                <div className="bg-gunmetal px-10 py-2 border-r-4 border-gold clip-angled-sm relative overflow-hidden">
                   <div className="absolute inset-0 bg-linear-to-l from-gold/10 to-transparent pointer-events-none" />
                   <div className="text-5xl font-teko font-black leading-none text-white drop-shadow-md">
                        MATCH <span className="text-gold">#{matchState.matchNumber}</span>
                   </div>
                </div>
              </div>
            </div>

            <div className="flex-1 min-h-0 relative z-10">
               {/* Decorative Side Elements */}
               <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-1 h-32 bg-white/10 rounded-full"></div>
               <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-1 h-32 bg-white/10 rounded-full"></div>
               
              <LeaderboardTable leaderboard={leaderboard} />
            </div>

            {/* TV Ticker Footer */}
            <div className="relative h-12 bg-black/80 border-t-2 border-gold/30 flex items-center overflow-hidden shrink-0 z-20">
                <div className="h-full bg-gold px-6 flex items-center justify-center z-20 relative">
                    <span className="text-black font-black font-teko text-xl tracking-widest uppercase">BREAKING NEWS</span>
                    <div className="absolute right-[-12px] top-0 bottom-0 w-0 h-0 border-l-[12px] border-l-gold border-y-[24px] border-y-transparent"></div>
                </div>
                
                <div className="absolute inset-0 flex items-center">
                    <marquee className="text-white font-teko text-2xl tracking-[0.1em] font-bold uppercase translate-y-0.5">
                        <span className="mx-8 text-gold">•</span> TOURNAMENT LEADERBOARD UPDATED LIVE
                        <span className="mx-8 text-gold">•</span> QUALIFICATION CUTOFF: TOP 12 TEAMS
                        <span className="mx-8 text-gold">•</span> NEXT MATCH STARTING SOON ON ERANGEL
                        <span className="mx-8 text-gold">•</span> STAY TUNED FOR FINAL CEREMONY
                        <span className="mx-8 text-gold">•</span> DOMINATE THE BATTLEGROUNDS
                        <span className="mx-8 text-gold">•</span> PRESENTED BY SSR COLLEGE OF ACS
                    </marquee>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scoreboard;

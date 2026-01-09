import React, { useState } from 'react';
import { matchApi } from '../../api/client';
import { Play, Square, RotateCcw, AlertTriangle } from 'lucide-react';
import { cn } from '../../utils';

const MatchControl = ({ matchState }) => {
  const [loading, setLoading] = useState(false);

  const handleStartMatch = async () => {
    try {
      setLoading(true);
      await matchApi.startMatch();
    } catch (error) {
      alert('Failed to start match: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleEndMatch = async () => {
    try {
      setLoading(true);
      await matchApi.updateStatus('COMPLETED');
    } catch (error) {
      alert('Failed to end match: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleResetTournament = async () => {
    if (window.confirm('CRITICAL: This will wipe ALL tournament data. Are you absolutely sure?')) {
      try {
        setLoading(true);
        await matchApi.updateStatus('UPCOMING'); // Resetting to upcoming might be part of tournament reset
        // The backend has a specific resetTournament endpoint usually
        const api = await import('../../api/client');
        await api.default.post('/admin/tournament/reset');
      } catch (error) {
        alert('Failed to reset: ' + (error.response?.data?.error || error.message));
      } finally {
        setLoading(false);
      }
    }
  };

  if (!matchState) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Current Phase</span>
        <span className={cn(
          "px-4 py-1 rounded-sm text-xs font-black uppercase tracking-widest border",
          matchState.state === 'LIVE' ? 'bg-danger/10 text-danger border-danger/50 animate-pulse' :
          matchState.state === 'COMPLETED' ? 'bg-success/10 text-success border-success/50' :
          'bg-gray-800 text-gray-400 border-white/10'
        )}>
          {matchState.state}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {matchState.state !== 'LIVE' ? (
          <button
            onClick={handleStartMatch}
            disabled={loading}
            className="group relative w-full h-24 bg-gold hover:bg-gold-light disabled:opacity-50 transition-all duration-300 clip-angled-sm shadow-[0_0_20px_rgba(234,179,8,0.1)] active:scale-[0.98]"
          >
             <div className="absolute inset-0 bg-linear-to-b from-white/20 to-transparent pointer-events-none" />
             <div className="flex flex-col items-center justify-center gap-1">
                 <div className="flex items-center gap-3 text-black">
                    <Play size={28} fill="currentColor" strokeWidth={3} />
                    <span className="font-black text-2xl tracking-tighter uppercase relative z-10">INITIATE MATCH</span>
                 </div>
                 <span className="text-[10px] font-bold text-black/60 uppercase tracking-[0.3em] font-sans">Sequence #{matchState.matchNumber + 1}</span>
             </div>
             {/* Tech Corners */}
             <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-black/30" />
             <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-black/30" />
          </button>
        ) : (
          <button
            onClick={handleEndMatch}
            disabled={loading}
            className="group relative w-full h-24 bg-danger hover:bg-danger/90 disabled:opacity-50 transition-all duration-300 clip-angled-sm shadow-[0_0_20px_rgba(239,68,68,0.2)] active:scale-[0.98]"
          >
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
             <div className="flex flex-col items-center justify-center gap-1">
                 <div className="flex items-center gap-3 text-white">
                    <Square size={24} fill="currentColor" />
                    <span className="font-black text-2xl tracking-tighter uppercase relative z-10">TERMINATE MATCH</span>
                 </div>
                  <span className="text-[10px] font-bold text-white/60 uppercase tracking-[0.3em] font-sans">Active Sequence</span>
             </div>
             <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-white animate-ping" />
          </button>
        )}

        <button
          onClick={handleResetTournament}
          disabled={loading}
          className="group w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-danger text-[10px] font-bold py-3 uppercase tracking-[0.2em] border border-white/5 hover:border-danger/30 transition-all"
        >
          <RotateCcw size={12} className="group-hover:-rotate-180 transition-transform duration-500" />
          System Reset (Data Wipe)
        </button>
      </div>

      {matchState.state === 'LIVE' && (
        <div className="p-4 bg-gunmetal border-l-2 border-gold flex gap-4 text-gold/80 text-[10px] font-bold uppercase tracking-wide leading-relaxed relative overflow-hidden">
           <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none" />
           <AlertTriangle size={24} className="shrink-0 animate-pulse text-gold" />
           <p className="z-10">Live Broadcasting Active. Score updates are locked until match termination protocol is executed.</p>
        </div>
      )}
    </div>
  );
};

export default MatchControl;

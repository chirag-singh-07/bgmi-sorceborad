import React from 'react';
import { cn } from '../../utils';

const LeaderboardTable = ({ leaderboard }) => {
  if (!leaderboard || leaderboard.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50 relative">
        <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none"></div>
        <div className="w-20 h-20 border-4 border-gray-700 rounded-full animate-pulse border-t-gold"></div>
        <p className="text-3xl font-bold tracking-[0.3em] text-gray-500 font-teko">WAITING FOR TOURNAMENT DATA...</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto custom-scrollbar relative px-6 py-4">
       {/* Background Grid Lines */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
       
      <table className="w-full border-separate border-spacing-y-4 relative z-10">
        <thead className="sticky top-0 z-20">
          <tr>
            <th colSpan="7" className="pb-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2 bg-gunmetal/90 backdrop-blur-md px-4 clip-angled-sm">
                    <div className="flex gap-8 text-[10px] font-black tracking-[0.2em] text-gold uppercase">
                        <span>RANK</span>
                        <span>TEAM</span>
                    </div>
                    <div className="flex gap-12 text-[10px] font-black tracking-[0.2em] text-gold uppercase text-right">
                        <span className="w-16 text-center">MATCHES</span>
                        <span className="w-16 text-center">WWCD</span>
                        <span className="w-16 text-center">PLACE PTS</span>
                        <span className="w-16 text-center">ELIMS</span>
                        <span className="w-20 text-right">TOTAL</span>
                    </div>
                </div>
            </th>
          </tr>
        </thead>
        <tbody className="font-bold text-xl space-y-4">
          {leaderboard.map((team, index) => {
            const isTop3 = index < 3;
            const isQualified = team.qualificationStatus === 'QUALIFIED';
            const isEliminated = team.qualificationStatus === 'ELIMINATED';

            return (
              <tr 
                key={team.id} 
                className={cn(
                  "relative transition-all duration-300 group",
                  isTop3 ? "scale-[1.01]" : "",
                  isEliminated ? "opacity-40 grayscale" : "opacity-100"
                )}
              >
                {/* Row Content Wrapper with Clip Path */}
                <td colSpan="7" className="p-0">
                    <div className={cn(
                        "relative flex items-center h-20 bg-gunmetal/60 backdrop-blur-md clip-angled border-l-4 pr-8 transition-all hover:bg-gunmetal",
                        index === 0 ? "border-gold bg-linear-to-r from-gold/10 to-transparent" :
                        index === 1 ? "border-gray-300 bg-linear-to-r from-gray-300/10 to-transparent" :
                        index === 2 ? "border-orange-500 bg-linear-to-r from-orange-500/10 to-transparent" :
                        isQualified ? "border-success" : 
                        isEliminated ? "border-danger" : "border-gray-700"
                    )}>
                        {/* Rank Badge */}
                        <div className={cn(
                            "w-24 h-full flex items-center justify-center font-teko font-black text-4xl italic relative overflow-hidden",
                            index === 0 ? "rank-badge-1 text-black" :
                            index === 1 ? "rank-badge-2 text-black" :
                            index === 2 ? "rank-badge-3 text-black" : "text-gray-500 bg-black/20"
                        )}>
                            <span className="relative z-10">#{team.rank}</span>
                            {/* Shine Effect for Top 3 */}
                            {isTop3 && <div className="absolute inset-0 bg-white/20 animate-pulse"></div>}
                        </div>

                        {/* Team Name & Status */}
                        <div className="flex-1 px-8 flex flex-col justify-center">
                            <span className={cn(
                                "text-4xl font-teko uppercase tracking-tight leading-none truncate",
                                isTop3 ? "text-white drop-shadow-md" : "text-gray-300"
                            )}>
                                {team.name}
                            </span>
                            {isQualified && <span className="text-[9px] text-success uppercase font-black tracking-widest leading-none mt-1 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span>
                                FINALS QUALIFIED
                            </span>}
                        </div>

                        {/* Stats Columns */}
                        <div className="flex items-center gap-12 text-xl font-teko tracking-wide">
                            <span className="w-16 text-center text-gray-400">{team.matchesPlayed}</span>
                            <span className={cn("w-16 text-center", team.firstPlaceFinishes > 0 ? "text-gold" : "text-gray-500")}>
                                {team.firstPlaceFinishes}
                            </span>
                            <span className="w-16 text-center text-gray-400">{team.totalPlacementPoints}</span>
                            <span className="w-16 text-center text-white">{team.totalKills}</span>
                            <span className={cn(
                                "w-24 text-right text-5xl font-black tabular-nums",
                                index === 0 ? "text-gold drop-shadow-[0_0_10px_rgba(234,179,8,0.6)]" : "text-white"
                            )}>
                                {team.totalPoints}
                            </span>
                        </div>
                    </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;

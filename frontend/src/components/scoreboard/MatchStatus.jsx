import React from 'react';
import { Sword, MapPin, Radio, Users, Target, Zap, ShieldAlert } from 'lucide-react';

const MatchStatus = ({ matchState }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-10 py-10 relative">
      {/* Tactical Background Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          {/* Tactical Grid */}
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      </div>

      {/* Airdrop Animated Icon */}
      <div className="absolute top-10 right-10 animate-pulse opacity-20 hidden md:block">
        <div className="relative">
          <ShieldAlert size={120} className="text-gold" />
          <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-20 h-2 bg-gold/50 blur-md rounded-full shadow-[0_0_20px_#eab308]"></div>
        </div>
      </div>

      {/* Live Badge */}
      <div className="relative group scale-125 mb-6">
        <div className="absolute -inset-2 bg-danger rounded-sm blur-md opacity-30 group-hover:opacity-60 animate-pulse-live transition duration-1000"></div>
        <div className="relative flex items-center gap-6 bg-background border-y-2 border-danger/50 px-12 py-5 rounded-sm">
          <div className="w-4 h-4 rounded-full bg-danger animate-ping shadow-[0_0_15px_#ff3e3e]"></div>
          <span className="text-5xl font-teko font-black tracking-[0.3em] text-danger uppercase leading-none">
            ENGAGEMENT LIVE
          </span>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        <div className="flex items-center justify-center gap-6 mb-2">
            <div className="h-0.5 w-24 bg-linear-to-r from-transparent to-gold opacity-50"></div>
            <span className="text-xl font-bold tracking-[0.5em] text-gold uppercase animate-pulse">Tactical Phase</span>
            <div className="h-0.5 w-24 bg-linear-to-l from-transparent to-gold opacity-50"></div>
        </div>
        
        <div className="relative">
            <h2 className="text-[14rem] font-teko font-black tracking-tighter text-white uppercase leading-[0.7] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            MATCH <span className="text-gold italic drop-shadow-[0_0_20px_rgba(234,179,8,0.4)]">#{matchState.matchNumber}</span>
            </h2>
            <div className="absolute -top-10 -right-10 opacity-10">
                <Zap size={200} className="text-white rotate-12" />
            </div>
        </div>

        <div className="flex items-center justify-center gap-4 bg-black/60 py-3 px-10 rounded-sm border border-white/10 backdrop-blur-md">
            <Radio className="text-gold w-6 h-6 animate-pulse" />
            <p className="text-3xl font-teko tracking-[0.2em] text-gray-300 uppercase">
              Global Broadcaster Link: <span className="text-white">Active</span>
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl mt-8 relative z-10 scale-110">
        <div className="bg-gunmetal/40 backdrop-blur-xl p-12 border-l-4 border-gold shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-linear-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex flex-col items-center space-y-4">
            <div className="p-5 bg-gold/10 border border-gold/20 rounded-sm rotate-45 group-hover:bg-gold/20 transition-all">
                <MapPin size={40} className="text-gold -rotate-45" />
            </div>
            <div>
                <div className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Combat Zone</div>
                <div className="text-6xl font-teko font-black uppercase leading-none">ERANGEL</div>
            </div>
          </div>
        </div>

        <div className="bg-gunmetal/40 backdrop-blur-xl p-12 border-l-4 border-gray-600 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex flex-col items-center space-y-4">
            <div className="p-5 bg-white/5 border border-white/10 rounded-sm rotate-45 group-hover:bg-white/10 transition-all">
                <Users size={40} className="text-white -rotate-45" />
            </div>
            <div>
                <div className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Game Format</div>
                <div className="text-6xl font-teko font-black uppercase leading-none">SQUAD FPP</div>
            </div>
          </div>
        </div>

        <div className="bg-gunmetal/60 backdrop-blur-xl p-12 border-l-4 border-danger shadow-2xl relative overflow-hidden group border border-white/5">
          <div className="absolute inset-0 bg-linear-to-br from-danger/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex flex-col items-center space-y-4">
            <div className="p-5 bg-danger/10 border border-danger/20 rounded-sm rotate-45 group-hover:bg-danger/20 transition-all animate-pulse">
                <Sword size={40} className="text-danger -rotate-45" />
            </div>
            <div>
                <div className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Transmission</div>
                <div className="text-6xl font-teko font-black uppercase leading-none text-white animate-shimmer">LIVE FEED</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Ticker */}
      <div className="absolute bottom-0 left-0 w-full bg-black/80 py-4 border-t border-gold/20">
        <marquee className="text-gold font-teko text-2xl tracking-[0.5em] font-bold uppercase opacity-50">
           ROYAL-DROP BGMI CHAMPIONSHIP FINALS • ROYAL-DROP BGMI CHAMPIONSHIP FINALS • ROYAL-DROP BGMI CHAMPIONSHIP FINALS • ROYAL-DROP BGMI CHAMPIONSHIP FINALS
        </marquee>
      </div>
    </div>
  );
};

export default MatchStatus;

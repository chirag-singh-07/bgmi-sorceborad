import React from 'react';
import { Trophy, Star, Shell } from 'lucide-react';

const SplashScreen = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen text-center bg-background relative overflow-hidden">
      {/* Background Cinematic Elements */}
      <div className="absolute inset-0 bg-esports-noise opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-transparent via-gold/5 to-transparent pointer-events-none -z-10" />
      
      {/* Animated Light Beams */}
      <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[140%] bg-gold/5 rotate-12 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[140%] bg-gold/5 -rotate-12 blur-[120px] animate-pulse [animation-delay:1s]" />

      <div className="relative space-y-12 z-10 px-6">
        {/* Presenter Text */}
        <div className="space-y-2 animate-bounce [animation-duration:3s]">
          <p className="text-xl md:text-2xl font-teko font-bold tracking-[0.5em] text-gold uppercase opacity-80">
            SSR COLLEGE OF ACS PRESENT
          </p>
          <div className="h-0.5 w-32 bg-gold/50 mx-auto rounded-full" />
        </div>

        {/* Main Title Centerpiece */}
        <div className="relative inline-block">
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gold/20 blur-[60px] rounded-full animate-pulse z-0"></div>
          
          <div className="relative z-10">
            <h1 className="text-8xl md:text-[12rem] font-teko font-black leading-none tracking-tighter text-white uppercase drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              ROYAL-DROP <span className="text-gold italic block md:inline">BGMI</span>
            </h1>
            <h2 className="text-5xl md:text-7xl font-teko font-black tracking-[0.4em] text-transparent bg-clip-text bg-linear-to-r from-gold via-white to-gold uppercase mt-2">
              CHAMPIONSHIP
            </h2>
          </div>
        </div>

        {/* Cinematic Icons */}
        <div className="flex justify-center gap-16 mt-8">
            <div className="flex flex-col items-center group">
                <div className="p-5 bg-gunmetal/40 border border-white/10 rounded-sm group-hover:border-gold/50 transition-all rotate-45 mb-4">
                    <Trophy size={40} className="text-gold -rotate-45" />
                </div>
                <span className="text-sm font-black tracking-widest text-gray-500 uppercase">GLORY</span>
            </div>
            
            <div className="flex flex-col items-center group">
                <div className="p-5 bg-gunmetal/40 border border-white/10 rounded-sm group-hover:border-gold/50 transition-all rotate-45 mb-4">
                    <Star size={40} className="text-gold -rotate-45" />
                </div>
                <span className="text-sm font-black tracking-widest text-gray-500 uppercase">HONOR</span>
            </div>

            <div className="flex flex-col items-center group">
                <div className="p-5 bg-gunmetal/40 border border-white/10 rounded-sm group-hover:border-gold/50 transition-all rotate-45 mb-4">
                    <Shell size={40} className="text-gold -rotate-45" />
                </div>
                <span className="text-sm font-black tracking-widest text-gray-500 uppercase">VICTORY</span>
            </div>
        </div>

        {/* Footer Prompt */}
        <div className="pt-16 pb-8">
          <div className="inline-flex items-center gap-4 px-8 py-3 bg-black/40 border-y border-gold/30 backdrop-blur-md">
            <div className="w-3 h-3 bg-gold rounded-full animate-ping"></div>
            <span className="text-lg font-teko font-bold tracking-[0.3em] text-white/60 uppercase">
              Awaiting Tournament Initialization Broadcast
            </span>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Accent */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-gold/10 to-transparent pointer-events-none" />
    </div>
  );
};

export default SplashScreen;

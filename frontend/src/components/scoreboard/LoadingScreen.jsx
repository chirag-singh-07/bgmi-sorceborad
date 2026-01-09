import React from 'react';

const LoadingScreen = ({ message = "LOADING STANDINGS..." }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen text-center bg-background relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-esports-noise opacity-5 pointer-events-none" />
      
      {/* Central Animation */}
      <div className="relative mb-16">
        {/* Glowing Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold/10 blur-[100px] rounded-full animate-pulse"></div>
        
        {/* Spinning Rings */}
        <div className="relative w-56 h-56 border-2 border-white/5 rounded-full flex items-center justify-center">
            <div className="absolute inset-0 border-t-4 border-gold rounded-full animate-spin [animation-duration:1.5s]"></div>
            <div className="absolute inset-4 border-b-4 border-white/20 rounded-full animate-spin [animation-duration:3s] [animation-direction:reverse]"></div>
            <div className="absolute inset-8 border-l-4 border-gold/40 rounded-full animate-spin [animation-duration:1s]"></div>
            
            {/* Center piece */}
            <div className="w-16 h-16 bg-gunmetal/60 border border-white/10 flex items-center justify-center rotate-45 animate-pulse">
                <div className="w-8 h-8 bg-gold rotate-45"></div>
            </div>
        </div>
      </div>
      
      <div className="space-y-6 relative">
        <div className="h-[2px] w-48 bg-linear-to-r from-transparent via-gold to-transparent mx-auto opacity-50"></div>
        <h2 className="text-7xl font-teko font-bold tracking-[0.2em] text-white uppercase drop-shadow-2xl shimmer">
            {message}
        </h2>
        <p className="text-xl font-bold tracking-[0.5em] text-gray-500 uppercase font-teko">
            Please Wait for Official Confirmation
        </p>
        <div className="flex gap-4 justify-center mt-8">
            <div className="w-2 h-8 bg-gold animate-shimmer scale-y-100 opacity-20"></div>
            <div className="w-2 h-8 bg-gold animate-shimmer scale-y-100 opacity-40 [animation-delay:0.2s]"></div>
            <div className="w-2 h-8 bg-gold animate-shimmer scale-y-100 opacity-60 [animation-delay:0.4s]"></div>
            <div className="w-2 h-8 bg-gold animate-shimmer scale-y-100 opacity-80 [animation-delay:0.6s]"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

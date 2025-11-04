import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center z-50">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-2 border-cyan-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute inset-2 border-2 border-fuchsia-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '0.2s' }}></div>
        <div className="absolute inset-4 border-2 border-cyan-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '0.4s' }}></div>
      </div>
      <h1 className="text-2xl font-bold text-slate-200 mt-8 animate-pulse">
        Loading Experience...
      </h1>
    </div>
  );
};

export default LoadingScreen;

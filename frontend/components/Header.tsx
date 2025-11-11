import React, { useEffect, useState } from 'react';
import { SearchIcon, UserIcon, CartIcon } from './Icons';
import type { Page } from '../App';

interface HeaderProps {
  navigateTo: (page: Page) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ navigateTo, isLoggedIn, onLogout }) => {

  const handleLogout = () => {
    localStorage.removeItem("user");
    onLogout();
    navigateTo('login');
  };

  return (
    <header className="bg-slate-900/70 backdrop-blur-md shadow-lg sticky top-0 z-10 border-b border-cyan-500/20">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo and Search */}
        <div className="flex items-center space-x-4 md:space-x-8 flex-grow">
          <button onClick={() => navigateTo('home')} className="flex flex-col items-center cursor-pointer">
            <span className="text-cyan-400 text-xl md:text-2xl font-bold italic">AcousticX</span>
            <span className="text-fuchsia-400 text-xs italic -mt-1 flex items-center">
              3D Viewer
            </span>
          </button>
          <div className="hidden sm:flex relative flex-grow max-w-lg">
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="w-full py-2 px-4 rounded-sm outline-none bg-slate-800 text-white placeholder-slate-400 border border-transparent focus:border-cyan-500 transition-colors"
            />
            <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4 md:space-x-8">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="hidden md:flex items-center space-x-2 bg-red-500 text-white font-bold py-2 px-4 rounded-sm text-sm hover:bg-red-600 transition-colors group">
              <UserIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>Logout</span>
            </button>
          ) : (
            <button onClick={() => navigateTo('login')} className="hidden md:flex items-center space-x-2 bg-cyan-500 text-white font-bold py-2 px-4 rounded-sm text-sm hover:bg-cyan-600 transition-colors group">
              <UserIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>Login</span>
            </button>
          )}

          <button 
            className="flex items-center space-x-2 text-slate-200 font-bold hover:text-cyan-400 transition-colors group"
            onClick={() => navigateTo('cart')}
          >
            <CartIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="hidden md:block">Cart</span>
          </button>
        </div>
      </div>
       <div className="sm:hidden px-4 pb-2">
            <div className="flex relative w-full">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full py-2 px-4 rounded-sm outline-none text-sm bg-slate-800 text-white placeholder-slate-400 border border-transparent focus:border-cyan-500 transition-colors"
            />
            <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          </div>
        </div>
    </header>
  );
};

export default Header;
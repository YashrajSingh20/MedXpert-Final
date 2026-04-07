import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 holographic-panel border-b border-neo-cyan/20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <Stethoscope size={32} className="text-neo-cyan group-hover:animate-pulse-glow transition-all" />
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neo-cyan to-neo-blue drop-shadow-[0_0_8px_rgba(0,242,254,0.5)] tracking-wider">MedXpert</span>
        </Link>
        <nav>
          <ul className="flex space-x-8 items-center text-sm uppercase tracking-widest font-medium">
            <li><Link to="/" className="text-gray-300 hover:text-neo-cyan hover:drop-shadow-[0_0_8px_rgba(0,242,254,0.8)] transition-all">Home</Link></li>
            <li><Link to="/about" className="text-gray-300 hover:text-neo-cyan hover:drop-shadow-[0_0_8px_rgba(0,242,254,0.8)] transition-all">About</Link></li>
            <li><Link to="/contact" className="text-gray-300 hover:text-neo-cyan hover:drop-shadow-[0_0_8px_rgba(0,242,254,0.8)] transition-all">Contact</Link></li>
            <li>
              <Link to="/login" className="px-6 py-2 text-neo-cyan border border-neo-cyan/50 rounded-md hover:bg-neo-cyan hover:text-space-950 transition-all duration-300 shadow-[0_0_10px_rgba(0,242,254,0.1)] hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] relative overflow-hidden group ml-2">
                <span className="relative z-10 font-bold">Login</span>
                <div className="absolute inset-0 bg-neo-cyan opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
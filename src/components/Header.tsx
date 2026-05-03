import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-500 border-b ${
        scrolled 
          ? 'border-med-500/20 bg-navy-950/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(20,184,166,0.08)]' 
          : 'border-med-500/5 bg-navy-950/50 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2.5 group">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Stethoscope size={30} className="text-med-400 group-hover:drop-shadow-[0_0_12px_rgba(20,184,166,0.7)] transition-all duration-300" />
            </motion.div>
            <span className="text-xl font-bold shimmer-text tracking-wide">MedXpert</span>
          </Link>
          
          <motion.button 
            className="md:hidden text-med-400 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </motion.button>

          <nav className="hidden md:block">
            <ul className="flex space-x-8 items-center text-[0.8rem] uppercase tracking-[0.15em] font-semibold">
              {navLinks.map((link, i) => (
                <motion.li 
                  key={link.to}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                >
                  <Link 
                    to={link.to} 
                    className="relative text-gray-400 hover:text-med-400 transition-all duration-300 py-1 group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-med-400 to-sky-400 group-hover:w-full transition-all duration-300 rounded-full" />
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <Link 
                  to="/login" 
                  className="px-5 py-2 text-med-400 border border-med-500/30 rounded-xl hover:bg-med-500 hover:text-navy-950 transition-all duration-300 shadow-[0_0_15px_rgba(20,184,166,0.08)] hover:shadow-[0_0_30px_rgba(20,184,166,0.3)] relative overflow-hidden group ml-2 font-bold"
                >
                  <span className="relative z-10">Login</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-med-500/0 via-med-500/10 to-med-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Link>
              </motion.li>
            </ul>
          </nav>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="md:hidden overflow-hidden border-t border-med-500/10 mt-4"
            >
              <ul className="flex flex-col space-y-4 text-sm uppercase tracking-widest font-semibold items-center py-4">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link 
                      to={link.to} 
                      onClick={() => setIsOpen(false)} 
                      className="block text-gray-400 hover:text-med-400 transition-all"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  className="pt-2 w-full flex justify-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link 
                    to="/login" 
                    onClick={() => setIsOpen(false)} 
                    className="px-8 py-3 text-med-400 border border-med-500/30 rounded-xl hover:bg-med-500 hover:text-navy-950 transition-all duration-300 shadow-[0_0_10px_rgba(20,184,166,0.08)] relative overflow-hidden group block text-center max-w-xs w-full font-bold"
                  >
                    <span className="relative z-10">Login</span>
                  </Link>
                </motion.li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
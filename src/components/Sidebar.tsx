import React, { useState } from 'react';
import { UserPlus, FileText, FolderPlus, History, LogOut, User, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

type ViewType = 'registration' | 'prescription' | 'previous-records' | 'add-record' | 'profile';

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleViewChange = (view: ViewType) => {
    onViewChange(view);
    setMobileOpen(false);
  };

  const menuItems = [
    { id: 'profile', label: 'Doctor Profile', icon: User },
    { id: 'registration', label: 'Patient Registration', icon: UserPlus },
    { id: 'prescription', label: 'New Prescription', icon: FileText },
    { id: 'previous-records', label: 'Patient Records', icon: History },
    { id: 'add-record', label: 'Add Previous Record', icon: FolderPlus },
  ];

  const sidebarContent = (
    <>
      <div className="mb-8">
        <h2 className="text-lg font-bold shimmer-text">Doctor Dashboard</h2>
      </div>
      
      <nav>
        <ul className="space-y-1">
          {menuItems.map(({ id, label, icon: Icon }, i) => (
            <motion.li 
              key={id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.3 }}
            >
              <button
                onClick={() => handleViewChange(id as ViewType)}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  activeView === id 
                    ? 'text-white' 
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {activeView === id && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-gradient-to-r from-med-600/80 to-med-700/60 rounded-xl"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">
                  <Icon size={18} className={activeView === id ? 'drop-shadow-[0_0_6px_rgba(20,184,166,0.6)]' : 'group-hover:scale-110 transition-transform'} />
                </span>
                <span className="relative z-10 text-sm font-medium">{label}</span>
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto pt-6">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-700/50 to-transparent mb-4" />
        <motion.button 
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-500 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all duration-300"
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.97 }}
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Logout</span>
        </motion.button>
      </div>
    </>
  );

  return (
    <>
      <motion.button
        className="md:hidden fixed top-3 left-3 z-50 p-2 bg-navy-900/90 backdrop-blur-xl rounded-xl text-med-400 hover:text-white transition-colors shadow-lg border border-med-500/15"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle sidebar"
        whileTap={{ scale: 0.9 }}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="hidden md:flex md:flex-col md:w-64 bg-navy-900/50 backdrop-blur-xl text-white p-4 min-h-full border-r border-med-500/8">
        {sidebarContent}
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden fixed inset-y-0 left-0 z-40 w-72 bg-navy-900/95 backdrop-blur-xl text-white p-4 pt-16 flex flex-col border-r border-med-500/8"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
          >
            {sidebarContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
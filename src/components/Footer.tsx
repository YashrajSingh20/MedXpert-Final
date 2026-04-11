import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-space-900 border-t border-neo-cyan/20 text-gray-300 py-8 relative z-10 holographic-panel">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-neo-cyan to-neo-blue">MedXpert</h3>
            <p className="text-sm text-gray-400">Accelerating India's Healthcare Digitization</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2 text-neo-cyan">Quick Links</h4>
            <ul className="text-sm space-y-2">
              <li><a href="/" className="hover:text-neo-cyan transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-neo-cyan transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-neo-cyan transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2 text-neo-cyan">Contact</h4>
            <p className="text-sm mb-1">Email: <a href="mailto:bayasyashraj8@gmail.com" className="hover:text-neo-cyan transition-colors">info@medxpert.com</a></p>
            <p className="text-sm">Phone: +91 9353641410</p>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500 border-t border-space-950 pt-4">
          &copy; {new Date().getFullYear()} MedXpert. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
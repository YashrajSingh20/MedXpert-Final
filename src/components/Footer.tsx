import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-med-500/5 bg-navy-950/80 backdrop-blur-xl text-gray-400 py-10">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-med-500/30 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between gap-8">
          <ScrollReveal variant="fade-up" delay={0}>
            <div className="w-full md:w-auto">
              <h3 className="text-xl font-bold mb-3 shimmer-text">MedXpert</h3>
              <p className="text-sm text-gray-500">Accelerating India's Healthcare Digitization</p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.1}>
            <div className="w-full md:w-auto">
              <h4 className="text-base font-semibold mb-3 text-med-400">Quick Links</h4>
              <ul className="text-sm space-y-2">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/about', label: 'About Us' },
                  { to: '/contact', label: 'Contact Us' },
                ].map((link) => (
                  <li key={link.to}>
                    <Link 
                      to={link.to} 
                      className="text-gray-500 hover:text-med-400 transition-all duration-300 hover:pl-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.2}>
            <div className="w-full md:w-auto">
              <h4 className="text-base font-semibold mb-3 text-med-400">Contact</h4>
              <p className="text-sm mb-1 text-gray-500">
                Email: <a href="mailto:bayasyashraj8@gmail.com" className="hover:text-med-400 transition-colors">bayasyashraj8@gmail.com</a>
              </p>
              <p className="text-sm text-gray-500">Phone: +91 9353641410</p>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-10 text-center text-sm text-gray-600 border-t border-gray-800/30 pt-6">
          <div className="h-[1px] w-24 mx-auto mb-4 bg-gradient-to-r from-transparent via-med-500/20 to-transparent" />
          &copy; {new Date().getFullYear()} MedXpert. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
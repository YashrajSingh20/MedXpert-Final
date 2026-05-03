import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';
import ScrollReveal from '../components/ScrollReveal';
import PageTransition from '../components/PageTransition';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setFormData({ name: '', email: '', message: '' });
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setSent(false), 3000);
  };

  const contactItems = [
    { icon: Mail, title: 'Email', value: 'yashraj.singh@cmr.edu.in', href: 'mailto:yashraj.singh@cmr.edu.in' },
    { icon: Phone, title: 'Phone', value: '+91 8951486740' },
    { icon: MapPin, title: 'Address', value: 'CMR University\nBengaluru, Karnataka-560064\nIndia' },
  ];

  return (
    <PageTransition>
      <AnimatedBackground variant="subtle">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <ScrollReveal variant="blur-in">
            <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-4 shimmer-text">Contact Us</h1>
            <p className="text-center text-gray-500 mb-12 md:mb-16 max-w-xl mx-auto font-medium">Have questions? We'd love to hear from you.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-5xl mx-auto">
            <ScrollReveal variant="fade-left">
              <div className="glass-card p-8">
                <h2 className="text-xl md:text-2xl font-bold mb-6 text-med-400">Get in Touch</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 mb-2">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="auth-input" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 mb-2">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="auth-input" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 mb-2">Message</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={4} className="auth-input resize-none" />
                  </div>
                  <motion.button type="submit" className="w-full bg-gradient-to-r from-accent-600 to-accent-700 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-shadow duration-300 text-sm" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    {sent ? <>✓ Message Sent!</> : <><Send size={16} /> Send Message</>}
                  </motion.button>
                </form>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="fade-right" delay={0.2}>
              <div className="space-y-6">
                <h2 className="text-xl md:text-2xl font-bold mb-6 text-med-400">Contact Information</h2>
                {contactItems.map((item, i) => (
                  <motion.div key={item.title} className="glass-card p-5 flex items-start gap-4 group" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }} whileHover={{ x: 4, transition: { duration: 0.2 } }}>
                    <div className="p-2.5 rounded-xl bg-med-500/10 border border-med-500/15 group-hover:shadow-[0_0_15px_rgba(20,184,166,0.15)] transition-all duration-300">
                      <item.icon className="w-5 h-5 text-med-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm mb-1">{item.title}</h3>
                      {item.href ? (
                        <a href={item.href} className="text-gray-400 text-sm hover:text-med-400 transition-colors break-all">{item.value}</a>
                      ) : (
                        <p className="text-gray-400 text-sm whitespace-pre-line">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </AnimatedBackground>
    </PageTransition>
  );
};

export default Contact;
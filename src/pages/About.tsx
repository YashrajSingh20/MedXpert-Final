import React from 'react';
import { Target, Zap, Shield } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import ScrollReveal from '../components/ScrollReveal';
import GlowCard from '../components/GlowCard';
import PageTransition from '../components/PageTransition';

const About: React.FC = () => {
  return (
    <PageTransition>
      <AnimatedBackground variant="subtle">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <ScrollReveal variant="blur-in">
            <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-4 shimmer-text">About MedXpert</h1>
            <p className="text-center text-gray-500 mb-12 md:mb-16 max-w-xl mx-auto font-medium">Pioneering the future of digital healthcare in India</p>
          </ScrollReveal>
          <div className="mb-14 md:mb-20">
            <ScrollReveal variant="fade-up">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-med-400">Our Mission</h2>
              <p className="text-base md:text-lg text-gray-400 mb-10 leading-relaxed max-w-4xl">MedXpert is dedicated to accelerating India's healthcare digitization by providing cutting-edge solutions for medical record management.</p>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6" stagger={0.15}>
              <GlowCard className="glass-card p-8">
                <Target className="text-med-400 w-11 h-11 mb-4 animate-float drop-shadow-[0_0_8px_rgba(20,184,166,0.5)]" />
                <h3 className="text-lg font-bold mb-2 text-white">Vision</h3>
                <p className="text-gray-400 text-sm leading-relaxed">To create a fully digitized, efficient, and accessible healthcare system across India.</p>
              </GlowCard>
              <GlowCard className="glass-card p-8">
                <Zap className="text-med-400 w-11 h-11 mb-4 animate-float-delayed drop-shadow-[0_0_8px_rgba(20,184,166,0.5)]" />
                <h3 className="text-lg font-bold mb-2 text-white">Innovation</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Leveraging machine learning to interpret and digitize medical records accurately.</p>
              </GlowCard>
              <GlowCard className="glass-card p-8">
                <Shield className="text-med-400 w-11 h-11 mb-4 animate-float-slow drop-shadow-[0_0_8px_rgba(20,184,166,0.5)]" />
                <h3 className="text-lg font-bold mb-2 text-white">Security</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Ensuring the highest standards of data privacy and security in handling sensitive medical information.</p>
              </GlowCard>
            </ScrollReveal>
          </div>
          <ScrollReveal variant="fade-up" delay={0.1}>
            <div className="glass-card p-8 md:p-10 max-w-4xl">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-med-400">Our Approach</h2>
              <p className="text-base md:text-lg text-gray-400 mb-4 leading-relaxed">MedXpert combines state-of-the-art cloud vision OCR technology with a fine-tuned model to accurately interpret handwritten medical information.</p>
              <p className="text-base md:text-lg text-gray-400 leading-relaxed">By predicting drug names and supporting the ongoing digital transformation of healthcare, we're paving the way for a more efficient, accurate, and integrated healthcare system in India.</p>
            </div>
          </ScrollReveal>
        </div>
      </AnimatedBackground>
    </PageTransition>
  );
};

export default About;
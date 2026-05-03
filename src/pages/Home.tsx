import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, User, Pill, Shield, Heart, Clock, ArrowRight, Sparkles, FileCheck, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';
import ScrollReveal from '../components/ScrollReveal';
import PageTransition from '../components/PageTransition';
import AnimatedCounter from '../components/AnimatedCounter';

/* ── Dot-grid pattern for card decoration ── */
const DotGrid = ({ className = '' }: { className?: string }) => (
  <svg className={`absolute pointer-events-none opacity-[0.07] ${className}`} width="80" height="80">
    {Array.from({ length: 25 }).map((_, i) => (
      <circle key={i} cx={8 + (i % 5) * 16} cy={8 + Math.floor(i / 5) * 16} r="1.5" fill="currentColor" />
    ))}
  </svg>
);

/* ── Animated ring around icon ── */
const IconRing = ({ color, children }: { color: string; children: React.ReactNode }) => (
  <div className="relative w-16 h-16 md:w-20 md:h-20 mx-auto mb-5 md:mb-6">
    {/* Outer animated ring */}
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{ border: `2px solid ${color}20` }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.1, 0.4] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />
    {/* Inner icon container */}
    <div className="absolute inset-1.5 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${color}25, ${color}08)`, border: `1px solid ${color}30` }}>
      {children}
    </div>
  </div>
);

/* ── Role Card data ── */
const roles = [
  {
    id: 'doctor',
    title: 'For Doctors',
    subtitle: 'Clinical Workflow',
    description: 'Generate digital prescriptions, manage patient histories, and streamline your clinical workflow.',
    Icon: Stethoscope,
    color: '#818CF8',       // indigo-400
    colorDark: '#6366F1',   // indigo-500
    stat: { value: 500, suffix: '+', label: 'Prescriptions Generated' },
    link: '/doctor/signup',
    tag: 'Most Popular',
  },
  {
    id: 'patient',
    title: 'For Patients',
    subtitle: 'Health Records',
    description: 'Access your complete medical history, download prescriptions, and manage health records securely.',
    Icon: User,
    color: '#2DD4BF',       // teal-400
    colorDark: '#14B8A6',   // teal-500
    stat: { value: 10000, suffix: '+', label: 'Records Secured' },
    link: '/patient/register',
    tag: 'Secure Access',
  },
  {
    id: 'medical',
    title: 'For Medical Stores',
    subtitle: 'Pharmacy Hub',
    description: 'Verify prescriptions instantly, process orders digitally, and eliminate prescription fraud.',
    Icon: Pill,
    color: '#F472B6',       // pink-400
    colorDark: '#EC4899',   // pink-500
    stat: { value: 99, suffix: '%', label: 'Verification Accuracy' },
    link: '/medical/signup',
    tag: 'Verified',
  },
];

/* ── Feature Card data ── */
const features = [
  {
    Icon: Heart,
    title: 'AI-Powered Prescriptions',
    description: 'Intelligent drug name prediction and handwriting recognition powered by cloud vision OCR.',
    stat: '3x Faster',
    color: '#F472B6',
  },
  {
    Icon: Shield,
    title: 'End-to-End Security',
    description: 'UHID-based encrypted records with decentralized storage — your data, your control.',
    stat: '256-bit',
    color: '#818CF8',
  },
  {
    Icon: Clock,
    title: 'Instant Access',
    description: 'Real-time medical records available across all devices, anytime, anywhere.',
    stat: '<1s Latency',
    color: '#2DD4BF',
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const titleWords = 'Welcome to MedXpert'.split(' ');

  return (
    <PageTransition>
      <AnimatedBackground>
        <div className="min-h-screen relative">
          {/* ════════ HERO ════════ */}
          <div className="relative py-16 md:py-28 z-10">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16 md:mb-24">
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-med-500/20 bg-med-500/5 text-med-400 text-xs font-semibold uppercase tracking-widest mb-6"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <Sparkles size={14} />
                  India's Digital Health Platform
                </motion.div>

                <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold mb-4 md:mb-6 tracking-tight">
                  {titleWords.map((word, i) => (
                    <motion.span
                      key={i}
                      className="inline-block mr-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-white via-med-300 to-sky-400"
                      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ delay: 0.15 * i + 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </h1>

                <motion.p
                  className="text-base sm:text-lg md:text-xl mb-8 md:mb-12 text-gray-400 font-medium tracking-wide max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  Revolutionizing Healthcare Management with <span className="text-med-400">AI-powered</span> digital prescriptions and secure patient records.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <button
                    onClick={() => navigate('/login')}
                    className="relative group bg-gradient-to-r from-med-500 to-med-400 text-navy-950 text-sm md:text-base font-bold px-8 md:px-12 py-3.5 md:py-4 rounded-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(20,184,166,0.3)] shadow-[0_0_20px_rgba(20,184,166,0.1)] flex items-center gap-2"
                  >
                    <span className="relative z-10">Get Started Free</span>
                    <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-med-500 to-med-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                  </button>
                  <button
                    onClick={() => navigate('/about')}
                    className="text-sm font-semibold text-gray-400 hover:text-med-400 transition-colors flex items-center gap-1.5"
                  >
                    Learn more <ArrowRight size={14} />
                  </button>
                </motion.div>
              </div>

              {/* ════════ ROLE CARDS ════════ */}
              <ScrollReveal variant="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto" stagger={0.15}>
                {roles.map((role) => (
                  <motion.button
                    key={role.id}
                    onClick={() => navigate(role.link)}
                    className="relative group text-left rounded-2xl overflow-hidden transition-all duration-500"
                    whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Card background layers */}
                    <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-xl" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(ellipse at top, ${role.color}08, transparent 70%)` }}
                    />
                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-2xl border border-white/[0.06] group-hover:border-transparent transition-colors duration-300" />
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${role.color}30, transparent 40%, transparent 60%, ${role.color}20)`,
                        padding: '1px',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10 p-5 md:p-7">
                      {/* Dot grid decoration */}
                      <DotGrid className="top-4 right-4 text-gray-400" />

                      {/* Tag badge */}
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-5"
                        style={{ background: `${role.color}12`, color: role.color, border: `1px solid ${role.color}20` }}
                      >
                        <FileCheck size={10} />
                        {role.tag}
                      </div>

                      {/* Icon with animated ring */}
                      <IconRing color={role.color}>
                        <role.Icon size={28} style={{ color: role.color }} className="animate-float drop-shadow-lg" />
                      </IconRing>

                      {/* Text */}
                      <h3 className="text-lg md:text-xl font-bold text-white mb-1">{role.title}</h3>
                      <p className="text-[10px] md:text-xs font-semibold uppercase tracking-widest mb-2 md:mb-3" style={{ color: `${role.color}90` }}>{role.subtitle}</p>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4 md:mb-5">{role.description}</p>

                      {/* Stat bar */}
                      <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: `${role.color}10` }}>
                        <div>
                          <span className="text-2xl font-extrabold text-white">
                            <AnimatedCounter target={role.stat.value} suffix={role.stat.suffix} duration={1800} />
                          </span>
                          <span className="block text-[11px] text-gray-500 mt-0.5">{role.stat.label}</span>
                        </div>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                          style={{ background: `${role.color}15`, border: `1px solid ${role.color}20` }}
                        >
                          <ArrowRight size={18} style={{ color: role.color }} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </ScrollReveal>
            </div>
          </div>

          {/* ════════ FEATURES ════════ */}
          <div className="relative py-16 md:py-24 z-10 border-t border-med-500/5">
            <div className="container mx-auto px-4">
              <ScrollReveal variant="blur-in">
                <div className="text-center mb-12 md:mb-20">
                  <motion.div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-500/20 bg-accent-500/5 text-accent-400 text-xs font-semibold uppercase tracking-widest mb-4">
                    <Activity size={14} />
                    Platform Features
                  </motion.div>
                  <h2 className="text-2xl md:text-4xl font-extrabold shimmer-text">
                    Why Choose MedXpert?
                  </h2>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto" stagger={0.15}>
                {features.map((feat) => (
                  <motion.div
                    key={feat.title}
                    className="relative group rounded-2xl overflow-hidden"
                    whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  >
                    {/* Background */}
                    <div className="absolute inset-0 bg-navy-900/50 backdrop-blur-xl" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(ellipse at bottom left, ${feat.color}06, transparent 60%)` }}
                    />
                    <div className="absolute inset-0 rounded-2xl border border-white/[0.06] group-hover:border-white/[0.1] transition-colors" />

                    {/* Content */}
                    <div className="relative z-10 p-5 md:p-7">
                      <DotGrid className="bottom-4 right-4 text-gray-500" />

                      {/* Stat chip */}
                      <div className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold mb-5"
                        style={{ background: `${feat.color}10`, color: feat.color }}
                      >
                        {feat.stat}
                      </div>

                      {/* Icon */}
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-4 md:mb-5 transition-all duration-300 group-hover:shadow-lg"
                        style={{ background: `${feat.color}10`, border: `1px solid ${feat.color}15` }}
                      >
                        <feat.Icon size={26} style={{ color: feat.color }} className="group-hover:scale-110 transition-transform" />
                      </div>

                      <h3 className="text-lg font-bold mb-2 text-white">{feat.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{feat.description}</p>
                    </div>
                  </motion.div>
                ))}
              </ScrollReveal>
            </div>
          </div>

          {/* ════════ CTA ════════ */}
          <div className="relative py-16 md:py-24 z-10 border-t border-med-500/5">
            <div className="container mx-auto px-4 text-center">
              <ScrollReveal variant="scale-in">
                <h2 className="text-2xl md:text-4xl font-extrabold mb-4 md:mb-6 shimmer-text">
                  Ready to Transform Healthcare?
                </h2>
              </ScrollReveal>
              <ScrollReveal variant="fade-up" delay={0.2}>
                <p className="text-base md:text-lg mb-8 md:mb-12 text-gray-500 font-medium max-w-2xl mx-auto">
                  Join <span className="text-med-400 font-bold">MedXpert</span> and be part of the unified digital health network.
                </p>
              </ScrollReveal>
              <ScrollReveal variant="scale-in" delay={0.4}>
                <button
                  onClick={() => navigate('/login')}
                  className="relative group bg-gradient-to-r from-med-500 to-med-400 text-navy-950 text-sm md:text-base font-bold px-8 md:px-12 py-3.5 md:py-4 rounded-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(20,184,166,0.3)] shadow-[0_0_20px_rgba(20,184,166,0.1)] inline-flex items-center gap-2"
                >
                  <span className="relative z-10">Get Started Now</span>
                  <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-med-500 to-med-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                </button>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </AnimatedBackground>
    </PageTransition>
  );
};

export default Home;
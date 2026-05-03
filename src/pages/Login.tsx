import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AlertCircle, Stethoscope, User, Pill, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { loginUser } from '../utils/auth';
import ForgotPassword from '../components/ForgotPassword';
import AnimatedBackground from '../components/AnimatedBackground';
import GlowCard from '../components/GlowCard';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';

interface LocationState {
  message?: string;
  userType?: 'doctor' | 'patient' | 'medical';
}

type UserRole = 'doctor' | 'patient' | 'medical';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(
    (location.state as LocationState)?.userType || null
  );
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState((location.state as LocationState)?.message || '');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    if (location.state) {
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (!identifier || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      if (loginUser(identifier, password)) {
        switch (selectedRole) {
          case 'doctor': navigate('/doctor/dashboard'); break;
          case 'patient': navigate('/patient/dashboard'); break;
          case 'medical': navigate('/medical/dashboard'); break;
        }
      } else {
        setError('Invalid login credentials');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const roleCards = [
    {
      role: 'doctor' as UserRole,
      title: 'Doctor Login',
      Icon: Stethoscope,
      description: 'Generate digital prescriptions and manage patient records efficiently',
      signupLink: '/doctor/signup',
      signupText: 'New doctor? Sign up here',
      glowColor: 'rgba(99, 102, 241, 0.12)',
      iconBg: 'from-indigo-500 to-accent-600',
    },
    {
      role: 'patient' as UserRole,
      title: 'Patient Login',
      Icon: User,
      description: 'View your medical history and prescriptions',
      signupLink: '/patient/register',
      signupText: 'New patient? Register here',
      glowColor: 'rgba(20, 184, 166, 0.12)',
      iconBg: 'from-med-500 to-sky-500',
    },
    {
      role: 'medical' as UserRole,
      title: 'Medical Store Login',
      Icon: Pill,
      description: 'Verify and process digital prescriptions seamlessly',
      signupLink: '/medical/signup',
      signupText: 'New medical store? Sign up here',
      glowColor: 'rgba(244, 114, 182, 0.1)',
      iconBg: 'from-pink-500 to-rose-600',
    }
  ];

  const selectedCard = roleCards.find(card => card.role === selectedRole);

  if (!selectedRole) {
    return (
      <PageTransition>
        <AnimatedBackground variant="subtle">
          <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full space-y-8">
              <ScrollReveal variant="blur-in">
                <h2 className="text-center text-3xl md:text-4xl font-extrabold shimmer-text">
                  Sign in to your account
                </h2>
                <p className="text-center text-gray-500 mt-3 font-medium">Choose your role to continue</p>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6" stagger={0.12}>
                {roleCards.map(({ role, title, Icon, description, iconBg, glowColor }) => (
                  <GlowCard
                    key={role}
                    as="button"
                    onClick={() => setSelectedRole(role)}
                    className="glass-card p-6 text-left"
                    glowColor={glowColor}
                  >
                    <div className={`bg-gradient-to-br ${iconBg} p-3 rounded-xl w-14 h-14 flex items-center justify-center mb-4 shadow-lg`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1.5">{title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
                  </GlowCard>
                ))}
              </ScrollReveal>
            </div>
          </div>
        </AnimatedBackground>
      </PageTransition>
    );
  }

  if (showForgotPassword) {
    return (
      <PageTransition>
        <AnimatedBackground variant="subtle">
          <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="max-w-md w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ForgotPassword type={selectedRole} onBack={() => setShowForgotPassword(false)} />
            </motion.div>
          </div>
        </AnimatedBackground>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <AnimatedBackground variant="subtle">
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-md w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.button
              onClick={() => setSelectedRole(null)}
              className="text-med-400/60 hover:text-med-400 mb-6 flex items-center gap-2 text-sm font-medium transition-colors"
              whileHover={{ x: -4 }}
            >
              ← Back to role selection
            </motion.button>
            
            <div className="glass-card p-8">
              {selectedCard && (
                <div className="flex items-center gap-3 mb-6">
                  <div className={`bg-gradient-to-br ${selectedCard.iconBg} p-2.5 rounded-xl`}>
                    <selectedCard.Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{selectedCard.title}</h3>
                </div>
              )}
              
              <form className="space-y-5" onSubmit={handleSubmit}>
                <AnimatePresence>
                  {error && (
                    <motion.div 
                      className="flex items-center p-4 text-red-400 bg-red-500/10 border border-red-500/15 rounded-xl"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                      <span className="text-sm">{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <AnimatePresence>
                  {success && (
                    <motion.div 
                      className="flex items-center p-4 text-emerald-400 bg-emerald-500/10 border border-emerald-500/15 rounded-xl"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <span className="text-sm">{success}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="identifier" className="block text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 mb-2">
                      {selectedRole === 'patient' ? 'UHID' : 'Email address'}
                    </label>
                    <input
                      id="identifier"
                      name="identifier"
                      type={selectedRole === 'patient' ? 'text' : 'email'}
                      autoComplete={selectedRole === 'patient' ? 'off' : 'email'}
                      required
                      className="auth-input"
                      placeholder={selectedRole === 'patient' ? 'Enter your UHID' : 'Email address'}
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      maxLength={selectedRole === 'patient' ? 14 : undefined}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 mb-2">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="auth-input"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-xs text-med-400/50 hover:text-med-400 transition-colors font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-accent-600 to-accent-700 hover:from-accent-500 hover:to-accent-600 shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5" />
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </motion.button>

                {selectedCard && (
                  <Link
                    to={selectedCard.signupLink}
                    className="block text-center text-sm text-med-400/50 hover:text-med-400 transition-colors mt-4 font-medium"
                  >
                    {selectedCard.signupText}
                  </Link>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </AnimatedBackground>
    </PageTransition>
  );
};

export default Login;
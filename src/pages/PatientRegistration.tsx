import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Loader2, Fingerprint } from 'lucide-react';
import { getPatientByUHID } from '../utils/db';
import { registerPatientUser } from '../utils/auth';

const PatientRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    uhid: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const patient = await getPatientByUHID(formData.uhid);
      if (!patient) {
        throw new Error('UHID not found. Please contact your healthcare provider.');
      }

      const success = await registerPatientUser({
        uhid: formData.uhid,
        password: formData.password,
        name: patient.name,
        role: 'patient'
      });

      if (success) {
        navigate('/login', {
          state: { message: 'Registration successful. Please login with your UHID and password.' }
        });
      } else {
        throw new Error('UHID is already registered');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-[-15%] left-[-10%] w-[40%] h-[40%] rounded-full pointer-events-none" style={{background: 'rgba(0,242,254,0.08)', filter: 'blur(120px)'}} />
      <div className="absolute bottom-[-15%] right-[-10%] w-[40%] h-[40%] rounded-full pointer-events-none" style={{background: 'rgba(79,172,254,0.08)', filter: 'blur(120px)'}} />

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full" style={{background: 'rgba(0,242,254,0.1)', border: '1px solid rgba(0,242,254,0.3)', boxShadow: '0 0 20px rgba(0,242,254,0.15)'}}>
              <Fingerprint size={32} style={{color: '#00f2fe'}} />
            </div>
          </div>
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Patient Registration
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Register using your UHID provided by your healthcare provider
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-medium hover:underline" style={{color: '#00f2fe'}}>
              Sign in
            </Link>
          </p>
        </div>

        {/* Error box */}
        {error && (
          <div className="flex items-start p-4 rounded-lg" style={{background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.35)', boxShadow: '0 0 12px rgba(239,68,68,0.08)'}}>
            <AlertCircle className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0" style={{color: '#f87171'}} />
            <span className="text-sm" style={{color: '#fca5a5'}}>{error}</span>
          </div>
        )}

        {/* Form card */}
        <div className="rounded-2xl p-8 space-y-5" style={{background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(0,242,254,0.15)', backdropFilter: 'blur(12px)', boxShadow: '0 0 30px rgba(0,242,254,0.05)'}}>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="uhid" className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{color: '#00f2fe'}}>UHID</label>
              <input
                id="uhid"
                name="uhid"
                type="text"
                required
                className="auth-input"
                placeholder="Enter your UHID"
                value={formData.uhid}
                onChange={(e) => setFormData({ ...formData, uhid: e.target.value })}
                maxLength={14}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{color: '#00f2fe'}}>Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="auth-input"
                placeholder="Create password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{color: '#00f2fe'}}>Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="auth-input"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-accent-600 hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Registering...
                </>
              ) : (
                'Register'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistration;
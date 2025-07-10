import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser, signup } = useAuth();

  // Fix: Use useEffect to handle redirect if user is already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    if (password.length < 8) {
      return setError('Password must be at least 8 characters');
    }
    
    try {
      setError('');
      setLoading(true);
      await signup({
        email,
        password,
        name: displayName
      });
      navigate('/');
    } catch (err) {
      console.error('Signup error:', err);
      setError('Failed to create an account. ' + (err.message || ''));
    } finally {
      setLoading(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    if (password.length === 0) return null;
    if (password.length < 6) return { text: "Weak", color: "bg-red-400" };
    if (password.length < 10) return { text: "Medium", color: "bg-yellow-400" };
    return { text: "Strong", color: "bg-green-400" };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 transition-all duration-300 hover:bg-white/[0.12] hover:border-white/30">
          <div className="text-center mb-8">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-purple-500/25 transition-transform duration-300 hover:scale-105">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-violet-200 bg-clip-text text-transparent mb-3">Create Account</h2>
            <p className="text-slate-300 text-lg">Join our rating community and discover amazing content</p>
          </div>
          
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-400/30 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-300 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="displayName" className="block mb-2 text-sm font-semibold text-slate-200">
                Display Name
              </label>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/20 text-white 
                         placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 
                         focus:border-violet-400/50 backdrop-blur-sm transition-all duration-200
                         hover:bg-white/[0.08] hover:border-white/30"
                placeholder="Enter your display name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-semibold text-slate-200">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/20 text-white 
                         placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 
                         focus:border-violet-400/50 backdrop-blur-sm transition-all duration-200
                         hover:bg-white/[0.08] hover:border-white/30"
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-semibold text-slate-200">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/20 text-white 
                         placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 
                         focus:border-violet-400/50 backdrop-blur-sm transition-all duration-200
                         hover:bg-white/[0.08] hover:border-white/30"
                placeholder="Create a strong password"
                required
              />
              {/* Password strength indicator */}
              {passwordStrength && (
                <div className="flex items-center mt-2">
                  <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
                    <div className={`h-full ${passwordStrength.color}`} style={{ width: password.length > 10 ? '100%' : `${password.length * 10}%` }}></div>
                  </div>
                  <span className="ml-2 text-xs text-slate-300">{passwordStrength.text}</span>
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-semibold text-slate-200">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/20 text-white 
                         placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 
                         focus:border-violet-400/50 backdrop-blur-sm transition-all duration-200
                         hover:bg-white/[0.08] hover:border-white/30"
                placeholder="Confirm your password"
                required
              />
              {/* Password match indicator */}
              {confirmPassword && (
                <p className={`mt-2 text-xs ${password === confirmPassword ? 'text-green-400' : 'text-red-400'}`}>
                  {password === confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                </p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl font-semibold text-white 
                       hover:from-violet-500 hover:to-purple-500 disabled:from-violet-600/50 disabled:to-purple-600/50 
                       transition-all duration-200 disabled:cursor-not-allowed focus:outline-none focus:ring-2 
                       focus:ring-violet-500/50 focus:ring-offset-2 focus:ring-offset-transparent
                       shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30
                       transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-slate-300">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-violet-400 hover:text-violet-300 font-semibold transition-colors duration-200 hover:underline decoration-2 underline-offset-2"
              >
                Sign in here
              </Link>
            </p>
          </div>

          {/* Privacy policy and terms links */}
          <div className="mt-6 text-center text-xs text-slate-400">
            By signing up, you agree to our{' '}
            <Link 
              to="/terms" 
              className="text-violet-400 hover:text-violet-300 transition-colors duration-200"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link 
              to="/privacy" 
              className="text-violet-400 hover:text-violet-300 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
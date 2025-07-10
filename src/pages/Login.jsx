import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await login(formData);
            navigate('/');
        } catch (error) {
            setError('Failed to log in. Please check your credentials.');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-8 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-cyan-400/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative z-10 transition-all duration-300 hover:bg-white/[0.12] hover:border-white/30">
                <div className="text-center mb-8">
                    <div className="mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-purple-500/25 transition-transform duration-300 hover:scale-105">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-violet-200 bg-clip-text text-transparent mb-3">Welcome Back</h1>
                    <p className="text-slate-300 text-lg">Sign in to continue your rating journey</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4 mb-6 backdrop-blur-sm">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-red-300 text-sm font-medium">{error}</p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-slate-200 text-sm font-semibold mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3.5 bg-white/5 border border-white/20 rounded-xl 
                                         text-white placeholder-slate-400 focus:outline-none 
                                         focus:ring-2 focus:ring-violet-500/50 focus:border-violet-400/50 
                                         backdrop-blur-sm transition-all duration-200
                                         hover:bg-white/[0.08] hover:border-white/30"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-slate-200 text-sm font-semibold mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3.5 bg-white/5 border border-white/20 rounded-xl 
                                         text-white placeholder-slate-400 focus:outline-none 
                                         focus:ring-2 focus:ring-violet-500/50 focus:border-violet-400/50 
                                         backdrop-blur-sm transition-all duration-200
                                         hover:bg-white/[0.08] hover:border-white/30"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <Link 
                            to="/forgot-password" 
                            className="text-sm text-violet-400 hover:text-violet-300 transition-colors duration-200 hover:underline decoration-2 underline-offset-2"
                        >
                            Forgot your password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white 
                                 font-semibold py-4 px-6 rounded-xl hover:from-violet-500 hover:to-purple-500 
                                 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]
                                 disabled:from-violet-600/50 disabled:to-purple-600/50 disabled:cursor-not-allowed 
                                 disabled:hover:scale-100 shadow-lg shadow-violet-500/25 
                                 hover:shadow-xl hover:shadow-violet-500/30 focus:outline-none 
                                 focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2 focus:ring-offset-transparent"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing in...
                            </div>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-slate-300">
                        Don't have an account?{' '}
                        <Link 
                            to="/signup" 
                            className="text-violet-400 hover:text-violet-300 font-semibold transition-colors duration-200 hover:underline decoration-2 underline-offset-2"
                        >
                            Sign up here
                        </Link>
                    </p>
                </div>

                {/* Additional visual elements for premium feel */}
                <div className="absolute top-4 right-4 opacity-20">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
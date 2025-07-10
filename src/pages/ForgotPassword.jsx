import React, { useState } from 'react';
import { themeStyles } from '../styles/theme';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setMessage('');
            setError('');
            setLoading(true);
            // Simulate password reset process
            await new Promise(resolve => setTimeout(resolve, 2000));
            setMessage('Password recovery email sent! Check your inbox for instructions.');
        } catch (error) {
            setError('Failed to send password recovery email. Please check your email address.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen ${themeStyles.backgrounds.main} flex items-center justify-center px-4 py-8 relative overflow-hidden`}>
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-cyan-400/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className={`max-w-md w-full ${themeStyles.glass.card} p-8 relative z-10`}>
                <div className="text-center mb-8">
                    <div className="mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-purple-500/25 transition-transform duration-300 hover:scale-105">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                        </div>
                    </div>
                    <h1 className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${themeStyles.gradients.title} mb-4`}>Reset Password</h1>
                    <p className={`${themeStyles.text.secondary} text-lg leading-relaxed`}>
                        Enter your email address and we'll send you a secure link to reset your password.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4 mb-6 backdrop-blur-sm">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-[#66FCF1] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-[#66FCF1] text-sm font-medium">{error}</p>
                        </div>
                    </div>
                )}

                {message && (
                    <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-xl p-4 mb-6 backdrop-blur-sm">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-emerald-300 text-sm font-medium">{message}</p>
                        </div>
                    </div>
                )}

                <div className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-slate-200 text-sm font-semibold mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3.5 bg-white/5 border border-white/20 rounded-xl 
                                     text-white placeholder-slate-400 focus:outline-none 
                                     focus:ring-2 focus:ring-violet-500/50 focus:border-violet-400/50 
                                     backdrop-blur-sm transition-all duration-200
                                     hover:bg-white/[0.08] hover:border-white/30"
                            placeholder="Enter your email address"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
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
                                Sending Reset Email...
                            </div>
                        ) : (
                            <div className="flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Send Reset Email
                            </div>
                        )}
                    </button>
                </div>

                <div className="mt-8 text-center space-y-4">
                    <div className="flex items-center justify-center">
                        <div className="flex-grow h-px bg-white/20"></div>
                        <span className="px-4 text-slate-400 text-sm">or</span>
                        <div className="flex-grow h-px bg-white/20"></div>
                    </div>
                    
                    <div className="space-y-3">
                        <p className="text-slate-300">
                            Remember your password?{' '}
                            <button className="text-violet-400 hover:text-violet-300 font-semibold transition-colors duration-200 hover:underline decoration-2 underline-offset-2">
                                Sign in
                            </button>
                        </p>
                        <p className="text-slate-300">
                            Don't have an account?{' '}
                            <button className="text-violet-400 hover:text-violet-300 font-semibold transition-colors duration-200 hover:underline decoration-2 underline-offset-2">
                                Sign up
                            </button>
                        </p>
                    </div>
                </div>

                {/* Security indicator */}
                <div className="absolute top-4 right-4 opacity-30">
                    <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-xs text-violet-400 font-medium">Secure</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
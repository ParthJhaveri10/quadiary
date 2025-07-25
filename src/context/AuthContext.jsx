import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            setLoading(true);
            const user = await authService.getCurrentUser();
            setCurrentUser(user);
        } catch (error) {
            // Error is already handled in authService, just set user to null
            console.log('Auth check failed, user not authenticated');
            setCurrentUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Add retry mechanism for auth check
    const retryAuthCheck = async (maxRetries = 3) => {
        for (let i = 0; i < maxRetries; i++) {
            try {
                const user = await authService.getCurrentUser();
                setCurrentUser(user);
                return;
            } catch (error) {
                if (i === maxRetries - 1) {
                    console.log('Max retries reached, setting user to null');
                    setCurrentUser(null);
                } else {
                    console.log(`Auth check retry ${i + 1}/${maxRetries}`);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
        }
    };

    const signup = async (userData) => {
        try {
            const session = await authService.createAccount(userData);
            if (session) {
                const user = await authService.getCurrentUser();
                setCurrentUser(user);
            }
            return session;
        } catch (error) {
            console.error('Signup failed:', error);
            throw error;
        }
    };

    const login = async (credentials) => {
        try {
            const session = await authService.login(credentials);
            if (session) {
                // Wait a bit for session to be established
                await new Promise(resolve => setTimeout(resolve, 500));
                const user = await authService.getCurrentUser();
                setCurrentUser(user);
            }
            return session;
        } catch (error) {
            console.error('Login failed:', error);
            setCurrentUser(null);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setCurrentUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
            // Even if logout fails, clear the user state
            setCurrentUser(null);
            throw error;
        }
    };

    const resetPassword = async (email) => {
        try {
            return await authService.sendPasswordRecovery(email);
        } catch (error) {
            console.error('Password reset failed:', error);
            throw error;
        }
    };

    const updatePassword = async (newPassword, oldPassword) => {
        try {
            return await authService.updatePassword(newPassword, oldPassword);
        } catch (error) {
            console.error('Password update failed:', error);
            throw error;
        }
    };

    const updateUserPreferences = async (preferences) => {
        try {
            const result = await authService.updatePreferences(preferences);
            // Refresh user data to get updated preferences
            const user = await authService.getCurrentUser();
            setCurrentUser(user);
            return result;
        } catch (error) {
            console.error('Failed to update preferences:', error);
            throw error;
        }
    };

    const value = {
        currentUser,
        loading,
        signup,
        login,
        logout,
        resetPassword,
        updatePassword,
        updateUserPreferences,
        checkAuthStatus
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
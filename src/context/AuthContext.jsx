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
            setCurrentUser(null);
        } finally {
            setLoading(false);
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
                const user = await authService.getCurrentUser();
                setCurrentUser(user);
            }
            return session;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setCurrentUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
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
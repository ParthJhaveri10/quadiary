import { account } from './appwrite';
import { databases, appwriteConfig } from './appwrite';
import { ID } from 'appwrite';

class AuthService {
    // Create a new user account
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await account.create(
                ID.unique(),
                email,
                password,
                name
            );
            
            if (userAccount) {
                // Automatically sign in the user after account creation
                const session = await this.login({ email, password });
                
                // Create user profile in the database
                if (session) {
                    await this.createUserProfile(userAccount.$id, name, email);
                }
                
                return session;
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error('Error creating account:', error);
            throw error;
        }
    }

    // Create user profile in database
    async createUserProfile(userId, displayName, email) {
        try {
            return await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.userCollectionId,
                ID.unique(),
                {
                    userId: userId,
                    displayName: displayName,
                    username: null,
                    bio: '',
                    avatarUrl: null,
                    theme: 'dark',
                    defaultView: 'grid',
                    emailNotifications: true,
                    publicProfile: false,
                    showRatings: true,
                    showLists: false,
                    favoriteGenres: '[]',
                    preferredLanguage: 'en',
                    adultContent: false,
                    totalRatings: 0,
                    averageRating: 0.0,
                    joinedDate: new Date().toISOString(),
                    lastActiveDate: new Date().toISOString()
                }
            );
        } catch (error) {
            console.error('Error creating user profile:', error);
            // Don't throw error here to avoid blocking user registration
        }
    }

    // Sign in user - Fixed method name
    async login({ email, password }) {
        try {
            // Use the correct method name for creating email session
            return await account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }

    // Get current user
    async getCurrentUser() {
        try {
            return await account.get();
        } catch (error) {
            // Handle specific Appwrite error cases
            if (error.code === 401 || 
                error.type === 'general_unauthorized_scope' || 
                error.message?.includes('missing scope')) {
                // User is not logged in - this is normal, return null silently
                return null;
            }
            // For other errors, log them
            console.error('Unexpected error getting current user:', error);
            return null;
        }
    }

    // Sign out user
    async logout() {
        try {
            return await account.deleteSessions();
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    }

    // Update user password
    async updatePassword(newPassword, oldPassword) {
        try {
            return await account.updatePassword(newPassword, oldPassword);
        } catch (error) {
            console.error('Error updating password:', error);
            throw error;
        }
    }

    // Send password recovery email
    async sendPasswordRecovery(email) {
        try {
            return await account.createRecovery(
                email,
                `${window.location.origin}/reset-password`
            );
        } catch (error) {
            console.error('Error sending password recovery:', error);
            throw error;
        }
    }

    // Complete password recovery
    async completePasswordRecovery(userId, secret, newPassword) {
        try {
            return await account.updateRecovery(userId, secret, newPassword);
        } catch (error) {
            console.error('Error completing password recovery:', error);
            throw error;
        }
    }

    // Update user preferences/profile
    async updatePreferences(prefs) {
        try {
            return await account.updatePrefs(prefs);
        } catch (error) {
            console.error('Error updating preferences:', error);
            throw error;
        }
    }

    // Get user preferences
    async getPreferences() {
        try {
            const user = await this.getCurrentUser();
            return user?.prefs || {};
        } catch (error) {
            return {};
        }
    }
}

export default new AuthService();
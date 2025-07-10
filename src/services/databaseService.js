import { databases, Query, appwriteConfig } from './appwrite';
import { ID } from 'appwrite';

class DatabaseService {
    // Create a new rating
    async createRating({ userId, mediaId, mediaType, rating, review, status }) {
        try {
            return await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.ratingsCollectionId,
                ID.unique(),
                {
                    userId,
                    mediaId,
                    mediaType,
                    rating,
                    review,
                    status,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            );
        } catch (error) {
            console.error('Error creating rating:', error);
            throw error;
        }
    }

    // Update an existing rating
    async updateRating(documentId, { rating, review, status }) {
        try {
            return await databases.updateDocument(
                appwriteConfig.databaseId,
                appwriteConfig.ratingsCollectionId,
                documentId,
                {
                    rating,
                    review,
                    status,
                    updatedAt: new Date().toISOString()
                }
            );
        } catch (error) {
            console.error('Error updating rating:', error);
            throw error;
        }
    }

    // Get user's rating for a specific media
    async getUserRating(userId, mediaId, mediaType) {
        try {
            const response = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.ratingsCollectionId,
                [
                    Query.equal('userId', userId),
                    Query.equal('mediaId', mediaId),
                    Query.equal('mediaType', mediaType)
                ]
            );
            return response.documents.length > 0 ? response.documents[0] : null;
        } catch (error) {
            console.error('Error getting user rating:', error);
            throw error;
        }
    }

    // Get all ratings by user
    async getUserRatings(userId, mediaType = null, limit = 50, offset = 0) {
        try {
            const queries = [
                Query.equal('userId', userId),
                Query.limit(limit),
                Query.offset(offset),
                Query.orderDesc('updatedAt')
            ];

            if (mediaType) {
                queries.push(Query.equal('mediaType', mediaType));
            }

            const response = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.ratingsCollectionId,
                queries
            );
            return response;
        } catch (error) {
            console.error('Error getting user ratings:', error);
            throw error;
        }
    }

    // Delete a rating
    async deleteRating(documentId) {
        try {
            return await databases.deleteDocument(
                appwriteConfig.databaseId,
                appwriteConfig.ratingsCollectionId,
                documentId
            );
        } catch (error) {
            console.error('Error deleting rating:', error);
            throw error;
        }
    }

    // Get ratings by media type with pagination
    async getRatingsByMediaType(mediaType, limit = 20, offset = 0) {
        try {
            const response = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.ratingsCollectionId,
                [
                    Query.equal('mediaType', mediaType),
                    Query.limit(limit),
                    Query.offset(offset),
                    Query.orderDesc('rating')
                ]
            );
            return response;
        } catch (error) {
            console.error('Error getting ratings by media type:', error);
            throw error;
        }
    }

    // Search ratings by review content
    async searchRatings(searchTerm, userId = null, limit = 20) {
        try {
            const queries = [
                Query.search('review', searchTerm),
                Query.limit(limit),
                Query.orderDesc('updatedAt')
            ];

            if (userId) {
                queries.push(Query.equal('userId', userId));
            }

            const response = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.ratingsCollectionId,
                queries
            );
            return response;
        } catch (error) {
            console.error('Error searching ratings:', error);
            throw error;
        }
    }
}

export default new DatabaseService();
import databaseService from './databaseService';
import authService from './authService';

class RatingService {
    // Normalize rating to 10-point scale with one decimal precision
    normalizeRating(rating, maxScale = 10) {
        if (rating < 0 || rating > maxScale) {
            throw new Error(`Rating must be between 0 and ${maxScale}`);
        }
        
        // Ensure one decimal place precision
        return Math.round(rating * 10) / 10;
    }

    // Add or update a rating
    async addRating(mediaId, mediaType, rating, review = '', status = 'completed') {
        try {
            const user = await authService.getCurrentUser();
            if (!user) {
                throw new Error('User must be authenticated to add ratings');
            }

            const normalizedRating = this.normalizeRating(rating);
            
            // Check if rating already exists
            const existingRating = await databaseService.getUserRating(
                user.$id, 
                mediaId, 
                mediaType
            );

            if (existingRating) {
                // Update existing rating
                return await databaseService.updateRating(existingRating.$id, {
                    rating: normalizedRating,
                    review,
                    status
                });
            } else {
                // Create new rating
                return await databaseService.createRating({
                    userId: user.$id,
                    mediaId,
                    mediaType,
                    rating: normalizedRating,
                    review,
                    status
                });
            }
        } catch (error) {
            console.error('Error adding rating:', error);
            throw error;
        }
    }

    // Get user's rating for specific media
    async getUserRating(mediaId, mediaType) {
        try {
            const user = await authService.getCurrentUser();
            if (!user) return null;

            return await databaseService.getUserRating(user.$id, mediaId, mediaType);
        } catch (error) {
            console.error('Error getting user rating:', error);
            return null;
        }
    }

    // Get all user ratings by media type
    async getUserRatingsByType(mediaType, limit = 50, offset = 0) {
        try {
            const user = await authService.getCurrentUser();
            if (!user) return { documents: [], total: 0 };

            return await databaseService.getUserRatings(user.$id, mediaType, limit, offset);
        } catch (error) {
            console.error('Error getting user ratings by type:', error);
            return { documents: [], total: 0 };
        }
    }

    // Remove a rating
    async removeRating(mediaId, mediaType) {
        try {
            const user = await authService.getCurrentUser();
            if (!user) {
                throw new Error('User must be authenticated to remove ratings');
            }

            const existingRating = await databaseService.getUserRating(
                user.$id, 
                mediaId, 
                mediaType
            );

            if (existingRating) {
                return await databaseService.deleteRating(existingRating.$id);
            }
        } catch (error) {
            console.error('Error removing rating:', error);
            throw error;
        }
    }

    // Get average rating for media
    async getAverageRating(mediaId, mediaType) {
        // This would require a more complex query or aggregation
        // For now, we'll implement a basic version
        try {
            // This is a simplified version - in a real app, you'd want to 
            // implement proper aggregation on the backend
            console.log('Average rating calculation not implemented yet');
            return 0;
        } catch (error) {
            console.error('Error calculating average rating:', error);
            return 0;
        }
    }

    // Get rating statistics for user
    async getUserRatingStats() {
        try {
            const user = await authService.getCurrentUser();
            if (!user) return null;

            const [animeRatings, movieRatings, tvRatings, bookRatings] = await Promise.all([
                databaseService.getUserRatings(user.$id, 'anime'),
                databaseService.getUserRatings(user.$id, 'movie'),
                databaseService.getUserRatings(user.$id, 'tv'),
                databaseService.getUserRatings(user.$id, 'book')
            ]);

            return {
                anime: {
                    count: animeRatings.total,
                    average: this.calculateAverageFromRatings(animeRatings.documents)
                },
                movies: {
                    count: movieRatings.total,
                    average: this.calculateAverageFromRatings(movieRatings.documents)
                },
                tv: {
                    count: tvRatings.total,
                    average: this.calculateAverageFromRatings(tvRatings.documents)
                },
                books: {
                    count: bookRatings.total,
                    average: this.calculateAverageFromRatings(bookRatings.documents)
                }
            };
        } catch (error) {
            console.error('Error getting user rating stats:', error);
            return null;
        }
    }

    // Helper method to calculate average from ratings array
    calculateAverageFromRatings(ratings) {
        if (!ratings || ratings.length === 0) return 0;
        
        const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0);
        return Math.round((sum / ratings.length) * 10) / 10;
    }
}

export default new RatingService();
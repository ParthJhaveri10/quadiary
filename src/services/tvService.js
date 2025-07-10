import axios from 'axios';

// Replace with actual TMDB API endpoint and key
const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'YOUR_TMDB_API_KEY';

// Search for TV shows
export const searchTVShows = async (query, page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/search/tv`, {
      params: {
        api_key: API_KEY,
        query,
        page,
        include_adult: false,
        language: 'en-US'
      }
    });
    
    return {
      results: response.data.results,
      page: response.data.page,
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results
    };
  } catch (error) {
    console.error('Error searching TV shows:', error);
    throw error;
  }
};

// Get TV show details by ID
export const getTVShowById = async (tvId) => {
  try {
    const tvShowDetailsPromise = axios.get(`${API_URL}/tv/${tvId}`, {
      params: {
        api_key: API_KEY,
        append_to_response: 'credits,videos,images,similar,recommendations,content_ratings,season/1',
        language: 'en-US'
      }
    });

    const response = await tvShowDetailsPromise;
    return response.data;
  } catch (error) {
    console.error('Error fetching TV show details:', error);
    throw error;
  }
};

// Get popular TV shows
export const getPopularTVShows = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/tv/popular`, {
      params: {
        api_key: API_KEY,
        page,
        language: 'en-US'
      }
    });
    
    return {
      results: response.data.results,
      page: response.data.page,
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results
    };
  } catch (error) {
    console.error('Error fetching popular TV shows:', error);
    throw error;
  }
};

// Get top-rated TV shows
export const getTopRatedTVShows = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/tv/top_rated`, {
      params: {
        api_key: API_KEY,
        page,
        language: 'en-US'
      }
    });
    
    return {
      results: response.data.results,
      page: response.data.page,
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results
    };
  } catch (error) {
    console.error('Error fetching top-rated TV shows:', error);
    throw error;
  }
};

// Discover TV shows by genre
export const discoverTVShowsByGenre = async (genreId, page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/discover/tv`, {
      params: {
        api_key: API_KEY,
        with_genres: genreId,
        sort_by: 'popularity.desc',
        page,
        include_adult: false,
        language: 'en-US'
      }
    });
    
    return {
      results: response.data.results,
      page: response.data.page,
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results
    };
  } catch (error) {
    console.error('Error discovering TV shows by genre:', error);
    throw error;
  }
};

// Get TV show season details
export const getTVShowSeasonDetails = async (tvId, seasonNumber) => {
  try {
    const response = await axios.get(`${API_URL}/tv/${tvId}/season/${seasonNumber}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching TV show season details:', error);
    throw error;
  }
};

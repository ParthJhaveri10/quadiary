import axios from 'axios';

// Replace with actual TMDB API endpoint and key
const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'YOUR_TMDB_API_KEY';

// Search for movies
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/search/movie`, {
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
    console.error('Error searching movies:', error);
    throw error;
  }
};

// Get movie details by ID
export const getMovieById = async (movieId) => {
  try {
    const movieDetailsPromise = axios.get(`${API_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        append_to_response: 'credits,videos,images,similar,recommendations',
        language: 'en-US'
      }
    });

    const response = await movieDetailsPromise;
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

// Get popular movies
export const getPopularMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/movie/popular`, {
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
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

// Get top-rated movies
export const getTopRatedMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/movie/top_rated`, {
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
    console.error('Error fetching top-rated movies:', error);
    throw error;
  }
};

// Discover movies by genre
export const discoverMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/discover/movie`, {
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
    console.error('Error discovering movies by genre:', error);
    throw error;
  }
};

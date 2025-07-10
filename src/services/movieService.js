import axios from 'axios';

// Replace with actual TMDB API endpoint and key
const API_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = import.meta.env.VITE_TMDB_API;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Create axios instance with bearer token authentication
const tmdbAPI = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Search for movies
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await tmdbAPI.get('/search/movie', {
      params: {
        query,
        page,
        include_adult: false,
        language: 'en-US'
      }
    });
    
    return {
      results: response.data.results.map(movie => ({
        ...movie,
        poster_path: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
        backdrop_path: movie.backdrop_path ? `${IMAGE_BASE_URL}${movie.backdrop_path}` : null
      })),
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
    const response = await tmdbAPI.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'credits,videos,images,similar,recommendations',
        language: 'en-US'
      }
    });

    const movie = response.data;
    return {
      ...movie,
      poster_path: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
      backdrop_path: movie.backdrop_path ? `${IMAGE_BASE_URL}${movie.backdrop_path}` : null
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

// Get popular movies
export const getPopularMovies = async (page = 1) => {
  try {
    const response = await tmdbAPI.get('/movie/popular', {
      params: {
        page,
        language: 'en-US'
      }
    });
    
    return {
      results: response.data.results.map(movie => ({
        ...movie,
        poster_path: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
        backdrop_path: movie.backdrop_path ? `${IMAGE_BASE_URL}${movie.backdrop_path}` : null
      })),
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
    const response = await tmdbAPI.get('/movie/top_rated', {
      params: {
        page,
        language: 'en-US'
      }
    });
    
    return {
      results: response.data.results.map(movie => ({
        ...movie,
        poster_path: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
        backdrop_path: movie.backdrop_path ? `${IMAGE_BASE_URL}${movie.backdrop_path}` : null
      })),
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
    const response = await tmdbAPI.get('/discover/movie', {
      params: {
        with_genres: genreId,
        sort_by: 'popularity.desc',
        page,
        include_adult: false,
        language: 'en-US'
      }
    });
    
    return {
      results: response.data.results.map(movie => ({
        ...movie,
        poster_path: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
        backdrop_path: movie.backdrop_path ? `${IMAGE_BASE_URL}${movie.backdrop_path}` : null
      })),
      page: response.data.page,
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results
    };
  } catch (error) {
    console.error('Error discovering movies by genre:', error);
    throw error;
  }
};

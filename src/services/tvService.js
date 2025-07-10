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

// Search for TV shows
export const searchTVShows = async (query, page = 1) => {
  try {
    const response = await tmdbAPI.get('/search/tv', {
      params: {
        query,
        page,
        include_adult: false,
        language: 'en-US'
      }
    });
    
    return {
      results: response.data.results.map(show => ({
        ...show,
        poster_path: show.poster_path ? `${IMAGE_BASE_URL}${show.poster_path}` : null,
        backdrop_path: show.backdrop_path ? `${IMAGE_BASE_URL}${show.backdrop_path}` : null
      })),
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
    const response = await tmdbAPI.get(`/tv/${tvId}`, {
      params: {
        append_to_response: 'credits,videos,images,similar,recommendations,content_ratings,season/1',
        language: 'en-US'
      }
    });

    const show = response.data;
    return {
      ...show,
      poster_path: show.poster_path ? `${IMAGE_BASE_URL}${show.poster_path}` : null,
      backdrop_path: show.backdrop_path ? `${IMAGE_BASE_URL}${show.backdrop_path}` : null
    };
  } catch (error) {
    console.error('Error fetching TV show details:', error);
    throw error;
  }
};

// Get popular TV shows
export const getPopularTVShows = async (page = 1) => {
  try {
    const response = await tmdbAPI.get('/tv/popular', {
      params: {
        page,
        language: 'en-US'
      }
    });
    
    return {
      results: response.data.results.map(show => ({
        ...show,
        poster_path: show.poster_path ? `${IMAGE_BASE_URL}${show.poster_path}` : null,
        backdrop_path: show.backdrop_path ? `${IMAGE_BASE_URL}${show.backdrop_path}` : null
      })),
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
    const response = await tmdbAPI.get('/tv/top_rated', {
      params: {
        page,
        language: 'en-US'
      }
    });
    
    return {
      results: response.data.results.map(show => ({
        ...show,
        poster_path: show.poster_path ? `${IMAGE_BASE_URL}${show.poster_path}` : null,
        backdrop_path: show.backdrop_path ? `${IMAGE_BASE_URL}${show.backdrop_path}` : null
      })),
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
    const response = await tmdbAPI.get('/discover/tv', {
      params: {
        with_genres: genreId,
        sort_by: 'popularity.desc',
        page,
        include_adult: false,
        language: 'en-US'
      }
    });
    
    return {
      results: response.data.results.map(show => ({
        ...show,
        poster_path: show.poster_path ? `${IMAGE_BASE_URL}${show.poster_path}` : null,
        backdrop_path: show.backdrop_path ? `${IMAGE_BASE_URL}${show.backdrop_path}` : null
      })),
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
    const response = await tmdbAPI.get(`/tv/${tvId}/season/${seasonNumber}`, {
      params: {
        language: 'en-US'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching TV show season details:', error);
    throw error;
  }
};

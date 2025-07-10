import axios from 'axios';

// Replace with actual Google Books API endpoint
const API_URL = 'https://www.googleapis.com/books/v1';
const API_KEY = 'YOUR_GOOGLE_BOOKS_API_KEY'; // Optional for Google Books

// Search for books
export const searchBooks = async (query, page = 0, maxResults = 10) => {
  try {
    const startIndex = page * maxResults;
    const response = await axios.get(`${API_URL}/volumes`, {
      params: {
        q: query,
        startIndex,
        maxResults,
        key: API_KEY
      }
    });
    
    return {
      results: response.data.items || [],
      totalItems: response.data.totalItems || 0,
      page,
    };
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
};

// Get book details by ID
export const getBookById = async (bookId) => {
  try {
    const response = await axios.get(`${API_URL}/volumes/${bookId}`, {
      params: {
        key: API_KEY
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
};

// Search books by category/genre
export const getBooksByCategory = async (category, page = 0, maxResults = 10) => {
  try {
    const startIndex = page * maxResults;
    const response = await axios.get(`${API_URL}/volumes`, {
      params: {
        q: `subject:${category}`,
        startIndex,
        maxResults,
        key: API_KEY
      }
    });
    
    return {
      results: response.data.items || [],
      totalItems: response.data.totalItems || 0,
      page,
    };
  } catch (error) {
    console.error('Error fetching books by category:', error);
    throw error;
  }
};

// Get new/recent releases
export const getNewReleases = async (page = 0, maxResults = 10) => {
  const currentYear = new Date().getFullYear();
  
  try {
    const startIndex = page * maxResults;
    const response = await axios.get(`${API_URL}/volumes`, {
      params: {
        q: `date:${currentYear}`,
        orderBy: 'newest',
        startIndex,
        maxResults,
        key: API_KEY
      }
    });
    
    return {
      results: response.data.items || [],
      totalItems: response.data.totalItems || 0,
      page,
    };
  } catch (error) {
    console.error('Error fetching new releases:', error);
    throw error;
  }
};

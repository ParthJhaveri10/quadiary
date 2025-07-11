import axios from 'axios';

// Google Books API configuration
const API_URL = 'https://www.googleapis.com/books/v1';
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

// Helper function to check if API key is available
const hasValidApiKey = () => {
  const isValid = API_KEY && API_KEY !== 'YOUR_GOOGLE_BOOKS_API_KEY' && API_KEY.length > 10;
  return isValid;
};

// Create axios instance with better error handling
const booksApi = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 second timeout
});

// Search for books
export const searchBooks = async (query, page = 0, maxResults = 20) => {
  try {
    if (!query.trim()) {
      return {
        results: [],
        page: 0,
        totalPages: 0,
        totalResults: 0
      };
    }

    const startIndex = page * maxResults;
    const params = {
      q: query,
      startIndex,
      maxResults
    };

    // Only add API key if it's available and valid
    if (hasValidApiKey()) {
      params.key = API_KEY;
    }

    const response = await booksApi.get('/volumes', { params });
    
    // Transform the data to match expected format
    const books = response.data.items || [];
    return {
      results: books.map(book => ({
        id: book.id,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        author: book.volumeInfo.authors?.join(', '),
        cover_image: book.volumeInfo.imageLinks?.thumbnail,
        thumbnail: book.volumeInfo.imageLinks?.thumbnail,
        description: book.volumeInfo.description,
        synopsis: book.volumeInfo.description,
        publishedDate: book.volumeInfo.publishedDate,
        year: book.volumeInfo.publishedDate?.substring(0, 4),
        pageCount: book.volumeInfo.pageCount,
        categories: book.volumeInfo.categories,
        rating: book.volumeInfo.averageRating,
        averageRating: book.volumeInfo.averageRating
      })),
      page,
      totalPages: Math.ceil((response.data.totalItems || 0) / maxResults),
      totalResults: response.data.totalItems || 0
    };
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
};

// Get book details by ID
export const getBookById = async (bookId) => {
  try {
    const params = {};
    
    // Only add API key if it's available and valid
    if (hasValidApiKey()) {
      params.key = API_KEY;
    }

    const response = await booksApi.get(`/volumes/${bookId}`, { params });
    
    const book = response.data;
    
    // Transform to consistent format
    return {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      author: book.volumeInfo.authors?.join(', '),
      cover_image: book.volumeInfo.imageLinks?.large || book.volumeInfo.imageLinks?.thumbnail,
      thumbnail: book.volumeInfo.imageLinks?.thumbnail,
      description: book.volumeInfo.description,
      synopsis: book.volumeInfo.description,
      publishedDate: book.volumeInfo.publishedDate,
      year: book.volumeInfo.publishedDate?.substring(0, 4),
      pageCount: book.volumeInfo.pageCount,
      categories: book.volumeInfo.categories,
      rating: book.volumeInfo.averageRating,
      averageRating: book.volumeInfo.averageRating,
      publisher: book.volumeInfo.publisher,
      language: book.volumeInfo.language
    };
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
};

// Search books by category/genre
export const getBooksByCategory = async (category, page = 0, maxResults = 20) => {
  try {
    const startIndex = page * maxResults;
    const params = {
      q: `subject:${category}`,
      orderBy: 'relevance',
      startIndex,
      maxResults
    };

    // Only add API key if it's available and valid
    if (hasValidApiKey()) {
      params.key = API_KEY;
    }

    const response = await booksApi.get('/volumes', { params });
    
    // Transform the data to match expected format
    const books = response.data.items || [];
    return {
      results: books.map(book => ({
        id: book.id,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        author: book.volumeInfo.authors?.join(', '),
        cover_image: book.volumeInfo.imageLinks?.thumbnail,
        thumbnail: book.volumeInfo.imageLinks?.thumbnail,
        description: book.volumeInfo.description,
        synopsis: book.volumeInfo.description,
        publishedDate: book.volumeInfo.publishedDate,
        year: book.volumeInfo.publishedDate?.substring(0, 4),
        pageCount: book.volumeInfo.pageCount,
        categories: book.volumeInfo.categories,
        rating: book.volumeInfo.averageRating,
        averageRating: book.volumeInfo.averageRating
      })),
      page,
      totalPages: Math.ceil((response.data.totalItems || 0) / maxResults),
      totalResults: response.data.totalItems || 0
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
    const params = {
      q: `date:${currentYear}`,
      orderBy: 'newest',
      startIndex,
      maxResults
    };

    // Only add API key if it's available and valid
    if (hasValidApiKey()) {
      params.key = API_KEY;
    }

    const response = await booksApi.get('/volumes', { params });
    
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

// Get popular books
export const getPopularBooks = async (page = 0, maxResults = 20) => {
  try {
    const startIndex = page * maxResults;
    const params = {
      q: 'bestseller OR popular OR award',
      orderBy: 'relevance',
      startIndex,
      maxResults
    };

    // Only add API key if it's available and valid
    if (hasValidApiKey()) {
      params.key = API_KEY;
    }

    const response = await booksApi.get('/volumes', { params });
    
    // Transform the data to match expected format
    const books = response.data.items || [];
    return {
      results: books.map(book => ({
        id: book.id,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        author: book.volumeInfo.authors?.join(', '),
        cover_image: book.volumeInfo.imageLinks?.thumbnail,
        thumbnail: book.volumeInfo.imageLinks?.thumbnail,
        description: book.volumeInfo.description,
        synopsis: book.volumeInfo.description,
        publishedDate: book.volumeInfo.publishedDate,
        year: book.volumeInfo.publishedDate?.substring(0, 4),
        pageCount: book.volumeInfo.pageCount,
        categories: book.volumeInfo.categories,
        rating: book.volumeInfo.averageRating,
        averageRating: book.volumeInfo.averageRating
      })),
      page,
      totalPages: Math.ceil((response.data.totalItems || 0) / maxResults),
      totalResults: response.data.totalItems || 0
    };
  } catch (error) {
    console.error('Error fetching popular books:', error);
    throw error;
  }
};

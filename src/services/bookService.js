import axios from 'axios';

// Replace with actual Google Books API endpoint
const API_URL = 'https://www.googleapis.com/books/v1';
const API_KEY = 'YOUR_GOOGLE_BOOKS_API_KEY'; // Optional for Google Books

// Search for books
export const searchBooks = async (query, page = 0, maxResults = 20) => {
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
    const response = await axios.get(`${API_URL}/volumes/${bookId}`, {
      params: {
        key: API_KEY
      }
    });
    
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
    const response = await axios.get(`${API_URL}/volumes`, {
      params: {
        q: `subject:${category}`,
        orderBy: 'relevance',
        startIndex,
        maxResults,
        key: API_KEY
      }
    });
    
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

// Get popular books
export const getPopularBooks = async (page = 0, maxResults = 20) => {
  try {
    const startIndex = page * maxResults;
    const response = await axios.get(`${API_URL}/volumes`, {
      params: {
        q: 'bestseller OR popular OR award',
        orderBy: 'relevance',
        startIndex,
        maxResults,
        key: API_KEY
      }
    });
    
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

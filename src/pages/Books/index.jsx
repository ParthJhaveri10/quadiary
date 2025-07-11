import React, { useState, useEffect } from 'react';
import { themeStyles } from '../../styles/theme';
import { 
  searchBooks, 
  getPopularBooks, 
  getBookById,
  getBooksByCategory 
} from '../../services/bookService';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import SearchBar from '../../components/SearchBar';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [fictionBooks, setFictionBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState('popular');
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [popular, fiction] = await Promise.all([
        getPopularBooks(1),
        getBooksByCategory('fiction', 1)
      ]);
      
      setPopularBooks(popular.results.slice(0, 12));
      setFictionBooks(fiction.results.slice(0, 12));
      setBooks(popular.results.slice(0, 12));
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setActiveTab('popular');
      return;
    }

    try {
      setLoading(true);
      const results = await searchBooks(query, 1);
      setSearchResults(results.results);
      setActiveTab('search');
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = async (bookId) => {
    try {
      const bookDetails = await getBookById(bookId);
      setSelectedBook(bookDetails);
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  const getCurrentBooks = () => {
    switch (activeTab) {
      case 'popular':
        return popularBooks;
      case 'fiction':
        return fictionBooks;
      case 'search':
        return searchResults;
      default:
        return books;
    }
  };

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
        isActive
          ? `bg-gradient-to-r ${themeStyles.gradients.media.book} ${themeStyles.text.primary} ${themeStyles.effects.shadow.md}`
          : `${themeStyles.text.secondary} hover:${themeStyles.text.primary} hover:bg-white/10`
      }`}
    >
      {label}
    </button>
  );

  const BookCard = ({ book }) => (
    <div 
      className={`${themeStyles.mediaCard.container} ${themeStyles.interactive.hover}`}
      onClick={() => handleBookClick(book.id)}
    >
      <img
        src={book.cover_image || book.thumbnail || 'https://placehold.co/300x450?text=No+Cover'}
        alt={book.title}
        className={themeStyles.mediaCard.image}
      />
      <div className={themeStyles.mediaCard.overlay}>
        <h4 className={themeStyles.mediaCard.title}>{book.title}</h4>
        <p className="text-xs text-slate-300 mb-1">
          {book.authors?.join(', ') || book.author || 'Unknown Author'}
        </p>
        <div className={themeStyles.mediaCard.rating}>
          <span className={themeStyles.mediaCard.star}>★</span>
          <span className={themeStyles.mediaCard.star}>
            {book.rating?.toFixed(1) || book.averageRating?.toFixed(1) || 'N/A'}
          </span>
          <span className={themeStyles.mediaCard.score}>/5</span>
        </div>
        <p className="text-xs text-slate-300 mt-1">
          {book.publishedDate || book.year || 'Unknown Year'}
        </p>
      </div>
    </div>
  );

  return (
    <div className={themeStyles.backgrounds.page}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={themeStyles.backgrounds.decorative.blob1}></div>
        <div className={themeStyles.backgrounds.decorative.blob2}></div>
        <div className={themeStyles.backgrounds.decorative.blob3}></div>
      </div>

      <div className={`${themeStyles.layout.container} relative z-10 pt-24`}>
        {/* Header */}
        <div className={`${themeStyles.glass.card} p-8 mb-8`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className={`text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${themeStyles.gradients.title} mb-4`}>
                Books
              </h1>
              <p className={`${themeStyles.text.secondary} text-lg max-w-2xl`}>
                Track your reading progress, rate books, and discover your next great read.
              </p>
            </div>
            
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-6">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search for books..."
              className="w-full"
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className={`${themeStyles.glass.panel} p-6 mb-8`}>
          <div className="flex flex-wrap gap-4">
            <TabButton
              id="popular"
              label="Popular"
              isActive={activeTab === 'popular'}
              onClick={() => {
                setActiveTab('popular');
                setBooks(popularBooks);
              }}
            />
            <TabButton
              id="fiction"
              label="Fiction"
              isActive={activeTab === 'fiction'}
              onClick={() => {
                setActiveTab('fiction');
                setBooks(fictionBooks);
              }}
            />
            {searchResults.length > 0 && (
              <TabButton
                id="search"
                label={`Search Results (${searchResults.length})`}
                isActive={activeTab === 'search'}
                onClick={() => setActiveTab('search')}
              />
            )}
          </div>
        </div>

        {/* Books Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : (
          <div className={themeStyles.layout.grid.cols6}>
            {getCurrentBooks().map((book, index) => (
              <BookCard key={`${book.id}-${index}`} book={book} />
            ))}
          </div>
        )}

        {getCurrentBooks().length === 0 && !loading && (
          <div className={`${themeStyles.glass.card} p-12 text-center`}>
            <div className="w-24 h-24 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className={`text-2xl font-bold ${themeStyles.text.primary} mb-2`}>No books found</h3>
            <p className={themeStyles.text.secondary}>Try searching for something else or check your connection.</p>
          </div>
        )}
      </div>

      {/* Book Details Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className={`${themeStyles.glass.modal} max-w-4xl w-full max-h-[90vh] overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-xl bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="flex flex-col md:flex-row gap-6 p-6">
                <img
                  src={selectedBook.cover_image || selectedBook.thumbnail || 'https://placehold.co/300x450?text=No+Cover'}
                  alt={selectedBook.title}
                  className="w-full md:w-80 rounded-xl"
                />
                
                <div className="flex-1">
                  <h2 className={`text-3xl font-bold ${themeStyles.modalText.primary} mb-2`}>
                    {selectedBook.title}
                  </h2>
                  <p className={`${themeStyles.modalText.secondary} text-lg mb-4`}>
                    by {selectedBook.authors?.join(', ') || selectedBook.author || 'Unknown Author'}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center">
                      <span className="text-[#66FCF1] text-xl font-bold">★</span>
                      <span className={`${themeStyles.modalText.primary} text-xl font-bold ml-1`}>
                        {selectedBook.rating?.toFixed(1) || selectedBook.averageRating?.toFixed(1) || 'N/A'}
                      </span>
                      <span className={`${themeStyles.modalText.secondary} ml-1`}>/5</span>
                    </div>
                    {selectedBook.pageCount && (
                      <div className={`px-3 py-1 bg-[#1F2833]/20 rounded-full ${themeStyles.modalText.tertiary} text-sm`}>
                        {selectedBook.pageCount} pages
                      </div>
                    )}
                    <div className={`px-3 py-1 bg-[#1F2833]/20 rounded-full ${themeStyles.modalText.tertiary} text-sm`}>
                      {selectedBook.publishedDate || selectedBook.year || 'Unknown Year'}
                    </div>
                  </div>
                  
                  <p className={`${themeStyles.modalText.secondary} mb-6 leading-relaxed`}>
                    {selectedBook.description || selectedBook.synopsis || 'No description available.'}
                  </p>
                  
                  {selectedBook.categories && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedBook.categories.map((category, index) => (
                        <span 
                          key={index}
                          className={`px-3 py-1 bg-gradient-to-r ${themeStyles.gradients.media.book} ${themeStyles.modalText.primary} rounded-full text-sm font-medium`}
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex gap-4">
                    <button className={themeStyles.buttons.primary}>
                      Add to Reading List
                    </button>
                    <button className={themeStyles.buttons.secondary}>
                      Rate Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;

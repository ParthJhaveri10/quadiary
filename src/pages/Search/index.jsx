import React, { useState } from 'react';
import { themeStyles } from '../../styles/theme';
import { searchMovies } from '../../services/movieService';
import { searchTVShows } from '../../services/tvService';
import { searchAnime } from '../../services/animeService';
import { searchBooks } from '../../services/bookService';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import SearchBar from '../../components/SearchBar';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({
    movies: [],
    tv: [],
    anime: [],
    books: []
  });
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (searchQuery) => {
    // Handle empty query (clear results)
    if (!searchQuery.trim()) {
      setQuery('');
      setResults({
        movies: [],
        tv: [],
        anime: [],
        books: []
      });
      setHasSearched(false);
      setLoading(false);
      return;
    }
    
    setQuery(searchQuery);
    setLoading(true);
    setHasSearched(true);

    try {
      const [moviesRes, tvRes, animeRes, booksRes] = await Promise.all([
        searchMovies(searchQuery, 1).catch(() => ({ results: [] })),
        searchTVShows(searchQuery, 1).catch(() => ({ results: [] })),
        searchAnime(searchQuery, 1).catch(() => ({ results: [] })),
        searchBooks(searchQuery, 1).catch(() => ({ results: [] }))
      ]);

      setResults({
        movies: moviesRes.results.slice(0, 8),
        tv: tvRes.results.slice(0, 8),
        anime: animeRes.results.slice(0, 8),
        books: booksRes.results.slice(0, 8)
      });
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryResults = () => {
    switch (activeCategory) {
      case 'movies':
        return results.movies;
      case 'tv':
        return results.tv;
      case 'anime':
        return results.anime;
      case 'books':
        return results.books;
      case 'all':
      default:
        return [
          ...results.movies.map(item => ({ ...item, type: 'movie' })),
          ...results.tv.map(item => ({ ...item, type: 'tv' })),
          ...results.anime.map(item => ({ ...item, type: 'anime' })),
          ...results.books.map(item => ({ ...item, type: 'book' }))
        ];
    }
  };

  const getTotalResults = () => {
    return results.movies.length + results.tv.length + results.anime.length + results.books.length;
  };

  const CategoryButton = ({ id, label, count, gradient, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
        isActive
          ? `bg-gradient-to-r ${gradient} ${themeStyles.text.primary} ${themeStyles.effects.shadow.md}`
          : `${themeStyles.text.secondary} hover:${themeStyles.text.primary} hover:bg-white/10`
      }`}
    >
      {label}
      {count > 0 && (
        <span className={`px-2 py-0.5 rounded-full text-xs ${
          isActive ? 'bg-white/20' : 'bg-white/10'
        }`}>
          {count}
        </span>
      )}
    </button>
  );

  const MediaCard = ({ item }) => {
    const getItemData = () => {
      switch (item.type) {
        case 'movie':
          return {
            title: item.title,
            subtitle: item.release_date ? new Date(item.release_date).getFullYear() : 'TBA',
            image: item.poster_path ? `https://image.tmdb.org/t/mdb/w500${item.poster_path}` : null,
            rating: item.vote_average?.toFixed(1),
            gradient: themeStyles.gradients.media.movie
          };
        case 'tv':
          return {
            title: item.name,
            subtitle: item.first_air_date ? new Date(item.first_air_date).getFullYear() : 'TBA',
            image: item.poster_path ? `https://image.tmdb.org/t/mdb/w500${item.poster_path}` : null,
            rating: item.vote_average?.toFixed(1),
            gradient: themeStyles.gradients.media.tv
          };
        case 'anime':
          return {
            title: item.title || item.name,
            subtitle: item.release_date || item.year || item.aired || 'TBA',
            image: item.poster_path || item.image,
            rating: item.vote_average?.toFixed(1) || item.rating?.toFixed(1),
            gradient: themeStyles.gradients.media.anime
          };
        case 'book':
          return {
            title: item.title,
            subtitle: item.authors?.join(', ') || item.author || 'Unknown Author',
            image: item.cover_image || item.thumbnail,
            rating: item.rating?.toFixed(1) || item.averageRating?.toFixed(1),
            gradient: themeStyles.gradients.media.book
          };
        default:
          return {
            title: item.title || item.name,
            subtitle: 'Unknown',
            image: null,
            rating: 'N/A',
            gradient: themeStyles.gradients.primary
          };
      }
    };

    const data = getItemData();

    return (
      <div className={`${themeStyles.mediaCard.container} ${themeStyles.interactive.hover}`}>
        <img
          src={data.image || 'https://placehold.co/300x450?text=No+Image'}
          alt={data.title}
          className={themeStyles.mediaCard.image}
        />
        <div className={themeStyles.mediaCard.overlay}>
          <div className={`absolute top-2 left-2 px-2 py-1 bg-gradient-to-r ${data.gradient} rounded-full text-xs font-bold uppercase`}>
            {item.type}
          </div>
          <h4 className={themeStyles.mediaCard.title}>{data.title}</h4>
          <p className="text-xs text-slate-300 mb-1">{data.subtitle}</p>
          <div className={themeStyles.mediaCard.rating}>
            <span className={themeStyles.mediaCard.star}>★</span>
            <span className={themeStyles.mediaCard.star}>{data.rating}</span>
            <span className={themeStyles.mediaCard.score}>
              {item.type === 'book' ? '/5' : '/10'}
            </span>
          </div>
        </div>
      </div>
    );
  };

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
                Universal Search
              </h1>
              <p className={`${themeStyles.text.secondary} text-lg max-w-2xl`}>
                Search across movies, TV shows, anime, and books all in one place.
              </p>
            </div>
            
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-6">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search for movies, TV shows, anime, or books..."
              className="w-full"
            />
          </div>
        </div>

        {hasSearched && (
          <>
            {/* Category Filters */}
            <div className={`${themeStyles.glass.panel} p-6 mb-8`}>
              <div className="flex flex-wrap gap-4">
                <CategoryButton
                  id="all"
                  label="All Results"
                  count={getTotalResults()}
                  gradient={themeStyles.gradients.primary}
                  isActive={activeCategory === 'all'}
                  onClick={() => setActiveCategory('all')}
                />
                <CategoryButton
                  id="movies"
                  label="Movies"
                  count={results.movies.length}
                  gradient={themeStyles.gradients.media.movie}
                  isActive={activeCategory === 'movies'}
                  onClick={() => setActiveCategory('movies')}
                />
                <CategoryButton
                  id="tv"
                  label="TV Shows"
                  count={results.tv.length}
                  gradient={themeStyles.gradients.media.tv}
                  isActive={activeCategory === 'tv'}
                  onClick={() => setActiveCategory('tv')}
                />
                <CategoryButton
                  id="anime"
                  label="Anime"
                  count={results.anime.length}
                  gradient={themeStyles.gradients.media.anime}
                  isActive={activeCategory === 'anime'}
                  onClick={() => setActiveCategory('anime')}
                />
                <CategoryButton
                  id="books"
                  label="Books"
                  count={results.books.length}
                  gradient={themeStyles.gradients.media.book}
                  isActive={activeCategory === 'books'}
                  onClick={() => setActiveCategory('books')}
                />
              </div>
            </div>

            {/* Search Results */}
            {loading ? (
              <div className="flex justify-center py-20">
                <LoadingSpinner />
              </div>
            ) : (
              <>
                {getCategoryResults().length > 0 ? (
                  <div className={themeStyles.layout.grid.cols6}>
                    {getCategoryResults().map((item, index) => (
                      <MediaCard key={`${item.id}-${item.type || 'unknown'}-${index}`} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className={`${themeStyles.glass.card} p-12 text-center`}>
                    <div className="w-24 h-24 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className={`text-2xl font-bold ${themeStyles.text.primary} mb-2`}>
                      No results found for "{query}"
                    </h3>
                    <p className={themeStyles.text.secondary}>
                      Try searching with different keywords or check your spelling.
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* Initial state */}
        {!hasSearched && (
          <div className={`${themeStyles.glass.card} p-12 text-center`}>
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className={`text-2xl font-bold ${themeStyles.text.primary} mb-4`}>
              Start Your Search
            </h3>
            <p className={`${themeStyles.text.secondary} mb-6 max-w-md mx-auto`}>
              Use the search bar above to find movies, TV shows, anime, and books all in one place.
            </p>
            
            {/* Popular search suggestions */}
            <div className="flex flex-wrap justify-center gap-2">
              {['Avengers', 'Breaking Bad', 'Attack on Titan', 'Harry Potter'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSearch(suggestion)}
                  className={`px-4 py-2 ${themeStyles.text.secondary} hover:${themeStyles.text.primary} bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 text-sm`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;

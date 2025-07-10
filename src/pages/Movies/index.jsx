import React, { useState, useEffect } from 'react';
import { themeStyles } from '../../styles/theme';
import { 
  searchMovies, 
  getPopularMovies, 
  getTopRatedMovies, 
  getMovieById,
  discoverMoviesByGenre 
} from '../../services/movieService';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import SearchBar from '../../components/SearchBar';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState('popular');
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [popular, topRated] = await Promise.all([
        getPopularMovies(1),
        getTopRatedMovies(1)
      ]);
      
      setPopularMovies(popular.results.slice(0, 12));
      setTopRatedMovies(topRated.results.slice(0, 12));
      setMovies(popular.results.slice(0, 12));
    } catch (error) {
      console.error('Error loading movies:', error);
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
      const results = await searchMovies(query, 1);
      setSearchResults(results.results);
      setActiveTab('search');
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = async (movieId) => {
    try {
      const movieDetails = await getMovieById(movieId);
      setSelectedMovie(movieDetails);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const getCurrentMovies = () => {
    switch (activeTab) {
      case 'popular':
        return popularMovies;
      case 'topRated':
        return topRatedMovies;
      case 'search':
        return searchResults;
      default:
        return movies;
    }
  };

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
        isActive
          ? `bg-gradient-to-r ${themeStyles.gradients.media.movie} ${themeStyles.text.primary} ${themeStyles.effects.shadow.md}`
          : `${themeStyles.text.secondary} hover:${themeStyles.text.primary} hover:bg-white/10`
      }`}
    >
      {label}
    </button>
  );

  const MovieCard = ({ movie }) => (
    <div 
      className={`${themeStyles.mediaCard.container} ${themeStyles.interactive.hover}`}
      onClick={() => handleMovieClick(movie.id)}
    >
      <img
        src={movie.poster_path 
          ? `https://image.tmdb.org/t/mdb/w500${movie.poster_path}`
          : 'https://placehold.co/300x450?text=No+Poster'
        }
        alt={movie.title}
        className={themeStyles.mediaCard.image}
      />
      <div className={themeStyles.mediaCard.overlay}>
        <h4 className={themeStyles.mediaCard.title}>{movie.title}</h4>
        <div className={themeStyles.mediaCard.rating}>
          <span className={themeStyles.mediaCard.star}>★</span>
          <span className={themeStyles.mediaCard.star}>{movie.vote_average?.toFixed(1)}</span>
          <span className={themeStyles.mediaCard.score}>/10</span>
        </div>
        <p className="text-xs text-slate-300 mt-1">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA'}
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
                Movies
              </h1>
              <p className={`${themeStyles.text.secondary} text-lg max-w-2xl`}>
                Discover, rate, and track your favorite movies. From blockbusters to indie gems.
              </p>
            </div>
            
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-6">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search for movies..."
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
                setMovies(popularMovies);
              }}
            />
            <TabButton
              id="topRated"
              label="Top Rated"
              isActive={activeTab === 'topRated'}
              onClick={() => {
                setActiveTab('topRated');
                setMovies(topRatedMovies);
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

        {/* Movies Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : (
          <div className={themeStyles.layout.grid.cols6}>
            {getCurrentMovies().map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {getCurrentMovies().length === 0 && !loading && (
          <div className={`${themeStyles.glass.card} p-12 text-center`}>
            <div className="w-24 h-24 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className={`text-2xl font-bold ${themeStyles.text.primary} mb-2`}>No movies found</h3>
            <p className={themeStyles.text.secondary}>Try searching for something else or check your connection.</p>
          </div>
        )}
      </div>

      {/* Movie Details Modal */}
      {selectedMovie && (
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
                  src={selectedMovie.poster_path 
                    ? `https://image.tmdb.org/t/mdb/w500${selectedMovie.poster_path}`
                    : 'https://placehold.co/300x450?text=No+Poster'
                  }
                  alt={selectedMovie.title}
                  className="w-full md:w-80 rounded-xl"
                />
                
                <div className="flex-1">
                  <h2 className={`text-3xl font-bold ${themeStyles.modalText.primary} mb-2`}>
                    {selectedMovie.title}
                  </h2>
                  <p className={`${themeStyles.modalText.secondary} text-lg mb-4`}>
                    {selectedMovie.release_date ? new Date(selectedMovie.release_date).getFullYear() : 'TBA'}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center">
                      <span className="text-[#66FCF1] text-xl font-bold">★</span>
                      <span className={`${themeStyles.modalText.primary} text-xl font-bold ml-1`}>
                        {selectedMovie.vote_average?.toFixed(1)}
                      </span>
                      <span className={`${themeStyles.modalText.secondary} ml-1`}>/10</span>
                    </div>
                    <div className={`px-3 py-1 bg-[#1F2833]/20 rounded-full ${themeStyles.modalText.tertiary} text-sm`}>
                      {selectedMovie.runtime} min
                    </div>
                  </div>
                  
                  <p className={`${themeStyles.modalText.secondary} mb-6 leading-relaxed`}>
                    {selectedMovie.overview}
                  </p>
                  
                  {selectedMovie.genres && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedMovie.genres.map((genre) => (
                        <span 
                          key={genre.id}
                          className={`px-3 py-1 bg-gradient-to-r ${themeStyles.gradients.media.movie} ${themeStyles.modalText.primary} rounded-full text-sm font-medium`}
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex gap-4">
                    <button className={themeStyles.buttons.primary}>
                      Add to Watchlist
                    </button>
                    <button className={themeStyles.buttons.secondary}>
                      Rate Movie
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

export default Movies;

import React, { useState, useEffect } from 'react';
import { themeStyles } from '../../styles/theme';
import { 
  searchTVShows, 
  getPopularTVShows, 
  getTopRatedTVShows, 
  getTVShowById 
} from '../../services/tvService';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import SearchBar from '../../components/SearchBar';

const TVShows = () => {
  const [shows, setShows] = useState([]);
  const [popularShows, setPopularShows] = useState([]);
  const [topRatedShows, setTopRatedShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState('popular');
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [popular, topRated] = await Promise.all([
        getPopularTVShows(1),
        getTopRatedTVShows(1)
      ]);
      
      setPopularShows(popular.results.slice(0, 12));
      setTopRatedShows(topRated.results.slice(0, 12));
      setShows(popular.results.slice(0, 12));
    } catch (error) {
      console.error('Error loading TV shows:', error);
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
      const results = await searchTVShows(query, 1);
      setSearchResults(results.results);
      setActiveTab('search');
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowClick = async (showId) => {
    try {
      const showDetails = await getTVShowById(showId);
      setSelectedShow(showDetails);
    } catch (error) {
      console.error('Error fetching show details:', error);
    }
  };

  const closeModal = () => {
    setSelectedShow(null);
  };

  const getCurrentShows = () => {
    switch (activeTab) {
      case 'popular':
        return popularShows;
      case 'topRated':
        return topRatedShows;
      case 'search':
        return searchResults;
      default:
        return shows;
    }
  };

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
        isActive
          ? `bg-gradient-to-r ${themeStyles.gradients.media.tv} ${themeStyles.text.primary} ${themeStyles.effects.shadow.md}`
          : `${themeStyles.text.secondary} hover:${themeStyles.text.primary} hover:bg-white/10`
      }`}
    >
      {label}
    </button>
  );

  const TVShowCard = ({ show }) => (
    <div 
      className={`${themeStyles.mediaCard.container} ${themeStyles.interactive.hover}`}
      onClick={() => handleShowClick(show.id)}
    >
      <img
        src={show.poster_path 
          ? `https://image.tmdb.org/t/mdb/w500${show.poster_path}`
          : 'https://placehold.co/300x450?text=No+Poster'
        }
        alt={show.name}
        className={themeStyles.mediaCard.image}
      />
      <div className={themeStyles.mediaCard.overlay}>
        <h4 className={themeStyles.mediaCard.title}>{show.name}</h4>
        <div className={themeStyles.mediaCard.rating}>
          <span className={themeStyles.mediaCard.star}>★</span>
          <span className={themeStyles.mediaCard.star}>{show.vote_average?.toFixed(1)}</span>
          <span className={themeStyles.mediaCard.score}>/10</span>
        </div>
        <p className="text-xs text-[#C5C6C7] mt-1">
          {show.first_air_date ? new Date(show.first_air_date).getFullYear() : 'TBA'}
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
                TV Shows
              </h1>
              <p className={`${themeStyles.text.secondary} text-lg max-w-2xl`}>
                Track episodes, seasons, and discover your next binge-worthy series.
              </p>
            </div>
            
            <div className="w-20 h-20 bg-gradient-to-br from-[#66FCF1] to-[#45A29E] rounded-2xl flex items-center justify-center shadow-lg shadow-[#66FCF1]/25">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-6">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search for TV shows..."
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
                setShows(popularShows);
              }}
            />
            <TabButton
              id="topRated"
              label="Top Rated"
              isActive={activeTab === 'topRated'}
              onClick={() => {
                setActiveTab('topRated');
                setShows(topRatedShows);
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

        {/* TV Shows Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : (
          <div className={themeStyles.layout.grid.cols6}>
            {getCurrentShows().map((show) => (
              <TVShowCard key={show.id} show={show} />
            ))}
          </div>
        )}

        {getCurrentShows().length === 0 && !loading && (
          <div className={`${themeStyles.glass.card} p-12 text-center`}>
            <div className="w-24 h-24 bg-gradient-to-br from-[#1F2833] to-[#0B0C10] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-[#C5C6C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className={`text-2xl font-bold ${themeStyles.text.primary} mb-2`}>No shows found</h3>
            <p className={themeStyles.text.secondary}>Try searching for something else or check your connection.</p>
          </div>
        )}
      </div>

      {/* TV Show Details Modal */}
      {selectedShow && (
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
                  src={selectedShow.poster_path 
                    ? `https://image.tmdb.org/t/mdb/w500${selectedShow.poster_path}`
                    : 'https://placehold.co/300x450?text=No+Poster'
                  }
                  alt={selectedShow.name}
                  className="w-full md:w-80 rounded-xl"
                />
                
                <div className="flex-1">
                  <h2 className={`text-3xl font-bold ${themeStyles.modalText.primary} mb-2`}>
                    {selectedShow.name}
                  </h2>
                  <p className={`${themeStyles.modalText.secondary} text-lg mb-4`}>
                    {selectedShow.first_air_date ? new Date(selectedShow.first_air_date).getFullYear() : 'TBA'}
                    {selectedShow.last_air_date && selectedShow.last_air_date !== selectedShow.first_air_date && 
                      ` - ${new Date(selectedShow.last_air_date).getFullYear()}`
                    }
                  </p>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center">
                      <span className="text-[#66FCF1] text-xl font-bold">★</span>
                      <span className={`${themeStyles.modalText.primary} text-xl font-bold ml-1`}>
                        {selectedShow.vote_average?.toFixed(1)}
                      </span>
                      <span className={`${themeStyles.modalText.secondary} ml-1`}>/10</span>
                    </div>
                    <div className={`px-3 py-1 bg-[#1F2833]/20 rounded-full ${themeStyles.modalText.tertiary} text-sm`}>
                      {selectedShow.number_of_seasons} Season{selectedShow.number_of_seasons !== 1 ? 's' : ''}
                    </div>
                    <div className={`px-3 py-1 bg-[#1F2833]/20 rounded-full ${themeStyles.modalText.tertiary} text-sm`}>
                      {selectedShow.number_of_episodes} Episodes
                    </div>
                  </div>
                  
                  <p className={`${themeStyles.modalText.secondary} mb-6 leading-relaxed`}>
                    {selectedShow.overview}
                  </p>
                  
                  {selectedShow.genres && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedShow.genres.map((genre) => (
                        <span 
                          key={genre.id}
                          className={`px-3 py-1 bg-gradient-to-r ${themeStyles.gradients.media.tv} ${themeStyles.modalText.primary} rounded-full text-sm font-medium`}
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
                      Rate Show
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

export default TVShows;

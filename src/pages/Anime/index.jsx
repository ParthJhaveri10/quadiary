import React, { useState, useEffect } from 'react';
import { themeStyles } from '../../styles/theme';
import { 
  searchAnime, 
  getPopularAnime, 
  getTopRatedAnime, 
  getAnimeById 
} from '../../services/animeService';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import SearchBar from '../../components/SearchBar';

const Anime = () => {
  const [anime, setAnime] = useState([]);
  const [popularAnime, setPopularAnime] = useState([]);
  const [topRatedAnime, setTopRatedAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState('popular');
  const [selectedAnime, setSelectedAnime] = useState(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [popular, topRated] = await Promise.all([
        getPopularAnime(1),
        getTopRatedAnime(1)
      ]);
      
      setPopularAnime(popular.results.slice(0, 12));
      setTopRatedAnime(topRated.results.slice(0, 12));
      setAnime(popular.results.slice(0, 12));
    } catch (error) {
      console.error('Error loading anime:', error);
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
      const results = await searchAnime(query, 1);
      setSearchResults(results.results);
      setActiveTab('search');
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnimeClick = async (animeId) => {
    try {
      const animeDetails = await getAnimeById(animeId);
      setSelectedAnime(animeDetails);
    } catch (error) {
      console.error('Error fetching anime details:', error);
    }
  };

  const closeModal = () => {
    setSelectedAnime(null);
  };

  const getCurrentAnime = () => {
    switch (activeTab) {
      case 'popular':
        return popularAnime;
      case 'topRated':
        return topRatedAnime;
      case 'search':
        return searchResults;
      default:
        return anime;
    }
  };

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
        isActive
          ? `bg-gradient-to-r ${themeStyles.gradients.media.anime} ${themeStyles.text.primary} ${themeStyles.effects.shadow.md}`
          : `${themeStyles.text.secondary} hover:${themeStyles.text.primary} hover:bg-white/10`
      }`}
    >
      {label}
    </button>
  );

  const AnimeCard = ({ anime }) => (
    <div 
      className={`${themeStyles.mediaCard.container} ${themeStyles.interactive.hover}`}
      onClick={() => handleAnimeClick(anime.id)}
    >
      <img
        src={anime.poster_path || anime.image || 'https://placehold.co/300x450?text=No+Poster'}
        alt={anime.title || anime.name}
        className={themeStyles.mediaCard.image}
      />
      <div className={themeStyles.mediaCard.overlay}>
        <h4 className={themeStyles.mediaCard.title}>{anime.title || anime.name}</h4>
        <div className={themeStyles.mediaCard.rating}>
          <span className={themeStyles.mediaCard.star}>★</span>
          <span className={themeStyles.mediaCard.star}>
            {anime.vote_average?.toFixed(1) || anime.rating?.toFixed(1) || 'N/A'}
          </span>
          <span className={themeStyles.mediaCard.score}>/10</span>
        </div>
        <p className="text-xs text-slate-300 mt-1">
          {anime.release_date || anime.year || anime.aired || 'TBA'}
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
                Anime
              </h1>
              <p className={`${themeStyles.text.secondary} text-lg max-w-2xl`}>
                Discover amazing anime series and movies. Track your progress and rate your favorites.
              </p>
            </div>
            
            <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/25">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-6">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search for anime..."
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
                setAnime(popularAnime);
              }}
            />
            <TabButton
              id="topRated"
              label="Top Rated"
              isActive={activeTab === 'topRated'}
              onClick={() => {
                setActiveTab('topRated');
                setAnime(topRatedAnime);
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

        {/* Anime Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : (
          <div className={themeStyles.layout.grid.cols6}>
            {getCurrentAnime().map((animeItem) => (
              <AnimeCard key={animeItem.id} anime={animeItem} />
            ))}
          </div>
        )}

        {getCurrentAnime().length === 0 && !loading && (
          <div className={`${themeStyles.glass.card} p-12 text-center`}>
            <div className="w-24 h-24 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className={`text-2xl font-bold ${themeStyles.text.primary} mb-2`}>No anime found</h3>
            <p className={themeStyles.text.secondary}>Try searching for something else or check your connection.</p>
          </div>
        )}
      </div>

      {/* Anime Details Modal */}
      {selectedAnime && (
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
                  src={selectedAnime.poster_path || selectedAnime.image || 'https://placehold.co/300x450?text=No+Poster'}
                  alt={selectedAnime.title || selectedAnime.name}
                  className="w-full md:w-80 rounded-xl"
                />
                
                <div className="flex-1">
                  <h2 className={`text-3xl font-bold ${themeStyles.modalText.primary} mb-2`}>
                    {selectedAnime.title || selectedAnime.name}
                  </h2>
                  <p className={`${themeStyles.modalText.secondary} text-lg mb-4`}>
                    {selectedAnime.release_date || selectedAnime.year || selectedAnime.aired || 'TBA'}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center">
                      <span className="text-[#66FCF1] text-xl font-bold">★</span>
                      <span className={`${themeStyles.modalText.primary} text-xl font-bold ml-1`}>
                        {selectedAnime.vote_average?.toFixed(1) || selectedAnime.rating?.toFixed(1) || 'N/A'}
                      </span>
                      <span className={`${themeStyles.modalText.secondary} ml-1`}>/10</span>
                    </div>
                    {selectedAnime.episodes && (
                      <div className={`px-3 py-1 bg-[#1F2833]/20 rounded-full ${themeStyles.modalText.tertiary} text-sm`}>
                        {selectedAnime.episodes} Episodes
                      </div>
                    )}
                    {selectedAnime.status && (
                      <div className={`px-3 py-1 bg-[#1F2833]/20 rounded-full ${themeStyles.modalText.tertiary} text-sm`}>
                        {selectedAnime.status}
                      </div>
                    )}
                  </div>
                  
                  <p className={`${themeStyles.modalText.secondary} mb-6 leading-relaxed`}>
                    {selectedAnime.overview || selectedAnime.synopsis || 'No description available.'}
                  </p>
                  
                  {selectedAnime.genres && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedAnime.genres.map((genre, index) => (
                        <span 
                          key={genre.id || index}
                          className={`px-3 py-1 bg-gradient-to-r ${themeStyles.gradients.media.anime} ${themeStyles.modalText.primary} rounded-full text-sm font-medium`}
                        >
                          {typeof genre === 'string' ? genre : genre.name}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex gap-4">
                    <button className={themeStyles.buttons.primary}>
                      Add to Watchlist
                    </button>
                    <button className={themeStyles.buttons.secondary}>
                      Rate Anime
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

export default Anime;

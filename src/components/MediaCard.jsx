import { useState } from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

export const MediaType = {
  ANIME: 'anime',
  MOVIE: 'movie',
  TV_SHOW: 'tv',
  BOOK: 'book',
};

const themeColors = {
  anime: {
    accent: 'from-violet-500 to-purple-600',
    hover: 'group-hover:text-violet-400',
    glow: 'hover:shadow-[0_0_25px_rgba(139,92,246,0.3)]',
    border: 'border-violet-500/30',
    indicator: 'bg-violet-500'
  },
  movie: {
    accent: 'from-orange-500 to-red-600',
    hover: 'group-hover:text-orange-400',
    glow: 'hover:shadow-[0_0_25px_rgba(249,115,22,0.3)]',
    border: 'border-orange-500/30',
    indicator: 'bg-orange-500'
  },
  tv: {
    accent: 'from-blue-500 to-cyan-600',
    hover: 'group-hover:text-blue-400',
    glow: 'hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]',
    border: 'border-blue-500/30',
    indicator: 'bg-blue-500'
  },
  book: {
    accent: 'from-emerald-500 to-green-600',
    hover: 'group-hover:text-emerald-400',
    glow: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]',
    border: 'border-emerald-500/30',
    indicator: 'bg-emerald-500'
  }
};

const MediaCard = ({ 
  id, 
  type = MediaType.ANIME, 
  title, 
  image, 
  rating = 0,
  userRating = null,
  year,
  onRatingChange
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getTheme = () => themeColors[type] || themeColors.anime;
  const getLinkPath = () => `/${type}/${id}`;

  const handleRatingChange = (newRating) => {
    if (onRatingChange) onRatingChange(id, type, newRating);
  };

  const placeholderImage = 'https://via.placeholder.com/300x450?text=No+Image';
  const theme = getTheme();

  return (
    <div 
      className={`group relative rounded-2xl overflow-hidden bg-white/10 backdrop-blur-2xl border ${theme.border} 
                  transition-all duration-500 ${theme.glow} transform hover:scale-[1.03] hover:-translate-y-1 
                  animate-fade-in shadow-lg hover:shadow-2xl hover:border-white/40`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full pb-[150%] overflow-hidden">
        <Link to={getLinkPath()}>
          <img
            src={image || placeholderImage}
            alt={title}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div className={`absolute inset-0 bg-gradient-to-t from-black/90 to-black/20 p-4 flex flex-col justify-end 
                         transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center mb-2">
              <div className={`h-6 w-1 ${theme.indicator} mr-3 rounded-full shadow-lg`}></div>
              <span className="text-lg text-white font-bold">{rating.toFixed(1)}</span>
              <span className="text-sm text-slate-300 ml-1">/10</span>
            </div>
            {year && (
              <span className="text-sm text-slate-300 bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm 
                           inline-block self-start">{year}</span>
            )}
          </div>
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.accent} 
                         opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
        </Link>
      </div>

      <div className="p-4 space-y-3">
        <Link to={getLinkPath()} className="block">
          <h3 className={`text-white font-semibold line-clamp-2 transition-colors duration-300 ${theme.hover}`}>
            {title}
          </h3>
        </Link>

        <div className="pt-2 border-t border-white/10">
          <StarRating 
            initialRating={userRating || 0}
            onRatingChange={handleRatingChange}
            readOnly={!onRatingChange}
            size="sm"
            mediaType={type}
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 
                    group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default MediaCard;

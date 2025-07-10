import { useState, useEffect } from 'react';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const MAX_RATING = 10;
const STARS_COUNT = 5; // Use 5 stars visually, but represent a 10-point scale

// Theme configuration for different media types
const themeColors = {
  anime: "text-violet-400",
  movie: "text-orange-400",
  tv: "text-blue-400",
  book: "text-emerald-400",
  default: "text-yellow-400"
};

const StarRating = ({ 
  initialRating = 0, 
  onRatingChange = () => {}, 
  readOnly = false,
  size = 'md', // 'sm', 'md', 'lg'
  showValue = true,
  precision = 1, // Decimal precision
  mediaType = 'default' // Used for color theming
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  // Update internal rating when prop changes
  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  // Get star color based on media type
  const getStarColor = () => {
    return themeColors[mediaType] || themeColors.default;
  };

  // Get size class based on size prop
  const getSizeClass = () => {
    switch(size) {
      case 'sm': return 'w-4 h-4';
      case 'lg': return 'w-8 h-8';
      default: return 'w-6 h-6';
    }
  };
  
  // Get font size class based on size prop
  const getFontSizeClass = () => {
    switch(size) {
      case 'sm': return 'text-xs';
      case 'lg': return 'text-lg';
      default: return 'text-sm';
    }
  };

  const handleClick = (value) => {
    if (readOnly) return;
    
    // Each star represents 2 points in a 10-point scale
    const newRating = value * 2;
    
    // Round to desired precision
    const roundedRating = Math.round(newRating * Math.pow(10, precision)) / Math.pow(10, precision);
    
    setRating(roundedRating);
    onRatingChange(roundedRating);
  };

  const handleMouseEnter = (value) => {
    if (readOnly) return;
    // Each star represents 2 points in a 10-point scale
    setHoverRating(value * 2);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverRating(0);
  };

  return (
    <div className="flex items-center">
      <div className="flex">
        {[...Array(STARS_COUNT)].map((_, index) => {
          const starValue = index + 1;
          const isFilled = hoverRating ? 
            starValue <= (hoverRating/2) : 
            starValue <= Math.ceil(rating/2);
            
          const isHalfFilled = !hoverRating && 
            starValue === Math.ceil(rating/2) && 
            rating % 2 !== 0;

          return (
            <button
              type="button"
              key={`star-${index}`}
              className={`${getSizeClass()} ${getStarColor()} ${readOnly ? 'cursor-default' : 'cursor-pointer'}
                       transition-all duration-300 hover:scale-110`}
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
              disabled={readOnly}
              aria-label={`Rate ${starValue * 2} out of ${MAX_RATING}`}
            >
              {isFilled && !isHalfFilled ? (
                <StarIconSolid className="w-full h-full filter drop-shadow-md" />
              ) : (
                <StarIconOutline className="w-full h-full" />
              )}
            </button>
          );
        })}
      </div>
      
      {showValue && rating > 0 && (
        <span className={`ml-2 font-semibold text-white ${getFontSizeClass()}`}>
          {rating.toFixed(precision)}
        </span>
      )}
    </div>
  );
};

export default StarRating;
import React from 'react';
import { themeStyles } from '../../styles/theme';

// Media category card component for Home page
const MediaCategoryCard = ({ title, icon, color, text, onClick }) => (
  <div
    onClick={onClick}
    className={`${themeStyles.glass.panel} p-6 cursor-pointer transform transition-all duration-300 ${themeStyles.interactive.hover} ${themeStyles.interactive.active}`}
  >
    <div className="flex items-center mb-4">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${themeStyles.gradients.media[title.toLowerCase()]} flex items-center justify-center shadow-lg shadow-${title.toLowerCase() === 'anime' ? 'purple' : title.toLowerCase() === 'movie' ? 'orange' : title.toLowerCase() === 'tv' ? 'blue' : 'green'}-500/20`}>
        {icon}
      </div>
      <h3 className={`ml-3 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${themeStyles.gradients.media[title.toLowerCase()]}`}>
        {title}
      </h3>
    </div>
    <p className={themeStyles.text.secondary}>{text}</p>
    
    <div className="mt-4 flex justify-between items-center">
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className={`w-4 h-4 ${i < 3 ? 'text-yellow-400' : 'text-white/20'}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <button className="text-sm font-medium bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg transition-colors duration-200">
        Explore
      </button>
    </div>
  </div>
);

export default MediaCategoryCard;

import React from 'react';

// Activity card component for recent activity display
const ActivityCard = ({ type, title, rating, date, image }) => (
  <div className="flex items-center p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/[0.08] transition-all duration-300">
    <div className="w-12 h-16 rounded-md overflow-hidden flex-shrink-0 mr-4">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.src = 'https://placehold.co/100x150?text=No+Image';
        }}
      />
    </div>
    <div className="flex-1">
      <div className="flex items-center">
        <span className={`text-xs px-2 py-0.5 rounded-full ${
          type === 'anime' ? 'bg-purple-500/20 text-purple-300' :
          type === 'movie' ? 'bg-orange-500/20 text-orange-300' :
          type === 'tv' ? 'bg-blue-500/20 text-blue-300' :
          'bg-green-500/20 text-green-300'
        } uppercase font-medium`}>
          {type}
        </span>
        <span className="text-xs text-slate-400 ml-2">{date}</span>
      </div>
      <h4 className="text-white font-medium mt-1 line-clamp-1">{title}</h4>
      <div className="flex items-center mt-1">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            className={`w-3.5 h-3.5 ${i < rating ? 'text-yellow-400' : 'text-white/20'}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </div>
  </div>
);

export default ActivityCard;

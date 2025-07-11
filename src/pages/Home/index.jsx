import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { themeStyles } from '../../styles/theme';
import MediaCategoryCard from '../../components/ui/MediaCategoryCard';
import ActivityCard from '../../components/ui/ActivityCard';

// Home page component with enhanced visual elements
const Home = () => {
  const { currentUser } = useAuth();
  const [time, setTime] = useState('');
  
  // Update greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTime('morning');
    else if (hour < 18) setTime('afternoon');
    else setTime('evening');
  }, []);

  // Mock data for recent activity
  const recentActivity = [
    { id: 1, type: 'anime', title: 'Attack on Titan', rating: 5, date: 'Today', image: 'https://placehold.co/100x150?text=AoT' },
    { id: 2, type: 'movie', title: 'Inception', rating: 4, date: 'Yesterday', image: 'https://placehold.co/100x150?text=Inception' },
    { id: 3, type: 'tv', title: 'Breaking Bad', rating: 5, date: '2 days ago', image: 'https://placehold.co/100x150?text=BB' },
    { id: 4, type: 'book', title: 'The Lord of the Rings', rating: 4, date: '3 days ago', image: 'https://placehold.co/100x150?text=LOTR' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero section with greeting */}
      <div className={`${themeStyles.glass.card} p-8 mb-10`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-violet-200 mt-2 mb-2">
              Welcome back, {currentUser?.name || currentUser?.displayName || 'Friend'}
            </h1>
            <span className="text-purple-300 font-medium block mb-2">Good {time}!</span>
            <p className="text-slate-300 text-lg max-w-2xl">
              Track and rate your favorite content across multiple mediums — all in one beautiful space.
            </p>
          </div>
          
          <div className="mt-6 md:mt-0">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
              {currentUser?.photoURL ? (
                <img 
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || 'Profile'}
                  className="w-16 h-16 rounded-xl object-cover"
                />
              ) : (
                <div className="text-2xl font-bold text-white">
                  {currentUser?.name ? currentUser.name[0].toUpperCase() : currentUser?.displayName ? currentUser.displayName[0].toUpperCase() : '?'}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Stats overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="text-3xl font-bold text-white">47</div>
            <div className="text-sm text-slate-400 mt-1">Anime rated</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="text-3xl font-bold text-white">32</div>
            <div className="text-sm text-slate-400 mt-1">Movies watched</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="text-3xl font-bold text-white">18</div>
            <div className="text-sm text-slate-400 mt-1">TV shows tracked</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="text-3xl font-bold text-white">23</div>
            <div className="text-sm text-slate-400 mt-1">Books read</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Media categories */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-white mb-4">Explore Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <MediaCategoryCard
              title="Anime"
              icon={
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              }
              color="from-pink-500 to-purple-600"
              text="Track series progress, rate episodes, and discover new shows."
            />
            <MediaCategoryCard
              title="Movie"
              icon={
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              }
              color="from-orange-500 to-red-500"
              text="Log and rate films you've watched, build your watchlist."
            />
            <MediaCategoryCard
              title="TV"
              icon={
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
              color="from-blue-500 to-cyan-400"
              text="Track episodes and seasons of your favorite TV shows."
            />
            <MediaCategoryCard
              title="Book"
              icon={
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
              color="from-green-400 to-teal-500"
              text="Rate books, track reading progress, and set reading goals."
            />
          </div>
        </div>
        
        {/* Recent activity */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
          <div className={`${themeStyles.glass.card} p-5`}>
            <div className="space-y-3">
              {recentActivity.map(activity => (
                <ActivityCard key={activity.id} {...activity} />
              ))}
            </div>
            
            <button className="w-full mt-4 py-3 text-sm font-medium bg-white/10 hover:bg-white/15 text-white rounded-xl transition-colors duration-200">
              View All Activity
            </button>
          </div>
        </div>
      </div>
      
      {/* Recommendations section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Recommendations For You</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="aspect-[2/3] rounded-xl overflow-hidden relative group cursor-pointer">
              <img 
                src={`https://placehold.co/300x450?text=Item+${i}`}
                alt={`Recommendation ${i}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <h4 className="text-white font-medium text-sm">Recommendation {i}</h4>
                <div className="flex items-center mt-1">
                  <div className="text-xs text-yellow-400 font-bold">{(Math.random() * 2 + 8).toFixed(1)}</div>
                  <div className="text-xs text-slate-400 ml-1">/10</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Call to action */}
      <div className={`${themeStyles.glass.card} p-8 text-center`}>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-violet-200 mb-3">
          Start Tracking Today
        </h2>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-6">
          Join thousands of users who track their media consumption and discover new content tailored to their tastes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
            Explore All Features
          </button>
          <button className="px-8 py-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white rounded-xl font-semibold transition-all duration-300">
            View Your Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

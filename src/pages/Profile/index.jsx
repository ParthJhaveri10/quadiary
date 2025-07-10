import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { themeStyles } from '../../styles/theme';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className={`${themeStyles.glass.card} p-8 mb-8`}>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div>
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/25 text-white text-4xl font-bold">
              {currentUser?.photoURL ? (
                <img 
                  src={currentUser.photoURL} 
                  alt={currentUser.displayName || 'Profile'} 
                  className="w-28 h-28 rounded-2xl object-cover"
                />
              ) : (
                currentUser?.displayName ? currentUser.displayName[0].toUpperCase() : 'U'
              )}
            </div>
            
            <button onClick={handleLogout} className="mt-4 w-full py-2 px-4 text-sm bg-white/10 hover:bg-white/15 border border-white/20 text-white rounded-xl transition-colors duration-200">
              Sign Out
            </button>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-violet-200 mb-2">
              {currentUser?.displayName || 'User Profile'}
            </h1>
            <p className="text-slate-300 mb-6">{currentUser?.email}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-white">120</div>
                <div className="text-sm text-slate-400">Total Ratings</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-white">8.4</div>
                <div className="text-sm text-slate-400">Average Rating</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Anime Fan</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">TV Enthusiast</span>
              <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm">Movie Buff</span>
              <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Book Lover</span>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <button className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-xl font-medium transition-all duration-300">
                Edit Profile
              </button>
              <button className="px-6 py-2.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white rounded-xl font-medium transition-colors duration-200">
                View Statistics
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* User stats cards */}
      <h2 className="text-2xl font-bold text-white mb-4">Your Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <div className={`${themeStyles.glass.card} p-5`}>
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="ml-3 font-semibold text-white">Anime</h3>
          </div>
          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
            47
          </div>
          <p className="text-slate-400 text-sm mt-1">Series rated</p>
          <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex justify-between">
            <span>272 episodes</span>
            <span>65% complete</span>
          </div>
        </div>
        
        <div className={`${themeStyles.glass.card} p-5`}>
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 className="ml-3 font-semibold text-white">Movies</h3>
          </div>
          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
            32
          </div>
          <p className="text-slate-400 text-sm mt-1">Movies watched</p>
          <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full" style={{ width: '42%' }}></div>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex justify-between">
            <span>64 hours</span>
            <span>42% of watchlist</span>
          </div>
        </div>
        
        <div className={`${themeStyles.glass.card} p-5`}>
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="ml-3 font-semibold text-white">TV Shows</h3>
          </div>
          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
            18
          </div>
          <p className="text-slate-400 text-sm mt-1">Shows tracked</p>
          <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" style={{ width: '78%' }}></div>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex justify-between">
            <span>142 episodes</span>
            <span>78% complete</span>
          </div>
        </div>
        
        <div className={`${themeStyles.glass.card} p-5`}>
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center shadow-lg shadow-green-500/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="ml-3 font-semibold text-white">Books</h3>
          </div>
          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">
            23
          </div>
          <p className="text-slate-400 text-sm mt-1">Books read</p>
          <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 to-teal-500 rounded-full" style={{ width: '54%' }}></div>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex justify-between">
            <span>8,450 pages</span>
            <span>54% of reading list</span>
          </div>
        </div>
      </div>
      
      {/* Recent ratings */}
      <h2 className="text-2xl font-bold text-white mb-4">Your Recent Ratings</h2>
      <div className={`${themeStyles.glass.card} p-6`}>
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex items-center hover:bg-white/5 p-2 rounded-lg transition-colors duration-200">
              <div className="w-12 h-16 rounded-md overflow-hidden flex-shrink-0 mr-4">
                <img 
                  src={`https://placehold.co/100x150?text=Item+${i}`}
                  alt={`Rating ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium">Media Title {i}</h4>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, j) => (
                    <svg 
                      key={j} 
                      className={`w-4 h-4 ${j < (5 - i % 2) ? 'text-yellow-400' : 'text-white/20'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs text-slate-400 ml-2">Rated {(10 - i % 3) / 2} days ago</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-white">{(10 - i % 3)}</div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-4 py-3 text-sm font-medium bg-white/10 hover:bg-white/15 text-white rounded-xl transition-colors duration-200">
          View All Ratings
        </button>
      </div>
    </div>
  );
};

export default Profile;

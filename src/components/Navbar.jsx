import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  BookOpenIcon,
  FilmIcon,
  TvIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const isActive = (path) => location.pathname.startsWith(path);

  const linkStyle = (path) => `px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300
    ${isActive(path)
      ? 'text-white bg-gradient-to-r from-violet-500 to-purple-500 shadow-md shadow-violet-500/40 border border-white/20'
      : 'text-white/70 hover:text-white hover:bg-white/10 hover:shadow-sm hover:shadow-purple-400/20'}`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-gradient-to-r from-[#180229]/90 via-[#290643]/90 to-[#3d0a63]/90 backdrop-blur-xl border-b border-white/10 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500/40 via-purple-500/40 to-violet-500/40" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md shadow-purple-500/25 transition-transform duration-300 group-hover:scale-105 mr-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <span className="text-xl font-extrabold text-white bg-clip-text bg-gradient-to-r from-white via-purple-100 to-violet-200">
              QuaDiary
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/anime" className={linkStyle('/anime')}>Anime</Link>
            <Link to="/movies" className={linkStyle('/movies')}>Movies</Link>
            <Link to="/tv" className={linkStyle('/tv')}>TV Shows</Link>
            <Link to="/books" className={linkStyle('/books')}>Books</Link>
            <Link to="/search" className={linkStyle('/search')}>Search</Link>

            {currentUser ? (
              <>
                <Link to="/profile" className={linkStyle('/profile')}>
                  <UserCircleIcon className="w-5 h-5 mr-1 inline" />
                  {currentUser.displayName || 'Profile'}
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2.5 text-sm font-medium text-white/80 border border-white/20 hover:bg-white/10 hover:text-white rounded-xl transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2.5 text-sm font-medium text-white/80 border border-white/20 hover:bg-white/10 hover:text-white rounded-xl transition-all duration-300">
                  Log in
                </Link>
                <Link to="/signup" className="px-6 py-2.5 text-sm font-medium bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl shadow-lg shadow-violet-500/25 hover:from-violet-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 active:scale-95">
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button
              className="p-2 rounded-xl bg-white/5 border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 bg-gradient-to-b from-[#180229]/90 via-[#290643]/90 to-[#3d0a63]/90 backdrop-blur-md border-t border-white/10">
          <div className="flex flex-col space-y-2">
            <Link to="/anime" onClick={toggleMenu} className={linkStyle('/anime')}>Anime</Link>
            <Link to="/movies" onClick={toggleMenu} className={linkStyle('/movies')}>Movies</Link>
            <Link to="/tv" onClick={toggleMenu} className={linkStyle('/tv')}>TV Shows</Link>
            <Link to="/books" onClick={toggleMenu} className={linkStyle('/books')}>Books</Link>
            <Link to="/search" onClick={toggleMenu} className={linkStyle('/search')}>Search</Link>
            {currentUser ? (
              <>
                <Link to="/profile" onClick={toggleMenu} className={linkStyle('/profile')}>Profile</Link>
                <button onClick={() => { toggleMenu(); logout(); }} className="text-left px-4 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white rounded-xl border border-white/10 transition-all duration-300">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={toggleMenu} className="text-white/80 hover:text-white hover:bg-white/10 rounded-xl px-4 py-2.5 border border-white/10">Log in</Link>
                <Link to="/signup" onClick={toggleMenu} className="px-6 py-2.5 text-sm font-medium bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl shadow-lg shadow-violet-500/25 hover:from-violet-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 active:scale-95">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

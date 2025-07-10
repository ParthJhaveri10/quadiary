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
      ? 'text-[#0B0C10] bg-gradient-to-r from-[#66FCF1] to-[#45A29E] shadow-md shadow-[#66FCF1]/40 border border-[#C5C6C7]/20'
      : 'text-[#C5C6C7]/70 hover:text-[#C5C6C7] hover:bg-[#C5C6C7]/10 hover:shadow-sm hover:shadow-[#66FCF1]/20'}`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-gradient-to-r from-[#0B0C10]/90 via-[#1F2833]/90 to-[#0B0C10]/90 backdrop-blur-xl border-b border-[#C5C6C7]/10 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#66FCF1]/40 via-[#45A29E]/40 to-[#66FCF1]/40" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#66FCF1] to-[#45A29E] rounded-xl flex items-center justify-center shadow-md shadow-[#66FCF1]/25 transition-transform duration-300 group-hover:scale-105 mr-3">
              <svg className="w-5 h-5 text-[#0B0C10]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <span className="text-xl font-extrabold text-[#C5C6C7] bg-clip-text bg-gradient-to-r from-[#C5C6C7] via-[#66FCF1] to-[#45A29E]">
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
                  className="px-4 py-2.5 text-sm font-medium text-[#C5C6C7]/80 border border-[#C5C6C7]/20 hover:bg-[#C5C6C7]/10 hover:text-[#C5C6C7] rounded-xl transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2.5 text-sm font-medium text-[#C5C6C7]/80 border border-[#C5C6C7]/20 hover:bg-[#C5C6C7]/10 hover:text-[#C5C6C7] rounded-xl transition-all duration-300">
                  Log in
                </Link>
                <Link to="/signup" className="px-6 py-2.5 text-sm font-medium bg-gradient-to-r from-[#66FCF1] to-[#45A29E] text-[#0B0C10] rounded-xl shadow-lg shadow-[#66FCF1]/25 hover:from-[#66FCF1]/90 hover:to-[#45A29E]/90 transition-all duration-300 transform hover:scale-105 active:scale-95">
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button
              className="p-2 rounded-xl bg-[#C5C6C7]/5 border border-[#C5C6C7]/20 text-[#C5C6C7]/70 hover:text-[#C5C6C7] hover:bg-[#C5C6C7]/10 transition-all duration-300"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 bg-gradient-to-b from-[#0B0C10]/90 via-[#1F2833]/90 to-[#0B0C10]/90 backdrop-blur-md border-t border-[#C5C6C7]/10">
          <div className="flex flex-col space-y-2">
            <Link to="/anime" onClick={toggleMenu} className={linkStyle('/anime')}>Anime</Link>
            <Link to="/movies" onClick={toggleMenu} className={linkStyle('/movies')}>Movies</Link>
            <Link to="/tv" onClick={toggleMenu} className={linkStyle('/tv')}>TV Shows</Link>
            <Link to="/books" onClick={toggleMenu} className={linkStyle('/books')}>Books</Link>
            <Link to="/search" onClick={toggleMenu} className={linkStyle('/search')}>Search</Link>
            {currentUser ? (
              <>
                <Link to="/profile" onClick={toggleMenu} className={linkStyle('/profile')}>Profile</Link>
                <button onClick={() => { toggleMenu(); logout(); }} className="text-left px-4 py-2.5 text-sm font-medium text-[#C5C6C7]/80 hover:bg-[#C5C6C7]/10 hover:text-[#C5C6C7] rounded-xl border border-[#C5C6C7]/10 transition-all duration-300">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={toggleMenu} className="text-[#C5C6C7]/80 hover:text-[#C5C6C7] hover:bg-[#C5C6C7]/10 rounded-xl px-4 py-2.5 border border-[#C5C6C7]/10">Log in</Link>
                <Link to="/signup" onClick={toggleMenu} className="px-6 py-2.5 text-sm font-medium bg-gradient-to-r from-[#66FCF1] to-[#45A29E] text-[#0B0C10] rounded-xl shadow-lg shadow-[#66FCF1]/25 hover:from-[#66FCF1]/90 hover:to-[#45A29E]/90 transition-all duration-300 transform hover:scale-105 active:scale-95">
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

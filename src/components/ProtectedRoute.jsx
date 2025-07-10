import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { currentUser, loading } = useAuth();
  
  // If auth is still loading, show loading spinner with glassmorphism effect
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-lg flex flex-col items-center">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
            <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-t-violet-500 rounded-full animate-spin"></div>
          </div>
          <p className="mt-6 text-white text-lg font-medium">Loading...</p>
          <div className="mt-2 text-slate-300">Please wait while we prepare your experience</div>
        </div>
      </div>
    );
  }

  // If user is not authenticated, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
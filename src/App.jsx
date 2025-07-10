import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';

// Component imports
import BackgroundDecoration from './components/layout/BackgroundDecoration';
import PageWrapper from './components/layout/PageWrapper';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';
import RequireAuth from './components/auth/RequireAuth';

// Page imports
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import Anime from './pages/Anime';
import Books from './pages/Books';
import Search from './pages/Search';







// AppContent component to use auth hooks after AuthProvider is established
function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected routes with Layout */}
        <Route path="/" element={
          <Layout>
            <RequireAuth>
              <PageWrapper>
                <Home />
              </PageWrapper>
            </RequireAuth>
          </Layout>
        } />
        
        <Route path="/profile" element={
          <Layout>
            <RequireAuth>
              <PageWrapper>
                <Profile />
              </PageWrapper>
            </RequireAuth>
          </Layout>
        } />
        
        <Route path="/movies" element={
          <Layout>
            <RequireAuth>
              <PageWrapper>
                <Movies />
              </PageWrapper>
            </RequireAuth>
          </Layout>
        } />
        
        <Route path="/tv" element={
          <Layout>
            <RequireAuth>
              <PageWrapper>
                <TVShows />
              </PageWrapper>
            </RequireAuth>
          </Layout>
        } />
        
        <Route path="/anime" element={
          <Layout>
            <RequireAuth>
              <PageWrapper>
                <Anime />
              </PageWrapper>
            </RequireAuth>
          </Layout>
        } />
        
        <Route path="/books" element={
          <Layout>
            <RequireAuth>
              <PageWrapper>
                <Books />
              </PageWrapper>
            </RequireAuth>
          </Layout>
        } />
        
        <Route path="/search" element={
          <Layout>
            <RequireAuth>
              <PageWrapper>
                <Search />
              </PageWrapper>
            </RequireAuth>
          </Layout>
        } />
        
        {/* 404 fallback */}
        <Route path="*" element={
          <Layout>
            <NotFound />
          </Layout>
        } />
      </Routes>
    </div>
  );
}

// Main App component that provides context providers
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
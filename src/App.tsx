import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import './index.css';

function App() {
  // Determine which page to show based on current domain
  const isDashboard = window.location.hostname.includes('flowgen-dash') || 
                      window.location.pathname.includes('/dashboard');

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {isDashboard ? (
            // Dashboard routes
            <>
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            // Landing page routes
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LandingPage />} />
              <Route path="/signup" element={<LandingPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
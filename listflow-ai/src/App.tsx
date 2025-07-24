import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import { OnboardingProvider } from './contexts/OnboardingContext';
import SimpleLandingPage from './pages/SimpleLandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OnboardingWizard from './pages/OnboardingWizard';
import Dashboard from './pages/Dashboard';
import NewCampaignPage from './pages/NewCampaignPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// Create a modern theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb', // Blue
      light: '#3b82f6',
      dark: '#1d4ed8',
    },
    secondary: {
      main: '#7c3aed', // Purple
      light: '#8b5cf6',
      dark: '#6d28d9',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.125rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '10px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <OnboardingProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<SimpleLandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route 
                  path="/onboarding" 
                  element={
                    <ProtectedRoute>
                      <OnboardingWizard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/campaigns/new" 
                  element={
                    <ProtectedRoute>
                      <NewCampaignPage />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </Router>
        </OnboardingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

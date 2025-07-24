import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Typography } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';

// Create a simple theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
    },
  },
});

const SimpleApp: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default SimpleApp;
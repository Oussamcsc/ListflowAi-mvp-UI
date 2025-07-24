import React, { useState } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Divider,
  Alert,
  Link,
  InputAdornment,
  IconButton,
  useTheme,
} from '@mui/material';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { login, loginWithGoogle, loginWithMicrosoft, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google login failed');
    }
  };

  const handleMicrosoftLogin = async () => {
    try {
      await loginWithMicrosoft();
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Microsoft login failed');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
        display: 'flex',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
          }}
        >
          {/* Header */}
          <Box textAlign="center" sx={{ mb: 4 }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
              }}
            >
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                L
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              Welcome back
            </Typography>
            <Typography color="text.secondary">
              Sign in to your ListflowAi account
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* OAuth Buttons */}
          <Box sx={{ mb: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              sx={{ mb: 2, py: 1.5 }}
            >
              <Box component="img" src="/google-icon.svg" sx={{ width: 20, height: 20, mr: 2 }} />
              Continue with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleMicrosoftLogin}
              disabled={isLoading}
              sx={{ py: 1.5 }}
            >
              <Box component="img" src="/microsoft-icon.svg" sx={{ width: 20, height: 20, mr: 2 }} />
              Continue with Microsoft
            </Button>
          </Box>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              or continue with email
            </Typography>
          </Divider>

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="email"
              type="email"
              label="Email address"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={20} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={20} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
              <Link
                component={RouterLink}
                to="/forgot-password"
                variant="body2"
                sx={{ textDecoration: 'none' }}
              >
                Forgot password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                py: 1.5,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                mb: 3,
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </Box>

          {/* Sign up link */}
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link
                component={RouterLink}
                to="/signup"
                sx={{ textDecoration: 'none', fontWeight: 600 }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
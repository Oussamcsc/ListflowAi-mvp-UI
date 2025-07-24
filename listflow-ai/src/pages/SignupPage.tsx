import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
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
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { signup, loginWithGoogle, loginWithMicrosoft, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'agreeToTerms' ? checked : value,
    });
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!formData.agreeToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    try {
      await signup(formData.name, formData.email, formData.password);
      navigate('/onboarding');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle();
      navigate('/onboarding');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google signup failed');
    }
  };

  const handleMicrosoftSignup = async () => {
    try {
      await loginWithMicrosoft();
      navigate('/onboarding');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Microsoft signup failed');
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
              Create your account
            </Typography>
            <Typography color="text.secondary">
              Start your journey with ListflowAi
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
              onClick={handleGoogleSignup}
              disabled={isLoading}
              sx={{ mb: 2, py: 1.5 }}
            >
              <Box component="img" src="/google-icon.svg" sx={{ width: 20, height: 20, mr: 2 }} />
              Continue with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleMicrosoftSignup}
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

          {/* Signup Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="name"
              label="Full name"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <User size={20} />
                  </InputAdornment>
                ),
              }}
            />

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

            <TextField
              fullWidth
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              label="Confirm password"
              value={formData.confirmPassword}
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
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              }
              label={
                <Typography variant="body2" color="text.secondary">
                  I agree to the{' '}
                  <Link href="#" sx={{ textDecoration: 'none' }}>
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="#" sx={{ textDecoration: 'none' }}>
                    Privacy Policy
                  </Link>
                </Typography>
              }
              sx={{ mb: 3 }}
            />

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
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </Box>

          {/* Login link */}
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link
                component={RouterLink}
                to="/login"
                sx={{ textDecoration: 'none', fontWeight: 600 }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignupPage;
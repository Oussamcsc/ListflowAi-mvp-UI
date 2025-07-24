import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material';

const SimpleLandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Header */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 2 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h1">
            ListflowAi
          </Typography>
        </Container>
      </Box>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center" sx={{ mb: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            AI-Powered Lead Generation
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            Transform your outreach with intelligent lead generation and automated campaigns
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/signup')}
            sx={{ mr: 2 }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/login')}
          >
            Sign In
          </Button>
        </Box>

        {/* Features */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Smart Lead Discovery
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  AI-powered algorithms find your ideal prospects across multiple platforms
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Automated Outreach
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Personalized email campaigns that convert prospects into customers
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Analytics & Insights
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Track performance and optimize your campaigns with detailed analytics
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SimpleLandingPage;
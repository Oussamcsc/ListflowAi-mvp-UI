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
  AppBar,
  Toolbar,
  useTheme,
  alpha,
} from '@mui/material';
import {
  TrendingUp,
  Email,
  MyLocation,
  Bolt,
  People,
  BarChart,
} from '@mui/icons-material';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      icon: <MyLocation sx={{ fontSize: 40 }} />,
      title: 'AI-Powered Lead Generation',
      description: 'Find high-quality leads using advanced AI algorithms that understand your ideal customer profile.',
    },
    {
      icon: <Email sx={{ fontSize: 40 }} />,
      title: 'Smart Outreach Campaigns',
      description: 'Create personalized email campaigns with AI-generated copy that converts prospects into customers.',
    },
    {
      icon: <BarChart sx={{ fontSize: 40 }} />,
      title: 'Advanced Analytics',
      description: 'Track campaign performance with detailed analytics and insights to optimize your outreach strategy.',
    },
    {
      icon: <People sx={{ fontSize: 40 }} />,
      title: 'CRM Integration',
      description: 'Seamlessly manage your leads and customer relationships with our built-in CRM system.',
    },
    {
      icon: <Bolt sx={{ fontSize: 40 }} />,
      title: 'Automated Workflows',
      description: 'Set up automated follow-up sequences and nurture campaigns to maximize conversion rates.',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      title: 'Growth Optimization',
      description: 'Continuously improve your results with AI-driven recommendations and A/B testing.',
    },
  ];

  return (
    <Box>
      {/* Header */}
      <AppBar position="static" elevation={0} sx={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
        <Toolbar>
          <Box display="flex" alignItems="center" flexGrow={1}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '8px',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                L
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
              ListflowAi
            </Typography>
          </Box>
          <Box>
            <Button
              color="inherit"
              onClick={() => navigate('/login')}
              sx={{ mr: 2, color: theme.palette.text.primary }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate('/signup')}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              }}
            >
              Get Started
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
          py: 12,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                sx={{
                  mb: 3,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                AI-Powered Lead Generation & Outreach
              </Typography>
              <Typography variant="h5" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                Transform your sales process with intelligent lead generation, personalized copywriting, 
                and automated outreach campaigns that convert.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/signup')}
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    px: 4,
                    py: 1.5,
                  }}
                >
                  Start Free Trial
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ px: 4, py: 1.5 }}
                >
                  Watch Demo
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  background: 'white',
                  borderRadius: 3,
                  p: 4,
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main }}>
                  Campaign Performance
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.success.main }}>
                      87%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Open Rate
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                      34%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Response Rate
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.secondary.main }}>
                      12%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Conversion Rate
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Average results from ListflowAi campaigns
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box textAlign="center" sx={{ mb: 8 }}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            Everything you need to scale your outreach
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Powerful features designed to help you generate more leads and close more deals
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      color: theme.palette.primary.main,
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          py: 12,
        }}
      >
        <Container maxWidth="md">
          <Box textAlign="center">
            <Typography variant="h2" sx={{ color: 'white', mb: 2 }}>
              Ready to transform your sales process?
            </Typography>
            <Typography variant="h6" sx={{ color: 'white', opacity: 0.9, mb: 4 }}>
              Join thousands of businesses already using ListflowAi to generate more leads and close more deals.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/signup')}
              sx={{
                backgroundColor: 'white',
                color: theme.palette.primary.main,
                px: 4,
                py: 1.5,
                '&:hover': {
                  backgroundColor: alpha('white', 0.9),
                },
              }}
            >
              Start Your Free Trial
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: theme.palette.grey[50], py: 6 }}>
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Typography color="text.secondary">
              © 2024 ListflowAi. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
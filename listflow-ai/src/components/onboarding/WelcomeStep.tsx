import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { Target, Mail, BarChart3, Users } from 'lucide-react';

const WelcomeStep: React.FC = () => {
  const features = [
    {
      icon: <Target size={32} />,
      title: 'AI Lead Generation',
      description: 'Find high-quality prospects using advanced AI algorithms',
    },
    {
      icon: <Mail size={32} />,
      title: 'Smart Outreach',
      description: 'Create personalized campaigns that convert',
    },
    {
      icon: <BarChart3 size={32} />,
      title: 'Analytics & Insights',
      description: 'Track performance and optimize your campaigns',
    },
    {
      icon: <Users size={32} />,
      title: 'CRM Integration',
      description: 'Manage leads and relationships seamlessly',
    },
  ];

  return (
    <Box>
      <Box textAlign="center" sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Welcome to ListflowAi! 🎉
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          We'll help you set up your account in just a few steps to get the best results from our AI-powered platform.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card
              sx={{
                height: '100%',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    color: 'primary.main',
                    mb: 2,
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          mt: 4,
          p: 3,
          backgroundColor: 'primary.main',
          borderRadius: 2,
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          Ready to get started?
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          The setup process takes about 3-5 minutes and will help us personalize your experience.
        </Typography>
      </Box>
    </Box>
  );
};

export default WelcomeStep;
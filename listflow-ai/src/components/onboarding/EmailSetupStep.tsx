import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Alert,
  Tooltip,
  IconButton,
  Chip,
} from '@mui/material';
import { HelpCircle, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { useOnboarding } from '../../contexts/OnboardingContext';

const EmailSetupStep: React.FC = () => {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const [isConnecting, setIsConnecting] = React.useState(false);

  const handleConnectEmail = async (provider: 'gmail' | 'outlook') => {
    setIsConnecting(true);
    try {
      // TODO: Implement actual OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate OAuth
      updateOnboardingData({ emailConnected: true });
    } catch (error) {
      console.error('Failed to connect email:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSkip = () => {
    updateOnboardingData({ emailConnected: false });
  };

  return (
    <Box>
      <Box textAlign="center" sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Connect Your Email
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Connect your email account to start sending personalized outreach campaigns.
        </Typography>
      </Box>

      {!onboardingData.emailConnected ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2">
                <strong>Why connect your email?</strong> This allows ListflowAi to send campaigns 
                from your email address, improving deliverability and authenticity.
              </Typography>
            </Alert>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px -5px rgb(0 0 0 / 0.1)',
                },
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '12px',
                    backgroundColor: '#ea4335',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <Mail size={24} color="white" />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Gmail
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  Connect your Gmail account for seamless email campaigns
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleConnectEmail('gmail')}
                  disabled={isConnecting}
                  sx={{
                    backgroundColor: '#ea4335',
                    '&:hover': {
                      backgroundColor: '#d33b2c',
                    },
                  }}
                >
                  {isConnecting ? 'Connecting...' : 'Connect Gmail'}
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px -5px rgb(0 0 0 / 0.1)',
                },
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '12px',
                    backgroundColor: '#0078d4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <Mail size={24} color="white" />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Outlook
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  Connect your Outlook account for professional outreach
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleConnectEmail('outlook')}
                  disabled={isConnecting}
                  sx={{
                    backgroundColor: '#0078d4',
                    '&:hover': {
                      backgroundColor: '#106ebe',
                    },
                  }}
                >
                  {isConnecting ? 'Connecting...' : 'Connect Outlook'}
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Box textAlign="center" sx={{ mt: 2 }}>
              <Button
                variant="text"
                onClick={handleSkip}
                disabled={isConnecting}
                sx={{ color: 'text.secondary' }}
              >
                Skip for now (you can connect later)
              </Button>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Box textAlign="center">
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: 'success.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
            }}
          >
            <CheckCircle size={40} color="white" />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Email Connected Successfully! ✅
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Your email account is now connected and ready for outreach campaigns.
          </Typography>
          <Chip
            label="Email Connected"
            color="success"
            icon={<CheckCircle size={16} />}
            sx={{ mb: 3 }}
          />
        </Box>
      )}

      <Box
        sx={{
          mt: 4,
          p: 3,
          backgroundColor: 'grey.50',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          <AlertCircle size={16} color="#666" style={{ marginTop: 2 }} />
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Security & Privacy:</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • We use OAuth 2.0 for secure authentication
              <br />
              • We only access what's needed to send emails
              <br />
              • Your credentials are never stored on our servers
              <br />
              • You can revoke access at any time
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          mt: 2,
          p: 3,
          backgroundColor: 'primary.light',
          borderRadius: 2,
          color: 'primary.contrastText',
        }}
      >
        <Typography variant="body2">
          🚀 <strong>Ready to Launch:</strong> Once you complete the setup, you'll be able to 
          create your first campaign and start generating leads with AI-powered outreach!
        </Typography>
      </Box>
    </Box>
  );
};

export default EmailSetupStep;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  useTheme,
} from '@mui/material';
import { useOnboarding } from '../contexts/OnboardingContext';
import { useAuth } from '../contexts/AuthContext';
import WelcomeStep from '../components/onboarding/WelcomeStep';
import BusinessInfoStep from '../components/onboarding/BusinessInfoStep';
import TargetAudienceStep from '../components/onboarding/TargetAudienceStep';
import GeographicFocusStep from '../components/onboarding/GeographicFocusStep';
import EmailSetupStep from '../components/onboarding/EmailSetupStep';

const OnboardingWizard: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { updateUser } = useAuth();
  const {
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    completeOnboarding,
    isCompleting,
  } = useOnboarding();

  const steps = [
    'Welcome',
    'Business Info',
    'Target Audience',
    'Geographic Focus',
    'Email Setup',
  ];

  const handleNext = () => {
    if (currentStep === totalSteps - 1) {
      handleComplete();
    } else {
      nextStep();
    }
  };

  const handleComplete = async () => {
    try {
      await completeOnboarding();
      updateUser({ isOnboarded: true });
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep />;
      case 1:
        return <BusinessInfoStep />;
      case 2:
        return <TargetAudienceStep />;
      case 3:
        return <GeographicFocusStep />;
      case 4:
        return <EmailSetupStep />;
      default:
        return <WelcomeStep />;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
        py: 4,
      }}
    >
      <Container maxWidth="md">
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
            Welcome to ListflowAi
          </Typography>
          <Typography color="text.secondary">
            Let's set up your account to get the best results
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
          }}
        >
          {/* Progress Stepper */}
          <Stepper activeStep={currentStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Step Content */}
          <Box sx={{ mb: 4 }}>
            {renderStepContent()}
          </Box>

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              variant="outlined"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              variant="contained"
              disabled={isCompleting}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              }}
            >
              {currentStep === totalSteps - 1
                ? isCompleting
                  ? 'Completing...'
                  : 'Complete Setup'
                : 'Next'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default OnboardingWizard;
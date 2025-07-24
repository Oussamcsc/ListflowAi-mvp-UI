import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Slider,
  Alert,
  Paper,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  ArrowLeft,
  HelpCircle,
  Target,
  Mail,
  Users,
  MapPin,
  Zap,
  Plus,
  X,
} from 'lucide-react';
import Navbar from '../components/Navbar';

interface CampaignData {
  name: string;
  industry: string;
  targetRoles: string[];
  locations: string[];
  leadCount: number;
  emailTone: string;
  campaignType: string;
  customMessage: string;
}

const NewCampaignPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [newRole, setNewRole] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const [campaignData, setCampaignData] = useState<CampaignData>({
    name: '',
    industry: '',
    targetRoles: [],
    locations: [],
    leadCount: 100,
    emailTone: '',
    campaignType: '',
    customMessage: '',
  });

  const steps = ['Campaign Details', 'Target Audience', 'Email Settings', 'Review & Launch'];

  const industries = [
    'Technology/SaaS',
    'E-commerce',
    'Healthcare',
    'Finance',
    'Marketing/Advertising',
    'Consulting',
    'Manufacturing',
    'Real Estate',
    'Education',
    'Other',
  ];

  const emailTones = [
    { value: 'professional', label: 'Professional' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'casual', label: 'Casual' },
    { value: 'formal', label: 'Formal' },
    { value: 'persuasive', label: 'Persuasive' },
  ];

  const campaignTypes = [
    { value: 'lead_generation', label: 'Lead Generation' },
    { value: 'product_demo', label: 'Product Demo' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'content_promotion', label: 'Content Promotion' },
    { value: 'event_invitation', label: 'Event Invitation' },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAddRole = () => {
    if (newRole.trim() && !campaignData.targetRoles.includes(newRole.trim())) {
      setCampaignData({
        ...campaignData,
        targetRoles: [...campaignData.targetRoles, newRole.trim()],
      });
      setNewRole('');
    }
  };

  const handleRemoveRole = (roleToRemove: string) => {
    setCampaignData({
      ...campaignData,
      targetRoles: campaignData.targetRoles.filter(role => role !== roleToRemove),
    });
  };

  const handleAddLocation = () => {
    if (newLocation.trim() && !campaignData.locations.includes(newLocation.trim())) {
      setCampaignData({
        ...campaignData,
        locations: [...campaignData.locations, newLocation.trim()],
      });
      setNewLocation('');
    }
  };

  const handleRemoveLocation = (locationToRemove: string) => {
    setCampaignData({
      ...campaignData,
      locations: campaignData.locations.filter(location => location !== locationToRemove),
    });
  };

  const handleCreateCampaign = async () => {
    setIsCreating(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate API call
      console.log('Campaign created:', campaignData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to create campaign:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Campaign Name"
                placeholder="e.g., SaaS Founders Outreach Q1 2024"
                value={campaignData.name}
                onChange={(e) => setCampaignData({ ...campaignData, name: e.target.value })}
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Industry</InputLabel>
                <Select
                  value={campaignData.industry}
                  onChange={(e) => setCampaignData({ ...campaignData, industry: e.target.value })}
                >
                  {industries.map((industry) => (
                    <MenuItem key={industry} value={industry}>
                      {industry}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Campaign Type</InputLabel>
                <Select
                  value={campaignData.campaignType}
                  onChange={(e) => setCampaignData({ ...campaignData, campaignType: e.target.value })}
                >
                  {campaignTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Target Job Roles
                </Typography>
                <Tooltip title="Specify the job titles you want to target">
                  <IconButton size="small" sx={{ ml: 1 }}>
                    <HelpCircle size={16} />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Enter a job role"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddRole()}
                />
                <IconButton onClick={handleAddRole} disabled={!newRole.trim()}>
                  <Plus size={20} />
                </IconButton>
              </Box>
              {campaignData.targetRoles.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {campaignData.targetRoles.map((role) => (
                    <Chip
                      key={role}
                      label={role}
                      onDelete={() => handleRemoveRole(role)}
                      deleteIcon={<X size={16} />}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Target Locations
                </Typography>
                <Tooltip title="Specify countries or regions to target">
                  <IconButton size="small" sx={{ ml: 1 }}>
                    <HelpCircle size={16} />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Enter a location"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddLocation()}
                />
                <IconButton onClick={handleAddLocation} disabled={!newLocation.trim()}>
                  <Plus size={20} />
                </IconButton>
              </Box>
              {campaignData.locations.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {campaignData.locations.map((location) => (
                    <Chip
                      key={location}
                      label={location}
                      onDelete={() => handleRemoveLocation(location)}
                      deleteIcon={<X size={16} />}
                      color="secondary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Number of Leads: {campaignData.leadCount}
              </Typography>
              <Slider
                value={campaignData.leadCount}
                onChange={(_, value) => setCampaignData({ ...campaignData, leadCount: value as number })}
                min={10}
                max={1000}
                step={10}
                marks={[
                  { value: 10, label: '10' },
                  { value: 250, label: '250' },
                  { value: 500, label: '500' },
                  { value: 1000, label: '1000' },
                ]}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Email Tone</InputLabel>
                <Select
                  value={campaignData.emailTone}
                  onChange={(e) => setCampaignData({ ...campaignData, emailTone: e.target.value })}
                >
                  {emailTones.map((tone) => (
                    <MenuItem key={tone.value} value={tone.value}>
                      {tone.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Custom Message (Optional)"
                placeholder="Add any specific message or context you'd like the AI to include in the emails..."
                value={campaignData.customMessage}
                onChange={(e) => setCampaignData({ ...campaignData, customMessage: e.target.value })}
              />
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Campaign Summary
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                    Campaign Details
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Name:</Typography>
                      <Typography variant="body2">{campaignData.name}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Industry:</Typography>
                      <Typography variant="body2">{campaignData.industry}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Type:</Typography>
                      <Typography variant="body2">
                        {campaignTypes.find(t => t.value === campaignData.campaignType)?.label}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Lead Count:</Typography>
                      <Typography variant="body2">{campaignData.leadCount}</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                    Target Audience
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Roles:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {campaignData.targetRoles.map((role) => (
                        <Chip key={role} label={role} size="small" />
                      ))}
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Locations:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {campaignData.locations.map((location) => (
                        <Chip key={location} label={location} size="small" />
                      ))}
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            <Alert severity="info" sx={{ mt: 2 }}>
              Your campaign will be created and leads will be generated using AI. This process typically takes 5-10 minutes.
            </Alert>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Navbar />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton onClick={() => navigate('/dashboard')} sx={{ mr: 2 }}>
            <ArrowLeft size={20} />
          </IconButton>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              Create New Campaign
            </Typography>
            <Typography color="text.secondary">
              Set up your AI-powered lead generation campaign
            </Typography>
          </Box>
        </Box>

        <Card>
          <CardContent sx={{ p: 4 }}>
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
                onClick={handleBack}
                disabled={currentStep === 0}
                variant="outlined"
              >
                Back
              </Button>
              <Button
                onClick={currentStep === steps.length - 1 ? handleCreateCampaign : handleNext}
                variant="contained"
                disabled={isCreating}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                }}
              >
                {currentStep === steps.length - 1
                  ? isCreating
                    ? 'Creating Campaign...'
                    : 'Launch Campaign'
                  : 'Next'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default NewCampaignPage;
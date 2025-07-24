import React from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Tooltip,
  IconButton,
} from '@mui/material';
import { HelpCircle } from 'lucide-react';
import { useOnboarding } from '../../contexts/OnboardingContext';

const BusinessInfoStep: React.FC = () => {
  const { onboardingData, updateOnboardingData } = useOnboarding();

  const handleChange = (field: string, value: string) => {
    updateOnboardingData({
      businessInfo: {
        ...onboardingData.businessInfo,
        [field]: value,
      },
    });
  };

  const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-1000 employees',
    '1000+ employees',
  ];

  return (
    <Box>
      <Box textAlign="center" sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Tell us about your business
        </Typography>
        <Typography variant="h6" color="text.secondary">
          This information helps us customize your experience and provide better recommendations.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Company Name
            </Typography>
            <Tooltip title="Your company name will be used in email signatures and branding">
              <IconButton size="small" sx={{ ml: 1 }}>
                <HelpCircle size={16} />
              </IconButton>
            </Tooltip>
          </Box>
          <TextField
            fullWidth
            placeholder="Enter your company name"
            value={onboardingData.businessInfo.companyName}
            onChange={(e) => handleChange('companyName', e.target.value)}
            sx={{ mb: 3 }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Company Size
            </Typography>
            <Tooltip title="This helps us understand your scale and provide appropriate features">
              <IconButton size="small" sx={{ ml: 1 }}>
                <HelpCircle size={16} />
              </IconButton>
            </Tooltip>
          </Box>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Select
              value={onboardingData.businessInfo.companySize}
              onChange={(e) => handleChange('companySize', e.target.value)}
              displayEmpty
            >
              <MenuItem value="">
                <em>Select company size</em>
              </MenuItem>
              {companySizes.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Website (Optional)
            </Typography>
            <Tooltip title="Your website helps us understand your business better">
              <IconButton size="small" sx={{ ml: 1 }}>
                <HelpCircle size={16} />
              </IconButton>
            </Tooltip>
          </Box>
          <TextField
            fullWidth
            placeholder="https://yourcompany.com"
            value={onboardingData.businessInfo.website}
            onChange={(e) => handleChange('website', e.target.value)}
            sx={{ mb: 3 }}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Industry
            </Typography>
            <Tooltip title="Your industry helps us find relevant prospects and create appropriate messaging">
              <IconButton size="small" sx={{ ml: 1 }}>
                <HelpCircle size={16} />
              </IconButton>
            </Tooltip>
          </Box>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Describe your industry and what your company does (e.g., SaaS, E-commerce, Consulting, etc.)"
            value={onboardingData.industry}
            onChange={(e) => updateOnboardingData({ industry: e.target.value })}
          />
        </Grid>
      </Grid>

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
        <Typography variant="body2" color="text.secondary">
          💡 <strong>Tip:</strong> The more specific you are about your business, the better we can tailor 
          our AI recommendations and lead generation to your needs.
        </Typography>
      </Box>
    </Box>
  );
};

export default BusinessInfoStep;
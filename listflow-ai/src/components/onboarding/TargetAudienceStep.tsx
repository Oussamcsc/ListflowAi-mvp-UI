import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Chip,
  Grid,
  Tooltip,
  IconButton,
  Paper,
} from '@mui/material';
import { HelpCircle, Plus, X } from 'lucide-react';
import { useOnboarding } from '../../contexts/OnboardingContext';

const TargetAudienceStep: React.FC = () => {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const [newRole, setNewRole] = React.useState('');

  const handleAddRole = () => {
    if (newRole.trim() && !onboardingData.customerRoles.includes(newRole.trim())) {
      updateOnboardingData({
        customerRoles: [...onboardingData.customerRoles, newRole.trim()],
      });
      setNewRole('');
    }
  };

  const handleRemoveRole = (roleToRemove: string) => {
    updateOnboardingData({
      customerRoles: onboardingData.customerRoles.filter(role => role !== roleToRemove),
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddRole();
    }
  };

  const suggestedRoles = [
    'CEO', 'CTO', 'CMO', 'VP Sales', 'VP Marketing', 'Sales Director',
    'Marketing Director', 'Product Manager', 'Operations Manager',
    'Business Development', 'Founder', 'Head of Growth'
  ];

  const handleSuggestedRoleClick = (role: string) => {
    if (!onboardingData.customerRoles.includes(role)) {
      updateOnboardingData({
        customerRoles: [...onboardingData.customerRoles, role],
      });
    }
  };

  return (
    <Box>
      <Box textAlign="center" sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Define your target audience
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Help us understand who you want to reach with your campaigns.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Target Audience Description
            </Typography>
            <Tooltip title="Describe your ideal customer profile in detail">
              <IconButton size="small" sx={{ ml: 1 }}>
                <HelpCircle size={16} />
              </IconButton>
            </Tooltip>
          </Box>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Describe your ideal customers (e.g., B2B SaaS companies with 50-500 employees, looking to improve their sales processes, located in North America...)"
            value={onboardingData.targetAudience}
            onChange={(e) => updateOnboardingData({ targetAudience: e.target.value })}
            sx={{ mb: 3 }}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Target Job Roles
            </Typography>
            <Tooltip title="Specify the job titles or roles of people you want to reach">
              <IconButton size="small" sx={{ ml: 1 }}>
                <HelpCircle size={16} />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Add Role Input */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Enter a job role (e.g., CEO, Marketing Director)"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <IconButton
              onClick={handleAddRole}
              disabled={!newRole.trim()}
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
                '&:disabled': {
                  backgroundColor: 'grey.300',
                },
              }}
            >
              <Plus size={20} />
            </IconButton>
          </Box>

          {/* Selected Roles */}
          {onboardingData.customerRoles.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Selected Roles:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {onboardingData.customerRoles.map((role) => (
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
            </Box>
          )}

          {/* Suggested Roles */}
          <Paper sx={{ p: 3, backgroundColor: 'grey.50' }}>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Suggested Roles (click to add):
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {suggestedRoles
                .filter(role => !onboardingData.customerRoles.includes(role))
                .map((role) => (
                  <Chip
                    key={role}
                    label={role}
                    onClick={() => handleSuggestedRoleClick(role)}
                    variant="outlined"
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'primary.light',
                        color: 'white',
                      },
                    }}
                  />
                ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: 4,
          p: 3,
          backgroundColor: 'info.light',
          borderRadius: 2,
          color: 'info.contrastText',
        }}
      >
        <Typography variant="body2">
          🎯 <strong>Pro Tip:</strong> Be specific about your target audience. The more detailed 
          your description, the better our AI can find and engage with the right prospects for your business.
        </Typography>
      </Box>
    </Box>
  );
};

export default TargetAudienceStep;
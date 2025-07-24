import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Grid,
  Tooltip,
  IconButton,
  Paper,
  TextField,
} from '@mui/material';
import { HelpCircle, Plus, X } from 'lucide-react';
import { useOnboarding } from '../../contexts/OnboardingContext';

const GeographicFocusStep: React.FC = () => {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const [newLocation, setNewLocation] = React.useState('');

  const handleAddLocation = () => {
    if (newLocation.trim() && !onboardingData.geographicFocus.includes(newLocation.trim())) {
      updateOnboardingData({
        geographicFocus: [...onboardingData.geographicFocus, newLocation.trim()],
      });
      setNewLocation('');
    }
  };

  const handleRemoveLocation = (locationToRemove: string) => {
    updateOnboardingData({
      geographicFocus: onboardingData.geographicFocus.filter(location => location !== locationToRemove),
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddLocation();
    }
  };

  const suggestedLocations = [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Australia',
    'Netherlands',
    'Sweden',
    'Switzerland',
    'Singapore',
    'Japan',
    'South Korea',
    'Brazil',
    'Mexico',
    'India',
    'Global/Worldwide'
  ];

  const handleSuggestedLocationClick = (location: string) => {
    if (!onboardingData.geographicFocus.includes(location)) {
      updateOnboardingData({
        geographicFocus: [...onboardingData.geographicFocus, location],
      });
    }
  };

  return (
    <Box>
      <Box textAlign="center" sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Geographic Focus
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Where are your target customers located?
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Target Locations
            </Typography>
            <Tooltip title="Specify countries, regions, or cities where you want to find prospects">
              <IconButton size="small" sx={{ ml: 1 }}>
                <HelpCircle size={16} />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Add Location Input */}
          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Enter a country, region, or city"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <IconButton
              onClick={handleAddLocation}
              disabled={!newLocation.trim()}
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

          {/* Selected Locations */}
          {onboardingData.geographicFocus.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Selected Locations:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {onboardingData.geographicFocus.map((location) => (
                  <Chip
                    key={location}
                    label={location}
                    onDelete={() => handleRemoveLocation(location)}
                    deleteIcon={<X size={16} />}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Suggested Locations */}
          <Paper sx={{ p: 3, backgroundColor: 'grey.50' }}>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Popular Locations (click to add):
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {suggestedLocations
                .filter(location => !onboardingData.geographicFocus.includes(location))
                .map((location) => (
                  <Chip
                    key={location}
                    label={location}
                    onClick={() => handleSuggestedLocationClick(location)}
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
          backgroundColor: 'warning.light',
          borderRadius: 2,
          color: 'warning.contrastText',
        }}
      >
        <Typography variant="body2">
          🌍 <strong>Geographic Targeting:</strong> Our AI will focus on finding prospects in your 
          selected locations. You can always adjust these settings later in your campaign preferences.
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 2,
          p: 3,
          backgroundColor: 'grey.50',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          💡 <strong>Tip:</strong> Consider time zones when selecting locations for outreach campaigns. 
          Our system can automatically optimize send times based on your target locations.
        </Typography>
      </Box>
    </Box>
  );
};

export default GeographicFocusStep;
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  useTheme,
} from '@mui/material';
import {
  LayoutDashboard,
  Target,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    handleMenuClose();
  };

  const navItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard size={18} />,
    },
    {
      label: 'Campaigns',
      path: '/campaigns',
      icon: <Target size={18} />,
    },
    {
      label: 'Leads',
      path: '/leads',
      icon: <Users size={18} />,
    },
    {
      label: 'Analytics',
      path: '/analytics',
      icon: <BarChart3 size={18} />,
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e2e8f0',
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ px: 3 }}>
        {/* Logo */}
        <Box display="flex" alignItems="center" sx={{ mr: 4 }}>
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
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/dashboard')}
          >
            ListflowAi
          </Typography>
        </Box>

        {/* Navigation Items */}
        <Box sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              startIcon={item.icon}
              onClick={() => navigate(item.path)}
              sx={{
                color: isActive(item.path) ? 'primary.main' : 'text.secondary',
                backgroundColor: isActive(item.path) ? 'primary.light' : 'transparent',
                fontWeight: isActive(item.path) ? 600 : 400,
                px: 2,
                py: 1,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: isActive(item.path) ? 'primary.light' : 'grey.100',
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* User Menu */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            onClick={handleMenuClick}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'text.primary',
              textTransform: 'none',
              px: 2,
              py: 1,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'grey.100',
              },
            }}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {user?.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {user?.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
            <ChevronDown size={16} />
          </Button>
        </Box>
      </Toolbar>

      {/* User Menu Dropdown */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: 2,
            boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
          },
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {user?.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={() => { navigate('/settings'); handleMenuClose(); }}>
          <Settings size={16} style={{ marginRight: 8 }} />
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
          <LogOut size={16} style={{ marginRight: 8 }} />
          Sign Out
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
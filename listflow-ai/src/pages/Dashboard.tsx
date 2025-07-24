import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Avatar,
  LinearProgress,
  useTheme,
} from '@mui/material';
import {
  Plus,
  MoreVertical,
  TrendingUp,
  Users,
  Mail,
  Target,
  Bell,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import NotificationsPanel from '../components/NotificationsPanel';

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  location: string;
  status: 'new' | 'contacted' | 'interested' | 'rejected';
  dateAdded: string;
  campaign: string;
}

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  leads: number;
  responses: number;
  responseRate: number;
  dateCreated: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock data
  const campaigns: Campaign[] = [
    {
      id: '1',
      name: 'SaaS Founders Outreach',
      status: 'active',
      leads: 150,
      responses: 23,
      responseRate: 15.3,
      dateCreated: '2024-01-15',
    },
    {
      id: '2',
      name: 'Marketing Directors Campaign',
      status: 'active',
      leads: 89,
      responses: 12,
      responseRate: 13.5,
      dateCreated: '2024-01-10',
    },
    {
      id: '3',
      name: 'E-commerce CEOs',
      status: 'paused',
      leads: 67,
      responses: 8,
      responseRate: 11.9,
      dateCreated: '2024-01-05',
    },
  ];

  const leads: Lead[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@techcorp.com',
      company: 'TechCorp Inc.',
      role: 'CEO',
      location: 'San Francisco, CA',
      status: 'interested',
      dateAdded: '2024-01-20',
      campaign: 'SaaS Founders Outreach',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@marketpro.com',
      company: 'MarketPro',
      role: 'Marketing Director',
      location: 'New York, NY',
      status: 'contacted',
      dateAdded: '2024-01-19',
      campaign: 'Marketing Directors Campaign',
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike@ecomstore.com',
      company: 'EcomStore',
      role: 'Founder',
      location: 'Austin, TX',
      status: 'new',
      dateAdded: '2024-01-18',
      campaign: 'E-commerce CEOs',
    },
  ];

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, leadId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedLead(leadId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedLead(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'default';
      case 'contacted':
        return 'info';
      case 'interested':
        return 'success';
      case 'rejected':
        return 'error';
      case 'active':
        return 'success';
      case 'paused':
        return 'warning';
      case 'completed':
        return 'default';
      default:
        return 'default';
    }
  };

  const stats = [
    {
      title: 'Total Leads',
      value: '1,247',
      change: '+12%',
      icon: <Users size={24} />,
      color: theme.palette.primary.main,
    },
    {
      title: 'Active Campaigns',
      value: '8',
      change: '+2',
      icon: <Target size={24} />,
      color: theme.palette.secondary.main,
    },
    {
      title: 'Email Responses',
      value: '156',
      change: '+18%',
      icon: <Mail size={24} />,
      color: theme.palette.success.main,
    },
    {
      title: 'Conversion Rate',
      value: '14.2%',
      change: '+2.1%',
      icon: <TrendingUp size={24} />,
      color: theme.palette.warning.main,
    },
  ];

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Navbar />
      
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              Welcome back, {user?.name}! 👋
            </Typography>
            <Typography color="text.secondary">
              Here's what's happening with your campaigns today.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton
              onClick={() => setShowNotifications(true)}
              sx={{
                backgroundColor: 'background.paper',
                boxShadow: 1,
              }}
            >
              <Badge badgeContent={3} color="error">
                <Bell size={20} />
              </Badge>
            </IconButton>
            <Button
              variant="contained"
              startIcon={<Plus size={20} />}
              onClick={() => navigate('/campaigns/new')}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              }}
            >
              New Campaign
            </Button>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography color="text.secondary" variant="body2" sx={{ mb: 1 }}>
                        {stat.title}
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {stat.value}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: stat.change.startsWith('+') ? 'success.main' : 'error.main',
                          fontWeight: 600,
                        }}
                      >
                        {stat.change} from last month
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 2,
                        backgroundColor: `${stat.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: stat.color,
                      }}
                    >
                      {stat.icon}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {/* Active Campaigns */}
          <Grid item xs={12} lg={8}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Active Campaigns
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Plus size={16} />}
                    onClick={() => navigate('/campaigns/new')}
                  >
                    New Campaign
                  </Button>
                </Box>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Campaign Name</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Leads</TableCell>
                        <TableCell align="right">Responses</TableCell>
                        <TableCell align="right">Response Rate</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {campaigns.map((campaign) => (
                        <TableRow key={campaign.id} hover>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {campaign.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Created {campaign.dateCreated}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={campaign.status}
                              color={getStatusColor(campaign.status) as any}
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="right">{campaign.leads}</TableCell>
                          <TableCell align="right">{campaign.responses}</TableCell>
                          <TableCell align="right">
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {campaign.responseRate}%
                              </Typography>
                              <Box sx={{ width: 60 }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={campaign.responseRate}
                                  sx={{ height: 4, borderRadius: 2 }}
                                />
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <IconButton size="small">
                              <Eye size={16} />
                            </IconButton>
                            <IconButton size="small">
                              <Edit size={16} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Leads */}
          <Grid item xs={12} lg={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Recent Leads
                  </Typography>
                  <IconButton size="small">
                    <Filter size={16} />
                  </IconButton>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {leads.map((lead) => (
                    <Box
                      key={lead.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: 'grey.50',
                        '&:hover': {
                          backgroundColor: 'grey.100',
                        },
                      }}
                    >
                      <Avatar sx={{ width: 40, height: 40 }}>
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
                          {lead.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" noWrap>
                          {lead.role} at {lead.company}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <Chip
                            label={lead.status}
                            color={getStatusColor(lead.status) as any}
                            size="small"
                            sx={{ fontSize: '0.7rem', height: 20 }}
                          />
                        </Box>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuClick(e, lead.id)}
                      >
                        <MoreVertical size={16} />
                      </IconButton>
                    </Box>
                  ))}
                </Box>

                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 2 }}
                  onClick={() => navigate('/leads')}
                >
                  View All Leads
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Eye size={16} style={{ marginRight: 8 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Edit size={16} style={{ marginRight: 8 }} />
          Edit Lead
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <Trash2 size={16} style={{ marginRight: 8 }} />
          Delete Lead
        </MenuItem>
      </Menu>

      {/* Notifications Panel */}
      <NotificationsPanel
        open={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </Box>
  );
};

export default Dashboard;
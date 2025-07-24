import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Button,
  Divider,
} from '@mui/material';
import { X, Bell, Mail, Target, TrendingUp, CheckCircle } from 'lucide-react';

interface NotificationsPanelProps {
  open: boolean;
  onClose: () => void;
}

interface Notification {
  id: string;
  type: 'campaign' | 'lead' | 'response' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon: React.ReactNode;
  color: string;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ open, onClose }) => {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'response',
      title: 'New Response Received',
      message: 'John Smith from TechCorp replied to your SaaS Founders campaign',
      timestamp: '2 minutes ago',
      read: false,
      icon: <Mail size={20} />,
      color: '#10b981',
    },
    {
      id: '2',
      type: 'campaign',
      title: 'Campaign Performance Update',
      message: 'Marketing Directors Campaign has reached 15% response rate',
      timestamp: '1 hour ago',
      read: false,
      icon: <TrendingUp size={20} />,
      color: '#3b82f6',
    },
    {
      id: '3',
      type: 'lead',
      title: 'New Leads Added',
      message: '25 new leads were added to your E-commerce CEOs campaign',
      timestamp: '3 hours ago',
      read: true,
      icon: <Target size={20} />,
      color: '#8b5cf6',
    },
    {
      id: '4',
      type: 'system',
      title: 'Email Connection Verified',
      message: 'Your Gmail account connection has been successfully verified',
      timestamp: '1 day ago',
      read: true,
      icon: <CheckCircle size={20} />,
      color: '#06b6d4',
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    // TODO: Implement mark all as read functionality
    console.log('Mark all notifications as read');
  };

  const handleNotificationClick = (notification: Notification) => {
    // TODO: Implement notification click handling
    console.log('Clicked notification:', notification);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 400,
          maxWidth: '90vw',
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Bell size={24} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <Chip
                label={unreadCount}
                color="error"
                size="small"
                sx={{ fontSize: '0.75rem', height: 20 }}
              />
            )}
          </Box>
          <IconButton onClick={onClose} size="small">
            <X size={20} />
          </IconButton>
        </Box>

        {/* Mark all read button */}
        {unreadCount > 0 && (
          <Button
            variant="text"
            size="small"
            onClick={handleMarkAllRead}
            sx={{ mb: 2, fontSize: '0.875rem' }}
          >
            Mark all as read
          </Button>
        )}

        {/* Notifications List */}
        <List sx={{ p: 0 }}>
          {notifications.map((notification, index) => (
            <React.Fragment key={notification.id}>
              <ListItem
                sx={{
                  p: 0,
                  mb: 2,
                  borderRadius: 2,
                  backgroundColor: notification.read ? 'transparent' : 'primary.light',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: notification.read ? 'grey.50' : 'primary.light',
                  },
                }}
                onClick={() => handleNotificationClick(notification)}
              >
                <Box sx={{ p: 2, width: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: notification.color,
                      }}
                    >
                      {notification.icon}
                    </Avatar>
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: notification.read ? 400 : 600,
                          mb: 0.5,
                        }}
                      >
                        {notification.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontSize: '0.875rem',
                          lineHeight: 1.4,
                          mb: 1,
                        }}
                      >
                        {notification.message}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: '0.75rem' }}
                      >
                        {notification.timestamp}
                      </Typography>
                    </Box>
                    {!notification.read && (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: 'primary.main',
                          mt: 1,
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </ListItem>
              {index < notifications.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>

        {/* Empty state */}
        {notifications.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 6,
              color: 'text.secondary',
            }}
          >
            <Bell size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
            <Typography variant="body2">
              No notifications yet
            </Typography>
          </Box>
        )}

        {/* Footer */}
        <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            onClick={() => {
              // TODO: Navigate to notifications page
              console.log('View all notifications');
              onClose();
            }}
          >
            View All Notifications
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default NotificationsPanel;
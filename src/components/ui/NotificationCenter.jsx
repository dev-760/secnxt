import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const NotificationCenter = ({ notifications = [], onMarkAsRead, onMarkAllAsRead, onNotificationClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);

  // Mock notifications if none provided
  const mockNotifications = notifications?.length > 0 ? notifications : [
    {
      id: 1,
      type: 'critical',
      title: 'Critical Security Alert',
      message: 'Suspicious login attempt detected from unknown IP address',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      source: 'Authentication System'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Vulnerability Scan Complete',
      message: '3 high-risk vulnerabilities found in network infrastructure',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
      source: 'Vulnerability Scanner'
    },
    {
      id: 3,
      type: 'info',
      title: 'AI Analysis Update',
      message: 'Weekly security posture report is now available',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
      source: 'AI Engine'
    },
    {
      id: 4,
      type: 'success',
      title: 'Incident Resolved',
      message: 'Malware threat on workstation-045 has been successfully contained',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: true,
      source: 'Incident Response'
    },
    {
      id: 5,
      type: 'warning',
      title: 'Device Compliance Alert',
      message: '2 devices are missing required security updates',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      read: false,
      source: 'Device Management'
    }
  ];

  const unreadCount = mockNotifications?.filter(n => !n?.read)?.length;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'critical':
        return { name: 'AlertTriangle', color: 'text-error' };
      case 'warning':
        return { name: 'AlertCircle', color: 'text-warning' };
      case 'success':
        return { name: 'CheckCircle', color: 'text-success' };
      case 'info':
      default:
        return { name: 'Info', color: 'text-accent' };
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleNotificationClick = (notification) => {
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
    if (!notification?.read && onMarkAsRead) {
      onMarkAsRead(notification?.id);
    }
  };

  const handleMarkAllAsRead = () => {
    if (onMarkAllAsRead) {
      onMarkAllAsRead();
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <Icon name="Bell" size={20} className="text-muted-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-error text-error-foreground text-xs font-medium rounded-full">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      {isOpen && (
        <div className={`absolute right-0 top-full mt-2 bg-popover border border-border rounded-lg shadow-lg z-300 animate-fade-in ${
          isMobile ? 'fixed inset-x-4 top-16 w-auto' : 'w-96'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-popover-foreground">Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs text-primary hover:text-primary/80 transition-colors duration-200"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className={`${isMobile ? 'max-h-96' : 'max-h-80'} overflow-y-auto`}>
            {mockNotifications?.length === 0 ? (
              <div className="p-8 text-center">
                <Icon name="Bell" size={32} className="text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {mockNotifications?.map((notification) => {
                  const iconConfig = getNotificationIcon(notification?.type);
                  return (
                    <button
                      key={notification?.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`w-full p-4 text-left hover:bg-muted/30 transition-colors duration-200 ${
                        !notification?.read ? 'bg-primary/5' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 mt-0.5 ${iconConfig?.color}`}>
                          <Icon name={iconConfig?.name} size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={`text-sm font-medium truncate ${
                              !notification?.read ? 'text-popover-foreground' : 'text-muted-foreground'
                            }`}>
                              {notification?.title}
                            </h4>
                            {!notification?.read && (
                              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 ml-2" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {notification?.message}
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{notification?.source}</span>
                            <span>{formatTimestamp(notification?.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {mockNotifications?.length > 0 && (
            <div className="p-3 border-t border-border">
              <button className="w-full text-center text-sm text-primary hover:text-primary/80 transition-colors duration-200">
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const UserProfileDropdown = ({ user = null, onLogout, onSwitchOrganization, onProfileSettings, onAccountSettings, onHelpSupport }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Mock user data if none provided
  const currentUser = user || {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'Security Administrator',
    organization: 'TechCorp Solutions',
    avatar: null,
    organizations: [
      { id: 1, name: 'TechCorp Solutions', role: 'Security Administrator' },
      { id: 2, name: 'SecureNet Inc', role: 'IT Manager' },
      { id: 3, name: 'DataGuard LLC', role: 'Compliance Officer' }
    ]
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    if (onLogout) {
      onLogout();
    } else {
      // Default behavior: navigate to login
      navigate('/login');
    }
  };

  const handleOrganizationSwitch = (org) => {
    setIsOpen(false);
    if (onSwitchOrganization) {
      onSwitchOrganization(org);
    }
  };

  const handleProfileSettings = () => {
    setIsOpen(false);
    if (onProfileSettings) {
      onProfileSettings();
    } else {
      navigate('/profile');
    }
  };

  const handleAccountSettings = () => {
    setIsOpen(false);
    if (onAccountSettings) {
      onAccountSettings();
    } else {
      navigate('/account');
    }
  };

  const handleHelpSupport = () => {
    setIsOpen(false);
    if (onHelpSupport) {
      onHelpSupport();
    } else {
      navigate('/help');
    }
  };

  const getInitials = (name) => {
    return name?.split(' ')?.map(word => word?.charAt(0))?.join('')?.toUpperCase()?.slice(0, 2);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full text-primary-foreground font-medium text-sm">
          {currentUser?.avatar ? (
            <img 
              src={currentUser?.avatar} 
              alt={currentUser?.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            getInitials(currentUser?.name)
          )}
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-foreground">{currentUser?.name}</div>
          <div className="text-xs text-muted-foreground">{currentUser?.role}</div>
        </div>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-muted-foreground hidden md:block" 
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg z-200 animate-fade-in">
          {/* User Info Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full text-primary-foreground font-medium">
                {currentUser?.avatar ? (
                  <img 
                    src={currentUser?.avatar} 
                    alt={currentUser?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  getInitials(currentUser?.name)
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-popover-foreground truncate">{currentUser?.name}</div>
                <div className="text-sm text-muted-foreground truncate">{currentUser?.email}</div>
                <div className="text-xs text-muted-foreground">{currentUser?.role}</div>
              </div>
            </div>
          </div>

          {/* Current Organization */}
          <div className="p-4 border-b border-border">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              Current Organization
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Building" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-popover-foreground">{currentUser?.organization}</span>
            </div>
          </div>

          {/* Organization Switcher */}
          {currentUser?.organizations && currentUser?.organizations?.length > 1 && (
            <div className="p-4 border-b border-border">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                Switch Organization
              </div>
              <div className="space-y-1">
                {currentUser?.organizations?.filter(org => org?.name !== currentUser?.organization)?.map((org) => (
                    <button
                      key={org?.id}
                      onClick={() => handleOrganizationSwitch(org)}
                      className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200 text-left"
                    >
                      <Icon name="Building" size={14} className="text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-popover-foreground truncate">{org?.name}</div>
                        <div className="text-xs text-muted-foreground">{org?.role}</div>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Menu Items */}
          <div className="p-2">
            <button 
              onClick={handleProfileSettings}
              className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200 text-left">
              <Icon name="User" size={16} className="text-muted-foreground" />
              <span className="text-sm text-popover-foreground">Profile Settings</span>
            </button>
            <button 
              onClick={handleAccountSettings}
              className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200 text-left">
              <Icon name="Settings" size={16} className="text-muted-foreground" />
              <span className="text-sm text-popover-foreground">Account Settings</span>
            </button>
            <button 
              onClick={handleHelpSupport}
              className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200 text-left">
              <Icon name="HelpCircle" size={16} className="text-muted-foreground" />
              <span className="text-sm text-popover-foreground">Help & Support</span>
            </button>
          </div>

          {/* Logout */}
          <div className="p-2 border-t border-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors duration-200 text-left"
            >
              <Icon name="LogOut" size={16} className="text-muted-foreground" />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationSidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigationItems = [
    {
      path: '/security-dashboard',
      label: 'Dashboard',
      icon: 'Shield',
      description: 'Security overview and AI insights'
    },
    {
      path: '/incident-response-center',
      label: 'Incidents',
      icon: 'AlertTriangle',
      description: 'Critical security event management'
    },
    {
      path: '/device-management',
      label: 'Devices',
      icon: 'Monitor',
      description: 'Endpoint monitoring and management'
    },
    {
      path: '/vulnerability-management',
      label: 'Vulnerabilities',
      icon: 'Bug',
      description: 'Risk assessment and remediation'
    },
    {
      path: '/identity-access-management',
      label: 'Identity & Access',
      icon: 'Users',
      description: 'User directory and role management'
    },
    {
      path: '/compliance-reporting',
      label: 'Compliance',
      icon: 'FileCheck',
      description: 'Compliance monitoring and reports'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location?.pathname === path;
  };

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-100 bg-card border-t border-border">
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems?.slice(0, 4)?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-200 min-w-0 flex-1 ${
                isActive(item?.path)
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={item?.icon} size={20} className="mb-1" />
              <span className="text-xs font-medium truncate">{item?.label}</span>
            </button>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <aside className={`fixed left-0 top-0 z-100 h-screen bg-card border-r border-border transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-16' : 'w-60'
    }`}>
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex items-center p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="Shield" size={20} color="white" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-foreground">SecNXT</span>
                <span className="text-xs text-muted-foreground">Cybersecurity Platform</span>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <button
              onClick={onToggleCollapse}
              className="ml-auto p-1.5 rounded-lg hover:bg-muted/50 transition-colors duration-200"
            >
              <Icon name="ChevronLeft" size={16} className="text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
              title={isCollapsed ? item?.label : ''}
            >
              <Icon 
                name={item?.icon} 
                size={20} 
                className={`flex-shrink-0 ${
                  isActive(item?.path) ? 'text-primary-foreground' : ''
                }`}
              />
              {!isCollapsed && (
                <div className="flex flex-col items-start min-w-0">
                  <span className="font-medium truncate">{item?.label}</span>
                  <span className={`text-xs truncate ${
                    isActive(item?.path) 
                      ? 'text-primary-foreground/80' 
                      : 'text-muted-foreground group-hover:text-foreground/70'
                  }`}>
                    {item?.description}
                  </span>
                </div>
              )}
            </button>
          ))}
        </nav>

        {/* Collapse Toggle for Desktop */}
        {isCollapsed && (
          <div className="p-4 border-t border-border">
            <button
              onClick={onToggleCollapse}
              className="w-full p-2.5 rounded-lg hover:bg-muted/50 transition-colors duration-200 flex items-center justify-center"
              title="Expand sidebar"
            >
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>
          </div>
        )}

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border">
            <div className="text-xs text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>SecNXT v2.1.0</span>
                <span>© 2025</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default NavigationSidebar;